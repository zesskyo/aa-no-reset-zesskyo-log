/*
 * compare.js — the Compare page: runs side by side.
 * Pick runs from this site, or read a Hermes play.log right here in the browser (the file is never
 * uploaded anywhere). Runs read from files are remembered in this browser only, and can be saved as a
 * small .json file to send to someone (which can be read back in the same way).
 */
const CMP_MAX = 6;
const CMP_COLORS = ["var(--s0)", "var(--s1)", "var(--s2)", "var(--s3)", "var(--s4)", "var(--s5)"];
const CMP_STORE = "aa-compare-v1";
// Multi-criteria advancements whose finish time is shown under Run stats
const CMP_MULTIS = ["adventure/adventuring_time", "husbandry/complete_catalogue"];
let UPLOADED = [];          // runs read from files: [{run, label}]
let cmpStatus = "";         // message under the upload button

// ---------- Remembered in this browser ----------
function cmpLoad() {
  try {
    const x = JSON.parse(localStorage.getItem(CMP_STORE) || "null"); if (!x) return;
    UPLOADED = (x.uploaded || []).map(u => ({label: String(u.label), run: decodeRun(u.run)}));
    state.cmp = (x.ids || []).filter(cmpFind);
  } catch {}
}
function cmpSave() {
  const ids = state.cmp || [];
  try { localStorage.setItem(CMP_STORE, JSON.stringify({ids, uploaded: UPLOADED.map(u => ({label: u.label, run: encodeRun(u.run)}))})); }
  catch { try { localStorage.setItem(CMP_STORE, JSON.stringify({ids})); } catch {} }   // too big to keep: remember the picks only
}

// ---------- Finding a run by id (this site's runs first, then uploaded ones) ----------
function cmpFind(id) {
  const r = findRun(id); if (r) return {run: r, label: runTitle(r), mine: true};
  const u = UPLOADED.find(x => x.run.id === id); return u ? {run: u.run, label: u.label, mine: false} : null;
}
const cmpDefault = () => { const pb = pbRun(), last = byNumber().pop(); return [...new Set([pb, last].filter(Boolean).map(r => r.id))]; };

// ---------- Reading files ----------
async function cmpFiles(files) {
  if (!files || !files.length) return;
  cmpStatus = T.cmpReading; renderCompare();
  await new Promise(res => setTimeout(res, 30));   // let "Reading…" show before the (slow) read
  const errors = [];
  for (const f of files) {
    try {
      const text = await f.text();
      let run, label = null;
      if (/\.json$/i.test(f.name)) {
        const x = JSON.parse(text); run = decodeRun(x.run || x); label = x.label || null;
        if (!run.events.length || run.finalIgt == null) throw new Error(T.cmpBadJson);
      } else run = parseLog(text, f.name);
      const mine = RUNS.find(r => r.start === run.start && r.finalIgt === run.finalIgt);
      let id;
      if (mine) id = mine.id;
      else {
        id = run.id = String(run.id || "").startsWith("up-") ? run.id : "up-" + runKey(run);
        if (!UPLOADED.some(u => u.run.id === id)) {
          let base = label || run.player || f.name, name = base, k = 2;
          while (UPLOADED.some(u => u.label === name) || RUNS.some(r => runTitle(r) === name)) name = base + " " + k++;
          UPLOADED.push({run, label: name});
        }
      }
      if (!state.cmp.includes(id)) { if (state.cmp.length >= CMP_MAX) state.cmp.pop(); state.cmp.push(id); }
    } catch (e) { errors.push(f.name + ": " + (e && e.message || e)); }
  }
  cmpStatus = errors.join(" · ");
  cmpSave(); renderCompare();
}

