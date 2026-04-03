
function getProducePhoto(id, width) {
  // Prefer Wikipedia-fetched URL (guaranteed correct content)
  let url = WIKI_PHOTOS[id];
  if (url) {
    return width ? url.replace(/\/\d+px-/, `/${width}px-`) : url;
  }
  return null;
}

function produceCardPhotoHtml(p) {
  const url = getProducePhoto(p.id, 600);
  if (!url) return '';
  return `<div class="pcard-photo-wrap">
    <img class="pcard-photo" src="${url}" alt="${p.name}"
      onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()">
  </div>`;
}

function produceDetailPhotoHtml(p) {
  const url = getProducePhoto(p.id, 600);
  if (!url) {
    return `<div class="detail-photo-wrap"><span class="detail-photo-fallback">${p.icon}</span></div>`;
  }
  return `<div class="detail-photo-wrap">
    <img class="detail-photo" src="${url}" alt="${p.name}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
    <span class="detail-photo-fallback" style="display:none">${p.icon}</span>
  </div>`;
}

function renderCards(cat) {
  const cards = document.getElementById('produceCards');
  const detail = document.getElementById('produceDetail');
  detail.style.display = 'none';
  cards.style.display = 'grid';
  if (!produce[cat]) return;

  cards.innerHTML = produce[cat].map(p => `
    <div class="pcard" role="button" tabindex="0"
         onclick="openDetail('${cat}','${p.id}')"
         onkeydown="if(event.key==='Enter'||event.key===' ')openDetail('${cat}','${p.id}')">
      ${produceCardPhotoHtml(p)}
      <span class="pcard-icon">${p.icon}</span>
      <div class="pcard-tag">${p.tag}</div>
      <div class="pcard-name">${p.name}</div>
      <div class="pcard-desc">${p.desc.substring(0,90)}…</div>
      <div class="pcard-meta">
        <span class="pcard-sow">🌱 ${p.sow}</span>
        <span>🧺 ${p.harvest}</span>
      </div>
      <div class="pcard-difficulty">
        ${[1,2,3].map(n => `<div class="dot${n <= p.difficulty ? ' filled' : ''}"></div>`).join('')}
      </div>
    </div>
  `).join('');
}

// ── OPEN DETAIL ──
function openDetail(cat, id) {
  const p = produce[cat] && produce[cat].find(x => x.id === id);
  if (!p) return;
  const cards = document.getElementById('produceCards');
  const detail = document.getElementById('produceDetail');
  cards.style.display = 'none';
  detail.style.display = 'block';

  // Sequential section counter — increments for each h3 heading
  let _n = 0;
  const n = () => String(++_n).padStart(2,'0');

  document.getElementById('detailInner').innerHTML = `
    <div class="detail-sidebar">
      ${produceDetailPhotoHtml(p)}
      <div class="detail-tag">${p.tag}</div>
      <h2 class="detail-title">${p.name}</h2>
      <div class="detail-latin">${p.latin}</div>
      <div class="detail-stats">
        <div class="dstat dstat--sow"><span class="dstat-label">🌱 Sow</span><span class="dstat-val">${p.sow}</span></div>
        <div class="dstat"><span class="dstat-label">Harvest</span><span class="dstat-val">${p.harvest}</span></div>
        <div class="dstat"><span class="dstat-label">Position</span><span class="dstat-val">${p.position}</span></div>
        <div class="dstat"><span class="dstat-label">Spacing</span><span class="dstat-val">${p.spacing}</span></div>
        <div class="dstat">
          <span class="dstat-label">Difficulty</span>
          <span class="pcard-difficulty" style="display:flex;gap:4px;">
            ${[1,2,3].map(d => `<div class="dot${d <= p.difficulty ? ' filled' : ''}" style="width:9px;height:9px;"></div>`).join('')}
          </span>
        </div>
      </div>
    </div>
    <div class="detail-body">
      <h3>${n()} — About</h3>
      <p>${p.desc}</p>

      ${renderSoilPanel(p.id, n)}

      <h3>${n()} — How to Grow — Step by Step</h3>
      <div class="detail-steps">
        ${p.steps.map((s,i) => `
          <div class="detail-step">
            <div class="step-text"><strong>${s.title}</strong>${s.text}</div>
          </div>
        `).join('')}
      </div>

      <h3>${n()} — Recommended Varieties</h3>
      <div class="agm-legend">
        <span class="variety-agm-badge">AGM</span>
        <span>RHS Award of Garden Merit — independently trialled and recommended for garden performance</span>
      </div>
      <div class="detail-varieties">
        ${p.varieties.map(v => `
          <div class="variety-card${v.agm ? ' variety-card--agm' : ''}">
            <div class="variety-name-row">
              <span class="variety-name">${v.name}</span>
              ${v.agm ? '<span class="variety-agm-badge">AGM</span>' : ''}
            </div>
            <div class="variety-desc">${v.desc}</div>
          </div>
        `).join('')}
      </div>

      <h3>${n()} — Watch Out For</h3>
      <div class="detail-warnings">
        <strong>⚠ Grower's Warning</strong>
        <p>${p.warning}</p>
      </div>

      ${renderStoragePanel(p.id, n)}
    </div>
  `;

  document.getElementById('guides').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderStoragePanel(id, n) {
  const s = storageData[id];
  if (!s) return '';

  const freezeYes = s.freeze.suitable;
  const freezeColor = freezeYes ? '#e8f0ff' : '#fef0f0';
  const freezeBorder = freezeYes ? 'rgba(41,128,185,0.3)' : 'rgba(192,57,43,0.2)';
  const freezeLabel = freezeYes ? '✅ Freezes well' : '❌ Not suitable for freezing';
  const freezeLabelColor = freezeYes ? '#1a5a9a' : '#8b1a1a';

  return `
    <h3>${n()} — How &amp; Where to Store</h3>
    <div class="storage-panel">
      <div class="storage-panel-row">
        <div class="storage-icon-col">
          <span style="font-size:2.5rem">${s.store.icon || '📦'}</span>
        </div>
        <div class="storage-detail-col">
          <div class="storage-method">
            <span class="storage-method-label">Best method</span>
            <span class="storage-method-val">${s.store.method}</span>
          </div>
          <div class="storage-duration">
            <span class="storage-duration-label">Keeps for</span>
            <span class="storage-duration-val">${s.store.duration}</span>
          </div>
          <p class="storage-detail-text">${s.store.detail}</p>
        </div>
      </div>
    </div>

    <h3>${n()} — How &amp; When to Freeze</h3>
    <div class="freeze-panel" style="border-color:${freezeBorder};background:${freezeColor}">
      <div class="freeze-verdict" style="color:${freezeLabelColor}">${freezeLabel}</div>
      ${freezeYes ? `
        <div class="freeze-rows">
          <div class="freeze-row">
            <span class="freeze-row-label">Preparation</span>
            <span class="freeze-row-val">${s.freeze.prep}</span>
          </div>
          <div class="freeze-row">
            <span class="freeze-row-label">Stores frozen</span>
            <span class="freeze-row-val">${s.freeze.duration}</span>
          </div>
          <div class="freeze-row">
            <span class="freeze-row-label">To use</span>
            <span class="freeze-row-val">${s.freeze.thaw}</span>
          </div>
        </div>` : `
        <p class="freeze-no-text">${s.freeze.prep}</p>
        <div class="freeze-row">
          <span class="freeze-row-label">Instead</span>
          <span class="freeze-row-val">${s.freeze.thaw}</span>
        </div>`}
    </div>
  `;
}

function renderSoilPanel(id, n) {
  const s = soilData[id];
  if (!s) return '';
  const makeTag = (label, cls) => `<span class="soil-tag ${cls}">${label}</span>`;
  return `
    <h3>${n()} — Soil Requirements</h3>
    <div class="soil-panel">
      <div class="soil-panel-title">
        🌍 Soil Compatibility
        <span class="soil-ph-badge">pH ${s.ph}</span>
      </div>
      <div class="soil-rows">
        <div class="soil-row">
          <span class="soil-row-label best">Best</span>
          <div class="soil-tags">${s.best.map(t => makeTag(t,'best')).join('')}</div>
        </div>
        ${s.tolerate && s.tolerate.length ? `
        <div class="soil-row">
          <span class="soil-row-label tolerate">Tolerates</span>
          <div class="soil-tags">${s.tolerate.map(t => makeTag(t,'tolerate')).join('')}</div>
        </div>` : ''}
        ${s.avoid && s.avoid.length ? `
        <div class="soil-row">
          <span class="soil-row-label avoid">Avoid</span>
          <div class="soil-tags">${s.avoid.map(t => makeTag(t,'avoid')).join('')}</div>
        </div>` : ''}
      </div>
      <div class="soil-note">💡 ${s.notes}</div>
    </div>
  `;
}

function closeDetail() {
  document.getElementById('produceDetail').style.display = 'none';
  document.getElementById('produceCards').style.display = 'grid';
}

// ── TAB SWITCHING ──
const _produceTabs = document.getElementById('produceTabs');
if (_produceTabs) _produceTabs.addEventListener('click', e => {
  const btn = e.target.closest('.ptab');
  if (!btn) return;
  document.querySelectorAll('.ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-selected','true');
  renderCards(btn.dataset.cat);
});

// Init — script is at end of body so DOM is ready; no DOMContentLoaded needed
renderCards('fruiting');
renderCalendar('Mar');

// ── GARDEN PLANNER ──

const allCrops = [
  { id:'tomato',      icon:'🍅', name:'Tomato',         color:'#c0392b', h:1.4,  type:'veg' },
  { id:'courgette',   icon:'🥒', name:'Courgette',      color:'#27ae60', h:0.6,  type:'veg' },
  { id:'squash',      icon:'🎃', name:'Squash',         color:'#e67e22', h:0.7,  type:'veg' },
  { id:'cucumber',    icon:'🥒', name:'Cucumber',       color:'#1e8449', h:1.2,  type:'veg' },
  { id:'carrot',      icon:'🥕', name:'Carrot',         color:'#e67e22', h:0.4,  type:'veg' },
  { id:'potato',      icon:'🥔', name:'Potato',         color:'#d4ac0d', h:0.5,  type:'veg' },
  { id:'beetroot',    icon:'🫀', name:'Beetroot',       color:'#8e44ad', h:0.45, type:'veg' },
  { id:'parsnip',     icon:'🌻', name:'Parsnip',        color:'#f0e68c', h:0.5,  type:'veg' },
  { id:'kale',        icon:'🥬', name:'Kale',           color:'#196f3d', h:0.9,  type:'veg' },
  { id:'sprouts',     icon:'🟢', name:'Sprouts',        color:'#2e7d32', h:1.0,  type:'veg' },
  { id:'cabbage',     icon:'🥬', name:'Cabbage',        color:'#3d9970', h:0.65, type:'veg' },
  { id:'broccoli',    icon:'🥦', name:'Broccoli',       color:'#1a5276', h:0.8,  type:'veg' },
  { id:'onion',       icon:'🧅', name:'Onion',          color:'#ca6f1e', h:0.4,  type:'veg' },
  { id:'garlic',      icon:'🧄', name:'Garlic',         color:'#f7dc6f', h:0.5,  type:'veg' },
  { id:'leek',        icon:'🥢', name:'Leek',           color:'#4caf50', h:1.1,  type:'veg' },
  { id:'runner',      icon:'🫘', name:'Runner Beans',   color:'#27ae60', h:2.0,  type:'veg' },
  { id:'broadbean',   icon:'🫛', name:'Broad Beans',    color:'#58d68d', h:1.0,  type:'veg' },
  { id:'peas',        icon:'🟡', name:'Peas',           color:'#a9cce3', h:1.5,  type:'veg' },
  { id:'lettuce',     icon:'🥬', name:'Lettuce',        color:'#82e0aa', h:0.3,  type:'veg' },
  { id:'radish',      icon:'🔴', name:'Radish',         color:'#c0392b', h:0.25, type:'veg' },
  { id:'spinach',     icon:'🌿', name:'Spinach/Chard',  color:'#1d8348', h:0.5,  type:'veg' },
  { id:'basil',       icon:'🌿', name:'Basil',          color:'#2ecc71', h:0.4,  type:'veg' },
  { id:'mint',        icon:'🌱', name:'Mint',           color:'#48c9b0', h:0.5,  type:'veg' },
  { id:'chive',       icon:'💜', name:'Chives',         color:'#9b59b6', h:0.4,  type:'veg' },
  { id:'parsley',     icon:'🌱', name:'Parsley',        color:'#27ae60', h:0.4,  type:'veg' },
  { id:'sweetcorn',   icon:'🌽', name:'Sweetcorn',      color:'#f9e79f', h:2.2,  type:'veg' },
  { id:'aubergine',   icon:'🍆', name:'Aubergine',      color:'#6c3483', h:1.0,  type:'veg' },
  { id:'pepper',      icon:'🫑', name:'Pepper',         color:'#e74c3c', h:0.9,  type:'veg' },
  { id:'asparagus',   icon:'🌿', name:'Asparagus',      color:'#5d8a3c', h:1.5,  type:'veg' },
  { id:'rhubarb',     icon:'🌹', name:'Rhubarb',        color:'#e74c3c', h:0.8,  type:'veg' },
  { id:'strawberry',  icon:'🍓', name:'Strawberry',     color:'#e74c3c', h:0.25, type:'fruit' },
  { id:'raspberry',   icon:'🫐', name:'Raspberry',      color:'#c0392b', h:1.4,  type:'fruit' },
  { id:'apple',       icon:'🍎', name:'Apple Tree',     color:'#c0392b', h:3.5,  type:'fruit' },
  { id:'pear',        icon:'🍐', name:'Pear Tree',      color:'#a9b84e', h:3.5,  type:'fruit' },
  { id:'blueberry',   icon:'🫐', name:'Blueberry',      color:'#4a235a', h:1.2,  type:'fruit' },
  { id:'gooseberry',  icon:'🟢', name:'Gooseberry',     color:'#2ecc71', h:1.0,  type:'fruit' },
  { id:'blackcurrant',icon:'🖤', name:'Blackcurrant',   color:'#2c3e50', h:1.1,  type:'fruit' },
  { id:'cherry',      icon:'🍒', name:'Cherry Tree',    color:'#c0392b', h:3.5,  type:'fruit' },
  { id:'plum',        icon:'🟣', name:'Plum Tree',      color:'#8e44ad', h:3.0,  type:'fruit' },
  { id:'blackberry',  icon:'🫐', name:'Blackberry',     color:'#2c3e50', h:1.6,  type:'fruit' },
];

// ── GRID STATE ──
let gridCols = 50;
let gridRows = 50;
let gridSize = 50;
let plotUnit = 'm';
let plotW = 5;
let plotL = 5;

const CELL_M  = 0.1;    // 10cm per cell (metric)
const CELL_FT = 1/12;   // ~1 inch per cell (imperial)
const MAJOR_M  = 10;    // bold line every 10 cells = 1m
const MAJOR_FT = 12;    // bold line every 12 cells = 1ft

let cellPx = 14;
const ZOOM_STEPS = [6, 8, 10, 12, 14, 18, 22, 28];
let zoomIdx = 4;

// Each cell: { zoneId, cropId, cropIcon, cropName }
let gridData = [];

// Named zones: { id, name, type, color, cells: Set of indices }
let zones = [];
let zoneCounter = 0;
let highlightedZoneId = null;

// Interaction state
let tileMode = 'bed';
let selectedCrop = null;
let selectedZoneColor = '#5a8a5a';
let gridBgColor = '#f5f0e8';
let paintMode = false;   // for drag-paint (crop/erase) — module-scoped so mouseup can reset it
let threeCtx = null;

// Drag-to-select state
let isDragging = false;
let dragStartCell = -1;
let dragEndCell = -1;

// ── ZOOM ──
function changeZoom(dir) {
  zoomIdx = Math.max(0, Math.min(ZOOM_STEPS.length - 1, zoomIdx + dir));
  cellPx = ZOOM_STEPS[zoomIdx];
  document.getElementById('zoomLabel').textContent = cellPx + 'px';
  renderGrid();
}

// ── UNIT / SIZE ──
function setUnit(u) {
  plotUnit = u;
  document.getElementById('unitM').classList.toggle('active', u === 'm');
  document.getElementById('unitFt').classList.toggle('active', u === 'ft');
  document.getElementById('unitLabel').textContent = u;
  document.getElementById('plotW').step = '1';
  document.getElementById('plotL').step = '1';
  if (u === 'ft') {
    document.getElementById('plotW').value = Math.round(plotW * 3.281);
    document.getElementById('plotL').value = Math.round(plotL * 3.281);
    document.getElementById('plotW').max = 100;
    document.getElementById('plotL').max = 100;
  } else {
    document.getElementById('plotW').value = Math.round(plotW);
    document.getElementById('plotL').value = Math.round(plotL);
    document.getElementById('plotW').max = 30;
    document.getElementById('plotL').max = 30;
  }
  applyPlotSize();
}

function applyPlotSize() {
  plotW = parseFloat(document.getElementById('plotW').value) || 1;
  plotL = parseFloat(document.getElementById('plotL').value) || 1;
  if (plotUnit === 'm') {
    gridCols = Math.round(plotW / CELL_M);   // 5m → 50 cols
    gridRows = Math.round(plotL / CELL_M);
    const areaM2 = (plotW * plotL).toFixed(0);
    const areaFt2 = Math.round(plotW * plotL * 10.764);
    document.getElementById('dimSummary').textContent =
      `${plotW} × ${plotL} m  ·  ${gridCols} × ${gridRows} cells (10cm each)  ·  ${areaM2} m² / ${areaFt2} ft²`;
  } else {
    gridCols = Math.round(plotW / CELL_FT);
    gridRows = Math.round(plotL / CELL_FT);
    const areaFt2 = Math.round(plotW * plotL);
    const areaM2 = (plotW * plotL * 0.0929).toFixed(1);
    document.getElementById('dimSummary').textContent =
      `${plotW} × ${plotL} ft  ·  ${gridCols} × ${gridRows} cells (1 inch each)  ·  ${areaFt2} ft² / ${areaM2} m²`;
  }
  gridSize = Math.max(gridCols, gridRows);

  // Rebuild gridData, preserving existing cells that still fit
  const prevData = gridData.slice();
  const prevCols = prevData.length > 0 ? Math.round(Math.sqrt(prevData.length)) || gridCols : gridCols;
  gridData = Array(gridCols * gridRows).fill(null).map((_, i) => {
    const row = Math.floor(i / gridCols);
    const col = i % gridCols;
    const oldIdx = row * prevCols + col;
    return (prevData[oldIdx] && col < prevCols && row < Math.ceil(prevData.length / prevCols))
      ? prevData[oldIdx]
      : { zoneId: null, cropId: null, cropIcon: '', cropName: '' };
  });
  // Remove zone cells that are now out of bounds
  zones.forEach(z => {
    z.cells = new Set([...z.cells].filter(idx => idx < gridCols * gridRows));
  });
  zones = zones.filter(z => z.cells.size > 0);

  renderGrid();
  if (document.getElementById('view3d').style.display !== 'none') render3D();
}

// ── RENDER GRID (Canvas-based — fast) ──
const RULER_PX = 28;   // pixels reserved for ruler labels
const SOIL_COLOR   = '#8B5E3C';  // fallback only
const MINOR_LINE   = 'rgba(0,0,0,0.13)';
const MAJOR_LINE   = 'rgba(44,26,14,0.55)';
const BORDER_COLOR = '#4a2e1a';
const FONT_RULER   = '9px DM Mono, monospace';
const FONT_EMOJI   = ''; // computed per cell

let lastHoverIdx = -1;

function renderGrid() {
  const canvas = document.getElementById('plannerCanvas');
  if (!canvas) return;
  const major = plotUnit === 'm' ? MAJOR_M : MAJOR_FT;
  const unitLabel = plotUnit === 'm' ? 'm' : 'ft';

  const totalW = RULER_PX + gridCols * cellPx;
  const totalH = RULER_PX + gridRows * cellPx;

  canvas.width  = totalW;
  canvas.height = totalH;
  canvas.style.width  = totalW + 'px';
  canvas.style.height = totalH + 'px';

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, totalW, totalH);

  // ── Background (canvas outer area) ──
  ctx.fillStyle = '#e8dfd0';
  ctx.fillRect(0, 0, totalW, totalH);

  // ── Draw cells ──
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      const idx = r * gridCols + c;
      const cell = gridData[idx];
      if (!cell) continue;
      const x = RULER_PX + c * cellPx;
      const y = RULER_PX + r * cellPx;

      // Fill colour — use gridBgColor for unzoned cells
      let fillColor = gridBgColor;
      if (cell.zoneId != null) {
        const zone = zones.find(z => z.id === cell.zoneId);
        if (zone) fillColor = zone.color;
      }

      // Selection highlight
      let inSel = false;
      if (isDragging && dragStartCell >= 0 && dragEndCell >= 0) {
        const [minR, maxR, minC, maxC] = getSelectionBounds(dragStartCell, dragEndCell);
        if (r >= minR && r <= maxR && c >= minC && c <= maxC) inSel = true;
      }

      ctx.fillStyle = inSel ? lightenColor(fillColor, 40) : fillColor;
      ctx.fillRect(x, y, cellPx, cellPx);

      // Hover highlight
      if (idx === lastHoverIdx) {
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillRect(x, y, cellPx, cellPx);
      }
    }
  }

  // ── Minor grid lines ──
  ctx.strokeStyle = MINOR_LINE;
  ctx.lineWidth = 0.5;
  for (let c = 0; c <= gridCols; c++) {
    const x = RULER_PX + c * cellPx;
    ctx.beginPath(); ctx.moveTo(x, RULER_PX); ctx.lineTo(x, totalH); ctx.stroke();
  }
  for (let r = 0; r <= gridRows; r++) {
    const y = RULER_PX + r * cellPx;
    ctx.beginPath(); ctx.moveTo(RULER_PX, y); ctx.lineTo(totalW, y); ctx.stroke();
  }

  // ── Major 1m lines ──
  ctx.strokeStyle = MAJOR_LINE;
  ctx.lineWidth = 1.5;
  for (let c = major; c < gridCols; c += major) {
    const x = RULER_PX + c * cellPx;
    ctx.beginPath(); ctx.moveTo(x, RULER_PX); ctx.lineTo(x, totalH); ctx.stroke();
  }
  for (let r = major; r < gridRows; r += major) {
    const y = RULER_PX + r * cellPx;
    ctx.beginPath(); ctx.moveTo(RULER_PX, y); ctx.lineTo(totalW, y); ctx.stroke();
  }

  // ── Zone labels + feature icons — always shown ──
  zones.forEach(zone => {
    if (!zone.cells.size) return;

    // Find bounding box of this zone's cells
    let minR = Infinity, maxR = -Infinity, minC = Infinity, maxC = -Infinity;
    zone.cells.forEach(idx => {
      const r = Math.floor(idx / gridCols), c = idx % gridCols;
      if (r < minR) minR = r; if (r > maxR) maxR = r;
      if (c < minC) minC = c; if (c > maxC) maxC = c;
    });

    const zoneW = (maxC - minC + 1) * cellPx;
    const zoneH = (maxR - minR + 1) * cellPx;
    const cx = RULER_PX + minC * cellPx + zoneW / 2;
    const cy = RULER_PX + minR * cellPx + zoneH / 2;

    // Highlight border if selected from list
    if (zone.id === highlightedZoneId) {
      ctx.strokeStyle = '#f1c40f';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 3]);
      ctx.strokeRect(RULER_PX + minC * cellPx + 1, RULER_PX + minR * cellPx + 1, zoneW - 2, zoneH - 2);
      ctx.setLineDash([]);
    }

    // Bed dimension label (e.g. "1.2m × 2.4m") — shown for bed types
    const isBedType = zone.type && (zone.type.startsWith('bed-') || ['bed','raised','greenhouse','polytunnel'].includes(zone.type));
    if (isBedType && cellPx >= 10) {
      const wM = ((maxC - minC + 1) * (plotUnit === 'm' ? CELL_M : CELL_FT)).toFixed(1);
      const hM = ((maxR - minR + 1) * (plotUnit === 'm' ? CELL_M : CELL_FT)).toFixed(1);
      const dimLabel = wM + (plotUnit === 'm' ? 'm' : 'ft') + ' × ' + hM + (plotUnit === 'm' ? 'm' : 'ft');
      const dimFontSize = Math.max(6, Math.min(10, Math.floor(zoneH * 0.18)));
      ctx.font = `${dimFontSize}px DM Mono, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText(dimLabel, cx, cy + Math.floor(zoneH * 0.32));
    }

    // Feature emoji — always draw if there\'s an icon on cells
    const firstCell = gridData[Math.min(...zone.cells)];
    if (firstCell && firstCell.cropIcon && zone.feature) {
      const emojiSz = Math.max(10, Math.min(24, Math.floor(zoneH * 0.55)));
      ctx.font = `${emojiSz}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(firstCell.cropIcon, cx, cy);
    }

    // Zone name label — centred, always visible, scales with zone size
    const label = zone.name;
    const maxLabelW = zoneW - 4;
    const fontSize = Math.max(7, Math.min(13, Math.floor(zoneH * 0.22), Math.floor(zoneW / (label.length * 0.6 + 1))));
    ctx.font = `bold ${fontSize}px DM Mono, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(label).width;

    if (tw <= maxLabelW || fontSize >= 7) {
      // Background pill
      const pad = 3;
      const labelY = zone.feature ? cy + Math.floor(zoneH * 0.3) : cy;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      const rx = cx - tw / 2 - pad, ry = labelY - fontSize / 2 - 2;
      const rw = Math.min(tw + pad * 2, maxLabelW + pad * 2), rh = fontSize + 4;
      // Rounded rect
      const radius = 2;
      ctx.beginPath();
      ctx.moveTo(rx + radius, ry);
      ctx.lineTo(rx + rw - radius, ry);
      ctx.arcTo(rx + rw, ry, rx + rw, ry + radius, radius);
      ctx.lineTo(rx + rw, ry + rh - radius);
      ctx.arcTo(rx + rw, ry + rh, rx + rw - radius, ry + rh, radius);
      ctx.lineTo(rx + radius, ry + rh);
      ctx.arcTo(rx, ry + rh, rx, ry + rh - radius, radius);
      ctx.lineTo(rx, ry + radius);
      ctx.arcTo(rx, ry, rx + radius, ry, radius);
      ctx.closePath();
      ctx.fill();

      // Clip text to zone width
      ctx.save();
      ctx.rect(RULER_PX + minC * cellPx, RULER_PX + minR * cellPx, zoneW, zoneH);
      ctx.clip();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, cx, labelY);
      ctx.restore();
    }
  });

  // ── Crop emojis on individual cells ──
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      const idx = r * gridCols + c;
      const cell = gridData[idx];
      if (!cell || !cell.cropIcon) continue;
      const zone = cell.zoneId != null ? zones.find(z => z.id === cell.zoneId) : null;
      if (zone && zone.feature) continue; // already drawn above
      if (!cell.cropId) continue; // skip non-crop icons
      const x = RULER_PX + c * cellPx + cellPx / 2;
      const y = RULER_PX + r * cellPx + cellPx / 2;
      const sz = Math.max(8, Math.floor(cellPx * 0.62));
      ctx.font = `${sz}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(cell.cropIcon, x, y);
    }
  }

  // ── Outer border ──
  ctx.strokeStyle = BORDER_COLOR;
  ctx.lineWidth = 2;
  ctx.strokeRect(RULER_PX, RULER_PX, gridCols * cellPx, gridRows * cellPx);

  // ── Rulers ──
  ctx.fillStyle = '#e8dfd0';
  ctx.fillRect(0, 0, totalW, RULER_PX);        // top ruler bg
  ctx.fillRect(0, 0, RULER_PX, totalH);         // left ruler bg

  ctx.fillStyle = '#8b5e3c';
  ctx.font = FONT_RULER;
  ctx.textBaseline = 'middle';

  // Top ruler — label every major mark
  ctx.textAlign = 'center';
  for (let c = 0; c <= gridCols; c += major) {
    const x = RULER_PX + c * cellPx;
    const label = (c / major) + unitLabel;
    ctx.fillText(label, x, RULER_PX / 2);
    // tick mark
    ctx.strokeStyle = '#8b5e3c';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, RULER_PX - 4); ctx.lineTo(x, RULER_PX); ctx.stroke();
  }

  // Left ruler — label every major mark
  ctx.textAlign = 'right';
  for (let r = 0; r <= gridRows; r += major) {
    const y = RULER_PX + r * cellPx;
    const label = (r / major) + unitLabel;
    ctx.fillText(label, RULER_PX - 4, y);
    ctx.beginPath(); ctx.moveTo(RULER_PX - 3, y); ctx.lineTo(RULER_PX, y); ctx.stroke();
  }

  // Corner fill
  ctx.fillStyle = '#e8dfd0';
  ctx.fillRect(0, 0, RULER_PX, RULER_PX);

  updateStats();
}

// Lighten a hex color by amt (0-255)
function lightenColor(hex, amt) {
  let c = hex.replace('#','');
  if (c.length === 3) c = c.split('').map(x=>x+x).join('');
  const r = Math.min(255, parseInt(c.slice(0,2),16) + amt);
  const g = Math.min(255, parseInt(c.slice(2,4),16) + amt);
  const b = Math.min(255, parseInt(c.slice(4,6),16) + amt);
  return `rgb(${r},${g},${b})`;
}

// ── Canvas mouse events ──
function initCanvasEvents() {
  const canvas = document.getElementById('plannerCanvas');
  if (!canvas) return;

  const DRAG_MODES  = ['zone', 'bed', 'fence', 'gate', 'waterbutt', 'watertap', 'compostbin', 'surface', 'irrigation'];
  const POINT_MODES = [];
  const DRAG_PAINT_MODES = ['crop-veg', 'crop-fruit', 'erase'];

  function cellFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left);
    const cy = (e.clientY - rect.top);
    const c = Math.floor((cx - RULER_PX) / cellPx);
    const r = Math.floor((cy - RULER_PX) / cellPx);
    if (c < 0 || c >= gridCols || r < 0 || r >= gridRows) return -1;
    return r * gridCols + c;
  }

  function coordLabel(idx) {
    if (idx < 0) return '';
    const r = Math.floor(idx / gridCols), c = idx % gridCols;
    const xV = +(c * (plotUnit === 'm' ? CELL_M : CELL_FT)).toFixed(1);
    const yV = +(r * (plotUnit === 'm' ? CELL_M : CELL_FT)).toFixed(1);
    return `${xV}${plotUnit}, ${yV}${plotUnit}`;
  }


  canvas.addEventListener('mousedown', e => {
    e.preventDefault();
    const idx = cellFromEvent(e);
    if (idx < 0) return;

    if (DRAG_MODES.includes(tileMode)) {
      isDragging = true; dragStartCell = idx; dragEndCell = idx; renderGrid();
    } else if (POINT_MODES.includes(tileMode)) {
      if (tileMode === 'gate') placeGateOnCell(idx);
      else placePointFeature(idx);
    } else if (tileMode === 'crop-veg' || tileMode === 'crop-fruit' || tileMode === 'erase') {
      paintMode = true;
      if (tileMode === 'crop-veg' || tileMode === 'crop-fruit') applyCropToCell(idx);
      else eraseCell(idx);
    }
  });

  canvas.addEventListener('mousemove', e => {
    const idx = cellFromEvent(e);
    document.getElementById('hoverCoord').textContent = idx >= 0 ? coordLabel(idx) : '';

    // Hover highlight
    if (idx !== lastHoverIdx) {
      lastHoverIdx = idx;
      if (!isDragging && !paintMode) renderGrid();
    }

    if (isDragging && idx >= 0 && idx !== dragEndCell) {
      dragEndCell = idx; renderGrid();
    }

    if (paintMode && idx >= 0) {
      if (tileMode === 'crop-veg' || tileMode === 'crop-fruit') applyCropToCell(idx);
      else if (tileMode === 'erase') eraseCell(idx);
    }
  });

  canvas.addEventListener('mouseleave', () => {
    document.getElementById('hoverCoord').textContent = '';
    lastHoverIdx = -1;
    renderGrid();
  });

  // Touch support
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const touch = e.touches[0];
    const idx = cellFromEvent(touch);
    if (idx < 0) return;
    if (DRAG_MODES.includes(tileMode)) {
      isDragging = true; dragStartCell = idx; dragEndCell = idx; renderGrid();
    } else if (POINT_MODES.includes(tileMode)) {
      if (tileMode === 'gate') placeGateOnCell(idx);
      else placePointFeature(idx);
    } else if (tileMode === 'crop-veg' || tileMode === 'crop-fruit') { applyCropToCell(idx); }
    else if (tileMode === 'erase') { eraseCell(idx); }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const touch = e.touches[0];
    const idx = cellFromEvent(touch);
    if (idx < 0) return;
    if (isDragging && idx !== dragEndCell) { dragEndCell = idx; renderGrid(); }
  }, { passive: false });
}

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    if (dragStartCell >= 0) {
      const indices = getSelectionIndices(dragStartCell, dragEndCell);
      if (tileMode === 'zone') createZoneFromSelection(indices);
      else if (tileMode === 'bed') placeBedOnIndices(indices);
      else if (tileMode === 'fence') placeFenceOnIndices(indices);
      else if (tileMode === 'surface') placeSurfaceOnIndices(indices);
      else if (tileMode === 'irrigation') placeIrrigationOnIndices(indices);
      else placeDragFeatureOnIndices(indices);
    }
    dragStartCell = -1; dragEndCell = -1;
    renderGrid();
  }
  paintMode = false;
});


function getSelectionBounds(startIdx, endIdx) {
  const r1 = Math.floor(startIdx / gridCols), c1 = startIdx % gridCols;
  const r2 = Math.floor(endIdx / gridCols),   c2 = endIdx % gridCols;
  return [Math.min(r1,r2), Math.max(r1,r2), Math.min(c1,c2), Math.max(c1,c2)];
}

function getSelectionIndices(startIdx, endIdx) {
  const [minR, maxR, minC, maxC] = getSelectionBounds(startIdx, endIdx);
  const indices = [];
  for (let r = minR; r <= maxR; r++)
    for (let c = minC; c <= maxC; c++)
      indices.push(r * gridCols + c);
  return indices;
}



// ── GALLERY SELECTION STATE ──
let selectedZoneType = 'bed';
let selectedFenceType = 'fence';
let selectedGateType = 'gate-wood';
let selectedSurfaceType = 'paving';
let selectedIrrigationType = 'drip';
let selectedCompostType = 'cb-dalek';

// ── ZONES ──
function createZoneFromSelection(indices) {
  if (!indices.length) return;
  const name = document.getElementById('zoneNameInput').value.trim() || `Zone ${zoneCounter + 1}`;
  const type = selectedZoneType;
  const color = selectedZoneColor;

  const zone = { id: ++zoneCounter, name, type, color, cells: new Set(indices) };
  zones.push(zone);

  const bedTypes = ['bed', 'raised', 'greenhouse', 'polytunnel', 'bed-raised', 'bed-growing', 'bed-coldframe', 'bed-growbag', 'bed-container', 'bed-border', 'bed-greenhouse', 'bed-polytunnel'];
  indices.forEach(idx => {
    gridData[idx].zoneId = zone.id;
    if (!bedTypes.includes(type)) { gridData[idx].cropId = null; gridData[idx].cropIcon = ''; gridData[idx].cropName = ''; }
  });

  // Auto-increment zone name
  if (name.match(/^(.*?)(\d+)$/)) {
    const m = name.match(/^(.*?)(\d+)$/);
    document.getElementById('zoneNameInput').value = m[1] + (parseInt(m[2]) + 1);
  } else if (name.match(/^(.*?)([A-Z])$/)) {
    const m = name.match(/^(.*?)([A-Z])$/);
    document.getElementById('zoneNameInput').value = m[1] + String.fromCharCode(m[2].charCodeAt(0) + 1);
  } else {
    document.getElementById('zoneNameInput').value = name + ' 2';
  }

  renderGrid(); renderZonesList(); updateDeleteLastBtn();
  if (document.getElementById('view3d').style.display !== 'none') render3D();
}

// Place linear features (fence/gate) or point features (water butt, tap, compost bin)
const FEATURE_DEFS = {
  fence:      { icon: '🪵', color: '#6b4c2a', label: 'Timber Fence' },
  wall:       { icon: '🧱', color: '#8b7355', label: 'Wall' },
  hedge:      { icon: '🌿', color: '#2d6a2d', label: 'Hedge' },
  trellis:    { icon: '🪜', color: '#a0826d', label: 'Trellis' },
  wire:       { icon: '〰️', color: '#888',    label: 'Wire Fence' },
  'gate-wood':{ icon: '🚪', color: '#8b5e3c', label: 'Timber Gate' },
  'gate-metal':{ icon:'🔩', color: '#607d8b', label: 'Metal Gate' },
  arch:       { icon: '🌸', color: '#9b59b6', label: 'Arch / Pergola' },
  waterbutt:  { icon: '🪣', color: '#4a90d9', label: 'Water Butt' },
  watertap:   { icon: '🚰', color: '#2980b9', label: 'Water Tap' },
  compostbin: { icon: '♻️', color: '#2d5a1b', label: 'Compost Bin' },
  // Tap connector outlet variants (placed via irrigation panel)
  'tap-1outlet': { icon: '🚰', color: '#2980b9', label: 'Tap — 1 Outlet' },
  'tap-2outlet': { icon: '🚰', color: '#2980b9', label: 'Tap — 2 Outlets' },
  'tap-3outlet': { icon: '🚰', color: '#2980b9', label: 'Tap — 3 Outlets' },
  'tap-4outlet': { icon: '🚰', color: '#2980b9', label: 'Tap — 4 Outlets' },
  'waterbutt-zone': { icon: '🪣', color: '#4a90d9', label: 'Water Butt' },
  // Compost bin sub-types
  'cb-dalek':   { icon: '♻️', color: '#2d5a1b', label: 'Plastic Dalek Bin' },
  'cb-tumbler': { icon: '🔄', color: '#607d8b', label: 'Tumbler Composter' },
  'cb-worm':    { icon: '🌿', color: '#5d7a3e', label: 'Worm Farm' },
  'cb-pallet':  { icon: '🪵', color: '#8b6914', label: 'Pallet Bin' },
  'cb-timber':  { icon: '🟫', color: '#6b4c2a', label: 'Timber-Framed Bay' },
  'cb-leafcage':{ icon: '🌾', color: '#8b9d4a', label: 'Leaf Mould Cage' },
  // Bed types
  'bed-raised':   { icon: '🟫', color: '#6b4c2a', label: 'Raised Bed' },
  'bed-growing':  { icon: '🌱', color: '#5a8a5a', label: 'Growing Bed' },
  'bed-coldframe':{ icon: '🔲', color: '#82c882', label: 'Cold Frame' },
  'bed-growbag':  { icon: '🎒', color: '#8b7355', label: 'Grow Bag' },
  'bed-container':{ icon: '🪴', color: '#9b6944', label: 'Container' },
  'bed-border':   { icon: '🌸', color: '#e67e22', label: 'Border Bed' },
  'bed-greenhouse':  { icon: '🏠', color: '#82c882', label: 'Greenhouse' },
  'bed-polytunnel':  { icon: '🏕️', color: '#b8d4b8', label: 'Polytunnel' },
  'bed-shed':        { icon: '🛖', color: '#8b6914', label: 'Shed' },
  'bed-summerhouse': { icon: '🏡', color: '#b8860b', label: 'Summerhouse' },
  'bed-garage':      { icon: '🏠', color: '#888888', label: 'Garage' },
  'bed-lawn':        { icon: '🟩', color: '#dce8c8', label: 'Lawn' },
  'bed-compost':     { icon: '♻️', color: '#5d7a3e', label: 'Compost Area' },
  'bed-wildflower':  { icon: '🌸', color: '#e67e22', label: 'Wildflower Area' },
  'bed-parking':     { icon: '🚗', color: '#777777', label: 'Parking' },
  'bed-pond':        { icon: '💧', color: '#4a8fc1', label: 'Pond' },
  'bed-water':       { icon: '🌊', color: '#7ab3d4', label: 'Water Feature' },
  // Surface types
  paving:     { icon: '🪨', color: '#b0a898', label: 'Paving Slabs' },
  gravel:     { icon: '🪨', color: '#d4c5a9', label: 'Gravel' },
  decking:    { icon: '🪵', color: '#a0734a', label: 'Decking' },
  tarmac:     { icon: '⬛', color: '#555',    label: 'Tarmac' },
  concrete:   { icon: '⬜', color: '#999',    label: 'Concrete' },
  bark:       { icon: '🌰', color: '#8b5e3c', label: 'Bark Chip' },
  path:       { icon: '🟫', color: '#c8a46e', label: 'Path' },
  patio:      { icon: '⬜', color: '#c0b090', label: 'Patio' },
  paved:      { icon: '🔲', color: '#aaa',    label: 'Paved Area' },
  // Irrigation types
  drip:       { icon: '💧', color: '#4a90d9', label: 'Drip Line' },
  soaker:     { icon: '〰️', color: '#2980b9', label: 'Soaker Hose' },
  sprinkler:  { icon: '💦', color: '#7ab3d4', label: 'Sprinkler Zone' },
  rainwater:  { icon: '🌧️', color: '#5d8aa8', label: 'Rainwater Zone' },
};

let selectedBedType = 'bed-raised';

function placeBedOnIndices(indices) {
  const def = FEATURE_DEFS[selectedBedType] || FEATURE_DEFS['bed-raised'];
  const color = selectedZoneColor || def.color;
  const nameInput = document.getElementById('zoneNameInput');
  const name = (nameInput && nameInput.value.trim()) || def.label;
  const zone = { id: ++zoneCounter, name, type: selectedBedType, color, cells: new Set(indices), feature: false };
  zones.push(zone);
  indices.forEach(idx => { gridData[idx].zoneId = zone.id; });
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

function placeSurfaceOnIndices(indices) {
  const def = FEATURE_DEFS[selectedSurfaceType] || FEATURE_DEFS['paving'];
  const color = selectedSurfaceColor || def.color;
  const zone = { id: ++zoneCounter, name: def.label, type: selectedSurfaceType, color, cells: new Set(indices), feature: false };
  zones.push(zone);
  indices.forEach(idx => { gridData[idx].zoneId = zone.id; });
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

function placeIrrigationOnIndices(indices) {
  const def = FEATURE_DEFS[selectedIrrigationType] || FEATURE_DEFS['drip'];
  const zone = { id: ++zoneCounter, name: def.label, type: selectedIrrigationType, color: def.color, cells: new Set(indices), feature: true };
  zones.push(zone);
  indices.forEach(idx => {
    gridData[idx].zoneId   = zone.id;
    gridData[idx].cropIcon = def.icon;
    gridData[idx].cropName = def.label;
    gridData[idx].cropId   = null;
  });
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

function placeDragFeatureOnIndices(indices) {
  const def = FEATURE_DEFS[tileMode];
  if (!def) return;
  let resolvedType = tileMode;
  if (tileMode === 'gate')       resolvedType = selectedGateType    || 'gate-wood';
  if (tileMode === 'compostbin') resolvedType = selectedCompostType || 'cb-dalek';
  const resolvedDef = FEATURE_DEFS[resolvedType] || def;
  const zone = { id: ++zoneCounter, name: resolvedDef.label, type: resolvedType, color: resolvedDef.color, cells: new Set(indices), feature: true };
  zones.push(zone);
  indices.forEach(idx => {
    gridData[idx].zoneId   = zone.id;
    gridData[idx].cropIcon = resolvedDef.icon;
    gridData[idx].cropName = resolvedDef.label;
    gridData[idx].cropId   = null;
  });
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

function placeFenceOnIndices(indices) {
  const fType = selectedFenceType;
  const def = FEATURE_DEFS[fType] || FEATURE_DEFS['fence'];
  const zone = { id: ++zoneCounter, name: def.label, type: fType, color: def.color, cells: new Set(indices), feature: true };
  zones.push(zone);
  indices.forEach(idx => {
    gridData[idx].zoneId = zone.id;
    gridData[idx].cropIcon = def.icon;
    gridData[idx].cropName = def.label;
    gridData[idx].cropId = null;
  });
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

function placeGateOnCell(idx) {
  const gType = selectedGateType;
  const def = FEATURE_DEFS[gType] || FEATURE_DEFS['gate-wood'];
  const zone = { id: ++zoneCounter, name: def.label, type: gType, color: def.color, cells: new Set([idx]), feature: true };
  zones.push(zone);
  gridData[idx].zoneId = zone.id;
  gridData[idx].cropIcon = def.icon;
  gridData[idx].cropName = def.label;
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

function placePointFeature(idx) {
  const def = FEATURE_DEFS[tileMode];
  if (!def) return;
  const zone = { id: ++zoneCounter, name: def.label, type: tileMode, color: def.color, cells: new Set([idx]), feature: true };
  zones.push(zone);
  gridData[idx].zoneId = zone.id;
  gridData[idx].cropIcon = def.icon;
  gridData[idx].cropName = def.label;
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

// Auto-colour the zone colour picker when zone type changes
const ZONE_TYPE_COLOURS = {
  bed:          '#5a8a5a',
  raised:       '#6b4c2a',
  greenhouse:   '#82c882',
  polytunnel:   '#b8d4b8',
  path:         '#c8a46e',
  patio:        '#c0b090',
  paved:        '#aaa',
  gravel:       '#d4c5a9',
  shed:         '#8b6914',
  summerhouse:  '#b8860b',
  garage:       '#888',
  pond:         '#4a8fc1',
  water:        '#7ab3d4',
  lawn:         '#dce8c8',
  compost:      '#5d7a3e',
  wildflower:   '#e67e22',
  parking:      '#777',
  // Surfaces
  paving:       '#b0a898',
  decking:      '#a0734a',
  tarmac:       '#555',
  concrete:     '#999',
  bark:         '#8b5e3c',
  // Irrigation
  drip:         '#4a90d9',
  soaker:       '#2980b9',
  sprinkler:    '#7ab3d4',
  rainwater:    '#5d8aa8',
};

function autoColourFromType(type) {
  const col = ZONE_TYPE_COLOURS[type] || '#5a8a5a';
  selectedZoneColor = col;
  const picker = document.getElementById('zoneColorPicker');
  const hex = document.getElementById('zoneColorHex');
  if (picker) picker.value = hexToPickerValue(col);
  if (hex) hex.textContent = col;
  document.querySelectorAll('#zoneColours .zcol').forEach(s => s.classList.remove('selected'));
  const match = document.querySelector(`#zoneColours .zcol[data-col="${col}"]`);
  if (match) match.classList.add('selected');
}

// ── GALLERY INIT ──
function initGalleries() {
  // ── Zone group toggle headers ─────────────────────────────────────────────
  document.querySelectorAll('.ztg-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const id = 'ztg-' + toggle.dataset.ztg;
      const panel = document.getElementById(id);
      if (!panel) return;
      const isOpen = !panel.classList.contains('closed');
      panel.classList.toggle('closed', isOpen);
      toggle.classList.toggle('open', !isOpen);
    });
  });

  // Zone type gallery
  const zoneGallery = document.getElementById('zoneTypeGallery');
  if (zoneGallery) {
    zoneGallery.addEventListener('click', e => {
      const tile = e.target.closest('.ztile[data-type]');
      if (!tile) return;
      zoneGallery.querySelectorAll('.ztile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      selectedZoneType = tile.dataset.type;
      autoColourFromType(selectedZoneType);
    });
  }

  // ── Surface sub-panel switching (when surface type dropdown changes) ─────
  // Wire surf-col swatches in each sub-panel
  document.querySelectorAll('.surf-col').forEach(sw => {
    sw.addEventListener('click', function() {
      this.closest('.surf-colour-grid').querySelectorAll('.surf-col').forEach(s => s.classList.remove('selected'));
      this.classList.add('selected');
      selectedSurfaceColor = this.dataset.col;
      if (FEATURE_DEFS[selectedSurfaceType]) FEATURE_DEFS[selectedSurfaceType].color = selectedSurfaceColor;
    });
  });

  // Wire surf-named-sw (gravel named colour swatches)
  document.querySelectorAll('.surf-named-sw').forEach(sw => {
    sw.addEventListener('click', function() {
      this.closest('.surf-named-swatches').querySelectorAll('.surf-named-sw').forEach(s => s.classList.remove('selected'));
      this.classList.add('selected');
      selectedSurfaceColor = this.dataset.col;
      if (FEATURE_DEFS[selectedSurfaceType]) FEATURE_DEFS[selectedSurfaceType].color = selectedSurfaceColor;
    });
  });

  // Wire surf-size items (paving slab sizes)
  document.querySelectorAll('.surf-size').forEach(sz => {
    sz.addEventListener('click', function() {
      this.closest('.surf-size-grid').querySelectorAll('.surf-size').forEach(s => s.classList.remove('selected'));
      this.classList.add('selected');
      // If gravel type — auto-select matching colour swatch
      if (this.dataset.grav) {
        const col = this.dataset.col;
        if (col) {
          selectedSurfaceColor = col;
          if (FEATURE_DEFS[selectedSurfaceType]) FEATURE_DEFS[selectedSurfaceType].color = col;
          document.querySelectorAll('#gravelColours .surf-col').forEach(s => {
            s.classList.toggle('selected', s.dataset.col === col);
          });
        }
      }
    });
  });

  // ── Irrigation item selection ─────────────────────────────────────────────
  const irrigPanel = document.getElementById('irrigationPanel');
  if (irrigPanel) {
    irrigPanel.addEventListener('click', e => {
      const item = e.target.closest('.irr-item');
      if (!item) return;
      irrigPanel.querySelectorAll('.irr-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selectedIrrigationType = item.dataset.itype || selectedIrrigationType;
      if (item.dataset.col) {
        if (FEATURE_DEFS[selectedIrrigationType]) FEATURE_DEFS[selectedIrrigationType].color = item.dataset.col;
        else FEATURE_DEFS[selectedIrrigationType] = { icon: '💧', color: item.dataset.col, label: item.dataset.label || selectedIrrigationType };
      }
    });
  }
}

// ── Show correct surface sub-pane based on type ───────────────────────────
let selectedSurfaceColor = '#c8c0b0';

function showSurfaceSubPane(type) {
  const allPanes = ['paving','gravel','decking','tarmac','concrete','bark','path','patio','paved'];
  allPanes.forEach(p => {
    const el = document.getElementById('surfacePane-' + p);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById('surfacePane-' + type);
  if (target) target.style.display = '';
  // Set default colour from FEATURE_DEFS
  const def = FEATURE_DEFS[type];
  if (def) { selectedSurfaceColor = def.color; }
}


function deleteZone(id) {
  zones = zones.filter(z => z.id !== id);
  gridData.forEach(cell => {
    if (cell.zoneId === id) { cell.zoneId = null; cell.cropId = null; cell.cropIcon = ''; cell.cropName = ''; }
  });
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
}

function deleteLastInput() {
  if (!zones.length) return;
  const last = zones[zones.length - 1];
  zones.pop();
  gridData.forEach(cell => {
    if (cell.zoneId === last.id) { cell.zoneId = null; cell.cropId = null; cell.cropIcon = ''; cell.cropName = ''; }
  });
  renderGrid(); renderZonesList(); updateDeleteLastBtn();
  // Flash the button to confirm
  const btn = document.getElementById('btnDeleteLast');
  if (btn) { btn.textContent = `⤺ Removed: ${last.name}`; setTimeout(() => { btn.textContent = '⤺ Delete Last Input'; }, 1500); }
}

function updateDeleteLastBtn() {
  const btn = document.getElementById('btnDeleteLast');
  if (!btn) return;
  btn.disabled = zones.length === 0;
  btn.title = zones.length > 0 ? `Delete: "${zones[zones.length - 1].name}"` : 'Nothing to delete';
}

function renderZonesList() {
  const inner = document.getElementById('zonesListInner');
  if (!zones.length) {
    inner.innerHTML = '<div class="no-zones-msg">Nothing placed yet.<br>Select a drawing mode and draw on the grid.</div>';
    renderLegend();
    return;
  }
  const cellSizeM = plotUnit === 'm' ? CELL_M : CELL_FT * 0.3048;
  inner.innerHTML = zones.map(z => {
    const area = (z.cells.size * cellSizeM * cellSizeM).toFixed(2);
    const crops = {};
    z.cells.forEach(idx => { if (gridData[idx] && gridData[idx].cropName && gridData[idx].cropName !== z.name) crops[gridData[idx].cropName] = (crops[gridData[idx].cropName]||0)+1; });
    const cropStr = Object.entries(crops).map(([k,v])=>`${k}×${v}`).join(', ');
    const meta = z.feature ? `${z.cells.size} cell${z.cells.size!==1?'s':''}` : `${z.cells.size} cells · ${area} m²` + (cropStr ? ` · ${cropStr}` : ' · Empty');
    const icon = (FEATURE_DEFS[z.type] && FEATURE_DEFS[z.type].icon) || '';
    return `<div class="zone-list-item" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')selectZoneInList(${z.id})" onclick="selectZoneInList(${z.id})" id="zli-${z.id}" style="border-left-color:${z.color}">
      <span class="zone-swatch" style="background:${z.color}">${icon ? `<span style="font-size:0.7rem;line-height:1">${icon}</span>` : ''}</span>
      <div style="flex:1;min-width:0">
        <div class="zone-list-name">${icon ? icon + ' ' : ''}${z.name}</div>
        <div class="zone-list-meta">${meta}</div>
      </div>
      <button class="zone-del" onclick="event.stopPropagation();renameZone(${z.id},'${z.name.replace(/'/g,"\\'")}')" title="Rename" style="margin-right:2px">✏️</button>
      <button class="zone-del" onclick="event.stopPropagation();deleteZone(${z.id})" title="Delete">✕</button>
    </div>`;
  }).join('');
  renderLegend();
}

// ── LEGEND below canvas ──
function renderLegend() {
  const legend = document.getElementById('planLegend');
  if (!legend) return;
  if (!zones.length) { legend.innerHTML = ''; return; }

  // Deduplicate by name+colour for clean legend entries
  const seen = new Set();
  const entries = [];
  zones.forEach(z => {
    const key = z.name + '|' + z.color;
    if (seen.has(key)) return;
    seen.add(key);
    const icon = (FEATURE_DEFS[z.type] && FEATURE_DEFS[z.type].icon) || '';
    entries.push({ name: z.name, color: z.color, icon, feature: z.feature });
  });

  // Also collect crops
  const crops = {};
  gridData.forEach(c => { if (c.cropId && c.cropName) crops[c.cropName] = c.cropIcon || ''; });

  legend.innerHTML =
    entries.map(e => `
      <div class="legend-entry">
        <span class="legend-dot" style="background:${e.color}"></span>
        ${e.icon ? `<span class="legend-entry-icon">${e.icon}</span>` : ''}
        <span class="legend-entry-label">${e.name}</span>
      </div>`).join('') +
    Object.entries(crops).map(([name, icon]) => `
      <div class="legend-entry">
        <span class="legend-entry-icon">${icon}</span>
        <span class="legend-entry-label">${name}</span>
      </div>`).join('');
}

function selectZoneInList(id) {
  document.querySelectorAll('.zone-list-item').forEach(el => el.classList.remove('selected-zone'));
  const el = document.getElementById('zli-' + id);
  if (el) el.classList.add('selected-zone');
  // Flash the zone on the grid
  highlightedZoneId = id;
  renderGrid();
  setTimeout(() => { highlightedZoneId = null; renderGrid(); }, 1200);
  // Scroll into view on canvas
  const zone = zones.find(z => z.id === id);
  if (zone && zone.cells.size) {
    const idx = Array.from(zone.cells)[0];
    const row = Math.floor(idx / gridCols), col = idx % gridCols;
    const scroller = document.getElementById('canvasScroller');
    if (scroller) {
      scroller.scrollTo({ left: Math.max(0, col * cellPx - 60), top: Math.max(0, row * cellPx - 60), behavior: 'smooth' });
    }
  }
}

function renameZone(id, currentName) {
  const newName = prompt('Rename zone:', currentName);
  if (newName && newName.trim()) {
    const zone = zones.find(z => z.id === id);
    if (zone) { zone.name = newName.trim(); renderGrid(); renderZonesList(); }
  }
}

// ── CROP PLACEMENT ──
function applyCropToCell(idx) {
  if (!selectedCrop) { showHint('Select a crop from the list first.'); return; }
  const cell = gridData[idx];
  const zone = cell.zoneId != null ? zones.find(z => z.id === cell.zoneId) : null;
  const bedTypes = ['bed', 'raised', 'greenhouse', 'polytunnel', 'bed-raised', 'bed-growing', 'bed-coldframe', 'bed-growbag', 'bed-container', 'bed-border', 'bed-greenhouse', 'bed-polytunnel'];
  if (!zone || !bedTypes.includes(zone.type)) { showHint('Crops can only go in a Bed, Greenhouse or Polytunnel zone.'); return; }
  cell.cropId = selectedCrop.id;
  cell.cropIcon = selectedCrop.icon;
  cell.cropName = selectedCrop.name;
  renderGrid(); renderZonesList();
  if (document.getElementById('view3d').style.display !== 'none') render3D();
}

function eraseCell(idx) {
  const cell = gridData[idx];
  if (cell.cropId) {
    cell.cropId = null; cell.cropIcon = ''; cell.cropName = '';
  } else if (cell.zoneId != null) {
    const zone = zones.find(z => z.id === cell.zoneId);
    if (zone) {
      zone.cells.delete(idx);
      if (!zone.cells.size) zones = zones.filter(z => z.id !== zone.id);
    }
    cell.zoneId = null; cell.cropId = null; cell.cropIcon = ''; cell.cropName = '';
    renderZonesList();
  }
  renderGrid();
}

function showHint(msg) {
  const h = document.getElementById('plannerHint');
  const prev = h.textContent;
  h.style.color = '#c0392b';
  h.textContent = '⚠ ' + msg;
  setTimeout(() => { h.style.color = ''; h.textContent = prev; }, 3000);
}

// ── STATS ──
function updateStats() {
  const counts = {};
  let zoneCount = zones.filter(z => !z.feature).length;
  gridData.forEach(c => { if (c.cropName) counts[c.cropName] = (counts[c.cropName]||0)+1; });
  const cellSizeM = plotUnit === 'm' ? CELL_M : CELL_FT * 0.3048;
  const plantedCells = Object.values(counts).reduce((a,b)=>a+b, 0);
  const plantedArea = (plantedCells * cellSizeM * cellSizeM).toFixed(1);
  let html = `<strong>${plotW} × ${plotL} ${plotUnit}</strong><br>`;
  html += `${gridCols} × ${gridRows} grid · ${zoneCount} zone${zoneCount!==1?'s':''}`;
  if (Object.keys(counts).length) {
    html += `<br><br><strong>Crops (${plantedArea} m²):</strong><br>` + Object.entries(counts).map(([k,v])=>`${k}: ${v}`).join('<br>');
  }
  document.getElementById('plannerStats').innerHTML = html;
}

// ── PALETTE ──
function buildPalette() {
  function renderList(listId, type) {
    const list = document.getElementById(listId);
    if (!list) return;
    list.innerHTML = allCrops.filter(c => c.type === type).map(c => `
      <div class="palette-crop" role="button" tabindex="0" data-id="${c.id}" data-name="${c.name.toLowerCase()}" onclick="selectCrop('${c.id}')">
        <span class="palette-crop-icon">${c.icon}</span>
        <span class="palette-crop-name">${c.name}</span>
      </div>`).join('');
  }
  renderList('vegList',   'veg');
  renderList('fruitList', 'fruit');
}

function filterPalette(type) {
  const searchId = type === 'fruit' ? 'fruitSearch' : 'vegSearch';
  const listId   = type === 'fruit' ? 'fruitList'   : 'vegList';
  const q = (document.getElementById(searchId)?.value || '').toLowerCase();
  document.querySelectorAll(`#${listId} .palette-crop`).forEach(el => {
    el.style.display = el.dataset.name.includes(q) ? '' : 'none';
  });
}

function selectCrop(id) {
  selectedCrop = allCrops.find(c => c.id === id);
  document.querySelectorAll('.palette-crop').forEach(el => el.classList.remove('selected'));
  const el = document.querySelector(`.palette-crop[data-id="${id}"]`);
  if (el) el.classList.add('selected');
}

// ── MODE SWITCHING ──
function initTileButtons() {

  const HINTS = {
    zone:        '📐 Drag to define a named area zone',
    bed:         '🏗️ Drag to draw the selected structure or area',
    'crop-veg':  '🥕 Click cells inside a Bed or Greenhouse to plant vegetables',
    'crop-fruit':'🍓 Click cells inside a Bed or growing zone to plant fruit',
    fence:       '🪵 Drag to draw the selected fence or wall',
    gate:        '🚪 Drag to place the selected gate or arch',
    waterbutt:   '🪣 Drag to place and size a water butt',
    watertap:    '🚰 Drag to place and size a water tap',
    compostbin:  '♻️ Drag to place and size the selected compost bin type',
    surface:     '🔲 Drag to draw the selected surface area',
    irrigation:  '💧 Drag to mark the selected irrigation zone',
    erase:       '✕ Click or drag to erase cells',
  };

  const tileBtns = document.getElementById('tileBtns');

  // ── Category header toggles ───────────────────────────────────────────────
  tileBtns.addEventListener('click', e => {

    // Category toggle click
    const toggle = e.target.closest('.mode-group-toggle');
    if (toggle) {
      const dropId = 'drop-' + toggle.dataset.drop;
      const drop = document.getElementById(dropId);
      const isOpening = drop && drop.style.display === 'none';
      if (drop) drop.style.display = isOpening ? '' : 'none';

      // When Water & Irrigation is opened, show the full irrigation panel
      if (toggle.dataset.drop === 'irrigation') {
        const irrPanel = document.getElementById('irrigationPanel');
        if (irrPanel) irrPanel.style.display = isOpening ? '' : 'none';
        if (isOpening) {
          tileMode = 'irrigation';
          document.getElementById('plannerHint').textContent = '💧 Select a component below, then drag on the grid';
          ['zonePanel','vegPanel','fruitPanel','surfacePanel'].forEach(id => {
            const el = document.getElementById(id); if (el) el.style.display = 'none';
          });
        }
      }
      return;
    }

    // Dropdown item click — sets mode + sub-type
    const mddItem = e.target.closest('.mdd-item');
    if (mddItem) {
      const parent = mddItem.closest('.mode-dropdown');
      parent.querySelectorAll('.mdd-item').forEach(i => i.classList.remove('selected'));
      mddItem.classList.add('selected');

      // Determine mode from item's data-mode attribute (new system)
      const newMode = mddItem.dataset.mode;
      if (newMode) {
        setTileMode(newMode);
      }

      // Sub-type handlers
      if (mddItem.dataset.btype) {
        selectedBedType = mddItem.dataset.btype;
        // Sync zone colour picker to this item's default colour
        if (mddItem.dataset.col) {
          selectedZoneColor = mddItem.dataset.col;
          const picker = document.getElementById('zoneColorPicker');
          const hexEl  = document.getElementById('zoneColorHex');
          if (picker) picker.value = hexToPickerValue(mddItem.dataset.col);
          if (hexEl)  hexEl.textContent = mddItem.dataset.col;
          document.querySelectorAll('#zoneColours .zcol').forEach(s =>
            s.classList.toggle('selected', s.dataset.col === mddItem.dataset.col)
          );
        }
      }
      if (mddItem.dataset.ftype) selectedFenceType      = mddItem.dataset.ftype;
      if (mddItem.dataset.gtype) selectedGateType       = mddItem.dataset.gtype;
      if (mddItem.dataset.cbtype) {
        selectedCompostType = 'cb-' + mddItem.dataset.cbtype;
        // update FEATURE_DEFS default colour from item
        if (mddItem.dataset.col && FEATURE_DEFS[selectedCompostType]) {
          FEATURE_DEFS['compostbin'].color = mddItem.dataset.col;
        }
      }
      if (mddItem.dataset.stype) {
        selectedSurfaceType = mddItem.dataset.stype;
        // Show inline sub-panel directly under this item
        document.querySelectorAll('.mdd-inline-sub').forEach(el => el.style.display = 'none');
        const sub = document.getElementById('mdd-sub-' + mddItem.dataset.stype);
        if (sub) sub.style.display = '';
        setTileMode('surface');
        if (FEATURE_DEFS[mddItem.dataset.stype]) selectedSurfaceColor = FEATURE_DEFS[mddItem.dataset.stype].color;
      }
      if (mddItem.dataset.itype) {
        selectedIrrigationType = mddItem.dataset.itype;
        setTileMode('irrigation');
      }
      if (mddItem.dataset.graveltype) {
        const gravelCols = { pea:'#d4c5a9', golden:'#e8d898', slate:'#4a4a55', cotswold:'#ddd0a8', flint:'#e8e4d8', granite:'#888878', limestone:'#e0d8c8', shingle:'#b8b8c8' };
        const col = gravelCols[mddItem.dataset.graveltype] || '#d4c5a9';
        document.querySelectorAll('#gravelColours .surf-named-sw').forEach(s => s.classList.remove('selected'));
        const match = document.querySelector(`#gravelColours [data-col="${col}"]`);
        if (match) { match.classList.add('selected'); selectedSurfaceColor = col; if (FEATURE_DEFS[selectedSurfaceType]) FEATURE_DEFS[selectedSurfaceType].color = col; }
      }
      return;
    }

    // Inline sub-panel: colour swatch click
    const inlineSwatch = e.target.closest('.mdd-swatch');
    if (inlineSwatch) {
      const forType = inlineSwatch.dataset.for || selectedSurfaceType;
      inlineSwatch.closest('.mdd-sub-swatches').querySelectorAll('.mdd-swatch').forEach(s => s.classList.remove('selected'));
      inlineSwatch.classList.add('selected');
      selectedSurfaceColor = inlineSwatch.dataset.col;
      if (FEATURE_DEFS[forType]) FEATURE_DEFS[forType].color = selectedSurfaceColor;
      return;
    }

    // Inline sub-panel: chip click (size / style)
    const inlineChip = e.target.closest('.mdd-chip');
    if (inlineChip) {
      inlineChip.closest('.mdd-sub-chips').querySelectorAll('.mdd-chip').forEach(c => c.classList.remove('selected'));
      inlineChip.classList.add('selected');
      return;
    }
  });

  // Zone colour picker — presets
  document.getElementById('zoneColours').addEventListener('click', e => {
    const swatch = e.target.closest('.zcol');
    if (!swatch) return;
    document.querySelectorAll('#zoneColours .zcol').forEach(s => s.classList.remove('selected'));
    swatch.classList.add('selected');
    selectedZoneColor = swatch.dataset.col;
    document.getElementById('zoneColorPicker').value = hexToPickerValue(selectedZoneColor);
    document.getElementById('zoneColorHex').textContent = selectedZoneColor;
  });

  // Grid background presets
  document.getElementById('bgPresets').addEventListener('click', e => {
    const swatch = e.target.closest('.zcol');
    if (!swatch) return;
    document.querySelectorAll('#bgPresets .zcol').forEach(s => s.classList.remove('selected'));
    swatch.classList.add('selected');
    gridBgColor = swatch.dataset.bg;
    document.getElementById('gridBgPicker').value = hexToPickerValue(gridBgColor);
    document.getElementById('gridBgHex').textContent = gridBgColor;
    renderGrid();
  });

  // Init canvas mouse/touch events
  initCanvasEvents();

  // Helper: set active mode and update UI
  function setTileMode(mode) {
    tileMode = mode;
    // Side panels — zonePanel now shown for both zone and bed modes
    document.getElementById('zonePanel').style.display        = (mode === 'zone' || mode === 'bed') ? '' : 'none';
    document.getElementById('vegPanel').style.display         = mode === 'crop-veg'   ? '' : 'none';
    document.getElementById('fruitPanel').style.display       = mode === 'crop-fruit' ? '' : 'none';
    // surfacePanel options are now inline — keep hidden
    const surfPanel = document.getElementById('surfacePanel');
    if (surfPanel) surfPanel.style.display = 'none';
    const isIrrFamily = ['irrigation','waterbutt','watertap'].includes(mode);
    document.getElementById('irrigationPanel').style.display  = isIrrFamily ? '' : 'none';
    // Hint
    document.getElementById('plannerHint').textContent = HINTS[mode] || '';
    // Erase button state
    const eraseBtn = document.getElementById('btnErase');
    if (eraseBtn) eraseBtn.classList.toggle('active', mode === 'erase');
    // Clear crop selection when leaving crop modes
    if (mode !== 'crop-veg' && mode !== 'crop-fruit') {
      selectedCrop = null;
      document.querySelectorAll('.palette-crop').forEach(el => el.classList.remove('selected'));
    }
  }
}

// setEraseMode — called by Erase button in zoom bar
function setEraseMode(btn) {
  const isActive = btn.classList.contains('active');
  if (isActive) {
    // toggle off — revert to bed mode
    tileMode = 'bed';
    btn.classList.remove('active');
    document.getElementById('plannerHint').textContent = '🏗️ Drag to place and size the selected structure';
    document.getElementById('zonePanel').style.display = '';
  } else {
    tileMode = 'erase';
    btn.classList.add('active');
    document.getElementById('plannerHint').textContent = '✕ Click or drag to erase cells';
    // Close all side panels
    ['zonePanel','vegPanel','fruitPanel','surfacePanel','irrigationPanel'].forEach(id => {
      const el = document.getElementById(id); if (el) el.style.display = 'none';
    });
  }
}

// Handle zone colour native input change
function onZoneColorInput(val) {
  selectedZoneColor = val;
  document.getElementById('zoneColorHex').textContent = val;
  // Deselect presets since custom colour chosen
  document.querySelectorAll('#zoneColours .zcol').forEach(s => s.classList.remove('selected'));
}

// Handle grid background native input change
function onGridBgInput(val) {
  gridBgColor = val;
  document.getElementById('gridBgHex').textContent = val;
  document.querySelectorAll('#bgPresets .zcol').forEach(s => s.classList.remove('selected'));
  renderGrid();
}

// Convert a hex/named colour to a 6-digit hex for the native color input
function hexToPickerValue(col) {
  if (/^#[0-9a-fA-F]{6}$/.test(col)) return col;
  if (/^#[0-9a-fA-F]{3}$/.test(col)) {
    return '#' + col[1]+col[1]+col[2]+col[2]+col[3]+col[3];
  }
  // named colours — render to canvas to resolve
  const tmp = document.createElement('canvas');
  tmp.width = tmp.height = 1;
  const tctx = tmp.getContext('2d');
  tctx.fillStyle = col;
  tctx.fillRect(0,0,1,1);
  const d = tctx.getImageData(0,0,1,1).data;
  return '#' + [d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join('');
}

// ── ACTIONS ──
function clearPlot() {
  if (!confirm('Clear all zones and crops from the plot?')) return;
  gridData = Array(gridCols * gridRows).fill(null).map(() => ({ zoneId:null, cropId:null, cropIcon:'', cropName:'' }));
  zones = [];
  zoneCounter = 0;
  renderGrid();
  renderZonesList();
  renderLegend();
  updateDeleteLastBtn();
  if (document.getElementById('view3d').style.display !== 'none') render3D();
}

function savePlan() {
  try {
    const payload = {
      v: 1,
      plotW, plotL, plotUnit,
      gridBgColor,
      zoneCounter,
      zones: zones.map(z => ({
        id: z.id, name: z.name, type: z.type, color: z.color,
        feature: z.feature, cells: Array.from(z.cells)
      })),
      gridData: gridData.map(c => ({
        zoneId: c.zoneId, cropId: c.cropId, cropIcon: c.cropIcon, cropName: c.cropName
      }))
    };
    localStorage.setItem('fjgl_plan', JSON.stringify(payload));
    showHint('✅ Plan saved — will restore next visit');
    setTimeout(() => { const h = document.getElementById('plannerHint'); if (h) h.style.color = ''; }, 3000);
    document.getElementById('plannerHint').style.color = '#2ecc71';
  } catch(e) {
    alert('Could not save — localStorage may be unavailable.');
  }
}

function loadSavedPlan() {
  try {
    const raw = localStorage.getItem('fjgl_plan');
    if (!raw) return false;
    const p = JSON.parse(raw);
    if (!p || p.v !== 1) return false;
    plotW = p.plotW; plotL = p.plotL; plotUnit = p.plotUnit;
    gridBgColor = p.gridBgColor || gridBgColor;
    zoneCounter = p.zoneCounter || 0;
    zones = p.zones.map(z => ({ ...z, cells: new Set(z.cells) }));
    gridData.forEach((c, i) => {
      const s = p.gridData[i];
      if (s) { c.zoneId = s.zoneId; c.cropId = s.cropId; c.cropIcon = s.cropIcon; c.cropName = s.cropName; }
    });
    return true;
  } catch(e) { return false; }
}

// ── VIEW SWITCHING ──
function switchView(v) {
  document.getElementById('btn2d').classList.toggle('active', v==='2d');
  document.getElementById('btn3d').classList.toggle('active', v==='3d');
  document.getElementById('view2d').style.display = v==='2d' ? '' : 'none';
  document.getElementById('view3d').style.display = v==='3d' ? '' : 'none';
  if (v === '3d') { if (window.THREE) render3D(); else loadThree(); }
}

// ── THREE.JS ──
function loadThree() {
  if (document.getElementById('threejs-script')) return;
  const s = document.createElement('script');
  s.id = 'threejs-script';
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload = () => { if (document.getElementById('view3d').style.display !== 'none') render3D(); };
  document.head.appendChild(s);
}

function render3D() {
  const THREE = window.THREE;
  const canvas = document.getElementById('threeCanvas');
  if (!THREE || !canvas) return;
  if (threeCtx) { threeCtx._animRunning = false; try { threeCtx.renderer.dispose(); } catch(e){} }

  const W = canvas.parentElement.clientWidth || 800, H = 580;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(W, H, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0xf5f0e8);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf5f0e8, 25, 70);
  const camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 200);

  scene.add(new THREE.AmbientLight(0xfff8e7, 0.65));
  const sun = new THREE.DirectionalLight(0xfff0d0, 1.2);
  sun.position.set(15, 25, 10); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); scene.add(sun);
  const backLight = new THREE.DirectionalLight(0xd0e8ff, 0.4);
  backLight.position.set(-10, 10, -5); scene.add(backLight);
  const fill = new THREE.DirectionalLight(0xd0e8ff, 0.35);
  fill.position.set(-10, 8, -5); scene.add(fill);

  const TILE = 0.65, GAP = 0.03, step = TILE + GAP;
  const bW = gridCols * step + 0.2, bD = gridRows * step + 0.2;
  const base = new THREE.Mesh(new THREE.BoxGeometry(bW, 0.12, bD), new THREE.MeshLambertMaterial({ color: 0x3d2010 }));
  base.position.set((gridCols-1)*step/2, -0.08, (gridRows-1)*step/2);
  base.receiveShadow = true; scene.add(base);

  for (let i = 0; i < gridCols * gridRows; i++) {
    const cell = gridData[i];
    const zone = cell.zoneId != null ? zones.find(z => z.id === cell.zoneId) : null;
    const row = Math.floor(i / gridCols), col = i % gridCols;
    const x = col * step, z = row * step;

    let tileColor = 0x6b3a1f;
    if (zone) { const c = zone.color.replace('#',''); tileColor = parseInt(c, 16); }

    const tMesh = new THREE.Mesh(new THREE.BoxGeometry(TILE, 0.07, TILE), new THREE.MeshLambertMaterial({ color: tileColor }));
    tMesh.position.set(x, 0, z); tMesh.receiveShadow = true; scene.add(tMesh);

    if (zone && zone.type === 'water') {
      const wM = new THREE.Mesh(new THREE.PlaneGeometry(TILE*0.82, TILE*0.82), new THREE.MeshLambertMaterial({ color:0x5dade2, transparent:true, opacity:0.65 }));
      wM.rotation.x = -Math.PI/2; wM.position.set(x, 0.042, z); scene.add(wM);
    }

    if (cell.cropId) {
      const cropDef = allCrops.find(c => c.id === cell.cropId);
      const h = (cropDef ? cropDef.h : 0.5) * 0.85;
      const cColor = cropDef ? parseInt(cropDef.color.replace('#',''), 16) : 0x27ae60;
      const stemH = h * 0.55;
      const stemM = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.032, stemH, 7), new THREE.MeshLambertMaterial({ color: 0x4e342e }));
      stemM.position.set(x, 0.04 + stemH/2, z); stemM.castShadow = true; scene.add(stemM);
      const r = Math.min(0.20, h * 0.21);
      const hM = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), new THREE.MeshLambertMaterial({ color: cColor }));
      hM.position.set(x, 0.04 + stemH + r*0.65, z); hM.castShadow = true; scene.add(hM);
      if (h > 0.9) {
        const tM2 = new THREE.Mesh(new THREE.SphereGeometry(r*0.65, 7, 5), new THREE.MeshLambertMaterial({ color: cColor }));
        tM2.position.set(x, 0.04 + stemH + r*1.55, z); scene.add(tM2);
      }
    }
  }

  let rotY = 0.5, rotX = 0.55, zoom = 1.0, panX = 0, panZ = 0;
  const cx = (gridCols-1)*step/2, cz = (gridRows-1)*step/2;
  function updateCam() {
    const r = gridSize * 1.25 * zoom;
    camera.position.set(cx + panX + r * Math.sin(rotY) * Math.cos(rotX), Math.max(1.5, r * Math.sin(rotX)), cz + panZ + r * Math.cos(rotY) * Math.cos(rotX));
    camera.lookAt(cx + panX, 0.5, cz + panZ);
  }
  updateCam();

  let drag = false, rightDrag = false, px = 0, py = 0;
  canvas.addEventListener('mousedown', e => { drag=true; rightDrag=e.button===2; px=e.clientX; py=e.clientY; e.preventDefault(); });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  const onMove = e => { if (!drag) return; const dx=e.clientX-px, dy=e.clientY-py; px=e.clientX; py=e.clientY; if (rightDrag){panX-=dx*0.012;panZ-=dy*0.012;}else{rotY-=dx*0.009;rotX=Math.max(0.08,Math.min(1.45,rotX-dy*0.007));} updateCam(); };
  const onUp = () => drag=false;
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  canvas.addEventListener('wheel', e => { zoom=Math.max(0.25,Math.min(3.5,zoom+e.deltaY*0.0008)); updateCam(); e.preventDefault(); }, {passive:false});

  let lastPinch = 0;
  canvas.addEventListener('touchstart', e => { if(e.touches.length===1){drag=true;rightDrag=false;px=e.touches[0].clientX;py=e.touches[0].clientY;} if(e.touches.length===2)lastPinch=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY); });
  canvas.addEventListener('touchmove', e => { if(e.touches.length===1&&drag){const dx=e.touches[0].clientX-px,dy=e.touches[0].clientY-py;px=e.touches[0].clientX;py=e.touches[0].clientY;rotY-=dx*0.009;rotX=Math.max(0.08,Math.min(1.45,rotX-dy*0.007));updateCam();} if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);zoom=Math.max(0.25,Math.min(3.5,zoom*(lastPinch/d)));lastPinch=d;updateCam();} e.preventDefault(); },{passive:false});
  canvas.addEventListener('touchend', ()=>drag=false);

  const ctx3 = { renderer, _animRunning: true };
  threeCtx = ctx3;
  (function loop() { if (!ctx3._animRunning) return; requestAnimationFrame(loop); renderer.render(scene, camera); })();
  ctx3._cleanup = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
}

// ── COMPASS & SUN ──
let sunData = null;
let locationLat = null, locationLng = null;
let northAngleDeg = 0;  // 0 = north is at top of plan

function setNorthAngle(val) {
  northAngleDeg = parseInt(val);
  const dir = northAngleDeg === 0 ? 'top' :
              northAngleDeg === 90 ? 'right' :
              northAngleDeg === 180 ? 'bottom' :
              northAngleDeg === 270 ? 'left' : northAngleDeg + '°';
  document.getElementById('northAngleLabel').textContent = northAngleDeg + '° (' + dir + ')';
  if (sunData) drawCompass();
  renderGrid(); // redraw grid with updated north direction overlaid
}


function lookupLocation() {
  const raw    = document.getElementById('locationInput').value.trim().toUpperCase().replace(/\s+/g,' ');
  const nameEl = document.getElementById('locationName');
  if (!raw) return;

  // ── All 124 UK postcode areas → approximate centre lat/lng ───────────────
  const UK_AREAS = {
    AB:[57.15,-2.11],AL:[51.75,-0.34],B:[52.48,-1.90],BA:[51.38,-2.36],
    BB:[53.74,-2.48],BD:[53.79,-1.75],BH:[50.74,-1.90],BL:[53.58,-2.43],
    BN:[50.83,-0.14],BR:[51.38,0.02],BS:[51.45,-2.60],CA:[54.89,-2.94],
    CB:[52.21,0.12],CF:[51.48,-3.18],CH:[53.19,-2.89],CM:[51.74,0.46],
    CO:[51.89,0.90],CR:[51.37,-0.10],CT:[51.28,1.08],CV:[52.41,-1.51],
    CW:[53.09,-2.44],DA:[51.44,0.22],DD:[56.46,-2.97],DE:[52.92,-1.48],
    DG:[55.07,-3.61],DH:[54.78,-1.57],DL:[54.52,-1.55],DN:[53.52,-1.13],
    DT:[50.71,-2.44],DY:[52.51,-2.09],E:[51.52,-0.04],EC:[51.52,-0.10],
    EH:[55.95,-3.19],EN:[51.66,-0.08],EX:[50.72,-3.53],FK:[56.00,-3.79],
    FY:[53.82,-3.05],G:[55.86,-4.26],GL:[51.86,-2.24],GU:[51.24,-0.57],
    GY:[49.46,-2.54],HA:[51.58,-0.35],HD:[53.65,-1.78],HG:[54.00,-1.54],
    HP:[51.76,-0.65],HR:[52.06,-2.72],HS:[57.77,-7.02],HU:[53.74,-0.33],
    HX:[53.72,-1.86],IG:[51.56,0.08],IP:[52.06,1.16],IV:[57.48,-4.23],
    JE:[49.19,-2.11],KA:[55.61,-4.50],KT:[51.37,-0.30],KW:[58.44,-3.09],
    KY:[56.20,-3.16],L:[53.41,-2.98],LA:[54.05,-2.80],LD:[52.24,-3.37],
    LE:[52.63,-1.13],LL:[53.32,-3.83],LN:[53.23,-0.54],LS:[53.80,-1.55],
    LU:[51.88,-0.42],M:[53.48,-2.24],ME:[51.27,0.52],MK:[52.04,-0.76],
    ML:[55.78,-3.98],N:[51.55,-0.13],NE:[54.97,-1.61],NG:[52.95,-1.14],
    NN:[52.24,-0.90],NP:[51.59,-3.00],NR:[52.63,1.30],NW:[51.55,-0.16],
    OL:[53.54,-2.12],OX:[51.75,-1.26],PA:[55.84,-4.57],PE:[52.57,-0.24],
    PH:[56.40,-3.44],PL:[50.38,-4.14],PO:[50.82,-1.08],PR:[53.76,-2.70],
    RG:[51.46,-1.00],RH:[51.23,-0.19],RM:[51.56,0.20],S:[53.38,-1.47],
    SA:[51.62,-3.94],SE:[51.50,-0.06],SG:[51.90,-0.20],SK:[53.40,-2.16],
    SL:[51.52,-0.62],SM:[51.40,-0.20],SN:[51.56,-1.78],SO:[50.90,-1.40],
    SP:[51.07,-1.79],SR:[54.91,-1.38],SS:[51.54,0.71],ST:[52.90,-2.16],
    SW:[51.47,-0.17],SY:[52.71,-2.75],TA:[51.02,-3.10],TD:[55.60,-2.47],
    TF:[52.70,-2.48],TN:[51.12,0.26],TQ:[50.46,-3.53],TR:[50.26,-5.05],
    TS:[54.57,-1.24],TW:[51.45,-0.33],UB:[51.54,-0.48],W:[51.51,-0.20],
    WA:[53.39,-2.60],WC:[51.52,-0.12],WD:[51.66,-0.42],WF:[53.68,-1.50],
    WN:[53.55,-2.63],WR:[52.19,-2.22],WS:[52.58,-1.98],WV:[52.59,-2.13],
    YO:[53.96,-1.08],ZE:[60.15,-1.15]
  };

  // ── Common UK town/city names ─────────────────────────────────────────────
  const UK_TOWNS = {
    'LONDON':[51.51,-0.13],'MANCHESTER':[53.48,-2.24],'BIRMINGHAM':[52.48,-1.90],
    'LEEDS':[53.80,-1.55],'GLASGOW':[55.86,-4.26],'SHEFFIELD':[53.38,-1.47],
    'BRADFORD':[53.79,-1.75],'EDINBURGH':[55.95,-3.19],'LIVERPOOL':[53.41,-2.98],
    'BRISTOL':[51.45,-2.60],'CARDIFF':[51.48,-3.18],'COVENTRY':[52.41,-1.51],
    'NOTTINGHAM':[52.95,-1.14],'LEICESTER':[52.63,-1.13],'HULL':[53.74,-0.33],
    'KINGSTON UPON HULL':[53.74,-0.33],'YORK':[53.96,-1.08],'PLYMOUTH':[50.38,-4.14],
    'STOKE':[52.90,-2.16],'WOLVERHAMPTON':[52.59,-2.13],'DERBY':[52.92,-1.48],
    'SWANSEA':[51.62,-3.94],'SOUTHAMPTON':[50.90,-1.40],'ABERDEEN':[57.15,-2.11],
    'CAMBRIDGE':[52.21,0.12],'OXFORD':[51.75,-1.26],'BATH':[51.38,-2.36],
    'EXETER':[50.72,-3.53],'NORWICH':[52.63,1.30],'IPSWICH':[52.06,1.16],
    'READING':[51.46,-1.00],'COLCHESTER':[51.89,0.90],'PETERBOROUGH':[52.57,-0.24],
    'LINCOLN':[53.23,-0.54],'GLOUCESTER':[51.86,-2.24],'WORCESTER':[52.19,-2.22],
    'CHESTER':[53.19,-2.89],'CARLISLE':[54.89,-2.94],'DURHAM':[54.78,-1.57],
    'NEWCASTLE':[54.97,-1.61],'SUNDERLAND':[54.91,-1.38],'MIDDLESBROUGH':[54.57,-1.24],
    'HARROGATE':[54.00,-1.54],'BLACKPOOL':[53.82,-3.05],'BOLTON':[53.58,-2.43],
    'BRIGHTON':[50.83,-0.14],'BELFAST':[54.60,-5.93],'INVERNESS':[57.48,-4.23],
    'DUNDEE':[56.46,-2.97],'PERTH':[56.40,-3.44],'STIRLING':[56.12,-3.94],
    'NEWPORT':[51.59,-3.00],'WREXHAM':[53.04,-3.00],'PORTSMOUTH':[50.82,-1.08],
    'SHREWSBURY':[52.71,-2.75],'HEREFORD':[52.06,-2.72],'TELFORD':[52.70,-2.48],
    'WARRINGTON':[53.39,-2.60],'WAKEFIELD':[53.68,-1.50],'DONCASTER':[53.52,-1.13],
    'HUDDERSFIELD':[53.65,-1.78],'BLACKBURN':[53.74,-2.48],'WIGAN':[53.55,-2.63],
    'BARNSLEY':[53.55,-1.48],'ROTHERHAM':[53.43,-1.36],'STOKE-ON-TRENT':[52.90,-2.16],
    'SALFORD':[53.49,-2.29],'PAISLEY':[55.84,-4.57],'FALKIRK':[56.00,-3.79]
  };

  // 1. Try as UK postcode → extract area code (1–2 letters)
  const m = raw.replace(/\s/g,'').match(/^([A-Z]{1,2})\d/);
  if (m && UK_AREAS[m[1]]) {
    const [lt, ln] = UK_AREAS[m[1]];
    locationLat = lt; locationLng = ln;
    nameEl.textContent = '📍 ' + raw + ' (postcode area ' + m[1] + ')';
    fetchSunData(lt, ln);
    return;
  }

  // 2. Try as town / city name
  if (UK_TOWNS[raw]) {
    const [lt, ln] = UK_TOWNS[raw];
    locationLat = lt; locationLng = ln;
    nameEl.textContent = '📍 ' + raw.charAt(0) + raw.slice(1).toLowerCase();
    fetchSunData(lt, ln);
    return;
  }

  // 3. Partial town match
  const partial = Object.keys(UK_TOWNS).find(k => k.startsWith(raw) || raw.startsWith(k));
  if (partial) {
    const [lt, ln] = UK_TOWNS[partial];
    locationLat = lt; locationLng = ln;
    nameEl.textContent = '📍 ' + partial.charAt(0) + partial.slice(1).toLowerCase();
    fetchSunData(lt, ln);
    return;
  }

  nameEl.textContent = '⚠ Not recognised — try just the first part of your postcode (e.g. HU17) or enter coordinates below';
}

function useMyLocation() {
  const btn    = document.getElementById('geoBtn');
  const nameEl = document.getElementById('locationName');
  if (!navigator.geolocation) {
    nameEl.textContent = '⚠ Your browser does not support geolocation';
    return;
  }
  btn.textContent = '…'; btn.disabled = true;
  nameEl.textContent = 'Getting location…';
  navigator.geolocation.getCurrentPosition(
    pos => {
      locationLat = pos.coords.latitude;
      locationLng = pos.coords.longitude;
      nameEl.textContent = `📍 ${locationLat.toFixed(4)}, ${locationLng.toFixed(4)}`;
      fetchSunData(locationLat, locationLng);
      btn.textContent = '📍 Use my location'; btn.disabled = false;
    },
    err => {
      nameEl.textContent = '⚠ Location access denied — enter your town or postcode above';
      btn.textContent = '📍 Use my location'; btn.disabled = false;
    },
    { timeout: 8000 }
  );
}

// ── SOLAR CALCULATOR — pure JS, no API calls ────────────────────────────────
function solarCalc(date, lat, lng) {
  // Equation-of-time + declination via Spencer / NOAA simplified
  const doy    = getDayOfYear(date);
  const B      = (2 * Math.PI / 365) * (doy - 81);
  const eot    = 9.87 * Math.sin(2*B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // minutes
  const declin = 23.45 * Math.sin(B);                                             // degrees

  const tzMin        = -date.getTimezoneOffset();                 // local UTC offset in minutes
  const solarNoonMin = 720 - 4 * lng - eot + tzMin;              // minutes from local midnight

  const latRad   = lat    * Math.PI / 180;
  const declRad  = declin * Math.PI / 180;
  const cosHA    = (Math.cos(90.833 * Math.PI / 180) -
                    Math.sin(latRad) * Math.sin(declRad)) /
                   (Math.cos(latRad) * Math.cos(declRad));

  function minsToHHMM(m) {
    const norm = ((Math.round(m) % 1440) + 1440) % 1440;
    return `${String(Math.floor(norm/60)).padStart(2,'0')}:${String(norm%60).padStart(2,'0')}`;
  }

  if (cosHA > 1) {
    // Polar night
    return { sunrise:'—', sunset:'—', solar_noon: minsToHHMM(solarNoonMin),
             day_length:'0h 0m', golden_hour:'—', dayLengthMinutes:0, declin };
  }
  if (cosHA < -1) {
    // Midnight sun
    return { sunrise:'00:00', sunset:'23:59', solar_noon: minsToHHMM(solarNoonMin),
             day_length:'24h 0m', golden_hour:'22:59', dayLengthMinutes:1440, declin };
  }

  const HA         = Math.acos(cosHA) * 180 / Math.PI;         // degrees
  const riseMin    = solarNoonMin - 4 * HA;
  const setMin     = solarNoonMin + 4 * HA;
  const dayLenMin  = setMin - riseMin;

  return {
    sunrise:         minsToHHMM(riseMin),
    sunset:          minsToHHMM(setMin),
    solar_noon:      minsToHHMM(solarNoonMin),
    day_length:      `${Math.floor(dayLenMin/60)}h ${Math.floor(dayLenMin%60)}m`,
    golden_hour:     minsToHHMM(setMin - 60),
    dayLengthMinutes: dayLenMin,
    declin
  };
}

function fetchSunData(lat, lng) {
  const result = solarCalc(new Date(), lat, lng);
  sunData = result;

  document.getElementById('sunriseTime').textContent   = sunData.sunrise    || '—';
  document.getElementById('sunsetTime').textContent    = sunData.sunset     || '—';
  document.getElementById('solarNoonTime').textContent = sunData.solar_noon || '—';
  document.getElementById('dayLength').textContent     = sunData.day_length || '—';
  document.getElementById('goldenHour').textContent    = sunData.golden_hour|| '—';

  document.getElementById('sunDataPanel').style.display = 'flex';

  drawCompass();
}

// Draw the compass rose with sun arc
function drawCompass() {
  const canvas = document.getElementById('compassCanvas');
  const ctx = canvas.getContext('2d');
  const W = 160, H = 160, cx = W/2, cy = H/2, R = 68;
  ctx.clearRect(0, 0, W, H);

  // Outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, R + 6, 0, Math.PI * 2);
  ctx.fillStyle = '#f5f0e8';
  ctx.fill();
  ctx.strokeStyle = '#4a2e1a';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner disc
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = '#ede6d6';
  ctx.fill();

  // Cardinal direction labels
  const cardinals = [
    { label: 'N', angle: -Math.PI/2 + (northAngleDeg * Math.PI/180) },
    { label: 'E', angle:  0          + (northAngleDeg * Math.PI/180) },
    { label: 'S', angle:  Math.PI/2  + (northAngleDeg * Math.PI/180) },
    { label: 'W', angle:  Math.PI    + (northAngleDeg * Math.PI/180) },
  ];
  ctx.font = 'bold 11px DM Mono, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  cardinals.forEach(({ label, angle }) => {
    const x = cx + (R - 10) * Math.cos(angle);
    const y = cy + (R - 10) * Math.sin(angle);
    ctx.fillStyle = label === 'N' ? '#c0392b' : '#4a2e1a';
    ctx.fillText(label, x, y);
  });

  // Tick marks
  for (let i = 0; i < 360; i += 10) {
    const rad = (i - 90 + northAngleDeg) * Math.PI / 180;
    const inner = i % 90 === 0 ? R - 22 : i % 45 === 0 ? R - 16 : R - 10;
    ctx.beginPath();
    ctx.moveTo(cx + (R - 2) * Math.cos(rad), cy + (R - 2) * Math.sin(rad));
    ctx.lineTo(cx + inner * Math.cos(rad), cy + inner * Math.sin(rad));
    ctx.strokeStyle = i % 90 === 0 ? '#8b5e3c' : 'rgba(74,46,26,0.25)';
    ctx.lineWidth = i % 90 === 0 ? 1.5 : 0.8;
    ctx.stroke();
  }

  // Sun arc — approximate using lat and day of year
  if (sunData && locationLat !== null) {
    const doy = getDayOfYear(new Date());
    const declin = 23.45 * Math.sin((360/365 * (doy - 81)) * Math.PI / 180);

    // Sunrise/sunset azimuth approx
    const latRad = locationLat * Math.PI / 180;
    const declRad = declin * Math.PI / 180;
    const cosAz = Math.sin(declRad) / Math.cos(latRad);
    const sunriseAz = Math.acos(Math.max(-1, Math.min(1, cosAz))) * 180 / Math.PI; // degrees from north
    const sunsetAz  = 360 - sunriseAz;

    // Draw arc from sunrise to sunset azimuth (going east through south)
    const toRad = deg => (deg - 90 + northAngleDeg) * Math.PI / 180;
    const arcR = R * 0.52;

    // Gradient arc
    const grad = ctx.createLinearGradient(
      cx + arcR * Math.cos(toRad(sunriseAz)), cy + arcR * Math.sin(toRad(sunriseAz)),
      cx + arcR * Math.cos(toRad(sunsetAz)),  cy + arcR * Math.sin(toRad(sunsetAz))
    );
    grad.addColorStop(0,   '#f39c12');
    grad.addColorStop(0.5, '#f1c40f');
    grad.addColorStop(1,   '#e74c3c');

    ctx.beginPath();
    ctx.arc(cx, cy, arcR, toRad(sunriseAz), toRad(sunsetAz < sunriseAz ? sunsetAz + 360 : sunsetAz));
    ctx.strokeStyle = grad;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Sunrise marker
    ctx.beginPath();
    ctx.arc(cx + arcR * Math.cos(toRad(sunriseAz)), cy + arcR * Math.sin(toRad(sunriseAz)), 4, 0, Math.PI*2);
    ctx.fillStyle = '#f39c12';
    ctx.fill();

    // Sunset marker
    ctx.beginPath();
    ctx.arc(cx + arcR * Math.cos(toRad(sunsetAz)), cy + arcR * Math.sin(toRad(sunsetAz)), 4, 0, Math.PI*2);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();

    // Current sun position (if daytime)
    const nowMin = nowMinutes();
    const riseMin = timeToMinutes(sunData.sunrise);
    const setMin  = timeToMinutes(sunData.sunset);
    if (nowMin >= riseMin && nowMin <= setMin) {
      const frac = (nowMin - riseMin) / (setMin - riseMin);
      const curAz = sunriseAz + frac * (sunsetAz - sunriseAz);
      const cr = arcR * (1 - 0.18 * Math.sin(frac * Math.PI));  // slight arc
      ctx.beginPath();
      ctx.arc(cx + cr * Math.cos(toRad(curAz)), cy + cr * Math.sin(toRad(curAz)), 6, 0, Math.PI*2);
      ctx.fillStyle = '#f1c40f';
      ctx.strokeStyle = '#e67e22';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    }
  }

  // North arrow
  const northRad = (-Math.PI/2) + (northAngleDeg * Math.PI/180);
  ctx.beginPath();
  ctx.moveTo(cx + 18 * Math.cos(northRad), cy + 18 * Math.sin(northRad));
  ctx.lineTo(cx + (R - 25) * Math.cos(northRad), cy + (R - 25) * Math.sin(northRad));
  ctx.strokeStyle = '#c0392b';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Centre dot
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#4a2e1a';
  ctx.fill();

  // Compass label
  ctx.font = '8px DM Mono, monospace';
  ctx.fillStyle = '#8b5e3c';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('🌅 sun path', cx, cy + arcR + 8);
}

// Allow pressing Enter in the location input
document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('locationInput');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') lookupLocation(); });
});

// Helpers
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  // Handle ISO 8601 format e.g. "2024-03-15T06:30:00+00:00"
  if (timeStr.includes('T')) {
    const d = new Date(timeStr);
    return d.getHours() * 60 + d.getMinutes();
  }
  // Handle "6:30:00 AM" or "6:30 AM"
  const parts = timeStr.trim().split(' ');
  const [h, m] = parts[0].split(':').map(Number);
  const ampm = parts[1] || '';
  let hour = h;
  if (ampm.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0;
  return hour * 60 + (m || 0);
}
function nowMinutes() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

// ── SOIL GUIDE SECTION ──
const SOIL_TYPES = [
  {
    id: 'loam',
    name: 'Loam',
    color: '#8B6914',
    texture: 'Medium',
    typicalPh: '6.0–7.0',
    drains: 'Good',
    fertility: 'High',
    desc: `The ideal garden soil — a balanced mix of sand, silt, and clay. Fertile, free-draining yet moisture-retentive, and easy to work year-round. Most vegetables thrive in loam with minimal amendment.`,
    amendments: [
      { action: 'Maintain fertility', method: 'Apply 5–7.5cm of well-rotted manure or garden compost each autumn as a mulch. Let worms incorporate it.' },
      { action: 'Raise pH (too acid)', method: 'Apply garden lime (calcium carbonate) at 200–300g/m². Apply in autumn, not at same time as manure. Retest after 3 months.' },
      { action: 'Lower pH (too alkaline)', method: 'Apply flowers of sulphur at 135g/m² for a 1-point drop. Works slowly over several months. Ericaceous compost helps too.' },
      { action: 'Improve drainage', method: 'If compacted, double-dig and incorporate sharp grit at 2 buckets/m². Add organic matter annually.' },
    ],
    phTips: 'Loam is naturally close to neutral. Test annually — heavy rainfall gradually acidifies over time. Most veg prefer pH 6.0–7.0.',
  },
  {
    id: 'sandy',
    name: 'Sandy Soil',
    color: '#D4A85A',
    texture: 'Coarse / gritty',
    typicalPh: '5.0–6.5',
    drains: 'Very fast',
    fertility: 'Low',
    desc: `Light, free-draining soil that warms rapidly in spring — great for early sowings. Nutrients and water leach through quickly, making it infertile if not regularly amended. Root vegetables thrive as they can push down easily.`,
    amendments: [
      { action: 'Improve water retention', method: 'Incorporate 2–3 buckets of garden compost per m² each year. Biochar or water-retaining gel crystals also help.' },
      { action: 'Boost fertility', method: 'Apply a balanced granular fertiliser each spring. Organic matter breaks down quickly in sand — feed little and often.' },
      { action: 'Raise pH', method: 'Sandy soils acidify quickly. Apply lime at 150–200g/m² every 2–3 years. Check pH before each growing season.' },
      { action: 'Green manures', method: 'Sow phacelia, mustard or clover in autumn to protect soil surface, add organic matter, and prevent nutrient leaching.' },
    ],
    phTips: 'Sandy soils are naturally acidic and acidify faster than other types. Annual pH testing is worthwhile. Most vegetables need pH raised to at least 6.0.',
  },
  {
    id: 'clay',
    name: 'Clay Soil',
    color: '#A0522D',
    texture: 'Fine / sticky',
    typicalPh: '6.5–7.5',
    drains: 'Slow',
    fertility: 'High',
    desc: `Heavy, nutrient-rich soil that holds moisture and warmth well once established. Plants often grow very productively in improved clay — but it is unforgiving when worked wet, compacts easily, and drains poorly. Raised beds are transformative.`,
    amendments: [
      { action: 'Improve drainage & structure', method: 'Incorporate sharp horticultural grit at 5kg/m² plus 2 buckets of compost. Never work clay when wet — wait until it crumbles without smearing.' },
      { action: 'Prevent compaction', method: 'Use fixed paths and stepping boards. Never step on growing beds. No-dig methods work excellently on clay.' },
      { action: 'Raise pH (brassicas)', method: 'Clay is often naturally near-neutral or slightly alkaline — test before liming. Brassicas need pH 7.0–7.5: apply 200–400g/m² lime if below 6.8.' },
      { action: 'Annual organic matter', method: 'Apply a 7.5cm mulch of compost or manure on the surface each autumn. Do NOT dig it in — let worms do the work (no-dig method).' },
    ],
    phTips: 'Clay often has a naturally good pH for vegetables. Heavy liming risks raising pH too high. Test before applying lime. Organic matter is more important than pH adjustment on most clay soils.',
  },
  {
    id: 'sandy_loam',
    name: 'Sandy Loam',
    color: '#C4A060',
    texture: 'Medium-coarse',
    typicalPh: '5.5–6.8',
    drains: 'Good',
    fertility: 'Medium-high',
    desc: `The most versatile and productive growing soil after loam. Drains well but retains enough moisture for most crops. Easy to work in almost all weather. Root vegetables, alliums, and fruiting crops perform especially well.`,
    amendments: [
      { action: 'Maintain organic matter', method: 'Apply 5cm of compost or manure each year. Sandy loam can lose structure if organic matter is neglected.' },
      { action: 'Raise pH if needed', method: 'Apply lime at 150–200g/m² if pH drops below 6.0. Check every 2 years — sandy loams acidify moderately.' },
      { action: 'Water retention', method: 'Mulch all beds with 5–7.5cm of compost in spring to reduce moisture loss. Particularly important in dry summers.' },
    ],
    phTips: 'Sandy loam typically sits in the 5.5–6.8 range — ideal for most crops. Light annual liming every 2–3 years usually maintains an optimal pH.',
  },
  {
    id: 'chalk',
    name: 'Chalky / Alkaline',
    color: '#E8E0C8',
    texture: 'Variable, stony',
    typicalPh: '7.5–8.5',
    drains: 'Very fast',
    fertility: 'Low-medium',
    desc: `Thin, fast-draining soil overlying chalk or limestone. The high pH locks up iron, manganese, and boron — causing yellowing (chlorosis) in many crops. Acid-loving fruits will fail completely. However, brassicas thrive in alkaline conditions.`,
    amendments: [
      { action: 'Lower pH — Sulphur', method: 'Apply flowers of sulphur at 135–270g/m². A 1-point pH drop (e.g. 8.0 → 7.0) takes months. Retest after 3–6 months. Annual applications may be needed.' },
      { action: 'Lower pH — Ericaceous compost', method: 'For acid-lovers in containers or raised beds, fill entirely with ericaceous (peat-free) compost, pH 4.5–5.5.' },
      { action: 'Increase organic matter', method: 'Heavy chalky soils need large annual additions of compost to build topsoil depth and water retention. Aim for 10cm per year until depth is 30cm+.' },
      { action: 'Build raised beds', method: 'The most practical solution on chalk. Fill 30cm+ deep raised beds with imported loam and compost. Test and maintain pH in the imported soil.' },
    ],
    phTips: 'Reducing chalk soil pH permanently is extremely difficult — the chalk acts as a constant buffer. Raised beds with imported loam are often the most practical long-term solution for growing a wide range of crops.',
  },
  {
    id: 'clay_loam',
    name: 'Clay Loam',
    color: '#9B6A3A',
    texture: 'Medium-fine',
    typicalPh: '6.0–7.5',
    drains: 'Moderate',
    fertility: 'High',
    desc: `Fertile and productive soil with better drainage than pure clay. Excellent for brassicas, beans, leeks, and most fruit trees. Prone to compaction — never work when wet or the structure is destroyed.`,
    amendments: [
      { action: 'Improve structure', method: 'Annual mulch of 5–7.5cm of compost or well-rotted manure. No-dig approach preserves soil structure and avoids compaction.' },
      { action: 'Improve drainage', method: 'Add horticultural grit if puddling occurs. Install soakaways or drainage channels if waterlogging is persistent.' },
      { action: 'Adjust pH for brassicas', method: 'Brassicas need pH 7.0–7.5. Apply ground limestone at 200–300g/m² in autumn if below 6.8. Retest the following spring.' },
    ],
    phTips: 'Clay loam often sits at a naturally suitable pH for most vegetables. Test annually — particularly for brassicas which need pH above 6.8 to prevent clubroot.',
  },
  {
    id: 'peat',
    name: 'Peat / Ericaceous',
    color: '#4A3020',
    texture: 'Fine, spongy',
    typicalPh: '4.0–6.0',
    drains: 'Moderate (can waterlog)',
    fertility: 'Moderate (acid-specific)',
    desc: `Dark, acidic, moisture-retentive soil. Natural peat soils are rare — this profile is usually created artificially with ericaceous compost for acid-loving crops like blueberries. Very low in nutrients despite its appearance.`,
    amendments: [
      { action: 'Maintain acidity for blueberries', method: 'Water only with collected rainwater (tap water is often alkaline and raises pH). Apply sulphur chips at 35g/m² annually to maintain pH 4.5–5.5.' },
      { action: 'Raise pH for vegetables', method: 'Apply lime at 300–400g/m² to raise from pH 5.0 to 6.0. Multiple applications over 2+ years may be needed. Test regularly.' },
      { action: 'Add nutrients', method: 'Peat is low in nutrients. Apply a balanced organic fertiliser each spring. Sulphate of potash is good for acid-soil fruits.' },
    ],
    phTips: 'For blueberries and other acid-lovers, keep pH strictly between 4.5–5.5. For vegetables, raise pH to 6.0–6.5 using lime over time. Never mix ericaceous and alkaline-limed beds.',
  },
];

// ── pH SCALE DATA ──
const PH_CROPS = [
  { ph: 4.0, label: '4.0', crops: [] },
  { ph: 4.5, label: '4.5', crops: ['🫐 Blueberry'] },
  { ph: 5.0, label: '5.0', crops: ['🥔 Potato'] },
  { ph: 5.5, label: '5.5', crops: ['🍓 Strawberry', '🫐 Blackberry', '🌹 Rhubarb'] },
  { ph: 6.0, label: '6.0', crops: ['🍅 Tomato', '🥕 Carrot', '🥒 Cucumber', '🌽 Sweetcorn', '🧅 Onion', '🧄 Garlic', '🫛 Peas', '🫘 Runner Beans', '🥬 Lettuce', '🌿 Herbs (most)', '🍒 Cherry', '🫐 Raspberry'] },
  { ph: 6.5, label: '6.5', crops: ['🫀 Beetroot', '🌿 Asparagus', '🥦 Broccoli', '🥬 Kale', '🥬 Cabbage', '🟢 Sprouts', '🟣 Plum', '🍎 Apple', '🍐 Pear', '🖤 Blackcurrant', '🟢 Gooseberry'] },
  { ph: 7.0, label: '7.0', crops: ['🥦 Cauliflower', '🧅 Leeks', '🌿 Parsley', '🌻 Parsnip', '🟤 Swede'] },
  { ph: 7.5, label: '7.5', crops: ['🥦 Brassicas (all)', '🌿 Asparagus'] },
  { ph: 8.0, label: '8.0', crops: ['🌿 Rosemary', '🌱 Thyme'] },
];

// ── SOIL GUIDE — Produce-guide style (tabs → cards → detail) ─────────────────

const PH_GUIDE_TYPES = [
  {
    id: 'very_acid',
    name: 'Very Acid',
    range: '4.0 – 5.0',
    color: '#e74c3c',
    icon: '🔴',
    tag: 'pH 4.0 – 5.0',
    desc: 'Extremely acidic conditions. Only a handful of specialist crops like blueberries genuinely thrive here. Most vegetables suffer nutrient lockout and aluminium toxicity at this pH.',
    crops: ['🫐 Blueberry (pH 4.5–5.5 — the only major food crop that needs this)', '🥔 Potato (lower end only, not preferred)'],
    challenges: 'Phosphorus, calcium, magnesium and molybdenum become locked up at this pH. Aluminium and manganese become toxic. Beneficial soil bacteria are inhibited. Root development and nutrient uptake are severely impaired for most crops.',
    amendments: [
      { action: 'Raise pH for vegetables', method: 'Apply ground limestone (calcium carbonate) at 400–600g/m² to raise from pH 4.5 to 6.0. This is gradual — test after 3–6 months and reapply as needed. Multiple applications over 2+ seasons may be required.' },
      { action: 'Maintain for blueberries', method: 'Water only with collected rainwater — tap water is alkaline and raises pH. Apply sulphur chips at 35g/m² annually. Keep pH strictly between 4.5 and 5.5 using ericaceous mulch.' },
      { action: 'Use ericaceous compost', method: 'For containers and raised beds growing acid-lovers, fill entirely with purpose-made ericaceous (peat-free) compost at pH 4.5–5.5. Test annually and maintain with sulphur.' },
    ],
    phTips: 'Very few food crops thrive at this level. If your soil tests below 5.0, a soil improvement programme spanning 2+ years is needed before most vegetables will establish. Blueberries are the major exception — they genuinely need and thrive at this pH.'
  },
  {
    id: 'slightly_acid',
    name: 'Slightly Acid',
    range: '5.5 – 6.5',
    color: '#ffa94d',
    icon: '🟠',
    tag: 'pH 5.5 – 6.5',
    desc: 'The preferred range for the majority of fruiting crops, root vegetables, alliums, and most herbs. Nutrients are broadly available and beneficial soil bacteria are highly active.',
    crops: ['🍓 Strawberry','🫐 Blackberry','🌹 Rhubarb','🍅 Tomato','🥕 Carrot','🥒 Cucumber','🌽 Sweetcorn','🧅 Onion','🧄 Garlic','🫛 Peas','🫘 Runner Beans','🥗 Lettuce','🌿 Herbs (most)','🍒 Cherry','🫐 Raspberry'],
    challenges: 'Brassicas are susceptible to clubroot at the lower end of this range — raise to pH 6.8–7.0 before planting brassicas. Beetroot and asparagus prefer the upper end (6.5–7.0).',
    amendments: [
      { action: 'Lime for brassicas', method: 'If growing brassicas, raise to pH 6.8–7.0 with ground limestone at 200–300g/m² in autumn. Test the following spring before planting. Never apply lime at the same time as manure.' },
      { action: 'Maintain organic matter', method: 'Annual applications of well-rotted compost or manure buffer pH naturally while feeding the soil web. Aim for a 5–7cm mulch applied each autumn.' },
      { action: 'Annual pH check', method: 'This range is the natural drift zone for UK garden soils. Test at the start of each growing season — rainfall and organic decomposition gradually acidify over time.' },
    ],
    phTips: 'This range suits the widest variety of fruiting and salad crops. If you can only maintain one pH range across your plot, target 6.0–6.5 and it will serve the majority of what most growers plant. Light applications of lime every 2–3 years usually maintain the sweet spot.'
  },
  {
    id: 'ideal_neutral',
    name: 'Ideal Neutral',
    range: '6.5 – 7.0',
    color: '#51cf66',
    icon: '🟢',
    tag: 'pH 6.5 – 7.0',
    desc: 'The golden zone for maximum crop diversity. Nutrients are fully available, beneficial soil bacteria are at peak activity, and the widest range of vegetables and fruits thrive here.',
    crops: ['🫀 Beetroot','🌿 Asparagus','🥦 Broccoli','🥬 Kale','🥬 Cabbage','🌱 Brussels Sprouts','🟣 Plum','🍎 Apple','🍐 Pear','🖤 Blackcurrant','🟢 Gooseberry','🥦 Cauliflower','🧅 Leeks','🌿 Parsley','🌻 Parsnip','🟤 Swede'],
    challenges: 'Blueberries and potatoes prefer lower pH and should not be grown in beds maintained at neutral. At the upper end (7.0), iron and manganese availability begins to decline — watch for pale new growth.',
    amendments: [
      { action: 'Maintain with modest liming', method: 'Apply ground limestone at 100–150g/m² every 2–3 years to counteract gradual acidification from rainfall and organic matter decomposition. Always test before applying.' },
      { action: 'Annual mulching', method: 'Apply 5–7cm of well-rotted compost or manure each autumn. Organic matter buffers against pH swings and provides food for the microbial community that keeps this range stable.' },
      { action: 'Avoid over-liming', method: 'If pH tests at 6.8+, do not apply lime. Over-liming causes nutrient lockout — iron, manganese, and boron become progressively unavailable. More lime is not always better.' },
    ],
    phTips: 'This is the ideal target for most UK vegetable gardens. Maintain this range long-term by testing every 1–2 years and applying modest lime as needed. British rainfall naturally acidifies soil — regular small applications of lime are more effective than occasional large doses.'
  },
  {
    id: 'alkaline',
    name: 'Alkaline',
    range: '7.5+',
    color: '#cc5de8',
    icon: '🟣',
    tag: 'pH 7.5+',
    desc: 'Alkaline conditions above pH 7.5 suit brassicas and Mediterranean herbs well but cause iron deficiency (chlorosis — yellow leaves) in most other crops. Chalk and limestone soils require specific strategies.',
    crops: ['🥦 All Brassicas','🌿 Asparagus','🌿 Rosemary','🌱 Thyme','🌿 Sage','🌿 Lavender'],
    challenges: 'Iron, manganese, boron, and zinc become progressively locked up above pH 7.5. Most fruit crops fail completely — particularly acid-lovers. Yellow leaves with green veins (iron chlorosis) are the key diagnostic symptom. Chalk soils are often shallow with very low water-holding capacity.',
    amendments: [
      { action: 'Lower pH with sulphur', method: 'Apply flowers of sulphur at 135–270g/m² to lower by approximately one pH point. Works slowly over 3–6 months. Annual applications are needed on chalk — the rock constantly buffers pH back up.' },
      { action: 'Build raised beds', method: 'The most practical long-term solution on chalk. Build 30–40cm deep raised beds and fill with imported loam and compost at pH 6.5–7.0. This fully isolates crops from the underlying chalk.' },
      { action: 'Choose tolerant crops', method: 'Work with your soil — brassicas, asparagus, rosemary, thyme, and sage genuinely thrive at alkaline pH. Use containers of ericaceous compost for soft fruit and acid-lovers.' },
      { action: 'Chelated iron for deficiency', method: 'For crops showing yellowing, apply chelated iron (sequestrene) as a foliar spray or root drench. This makes iron available to plants despite the locked-up soil conditions.' },
    ],
    phTips: 'Permanently reducing chalk soil pH is extremely difficult — the limestone rock continuously buffers the soil back to alkaline. Raised beds with imported loam are often the most practical long-term solution. Focus your in-ground growing on what naturally thrives in these conditions.'
  },
];

function renderSoilGuide() {
  const soilCards = document.getElementById('soilCards');
  if (!soilCards) return;
  // Wire up tab clicks
  const soilTabs = document.getElementById('soilTabs');
  if (soilTabs) {
    soilTabs.addEventListener('click', e => {
      const btn = e.target.closest('[data-soil-cat]');
      if (!btn) return;
      document.querySelectorAll('#soilTabs .ptab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      soilShowCat(btn.dataset.soilCat);
    });
  }
  soilShowCat('types');
}

function soilShowCat(cat) {
  const cards = document.getElementById('soilCards');
  const detail = document.getElementById('soilDetail');
  if (detail) detail.style.display = 'none';
  if (!cards) return;
  cards.style.display = 'grid';

  if (cat === 'types') {
    cards.innerHTML = SOIL_TYPES.map(st => {
      const phLow  = parseFloat(st.typicalPh.split('–')[0]);
      const phHigh = parseFloat(st.typicalPh.split('–')[1] || st.typicalPh.split('–')[0]);
      const phColor = phLow < 5.5 ? '#e74c3c' : phHigh > 7.5 ? '#e67e22' : '#2d6a2d';
      const photo = SOIL_WIKI_PHOTOS[st.id];
      const photoHtml = photo
        ? `<div class="pcard-photo-wrap"><img class="pcard-photo" src="${photo}" alt="${st.name}" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()"></div>`
        : `<div class="pcard-photo-wrap" style="background:linear-gradient(135deg,${st.color}dd,${st.color}88)"><div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:3.2rem;line-height:1">🌍</div></div>`;
      return `
        <div class="pcard" role="button" tabindex="0"
             onclick="soilOpenDetail('types','${st.id}')"
             onkeydown="if(event.key==='Enter'||event.key===' ')soilOpenDetail('types','${st.id}')">
          ${photoHtml}
          <div class="pcard-tag">${st.texture}</div>
          <div class="pcard-name">${st.name}</div>
          <div class="pcard-desc">${st.desc.substring(0,90)}…</div>
          <div class="pcard-meta">
            <span>💧 ${st.drains}</span>
            <span>🌱 ${st.fertility} fertility</span>
          </div>
          <div class="pcard-sow" style="margin-top:0.5rem">⚗️ pH ${st.typicalPh}</div>
        </div>
      `;
    }).join('');
  } else {
    cards.innerHTML = PH_GUIDE_TYPES.map(ph => `
      <div class="pcard" role="button" tabindex="0"
           onclick="soilOpenDetail('ph','${ph.id}')"
           onkeydown="if(event.key==='Enter'||event.key===' ')soilOpenDetail('ph','${ph.id}')">
        <div class="pcard-photo-wrap" style="background:linear-gradient(135deg,${ph.color}cc,${ph.color}66)">
          <div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;line-height:1">${ph.icon}</div>
        </div>
        <div class="pcard-tag">${ph.tag}</div>
        <div class="pcard-name">${ph.name}</div>
        <div class="pcard-desc">${ph.desc.substring(0,90)}…</div>
        <div class="pcard-meta">
          <span>🌿 ${ph.crops.length} crop${ph.crops.length !== 1 ? 's' : ''} thrive here</span>
        </div>
        <div class="pcard-sow" style="margin-top:0.5rem">⚗️ pH ${ph.range}</div>
      </div>
    `).join('');
  }
}

function soilOpenDetail(cat, id) {
  const cards  = document.getElementById('soilCards');
  const detail = document.getElementById('soilDetail');
  const inner  = document.getElementById('soilDetailInner');
  if (!detail || !inner) return;
  cards.style.display  = 'none';
  detail.style.display = 'block';

  const scaleMin = 4, scaleMax = 8.5;
  let sN = 0;
  const hn = () => String(++sN).padStart(2,'0');

  if (cat === 'types') {
    const st = SOIL_TYPES.find(s => s.id === id);
    if (!st) return;

    // Collect crops that thrive in this soil
    const soilCrops = [];
    Object.entries(soilData).forEach(([cropId, data]) => {
      const stId        = st.id.replace('_', ' ');
      const stNameFirst = st.name.toLowerCase().split(' ')[0];
      const inBest = data.best.some(b => {
        const bl = b.toLowerCase();
        return bl.includes(stId) || bl.includes(stNameFirst) || stNameFirst.includes(bl.split(' ')[0]);
      });
      if (inBest && !soilCrops.find(c => c.id === cropId)) {
        let cropName = cropId, cropIcon = '';
        Object.values(produce).forEach(prodCat => {
          const found = prodCat.find(p => p.id === cropId);
          if (found) { cropName = found.name; cropIcon = found.icon; }
        });
        soilCrops.push({ id: cropId, label: `${cropIcon} ${cropName}` });
      }
    });

    const phLow    = parseFloat(st.typicalPh.split('–')[0]);
    const phHigh   = parseFloat(st.typicalPh.split('–')[1] || st.typicalPh.split('–')[0]);
    const leftPct  = ((phLow  - scaleMin) / (scaleMax - scaleMin) * 100).toFixed(1);
    const widthPct = ((phHigh - phLow)    / (scaleMax - scaleMin) * 100).toFixed(1);
    const phColor  = phLow < 5.5 ? '#e74c3c' : phHigh > 7.5 ? '#e67e22' : '#2d6a2d';

    inner.innerHTML = `
      <div class="detail-sidebar">
        <div style="width:100%;height:200px;border-radius:var(--radius-md);overflow:hidden;margin-bottom:1.5rem;
                    background:linear-gradient(135deg,${st.color}cc,${st.color}55);
                    display:flex;align-items:center;justify-content:center;font-size:5rem;
                    border:1px solid rgba(0,0,0,0.12)">🌍</div>
        <div class="detail-tag">${st.texture}</div>
        <h2 class="detail-title">${st.name}</h2>
        <div class="detail-latin">Soil Type Profile</div>
        <div class="detail-stats">
          <div class="dstat dstat--sow"><span class="dstat-label">⚗️ pH</span><span class="dstat-val">${st.typicalPh}</span></div>
          <div class="dstat"><span class="dstat-label">Drainage</span><span class="dstat-val">${st.drains}</span></div>
          <div class="dstat"><span class="dstat-label">Fertility</span><span class="dstat-val">${st.fertility}</span></div>
          <div class="dstat"><span class="dstat-label">Texture</span><span class="dstat-val">${st.texture}</span></div>
        </div>
      </div>
      <div class="detail-body">
        <h3>${hn()} — About This Soil</h3>
        <p>${st.desc}</p>

        <h3>${hn()} — Typical pH Range</h3>
        <div class="ph-bar-wrap">
          <div class="ph-bar-label">pH position on scale 4 – 8.5</div>
          <div class="ph-bar-track">
            <div class="ph-bar-fill" style="left:${leftPct}%;width:${widthPct}%;background:${phColor}"></div>
            <div class="ph-bar-markers">
              ${[4,5,6,7,8].map(n=>`<span class="ph-marker" style="left:${((n-scaleMin)/(scaleMax-scaleMin)*100).toFixed(1)}%">${n}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="soil-ph-tip" style="margin-top:2.25rem">
          <div class="soil-ph-tip-label">⚗️ pH Guidance</div>
          <p>${st.phTips}</p>
        </div>

        ${soilCrops.length ? `
        <h3>${hn()} — Crops That Thrive</h3>
        <div class="soil-crop-list" style="margin-bottom:1rem">
          ${soilCrops.map(c => `<span class="soil-crop-chip thrives">${c.label}</span>`).join('')}
        </div>` : ''}

        <h3>${hn()} — How to Amend &amp; Improve</h3>
        <div class="detail-steps">
          ${st.amendments.map(a => `
            <div class="detail-step">
              <div class="step-text"><strong>${a.action}</strong> — ${a.method}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

  } else {
    const ph = PH_GUIDE_TYPES.find(p => p.id === id);
    if (!ph) return;

    const phParts  = ph.range.replace(/\s/g,'').split('–');
    const phLow    = parseFloat(phParts[0]);
    const phHigh   = parseFloat(phParts[1] || (phLow + 0.5));
    const leftPct  = ((phLow  - scaleMin) / (scaleMax - scaleMin) * 100).toFixed(1);
    const widthPct = ((Math.max(phHigh, phLow + 0.3) - phLow) / (scaleMax - scaleMin) * 100).toFixed(1);

    inner.innerHTML = `
      <div class="detail-sidebar">
        <div style="width:100%;height:200px;border-radius:var(--radius-md);overflow:hidden;margin-bottom:1.5rem;
                    background:linear-gradient(135deg,${ph.color}cc,${ph.color}55);
                    display:flex;align-items:center;justify-content:center;font-size:5rem;
                    border:1px solid rgba(0,0,0,0.12)">${ph.icon}</div>
        <div class="detail-tag">${ph.tag}</div>
        <h2 class="detail-title">${ph.name}</h2>
        <div class="detail-latin">pH ${ph.range}</div>
        <div class="detail-stats">
          <div class="dstat dstat--sow"><span class="dstat-label">⚗️ pH Range</span><span class="dstat-val">${ph.range}</span></div>
          <div class="dstat"><span class="dstat-label">Crops</span><span class="dstat-val">${ph.crops.length} thrive here</span></div>
        </div>
      </div>
      <div class="detail-body">
        <h3>${hn()} — About This pH Range</h3>
        <p>${ph.desc}</p>

        <h3>${hn()} — pH Position on Scale</h3>
        <div class="ph-bar-wrap">
          <div class="ph-bar-label">pH position on scale 4 – 8.5</div>
          <div class="ph-bar-track">
            <div class="ph-bar-fill" style="left:${leftPct}%;width:${widthPct}%;background:${ph.color}"></div>
            <div class="ph-bar-markers">
              ${[4,5,6,7,8].map(n=>`<span class="ph-marker" style="left:${((n-scaleMin)/(scaleMax-scaleMin)*100).toFixed(1)}%">${n}</span>`).join('')}
            </div>
          </div>
        </div>

        <h3>${hn()} — Crops That Prefer This pH</h3>
        <div class="soil-crop-list" style="margin-bottom:1rem">
          ${ph.crops.map(c => `<span class="soil-crop-chip thrives">${c}</span>`).join('')}
        </div>

        <h3>${hn()} — Challenges at This pH</h3>
        <div class="detail-warnings">
          <strong>⚠ Growing Challenges</strong>
          <p>${ph.challenges}</p>
        </div>

        <h3>${hn()} — How to Adjust &amp; Manage</h3>
        <div class="detail-steps">
          ${ph.amendments.map(a => `
            <div class="detail-step">
              <div class="step-text"><strong>${a.action}</strong> — ${a.method}</div>
            </div>
          `).join('')}
        </div>

        <div class="soil-ph-tip" style="margin-top:1rem">
          <div class="soil-ph-tip-label">⚗️ Key Guidance</div>
          <p>${ph.phTips}</p>
        </div>
      </div>
    `;
  }

  document.getElementById('soil').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function soilBack() {
  const cards  = document.getElementById('soilCards');
  const detail = document.getElementById('soilDetail');
  if (cards)  cards.style.display  = 'grid';
  if (detail) detail.style.display = 'none';
}

// ── CROP ROTATION ──────────────────────────────────────────────────────────

const ROT_GROUPS = [
  {
    id: 'brassicas',
    name: 'Brassicas',
    tag: 'Group 1 · Hungry feeders',
    color: '#2d8a4e',
    desc: 'Brassicas are heavy feeders and the most disease-prone rotation group. Clubroot (Plasmodiophora brassicae) persists in soil for 20+ years — rotating every year is essential. Always follow brassicas with a legume year to restore nitrogen.',
    crops: ['🥦 Broccoli','🥬 Cabbage','🥬 Kale','🌱 Brussels Sprouts','🥦 Cauliflower','🥬 Chinese Cabbage','🟤 Swede','🫛 Turnip','🌿 Rocket','🌿 Radish (large)','🌿 Pak Choi'],
    disease: 'Clubroot, cabbage root fly, whitefly, caterpillars. All brassicas share the same pest and disease pool — treat as one family regardless of how different they look.',
    nutrient: 'Heavy nitrogen feeders. Plant after legumes (who fixed nitrogen) or apply well-rotted manure before planting. Add lime if needed — brassicas prefer pH 7.0–7.5.',
  },
  {
    id: 'legumes',
    name: 'Legumes & Beans',
    tag: 'Group 2 · Nitrogen fixers',
    color: '#8a2d8a',
    desc: 'Legumes fix atmospheric nitrogen through root nodules and leave the soil enriched for the following year\'s hungry crop. Always plant legumes before brassicas or onions in the rotation.',
    crops: ['🫘 Runner Beans','🫛 Broad Beans','🫛 French Beans','🫛 Peas','🫛 Climbing Beans','🌿 Mangetout','🌿 Sugar Snap Peas'],
    disease: 'Pea and bean weevil, chocolate spot (broad beans), halo blight, root rot. Keep beds well drained. Avoid waterlogged conditions.',
    nutrient: 'Leave nitrogen-rich root nodules in the soil — cut plants at ground level rather than pulling, leaving the roots to decompose. This feeds the next crop naturally.',
  },
  {
    id: 'roots',
    name: 'Root Vegetables & Potatoes',
    tag: 'Group 3 · Deep rooting',
    color: '#8a5a2d',
    desc: 'Root vegetables need loose, stone-free, non-recently-manured soil (fresh manure causes forking). Potatoes are a separate family but traditionally rotated in this slot — they act as a cleaning crop, their dense canopy suppressing weeds.',
    crops: ['🥕 Carrot','🌻 Parsnip','🫀 Beetroot','🥔 Potato','🧅 Celeriac','🌿 Florence Fennel','🌿 Salsify','🌿 Hamburg Parsley'],
    disease: 'Carrot root fly (use fleece as barrier — rotation alone is not enough as fly travels). Potato blight, scab, eelworm. Keep potatoes out of the same ground for at least 3 years.',
    nutrient: 'Do NOT apply fresh manure before this group — causes forking and hairy roots. Apply manure to the previous year\'s brassica/onion plot instead. Add balanced fertiliser at planting.',
  },
  {
    id: 'alliums',
    name: 'Alliums & Salads',
    tag: 'Group 4 · Light feeders',
    color: '#2d5a8a',
    desc: 'Onions, garlic, leeks and shallots share allium white rot — a devastating fungal disease that can persist in soil for 15–20 years. Group them together and keep them away from where they grew before. Salads and shallow-rooted crops are often included in this slot.',
    crops: ['🧅 Onion','🧄 Garlic','🧅 Shallot','🥢 Leek','🌱 Spring Onion','🥬 Lettuce','🌿 Rocket','🔴 Radish (small)','🌿 Spinach','🥬 Chard','🌿 Corn Salad','🥬 Endive'],
    disease: 'Allium white rot, onion fly, leek rust. Allium white rot sclerotia (resting bodies) persist in soil for 15–20 years — crop rotation is critical.',
    nutrient: 'Moderate feeders. Apply balanced fertiliser. Avoid over-nitrogenation — it produces lush leaves at the expense of bulbs. Garlic benefits from potassium-rich feed when bulbing starts.',
  },
];

const ROT_PLAN_BEDS = [
  {
    label: 'Bed A', color: '#2d8a4e',
    years: [
      { year: 'Year 1', group: 'Brassicas', crops: '🥦 Broccoli, 🥬 Cabbage, 🥬 Kale, 🌱 Sprouts' },
      { year: 'Year 2', group: 'Legumes', crops: '🫘 Runner Beans, 🫛 Broad Beans, 🫛 Peas' },
      { year: 'Year 3', group: 'Roots', crops: '🥕 Carrot, 🌻 Parsnip, 🥔 Potato, 🫀 Beetroot' },
      { year: 'Year 4', group: 'Alliums', crops: '🧅 Onion, 🧄 Garlic, 🥢 Leek, 🥬 Lettuce' },
    ]
  },
  {
    label: 'Bed B', color: '#8a2d8a',
    years: [
      { year: 'Year 1', group: 'Legumes', crops: '🫘 Runner Beans, 🫛 Broad Beans, 🫛 Peas' },
      { year: 'Year 2', group: 'Roots', crops: '🥕 Carrot, 🌻 Parsnip, 🥔 Potato, 🫀 Beetroot' },
      { year: 'Year 3', group: 'Alliums', crops: '🧅 Onion, 🧄 Garlic, 🥢 Leek, 🥬 Lettuce' },
      { year: 'Year 4', group: 'Brassicas', crops: '🥦 Broccoli, 🥬 Cabbage, 🥬 Kale, 🌱 Sprouts' },
    ]
  },
  {
    label: 'Bed C', color: '#8a5a2d',
    years: [
      { year: 'Year 1', group: 'Roots', crops: '🥕 Carrot, 🌻 Parsnip, 🥔 Potato, 🫀 Beetroot' },
      { year: 'Year 2', group: 'Alliums', crops: '🧅 Onion, 🧄 Garlic, 🥢 Leek, 🥬 Lettuce' },
      { year: 'Year 3', group: 'Brassicas', crops: '🥦 Broccoli, 🥬 Cabbage, 🥬 Kale, 🌱 Sprouts' },
      { year: 'Year 4', group: 'Legumes', crops: '🫘 Runner Beans, 🫛 Broad Beans, 🫛 Peas' },
    ]
  },
  {
    label: 'Bed D', color: '#2d5a8a',
    years: [
      { year: 'Year 1', group: 'Alliums', crops: '🧅 Onion, 🧄 Garlic, 🥢 Leek, 🥬 Lettuce' },
      { year: 'Year 2', group: 'Brassicas', crops: '🥦 Broccoli, 🥬 Cabbage, 🥬 Kale, 🌱 Sprouts' },
      { year: 'Year 3', group: 'Legumes', crops: '🫘 Runner Beans, 🫛 Broad Beans, 🫛 Peas' },
      { year: 'Year 4', group: 'Roots', crops: '🥕 Carrot, 🌻 Parsnip, 🥔 Potato, 🫀 Beetroot' },
    ]
  },
];

// ── WINTER MAINTENANCE ──
const WINTER_TASKS = {
  '🌱 Growing Beds': [
    'Clear all spent crops from beds','Weed all beds thoroughly','Apply compost or well-rotted manure (7–10cm)','Cover beds with cardboard, polythene or membrane','Sow green manures on uncovered beds','Protect tender perennial crowns (asparagus, artichokes, dahlias)','Sketch or photograph crop positions for rotation planning','Inspect raised bed timbers for rot; top up compost level'
  ],
  '💧 Pond & Water': [
    'Net the pond for autumn leaf fall (2–4mm mesh)','Cut back dead marginal plants to 15cm above water','Check and clean pond pump and filter','Arrange freeze protection (de-icer or floating ball) for fish ponds','Empty, clean, and inspect all water butts','Check all gutters, downpipes, and diverter valves','Drain and insulate all outdoor taps','Drain and store all hoses in frost-free location'
  ],
  '🏚 Structures': [
    'Inspect and treat shed and summerhouse timbers','Clean greenhouse and shed windows and doors','Check locks, latches, and hinges; oil and replace as needed','Inspect roof for tears, bubbles, and loose edges','Clear gutters on all structures of leaf debris','Prepare greenhouse for winter: insulation, heating check, ventilator test','Harvest finished compost; service compost bins','Check all fence posts and structures for wind damage'
  ],
  '🔧 Tools & Equipment': [
    'Clean all hand tools of soil and debris','Sharpen cutting edges — spades, hoes, secateurs, loppers','Oil and grease all metal surfaces','Treat all wooden handles with linseed oil','Service lawnmower — drain fuel, change oil, sharpen blade','Service strimmer, hedgecutter, and other power tools','Store all tools logically and securely on wall-mounted racks','Charge and store all lithium batteries at 50–60%'
  ],
  '🪴 Pots & Containers': [
    'Sort pots by frost-hardiness; move vulnerable pots under cover','Clean and store all empty containers','Wrap frost-vulnerable pots in bubble wrap or hessian','Raise all containers on pot feet or bricks','Take down, clean, and store all hanging baskets','Secure large containers against wind toppling','Plant up winter and spring containers while soil is warm'
  ]
};

function buildWinterChecklist() {
  const grid = document.getElementById('winterChecklist');
  if (!grid) return;
  grid.innerHTML = '';
  Object.entries(WINTER_TASKS).forEach(([cat, tasks]) => {
    const label = document.createElement('div');
    label.className = 'checklist-category-label';
    label.textContent = cat;
    grid.appendChild(label);
    tasks.forEach((task, i) => {
      const key = `winter_${cat}_${i}`;
      let done = false; try { done = localStorage.getItem(key) === '1'; } catch(e){}
      const item = document.createElement('div');
      item.className = 'checklist-item' + (done ? ' done' : '');
      item.innerHTML = `<div class="check-box">${done ? '✓' : ''}</div><span class="check-text">${task}</span>`;
      item.addEventListener('click', () => {
        const isDone = item.classList.toggle('done');
        item.querySelector('.check-box').textContent = isDone ? '✓' : '';
        try { localStorage.setItem(key, isDone ? '1' : '0'); } catch(e){}
        updateWinterProgress();
      });
      grid.appendChild(item);
    });
  });
  updateWinterProgress();
}

function updateWinterProgress() {
  const items = document.querySelectorAll('.checklist-item');
  const done = document.querySelectorAll('.checklist-item.done');
  const total = items.length;
  const pct = total > 0 ? Math.round(done.length / total * 100) : 0;
  const bar = document.getElementById('winterProgressBar');
  const lbl = document.getElementById('winterProgressLabel');
  if (bar) bar.style.width = pct + '%';
  if (lbl) lbl.textContent = `${done.length} of ${total} tasks complete${pct === 100 ? ' — plot closed down! 🎉' : ''}`;
}

function checkAllWinter() {
  document.querySelectorAll('.checklist-item').forEach(item => {
    if (!item.classList.contains('done')) item.click();
  });
}

function resetWinterChecklist() {
  if (!confirm('Reset all checklist items?')) return;
  document.querySelectorAll('.checklist-item').forEach(item => {
    if (item.classList.contains('done')) item.click();
  });
  Object.entries(WINTER_TASKS).forEach(([cat, tasks]) => {
    tasks.forEach((_, i) => { try { localStorage.removeItem(`winter_${cat}_${i}`); } catch(e){} });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // ── WINTER TABS ──
  const winterTabs = document.getElementById('winterTabs');
  if (winterTabs) winterTabs.addEventListener('click', e => {
    const btn = e.target.closest('.wtab');
    if (!btn) return;
    document.querySelectorAll('.wtab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.wtab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    const panel = document.querySelector(`.wtab-panel[data-wpanel="${btn.dataset.wtab}"]`);
    if (panel) {
      panel.classList.add('active');
      if (btn.dataset.wtab === 'checklist') buildWinterChecklist();
    }
  });

  // ── GROWING BEDS TABS ──
  const bedsTabs = document.getElementById('bedsTabs');
  if (bedsTabs) bedsTabs.addEventListener('click', e => {
    const btn = e.target.closest('.bdtab');
    if (!btn) return;
    document.querySelectorAll('.bdtab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.bdtab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    const panel = document.querySelector(`.bdtab-panel[data-bdpanel="${btn.dataset.bdtab}"]`);
    if (panel) panel.classList.add('active');
  });

  // ── FENCING TABS ──
  const fencingTabs = document.getElementById('fencingTabs');
  if (fencingTabs) fencingTabs.addEventListener('click', e => {
    const btn = e.target.closest('.ftab');
    if (!btn) return;
    document.querySelectorAll('.ftab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.ftab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    const panel = document.querySelector(`.ftab-panel[data-fpanel="${btn.dataset.ftab}"]`);
    if (panel) panel.classList.add('active');
  });

  // ── COMPOST TABS ──
  const compostTabs = document.getElementById('compostTabs');
  if (compostTabs) compostTabs.addEventListener('click', e => {
    const btn = e.target.closest('.ctab');
    if (!btn) return;
    document.querySelectorAll('.ctab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.ctab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    const panel = document.querySelector(`.ctab-panel[data-panel="${btn.dataset.tab}"]`);
    if (panel) panel.classList.add('active');
  });

});

// ══════════════════════════════════════════════
// TOOLS & EQUIPMENT
// ══════════════════════════════════════════════

const TOOLS_DATA = {
  digging: [
        {
      id:'spade', tier:'essential', icon:'🪏', name:'Digging Spade',
      tag:'Digging', colour:'#5a7a3a',
      brands:[{name:'Spear & Jackson',model:'Kew Gardens (stainless)'},{name:'Fiskars',model:'Solid Spade'},{name:'Wolf-Garten',model:'Elite Spade'}],
      price:'£30 – £80',
      desc:'The single most important garden tool. A good spade will last decades and do everything from digging beds to slicing through roots and edging borders.',
      whyNeed:'A quality spade is non-negotiable on any vegetable plot. Used for initial bed preparation, turning compost in, planting large specimens, and dividing clumps. Invest once — a well-made stainless blade never rusts.',
      features:[
        {i:'🔩',t:'Stainless or carbon steel blade — stainless steel needs no oiling and slides through soil more easily'},
        {i:'📏',t:'Full-length or D-handle — D-grip suits most people; a long handle gives leverage in heavy soil'},
        {i:'⚖',t:'Check the balance: hold at the top of the shaft — the blade should not drop under its own weight'},
        {i:'🔧',t:'Forged head riveted to the handle is far more durable than socket-and-shaft construction'},
      ],
      tips:'Step onto the shoulder of the blade with your whole foot — not your arch. This protects your ankle and drives the blade in squarely. Always clean and dry before storing.'
    },
    {
      id:'borderspade', tier:'essential', icon:'🪏', name:'Border Spade',
      tag:'Digging', colour:'#5a7a3a',
      brands:[{name:'Spear & Jackson',model:'Kew Gardens Border Spade (stainless)'},{name:'Burgon & Ball',model:'RHS Stainless Border Spade'},{name:'Fiskars',model:'Solid Border Spade'}],
      price:'£28 – £65',
      desc:'A shorter, narrower-bladed spade for border work, raised beds, and confined spaces. Lighter than a full-size digging spade — chosen by many experienced growers for all vegetable plot work.',
      whyNeed:'The border spade is the preferred choice for most raised bed and border work — its smaller head means less weight per stroke, ideal for sustained sessions. The narrower blade slips easily between plants and the stainless steel finish never sticks in clay.',
      features:[
        {i:'📐',t:'Narrower blade (14–17cm vs 19cm full-size) — less resistance in heavy soil, ideal for border work'},
        {i:'🔩',t:'Stainless steel blade — does not rust, does not stick in clay, and cuts cleanly through turf'},
        {i:'🌳',t:'YD-handle or T-handle for good leverage in confined spaces; ash or fibreglass shaft'},
        {i:'⚖',t:'Noticeably lighter than a full-size spade — reduces fatigue over a long plot session'},
      ],
      tips:'Many experienced kitchen gardeners use a border spade for all their vegetable work. The smaller blade gives more control when planting, the lighter weight allows longer sessions, and the narrower head fits between rows without disturbing plants.'
    },
        {
      id:'fork', tier:'essential', icon:'🍽️', name:'Border Fork',
      tag:'Digging', colour:'#5a7a3a',
      brands:[{name:'Spear & Jackson',model:'Kew Gardens Fork'},{name:'Fiskars',model:'Solid Garden Fork'},{name:'Wolf-Garten',model:'Multi-Change Fork'}],
      price:'£25 – £75',
      desc:'The spade\'s essential partner. Forks break up clods, incorporate compost, lift root vegetables without slicing, and aerate compacted soil without cutting worm channels.',
      whyNeed:'Indispensable for lifting potatoes and parsnips intact, breaking up clay clods after digging, and working compost into the top layer. A digging fork is used on almost every session in the plot.',
      features:[
        {i:'🔩',t:'4 square tines for digging and lifting; flat tines for moving compost'},
        {i:'📏',t:'Border fork (smaller head) suits most raised beds; full-size fork for open ground digging'},
        {i:'⚖',t:'Forged steel tines that are solid from base to tip — never hollow tines that bend'},
        {i:'🌳',t:'Ash or FSC hardwood handle — springy and shock-absorbing; better than fibreglass in cold hands'},
      ],
      tips:'Use a fork rather than a spade to work around established root crops. The tines slide between roots rather than slicing through them. Never use a fork as a lever to lift very large boulders — the tines will bend.'
    },
    {
      id:'diggingfork', tier:'essential', icon:'🔱', name:'Digging Fork',
      tag:'Digging', colour:'#5a7a3a',
      brands:[{name:'Spear & Jackson',model:'Kew Gardens Digging Fork (stainless)'},{name:'Burgon & Ball',model:'RHS Stainless Digging Fork'},{name:'Fiskars',model:'Solid Digging Fork'}],
      price:'£30 – £80',
      desc:'The full-size digging fork with a wider, heavier head than the border fork — the workhorse for breaking new ground, turning compost heaps, and lifting large root vegetables on open beds.',
      whyNeed:'Where the border fork suits raised beds and confined spaces, the digging fork excels on open vegetable plots, allotments, and new ground. Its wider head moves more material per stroke and the heavier tines penetrate compacted soil more effectively.',
      features:[
        {i:'🔩',t:'Wider 4-tine head (26–28cm) vs border fork (19cm) — greater coverage on open ground'},
        {i:'⚖',t:'Heavier build designed for sustained digging work — look for forged, not pressed, tine construction'},
        {i:'🌳',t:'Long shaft (1.1m+) for upright digging posture — protects the back on extended sessions'},
        {i:'🔧',t:'Square tines penetrate clay better than flat tines; use flat tines for scooping compost'},
      ],
      tips:'Use a digging fork rather than a spade for breaking up clay soil — the tines shatter and aerate rather than compressing the subsoil into a pan. Work in autumn after rain has softened the ground.'
    },
    {
      id:'lawnrake', tier:'desirable', icon:'🌾', name:'Lawn Rake / Scarifier Rake',
      tag:'Lawn', colour:'#6a8a4a',
      brands:[{name:'Spear & Jackson',model:'Kew Gardens Lawn Rake (stainless)'},{name:'Burgon & Ball',model:'RHS Stainless Lawn Rake'},{name:'Wolf-Garten',model:'Multi-Change Lawn Rake'}],
      price:'£18 – £45',
      desc:'A wide fan-head rake with flexible springy tines designed for scarifying moss and thatch from lawns, gathering leaves, and cleaning up debris from between plants without damaging stems.',
      whyNeed:'A lawn rake serves a completely different purpose from a soil rake — its flexible tines collect without digging in. Essential for autumn leaf gathering from beds and paths, scarifying moss from lawn areas, and clearing debris from between strawberry plants or asparagus crowns.',
      features:[
        {i:'🌿',t:'Wide fan head (40–60cm) with flexible spring-steel tines — gathers rather than digs'},
        {i:'🍂',t:'Scarifying action removes thatch and moss from lawns without turf damage'},
        {i:'📏',t:'Long handle for upright working posture — avoids back strain on extended leaf clearance'},
        {i:'🔩',t:'Stainless steel tines resist rust and maintain spring memory over years of use'},
      ],
      tips:'Use the lawn rake between soft fruit rows in early spring to remove old leaves that harbour botrytis and strawberry red core disease. A single pass removes the overwintering debris that would otherwise infect the new season\'s growth.'
    },
    {
      id:'trowel', tier:'essential', icon:'🌱', name:'Hand Trowel',
      tag:'Planting', colour:'#5a8a5a',
      brands:[{name:'Burgon & Ball',model:'RHS Trowel (award winner)'},{name:'Fiskars',model:'Solid Trowel'},{name:'Wolf-Garten',model:'Comfort Trowel'}],
      price:'£12 – £40',
      desc:'The most-used hand tool in the garden. A quality trowel plants seedlings, sets bulbs, mixes in fertiliser, and deals with individual weeds in tight spaces.',
      whyNeed:'Used on virtually every plot visit for transplanting, setting out onion sets and garlic, opening seed drills, and removing individual weeds near plant stems. A poor trowel bends on the first stone — a good one lasts a lifetime.',
      features:[
        {i:'🔩',t:'One-piece stainless steel (forged or laser-cut) — no weld between blade and shank to fail'},
        {i:'📏',t:'Depth marks on the blade are genuinely useful for planting bulbs at the correct depth'},
        {i:'🎨',t:'Brightly coloured handle — trowels are the garden\'s most-lost tool'},
        {i:'⚖',t:'Comfortable grip: rubber-overmoulded or ergonomic handle reduces hand fatigue'},
      ],
      tips:'The Burgon & Ball RHS trowel is among the best value tools available — it has won multiple awards and holds its edge for years. Buy once, buy well.'
    },
        {
      id:'rake', tier:'essential', icon:'🍁', name:'Garden Rake',
      tag:'Soil Prep', colour:'#7a6a3a',
      brands:[{name:'Wolf-Garten',model:'Elite Soil Rake'},{name:'Spear & Jackson',model:'Carbon Steel Rake'},{name:'Fiskars',model:'Solid Rake'}],
      price:'£20 – £50',
      desc:'The finishing tool for seed bed preparation. A good rake levels the surface, breaks down clods, removes stones and debris, and creates the fine tilth required for direct sowing.',
      whyNeed:'Raking creates the firm, fine, stone-free seedbed that small seeds need for good germination. Also used to level lawn top-dressing, draw seed drills with the handle, and gather debris after cutting.',
      features:[
        {i:'🔩',t:'Carbon steel or stainless tines — 12–14 tines for general use; more tines for finer work'},
        {i:'📏',t:'Long handle (1.5m minimum) for a comfortable upright posture'},
        {i:'↔',t:'Wider heads (30–40cm) cover more ground efficiently on large beds'},
        {i:'🔧',t:'Check the bow/crook attachment where tines meet shaft — this is the commonest failure point'},
      ],
      tips:'Create a fine tilth by raking in two directions — first the length of the bed, then across it. Then rake away the largest stones and clods. The surface should crumble like rough breadcrumbs before direct sowing.'
    },
        {
      id:'cultivator', tier:'desirable', icon:'🔧', name:'Long-handled Cultivator',
      tag:'Soil Prep', colour:'#8a7a4a',
      brands:[{name:'Wolf-Garten',model:'Multi-Change Cultivator'},{name:'Fiskars',model:'3-Tine Cultivator'},{name:'Spear & Jackson',model:'Carbon Cultivator'}],
      price:'£25 – £55',
      desc:'A 3 or 5-tine long-handled tool for breaking up the soil crust between crops, incorporating fertiliser into the top layer, and mixing in mulches on established beds.',
      whyNeed:'Between established crops, a Dutch hoe cuts weeds but doesn\'t break up the soil surface. A cultivator scratches through the top 5–8cm, breaking the crust that prevents rain penetrating and improving aeration around root crops.',
      features:[
        {i:'↔',t:'3-tine for tight spaces; 5-tine for wider beds'},
        {i:'🔧',t:'Forged tines that resist bending on stony ground'},
        {i:'📏',t:'Long handle for working without bending'},
        {i:'⚙',t:'Some models have fold-flat tines for storage'},
      ],
      tips:'Use a cultivator rather than a fork when you want surface aeration without disturbing deep roots. Work in dry conditions and leave the loosened soil on the surface — the sun and wind will break up clods naturally.'
    },
        {
      id:'petrol-tiller', tier:'lovetohave', icon:'⚙️', name:'Petrol Tiller / Rotavator',
      tag:'Soil Prep', colour:'#8a6a2a',
      brands:[{name:'Stihl',model:'MM 55 (multi-system with tiller head)'},{name:'Honda',model:'FG110K1'},{name:'Mantis',model:'2-Stroke Tiller'}],
      price:'£450 – £900',
      desc:'A rotary tiller is the fastest way to prepare a large new bed or incorporate bulk organic matter. For the no-dig gardener this tool is rarely needed; for those on heavy clay it can be transformative in year one.',
      whyNeed:'Useful for initial cultivation of a new plot, breaking up compacted ground on allotments, or incorporating a thick layer of manure before the first season. Once beds are established, hand tools and no-dig methods are preferable.',
      features:[
        {i:'📐',t:'Working width 20–45cm; smaller mini-tillers for raised beds, larger for open ground'},
        {i:'⚙',t:'Counter-rotating tines (working backwards) self-propel through heavy soil'},
        {i:'📏',t:'Depth adjustment: 5–20cm — always start shallow on unknown ground to avoid breaking buried irrigation'},
        {i:'🔧',t:'Stihl MM 55 multi-system: the tiller head attaches to the same power unit as the strimmer and edger'},
      ],
      tips:'A rotary tiller creates a fine \'tilth\' that can actually impede drainage in heavy clay — a condition called \'plough pan\'. After initial cultivation, switch to no-dig methods to protect the soil structure you have created.'
    },
  ],
  cutting: [
        {
      id:'secateurs', tier:'essential', icon:'✂️', name:'Bypass Secateurs',
      tag:'Cutting', colour:'#8a4a4a',
      brands:[{name:'Felco',model:'No.2 (the benchmark)'},{name:'Fiskars',model:'Solid S52/S56'},{name:'Burgon & Ball',model:'RHS Bypass Secateurs'}],
      price:'£25 – £70',
      desc:'Precision cutting tool for pruning fruit trees, cutting back perennials, harvesting squash, and deadheading. Bypass action (like scissors) makes clean cuts that heal rapidly — essential over anvil secateurs for plant health.',
      whyNeed:'Fruit tree pruning, harvesting tough crops (squash, courgette, sweetcorn), cutting back perennials, and taking cuttings all require proper secateurs. Bypass action cuts without crushing — crucial for disease prevention.',
      features:[
        {i:'🔪',t:'Bypass action (not anvil) — cuts cleanly without crushing the stem'},
        {i:'🔩',t:'Replaceable blade — Felco blades are available individually; extends tool life indefinitely'},
        {i:'👋',t:'Spring-loaded return and lockable safety catch for one-handed operation'},
        {i:'📏',t:'Available in different sizes: standard, compact (small hands), and left-handed versions'},
      ],
      tips:'Felco No.2 is the world\'s best-selling secateur for good reason. Sharpen with a small whetstone regularly — a sharp secateur needs 60% less force and makes cleaner cuts. Wipe blades with an oily cloth before storing.'
    },
    {
      id:'lopperbypass', tier:'essential', icon:'✂️', name:'Bypass Lopper',
      tag:'Cutting', colour:'#8a4a4a',
      brands:[{name:'Spear & Jackson',model:'Razorsharp Steel Telescopic Bypass Lopper'},{name:'Felco',model:'F-200 Bypass Lopper'},{name:'Fiskars',model:'Bypass Lopper 112590'}],
      price:'£35 – £90',
      desc:'Long-handled bypass loppers give the reach and leverage to cut branches up to 4–5cm diameter cleanly without a saw. Telescopic handles extend to reduce strain and provide better control at awkward angles.',
      whyNeed:'Loppers are the essential link between secateurs and a saw — for branches too thick to cut with secateurs but too small to justify a saw. Bypass action (scissor cut) is essential for all living wood — it cuts cleanly without crushing the cambium layer.',
      features:[
        {i:'✂️',t:'Bypass (scissor) action — clean cut that heals quickly; use on all living wood'},
        {i:'📏',t:'Telescopic handles extend from ~60cm to ~90cm — increases reach and leverage significantly'},
        {i:'💪',t:'Ratchet mechanism (on some models) multiplies cutting force — useful for thick or hard wood'},
        {i:'🔩',t:'High-carbon steel blade with non-stick coating reduces sap build-up and friction'},
      ],
      tips:'Always cut just above a bud or side branch — never leave a stub. Long stubs die back and provide a pathway for disease into the main branch. Keep blades clean with a cloth and light oil after each use to prevent rust and sap corrosion.'
    },
    {
      id:'lopperanvil', tier:'desirable', icon:'🪚', name:'Anvil Lopper',
      tag:'Cutting', colour:'#8a4a4a',
      brands:[{name:'Spear & Jackson',model:'Razorsharp Steel Telescopic Anvil Lopper'},{name:'Fiskars',model:'PowerGear Anvil Lopper'},{name:'Bahco',model:'PG-19 Ergo Lopper'}],
      price:'£30 – £75',
      desc:'An anvil lopper uses a single blade that closes onto a flat anvil surface — generating more cutting force than bypass loppers, ideal for cutting dead wood, thick stems, and hard dry wood.',
      whyNeed:'Anvil loppers crush rather than slice, so they are only used on dead wood, firewood, and thick dry material where the crushing action doesn\'t damage living tissue. The higher mechanical advantage makes them excellent for hard, elderly fruit tree prunings.',
      features:[
        {i:'⚡',t:'Single blade on anvil — generates 40% more cutting force than bypass for the same effort'},
        {i:'📏',t:'Telescopic handles (60–90cm) for extended reach; soft-grip handles reduce vibration fatigue'},
        {i:'🔨',t:'Anvil action is correct for dead wood only — never use on living stems (crushes and kills tissue)'},
        {i:'🔩',t:'Wide anvil jaw grips material firmly, preventing slipping during the cut'},
      ],
      tips:'Keep bypass loppers for living wood and anvil loppers for dead wood — that single distinction prevents most pruning mistakes. The anvil lopper is particularly useful for clearing old fruit tree prunings and cutting back thick dead perennial stems.'
    },
    {
      id:'handshears', tier:'essential', icon:'✂️', name:'Hand Shears',
      tag:'Cutting', colour:'#7a4a5a',
      brands:[{name:'Spear & Jackson',model:'Razorsharp Advance Compact Hand Shears'},{name:'Burgon & Ball',model:'RHS Stainless Hand Shears'},{name:'Felco',model:'600 Series Shears'}],
      price:'£20 – £55',
      desc:'Precision hand shears for trimming box hedging, shaping dwarf hedges, cutting back perennials, and tidying the edges of beds and borders. A quality pair stays sharp for seasons of regular use.',
      whyNeed:'For topiary, box balls, low hedging, and edging the grass alongside raised beds, nothing replaces a good pair of hand shears. Compact models with shorter blades give better control for detailed work; longer-bladed versions cover ground faster on formal hedges.',
      features:[
        {i:'🔪',t:'Precision-ground stainless steel blades — hold an edge through a full season of regular use'},
        {i:'👋',t:'Soft-grip cushioned handles reduce hand fatigue on extended trimming sessions'},
        {i:'🔩',t:'Adjustable blade tension screw ensures a clean cut with no snipping or binding'},
        {i:'📐',t:'Compact (20cm blade) for topiary detail; standard (24cm) for general hedging'},
      ],
      tips:'Wipe blades with a slightly oiled cloth after each use — sap corrosion will blunt a fine edge faster than cutting. For box topiary, clean blades between plants to avoid spreading box blight (Cylindrocladium buxicola) from plant to plant.'
    },
    {
      id:'edgingshears', tier:'desirable', icon:'📐', name:'Telescopic Edging Shears',
      tag:'Cutting', colour:'#7a5a4a',
      brands:[{name:'Spear & Jackson',model:'Razorsharp Steel Telescopic Edging Shears'},{name:'Wolf-Garten',model:'Telescopic Edging Shears'},{name:'Fiskars',model:'Telescopic Grass Shears'}],
      price:'£30 – £60',
      desc:'Long-handled edging shears with blades oriented horizontally — cut the grass edge alongside beds, borders, and paths while standing upright. Telescopic handles extend for tall users and reduce back strain dramatically.',
      whyNeed:'Clean lawn edges alongside vegetable beds instantly improve the appearance of a plot and prevent grass creeping into beds. Edging shears cut horizontal grass edges in a standing position — far less tiring than kneeling with hand shears or using a half-moon edger.',
      features:[
        {i:'📏',t:'Telescopic handles extend 75–120cm — adjusts to user height for upright, back-friendly working posture'},
        {i:'🔄',t:'Rotating head (on some models) adjusts blade angle for both vertical and horizontal cuts'},
        {i:'🔩',t:'Hardened steel blades stay sharp through a full season; blade adjustment screw for clean cut tension'},
        {i:'⚖',t:'Lightweight aluminium handles keep overall weight manageable for extended edging sessions'},
      ],
      tips:'Edge beds in spring after the first mow — a clean edge established early stays tidy with only occasional maintenance cuts through summer. Use a half-moon edger first to establish a crisp new line; then use the edging shears monthly to maintain it.'
    },
    {
      id:'topyaryshears', tier:'lovetohave', icon:'🌸', name:'Topiary Shears',
      tag:'Cutting', colour:'#6a4a6a',
      brands:[{name:'Spear & Jackson',model:'Kew Gardens Collection Compact Topiary Shears'},{name:'Niwaki',model:'GR Pro Topiary Shears'},{name:'Burgon & Ball',model:'Compact Topiary Shears'}],
      price:'£20 – £60',
      desc:'Small, lightweight single-handed shears specifically designed for detailed topiary work — trimming box balls, cloud pruning, and intricate formal shapes where large hand shears lack precision.',
      whyNeed:'For precise topiary, the spring-loaded single-loop handle of topiary shears gives one-handed control and rapid snip action not possible with two-handled shears. They are the tool of choice for box balls, spiral topiary, and maintaining small formal shapes in herbs.',
      features:[
        {i:'🔪',t:'Narrow, pointed blades for precise cuts — ideal for intricate topiary and cloud shapes'},
        {i:'🖐',t:'Single-loop spring-steel handle — one-handed operation with automatic blade-opening spring return'},
        {i:'⚖',t:'Very lightweight (under 200g) — no hand fatigue on extended detailed trimming sessions'},
        {i:'🔩',t:'Carbon or stainless steel blades; keep clean and lightly oiled after every use'},
      ],
      tips:'Use topiary shears for the fine trim after hand shears have done the bulk cutting — they give a precision finish not possible with larger tools. For box blight control, dip blades in dilute Jeyes fluid between plants.'
    },
    {
      id:'treepruner', tier:'lovetohave', icon:'🌳', name:'Telescopic Tree Pruner',
      tag:'Cutting', colour:'#5a6a3a',
      brands:[{name:'Spear & Jackson',model:'Razorsharp Advantage Telescopic Tree Pruner'},{name:'Bahco',model:'P34-F Telescoping Pruner'},{name:'Wolf-Garten',model:'Telescopic Tree Pruner'}],
      price:'£40 – £100',
      desc:'A pole-mounted cutting head that extends to 3–4m — cuts branches up to 3cm diameter at height without a ladder, using a pull-cord mechanism. Combined pruner and pruning saw models tackle most tree maintenance from the ground.',
      whyNeed:'For any fruit tree taller than arm\'s reach, a telescopic tree pruner allows safe, controlled pruning from the ground. Eliminates the need for a ladder on most maintenance cuts — safer, faster, and gives better control of cut angle when working overhead.',
      features:[
        {i:'📏',t:'Telescopic pole extends to 3–4m — access branches up to 5m+ from ground level'},
        {i:'🔗',t:'Pull-cord operates bypass cutting head — one-handed operation leaves the other hand for steadying the pole'},
        {i:'🪚',t:'Many models include a curved pruning saw on the reverse of the pole head'},
        {i:'⚖',t:'Lightweight fibreglass or aluminium pole — critical for sustained overhead reaching'},
      ],
      tips:'Cut branches at the collar (the slight swelling where branch meets trunk) — not flush with the trunk. The collar contains specialised tissue that grows over the wound. Never cut during winter with stone fruit trees — summer only to prevent silver leaf disease entry.'
    },
        {
      id:'battery-secateurs', tier:'desirable', icon:'✂', name:'Battery Pruning Shears',
      tag:'Cutting', colour:'#8a4a4a',
      brands:[{name:'Stihl',model:'ASA 20 (professional pruner)'},{name:'Felco',model:'Felco 801'},{name:'Zenport',model:'Z118 (budget option)'}],
      price:'£180 – £450',
      desc:'Power-assisted secateurs that cut with a motor-assisted blade — essential for anyone with hand conditions, or managing large quantities of pruning and harvesting on commercial or large domestic plots.',
      whyNeed:'For regular pruning sessions on fruit trees, roses, or herbaceous borders, battery secateurs dramatically reduce hand fatigue. The Stihl ASA 20 cuts branches to 45mm diameter — equivalent to loppers — with a single hand.',
      features:[
        {i:'⚡',t:'Motor-assisted cut reduces the hand force needed by 70–90%'},
        {i:'🩺',t:'Recommended by physiotherapists for gardeners with arthritis, RSI, or hand injuries'},
        {i:'📏',t:'Cutting diameter: 20–45mm depending on model'},
        {i:'🔋',t:'Stihl AS 2 battery runs approximately 200 cuts per charge'},
      ],
      tips:'Battery secateurs genuinely change gardening for people with hand strength limitations. If the price is a barrier, the Felco 801 is a more accessible entry point at around half the price of Stihl.'
    },
    // ── LOVE TO HAVE ─────────────────────────────,
        {
      id:'petrol-hedgetrimmer', tier:'desirable', icon:'✂', name:'Petrol Hedge Trimmer',
      tag:'Hedges', colour:'#2a7a2a',
      brands:[{name:'Stihl',model:'HS 45 (45cm blade)'},{name:'Stihl',model:'HS 56 CE (ergonomic)'},{name:'Honda',model:'HHH25HTE'}],
      price:'£250 – £500',
      desc:'For large established hedges — leylandii, hawthorn, beech, or box — a petrol hedge trimmer gives the sustained power and reach that battery models struggle to maintain.',
      whyNeed:'If your plot has a long formal hedge, a petrol trimmer completes the job in one session without battery changes. The Stihl HS 45 is the workhorse of professional gardeners — balanced, powerful, and repairable.',
      features:[
        {i:'📏',t:'45–60cm blade length — longer blade suits tall or wide formal hedges'},
        {i:'⚙',t:'Double-sided blade cuts in both directions for fast formal shaping'},
        {i:'🔧',t:'Stihl service network ensures parts and servicing availability nationally'},
        {i:'🎧',t:'Petrol models require ear defenders (95dB+); battery models are quieter'},
      ],
      tips:'Never cut hedges when birds are nesting (February–August for most species) unless you have checked carefully first. Cut on a dry day — the clean cut wound dries and seals quickly in sun and wind, reducing disease entry.'
    },
        {
      id:'battery-hedgetrimmer', tier:'lovetohave', icon:'✂', name:'Battery Hedge Trimmer',
      tag:'Hedges', colour:'#3a7a5a',
      brands:[{name:'Stihl',model:'HSA 66 (AP battery, 50cm blade)'},{name:'Stihl',model:'HSA 86 (professional, 50cm)'},{name:'Fiskars',model:'HSA 86 alternative'}],
      price:'£200 – £380',
      desc:'A battery hedge trimmer suits formal gardens and properties where noise is a concern, or where the hedge is accessible from a single charge (medium hedges up to 60m).',
      whyNeed:'For formal topiary, box hedging, or lavender edging where precision matters and long run times are not critical, a battery hedge trimmer is quieter, vibration-free, and immediately ready to use without warm-up.',
      features:[
        {i:'🔋',t:'Stihl HSA 86 + AP 300 battery: 75 min runtime — sufficient for most domestic hedges in one charge'},
        {i:'🔇',t:'66dB — quiet enough for early-morning use in residential gardens'},
        {i:'📏',t:'50cm double-sided blade; tooth gap 22mm suits most ornamental hedges'},
        {i:'⚖',t:'Lighter than petrol equivalent — suitable for overhead reaching and detailed topiary'},
      ],
      tips:'For large estate-scale hedges, petrol remains the right choice. For a 20–40m domestic hedge, the Stihl HSA 86 with an AP 300 battery is genuinely professional in performance and requires zero maintenance.'
    },
        {
      id:'petrol-chainsaw', tier:'lovetohave', icon:'🪚', name:'Petrol Chainsaw',
      tag:'Timber', colour:'#6a4a2a',
      brands:[{name:'Stihl',model:'MS 170 (entry level)'},{name:'Stihl',model:'MS 211 C-BE (mid-range)'},{name:'Stihl',model:'MS 261 C-M (professional)'}],
      price:'£200 – £600',
      desc:'For managing fruit trees, coppice, or plot boundaries with large woody growth. A petrol chainsaw handles branches and trunks of any diameter and requires no recharging.',
      whyNeed:'If you manage apple or plum trees, have a log-producing boundary, or take on renovation of an established plot with overgrown structure, a chainsaw is the only practical tool. Stihl is unambiguously the quality standard.',
      features:[
        {i:'📏',t:'35–40cm bar sufficient for fruit tree work and firewood; longer bars for large timber'},
        {i:'⚙',t:'Chain brake, kickback protection, and vibration damping are non-negotiable safety features'},
        {i:'🔧',t:'Stihl ErgoStart reduces the pull force needed — valuable for regular use'},
        {i:'🎓',t:'Chainsaw operation requires proper training — NPTC CS30 and CS31 courses recommended'},
      ],
      tips:'SAFETY FIRST: Never use a chainsaw without chainsaw trousers, helmet with visor, and cut-resistant gloves. Always have someone within earshot. Stihl MS 170 is the world\'s best-selling chainsaw — it is a capable tool but invest in safety equipment before the tool.'
    },
        {
      id:'battery-chainsaw', tier:'lovetohave', icon:'🪚', name:'Battery Chainsaw',
      tag:'Timber', colour:'#6a4a2a',
      brands:[{name:'Stihl',model:'MSA 120 C-BQ (entry AP battery)'},{name:'Stihl',model:'MSA 220 C-B (mid-range)'},{name:'Husqvarna',model:'120i'}],
      price:'£250 – £500',
      desc:'For light timber work — pruning large branches, cutting firewood from small logs, and renovation of fruit tree structure — a battery chainsaw provides petrol-equivalent power without the maintenance.',
      whyNeed:'If you primarily use a chainsaw for occasional fruit tree pruning and small firewood cutting, a battery chainsaw handles it without petrol, oil-mixing, or carburettor maintenance. Stihl MSA 120 is the most popular battery chainsaw in domestic use.',
      features:[
        {i:'🔋',t:'Stihl AP 300 battery: 20 min heavy cutting or 50 min lighter limbing per charge'},
        {i:'📏',t:'30–35cm bar: adequate for fruit tree work and small log processing'},
        {i:'⚙',t:'Stihl Quickstop Plus chain brake and kickback protection — essential safety features'},
        {i:'🔇',t:'68dB — significantly quieter than petrol'},
      ],
      tips:'Same safety requirements as petrol: chainsaw trousers, helmet, visor, and cut-resistant gloves are non-negotiable regardless of power source. Battery chainsaws still kick back — do not let safety equipment become optional because the tool is quieter.'
    },
  ],
  weeding: [
        {
      id:'dutchhoe', tier:'essential', icon:'🌿', name:'Dutch Hoe',
      tag:'Weeding', colour:'#8a6a3a',
      brands:[{name:'Wolf-Garten',model:'Elite Dutch Hoe'},{name:'Burgon & Ball',model:'RHS Dutch Hoe'},{name:'Fiskars',model:'Solid Hoe'}],
      price:'£20 – £55',
      desc:'The most important weeding tool for vegetable plots. A sharp Dutch hoe slices weed seedlings at soil level on the push stroke with minimal effort and no bending.',
      whyNeed:'Weekly hoeing between rows prevents the "weed problem" from ever developing. A sharp hoe used when weeds are tiny — at the white thread stage — takes minutes rather than hours. The Dutch hoe is effective between rows of most vegetables.',
      features:[
        {i:'🔪',t:'Blade must be kept sharp — a blunt hoe pushes weeds aside rather than cutting them'},
        {i:'📏',t:'Handle length should allow you to hoe with a straight back — adjust or buy long-handled version'},
        {i:'⚙',t:'Flat push blade for between rows; stainless steel resists wear and corrosion'},
        {i:'🔧',t:'Wolf-Garten multi-change system allows the same handle to take multiple head attachments'},
      ],
      tips:'Hoe in dry weather — severed weed seedlings will wither on the surface in sun and wind. In damp weather they can re-root. Work backwards to avoid treading on hoed ground.'
    },
        {
      id:'drawhoe', tier:'desirable', icon:'🌿', name:'Draw Hoe',
      tag:'Weeding', colour:'#8a6a3a',
      brands:[{name:'Wolf-Garten',model:'Swan-neck Hoe'},{name:'Burgon & Ball',model:'Swan Neck Hoe'},{name:'Spear & Jackson',model:'Draw Hoe'}],
      price:'£20 – £50',
      desc:'A pull-action hoe ideal for earthing up potatoes, drawing seed drills, and working between taller crops where the Dutch hoe\'s push action doesn\'t suit.',
      whyNeed:'The draw hoe excels at earthing up potato rows — pull action drags soil from beside the row up and over the emerging shoots. Also used to draw precise seed drills and chop out large weeds by pulling rather than pushing.',
      features:[
        {i:'🔪',t:'Rectangular or swan-neck blade — pull towards yourself to cultivate soil and earth up'},
        {i:'📏',t:'Blade width 15–20cm for standard row spacing'},
        {i:'⚙',t:'Stainless steel blade stays sharp; mild steel requires occasional oiling'},
        {i:'🔧',t:'Wolf-Garten multi-change system: one handle for all heads'},
      ],
      tips:'Use the corner of the draw hoe blade as a precise marker for drawing seed drills: pull along a taut string line for perfectly straight rows. Adjust depth by the angle you hold the handle.'
    },
        {
      id:'loophoe', tier:'lovetohave', icon:'⭕', name:'Stirrup / Loop Hoe',
      tag:'Weeding', colour:'#7a5a9a',
      brands:[{name:'Wolf-Garten',model:'Push-Pull Hoe'},{name:'Burgon & Ball',model:'Oscillating Hoe'},{name:'Implementations',model:'Glaser Wheel Hoe'}],
      price:'£25 – £60',
      desc:'A hinged, double-sided hoe that cuts weeds on both the push and pull stroke. Twice as fast as a Dutch hoe and highly effective in sandy or fine loam soils.',
      whyNeed:'The oscillating blade swings freely and cuts through weed seedlings on the forward and backward stroke. In light soil it is dramatically faster than a Dutch hoe — a bed that takes 20 minutes with a Dutch hoe takes 10 with a stirrup hoe.',
      features:[
        {i:'🔄',t:'Hinged oscillating blade — cuts on push and pull'},
        {i:'🔪',t:'Both edges must be kept sharp — sharpen regularly with a flat file'},
        {i:'📏',t:'Various blade widths (6–12cm) — narrower for tight rows, wider for clear beds'},
        {i:'⚙',t:'Works best in light soils; less effective in wet clay where the blade clogs'},
      ],
      tips:'The stirrup hoe is the tool of choice for no-dig beds where the soil structure is light and open. It glides through the top 2cm precisely, cutting weed roots without disturbing the soil beneath.'
    },
        {
      id:'handfork', tier:'essential', icon:'🌿', name:'Hand Fork',
      tag:'Weeding', colour:'#6a8a4a',
      brands:[{name:'Burgon & Ball',model:'RHS Hand Fork'},{name:'Fiskars',model:'Solid Hand Fork'},{name:'Wolf-Garten',model:'Comfort Hand Fork'}],
      price:'£10 – £30',
      desc:'The hand fork loosens soil around plants, lifts seedlings with roots intact, and removes deep-rooted weeds like dandelions without disturbing neighbouring plants.',
      whyNeed:'Essential for thinning seedlings, pricking out, lifting established plants for division, and working between closely spaced crops where a full hoe cannot reach. Used alongside the trowel on almost every planting session.',
      features:[
        {i:'🔩',t:'Forged stainless steel — 3 or 4 tines, flat or twisted'},
        {i:'📐',t:'Narrow-tined version for working in tight spaces between seedlings'},
        {i:'🎨',t:'Match handle colour to your trowel for easy identification when left in beds'},
        {i:'⚖',t:'Lightweight — should feel balanced in the hand without tiring the wrist'},
      ],
      tips:'A hand fork is the correct tool for removing dandelions and dock — lever vertically down alongside the taproot, then ease the whole root out intact. Breaking the taproot means regrowth.'
    },
        {
      id:'hori', tier:'desirable', icon:'🔪', name:'Soil Knife / Hori-Hori',
      tag:'Planting', colour:'#6a6a7a',
      brands:[{name:'Burgon & Ball',model:'Japanese Soil Knife'},{name:'Wolf-Garten',model:'Multi-Purpose Knife'},{name:'Implementations',model:'Copper Soil Knife'}],
      price:'£18 – £50',
      desc:'The Japanese gardening knife (hori-hori) is the most versatile single-handed tool available. Cuts, digs, divides, transplants, and weeds — a serious gardener\'s pocket knife.',
      whyNeed:'Once you own a hori-hori it becomes the tool you reach for first. The serrated edge cuts roots and twine; the pointed tip digs out deep-rooted weeds; the flat face transplants seedlings. Essential in a small garden where tool storage is limited.',
      features:[
        {i:'🔪',t:'One side serrated (cutting), one side smooth (digging and transplanting)'},
        {i:'📏',t:'Depth markings etched into the blade'},
        {i:'🛡',t:'Stainless steel blade — avoid carbon steel which rusts if left in soil'},
        {i:'🔒',t:'Leather or canvas sheath — always carry with a sheath; the blade is razor sharp'},
      ],
      tips:'The hori-hori is specifically excellent for removing dandelions — drive in beside the taproot, rotate, and lift in one motion. Much faster than a hand fork. Clean with a light oiling after each use.'
    },
    {
      id:'swoehoe', tier:'desirable', icon:'〰️', name:'Swoe / Swan-Neck Hoe',
      tag:'Weeding', colour:'#8a6a3a',
      brands:[{name:'Spear & Jackson',model:'Kew Gardens Swoe (stainless)'},{name:'Burgon & Ball',model:'RHS Stainless Swoe'},{name:'Wolf-Garten',model:'Elite Swoe Hoe'}],
      price:'£22 – £55',
      desc:'The swoe (or swan-neck hoe) has a curved neck that angles the triangular blade flat to the soil surface. It cuts weeds on the push stroke and slides under weed roots with exceptional precision — ideal for close work around plants.',
      whyNeed:'The swoe excels where a Dutch hoe is too aggressive — close around emerging seedlings, between tightly spaced onion rows, and around strawberry plants. The angled neck means the blade remains flat even with a natural upright walking posture.',
      features:[
        {i:'📐',t:'Swan-neck (angled) head positions the triangular blade flat on the soil — cuts without digging in'},
        {i:'🔪',t:'Triangular blade cuts on all three edges — push forward, pull back, or slice sideways'},
        {i:'📏',t:'Long handle for upright working — critical for sustained hoeing without back strain'},
        {i:'🔩',t:'Stainless steel blade — stays sharp longer and does not corrode in damp soil'},
      ],
      tips:'The swoe is the tool of choice for hoeing close around onions, shallots, and leeks where the Dutch hoe risks nicking bulbs. Work with a shallow sliding motion, keeping the blade just 1–2cm below the surface to slice weed roots without disturbing crop roots.'
    },
  ],
  maintenance: [
        {
      id:'wateringcan', tier:'essential', icon:'🪣', name:'Watering Can',
      tag:'Watering', colour:'#3a7a9a',
      brands:[{name:'Haws',model:'Traditional Metal Can (2L / 4.5L / 9L)'},{name:'Fiskars',model:'Functional Garden Watering Can'},{name:'Burgon & Ball',model:'RHS Watering Can'}],
      price:'£15 – £65',
      desc:'Essential for seedlings, transplants, and any plants too delicate for a hose. A long-spouted can delivers water precisely and gently via a fine rose — critical for newly sown seeds.',
      whyNeed:'A watering can with a fine rose is the only way to water seed trays and seedlings without washing the seeds away or flattening new growth. For most container and raised-bed watering it is faster and more precise than a hose.',
      features:[
        {i:'🌹',t:'Fine rose attachment — oval or round, producing a gentle shower rather than a stream'},
        {i:'📏',t:'9 litre for beds; 2–4.5 litre for greenhouse, seedlings, and difficult-access areas'},
        {i:'⚖',t:'Balance when full: long-spouted Haws cans are specifically designed for easy pour control'},
        {i:'🔩',t:'Galvanised or copper for longevity; quality plastic for lighter weight if carrying long distances'},
      ],
      tips:'Always hold the can so the rose points upward at the end of the spout — this delivers water in a downward arc rather than a stream. Haws cans are the gold standard; a good one will outlast you.'
    },
    // ── DESIRABLE ────────────────────────────────,
        {
      id:'hose', tier:'essential', icon:'💦', name:'Garden Hose & Connectors',
      tag:'Watering', colour:'#3a7a9a',
      brands:[{name:'Hozelock',model:'Super Tricoflex 19mm (best quality)'},{name:'Hozelock',model:'Compact Hose Reel + Fittings'},{name:'Gardena',model:'Premium Hose System'}],
      price:'£40 – £120',
      desc:'A quality hose with quick-connect fittings is the backbone of any watering system. Hozelock\'s British-made connectors are the universal standard — every accessory in the UK fits the same system.',
      whyNeed:'During a dry spell a watering can is inadequate for a vegetable plot. A hose connected to an outside tap, with a quality spray gun, allows you to water the entire plot in 20 minutes rather than two hours.',
      features:[
        {i:'🔧',t:'Hozelock click-fit connectors: universal, reliable, and available at every garden centre'},
        {i:'📏',t:'13mm hose for short runs; 19mm Tricoflex for long distances without pressure drop'},
        {i:'🎛',t:'Adjustable spray gun with 7+ patterns (jet, flat, shower, mist, soaker) covers all tasks'},
        {i:'🔄',t:'Wall-mounted or free-standing hose reel prevents kinking and UV damage'},
      ],
      tips:'Drain and roll the hose before the first frost — a hose left on the ground in freezing temperatures cracks at connectors. Store the spray gun inside in winter.'
    },
        {
      id:'dibber', tier:'desirable', icon:'📌', name:'Dibber',
      tag:'Planting', colour:'#5a8a5a',
      brands:[{name:'Burgon & Ball',model:'Jumbo Dibber / Classic Dibber'},{name:'Wolf-Garten',model:'Planting Dibber'},{name:'Implementations',model:'Copper Dibber'}],
      price:'£8 – £35',
      desc:'A pointed tool for making precise holes for transplanting seedlings, setting leek plants, and planting individual seeds at exact depths and spacings.',
      whyNeed:'When transplanting leeks, the traditional method is to drop the bare-root plant into a dibber hole and fill with water — not soil. A good dibber makes precise, repeatable holes and speeds up transplanting sessions significantly.',
      features:[
        {i:'📏',t:'Depth markings on the shaft — essential for planting at consistent depth across a row'},
        {i:'🔩',t:'Stainless, copper, or hardwood — all work; copper tip is said to deter some pests'},
        {i:'🎯',t:'T-bar top for pressing into firm soil without hurting the palm'},
        {i:'📐',t:'Available in large (leeks, brassicas) and small (seedlings, module plants) versions'},
      ],
      tips:'A dibber made from an old spade handle is perfectly functional. Cut at 30cm, round one end on a grinder, and burn depth markings in with a hot spike. Traditional tools often outlast bought alternatives.'
    },
        {
      id:'kneeler', tier:'desirable', icon:'🦵', name:'Garden Kneeler & Seat',
      tag:'Comfort', colour:'#7a8a9a',
      brands:[{name:'Burgon & Ball',model:'RHS Kneeler & Seat'},{name:'Spear & Jackson',model:'Reversible Kneeler'},{name:'Wolf-Garten',model:'Comfort Kneeler'}],
      price:'£20 – £50',
      desc:'A foam-padded kneeler that converts to a low seat. Protects knees on hard soil and gravel, and flips over to become a stable seat for low-level planting and weeding.',
      whyNeed:'Knee comfort is the limiting factor on how long most people can work close to the soil. A kneeler doubles your comfortable working time on seedling beds and paths. The seat function is equally useful when transplanting at ground level.',
      features:[
        {i:'🦵',t:'Thick EVA foam pad — minimum 5cm depth for adequate cushioning on gravel and concrete'},
        {i:'🔄',t:'Reversible to seat — fold-up legs lock upright as handles when kneeling, become legs when seated'},
        {i:'🏋',t:'Tested load capacity: most handle 130–160kg as a seat'},
        {i:'🌧',t:'Waterproof or water-resistant foam cover — mud wipes off'},
      ],
      tips:'Attach a small tool holder pocket to the frame using cable ties — keeps your trowel and hand fork immediately to hand when working close to the ground.'
    },
    // ── LOVE TO HAVE ─────────────────────────────,
        {
      id:'stringline', tier:'essential', icon:'📏', name:'String Line & Pegs',
      tag:'Marking Out', colour:'#7a6a5a',
      brands:[{name:'Burgon & Ball',model:'Garden Line & Reel'},{name:'Spear & Jackson',model:'Garden Line'},{name:'Wolf-Garten',model:'Multi-Change Marker'}],
      price:'£8 – £25',
      desc:'A taut string line is the fundamental tool for straight sowing rows, planting aligned transplants, and marking bed edges. Without one, rows wander and the plot loses its order.',
      whyNeed:'Used every time you sow in rows or plant transplants in a grid. A taut line transforms the accuracy of sowing and planting — making harvest and bed management significantly easier. One of the cheapest and most-used tools on the plot.',
      features:[
        {i:'🔧',t:'Reel and wind-up handle stores line neatly; avoids the tangle of a hand-wound ball'},
        {i:'📏',t:'20–30m length handles most plots; measurement markings on the line speed up spacing'},
        {i:'🔩',t:'Heavy metal pegs drive into hard ground without bending'},
        {i:'🎨',t:'Bright orange or yellow line is visible between plants and in long grass'},
      ],
      tips:'The handle of a long dibber or rake can substitute for a peg in soft soil. Drive in pegs at both ends, pull the line taut, then sow directly against it with the line held at the soil surface. Mark the variety and date on a label at each end.'
    },
    // ── DESIRABLE ────────────────────────────────,
        {
      id:'trugs', tier:'essential', name:'Trugs & Harvest Baskets',
      icon:'🧺', tag:'Harvesting', colour:'#8a7a5a',
      brands:[{name:'Burgon & Ball',model:'Sussex Trug (traditional)'},{name:'Haws',model:'Oval Trug'},{name:'Velcro',model:'(Noooo — any stout plastic trug)'}],
      price:'£8 – £45',
      desc:'A trug or basket collects harvested vegetables, carries tools around the plot, and transports weedings to the compost. Buy several in different sizes — the most-used item on the plot.',
      whyNeed:'You need somewhere to put things: just-pulled carrots, weeds for the compost, tools for the day\'s work. Trugs are lighter than buckets, more flexible than baskets, and last for years. Traditional Sussex trugs are handmade in East Sussex — a beautiful tool.',
      features:[
        {i:'⚖',t:'Lightweight flexible plastic trugs are the most practical for daily use — stack flat'},
        {i:'🌳',t:'Sussex-style wooden trugs are works of craft — ideal gift for a serious gardener'},
        {i:'📏',t:'Small (8L) for seedlings and hand tools; large (20–30L) for harvesting and weeding'},
        {i:'🎨',t:'Bright colours make them easy to find when left in beds'},
      ],
      tips:'Label trugs with their purpose: one for harvest (clean), one for weeds (compost-bound), one for tools. This takes 30 seconds and saves 10 minutes of sorting per session.'
    },
        {
      id:'netting', tier:'desirable', icon:'🕸️', name:'Plot Netting Set',
      tag:'Protection', colour:'#5a7a5a',
      brands:[{name:'Haxnicks',model:'Brassica Net Kit'},{name:'Gardman',model:'Fruit Cage Netting'},{name:'Enviromesh',model:'Butterfly & Pigeon Netting'}],
      price:'£20 – £80',
      desc:'A set of nets for different purposes: fine butterfly netting (7mm) for brassicas, soft fruit netting (19mm) for birds, and heavyweight bird netting for the whole plot perimeter.',
      whyNeed:'Netting is the permanent solution for cabbage white butterfly, pigeon damage, and fruit bird loss. Without netting, a brassica bed needs weekly inspection and spray treatment; with it, inspection only. The time saving over a season is significant.',
      features:[
        {i:'📐',t:'7mm mesh for butterflies; 19–25mm for birds; ultra-fine 0.8mm for flying insects'},
        {i:'🔧',t:'Net support hoops (wire or fibreglass) elevate netting above plants — essential to prevent butterflies laying through the mesh'},
        {i:'🌿',t:'Anti-UV treated netting lasts 5+ seasons; untreated breaks down in one season'},
        {i:'⚠',t:'Always check nets for holes before installation — a 20mm gap allows butterfly access'},
      ],
      tips:'A permanent brassica cage (1.8m hoops with fixed netting) pays for itself in the first season by eliminating the need for any pesticide intervention on brassicas. Budget for the permanent option over disposable fleece covers.'
    },
    // ── LOVE TO HAVE ─────────────────────────────,
        {
      id:'coppertools', tier:'lovetohave', icon:'✨', name:'Copper Tool Set',
      tag:'Premium', colour:'#c8901a',
      brands:[{name:'Implementations',model:'Copper Trowel, Fork & Dibber Set'},{name:'Burgon & Ball',model:'Copper Garden Tools'}],
      price:'£50 – £150',
      desc:'Solid copper tools are claimed to have biodynamic benefits and are proven to resist sticking in clay soil. Copper doesn\'t rust, needs no oiling, and develops a beautiful patina over decades of use.',
      whyNeed:'A luxury set for the serious gardener. Copper tools slide through soil more easily than steel — particularly noticeable in heavy clay. They require no maintenance other than the occasional wipe. A genuine lifetime investment that improves aesthetically with age.',
      features:[
        {i:'🔩',t:'Solid copper (not copper-coated) — will last generations with zero maintenance'},
        {i:'🔬',t:'Some biodynamic growers report reduced slug activity around copper tools in soil'},
        {i:'✨',t:'Develops rich patina over time — a working tool that is also beautiful'},
        {i:'🌍',t:'Copper is naturally antimicrobial — may reduce disease transmission between plants during pruning'},
      ],
      tips:'Copper tools are a genuine luxury that reward daily use. The set typically includes trowel, hand fork, and dibber. Buy from Implementations — the original quality copper garden tool manufacturer.'
    },
  ],
  power: [
        {
      id:'petrol-mower', tier:'essential', icon:'🏎️', name:'Petrol Rotary Mower',
      tag:'Lawn', colour:'#2a6a2a',
      brands:[{name:'Stihl',model:'RM 448 TC (self-propelled)'},{name:'Stihl',model:'RM 253 (push)'},{name:'Honda',model:'HRX 476 VYE'}],
      price:'£300 – £700',
      desc:'For plots larger than 250m², a petrol rotary mower is the reliable, powerful choice. Petrol gives unrestricted range, handles long wet grass that defeats electric models, and is cost-effective over 10+ years.',
      whyNeed:'A petrol mower earns its place on any plot with a substantial lawn, orchard, or path network. No cable management, no battery range anxiety, and full power for long wet spring grass. The Stihl RM448 TC is self-propelled — ideal on sloping plots.',
      features:[
        {i:'⛽',t:'Petrol (2-stroke or 4-stroke) — 4-stroke is quieter, more economical, and needs no oil mixing'},
        {i:'📐',t:'46–53cm cutting width covers most domestic lawns efficiently'},
        {i:'🔄',t:'Self-propelled rear-wheel drive for slopes; push models for flat plots'},
        {i:'🗑',t:'Rear bag, mulch, and side discharge options — mulching returns nutrients to lawn'},
      ],
      tips:'Never fill a petrol mower in the garage — always outside or with the door open. After the last cut of the year, run the tank dry before storing to prevent gum deposits in the carburettor.'
    },
        {
      id:'petrol-strimmer', tier:'essential', icon:'🔴', name:'Petrol Strimmer / Brushcutter',
      tag:'Trimming', colour:'#3a8a3a',
      brands:[{name:'Stihl',model:'FS 55 R (top seller)'},{name:'Stihl',model:'FS 310 (brushcutter)'},{name:'Honda',model:'UMK435UE'}],
      price:'£200 – £450',
      desc:'The essential companion to any mower — trims edges, banks, and awkward areas that a mower cannot reach. Petrol gives the power to cut through long grass, nettles, and bramble re-growth.',
      whyNeed:'No vegetable plot exists without edges, paths, and awkward corners. A petrol strimmer handles the margin between bed boards and paths, under fences, around fruit trees, and on steep banks where a mower is unsafe.',
      features:[
        {i:'⚙',t:'Loop handle (strimmer) vs D-handle (brushcutter) — D-handle with blade for heavy vegetation'},
        {i:'🔄',t:'Auto-feed or bump-feed line head; brushcutter version takes metal blade for heavy work'},
        {i:'📐',t:'Stihl straight-shaft models are longer-lasting and better-balanced than curved'},
        {i:'🎧',t:'Always wear ear protection and eye protection — rotating line throws debris'},
      ],
      tips:'The Stihl FS 55 R is the single most popular professional-grade strimmer in UK horticulture. It is genuinely repairable — parts are available worldwide. Change the cutting line before it breaks, not after.'
    },
    // ── DESIRABLE ────────────────────────────────,
        {
      id:'petrol-blower', tier:'desirable', icon:'🌬️', name:'Petrol Leaf Blower / Vacuum',
      tag:'Clearance', colour:'#6a7a3a',
      brands:[{name:'Stihl',model:'BG 56 C-E (blower)'},{name:'Stihl',model:'SH 56 CE (blower-vac)'},{name:'Honda',model:'HHB25E'}],
      price:'£180 – £350',
      desc:'Makes autumn clearance quick and efficient. A blower clears leaves from beds, paths, and lawns; the vacuum version collects and mulches them into leaf mould material in one pass.',
      whyNeed:'Autumn leaf clearing from between brassica rows, off strawberry beds, and from paths takes hours by hand. A blower-vac does it in minutes and the shredded leaves go directly into the leaf mould bin.',
      features:[
        {i:'💨',t:'Blower mode: 700–800m³/hr air flow moves wet leaves and debris efficiently'},
        {i:'♻',t:'Vacuum/mulch mode shreds collected leaves 12:1 — dramatically reduces leaf mould bin space'},
        {i:'⚙',t:'Anti-vibration system reduces fatigue on extended use'},
        {i:'🌿',t:'Avoid blowing directly onto seed beds — use low power setting or a deflector'},
      ],
      tips:'Never use a petrol blower in an enclosed space. Use around fruit tree bases in autumn to clear leaf debris that harbours overwintering fungal spores — a simple but effective disease management step.'
    },
    // ── LOVE TO HAVE ─────────────────────────────,
        {
      id:'battery-mower', tier:'desirable', icon:'⚡', name:'Battery Lawn Mower',
      tag:'Lawn', colour:'#3a7a3a',
      brands:[{name:'Stihl',model:'RMA 235 (34cm, AP battery)'},{name:'Stihl',model:'RMA 339 (40cm, self-propelled)'},{name:'Fiskars',model:'(not available — use Stihl / Honda)'}],
      price:'£250 – £500',
      desc:'For lawns up to 400m², a battery mower is quieter than petrol, maintenance-free, and equally effective in good conditions. Stihl\'s AP battery system integrates with all their other battery tools.',
      whyNeed:'The battery mower\'s key advantage is convenience — no petrol to store, no carburettor to clean in winter, quiet enough to use early in the morning. For plots with a modest lawn the battery mower is the modern sensible choice.',
      features:[
        {i:'🔋',t:'Stihl AP 300 battery (7.0Ah) gives 55–70 min runtime on a single charge for a 34cm mower'},
        {i:'⚙',t:'Brushless motor: more efficient and durable than brushed motor models'},
        {i:'🌱',t:'Mulching blade option returns nitrogen-rich clippings to the lawn'},
        {i:'📐',t:'34–42cm cutting width — adequate for most domestic plots'},
      ],
      tips:'Battery performance drops 15–20% in cold weather (below 10°C). For year-round reliability on a large lawn, a petrol mower remains the more dependable choice.'
    },
        {
      id:'battery-strimmer', tier:'desirable', icon:'⚡', name:'Battery Strimmer',
      tag:'Trimming', colour:'#3a8a4a',
      brands:[{name:'Stihl',model:'FSA 57 (compact)'},{name:'Stihl',model:'FSA 86 (full-size)'},{name:'Stihl',model:'FSA 130 R (brushcutter power)'}],
      price:'£120 – £350',
      desc:'A quiet, zero-maintenance alternative to petrol for light-to-medium trimming. Stihl\'s FSA range uses the same AP battery system as their mowers — one battery platform for all tools.',
      whyNeed:'For residential plots where early-morning quiet matters, or where fuel storage is inconvenient, the battery strimmer handles paths, edges, and borders efficiently. Stihl FSA 86 is professional-grade on a domestic budget.',
      features:[
        {i:'🔋',t:'AP 200/300 battery; FSA 57 compact runs ~40 min; FSA 86 full-size runs 50+ min'},
        {i:'🔇',t:'Dramatically quieter than petrol — 85dB vs 98dB'},
        {i:'⚖',t:'Lighter than petrol equivalent — reduces fatigue on extended trimming sessions'},
        {i:'⚙',t:'Auto-cut head for easy line replacement without disassembly'},
      ],
      tips:'Battery strimmers have lower torque for heavy vegetation than their petrol equivalents. For heavy stands of nettles or bramble re-growth, petrol remains the better choice. Battery excels at regular light trimming maintenance.'
    },
        {
      id:'battery-drill', tier:'essential', icon:'🔩', name:'Cordless Drill / Driver',
      tag:'Construction', colour:'#3a4a8a',
      brands:[{name:'DeWalt',model:'DCD777 (18V brushless)'},{name:'Milwaukee',model:'M18 FUEL'},{name:'Makita',model:'DDF484'}],
      price:'£80 – £180',
      desc:'Not strictly a garden tool, but essential for building and maintaining raised beds, fencing, cold frames, and structures. An 18V brushless drill drives screws all day on a single charge.',
      whyNeed:'Every raised bed you build, every fence post you fix, every greenhouse shelf you install needs a drill driver. If you are managing your own structures — and most plot holders are — a quality cordless drill is used every single visit during the building season.',
      features:[
        {i:'⚡',t:'18V with brushless motor — significantly longer battery life and runtime than brushed'},
        {i:'🔋',t:'Ensure it uses the same battery platform as your other cordless tools (Stihl AP, DeWalt 18V, Makita LXT)'},
        {i:'💪',t:'60+ Nm torque for driving structural screws through hardwood; high-speed mode for drilling'},
        {i:'🔧',t:'Carry two batteries — one in the tool, one on charge'},
      ],
      tips:'Buy into a battery platform and stay with it. All Stihl AP-system battery tools share one battery system. If you already own battery Stihl garden tools, add Stihl\'s power tools to the same AP platform.'
    },
    // ── DESIRABLE ────────────────────────────────,
  ],
  other: [
        {
      id:'soilblocker', tier:'lovetohave', icon:'🟫', name:'Soil Blocker',
      tag:'Propagation', colour:'#8a6040',
      brands:[{name:'Ladbrooke',model:'Mini 4 (20mm) & Micro 20 (20 block)'},{name:'Ladbrooke',model:'Block 4 (38mm)'},{name:'Johnny\'s Seeds',model:'66-Cell Blocker'}],
      price:'£30 – £70',
      desc:'A tool that compresses compost into free-standing blocks that replace plastic modules. Blocks \'air prune\' roots naturally — producing superior transplants with dramatically less plastic waste.',
      whyNeed:'Air-pruned roots (roots that stop at the air gap between blocks) produce compact, non-circling root systems that establish in 50% less time after transplanting compared with pot-grown plants. No pots to wash, no plastic waste, better plants.',
      features:[
        {i:'📦',t:'Makes 4–6 blocks per press; micro version makes 20 small blocks for pricking out'},
        {i:'🌱',t:'38mm block suits most transplants; 20mm micro for initial seed germination'},
        {i:'💧',t:'Use specific blocking compost (higher clay content) — normal multipurpose breaks up'},
        {i:'⚙',t:'Spring-loaded ejector releases blocks cleanly without distortion'},
      ],
      tips:'Soak the blocking compost the night before to achieve the correct moisture level — it should hold a firm shape when squeezed but not drip. Too wet and blocks collapse; too dry and they crumble.'
    },
        {
      id:'greenhouse', tier:'lovetohave', icon:'🏠', name:'Greenhouse',
      tag:'Growing Space', colour:'#4a8a4a',
      brands:[{name:'Halls',model:'Magnum 8×6 (aluminium)'},{name:'Juliana',model:'Compact 8×12 (premium)'},{name:'Elite',model:'Thyme 6×4 (starter)'}],
      price:'£400 – £5,000',
      desc:'A greenhouse transforms what you can grow — allowing tomatoes, cucumbers, aubergines, and chillies to thrive in the UK climate without any luck. The most significant upgrade to any plot.',
      whyNeed:'A 6×8ft greenhouse allows you to: start seeds 6 weeks earlier, grow heat-loving crops that fail outdoors in most of the UK, overwinter tender perennials, and have a dry workspace in all weathers. It is the single investment that most transforms a productive plot.',
      features:[
        {i:'🔩',t:'Aluminium frame is maintenance-free; cedar is beautiful but requires annual oiling'},
        {i:'🪟',t:'Twin-wall polycarbonate is safer, better-insulating, and lighter than glass; glass is traditional and cleaner'},
        {i:'🌡',t:'Automated roof ventilation opens when temperature reaches 17°C — essential to prevent overheating'},
        {i:'📐',t:'Minimum 6×8ft for useful growing space; 8×10 is the practical minimum for tomatoes, propagating, and storage together'},
      ],
      tips:'Site the greenhouse in full sun with the ridge running east-west. Avoid trees to the south. The most underestimated cost is the base — always lay a proper concrete or slab base, and add guttering to capture rainwater for ericaceous plants.'
    },
        {
      id:'coldframe', tier:'desirable', icon:'🏕️', name:'Cold Frame',
      tag:'Propagation', colour:'#4a7a8a',
      brands:[{name:'Juliana',model:'Top Cold Frame (aluminium)'},{name:'Halls',model:'Cold Frame 130x64cm'},{name:'Burgon & Ball',model:'RHS Pop-Up Cold Frame'}],
      price:'£40 – £200',
      desc:'A cold frame extends the season at both ends — hardening off seedlings in spring and protecting tender crops and overwintering vegetables through autumn and early winter.',
      whyNeed:'The cold frame bridges the gap between the heated propagator and the open ground. Tomato and courgette transplants raised indoors in March must be acclimatised (hardened off) over 10–14 days before planting out — a cold frame makes this safe and systematic.',
      features:[
        {i:'🌡',t:'Lift-off or hinged lid for ventilation — prevent overheating in April sun (can exceed 50°C inside)'},
        {i:'🔩',t:'Aluminium frame is lightweight, rust-proof, and lasts decades'},
        {i:'🪟',t:'Twin-wall polycarbonate lid insulates better than glass and doesn\'t shatter'},
        {i:'📐',t:'South-facing orientation maximises solar gain in early spring'},
      ],
      tips:'On cold nights in early spring, drape a folded double duvet or horticultural fleece over the frame — this can hold temperatures 8–10°C above ambient and protect tender seedlings from a sharp frost.'
    },
        {
      id:'propagator', tier:'desirable', icon:'🌡️', name:'Heated Propagator',
      tag:'Propagation', colour:'#8a4a2a',
      brands:[{name:'Vitopod',model:'(thermostatically controlled — best)'},{name:'Parasene',model:'Heated Propagator 60W'},{name:'Garland',model:'Wide Propagator 36W'}],
      price:'£30 – £150',
      desc:'A heated propagator with a thermostat maintains 18–25°C on the germination tray — essential for starting tomatoes, chillies, aubergines, and cucumbers 8–10 weeks before the last frost.',
      whyNeed:'Without bottom heat, chilli seeds can sit for 6 weeks in a cold windowsill and fail to germinate. A heated propagator at 22°C germinates them in 10–14 days consistently. The Vitopod is thermostatically controlled and eliminates guesswork entirely.',
      features:[
        {i:'🌡',t:'Thermostatically controlled (Vitopod) vs fixed temperature — thermostat is significantly better'},
        {i:'📐',t:'Full-size (60×40cm) holds 4 standard seed trays; mini (37×19cm) for windowsills'},
        {i:'💡',t:'Bottom heat only (soil warming cable) — avoid heated lids which scorch seedlings'},
        {i:'⚡',t:'15–60W depending on size — running cost approximately 2–8p per day'},
      ],
      tips:'Once seeds have germinated, remove from the propagator immediately — the seedlings need light and cooler temperatures to grow strongly. Leaving germinated seedlings in a warm propagator produces tall, leggy, weak plants.'
    },
        {
      id:'cloche', tier:'desirable', icon:'🫙', name:'Garden Cloches & Fleece',
      tag:'Protection', colour:'#7a8a9a',
      brands:[{name:'Haxnicks',model:'Easy Poly Tunnel Cloche'},{name:'Enviromesh',model:'Fine Insect Mesh (1.35m wide)'},{name:'Agralan',model:'Envirofleece 30g/m²'}],
      price:'£15 – £60',
      desc:'Cloches and horticultural fleece extend the season and protect crops from frost, insects, wind, and birds. Fleece provides approximately 3–5°C of frost protection; insect mesh excludes all flying pests without chemicals.',
      whyNeed:'A 30g horticultural fleece draped over newly planted brassicas prevents butterfly egg-laying with zero effort. The same fleece protects strawberries from late frosts in April. One roll of fleece does more work than many £100 tools.',
      features:[
        {i:'🌡',t:'Fleece weight: 17g/m² (frost only); 30g/m² (frost + wind + insects); 50g/m² (heavy frost)'},
        {i:'🕸',t:'Fine insect mesh (0.8mm) excludes all flying insects while allowing rain and full light through'},
        {i:'🌬',t:'Secure edges with wire pegs, bricks, or specific edge anchors — loose edges are useless'},
        {i:'♻',t:'Store dry after each use — quality fleece lasts 3–4 seasons if handled carefully'},
      ],
      tips:'Buy fleece in bulk from agricultural suppliers (25m rolls) rather than 3m packs at garden centres — typically 50–60% cheaper per metre. Store on cardboard tubes to prevent crushing and tangling.'
    },
        {
      id:'irrigation', tier:'lovetohave', icon:'💦', name:'Drip Irrigation System',
      tag:'Watering', colour:'#3a6a9a',
      brands:[{name:'Hozelock',model:'Auto Watering Starter Kit'},{name:'Gardena',model:'Micro-Drip System'},{name:'Claber',model:'Colibri Controller'}],
      price:'£60 – £200',
      desc:'A timer-controlled drip irrigation system waters the plot consistently while you are away, prevents foliar diseases from overhead watering, and uses 30–50% less water than a hose.',
      whyNeed:'Even a basic timer and drip line system prevents crop failure during holidays and dry spells. Consistent soil moisture improves yield significantly — particularly for tomatoes (prevents blossom end rot) and courgettes (prevents fruit drop).',
      features:[
        {i:'⏱',t:'Programmable timer: set watering frequency and duration from 1 minute to 4 hours'},
        {i:'💧',t:'Drip nozzles at each plant deliver water to the root zone only — no wasted water on paths'},
        {i:'🔧',t:'Hozelock system is the easiest to install and expand — all click-fit connections'},
        {i:'🌿',t:'Use soaker hose on vegetable rows; individual drippers for tomatoes and fruit'},
      ],
      tips:'Set the timer to water at dawn rather than evening — foliage that stays wet overnight is far more susceptible to fungal disease. Adjust the timer frequency after rain (most have a rain sensor socket) or install a rain sensor bypass.'
    },
        {
      id:'soiltest', tier:'lovetohave', icon:'🔬', name:'Professional Soil Test Kit',
      tag:'Testing', colour:'#8a5a2a',
      brands:[{name:'Solugen',model:'Nutrient Test Kit (NPK + pH)'},{name:'Veritas',model:'Professional Soil Test'},{name:'RHS',model:'Send-away soil analysis service'}],
      price:'£20 – £80',
      desc:'A comprehensive soil test reveals pH, nitrogen, phosphorus, potassium, and organic matter levels — the complete picture needed to fertilise precisely rather than guess.',
      whyNeed:'The standard pH meter tells you one number. A full NPK test tells you which nutrients are limiting growth on your specific plot. New plot holders, those seeing poor yields despite good practice, or anyone growing on converted land should test before fertilising.',
      features:[
        {i:'🔬',t:'Measures pH, N (nitrogen), P (phosphorus), K (potassium) — the four critical values'},
        {i:'📊',t:'RHS send-away service also provides organic matter %, texture, and detailed recommendations'},
        {i:'📋',t:'Results guide exact fertiliser type and application rate — no guessing or over-application'},
        {i:'📅',t:'Best tested in autumn before any amendments are added; retest in spring to confirm result'},
      ],
      tips:'The RHS soil analysis service (around £40) provides the most actionable report for a UK gardener — includes lime requirement, fertiliser recommendations, and a commentary on the result. Worth doing once on any new plot.'
    },
        {
      id:'wheelbarrow', tier:'essential', icon:'🚜', name:'Wheelbarrow',
      tag:'Carrying', colour:'#6a5a3a',
      brands:[{name:'Haemmerlin',model:'Cargo 110L (ball wheel)'},{name:'Spear & Jackson',model:'Premier Wheelbarrow 100L'},{name:'Gorilla',model:'GT6 Cart (6 cu ft)'}],
      price:'£60 – £180',
      desc:'The workhorse of any plot. Moves compost, manure, harvested vegetables, timber, and soil across the plot without breaking your back. Buy once, buy well — a cheap barrow develops wobble and a flat wheel within two seasons.',
      whyNeed:'Moving bulk materials — compost from the heap to beds, harvest from the far end of the plot, gravel for paths — requires a barrow. It is also the most-borrowed tool between plot holders, so keep yours easily identifiable.',
      features:[
        {i:'🔵',t:'Ball/pneumatic wheel vs solid wheel — pneumatic handles rough ground better but punctures; ball wheel is compromise'},
        {i:'🏋',t:'100–120L capacity suits most domestic plots; 85L for tight paths and narrow gates'},
        {i:'🔩',t:'Welded steel tray with galvanised finish lasts 20+ years; plastic trays crack and distort'},
        {i:'📏',t:'Check the load point over the wheel — a well-balanced barrow takes the load on the wheel not your back'},
      ],
      tips:'Haemmerlin are the quality benchmark for domestic barrows. The ball-wheel version handles rough allotment surfaces far better than a single narrow wheel. A puncture kit is a worthwhile addition to the shed.'
    },
        {
      id:'stepladder', tier:'essential', icon:'🪜', name:'Step Ladder',
      tag:'Access', colour:'#4a6a8a',
      brands:[{name:'Youngman',model:'3-tread aluminium step ladder'},{name:'Hailo',model:'K60 3-step'},{name:'Werner',model:'3-step aluminium stepladder'}],
      price:'£25 – £70',
      desc:'An essential for any garden with fruit trees, tall structures, or a greenhouse — safe, stable access for pruning, training, harvesting, and maintenance tasks at height.',
      whyNeed:'Fan-trained fruit trees, espaliers, and tall cordon apples quickly grow beyond comfortable reach. A step ladder is essential for summer pruning, tying in, and harvesting the upper tiers. Also invaluable for guttering checks, polytunnel maintenance, and cleaning greenhouse glass.',
      features:[
        {i:'🔒',t:'Platform top with safety rail — far more stable than a standard rung ladder for garden use'},
        {i:'⚖️',t:'Aluminium models are lightweight (4–6kg) but rated to 150kg — easy to carry around the plot'},
        {i:'🌧️',t:'Look for non-slip rubber feet — grass and wet paving can be treacherous'},
        {i:'📏',t:'3-tread gives standing height of around 60cm — sufficient for most pruning work up to 3m'},
      ],
      tips:'A 3-tread aluminium step ladder is the most useful general-purpose height for a kitchen garden. For taller fruit trees (fan-trained peaches, established espaliers), consider a 5-tread. Always open fully and ensure all four feet are flat on the ground before climbing.'
    },
        {
      id:'ladder', tier:'desirable', icon:'🪜', name:'Extending Ladder',
      tag:'Access', colour:'#5a7a9a',
      brands:[{name:'Youngman',model:'Trade 200 aluminium extending ladder'},{name:'Werner',model:'D-Rung extension ladder'},{name:'Lyte',model:'BS EN 131 aluminium extension'}],
      price:'£60 – £180',
      desc:'An extending ladder gives safe access to the tops of tall fruit trees, greenhouse roofs, boundary walls, and any structure beyond the reach of a step ladder — a must for anyone managing mature trees or large structures.',
      whyNeed:'Mature apple, pear, or cherry trees can reach 4–5m and above. Fan-trained wall fruit often extends the full height of a two-storey wall. A quality extending ladder is the safe, practical answer — and doubles for all household maintenance tasks.',
      features:[
        {i:'📏',t:'4m extending model reaches a working height of around 5.5m — suits most domestic fruit trees'},
        {i:'🔒',t:'Look for EN 131 certification (professional grade) and double-sided rubber feet'},
        {i:'⚖️',t:'Aluminium extending ladders 3–5m weigh 7–11kg — manageable for one person to carry'},
        {i:'🌿',t:'Store horizontally on wall brackets in a shed or garage — never lean upright against a wall long-term'},
      ],
      tips:'Always lean an extending ladder at the correct 75° angle (1 unit out for every 4 units up). Never overreach — the rule is keep your belt buckle between the stiles. For regular tree pruning, a ladder-stay fitted to the top spreads the weight across branches without damaging bark.'
    },
  ],
};

// ── RENDER TOOLS GUIDE ──────────────────────────────────────────────────────

function renderToolsGuide() {
  const tabs = document.getElementById('toolsTabs');
  if (!tabs) return;
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('[data-tools-cat]');
    if (!btn) return;
    document.querySelectorAll('#toolsTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    toolsShowCat(btn.dataset.toolsCat, 'all');
  });
  toolsShowCat('digging', 'all');
}

const TIER_LABEL = { essential:'✅ Essential', desirable:'⭐ Desirable', lovetohave:'💜 Love to Have' };

// Map each tool id → Wikipedia article title (merged from both maps)
function getToolArticle(id) {
  return TOOL_WIKI_ARTICLE_OVERRIDES[id] || TOOL_WIKI_TITLES[id] || null;
}

// Load photos for a list of tool objects that have no photo yet, then re-render
async function lazyLoadToolPhotos(tools, cat, tier) {
  const missing = tools.filter(t => !TOOL_WIKI_PHOTOS[t.id]);
  if (!missing.length) return;

  await Promise.allSettled(missing.map(async t => {
    const article = getToolArticle(t.id);
    if (!article) return;
    try {
      const slug = encodeURIComponent(article.replace(/ /g,'_'));
      const resp = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
        { headers: { Accept: 'application/json' } }
      );
      if (!resp.ok) return;
      const data = await resp.json();
      const src = data.thumbnail?.source || data.originalimage?.source;
      if (src) TOOL_WIKI_PHOTOS[t.id] = src;
    } catch(e) {}
  }));

  // Re-render now photos are loaded — but only if this tab is still active
  const activeBtn = document.querySelector('#toolsTabs .ptab.active');
  if (activeBtn && activeBtn.dataset.toolsCat === cat) {
    toolsShowCat(cat, tier);
  }
}

function toolsShowCat(cat, tier) {
  const cards  = document.getElementById('toolsCards');
  const detail = document.getElementById('toolsDetail');
  if (detail) detail.style.display = 'none';
  if (!cards) return;
  cards.style.display = 'grid';
  const all = TOOLS_DATA[cat] || [];
  const list = (tier === 'all') ? all : all.filter(t => t.tier === tier);
  cards.innerHTML = list.map(t => {
    const photo = TOOL_WIKI_PHOTOS[t.id];
    const icon  = t.icon;
    const photoHtml = photo
      ? `<img src="${photo}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.parentElement.innerHTML='<span style=font-size:3.5rem>' + '${icon}' + '</span>'">`
      : `<span style="font-size:3.5rem">${icon}</span>`;
    return `
    <div class="pcard" role="button" tabindex="0" data-tool-id="${t.id}"
         onclick="toolsOpenDetail('${cat}','${t.id}')"
         onkeydown="if(event.key==='Enter'||event.key===' ')toolsOpenDetail('${cat}','${t.id}')">
      <div class="pcard-photo-wrap" style="background:linear-gradient(135deg,${t.colour}cc,${t.colour}66);display:flex;align-items:center;justify-content:center;font-size:3.5rem;overflow:hidden">${photoHtml}</div>
      <div class="pcard-tag">${t.tag}</div>
      <div class="pcard-name">${t.name}</div>
      <div class="pcard-desc">${t.desc.substring(0,88)}…</div>
      <div class="pcard-meta" style="margin-top:0.4rem">
        <span>💰 ${t.price}</span>
      </div>

    </div>`;
  }).join('');

  // After rendering: lazy-load photos for any tools missing an image
  // This fires on every tab click ensuring photos always appear
  lazyLoadToolPhotos(list, cat, tier);
}

function toolsOpenDetail(cat, id) {
  const cards  = document.getElementById('toolsCards');
  const detail = document.getElementById('toolsDetail');
  const inner  = document.getElementById('toolsDetailInner');
  if (!detail || !inner) return;
  const t = (TOOLS_DATA[cat] || []).find(x => x.id === id);
  if (!t) return;
  cards.style.display  = 'none';
  detail.style.display = 'block';

  let sN = 0; const hn = () => String(++sN).padStart(2,'0');
  const brandChips = t.brands.map(b => `<span class="tools-brand-chip">🏷 ${b.name} — ${b.model}</span>`).join('');
  const featureRows = t.features.map(f => `<div class="tools-feature-item"><span class="tfi">${f.i}</span><span>${f.t}</span></div>`).join('');

  inner.innerHTML = `
    <div class="detail-sidebar">
      <div style="width:100%;height:200px;border-radius:var(--radius-md);overflow:hidden;margin-bottom:1.5rem;
                  background:linear-gradient(135deg,${t.colour}cc,${t.colour}55);
                  display:flex;align-items:center;justify-content:center;font-size:5.5rem">
        ${t.icon}
      </div>
      <div class="detail-tag">${t.tag}</div>
      <h2 class="detail-title">${t.name}</h2>

      <div class="detail-stats">
        <div class="dstat dstat--sow"><span class="dstat-label">💰 Price</span><span class="dstat-val">${t.price}</span></div>
        <div class="dstat"><span class="dstat-label">Category</span><span class="dstat-val">${t.tag}</span></div>
        <div class="dstat"><span class="dstat-label">Priority</span><span class="dstat-val">${TIER_LABEL[t.tier].replace(/^.+ /,'')}</span></div>
      </div>
    </div>
    <div class="detail-body">
      <h3>${hn()} — About</h3>
      <p>${t.desc}</p>

      <h3>${hn()} — Why You Need It</h3>
      <p>${t.whyNeed}</p>

      <h3>${hn()} — What to Look For When Buying</h3>
      <div class="tools-feature-list">${featureRows}</div>

      <h3>${hn()} — Recommended Brands &amp; Models</h3>
      <div class="tools-brand-row">${brandChips}</div>

      <h3>${hn()} — Pro Tip</h3>
      <div class="soil-ph-tip">
        <div class="soil-ph-tip-label">💡 Grower's Tip</div>
        <p>${t.tips}</p>
      </div>
    </div>`;

  document.getElementById('tools').scrollIntoView({ behavior:'smooth', block:'start' });
}

function toolsBack() {
  const cards  = document.getElementById('toolsCards');
  const detail = document.getElementById('toolsDetail');
  if (cards)  cards.style.display  = 'grid';
  if (detail) detail.style.display = 'none';
}

const PEST_WIKI = {
  'cabbage-moth':    'Mamestra_brassicae',
  'vine-weevil':     'Otiorhynchus_sulcatus',
  'chafer-grub':     'Phyllopertha_horticola',
  'mealybug':        'Mealybug',
  'lily-beetle':     'Lilioceris_lilii',
  'spider-mite':     'Tetranychus_urticae',
  'leafhopper':      'Leafhopper',
  'leaf-miner':      'Leaf_miner',
  'scale-insect':    'Scale_insect',
  'tortrix-moth':    'Tortrix_viridana',
  'woolly-aphid':    'Eriosoma_lanigerum',
  'earwig':          'Earwig',
  'box-caterpillar': 'Cydalima_perspectalis',
  'slug-snail':      'Gastropoda',
  'cabbage-white':   'Pieris_brassicae',
  'aphid':           'Aphid',
  'carrot-fly':      'Psila_rosae',
  'blight':          'Phytophthora_infestans',
  'badger':          'European_badger',
  'fox':             'Red_fox',
  'rabbit':          'European_rabbit',
  'mole':            'European_mole',
  'rat':             'Brown_rat',
  'mouse':           'House_mouse',
  'pigeon':          'Wood_pigeon',
};

const PEST_PHOTOS = {};

async function fetchPestPhotos() {
  const ids = Object.keys(PEST_WIKI);
  try {
    const titles = ids.map(id => PEST_WIKI[id]);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=pageimages&format=json&pithumbsize=600&origin=*&redirects=1`;
    const resp = await fetch(url);
    const data = await resp.json();
    const chain = {};
    for (const t of titles) chain[t.replace(/_/g,' ').toLowerCase()] = t.replace(/_/g,' ').toLowerCase();
    for (const n of (data.query.normalized || [])) {
      chain[n.from.replace(/_/g,' ').toLowerCase()] = n.to.toLowerCase();
      for (const k in chain) if (chain[k] === n.from.replace(/_/g,' ').toLowerCase()) chain[k] = n.to.toLowerCase();
    }
    for (const r of (data.query.redirects || [])) {
      chain[r.from.toLowerCase()] = r.to.toLowerCase();
      for (const k in chain) if (chain[k] === r.from.toLowerCase()) chain[k] = r.to.toLowerCase();
    }
    const finalToId = {};
    for (const id of ids) {
      const orig = PEST_WIKI[id].replace(/_/g,' ').toLowerCase();
      finalToId[chain[orig] || orig] = id;
    }
    for (const page of Object.values(data.query.pages)) {
      if (!page.thumbnail) continue;
      const matchId = finalToId[page.title.toLowerCase()];
      if (matchId) PEST_PHOTOS[matchId] = page.thumbnail.source;
    }
    // Inject photos into any open pest detail
    injectPestDetailPhoto();
    // Refresh card images if cards are visible
    const cards = document.getElementById('pestCards');
    if (cards && cards.style.display !== 'none') {
      cards.querySelectorAll('[data-pest-id]').forEach(card => {
        const pid = card.dataset.pestId;
        const wrap = card.querySelector('.pcard-photo-wrap');
        if (wrap && PEST_PHOTOS[pid]) {
          const img = wrap.querySelector('img');
          if (!img) wrap.innerHTML = `<img class="pcard-photo" src="${PEST_PHOTOS[pid]}" alt="" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()">`;
        }
      });
    }
  } catch(e) {}
}

function injectPestDetailPhoto() {
  const detail = document.getElementById('pestDetail');
  if (!detail || detail.style.display === 'none') return;
  const wrap = detail.querySelector('.detail-photo-wrap');
  if (!wrap || wrap.querySelector('img')) return;
  const pid = detail.dataset.pestId;
  if (pid && PEST_PHOTOS[pid]) {
    const fb = wrap.querySelector('.detail-photo-fallback');
    const img = document.createElement('img');
    img.className = 'detail-photo';
    img.src = PEST_PHOTOS[pid];
    img.alt = '';
    img.onerror = function(){ this.style.display='none'; if(fb) fb.style.display='block'; };
    if (fb) { wrap.insertBefore(img, fb); fb.style.display = 'none'; }
    else wrap.prepend(img);
  }
}

const PEST_DATA = {
  insects: [
    {
      id: 'cabbage-moth',
      icon: '🦋',
      name: 'Cabbage Moth Caterpillar',
      tag: 'Brassica Pest',
      colour: '#5a7a3a',
      desc: 'The caterpillars of the cabbage moth (Mamestra brassicae) bore directly into brassica hearts, causing internal damage that is invisible until the plant is ruined. Unlike cabbage white caterpillars, these feed inside heads rather than on outer leaves.',
      id_title: 'How to Identify',
      id_text: 'Dull grey-brown moths (35–45mm wingspan) fly at night May–September. Eggs laid in neat rows on the underside of outer leaves. Caterpillars are green at first, turning brown and reaching 40mm. The key sign is frass (dark droppings) in cabbage hearts — the damage is done by the time you see it.',
      symptoms: [
        { icon: '🫀', text: 'Wilting or collapse of the central growing point of cabbages and Brussels sprouts' },
        { icon: '💩', text: 'Dark green or brown frass deep inside hearts or between leaves' },
        { icon: '🕳', text: 'Irregular tunnels bored into hearts — plants appear healthy from outside' },
        { icon: '🦋', text: 'Small pale eggs in neat rows on the underside of outer leaves in summer' },
      ],
      controls: {
        organic:    { title: 'Bacillus thuringiensis (Bt)', text: 'Apply Bt-based biological insecticide (e.g. Dipel) as a spray to young caterpillars before they bore inside. Bt is a naturally occurring soil bacterium that kills caterpillars specifically — harmless to all other wildlife.' },
        passive:    { title: 'Encourage Natural Predators', text: 'Ground beetles, parasitic wasps, and birds predate eggs and young caterpillars. Avoid disturbing soil around brassica beds. Plant umbellifers (dill, fennel) nearby to host parasitic wasps.' },
        mechanical: { title: 'Fine Mesh Netting', text: 'Cover all brassicas with 0.8mm insect-proof mesh from planting until harvest. This excludes adult moths completely. Check plants weekly and remove any caterpillars by hand if found.' },
        chemical:   { title: 'Pyrethrin or Lambda-cyhalothrin', text: 'Spray with pyrethrin-based product (organic-approved) or lambda-cyhalothrin (synthetic pyrethroid) at first sign of egg masses. Timing is critical — once caterpillars are inside the heart, contact sprays cannot reach them. Always follow label instructions.' },
      }
    },
    {
      id: 'vine-weevil',
      icon: '🪲',
      name: 'Vine Weevil',
      tag: 'Container Killer',
      colour: '#4a3a28',
      desc: 'Vine weevil (Otiorhynchus sulcatus) is the most destructive container plant pest in the UK. The adult notches leaves but the real devastation is caused by white grubs in the compost — eating roots and killing plants overnight with no warning.',
      id_title: 'How to Identify',
      id_text: 'Adults are dull black beetles (9mm) with a characteristic slow, waddling gait. They cannot fly and hide under pots and debris. Grubs are creamy-white, C-shaped, 8–10mm with a brown head — found in compost around roots of affected plants.',
      symptoms: [
        { icon: '🌿', text: 'Irregular, rounded notches cut from leaf margins — the work of adult beetles feeding at night' },
        { icon: '💀', text: 'Plant suddenly wilts and dies despite being well-watered — roots have been eaten below compost surface' },
        { icon: '🪱', text: 'White C-shaped grubs visible in compost when knocked from pot — often 10–20 grubs per plant' },
        { icon: '🍓', text: 'Particularly devastating to strawberries, heuchera, hostas, and cyclamen in containers' },
      ],
      controls: {
        organic:    { title: 'Steinernema kraussei Nematodes', text: 'Apply microscopic nematodes in August–October when grubs are young. Mix into water and drench compost to 10°C minimum soil temperature. Available from garden centres as a chilled pack. Single most effective control available — kills grubs within 1–2 weeks.' },
        passive:    { title: 'Physical Barriers and Trapping', text: 'Place pot feet to reduce hiding places under containers. Inspect pot bases regularly. Lay damp hessian or cardboard near plants at night — adults congregate beneath it and can be collected at dawn.' },
        mechanical: { title: 'Hand-Picking and Grit', text: 'Search around plants after dark with a torch — adults feed at night and are easy to spot. Top-dress containers with sharp horticultural grit to deter egg-laying in compost surface.' },
        chemical:   { title: 'Imidacloprid Compost Drench', text: 'Vine weevil killer containing imidacloprid (e.g. Provado Vine Weevil Killer) drenched into compost in spring kills grubs systemically. Note: neonicotinoids — avoid use on flowering plants or where bees can access treated compost water run-off.' },
      }
    },
    {
      id: 'chafer-grub',
      icon: '🪱',
      name: 'Chafer Grub',
      tag: 'Root Feeder',
      colour: '#8a7a4a',
      desc: 'The larvae of chafer beetles (garden chafer Phyllopertha horticola and others) live in soil for 1–3 years, feeding on roots. They cause patchy die-back in lawns and can devastate root crops, strawberries, and young transplants.',
      id_title: 'How to Identify',
      id_text: 'Grubs are creamy-white, C-shaped, up to 25mm, with three pairs of legs and a distinctive brown head. Found 5–15cm below soil surface. Adult beetles are 8–12mm, reddish-brown with a metallic green head (garden chafer), flying in June.',
      symptoms: [
        { icon: '🌱', text: 'Yellowing, wilting, or dying patches in lawn or vegetable beds where roots have been eaten underground' },
        { icon: '🐦', text: 'Magpies, rooks, badgers, or foxes digging up lawns at night — secondary sign of grubs below' },
        { icon: '🥕', text: 'Carrot, parsnip, and potato roots with irregular cavities and tunnels, or complete root loss on young transplants' },
        { icon: '🪱', text: 'White C-shaped grubs in soil when digging — often 5–15cm deep' },
      ],
      controls: {
        organic:    { title: 'Heterorhabditis bacteriophora Nematodes', text: 'The most effective biological control for chafer grubs. Apply June–October in moist soil at 12°C+. Water in well and keep moist for 2 weeks. Available online and from garden centres. Less effective on established large grubs.' },
        passive:    { title: 'Encourage Predators', text: 'Starlings, rooks, hedgehogs, and ground beetles all predate chafer grubs. Avoid insecticides that harm these animals. Allow birds to forage freely on affected areas.' },
        mechanical: { title: 'Deep Autumn Cultivation', text: 'Dig over vegetable beds in autumn to expose grubs to frost and birds. Avoid leaving grass and weeds as harbourage. Remove thatch from lawns — chafers prefer to lay eggs in thatch-rich grass.' },
        chemical:   { title: 'No Currently Approved Chemical Controls', text: 'As of 2024, there are no chemical pesticides approved in the UK for garden use specifically against chafer grubs. Nematodes are the only reliable treatment. Commercial operators may use different products.' },
      }
    },
    {
      id: 'mealybug',
      icon: '🤍',
      name: 'Mealybug',
      tag: 'Sap Sucker',
      colour: '#b8a8c8',
      desc: 'Mealybugs are soft-bodied insects covered in a white waxy coating, forming colonies in leaf axils and stems. A major greenhouse and houseplant pest that excretes honeydew, leading to black sooty mould and weakened plants.',
      id_title: 'How to Identify',
      id_text: 'Look for small (2–4mm) oval insects coated in white, mealy wax, clustered in tight colonies in leaf axils, stem joints, and undersides of leaves. The wax protects them from most sprays. They leave behind sticky honeydew and white waxy residue.',
      symptoms: [
        { icon: '🤍', text: 'White, fluffy or mealy patches in leaf axils, stem joints, and under leaves — the insects themselves' },
        { icon: '🍬', text: 'Sticky honeydew coating leaves below the colony, attracting ants' },
        { icon: '🖤', text: 'Black sooty mould growing on honeydew deposits — a secondary sign of active colony' },
        { icon: '🌿', text: 'Distorted, yellowing, or stunted new growth as sap is removed from growing tips' },
      ],
      controls: {
        organic:    { title: 'Cryptolaemus Ladybird (Biological)', text: 'The mealybug destroyer ladybird (Cryptolaemus montrouzieri) is the gold standard biological control for greenhouses. Introduce in warm months (18°C+). Also effective: Beauveria bassiana fungal spray (BotaniGard).' },
        passive:    { title: 'Sticky Yellow Traps + Ants Control', text: 'Prevent ants from accessing affected plants — ants farm mealybugs and protect them from predators. Use banding grease on pot rims and legs. Isolate affected plants immediately to prevent spread.' },
        mechanical: { title: 'Rubbing Alcohol Spot Treatment', text: 'Dip a cotton bud or small paintbrush in isopropyl alcohol (70%) and apply directly to individual mealybugs — the alcohol dissolves the wax and kills on contact. Effective for light infestations. Follow up weekly for 4–6 weeks.' },
        chemical:   { title: 'Spirotetramat or Acetamiprid', text: 'Systemic insecticides absorbed into plant sap — effective against insects that are protected by wax and hard to contact-kill. Products containing spirotetramat (e.g. Bayer Provado) or acetamiprid work systemically. Do not use on edible crops within the recommended period before harvest.' },
      }
    },
    {
      id: 'lily-beetle',
      icon: '🔴',
      name: 'Lily Beetle',
      tag: 'Lily Destroyer',
      colour: '#c03020',
      desc: 'Lilioceris lilii is a brilliantly red beetle that can completely defoliate lilies and fritillaries. Both adults and larvae feed voraciously — the larvae are particularly disgusting as they cover themselves in their own black excrement.',
      id_title: 'How to Identify',
      id_text: 'Adults are unmistakable: 6–8mm, vivid scarlet red body with black legs, head, and antennae. Drop to the ground when disturbed. Larvae are fat, orange-red grubs covered in black excrement, feeding on the underside of leaves. Eggs are laid in irregular rows on the underside of leaves, reddish-orange.',
      symptoms: [
        { icon: '🔴', text: 'Bright red beetles on lily stems and leaves in spring and summer — very visible in sun' },
        { icon: '💩', text: 'Larvae covered in black excrement on the underside of leaves — easy to miss as they look like bird droppings' },
        { icon: '🌿', text: 'Leaves skeletonised or completely eaten — plants stripped to bare stems within days of heavy infestation' },
        { icon: '🥚', text: 'Irregular rows of reddish-orange eggs on the underside of leaves from April onwards' },
      ],
      controls: {
        organic:    { title: 'Neem Oil (Azadirachtin) Spray', text: 'Neem oil disrupts the life cycle of lily beetle and repels adults. Spray thoroughly over all leaf surfaces, particularly undersides, every 7–14 days during the season. Also effective: pyrethrin-based spray.' },
        passive:    { title: 'Regular Monitoring', text: 'Check plants every 2–3 days from April. Lily beetles are found and killed most efficiently by consistent hand-picking before populations build. Place a container of water beneath the plant before disturbing — beetles drop and can be caught.' },
        mechanical: { title: 'Hand-Picking Adults, Eggs and Larvae', text: 'Pick off and destroy adults, eggs and larvae by hand weekly from late March. Squash egg masses on leaf undersides. Remove larvae by wiping with a damp cloth. Wearing gloves is advisable with larvae. This is the most effective standalone control.' },
        chemical:   { title: 'Lambda-cyhalothrin or Deltamethrin', text: 'Pyrethroid insecticides applied at first sighting give fast knockdown of adults and larvae. Spray in the evening to minimise impact on bees. Not approved for use on edible crops. Resistance can develop — rotate modes of action.' },
      }
    },
    {
      id: 'spider-mite',
      icon: '🕷',
      name: 'Spider Mite',
      tag: 'Greenhouse Menace',
      colour: '#d4603a',
      desc: 'Two-spotted spider mite (Tetranychus urticae) thrives in hot, dry greenhouse conditions. Not an insect but an arachnid — almost invisible to the naked eye. Populations explode with terrifying speed in summer heat.',
      id_title: 'How to Identify',
      id_text: 'Individual mites are 0.5mm and barely visible. Look for bronzing, pale stippling on leaf surfaces, and — the definitive sign — very fine silk webbing on leaf undersides and growing tips. Examine undersides with a hand lens: the mites and their eggs are just visible as tiny moving dots.',
      symptoms: [
        { icon: '🕸', text: 'Fine, silky webbing on the underside of leaves and between growing tips — the definitive identification sign' },
        { icon: '✨', text: 'Fine pale stippling or bronzing on leaf upper surfaces — each speck is a feeding site' },
        { icon: '🌿', text: 'Leaves turn yellow, dry out, and drop prematurely; in severe cases plants are encased in webbing' },
        { icon: '🌡', text: 'Rapid population explosion during hot, dry periods (July–August in greenhouse)' },
      ],
      controls: {
        organic:    { title: 'Phytoseiulus persimilis Predatory Mite', text: 'Introduce this specialist predatory mite in late spring when temperatures are consistently above 18°C. It hunts and eats only spider mites. One introduction often controls an infestation completely. Available from biological control suppliers. Also effective: neem oil spray.' },
        passive:    { title: 'Humidity Control', text: 'Spider mites hate humidity. Mist leaves with water twice daily in hot weather — particularly undersides. Damp down greenhouse floors. Keep temperatures below 30°C where possible. A consistently humid atmosphere prevents populations building.' },
        mechanical: { title: 'Physical Removal + Pruning', text: 'Remove heavily infested leaves immediately and destroy them (do not compost). Wash plants thoroughly with a strong water jet, focusing on undersides. This physically removes mites and eggs and disrupts webbing.' },
        chemical:   { title: 'Bifenazate or Abamectin', text: 'Bifenazate (e.g. Floramite) is effective and has low mammalian toxicity. Abamectin is derived from a soil bacterium and works systemically. Rotate between modes of action — spider mites develop resistance rapidly. Apply at first sign; do not wait for populations to establish.' },
      }
    },
    {
      id: 'leafhopper',
      icon: '🟢',
      name: 'Leafhopper',
      tag: 'Sap Sucker',
      colour: '#5aaa5a',
      desc: 'Leafhoppers are small, wedge-shaped insects that jump when disturbed. Many species feed on vegetable and fruit crops, sucking sap from leaves and excreting pale cast skins. In severe infestations they cause mottling, stunting, and transmit viral diseases.',
      id_title: 'How to Identify',
      id_text: 'Adults are 2–4mm, pale green or yellowish, distinctively wedge-shaped and highly mobile — jumping rapidly when leaves are disturbed. The most obvious sign is the pale, papery cast skins (moulted exuviae) stuck to the underside of leaves. Look for stippled or mottled leaf surfaces.',
      symptoms: [
        { icon: '⬜', text: 'Pale papery cast skins (exuviae) dotted on the underside of leaves — the most characteristic sign' },
        { icon: '🌿', text: 'Upper leaf surfaces show pale, coarse stippling or mottling as feeding damage accumulates' },
        { icon: '🌱', text: 'Stunted or distorted new growth; leaves may curl upward at margins in heavy infestations' },
        { icon: '🦠', text: 'Some species transmit viral diseases — watch for mosaic patterns or unusual discolouration after leafhopper activity' },
      ],
      controls: {
        organic:    { title: 'Pyrethrin Spray', text: 'Pyrethrin-based sprays (e.g. Pyrethrum) give rapid knockdown of adults and nymphs. Spray in the evening to protect pollinators. Cover leaf undersides thoroughly. Repeat every 7–10 days.' },
        passive:    { title: 'Reflective Mulches', text: 'Silver or aluminium reflective mulches on the soil surface confuse and deter leafhoppers by disrupting their navigation. Also reduces aphid and whitefly landing rates. Particularly effective in greenhouse environments.' },
        mechanical: { title: 'Yellow Sticky Traps', text: 'Place yellow sticky traps at plant height to catch adults. Effective as a monitoring and population-reduction tool. Change traps every 2–4 weeks. Vacuum-collecting with a handheld vacuum can physically remove populations from lower leaves.' },
        chemical:   { title: 'Acetamiprid or Thiacloprid', text: 'Systemic neonicotinoids provide persistent control; however these should not be used on flowering crops visited by bees. Deltamethrin contact spray is an alternative. Always check label for suitability on food crops and observe pre-harvest intervals.' },
      }
    },
    {
      id: 'leaf-miner',
      icon: '🌿',
      name: 'Leaf Miner',
      tag: 'Tunnel Feeder',
      colour: '#7aaa4a',
      desc: 'Leaf miners are larvae of various flies, moths, sawflies, and beetles that feed between the upper and lower surfaces of leaves, creating distinctive pale winding tunnels (mines). Celery leaf miner and chrysanthemum leaf miner are the most common in UK gardens.',
      id_title: 'How to Identify',
      id_text: 'The distinctive sign is pale, winding or blotchy tunnels visible within leaves when held up to the light. The tiny larvae can sometimes be seen inside the mine. Adults are small flies or moths that lay eggs on leaf surfaces. Separate species attack different plant families — mines on brassicas, celery, spinach, and ornamentals are all different species.',
      symptoms: [
        { icon: '〰', text: 'Pale, winding tunnels or irregular blotches between leaf surfaces — visible when held up to light' },
        { icon: '🌿', text: 'Heavily mined leaves turn papery, pale and die; severely affected plants look bleached' },
        { icon: '🥬', text: 'Beet leaf miner causes blister-like white blotches on beetroot, chard, and spinach leaves' },
        { icon: '🌱', text: 'Young leaves of celery distorted and browned — celery leaf miner is the main pest on the Apiaceae family' },
      ],
      controls: {
        organic:    { title: 'Remove Mined Leaves Immediately', text: 'Pick off and destroy all mined leaves as soon as tunnels appear. This removes the larvae before they pupate and reduces the next generation. Do not compost mined material. This is the most effective organic control for small plots.' },
        passive:    { title: 'Encourage Parasitic Wasps', text: 'Several tiny parasitic wasp species (Diglyphus isaea notably) parasitise leaf miner larvae inside mines. These wasps are present naturally in gardens with insect-friendly plantings (umbellifers, clover). Introducing Diglyphus commercially is possible for greenhouse use.' },
        mechanical: { title: 'Fine Mesh Crop Covers', text: 'Cover susceptible crops with 0.8mm insect-proof mesh from shortly after sowing to prevent adult flies laying eggs. Particularly effective for celery, beet, and chard. Keep edges sealed to the ground.' },
        chemical:   { title: 'Spinosad or Abamectin', text: 'Spinosad (Conserve, organic-approved) has activity against leaf miner larvae inside mines. Abamectin is a translaminar product that penetrates leaf tissue and reaches the larvae. Systemic or translaminar action is essential — contact sprays cannot reach larvae inside mines. Use at first sign only.' },
      }
    },
    {
      id: 'scale-insect',
      icon: '🟤',
      name: 'Scale Insect',
      tag: 'Bark Feeder',
      colour: '#7a5a3a',
      desc: 'Scale insects are stationary sap-sucking insects protected by waxy shells, attached to stems and bark. Soft scale (brown soft scale) and hard scale (mussel scale) are the most common UK garden species. They weaken trees, shrubs, and greenhouse plants over time.',
      id_title: 'How to Identify',
      id_text: 'Soft scales look like small, flat, oval, brown or yellowish bumps on stems and bark — 2–5mm, often in colonies. Hard (armoured) scales are smaller, grey, and have a more rigid, oyster-shell-like cover. Both produce sticky honeydew. Rub a bump with your fingernail — if it smears, it is a scale insect; if it leaves a hard shell, it is armoured scale.',
      symptoms: [
        { icon: '🟤', text: 'Small brown or grey bumps on stems, branches, and the underside of leaves — the scale covers themselves' },
        { icon: '🍬', text: 'Sticky honeydew coating leaves and stems below the colony, leading to black sooty mould' },
        { icon: '🌿', text: 'Progressive yellowing and weakening of affected plant over months or years' },
        { icon: '🐜', text: 'Ants tending the colony — a reliable secondary indicator of scale insect or aphid presence' },
      ],
      controls: {
        organic:    { title: 'Plant Oils and Fatty Acid Sprays', text: 'Plant-based oils (neem, rapeseed) and fatty acid (insecticidal soap) products smother scale insects. Spray thoroughly in March when scale crawlers are active and most vulnerable. Repeat monthly. Must contact the insect to work — get into stem junctions.' },
        passive:    { title: 'Encourage Scale Predators', text: 'Ladybirds (especially Chilocorus nigritus) and parasitic wasps (Metaphycus species) are natural enemies of scale. Avoid broad-spectrum insecticides. For greenhouse use, introduce Metaphycus parasitic wasps commercially.' },
        mechanical: { title: 'Physical Scraping and Pruning', text: 'On established colonies, scrub stems with an old toothbrush dipped in dilute washing-up liquid. Prune out heavily infested stems to ground level on shrubs. Wipe individual scales from houseplants with isopropyl alcohol on cotton wool.' },
        chemical:   { title: 'Spirotetramat (Systemic)', text: 'Spirotetramat (e.g. Bayer Provado Ultimate Bug Killer) is a systemic product absorbed into sap, killing scale insects that feed on it. Most effective applied in spring when crawlers are active and feeding is highest. Hard scales are more resistant than soft scales.' },
      }
    },
    {
      id: 'tortrix-moth',
      icon: '🌀',
      name: 'Tortrix Moth',
      tag: 'Leaf Roller',
      colour: '#6a8a3a',
      desc: 'Tortrix moth caterpillars (many species) tie leaves together with silk and feed within the shelter, making them difficult to spray. Garden tortrix (Cacoecimorpha pronubana) and fruit tree tortrix are the most widespread, affecting roses, apples, soft fruit, and many ornamentals.',
      id_title: 'How to Identify',
      id_text: 'Look for leaves rolled or tied together with silk threads — the caterpillar feeds inside this shelter. Caterpillars are 10–20mm, pale green or yellowish-brown with a dark head. They wriggle backwards rapidly when disturbed and drop on a silk thread. Adults are small, brownish moths 15–25mm wingspan.',
      symptoms: [
        { icon: '🌿', text: 'Leaves rolled or tied together with fine silk threads — the caterpillar shelter; unfold carefully to reveal the pest' },
        { icon: '💩', text: 'Small green frass pellets visible on and around rolled leaves' },
        { icon: '🍎', text: 'On fruit trees: caterpillars tie leaves to fruit and feed on the fruit surface, causing shallow round scars' },
        { icon: '🌹', text: 'Rolled rose leaves and flower buds in June–August — rose tortrix is a major pest of roses' },
      ],
      controls: {
        organic:    { title: 'Bacillus thuringiensis (Bt)', text: 'Spray Bt onto foliage before caterpillars roll leaves — once inside the shelter, sprays cannot reach them. Apply at first sign of moth activity or egg hatching in late April. Bt kills only caterpillars and is harmless to all other wildlife.' },
        passive:    { title: 'Encourage Parasitic Wasps and Birds', text: 'Tits are particularly effective at finding and removing tortrix caterpillars from rolled leaves. Hang bird feeders near affected trees in winter to encourage them to search for overwintering larvae. Ichneumon parasitic wasps parasitise caterpillars.' },
        mechanical: { title: 'Unroll and Squash By Hand', text: 'Unroll affected leaves and squash caterpillars by hand from May–September. Time-consuming but very effective on small plants and roses. Remove rolled leaves where caterpillars are pupating. Check weekly during the season.' },
        chemical:   { title: 'Lambda-cyhalothrin at Bud Break', text: 'Spray with lambda-cyhalothrin or deltamethrin at first egg hatch (green tip/bud break on fruit trees) before caterpillars roll leaves and become protected. Once inside rolled leaves, contact sprays are largely ineffective. Evening application reduces bee impact.' },
      }
    },
    {
      id: 'woolly-aphid',
      icon: '🌸',
      name: 'Woolly Aphid',
      tag: 'Apple Pest',
      colour: '#a06898',
      desc: 'Woolly aphid (Eriosoma lanigerum) is a sap-sucking aphid that coats itself in white waxy wool and colonises apple and related tree bark, causing galls and canker entry points. A major apple pest in UK gardens.',
      id_title: 'How to Identify',
      id_text: 'Look for fluffy, white, cotton-wool-like patches on apple branches and stems, particularly at pruning wounds, branch junctions, and damaged bark. Rubbing reveals purple-red aphids beneath the white wax. Active April–October. Can be confused with woolly beech aphid on beech trees (different species, different host).',
      symptoms: [
        { icon: '⬜', text: 'White, cotton-wool-like patches on apple bark, branch joints, and wounds — highly distinctive' },
        { icon: '🌳', text: 'Lumpy, cork-like galls beneath or around woolly colonies — aphid feeding causes abnormal bark growth' },
        { icon: '🍎', text: 'Entry points for apple canker fungus form at feeding sites — long-term branch dieback in neglected cases' },
        { icon: '🐜', text: 'Ants tending the colonies — a reliable indicator of active aphid feeding' },
      ],
      controls: {
        organic:    { title: 'Earwig Release (Biological)', text: 'Earwigs are voracious predators of woolly aphid. Tolerate earwigs on apple trees. Alternatively, apply neem oil directly to colonies — it penetrates the wax coating and suffocates the aphids. Pyrethrin spray also has activity against exposed colonies.' },
        passive:    { title: 'Plant Aphidius Species (Parasitic Wasp)', text: 'Aphelinus mali is a specialist parasitic wasp that parasitises woolly aphid specifically. It is present naturally in UK gardens but can be introduced for heavy infestations. Avoid pesticides that harm it.' },
        mechanical: { title: 'Stiff Brush or Water Jet', text: 'Scrub colonies off with a stiff brush (an old toothbrush is ideal) dipped in insecticidal soap solution. Do this in April–May before colonies build. A powerful water jet breaks up and removes colonies. Prune out heavily infested small branches.' },
        chemical:   { title: 'Spirotetramat (Systemic)', text: 'Spirotetramat absorbed into tree sap is translocated to the colonies and gives effective control. The waxy coating makes contact sprays less effective — systemic action penetrates it. Apply in spring when aphids are actively feeding and sap flow is highest.' },
      }
    },
    {
      id: 'earwig',
      icon: '🦎',
      name: 'Earwig',
      tag: 'Night Feeder',
      colour: '#8a6a3a',
      desc: 'Earwigs (Forficula auricularia) are beneficial predators of aphids and small insects for most of the year but become damaging pests when they feed on young seedlings, petals, and soft plant tissue — particularly dahlias and sweet peas — at night.',
      id_title: 'How to Identify',
      id_text: 'Earwigs are 10–15mm, reddish-brown, with distinctive curved pincers (forceps) at the tail. They shelter in dark, damp places by day and emerge at night. Look in rolled dahlia petals, between lettuce leaves, and under pots. They are omnivores — predators of aphids and springtails, but also plant feeders.',
      symptoms: [
        { icon: '🌸', text: 'Ragged holes in dahlia, chrysanthemum, and sweet pea petals — feeding from the inside of flower buds at night' },
        { icon: '🌱', text: 'Seedlings cut off at soil level or irregular holes in young leaves — especially in frames and cold greenhouses' },
        { icon: '🥬', text: 'Irregular holes in lettuce leaves and inner hearts; earwigs shelter deep inside heads by day' },
        { icon: '🌙', text: 'Feeding only occurs at night — daytime inspection often reveals no pest despite damage accumulating' },
      ],
      controls: {
        organic:    { title: 'Trap and Release Away From Garden', text: 'Earwigs are beneficial — wherever possible, relocate rather than kill. Trap in upturned flowerpots stuffed with straw on canes near affected plants. Check daily and release earwigs away from dahlias and ornamentals. They predate far more aphids than plant damage they cause.' },
        passive:    { title: 'Selective Tolerance', text: 'Where earwigs are active on aphid-infested trees and shrubs, positively tolerate them. Place barriers (grease bands, copper tape) only on specific vulnerable plants. The overall garden benefit of earwigs as aphid predators is substantial.' },
        mechanical: { title: 'Straw Traps + Night Collecting', text: 'Set traps near vulnerable plants: upturned flowerpots filled with dry straw. Collect and destroy earwigs sheltering in traps each morning during peak season. Go out at night with a torch to hand-pick from dahlia buds.' },
        chemical:   { title: 'Pyrethrin or Deltamethrin (Last Resort)', text: 'Apply as a targeted evening spray around the base of severely affected plants. Note: earwigs are far more valuable as predators than they are damaging in most garden situations — chemical control is rarely justified and kills beneficial insects.' },
      }
    },
    {
      id: 'box-caterpillar',
      icon: '🌿',
      name: 'Box Tree Caterpillar',
      tag: 'Box Destroyer',
      colour: '#2a6a2a',
      desc: 'The box tree moth (Cydalima perspectalis) is an invasive species from Asia, first recorded in the UK in 2007 and now widespread. Caterpillars completely defoliate box plants and can kill established topiary specimens in a single season.',
      id_title: 'How to Identify',
      id_text: 'Adult moths are white with brown wing borders (35mm wingspan), flying June–September. Caterpillars are up to 40mm, bright green with a black head and distinctive black and white striping, living in webbing within the plant interior. The first sign is often patches of dead foliage and fine webbing in the interior — caterpillars are hidden deep inside.',
      symptoms: [
        { icon: '🕸', text: 'Fine webbing deep inside box plants — caterpillars hide within this and strip foliage' },
        { icon: '🌿', text: 'Patches of dead, brown foliage appearing suddenly in summer — often starting in the interior of the plant' },
        { icon: '💩', text: 'Green-brown frass (droppings) visible on foliage and soil beneath the plant' },
        { icon: '🌳', text: 'Complete defoliation of topiary specimens within 2–4 weeks in severe infestations — plants can be killed' },
      ],
      controls: {
        organic:    { title: 'Bacillus thuringiensis (Bt) — Primary Treatment', text: 'Bt is the most effective and recommended organic control. Spray thoroughly into the plant interior to contact caterpillars. Three applications at 2-week intervals, starting when caterpillars are young (green tip of new growth in April). Check plants weekly in summer and treat immediately on detection.' },
        passive:    { title: 'Pheromone Traps for Monitoring', text: 'Box moth pheromone traps catch adult males from June–September, alerting you to population levels and flight periods. They are not sufficient alone but crucial for timing chemical or biological treatments correctly. Replace lure every 6 weeks.' },
        mechanical: { title: 'Physical Removal of Webbing and Caterpillars', text: 'Use a strong water jet to blast caterpillars and webbing out of the plant interior. Pull out webbing by hand and destroy it. Remove manually 2–3 times per week during peak season. Clip infested shoots and burn immediately.' },
        chemical:   { title: 'Lambda-cyhalothrin or Deltamethrin', text: 'Fast-acting pyrethroid sprays can be used for emergency treatment of severe infestations. Spray deep into the plant interior; caterpillars must be contacted to be killed. Spray in the evening. Not suitable as a first-line control — Bt is preferred as it leaves no harmful residues.' },
      }
    },
  ],
  classic: [
    {
      id: 'slug-snail',
      icon: '🐌',
      name: 'Slugs & Snails',
      tag: 'Plot Villain No.1',
      colour: '#7a6a5a',
      desc: 'The most notorious garden pest — slugs and snails will decimate seedlings overnight. Most active after rain and at night. Both are molluscs; snails are seasonal and shelter in winter, slugs are active year-round with underground species doing root damage.',
      id_title: 'How to Identify',
      id_text: 'Slugs are legless, smooth, typically grey-brown to black, 2–10cm. Snails have a shell (brown, 2–4cm). Both leave a distinctive silver slime trail. Damage is greatest on seedlings and young transplants — entire plants can vanish overnight. Keeled slugs (Tandonia) live underground and damage potato tubers and bulbs.',
      symptoms: [
        { icon: '✨', text: 'Silver slime trails on leaves, soil, and pots — often the first sign before damage is found' },
        { icon: '🌱', text: 'Seedlings completely missing or cut off at soil level — especially vulnerable in cool wet weather' },
        { icon: '🕳', text: 'Irregular holes with smooth edges in leaves, working inward from the margin' },
        { icon: '🥔', text: 'Internal cavities in potato tubers and bulbs from underground keeled slugs — no external damage visible' },
      ],
      controls: {
        organic:    { title: 'Phasmarhabditis Nematodes', text: 'Water-applied nematodes (Nemaslug) penetrate slugs in the soil and kill them within 2 weeks. Apply April–October when soil is above 5°C and moist. Single application lasts 6 weeks. Most effective against the underground slug species that damage roots and tubers.' },
        passive:    { title: 'Encourage Natural Predators', text: 'Hedgehogs, frogs, toads, slow-worms, ground beetles, and song thrushes all predate slugs. Make habitat — a log pile, pond, or rough grass patch — draws these allies in. Avoid slug pellets that poison them.' },
        mechanical: { title: 'Night Torching, Copper Tape, and Barriers', text: 'Collect by torchlight after rain — most effective control for seedling beds. Copper tape gives a mild electric deterrent around pots. Beer traps (jar of beer sunk to rim) catch and drown slugs. Grit, sharp sand, and wool pellet mulches create uncomfortable barriers.' },
        chemical:   { title: 'Ferric Phosphate Pellets (Slug Gone)', text: 'Ferric phosphate pellets (e.g. Slug Gone, Growing Success) are wildlife-safe and break down into plant nutrients. Far safer than metaldehyde (now banned). Apply sparingly in small piles near plants at dusk. Do not apply in large scattered doses — this wastes pellets and poses more risk to wildlife.' },
      }
    },
    {
      id: 'cabbage-white',
      icon: '🦋',
      name: 'Cabbage White Caterpillar',
      tag: 'Brassica Pest',
      colour: '#e8e0c8',
      desc: 'The caterpillars of large and small cabbage white butterflies (Pieris brassicae and P. rapae) are the most visible brassica pest. Yellow eggs on the underside of leaves hatch into caterpillars that strip plants to bare ribs within days.',
      id_title: 'How to Identify',
      id_text: 'Large white: yellow, ribbed eggs in neat clusters on leaf undersides. Caterpillars are yellow and black, gregarious, feeding in groups. Small white: pale yellow single eggs; caterpillars are green and solitary, boring into hearts. Adults are familiar white butterflies with black wingtips, flying April–October.',
      symptoms: [
        { icon: '🥚', text: 'Yellow, ribbed, skittle-shaped eggs in neat clusters on the underside of leaves in summer' },
        { icon: '🌿', text: 'Outer leaves eaten first to bare ribs — large white caterpillars feed in groups and are very visible' },
        { icon: '💚', text: 'Small green caterpillars boring into cabbage hearts — small white butterfly larvae are solitary and harder to find' },
        { icon: '💩', text: 'Green/black frass on and below the plant — a clear sign of active feeding' },
      ],
      controls: {
        organic:    { title: 'Bacillus thuringiensis (Bt)', text: 'Spray Bt when caterpillars are young. Very effective on large white caterpillars feeding externally. For small white caterpillars boring into hearts, timing is critical — spray before they enter. Repeat every 7–10 days. Organic-approved and harmless to all other wildlife.' },
        passive:    { title: 'Encourage Ground Beetles and Wasps', text: 'Parasitic wasps (Cotesia glomerata) parasitise large white caterpillars — bright yellow cocoons visible on caterpillar backs are the sign. Do not kill parasitised caterpillars. Ground beetles eat eggs and young caterpillars.' },
        mechanical: { title: 'Fine Mesh Netting (Best Control)', text: 'Cover all brassicas with 0.8mm insect-proof mesh from transplanting until harvest. This completely excludes butterflies. Inspect weekly — any eggs found inside indicate a gap in the mesh. Remove eggs by hand; rub clusters off the leaf surface.' },
        chemical:   { title: 'Pyrethrin or Lambda-cyhalothrin', text: 'Apply at first sign of caterpillars. Spray in the evening to reduce bee impact. Most effective on young external-feeding caterpillars — once inside hearts, sprays cannot reach them. Do not use pyrethroid products during flowering or when pollinators are active.' },
      }
    },
    {
      id: 'aphid',
      icon: '🐜',
      name: 'Aphids (Blackfly & Greenfly)',
      tag: 'Universal Pest',
      colour: '#5a8a2a',
      desc: 'Aphids are the most widespread garden pest — over 500 species attack UK plants. They suck sap from growing tips, transmit viral diseases, and excrete sticky honeydew. Black bean aphid (Aphis fabae) devastates broad beans; peach-potato aphid (Myzus persicae) attacks dozens of crops.',
      id_title: 'How to Identify',
      id_text: 'Soft-bodied, pear-shaped insects 1–3mm, in colonies on growing tips, buds, and the underside of young leaves. Colour varies by species: black (blackfly), green (greenfly), grey (cabbage aphid), woolly white (woolly aphid). Most have two distinctive small tube-like cornicles at the rear. Winged forms appear when populations become crowded.',
      symptoms: [
        { icon: '🌱', text: 'Curled, distorted, or stunted growing tips — aphids inject saliva that causes leaf curl to protect them' },
        { icon: '🍬', text: 'Sticky honeydew on leaves and surfaces below the colony, leading to black sooty mould growth' },
        { icon: '🐜', text: 'Ants running up and down plant stems — they farm aphids for honeydew, protecting them from predators' },
        { icon: '🦠', text: 'Mosaic, mottled, or yellowed leaves — sign that aphids have transmitted a virus' },
      ],
      controls: {
        organic:    { title: 'Insecticidal Soap or Neem Oil', text: 'Fatty acid soaps (e.g. SB Plant Invigorator) smother aphids on contact. Spray thoroughly on growing tips and leaf undersides, repeat weekly. Neem oil has both contact and repellent activity. Both break down rapidly and are harmless to bees once dry.' },
        passive:    { title: 'Encourage Ladybirds, Lacewings, and Hoverflies', text: 'One ladybird larva eats 300–400 aphids before pupating. Plant umbellifers (dill, fennel, coriander) to host adult hoverflies whose larvae predate aphids. Install lacewing hotels. Avoid broad-spectrum insecticides that kill these beneficial insects.' },
        mechanical: { title: 'Blast Off with Water', text: 'A strong jet of water dislodges aphids from plants effectively and disrupts colonies. Do this in the morning so foliage dries before evening. Pinch off the densely colonised tips of broad beans (the soft growing tip is where blackfly always starts) to remove the first colony before it spreads.' },
        chemical:   { title: 'Pyrethrin (Fast) or Spirotetramat (Systemic)', text: 'For urgent knockdown: pyrethrin spray in the evening. For persistent control where aphids are inside curled leaves: spirotetramat (systemic, absorbed into sap). Avoid neonicotinoids on flowering plants. Never spray insecticides in full sun or when bees are foraging.' },
      }
    },
    {
      id: 'carrot-fly',
      icon: '🪰',
      name: 'Carrot Root Fly',
      tag: 'Root Pest',
      colour: '#c87a3a',
      desc: 'Carrot root fly (Psila rosae) larvae tunnel through roots of carrots, parsnips, celeriac, and parsley, making them unsaleable. The adult fly detects the volatile compounds released by freshly thinned or bruised carrot foliage from up to 1km away.',
      id_title: 'How to Identify',
      id_text: 'Adult flies are 8mm, shiny black body with yellow-orange legs and head, low-flying (below 60cm). Larvae are creamy-white maggots 7–9mm found in tunnels in roots. Two generations: May–June (first flight) and August–September (second flight). Damage from the second generation is most severe.',
      symptoms: [
        { icon: '🥕', text: 'Reddish-brown rusty tunnels running through the outside of carrot and parsnip roots — larval feeding channels' },
        { icon: '🌿', text: 'Foliage yellows and wilts as the root system is destroyed — plants look stressed without obvious cause' },
        { icon: '🟤', text: 'Dark, rusty-red streaks on root surface; tunnels deepen through the centre of affected roots' },
        { icon: '🪱', text: 'Creamy-white maggots visible in tunnels when affected roots are cut open' },
      ],
      controls: {
        organic:    { title: 'Steinernema feltiae Nematodes', text: 'Soil drench with S. feltiae nematodes in August targets second-generation larvae in the soil. Apply when soil is above 10°C and moist. Effective at reducing populations over time but does not eliminate all damage. Use in combination with barriers.' },
        passive:    { title: '60cm Barrier (Primary Control)', text: 'Carrot root fly cannot fly above 60cm. Surround beds with a 75cm-high barrier of fine mesh, clear polythene, or fleece. Completely excludes the low-flying pest — the most effective passive control. Permanent raised beds over 60cm high are naturally protected.' },
        mechanical: { title: 'Fleece and Timing of Thinning', text: 'Cover beds with horticultural fleece from sowing to harvest. Thin in the evening and remove all thinnings immediately — the smell of crushed foliage attracts flies. Sow after mid-May to miss the first flight, or choose resistant varieties (Resistafly, Flyaway).' },
        chemical:   { title: 'No Currently Approved Soil Insecticides', text: 'There are no longer any soil-applied insecticides approved for carrot root fly in the UK amateur market as of 2024. Barriers and resistant varieties are the only reliable controls. Commercial growers use chlorpyrifos-based treatments unavailable to gardeners.' },
      }
    },
    {
      id: 'blight',
      icon: '🍄',
      name: 'Blight (Tomato & Potato)',
      tag: 'Fungal Disease',
      colour: '#6a4a2a',
      desc: 'Late blight (Phytophthora infestans) is the most devastating disease of tomatoes and potatoes in the UK. It spreads with terrifying speed in warm, humid weather (Smith Periods: 2 days above 10°C with >89% humidity) and can destroy an entire crop within a week.',
      id_title: 'How to Identify',
      id_text: 'Brown-black water-soaked patches on leaves, stems, and fruit. Patches expand rapidly — a whole leaf can collapse in 24 hours in favourable weather. In humid conditions, a white-grey downy fungal growth appears on the underside of lesions. On potato tubers, brown rot extends inward from the skin.',
      symptoms: [
        { icon: '🌿', text: 'Dark brown-black, water-soaked lesions on leaves, starting at the tips and margins, spreading rapidly inward' },
        { icon: '⬜', text: 'White-grey downy fungal growth visible on the underside of affected leaves in humid conditions' },
        { icon: '🍅', text: 'Brown, greasy, firm areas on tomato fruits — sink inward and lead to complete fruit rot in days' },
        { icon: '🥔', text: 'Brown rot extending into potato tubers from the skin — tubers look sound outside but are rotting within' },
      ],
      controls: {
        organic:    { title: 'Copper-Based Fungicide (Bordeaux Mixture)', text: 'Copper hydroxide or Bordeaux mixture sprayed preventively (before blight appears) provides a protective surface barrier. Apply every 7–14 days from July when Smith Periods are forecast. Does not cure existing infections — strictly preventive. Approved for organic use but copper accumulates in soil — use sparingly.' },
        passive:    { title: 'Resistant Varieties and Good Airflow', text: 'Choose blight-resistant potato varieties (Sarpo Mira, Sarpo Axona, Cara) and tomatoes bred for resistance. Allow maximum airflow around plants — avoid crowding. Water at the base in the morning, never overhead. Remove lower leaves on tomatoes to improve airflow.' },
        mechanical: { title: 'Remove Affected Material Immediately', text: 'Cut off and destroy (burn or bin — do not compost) all affected leaves, stems and fruit at the first sign. Rapid action in the early stages can slow spread significantly. Harvest all potato tubers as soon as blight is detected on foliage — they can be saved if lifted before spores wash down to tubers.' },
        chemical:   { title: 'Mancozeb or Chlorothalonil', text: 'Mancozeb-based fungicides (Dithane 945) and chlorothalonil products provide preventive protection when applied before blight establishes. Note: these are strictly preventive — they create a surface barrier that new spores cannot penetrate, but cannot cure existing infections. Check current approval status — approvals change annually.' },
      }
    },
  ],
  wildlife: [
    {
      id: 'badger',
      icon: '🦡',
      name: 'Badger',
      tag: 'Digging Pest',
      colour: '#6a6a6a',
      desc: 'Badgers (Meles meles) are protected by law in the UK — it is illegal to harm, trap, kill, or interfere with their setts. They cause garden damage by digging for chafer grubs, earthworms, and wasp nests, and by pushing through fencing and netting.',
      id_title: 'How to Identify',
      id_text: 'Badgers leave very characteristic signs: large, deep, conical digging holes in lawns (grub-hunting), wide tunnels through or under fences, five-toed footprints with long claw marks, and latrines (dung pits) at territory boundaries. They are active from dusk to dawn. Setts are large tunnel systems, usually in woodland edges.',
      symptoms: [
        { icon: '🕳', text: 'Large conical holes dug in lawns overnight — badgers excavating for chafer grubs, leatherjackets, and earthworms' },
        { icon: '🌽', text: 'Sweetcorn plants flattened and cobs stripped — badgers roll sweetcorn cobs in their paws to remove kernels' },
        { icon: '🏕', text: 'Wide gaps pushed through or under fencing and netting — badgers are very strong and persistent' },
        { icon: '💩', text: 'Shallow latrine pits with loose soil at territory boundaries — a distinctive badger sign' },
      ],
      controls: {
        organic:    { title: 'Deterrent Scents', text: 'Human urine or commercial badger repellents (containing predator scent) applied around plot boundaries can discourage regular foraging. These need regular reapplication (every 7–10 days and after rain). Effectiveness varies — badgers are highly intelligent and habituate to deterrents over time.' },
        passive:    { title: 'Remove the Attractant', text: 'Treat lawn areas for chafer grubs and leatherjackets with nematodes (Heterorhabditis, Steinernema) to remove the food source that attracts badgers. A lawn with no grubs will receive far fewer visits. Cover sweetcorn with netting or fleece once cobs begin to form.' },
        mechanical: { title: 'Robust Electric Fencing (Most Effective)', text: 'A two-wire electric fence (20cm and 30cm high) powered by a reliable energiser is the most effective barrier. Must be properly earthed and maintained. Badgers quickly learn to respect electric fencing if the shock is deterrent-strength. Keep grass under wires trimmed to prevent earthing-out. Legal to use.' },
        chemical:   { title: 'No Licensed Chemical Controls Available', text: 'There are no legal chemical deterrents or repellents specifically approved for badger exclusion from gardens in the UK. Badgers are protected under the Protection of Badgers Act 1992. Do not attempt to gas, trap, poison, or disturb setts — these are criminal offences.' },
      }
    },
    {
      id: 'fox',
      icon: '🦊',
      name: 'Fox',
      tag: 'Urban Pest',
      colour: '#c87a2a',
      desc: 'Urban foxes (Vulpes vulpes) are a fixture of British gardens. They dig to cache food, create earth (dens), and occasionally prey on poultry, fruit, and vegetables. Their digging and fouling are the main nuisances rather than direct crop damage.',
      id_title: 'How to Identify',
      id_text: 'Foxes leave characteristic signs: deep excavations (earths) under sheds or in borders, scattered soil from caching digs, strong musky odour around their regular routes, cylindrical black droppings with twisted tapered ends and often containing fur or berry seeds, and half-eaten fruit or vegetables.',
      symptoms: [
        { icon: '🕳', text: 'Deep holes dug in borders and vegetable beds for caching food — typically neat, round, and deep' },
        { icon: '🐓', text: 'Poultry attacks — foxes dig under or force through inadequate enclosures; typically at night or dawn' },
        { icon: '🌽', text: 'Sweetcorn, strawberries, and fallen fruit eaten — foxes eat fruit opportunistically in late summer' },
        { icon: '💩', text: 'Strong-smelling cylindrical droppings with twisted ends deposited on prominent spots (path junctions, pots, steps)' },
      ],
      controls: {
        organic:    { title: 'Commercial Fox Repellents', text: 'Products based on predator urine, pepper, or aluminium ammonium sulphate (Scoot, Renardine) can deter foxes when applied regularly. Reapply every 3–7 days and always after rain. Foxes habituate over time — rotate between different deterrent products for continued effectiveness.' },
        passive:    { title: 'Motion-Activated Deterrents', text: 'Motion-activated water sprinklers (e.g. Scarecrow) give an immediate harmless water jet to foxes as they enter. Highly effective and does not habituate as quickly as scent deterrents. Solar-powered ultrasonic deterrent devices have variable results — effectiveness is disputed.' },
        mechanical: { title: 'Robust Fencing + Secure Poultry Housing', text: 'Foxes can climb 1.8m fences and dig under. Use a 1.8m fence with a 30cm outward-facing overhang, and a 30cm underground apron of L-shaped wire mesh to prevent digging in. Poultry housing must have a concrete or wire floor and a proper locking door. Check for gaps regularly.' },
        chemical:   { title: 'No Licensed Poisons Available to Gardeners', text: 'It is illegal to use poison to kill foxes in the UK. Shooting is legal with the appropriate firearms licence. Cage-trapping and releasing elsewhere is rarely effective (foxes return) and may require a licence. If severe crop or poultry losses occur, contact a licensed pest controller.' },
      }
    },
    {
      id: 'rabbit',
      icon: '🐇',
      name: 'Rabbit',
      tag: 'Grazer',
      colour: '#c8a880',
      desc: 'Rabbits (Oryctolagus cuniculus) are among the most damaging garden pests — a single rabbit can destroy a vegetable bed overnight. They graze, strip bark from trees, and burrow. Damage is worst in winter and early spring when other food is scarce.',
      id_title: 'How to Identify',
      id_text: 'Rabbits leave very clean-cut, angled bites on plant stems (unlike slugs which leave ragged holes). Droppings are small, round, dark pellets scattered in groups. Burrows are 10–15cm diameter, often in banks or hedgerow bases. Damage is heaviest at dawn and dusk but rabbits feed throughout the day.',
      symptoms: [
        { icon: '✂', text: 'Very clean, angled cuts to plant stems close to the ground — distinctive diagonal bite at 45° angle' },
        { icon: '🌳', text: 'Bark stripped from tree trunks in winter (ring-barking) — can kill young trees if bark is removed all the way around' },
        { icon: '🫛', text: 'Peas, beans, and brassica seedlings completely grazed off overnight — preferred foods in spring' },
        { icon: '💩', text: 'Small, round, dark droppings in clusters at feeding sites and near burrow entrances' },
      ],
      controls: {
        organic:    { title: 'Plant-Based Repellents', text: 'Garlic and capsicum-based sprays (e.g. Grazers) applied to plant foliage can deter rabbit grazing. Must be reapplied every 7–14 days and after rain. Effective for protecting individual valuable plants; not practical for whole beds.' },
        passive:    { title: 'Tree Guards and Individual Plant Protection', text: 'Spiral tree guards on young trees and shrubs prevent ring-barking. Wire mesh cylinders (50cm high, 13mm gauge) protect individual plants effectively and cheaply. Can be removed easily when not needed.' },
        mechanical: { title: 'Rabbit-Proof Fencing (Only Reliable Solution)', text: 'A 90cm minimum height fence of 31mm gauge chicken wire or rabbit netting, with the bottom 30cm buried and turned outward at 90° to prevent burrowing under. The buried L-shaped apron is critical — rabbits probe for soft ground at fence bases. Gate gaps must also be blocked.' },
        chemical:   { title: 'Aluminium Ammonium Sulphate Repellent', text: 'Products like Scoot or Get Off My Garden, based on aluminium ammonium sulphate, can discourage rabbits from entering treated areas. Granular formulations last longer than sprays. Effective as a supplementary measure but not a substitute for physical fencing in high-pressure areas.' },
      }
    },
    {
      id: 'mole',
      icon: '🦔',
      name: 'Mole',
      tag: 'Burrower',
      colour: '#7a6a8a',
      desc: 'Moles (Talpa europaea) create extensive tunnel networks just below the surface in search of earthworms. They rarely damage plants directly but their molehills smother grass and plants, tunnels undermine seedling beds, and roots are disturbed as tunnels push through.',
      id_title: 'How to Identify',
      id_text: 'Molehills are the primary sign: mounds of fine, dark soil pushed up from below, typically 20–30cm diameter and 10–15cm high. Active tunnelling creates ridges in the soil surface (shallow runs). Moles are largely blind, solitary, and rarely seen — one mole can create dozens of molehills and hundreds of metres of tunnel.',
      symptoms: [
        { icon: '⛰', text: 'Rounded mounds of dark, finely-broken soil appearing overnight in lawns and beds — molehills from new tunnel excavation' },
        { icon: '🌱', text: 'Seedlings wilting and roots exposed as tunnels push through under vegetable beds — roots lose contact with soil' },
        { icon: '〰', text: 'Ridges in the soil surface where shallow runs have been pushed up just under the surface' },
        { icon: '🌿', text: 'Grass dying in patches above tunnels during dry weather — roots dried out where air has entered the tunnels' },
      ],
      controls: {
        organic:    { title: 'Planting Mole-Deterrent Plants', text: 'Moles are reputed to dislike the smell of caper spurge (Euphorbia lathyris) and alliums (onion, garlic). Plant these near mole-active areas. Evidence is anecdotal but planting them does no harm. Traditional garden folklore places them as the oldest non-lethal mole deterrent.' },
        passive:    { title: 'Vibration Deterrents', text: 'Solar-powered vibration stakes placed in mole runs emit regular vibrations that disturb moles. Variable effectiveness — works best in small gardens and is less effective where runs are deep. Pinwheels or hollow stakes with ball bearings that rattle in the wind work on a similar principle.' },
        mechanical: { title: 'Mole Traps (Duffus, Scissor, Tunnel)', text: 'Mole traps set in active runs are the most reliable control. Locate fresh, active runs by pressing down with a foot — moles re-open a depressed section within 24 hours. Set approved scissor or Duffus traps in the run, covered to block light. Check twice daily. Wear gloves to mask human scent.' },
        chemical:   { title: 'Gas Cartridges or Mole Smoke', text: 'Aluminium phosphide gas cartridges are available to professional pest controllers but not to gardeners. Commercially available mole smoke (Rentokil) can be used in runs to deter rather than kill. Follow all safety instructions carefully — these products produce toxic gas. Legal to use above ground with care.' },
      }
    },
    {
      id: 'rat',
      icon: '🐀',
      name: 'Rats & Mice',
      tag: 'Rodents',
      colour: '#8a7a6a',
      desc: 'Brown rats (Rattus norvegicus) and house mice (Mus musculus) are opportunistic pests that nest in compost heaps, under sheds, and in stored produce. Rats cause the most damage — gnawing through structures, eating stored crops, and posing a disease risk (Weil\'s disease).',
      id_title: 'How to Identify',
      id_text: 'Rat signs: cylindrical dark droppings (12–18mm) near feeding sites, gnaw marks on woodwork and stored materials, greasy runs along fences and walls (dark smear marks from their oily coat), and burrow entrances 6–9cm diameter. Mouse signs: smaller droppings (3–6mm), smaller gnaw marks, and nibbled seedlings.',
      symptoms: [
        { icon: '🥔', text: 'Stored root vegetables, onions, and brassica seed eaten or partially gnawed in stores and sheds' },
        { icon: '🌱', text: 'Pea and bean seeds dug up and eaten shortly after sowing — rats follow seed rows precisely' },
        { icon: '💩', text: 'Dark cylindrical droppings near food sources, runs, and nesting areas' },
        { icon: '🕳', text: 'Burrow entrances 6–9cm wide (rats) or 3–4cm wide (mice) at base of walls, compost heaps, and shed edges' },
      ],
      controls: {
        organic:    { title: 'Compost Management and Hygiene', text: 'Never add cooked food, meat, or dairy to compost — these attract rats. Use a sealed, rodent-proof compost bin with a mesh base. Store all seeds, bulbs, and produce in sealed metal or hard plastic containers. Remove bird feeding stations at night — spilled seed is the most common rat attractant.' },
        passive:    { title: 'Encourage Natural Predators', text: 'Barn owls, tawny owls, kestrels, and domestic cats all predate mice and rats significantly. Install a barn owl nest box if in a rural setting. A resident cat is a highly effective deterrent — even their scent and presence suppresses rodent activity.' },
        mechanical: { title: 'Snap Traps (Most Humane and Effective)', text: 'Break-back traps are the most humane and effective mechanical control. Use peanut butter or chocolate as bait. Place traps in a box or pipe to exclude pets and birds, positioned along runs and near burrow entrances. Check and reset daily. Multiple traps greatly increase effectiveness.' },
        chemical:   { title: 'Rodenticide Baits (Professional-Strength)', text: 'Place rodenticide bait blocks (bromadiolone, brodifacoum — second-generation anticoagulants) in locked tamper-proof bait stations. Always use bait stations — never leave loose bait. Check every 3–5 days. Do not use second-generation anticoagulants outdoors where owls or raptors may consume dead rodents — use first-generation (difenacoum) or contact a licensed pest controller.' },
      }
    },
    {
      id: 'pigeon',
      icon: '🕊',
      name: 'Pigeons',
      tag: 'Seed & Brassica Pest',
      colour: '#8a8a9a',
      desc: 'Wood pigeons (Columba palumbus) are major garden pests, systematically stripping brassica leaves to bare ribs and eating freshly sown seeds. They are intelligent, persistent, and quickly learn to exploit unprotected plots. Collared doves cause similar but lesser damage.',
      id_title: 'How to Identify',
      id_text: 'Wood pigeons are large (40cm), grey with white neck patches. Their feeding damage is distinctive: brassica leaves eaten from the outside inward, leaving a midrib skeleton, or seed rows dug up completely. They feed in flocks in winter. In spring, pairs target young seedlings and pea shoots heavily.',
      symptoms: [
        { icon: '🥬', text: 'Brassica leaves stripped to bare ribs from the outside inward — all that remains is the midrib and main veins' },
        { icon: '🌱', text: 'Freshly sown peas, beans, and large seeds dug up and eaten — particularly devastating in spring' },
        { icon: '🥦', text: 'Young brassica transplants grazed off at the base entirely — can destroy a bed in a single flock visit' },
        { icon: '🐦', text: 'Groups of birds (often 10–30) observed in or near the vegetable plot in winter and spring' },
      ],
      controls: {
        organic:    { title: 'Humming Line and Bird Scarers', text: 'Tensioned nylon "humming line" stretched over beds vibrates in the wind and deters pigeons effectively when first installed. Birds of prey kites and reflective bird scaring devices give short-term deterrence. All visual and auditory scarers need regular repositioning to remain effective as pigeons habituate.' },
        passive:    { title: 'Timing of Sowing', text: 'Starting brassicas indoors and planting out when large enough to withstand limited grazing significantly reduces losses. Sowing peas in gutters indoors and transplanting avoids the critical period when seeds on the surface attract birds. Interplanting with aromatic herbs may reduce attractiveness.' },
        mechanical: { title: 'Netting — The Only Reliable Method', text: 'A proper frame of posts and netting over the entire bed is the only truly reliable pigeon control. Use at least 25mm mesh for pigeons. The netting must cover all sides down to the ground — pigeons walk under raised edges. Invest in a permanent cage-frame structure for brassica beds if pigeons are regular visitors.' },
        chemical:   { title: 'No Approved Chemical Controls', text: 'There are no legal chemical deterrents or poisons approved for wood pigeon control in domestic gardens in the UK. Shooting under a general licence is legal for wood pigeons causing crop damage. Contact Natural England for current general licence conditions if significant crop damage is occurring.' },
      }
    },
  ],
};

function renderPestGuide() {
  const tabs = document.getElementById('pestTabs');
  if (!tabs) return;
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('[data-pest-cat]');
    if (!btn) return;
    document.querySelectorAll('#pestTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    pestShowCat(btn.dataset.pestCat);
  });
  pestShowCat('insects');
}

function pestShowCat(cat) {
  const cards  = document.getElementById('pestCards');
  const detail = document.getElementById('pestDetail');
  if (detail) detail.style.display = 'none';
  if (!cards) return;
  cards.style.display = 'grid';
  const list = PEST_DATA[cat] || [];
  cards.innerHTML = list.map(p => {
    const photoUrl = PEST_PHOTOS[p.id];
    const photoHtml = photoUrl
      ? `<div class="pcard-photo-wrap"><img class="pcard-photo" src="${photoUrl}" alt="${p.name}" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()"></div>`
      : `<div class="pcard-photo-wrap" style="background:linear-gradient(135deg,${p.colour}bb,${p.colour}66);display:flex;align-items:center;justify-content:center;font-size:3rem">${p.icon}</div>`;
    return `
      <div class="pcard" role="button" tabindex="0" data-pest-id="${p.id}"
           onclick="pestOpenDetail('${cat}','${p.id}')"
           onkeydown="if(event.key==='Enter'||event.key===' ')pestOpenDetail('${cat}','${p.id}')">
        ${photoHtml}
        <div class="pcard-tag">${p.tag}</div>
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-desc">${p.desc.substring(0,90)}…</div>
        <div class="pcard-meta"><span>🔬 Tap to identify</span><span>🛡 Control methods</span></div>
      </div>`;
  }).join('');
}

function pestOpenDetail(cat, id) {
  const cards  = document.getElementById('pestCards');
  const detail = document.getElementById('pestDetail');
  const inner  = document.getElementById('pestDetailInner');
  if (!detail || !inner) return;
  const p = (PEST_DATA[cat] || []).find(x => x.id === id);
  if (!p) return;
  cards.style.display  = 'none';
  detail.style.display = 'block';
  detail.dataset.pestId = id;

  const photoUrl = PEST_PHOTOS[id];
  const photoHtml = photoUrl
    ? `<div class="detail-photo-wrap"><img class="detail-photo" src="${photoUrl}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="detail-photo-fallback" style="display:none">${p.icon}</span></div>`
    : `<div class="detail-photo-wrap" style="background:linear-gradient(135deg,${p.colour}bb,${p.colour}55)"><span class="detail-photo-fallback">${p.icon}</span></div>`;

  let sN = 0; const hn = () => String(++sN).padStart(2,'0');

  inner.innerHTML = `
    <div class="detail-sidebar">
      ${photoHtml}
      <div class="detail-tag">${p.tag}</div>
      <h2 class="detail-title">${p.name}</h2>
      <div class="detail-latin">${p.id_title}</div>
      <div class="detail-stats">
        <div class="dstat dstat--sow"><span class="dstat-label">🐛 Type</span><span class="dstat-val">${p.tag}</span></div>
        <div class="dstat"><span class="dstat-label">Controls</span><span class="dstat-val">4 methods</span></div>
      </div>
    </div>
    <div class="detail-body">
      <h3>${hn()} — About</h3>
      <p>${p.desc}</p>

      <h3>${hn()} — How to Identify</h3>
      <p>${p.id_text}</p>

      <h3>${hn()} — Symptoms &amp; What to Look For</h3>
      <div class="pest-symptom-list">
        ${p.symptoms.map(s => `<div class="pest-symptom-item"><span class="pest-symptom-icon">${s.icon}</span><span>${s.text}</span></div>`).join('')}
      </div>

      <h3>${hn()} — How to Control</h3>
      <div class="pest-control-block">
        <div class="pest-control-row">
          <span class="pest-control-badge organic">🌿 Organic</span>
          <div class="pest-control-text"><strong>${p.controls.organic.title}</strong>${p.controls.organic.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge passive">🤝 Passive</span>
          <div class="pest-control-text"><strong>${p.controls.passive.title}</strong>${p.controls.passive.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge mechanical">🔧 Mechanical</span>
          <div class="pest-control-text"><strong>${p.controls.mechanical.title}</strong>${p.controls.mechanical.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge chemical">⚗️ Chemical</span>
          <div class="pest-control-text"><strong>${p.controls.chemical.title}</strong>${p.controls.chemical.text}</div>
        </div>
      </div>
    </div>`;

  document.getElementById('pests').scrollIntoView({ behavior: 'smooth', block: 'start' });
  injectPestDetailPhoto();
}

function pestBack() {
  const cards  = document.getElementById('pestCards');
  const detail = document.getElementById('pestDetail');
  if (cards)  cards.style.display  = 'grid';
  if (detail) detail.style.display = 'none';
}


// ══════════════════════════════════════════════
// WEED GUIDE
// ══════════════════════════════════════════════

const WEED_WIKI = {
  'bindweed':       'Convolvulus_arvensis',
  'couch-grass':    'Elymus_repens',
  'ground-elder':   'Aegopodium_podagraria',
  'bramble':        'Rubus_fruticosus',
  'dock':           'Rumex_obtusifolius',
  'creeping-thistle':'Cirsium_arvense',
  'horsetail':      'Equisetum_arvense',
  'creeping-buttercup':'Ranunculus_repens',
  'japanese-knotweed':'Fallopia_japonica',
  'fat-hen':        'Chenopodium_album',
  'chickweed':      'Stellaria_media',
  'groundsel':      'Senecio_vulgaris',
  'hairy-bittercress':'Cardamine_hirsuta',
  'shepherds-purse':'Capsella_bursa-pastoris',
  'annual-meadow-grass':'Poa_annua',
  'speedwell':      'Veronica_persica',
  'fumitory':       'Fumaria_officinalis',
  'cleavers':       'Galium_aparine',
};
const WEED_PHOTOS = {};

async function fetchWeedPhotos() {
  const ids = Object.keys(WEED_WIKI);
  try {
    const titles = ids.map(id => WEED_WIKI[id]);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=pageimages&format=json&pithumbsize=600&origin=*&redirects=1`;
    const resp = await fetch(url);
    const data = await resp.json();
    const chain = {};
    for (const t of titles) chain[t.replace(/_/g,' ').toLowerCase()] = t.replace(/_/g,' ').toLowerCase();
    for (const n of (data.query.normalized||[])) { chain[n.from.replace(/_/g,' ').toLowerCase()] = n.to.toLowerCase(); for (const k in chain) if (chain[k]===n.from.replace(/_/g,' ').toLowerCase()) chain[k]=n.to.toLowerCase(); }
    for (const r of (data.query.redirects||[])) { chain[r.from.toLowerCase()] = r.to.toLowerCase(); for (const k in chain) if (chain[k]===r.from.toLowerCase()) chain[k]=r.to.toLowerCase(); }
    const finalToId = {};
    for (const id of ids) { const orig=WEED_WIKI[id].replace(/_/g,' ').toLowerCase(); finalToId[chain[orig]||orig]=id; }
    for (const page of Object.values(data.query.pages)) {
      if (!page.thumbnail) continue;
      const matchId = finalToId[page.title.toLowerCase()];
      if (matchId) WEED_PHOTOS[matchId] = page.thumbnail.source;
    }
    // refresh open detail if any
    const detail = document.getElementById('weedDetail');
    if (detail && detail.style.display !== 'none') {
      const pid = detail.dataset.weedId;
      if (pid && WEED_PHOTOS[pid]) {
        const wrap = detail.querySelector('.detail-photo-wrap');
        if (wrap && !wrap.querySelector('img')) {
          const fb = wrap.querySelector('.detail-photo-fallback');
          const img = document.createElement('img');
          img.className = 'detail-photo'; img.src = WEED_PHOTOS[pid]; img.alt = '';
          img.onerror = function(){ this.style.display='none'; if(fb) fb.style.display='block'; };
          if (fb) { wrap.insertBefore(img, fb); fb.style.display='none'; }
          else wrap.prepend(img);
        }
      }
    }
    // refresh card images
    const cards = document.getElementById('weedCards');
    if (cards && cards.style.display !== 'none') {
      cards.querySelectorAll('[data-weed-id]').forEach(card => {
        const wid = card.dataset.weedId;
        const wrap = card.querySelector('.pcard-photo-wrap');
        if (wrap && WEED_PHOTOS[wid] && !wrap.querySelector('img')) {
          wrap.innerHTML = `<img class="pcard-photo" src="${WEED_PHOTOS[wid]}" alt="" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()">`;
        }
      });
    }
  } catch(e) {}
}

const WEED_DATA = {
  perennial: [
    {
      id: 'bindweed', icon: '🌀', name: 'Bindweed', tag: 'Perennial',
      danger: 'high', dangerLabel: '🔴 High Threat',
      colour: '#7a5a9a',
      desc: 'Field bindweed (Convolvulus arvensis) and hedge bindweed (Calystegia sepium) are the most persistent and damaging weeds in any kitchen garden. Their twining stems strangle crops, and a root system extending 5 metres or more makes eradication genuinely difficult.',
      id_text: 'Field bindweed has small white or pale pink trumpet-shaped flowers (2–3cm) and arrow-shaped leaves. Hedge bindweed is larger with white flowers up to 7cm and bigger, broadly arrow-shaped leaves. Both twine clockwise around plants and can reach 2m or more. The root system is brittle, white, and fleshy — each broken piece regenerates.',
      spread: [
        { i:'🌱', t:'Deep roots reaching 5m or more — each broken fragment regenerates a new plant' },
        { i:'💨', t:'Seeds viable for up to 30 years in the soil, though most spread is vegetative via roots' },
        { i:'🔄', t:'Horizontal roots send up new shoots several metres from the parent plant' },
      ],
      symptoms: [
        { i:'🌀', t:'Twining white or pink-flowered stems winding clockwise around crop plants and canes from May onwards' },
        { i:'🌱', t:'New shoots emerging from bare, previously cleared ground — often weeks after the parent plant was removed' },
        { i:'⬜', t:'White, fleshy root fragments visible in soil when digging — each piece will regenerate' },
      ],
      controls: {
        organic:    { title:'Repeated cutting at soil level', text:'Cut all top-growth at soil level every 2–3 weeks throughout the growing season for 2–3 years. This progressively exhausts the root reserves. Never compost bindweed roots or stems with seed — burn or bin.' },
        passive:    { title:'Mulch suppression (long-term)', text:'A 10–15cm deep mulch of bark, cardboard and compost suppresses top growth. Will not eradicate but buys time and reduces vigour. Black polythene mulch left for a full season weakens established plants significantly.' },
        mechanical: { title:'Deep fork removal of roots', text:'In autumn, fork deeply and remove every piece of white root you can find. Work methodically across the entire bed. Return fortnightly to remove new shoots before they can photosynthesise and rebuild root reserves. Persistence over 2–3 years is the key.' },
        chemical:   { title:'Glyphosate (systemic)', text:'Glyphosate (e.g. Roundup) applied to actively growing foliage translocates to the roots and kills the whole plant. Apply in July–August when growth is maximum. Two or three applications in one season are typically needed. Allow 2–3 weeks between applications. Keep away from all garden plants.' },
      }
    },
    {
      id: 'couch-grass', icon: '🌾', name: 'Couch Grass', tag: 'Perennial',
      danger: 'high', dangerLabel: '🔴 High Threat',
      colour: '#7a8a3a',
      desc: 'Couch grass (Elymus repens) is the most widespread perennial grass weed in UK gardens. Its sharp, pointed rhizomes (underground stems) penetrate and grow straight through the crowns of other plants, making it particularly damaging to perennial vegetables, fruit and ornamentals.',
      id_text: 'Flat, grey-green leaves 5–10mm wide with a slightly rough upper surface. Creeping white underground stems (rhizomes) with distinctive nodes at regular intervals — look for the pointed, cream-coloured tips. Upright flower spikes in summer. Distinguished from other grasses by the pale, jointed rhizomes which break into pieces that all regenerate.',
      spread: [
        { i:'🌾', t:'Rhizomes spread horizontally up to 2m from the parent plant in a single season' },
        { i:'✂', t:'Each rhizome fragment with a node regenerates — rotavating couch grass multiplies rather than kills it' },
        { i:'💨', t:'Seeds also spread by wind but most spread is vegetative via rhizomes' },
      ],
      symptoms: [
        { i:'🌾', t:'Pale, jointed, pointed white rhizomes threading through plant crowns and root balls' },
        { i:'🌱', t:'Vigorous grass patches re-emerging after digging — clearly a perennial type by regrowth speed' },
        { i:'🌿', t:'Grass growing through and within the crown of perennial plants (asparagus, strawberry) — very hard to remove once established' },
      ],
      controls: {
        organic:    { title:'Exhaustion by repeated removal', text:'Fork out every rhizome fragment methodically. Even tiny pieces with a node will regrow — sieve the soil in badly affected areas. Return every 2–3 weeks to remove new shoots before they can rebuild root reserves. Takes 2+ seasons to clear a heavy infestation.' },
        passive:    { title:'No-dig mulching', text:'A 15cm layer of cardboard and bark mulch excludes light and significantly weakens couch. Most effective on ground being cleared for the first time. Not suitable for established beds with growing crops.' },
        mechanical: { title:'Never rotavate — it makes it worse', text:'Critically: never rotavate or rotorvate couch grass — the machine chops rhizomes into dozens of fragments each capable of regenerating. Dig by hand with a fork and remove every fragment. In cleared ground, false seedbed technique exposes rhizomes to drying and birds.' },
        chemical:   { title:'Glyphosate before crop establishment', text:'Glyphosate applied to actively growing couch in spring or autumn translocates to rhizomes and kills them. Allow 3–4 weeks before cultivation and planting. One application rarely suffices — follow up with repeat applications on regrowth.' },
      }
    },
    {
      id: 'ground-elder', icon: '🌿', name: 'Ground Elder', tag: 'Perennial',
      danger: 'high', dangerLabel: '🔴 High Threat',
      colour: '#4a8a4a',
      desc: 'Ground elder (Aegopodium podagraria) was introduced to Britain by the Romans as a medicinal herb and has been escaping into gardens ever since. It spreads by brittle white rhizomes that are almost impossible to remove completely from established beds, and it completely dominates the understorey where it becomes established.',
      id_text: 'Bright green, slightly glossy leaves divided into three leaflets, each leaflet often further divided, on hollow, ridged stems. The leaf shape is distinctive — like elder leaves but much smaller. White flat-topped umbel flowers in June–July. Underground white rhizomes, thinner than bindweed but equally brittle and regenerative.',
      spread: [
        { i:'🌿', t:'Rhizomes spread rapidly in all directions, forming dense mats that exclude all other plants' },
        { i:'✂', t:'Root fragments regenerate freely — the plant is impossible to eradicate by digging alone once established' },
        { i:'🌱', t:'Seeds spread to adjacent areas but most invasive spread is via rhizomes' },
      ],
      symptoms: [
        { i:'🌿', t:'Dense mats of bright green, divided leaves covering all bare soil under shrubs and in borders from April' },
        { i:'⬜', t:'Fine white rhizomes threading through soil and interlocking with roots of all plants in the area' },
        { i:'💐', t:'Flat-topped white umbel flowers appearing in June — if allowed to flower, seeds spread the problem further' },
      ],
      controls: {
        organic:    { title:'Sheet mulching for a full season', text:'Cover the entire affected area with cardboard and a 15cm mulch of bark or wood chip for a full growing season. This weakens but rarely eradicates. Repeat for a second season on severely affected areas. The roots can survive remarkably long periods in darkness.' },
        passive:    { title:'Remove flower heads before seeding', text:'At minimum, remove all flower heads before they set seed to prevent spread to new areas. This does not control existing plants but prevents the problem extending.' },
        mechanical: { title:'Fork out every fragment — repeatedly', text:'In early spring, fork out every white rhizome you can find before the plant gains momentum. Repeat every 2 weeks throughout the season. Where ground elder is entangled with the roots of shrubs, you may need to lift the shrub, wash the roots clean, and replant in cleaned ground.' },
        chemical:   { title:'Glyphosate in autumn', text:'Apply glyphosate to actively growing foliage in September when the plant is translocating nutrients to its roots — this timing maximises translocation of herbicide to the rhizomes. Multiple applications over 2+ seasons are typically needed to clear a well-established colony.' },
      }
    },
    {
      id: 'dock', icon: '🌱', name: 'Dock (Broad-leaved)', tag: 'Perennial',
      danger: 'medium', dangerLabel: '🟠 Medium Threat',
      colour: '#8a5a2a',
      desc: 'Broad-leaved dock (Rumex obtusifolius) and curly dock (R. crispus) produce a deep, fleshy taproot that is notoriously difficult to remove completely. Even a small fragment left in the ground will regenerate. The large basal rosette of leaves smothers other plants and a single plant can produce 60,000 seeds annually.',
      id_text: 'Large, broadly oval or oblong leaves (up to 25cm) with wavy or curly margins. The young leaves emerge rolled, tightly in spring. In summer, produces tall branching reddish-brown seed spikes up to 1.5m. The root is a deep, fleshy taproot, dark brown outside and yellowish inside. Even 3–5cm of root left in the ground regrows.',
      spread: [
        { i:'💨', t:'One plant produces up to 60,000 seeds per year. Seeds remain viable in soil for 50+ years' },
        { i:'🌱', t:'Root fragments regenerate — the root must be removed to at least 15–20cm below the surface' },
        { i:'🐦', t:'Seeds dispersed by birds, water, and in hay and manure' },
      ],
      symptoms: [
        { i:'🌿', t:'Large, bold rosette of broad oval leaves, frequently with a reddish midrib, emerging in spring' },
        { i:'🟤', t:'Tall reddish-brown seed spikes in summer — each must be removed before seeds ripen and fall' },
        { i:'🌱', t:'Regrowth from the crown after removal — the taproot rarely comes out complete on the first attempt' },
      ],
      controls: {
        organic:    { title:'Spade removal to full root depth', text:'Insert a long, thin spade or dock knife vertically alongside the root and lever out the complete taproot. The root must come out intact to at least 15cm. If it breaks, dig out every fragment. Repeat on all regrowth. Young docks in their first year are easy to remove — act immediately on seedlings.' },
        passive:    { title:'Remove seed heads before ripening', text:'Cut flower stalks before seeds ripen (while still green) every year to reduce the seed bank over time. A single missed seed spike sets the population back years. This is the most important passive measure.' },
        mechanical: { title:'Dock knife or long-bladed spade', text:'A purpose-made dock knife or daisy grubber allows you to extract the full taproot with minimal soil disturbance. Work vertically alongside the root — never try to pull by the leaves as the root almost always breaks. Rock the tool to loosen before lifting.' },
        chemical:   { title:'Glyphosate or spot treatment', text:'Apply glyphosate directly to the leaves only (avoiding other plants) in summer when plants are actively growing. Alternatively, cut the top off the root at soil level and immediately apply concentrated glyphosate gel or liquid to the cut root surface — very effective.' },
      }
    },
    {
      id: 'creeping-thistle', icon: '💜', name: 'Creeping Thistle', tag: 'Perennial',
      danger: 'high', dangerLabel: '🔴 High Threat',
      colour: '#7a3a7a',
      desc: 'Creeping thistle (Cirsium arvense) is a declared injurious weed under the Weeds Act 1959 — occupiers of land are legally obliged to prevent it spreading to neighbouring agricultural land. It spreads both by seed (thousands per plant) and by deep horizontal roots that can extend 6 metres in a season.',
      id_text: 'Deeply lobed, spiny green leaves on upright stems, but without the prominent wing and spines along the stem of spear thistle. Pale purple flowers in flat-topped clusters June–September. Unlike spear thistle, the stems are not heavily winged. Underground root system is deep and horizontal, cream-coloured, sending up new shoots at intervals.',
      spread: [
        { i:'💨', t:'Each plant produces thousands of plumed seeds (like dandelion clocks) that travel on wind for miles' },
        { i:'🌱', t:'Horizontal roots extend 6m in a season and produce new shoots along their length' },
        { i:'📜', t:'A notifiable injurious weed — you are legally required to prevent spread to neighbouring land' },
      ],
      symptoms: [
        { i:'💜', t:'Pale purple thistle flowers in flat-topped clusters June–September — fluffy seed heads follow' },
        { i:'🌿', t:'Spiny-leaved shoots emerging from bare soil, often at some distance from any visible parent plant' },
        { i:'⬜', t:'Pale cream horizontal roots visible when digging, each producing new shoots along their length' },
      ],
      controls: {
        organic:    { title:'Persistent cutting before flowering', text:'Cut all top growth at soil level every 3–4 weeks throughout the growing season for 2+ years. Never allow plants to flower and set seed. This gradually depletes root reserves if done consistently. Young seedlings are easy to hoe off — act immediately when they emerge.' },
        passive:    { title:'Mulch and smother', text:'A thick mulch of cardboard and bark over cleared ground suppresses regrowth during the season. Most effective as part of a longer-term programme. Never allow seeding under any circumstances — each seed head disperses to neighbouring land and creates a legal problem.' },
        mechanical: { title:'Fork out complete root system', text:'In autumn, fork out the root system deeply and systematically. The roots are brittle and each broken piece regrows, so work carefully. Shake soil from roots and remove every fragment from the bed. Burn or bin — never compost creeping thistle roots or seeding material.' },
        chemical:   { title:'Glyphosate or MCPA/2,4-D', text:'Glyphosate applied in July–August (when the plant is flowering and has maximum energy reserves in its roots) gives the best translocation. Repeat in late September. Selective lawn herbicides containing MCPA or 2,4-D kill thistles in grass without harming the sward.' },
      }
    },
    {
      id: 'horsetail', icon: '🪄', name: 'Horsetail', tag: 'Perennial',
      danger: 'high', dangerLabel: '🔴 High Threat',
      colour: '#5a7a5a',
      desc: 'Field horsetail (Equisetum arvense) is a living fossil — essentially unchanged since the Carboniferous period. Its roots can extend 2 metres deep, making it entirely immune to normal cultivation. It is one of the most difficult of all garden weeds to control and thrives on poor drainage.',
      id_text: 'The non-fertile vegetative shoots are the familiar form — jointed, bright green, with whorls of small branches at each node, giving a bottle-brush or Christmas tree appearance. Separate spore-bearing shoots appear in spring, pale brown and cone-tipped. The roots are deep black rhizomes with tuber-like swellings at intervals.',
      spread: [
        { i:'🌿', t:'Rhizomes extend to 2m depth — entirely beyond the reach of any cultivation or forking' },
        { i:'💨', t:'Spores released in spring from separate fertile shoots — but most spread is vegetative via rhizomes' },
        { i:'💧', t:'Thrives on poorly-drained ground — improving drainage reduces vigour significantly' },
      ],
      symptoms: [
        { i:'🪄', t:'Distinctive bright green bottle-brush shoots from April — jointed stems with whorls of branches' },
        { i:'🟤', t:'Pale brown cone-tipped fertile shoots in early spring before the vegetative shoots appear' },
        { i:'💧', t:'Particularly vigorous on waterlogged or compacted soil — appearance often indicates a drainage problem' },
      ],
      controls: {
        organic:    { title:'Repeated cutting over many years', text:'Cut all growth at soil level every time it appears. This does not eradicate but gradually weakens plants over many years. In a vegetable garden, consistent cutting through the growing season is the main practical organic strategy. Never compost horsetail — the silica-rich stems take a very long time to break down.' },
        passive:    { title:'Improve drainage above all else', text:'Horsetail thrives on compacted, poorly-drained, slightly acid soil. Improving drainage by installing land drains, raised beds, or by deep cultivation and adding organic matter significantly reduces its vigour over time. Lime to raise soil pH — horsetail prefers acid conditions.' },
        mechanical: { title:'Crush shoots before cutting', text:'Horsetail stems are coated in silica which deflects herbicides. Crush or bruise all stems thoroughly before applying any treatment. The silica coating is why standard weedkillers have poor effectiveness unless the physical barrier is broken first.' },
        chemical:   { title:'Glyphosate — crush first', text:'Apply glyphosate after crushing or bruising stems to break the silica barrier. Multiple applications are needed over several seasons. Some sources suggest applying in late summer/autumn when the plant is translocating to roots. Results are slow and incomplete — no single herbicide reliably eradicates established horsetail.' },
      }
    },
    {
      id: 'creeping-buttercup', icon: '🌼', name: 'Creeping Buttercup', tag: 'Perennial',
      danger: 'medium', dangerLabel: '🟠 Medium Threat',
      colour: '#c8a820',
      desc: 'Creeping buttercup (Ranunculus repens) thrives in damp, compacted soil and spreads rapidly by rooting runners that can colonise large areas in a single season. While less damaging than bindweed or ground elder, it forms dense mats that suppress other plants and is an indicator of poor drainage and compaction.',
      id_text: 'Dark green, three-lobed leaves with a silvery-white blotch in the centre of each leaf — this central blotch is the most reliable identification feature. Bright yellow, glossy flowers with five petals. Spreading by runners (stolons) that root at nodes, similar to strawberry runners. Roots from nodes on runners when in contact with soil.',
      spread: [
        { i:'🌿', t:'Runners (stolons) spread horizontally, rooting at nodes — one plant can cover a large area in one season' },
        { i:'🌱', t:'Seeds also produced in abundance — remain viable in soil for 20+ years' },
        { i:'💧', t:'Thrives in wet, compacted soil — indicator species for drainage problems' },
      ],
      symptoms: [
        { i:'🌼', t:'Dense mats of three-lobed, dark green leaves with distinctive pale central blotch, spreading across beds and lawns' },
        { i:'🌿', t:'Bright yellow, glossy 5-petalled flowers appearing from April — highly visible and attractive' },
        { i:'🌱', t:'Long, rooting runners spreading in all directions from the parent plant at soil surface' },
      ],
      controls: {
        organic:    { title:'Fork out including runners', text:'Fork out the entire plant including all runners, following each back to where it roots. In spring, before runners develop, plants are easy to remove whole. Work methodically across affected areas and revisit monthly.' },
        passive:    { title:'Improve drainage and aeration', text:'Creeping buttercup is an indicator of compaction and poor drainage. Improving these conditions by aerating lawns, adding organic matter, and installing drainage dramatically reduces its vigour and gives other plants the competitive advantage.' },
        mechanical: { title:'Regular hoeing on seedlings', text:'Hoe seedlings immediately on emergence — they are very easy to kill when small. Established plants need forking out complete with all runners. In lawns, scarifying to remove runners followed by re-seeding bare patches reduces populations significantly.' },
        chemical:   { title:'Selective lawn herbicide or glyphosate', text:'In lawns, a selective broad-leaved weed killer containing MCPA or mecoprop-p kills buttercup without harming grass. In beds, spot-treat with glyphosate applied carefully to individual plants in spring and summer.' },
      }
    },
    {
      id: 'japanese-knotweed', icon: '🎋', name: 'Japanese Knotweed', tag: 'Invasive — Legal Duty',
      danger: 'high', dangerLabel: '🔴 Notifiable Invasive',
      colour: '#c83a3a',
      desc: 'Japanese knotweed (Fallopia japonica) is the most invasive plant in the UK. It is illegal to cause it to grow in the wild (Wildlife and Countryside Act 1981). Mortgage lenders frequently refuse lending on properties where it is present. It can grow through concrete and tarmac and requires specialist treatment. If you find this plant, treat it as a serious emergency.',
      id_text: 'Hollow bamboo-like stems with distinctive purple-red nodes (joints). Shovel-shaped, broadly heart-based bright green leaves up to 12cm. Small creamy-white flowers in clusters from late July. Leaves emerge rolled and red-tinged in spring, quickly expanding. New growth can reach 3m in a season. Red-pink shoots in early spring are the first sign of re-emergence.',
      spread: [
        { i:'⚠', t:'Illegal to cause to grow in the wild — even soil containing rhizome fragments must be treated as controlled waste' },
        { i:'🌱', t:'A 0.8g fragment of rhizome or 1cm of stem can regenerate a new plant — disposal to landfill requires specialist carrier' },
        { i:'🏠', t:'Can penetrate building foundations, paths, and drainage — a notifiable issue for mortgage lenders and property sales' },
      ],
      symptoms: [
        { i:'🎋', t:'Hollow bamboo-like stems with purple-spotted nodes, growing with extraordinary speed from late spring' },
        { i:'🌿', t:'Dense thickets of shovel-shaped leaves — standing vegetation in winter consists of hollow brown dead canes' },
        { i:'🌸', t:'Creamy-white flower clusters in late July–August — highly attractive to bees' },
      ],
      controls: {
        organic:    { title:'No effective organic control', text:'There is no reliable organic method for knotweed. Cutting stimulates root growth. Professional treatment is strongly recommended.' },
        passive:    { title:'Do not disturb — call a professional first', text:'Do not dig, cut, strim, or rotavate without taking professional advice. Any disturbance spreads fragments. Document the infestation, map its extent, and take professional advice before acting.' },
        mechanical: { title:'Do not dig or rotavate', text:'Digging spreads rhizome fragments and makes the problem significantly worse. Cutting back stimulates vigorous regrowth. The only physical intervention that can help is stem injection, which must be done correctly by a licensed contractor.' },
        chemical:   { title:'Glyphosate — professional programme (3–5 years)', text:'Repeated glyphosate treatment over 3–5 years, applied by injection into stems or as foliar spray in late summer, is the standard approach. This must be done consistently and professionally to achieve control. Certified contractors offer insurance-backed treatment programmes. A notifiable invasive — check PCA (Property Care Association) for registered contractors.' },
      }
    },
  ],
  annual: [
    {
      id: 'fat-hen', icon: '🌿', name: 'Fat Hen', tag: 'Annual',
      danger: 'medium', dangerLabel: '🟠 Medium Threat',
      colour: '#5a8a5a',
      desc: 'Fat hen (Chenopodium album) is one of the most prolific seed-producing weeds in the garden, producing up to 70,000 seeds per plant. It germinates repeatedly throughout the growing season, thrives on fertile, disturbed soil, and is a constant presence in vegetable beds. Historically it was eaten as a vegetable — the leaves are edible and nutritious.',
      id_text: 'Upright stems with mealy-grey-white coating on young leaves and growing tips. Diamond or rhombus-shaped leaves, wavy-toothed, pale grey-green. Clusters of small green flowers on spikes. Grows quickly to 60–100cm in fertile soil. The characteristic mealy coating on new growth is the most reliable identification feature.',
      spread: [
        { i:'🌱', t:'Each plant produces up to 70,000 seeds that remain viable in soil for 40+ years' },
        { i:'🔄', t:'Germinates in flushes throughout the growing season — hoe off one generation and another soon follows' },
        { i:'🌾', t:'The seeds are dispersed in compost, manure, and on clothing' },
      ],
      symptoms: [
        { i:'🌿', t:'Fast-growing upright plants with mealy-coated new growth appearing repeatedly through the season in vegetable beds' },
        { i:'💚', t:'Diamond-shaped, pale grey-green leaves — young plants have an unmistakable silvery-grey cast on the growing tip' },
        { i:'🌾', t:'Green flower spikes that develop seed rapidly — each plant can go from seedling to mature seed in 6–8 weeks' },
      ],
      controls: {
        organic:    { title:'Hoe before the white thread stage', text:'Hoe seedlings immediately when tiny — at the "white thread" stage before the first leaf fully opens. A sharp Dutch hoe used in dry weather kills seedlings in minutes. Do not hoe in wet weather or they will re-root. This is the most effective and labour-efficient approach.' },
        passive:    { title:'False seedbed technique', text:'Prepare the bed 2–3 weeks before sowing, allow fat hen to germinate, then hoe off the first flush before sowing your crop. This removes a large portion of the weed seed bank in the top few centimetres and gives your crop a head start.' },
        mechanical: { title:'Mulching and close spacing', text:'A 5–7cm mulch of compost or bark between established plants suppresses germination. Dense planting of crops that quickly cover the ground also suppresses fat hen effectively once the crop canopy closes.' },
        chemical:   { title:'Pre-emergence herbicides', text:'Some pre-emergence residual herbicides can be used on certain vegetable crops to prevent fat hen germination. Always check the specific product label for approved crops. Post-emergence: very susceptible to contact herbicides before the 4-leaf stage.' },
      }
    },
    {
      id: 'chickweed', icon: '⭐', name: 'Chickweed', tag: 'Annual',
      danger: 'low', dangerLabel: '🟢 Low Threat',
      colour: '#6a9a6a',
      desc: 'Common chickweed (Stellaria media) is one of the most ubiquitous weeds in temperate gardens. It is entirely non-aggressive and easy to control, but germinates virtually year-round in mild weather (including through winter) and can form a dense smothering mat over seedbeds and established beds if left uncontrolled.',
      id_text: 'Low-growing, spreading plants with oval, pointed, bright green leaves. A distinctive single line of fine white hairs runs along one side of the stem only — alternating sides at each node. Tiny white star-shaped flowers with 5 deeply-notched petals that look like 10. Soft, brittle stems. Entirely edible — a mild, fresh-tasting salad leaf and traditional poultry feed.',
      spread: [
        { i:'🌱', t:'Multiple generations per year — germinates in autumn, grows through mild winters, and sets seed rapidly in spring' },
        { i:'⭐', t:'Each plant produces 2,500–15,000 seeds that remain viable for 25+ years' },
        { i:'🔄', t:'The most winter-active annual weed — forms dense mats over bare soil through mild winters' },
      ],
      symptoms: [
        { i:'⭐', t:'Dense, spreading mats of soft-stemmed, bright green low-growing plants covering bare soil — particularly in winter' },
        { i:'💚', t:'Tiny white star-like flowers visible almost year-round in mild spells' },
        { i:'🌱', t:'Very rapid growth in cool, moist conditions — can cover a seed bed in a week of mild wet weather' },
      ],
      controls: {
        organic:    { title:'Hoe or hand-pull — very easy to control', text:'Chickweed is one of the easiest weeds to control — a single pass with a Dutch hoe kills it immediately in dry weather. Hand pulling is equally effective. Act before it flowers and sets seed. Do not leave pulled plants on the surface in wet weather as they re-root easily.' },
        passive:    { title:'Cover bare soil over winter', text:'Chickweed thrives on bare winter soil. Cover empty beds with a green manure, mulch, or polythene to remove the germination opportunity. Well-mulched beds have dramatically less chickweed.' },
        mechanical: { title:'Regular hoeing between crops', text:'A weekly or fortnightly hoe between growing crops eliminates chickweed before it can set seed. In a seedbed, hoe on a dry day and leave the killed plants on the surface — they shrivel in sun and wind without re-rooting.' },
        chemical:   { title:'Rarely warranted — easy to control by hand', text:'Chemical control is almost never necessary for chickweed as it responds so readily to physical methods. Contact herbicides kill it instantly if required for large infestations in paths or hard areas.' },
      }
    },
    {
      id: 'groundsel', icon: '🌼', name: 'Groundsel', tag: 'Annual',
      danger: 'low', dangerLabel: '🟢 Low Threat',
      colour: '#c8a820',
      desc: 'Groundsel (Senecio vulgaris) germinates almost year-round in mild conditions and goes from seed to setting seed again in as little as 5–6 weeks in summer. This rapid life cycle means it can complete multiple generations per season. The fluffy dandelion-clock-like seed heads are visible even in mid-winter.',
      id_text: 'Small, upright or sprawling plants 15–30cm. Leaves are deeply lobed with blunt, irregular teeth, slightly succulent. Small cylindrical yellow flower heads that never fully open (the petals are usually absent) with a black tip on each bract — the most reliable identification feature. Fluffy dandelion-clock-like seed heads appear within a week of flowering.',
      spread: [
        { i:'💨', t:'Fluffy plumed seeds dispersed by wind — a single plant can produce 1,000+ seeds' },
        { i:'🔄', t:'5–6 week lifecycle from seed to seed in summer — multiple generations per year' },
        { i:'🌡', t:'Germinates in almost any season including mild winters — one of the most year-round annual weeds' },
      ],
      symptoms: [
        { i:'🌼', t:'Small cylindrical yellow flower heads with distinctive black-tipped bracts — never fully open' },
        { i:'💨', t:'Fluffy white seed heads present almost year-round — visible in winter during mild spells' },
        { i:'🌿', t:'Lobed, slightly fleshy leaves on plants from 10–30cm in vegetable beds, paths and borders' },
      ],
      controls: {
        organic:    { title:'Remove before seed sets — urgently', text:'The priority with groundsel is to remove plants before the fluffy seed heads form — this happens very quickly after flowering. Hoe off or hand-pull immediately. Do not leave pulled plants on the surface if seeds have formed as they continue to ripen.' },
        passive:    { title:'Mulch bare soil', text:'Groundsel needs light to germinate and a firm seedbed. A 5cm bark mulch or close crop spacing suppresses germination effectively. False seedbed preparation before sowing crops eliminates the first flush.' },
        mechanical: { title:'Regular shallow hoeing', text:'A sharp Dutch hoe used regularly between crops eliminates groundsel when it is tiny. The shallow-rooted plants sever cleanly from the soil surface and die rapidly in dry conditions. Hoe in dry weather for best results.' },
        chemical:   { title:'Contact herbicide if urgent', text:'Groundsel is susceptible to contact herbicides in paths and hard areas. In vegetable beds, physical removal is almost always preferable.' },
      }
    },
    {
      id: 'hairy-bittercress', icon: '💨', name: 'Hairy Bittercress', tag: 'Annual',
      danger: 'medium', dangerLabel: '🟠 Medium Threat',
      colour: '#7a9a7a',
      desc: 'Hairy bittercress (Cardamine hirsuta) is perhaps the most explosive seed-dispersal mechanism in the garden — ripe seed pods snap open at the slightest touch (or on a warm sunny day without any contact) and fire seeds up to a metre away. One mature plant rapidly becomes fifty.',
      id_text: 'Low rosette of small, rounded to oval leaflets on a central stalk, dark green, slightly hairy. Tiny white cross-shaped flowers on upright stems. The ripe seed pods (siliques) stand vertically, green then cream, and visibly tense before exploding. Grows to about 15–20cm when flowering. Common year-round, especially in pots and seed trays.',
      spread: [
        { i:'💥', t:'Explosive seed pods fire seeds up to 1 metre away when ripe — touching a mature plant scatters seeds instantly' },
        { i:'🔄', t:'Multiple generations per year — from seed to seeding in as little as 4 weeks in warm weather' },
        { i:'🪴', t:'Extremely common in pots and seed trays where conditions perfectly suit germination' },
      ],
      symptoms: [
        { i:'💨', t:'Small, dark green leaf rosettes appearing in pots, seed trays, and bare soil throughout the year' },
        { i:'💥', t:'Ripe vertical seed pods that fire seeds at the slightest touch — handle carefully when removing' },
        { i:'⬜', t:'Tiny white cross-shaped flowers followed rapidly by upright green seed pods' },
      ],
      controls: {
        organic:    { title:'Remove before any seed pods form — carefully', text:'Remove plants before seed pods develop. Once pods are visible, move plants with extreme care — even carrying to the compost can scatter seeds along the path. Do not shake or brush the plant. Bag up before removing if in flower.' },
        passive:    { title:'Mulch pots and beds', text:'A thin layer of grit or bark mulch on pot surfaces and beds prevents germination very effectively. Particularly valuable in the greenhouse and polytunnel where bittercress thrives year-round.' },
        mechanical: { title:'Hoe immediately on emergence', text:'Hoe off at the tiny seedling stage — this is the window before seed pods develop. Once pods are visible, hoeing is counterproductive as it scatters seeds. Timing of intervention is everything with this weed.' },
        chemical:   { title:'Rarely necessary', text:'Hairy bittercress is so quick-growing that chemical treatment is usually overtaken by events. Contact herbicide in paths and paving is the main use. In beds, physical removal before seeding is the correct approach.' },
      }
    },
    {
      id: 'shepherds-purse', icon: '♥', name: "Shepherd's Purse", tag: 'Annual',
      danger: 'low', dangerLabel: '🟢 Low Threat',
      colour: '#8a8a5a',
      desc: "Shepherd's purse (Capsella bursa-pastoris) is named after its distinctive heart-shaped seed pods, which resemble the purses once carried by shepherds. One of the most widespread annual weeds worldwide, it germinates year-round and sets seed prolifically, but is easy to control with regular hoeing.",
      id_text: "A basal rosette of lobed or toothed leaves at ground level, from which a flowering stem rises to 30–40cm. Tiny white four-petalled flowers at the top of the stem, with distinctive flat, triangular-to-heart-shaped seed pods developing below them. The heart-shaped pods are unmistakable once seen. Active throughout the year including winter.",
      spread: [
        { i:'♥', t:'Each plant produces 3,000–4,000 seeds that remain viable in soil for 35 years' },
        { i:'🔄', t:"Germinates in any season — one of the most year-round annual weeds alongside chickweed" },
        { i:'🌱', t:'Seeds also spread in soil, compost, and via birds and small mammals' },
      ],
      symptoms: [
        { i:'♥', t:"Distinctive flat, triangular-heart-shaped seed pods on upright stems — the unmistakable identification feature" },
        { i:'🌿', t:'Basal rosettes of lobed leaves in vegetable beds, borders, and paths year-round' },
        { i:'⬜', t:'Tiny white flowers on upright stems 20–40cm — both flowers and ripe pods present simultaneously' },
      ],
      controls: {
        organic:    { title:'Easy to hoe or pull', text:"Shepherd's purse is shallow-rooted and responds readily to hoeing at the seedling stage. Pull or hoe before seed pods develop — the plants come out cleanly with minimal soil disturbance. Very satisfying to control." },
        passive:    { title:'Mulch and close crop spacing', text:'A bark or compost mulch suppresses germination effectively. Close planting that creates a crop canopy quickly is also effective — shepherd\'s purse needs light to germinate and establish.' },
        mechanical: { title:'Regular hoeing in dry conditions', text:'Hoe on a dry day and the plants shrivel rapidly on the surface. Do not hoe in wet weather — the plants re-root. Use a sharp Dutch hoe for the most efficient kill rate.' },
        chemical:   { title:'Rarely needed', text:"Shepherd's purse is so easily controlled physically that chemical treatment is almost never required. Contact herbicide in paths only if very heavy infestations develop." },
      }
    },
    {
      id: 'annual-meadow-grass', icon: '🌾', name: 'Annual Meadow Grass', tag: 'Annual',
      danger: 'low', dangerLabel: '🟢 Low Threat',
      colour: '#7a9a5a',
      desc: 'Annual meadow grass (Poa annua) is the most widespread grass weed in UK gardens, found in every lawn, vegetable bed, path, and crack in paving. It germinates year-round, grows in almost any condition, and flowers and sets seed even when mown very short. Despite this, it is shallow-rooted and easy to control.',
      id_text: 'Low-growing grass with flat, bright green, slightly shiny, blunt-tipped leaves. Triangular or pyramid-shaped open seed heads with spreading branches — present almost year-round. Much lighter green than couch grass and entirely lacking rhizomes. Shallow fibrous root system pulls out easily. Usually less than 20cm unless in unmown areas.',
      spread: [
        { i:'🌾', t:'Seeds prolifically year-round — even mown plants at 5mm produce seed heads' },
        { i:'💧', t:'Seeds spread in soil, water, on boots, and in grass clippings' },
        { i:'🔄', t:'Annual but germinates at almost any time of year — no true dormant season' },
      ],
      symptoms: [
        { i:'🌾', t:'Light green, flat-leaved grass with pyramid-shaped pale seed heads present in beds, lawns, and paths year-round' },
        { i:'🌱', t:'Dense patches of pale green grass in vegetable beds and between crop rows' },
        { i:'🚶', t:'Immediately identifiable in lawns by its lighter green colour and coarser texture compared to fine lawn grasses' },
      ],
      controls: {
        organic:    { title:'Hoe or hand-pull before seeding', text:'Annual meadow grass is shallow-rooted and comes out easily. Hoe between crops regularly. In vegetable beds, plants should be removed before they can set seed. The key is timing — act before seed heads develop.' },
        passive:    { title:'Dense sowing and mulching', text:'Dense crop sowing that creates a closed canopy quickly suppresses annual meadow grass effectively. Mulching bare soil between plants prevents germination.' },
        mechanical: { title:'Regular hoeing or scarifying', text:'In lawns, regular scarifying removes the thatch and reduces annual meadow grass. In beds, a sharp hoe used regularly is entirely effective. The shallow roots make physical removal very easy.' },
        chemical:   { title:'Selective grass killers in specific situations', text:'In ornamental beds (not vegetable beds), selective grass-killer herbicides (fluazifop) kill grass weeds without harming broad-leaved plants. Not approved for use near vegetables.' },
      }
    },
    {
      id: 'cleavers', icon: '🪢', name: 'Cleavers (Goosegrass)', tag: 'Annual',
      danger: 'medium', dangerLabel: '🟠 Medium Threat',
      colour: '#5a7a4a',
      desc: "Cleavers (Galium aparine) — also known as goosegrass, stickyweed, or sticky willy — are the plant everyone has thrown at each other's backs on childhood walks. In the garden they climb vigorously through other plants, smothering them, and produce thousands of seeds that cling tenaciously to clothing, animal fur, and garden fleece.",
      id_text: "Scrambling, climbing stems with distinctive whorls of 6–8 narrow leaves at each node, all covered in tiny downward-hooked bristles that cling to anything they touch. Tiny white four-petalled star-like flowers followed by paired round fruits densely covered in hooked bristles. Stems can reach 1.5m when supported by other plants.",
      spread: [
        { i:'🪢', t:'Seeds cling to clothing, fleece, fur, and feathers — spread widely by animals and people' },
        { i:'🌱', t:'Each plant produces hundreds of sticky seeds that remain viable for 3–6 years' },
        { i:'🧵', t:'Clinging stems tangle through netting and fleece making removal very difficult in some situations' },
      ],
      symptoms: [
        { i:'🪢', t:'Scrambling, sticky-haired stems climbing through and over other plants from March onwards' },
        { i:'🌿', t:'Whorls of 6–8 narrow leaves at each node — the sticky texture is immediately obvious on contact' },
        { i:'🟤', t:'Pairs of round, hooked burrs clinging to clothing, fleece netting, and plant hairs at maturity' },
      ],
      controls: {
        organic:    { title:'Pull before it sets seed — young plants easy', text:'Young cleavers in spring are easy to pull out whole before they can anchor their climbing stems through other plants. Act in February–March before they grow into the crop canopy. Once entangled in established plants, removal causes significant crop disturbance.' },
        passive:    { title:'Avoid introducing seeds on clothing and equipment', text:'Cleavers seeds travel on clothes, pets, and tools. Check clothes before entering the kitchen garden in spring. Clean tools before moving between beds. The sticky fruits are unmistakable once you know them.' },
        mechanical: { title:'Cut at base before seeding', text:'If too entangled to pull without damaging crops, cut the stems at soil level. This kills the plant (it is annual) and prevents seeding, though the dead stems remain tangled in the crop. Remove dead material carefully.' },
        chemical:   { title:'Glyphosate in paths', text:'Contact or systemic herbicides for paths and non-crop areas. In vegetable beds, physical removal is the correct approach — cleavers are easily managed if tackled at the young stage in early spring.' },
      }
    },
  ],
};

// ── RENDER WEED GUIDE ─────────────────────────────────────────────────────

function renderWeedGuide() {
  const tabs = document.getElementById('weedTabs');
  if (!tabs) return;
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('[data-weed-cat]');
    if (!btn) return;
    document.querySelectorAll('#weedTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    weedShowCat(btn.dataset.weedCat);
  });
  weedShowCat('perennial');
}

function weedShowCat(cat) {
  const cards  = document.getElementById('weedCards');
  const detail = document.getElementById('weedDetail');
  if (detail) detail.style.display = 'none';
  if (!cards) return;
  cards.style.display = 'grid';
  const list = WEED_DATA[cat] || [];
  cards.innerHTML = list.map(w => {
    const photoUrl = WEED_PHOTOS[w.id];
    const photoHtml = photoUrl
      ? `<div class="pcard-photo-wrap"><img class="pcard-photo" src="${photoUrl}" alt="${w.name}" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()"></div>`
      : `<div class="pcard-photo-wrap" style="background:linear-gradient(135deg,${w.colour}cc,${w.colour}66);display:flex;align-items:center;justify-content:center;font-size:3rem">${w.icon}</div>`;
    return `
      <div class="pcard" role="button" tabindex="0" data-weed-id="${w.id}"
           onclick="weedOpenDetail('${cat}','${w.id}')"
           onkeydown="if(event.key==='Enter'||event.key===' ')weedOpenDetail('${cat}','${w.id}')">
        ${photoHtml}
        <div class="pcard-tag">${w.tag}</div>
        <div class="pcard-name">${w.name}</div>
        <div class="pcard-desc">${w.desc.substring(0,88)}…</div>
        <div class="pcard-meta" style="margin-top:0.4rem">
          <span>🔬 Tap to identify</span>
        </div>
        <div style="margin-top:0.5rem"><span class="weed-danger-badge ${w.danger}">${w.dangerLabel}</span></div>
      </div>`;
  }).join('');
}

function weedOpenDetail(cat, id) {
  const cards  = document.getElementById('weedCards');
  const detail = document.getElementById('weedDetail');
  const inner  = document.getElementById('weedDetailInner');
  if (!detail || !inner) return;
  const w = (WEED_DATA[cat] || []).find(x => x.id === id);
  if (!w) return;
  cards.style.display  = 'none';
  detail.style.display = 'block';
  detail.dataset.weedId = id;

  const photoUrl = WEED_PHOTOS[id];
  const photoHtml = photoUrl
    ? `<div class="detail-photo-wrap"><img class="detail-photo" src="${photoUrl}" alt="${w.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="detail-photo-fallback" style="display:none">${w.icon}</span></div>`
    : `<div class="detail-photo-wrap" style="background:linear-gradient(135deg,${w.colour}cc,${w.colour}55)"><span class="detail-photo-fallback">${w.icon}</span></div>`;

  let sN = 0; const hn = () => String(++sN).padStart(2,'0');

  inner.innerHTML = `
    <div class="detail-sidebar">
      ${photoHtml}
      <div class="detail-tag">${w.tag}</div>
      <h2 class="detail-title">${w.name}</h2>
      <div class="detail-latin">${w.tag === 'Annual' ? 'Annual Weed' : 'Perennial Weed'}</div>
      <div style="margin-bottom:1rem"><span class="weed-danger-badge ${w.danger}">${w.dangerLabel}</span></div>
      <div class="detail-stats">
        <div class="dstat dstat--sow"><span class="dstat-label">⚠ Threat</span><span class="dstat-val">${w.dangerLabel.replace(/^.+ /,'')}</span></div>
        <div class="dstat"><span class="dstat-label">Type</span><span class="dstat-val">${w.tag}</span></div>
        <div class="dstat"><span class="dstat-label">Controls</span><span class="dstat-val">4 methods</span></div>
      </div>
    </div>
    <div class="detail-body">
      <h3>${hn()} — About</h3>
      <p>${w.desc}</p>

      <h3>${hn()} — How to Identify</h3>
      <p>${w.id_text}</p>

      <h3>${hn()} — How It Spreads</h3>
      <div class="tools-feature-list">
        ${w.spread.map(s => `<div class="tools-feature-item"><span class="tfi">${s.i}</span><span>${s.t}</span></div>`).join('')}
      </div>

      <h3>${hn()} — Symptoms &amp; Signs on Your Plot</h3>
      <div class="pest-symptom-list">
        ${w.symptoms.map(s => `<div class="pest-symptom-item"><span class="pest-symptom-icon">${s.i}</span><span>${s.t}</span></div>`).join('')}
      </div>

      <h3>${hn()} — How to Control</h3>
      <div class="pest-control-block">
        <div class="pest-control-row">
          <span class="pest-control-badge organic">🌿 Organic</span>
          <div class="pest-control-text"><strong>${w.controls.organic.title}</strong>${w.controls.organic.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge passive">🤝 Passive</span>
          <div class="pest-control-text"><strong>${w.controls.passive.title}</strong>${w.controls.passive.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge mechanical">🔧 Mechanical</span>
          <div class="pest-control-text"><strong>${w.controls.mechanical.title}</strong>${w.controls.mechanical.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge chemical">⚗️ Chemical</span>
          <div class="pest-control-text"><strong>${w.controls.chemical.title}</strong>${w.controls.chemical.text}</div>
        </div>
      </div>
    </div>`;

  document.getElementById('weeds').scrollIntoView({ behavior:'smooth', block:'start' });
}

function weedBack() {
  const cards  = document.getElementById('weedCards');
  const detail = document.getElementById('weedDetail');
  if (cards)  cards.style.display  = 'grid';
  if (detail) detail.style.display = 'none';
}

// ══════════════════════════════════════════════
// PLANT DISEASES
// ══════════════════════════════════════════════

const DISEASE_WIKI = {
  'blight':           'Phytophthora_infestans',
  'powdery-mildew':   'Powdery_mildew',
  'downy-mildew':     'Downy_mildew',
  'rust':             'Rust_(fungus)',
  'botrytis':         'Botrytis_cinerea',
  'sclerotinia':      'Sclerotinia_sclerotiorum',
  'canker':           'Neonectria_ditissima',
  'peach-leaf-curl':  'Taphrina_deformans',
  'damping-off':      'Damping_off',
  'fusarium':         'Fusarium_oxysporum',
  'bacterial-canker': 'Pseudomonas_syringae',
  'fire-blight':      'Erwinia_amylovora',
  'mosaic-virus':     'Tobacco_mosaic_virus',
  'clubroot':         'Plasmodiophora_brassicae',
  'white-rot':        'Sclerotium_cepivorum',
  'onion-white-rot':  'Sclerotium_cepivorum',
  'violet-root-rot':  'Helicobasidium_purpureum',
};

// Direct Wikimedia Commons overrides — applied after API fetch, always win.
// Use Special:FilePath stable redirects (no ?width= param — breaks the redirect).
const DISEASE_PHOTO_OVERRIDES = {
  'canker':     'https://commons.wikimedia.org/wiki/Special:FilePath/Neonectria_ditissima_Apple_canker_2012.jpg',
  'white-rot':  'https://commons.wikimedia.org/wiki/Special:FilePath/Allium_sativum_-_White_rot_(Stromatinia_cepivora)_-_Elizabeth_Bush.jpg',
  'onion-white-rot': 'https://commons.wikimedia.org/wiki/Special:FilePath/Allium_sativum_-_White_rot_(Stromatinia_cepivora)_-_Elizabeth_Bush.jpg',
};
const DISEASE_PHOTOS = {};

async function fetchDiseasePhotos() {
  const ids = Object.keys(DISEASE_WIKI);
  try {
    const titles = ids.map(id => DISEASE_WIKI[id]);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=pageimages&format=json&pithumbsize=600&origin=*&redirects=1`;
    const resp = await fetch(url);
    const data = await resp.json();
    const chain = {};
    for (const t of titles) chain[t.replace(/_/g,' ').toLowerCase()] = t.replace(/_/g,' ').toLowerCase();
    for (const n of (data.query.normalized||[])) { chain[n.from.replace(/_/g,' ').toLowerCase()] = n.to.toLowerCase(); for (const k in chain) if (chain[k]===n.from.replace(/_/g,' ').toLowerCase()) chain[k]=n.to.toLowerCase(); }
    for (const r of (data.query.redirects||[])) { chain[r.from.toLowerCase()] = r.to.toLowerCase(); for (const k in chain) if (chain[k]===r.from.toLowerCase()) chain[k]=r.to.toLowerCase(); }
    const finalToId = {};
    for (const id of ids) { const orig=DISEASE_WIKI[id].replace(/_/g,' ').toLowerCase(); finalToId[chain[orig]||orig]=id; }
    for (const page of Object.values(data.query.pages)) {
      if (!page.thumbnail) continue;
      const matchId = finalToId[page.title.toLowerCase()];
      if (matchId) DISEASE_PHOTOS[matchId] = page.thumbnail.source;
    }
    const detail = document.getElementById('diseaseDetail');
    if (detail && detail.style.display !== 'none') {
      const pid = detail.dataset.diseaseId;
      if (pid && DISEASE_PHOTOS[pid]) {
        const wrap = detail.querySelector('.detail-photo-wrap');
        if (wrap && !wrap.querySelector('img')) {
          const fb = wrap.querySelector('.detail-photo-fallback');
          const img = document.createElement('img');
          img.className = 'detail-photo'; img.src = DISEASE_PHOTOS[pid]; img.alt = '';
          img.onerror = function(){ this.style.display='none'; if(fb) fb.style.display='block'; };
          if (fb) { wrap.insertBefore(img, fb); fb.style.display='none'; }
          else wrap.prepend(img);
        }
      }
    }
    const cards = document.getElementById('diseaseCards');
    if (cards && cards.style.display !== 'none') {
      cards.querySelectorAll('[data-disease-id]').forEach(card => {
        const did = card.dataset.diseaseId;
        const wrap = card.querySelector('.pcard-photo-wrap');
        if (wrap && DISEASE_PHOTOS[did] && !wrap.querySelector('img')) {
          wrap.innerHTML = `<img class="pcard-photo" src="${DISEASE_PHOTOS[did]}" alt="" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()">`;
        }
      });
    }
  } catch(e) {}

  // Apply direct Commons overrides — always win over API results
  for (const [did, url] of Object.entries(DISEASE_PHOTO_OVERRIDES)) {
    DISEASE_PHOTOS[did] = url;
  }

  // Re-render any visible cards and detail panel with overridden photos
  const cards2 = document.getElementById('diseaseCards');
  if (cards2 && cards2.style.display !== 'none') {
    cards2.querySelectorAll('[data-disease-id]').forEach(card => {
      const did = card.dataset.diseaseId;
      if (!DISEASE_PHOTO_OVERRIDES[did]) return;
      const wrap = card.querySelector('.pcard-photo-wrap');
      if (wrap) {
        wrap.innerHTML = `<img class="pcard-photo" src="${DISEASE_PHOTOS[did]}" alt="" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()">`;
      }
    });
  }
  const detail2 = document.getElementById('diseaseDetail');
  if (detail2 && detail2.style.display !== 'none') {
    const pid = detail2.dataset.diseaseId;
    if (pid && DISEASE_PHOTO_OVERRIDES[pid]) {
      const wrap = detail2.querySelector('.detail-photo-wrap');
      if (wrap) {
        const existing = wrap.querySelector('img');
        if (existing) { existing.src = DISEASE_PHOTOS[pid]; }
        else {
          const fb = wrap.querySelector('.detail-photo-fallback');
          const img = document.createElement('img');
          img.className = 'detail-photo'; img.src = DISEASE_PHOTOS[pid]; img.alt = '';
          img.onerror = function(){ this.style.display='none'; if(fb) fb.style.display='block'; };
          if (fb) { wrap.insertBefore(img, fb); fb.style.display='none'; }
          else wrap.prepend(img);
        }
      }
    }
  }
}

const DISEASE_DATA = {
  fungal: [
    {
      id: 'blight', icon: '🟤', name: 'Late Blight', colour: '#7a4a2a',
      tag: 'Fungal — Oomycete', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'Tomatoes, Potatoes',
      desc: 'Late blight (Phytophthora infestans) is the most destructive disease in the UK kitchen garden. The same pathogen caused the Irish Potato Famine of the 1840s. In warm, humid conditions it spreads with terrifying speed — an entire crop of tomatoes can be destroyed within a week of the first lesion appearing.',
      id_text: 'Dark brown, water-soaked patches on leaves, stems, and fruit — starting at leaf tips and margins and spreading rapidly inward. In humid conditions a white-grey downy fungal growth appears on the underside of lesions. On tomato fruits: firm brown areas that sink and rot within days. On potato tubers: reddish-brown internal rot extending from the skin inward.',
      conditions: 'Spreads during "Smith Periods" — two consecutive days with temperatures above 10°C and relative humidity above 89%. Warm, wet, humid summers (July–September) are highest risk. Spores spread by wind and rain splash.',
      crops: ['🍅 Tomatoes', '🥔 Potatoes'],
      controls: {
        organic:    { title: 'Copper-based fungicide (preventive)', text: 'Bordeaux mixture or copper hydroxide applied preventively (before blight appears) creates a protective surface barrier. Apply every 7–14 days from mid-July when Smith Periods are forecast. Strictly preventive — it does not cure existing infections. Approved for organic use.' },
        passive:    { title: 'Resistant varieties & airflow', text: 'Choose resistant potato varieties (Sarpo Mira, Sarpo Axona, Cara) and resistant tomato types. Water at the base only, never overhead. Remove lower tomato leaves to improve airflow. In a greenhouse, ventilate maximally. Grow tomatoes under cover to exclude rain splash.' },
        mechanical: { title: 'Remove affected material immediately', text: 'Remove and destroy (burn or bin — never compost) all affected leaves, stems and fruits at the very first sign. Lift all potato tubers immediately when blight is detected on foliage — they can be saved if lifted before spores wash down to the tubers.' },
        chemical:   { title: 'Mancozeb or chlorothalonil (preventive)', text: 'Mancozeb-based fungicides (Dithane 945) and chlorothalonil provide preventive protection when applied before blight establishes. These are strictly preventive — they cannot cure existing infections. Check current UK product approval status annually as approvals change.' },
      }
    },
    {
      id: 'powdery-mildew', icon: '⬜', name: 'Powdery Mildew', colour: '#c8c8a0',
      tag: 'Fungal', severity: 'medium', severityLabel: '🟠 Significant',
      affects: 'Courgettes, Cucumbers, Peas, Squash, Gooseberries, Apples, many others',
      desc: 'Powdery mildew is caused by a range of related fungi, each specific to its host plant — courgette mildew cannot infect peas, and vice versa. The characteristic white powdery coating on leaf surfaces appears in warm, dry conditions (unlike downy mildew which prefers cool and wet). Rarely kills plants but severely reduces yield and plant vigour.',
      id_text: 'A white or grey powdery coating of fungal spores on the upper surface of leaves, sometimes extending to stems and flowers. Affected leaves may yellow, distort, and drop prematurely. The powder can be rubbed off with a finger — this distinguishes it from downy mildew where the growth is on the underside only. First appears on older leaves.',
      conditions: 'Thrives in warm, dry conditions with high humidity around the plant — classic late summer weather. Spores spread by wind. Overcrowded plants with poor airflow are most susceptible. Water stress predisposes plants. Unlike most fungi, does not need free water on leaf surfaces to germinate.',
      crops: ['🥒 Courgettes', '🎃 Squash', '🥒 Cucumbers', '🫛 Peas', '🟢 Gooseberries', '🍎 Apples', '🌹 Roses'],
      controls: {
        organic:    { title: 'Baking soda or milk spray', text: 'A solution of 1 tsp bicarbonate of soda in 1L water with a drop of washing-up liquid changes the surface pH and inhibits spore germination. Milk diluted 1:9 with water also has proven fungicidal activity. Apply weekly as a preventive and at first signs of infection.' },
        passive:    { title: 'Resistant varieties & good airflow', text: 'Choose mildew-resistant varieties (courgette Defender F1, pea Alderman). Space plants generously — good airflow is the single most effective preventive measure. Water at the base consistently — drought stress massively increases susceptibility. Avoid overhead watering.' },
        mechanical: { title: 'Remove affected leaves promptly', text: 'Remove and destroy affected leaves immediately on first appearance. Do not compost mildewed material — it spreads spores. This slows progression significantly if done consistently from the first sign.' },
        chemical:   { title: 'Tebuconazole or myclobutanil', text: 'Systemic fungicides containing tebuconazole (e.g. Bayer Multirose) or myclobutanil give good control applied at the first sign of infection. Alternate products to avoid resistance developing. Sulphur-based fungicides are an organic-approved chemical option effective against many mildew species.' },
      }
    },
    {
      id: 'downy-mildew', icon: '🔵', name: 'Downy Mildew', colour: '#5a7a9a',
      tag: 'Fungal — Oomycete', severity: 'medium', severityLabel: '🟠 Significant',
      affects: 'Lettuce, Brassicas, Onions, Grapes, Spinach, Basil',
      desc: 'Downy mildew is caused by oomycetes (water moulds) and is completely unrelated to powdery mildew despite the similar name. It thrives in cool, wet, humid conditions and is most damaging in spring and autumn. Each host plant has its own specific downy mildew species. Lettuce downy mildew can destroy an entire bed within days in the right conditions.',
      id_text: 'Yellow or pale green patches on the upper surface of leaves, with a corresponding grey, purple-grey, or brown downy fungal growth on the underside directly beneath the yellowing. The downy growth on the underside is the definitive identification feature. Affected tissue eventually turns brown and dies. On onions: pale, elongated patches on leaves followed by grey-purple sporulation.',
      conditions: 'Spreads rapidly in cool (10–20°C), wet, humid conditions with poor airflow. Most damaging in autumn and during cool wet summers. Spores spread in water splash and on wind. Overcrowded plantings, overhead irrigation, and morning dew that stays on leaves are primary risk factors.',
      crops: ['🥬 Lettuce', '🥦 Brassicas', '🧅 Onions', '🍇 Grapes', '🌿 Spinach', '🌿 Basil'],
      controls: {
        organic:    { title: 'Improve airflow and avoid wet foliage', text: 'The most effective organic approach is cultural — wide spacing, morning watering (so foliage dries by evening), and removal of affected leaves immediately. Copper-based sprays (Bordeaux mixture) provide some preventive protection on grapevines and brassicas.' },
        passive:    { title: 'Resistant varieties and timing', text: 'Choose downy mildew-resistant lettuce varieties (e.g. Chartwell, Navara). Avoid growing susceptible crops in autumn in humid, sheltered spots. Grow lettuce under fleece or a cloche which keeps foliage dry while the crop is young.' },
        mechanical: { title: 'Remove affected tissue and improve spacing', text: 'Remove affected leaves promptly and destroy them. Thin or remove overcrowded plants to improve airflow. If a lettuce bed is severely affected, harvest what is usable, clear the entire bed, and rotate to a different crop.' },
        chemical:   { title: 'Fosetyl-aluminium or mancozeb (preventive)', text: 'Products containing fosetyl-aluminium (Aliette) have activity against oomycetes and provide systemic protection. Mancozeb-based products are protective only. Apply preventively in high-risk periods. Rotate fungicide classes to manage resistance.' },
      }
    },
    {
      id: 'botrytis', icon: '🩶', name: 'Botrytis (Grey Mould)', colour: '#8a8a9a',
      tag: 'Fungal', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'Strawberries, Tomatoes, Grapes, Lettuce, Onions — almost any plant under stress',
      desc: 'Botrytis cinerea (grey mould) is the most ubiquitous fungal pathogen in temperate gardens — present in virtually every garden soil and on plant debris. It becomes a disease only when conditions favour it: cool, humid, poorly ventilated environments with damaged or senescent plant tissue. In a greenhouse in autumn it can destroy an entire tomato or grape crop.',
      id_text: 'Fluffy, grey-brown fungal growth covering affected tissue — the "grey mould" appearance is unmistakable. Starts on dead or damaged tissue (old petals, cut stems, senescent leaves) and rapidly spreads into healthy tissue. Affected areas go soft and watery before being colonised by grey sporulating growth. On strawberries: grey mould on developing and ripe fruits. On tomatoes: dark rings on fruits and stem cankers.',
      conditions: 'Cool (15–20°C), humid conditions with poor ventilation. The pathogen is always present — it only becomes active on damaged, stressed, or senescent tissue. High humidity above 90% and wet weather are the main triggers. Greenhouses in autumn are extremely high risk.',
      crops: ['🍓 Strawberries', '🍅 Tomatoes', '🍇 Grapes', '🥬 Lettuce', '🧅 Onions in store'],
      controls: {
        organic:    { title: 'Remove dead tissue and ventilate', text: 'Remove all dead petals, dead leaves, and damaged tissue regularly — botrytis always starts on dead material before invading living tissue. This is the single most effective preventive measure. Pick over strawberry plants daily when in flower and fruit. Remove senescent tomato leaves promptly.' },
        passive:    { title: 'Maximum ventilation in greenhouse', text: 'Ventilate the greenhouse or polytunnel as much as possible in autumn. Even on cool days, leaving roof vents open reduces humidity dramatically. Avoid overhead watering. Space plants generously. In strawberry beds, straw mulch prevents rain splash from carrying spores onto fruits.' },
        mechanical: { title: 'Remove and destroy all infected material', text: 'Remove and bin (never compost) all grey-moulded material immediately. When cutting back affected tomato plants, sterilise secateurs between cuts with methylated spirit to prevent transferring spores. Do not leave crop debris in the greenhouse over winter.' },
        chemical:   { title: 'Fludioxonil or iprodione', text: 'Fungicides containing fludioxonil (e.g. Geoxe) give excellent botrytis control applied preventively. Pirimithanil and iprodione are alternatives. Botrytis develops resistance rapidly — rotate between fungicide classes. Spray timing is critical: apply before and during the flowering period for soft fruit.' },
      }
    },
    {
      id: 'rust', icon: '🟠', name: 'Rust', colour: '#c87a2a',
      tag: 'Fungal', severity: 'medium', severityLabel: '🟠 Significant',
      affects: 'Leeks, Garlic, Roses, Pears, Beans, Mint, Hollyhocks',
      desc: 'Rust diseases are caused by a large family of obligate parasitic fungi, each specific to its host or a narrow range of hosts. Leek rust (Puccinia allii) is the most common in UK vegetable gardens, producing vivid orange pustules on leek leaves in summer and autumn. While rarely fatal, severe infections significantly weaken plants and reduce yields.',
      id_text: 'Distinctive bright orange, rust-coloured powdery pustules (spore masses) on leaf surfaces — mostly on the underside with corresponding pale spots or yellow patches on the upper surface. The vivid orange colour is unmistakable. On leeks: elongated orange streaks on the leaves from July onwards. On roses: orange pustules on undersides with yellow spots on top. Severely affected leaves yellow and drop.',
      conditions: 'Spreads via airborne spores during warm, wet conditions in summer and autumn. Spores require free moisture on leaf surfaces to germinate. Overcrowded, poorly ventilated plantings and overhead irrigation increase risk significantly. Soft, lush growth from over-fertilisation with nitrogen is particularly susceptible.',
      crops: ['🥢 Leeks', '🧄 Garlic', '🌹 Roses', '🍐 Pears', '🫘 Beans', '🌿 Mint'],
      controls: {
        organic:    { title: 'Avoid excess nitrogen, improve airflow', text: 'Reduce nitrogen feeding in summer — lush growth is highly susceptible. Thin or space leeks to improve airflow. Remove and destroy severely affected leaves. Sulphur-based fungicide sprays (Sulphur Rose) have activity against rust and are organic-approved.' },
        passive:    { title: 'Tolerant or resistant varieties', text: 'Some leek varieties show improved rust tolerance (Bandit, Oarsman). Avoid overhead irrigation — water at the base. On roses, choose rust-resistant varieties. Remove all fallen affected leaves in autumn to reduce the overwintering spore load.' },
        mechanical: { title: 'Remove infected leaves promptly', text: 'Remove and destroy affected leaves at first sign of orange pustules. Do not compost — burn or bin. This slows spread significantly. On leeks, mild-to-moderate rust does not usually justify removing the whole plant — harvest outer leaves and the inner growth continues.' },
        chemical:   { title: 'Tebuconazole or myclobutanil', text: 'Systemic triazole fungicides (tebuconazole in Bayer Multirose, myclobutanil) give good rust control when applied at the first signs of infection. Apply every 14 days. Propiconazole is an alternative. Resistance is less of an issue with rust than with mildew.' },
      }
    },
    {
      id: 'canker', icon: '🌳', name: 'Apple & Pear Canker', colour: '#8a5a3a',
      tag: 'Fungal', severity: 'medium', severityLabel: '🟠 Significant',
      affects: 'Apples, Pears, Quinces',
      desc: 'Nectria canker (Neonectria ditissima) is the most serious fungal disease of apple and pear trees in the UK. It enters through wounds — particularly pruning cuts, leaf scars, and frost damage — and kills the bark in expanding elliptical lesions. Unchecked, a canker encircles a branch and kills everything above it.',
      id_text: 'Sunken, elliptical lesions in bark with concentric rings of cracked, raised bark at the margins. The lesion slowly enlarges, exposing dead wood at the centre. In summer, white fungal pustules appear in the lesion; in winter, small red pustules (spore-producing structures). Affected branches may die back progressively. In severe cases the main trunk can be girdled and the tree killed.',
      conditions: 'Enters through wounds, pruning cuts, leaf scars, lenticel openings, and damage from frost or woolly aphid. Spreads in wet conditions — autumn and winter pruning in wet weather carries high infection risk. Trees under stress (poor drainage, waterlogging, drought) are most susceptible.',
      crops: ['🍎 Apples', '🍐 Pears', '🍋 Quinces'],
      controls: {
        organic:    { title: 'Wound sealant after pruning', text: 'Apply a pruning sealant (wound paint) to all pruning cuts immediately after making them. Prune in dry weather conditions whenever possible. Remove canker-affected wood promptly (see mechanical). Some products containing Trichoderma (biological fungal antagonist) are available for wound treatment.' },
        passive:    { title: 'Canker-resistant varieties & good drainage', text: 'Choose resistant apple varieties (Fiesta, Discovery, Jonagold have better canker tolerance). Ensure excellent drainage — waterlogged soil dramatically increases susceptibility. Avoid excessive nitrogen which produces soft, susceptible growth.' },
        mechanical: { title: 'Cut out cankers to clean wood', text: 'Cut out all affected tissue with a sharp knife or saw, leaving clean, healthy wood. Cut at least 10cm beyond visible infection. Sterilise tools between cuts (methylated spirit or bleach solution). Remove all cankered material from the garden and destroy it. Apply wound paint to large cuts immediately.' },
        chemical:   { title: 'Copper fungicide at leaf fall', text: 'Spray with a copper-based fungicide (Bordeaux mixture) at 50% leaf fall and again at bud burst in spring to protect leaf scars and wounds. This is primarily preventive. Established cankers must be cut out — no fungicide cures existing canker infections.' },
      }
    },
    {
      id: 'peach-leaf-curl', icon: '🍑', name: 'Peach Leaf Curl', colour: '#c87a5a',
      tag: 'Fungal', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'Peaches, Nectarines, Almonds',
      desc: 'Peach leaf curl (Taphrina deformans) is the most damaging disease of peaches and nectarines in the UK. It infects the developing leaves in spring, causing them to blister, redden, and fall prematurely. Repeated defoliation over several years progressively weakens and eventually kills the tree. Rain exclusion is the only reliable prevention.',
      id_text: 'Leaves emerge with vivid red-pink blistering and puckering, thickened and distorted. As the disease progresses the distorted leaves turn pale grey and covered in white powdery spores before dropping. A second flush of leaves usually emerges after defoliation — these are unaffected as the fungus only infects in spring during bud burst. The vivid red blistered leaves in April–May are unmistakable.',
      conditions: 'Spores infect developing leaf tissue during the very brief window of bud burst in February–March. They require wet conditions to germinate and infect — rain and overhead moisture at bud burst are essential to infection. This is why rain exclusion is so effective: remove the moisture and the spores cannot infect.',
      crops: ['🍑 Peaches', '🍑 Nectarines', 'Almonds'],
      controls: {
        organic:    { title: 'Copper fungicide at bud burst', text: 'Apply Bordeaux mixture or copper oxychloride twice: at 50% bud burst and again 10 days later. This provides some protection but is far less reliable than rain exclusion. Copper is organic-approved. The challenge is accurate timing — apply too late and infection has already occurred.' },
        passive:    { title: 'Rain exclusion — the only reliable method', text: 'Cover the fan-trained tree with a polythene shelter from December until mid-April, excluding all rain. Even a simple polythene roof on wire frames is sufficient. This is the single most effective control — in the absence of rain, the spores cannot infect regardless of their presence. Completely reliable when done correctly.' },
        mechanical: { title: 'Remove all affected leaves immediately', text: 'Remove and destroy all affected leaves immediately on first appearance. This removes the sporulating tissue before spores can spread to infect next year\'s buds. Do not compost. After defoliation, trees usually produce a second flush of unaffected leaves — feed and water well to support recovery.' },
        chemical:   { title: 'Myclobutanil at bud burst (systemic)', text: 'Systemic fungicides containing myclobutanil applied at bud burst have better activity than copper. Apply at bud burst and repeat 14 days later. Even these are not as reliable as rain exclusion. Use in combination with rain exclusion for maximum protection.' },
      }
    },
    {
      id: 'damping-off', icon: '🌱', name: 'Damping Off', colour: '#8a6a4a',
      tag: 'Fungal — Oomycete', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'All seedlings — particularly tomatoes, cucumbers, brassicas, lettuces',
      desc: 'Damping off is a collective term for seedling death caused by several soil-borne pathogens including Pythium, Phytophthora, and Rhizoctonia. It is the most common cause of seedling failure in the propagation stage. Entire trays of seedlings can collapse and die overnight — there is no cure once symptoms appear.',
      id_text: 'Seedlings suddenly collapse at or just below soil level — the stem appears pinched, water-soaked, and brown at the base. Affected seedlings fall over and die rapidly. The collapse typically spreads outward from a central point in the tray. Sometimes a white or grey fluffy mould is visible on the soil surface around fallen seedlings. Pre-emergence damping off kills before seedlings emerge.',
      conditions: 'Favoured by overwatering, poor drainage, cold composts, overcrowding, and poor ventilation. Tap water contains some pathogens; collected rainwater can carry higher pathogen loads. Reused, poorly sterilised trays and composts are major sources. Most prevalent in spring when seedlings are grown in cool, damp conditions.',
      crops: ['All seedlings — highest risk: 🍅 Tomatoes', '🥒 Cucumbers', '🥬 Lettuces', '🥦 Brassicas', '🌿 Herbs'],
      controls: {
        organic:    { title: 'Chamomile tea drench', text: 'Watering seedlings with a dilute chamomile tea (steep 1 chamomile tea bag in 500ml hot water, cool, dilute 1:4) has antifungal properties and is used by many organic growers to reduce damping-off incidence. Apply as a preventive drench at sowing and once after germination.' },
        passive:    { title: 'Hygiene, drainage and ventilation', text: 'Use only new or thoroughly cleaned and sterilised trays and modules. Use fresh, quality seed compost. Water with mains water rather than rainwater for seedlings. Water in the morning from below (into the saucer) rather than overhead. Maintain good ventilation and avoid overcrowding seedlings.' },
        mechanical: { title: 'Remove affected seedlings immediately', text: 'Remove all collapsed seedlings and the surrounding compost immediately. There is no saving affected seedlings — focus on preventing spread to healthy neighbours. Re-sow in fresh compost in a cleaned container. Grit or vermiculite top-dressing on the compost surface reduces surface humidity.' },
        chemical:   { title: 'Copper-based drench (preventive)', text: 'A dilute copper fungicide drench applied to seed compost before sowing provides some protection. Thiram seed treatments (on treated seeds from reputable suppliers) protect germinating seeds from damping off organisms. These are strictly preventive — once damping off is visible, chemical treatment cannot save affected plants.' },
      }
    },
    {
      id: 'sclerotinia', icon: '⬜', name: 'Sclerotinia (White Mould)', colour: '#9a9a7a',
      tag: 'Fungal', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'Carrots, Parsnips, Celery, Lettuces, Beans, Courgettes',
      desc: 'Sclerotinia sclerotiorum causes a sudden, dramatic collapse of apparently healthy plants. It produces dense white cotton-wool-like mycelium and large black resting bodies (sclerotia) that persist in soil for up to 10 years. A single severely affected bed can remain a reservoir for re-infection for a decade.',
      id_text: 'Dense, white, fluffy cotton-wool-like mycelium covering affected stems and crowns at or below soil level. Affected plants wilt suddenly and collapse as the stem is rotted through. Within the white mycelium, large (up to 10mm), hard, irregularly shaped black sclerotia are clearly visible — these resting bodies persist long after the white mould has dried up. Stored carrots and parsnips may show white mould in the clamp.',
      conditions: 'Cool (10–20°C), humid conditions. Sclerotia germinate and release airborne spores in spring and autumn that land on dead tissue (fallen petals, dead leaves) and establish before colonising living tissue. Overcrowded beds with poor airflow and high soil moisture favour the disease strongly.',
      crops: ['🥕 Carrots', '🌻 Parsnips', '🥬 Celery', '🥬 Lettuces', '🫘 Beans', '🥒 Courgettes'],
      controls: {
        organic:    { title: 'Remove dead plant material promptly', text: 'Remove all fallen petals, dead leaves, and dead plant material from beds regularly — Sclerotinia always establishes on dead tissue first. Improve airflow with wider spacing. Biological control products based on Coniothyrium minitans (Contans WG) specifically parasitise Sclerotinia sclerotia in soil — apply before sowing.' },
        passive:    { title: 'Long crop rotation and wide spacing', text: 'Rotate susceptible crops — do not grow carrots, parsnips, lettuces, or beans in the same ground for at least 5 years after an outbreak. Sclerotia persist for up to 10 years, so even a 5-year break is not guaranteed. Wide plant spacing reduces humidity and dramatically slows disease spread through a crop.' },
        mechanical: { title: 'Remove ALL affected plants and roots', text: 'Remove every affected plant including the entire root system and all surrounding soil. Burn or bin — never compost Sclerotinia-infected material. The black sclerotia are clearly visible and must all be removed. Avoid moving contaminated soil to clean areas of the garden on boots or tools.' },
        chemical:   { title: 'Iprodione or thiophanate-methyl', text: 'Fungicides containing iprodione or thiophanate-methyl applied as preventive soil drenches or foliar sprays reduce infection. Application timing is difficult as establishment in soil is invisible until collapse occurs. The biological soil drench Contans WG (Coniothyrium minitans) is highly effective for long-term sclerotia reduction.' },
      }
    },
  ],
  bacterial: [
    {
      id: 'bacterial-canker', icon: '🌿', name: 'Bacterial Canker', colour: '#5a7a3a',
      tag: 'Bacterial', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'Cherries, Plums, Gages, Damsons, Peaches, Apricots',
      desc: 'Bacterial canker (Pseudomonas syringae pv. morsprunorum) is the most serious disease of stone fruit trees in the UK. It kills whole branches and can destroy a young tree in 2–3 years if unchecked. The bacteria enter through winter pruning wounds, leaf scars, and bud scale scars — which is why pruning stone fruit in winter is so dangerous.',
      id_text: 'Sunken, flattened, brown-orange canker lesions in the bark, weeping amber gum. Infected branches may show a "bleeding" amber gum exudate followed by dieback of everything above the canker. Affected buds fail to break in spring. In spring and summer, "shot hole" symptoms appear on leaves — small brown spots that fall out leaving ragged circular holes, giving a shot-hole appearance.',
      conditions: 'Enters through any wound during autumn and winter when the tree is dormant and wet. Leaf scars in October–November are the primary entry point. Rain in autumn carries the bacteria from infected to healthy tissue. Trees in wet, sheltered positions or on heavy soils are most susceptible.',
      crops: ['🍒 Cherries', '🟣 Plums', '🟢 Gages', '🍑 Peaches', '🟡 Apricots'],
      controls: {
        organic:    { title: 'Copper spray at leaf fall', text: 'Spray with Bordeaux mixture or copper oxychloride at 50% leaf fall and again in late winter (February) to protect leaf scars and wounds. This is the most important preventive treatment. Organic-approved.' },
        passive:    { title: 'Never prune in autumn or winter', text: 'The absolute golden rule: prune all stone fruit trees only in July–August when the tree is in active growth and sap flow is highest. Wounds made in summer seal within weeks; winter wounds remain open for months and become infection courts. No exceptions.' },
        mechanical: { title: 'Cut out cankers to clean wood in summer', text: 'Cut out all cankered wood in July–August to at least 15cm below visible infection. Sterilise tools between cuts with methylated spirit. Apply copper-based wound paint to all cuts immediately. Destroy all removed material.' },
        chemical:   { title: 'Copper fungicide at leaf fall (preventive)', text: 'As for the organic approach — copper sprays at leaf fall are the key chemical tool. There are no systemic bactericides approved for amateur garden use against this pathogen. Prevention is the only reliable strategy.' },
      }
    },
    {
      id: 'fire-blight', icon: '🔥', name: 'Fire Blight', colour: '#c84a2a',
      tag: 'Bacterial — Notifiable', severity: 'high', severityLabel: '🔴 Notifiable',
      affects: 'Apples, Pears, Quinces, Cotoneaster, Pyracantha',
      desc: 'Fire blight (Erwinia amylovora) is a devastating bacterial disease of apple and pear family plants that can kill entire trees rapidly. It is a notifiable disease in the UK — you are legally obliged to report it to the Animal and Plant Health Agency (APHA). The "fire" name describes the scorched appearance of infected shoots.',
      id_text: 'Shoots wilt and turn brown-orange, then black, while remaining attached to the tree — the classic "shepherd\'s crook" bend at the tip. Infected tissue has a characteristic scorched appearance as if burnt. Bark on affected stems becomes water-soaked and slightly sunken. In warm, humid weather a sticky cream-coloured bacterial ooze may be visible. Dead leaves and fruits remain attached — they do not fall.',
      conditions: 'Spreads during spring blossom (April–May) via bees and other pollinators carrying bacteria between flowers, and by rain splash. Warm (18–27°C), humid weather with rainfall during flowering is highest risk. New infections spread rapidly in warm wet summers.',
      crops: ['🍎 Apples', '🍐 Pears', '🍋 Quinces', 'Cotoneaster', 'Pyracantha'],
      controls: {
        organic:    { title: 'Copper spray during flowering (preventive)', text: 'Apply Bordeaux mixture during the flowering period, particularly before and after warm wet weather. This reduces but does not eliminate infection risk. Report all suspected cases to APHA.' },
        passive:    { title: 'Choose resistant varieties', text: 'Some apple and pear varieties have improved fire blight resistance (pears: Beth, Conference show some resistance; apples: less variation). Avoid varieties listed as very susceptible (Cox\'s Orange Pippin is highly susceptible).' },
        mechanical: { title: 'Cut out all infected wood — 60cm below infection', text: 'Cut back infected branches to 60cm (2ft) below the last visible signs of infection. Sterilise tools with methylated spirit or 10% bleach solution between every cut — the disease is spread by contaminated tools. Destroy all removed material. Do not compost. Report to APHA.' },
        chemical:   { title: 'Notify APHA — no domestic bactericide approved', text: 'LEGALLY NOTIFIABLE: Report to APHA (0300 1000 313) if you suspect fire blight. No bactericide for fire blight is currently approved for amateur UK garden use. Professional treatment options exist but must be under APHA guidance.' },
      }
    },
    {
      id: 'mosaic-virus', icon: '🌿', name: 'Mosaic Virus (TMV / CMV)', colour: '#6a8a4a',
      tag: 'Viral', severity: 'medium', severityLabel: '🟠 Significant',
      affects: 'Tomatoes (TMV), Cucumbers, Courgettes, Beans, Peppers (CMV)',
      desc: 'Tobacco mosaic virus (TMV) and Cucumber mosaic virus (CMV) are among the most widespread plant viruses affecting vegetable crops worldwide. TMV is extraordinarily stable — it can remain viable on contaminated hands and tools for years, and even survives in processed tobacco. There is no cure; infected plants must be destroyed.',
      id_text: 'A distinctive mosaic pattern of light and dark green mottling on leaves, often with distortion, puckering, and reduced leaf size. New growth is particularly affected. On tomatoes: small, distorted leaves with yellow-green mottling; fruits may show pale ring spots. On cucumbers: severe leaf distortion and mosaic; fruits may be mottled and reduced in size.',
      conditions: 'TMV spreads by contact — contaminated hands, tools, and clothing transmit the virus. Notably spread by smokers handling plants (tobacco contains TMV). CMV spreads primarily via aphids — the aphid acquires the virus from an infected plant and transmits it to the next plant it probes. Weeds act as virus reservoirs.',
      crops: ['🍅 Tomatoes (TMV)', '🥒 Cucumbers (CMV)', '🥒 Courgettes (CMV)', '🫘 Beans (CMV)', '🫑 Peppers (TMV/CMV)'],
      controls: {
        organic:    { title: 'Wash hands and tools rigorously', text: 'Wash hands thoroughly with soap and water before and after handling plants — particularly before handling tomatoes after smoking (TMV survives on tobacco). Wash all tools in a dilute bleach solution (10%). Remove and destroy infected plants immediately — there is no cure.' },
        passive:    { title: 'Control aphids (CMV) — resistant varieties', text: 'For CMV: control aphid populations rigorously as they are the primary vector. Yellow sticky traps, reflective mulches, and regular monitoring. Many modern tomato varieties carry TMV resistance genes (noted on seed packets as Tm or ToMV resistance — a major reason to choose F1 hybrids).' },
        mechanical: { title: 'Remove infected plants and all debris', text: 'Remove and destroy all infected plants at the first sign — do not wait. Bag before moving through the garden to avoid contact with other plants. Remove all crop debris at season end. Do not compost any potentially infected material.' },
        chemical:   { title: 'No cure exists — prevention only', text: 'There are no effective chemical treatments for viral diseases in plants. Management is entirely preventive: good hygiene, aphid control, resistant varieties, and prompt removal of infected plants. Focus all effort on preventing virus entry rather than attempting to treat it.' },
      }
    },
  ],
  soil: [
    {
      id: 'clubroot', icon: '🥦', name: 'Clubroot', colour: '#6a4a8a',
      tag: 'Soil-borne — Notifiable in some contexts', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'All Brassicas — Cabbage, Broccoli, Kale, Brussels Sprouts, Cauliflower, Turnips, Swede, Pak Choi',
      desc: 'Clubroot (Plasmodiophora brassicae) is arguably the most feared soil-borne disease in UK kitchen gardens. It persists in the soil as resting spores for up to 20 years — meaning a bed that becomes infected is effectively lost for brassica growing for two decades without extraordinary intervention. Crop rotation is the most critical preventive measure.',
      id_text: 'Plants appear stunted, weak, and wilting — often despite adequate watering. Foliage turns pale yellow-green. The definitive diagnosis is made by lifting a plant and examining the roots: badly distorted, swollen, club-shaped roots with characteristic grotesque galls replace the normal fibrous root system. The distorted roots have a distinctive unpleasant smell when crushed.',
      conditions: 'Thrives in acid soils (pH below 7.0) and wet, poorly-drained conditions. Spores are moved through the garden on contaminated tools, boots, soil, and transplants from infected sites. Most commonly introduced on bought-in module plants or allotment transplants. Active in soil temperatures above 10°C.',
      crops: ['🥦 All Brassicas', '🥬 Cabbage', '🥦 Broccoli / Calabrese', '🥬 Kale', '🟤 Turnip', '🟤 Swede', '🥬 Pak Choi', '🌿 Rocket'],
      controls: {
        organic:    { title: 'Raise pH to 7.5 with lime', text: 'Lime the soil to raise pH to 7.5 — clubroot is severely inhibited above pH 7.3. Apply ground limestone or dolomite lime (not quicklime) to bring pH to 7.5 in the specific brassica bed. Test pH before applying. This does not eradicate existing infection but dramatically reduces severity.' },
        passive:    { title: 'Strict crop rotation and hygiene', text: 'Rotate brassicas on a minimum 4-year cycle — ideally never return brassicas to an infected bed permanently. Clean boots, tools, and equipment before entering the brassica area. Never accept transplants from unknown sources. Grow your own transplants from seed. Improve drainage — clubroot thrives in wet soils.' },
        mechanical: { title: 'Pot-raised transplants in fresh compost', text: 'Start brassicas in pots of fresh, disease-free compost and plant out with the entire root ball intact — do not bare-root transplant in affected ground. The larger the transplant at planting, the better it can outgrow the initial infection. Raised beds of imported compost-soil mix allow brassica growing above infected ground.' },
        chemical:   { title: 'Calcium cyanamide soil treatment', text: 'Calcium cyanamide (a fertiliser-soil sterilant) applied to infected ground 4–6 weeks before planting reduces clubroot spore counts. Cyazofamid-based fungicide drenches are used commercially. For amateur use, liming and strict rotation are the primary approaches — no single chemical eradicates established clubroot in a garden situation.' },
      }
    },
    {
      id: 'white-rot', icon: '🧅', name: 'Allium White Rot', colour: '#9a9a3a',
      tag: 'Soil-borne — Permanent', severity: 'high', severityLabel: '🔴 Permanent',
      affects: 'Onions, Garlic, Leeks, Shallots, Spring Onions — all alliums',
      desc: 'Allium white rot (Sclerotium cepivorum) is one of the most persistent and devastating soil-borne diseases in UK gardens. The sclerotia (resting bodies) persist in soil for up to 20 years, and are stimulated to germinate specifically by the scent of growing alliums. Once present, a bed is effectively lost for all allium crops for a generation.',
      id_text: 'Plants yellow, wilt, and die during the growing season. Lifting a plant reveals white, fluffy mycelium at the base of the bulb or around the roots. Within this fluffy white growth, small (1–2mm) round black sclerotia are clearly visible with the naked eye — these are the definitive identification feature. Bulbs in store may show white fluffy rot spreading from the base plate.',
      conditions: 'Sclerotia in soil are stimulated to germinate by volatile compounds released by growing allium roots — even without a host present, the scent of onions or garlic planted nearby activates dormant spores. Germination occurs between 5–20°C. Wet soil and poor drainage favour rapid spread through a bed.',
      crops: ['🧅 Onions', '🧄 Garlic', '🥢 Leeks', '🧅 Shallots', '🌿 Spring Onions', 'All alliums'],
      controls: {
        organic:    { title: 'Biological control with Trichoderma', text: 'Products containing Trichoderma asperellum (SoilShield, RootShield) introduced into planting holes can help suppress white rot by competing with Sclerotium sclerotia. Efficacy is partial but meaningful. Garlic extract applied to soil is claimed to "bait" sclerotia into premature germination when no host is present — removing them from the seed bank over several seasons.' },
        passive:    { title: 'Never grow alliums on infected ground', text: 'The only truly reliable measure. Mark infected beds clearly. Do not grow any allium on them — even spring onions will trigger sclerotia germination. A 20-year break is the standard advice. Keep infected soil separate — do not move it. Wash boots and tools before entering clean areas.' },
        mechanical: { title: 'Remove affected plants and all surrounding soil', text: 'At first sign, lift and remove infected plants and at least 30cm of surrounding soil in every direction. Bag and dispose as household waste — never compost. Mark the exact position. This reduces but cannot eliminate sclerotia from the area.' },
        chemical:   { title: 'Tebuconazole as preventive drench', text: 'Tebuconazole-based fungicide applied as a drench into planting holes before planting gives some protection. This must be applied preventively — once plants are infected, chemical treatment cannot save them. Repeat applications on each planting. Efficacy is partial in heavily infected ground.' },
      }
    },
    {
      id: 'fusarium', icon: '🌿', name: 'Fusarium Wilt', colour: '#8a6a3a',
      tag: 'Soil-borne', severity: 'high', severityLabel: '🔴 Devastating',
      affects: 'Tomatoes, Asparagus, Peas, Beans, Sweet Peas',
      desc: 'Fusarium wilt (Fusarium oxysporum) is a soil-borne vascular disease that invades root systems and blocks the water-conducting tissue of the plant. Infected plants die of internal drought even with adequate soil moisture. Different formae speciales (strains) target specific host plants — asparagus fusarium is different to tomato fusarium.',
      id_text: 'One-sided wilting and yellowing of leaves, often starting on the lower part of the plant. The plant wilts progressively despite wet soil — because water cannot pass through the blocked vascular system. Cutting through an affected stem reveals a brown or orange-brown discolouration of the vascular tissue (the ring of water-conducting vessels). Affected plants eventually collapse and die.',
      conditions: 'Persists as spores in soil for many years. Favoured by warm soil (above 20°C) and slightly acid pH. Enters through root tips or wounds. Heavily compacted soils, overwatering, and nitrogen deficiency increase susceptibility. Infected plant material left in the soil perpetuates the problem.',
      crops: ['🍅 Tomatoes', '🌿 Asparagus', '🫛 Peas', '🫘 Beans', '💐 Sweet Peas'],
      controls: {
        organic:    { title: 'Biological soil inoculants', text: 'Mycorrhizal fungi inoculants applied to roots at planting create a protective mycorrhizal network that competes with fusarium and improves overall plant health. Bacillus subtilis-based bioprotectants (Serenade) applied as soil drenches have activity against fusarium. Good quality compost significantly suppresses fusarium populations through microbial competition.' },
        passive:    { title: 'Resistant varieties and crop rotation', text: 'Use fusarium-resistant tomato varieties (most modern F1 hybrids carry F1 or F2 fusarium resistance — check the seed packet). Rotate all susceptible crops on a minimum 4-year cycle. Do not replant asparagus into old asparagus beds — new plantings on fresh ground only. Improve drainage and soil aeration.' },
        mechanical: { title: 'Remove infected plants and roots', text: 'Remove infected plants including the complete root system. Do not compost — burn or bin. Avoid transferring soil from infected areas. In a greenhouse, replace the top 20cm of border soil if fusarium wilt has become established — root-to-root contact perpetuates the problem.' },
        chemical:   { title: 'Etridiazole or metalaxyl soil drench', text: 'Fungicide drenches applied to soil before planting can reduce fusarium populations. Etridiazole and metalaxyl have some activity. These are preventive only — once plants are wilting, they cannot be saved. In practice, resistant varieties and rotation are the most reliable approaches for amateur gardeners.' },
      }
    },
    {
      id: 'violet-root-rot', icon: '🟣', name: 'Violet Root Rot', colour: '#6a3a7a',
      tag: 'Soil-borne', severity: 'medium', severityLabel: '🟠 Significant',
      affects: 'Asparagus, Carrots, Parsnips, Beetroot, Potatoes, Strawberries',
      desc: 'Violet root rot (Helicobasidium purpureum) is a soil-borne fungal disease causing a distinctive purple-violet feltlike coating on roots and crowns. It can devastate asparagus beds and severely damage root vegetable crops. Asparagus is particularly vulnerable as it cannot be rotated — an infected bed must be abandoned.',
      id_text: 'The definitive sign is a distinctive violet-purple, felt-like fungal growth coating roots, crowns, and underground stems. Affected plants show progressive wilting, yellowing, and stunted growth above ground. Root crops (carrots, parsnips, beetroot) show purple-coated, rotting roots with poor storageability. In asparagus, the purple coating on crowns and roots is unmistakable.',
      conditions: 'Persists in soil for many years. Favoured by slightly acid conditions (pH below 6.5) and moist soils. Introduced in infected transplants, contaminated soil, or on root vegetables brought from affected sites. Spread by contaminated tools, boots, and soil movement.',
      crops: ['🌿 Asparagus', '🥕 Carrots', '🌻 Parsnips', '🫀 Beetroot', '🥔 Potatoes', '🍓 Strawberries'],
      controls: {
        organic:    { title: 'Lime to raise pH above 7.0', text: 'Raise soil pH to 7.0–7.5 with ground limestone — the fungus is severely inhibited above neutral pH. Apply lime in autumn. This is the primary organic management strategy for asparagus and root vegetables in affected ground.' },
        passive:    { title: 'Long crop rotation and hygiene', text: 'Rotate susceptible crops on a minimum 6-year cycle. Clean tools and boots before working in clean areas. Do not introduce plants from sites with unknown disease history. If asparagus is affected, the bed must be abandoned and a new bed established on clean ground — there is no rotation option for asparagus.' },
        mechanical: { title: 'Remove all infected plant material', text: 'Remove and destroy all infected plants and root material. Do not compost. Avoid moving infected soil. Mark the affected area clearly. For root vegetables, do not store infected roots — the fungus continues to spread in store.' },
        chemical:   { title: 'No specific amateur fungicide available', text: 'There are currently no fungicides specifically approved for violet root rot in amateur UK gardens. Liming and strict rotation are the primary management tools. Where valuable asparagus beds are affected, seek professional horticultural advice.' },
      }
    },
  ],
};

// ── RENDER DISEASE GUIDE ───────────────────────────────────────────────────
