(() => {
"use strict";
/* ================= static data ================= */
const ADV = {
  "story/root":"Minecraft","story/mine_stone":"Stone Age","story/upgrade_tools":"Getting an Upgrade","story/smelt_iron":"Acquire Hardware",
  "story/obtain_armor":"Suit Up","story/lava_bucket":"Hot Stuff","story/iron_tools":"Isn't It Iron Pick","story/deflect_arrow":"Not Today, Thank You",
  "story/form_obsidian":"Ice Bucket Challenge","story/mine_diamond":"Diamonds!","story/enter_the_nether":"We Need to Go Deeper",
  "story/shiny_gear":"Cover Me with Diamonds","story/enchant_item":"Enchanter","story/cure_zombie_villager":"Zombie Doctor",
  "story/follow_ender_eye":"Eye Spy","story/enter_the_end":"The End?",
  "nether/root":"Nether","nether/return_to_sender":"Return to Sender","nether/find_bastion":"Those Were the Days",
  "nether/obtain_ancient_debris":"Hidden in the Depths","nether/fast_travel":"Subspace Bubble","nether/find_fortress":"A Terrible Fortress",
  "nether/obtain_crying_obsidian":"Who is Cutting Onions?","nether/distract_piglin":"Oh Shiny","nether/ride_strider":"This Boat Has Legs",
  "nether/uneasy_alliance":"Uneasy Alliance","nether/loot_bastion":"War Pigs","nether/use_lodestone":"Country Lode, Take Me Home",
  "nether/netherite_armor":"Cover Me in Debris","nether/get_wither_skull":"Spooky Scary Skeleton","nether/obtain_blaze_rod":"Into Fire",
  "nether/charge_respawn_anchor":"Not Quite \"Nine\" Lives","nether/explore_nether":"Hot Tourist Destinations","nether/summon_wither":"Withering Heights",
  "nether/brew_potion":"Local Brewery","nether/create_beacon":"Bring Home the Beacon","nether/all_potions":"A Furious Cocktail",
  "nether/create_full_beacon":"Beaconator","nether/all_effects":"How Did We Get Here?",
  "end/root":"The End","end/kill_dragon":"Free the End","end/dragon_egg":"The Next Generation","end/enter_end_gateway":"Remote Getaway",
  "end/respawn_dragon":"The End... Again...","end/dragon_breath":"You Need a Mint","end/find_end_city":"The City at the End of the Game",
  "end/elytra":"Sky's the Limit","end/levitate":"Great View From Up Here",
  "adventure/root":"Adventure","adventure/voluntary_exile":"Voluntary Exile","adventure/kill_a_mob":"Monster Hunter","adventure/trade":"What a Deal!",
  "adventure/honey_block_slide":"Sticky Situation","adventure/ol_betsy":"Ol' Betsy","adventure/sleep_in_bed":"Sweet Dreams",
  "adventure/hero_of_the_village":"Hero of the Village","adventure/throw_trident":"A Throwaway Joke","adventure/shoot_arrow":"Take Aim",
  "adventure/kill_all_mobs":"Monsters Hunted","adventure/totem_of_undying":"Postmortal","adventure/summon_iron_golem":"Hired Help",
  "adventure/two_birds_one_arrow":"Two Birds, One Arrow","adventure/whos_the_pillager_now":"Who's the Pillager Now?","adventure/arbalistic":"Arbalistic",
  "adventure/adventuring_time":"Adventuring Time","adventure/very_very_frightening":"Very Very Frightening","adventure/sniper_duel":"Sniper Duel",
  "adventure/bullseye":"Bullseye",
  "husbandry/root":"Husbandry","husbandry/breed_an_animal":"The Parrots and the Bats","husbandry/tame_an_animal":"Best Friends Forever",
  "husbandry/plant_seed":"A Seedy Place","husbandry/tactical_fishing":"Tactical Fishing","husbandry/fishy_business":"Fishy Business",
  "husbandry/bred_all_animals":"Two by Two","husbandry/complete_catalogue":"A Complete Catalogue","husbandry/balanced_diet":"A Balanced Diet",
  "husbandry/obtain_netherite_hoe":"Serious Dedication","husbandry/safely_harvest_honey":"Bee Our Guest","husbandry/silk_touch_nest":"Total Beelocation"
};
const VVF = "adventure/very_very_frightening";
const MULTI = {"adventure/adventuring_time":"AT","husbandry/balanced_diet":"ABD","adventure/kill_all_mobs":"MH","husbandry/bred_all_animals":"2x2","husbandry/complete_catalogue":"ACC"};
const REQ = {"adventure/adventuring_time":42,"husbandry/balanced_diet":39,"adventure/kill_all_mobs":33,"husbandry/bred_all_animals":19,"husbandry/complete_catalogue":11};
const MCOL = {"adv":"var(--s0)","adventure/adventuring_time":"var(--s1)","husbandry/balanced_diet":"var(--s2)","adventure/kill_all_mobs":"var(--s3)","husbandry/bred_all_animals":"var(--s4)","husbandry/complete_catalogue":"var(--s5)"};
const PHASES = [
  {name: "Any%", ends: "Free the End"},
  {name: "Outer End", ends: "Left the End"},
  {name: "Enchanting", ends: "Picked up enchanting table"},
  {name: "Midgame", ends: "Entered the Nether for debris"},
  {name: "Debris", ends: "Back in the Overworld"},
  {name: "Endgame", ends: "Overworld after The End... Again..."},
  {name: "Post-endgame", ends: "Final advancement"}
];
const PCOL = PHASES.map((_, i) => "var(--p" + i + ")");
const PHASE_ICON = ["dragon","chorus","enchant","elytra","debris","bucket",null];
const lastIconKey = comp => { const k = LAST_ICON[(comp[comp.length - 1] || [])[2]]; return k && typeof siteIcons !== "undefined" && okIcon(siteIcons[k]) ? k : "star"; };
const MICON = {"adventure/adventuring_time":"boots","husbandry/balanced_diet":"m_abd","adventure/kill_all_mobs":"m_mh","husbandry/bred_all_animals":"m_2x2","husbandry/complete_catalogue":"m_acc"};
const LAST_ICON = {...MICON, "adventure/throw_trident":"trident","end/respawn_dragon":"dragon","adventure/very_very_frightening":"trident"};
const SERIES = ["#F0A63A","#6CB4EE","#B79CF0","#7FC98A","#E07A55","#C9C4B4","#E8C547","#5FC4C0"];
const PACELOCKS = ["Trident","Weak Midgame Start","Mushroom Island","Nautilus Shells","Bamboo Jungle Hills","Biomes","Igloo"];
const BEACON_BLOCKS = 164;
const HEAD = '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>AA No Reset Solo (Zesskyo&#39;s Log)</title>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap">\n';

/* ================= helpers ================= */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt = (ms, dec = 3) => {
  if (ms == null || isNaN(ms)) return "—";
  const neg = ms < 0; ms = Math.abs(ms);
  const h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000), s = (ms % 60000) / 1000;
  const ss = dec ? s.toFixed(dec).padStart(3 + dec, "0") : String(Math.floor(s)).padStart(2, "0");
  return (neg ? "-" : "") + h + ":" + String(m).padStart(2, "0") + ":" + ss;
};
const fmtShort = ms => {
  if (ms == null || isNaN(ms)) return "—";
  const t = Math.round(Math.abs(ms) / 1000), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60;
  return (h ? h + ":" + String(m).padStart(2, "0") : String(m)) + ":" + String(s).padStart(2, "0");
};
const fmtDelta = ms => (ms > 0 ? "+" : ms < 0 ? "−" : "±") + fmtShort(ms);
const titleCase = s => s.replace(/\b[a-z]/g, c => c.toUpperCase());
const advName = id => ADV[id] || titleCase(id.split("/").pop().replace(/_/g, " "));
const CRIT_RENAME = {"British Shorthair": "British"};
const RARE = [
  {key: "b_mushroom", name: "Mushroom", members: ["mushroom_fields", "mushroom_field_shore"]},
  {key: "b_badlands", name: "Badlands", members: ["badlands", "badlands_plateau", "wooded_badlands_plateau"]},
  {key: "b_jungle", name: "Jungle", members: ["jungle", "jungle_edge", "jungle_hills", "bamboo_jungle", "bamboo_jungle_hills"]},
  {key: "b_snowy", name: "Snowy", members: ["snowy_tundra", "snowy_beach", "snowy_mountains", "snowy_taiga", "snowy_taiga_hills"]},
  {key: "b_megataiga", name: "Mega Taiga", members: ["giant_tree_taiga", "giant_tree_taiga_hills"]}
];
const PHASE_CARDS = [0, 3, 5, 6];   // Any% (dragon kill), Midgame, Endgame, Post-endgame
const critName = c => { const n = titleCase(String(c).replace(/^minecraft:/, "").split("/").pop().replace(/\.png$/, "").replace(/_/g, " ")); return CRIT_RENAME[n] || n; };
const critLabel = (id, c, k, tot) => MULTI[id] ? critName(c) + " (" + (k != null ? k + "/" + tot + " " : "") + MULTI[id] + ")" : advName(id);
const doneAt = r => r.start + (r.finalRta || 0);
const fmtDay = t => new Date(t).toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"});
const deltaSpan = df => df == null ? "" : `<span class="mono delta ${df > 0 ? "pos" : df < 0 ? "neg" : ""}">${fmtDelta(df)}</span>`;
const pct = (a, b) => b ? (a / b * 100).toFixed(1) + "%" : "—";
const num = n => n == null ? "—" : Number(n).toLocaleString();

/* ================= parsing ================= */
function parseLog(text, filename) {
  let start = null, player = null, mc = null, dim = "o";
  const seen = new Set(), done = new Set(), events = [], dims = [], deaths = [];
  const st = {tnt: [], debris: [], skulls: [], ws: [], ench: [], trident: [], nautilus: [], drowned: [], tntHeld: [], campfire: [], gold: [], goldV: 2, rack: [], desert: [], gapple: null, gappleMax: 0};
  const tot = {};
  const inv = {}; let inDesert = false, goldCum = 0, tntCum = 0;
  const TRACK = {
    "minecraft.used:minecraft.tnt": "tnt", "minecraft.mined:minecraft.ancient_debris": "debris",
    "minecraft.picked_up:minecraft.wither_skeleton_skull": "skulls", "minecraft.killed:minecraft.wither_skeleton": "ws",
    "minecraft.picked_up:minecraft.enchanting_table": "ench",
    "minecraft.picked_up:minecraft.trident": "trident", "minecraft.picked_up:minecraft.nautilus_shell": "nautilus", "minecraft.killed:minecraft.drowned": "drowned", "minecraft.used:minecraft.campfire": "campfire"
  };
  const TOT = {
    "minecraft.killed:minecraft.creeper": "creepers", "minecraft.custom:minecraft.damage_taken": "damage",
    "minecraft.custom:minecraft.open_shulker_box": "shulkerOpen", "minecraft.custom:minecraft.open_chest": "chests",
    "minecraft.custom:minecraft.traded_with_villager": "trades", "minecraft.custom:minecraft.mob_kills": "mobKills",
    "minecraft.used:minecraft.tnt": "tnt", "minecraft.mined:minecraft.ancient_debris": "debris",
    "minecraft.picked_up:minecraft.wither_skeleton_skull": "skulls", "minecraft.killed:minecraft.wither_skeleton": "ws",
    "minecraft.custom:minecraft.deaths": "deaths", "minecraft.custom:minecraft.jump": "jumps"
  };
  for (const line of text.split("\n")) {
    if (!line) continue;
    const q = line.indexOf('"type":"'); if (q < 0) continue;
    const type = line.slice(q + 8, line.indexOf('"', q + 8));
    if (type === "inventory_slots" && !line.includes("enchanted_golden_apple") && !line.includes("null")) continue;
    if (!["advancement","dimension","initialize","stat","inside_structures","inventory_slots"].includes(type)) continue;
    let e; try { e = JSON.parse(line); } catch { continue; }
    if (start == null && e.time) start = e.time;
    const igt = e.speedrunigt ? e.speedrunigt.igt : 0, rta = e.speedrunigt ? e.speedrunigt.rta : 0, d = e.data || {};
    if (!player && d.player && d.player.name) player = d.player.name;
    if (type === "initialize") { mc = d.mc_version; if (e.time) start = e.time; }
    else if (type === "dimension") {
      const x = String(d.dimension || "").replace("minecraft:", "");
      dim = x === "the_nether" ? "n" : x === "the_end" ? "e" : "o";
      dims.push([igt, dim]);
    } else if (type === "advancement") {
      if (!d.id || d.id.startsWith("minecraft:recipes/")) continue;
      const id = d.id.replace("minecraft:", ""), key = id + "|" + d.criterion_name;
      if (seen.has(key)) continue;
      seen.add(key); if (d.completed) done.add(id);
      events.push([igt, rta, id, String(d.criterion_name).replace(/^minecraft:/, ""), d.completed ? 1 : 0]);
    } else if (type === "stat") {
      const k = d.stat, diff = Math.max(1, d.diff || 1);
      if (TOT[k]) tot[TOT[k]] = d.value;
      if (TRACK[k]) for (let i = 0; i < diff; i++) st[TRACK[k]].push(igt);
      if (k === "minecraft.custom:minecraft.deaths") deaths.push([igt, dim]);
      let g = 0;
      if (k === "minecraft.mined:minecraft.gold_block" || k === "minecraft.crafted:minecraft.gold_block") g = diff;
      else if (k === "minecraft.used:minecraft.gold_block") g = -diff;
      else if (k === "minecraft.crafted:minecraft.gold_ingot" && diff % 9 === 0) g = -diff / 9;   // blocks broken down into ingots
      if (g) { goldCum += g; st.gold.push([igt, goldCum]); }
      let tg = 0;
      if (k === "minecraft.picked_up:minecraft.tnt" || k === "minecraft.crafted:minecraft.tnt") { tg = diff; tot.tntGot = (tot.tntGot || 0) + diff; }
      else if (k === "minecraft.used:minecraft.tnt") tg = -diff;
      if (tg) { tntCum += tg; st.tntHeld.push([igt, tntCum]); }
      if (k === "minecraft.mined:minecraft.netherrack") {
        const lr = st.rack[st.rack.length - 1];
        if (lr && igt - lr[0] < 2000) lr[1] = d.value; else st.rack.push([igt, d.value]);
      }
      if (/^minecraft\.used:minecraft\.[a-z_]*shulker_box$/.test(k)) tot.shulkerPlaced = (tot.shulkerPlaced || 0) + diff;
    } else if (type === "inside_structures") {
      const now = (d.structures || []).includes("desert_pyramid");
      if (now && !inDesert) st.desert.push(igt);
      inDesert = now;
    } else if (type === "inventory_slots") {
      for (const [slot, v] of Object.entries(d.slots || {})) inv[slot] = v && v.id === "minecraft:enchanted_golden_apple" ? (v.Count || 1) : 0;
      const n = Object.values(inv).reduce((a, b) => a + b, 0);
      if (n > 0 && st.gapple == null) st.gapple = igt;
      st.gappleMax = Math.max(st.gappleMax, n);
    }
  }
  if (!events.length) throw new Error(filename + " has no advancement events. Use the play.log from Hermes.");
  const comp = events.filter(e => e[4]);
  const last = comp.length ? comp[comp.length - 1] : events[events.length - 1];
  return {start: start || Date.now(), player: player || "Unknown", mc: mc || "", finalIgt: last[0], finalRta: last[1],
    critCount: seen.size, events, dims, deaths, st, tot, meta: {}, addedAt: Date.now()};
}
const runKey = r => "run-" + r.start + "-" + String(r.player).replace(/[^A-Za-z0-9_-]/g, "");
const encodeRun = r => { const {_d, src, ...x} = r; return {...x, events: r.events.map(e => e.join("|"))}; };
const decodeRun = (x, src) => ({meta: {}, st: {}, tot: {}, deaths: [], ...x, src,
  events: (x.events || []).map(s => { if (Array.isArray(s)) return s; const p = String(s).split("|"); return [+p[0], +p[1], p[2], p.slice(3, -1).join("|"), +p[p.length - 1]]; }),
  dims: (x.dims || []).map(s => Array.isArray(s) ? s : [+String(s).split("|")[0], String(s).split("|")[1]])});

/* ================= derived stats ================= */
const advTime = (run, id) => { const e = run.events.find(x => x[2] === id && x[4]); return e ? e[0] : null; };
const firstDimAfter = (run, t, pred) => { if (t == null) return null; const d = run.dims.find(x => x[0] > t && pred(x[1])); return d ? d[0] : null; };
function clusters(times, gap) {
  const out = []; for (const t of times) { const c = out[out.length - 1]; if (c && t - c[c.length - 1] <= gap) c.push(t); else out.push([t]); } return out;
}
function derive(run) {
  if (run._d) return run._d;
  const comp = run.events.filter(e => e[4]);
  const doneSet = new Set(comp.map(e => e[2]));
  const missing = Object.keys(ADV).filter(k => !doneSet.has(k));
  const category = !missing.length ? "Thunderful" : missing.length === 1 && missing[0] === VVF ? "Thunderless" : "Invalid";
  const st = run.st || {};
  // --- phase boundaries ---
  const kd = advTime(run, "end/kill_dragon"), gw = advTime(run, "end/enter_end_gateway");
  const anyUsesGateway = kd == null || (gw != null && kd > gw);
  const anyEnd = anyUsesGateway ? gw : kd;
  const lootDone = advTime(run, "end/elytra") ?? advTime(run, "end/find_end_city");
  let outerEnd = null;
  if (lootDone != null) { const i = run.dims.findIndex(x => x[0] > lootDone && x[1] !== "e"); if (i >= 0) outerEnd = run.dims[i][0]; }
  const enchFrom = outerEnd ?? anyEnd ?? 0;
  const pick = (st.ench || []).filter(t => t > enchFrom);
  const enchCluster = pick.length ? clusters(pick, 15 * 60000)[0] : null;
  const enchDone = enchCluster ? enchCluster[enchCluster.length - 1] : null;
  const debrisCl = (st.debris || []).length ? clusters(st.debris, 10 * 60000).sort((a, b) => b.length - a.length)[0] : null;
  let debrisStart = null, endgameStart = null;
  if (debrisCl) {
    const d0 = debrisCl[0];
    const netherIn = run.dims.filter(x => x[0] <= d0 && x[1] === "n").pop();
    const nIn = netherIn && (enchDone == null || netherIn[0] >= enchDone) ? netherIn[0] : null;
    const firstRack = nIn != null ? (st.rack || []).find(p => p[0] >= nIn && p[0] <= d0) : null;
    debrisStart = firstRack ? firstRack[0] : nIn != null ? nIn : d0;
    endgameStart = firstDimAfter(run, debrisCl[debrisCl.length - 1], x => x === "o");
  }
  const ea = advTime(run, "end/respawn_dragon");
  let postStart = firstDimAfter(run, ea, x => x === "o");
  if (postStart != null && run.finalIgt - postStart < 5 * 60000) postStart = null;   // short post-endgame is fused into endgame
  // Endgame can start before debris: placing a campfire (setting up bees) after midgame starts
  // begins Endgame, which is then paused while debris is done and resumes back in the Overworld.
  const dimAt = t => { const x = run.dims.filter(q => q[0] <= t).pop(); return x ? x[1] : "o"; };
  const campT = (st.campfire || []).find(t => t > (enchDone ?? Infinity));
  const earlyEnd = campT != null && debrisStart != null && campT < debrisStart;
  const endEnd = postStart ?? run.finalIgt;
  const seg = (a, b) => a != null && b != null && b >= a ? [[a, b]] : [];
  const segsFor = [
    seg(0, anyEnd), seg(anyEnd, outerEnd), seg(outerEnd, enchDone),
    seg(enchDone, earlyEnd ? campT : debrisStart),
    seg(debrisStart, endgameStart),
    earlyEnd ? [...seg(campT, debrisStart), ...seg(endgameStart, endEnd)] : seg(endgameStart, endEnd),
    postStart != null ? seg(postStart, run.finalIgt) : []
  ];
  const phases = PHASES.map((p, i) => {
    const sg = segsFor[i], ok = sg.length > 0;
    return {name: p.name, ends: i === 0 && anyUsesGateway ? "Remote Getaway (approx.)" : p.ends, segs: sg, start: ok ? sg[0][0] : null, end: ok ? sg[sg.length - 1][1] : null,
      dur: ok ? sg.reduce((a, g) => a + g[1] - g[0], 0) : null, obsolete: i === 6 && postStart == null, icon: i < 6 ? PHASE_ICON[i] : lastIconKey(comp), paused: i === 5 && earlyEnd};
  });
  // --- deaths ---
  const intent = (run.meta && run.meta.intent) || {};
  const deaths = (run.deaths || []).map((d, i) => {
    const auto = ea != null && d[0] >= ea;           // deaths after The End... Again... count as intentional
    return {t: d[0], dim: d[1], intentional: intent[i] != null ? !!intent[i] : auto, i};
  });
  // --- multi-criteria ---
  const multis = Object.keys(MULTI).map(id => {
    const xs = run.events.filter(e => e[2] === id); if (!xs.length) return null;
    const dn = xs.find(e => e[4]);
    return {id, n: xs.length, tot: dn ? xs.length : REQ[id], first: xs[0][0], done: dn ? dn[0] : null, last: xs[xs.length - 1][3], xs};
  }).filter(Boolean);
  // --- other stats ---
  const skulls = st.skulls || [], ws = (st.ws || []).filter(t => anyEnd == null || t > anyEnd);   // wither skeletons killed during Any% don't count
  const skullEnd = skulls.length ? skulls[skulls.length - 1] : null;
  const wsAtSkulls = skullEnd != null ? ws.filter(t => t <= skullEnd).length : ws.length;
  const temples = clusters(st.desert || [], 3 * 60000);
  const beaconT = advTime(run, "nether/create_full_beacon");
  const gold = st.goldV === 2 ? (st.gold || []) : [];
  const prog = new Map(); multis.forEach(m => m.xs.forEach((e, k) => prog.set(e, [k + 1, m.tot])));
  const debrisPhase = phases[4];
  // pickups right after a death are usually the dropped items being collected again, so skip them
  const deathT = (run.deaths || []).map(x => x[0]);
  const obtains = key => (st[key] || []).filter(t => !deathT.some(dt => t >= dt && t - dt < 120000));
  const inDebris = arr => debrisPhase.start == null ? [] : (arr || []).filter(t => t >= debrisPhase.start && t <= debrisPhase.end);
  const tntD = inDebris(st.tnt).length, debD = inDebris(st.debris).length;
  const skullsGot = obtains("skulls"), shells = obtains("nautilus");
  // Skull split: from the first real wither skeleton session until the 3rd skull. Only time spent actively
  // farming counts: a gap of more than a minute without a kill or skull, a dimension change, or a death pauses it.
  let skullSplit = null;
  if (skullsGot.length && ws.length) {
    const endS = skullsGot[Math.min(2, skullsGot.length - 1)];
    const nether = []; run.dims.forEach((x, i) => { if (x[1] === "n") nether.push([x[0], i + 1 < run.dims.length ? run.dims[i + 1][0] : run.finalIgt]); });
    const kills = ws.filter(t => t <= endS);
    let startT = null;
    for (const iv of nether) {
      const k = kills.filter(t => t >= iv[0] && t <= iv[1]).length, sk = skullsGot.some(t => t >= iv[0] && t <= iv[1] && t <= endS);
      if (k >= 3 || sk) { startT = Math.min(kills.find(t => t >= iv[0] && t <= iv[1]) ?? Infinity, skullsGot.find(t => t >= iv[0]) ?? Infinity); break; }
    }
    if (startT == null || !isFinite(startT)) startT = kills[0] ?? skullsGot[0];
    const evs = [...kills, ...skullsGot.filter(t => t <= endS)].filter(t => t >= startT).sort((a, b) => a - b);
    const breaks = [...run.dims.map(x => x[0]), ...(run.deaths || []).map(x => x[0])];
    const segs = [];
    evs.forEach(t => {
      const g = segs[segs.length - 1];
      if (g && t - g[1] <= 60000 && !breaks.some(bk => bk > g[1] && bk <= t)) g[1] = t; else segs.push([t, t]);
    });
    const dur = segs.reduce((a, g) => a + (g[1] - g[0]), 0);
    skullSplit = {segs, dur, start: startT, end: endS};
  }
  // Rare Adventuring Time biome groups: each visit is a burst of that group's criteria
  const atEv = run.events.filter(e => e[2] === "adventure/adventuring_time");
  const got = id => { const e = run.events.find(x => x[2] === "husbandry/bred_all_animals" && x[3] === id); return e ? e[0] : null; };
  const rare = RARE.map(g => {
    const evs = atEv.filter(e => g.members.includes(e[3]));
    const have = new Set();
    const visits = clusters(evs.map(e => e[0]), 10 * 60000).map(ts => {
      const crit = evs.filter(e => ts.includes(e[0])).map(e => e[3]); crit.forEach(c => have.add(c));
      return {t: ts[0], tEnd: ts[ts.length - 1], crit, complete: g.members.every(m => have.has(m)), missing: g.members.filter(m => !have.has(m))};
    });
    const doneV = visits.find(v => v.complete);
    const doneT = doneV ? doneV.tEnd : null;
    return {...g, visits, done: doneT, first: evs.length ? evs[0][0] : null, missing: g.members.filter(m => !have.has(m))};
  });
  return run._d = {comp, missing, category, phases, deaths, multis, prog, skullRate: {skulls: skulls.length, kills: wsAtSkulls}, temples, gold, beaconT, debrisPhase,
    lanes: {trident: obtains("trident"), skull: obtains("skulls"), nautilus: obtains("nautilus")}, tntPer: debD ? tntD / debD : null, tntD, debD, skullSplit, rare};
}
const isValid = r => derive(r).category !== "Invalid";
const phaseMark = (p, i) => i <= 1 ? p.end : p.start;
const hasPost = r => derive(r).phases[6].dur != null;
const byCat = (pool, cat) => pool.filter(r => derive(r).category === cat).sort((a, b) => a.finalIgt - b.finalIgt)[0] || null;
function pbRun(pool) { pool = pool || (siteRuns.length ? siteRuns : localRuns); return pool.filter(isValid).sort((a, b) => a.finalIgt - b.finalIgt)[0] || null; }
function bestPhases() {
  return PHASES.map((p, i) => {
    let best = null;
    for (const r of allRuns().filter(isValid)) { const d = derive(r).phases[i].dur; if (d != null && (best == null || d < best.dur)) best = {dur: d, run: r}; }
    return best;
  });
}
const nonIntentional = r => derive(r).deaths.filter(d => !d.intentional).length;

/* ================= data & storage ================= */
let DATA = {runs: []};
try { DATA = JSON.parse(document.getElementById("aa-data").textContent) || DATA; } catch {}
let siteRuns = (DATA.runs || []).map(x => decodeRun(x, "site"));
let siteIcons = (DATA.icons && typeof DATA.icons === "object") ? DATA.icons : {};
const ICON_SLOTS = [
  ["Phases", [["dragon","Any%"],["chorus","Outer End"],["enchant","Enchanting"],["elytra","Midgame"],["debris","Debris"],["bucket","Endgame"]]],
  ["Multi-criteria advancements (also used for Post-endgame when one is the last advancement)", [["boots","Adventuring Time (AT)"],["m_abd","A Balanced Diet (ABD)"],["m_mh","Monsters Hunted (MH)"],["m_2x2","Two by Two (2x2)"],["m_acc","A Complete Catalogue (ACC)"]]],
  ["Rare biomes (on the Adventuring Time line)", [["b_mushroom","Mushroom"],["b_badlands","Badlands"],["b_jungle","Jungle"],["b_snowy","Snowy"],["b_megataiga","Mega Taiga"]]],
  ["Other Post-endgame endings", [["trident","A Throwaway Joke"],["star","Anything else"]]],
  ["Graph (markers sit on the Advancements line)", [["skull","Death marker"],["trident","Trident obtained (shares A Throwaway Joke's icon)"],["s_skulls","Skull obtained (shares the skulls stat icon)"],["g_nautilus","Nautilus shell obtained"],["s_gapple","First god apple"]]],
  ["Stats", [["s_deaths","Deaths"],["s_elytra","Elytra distance"],["s_skulls","Skulls / wither skeletons"],["s_tnt","TNT (paired with debris for TNT per debris)"],["s_debris","Debris (paired with TNT)"],["s_shulker","Shulker boxes opened"],["s_creepers","Creepers killed"]]]
];
const okIcon = v => typeof v === "string" && /^data:image\/(png|webp|gif|jpeg);base64,[A-Za-z0-9+\/=]+$/.test(v);
const ic = (key, icons = siteIcons) => okIcon(icons[key]) ? `<img class="ico" src="${icons[key]}" width="20" height="20" alt="">` : "";
const icAt = (key, x, y, size) => okIcon(siteIcons[key]) ? `<image href="${siteIcons[key]}" x="${x}" y="${y}" width="${size}" height="${size}" style="image-rendering:pixelated"/>` : "";
const LS = "aa-run-tracker-local-runs-v2";
let localRuns = [];
// Viewers no longer upload their own runs; only the developer's published runs are shown.
const saveLocal = () => { try { localStorage.setItem(LS, JSON.stringify(localRuns.map(encodeRun))); return true; } catch { return false; } };
const allRuns = () => [...siteRuns, ...localRuns].sort((a, b) => b.start - a.start);
const uid = r => r.src + ":" + r.id;
const findRun = u => allRuns().find(r => uid(r) === u);
function runNum(r) {
  if (r.meta && r.meta.num) return r.meta.num;
  const pool = (r.src === "site" ? siteRuns : localRuns).slice().sort((a, b) => a.start - b.start);
  return pool.indexOf(r) + 1;
}
const runTitle = r => (r.src === "local" ? "Your run " : "Run ") + runNum(r);
const runDay = r => { const m = r.meta && r.meta.date; if (m && /^\d{4}-\d{2}-\d{2}$/.test(m)) { const [y, mo, da] = m.split("-").map(Number); return fmtDay(new Date(y, mo - 1, da).getTime()); } return fmtDay(doneAt(r)); };
const isoDay = r => { const m = r.meta && r.meta.date; if (m) return m; const x = new Date(doneAt(r)); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
const okUrl = u => typeof u === "string" && /^https?:\/\/[^\s"'<>]+$/i.test(u);
const videoLink = (r, big) => okUrl(r.meta && r.meta.video) ? `<a class="vlink${big ? " big" : ""}" href="${esc(r.meta.video)}" target="_blank" rel="noopener noreferrer" aria-label="Watch the video of ${esc(runTitle(r))}" title="Watch the video"><svg width="${big ? 18 : 14}" height="${big ? 18 : 14}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>${big ? "Video" : ""}</a>` : "";
const hundred = c => c === "Thunderful" ? "Yes" : c === "Thunderless" ? "No" : "Invalid";
const HUNDRED_NOTE = `<div class="footnote"><b>100%:</b> No = thunderless* (79/80 adv.) unless otherwise stated.<br>*The player is incentivised to prioritise obtaining a Trident enchanted with Channeling, and to not have slept**.<br>**If the player has slept, they must wait at least 10 minutes (min. weather cycle) until they can declare a "thunderless" run.</div>`;

let artifactNs = null, canPublish = false, roleKnown = false, downloadsNs = null;
function buildHtml(data) {
  const css = document.getElementById("app-css").textContent;
  const js = document.getElementById("app-js").textContent;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return "<!doctype html>\n<html lang=\"en\">\n<head>\n" + HEAD + "<style id=\"app-css\">" + css + "</sty" + "le>\n</head>\n<body>\n<div id=\"app\"></div>\n<script type=\"application/json\" id=\"aa-data\">" + json + "</scr" + "ipt>\n<script id=\"app-js\">" + js + "</scr" + "ipt>\n</body>\n</html>\n";
}
async function publishSite(nextRuns, flash, icons = siteIcons) {
  const data = {runs: nextRuns.map(encodeRun), icons};
  try { sessionStorage.setItem("aa-flash", flash); } catch {}
  const attempt = () => artifactNs.publish(buildHtml(data));
  try { await attempt(); return {ok: true}; }
  catch (e) {
    try { sessionStorage.removeItem("aa-flash"); } catch {}
    const code = e && e.code;
    if (code === "conflict") return {ok: true};
    if (["not_writer","not_granted","not_declared","consent_required","capability_disabled","capability_removed"].includes(code)) { canPublish = false; renderHeader(); return {ok: false, readOnly: true}; }
    if (code === "upstream_error") {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 800));
      try { try { sessionStorage.setItem("aa-flash", flash); } catch {} await attempt(); return {ok: true}; } catch { return {ok: false, msg: "Publishing failed. Try again in a moment."}; }
    }
    if (code === "too_large") return {ok: false, msg: "The site is too large to publish. Delete some older runs first."};
    if (code === "rate_limited") return {ok: false, msg: "Publishing too often. Wait a minute and try again."};
    return {ok: false, msg: "Publishing failed (" + (code || "unknown") + ")."};
  }
}
async function saveRunMeta(run, meta, flash) {
  if (run.src === "local") { run.meta = meta; run._d = null; saveLocal(); render(); return {ok: true}; }
  const next = siteRuns.map(r => r === run ? {...r, meta} : r);
  return publishSite(next, flash);
}

/* ================= state & shell ================= */
const state = {sort: {key: "num", dir: 1}, f100: "all", view: "runs", runId: null, selected: new Set(), mode: "adv", baseline: "pb", focus: null, zoom: null, zoomRun: null};
let fsKeyHandler = null, fsResize = null, chartKeys = null;
document.addEventListener("keydown", e => {
  if (state.view !== "run" || !chartKeys || e.ctrlKey || e.metaKey || e.altKey) return;
  const tg = e.target; if (tg && (tg.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(tg.tagName))) return;
  if (chartKeys(e)) e.preventDefault();
});
document.getElementById("app").innerHTML = `
<header class="top">
  <div class="brand">
    <b>AA No Reset Solo <span class="muted" style="font-weight:500">(Zesskyo&#39;s Log)</span></b>
  </div>
  <nav class="tabs" aria-label="Views">
    <button data-view="runs" aria-current="page">Overview</button>
    <button data-view="run">Stats</button>
  </nav>
  <span class="role" id="role"><span class="dot"></span><span id="roleText">Checking access…</span></span>
</header>
<main id="view-runs">
  <section class="hero viewer" id="hero">
    <label class="drop" id="drop" for="logfile">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent)" aria-hidden="true"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>
      <strong>Drop Hermes play.log files</strong>
      <span class="muted" id="dropHint">Or click to choose. Several at once is fine.</span>
      <input id="logfile" type="file" accept=".log,.txt,.jsonl" multiple>
      <span class="status" id="status" role="status" aria-live="polite"></span>
    </label>
    <div class="card" id="pbCard"></div>
  </section>
  <section style="display:flex;flex-direction:column;gap:14px">
    <h2>Splits</h2>
    <div class="grid-phases" id="bestPhases"></div>
  </section>
  <section style="display:flex;flex-direction:column;gap:14px">
    <h2>Other splits</h2>
    <div class="grid-phases" id="otherSplits"></div>
  </section>
  <section id="aggregates"></section>
  <section style="display:flex;flex-direction:column;gap:14px">
    <div class="head-row"><h2 style="font-size:28px">Runs</h2><span id="exportBox"></span></div>
    <div class="card tablewrap" style="padding:0" id="runsTable"></div>
  </section>
</main>
<main id="view-run" class="hidden"></main>
<main id="view-compare" class="hidden"></main>`;

function renderHeader() {
  $("#role").classList.toggle("dev", canPublish);
  $("#role").classList.toggle("hidden", !canPublish);
  $("#roleText").textContent = "Developer: uploads publish to the site";
  $("#hero").classList.toggle("viewer", !canPublish);
  $("#dropHint").textContent = "Or click to choose. New runs are published to the site for everyone who opens it.";
  const box = $("#exportBox");
  box.innerHTML = canPublish && downloadsNs ? `<button type="button" class="btn" id="exportBtn">Download site file</button><span class="status" id="exportMsg" role="status" aria-live="polite"></span>` : "";
  const eb = $("#exportBtn");
  if (eb) eb.addEventListener("click", async () => {
    const msg = $("#exportMsg");
    try { await downloadsNs.save({filename: "index.html", data: buildHtml({runs: siteRuns.map(encodeRun), icons: siteIcons})}); msg.className = "status"; msg.textContent = ""; }
    catch (e) { if (e && e.code === "declined") return; msg.className = "status err"; msg.textContent = "Couldn't save the file here."; }
  });
}
function go(view, runId) {
  state.view = view; if (runId) state.runId = runId;
  document.querySelectorAll("nav.tabs button").forEach(b => b.setAttribute("aria-current", b.dataset.view === view ? "page" : "false"));
  ["runs", "run", "compare"].forEach(v => $("#view-" + v).classList.toggle("hidden", v !== view));
  render(); window.scrollTo(0, 0);
}
document.querySelectorAll("nav.tabs button").forEach(b => b.addEventListener("click", () => go(b.dataset.view)));

/* ================= upload ================= */
const drop = $("#drop"), input = $("#logfile"), status = $("#status");
async function handleFiles(files) {
  files = [...files]; if (!files.length || !canPublish) return;
  status.className = "status"; const msgs = [], parsed = [];
  for (const f of files) {
    status.textContent = "Reading " + f.name + "…";
    await new Promise(r => setTimeout(r, 20));
    try { const r = parseLog(await f.text(), f.name); r.id = runKey(r); parsed.push(r); }
    catch (e) { status.className = "status err"; msgs.push(e.message || (f.name + " could not be read.")); }
  }
  input.value = "";
  if (!parsed.length) { status.textContent = msgs.join(" "); return; }
  if (canPublish) {
    const next = [...siteRuns.filter(r => !parsed.some(p => p.id === r.id)), ...parsed.map(p => { const old = siteRuns.find(r => r.id === p.id); return old ? {...p, meta: old.meta} : p; })];
    status.textContent = "Publishing " + parsed.length + " run" + (parsed.length > 1 ? "s" : "") + "…";
    const res = await publishSite(next, "Published " + parsed.length + " run" + (parsed.length > 1 ? "s" : "") + " to the site.");
    if (res.ok) return;
    if (!res.readOnly) { status.className = "status err"; status.textContent = res.msg; return; }
    msgs.push("You can't publish to this site, so these runs were kept in this browser instead.");
  }
  for (const r of parsed) {
    const old = localRuns.find(x => x.id === r.id);
    const lr = decodeRun(encodeRun({...r, meta: old ? old.meta : {}}), "local");
    localRuns = [...localRuns.filter(x => x.id !== r.id), lr];
    const d = derive(lr);
    msgs.push("Added " + runDay(r) + ": " + d.category + ", " + fmt(r.finalIgt) + ".");
  }
  if (!saveLocal()) msgs.push("This browser blocked local storage, so these runs will disappear when you close the page.");
  state.runId = "local:" + parsed[parsed.length - 1].id;
  status.textContent = msgs.join(" ");
  render();
}
input.addEventListener("change", () => handleFiles(input.files));
["dragenter", "dragover"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", e => handleFiles(e.dataTransfer.files));

/* ================= charts ================= */
function chartSVG({series, W = 1280, H = 460, strip = null, bands = null, deaths = null, yKey = "adv", mini = false, ref = null, xmin = 0, xmaxFix = null, ystepFix = null, rug = null, rugLabel = null, noY = false, lanes = null, markers = null, markersDim = false, fitY = false, noXAxis = false, clean = false, bandLabels = true, title = null, vlines = null, xFmt = null, padRFix = null}) {
  const hasR = series.some(s => s.axis === "r");
  const laneH = lanes ? lanes.length * 22 + 6 : 0, hasLabels = series.some(s => s.label || s.endLabel);
  const padL = mini ? 0 : (lanes ? 78 : noY ? 12 : 48), padR = padRFix ?? (mini ? 0 : (hasLabels ? (clean ? 120 : 150) : hasR && !noY ? 56 : 16)), padT = mini ? 2 : (bands && bandLabels ? 30 : title ? 24 : 16), padB = mini ? 2 : (noXAxis ? 8 : 34), stripH = strip ? 22 : 0, rugH = rug ? 16 : 0;
  const iw = W - padL - padR, ih = H - padT - padB - stripH - rugH - laneH;
  let xmax = 0, ymax = ref ? ref.v : 0;
  let ymaxR = 0;
  for (const s of series) {
    const p = s.points; if (!p.length) continue;
    xmax = Math.max(xmax, p[p.length - 1][0]);
    const vis = fitY && xmaxFix != null ? p.filter(q => q[0] <= xmaxFix) : p;
    const top = vis.length ? Math.max(...vis.map(q => q[1])) : 0;
    if (s.dim && fitY) continue;
    if (s.axis === "r") ymaxR = Math.max(ymaxR, top); else ymax = Math.max(ymax, top);
  }
  const hr = 3600000, span = (xmaxFix ?? xmax) - xmin;
  const step = span > 3 * hr ? 1800000 : span > hr ? 900000 : span > 20 * 60000 ? 300000 : span > 5 * 60000 ? 60000 : span > 90000 ? 15000 : 5000;
  xmax = xmaxFix ?? Math.max(xmin + step, Math.ceil(xmax / step) * step);
  const ystep = ystepFix || (yKey === "adv" ? (ymax > 120 ? 40 : ymax > 40 ? 20 : ymax > 16 ? 5 : 2) : yKey === "res" ? (ymax > 100 ? 50 : ymax > 40 ? 20 : ymax > 16 ? 5 : 2) : 50); ymax = Math.max(ystep, Math.ceil(ymax / ystep) * ystep);
  const rstep = ymaxR > 2000 ? 500 : ymaxR > 500 ? 200 : ymaxR > 100 ? 50 : 10; ymaxR = Math.max(rstep, Math.ceil(ymaxR / rstep) * rstep);
  const X = t => padL + (t - xmin) / (xmax - xmin) * iw, Y = v => padT + ih - v / ymax * ih, YR = v => padT + ih - v / ymaxR * ih;
  const hot = [];
  const cid = "cp" + (++clipSeq), XC = t => Math.min(Math.max(X(t), padL), W - padR);
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Progress over in-game time"><defs><clipPath id="${cid}"><rect x="${padL}" y="0" width="${iw}" height="${H}"/></clipPath><clipPath id="${cid}y"><rect x="${padL}" y="${padT - 3}" width="${iw}" height="${ih + 6}"/></clipPath></defs><g clip-path="url(#${cid})">`;
  if (bands) bands.forEach((b, i) => {
    if (b.end == null || b.start == null) return;
    const w = X(b.end) - X(b.start), wv = XC(b.end) - XC(b.start);
    o += `<rect class="c-band${b.ci ?? i}" x="${X(b.start)}" y="${padT}" width="${Math.max(w, 0)}" height="${ih}"/>`;
    o += `<line class="c-bandline" x1="${X(b.end)}" x2="${X(b.end)}" y1="${padT - 22}" y2="${padT + ih}"/>`;
    if (bandLabels && wv > 70) o += `<text class="c-bandtext" x="${XC(b.start) + 6}" y="${padT - 10}">${esc(b.name)}</text>`;
  });
  o += "</g>";
  if (title) o += `<text class="c-bandtext" x="${padL}" y="${padT - 8}">${esc(title)}</text>`;
  if (!mini) {
    for (let v = 0; v <= ymax; v += ystep) o += `<line class="c-grid" x1="${padL}" x2="${W - padR}" y1="${Y(v)}" y2="${Y(v)}"/>` + (noY ? "" : `<text class="c-ax" x="${padL - 10}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`);
    if (hasR && !noY) for (let v = 0; v <= ymaxR; v += rstep) o += `<text class="c-ax" x="${W - padR + 8}" y="${YR(v) + 4}">${v}</text>`;
    if (!noXAxis) for (let t = Math.ceil(xmin / step) * step; t <= xmax; t += step) o += `<text class="c-ax" x="${X(t)}" y="${H - 8}" text-anchor="middle">${xFmt ? xFmt(t) : step < 60000 ? fmt(t, 0) : Math.floor(t / hr) + ":" + String(Math.round(t % hr / 60000)).padStart(2, "0")}</text>`;
  }
  if (ref) o += `<line class="c-ref" x1="${padL}" x2="${W - padR}" y1="${Y(ref.v)}" y2="${Y(ref.v)}"/><text class="c-reftext" x="${padL + 6}" y="${Y(ref.v) - 6}">${esc(ref.label)}</text>`;
  o += `<g clip-path="url(#${cid})">`;
  if (deaths) deaths.forEach(d => {
    o += `<line class="c-death" x1="${X(d.t)}" x2="${X(d.t)}" y1="${padT + 8}" y2="${padT + ih}"/>` + (icAt("skull", X(d.t) - 9, padT - 10, 18) || `<circle cx="${X(d.t)}" cy="${padT}" r="5" class="c-deathm"/>`);
    if (d.text) hot.push({x: X(d.t), y: padT, text: d.text, t: d.t});
  });
  const usedLY = [], endLabels = [];
  series.forEach(s => {
    if (!s.points.length) return;
    const YY = s.axis === "r" ? YR : Y;
    let d = `M${X(Math.max(xmin, s.points[0][0] > xmin && s.key && s.key !== "adv" ? s.points[0][0] : xmin)).toFixed(1)},${YY(0)}`;
    for (const [t, v] of s.points) d += ` H${X(t).toFixed(1)} V${YY(v).toFixed(1)}`;
    const l = s.points[s.points.length - 1];
    if (xmaxFix != null && s.extend !== false) d += ` H${X(Math.min(xmax, s.until ?? xmax)).toFixed(1)}`;
    const op = s.dim ? ";opacity:.13" : s.soft ? ";opacity:.75" : "";
    o += `<path clip-path="url(#${cid}y)" d="${d}" fill="none" style="stroke:${s.color}${op}"${s.dash ? ` stroke-dasharray="${s.dash}"` : ""} stroke-width="${s.w || (mini ? 1.75 : 2.25)}" stroke-linejoin="round"/>`;
    if (!mini && !clean) o += `<circle clip-path="url(#${cid}y)" cx="${X(l[0])}" cy="${YY(l[1])}" r="${s.w && s.w < 2 ? 3 : 4}" style="fill:${s.color}${op}"/>`;
    if (s.endLabel && !s.dim) { const lv = lastBefore(s.points, xmax); endLabels.push({y: YY(lv ? lv[1] : 0), text: s.endLabel(lv ? lv[1] : 0), color: s.color, strong: s.key === "adv" || (!s.soft)}); }
    if (s.label) { o += "</g>"; let ly = YY(l[1]) + 4; while (usedLY.some(u => Math.abs(u - ly) < 15)) ly += 15; usedLY.push(ly); o += `<text class="c-endlabel" x="${W - padR + 8}" y="${ly}" style="fill:${s.color}">${esc(s.label)}</text>`; o += `<g clip-path="url(#${cid})">`; }
  });
  if (markers) { o += `<g style="opacity:${markersDim ? .14 : 1}">`; markers.filter(m => Y(m.v) >= padT - 2).forEach(m => {
    const cy = m.end || m.faded != null ? Y(m.v) : Y(m.v) - 12;
    const g0 = m.faded ? `<g style="opacity:.4">` : "", g1 = m.faded ? "</g>" : "";
    o += g0 + (icAt(m.icon, X(m.t) - 10, cy - 10, 20) || `<circle cx="${X(m.t)}" cy="${cy}" r="${m.end ? 4.5 : 5}" style="fill:${m.color};stroke:var(--surface);stroke-width:1.5"/>`) + g1;
    if (!markersDim && m.text && m.t >= xmin && m.t <= xmax) hot.push({x: X(m.t), y: cy, text: m.text, sub: m.sub, t: m.realT ?? m.t});
  }); o += "</g>"; }
  if (vlines) vlines.forEach(v => { o += `<line class="c-pause" x1="${X(v.t)}" x2="${X(v.t)}" y1="${padT}" y2="${padT + ih}"/><text class="c-pausetext" x="${X(v.t) + 4}" y="${padT + 12}">${esc(v.label)}</text>`; });
  if (rug) { const ry = padT + ih + 4; rug.forEach(t => { o += `<line class="c-tnt" x1="${X(t)}" x2="${X(t)}" y1="${ry}" y2="${ry + 10}"/>`; }); if (rugLabel) o += `</g><text class="c-endlabel c-tntlabel" x="${W - padR + 8}" y="${ry + 9}">${esc(rugLabel)}</text><g clip-path="url(#${cid})">`; }
  if (lanes) lanes.forEach((ln, li) => {
    const ly = padT + ih + 10 + li * 22;
    o += `<line class="c-grid" x1="${padL}" x2="${W - padR}" y1="${ly + 9}" y2="${ly + 9}"/><text class="c-lanelabel" x="${padL - 8}" y="${ly + 13}" text-anchor="end">${esc(ln.label)} ${ln.times.length}</text>`;
    ln.times.forEach(t => { o += icAt(ln.icon, X(t) - 9, ly, 18) || `<circle cx="${X(t)}" cy="${ly + 9}" r="5" style="fill:${ln.color}"/>`; });
  });
  if (strip) {
    const col = {o: "c-ow", n: "c-ne", e: "c-en"}, sy = padT + ih + laneH + 8;
    strip.segs.forEach((s, i) => {
      const e = i + 1 < strip.segs.length ? strip.segs[i + 1][0] : strip.end;
      o += `<rect class="${col[s[1]]}" x="${X(s[0])}" y="${sy}" width="${Math.max(X(e) - X(s[0]), .6)}" height="10"/>`;
    });
  }
  o += "</g>";
  if (endLabels.length) {
    endLabels.sort((a, b) => a.y - b.y);
    const lab = []; endLabels.forEach(e => { let y = e.y + 4; if (lab.length && y - lab[lab.length - 1] < 14) y = lab[lab.length - 1] + 14; lab.push(y); o += `<text class="c-endlabel" x="${W - padR + 8}" y="${y}" style="fill:${e.color}${e.strong ? "" : ";opacity:.85"}">${esc(e.text)}</text>`; });
  }
  if (!mini) o += `<rect class="brush" x="0" y="${padT}" width="0" height="${ih}" visibility="hidden"/><line class="hoverline c-hover" x1="0" x2="0" y1="${padT}" y2="${padT + ih}" visibility="hidden"/><rect class="hit" x="${padL}" y="${Math.max(0, padT - 24)}" width="${iw}" height="${ih + stripH + rugH + laneH + Math.min(24, padT)}" fill="transparent"/>`;
  return {svg: o + "</svg>", geom: {padL, iw, xmin, xmax, W, hot}};
}
let clipSeq = 0;
const seriesFor = (run, yKey) => (yKey === "adv" ? run.events.filter(e => e[4]) : run.events).map((e, i) => [e[0], i + 1, e]);
function mountChart(box, opts, describe) {
  const {svg, geom} = chartSVG(opts);
  box.innerHTML = svg + '<div class="tip"></div>';
  const svgEl = box.querySelector("svg"), tip = box.querySelector(".tip"), line = box.querySelector(".hoverline"), hit = box.querySelector(".hit");
  if (!hit) return;
  const hide = () => { tip.style.display = "none"; line.setAttribute("visibility", "hidden"); };
  hit.addEventListener("pointermove", ev => {
    const r = svgEl.getBoundingClientRect(), scale = geom.W / r.width;
    const x = (ev.clientX - r.left) * scale, t = geom.xmin + (x - geom.padL) / geom.iw * (geom.xmax - geom.xmin);
    if (t < geom.xmin || t > geom.xmax) return hide();
    line.setAttribute("x1", x); line.setAttribute("x2", x); line.setAttribute("visibility", "visible");
    const y = (ev.clientY - r.top) * scale;
    const near = geom.hot.filter(h => Math.abs(h.x - x) < 12 && Math.abs(h.y - y) < 14).sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x))[0];
    tip.innerHTML = near ? `<div class="thead"><b>${esc(near.text)}</b></div>${near.sub ? `<div>${esc(near.sub)}</div>` : ""}<div class="mono muted">${fmt(near.t, 0)}</div>` : opts.clean ? describe(t) : `<div class="mono muted">${fmt(t, 0)}</div>` + describe(t);
    tip.style.display = "block";
    const px = ev.clientX - r.left, w = tip.offsetWidth;
    tip.style.left = Math.min(Math.max(px + 14, 0), r.width - w) + "px";
    tip.style.top = Math.max(ev.clientY - r.top - 10 - tip.offsetHeight, 0) + "px";
  });
  hit.addEventListener("pointerleave", () => { if (!drag) hide(); });
  const toT = ev => { const r = svgEl.getBoundingClientRect(), x = (ev.clientX - r.left) * geom.W / r.width; return {x, t: geom.xmin + (x - geom.padL) / geom.iw * (geom.xmax - geom.xmin)}; };
  let drag = null; const brush = box.querySelector(".brush");
  if (opts.onBrush) {
    hit.style.cursor = "crosshair";
    hit.addEventListener("pointerdown", ev => { if (ev.button !== 0) return; drag = toT(ev); hit.setPointerCapture(ev.pointerId); });
    hit.addEventListener("pointermove", ev => {
      if (!drag) return; const c = toT(ev);
      brush.setAttribute("x", Math.min(drag.x, c.x)); brush.setAttribute("width", Math.abs(c.x - drag.x)); brush.setAttribute("visibility", "visible");
    });
    const end = ev => {
      if (!drag) return; const c = toT(ev), a = drag; drag = null; brush.setAttribute("visibility", "hidden");
      if (Math.abs(c.x - a.x) > 10) opts.onBrush(Math.max(geom.xmin, Math.min(a.t, c.t)), Math.min(geom.xmax, Math.max(a.t, c.t)));
    };
    hit.addEventListener("pointerup", end); hit.addEventListener("pointercancel", () => { drag = null; brush.setAttribute("visibility", "hidden"); });
  }
  if (opts.onWheel) hit.addEventListener("wheel", ev => { if (!opts.wheelActive()) return; ev.preventDefault(); opts.onWheel(toT(ev).t, ev.deltaY > 0 ? 1.25 : 0.8); }, {passive: false});
}
const lastBefore = (pts, t) => { let last = null; for (const p of pts) { if (p[0] <= t) last = p; else break; } return last; };
const evLabel = e => e[4] ? "<b>" + esc(advName(e[2])) + "</b>" : esc(critLabel(e[2], e[3]));

/* ================= views ================= */
const catBadge = c => `<span class="cat ${c.toLowerCase()}">${c}</span>`;
function renderRuns() {
  const runs = allRuns(), pool = siteRuns.length ? siteRuns : localRuns;
  const pb = pbRun(), valid = pool.filter(isValid);
  const best = bestPhases();
  const sob = best.slice(0, 6).every(b => b) ? best.slice(0, 6).reduce((a, b) => a + b.dur, 0) : null;
  const totalPlay = pool.reduce((a, r) => a + r.finalIgt, 0);
  const avgRun = valid.length ? valid.reduce((a, r) => a + r.finalIgt, 0) / valid.length : null;
  $("#pbCard").innerHTML = pb
    ? `<div style="display:flex;flex-direction:column;gap:8px"><span class="label">PB</span><span class="big">${fmt(pb.finalIgt)}</span><button type="button" class="linkbtn" style="align-self:flex-start;padding:0" data-open="${esc(uid(pb))}">${esc(runTitle(pb))}</button></div>
       <div class="stats2">
         <div><span class="k">Sum of best</span><span class="v">${sob != null ? fmt(sob, 0) : "—"}</span></div>
         <div><span class="k">Average time</span><span class="v">${avgRun != null ? fmt(avgRun, 0) : "—"}</span></div>
         <div><span class="k">Total runs</span><span class="v">${pool.length}</span></div>
         <div><span class="k">Total playtime</span><span class="v">${fmt(totalPlay, 0)}</span></div>
       </div>`
    : `<span class="label">PB</span><p class="muted" style="margin:12px 0 0">The fastest valid run shows here once a log is added.</p>`;
  $("#pbCard").querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => go("run", b.dataset.open)));

  const avgOf = xs => { xs = xs.filter(x => x != null && !isNaN(x)); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null; };
  const splitCard = (icon, name, bestV, bestRun, avgV, fmtFn) => `<div class="phasecard">${icon ? `<div style="display:flex;align-items:center;gap:8px">${ic(icon)}<span class="label">${esc(name)}</span></div>` : `<span class="label">${esc(name)}</span>`}<span class="t">${bestV != null ? fmtFn(bestV) : "—"}</span><span class="note">${bestRun ? esc(runTitle(bestRun)) : "No run yet"}${avgV != null && valid.length > 1 ? " · avg " + fmtFn(avgV) : ""}</span></div>`;
  $("#bestPhases").innerHTML = PHASES.slice(0, 6).map((p, i) => splitCard(PHASE_ICON[i], p.name, best[i] && best[i].dur, best[i] && best[i].run, avgOf(valid.map(r => derive(r).phases[i].dur)), fmtShort)).join("");
  const bestBy = f => { let b = null; valid.forEach(r => { const v = f(r); if (v != null && (b == null || v < b.v)) b = {v, r}; }); return b || {}; };
  const others = [
    {icon: "s_skulls", name: "Skulls", f: r => { const x = derive(r).skullSplit; return x ? x.dur : null; }, fm: fmtShort},
    ...["adventure/adventuring_time", "husbandry/complete_catalogue"].map(id => ({icon: MICON[id], name: MULTI[id] === "2x2" ? "Two by Two" : advName(id), f: r => { const m = derive(r).multis.find(q => q.id === id); return m ? m.done : null; }, fm: t => fmt(t, 0)}))
  ];
  $("#otherSplits").innerHTML = others.map(o => { const b = bestBy(o.f); return splitCard(o.icon, o.name, b.v, b.r, avgOf(valid.map(o.f)), o.fm); }).join("");

  // averages + pacelocks
  const tally = {};
  pool.forEach(r => { const p = (r.meta && r.meta.pacelock || "").trim(); if (p) tally[p] = (tally[p] || 0) + 1; });
  const tallyRows = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const maxT = tallyRows.length ? tallyRows[0][1] : 1;
  const avg = f => avgOf(pool.map(f));
  const av = (key, name, v) => `<div class="stat stat-ic">${ic(key) ? `<span class="sico">${ic(key).replace('width="20" height="20"', 'width="28" height="28"')}</span>` : `<span class="k">${esc(name)}</span>`}<span class="v">${v}</span><span class="sr">${esc(name)}</span></div>`;
  const f1 = x => x == null ? "—" : x.toFixed(1);
  const sk = [avg(r => derive(r).skullRate.skulls), avg(r => derive(r).skullRate.kills)];
  const tpd = (() => { const a = pool.reduce((x, r) => [x[0] + derive(r).tntD, x[1] + derive(r).debD], [0, 0]); return a[1] ? a[0] / a[1] : null; })();
  const ely = avg(r => r.meta && r.meta.elytraCm != null ? r.meta.elytraCm / 100000 : null);
  const tpdPair = ic("s_tnt") && ic("s_debris") ? `<div class="stat stat-ic"><span class="sico pair">${ic("s_tnt").replace('width="20" height="20"', 'width="28" height="28"')}<span class="per">/</span>${ic("s_debris").replace('width="20" height="20"', 'width="28" height="28"')}</span><span class="v">${f1(tpd)}</span></div>` : av("s_tnt", "TNT per debris", f1(tpd));
  $("#aggregates").innerHTML = `
    <div class="card"><h2 style="margin-bottom:12px">Average per run</h2><div class="statgrid">
      ${av("s_deaths", "Deaths", f1(avg(nonIntentional)))}
      ${av("s_elytra", "Elytra distance", ely != null ? ely.toFixed(1) + " km" : "—")}
      ${av("s_skulls", "Wither skeletons killed per skull", (() => { const a = pool.reduce((x, r) => { const q = derive(r).skullRate; return [x[0] + q.skulls, x[1] + q.kills]; }, [0, 0]); return a[0] ? "1 / " + (a[1] / a[0]).toFixed(1) : "—"; })())}
      ${tpdPair}
      ${av("s_shulker", "Shulker boxes opened", avg(r => r.tot.shulkerOpen) != null ? avg(r => r.tot.shulkerOpen).toFixed(0) : "—")}
      ${av("s_creepers", "Creepers killed", avg(r => r.tot.creepers) != null ? avg(r => r.tot.creepers).toFixed(0) : "—")}
    </div></div>`;

  const tbl = $("#runsTable");
  if (!runs.length) { tbl.innerHTML = `<div class="empty">No runs yet. Drop a Hermes play.log above to add one.</div>`; }
  else {
    const cols = PHASE_CARDS;
    const HORDER = {Yes: 0, No: 1, Invalid: 2};
    const keyOf = {num: r => (r.src === "local" ? 1e6 : 0) + runNum(r), date: r => { const [y, m, dd] = isoDay(r).split("-").map(Number); return y * 1e4 + m * 100 + dd; }, hundred: r => HORDER[hundred(derive(r).category)], igt: r => r.finalIgt};
    cols.forEach(i => { keyOf["p" + i] = r => { const v = phaseMark(derive(r).phases[i], i); return v == null ? Infinity : v; }; });
    if (!keyOf[state.sort.key]) state.sort = {key: "num", dir: 1};
    const shown = runs.slice()
      .sort((a, b) => (keyOf[state.sort.key](a) - keyOf[state.sort.key](b)) * state.sort.dir || runNum(a) - runNum(b));
    const th = (key, label) => { const on = state.sort.key === key; return `<th scope="col" aria-sort="${on ? (state.sort.dir > 0 ? "ascending" : "descending") : "none"}"><button type="button" class="sortbtn${on ? " on" : ""}" data-sort="${key}">${label}<span aria-hidden="true">${on ? (state.sort.dir > 0 ? " ▲" : " ▼") : ""}</span></button></th>`; };
    tbl.innerHTML = `<table style="min-width:980px"><thead><tr>${th("num", "Run")}${th("date", "Date")}${th("hundred", "100%")}${th("igt", "Time (IGT)")}${cols.map(i => th("p" + i, esc(PHASES[i].name))).join("")}<th scope="col"><span class="sr">Actions</span></th></tr></thead><tbody>` +
      shown.map(r => { const d = derive(r), u = uid(r); return `<tr>
        <td style="white-space:nowrap"><span class="runno">${esc(runNum(r))}</span>${videoLink(r)}${pb === r ? '<span class="badge">PB</span>' : ""}${r.src === "local" ? '<span class="badge local">Yours</span>' : ""}${r.meta && r.meta.notes ? `<div class="note clamp" title="${esc(r.meta.notes)}">${esc(r.meta.notes)}</div>` : ""}</td>
        <td style="white-space:nowrap">${esc(runDay(r))}${r.meta && r.meta.seed ? `<div class="note mono">${esc(r.meta.seed)}</div>` : ""}</td>
        <td>${hundred(d.category)}</td>
        <td class="mono">${fmt(r.finalIgt, 0)}</td>
        ${cols.map(i => [d.phases[i], i]).map(([p, i]) => `<td class="mono">${phaseMark(p, i) != null ? fmt(phaseMark(p, i), 0) : "—"}</td>`).join("")}
        <td><div class="rowactions"><button class="btn" data-open="${esc(u)}">Open</button>${r.src === "local" || canPublish ? `<button class="btn ghost" data-del="${esc(u)}" aria-label="Delete ${esc(runTitle(r))}">Delete</button>` : ""}</div></td>
      </tr>`; }).join("") + `</tbody></table>` + (shown.length ? "" : `<div class="empty">No runs match that filter.</div>`) + HUNDRED_NOTE;
    tbl.querySelectorAll("[data-sort]").forEach(b => b.addEventListener("click", () => { const k = b.dataset.sort; state.sort = state.sort.key === k ? {key: k, dir: -state.sort.dir} : {key: k, dir: 1}; renderRuns(); }));

  }
}

