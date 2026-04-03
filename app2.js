
function renderDiseaseGuide() {
  const tabs = document.getElementById('diseaseTabs');
  if (!tabs) return;
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('[data-disease-cat]');
    if (!btn) return;
    document.querySelectorAll('#diseaseTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    diseaseShowCat(btn.dataset.diseaseCat);
  });
  diseaseShowCat('fungal');
}

function diseaseShowCat(cat) {
  const cards  = document.getElementById('diseaseCards');
  const detail = document.getElementById('diseaseDetail');
  if (detail) detail.style.display = 'none';
  if (!cards) return;
  cards.style.display = 'grid';
  const list = DISEASE_DATA[cat] || [];
  cards.innerHTML = list.map(d => {
    const photoUrl = DISEASE_PHOTOS[d.id];
    const photoHtml = photoUrl
      ? `<div class="pcard-photo-wrap"><img class="pcard-photo" src="${photoUrl}" alt="${d.name}" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()"></div>`
      : `<div class="pcard-photo-wrap" style="background:linear-gradient(135deg,${d.colour}cc,${d.colour}66);display:flex;align-items:center;justify-content:center;font-size:3rem">${d.icon}</div>`;
    return `
      <div class="pcard" role="button" tabindex="0" data-disease-id="${d.id}"
           onclick="diseaseOpenDetail('${cat}','${d.id}')"
           onkeydown="if(event.key==='Enter'||event.key===' ')diseaseOpenDetail('${cat}','${d.id}')">
        ${photoHtml}
        <div class="pcard-tag">${d.tag}</div>
        <div class="pcard-name">${d.name}</div>
        <div class="pcard-desc">${d.desc.substring(0,88)}…</div>
        <div class="pcard-meta" style="margin-top:0.4rem">
          <span>🌿 ${d.affects.substring(0,35)}…</span>
        </div>
        <div style="margin-top:0.5rem"><span class="weed-danger-badge ${d.severity}">${d.severityLabel}</span></div>
      </div>`;
  }).join('');
}

function diseaseOpenDetail(cat, id) {
  const cards  = document.getElementById('diseaseCards');
  const detail = document.getElementById('diseaseDetail');
  const inner  = document.getElementById('diseaseDetailInner');
  if (!detail || !inner) return;
  const d = (DISEASE_DATA[cat] || []).find(x => x.id === id);
  if (!d) return;
  cards.style.display  = 'none';
  detail.style.display = 'block';
  detail.dataset.diseaseId = id;

  const photoUrl = DISEASE_PHOTOS[id];
  const photoHtml = photoUrl
    ? `<div class="detail-photo-wrap"><img class="detail-photo" src="${photoUrl}" alt="${d.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="detail-photo-fallback" style="display:none">${d.icon}</span></div>`
    : `<div class="detail-photo-wrap" style="background:linear-gradient(135deg,${d.colour}cc,${d.colour}55)"><span class="detail-photo-fallback">${d.icon}</span></div>`;

  let sN = 0; const hn = () => String(++sN).padStart(2,'0');
  const cropChips = d.crops.map(c => `<span class="soil-crop-chip thrives" style="margin:2px">${c}</span>`).join('');

  inner.innerHTML = `
    <div class="detail-sidebar">
      ${photoHtml}
      <div class="detail-tag">${d.tag}</div>
      <h2 class="detail-title">${d.name}</h2>
      <div style="margin-bottom:1rem"><span class="weed-danger-badge ${d.severity}">${d.severityLabel}</span></div>
      <div class="detail-stats">
        <div class="dstat dstat--sow"><span class="dstat-label">⚠ Severity</span><span class="dstat-val">${d.severityLabel.replace(/^.+ /,'')}</span></div>
        <div class="dstat"><span class="dstat-label">Type</span><span class="dstat-val">${d.tag}</span></div>
        <div class="dstat"><span class="dstat-label">Controls</span><span class="dstat-val">4 methods</span></div>
      </div>
    </div>
    <div class="detail-body">
      <h3>${hn()} — About</h3>
      <p>${d.desc}</p>

      <h3>${hn()} — How to Identify</h3>
      <p>${d.id_text}</p>

      <h3>${hn()} — Crops Affected</h3>
      <div class="soil-crop-list" style="margin-bottom:1rem">${cropChips}</div>

      <h3>${hn()} — Conditions That Favour It</h3>
      <p>${d.conditions}</p>

      <h3>${hn()} — How to Prevent &amp; Control</h3>
      <div class="pest-control-block">
        <div class="pest-control-row">
          <span class="pest-control-badge organic">🌿 Organic</span>
          <div class="pest-control-text"><strong>${d.controls.organic.title}</strong> — ${d.controls.organic.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge passive">🤝 Passive</span>
          <div class="pest-control-text"><strong>${d.controls.passive.title}</strong> — ${d.controls.passive.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge mechanical">🔧 Mechanical</span>
          <div class="pest-control-text"><strong>${d.controls.mechanical.title}</strong> — ${d.controls.mechanical.text}</div>
        </div>
        <div class="pest-control-row">
          <span class="pest-control-badge chemical">⚗️ Chemical</span>
          <div class="pest-control-text"><strong>${d.controls.chemical.title}</strong> — ${d.controls.chemical.text}</div>
        </div>
      </div>
    </div>`;

  document.getElementById('diseases').scrollIntoView({ behavior:'smooth', block:'start' });
}

function diseaseBack() {
  const cards  = document.getElementById('diseaseCards');
  const detail = document.getElementById('diseaseDetail');
  if (cards)  cards.style.display  = 'grid';
  if (detail) detail.style.display = 'none';
}

// ── SITE SEARCH ──
let searchIndex = [];
let searchSelectedIdx = -1;

// ── CROP ROTATION ─────────────────────────────────────────────────────────────
function renderCropRotation() {
  renderRotWhy();
  renderRotGroups();
  renderRotNoRotate();
  renderRotPlan();

  document.getElementById('rotTabs').addEventListener('click', e => {
    const btn = e.target.closest('.ptab[data-rot-tab]');
    if (!btn) return;
    document.querySelectorAll('#rotTabs .ptab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    ['why','groups','noneed','plan'].forEach(t => {
      const p = document.getElementById('rotPanel-' + t);
      if (p) p.style.display = t === btn.dataset.rotTab ? '' : 'none';
    });
  });

  // Accordion for crop groups
  document.getElementById('rotPanel-groups').addEventListener('click', e => {
    const card = e.target.closest('.rot-group-card');
    if (!card) return;
    const isOpen = card.classList.contains('open');
    document.querySelectorAll('#rotPanel-groups .rot-group-card').forEach(c => c.classList.remove('open'));
    if (!isOpen) card.classList.add('open');
  });
}

function renderRotWhy() {
  const benefits = [
    { icon:'🦠', title:'Breaks Pest Cycles', text:'Pests that overwinter in soil — like carrot root fly, onion white rot, and vine weevil — are starved when their host crop moves. Without a host, populations crash over 2–3 seasons.' },
    { icon:'🍄', title:'Defeats Soil Diseases', text:'Clubroot, white rot, and potato blight persist in soil for years. Moving susceptible crops prevents the pathogen from building up to damaging levels. Brassicas on infected ground cause wipeouts — rotate to break the cycle.' },
    { icon:'🌱', title:'Balances Soil Nutrition', text:'Different crop families take and give different nutrients. Legumes fix nitrogen, feeding next season\'s hungry brassicas. Root crops follow, using remaining nitrogen without excess. A rotated plot self-fertilises more efficiently.' },
    { icon:'🌍', title:'Improves Soil Structure', text:'Alternating deep-rooted crops (parsnip, carrot) with shallow-rooted brassicas and surface-feeding legumes naturally aerates different soil layers and reduces compaction.' },
    { icon:'🧹', title:'Reduces Chemical Need', text:'A well-planned rotation dramatically reduces the need for pesticides and fungicides. Healthy soil + varied crops = fewer problems. It\'s the foundation of organic growing.' },
    { icon:'📈', title:'Better Yields Year on Year', text:'Plots that are consistently rotated show improved fertility, structure, and yield over time. The investment of planning pays compound returns. After 3–4 years the difference is striking.' },
  ];

  document.getElementById('rotPanel-why').innerHTML = `
    <div class="rot-why-grid">
      ${benefits.map(b => `
        <div class="rot-why-card">
          <div class="rot-why-icon">${b.icon}</div>
          <div class="rot-why-title">${b.title}</div>
          <div class="rot-why-text">${b.text}</div>
        </div>`).join('')}
    </div>
    <div class="rot-plan-note">
      <strong>🔄 The Golden Rule</strong>
      Never grow crops from the same family in the same bed two years running. The minimum cycle is 3 years — 4 is better. Keep a simple notebook or use the planner to track what grew where each season.
    </div>`;
}