// Saves an uploaded run as a small file that can be read back on the Compare page
function cmpDownload(c) {
  const blob = new Blob([JSON.stringify({label: c.label, run: encodeRun(c.run)})], {type: "application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = c.label.replace(/[^A-Za-z0-9_-]+/g, "_") + ".aa-run.json";
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ---------- The page ----------
function renderCompare() {
  const el = $("#view-compare");
  if (!state.cmp) state.cmp = cmpDefault();
  state.cmp = state.cmp.filter(cmpFind);
  const list = state.cmp.map(cmpFind).map((c, i) => ({...c, color: CMP_COLORS[i], d: derive(c.run)}));
  const full = list.length >= CMP_MAX;

  const chips = list.map((c, i) => `
    <div class="cmp-chip" style="--c:${c.color}">
      <span class="swatch" style="background:${c.color}"></span>
      <div style="display:flex;flex-direction:column;min-width:0">
        <b class="clamp">${esc(c.label)}</b>
        <span class="note">${esc(c.d.category)} · <span class="mono">${fmt(c.run.finalIgt, 0)}</span>${c.mine ? "" : " · " + esc(T.cmpUploaded)}</span>
      </div>
      ${c.mine ? "" : `<button type="button" class="btn icon ghost" data-save="${i}" aria-label="${esc(T.cmpSave)} ${esc(c.label)}" title="${esc(T.cmpSave)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 19h16"/></svg></button>`}
      <button type="button" class="btn icon ghost" data-remove="${i}" aria-label="${esc(T.cmpRemove)} ${esc(c.label)}" title="${esc(T.cmpRemove)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </div>`).join("");
  const opt = (id, label) => state.cmp.includes(id) ? "" : `<option value="${esc(id)}">${esc(label)}</option>`;
  const mineOpts = byNumber().map(r => opt(r.id, runTitle(r) + " · " + fmt(r.finalIgt, 0))).join("");
  const upOpts = UPLOADED.map(u => opt(u.run.id, u.label + " · " + fmt(u.run.finalIgt, 0))).join("");

  el.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:6px"><h1>${esc(T.cmpTitle)}</h1><p class="muted" style="margin:0">${esc(T.cmpIntro)}</p></div>
    <section class="card cmp-drop" id="cmpDrop" style="display:flex;flex-direction:column;gap:16px">
      <div class="cmp-chips">${chips || `<span class="muted">${esc(T.cmpNone)}</span>`}</div>
      <div class="cmp-add">
        <select class="field" id="cmpAdd" aria-label="${esc(T.cmpAdd)}"${full ? " disabled" : ""}>
          <option value="">${esc(full ? T.cmpFull(CMP_MAX) : T.cmpAdd)}</option>
          ${mineOpts ? `<optgroup label="${esc(T.cmpMine)}">${mineOpts}</optgroup>` : ""}
          ${upOpts ? `<optgroup label="${esc(T.cmpUploadedRuns)}">${upOpts}</optgroup>` : ""}
        </select>
        <button type="button" class="btn primary" id="cmpPick">${esc(T.cmpUpload)}</button>
        <input type="file" id="cmpFile" accept=".log,.txt,.jsonl,.json" multiple hidden>
        ${UPLOADED.length ? `<button type="button" class="linkbtn" id="cmpForget">${esc(T.cmpForget)}</button>` : ""}
      </div>
      ${cmpStatus ? `<p class="cmp-status" role="status" style="margin:0">${esc(cmpStatus)}</p>` : ""}
    </section>
    ${list.length ? `
    <section class="card tablewrap" style="padding:0">${cmpSplitsTable(list)}</section>
    <section class="card" style="display:flex;flex-direction:column;gap:14px">
      <div class="head-row" style="align-items:center"><h2>${esc(T.progressTitle)}</h2><span class="zoominfo" id="cmpZoomInfo"></span></div>
      <div class="keys"><span>${esc(T.cmpDragZoom)}</span></div>
      ${list.map((c, i) => `<div class="cmp-graph" style="--c:${c.color}">
        <div class="cmp-graphhead"><span class="swatch" style="background:${c.color}"></span><b>${esc(c.label)}</b><span class="cat ${c.d.category.toLowerCase()}">${esc(c.d.category)}</span><span class="mono muted">${fmt(c.run.finalIgt, 0)}</span></div>
        <div class="chartbox" id="cmpTop${i}"></div><div class="chartbox" id="cmpRes${i}"></div>
      </div>`).join("")}
      <div class="legend"><span><i style="background:var(--ow)"></i>${esc(T.overworld)}</span><span><i style="background:var(--ne)"></i>${esc(T.nether)}</span><span><i style="background:var(--en)"></i>${esc(T.theEnd)}</span></div>
    </section>
    <section class="card tablewrap" style="padding:0">${cmpStatsTable(list)}</section>` : ""}`;

  // controls
  $("#cmpAdd").addEventListener("change", e => { const v = e.target.value; if (v && !full) { state.cmp.push(v); cmpSave(); renderCompare(); } });
  $("#cmpPick").addEventListener("click", () => $("#cmpFile").click());
  $("#cmpFile").addEventListener("change", e => cmpFiles([...e.target.files]));
  el.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => { state.cmp.splice(+b.dataset.remove, 1); cmpSave(); renderCompare(); }));
  el.querySelectorAll("[data-save]").forEach(b => b.addEventListener("click", () => cmpDownload(list[+b.dataset.save])));
  if ($("#cmpForget")) $("#cmpForget").addEventListener("click", () => { const up = new Set(UPLOADED.map(u => u.run.id)); UPLOADED = []; state.cmp = state.cmp.filter(id => !up.has(id)); cmpStatus = ""; cmpSave(); renderCompare(); });
  const drop = $("#cmpDrop");
  drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("over"));
  drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("over"); cmpFiles([...e.dataTransfer.files]); });

  if (list.length) drawCompare(list);
}

// ---------- Graphs: each run's own progress graph (same as its Stats page), one under another ----------
// They share the time axis, zoom and hover line, so the same moment lines up in every run.
function drawCompare(list) {
  const endT = Math.max(...list.map(c => c.run.finalIgt));
  const parts = list.map(c => progressParts(c.run, c.d));
  if (state.cmpZoomKey !== state.cmp.join()) { state.cmpZoom = null; state.cmpZoomKey = state.cmp.join(); }
  const draw = () => {
    const [za, zb] = state.cmpZoom || [0, endT];
    $("#cmpZoomInfo").innerHTML = state.cmpZoom ? `${esc(T.showing)} ${fmt(za, 0)}–${fmt(zb, 0)} <button type="button" class="linkbtn" id="cmpReset">${esc(T.reset)}</button>` : "";
    if (state.cmpZoom) $("#cmpReset").addEventListener("click", () => { state.cmpZoom = null; draw(); });
    const shared = {xmin: za, xmaxFix: zb, fitY: !!state.cmpZoom, W: 1280,
      onBrush: (a, b) => { if (b - a < 30000) return; state.cmpZoom = (a <= 0 && b >= endT) ? null : [a, b]; draw(); }};
    const ctls = [];
    parts.forEach((pp, i) => { ctls[i] = mountProgress(pp, $("#cmpTop" + i), $("#cmpRes" + i), shared, 360, 150, t => ctls.forEach((c, k) => { if (k !== i && c) c.showLine(t); })); });
  };
  draw();
}

// ---------- Tables ----------
// Ahead / behind the first run, like LiveSplit: "+1:23" behind (red), "−0:45" ahead (green).
// Pale when this split lost time against the previous one while still ahead (or gained while still behind).
const cmpSigned = d => (d > 0 ? "+" : "−") + fmtShort(Math.abs(d));
const cmpDelta = (v, ref, prev) => {
  if (v == null || ref == null) return "";
  const d = v - ref; if (Math.abs(d) < 1000) return `<span class="delta">±0</span>`;
  const seg = prev != null ? d - prev : null, pale = seg != null && (d < 0 ? seg > 0 : seg < 0);
  return `<span class="delta ${d > 0 ? "pos" : "neg"}${pale ? " pale" : ""}"${seg != null ? ` title="${esc(T.cmpSegment)} ${Math.abs(seg) < 1000 ? "±0" : cmpSigned(seg)}"` : ""}>${cmpSigned(d)}</span>`;
};
const cmpHead = (list, first) => `<thead><tr><th scope="col">${esc(first)}</th>${list.map(c => `<th scope="col"><span class="swatch" style="background:${c.color};margin-right:8px"></span>${esc(c.label)} <span class="cat ${c.d.category.toLowerCase()}" style="margin-left:6px">${esc(c.d.category)}</span></th>`).join("")}</tr></thead>`;

// Splits: the time on the clock when each split was done (like LiveSplit), and how far ahead or behind the first run
function cmpSplitsTable(list) {
  const rowsDef = [
    ...SPLITS.map((s, i) => ({name: s.name, icon: list[0].d.splits[i].icon, at: c => c.d.splits[i].end})),
    {name: T.timeLabel, total: true, at: c => c.run.finalIgt},
  ];
  const prev = list.map(() => null);   // last difference for each run, to tell if a split gained or lost time
  const rows = rowsDef.map(r => `<tr${r.total ? ` class="cmp-total"` : ""}><th scope="row"><span style="display:inline-flex;align-items:center;gap:8px">${r.icon ? ic(r.icon) : ""}${esc(r.name)}</span></th>${list.map((c, k) => {
    const v = r.at(c), ref = r.at(list[0]);
    const cell = `<span class="mono">${v != null ? fmt(v, 0) : "—"}</span>${k ? cmpDelta(v, ref, r.total ? null : prev[k]) : ""}`;
    if (v != null && ref != null && !r.total) prev[k] = v - ref;
    return `<td>${cell}</td>`;
  }).join("")}</tr>`).join("");
  return `<table class="cmp-table">${cmpHead(list, T.splitsTitle)}<tbody>${rows}</tbody></table>`;
}

function cmpStatsTable(list) {
  const timeRow = (icon, name, f) => ({icon, name, cell: (c, k) => { const v = f(c); return `<span class="mono">${v != null ? fmt(v, 0) : "—"}</span>${k ? cmpDelta(v, f(list[0])) : ""}`; }});
  const rows = [
    {icon: null, name: T.cmpAdvancements, cell: c => `<span class="mono">${c.d.comp.length}/${Object.keys(ADV).length}</span>`},
    ...STAT_CARDS.filter(k => k !== "deaths" && k !== "elytra").map(k => ({icon: STAT_DEFS[k].icon, name: STAT_DEFS[k].name(), cell: c => `<span class="mono">${STAT_DEFS[k].one(c.run)}</span>`})),
    {icon: "s_skulls", name: T.skullsSplit, cell: (c, k) => { const v = c.d.skullSplit && c.d.skullSplit.dur; const r = list[0].d.skullSplit && list[0].d.skullSplit.dur; return `<span class="mono">${v != null ? fmtShort(v) : "—"}</span>${k ? cmpDelta(v, r) : ""}`; }},
    ...CMP_MULTIS.map(id => timeRow(MICON[id], advName(id), c => { const m = c.d.multis.find(q => q.id === id); return m ? m.done : null; })),
    timeRow("thunder", T.cmpThunder, c => c.d.thunder),
    {icon: "trident", name: T.hoverRiptide, cell: c => `<span class="mono">${c.d.riptide.length ? T.cmpRiptide(c.d.riptide.reduce((a, r) => a + r.uses, 0), c.d.riptide.length) : "—"}</span>`},
  ];
  return `<table class="cmp-table">${cmpHead(list, T.runStatsTitle)}<tbody>${rows.map(r => `<tr><th scope="row"><span style="display:inline-flex;align-items:center;gap:8px">${r.icon ? ic(r.icon) : ""}${esc(r.name)}</span></th>${list.map((c, k) => `<td>${r.cell(c, k)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