let draftIcons = null;
function renderIcons() {
  const card = $("#iconsCard");
  card.classList.toggle("hidden", !canPublish);
  if (!canPublish) { draftIcons = null; return; }
  if (!draftIcons) draftIcons = {...siteIcons};
  const dirty = JSON.stringify(draftIcons) !== JSON.stringify(siteIcons);
  card.innerHTML = `<div class="head-row" style="align-items:center;margin-bottom:6px"><h2>Site icons</h2>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="status" id="iconStatus" role="status" aria-live="polite"></span><button class="btn primary" id="iconsSave" ${dirty ? "" : "disabled"}>Publish icons</button></div></div>
    <p class="note" style="margin:0 0 14px">Only you see this. Pick a small PNG for any slot; it's scaled to 32×32 with sharp pixels and shown to everyone once you publish.</p>
    ${ICON_SLOTS.map(([group, slots]) => `<h3 style="margin:18px 0 10px">${esc(group)}</h3><div class="iconslots">${slots.map(([k, label]) => `<div class="iconslot">
      <span class="iconprev">${(ic(k, draftIcons) || '<span class="note">none</span>').replace('width="20" height="20"', 'width="32" height="32"').replace('<svg class="ico" viewBox', '<svg class="ico" width="32" height="32" viewBox')}</span>
      <span class="iconlabel">${esc(label)}${okIcon(draftIcons[k]) ? "" : ' <span class="note">(no icon)</span>'}</span>
      <label class="btn" for="icf-${k}">Change</label><input class="sr" type="file" id="icf-${k}" data-icon="${k}" accept="image/png,image/webp,image/gif,image/jpeg">
      ${okIcon(draftIcons[k]) ? `<button class="btn ghost" data-reset="${k}">Reset</button>` : ""}
    </div>`).join("")}</div>`).join("")}`;
  card.querySelectorAll("[data-icon]").forEach(inp => inp.addEventListener("change", async () => {
    const f = inp.files[0]; if (!f) return;
    try { draftIcons = {...draftIcons, [inp.dataset.icon]: await toIcon(f)}; renderIcons(); }
    catch { const s = $("#iconStatus"); s.className = "status err"; s.textContent = "That file couldn't be read as an image."; }
  }));
  card.querySelectorAll("[data-reset]").forEach(b => b.addEventListener("click", () => { const n = {...draftIcons}; delete n[b.dataset.reset]; draftIcons = n; renderIcons(); }));
  $("#iconsSave").addEventListener("click", async () => {
    const s = $("#iconStatus"); $("#iconsSave").disabled = true; s.className = "status"; s.textContent = "Publishing…";
    const res = await publishSite(siteRuns, "Published the new icons.", draftIcons);
    if (res.ok) return;
    $("#iconsSave").disabled = false; s.className = "status err"; s.textContent = res.readOnly ? "This view can't publish to the site." : res.msg;
  });
}
function toIcon(file) {
  return new Promise((resolve, reject) => {
    if (!/^image\//.test(file.type)) return reject(new Error("type"));
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = c.height = 32;
      const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
      const k = Math.min(32 / img.naturalWidth, 32 / img.naturalHeight), w = img.naturalWidth * k, h = img.naturalHeight * k;
      g.drawImage(img, (32 - w) / 2, (32 - h) / 2, w, h);
      URL.revokeObjectURL(url); resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("load")); };
    img.src = url;
  });
}