function renderRotGroups() {
  const GROUPS = [
    {
      name: 'Brassicas', icon: '🥦', accent: '#2ecc71',
      tag: 'Group 1 · Heavy feeders',
      crops: ['🥦 Broccoli','🥬 Cabbage','🥬 Kale','🌱 Brussels Sprouts','🥦 Cauliflower','🟤 Swede','🟤 Turnip','🌿 Kohlrabi','🥗 Pak Choi','🌿 Rocket'],
      desc: 'The most important group to rotate. Brassicas are highly susceptible to clubroot (a devastating soil fungus that persists for 20+ years) and cabbage root fly. They are also heavy nitrogen users.',
      reasons: [
        { title: 'Clubroot disease', text: 'Plasmodiophora brassicae survives dormant in soil for up to 20 years. Moving brassicas to a new bed every year is the single most effective way to prevent it establishing. Once present, the bed is effectively lost for brassicas permanently.' },
        { title: 'Cabbage root fly & white butterfly', text: 'Both overwinter as pupae in the soil where brassicas grew. A new bed breaks the cycle and reduces pressure dramatically — combined with brassica collars and netting.' },
        { title: 'Nutrient depletion', text: 'Brassicas are the heaviest nitrogen consumers in the garden. Follow them with legumes (which fix nitrogen) or precede them with a bed that received heavy organic matter the previous year.' },
      ]
    },
    {
      name: 'Legumes', icon: '🫛', accent: '#27ae60',
      tag: 'Group 2 · Nitrogen fixers',
      crops: ['🫛 Peas','🫘 Runner Beans','🫘 French Beans','🫘 Broad Beans','🌿 Mangetout','🫛 Sugar Snap'],
      desc: 'Legumes fix atmospheric nitrogen through root nodule bacteria, leaving the soil richer than they found it. They are the ideal predecessor for nitrogen-hungry brassicas in the rotation cycle.',
      reasons: [
        { title: 'Nitrogen fixation benefit', text: 'Legume roots host Rhizobium bacteria that convert atmospheric nitrogen into plant-available form. When stems and roots decompose, this nitrogen is released into the soil — free fertiliser for next year\'s crop.' },
        { title: 'Pea and bean weevil', text: 'The pea and bean weevil and broad bean aphid both overwinter in the soil near their host crops. Moving the crop annually reduces overwintering populations significantly.' },
        { title: 'Sclerotinia and chocolate spot', text: 'These fungal diseases of broad beans and peas build up in soil with repeated cropping. Rotation gives the soil time to recover biologically between crops.' },
      ]
    },
    {
      name: 'Roots & Alliums', icon: '🥕', accent: '#e67e22',
      tag: 'Group 3 · Medium feeders',
      crops: ['🥕 Carrot','🌻 Parsnip','🫀 Beetroot','🟤 Celeriac','🧅 Onion','🧅 Leek','🧄 Garlic','🧅 Shallot','🌿 Celery','🧅 Spring Onion'],
      desc: 'Root vegetables and alliums share a bed in most rotation plans. They prefer soils that were not freshly manured (which causes forking in roots) and dislike competition from weeds.',
      reasons: [
        { title: 'Carrot root fly', text: 'One of the most damaging root vegetable pests. The adult fly lays eggs in soil near carrots and parsnips; larvae tunnel through roots. Moving beds cuts overwintering larval numbers. Barrier fleece is also essential.' },
        { title: 'Allium white rot & leek rust', text: 'White rot (Sclerotium cepivorum) persists for 20+ years in soil. Leek rust spreads rapidly between plants. Rotating alliums to a fresh bed each year slows the build-up of both.' },
        { title: 'No fresh manure for roots', text: 'Apply organic matter to this bed in autumn of the PREVIOUS year. Fresh manure causes forking and hairy growth in carrots and parsnips — the rotation plan accounts for this naturally.' },
      ]
    },
    {
      name: 'Potatoes & Tomatoes', icon: '🥔', accent: '#c0392b',
      tag: 'Group 4 · Solanaceae',
      crops: ['🥔 Potato','🍅 Tomato','🍆 Aubergine','🫑 Pepper','🥒 Tomatillo'],
      desc: 'Solanaceae (nightshades) are grouped together because they share pests and diseases — most critically potato blight, which also destroys tomatoes. They should never follow each other.',
      reasons: [
        { title: 'Potato blight (Phytophthora infestans)', text: 'This devastating fungal-like pathogen affects both potatoes and tomatoes. Spores survive in soil on infected tuber debris. Never grow potatoes or tomatoes in a bed that had either crop the previous year, and always remove all tuber debris at harvest.' },
        { title: 'Potato cyst nematode', text: 'These microscopic worms cause serious yield loss in potatoes and persist in soil for many years in cyst form. A 4-year rotation (or longer) is strongly recommended. Check for resistant varieties (Sarpo series) if nematodes are known in your soil.' },
        { title: 'Common scab (Streptomyces scabies)', text: 'Worse when soil pH is above 6.0. Rotate potatoes to a bed that is slightly more acidic, and avoid liming the potato bed specifically. A 3–4 year break reduces incidence.' },
      ]
    },
    {
      name: 'Cucurbits', icon: '🥒', accent: '#16a085',
      tag: 'Group 5 · Hungry sprawlers',
      crops: ['🥒 Courgette','🎃 Squash','🥒 Cucumber','🍉 Melon','🎃 Pumpkin','🥒 Marrow'],
      desc: 'Cucurbits are heavy feeders that love rich, moisture-retentive soil. They benefit most from being planted into a bed that received heavy compost or manure the previous autumn.',
      reasons: [
        { title: 'Powdery mildew and cucumber mosaic virus', text: 'Both diseases build up in soil and on plant debris. Rotating cucurbits reduces the innoculum load in the soil and helps control aphid-spread viral diseases.' },
        { title: 'Vine weevil and soil pests', text: 'Cucurbit roots are attractive to a number of soil-dwelling larvae. Rotation to fresh ground reduces pest pressure, especially in beds where courgettes and squash grew the previous year.' },
      ]
    },
    {
      name: 'Sweetcorn', icon: '🌽', accent: '#f39c12',
      tag: 'Group 6 · Grass family',
      crops: ['🌽 Sweetcorn'],
      desc: 'Sweetcorn is a grass (Poaceae) and shares no diseases with other common vegetable families. It is an ideal gap-filler in the rotation — though it still benefits from moving around beds each year.',
      reasons: [
        { title: 'Smut disease (Ustilago maydis)', text: 'A distinctive fungal disease producing dramatic grey-black swellings on corn. While uncommon in the UK, it can persist in soil. Rotation reduces risk.' },
        { title: 'Soil structure benefit', text: 'Sweetcorn roots penetrate deep and leave useful root channels that benefit subsequent crops. It makes an excellent break crop between heavier feeders and can be intercropped with squash and beans (the "Three Sisters" method).' },
      ]
    },
  ];

  document.getElementById('rotPanel-groups').innerHTML = GROUPS.map((g, i) => {
    const chipHtml = g.crops.map(c => `<span class="rot-crop-chip">${c}</span>`).join('');
    const reasonHtml = g.reasons.map(r => `
      <div class="rot-group-reason">
        <strong>Why rotate: ${r.title}</strong>${r.text}
      </div>`).join('');
    return `
    <div class="rot-group-card" style="border-top:3px solid ${g.accent}">
      <div class="rot-group-header">
        <div class="rot-group-icon">${g.icon}</div>
        <div class="rot-group-meta">
          <div class="rot-group-tag">${g.tag}</div>
          <div class="rot-group-name">${g.name}</div>
          <div class="rot-group-crops">${g.crops.slice(0,5).map(c=>c.split(' ').slice(1).join(' ')).join(' · ')}${g.crops.length > 5 ? ` · +${g.crops.length-5} more` : ''}</div>
        </div>
        <span class="rot-group-arrow">▼</span>
      </div>
      <div class="rot-group-body">
        <p class="rot-group-desc">${g.desc}</p>
        <div class="sacc-section">
          <div class="sacc-label">🌱 Crops in this group</div>
          <div class="rot-crop-chips">${chipHtml}</div>
        </div>
        <div class="sacc-section">
          <div class="sacc-label">🔄 Rotation reasons</div>
          ${reasonHtml}
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderRotNoRotate() {
  const NO_ROT = [
    { icon:'🧄', name:'Garlic', reason:'Perennial in behaviour — often grown in the same productive bed for years with no ill effects. Still benefits from moving every 3 years.' },
    { icon:'🌿', name:'Asparagus', reason:'Perennial crop that stays in the same bed for 20+ years. Cannot be rotated — instead, choose the bed carefully and never plant where potatoes grew recently.' },
    { icon:'🌹', name:'Rhubarb', reason:'Perennial that lives in the same spot for 5–10 years. Plant in a permanent bed and divide crowns every 5 years to maintain vigour.' },
    { icon:'🍓', name:'Strawberry', reason:'Needs renewing every 3 years regardless, so rotation is built in naturally — move to fresh ground when replanting runners.' },
    { icon:'🫐', name:'Blueberry', reason:'Permanent acidic bed crop. Can\'t be rotated due to extreme soil pH requirement. Use dedicated ericaceous beds or large pots.' },
    { icon:'🍓', name:'Raspberry', reason:'Permanent canes that grow in the same row for 8–10 years. Replace and move to fresh ground after old canes are exhausted.' },
    { icon:'🌿', name:'Mint', reason:'Perennial herb best kept in a container to control spreading. No rotation needed or practical.' },
    { icon:'🌿', name:'Chives', reason:'Hardy perennial that self-seeds and persists. Leave in place and divide clumps every 3 years.' },
    { icon:'🌱', name:'Thyme, Sage, Rosemary', reason:'Woody perennial herbs that live in the same spot for years. Plant in their permanent home and prune annually.' },
    { icon:'🥬', name:'Perpetual Spinach / Chard', reason:'Can be treated as perennial in mild winters. Generally stays productive for 2 seasons in the same spot without issue.' },
    { icon:'🌻', name:'Jerusalem Artichoke', reason:'Extremely persistent — any tuber left in soil regrows. Practically impossible to rotate. Assign a permanent bed and harvest meticulously.' },
  ];

  document.getElementById('rotPanel-noneed').innerHTML = `
    <div class="rot-plan-note" style="margin-bottom:1.25rem">
      <strong>ℹ️ Permanent & perennial crops</strong>
      These crops either cannot be rotated (perennials), don\'t benefit significantly (fast-growing annuals like salads), or have such specific requirements they need a permanent home. Plan your beds so permanent crops don\'t interfere with the main rotation.
    </div>
    <div class="rot-norot-grid">
      ${NO_ROT.map(c => `
        <div class="rot-norot-card">
          <div class="rot-norot-name">${c.icon} ${c.name}</div>
          <div class="rot-norot-reason">${c.reason}</div>
        </div>`).join('')}
    </div>
    <div class="rot-plan-note" style="margin-top:1.25rem">
      <strong>🥬 What about salads, herbs & sweetcorn?</strong>
      Fast-growing salads (lettuce, radish, rocket, spinach) have so few soil-borne disease issues they can be slotted into gaps anywhere. Still avoid growing them immediately after a crop from the same family in the same spot. Sweetcorn should be included in the rotation plan but is less critical than brassicas and potatoes.
    </div>`;
}

function renderRotPlan() {
  const YEARS = [
    {
      num:'1', accent:'#2ecc71', bg:'rgba(46,204,113,0.12)',
      title:'Brassicas', sub:'After legumes — benefit from fixed nitrogen',
      groups:[
        { name:'Bed A — Brassicas', crops:'Broccoli, Cabbage, Kale, Brussels Sprouts, Cauliflower, Swede, Turnip' },
        { name:'Bed B — Roots & Alliums', crops:'Carrot, Parsnip, Onion, Leek, Garlic, Beetroot, Celeriac' },
        { name:'Bed C — Potatoes', crops:'Potato (first earlies, second earlies, maincrops), Tomatoes outside' },
        { name:'Bed D — Legumes', crops:'Peas, Broad Beans, Runner Beans, French Beans, Mangetout' },
      ]
    },
    {
      num:'2', accent:'#e67e22', bg:'rgba(230,126,34,0.12)',
      title:'Roots & Alliums', sub:'Rotate to where brassicas were — fresh ground, no fresh manure',
      groups:[
        { name:'Bed A — Legumes', crops:'Peas, Broad Beans, Runner Beans, French Beans — fixing nitrogen' },
        { name:'Bed B — Brassicas', crops:'Broccoli, Cabbage, Kale, Brussels Sprouts, Cauliflower, Swede' },
        { name:'Bed C — Roots & Alliums', crops:'Carrot, Parsnip, Onion, Leek, Garlic, Beetroot' },
        { name:'Bed D — Potatoes & Solanaceae', crops:'Potato, Tomato, Pepper, Aubergine' },
      ]
    },
    {
      num:'3', accent:'#c0392b', bg:'rgba(192,57,43,0.12)',
      title:'Potatoes & Solanaceae', sub:'Into the legume bed — good structure, disease break',
      groups:[
        { name:'Bed A — Roots & Alliums', crops:'Carrot, Parsnip, Onion, Leek, Garlic, Beetroot, Celeriac' },
        { name:'Bed B — Legumes', crops:'Peas, Broad Beans, Runner Beans, French Beans — nitrogen fixing' },
        { name:'Bed C — Brassicas', crops:'Broccoli, Cabbage, Kale, Brussels Sprouts, Cauliflower, Swede' },
        { name:'Bed D — Potatoes & Solanaceae', crops:'Potato, Tomato, Pepper, Aubergine, Courgette, Squash' },
      ]
    },
    {
      num:'4', accent:'#27ae60', bg:'rgba(39,174,96,0.12)',
      title:'Legumes', sub:'Final year — fix nitrogen ready for brassicas again in Year 1',
      groups:[
        { name:'Bed A — Potatoes & Solanaceae', crops:'Potato, Tomato, Pepper, Aubergine' },
        { name:'Bed B — Roots & Alliums', crops:'Carrot, Parsnip, Onion, Leek, Garlic, Beetroot' },
        { name:'Bed C — Legumes', crops:'Peas, Broad Beans, Runner Beans, French Beans, Mangetout' },
        { name:'Bed D — Brassicas', crops:'Broccoli, Cabbage, Kale, Brussels Sprouts, Cauliflower, Swede' },
      ]
    },
  ];

  document.getElementById('rotPanel-plan').innerHTML = `
    <p class="rot-plan-intro">
      Divide your growing area into 4 beds or sections. Each group moves one bed clockwise each year — completing a full 4-year cycle. After Year 4, Year 1 begins again. Beds need not be equal in size — adjust to what you grow most of. Add cucurbits and sweetcorn flexibly into available space each year.
    </p>
    <div class="rot-plan-grid">
      ${YEARS.map(y => `
        <div class="rot-year-card" style="background:${y.bg};border-color:${y.accent}40">
          <div class="rot-year-header" style="background:${y.accent}25;border-bottom:1px solid ${y.accent}40">
            <div class="rot-year-num" style="color:${y.accent}">Y${y.num}</div>
            <div>
              <div class="rot-year-title">${y.title}</div>
              <div class="rot-year-sub">${y.sub}</div>
            </div>
          </div>
          <div class="rot-year-body">
            ${y.groups.map(g => `
              <div class="rot-year-group">
                <div class="rot-year-group-name">${g.name}</div>
                <div class="rot-year-group-crops">${g.crops}</div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    <div class="rot-plan-note">
      <strong>💡 Practical tips for success</strong>
      Keep a simple notebook or spreadsheet noting which bed held which group each year. Take a photo of each bed at the start of the season. If a disease like clubroot or potato blight strikes, note the bed number and do not return that group for at least 4–6 years. Cucurbits and sweetcorn slot in wherever space allows — place them between the main groups. Green manures (phacelia, mustard, clover) can be sown in any empty bed during the rotation and dug in 4–6 weeks before planting.
    </div>`;
}

function buildSearchIndex() {
  searchIndex = [];

  searchIndex.push({ icon:'🌱', title:'Quick Start Guide', desc:'New to growing? Start here', tag:'🌱 Get Started',
    keywords:'quick start guide beginner new growing beds soil compost planner calendar',
    action: () => document.getElementById('wdytd').scrollIntoView({ behavior:'smooth', block:'start' }) });

  // ── Produce guides ──
  const catLabels = { fruiting:'🍅 Fruiting', roots:'🥕 Roots', brassicas:'🥦 Brassicas',
    alliums:'🧅 Alliums', legumes:'🫛 Legumes', salads:'🥗 Salads', herbs:'🌿 Herbs', fruits:'🍓 Fruits' };
  Object.entries(produce).forEach(([cat, items]) => {
    items.forEach(p => {
      searchIndex.push({
        icon:  p.icon,
        title: p.name,
        desc:  `${p.sow} · Harvest: ${p.harvest} · ${catLabels[cat]}`,
        tag:   catLabels[cat],
        keywords: [p.name, p.latin || '', p.tag, p.sow, p.harvest, cat,
          ...(p.varieties || []).map(v => v.name),
          ...(p.steps || []).map(s => s.title)
        ].join(' ').toLowerCase(),
        action: () => {
          document.getElementById('guides').scrollIntoView({ behavior:'smooth', block:'start' });
          setTimeout(() => {
            document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
            const tab = document.querySelector(`.ptab[data-cat="${cat}"]`);
            if (tab) { tab.classList.add('active'); renderCards(cat); }
            setTimeout(() => openDetail(cat, p.id), 150);
          }, 350);
        }
      });
    });
  });

  // ── Growing Beds ──
  const bedsSections = [
    { icon:'🌱', title:'In-Ground Beds',           tab:'types',     kw:'in ground bed soil dug over flat traditional' },
    { icon:'🪵', title:'Raised Beds — Types',       tab:'types',     kw:'raised bed standard types hugelkultur accessible trough' },
    { icon:'⚙️', title:'Raised Bed Materials',      tab:'materials', kw:'raised bed materials timber oak steel brick recycled pallet sleeper' },
    { icon:'📐', title:'Raised Bed Sizes & Dimensions',tab:'sizes',  kw:'raised bed size height width depth fill lasagne' },
    { icon:'🔧', title:'Building a Raised Bed',     tab:'build',     kw:'build raised bed plans instructions steps diy' },
    { icon:'🏗', title:'Plant Support Structures',   tab:'structures',kw:'plant structures wigwam arch trellis cloche fruit cage espalier support' },
    { icon:'🌀', title:'Wigwam & Tepee Supports',   tab:'structures',kw:'wigwam tepee bamboo cane runner beans support' },
    { icon:'🍎', title:'Espalier & Fan Fruit Training',tab:'structures',kw:'espalier fan cordon fruit tree wall trained apple pear' },
    { icon:'🫐', title:'Fruit Cage',                tab:'structures',kw:'fruit cage netting bird soft fruit strawberry raspberry' },
    { icon:'🌿', title:'Cloche & Hoop Tunnel',      tab:'structures',kw:'cloche hoop tunnel fleece frost protection season extend' },
    { icon:'🪵', title:'Railway Sleeper Beds',       tab:'types',     kw:'railway sleeper bed oak hardwood permanent' },
    { icon:'⚙️', title:'Corrugated Steel Raised Beds',tab:'types',   kw:'corrugated steel metal bed galvanised corten modern' },
  ];
  bedsSections.forEach(s => {
    searchIndex.push({
      icon: s.icon, title: s.title, desc: '🌱 Growing Beds', tag: '🌱 Beds',
      keywords: s.kw + ' bed growing raised',
      action: () => {
        document.getElementById('beds').scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => {
          document.querySelectorAll('.bdtab').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.bdtab-panel').forEach(p => p.classList.remove('active'));
          const btn = document.querySelector(`.bdtab[data-bdtab="${s.tab}"]`);
          const panel = document.querySelector(`.bdtab-panel[data-bdpanel="${s.tab}"]`);
          if (btn) btn.classList.add('active');
          if (panel) panel.classList.add('active');
        }, 350);
      }
    });
  });

  // ── Soil types ──
  SOIL_TYPES.forEach(st => {
    searchIndex.push({
      icon: '🌍',
      title: st.name,
      desc: `Soil type · pH ${st.typicalPh} · ${st.drains} drainage`,
      tag: '🌍 Soil',
      keywords: `${st.name} soil ${st.typicalPh} ${st.texture} ${st.fertility} pH`.toLowerCase(),
      action: () => {
        document.getElementById('soil').scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => soilOpenDetail('types', st.id), 400);
      }
    });
  });

  // ── pH crops ──
  PH_CROPS.filter(p => p.crops.length).forEach(p => {
    p.crops.forEach(crop => {
      searchIndex.push({
        icon: '⚗️',
        title: crop.replace(/[🫐🥔🍓🫐🌹🍅🥕🥒🌽🧅🧄🫛🫘🥬🌿🫀🌿🥦🥬🌱🟣🍎🍐🖤🟢🥦🧅🌻🟤🥦🌿🌱]/g, '').trim(),
        desc:  `Ideal pH ${p.label}`,
        tag:   '⚗️ pH Guide',
        keywords: `${crop} ph ${p.label} acid alkaline soil`.toLowerCase(),
        action: () => {
          document.getElementById('soil').scrollIntoView({ behavior:'smooth', block:'start' });
          setTimeout(() => {
            document.querySelectorAll('#soilTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            const phBtn = document.querySelector('#soilTabs [data-soil-cat="ph"]');
            if (phBtn) { phBtn.classList.add('active'); phBtn.setAttribute('aria-selected','true'); soilShowCat('ph'); }
          }, 400);
        }
      });
    });
  });

  // ── Calendar months ──
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthFull = { Jan:'January',Feb:'February',Mar:'March',Apr:'April',May:'May',Jun:'June',
    Jul:'July',Aug:'August',Sep:'September',Oct:'October',Nov:'November',Dec:'December' };
  months.forEach(m => {
    if (!calendarData[m]) return;
    const allItems = [...(calendarData[m].sow||[]), ...(calendarData[m].tend||[]), ...(calendarData[m].harvest||[])];
    allItems.forEach(item => {
      searchIndex.push({
        icon: '📅',
        title: item,
        desc:  `${monthFull[m]} · Growing Calendar`,
        tag:   '📅 Calendar',
        keywords: `${item} ${monthFull[m]} ${m} sow plant tend harvest calendar`.toLowerCase(),
        action: () => {
          document.getElementById('calendar').scrollIntoView({ behavior:'smooth', block:'start' });
          setTimeout(() => {
            document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
            const btn = document.querySelector(`.month-btn[onclick*="${m}"]`);
            if (btn) btn.classList.add('active');
            renderCalendar(m);
          }, 350);
        }
      });
    });
  });

  // ── Compost tabs ──
  const compostSections = [
    { icon:'🏗', title:'How to Build a Compost Pile',   tag:'♻️ Compost', tab:'build',   kw:'compost build pile hot cold turning layering' },
    { icon:'✅', title:'What to Add to Compost',        tag:'♻️ Compost', tab:'add',     kw:'compost add kitchen waste greens browns nettles coffee grass' },
    { icon:'🚫', title:'What NOT to Add to Compost',    tag:'♻️ Compost', tab:'avoid',   kw:'compost avoid meat dairy diseased pest rats' },
    { icon:'⚖️', title:'Brown / Green Ratio',           tag:'♻️ Compost', tab:'ratio',   kw:'compost ratio browns greens carbon nitrogen smell slimy dry' },
    { icon:'📦', title:'Compost Bins & Storage Types',  tag:'♻️ Compost', tab:'store',   kw:'compost bin dalek tumbler worm farm pallet timber leaf mould' },
    { icon:'🌱', title:'When Compost is Ready to Use',  tag:'♻️ Compost', tab:'ready',   kw:'compost ready finished dark crumbly earthy use mulch' },
  ];
  compostSections.forEach(s => {
    searchIndex.push({
      icon: s.icon, title: s.title, desc: s.tag, tag: s.tag,
      keywords: s.kw,
      action: () => {
        document.getElementById('compost').scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => {
          document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.ctab-panel').forEach(p => p.classList.remove('active'));
          const btn = document.querySelector(`.ctab[data-tab="${s.tab}"]`);
          const panel = document.querySelector(`.ctab-panel[data-panel="${s.tab}"]`);
          if (btn) btn.classList.add('active');
          if (panel) panel.classList.add('active');
        }, 350);
      }
    });
  });

  // ── Fencing types ──
  const fenceSections = [
    { icon:'🪵', title:'Post & Wire Mesh Fencing',      kw:'post wire mesh rabbit galvanised staple' },
    { icon:'🌿', title:'Stock Fencing (Rylock)',         kw:'stock fencing rylock field fence livestock deer' },
    { icon:'⚡', title:'Electric Fencing',              kw:'electric fence badger fox energiser wire' },
    { icon:'🏗', title:'Timber Close-Board Fence',      kw:'close board timber featheredge panel privacy' },
    { icon:'🔲', title:'Hardware Cloth Mesh',           kw:'hardware cloth fine wire mesh rodent rat mouse' },
    { icon:'🕸', title:'Anti-Bird Netting',             kw:'bird netting pigeon cage brassica fruit' },
    { icon:'🟩', title:'Palisade Fencing',              kw:'palisade steel security anti-climb fleur' },
    { icon:'🔲', title:'V Mesh Panel Fencing',          kw:'v mesh panel rigid welded security' },
  ];
  fenceSections.forEach(s => {
    searchIndex.push({
      icon: s.icon, title: s.title, desc: '🔩 Fencing', tag: '🔩 Fencing',
      keywords: s.kw + ' fencing fence',
      action: () => {
        document.getElementById('fencing').scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => {
          document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.ftab-panel').forEach(p => p.classList.remove('active'));
          const btn = document.querySelector('.ftab[data-ftab="types"]');
          const panel = document.querySelector('.ftab-panel[data-fpanel="types"]');
          if (btn) btn.classList.add('active');
          if (panel) panel.classList.add('active');
        }, 350);
      }
    });
  });

  // ── Pest/intruder fencing ──
  const pests = ['Humans','Rabbits','Rats & Mice','Large Birds','Foxes','Badgers'];
  pests.forEach(pest => {
    searchIndex.push({
      icon: '🔩', title: `Keeping out ${pest}`,
      desc: 'Fencing by intruder type', tag: '🔩 Fencing',
      keywords: `${pest.toLowerCase()} fencing fence keep out intruder pest`,
      action: () => {
        document.getElementById('fencing').scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => {
          document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.ftab-panel').forEach(p => p.classList.remove('active'));
          const btn = document.querySelector('.ftab[data-ftab="intruders"]');
          const panel = document.querySelector('.ftab-panel[data-fpanel="intruders"]');
          if (btn) btn.classList.add('active');
          if (panel) panel.classList.add('active');
        }, 350);
      }
    });
  });

  // ── Winter maintenance ──
  const winterSections = [
    { icon:'🌱', title:'Closing Down Growing Beds',       tab:'beds',       kw:'winter beds weed compost cover cardboard green manure crop rotation' },
    { icon:'💧', title:'Pond & Water Butt Winter Care',   tab:'water',      kw:'winter pond water butt tap drain freeze net leaves' },
    { icon:'🏚', title:'Shed & Greenhouse Winter Maintenance', tab:'structures', kw:'winter shed greenhouse summerhouse roof gutter lock clean treat' },
    { icon:'🔧', title:'Tools & Equipment Winter Service',tab:'tools',      kw:'winter tools sharpen oil lawnmower service strimmer battery store' },
    { icon:'🪴', title:'Pots & Containers Winter Care',   tab:'containers', kw:'winter pots containers terracotta frost protect wrap hanging basket' },
    { icon:'✅', title:'Winter Close-Down Checklist',     tab:'checklist',  kw:'winter checklist tasks maintenance close down' },
  ];
  winterSections.forEach(s => {
    searchIndex.push({
      icon: s.icon, title: s.title, desc: '❄️ Winter Maintenance', tag: '❄️ Winter',
      keywords: s.kw,
      action: () => {
        document.getElementById('winter').scrollIntoView({ behavior:'smooth', block:'start' });
        setTimeout(() => {
          document.querySelectorAll('.wtab').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.wtab-panel').forEach(p => p.classList.remove('active'));
          const btn = document.querySelector(`.wtab[data-wtab="${s.tab}"]`);
          const panel = document.querySelector(`.wtab-panel[data-wpanel="${s.tab}"]`);
          if (btn) btn.classList.add('active');
          if (panel) { panel.classList.add('active'); if (s.tab === 'checklist') buildWinterChecklist(); }
        }, 350);
      }
    });
  });

  // ── Garden Planner ──
  searchIndex.push({ icon:'🗺', title:'Garden Planner', desc:'Design your plot in 2D and 3D', tag:'🗺 Planner',
    keywords:'garden planner plot design 2d 3d grid zone bed fence gate crop',
    action: () => document.getElementById('planner').scrollIntoView({ behavior:'smooth', block:'start' }) });
  searchIndex.push({ icon:'🧭', title:'Compass & Sun Widget', desc:'Sunrise/sunset by postcode', tag:'🗺 Planner',
    keywords:'compass sun sunrise sunset solar noon postcode zip daylight planner',
    action: () => document.getElementById('planner').scrollIntoView({ behavior:'smooth', block:'start' }) });

  // ── Tips ──
  searchIndex.push({ icon:'💡', title:"Grower's Tips", desc:'Top growing tips and advice', tag:'💡 Tips',
    keywords:'tips growers advice watering feeding rotation companion planting',
    action: () => document.getElementById('tips').scrollIntoView({ behavior:'smooth', block:'start' }) });
  // ── Pests ──
  Object.entries(PEST_DATA).forEach(([cat, pests]) => {
    pests.forEach(p => {
      searchIndex.push({
        icon: p.icon,
        title: p.name,
        desc: `${p.tag} · Pests & Problems`,
        tag: '🐛 Pests',
        keywords: `${p.name} ${p.tag} pest identify symptoms control organic ${p.desc.substring(0,80)}`.toLowerCase(),
        action: () => {
          document.getElementById('pests').scrollIntoView({ behavior:'smooth', block:'start' });
          setTimeout(() => {
            document.querySelectorAll('#pestTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            const btn = document.querySelector(`#pestTabs [data-pest-cat="${cat}"]`);
            if (btn) { btn.classList.add('active'); btn.setAttribute('aria-selected','true'); pestShowCat(cat); }
            setTimeout(() => pestOpenDetail(cat, p.id), 100);
          }, 400);
        }
      });
    });
  });

  // ── Tools ──
  const toolsCatLabels = { digging:'⛏️ Digging', cutting:'✂️ Cutting', weeding:'🌿 Weeding', maintenance:'🔧 Maintenance', power:'⚡ Power Tools', other:'📦 Other Tools' };
  Object.entries(TOOLS_DATA).forEach(([cat, tools]) => {
    tools.forEach(t => {
      searchIndex.push({
        icon: t.icon,
        title: t.name,
        desc: `${TIER_LABEL[t.tier]} · ${toolsCatLabels[cat]}`,
        tag: '🔧 Tools',
        keywords: `${t.name} ${t.tag} ${t.tier} ${t.brands.map(b=>b.name+' '+b.model).join(' ')} tool equipment ${t.desc.substring(0,60)}`.toLowerCase(),
        action: () => {
          document.getElementById('tools').scrollIntoView({ behavior:'smooth', block:'start' });
          setTimeout(() => {
            document.querySelectorAll('#toolsTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            const btn = document.querySelector(`#toolsTabs [data-tools-cat="${cat}"]`);
            if (btn) { btn.classList.add('active'); btn.setAttribute('aria-selected','true'); }
            
            toolsShowCat(cat, 'all');
            setTimeout(() => toolsOpenDetail(cat, t.id), 100);
          }, 400);
        }
      });
    });
  });

  // ── Weeds ──
  Object.entries(WEED_DATA).forEach(([cat, weeds]) => {
    weeds.forEach(w => {
      searchIndex.push({
        icon: w.icon,
        title: w.name,
        desc: `${w.dangerLabel} · ${cat === 'perennial' ? 'Perennial Weed' : 'Annual Weed'}`,
        tag: '🌿 Weeds',
        keywords: `${w.name} ${w.tag} weed identify control ${w.desc.substring(0,80)}`.toLowerCase(),
        action: () => {
          document.getElementById('weeds').scrollIntoView({ behavior:'smooth', block:'start' });
          setTimeout(() => {
            document.querySelectorAll('#weedTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            const btn = document.querySelector(`#weedTabs [data-weed-cat="${cat}"]`);
            if (btn) { btn.classList.add('active'); btn.setAttribute('aria-selected','true'); weedShowCat(cat); }
            setTimeout(() => weedOpenDetail(cat, w.id), 100);
          }, 400);
        }
      });
    });
  });

  // ── Diseases ──
  Object.entries(DISEASE_DATA).forEach(([cat, diseases]) => {
    diseases.forEach(d => {
      searchIndex.push({
        icon: d.icon,
        title: d.name,
        desc: `${d.severityLabel} · ${d.tag}`,
        tag: '🍄 Diseases',
        keywords: `${d.name} ${d.tag} disease ${d.affects} identify prevent control ${d.desc.substring(0,80)}`.toLowerCase(),
        action: () => {
          document.getElementById('diseases').scrollIntoView({ behavior:'smooth', block:'start' });
          setTimeout(() => {
            document.querySelectorAll('#diseaseTabs .ptab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            const btn = document.querySelector(`#diseaseTabs [data-disease-cat="${cat}"]`);
            if (btn) { btn.classList.add('active'); btn.setAttribute('aria-selected','true'); diseaseShowCat(cat); }
            setTimeout(() => diseaseOpenDetail(cat, d.id), 100);
          }, 400);
        }
      });
    });
  });

  console.log(`Search index built: ${searchIndex.length} entries`);
}

function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.add('active');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
  document.getElementById('searchEmpty').style.display = 'none';
  searchSelectedIdx = -1;
  setTimeout(() => document.getElementById('searchInput').focus(), 50);
  document.body.style.overflow = 'hidden';
  showSearchSuggestions();
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('active');
  document.body.style.overflow = '';
  searchSelectedIdx = -1;
}

function showSearchSuggestions() {
  // Show popular suggestions when search is empty
  const suggestions = [
    { icon:'🍅', title:'Tomatoes', tag:'🍅 Fruiting' },
    { icon:'🌍', title:'Soil Guide', tag:'🌍 Soil' },
    { icon:'♻️', title:'Compost', tag:'♻️ Compost' },
    { icon:'🔧', title:'Winter Tools Service', tag:'❄️ Winter' },
    { icon:'🔩', title:'Rabbit-proof fencing', tag:'🔩 Fencing' },
    { icon:'📅', title:'What to sow in March', tag:'📅 Calendar' },
  ];
  const results = document.getElementById('searchResults');
  results.innerHTML = `<div class="search-result-group-label">Popular</div>` +
    suggestions.map((s, i) => `
      <div class="search-result-item" role="option" data-idx="${i}" onclick="runSuggestion('${s.title}')">
        <span class="search-result-icon">${s.icon}</span>
        <div class="search-result-body">
          <div class="search-result-title">${s.title}</div>
        </div>
        <span class="search-result-tag">${s.tag}</span>
      </div>`).join('');
}

function runSuggestion(title) {
  document.getElementById('searchInput').value = title;
  runSearch(title);
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  const resultsEl = document.getElementById('searchResults');
  const emptyEl = document.getElementById('searchEmpty');
  searchSelectedIdx = -1;

  if (!q) { showSearchSuggestions(); emptyEl.style.display = 'none'; return; }

  // Score each item
  const scored = searchIndex.map(item => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    if (titleLower === q) score += 100;
    else if (titleLower.startsWith(q)) score += 60;
    else if (titleLower.includes(q)) score += 40;
    if (item.keywords.includes(q)) score += 20;
    // Partial word matching
    const words = q.split(/\s+/);
    words.forEach(w => {
      if (w.length < 2) return;
      if (titleLower.includes(w)) score += 15;
      if (item.keywords.includes(w)) score += 8;
    });
    return { item, score };
  }).filter(x => x.score > 0).sort((a,b) => b.score - a.score).slice(0, 12);

  if (!scored.length) {
    resultsEl.innerHTML = '';
    emptyEl.style.display = 'flex';
    return;
  }

  emptyEl.style.display = 'none';

  // Group by tag
  const groups = {};
  scored.forEach(({ item }) => {
    if (!groups[item.tag]) groups[item.tag] = [];
    groups[item.tag].push(item);
  });

  // Highlight match in title
  function highlight(text, q) {
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  let html = '';
  let globalIdx = 0;
  Object.entries(groups).forEach(([tag, items]) => {
    html += `<div class="search-result-group-label">${tag}</div>`;
    items.forEach(item => {
      html += `<div class="search-result-item" role="option" data-idx="${globalIdx}" onclick="selectSearchResult(${globalIdx})">
        <span class="search-result-icon">${item.icon}</span>
        <div class="search-result-body">
          <div class="search-result-title">${highlight(item.title, q)}</div>
          <div class="search-result-desc">${item.desc}</div>
        </div>
        <span class="search-result-tag">${item.tag}</span>
      </div>`;
      globalIdx++;
    });
  });

  resultsEl.innerHTML = html;
  // Store ordered results for keyboard nav
  resultsEl._results = scored.map(s => s.item);
}

function selectSearchResult(idx) {
  const resultsEl = document.getElementById('searchResults');
  const items = resultsEl._results || [];
  const item = items[idx];
  if (!item) return;
  closeSearch();
  setTimeout(() => item.action(), 100);
}

function updateSearchSelection(dir) {
  const resultsEl = document.getElementById('searchResults');
  const items = resultsEl.querySelectorAll('.search-result-item');
  if (!items.length) return;
  items[searchSelectedIdx]?.classList.remove('selected');
  searchSelectedIdx = (searchSelectedIdx + dir + items.length) % items.length;
  items[searchSelectedIdx]?.classList.add('selected');
  items[searchSelectedIdx]?.scrollIntoView({ block:'nearest' });
}

// Search keyboard events
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('input', e => runSearch(e.target.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); updateSearchSelection(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); updateSearchSelection(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const resultsEl = document.getElementById('searchResults');
        const items = resultsEl.querySelectorAll('.search-result-item');
        if (searchSelectedIdx >= 0 && items[searchSelectedIdx]) {
          items[searchSelectedIdx].click();
        } else if (items[0]) {
          items[0].click();
        }
      } else if (e.key === 'Escape') closeSearch();
    });
  }
});

