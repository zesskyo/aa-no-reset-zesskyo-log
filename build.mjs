// Builds dist/index.html from:
//   logs/<N>.log          Hermes play.log for run N (the file name is the run number)
//   logs/<N>.stats.json   optional: the world's stats/<uuid>.json, for elytra distance
//   runs/<N>.json         already-parsed runs (used when there is no log for that number)
//   runs.json             details you type in: date, seed, video, notes, pacelock, deaths
//   icons/<slot>.png      icons shown on the site
// Usage: node build.mjs      (no packages to install)
import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const rd = p => path.join(root, p);
const appJs = fs.readFileSync(rd("src/app.js"), "utf8");
const appCss = fs.readFileSync(rd("src/app.css"), "utf8");

// Reuse the site's own log parser so the build and the website always agree.
const cut = (a, b) => appJs.slice(appJs.indexOf(a), appJs.indexOf(b));
const parserSrc = cut("/* ================= parsing", "/* ================= derived");
const { parseLog, encodeRun } = new Function(parserSrc + "\nreturn { parseLog, encodeRun, runKey };")();
const runKey = new Function(parserSrc + "\nreturn runKey;")();
const headLine = appJs.slice(appJs.indexOf("const HEAD ="), appJs.indexOf("\n", appJs.indexOf("const HEAD =")));
const HEAD = new Function(headLine + "\nreturn HEAD;")();

const runs = new Map();   // run number -> encoded run
const numOf = f => { const m = /^(\d+)\./.exec(f); return m ? Number(m[1]) : null; };

// 1) already-parsed runs
if (fs.existsSync(rd("runs"))) for (const f of fs.readdirSync(rd("runs"))) {
  const n = numOf(f); if (n == null || !f.endsWith(".json")) continue;
  runs.set(n, JSON.parse(fs.readFileSync(rd("runs/" + f), "utf8")));
}
// 2) logs (a log always wins over an older parsed copy)
if (fs.existsSync(rd("logs"))) for (const f of fs.readdirSync(rd("logs"))) {
  const n = numOf(f); if (n == null || !/\.(log|txt|jsonl)$/i.test(f)) continue;
  const r = parseLog(fs.readFileSync(rd("logs/" + f), "utf8"), f);
  r.id = runKey(r);
  runs.set(n, encodeRun(r));
  console.log(`Parsed logs/${f} as run ${n}`);
}
// 3) details from runs.json
const details = fs.existsSync(rd("runs.json")) ? JSON.parse(fs.readFileSync(rd("runs.json"), "utf8")) : {};
const out = [];
for (const [n, run] of [...runs].sort((a, b) => a[0] - b[0])) {
  const d = details[String(n)] || {};
  const meta = {num: n};
  for (const k of ["date", "seed", "video", "notes", "pacelock"]) if (d[k] != null && d[k] !== "") meta[k] = String(d[k]);
  if (meta.date && !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`runs.json run ${n}: date must look like 2026-09-22`);
  if (meta.video && !/^https?:\/\//i.test(meta.video)) throw new Error(`runs.json run ${n}: video must start with http:// or https://`);
  const intent = {};
  (d.intentionalDeaths || []).forEach(k => { intent[k - 1] = true; });
  (d.notIntentionalDeaths || []).forEach(k => { intent[k - 1] = false; });
  if (Object.keys(intent).length) meta.intent = intent;
  if (d.elytraKm != null) meta.elytraCm = Math.round(Number(d.elytraKm) * 100000);
  const statsFile = rd(`logs/${n}.stats.json`);
  if (fs.existsSync(statsFile)) {
    const v = ((JSON.parse(fs.readFileSync(statsFile, "utf8")).stats || {})["minecraft:custom"] || {})["minecraft:aviate_one_cm"];
    if (v != null) meta.elytraCm = v;
  }
  out.push({...run, meta});
}
for (const n of Object.keys(details)) if (!runs.has(Number(n))) console.warn(`runs.json mentions run ${n}, but there is no logs/${n}.log or runs/${n}.json`);

// 4) icons
const icons = {};
const MIME = {png: "image/png", gif: "image/gif", webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg"};
if (fs.existsSync(rd("icons"))) for (const f of fs.readdirSync(rd("icons"))) {
  const m = /^([a-z0-9_]+)\.(png|gif|webp|jpe?g)$/i.exec(f); if (!m) continue;
  icons[m[1]] = `data:${MIME[m[2].toLowerCase()]};base64,` + fs.readFileSync(rd("icons/" + f)).toString("base64");
}

// 5) assemble the page (same layout the site writes when it republishes itself)
const json = JSON.stringify({runs: out, icons}).replace(/</g, "\\u003c");
const html = "<!doctype html>\n<html lang=\"en\">\n<head>\n" + HEAD + "<style id=\"app-css\">" + appCss + "</style>\n</head>\n<body>\n<div id=\"app\"></div>\n<script type=\"application/json\" id=\"aa-data\">" + json + "</script>\n<script id=\"app-js\">" + appJs + "</script>\n</body>\n</html>\n";
fs.mkdirSync(rd("dist"), {recursive: true});
fs.writeFileSync(rd("dist/index.html"), html);
console.log(`Built dist/index.html: ${out.length} runs, ${Object.keys(icons).length} icons, ${(html.length / 1024).toFixed(0)} KB`);