const statIc = k => { const h = ic(k); return h ? `<span class="sico">${h}</span>` : ""; };
function statCards(run) {
  const d = derive(run), t = run.tot || {};
  const nd = d.deaths.filter(x => !x.intentional);
  const elytra = run.meta && run.meta.elytraCm != null ? (run.meta.elytraCm / 100000).toFixed(1) + " km" : "—";
  const card = (key, name, v) => `<div class="stat stat-ic">${ic(key) ? `<span class="sico">${ic(key).replace('width="20" height="20"', 'width="28" height="28"')}</span>` : `<span class="k">${esc(name)}</span>`}<span class="v">${v}</span><span class="sr">${esc(name)}</span></div>`;
  const big = k => ic(k).replace('width="20" height="20"', 'width="28" height="28"');
  const pairCard = (a, b, name, v) => (ic(a) && ic(b))
    ? `<div class="stat stat-ic"><span class="sico pair">${big(a)}<span class="per">/</span>${big(b)}</span><span class="v">${v}</span><span class="sr">${esc(name)}</span></div>`
    : card(a, name, v);
  return `<div class="statgrid">
    ${card("s_deaths", "Deaths", nd.length)}
    ${card("s_elytra", "Elytra distance", elytra)}
    ${card("s_skulls", "Skulls / wither skeletons killed", d.skullRate.skulls + " / " + d.skullRate.kills)}
    ${pairCard("s_tnt", "s_debris", "TNT per debris in the Debris phase (" + d.tntD + " TNT, " + d.debD + " debris)", d.tntPer != null ? d.tntPer.toFixed(1) : "—")}
    ${card("s_shulker", "Shulker boxes opened", num(t.shulkerOpen))}
    ${card("s_creepers", "Creepers killed", num(t.creepers))}
  </div>`;
}