// Global keyboard shortcut: Cmd/Ctrl+K or /
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
    e.preventDefault(); openSearch();
  }
  if (e.key === 'Escape' && document.getElementById('searchOverlay').classList.contains('active')) closeSearch();
});

// ── INIT ──
loadThree();
buildPalette();
applyPlotSize();
initTileButtons();
initGalleries();
updateDeleteLastBtn();
renderSoilGuide();
renderCropRotation();
renderToolsGuide();
renderPestGuide();
renderWeedGuide();
renderDiseaseGuide();
buildSearchIndex();

// Restore saved plan from localStorage
if (loadSavedPlan()) {
  applyPlotSize();
  renderGrid();
  renderZonesList();
  updateDeleteLastBtn();
}

// ── BED PHOTOS — fetch via Wikipedia API (same pattern as produce photos) ──
// ── FENCE TYPE PHOTOS ─────────────────────────────────────────────────────
// ── TOOL PHOTOS ────────────────────────────────────────────────────────────
// ── TOOL PHOTOS ────────────────────────────────────────────────────────────
async function fetchToolPhotos() {
  // Build the full article map (TOOL_WIKI_TITLES base + TOOL_WIKI_ARTICLE_OVERRIDES override)
  const toolArticle = Object.assign({}, TOOL_WIKI_TITLES, TOOL_WIKI_ARTICLE_OVERRIDES);

  // Deduplicate: article name → list of tool IDs that use it
  const articleToIds = {};
  for (const [id, article] of Object.entries(toolArticle)) {
    const key = article.replace(/_/g, ' ');
    if (!articleToIds[key]) articleToIds[key] = [];
    articleToIds[key].push(id);
  }

  // Fetch each unique article via Wikipedia REST Summary API
  await Promise.allSettled(Object.entries(articleToIds).map(async ([article, ids]) => {
    try {
      const slug = encodeURIComponent(article.replace(/ /g, '_'));
      const resp = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
        { headers: { Accept: 'application/json' } }
      );
      if (!resp.ok) return;
      const data = await resp.json();
      const src = data.thumbnail?.source || data.originalimage?.source;
      if (src) ids.forEach(id => { TOOL_WIKI_PHOTOS[id] = src; });
    } catch(e) {}
  }));

  // Re-render current tools tab with all photos now loaded
  const activeBtn = document.querySelector('#toolsTabs .ptab.active');
  const activeTier = 'all';
  if (activeBtn) toolsShowCat(activeBtn.dataset.toolsCat, activeTier);
}

// ── SOIL TYPE PHOTOS ────────────────────────────────────────────────────────
async function fetchSoilPhotos() {
  const SOIL_WIKI = {
    loam:   'Loam',
    sandy:  'Sand',
    clay:   'Clay',
    chalk:  'Chalk',
    peat:   'Peat',
    silt:   'Silt',
  };
  const ids    = Object.keys(SOIL_WIKI);
  const titles = Object.values(SOIL_WIKI);
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join('|'))}&prop=pageimages&format=json&pithumbsize=500&origin=*&redirects=1`;
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
      const orig = SOIL_WIKI[id].replace(/_/g,' ').toLowerCase();
      finalToId[chain[orig] || orig] = id;
    }
    for (const page of Object.values(data.query.pages)) {
      if (!page.thumbnail) continue;
      const matchId = finalToId[page.title.toLowerCase()];
      if (matchId) SOIL_WIKI_PHOTOS[matchId] = page.thumbnail.source;
    }
    // Direct Wikimedia Commons overrides for soil types
    const SOIL_COMMONS_OVERRIDES = {
      clay: 'https://commons.wikimedia.org/wiki/Special:FilePath/Red-clay-sticky-plastic-when-wet.jpg',
    };
    for (const [id, url] of Object.entries(SOIL_COMMONS_OVERRIDES)) {
      SOIL_WIKI_PHOTOS[id] = url;
    }

    // Re-render soil cards if visible
    const cards = document.getElementById('soilCards');
    if (cards && cards.style.display !== 'none') soilShowCat('types');
  } catch(e) {}
}

async function fetchBedPhotos() {
  // Hardcoded CDN URLs for beds where Wikipedia article approach gives wrong results
  const HARDCODED_BED_PHOTOS = {
    'sleeper': 'data:image/png;base64,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',
    'steel':   'data:image/png;base64,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',
  };

  // Inject hardcoded ones immediately
  for (const [bedId, photoUrl] of Object.entries(HARDCODED_BED_PHOTOS)) {
    const img = document.getElementById('bed-photo-' + bedId);
    if (img) {
      img.src = photoUrl;
      img.style.display = 'block';
      img.onerror = function() {
        this.style.display = 'none';
        this.closest('.bed-type-header').classList.add('no-photo');
      };
    }
  }

  // Wikipedia API for the remaining beds
  const BED_WIKI_TITLES = {
    'inground':    'Raised-bed_gardening',
    'standard':    'Kitchen_garden',
    'hugelkultur': 'Hügelkultur',
    'accessible':  'Disability',
  };

  const uniqueTitles = [...new Set(Object.values(BED_WIKI_TITLES))];
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(uniqueTitles.join('|'))}&prop=pageimages&format=json&pithumbsize=800&origin=*&redirects=1`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    const photoMap = {};
    const chain = {};
    for (const n of (data.query.normalized || [])) {
      chain[n.from.toLowerCase().replace(/ /g,'_')] = n.to.toLowerCase().replace(/ /g,'_');
    }
    for (const r of (data.query.redirects || [])) {
      chain[r.from.toLowerCase().replace(/ /g,'_')] = r.to.toLowerCase().replace(/ /g,'_');
    }
    for (const page of Object.values(data.query.pages)) {
      if (page.thumbnail) {
        photoMap[page.title.toLowerCase().replace(/ /g,'_')] = page.thumbnail.source;
      }
    }
    const resolve = (t) => {
      let key = t.toLowerCase().replace(/ /g,'_');
      let seen = new Set();
      while (chain[key] && !seen.has(key)) { seen.add(key); key = chain[key]; }
      return photoMap[key] || null;
    };

    for (const [bedId, wikiTitle] of Object.entries(BED_WIKI_TITLES)) {
      const img = document.getElementById('bed-photo-' + bedId);
      if (!img) continue;
      const thumbUrl = resolve(wikiTitle);
      if (thumbUrl) {
        img.src = thumbUrl;
        img.style.display = 'block';
        img.onerror = function() {
          this.style.display = 'none';
          this.closest('.bed-type-header').classList.add('no-photo');
        };
      } else {
        img.closest('.bed-type-header').classList.add('no-photo');
      }
    }
  } catch(e) {
    document.querySelectorAll('.bed-type-photo').forEach(img => {
      if (img.style.display === 'none') img.closest('.bed-type-header').classList.add('no-photo');
    });
  }
}

fetchBedPhotos(); // Load bed photos via Wikipedia API
fetchSoilPhotos(); // Load soil type photos
fetchToolPhotos(); // Load tool photos via Wikipedia API
fetchWikiPhotos(); // Load Wikipedia produce photos in background
fetchPestPhotos(); // Load pest photos via Wikipedia API
fetchWeedPhotos(); // Load weed photos via Wikipedia API
fetchDiseasePhotos(); // Load disease photos via Wikipedia API

// ── BACK TO QUICK START — show after scrolling past #wdytd ──
(function() {
  const btn = document.getElementById('backToQS');
  const qs  = document.getElementById('wdytd');
  if (!btn || !qs) return;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const qsBottom = qs.getBoundingClientRect().bottom;
      btn.classList.toggle('visible', qsBottom < 0);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ── MOBILE NAV HAMBURGER ──
function toggleMobileNav() {
  const btn    = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');
  if (!btn || !drawer) return;
  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
}
function closeMobileNav() {
  const btn    = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');
  if (!btn || !drawer) return;
  drawer.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}
// Close drawer on tap outside
document.addEventListener('click', function(e) {
  const drawer = document.getElementById('navDrawer');
  const btn    = document.getElementById('navHamburger');
  if (drawer && drawer.classList.contains('open') &&
      !drawer.contains(e.target) && !btn.contains(e.target)) {
    closeMobileNav();
  }
});

// ══════════════════════════════════════════════
// COMPANION PLANTING
// ══════════════════════════════════════════════

const companionData = {
  fruiting: [
    { id:'tomato', icon:'🍅', name:'Tomatoes',
      friends:[
        {name:'Basil',      icon:'🌿', reason:'The classic pairing. Basil repels aphids, whitefly and spider mites, and many growers swear it improves fruit flavour.'},
        {name:'Carrots',    icon:'🥕', reason:'Carrot roots loosen compacted soil around tomato roots, improving drainage and aeration.'},
        {name:'Marigolds',  icon:'🌼', reason:'French marigolds release a root exudate that repels soil nematodes. Also deter whitefly in the greenhouse.'},
        {name:'Borage',     icon:'🌸', reason:'Deters tomato hornworm, attracts pollinators, and is said to improve tomato flavour when grown nearby.'},
        {name:'Garlic',     icon:'🧄', reason:'Repels spider mites and aphids. Plant around the base of tomato plants.'},
        {name:'Chives',     icon:'🌿', reason:'Deter aphids and improve overall plant health. A low-maintenance companion.'},
      ],
      foes:[
        {name:'Potatoes',   icon:'🥔', reason:'Both are in the nightshade family and share blight disease — planting together accelerates spread.'},
        {name:'Brassicas',  icon:'🥦', reason:'Compete for the same nutrients and are thought to inhibit each other\'s growth when in close proximity.'},
        {name:'Fennel',     icon:'🌿', reason:'Fennel releases allelopathic chemicals from its roots that stunt the growth of most neighbouring vegetables.'},
        {name:'Corn',       icon:'🌽', reason:'Sweetcorn casts heavy shade and competes aggressively for water and nutrients.'},
      ]
    },
    { id:'courgette', icon:'🥒', name:'Courgettes',
      friends:[
        {name:'Nasturtiums', icon:'🌺', reason:'Sacrificial trap crop — aphids flock to nasturtiums instead. Also attract hoverflies that predate aphids.'},
        {name:'Borage',      icon:'🌸', reason:'Deters pests and attracts pollinators, which courgettes need to set fruit.'},
        {name:'Sweetcorn',   icon:'🌽', reason:'The classic Three Sisters combination. Corn provides shade, courgette suppresses weeds.'},
        {name:'Beans',       icon:'🫛', reason:'Fix atmospheric nitrogen in the soil, feeding heavy-feeding courgettes naturally.'},
        {name:'Marigolds',   icon:'🌼', reason:'Repel whitefly and nematodes. Plant around the perimeter of the courgette bed.'},
      ],
      foes:[
        {name:'Potatoes',   icon:'🥔', reason:'Compete for space and nutrients. Can also share fungal diseases in wet conditions.'},
        {name:'Fennel',     icon:'🌿', reason:'Root secretions from fennel stunt the growth of courgettes and most other vegetables.'},
      ]
    },
    { id:'squash', icon:'🎃', name:'Winter Squash & Pumpkins',
      friends:[
        {name:'Sweetcorn',   icon:'🌽', reason:'The Three Sisters: corn provides a climbing structure and windbreak, squash sprawls below suppressing weeds.'},
        {name:'Climbing beans', icon:'🫛', reason:'Fix nitrogen in the soil, benefiting heavy-feeding squash throughout the season.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Attract aphids away from squash and attract pollinating insects essential for fruit set.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter nematodes in the soil and repel squash bugs and other pests.'},
      ],
      foes:[
        {name:'Potatoes',   icon:'🥔', reason:'Compete intensely for space, water and nutrients. Potatoes can also harbour diseases harmful to squash.'},
        {name:'Fennel',     icon:'🌿', reason:'Allelopathic root secretions inhibit squash growth.'},
        {name:'Brassicas',  icon:'🥦', reason:'Heavy nutrient competitors that reduce vigour in both crops when grown in close proximity.'},
      ]
    },
    { id:'cucumber', icon:'🥒', name:'Cucumbers',
      friends:[
        {name:'Beans',       icon:'🫛', reason:'Fix nitrogen and are light feeders, leaving cucumbers the lion\'s share of nutrients.'},
        {name:'Peas',        icon:'🫛', reason:'Another nitrogen fixer that improves soil quality. Both appreciate similar moist conditions.'},
        {name:'Marigolds',   icon:'🌼', reason:'Repel aphids and other pests that attack cucumbers. Excellent greenhouse companions.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids, keeping them away from cucumbers. Also deter cucumber beetle.'},
        {name:'Radish',      icon:'🌱', reason:'Planted at the base, radishes deter cucumber beetles with their scent.'},
        {name:'Sunflowers',  icon:'🌻', reason:'Provide light shade in hot weather and attract pollinators needed for fruit set.'},
      ],
      foes:[
        {name:'Aromatic herbs', icon:'🌿', reason:'Strong-scented herbs like sage and basil can inhibit cucumber growth.'},
        {name:'Potatoes',      icon:'🥔', reason:'Share common diseases and compete for water and nutrients.'},
        {name:'Fennel',        icon:'🌿', reason:'Root secretions from fennel inhibit cucumbers and most other vegetables.'},
      ]
    },
    { id:'sweetcorn', icon:'🌽', name:'Sweetcorn',
      friends:[
        {name:'Climbing beans', icon:'🫛', reason:'The original Three Sisters companion — beans climb the corn stems and fix nitrogen in the soil.'},
        {name:'Squash',       icon:'🎃', reason:'Sprawls beneath corn to suppress weeds and retain moisture. The third Sister.'},
        {name:'Courgettes',   icon:'🥒', reason:'Ground-covering leaves keep soil cool and moist while corn towers above.'},
        {name:'Cucumbers',    icon:'🥒', reason:'Similarly benefit from corn\'s windbreak and can scramble up corn stems.'},
        {name:'Marigolds',    icon:'🌼', reason:'Deter aphids and other pests. Plant around the perimeter of the corn block.'},
      ],
      foes:[
        {name:'Tomatoes',    icon:'🍅', reason:'Sweetcorn casts deep shade and competes aggressively for water and root space.'},
        {name:'Celery',      icon:'🌿', reason:'Thought to inhibit corn growth — keep them well apart.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to almost all vegetables. Keep at the far end of the plot.'},
      ]
    },
    { id:'aubergine', icon:'🍆', name:'Aubergines',
      friends:[
        {name:'Basil',       icon:'🌿', reason:'Repels aphids and spider mites that commonly attack aubergines. Improves plant vigour.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids, whitefly and nematodes — all common aubergine pests.'},
        {name:'Peppers',     icon:'🫑', reason:'Similar requirements; both benefit from the same warm, sunny growing conditions.'},
        {name:'Spinach',     icon:'🥬', reason:'Low-growing; uses space beneath aubergine without competing for the same nutrients.'},
        {name:'Tarragon',    icon:'🌿', reason:'Said to repel pests and improve the growth of aubergines nearby.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Root secretions inhibit aubergine growth.'},
        {name:'Potatoes',    icon:'🥔', reason:'Share diseases in the nightshade family, including blight and verticillium wilt.'},
      ]
    },
    { id:'pepper', icon:'🫑', name:'Peppers & Chillies',
      friends:[
        {name:'Basil',       icon:'🌿', reason:'Repels aphids and spider mites. Some growers report improved pepper flavour.'},
        {name:'Carrots',     icon:'🥕', reason:'Loosen soil around pepper roots and are light feeders that don\'t compete.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Similar conditions; both benefit from full sun and regular feeding.'},
        {name:'Marigolds',   icon:'🌼', reason:'Classic pest deterrent — repel aphids, whitefly and nematodes around peppers.'},
        {name:'Spinach',     icon:'🥬', reason:'Ground cover; keeps soil cool and moist under pepper plants.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic root chemicals stunt peppers and most other vegetables.'},
        {name:'Brassicas',   icon:'🥦', reason:'Heavy nutrient competitors. Also attract different pests that can spill over.'},
        {name:'Apricot',     icon:'🍑', reason:'Apricot root secretions are known to inhibit pepper growth.'},
      ]
    },
    { id:'pumpkin', icon:'🎃', name:'Pumpkins',
      friends:[
        {name:'Sweetcorn',   icon:'🌽', reason:'The Three Sisters classic — corn provides shade and windbreak, pumpkin sprawls below suppressing weeds.'},
        {name:'Climbing Beans', icon:'🫘', reason:'Nitrogen-fixers that feed hungry pumpkin vines naturally.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Attract aphids away from pumpkins and bring in pollinators essential for fruit set.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes and repel squash bugs and other pests.'},
        {name:'Borage',      icon:'🌸', reason:'Deters tomato hornworm and attracts bees — essential for pumpkin pollination.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Compete intensely for space and moisture. Can harbour shared diseases.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to pumpkins as to most vegetables.'},
      ]
    },
    { id:'sweetpotato', icon:'🍠', name:'Sweet Potatoes',
      friends:[
        {name:'Thyme',       icon:'🌱', reason:'Aromatic deterrent of various sweet potato pests. Good low ground companion.'},
        {name:'Oregano',     icon:'🌿', reason:'Strong aromatic repels sweet potato weevil and other flying pests.'},
        {name:'Marigolds',   icon:'🌼', reason:'Root exudates deter nematodes which are a significant sweet potato pest.'},
        {name:'Dill',        icon:'🌿', reason:'Attracts beneficial insects that predate sweet potato leaf pests.'},
      ],
      foes:[
        {name:'Squash',      icon:'🎃', reason:'Both are vigorous spreaders competing intensely for space and nutrients.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Share some soilborne diseases and compete for the same warm, fertile conditions.'},
      ]
    },
    { id:'melon', icon:'🍈', name:'Melons',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter whitefly and nematodes — important in greenhouse conditions where melons grow.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids and attract pollinators essential for fruit set.'},
        {name:'Corn',        icon:'🌽', reason:'Provides light shade and windbreak in open ground plantings.'},
        {name:'Basil',       icon:'🌿', reason:'Repels aphids and spider mites in the greenhouse environment.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Share diseases and compete for nutrients. Separate in the greenhouse.'},
        {name:'Cucumbers',   icon:'🥒', reason:'Direct competitors for greenhouse space and pollinators; best kept separated.'},
      ]
    },
  ],
  roots: [
    { id:'carrot', icon:'🥕', name:'Carrots',
      friends:[
        {name:'Onions',      icon:'🧅', reason:'The classic pairing — onion scent confuses carrot root fly, while carrot scent deters onion fly.'},
        {name:'Leeks',       icon:'🥬', reason:'Same mutual benefit as onions — leek and carrot scents mask each other from their respective pests.'},
        {name:'Chives',      icon:'🌿', reason:'Strong scent deters carrot root fly. Plant in rows between carrots.'},
        {name:'Rosemary',    icon:'🌿', reason:'Strong aromatic scent confuses carrot root fly. A good border plant near the carrot bed.'},
        {name:'Sage',        icon:'🌿', reason:'Repels carrot root fly and cabbage white butterflies.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Tomatoes deter carrot fly; carrots loosen soil around tomato roots.'},
        {name:'Lettuce',     icon:'🥬', reason:'Fills gaps between carrot rows, suppressing weeds and retaining soil moisture.'},
      ],
      foes:[
        {name:'Dill',        icon:'🌿', reason:'Dill cross-pollinates with carrots if both are flowering, and can inhibit carrot root development.'},
        {name:'Parsnips',    icon:'🌿', reason:'Same pest (carrot root fly) is attracted to both — growing together concentrates the problem.'},
        {name:'Fennel',      icon:'🌿', reason:'Root secretions inhibit carrot germination and growth.'},
      ]
    },
    { id:'potato', icon:'🥔', name:'Potatoes',
      friends:[
        {name:'Beans',       icon:'🫛', reason:'Fix nitrogen in the soil and repel the Colorado beetle from potatoes.'},
        {name:'Marigolds',   icon:'🌼', reason:'French marigolds repel soil nematodes and eelworms that attack potato tubers.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids that carry potato viruses. Better on nasturtiums than on spuds.'},
        {name:'Horseradish', icon:'🌿', reason:'Planted at corners of the potato bed, repels Colorado beetle and improves disease resistance.'},
        {name:'Comfrey',     icon:'🌿', reason:'Deep roots mine potassium from subsoil; cut leaves used as mulch feed potato crops.'},
      ],
      foes:[
        {name:'Tomatoes',    icon:'🍅', reason:'Both susceptible to blight — growing together accelerates disease spread to devastating effect.'},
        {name:'Courgettes',  icon:'🥒', reason:'Compete intensely for nutrients and space. Poor use of valuable growing area.'},
        {name:'Cucumbers',   icon:'🥒', reason:'Share fungal diseases. Also both need extensive space.'},
        {name:'Sunflowers',  icon:'🌻', reason:'Inhibit potato growth through root secretions and compete strongly for nutrients.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic — stunts potato growth.'},
        {name:'Raspberries', icon:'🍓', reason:'Share viruses and diseases that build up in soil — keep them on opposite sides of the plot.'},
      ]
    },
    { id:'beetroot', icon:'🫀', name:'Beetroot',
      friends:[
        {name:'Onions',      icon:'🧅', reason:'Onions deter soil pests that attack beetroot. Both grow well in similar conditions.'},
        {name:'Lettuce',     icon:'🥬', reason:'Perfect spacing companion — lettuce fills gaps and matures quickly before beetroot needs the space.'},
        {name:'Brassicas',   icon:'🥦', reason:'Beetroot adds beneficial minerals to the soil through leaf fall that help brassica neighbours.'},
        {name:'Chives',      icon:'🌿', reason:'Repel aphids and other pests. Chives\' strong scent benefits neighbouring root crops.'},
        {name:'Garlic',      icon:'🧄', reason:'Garlic scent deters root aphids and other soil pests that target beetroot.'},
      ],
      foes:[
        {name:'Runner beans', icon:'🫛', reason:'Runner beans and pole beans inhibit beetroot growth — a well-documented incompatibility.'},
        {name:'Climbing beans',icon:'🫛', reason:'Same issue as runner beans — keep all climbing beans away from beetroot.'},
        {name:'Chard',        icon:'🥬', reason:'Both are in the same family (Beta); planting together concentrates pests and diseases.'},
      ]
    },
    { id:'parsnip', icon:'🌻', name:'Parsnips',
      friends:[
        {name:'Radish',      icon:'🌱', reason:'Radish germinates fast, marking the row while parsnips slowly emerge, and breaks up hard soil.'},
        {name:'Peas',        icon:'🫛', reason:'Fix nitrogen and improve soil structure. Both appreciate similar growing conditions.'},
        {name:'Beans',       icon:'🫛', reason:'Nitrogen fixers that improve fertility for the following parsnip crop.'},
        {name:'Garlic',      icon:'🧄', reason:'Deters root pests including aphids that attack parsnip foliage.'},
      ],
      foes:[
        {name:'Carrots',     icon:'🥕', reason:'Both attract carrot root fly — growing together doubles the pest problem in one area.'},
        {name:'Celery',      icon:'🌿', reason:'Can harbour similar pests. Competing root structures.'},
        {name:'Fennel',      icon:'🌿', reason:'Root chemicals inhibit parsnip germination and development.'},
      ]
    },
    { id:'turnip', icon:'🌑', name:'Turnips',
      friends:[
        {name:'Peas',        icon:'🫛', reason:'Fix nitrogen that benefits turnip growth. Both prefer similar cool growing conditions.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Deter cabbage white butterfly that also lays eggs on turnip leaves.'},
        {name:'Marigolds',   icon:'🌼', reason:'General pest deterrent that helps protect turnips from flea beetle and aphids.'},
      ],
      foes:[
        {name:'Mustard',     icon:'🌿', reason:'Related brassica — shares pests and diseases, especially flea beetle and clubroot.'},
        {name:'Knotweed',    icon:'🌿', reason:'Competes aggressively and can inhibit root development.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic root secretions stunt turnip growth.'},
      ]
    },
    { id:'swede', icon:'🟤', name:'Swede',
      friends:[
        {name:'Peas',        icon:'🫛', reason:'Fix nitrogen, improving soil for heavy-feeding swede.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Deter cabbage white butterfly that attacks swede\'s brassica foliage.'},
        {name:'Celery',      icon:'🌿', reason:'The strong scent of celery confuses brassica-specific pests.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter the flea beetle, a major pest of swede seedlings.'},
      ],
      foes:[
        {name:'Mustard',     icon:'🌿', reason:'Related brassica; shares diseases and concentrates pest pressure.'},
        {name:'Fennel',      icon:'🌿', reason:'Root secretions inhibit growth of most brassicas including swede.'},
      ]
    },
    { id:'asparagus', icon:'🌿', name:'Asparagus',
      friends:[
        {name:'Tomatoes',    icon:'🍅', reason:'Tomatoes repel asparagus beetle; asparagus deters soil nematodes that harm tomato roots.'},
        {name:'Basil',       icon:'🌿', reason:'Repels asparagus beetle and improves general plant health in the asparagus bed.'},
        {name:'Parsley',     icon:'🌱', reason:'Attracts beneficial insects. Good low companion that doesn\'t compete.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter nematodes and asparagus beetle. Excellent long-term companion in the permanent bed.'},
        {name:'Comfrey',     icon:'🌿', reason:'Dynamic accumulator — its leaves make an excellent potassium-rich mulch for asparagus.'},
      ],
      foes:[
        {name:'Onions',      icon:'🧅', reason:'Compete for nutrients and are thought to inhibit asparagus root development.'},
        {name:'Garlic',      icon:'🧄', reason:'Same issue — alliums generally compete with asparagus in permanent beds.'},
        {name:'Potatoes',    icon:'🥔', reason:'Invasive root systems disturb the permanent asparagus bed and compete for nutrients.'},
      ]
    },
    { id:'celeriac', icon:'⚪', name:'Celeriac',
      friends:[
        {name:'Leeks',       icon:'🥢', reason:'Classic companion — the strong scent of leeks deters celery fly and other pests.'},
        {name:'Onions',      icon:'🧅', reason:'Onion scent repels celery fly. Traditional companion in mixed vegetable beds.'},
        {name:'Spinach',     icon:'🌿', reason:'Low ground cover that keeps moisture in and weeds down around slow-growing celeriac.'},
        {name:'Lettuce',     icon:'🥬', reason:'Fast-maturing catch crop that uses space between celeriac plants while they develop.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes and provide general pest deterrence.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Heavy feeders that compete directly with celeriac for nutrients and moisture.'},
        {name:'Parsnips',    icon:'🌻', reason:'Both are slow-growing umbellifers that harbour similar pests and diseases.'},
        {name:'Carrots',     icon:'🥕', reason:'Same family — share carrot fly and other umbellifer pests. Best separated.'},
      ]
    },
    { id:'jerusalem', icon:'🌻', name:'Jerusalem Artichokes',
      friends:[
        {name:'Corn',        icon:'🌽', reason:'Both tall, vigorous plants that coexist well. Jerusalem artichokes make an excellent windbreak for corn.'},
        {name:'Sunflowers',  icon:'🌻', reason:'Companion that deters pests and attracts pollinators. Similar cultural requirements.'},
        {name:'Beans',       icon:'🫘', reason:'Nitrogen-fixing beans improve the soil around the artichoke patch.'},
      ],
      foes:[
        {name:'Most crops',  icon:'🌿', reason:'Jerusalem artichokes are so vigorous they outcompete most vegetables. Give them their own dedicated patch.'},
        {name:'Potatoes',    icon:'🥔', reason:'Both are heavy root spreaders and will compete intensely. Keep well separated.'},
      ]
    },
  ],
  brassicas: [
    { id:'kale', icon:'🥬', name:'Kale',
      friends:[
        {name:'Nasturtiums', icon:'🌺', reason:'Sacrificial trap crop — aphids and cabbage whites prefer nasturtiums. Keep them close.'},
        {name:'Dill',        icon:'🌿', reason:'Attracts predatory wasps that parasitise caterpillars feeding on kale.'},
        {name:'Sage',        icon:'🌿', reason:'Strong aroma deters cabbage white butterflies and root flies.'},
        {name:'Beetroot',    icon:'🫀', reason:'Good companion that adds minerals and doesn\'t compete with kale\'s root structure.'},
        {name:'Celery',      icon:'🌿', reason:'Deters the white cabbage butterfly. Classic brassica companion.'},
        {name:'Chamomile',   icon:'🌼', reason:'Low-growing; attracts beneficials and is said to improve the health of brassica neighbours.'},
      ],
      foes:[
        {name:'Strawberries', icon:'🍓', reason:'Brassicas inhibit strawberry growth. Keep them in separate beds.'},
        {name:'Tomatoes',     icon:'🍅', reason:'Compete for nutrients and brassicas are thought to inhibit tomato root development.'},
        {name:'Runner beans', icon:'🫛', reason:'An old but well-cited incompatibility — beans and brassicas reportedly inhibit each other.'},
        {name:'Fennel',       icon:'🌿', reason:'Root secretions are allelopathic to brassicas.'},
      ]
    },
    { id:'sprouts', icon:'🟢', name:'Brussels Sprouts',
      friends:[
        {name:'Nasturtiums', icon:'🌺', reason:'Sacrifice themselves to aphids, protecting the sprout crop throughout its long growing season.'},
        {name:'Dill',        icon:'🌿', reason:'Attracts predatory wasps that control caterpillar populations on sprout plants.'},
        {name:'Chamomile',   icon:'🌼', reason:'Companion that attracts beneficial insects. Low-growing so doesn\'t shade the sprouts.'},
        {name:'Mint',        icon:'🌿', reason:'Strong scent deters cabbage white butterflies — grow in pots nearby to control spread.'},
      ],
      foes:[
        {name:'Strawberries', icon:'🍓', reason:'Brassicas inhibit strawberry growth — keep separate.'},
        {name:'Tomatoes',     icon:'🍅', reason:'Both are heavy feeders and thought to inhibit each other.'},
        {name:'Fennel',       icon:'🌿', reason:'Allelopathic root secretions stunt sprout growth.'},
      ]
    },
    { id:'cabbage', icon:'🥬', name:'Cabbage',
      friends:[
        {name:'Nasturtiums', icon:'🌺', reason:'Probably the best companion for cabbage — attracts aphids away and brings in hoverflies.'},
        {name:'Dill',        icon:'🌿', reason:'Attracts predatory wasps that control cabbage white caterpillars effectively.'},
        {name:'Chamomile',   icon:'🌼', reason:'Improves the growth of nearby cabbages in trials. Attracts beneficial insects.'},
        {name:'Sage',        icon:'🌿', reason:'Deters cabbage white butterfly and root fly with its strong aromatic oils.'},
        {name:'Celery',      icon:'🌿', reason:'Classic brassica companion — its scent confuses and deters cabbage white butterfly.'},
        {name:'Thyme',       icon:'🌿', reason:'Deters cabbage worm. Plant as a border around the brassica bed.'},
      ],
      foes:[
        {name:'Strawberries', icon:'🍓', reason:'Brassicas are well documented as harmful neighbours for strawberries.'},
        {name:'Tomatoes',     icon:'🍅', reason:'Heavy competition for nutrients; neither does well next to the other.'},
        {name:'Beans',        icon:'🫛', reason:'An old incompatibility — reportedly inhibit each other\'s growth.'},
        {name:'Fennel',       icon:'🌿', reason:'Allelopathic to cabbages.'},
        {name:'Grapes',       icon:'🍇', reason:'Chemical compounds released by brassicas can inhibit grapevine growth.'},
      ]
    },
    { id:'broccoli', icon:'🥦', name:'Broccoli',
      friends:[
        {name:'Dill',        icon:'🌿', reason:'Draws in wasps that parasitise caterpillars on broccoli. Plant nearby but not too close — can inhibit if touching.'},
        {name:'Chamomile',   icon:'🌼', reason:'Beneficial insect magnet that improves the overall health of the brassica bed.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Aphid trap crop. Keep a few plants at the edge of the broccoli bed.'},
        {name:'Beetroot',    icon:'🫀', reason:'Mineral accumulator that improves soil health alongside broccoli.'},
        {name:'Celery',      icon:'🌿', reason:'Deters white cabbage butterfly. Good edge companion for broccoli beds.'},
      ],
      foes:[
        {name:'Strawberries', icon:'🍓', reason:'Brassicas inhibit strawberry growth.'},
        {name:'Tomatoes',     icon:'🍅', reason:'Compete heavily; thought to mutually inhibit growth.'},
        {name:'Runner beans', icon:'🫛', reason:'Classic incompatibility with all brassicas.'},
        {name:'Fennel',       icon:'🌿', reason:'Root chemicals inhibit broccoli germination and growth.'},
      ]
    },
    { id:'cauliflower', icon:'⬜', name:'Cauliflower',
      friends:[
        {name:'Dill',        icon:'🌿', reason:'Attracts parasitic wasps that control caterpillar pest populations.'},
        {name:'Chamomile',   icon:'🌼', reason:'Said to improve cauliflower growth and attracts beneficials.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids. Essential companion for any brassica bed.'},
        {name:'Celery',      icon:'🌿', reason:'Deters white cabbage butterfly and improves cauliflower growth.'},
        {name:'Spinach',     icon:'🥬', reason:'Fills gaps, suppresses weeds and shades the soil to retain moisture.'},
      ],
      foes:[
        {name:'Strawberries', icon:'🍓', reason:'Brassicas inhibit strawberry growth.'},
        {name:'Tomatoes',     icon:'🍅', reason:'Heavy feeder competition and mutual inhibition.'},
        {name:'Fennel',       icon:'🌿', reason:'Allelopathic root secretions stunt cauliflower.'},
        {name:'Beans',        icon:'🫛', reason:'Classic brassica incompatibility.'},
      ]
    },
    { id:'kohlrabi', icon:'🟣', name:'Kohlrabi',
      friends:[
        {name:'Beetroot',    icon:'🫀', reason:'Good pairing — different root structures, similar conditions, and neither competes directly.'},
        {name:'Onions',      icon:'🧅', reason:'Repel aphids and soil pests that trouble kohlrabi.'},
        {name:'Cucumbers',   icon:'🥒', reason:'Good neighbours with different growth habits and nutrient requirements.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids and caterpillars. Good companion for all brassicas.'},
      ],
      foes:[
        {name:'Tomatoes',     icon:'🍅', reason:'Compete for nutrients and thought to mutually inhibit growth.'},
        {name:'Runner beans', icon:'🫘', reason:'Classic brassica incompatibility.'},
        {name:'Fennel',       icon:'🌿', reason:'Allelopathic to kohlrabi.'},
        {name:'Strawberries', icon:'🍓', reason:'Brassicas suppress strawberry growth.'},
      ]
    },
    { id:'calabrese', icon:'🥦', name:'Calabrese Broccoli',
      friends:[
        {name:'Nasturtiums', icon:'🌺', reason:'Sacrifice themselves to aphids and cabbage white caterpillars — keep close to calabrese.'},
        {name:'Dill',        icon:'🌿', reason:'Attracts parasitic wasps that control the caterpillar populations threatening calabrese heads.'},
        {name:'Celery',      icon:'🥬', reason:'The strong scent deters cabbage white butterfly — a reliable brassica companion.'},
        {name:'Chamomile',   icon:'🌼', reason:'Attracts beneficial insects. Said to improve health and vigour of neighbouring brassicas.'},
        {name:'Onions',      icon:'🧅', reason:'Onion scent confuses brassica-specific flying pests.'},
      ],
      foes:[
        {name:'Strawberries', icon:'🍓', reason:'Brassicas inhibit strawberry growth significantly. Keep in separate beds.'},
        {name:'Tomatoes',     icon:'🍅', reason:'Heavy competitors for the same nutrients. Different family, different bed.'},
        {name:'Fennel',       icon:'🌿', reason:'Allelopathic root secretions inhibit calabrese and all brassicas.'},
        {name:'Runner Beans', icon:'🫘', reason:'Classic brassica/bean incompatibility — keep separated.'},
      ]
    },
    { id:'chinesecabbage', icon:'🥬', name:'Chinese Cabbage',
      friends:[
        {name:'Nasturtiums', icon:'🌺', reason:'Excellent aphid trap crop. Keep nearby — flea beetles also seem to prefer nasturtiums.'},
        {name:'Dill',        icon:'🌿', reason:'Attracts parasitic wasps that control caterpillar pests of oriental brassicas.'},
        {name:'Garlic',      icon:'🧄', reason:'Deters aphids and other pests. Good border planting around chinese cabbage.'},
        {name:'Lettuce',     icon:'🥬', reason:'Compatible shallow-rooted catch crop that uses space while chinese cabbage develops.'},
      ],
      foes:[
        {name:'Fennel',       icon:'🌿', reason:'Allelopathic to all brassicas including chinese cabbage.'},
        {name:'Strawberries', icon:'🍓', reason:'Brassicas suppress strawberry root development.'},
        {name:'Tomatoes',     icon:'🍅', reason:'Different families with different needs. Heavy mutual competition.'},
      ]
    },
    { id:'pakchoi', icon:'🥬', name:'Pak Choi',
      friends:[
        {name:'Nasturtiums', icon:'🌺', reason:'Excellent trap crop for both aphids and flea beetles — the primary pak choi pests.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes and provide general pest deterrence in the brassica bed.'},
        {name:'Dill',        icon:'🌿', reason:'Attracts beneficial insects that predate pak choi pests.'},
        {name:'Lettuce',     icon:'🥬', reason:'Shallow-rooted companion that doesn\'t compete and suppresses weeds between plants.'},
      ],
      foes:[
        {name:'Fennel',       icon:'🌿', reason:'Root allelopathy inhibits pak choi and all brassicas.'},
        {name:'Strawberries', icon:'🍓', reason:'Brassicas generally inhibit strawberry plants.'},
        {name:'Potatoes',     icon:'🥔', reason:'Heavy feeders that compete strongly. Also harbour shared blight risk.'},
      ]
    },
    { id:'globeartichoke', icon:'🌸', name:'Globe Artichokes',
      friends:[
        {name:'Tarragon',    icon:'🌿', reason:'Traditional companion that is said to improve the growth and flavour of globe artichokes.'},
        {name:'Sunflowers',  icon:'🌻', reason:'Both are tall, architectural plants attracting pollinators. Good companions in a perennial border.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes and aphids around the artichoke base.'},
        {name:'Comfrey',     icon:'🌿', reason:'Dynamic accumulator. Mulched comfrey leaves provide a potassium-rich feed for hungry artichokes.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Vigorous root competition. Both are greedy feeders that do poorly in each other\'s company.'},
        {name:'Peas',        icon:'🟡', reason:'Peas in close proximity are thought to inhibit artichoke establishment.'},
      ]
    },
  ],
  alliums: [
    { id:'onion', icon:'🧅', name:'Onions',
      friends:[
        {name:'Carrots',     icon:'🥕', reason:'The ultimate companion pairing — each masks the scent that attracts the other\'s main pest.'},
        {name:'Beetroot',    icon:'🫀', reason:'Good neighbours; onion scent deters soil pests. Both thrive in similar conditions.'},
        {name:'Lettuce',     icon:'🥬', reason:'Onions benefit lettuce growth and deter aphids. Good space-filler between rows.'},
        {name:'Chamomile',   icon:'🌼', reason:'Said to improve onion flavour when grown as a border companion.'},
        {name:'Summer savory', icon:'🌿', reason:'Deters bean beetles but also benefits onion beds by deterring general pests.'},
      ],
      foes:[
        {name:'Peas',        icon:'🫛', reason:'Onions stunt the growth of all legumes. Keep them well apart.'},
        {name:'Beans',       icon:'🫛', reason:'All alliums inhibit beans and vice versa — a reliable incompatibility.'},
        {name:'Sage',        icon:'🌿', reason:'Thought to inhibit onion development when grown close together.'},
        {name:'Asparagus',   icon:'🌿', reason:'Onions compete with the permanent asparagus bed for nutrients.'},
      ]
    },
    { id:'garlic', icon:'🧄', name:'Garlic',
      friends:[
        {name:'Roses',       icon:'🌹', reason:'The classic gardener\'s pairing — garlic repels aphids and black spot from roses reliably.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Garlic planted at the base of tomatoes repels spider mites and aphids.'},
        {name:'Beetroot',    icon:'🫀', reason:'Garlic deters soil pests and the two have compatible root structures.'},
        {name:'Lettuce',     icon:'🥬', reason:'Garlic repels aphids that would otherwise colonise lettuce.'},
        {name:'Fruit trees', icon:'🍎', reason:'Planted around the base, garlic deters aphids, woolly aphid, and many other fruit tree pests.'},
      ],
      foes:[
        {name:'Peas',        icon:'🫛', reason:'Garlic (like all alliums) stunts the growth of legumes including peas.'},
        {name:'Beans',       icon:'🫛', reason:'All alliums inhibit beans. A well-documented incompatibility.'},
        {name:'Parsley',     icon:'🌿', reason:'Parsley and garlic are thought to inhibit each other when grown in close proximity.'},
        {name:'Asparagus',   icon:'🌿', reason:'Garlic inhibits asparagus growth in permanent beds.'},
      ]
    },
    { id:'leek', icon:'🥢', name:'Leeks',
      friends:[
        {name:'Carrots',     icon:'🥕', reason:'Leek scent deters carrot fly; carrot scent deters leek moth. A mutually beneficial pairing.'},
        {name:'Onions',      icon:'🧅', reason:'Similar pest-repelling benefits. Both thrive in the same growing conditions.'},
        {name:'Celery',      icon:'🌿', reason:'Celery and leeks are classic companions, each deterring the other\'s pests.'},
        {name:'Lettuce',     icon:'🥬', reason:'Good use of space between leek rows. Lettuce doesn\'t compete with deep leek roots.'},
      ],
      foes:[
        {name:'Beans',       icon:'🫛', reason:'Alliums inhibit legumes — leeks stunt bean growth.'},
        {name:'Peas',        icon:'🫛', reason:'Same inhibition as beans — leeks suppress pea growth.'},
        {name:'Broad beans', icon:'🫛', reason:'Leeks inhibit all legumes.'},
      ]
    },
    { id:'shallot', icon:'🧅', name:'Shallots',
      friends:[
        {name:'Carrots',     icon:'🥕', reason:'Mutual pest deterrence — same mechanism as onion and carrot pairing.'},
        {name:'Beetroot',    icon:'🫀', reason:'Shallot scent deters soil pests around beetroot. Compatible root structures.'},
        {name:'Lettuce',     icon:'🥬', reason:'Good filler crop between shallots that benefits from the allium\'s pest-deterrent properties.'},
        {name:'Chamomile',   icon:'🌼', reason:'Said to improve shallot growth and flavour when grown as a companion.'},
      ],
      foes:[
        {name:'Peas',        icon:'🫛', reason:'Alliums inhibit all legumes including peas.'},
        {name:'Beans',       icon:'🫛', reason:'Shallots stunt bean growth.'},
        {name:'Asparagus',   icon:'🌿', reason:'Alliums compete with and inhibit asparagus in permanent beds.'},
      ]
    },
    { id:'springonion', icon:'🌿', name:'Spring Onions',
      friends:[
        {name:'Carrots',     icon:'🥕', reason:'Mutual pest deterrence — same classic pairing as onion and carrot.'},
        {name:'Beetroot',    icon:'🫀', reason:'Spring onions deter soil pests that attack beetroot.'},
        {name:'Lettuce',     icon:'🥬', reason:'Excellent inter-planting companion with lettuce. Use gap space efficiently.'},
        {name:'Brassicas',   icon:'🥦', reason:'The scent of spring onions deters cabbage white butterflies and aphids.'},
      ],
      foes:[
        {name:'Peas',        icon:'🫛', reason:'Alliums inhibit legumes — spring onions stunt pea growth.'},
        {name:'Beans',       icon:'🫛', reason:'Same inhibition — keep all alliums away from beans.'},
      ]
    },
  ],
  legumes: [
    { id:'runner', icon:'🫘', name:'Runner Beans',
      friends:[
        {name:'Sweetcorn',   icon:'🌽', reason:'Classic Three Sisters companion. Beans fix nitrogen for the corn; corn provides a climbing frame.'},
        {name:'Carrots',     icon:'🥕', reason:'Beans fix nitrogen that benefits carrots. Different root depths so no competition.'},
        {name:'Radish',      icon:'🌱', reason:'Planted at the base, radishes deter bean aphids and are harvested before beans need the space.'},
        {name:'Summer savory', icon:'🌿', reason:'Deters bean beetles and black aphids. The traditional bean companion.'},
        {name:'Marigolds',   icon:'🌼', reason:'Repel aphids and other pests from bean plants throughout the season.'},
      ],
      foes:[
        {name:'Onions',      icon:'🧅', reason:'All alliums inhibit bean growth. Keep them well separated.'},
        {name:'Garlic',      icon:'🧄', reason:'Same incompatibility — garlic stunts bean growth.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic root secretions inhibit beans.'},
        {name:'Brassicas',   icon:'🥦', reason:'Classic incompatibility — beans and brassicas inhibit each other.'},
        {name:'Beetroot',    icon:'🫀', reason:'Runner beans specifically inhibit beetroot growth.'},
      ]
    },
    { id:'broadbean', icon:'🫛', name:'Broad Beans',
      friends:[
        {name:'Potatoes',    icon:'🥔', reason:'Nitrogen fixed by broad beans benefits potatoes planted in the same bed.'},
        {name:'Summer savory', icon:'🌿', reason:'The essential broad bean companion — deters black aphids and bean weevils effectively.'},
        {name:'Spinach',     icon:'🥬', reason:'Low-growing companion that uses the space beneath broad bean canopy.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and improve pollinator numbers, helping set.'},
        {name:'Corn',        icon:'🌽', reason:'Broad beans fix nitrogen that benefits corn growing alongside.'},
      ],
      foes:[
        {name:'Onions',      icon:'🧅', reason:'Alliums inhibit all legumes including broad beans.'},
        {name:'Garlic',      icon:'🧄', reason:'Same incompatibility as onions.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic and inhibits broad bean development.'},
        {name:'Shallots',    icon:'🧅', reason:'All alliums stunt legume growth.'},
      ]
    },
    { id:'peas', icon:'🟡', name:'Peas',
      friends:[
        {name:'Carrots',     icon:'🥕', reason:'Peas fix nitrogen that benefits carrots. Both prefer cool, moist conditions.'},
        {name:'Radish',      icon:'🌱', reason:'Planted at the base of peas, radishes deter pea moth and other pests.'},
        {name:'Turnips',     icon:'🟣', reason:'Both like cool conditions; turnips benefit from peas\' nitrogen fixing.'},
        {name:'Beans',       icon:'🫛', reason:'Fix nitrogen together. Create a productive polyculture when grown alongside.'},
        {name:'Mint',        icon:'🌿', reason:'Planted as a border, mint deters pea aphids. Always grow mint in pots to contain it.'},
        {name:'Lettuce',     icon:'🥬', reason:'Good inter-cropping companion under the pea rows. Uses vertical space efficiently.'},
      ],
      foes:[
        {name:'Onions',      icon:'🧅', reason:'Alliums inhibit all legumes — a well-documented incompatibility.'},
        {name:'Garlic',      icon:'🧄', reason:'Garlic stunts pea growth reliably.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic. Keep fennel at the far end of the plot.'},
        {name:'Leeks',       icon:'🥬', reason:'Leeks inhibit pea growth like all alliums.'},
        {name:'Chives',      icon:'🌿', reason:'Even chives, milder than most alliums, can inhibit peas if grown very close.'},
      ]
    },
    { id:'frenchbean', icon:'🟩', name:'French Beans',
      friends:[
        {name:'Sweetcorn',   icon:'🌽', reason:'French beans fix nitrogen for the corn. Can be grown at the base of corn stems.'},
        {name:'Carrots',     icon:'🥕', reason:'Different root depths; beans improve nitrogen for carrots without competing.'},
        {name:'Radish',      icon:'🔴', reason:'Deters bean aphids. Radishes are harvested long before beans need the space.'},
        {name:'Summer savory', icon:'🌿', reason:'The traditional bean companion — deters bean beetles and aphids.'},
        {name:'Cucumbers',   icon:'🥒', reason:'Both benefit from the same warm, sheltered conditions and don\'t compete.'},
      ],
      foes:[
        {name:'Onions',      icon:'🧅', reason:'All alliums inhibit French bean growth.'},
        {name:'Garlic',      icon:'🧄', reason:'Same incompatibility — stunts bean growth.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to French beans.'},
        {name:'Leeks',       icon:'🥢', reason:'Inhibits legumes including French beans.'},
      ]
    },
    { id:'soyabean', icon:'🫘', name:'Soya Beans',
      friends:[
        {name:'Maize/Corn',  icon:'🌽', reason:'The Three Sisters principle extends to soya — beans fix nitrogen for the corn.'},
        {name:'Carrots',     icon:'🥕', reason:'Soya fixes nitrogen that benefits root crops. Different root depths, no competition.'},
        {name:'Summer savory', icon:'🌿', reason:'Traditional legume companion — deters bean beetles and general flying pests.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes which can damage soya roots and reduce yields.'},
      ],
      foes:[
        {name:'Onions',      icon:'🧅', reason:'Alliums inhibit soya bean growth as with all legumes.'},
        {name:'Garlic',      icon:'🧄', reason:'The garlic-legume incompatibility applies to soya beans.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to soya beans and most vegetables.'},
      ]
    },
  ],
  salads: [
    { id:'lettuce', icon:'🥬', name:'Lettuce',
      friends:[
        {name:'Carrots',     icon:'🥕', reason:'Lettuce fills gaps between carrot rows perfectly, suppressing weeds and conserving moisture.'},
        {name:'Radish',      icon:'🌱', reason:'Classic inter-cropping partner. Radishes are harvested before the lettuce fills the space.'},
        {name:'Chives',      icon:'🌿', reason:'Deter aphids that commonly colonise lettuce, particularly in spring.'},
        {name:'Garlic',      icon:'🧄', reason:'Repels aphids and other pests. Plant at intervals between lettuce rows.'},
        {name:'Beetroot',    icon:'🫀', reason:'Good bed companion — different nutrients, no competition, both benefit.'},
        {name:'Strawberries', icon:'🍓', reason:'Shade from slightly taller strawberry plants prevents lettuce bolting in summer.'},
      ],
      foes:[
        {name:'Celery',      icon:'🌿', reason:'Celery and lettuce are thought to inhibit each other when grown in close contact.'},
        {name:'Parsley',     icon:'🌿', reason:'Can attract carrot root fly to the area, which then targets nearby crops.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic root secretions inhibit lettuce germination and growth.'},
      ]
    },
    { id:'radish', icon:'🔴', name:'Radish',
      friends:[
        {name:'Peas',        icon:'🫛', reason:'Radishes deter pea moth. Both prefer cool weather and can be inter-planted easily.'},
        {name:'Beans',       icon:'🫛', reason:'Radishes deter bean beetles. Harvested quickly, leaving space for the beans to develop.'},
        {name:'Carrots',     icon:'🥕', reason:'Radishes break up hard soil for carrots and are harvested before they compete.'},
        {name:'Cucumbers',   icon:'🥒', reason:'Radishes repel cucumber beetle reliably. A fast, easy companion.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Good general companions — both are quick-growing and complement each other in beds.'},
        {name:'Lettuces',    icon:'🥬', reason:'Classic inter-cropping pair. Radishes mature fast and are out before lettuce fills the space.'},
      ],
      foes:[
        {name:'Hyssop',      icon:'🌿', reason:'Hyssop is specifically noted as inhibiting radish development.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to radish as to most vegetables.'},
      ]
    },
    { id:'spinach', icon:'🌿', name:'Spinach',
      friends:[
        {name:'Strawberries', icon:'🍓', reason:'Spinach makes the perfect ground cover under strawberries, retaining moisture and suppressing weeds.'},
        {name:'Peas',         icon:'🫛', reason:'Peas fix nitrogen that spinach loves. Both prefer cool, moist conditions.'},
        {name:'Beans',        icon:'🫛', reason:'Nitrogen fixed by beans benefits heavy-feeding spinach significantly.'},
        {name:'Celery',       icon:'🌿', reason:'Both thrive in similar conditions. Celery deters pests that attack spinach.'},
        {name:'Brassicas',    icon:'🥦', reason:'Different root depths; spinach makes good ground cover under tall brassicas.'},
        {name:'Cauliflower',  icon:'🥦', reason:'Spinach fills space beneath cauliflowers and keeps the soil cool and moist.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Potatoes can harbour diseases that affect spinach. Competing water needs.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to spinach.'},
      ]
    },
    { id:'rocket', icon:'🌱', name:'Rocket',
      friends:[
        {name:'Spinach',     icon:'🌿', reason:'Similar growing conditions. Both thrive in cool weather and benefit from each other\'s company.'},
        {name:'Lettuce',     icon:'🥬', reason:'Classic salad leaf pairing. Both bolt at similar times, making succession sowing easy.'},
        {name:'Radish',      icon:'🔴', reason:'Radishes can deter flea beetle, a major pest of rocket.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Attract aphids away from rocket. Plant at the edge of the salad bed.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to most salad leaves including rocket.'},
        {name:'Brassicas',   icon:'🥦', reason:'Rocket is technically a brassica — growing alongside other brassicas concentrates flea beetle pressure.'},
      ],
      caution:[
        {name:'Fennel',      icon:'🌿', reason:'Rocket is particularly susceptible to flea beetle; growing near strong-smelling plants can help mask it.'},
      ]
    },
    { id:'chard', icon:'🌈', name:'Chard',
      friends:[
        {name:'Lettuce',     icon:'🥬', reason:'Excellent companions — both prefer cool conditions and neither competes with the other.'},
        {name:'Kale',        icon:'🥬', reason:'Good bed companions with different root structures. Chard fills space between kale plants well.'},
        {name:'Onions',      icon:'🧅', reason:'Onion scent deters aphids from chard. Good inter-planting companion.'},
        {name:'Lavender',    icon:'💜', reason:'Border planting of lavender deters aphids and attracts pollinators.'},
      ],
      foes:[
        {name:'Spinach',     icon:'🌿', reason:'Closely related — share diseases and pests. Better to keep them in rotation rather than together.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to chard as to most crops.'},
        {name:'Corn',        icon:'🌽', reason:'Corn is too tall and heavy a feeder to be a good companion for chard.'},
      ]
    },
    { id:'chicory', icon:'🥗', name:'Chicory',
      friends:[
        {name:'Carrot',      icon:'🥕', reason:'Chicory taproots break up subsoil, improving conditions for carrots.'},
        {name:'Lettuces',    icon:'🥬', reason:'Good companions — the bitter taste of chicory deters some slugs from the salad bed.'},
        {name:'Herbs',       icon:'🌿', reason:'Aromatic herbs nearby reduce pest pressure on chicory in autumn.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic root secretions inhibit chicory germination and growth.'},
        {name:'Runner Beans', icon:'🫘', reason:'Heavy vine crops compete too aggressively with chicory for space and moisture.'},
      ]
    },
    { id:'fennel', icon:'🌿', name:'Florence Fennel',
      friends:[
        {name:'Dill',        icon:'🌿', reason:'Both are umbellifers attracting the same beneficial insects. Good companions in the herb/salad border.'},
        {name:'Lettuce',     icon:'🥬', reason:'Lettuce grown a reasonable distance from fennel can benefit from deterrent insects attracted to fennel flowers.'},
      ],
      foes:[
        {name:'Most vegetables', icon:'🌿', reason:'Florence fennel is generally allelopathic — its root secretions inhibit many neighbouring plants. Grow in a dedicated spot or container.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Fennel strongly inhibits tomato growth. Keep well separated.'},
        {name:'Beans',       icon:'🫘', reason:'Fennel inhibits all legumes. A reliable incompatibility.'},
        {name:'Peppers',     icon:'🫑', reason:'Allelopathic to peppers and most fruiting crops.'},
      ]
    },
    { id:'celery', icon:'🥬', name:'Celery',
      friends:[
        {name:'Leeks',       icon:'🥢', reason:'The strong scent of leeks deters celery fly. Traditional companion pairing.'},
        {name:'Brassicas',   icon:'🥦', reason:'Celery\'s strong scent confuses cabbage white butterfly. A valued brassica companion.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Celery deters tomato pests while tomatoes provide light shade that celery appreciates.'},
        {name:'Beans',       icon:'🫘', reason:'Beans fix nitrogen that benefits hungry celery. Good bed companions.'},
        {name:'Cosmos',      icon:'🌸', reason:'Attracts beneficial insects that predate celery fly and aphids.'},
      ],
      foes:[
        {name:'Corn',        icon:'🌽', reason:'Tall corn shades celery excessively and competes for moisture.'},
        {name:'Parsnips',    icon:'🌻', reason:'Same family — share celery fly and other umbellifer pests.'},
        {name:'Potatoes',    icon:'🥔', reason:'Heavy feeders that compete directly with celery for nutrients and moisture.'},
        {name:'Carrots',     icon:'🥕', reason:'Both are umbellifers that share the same pests. Better to separate.'},
      ]
    },
    { id:'endive', icon:'🥬', name:'Endive',
      friends:[
        {name:'Chives',      icon:'💜', reason:'Chives deter aphids from endive and attract beneficial insects.'},
        {name:'Garlic',      icon:'🧄', reason:'Garlic planted nearby repels aphids — a primary endive pest.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids. Good salad bed companion.'},
        {name:'Lettuce',     icon:'🥬', reason:'Both are salad crops with similar requirements. Good bed companions.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to endive and most salad crops.'},
        {name:'Celery',      icon:'🥬', reason:'Both are bitter crops that compete for the same moisture and nutrients.'},
      ]
    },
    { id:'cornsalad', icon:'🌿', name:'Corn Salad',
      friends:[
        {name:'Spinach',     icon:'🌿', reason:'Very compatible winter companions with identical requirements and no competition.'},
        {name:'Lettuce',     icon:'🥬', reason:'Classic winter salad bed pairing — corn salad fills gaps between lettuce perfectly.'},
        {name:'Radish',      icon:'🔴', reason:'Winter radish grown alongside corn salad deters soil pests effectively.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to corn salad.'},
      ]
    },
    { id:'mizuna', icon:'🌿', name:'Mizuna & Mibuna',
      friends:[
        {name:'Lettuce',     icon:'🥬', reason:'Perfect companions in the cut-and-come-again salad bed with identical requirements.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Attract aphids and flea beetles away from mizuna. Excellent companion.'},
        {name:'Radish',      icon:'🔴', reason:'Some evidence that radish deters flea beetle, the primary mizuna pest.'},
        {name:'Spinach',     icon:'🌿', reason:'Compatible cool-season companions that don\'t compete with each other.'},
      ],
      foes:[
        {name:'Brassicas',   icon:'🥦', reason:'Mizuna is a brassica — growing alongside other brassicas concentrates flea beetle and cabbage white pressure.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to mizuna as to most crops.'},
      ]
    },
  ],
  herbs: [
    { id:'basil', icon:'🌿', name:'Basil',
      friends:[
        {name:'Tomatoes',    icon:'🍅', reason:'The classic pairing. Basil repels aphids, whitefly and spider mites from tomatoes.'},
        {name:'Peppers',     icon:'🫑', reason:'Repels aphids and spider mites. Both love warm, sunny spots.'},
        {name:'Aubergines',  icon:'🍆', reason:'Repels the same pests that attack aubergines in the greenhouse.'},
        {name:'Asparagus',   icon:'🌿', reason:'Deters asparagus beetle and improves general vigour of asparagus beds.'},
        {name:'Marigolds',   icon:'🌼', reason:'The ultimate pest-deterrent partnership. Together they deter almost all common pests.'},
      ],
      foes:[
        {name:'Sage',        icon:'🌿', reason:'Sage and basil are thought to inhibit each other when grown in direct proximity.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to basil as to most plants.'},
        {name:'Common rue',  icon:'🌿', reason:'Rue is allelopathic to basil and inhibits its growth.'},
      ]
    },
    { id:'mint', icon:'🌱', name:'Mint',
      friends:[
        {name:'Tomatoes',    icon:'🍅', reason:'Mint deters aphids and the tomato hornworm. Grow in a buried pot to prevent spread.'},
        {name:'Brassicas',   icon:'🥦', reason:'Planted as a border, mint deters cabbage white butterfly and aphids from brassica beds.'},
        {name:'Peas',        icon:'🫛', reason:'Mint at the border of a pea bed deters pea aphids reliably.'},
        {name:'Carrots',     icon:'🥕', reason:'Strong mint scent confuses carrot root fly. Grow in pots sunk into the soil nearby.'},
      ],
      foes:[
        {name:'Chamomile',   icon:'🌼', reason:'These two aromatic herbs are said to inhibit each other.'},
        {name:'Parsley',     icon:'🌿', reason:'Mint can overwhelm and out-compete parsley when allowed to spread freely.'},
      ],
      caution:[
        {name:'Everything nearby', icon:'🌿', reason:'Mint spreads aggressively by underground runners. ALWAYS grow in a buried pot or container to prevent it taking over.'},
      ]
    },
    { id:'chive', icon:'💜', name:'Chives',
      friends:[
        {name:'Carrots',     icon:'🥕', reason:'Chives deter carrot root fly with their onion scent. Plant in rows alongside carrots.'},
        {name:'Apples',      icon:'🍎', reason:'Planted around the base of apple trees, chives deter apple scab and aphids.'},
        {name:'Roses',       icon:'🌹', reason:'Chives deter aphids, black spot and other rose pests. Classic cottage garden pairing.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Chives deter aphids and spider mites from tomatoes.'},
        {name:'Celery',      icon:'🌿', reason:'Chives and celery are good neighbours that improve each other\'s growth.'},
      ],
      foes:[
        {name:'Peas',        icon:'🫛', reason:'Even mild alliums like chives can inhibit pea growth when planted close by.'},
        {name:'Beans',       icon:'🫛', reason:'Same allium incompatibility with legumes.'},
        {name:'Asparagus',   icon:'🌿', reason:'Alliums compete with asparagus in permanent beds.'},
      ]
    },
    { id:'parsley', icon:'🌱', name:'Parsley',
      friends:[
        {name:'Asparagus',   icon:'🌿', reason:'A very well-cited companion — parsley improves asparagus vigour and deters asparagus beetle.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Parsley is said to repel asparagus beetle and improve tomato plant health.'},
        {name:'Roses',       icon:'🌹', reason:'Parsley planted around roses deters rose pests and improves vigour.'},
        {name:'Chives',      icon:'🌿', reason:'Both attract beneficial insects. Good combination in the herb garden.'},
        {name:'Corn',        icon:'🌽', reason:'Parsley benefits sweetcorn — attracts predatory insects that control corn pests.'},
      ],
      foes:[
        {name:'Alliums',     icon:'🧅', reason:'All alliums (onion, garlic, leek, shallot) inhibit parsley growth.'},
        {name:'Mint',        icon:'🌿', reason:'Mint spreads into and overwhelms parsley. Keep mint in pots.'},
        {name:'Lettuce',     icon:'🥬', reason:'Some growers note that parsley can attract carrot root fly which then harms nearby crops.'},
      ]
    },
    { id:'rosemary', icon:'🌿', name:'Rosemary',
      friends:[
        {name:'Brassicas',   icon:'🥦', reason:'Rosemary\'s strong scent deters cabbage white butterflies effectively.'},
        {name:'Carrots',     icon:'🥕', reason:'Confuses carrot root fly with its aromatic oils. Plant at the bed edge.'},
        {name:'Beans',       icon:'🫛', reason:'Rosemary deters bean beetle. Beans grow well alongside this woody herb.'},
        {name:'Sage',        icon:'🌿', reason:'The classic Mediterranean herb pairing. Both thrive in identical conditions.'},
        {name:'Thyme',       icon:'🌿', reason:'Another good partner that shares rosemary\'s preferences for dry, sunny conditions.'},
      ],
      foes:[
        {name:'Cucumbers',   icon:'🥒', reason:'Rosemary\'s strong aromatic oils are thought to inhibit cucumber growth slightly.'},
        {name:'Pumpkins',    icon:'🎃', reason:'Heavy-feeders with different moisture needs — not natural companions.'},
      ]
    },
    { id:'thyme', icon:'🌱', name:'Thyme',
      friends:[
        {name:'Brassicas',   icon:'🥦', reason:'Thyme deters the cabbage worm. Plant as a living border around brassica beds.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Repels tomato hornworm and whitefly. Low-growing so doesn\'t shade tomatoes.'},
        {name:'Strawberries', icon:'🍓', reason:'Thyme deters pests and attracts pollinators beneficial to strawberry fruit set.'},
        {name:'Aubergines',  icon:'🍆', reason:'Deters aphids and other pests that attack aubergines.'},
        {name:'Rosemary',    icon:'🌿', reason:'Perfect partners — same growing requirements (sunny, dry, well-drained).'},
      ],
      foes:[
        {name:'Cucumbers',   icon:'🥒', reason:'Aromatic thyme oils are thought to inhibit cucumber growth.'},
        {name:'Fennel',      icon:'🌿', reason:'Though both are aromatic, fennel is allelopathic to thyme.'},
      ]
    },
  ],
  fruits: [
    { id:'strawberry', icon:'🍓', name:'Strawberries',
      friends:[
        {name:'Borage',      icon:'🌸', reason:'The ultimate strawberry companion — borage deters pests, attracts pollinators and is said to improve fruit flavour.'},
        {name:'Lettuce',     icon:'🥬', reason:'Fills gaps, suppresses weeds and provides gentle ground cover that doesn\'t compete.'},
        {name:'Spinach',     icon:'🥬', reason:'Low-growing; uses the space under strawberry runners efficiently.'},
        {name:'Thyme',       icon:'🌿', reason:'Deters pests and attracts pollinators. Low-growing and drought-tolerant.'},
        {name:'Marigolds',   icon:'🌼', reason:'Repel nematodes and slugs, both major strawberry pests.'},
        {name:'Chives',      icon:'🌿', reason:'Deter aphids and other insects that attack strawberry leaves.'},
      ],
      foes:[
        {name:'Brassicas',   icon:'🥦', reason:'Brassicas suppress strawberry growth consistently. Keep them in separate beds.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to strawberries.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Both are susceptible to similar diseases. Not ideal neighbours.'},
        {name:'Garlic',      icon:'🧄', reason:'Some sources report garlic inhibits strawberry growth.'},
      ]
    },
    { id:'raspberry', icon:'🫐', name:'Raspberries',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and other pests. Plant along the length of the raspberry bed.'},
        {name:'Garlic',      icon:'🧄', reason:'Deters aphids and Japanese beetle from raspberry canes.'},
        {name:'Tansy',       icon:'🌼', reason:'Deters flying insects. A traditional soft fruit companion.'},
        {name:'Comfrey',     icon:'🌿', reason:'Dynamic accumulator — leaves make excellent potassium-rich mulch for raspberries.'},
      ],
      foes:[
        {name:'Tomatoes',    icon:'🍅', reason:'Tomatoes and raspberries share viruses and verticillium wilt. Keep them apart.'},
        {name:'Potatoes',    icon:'🥔', reason:'Share diseases that persist in soil. Growing together increases disease pressure.'},
        {name:'Strawberries', icon:'🍓', reason:'Both are susceptible to botrytis. Growing together concentrates the problem.'},
      ]
    },
    { id:'apple', icon:'🍎', name:'Apples',
      friends:[
        {name:'Chives',      icon:'🌿', reason:'Planted around the base, chives deter apple scab and aphids effectively.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Attract aphids away from apple trees and bring in hoverflies that eat them.'},
        {name:'Comfrey',     icon:'🌿', reason:'Grown under apple trees, comfrey mines nutrients from deep soil and adds them to the surface as mulch.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter codling moth and aphids. Plant around the drip line of the tree.'},
        {name:'Clover',      icon:'🍀', reason:'Living mulch that fixes nitrogen, prevents grass competition and attracts beneficials.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Potato blight can spread to apple trees. Keep potatoes away from fruit trees.'},
        {name:'Grass',       icon:'🌿', reason:'Coarse grass around the base competes strongly for nutrients and water. Keep a clear mulched circle.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to apple root systems.'},
      ]
    },
    { id:'pear', icon:'🍐', name:'Pears',
      friends:[
        {name:'Chives',      icon:'🌿', reason:'Deter aphids and scab from pear trees. Plant around the base.'},
        {name:'Marigolds',   icon:'🌼', reason:'Repel pests and attract beneficial insects around the pear tree.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids. Keep the worst pests away from the tree.'},
        {name:'Comfrey',     icon:'🌿', reason:'Nutrient-mining mulch plant that feeds the pear tree\'s root zone.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing living mulch. Prevents grass competition under the tree.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Potato blight can affect pear trees. Keep a good distance between them.'},
        {name:'Grass',       icon:'🌿', reason:'Keep a mulched circle free of grass around the base to prevent nutrient competition.'},
      ]
    },
    { id:'blueberry', icon:'🫐', name:'Blueberries',
      friends:[
        {name:'Heather',     icon:'🌿', reason:'Heather shares blueberry\'s requirement for very acidic soil (pH 4.5–5.5) and creates a compatible ground cover.'},
        {name:'Azalea',      icon:'🌺', reason:'Same acid soil preference. Azaleas and blueberries thrive in identical conditions.'},
        {name:'Clover',      icon:'🍀', reason:'Fixes nitrogen and is tolerant of acidic conditions. Good living mulch under blueberries.'},
        {name:'Pine bark mulch', icon:'🌲', reason:'Not a plant but the ideal companion — maintains the highly acidic soil pH blueberries need.'},
      ],
      foes:[
        {name:'Most vegetables', icon:'🥕', reason:'Blueberries need extremely acidic soil (pH 4.5–5.5) — most vegetables prefer neutral soil and can\'t co-exist.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to blueberries.'},
        {name:'Nightshades', icon:'🍅', reason:'Tomatoes, potatoes and peppers prefer neutral pH — very incompatible with blueberry soil conditions.'},
      ]
    },
    { id:'gooseberry', icon:'🟢', name:'Gooseberries',
      friends:[
        {name:'Chives',      icon:'🌿', reason:'Deter aphids that commonly attack gooseberry shoots in spring.'},
        {name:'Marigolds',   icon:'🌼', reason:'General pest deterrent. Plant around the base of gooseberry bushes.'},
        {name:'Tomatoes',    icon:'🍅', reason:'An unusual but reported positive pairing — gooseberries and tomatoes improve each other\'s growth.'},
        {name:'Comfrey',     icon:'🌿', reason:'Grown nearby, comfrey provides a potassium-rich mulch that gooseberries love.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to gooseberries and most soft fruits.'},
        {name:'Potatoes',    icon:'🥔', reason:'Share common diseases including botrytis.'},
      ]
    },
    { id:'blackcurrant', icon:'🖤', name:'Blackcurrants',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and other insects. Plant along the edges of blackcurrant beds.'},
        {name:'Garlic',      icon:'🧄', reason:'Deters big bud mite, the major blackcurrant pest, when planted around the bushes.'},
        {name:'Chives',      icon:'🌿', reason:'Repel aphids from blackcurrant foliage. Good low companion.'},
        {name:'Comfrey',     icon:'🌿', reason:'Potassium-rich mulch that benefits blackcurrant fruit production significantly.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Share diseases and compete for nutrients.'},
        {name:'Tomatoes',    icon:'🍅', reason:'Not ideal neighbours — both susceptible to similar diseases.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to blackcurrants.'},
      ]
    },
    { id:'blackberry', icon:'🫐', name:'Blackberries',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and other insects that attack blackberry canes.'},
        {name:'Comfrey',     icon:'🌿', reason:'Nutrient-accumulating mulch plant that feeds blackberry roots.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Attract aphids away from blackberry canes and draw in beneficial insects.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing ground cover that improves soil beneath blackberry canes.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Share diseases in the soil. Best kept on opposite sides of the garden.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to blackberries.'},
      ]
    },
    { id:'rhubarb', icon:'🌹', name:'Rhubarb',
      friends:[
        {name:'Garlic',      icon:'🧄', reason:'Garlic planted nearby deters aphids and other insects from rhubarb.'},
        {name:'Columbine',   icon:'🌸', reason:'Traditional companion that is said to improve rhubarb\'s growth and health.'},
        {name:'Comfrey',     icon:'🌿', reason:'Dynamic accumulator with deep roots that mines nutrients for the whole bed.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter pests. Plant around the edges of the rhubarb bed.'},
      ],
      foes:[
        {name:'Dock weed',   icon:'🌿', reason:'Dock competes aggressively with rhubarb for space and nutrients.'},
        {name:'Thistles',    icon:'🌿', reason:'Invasive competitors that dominate the space rhubarb needs.'},
      ]
    },
    { id:'cherry', icon:'🍒', name:'Cherries',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter pests and attract pollinators — essential for cherry fruit set.'},
        {name:'Garlic',      icon:'🧄', reason:'Planted at the base, garlic deters aphids and other insects from cherry trees.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids around the base of cherry trees.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing living mulch. Attracts pollinators and prevents grass competition.'},
        {name:'Chives',      icon:'🌿', reason:'Deter cherry aphids and improve general health around the base of the tree.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Potato blight can spread to cherry trees in wet summers.'},
        {name:'Grass',       icon:'🌿', reason:'Keep a wide mulched circle free of grass to prevent intense nutrient competition.'},
        {name:'Wheat/grain', icon:'🌾', reason:'Cereals harbour diseases that affect cherry trees.'},
      ]
    },
    { id:'plum', icon:'🟣', name:'Plums',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and attract pollinators around plum trees.'},
        {name:'Chives',      icon:'💜', reason:'Deter aphids. Plant in a ring around the base of plum trees.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids. Good base companion for plum trees.'},
        {name:'Comfrey',     icon:'🌿', reason:'Potassium-rich mulch that improves fruit quality significantly.'},
        {name:'Clover',      icon:'🍀', reason:'Living mulch — fixes nitrogen, deters grass, attracts pollinators.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Potato blight can infect plum trees. Keep a good separation.'},
        {name:'Grass',       icon:'🌿', reason:'Keep a mulched, grass-free zone around the base of plum trees.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to plums and most fruit trees.'},
      ]
    },
    { id:'redcurrant', icon:'🔴', name:'Red & White Currants',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids from currant stems and flowers. Good border planting.'},
        {name:'Garlic',      icon:'🧄', reason:'Planted at the base, garlic deters aphids and big bud mite.'},
        {name:'Chives',      icon:'💜', reason:'Deter aphids and attract beneficial insects around the currant bushes.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing ground cover that improves fertility around currant roots.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to currant bushes.'},
        {name:'Potatoes',    icon:'🥔', reason:'Share diseases and compete for nutrients. Keep separated.'},
      ]
    },
    { id:'grape', icon:'🍇', name:'Grapes',
      friends:[
        {name:'Rosemary',    icon:'🌱', reason:'Planted at the base of a wall-trained vine, rosemary deters pests and shares the warm, dry conditions grapes love.'},
        {name:'Hyssop',      icon:'🌿', reason:'An ancient companion for vines — said to improve grape yields. Attracts beneficials.'},
        {name:'Geraniums',   icon:'🌸', reason:'Planted under vines, geraniums are said to deter vine-attacking insects.'},
        {name:'Chives',      icon:'💜', reason:'Deter aphids from vine stems and young shoots.'},
        {name:'Clover',      icon:'🍀', reason:'Living mulch that improves soil under the vine without competing aggressively.'},
      ],
      foes:[
        {name:'Cabbages',    icon:'🥬', reason:'Brassicas are thought to be detrimental to grape vine health when grown beneath them.'},
        {name:'Potatoes',    icon:'🥔', reason:'Share disease risks and compete for nutrients.'},
        {name:'Laurel',      icon:'🌿', reason:'The volatile compounds from laurel leaves inhibit vine growth.'},
      ]
    },
    { id:'peach', icon:'🍑', name:'Peaches',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes and aphids at the base of wall-trained peach trees.'},
        {name:'Garlic',      icon:'🧄', reason:'Deters aphids that commonly attack peach foliage and new growth in spring.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing ground cover under the tree. Attracts pollinators essential for fruit set.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids. Good base planting under fan-trained peach trees.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Potato blight can affect peach trees in wet summers.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to peaches and most tree fruits.'},
        {name:'Grass',       icon:'🌿', reason:'Keep grass-free zone with mulch around peach base to reduce competition and disease splash.'},
      ]
    },
    { id:'nectarine', icon:'🍑', name:'Nectarines',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter nematodes and aphids at the base. Identical companions to peaches.'},
        {name:'Garlic',      icon:'🧄', reason:'Deters aphids from nectarine shoots in spring.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing living mulch. Attracts pollinators for fruit set.'},
        {name:'Lavender',    icon:'💜', reason:'Attracts pollinators at wall base and provides aromatic pest deterrence.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Disease risk. Keep stone fruits away from potato beds.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to nectarines.'},
        {name:'Grass',       icon:'🌿', reason:'Maintain a mulched grass-free zone around the base.'},
      ]
    },
    { id:'apricot', icon:'🟡', name:'Apricots',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and attract pollinators — critical during the early spring flowering period.'},
        {name:'Lavender',    icon:'💜', reason:'Attracts early pollinators when apricots flower in February–March.'},
        {name:'Clover',      icon:'🍀', reason:'Living mulch that fixes nitrogen and attracts early-season bees.'},
        {name:'Garlic',      icon:'🧄', reason:'Deters aphids and other insects from apricot foliage.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Blight risk — keep all stone fruit trees away from potato beds.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to apricots.'},
        {name:'Walnut',      icon:'🌰', reason:'Walnuts release juglone — a powerful growth inhibitor for many plants including apricots.'},
      ]
    },
    { id:'gage', icon:'🟢', name:'Greengages',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and attract pollinators — identical companions to plums.'},
        {name:'Chives',      icon:'💜', reason:'Planted at the base, chives deter aphids from gage trees throughout the season.'},
        {name:'Nasturtiums', icon:'🌺', reason:'Trap crop for aphids. Good base companion.'},
        {name:'Comfrey',     icon:'🌿', reason:'Potassium-rich mulch from comfrey leaves significantly improves fruit quality.'},
        {name:'Clover',      icon:'🍀', reason:'Living nitrogen-fixing mulch that deters grass competition.'},
      ],
      foes:[
        {name:'Potatoes',    icon:'🥔', reason:'Blight risk — keep all stone fruits separated from potatoes.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to all plum-family trees.'},
        {name:'Grass',       icon:'🌿', reason:'Maintain a grass-free mulched zone at the base.'},
      ]
    },
    { id:'quince', icon:'🍋', name:'Quinces',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter aphids and attract pollinators around quince trees.'},
        {name:'Chives',      icon:'💜', reason:'Deter aphids from quince stems and foliage.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing ground cover that improves fertility in the quince rootzone.'},
        {name:'Comfrey',     icon:'🌿', reason:'Mineral-rich mulch that improves the fertility around the base of the tree.'},
      ],
      foes:[
        {name:'Walnut',      icon:'🌰', reason:'Juglone released from walnut roots inhibits quince growth.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to quince.'},
      ]
    },
    { id:'fig', icon:'🟣', name:'Figs',
      friends:[
        {name:'Rue',         icon:'🌿', reason:'Traditional companion for figs — rue is said to improve fig quality and deter some pests.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes and aphids around the fig base.'},
        {name:'Strawberries', icon:'🍓', reason:'Low-growing companions that thrive in the warm dry conditions figs create.'},
        {name:'Lavender',    icon:'💜', reason:'Shares the dry, sunny conditions figs love and attracts pollinators.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to figs.'},
        {name:'Potatoes',    icon:'🥔', reason:'Heavy feeders and blight hosts — keep away from figs.'},
      ]
    },
    { id:'kiwi', icon:'🥝', name:'Kiwi Fruit',
      friends:[
        {name:'Marigolds',   icon:'🌼', reason:'Deter nematodes from kiwi roots and attract pollinators.'},
        {name:'Clover',      icon:'🍀', reason:'Nitrogen-fixing ground cover under the kiwi pergola — excellent companion.'},
        {name:'Comfrey',     icon:'🌿', reason:'Potassium-rich mulch supports heavy cropping.'},
        {name:'Lavender',    icon:'💜', reason:'Attracts bees and other pollinators — essential for kiwi fruit set.'},
      ],
      foes:[
        {name:'Walnut',      icon:'🌰', reason:'Juglone from walnut roots inhibits kiwi growth.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to kiwi.'},
        {name:'Grass',       icon:'🌿', reason:'Maintain a generous mulched zone under the kiwi canopy.'},
      ]
    },
    { id:'mulberry', icon:'🫐', name:'Mulberries',
      friends:[
        {name:'Chives',      icon:'💜', reason:'Deter aphids from mulberry shoots in spring.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes and aphids around the mulberry base.'},
        {name:'Clover',      icon:'🍀', reason:'Living nitrogen-fixing mulch under the spreading canopy.'},
      ],
      foes:[
        {name:'Walnut',      icon:'🌰', reason:'Juglone is toxic to mulberry roots.'},
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to mulberries.'},
      ]
    },
    { id:'olive', icon:'🫒', name:'Olives',
      friends:[
        {name:'Lavender',    icon:'💜', reason:'Thrives in identical conditions — dry, sunny, well-drained. Attracts pollinators.'},
        {name:'Rosemary',    icon:'🌱', reason:'Perfect Mediterranean companion — same sun and drought requirements. Good mutual pest deterrence.'},
        {name:'Thyme',       icon:'🌱', reason:'Ground-cover companion that shares the well-drained conditions olives require.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil pests from olive roots and attract beneficial insects.'},
      ],
      foes:[
        {name:'Water-loving plants', icon:'🌿', reason:'Olives hate wet feet — avoid placing them near moisture-demanding plants that require frequent irrigation.'},
        {name:'Grass',       icon:'🌿', reason:'Keep a wide mulched zone free of grass around olive bases.'},
      ]
    },
    { id:'citrus', icon:'🍋', name:'Citrus',
      friends:[
        {name:'Lavender',    icon:'💜', reason:'Attracts pollinators for citrus flower set and deters some pests.'},
        {name:'Marigolds',   icon:'🌼', reason:'Deter soil nematodes from citrus roots and provide general pest deterrence.'},
        {name:'Basil',       icon:'🌿', reason:'Grown in the same greenhouse environment, basil repels aphids and spider mites from citrus.'},
        {name:'Borage',      icon:'🌸', reason:'Attracts beneficial insects. Good container companion in a sunny greenhouse.'},
      ],
      foes:[
        {name:'Fennel',      icon:'🌿', reason:'Allelopathic to citrus in container environments.'},
        {name:'Pepper',      icon:'🫑', reason:'Compete for the same warm greenhouse space and can share viral disease vectors.'},
      ]
    },
  ]
};