function renderRun() {
  const el = $("#view-run"), runs = allRuns();
  let run = findRun(state.runId) || pbRun() || runs[0];
  if (!run) { el.innerHTML = `<div class="card empty">No runs yet. Add a log on the Runs page first.</div>`; return; }
  state.runId = uid(run);
  const d = derive(run), pb = pbRun();
  const totalDur = d.phases.reduce((a, p) => a + (p.dur || 0), 0) || 1;
  const editable = run.src === "local" || canPublish;
  const meta = run.meta || {};
  const dp = d.debrisPhase;
  const lines = [{key: "adv", name: "Advancements", color: MCOL.adv}, ...d.multis.map(m => ({key: m.id, name: advName(m.id) + " (" + MULTI[m.id] + ")", color: MCOL[m.id], icon: MICON[m.id]}))];
  if (d.gold.length) lines.push({key: "gold", name: "Gold Block Estimate", color: "var(--gold)", dash: true});
  if ((run.st.tntHeld || []).length) lines.push({key: "tnt", name: "TNT held", color: "var(--bad)", dash: true});
  if (state.focus && !lines.some(l => l.key === state.focus)) state.focus = null;
  el.innerHTML = `
    <div class="head-row">
      <div style="display:flex;flex-direction:column;gap:8px;min-width:0">
        ${pager(run)}
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><h1>${esc(runTitle(run))}</h1>${videoLink(run, true)}</div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="cat ${d.category.toLowerCase()}">100%: ${hundred(d.category)}</span><span class="muted">${esc(run.player)}, ${esc(runDay(run))}</span>${meta.seed ? `<span class="muted">· seed <span class="mono">${esc(meta.seed)}</span></span>` : ""}</div>
      </div>
      <div class="times">
        <div><span class="label">Time (IGT)</span><span class="mono" style="font-size:34px;font-weight:600;color:var(--accent)">${fmt(run.finalIgt)}</span></div>
      </div>
    </div>
    ${meta.notes ? `<div class="card notes"><div style="flex:1;min-width:0"><span class="label">Notes</span><p style="margin:6px 0 0;white-space:pre-wrap">${esc(meta.notes)}</p></div></div>` : ""}
    ${d.category === "Invalid" ? `<div class="card" style="border-color:var(--bad)"><b>Invalid run.</b> <span class="muted">Missing ${d.missing.map(id => esc(advName(id))).join(", ")}. It's left out of PBs and bests.</span></div>` : ""}
    <section class="card" style="display:flex;flex-direction:column;gap:14px">
      <h2>Phases</h2>
      <div class="phasebar" role="img" aria-label="Time spent in each phase">${d.phases.flatMap((p, i) => p.segs.map(g => ({p, i, g}))).sort((a, b) => a.g[0] - b.g[0]).map(({p, i, g}) => { const w = (g[1] - g[0]) / totalDur; return w > 0 ? `<div class="tipped" style="flex:${w};background:${PCOL[i]}" data-tip="${esc(p.name)} · ${fmtShort(p.dur)}${p.segs.length > 1 ? " total" : ""}">${ic(p.icon)}${w > .1 ? `<span>${esc(p.name)}</span>` : ""}</div>` : ""; }).join("")}</div>
      <div class="grid-phases">${d.phases.map((p, i) => !PHASE_CARDS.includes(i) || (i === 6 && p.dur == null) ? "" : `<div class="phasecard"><div style="display:flex;align-items:center;gap:8px">${ic(p.icon)}<span class="label">${esc(p.name)}</span></div><span class="t">${phaseMark(p, i) != null ? fmt(phaseMark(p, i), 0) : "—"}</span></div>`).join("")}</div>
    </section>
    <section class="card chartcard" id="progressCard" style="display:flex;flex-direction:column;gap:14px">
      <div class="head-row" style="align-items:center">
        <h2>Progress over IGT</h2>
        <div style="display:flex;align-items:center;gap:10px">
          <span class="zoominfo" id="zoomInfo"></span>
          <button type="button" class="btn icon" id="fsBtn" aria-label="Full screen" title="Full screen (F)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>
        </div>
      </div>
      <div class="keys" aria-label="Graph controls"><span>Drag to zoom</span><span><kbd>+</kbd><kbd>−</kbd> zoom</span><span><kbd>←</kbd><kbd>→</kbd> move</span><span><kbd>0</kbd> reset</span><span><kbd>F</kbd> full screen</span><span><kbd>[</kbd><kbd>]</kbd> previous / next run</span></div>
      <div class="chartbox" id="runChart"></div>
      <div class="chartbox" id="resChart"></div>
      <div class="legend"><span><i style="background:var(--ow)"></i>Overworld</span><span><i style="background:var(--ne)"></i>Nether</span><span><i style="background:var(--en)"></i>The End</span></div>
    </section>
    <section class="card"><h2 style="margin-bottom:14px">Run stats</h2>${statCards(run)}</section>
    <div class="grid3">
      ${miniCard("Debris", dp.start != null ? dp.dur : null, dp.start != null ? "debrisChart" : null, "No debris session found in this log.")}
      ${miniCard("Skulls", d.skullSplit ? d.skullSplit.dur : null, d.skullSplit ? "skullChart" : null, "No skulls in this log.")}
      ${rareCard(d.rare)}
    </div>
    ${editable ? `<section class="card" style="display:flex;flex-direction:column;gap:14px"><h2>Run details</h2>
        ${editable ? `<div class="form">
          <label>Run number<input type="number" min="1" id="mNum" value="${esc(runNum(run))}"></label>
          <label>Date<input type="date" id="mDate" value="${esc(isoDay(run))}"></label>
          <label>Seed<input type="text" id="mSeed" value="${esc(meta.seed || "")}" placeholder="World seed" autocomplete="off"></label>
          <label>Video link<input type="url" id="mVideo" value="${esc(meta.video || "")}" placeholder="https://youtube.com/…"></label>
        </div>
        <label class="label" style="display:flex;flex-direction:column;gap:6px">Run notes<textarea id="mNotes" rows="3" placeholder="Anything worth remembering about this run">${esc(meta.notes || "")}</textarea></label>
        ${d.deaths.length ? `<div><span class="label">Deaths</span><p class="note" style="margin:4px 0 0">Tick deaths that were on purpose. Only the others show on the graph.</p>${d.deaths.map(x => `<div class="deathrow"><input type="checkbox" data-intent="${x.i}" id="di${x.i}" ${x.intentional ? "checked" : ""}><label for="di${x.i}"><span class="mono">${fmt(x.t, 0)}</span> in ${x.dim === "e" ? "the End" : x.dim === "n" ? "the Nether" : "the Overworld"}, intentional</label></div>`).join("")}</div>` : ""}
        <div><label class="label" for="statsFile">World stats file</label><p class="note" style="margin:4px 0 8px">Hermes doesn't log movement, so elytra distance comes from <span class="mono">saves/&lt;world&gt;/stats/&lt;uuid&gt;.json</span>.</p><input type="file" id="statsFile" accept=".json"></div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="btn primary" id="metaSave">${run.src === "local" ? "Save details" : "Publish details"}</button><span class="status" id="metaStatus" role="status" aria-live="polite"></span></div>`
        : ""}
      </section>` : ""}`;

  // ---------- progress chart (top) + resources panel (bottom), sharing time range ----------
  const adv = seriesFor(run, "adv");
  const dim = k => state.focus && state.focus !== k;
  const multiTot = id => d.multis.find(m => m.id === id).tot;
  const top = [];
  d.multis.forEach(m => top.push({key: m.id, points: m.xs.map((e, k) => [e[0], k + 1, e]), color: MCOL[m.id], w: 1.75, until: m.done ?? run.finalIgt, soft: true,
    endLabel: () => MULTI[m.id]}));
  top.push({key: "adv", points: adv, color: MCOL.adv, w: 3, until: run.finalIgt, endLabel: () => "Advancements"});
  const res = [];
  if (d.gold.length) res.push({key: "gold", points: d.gold.map(g => [g[0], Math.max(0, g[1])]), color: "var(--gold)", w: 2, until: run.finalIgt});
  if ((run.st.tntHeld || []).length) res.push({key: "tnt", points: run.st.tntHeld.map(g => [g[0], Math.max(0, g[1])]), color: "var(--bad)", w: 2, dash: "2 3", until: run.finalIgt});
  top.sort((a, b) => (b.dim ? 1 : 0) - (a.dim ? 1 : 0)); res.sort((a, b) => (b.dim ? 1 : 0) - (a.dim ? 1 : 0));
  const advAt = t => { const l = lastBefore(adv, t); return l ? l[1] : 0; };
  const atPts = (d.multis.find(m => m.id === "adventure/adventuring_time") || {xs: []}).xs.map((e, k) => [e[0], k + 1]);
  const atAt = t => { const l = lastBefore(atPts, t); return l ? l[1] : 0; };
  const killsBy = t => (run.st.ws || []).filter(x => x <= t).length;
  const drownedBy = t => (run.st.drowned || []).filter(x => x <= t).length;
  const mk = (times, icon, color, label) => times.map((t, k) => ({t, v: advAt(t), icon, color, text: label(k + 1, times.length, t)}));
  const markers = [
    ...mk(d.lanes.trident, "trident", "var(--s1)", (k, n, t) => `x${k} Trident (Drowned killed: ${drownedBy(t)})`),
    ...mk(d.lanes.skull, "s_skulls", "var(--muted)", (k, n, t) => `${k}/${n} Wither Skulls (Killed: ${killsBy(t)})`),
    ...mk(d.lanes.nautilus, "g_nautilus", "var(--s4)", (k, n) => `${k}/${n} Nautilus Shells`),
    ...(run.st.gapple != null ? mk([run.st.gapple], "s_gapple", "var(--gold)", () => "First God Apple") : []),
    ...d.rare.flatMap(g => g.visits.map(v => ({t: v.t, v: atAt(v.t), icon: g.key, color: "var(--s1)", faded: !v.complete,
      text: v.complete ? null : "Missing " + v.missing.map(critName).join(", ")}))),
    ...d.multis.filter(m => m.done != null).map(m => ({t: m.done, v: m.tot, icon: MICON[m.id], color: MCOL[m.id], end: true, text: `${advName(m.id)} complete`, sub: `Last: ${critName(m.last)}`}))];
  const deathsShown = d.deaths.filter(x => !x.intentional).map((x, k, all) => ({...x, text: `Death ${k + 1}/${all.length}`}));
  const endT = run.finalIgt;
  if (state.zoomRun !== run) { state.zoom = null; state.zoomRun = run; }
  const card = $("#progressCard"), box = $("#runChart"), rbox = $("#resChart");
  const setZoom = (a, b) => {
    const minSpan = 30000;
    if (b - a < minSpan) { const m = (a + b) / 2; a = m - minSpan / 2; b = m + minSpan / 2; }
    if (a < 0) { b -= a; a = 0; } if (b > endT) { a -= b - endT; b = endT; } a = Math.max(0, a);
    state.zoom = (a <= 0 && b >= endT) ? null : [a, b]; drawMain();
  };
  const cur = () => state.zoom || [0, endT];
  const bandSegs = d.phases.flatMap((p, i) => p.segs.map(g => ({name: p.name, start: g[0], end: g[1], ci: i}))).sort((a, b) => a.start - b.start);
  const phaseAt = t => bandSegs.find(b => t >= b.start && t <= b.end);
  const rows = (list, t) => list.filter(x => !x.dim).filter(x => { if (!MULTI[x.key]) return true; const m = d.multis.find(q => q.id === x.key); return !(m.done != null && t >= m.done); }).slice().reverse().map(x => {
    const l = lastBefore(x.points, t); let val = l ? l[1] : 0, lab = "";
    if (x.key === "adv") lab = l ? esc(advName(l[2][2])) : "";
    else if (MULTI[x.key]) { val += "/" + multiTot(x.key); lab = l ? esc(critName(l[2][3])) : ""; }
    const name = x.key === "adv" ? "Adv" : x.key === "gold" ? "Gold" : x.key === "tnt" ? "TNT" : MULTI[x.key];
    return `<div class="trow"><span class="swatch" style="background:${x.color}"></span><span class="tname">${name}</span><b class="mono">${val}</b><span class="tlab">${lab}</span></div>`;
  }).join("");
  function drawMain() {
    const [za, zb] = cur(), fs = card.classList.contains("fs");
    const W = fs ? Math.max(600, box.clientWidth) : 1280;
    const avail = fs ? Math.max(420, window.innerHeight - box.getBoundingClientRect().top - 60) : 0;
    const Ht = fs ? Math.round(avail * .7) : 440, Hr = fs ? Math.round(avail * .3) : 190;
    const zi = $("#zoomInfo");
    zi.innerHTML = state.zoom ? `Showing ${fmt(za, 0)}–${fmt(zb, 0)} <button type="button" class="linkbtn" id="zReset">Reset <kbd>0</kbd></button>` : "";
    if (state.zoom) $("#zReset").addEventListener("click", () => { state.zoom = null; drawMain(); });
    const common = {xmin: za, xmaxFix: zb, fitY: !!state.zoom, W, onBrush: (a, b) => setZoom(a, b),
      onWheel: (t, f) => { const [a, b] = cur(); setZoom(t - (t - a) * f, t + (b - t) * f); }, wheelActive: () => card.classList.contains("fs")};
    mountChart(box, {...common, series: top, yKey: "adv", H: Ht, bands: bandSegs, deaths: deathsShown, markers, markersDim: dim("adv"), noXAxis: true, clean: true},
      t => { const ph = phaseAt(t); return `<div class="thead"><span class="mono">${fmt(t, 0)}</span>${ph ? `<span>${esc(ph.name)}</span>` : ""}</div>` + rows(top, t); });
    if (res.length) mountChart(rbox, {...common, series: res, yKey: "res", H: Hr, bands: bandSegs, bandLabels: false, padRFix: 120, strip: run.dims.length ? {segs: run.dims, end: run.finalIgt} : null, clean: true},
      t => `<div class="thead"><span class="mono">${fmt(t, 0)}</span></div>` + rows(res, t));
    else rbox.innerHTML = "";
  }
  drawMain();
  chartKeys = e => {
    const [a, b] = cur(), span = b - a, m = (a + b) / 2;
    if (e.key === "ArrowLeft") setZoom(a - span * (e.shiftKey ? .8 : .25), b - span * (e.shiftKey ? .8 : .25));
    else if (e.key === "ArrowRight") setZoom(a + span * (e.shiftKey ? .8 : .25), b + span * (e.shiftKey ? .8 : .25));
    else if (e.key === "+" || e.key === "=") setZoom(m - span / 4, m + span / 4);
    else if (e.key === "-" || e.key === "_") setZoom(m - span, m + span);
    else if (e.key === "0") { state.zoom = null; drawMain(); }
    else if (e.key === "f" || e.key === "F") toggleFs();
    else if (e.key === "[" || e.key === "]") { const list = orderedRuns(), i = list.indexOf(run), j = i + (e.key === "]" ? 1 : -1); if (j >= 0 && j < list.length) { state.runId = uid(list[j]); renderRun(); } }
    else if (e.key === "Escape" && card.classList.contains("fs")) setFs(false);
    else return false;
    return true;
  };
  const setFs = on => {
    card.classList.toggle("fs", on); document.body.classList.toggle("noscroll", on);
    $("#fsBtn").setAttribute("aria-label", on ? "Exit full screen" : "Full screen"); $("#fsBtn").title = on ? "Exit full screen (Esc)" : "Full screen (F)";
    if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    requestAnimationFrame(drawMain);
  };
  const toggleFs = () => { const on = !card.classList.contains("fs"); if (on && card.requestFullscreen) card.requestFullscreen().catch(() => {}); setFs(on); };
  $("#fsBtn").addEventListener("click", toggleFs);
  card.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && card.classList.contains("fs")) setFs(false); });
  if (fsResize) window.removeEventListener("resize", fsResize);
  fsResize = () => { if (card.isConnected && card.classList.contains("fs")) drawMain(); };
  window.addEventListener("resize", fsResize);
  el.querySelectorAll("[data-line]").forEach(b => b.addEventListener("click", () => {
    const k = b.dataset.line; state.focus = state.focus === k ? null : k;
    const wasFs = card.classList.contains("fs"); renderRun();
    if (wasFs) { const c = $("#progressCard"); c.classList.add("fs"); document.body.classList.add("noscroll"); c.dispatchEvent(new Event("redraw")); }
  }));
  card.addEventListener("redraw", () => requestAnimationFrame(drawMain));

  if (dp.start != null && $("#debrisChart")) {
    const dpts = (run.st.debris || []).filter(t => t >= dp.start && t <= dp.end).map((t, i) => [t, i + 1]);
    const tnt = (run.st.tnt || []).filter(t => t >= dp.start && t <= dp.end);
    const r0 = rackAt(run, dp.start);
    const rpts = (run.st.rack || []).filter(p => p[0] >= dp.start && p[0] <= dp.end).map(p => [p[0], p[1] - r0]);
    const ds = [{points: dpts, color: "var(--s3)", label: "Debris " + dpts.length}];
    if (rpts.length) ds.push({points: rpts, color: "var(--muted)", axis: "r", w: 1.5, label: "Netherrack " + num(rpts[rpts.length - 1][1])});
    mountChart($("#debrisChart"), {series: ds, W: 480, H: 260, xmin: dp.start, xmaxFix: dp.end, ystepFix: 5, rug: tnt, rugLabel: "TNT " + tnt.length, noY: true, noXAxis: true, clean: true}, t => {
      const l = lastBefore(dpts, t), rl = lastBefore(rpts, t);
      return `<div class="thead"><span class="mono">${fmt(t, 0)}</span><span class="mono">${fmtShort(t - dp.start)}</span></div><div><b class="mono">${l ? l[1] : 0}</b> debris · <b class="mono">${tnt.filter(x => x <= t).length}</b> TNT${rpts.length ? ` · <b class="mono">${rl ? rl[1] : 0}</b> netherrack` : ""}</div>`;
    });
  }

  if (d.skullSplit && $("#skullChart")) {
    const sp = d.skullSplit, A = t => { let acc = 0; for (const [a, b] of sp.segs) { if (t <= b) return acc + Math.max(0, t - a); acc += b - a; } return acc; };
    const kills = (run.st.ws || []).filter(t => t >= sp.start && t <= sp.end);
    const kp = kills.map((t, i) => [A(t), i + 1, t]);
    const skullsIn = d.lanes.skull.filter(t => t <= sp.end).slice(0, 3);
    const kAt = t => kills.filter(x => x <= t).length;
    const mks = skullsIn.map((t, i) => ({t: A(t), realT: t, v: kAt(t), icon: "s_skulls", color: "var(--s0)", text: `Skull ${i + 1}/3 (Killed: ${kAt(t)})`}));
    const realOf = a => { let acc = 0; for (const [s0, e0] of sp.segs) { if (a <= acc + (e0 - s0)) return s0 + (a - acc); acc += e0 - s0; } return sp.end; };
    mountChart($("#skullChart"), {series: [{points: kp, color: "var(--muted)", w: 2, endLabel: v => "Wither Skeletons " + v}], W: 480, xmin: 0, xmaxFix: Math.max(1000, sp.dur), noY: true, noXAxis: true, clean: true, markers: mks, H: 260},
      t => { const l = lastBefore(kp, t); return `<div class="thead"><span class="mono">${fmt(realOf(t), 0)}</span><span class="mono">${fmtShort(t)}</span></div><div><b class="mono">${l ? l[1] : 0}</b> wither skeletons · <b class="mono">${skullsIn.filter(x => A(x) <= t).length}</b> skulls</div>`; });
  }
  bindPager(el);
  if (editable) {
    let elytraCm = meta.elytraCm;
    $("#statsFile").addEventListener("change", async e => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const j = JSON.parse(await f.text());
        const v = ((j.stats && j.stats["minecraft:custom"]) || {})["minecraft:aviate_one_cm"];
        if (v == null) throw new Error();
        elytraCm = v; $("#metaStatus").className = "status"; $("#metaStatus").textContent = "Elytra: " + (v / 100000).toFixed(1) + " km. Save to keep it.";
      } catch { $("#metaStatus").className = "status err"; $("#metaStatus").textContent = "That file has no elytra distance. Use the stats/<uuid>.json from the run's world."; }
    });
    $("#metaSave").addEventListener("click", async () => {
      const nv = parseInt($("#mNum").value, 10);
      const intent = {};
      el.querySelectorAll("[data-intent]").forEach(c => { intent[c.dataset.intent] = c.checked; });
      const vid = $("#mVideo").value.trim(), dt = $("#mDate").value;
      if (vid && !okUrl(vid)) { $("#metaStatus").className = "status err"; $("#metaStatus").textContent = "The video link needs to start with http:// or https://."; return; }
      const nextMeta = {...meta, num: nv > 0 ? nv : undefined, intent, elytraCm,
        date: /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt : undefined, seed: $("#mSeed").value.trim() || undefined, video: vid || undefined, notes: $("#mNotes").value.trim() || undefined};
      $("#metaSave").disabled = true; $("#metaStatus").className = "status"; $("#metaStatus").textContent = run.src === "local" ? "Saving…" : "Publishing…";
      const res = await saveRunMeta(run, nextMeta, "Published details for " + runTitle({...run, meta: nextMeta}) + ".");
      if (res.ok) { if (run.src === "local") { const s = $("#metaStatus"); if (s) s.textContent = "Saved."; } return; }
      $("#metaSave").disabled = false; $("#metaStatus").className = "status err"; $("#metaStatus").textContent = res.readOnly ? "This view can't publish to the site." : res.msg;
    });
  }
}
const rareCard = rare => `<section class="card" style="display:flex;flex-direction:column;gap:10px"><h2>Rare biomes</h2>
  <div class="rare">${rare.slice().sort((a, b) => (a.done ?? a.first ?? Infinity) - (b.done ?? b.first ?? Infinity)).map(g => `<div class="rarerow">
    <span class="rareic">${ic(g.key) || `<span class="swatch" style="background:var(--s1)"></span>`}</span>
    <span class="rarename">${esc(g.name)}
      ${g.done == null && g.visits.length ? `<span class="note bad">Missing ${g.missing.map(m => esc(critName(m))).join(", ")}</span>` : ""}