const CP_CAT_LABELS = {
  fruiting:'🍅 Fruiting', roots:'🥕 Roots', brassicas:'🥦 Brassicas',
  alliums:'🧅 Alliums', legumes:'🫛 Legumes', salads:'🥗 Salads',
  herbs:'🌿 Herbs', fruits:'🍓 Fruits'
};
const CP_CATS = Object.keys(CP_CAT_LABELS);

function cpInit() {
  const tabs = document.getElementById('cpTabs');
  if (!tabs) return;
  CP_CATS.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'cptab' + (i === 0 ? ' active' : '');
    btn.setAttribute('role','tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('data-cpcat', cat);
    btn.textContent = CP_CAT_LABELS[cat];
    btn.onclick = () => cpShowCat(cat);
    tabs.appendChild(btn);
  });
  cpShowCat('fruiting');
}

function cpShowCat(cat) {
  document.querySelectorAll('.cptab').forEach(b => {
    const match = b.dataset.cpcat === cat;
    b.classList.toggle('active', match);
    b.setAttribute('aria-selected', match ? 'true' : 'false');
  });
  const cards = document.getElementById('cpCards');
  const detail = document.getElementById('cpDetail');
  if (detail) detail.style.display = 'none';
  if (cards) {
    cards.style.display = 'grid';
    const data = companionData[cat] || [];
    cards.innerHTML = data.map(c => {
      const photoUrl = WIKI_PHOTOS[c.id];
      const photoHtml = photoUrl
        ? `<div class="pcard-photo-wrap"><img class="pcard-photo" src="${photoUrl}" alt="${c.name}" loading="lazy" onerror="this.closest('.pcard-photo-wrap').classList.add('no-photo');this.remove()"></div>`
        : `<div class="pcard-photo-wrap" style="background:linear-gradient(135deg,var(--bark),var(--leaf));display:flex;align-items:center;justify-content:center;font-size:3rem">${c.icon}</div>`;
      return `
      <div class="pcard" role="button" tabindex="0"
           onclick="cpOpenDetail('${cat}','${c.id}')"
           onkeydown="if(event.key==='Enter'||event.key===' ')cpOpenDetail('${cat}','${c.id}')">
        ${photoHtml}
        <div class="pcard-tag">${cat.charAt(0).toUpperCase()+cat.slice(1)}</div>
        <div class="pcard-name">${c.name}</div>
        <div class="pcard-counts" style="margin-top:0.4rem">
          <span title="Friends">✅ ${c.friends.length} companions</span>
          <span title="Foes"> ❌ ${c.foes.length} to avoid</span>
          ${(c.caution||[]).length ? `<span title="Caution">⚠️ ${c.caution.length}</span>` : ''}
        </div>
      </div>`;
    }).join('');

    // Lazy-load photos for any cards still showing emoji
    const missing = data.filter(c => !WIKI_PHOTOS[c.id]);
    if (missing.length) {
      const wikiArticles = {};
      missing.forEach(c => {
        const article = WIKI_TITLES[c.id];
        if (article) {
          if (!wikiArticles[article]) wikiArticles[article] = [];
          wikiArticles[article].push(c.id);
        }
      });
      Promise.allSettled(Object.entries(wikiArticles).map(async ([article, ids]) => {
        try {
          const slug = encodeURIComponent(article.replace(/ /g,'_'));
          const resp = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
            { headers: { Accept: 'application/json' } }
          );
          if (!resp.ok) return;
          const d = await resp.json();
          const src = d.thumbnail?.source || d.originalimage?.source;
          if (src) ids.forEach(id => { WIKI_PHOTOS[id] = src; });
        } catch(e) {}
      })).then(() => {
        // Re-render only if this tab is still active
        const activeTab = document.querySelector('.cptab.active');
        if (activeTab && activeTab.dataset.cpcat === cat) cpShowCat(cat);
      });
    }
  }
}