</span>
    <span class="mono">${g.done != null ? fmt(g.done, 0) : g.visits.length ? "incomplete" : "—"}</span>
  </div>`).join("")}</div></section>`;
const orderedRuns = () => [...siteRuns.slice().sort((a, b) => runNum(a) - runNum(b)), ...localRuns.slice().sort((a, b) => runNum(a) - runNum(b))];
const pageLabel = r => (r.src === "local" ? "Y" : "") + runNum(r);
function pager(run) {
  const list = orderedRuns(), i = list.indexOf(run), n = list.length;
  const want = new Set([0, n - 1, i - 2, i - 1, i, i + 1, i + 2].filter(k => k >= 0 && k < n));
  let prev = -1, pages = "";
  [...want].sort((a, b) => a - b).forEach(k => {
    if (prev >= 0 && k - prev > 1) pages += `<span class="gap" aria-hidden="true">…</span>`;
    pages += `<button type="button" class="pg${k === i ? " on" : ""}" data-go="${esc(uid(list[k]))}" ${k === i ? 'aria-current="page"' : ""} aria-label="${esc(runTitle(list[k]))}">${esc(pageLabel(list[k]))}</button>`;
    prev = k;
  });
  return `<nav class="pager" aria-label="Runs">
    <button type="button" class="pg arrow" data-go="${i > 0 ? esc(uid(list[i - 1])) : ""}" ${i > 0 ? "" : "disabled"} aria-label="Previous run" title="Previous run ([)">‹</button>
    ${pages}
    <button type="button" class="pg arrow" data-go="${i < n - 1 ? esc(uid(list[i + 1])) : ""}" ${i < n - 1 ? "" : "disabled"} aria-label="Next run" title="Next run (])">›</button>
    ${n > 1 ? `<form class="goto" id="gotoForm"><label for="gotoRun" class="note">Go to run</label><input id="gotoRun" type="text" inputmode="numeric" autocomplete="off" placeholder="#"><button type="submit" class="pg arrow" aria-label="Go">→</button><span class="note" id="gotoMsg" role="status" aria-live="polite"></span></form>` : ""}
  </nav>`;
}
function bindPager(el) {
  el.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => { if (b.dataset.go) { state.runId = b.dataset.go; renderRun(); } }));
  const f = el.querySelector("#gotoForm"); if (!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const v = f.querySelector("#gotoRun").value.trim().toUpperCase(), local = v.startsWith("Y"), nn = parseInt(local ? v.slice(1) : v, 10);
    const r = orderedRuns().find(x => (x.src === "local") === local && runNum(x) === nn);
    if (r) { state.runId = uid(r); renderRun(); } else f.querySelector("#gotoMsg").textContent = "No run " + v;
  });
}
const miniCard = (title, dur, id, empty) => `<section class="card" style="display:flex;flex-direction:column;gap:10px"><div class="head-row" style="align-items:baseline"><h2>${esc(title)}</h2>${dur != null ? `<span class="mono muted">${fmtShort(dur)}</span>` : ""}</div>${id ? `<div class="chartbox" id="${id}"></div>` : `<p class="muted" style="margin:0">${esc(empty)}</p>`}</section>`;
const rackAt = (run, t) => { const l = lastBefore(run.st.rack || [], t); return l ? l[1] : 0; };
const rackIn = (run, a, b) => rackAt(run, b) - rackAt(run, a);

function renderCompare() {
  const el = $("#view-compare"), runs = allRuns();
  if (!runs.length) { el.innerHTML = `<div class="card empty">Add at least one run on the Runs page to compare.</div>`; return; }
  if (!state.selected.size) { const pb = pbRun(); if (pb) state.selected.add(uid(pb)); }
  const chosen = runs.filter(r => state.selected.has(uid(r)));
  const colorOf = r => SERIES[runs.indexOf(r) % SERIES.length];
  const pb = pbRun(), best = bestPhases();
  const baseName = state.baseline === "pb" ? "PB" : "Best";
  const basePhase = i => state.baseline === "pb" ? (pb ? derive(pb).phases[i].dur : null) : (best[i] ? best[i].dur : null);
  let cum = 0;
  const baseEnd = i => { if (state.baseline === "pb") return pb ? derive(pb).phases[i].end : null; return null; };
  const phaseRows = PHASES.map((p, i) => {
    if (i === 6 && !chosen.some(hasPost) && !(pb && hasPost(pb))) return "";
    const b = basePhase(i);
    return `<tr><td><span class="swatch" style="background:${PCOL[i]};margin-right:8px;vertical-align:middle"></span>${esc(p.name)}</td><td class="mono">${fmtShort(b)}</td>${chosen.map(r => { const dd = derive(r).phases[i]; return `<td class="mono">${dd.dur == null ? "N/A" : fmtShort(dd.dur)}${dd.dur != null && b != null ? deltaSpan(dd.dur - b) : ""}<div class="note mono">${dd.end != null ? "ends " + fmt(dd.end, 0) : ""}</div></td>`; }).join("")}</tr>`;
  }).join("");
  const statRow = (label, f, lowerBetter) => `<tr><td>${label}</td><td></td>${chosen.map(r => `<td class="mono">${f(r)}</td>`).join("")}</tr>`;
  el.innerHTML = `
    <h1>Compare runs</h1>
    <div class="cmp">
      <aside class="card" style="display:flex;flex-direction:column;gap:12px">
        <h2>Runs on graph</h2>
        ${runs.map(r => `<label class="runpick"><input type="checkbox" data-pick="${esc(uid(r))}" ${state.selected.has(uid(r)) ? "checked" : ""}><span class="swatch" style="background:${colorOf(r)}"></span><span>${esc(runTitle(r))} <span class="mono muted">${fmt(r.finalIgt, 0)}</span>${r === pb ? '<span class="badge">PB</span>' : ""}</span></label>`).join("")}
        <div style="border-top:1px solid var(--line);padding-top:14px;display:flex;flex-direction:column;gap:10px">
          <span class="label">Compare phases against</span>
          <div class="seg" role="group" aria-label="Baseline"><button data-base="pb" aria-pressed="${state.baseline === "pb"}">PB</button><button data-base="best" aria-pressed="${state.baseline === "best"}">Best phases</button></div>
          <span class="label">Graph</span>
          <div class="seg" role="group" aria-label="Count"><button data-mode="adv" aria-pressed="${state.mode === "adv"}">Advancements</button><button data-mode="crit" aria-pressed="${state.mode === "crit"}">Criteria</button></div>
        </div>
      </aside>
      <div style="display:flex;flex-direction:column;gap:24px;min-width:0">
        <section class="card"><h2 style="margin-bottom:10px">Overlay</h2>${chosen.length ? '<div class="chartbox" id="cmpChart"></div>' : '<p class="muted">Tick a run on the left to draw it.</p>'}</section>
        <section class="card tablewrap"><h2 style="margin-bottom:10px">Phases vs ${baseName}</h2>
          <table style="min-width:${320 + chosen.length * 190}px"><thead><tr><th>Phase</th><th>${baseName}</th>${chosen.map(r => `<th><span class="swatch" style="background:${colorOf(r)};margin-right:6px;vertical-align:middle"></span>${esc(runTitle(r))}</th>`).join("")}</tr></thead><tbody>${phaseRows}
          <tr class="phase-row"><td>Final IGT</td><td class="mono">${state.baseline === "pb" && pb ? fmt(pb.finalIgt, 0) : ""}</td>${chosen.map(r => `<td class="mono">${fmt(r.finalIgt, 0)}${state.baseline === "pb" && pb ? deltaSpan(r.finalIgt - pb.finalIgt) : ""}</td>`).join("")}</tr>
          </tbody></table>
          <p class="note" style="margin:10px 0 0">Green is faster than the baseline, red is slower.</p>
        </section>
        <section class="card tablewrap"><h2 style="margin-bottom:10px">Stats</h2>
          <table style="min-width:${320 + chosen.length * 190}px"><thead><tr><th>Stat</th><th></th>${chosen.map(r => `<th>${esc(runTitle(r))}</th>`).join("")}</tr></thead><tbody>
          ${statRow("Category", r => catBadge(derive(r).category))}
          ${statRow(statIc("s_deaths") + "Non-intentional deaths", r => nonIntentional(r))}
          ${statRow(statIc("s_elytra") + "Elytra distance", r => r.meta && r.meta.elytraCm != null ? (r.meta.elytraCm / 100000).toFixed(1) + " km" : "—")}
          ${statRow(statIc("s_skulls") + "Skulls / wither skeletons", r => { const s = derive(r).skullRate; return s.skulls + " / " + s.kills; })}
          ${statRow(statIc("s_tnt") + "TNT per debris", r => { const x = derive(r).tntPer; return x != null ? x.toFixed(1) : "—"; })}
          ${statRow(statIc("trident") + "Tridents obtained", r => derive(r).lanes.trident.length)}
          ${statRow(statIc("g_nautilus") + "Nautilus shells", r => derive(r).lanes.nautilus.length)}
          ${statRow(statIc("s_shulker") + "Shulker boxes opened", r => num(r.tot.shulkerOpen))}
          ${statRow(statIc("s_creepers") + "Creepers killed", r => num(r.tot.creepers))}
          ${statRow("Gold Block Estimate peak", r => { const g = derive(r).gold; return g.length ? Math.max(...g.map(x => x[1])) : "—"; })}
          </tbody></table>
        </section>
      </div>
    </div>`;
  if (chosen.length) {
    const ser = chosen.map(r => ({points: seriesFor(r, state.mode), color: colorOf(r)}));
    mountChart($("#cmpChart"), {series: ser, W: 1000, H: 420, yKey: state.mode}, t => chosen.map((r, i) => { const l = lastBefore(ser[i].points, t); return `<div><span class="swatch" style="background:${ser[i].color};margin-right:6px;vertical-align:middle"></span>${esc(runTitle(r))}: <b class="mono">${l ? l[1] : 0}</b>${l ? " · " + evLabel(l[2]) : ""}</div>`; }).join(""));
  }
  el.querySelectorAll("[data-pick]").forEach(c => c.addEventListener("change", () => { c.checked ? state.selected.add(c.dataset.pick) : state.selected.delete(c.dataset.pick); renderCompare(); }));
  el.querySelectorAll("[data-base]").forEach(b => b.addEventListener("click", () => { state.baseline = b.dataset.base; renderCompare(); }));
  el.querySelectorAll("[data-mode]").forEach(b => b.addEventListener("click", () => { state.mode = b.dataset.mode; renderCompare(); }));
}