function cpOpenDetail(cat, id) {
  const c = (companionData[cat]||[]).find(x => x.id === id);
  if (!c) return;
  const cards = document.getElementById('cpCards');
  const detail = document.getElementById('cpDetail');
  if (cards) cards.style.display = 'none';
  if (detail) detail.style.display = 'block';

  const entryHtml = (arr, badge) => arr.map(f => `
    <div class="cp-entry">
      <div class="cp-badge">${badge}</div>
      <div class="cp-entry-body">
        <div class="cp-entry-name">${f.icon} ${f.name}</div>
        <div class="cp-entry-reason">${f.reason}</div>
      </div>
    </div>
  `).join('');

  const cautionHtml = (c.caution||[]).length ? `
    <div class="cp-col-title friends" style="margin-top:1rem">⚠️ With Caution</div>
    ${entryHtml(c.caution, '⚠️')}
  ` : '';

  const totalFriends = c.friends.length + (c.caution||[]).length;
  const photoUrl = WIKI_PHOTOS[c.id];
  const photoHtml = photoUrl
    ? `<img src="${photoUrl}" alt="${c.name}" style="width:64px;height:64px;object-fit:cover;border-radius:50%;flex-shrink:0;border:2px solid var(--border-strong)" onerror="this.style.display='none'">`
    : `<div class="cp-detail-icon">${c.icon}</div>`;

  const detailInner = document.getElementById('cpDetailInner');
  if (detailInner) detailInner.innerHTML = `
    <div class="cp-detail-header">
      ${photoHtml}
      <div>
        <div class="cp-detail-title">${c.name}</div>
        <div class="cp-detail-sub">${totalFriends} good neighbour${totalFriends!==1?'s':''} · ${c.foes.length} to keep apart</div>
      </div>
    </div>
    <div class="cp-columns">
      <div>
        <div class="cp-col-title friends">✅ Good Companions</div>
        ${entryHtml(c.friends, '✅')}
        ${cautionHtml}
      </div>
      <div>
        <div class="cp-col-title foes">❌ Keep Apart</div>
        ${entryHtml(c.foes, '❌')}
      </div>
    </div>
  `;
}