function render() {
  if (state.view === "runs") renderRuns();
  else if (state.view === "run") renderRun();
  else renderCompare();
}

$("#runsTable").addEventListener("change", e => {
  const id = e.target.dataset && e.target.dataset.sel; if (!id) return;
  e.target.checked ? state.selected.add(id) : state.selected.delete(id); renderRuns();
});
$("#runsTable").addEventListener("click", async e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.open) return go("run", b.dataset.open);
  if (b.dataset.del) {
    const r = findRun(b.dataset.del);
    if (!r || !confirm("Delete " + runTitle(r) + (r.src === "site" ? " from the site" : " from this browser") + "? This can't be undone.")) return;
    state.selected.delete(uid(r));
    if (r.src === "local") { localRuns = localRuns.filter(x => x !== r); saveLocal(); render(); return; }
    status.className = "status"; status.textContent = "Publishing…";
    const res = await publishSite(siteRuns.filter(x => x !== r), "Deleted " + runTitle(r) + ".");
    if (!res.ok) { status.className = "status err"; status.textContent = res.readOnly ? "This view can't publish to the site." : res.msg; }
  }
});


/* ================= init ================= */
try { const f = sessionStorage.getItem("aa-flash"); if (f) { status.textContent = f; sessionStorage.removeItem("aa-flash"); } } catch {}
renderHeader(); render();
(async () => {
  const use = n => (window.claude && window.claude.use ? window.claude.use(n).catch(() => null) : Promise.resolve(null));
  const [a, u, dl] = await Promise.all([use("artifact"), use("user"), use("downloads")]);
  artifactNs = a; downloadsNs = dl;
  let ce = null;
  if (u) { try { ce = await u.canEdit(); } catch { ce = null; } }
  canPublish = !!a && ce === true;
  roleKnown = true; renderHeader(); render();
})();
})();