function cpBack() {
  const cards = document.getElementById('cpCards');
  const detail = document.getElementById('cpDetail');
  if (cards) cards.style.display = 'grid';
  if (detail) detail.style.display = 'none';
}


cpInit(); // Build companion planting section — must be after companionData is defined

(function() {
  const SEASON_DATA = {
    0:  { badge:'❄️ Deep Winter — January',
          mood:'The plot is resting — plan, order seeds, and force chicory indoors.',
          title:'Get a head start this January',
          sow:'Chilli peppers & aubergines in a heated propagator',
          tend:'Order seeds · plan crop rotation · check stored roots & squash',
          harvest:'Parsnips (best after frost) · Brussels sprouts · leeks · kale' },
    1:  { badge:'❄️ Late Winter — February',
          mood:'The first signs of life appear — purple sprouting broccoli and forced rhubarb signal spring is coming.',
          title:'February: the growing year wakes up',
          sow:'Early tomatoes & onion seeds indoors · chit seed potatoes',
          tend:'Prune autumn-fruiting raspberries · force rhubarb · prepare beds with compost',
          harvest:'Purple sprouting broccoli · kale · leeks · forced rhubarb' },
    2:  { badge:'🌱 Early Spring — March',
          mood:'March is the turning point — the garden wakes up and the growing year truly begins.',
          title:'Start your seeds now',
          sow:'Carrots, broad beans, beetroot, lettuce & salads under cover',
          tend:'Plant asparagus crowns · divide mint · earth up early potatoes as shoots appear',
          harvest:'Purple sprouting broccoli · spring greens · overwintered chard & spinach · leeks' },
    3:  { badge:'🌱 Spring — April',
          mood:'Sowing season hits full stride — plant outdoors after the last frosts and fill every bed.',
          title:'Fill the beds — April is for sowing',
          sow:'Courgettes, squash & pumpkins indoors · runner & French beans · sweetcorn',
          tend:'Harden off tomatoes · net brassicas · set up wigwams · plant onion sets',
          harvest:'Asparagus · rhubarb · spring onions · radishes · early lettuces' },
    4:  { badge:'🌸 Late Spring — May',
          mood:'Frosts are nearly over — the most exciting planting month of the year.',
          title:'May: plant out, sow direct, and watch it grow',
          sow:'Sweetcorn & French beans direct · basil indoors · more salads & radishes',
          tend:'Plant tomatoes out after last frost · earth up potatoes · water regularly',
          harvest:'Asparagus (peak) · rhubarb · radishes · spring onions · first gooseberry thinnings' },
    5:  { badge:'☀️ Early Summer — June',
          mood:'The plot hits its stride — strawberries ripen, peas swell, and courgettes need daily checking.',
          title:'June: the harvest season begins',
          sow:'Last runner beans · turnips · swede · more salads for succession',
          tend:'Pinch out tomato sideshoots · water daily · feed tomatoes weekly · net strawberries',
          harvest:'Broad beans · peas · strawberries · courgettes · cherries · garlic (green harvest)' },
    6:  { badge:'☀️ Midsummer — July',
          mood:'Peak season — harvest daily, water constantly, and feed fruiting crops every week.',
          title:'July: harvest morning and evening',
          sow:'Winter salads (chicory, endive, corn salad) · overwintering onion sets',
          tend:'Feed tomatoes & peppers weekly · support sweetcorn · summer prune trained fruit',
          harvest:'Tomatoes · cucumbers · courgettes · French & runner beans · onions · garlic' },
    7:  { badge:'🌾 Late Summer — August',
          mood:'The biggest harvest month — tomatoes, sweetcorn, and squash all peak together.',
          title:'August: preserve, freeze, and feast',
          sow:'Winter salads · spring onions · Japanese onion sets for overwintering',
          tend:'Keep watering · remove spent crops · start composting summer debris',
          harvest:'Tomatoes (peak) · sweetcorn · squash · peppers · apples · plums · blueberries' },
    8:  { badge:'🍂 Early Autumn — September',
          mood:'The summer rush slows — time to harvest and store the year\'s bounty before the first frosts.',
          title:'September: store the harvest',
          sow:'Green manures on empty beds · overwintering salads under cover',
          tend:'Plant garlic cloves · cure squash in sun · lift potatoes & store · cut back spent crops',
          harvest:'Squash & pumpkins · apples & pears · sweetcorn (last) · beans · courgettes' },
    9:  { badge:'🍂 Autumn — October',
          mood:'The season winds down — plant garlic, clear beds, and prepare for winter.',
          title:'October: plant for next year',
          sow:'Broad beans for overwintering · garlic cloves · green manures',
          tend:'Clear and compost spent crops · apply manure to beds · protect tender plants',
          harvest:'Parsnips & carrots · kale · leeks · Brussels sprouts · apples · quinces · figs' },
    10: { badge:'🌧️ Late Autumn — November',
          mood:'The plot quietens — but the best Brussels sprouts, parsnips, and leeks are still to come.',
          title:'November: the frost improves everything',
          sow:'Nothing to sow — clean, repair tools and plan next year\'s rotation',
          tend:'Net brassicas · insulate tender plants · check stored roots monthly · service tools',
          harvest:'Brussels sprouts (best after frost) · parsnips · leeks · kale · celery · Jerusalem artichokes' },
    11: { badge:'❄️ Winter — December',
          mood:'The garden rests — but parsnips are sweeter than ever, and forced chicory brings winter luxury.',
          title:'December: the quiet season',
          sow:'Nothing to sow outdoors — plan and order next year\'s seeds',
          tend:'Prune apple & pear trees · mulch bare beds · force chicory chicons indoors',
          harvest:'Parsnips (peak sweetness after hard frost) · Brussels sprouts · leeks · kale · stored squash' },
  };

  function updateHero() {
    const m = new Date().getMonth();
    const s = SEASON_DATA[m];
    if (!s) return;
    const badge = document.getElementById('heroBadge');
    if (badge) badge.textContent = s.badge;
    const title = document.getElementById('heroSeasonTitle');
    if (title) title.textContent = s.title;
    const body = document.getElementById('heroSeasonBody');
    if (body) body.textContent = s.mood;
    const list = document.getElementById('heroNowList');
    if (list) list.innerHTML = `
      <div class="hero-now-item">
        <span class="hni-icon">🌱</span>
        <div class="hni-text"><strong>Sow now</strong><span>${s.sow}</span></div>
      </div>
      <div class="hero-now-item">
        <span class="hni-icon">🌿</span>
        <div class="hni-text"><strong>Tend to</strong><span>${s.tend}</span></div>
      </div>
      <div class="hero-now-item">
        <span class="hni-icon">🧺</span>
        <div class="hni-text"><strong>Harvest</strong><span>${s.harvest}</span></div>
      </div>`;
  }

  updateHero();
})();



function printPlannerOnly() {
  const planner = document.getElementById('planner');
  if (!planner) { window.print(); return; }

  // Grab planner canvas as image if visible
  const canvas = document.getElementById('plannerCanvas');
  let canvasDataUrl = null;
  if (canvas) {
    try { canvasDataUrl = canvas.toDataURL('image/png'); } catch(e) {}
  }

  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) { window.print(); return; }

  // Clone the planner HTML
  const clone = planner.cloneNode(true);

  // Replace canvas with img if we captured it
  if (canvasDataUrl) {
    const canvasEl = clone.querySelector('#plannerCanvas');
    if (canvasEl) {
      const img = document.createElement('img');
      img.src = canvasDataUrl;
      img.style.cssText = 'max-width:100%;height:auto;display:block;border:1px solid #ccc;border-radius:6px;';
      canvasEl.replaceWith(img);
    }
  }

  // Remove UI-only elements from clone
  ['planner-toolbar', 'plannerHint', 'planner-actions', 'planner-tabs',
   'view3d', 'plannerStats'].forEach(id => {
    const el = clone.querySelector('#' + id) || clone.querySelector('.' + id);
    if (el) el.remove();
  });

  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Garden Planner — Franks &amp; Jaynes Good Life</title>
<style>
  @page { size: A4 landscape; margin: 12mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, serif; font-size: 10pt; color: #111; background: #fff; margin: 0; padding: 0; }
  h1 { font-family: sans-serif; font-size: 14pt; color: #2d6a2d; margin: 0 0 8pt; }
  .print-header { border-bottom: 2px solid #2d6a2d; padding-bottom: 6pt; margin-bottom: 14pt; display:flex; justify-content:space-between; align-items:baseline; }
  .print-brand { font-family: sans-serif; font-size: 8pt; color: #2d6a2d; text-transform: uppercase; letter-spacing: 0.08em; }
  /* Hide nav, buttons, hints in the cloned content */
  nav, button, .planner-toolbar, .planner-hint, .planner-actions,
  .planner-tabs, #plannerHint, .planner-stats { display: none !important; }
  img { max-width: 100%; height: auto; }
  canvas { display: none !important; }
</style>
</head>
<body>
<div class="print-header">
  <h1>🌱 Garden Planner</h1>
  <span class="print-brand">Franks &amp; Jaynes Good Life — Grow Your Own</span>
</div>
${clone.innerHTML}
<script>window.onload=function(){window.print();window.close();};<\/script>
</body></html>`);
  win.document.close();
}



function toggleMobileNav(){var btn=document.getElementById('navHamburger'),drawer=document.getElementById('navDrawer');if(!btn||!drawer)return;var isOpen=drawer.classList.contains('open');drawer.classList.toggle('open',!isOpen);btn.classList.toggle('open',!isOpen);btn.setAttribute('aria-expanded',String(!isOpen));}
function closeMobileNav(){var btn=document.getElementById('navHamburger'),drawer=document.getElementById('navDrawer');if(!btn||!drawer)return;drawer.classList.remove('open');btn.classList.remove('open');btn.setAttribute('aria-expanded','false');}
