
const calendarData = {
  Jan: {
    sow: ['Broad beans (under cover)', 'Onion seeds (heated propagator)', 'Chilli peppers (heated propagator)', 'Aubergines (heated propagator)', 'Celeriac (indoors, 15°C+)'],
    tend: ['Dig & compost empty beds', 'Order seeds & plan rotation', 'Check stored roots & squash', 'Force chicory chicons indoors', 'Prune apple & pear trees', 'Check overwintering brassicas'],
    harvest: ['Parsnips (best after frost)', 'Brussels sprouts', 'Kale', 'Leeks', 'Jerusalem artichokes (dig as needed)', 'Corn salad', 'Stored onions, garlic & squash', 'Chicory chicons (forced)', 'Rhubarb (force under pot)']
  },
  Feb: {
    sow: ['Broad beans (direct, mild areas)', 'Early tomatoes (heated propagator)', 'Lettuce (under cover)', 'Peas (under cover)', 'Chillies & peppers (heated)', 'Onion seeds (indoors)', 'Celeriac (indoors)', 'Aubergines (heated)', 'Chives (indoors)', 'Parsley (indoors)'],
    tend: ['Chit seed potatoes', 'Prepare beds with compost', 'Plant shallot sets (mild areas)', 'Prune autumn-fruiting raspberries', 'Force rhubarb under an upturned bucket', 'Check stored roots monthly'],
    harvest: ['Parsnips', 'Purple sprouting broccoli (early)', 'Kale', 'Leeks', 'Brussels sprouts', 'Jerusalem artichokes', 'Corn salad', 'Chicory chicons', 'Forced rhubarb', 'Overwintered spinach & chard']
  },
  Mar: {
    sow: ['Tomatoes (indoors)', 'Carrots (under cover/direct)', 'Broad beans (direct)', 'Beetroot (under cover)', 'Lettuce & salad leaves', 'Leeks (indoors)', 'Celery (indoors)', 'Globe artichokes (indoors)', 'Chives (indoors)', 'Parsley (direct/indoors)', 'Mizuna & oriental leaves (direct)', 'Pak choi (modules)', 'Kohlrabi (modules)', 'Peas (direct or indoors)'],
    tend: ['Plant early potatoes', 'Earth up as shoots appear', 'Harden off indoor seedlings', 'Plant asparagus crowns', 'Divide mint', 'Plant Jerusalem artichoke tubers', 'Prune fig shoots back to one bud', 'Mulch soft fruit beds', 'Plant rosemary & thyme cuttings'],
    harvest: ['Purple sprouting broccoli', 'Spring greens', 'Spinach (overwintered)', 'Chard', 'Asparagus (late Mar, established beds)', 'Corn salad', 'Chicory (last chicons)', 'Rhubarb (first outdoor sticks)', 'Leeks']
  },
  Apr: {
    sow: ['Runner beans (indoors)', 'French beans (indoors)', 'Courgettes (indoors)', 'Cucumbers (indoors)', 'Sweetcorn (indoors)', 'Squash & pumpkins (indoors)', 'Melon (indoors, heated)', 'Sweet potato slips (start off)', 'More carrots & beetroot (direct)', 'Calabrese (modules)', 'Cauliflower (modules)', 'Celery (indoors)', 'Fennel (do not sow before June)', 'Basil (indoors, warm)', 'Chives (direct)', 'Parsley (direct)', 'Rocket (direct)', 'Radishes (direct)', 'Spring onions (direct)', 'Mizuna (direct)', 'Corn salad (light sowing)', 'Chard (direct)'],
    tend: ['Plant second early potatoes', 'Harden off tomatoes & peppers', 'Thin direct-sown seedlings', 'Set up wigwams for beans', 'Net brassicas against butterflies', 'Plant onion sets', 'Plant shallot sets'],
    harvest: ['Spring onions', 'Radishes', 'Asparagus', 'Rhubarb', 'Purple sprouting broccoli (last)', 'Overwintered spinach & chard', 'Corn salad', 'Lettuce (from overwintered plants)']
  },
  May: {
    sow: ['Sweetcorn (direct after frosts)', 'Squash & pumpkins (direct)', 'Courgettes (direct)', 'French beans (direct)', 'Runner beans (direct)', 'Soya beans (indoors or direct)', 'More carrots, beetroot, turnips', 'Kale (seedbed)', 'Calabrese (direct)', 'Chinese cabbage (modules)', 'Pak choi (direct)', 'Kohlrabi (direct)', 'Florence fennel (do not sow yet)', 'Basil (indoors)', 'More rocket, radish, spring onions', 'Mizuna & mibuna (direct)', 'Endive (late May)', 'More lettuce & salad leaves'],
    tend: ['Plant tomatoes out (after frosts)', 'Harden off all tender crops', 'Earth up potatoes', 'Erect netting over brassicas', 'Pollinate peaches & nectarines by hand', 'Water regularly during dry spells', 'Feed citrus plants monthly'],
    harvest: ['Asparagus (peak — every other day)', 'Rhubarb', 'Lettuce', 'Radishes', 'Spring onions', 'Overwintered spinach', 'Gooseberries (green thinnings for cooking)']
  },
  Jun: {
    sow: ['Runner beans (final direct sowing)', 'More salad leaves (short rows)', 'Turnips', 'Swede', 'Kale (final sowing)', 'Florence fennel (mid-June onwards)', 'Chicory (direct)', 'Chinese cabbage (modules)', 'Pak choi (direct)', 'More beetroot, carrots, radishes', 'More spring onions & mizuna', 'Corn salad (early sowing)'],
    tend: ['Pinch out tomato sideshoots weekly', 'Water regularly — tomatoes daily', 'Feed tomatoes weekly (high potash)', 'Earth up potatoes (final time)', 'Train courgettes & squash', 'Thin gooseberries for larger fruits', 'Support sweetcorn in windy weather', 'Net strawberries against birds'],
    harvest: ['Broad beans', 'Peas (first)', 'Courgettes (first)', 'Strawberries', 'Gooseberries', 'Cherries', 'First early potatoes', 'Asparagus (stop harvesting by midsummer)', 'Lettuce', 'Radishes', 'Spring onions', 'Globe artichokes (first heads)', 'Garlic (early harvest — green garlic)']
  },
  Jul: {
    sow: ['Spring onions (for autumn)', 'Quick salads for autumn', 'French beans (late sowing)', 'Turnips (late)', 'Chicory (radicchio — last sowing)', 'Florence fennel (July sowings best)', 'Chinese cabbage (direct)', 'Endive', 'More corn salad', 'Winter radishes', 'Pak choi (for autumn)'],
    tend: ['Water daily in heat waves', 'Pick courgettes every 2–3 days', 'Support bean wigwams', 'Remove yellowing tomato leaves', 'Deadhead strawberries & runner propagation', 'Prune plums, gages & cherries (after harvest)', 'Train cucumber & melon laterals'],
    harvest: ['Broad beans', 'French beans', 'Courgettes', 'Beetroot', 'Onions (when tops fall)', 'Garlic', 'Shallots', 'Peas', 'Lettuce', 'Globe artichokes', 'Calabrese (central head then side shoots)', 'Gooseberries', 'Red & white currants', 'Blackcurrants', 'Cherries', 'Raspberries (summer)', 'Apricots', 'Blueberries (early)', 'Peaches (early)']
  },
  Aug: {
    sow: ['Overwintering onion sets (late Aug)', 'Winter salads & spinach', 'Oriental greens & mizuna', 'Autumn spinach & chard', 'Corn salad', 'Endive (for winter)', 'Chicory (forcing types)', 'Land cress', 'Japanese onions'],
    tend: ['Dry out onions & garlic in sun', 'Cut comfrey as liquid fertiliser', 'Water tomatoes very consistently', 'Pinch out cucumber growing tips', 'Support pumpkin fruits in nets', 'Check blackberries for ripeness daily', 'Feed outdoor tomatoes twice weekly', 'Water celery — never let it dry out'],
    harvest: ['Tomatoes', 'Runner beans', 'Courgettes', 'Sweetcorn', 'Cucumbers', 'Maincrop potatoes', 'French beans', 'Soya beans (edamame)', 'Beetroot', 'Kohlrabi', 'Calabrese (side shoots)', 'Fennel (bulbs)', 'Blueberries', 'Peaches', 'Nectarines', 'Plums & damsons', 'Gages (early)', 'Blackberries (first)', 'Raspberries (summer)', 'Apples (earliest varieties)']
  },
  Sep: {
    sow: ['Garlic (from mid-Sep)', 'Overwintering onion sets', 'Green manures on empty beds', 'Winter lettuce (under cover)', 'Corn salad & lamb\'s lettuce', 'Spinach (under cover)', 'Pak choi (under cover)', 'Mizuna & mibuna (under cover)', 'Oriental salad leaves'],
    tend: ['Clear spent crops & compost', 'Lift & store maincrop potatoes', 'Collect seeds for next year', 'Cut asparagus ferns — leave to yellow first', 'Lift Jerusalem artichokes after first frosts', 'Pot up herbs for winter windowsill use (basil, parsley)', 'Tidy strawberry beds'],
    harvest: ['Tomatoes (ripen green ones indoors)', 'Squash & pumpkins (cure before first frost)', 'Runner beans (last)', 'Sweetcorn', 'Leeks (begin)', 'Celeriac (begin lifting)', 'Celery (cut as needed)', 'Fennel bulbs', 'Chicory (begin harvesting heads)', 'Endive (harvest with blanching)', 'Grapes', 'Quinces (begin)', 'Figs', 'Gages', 'Blackberries', 'Mulberries', 'Kiwi fruit (indoor)', 'Apples', 'Pears']
  },
  Oct: {
    sow: ['Garlic cloves', 'Broad beans (for early spring)', 'Overwintering greens', 'Winter spinach (under cover)', 'Corn salad', 'Land cress'],
    tend: ['Lift & store roots (carrots, celeriac)', 'Protect brassicas from pigeons', 'Mulch perennial beds (strawberry, asparagus, artichokes)', 'Cut down Jerusalem artichoke stems', 'Cover tender herbs (rosemary, thyme) in frost-prone areas', 'Bring citrus indoors before frost', 'Harvest & store pumpkins & squash', 'Clear potato haulms', 'Plant new fruit trees & bushes'],
    harvest: ['Squash & pumpkins', 'Carrots & parsnips', 'Leeks', 'Kale', 'Brussels sprouts (begin)', 'Celeriac', 'Jerusalem artichokes (after first frost)', 'Apples (main crop)', 'Pears (main)', 'Quinces', 'Kiwi fruit', 'Olives (green harvest)', 'Grapes', 'Medlars', 'Chard', 'Corn salad', 'Endive (blanched)']
  },
  Nov: {
    sow: ['Broad beans (mild areas)', 'Garlic (last chance)', 'Corn salad (under cover)'],
    tend: ['Dig over empty beds & add manure', 'Clean & oil tools for winter', 'Plan next year\'s rotation', 'Cover fennel crowns with straw', 'Protect globe artichoke crowns with fleece', 'Force chicory roots indoors', 'Protect Jerusalem artichoke bed with straw mulch', 'Plant bare-root fruit trees & bushes', 'Prune apple & pear trees (start)', 'Clear fallen fruit & leaves from under trees'],
    harvest: ['Leeks', 'Brussels sprouts', 'Kale', 'Parsnips (best after hard frost)', 'Swede', 'Celeriac', 'Jerusalem artichokes', 'Chard', 'Chicory (heads & forced chicons)', 'Corn salad', 'Stored apples & pears', 'Olives (black harvest)']
  },
  Dec: {
    sow: ['Broad beans (very mild areas only)'],
    tend: ['Order seed catalogues', 'Draw up growing plan & rotation', 'Repair tools & structures', 'Top up compost bins', 'Check stored roots & squash for rot', 'Protect outdoor containers from frost', 'Prune fruit trees in dry weather', 'Feed overwintering brassicas with nitrogen'],
    harvest: ['Brussels sprouts (best after hard frost)', 'Parsnips', 'Leeks', 'Winter kale', 'Chard (inner leaves)', 'Jerusalem artichokes', 'Corn salad', 'Stored onions, garlic & shallots', 'Stored squash & pumpkins', 'Stored apples', 'Forced chicory chicons', 'Citrus fruit (lemons year-round)']
  }
};

function setMonth(month) {
  document.querySelectorAll('.month-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === month);
  });
  renderCalendar(month);
}

// ── CALENDAR PRODUCE LOOKUP ──
// Maps keywords found in calendar item strings → { cat, id }
// so clicking a calendar item navigates to the matching produce guide
const CAL_PRODUCE_MAP = {
  // Fruiting
  'tomato':          { cat:'fruiting',  id:'tomato' },
  'courgette':       { cat:'fruiting',  id:'courgette' },
  'squash':          { cat:'fruiting',  id:'squash' },
  'pumpkin':         { cat:'fruiting',  id:'pumpkin' },
  'sweet potato':    { cat:'fruiting',  id:'sweetpotato' },
  'cucumber':        { cat:'fruiting',  id:'cucumber' },
  'sweetcorn':       { cat:'fruiting',  id:'sweetcorn' },
  'aubergine':       { cat:'fruiting',  id:'aubergine' },
  'pepper':          { cat:'fruiting',  id:'pepper' },
  'chilli':          { cat:'fruiting',  id:'pepper' },
  // Roots
  'carrot':          { cat:'roots',     id:'carrot' },
  'potato':          { cat:'roots',     id:'potato' },
  'potatoes':        { cat:'roots',     id:'potato' },
  'beetroot':        { cat:'roots',     id:'beetroot' },
  'parsnip':         { cat:'roots',     id:'parsnip' },
  'turnip':          { cat:'roots',     id:'turnip' },
  'swede':           { cat:'roots',     id:'swede' },
  'asparagus':       { cat:'roots',     id:'asparagus' },
  'celeriac':        { cat:'roots',     id:'celeriac' },
  'jerusalem artichoke': { cat:'roots', id:'jerusalem' },
  // Brassicas
  'kale':            { cat:'brassicas', id:'kale' },
  'sprout':          { cat:'brassicas', id:'sprouts' },
  'brussel':         { cat:'brassicas', id:'sprouts' },
  'cabbage':         { cat:'brassicas', id:'cabbage' },
  'broccoli':        { cat:'brassicas', id:'broccoli' },
  'calabrese':       { cat:'brassicas', id:'calabrese' },
  'cauliflower':     { cat:'brassicas', id:'cauliflower' },
  'kohlrabi':        { cat:'brassicas', id:'kohlrabi' },
  'chinese cabbage': { cat:'brassicas', id:'chinesecabbage' },
  'pak choi':        { cat:'brassicas', id:'pakchoi' },
  'brassica':        { cat:'brassicas', id:'kale' },
  'purple sprouting':{ cat:'brassicas', id:'broccoli' },
  // Alliums
  'onion':           { cat:'alliums',   id:'onion' },
  'garlic':          { cat:'alliums',   id:'garlic' },
  'leek':            { cat:'alliums',   id:'leek' },
  'shallot':         { cat:'alliums',   id:'shallot' },
  'spring onion':    { cat:'salads',    id:'springonion' },
  // Legumes
  'runner bean':     { cat:'legumes',   id:'runner' },
  'runner beans':    { cat:'legumes',   id:'runner' },
  'broad bean':      { cat:'legumes',   id:'broadbean' },
  'broad beans':     { cat:'legumes',   id:'broadbean' },
  'pea':             { cat:'legumes',   id:'peas' },
  'french bean':     { cat:'legumes',   id:'frenchbean' },
  'french beans':    { cat:'legumes',   id:'frenchbean' },
  'soya bean':       { cat:'legumes',   id:'soyabean' },
  'edamame':         { cat:'legumes',   id:'soyabean' },
  // Salads
  'lettuce':         { cat:'salads',    id:'lettuce' },
  'salad':           { cat:'salads',    id:'lettuce' },
  'radish':          { cat:'salads',    id:'radish' },
  'spinach':         { cat:'salads',    id:'spinach' },
  'chard':           { cat:'salads',    id:'chard' },
  'rocket':          { cat:'salads',    id:'rocket' },
  'oriental':        { cat:'salads',    id:'rocket' },
  'chicory':         { cat:'salads',    id:'chicory' },
  'radicchio':       { cat:'salads',    id:'chicory' },
  'florence fennel': { cat:'salads',    id:'fennel' },
  'celery':          { cat:'salads',    id:'celery' },
  'globe artichoke': { cat:'salads',    id:'globeartichoke' },
  'endive':          { cat:'salads',    id:'endive' },
  'frisee':          { cat:'salads',    id:'endive' },
  'escarole':        { cat:'salads',    id:'endive' },
  'corn salad':      { cat:'salads',    id:'cornsalad' },
  'mache':           { cat:'salads',    id:'cornsalad' },
  "lamb's lettuce":  { cat:'salads',    id:'cornsalad' },
  'mizuna':          { cat:'salads',    id:'mizuna' },
  'mibuna':          { cat:'salads',    id:'mizuna' },
  'oriental salad':  { cat:'salads',    id:'mizuna' },
  'garden cress':    { cat:'salads',    id:'gardencress' },
  'cress':           { cat:'salads',    id:'gardencress' },
  'mustard cress':   { cat:'salads',    id:'gardencress' },
  'sorrel':          { cat:'salads',    id:'sorrel' },
  'oregano':         { cat:'herbs',     id:'oregano' },
  'marjoram':        { cat:'herbs',     id:'oregano' },
  'coriander':       { cat:'herbs',     id:'coriander' },
  'cilantro':        { cat:'herbs',     id:'coriander' },
  'lemon balm':      { cat:'herbs',     id:'lemonbalm' },
  'melissa':         { cat:'herbs',     id:'lemonbalm' },
  'chamomile':       { cat:'herbs',     id:'chamomile' },
  'camomile':        { cat:'herbs',     id:'chamomile' },
  'watermelon':      { cat:'fruits',    id:'watermelon' },
  'spring green':    { cat:'brassicas', id:'cabbage' },
  // Herbs
  'basil':           { cat:'herbs',     id:'basil' },
  'mint':            { cat:'herbs',     id:'mint' },
  'chive':           { cat:'herbs',     id:'chive' },
  'parsley':         { cat:'herbs',     id:'parsley' },
  'rosemary':        { cat:'herbs',     id:'rosemary' },
  'thyme':           { cat:'herbs',     id:'thyme' },
  'comfrey':         { cat:'herbs',     id:'chive' },
  // Fruits
  'strawberr':       { cat:'fruits',    id:'strawberry' },
  'raspberr':        { cat:'fruits',    id:'raspberry' },
  'apple':           { cat:'fruits',    id:'apple' },
  'pear':            { cat:'fruits',    id:'pear' },
  'blueberr':        { cat:'fruits',    id:'blueberry' },
  'gooseberr':       { cat:'fruits',    id:'gooseberry' },
  'blackcurrant':    { cat:'fruits',    id:'blackcurrant' },
  'rhubarb':         { cat:'fruits',    id:'rhubarb' },
  'cherr':           { cat:'fruits',    id:'cherry' },
  'plum':            { cat:'fruits',    id:'plum' },
  'damson':          { cat:'fruits',    id:'plum' },
  'blackberr':       { cat:'fruits',    id:'blackberry' },
  'red currant':     { cat:'fruits',    id:'redcurrant' },
  'redcurrant':      { cat:'fruits',    id:'redcurrant' },
  'white currant':   { cat:'fruits',    id:'redcurrant' },
  'grape':           { cat:'fruits',    id:'grape' },
  'grapevine':       { cat:'fruits',    id:'grape' },
  'melon':           { cat:'fruits',    id:'melon' },
  'peach':           { cat:'fruits',    id:'peach' },
  'nectarine':       { cat:'fruits',    id:'nectarine' },
  'apricot':         { cat:'fruits',    id:'apricot' },
  'gage':            { cat:'fruits',    id:'gage' },
  'greengage':       { cat:'fruits',    id:'gage' },
  'quince':          { cat:'fruits',    id:'quince' },
  'fig':             { cat:'fruits',    id:'fig' },
  'kiwi':            { cat:'fruits',    id:'kiwi' },
  'mulberr':         { cat:'fruits',    id:'mulberry' },
  'olive':           { cat:'fruits',    id:'olive' },
  'citrus':          { cat:'fruits',    id:'citrus' },
  'lemon':           { cat:'fruits',    id:'citrus' },
  'orange':          { cat:'fruits',    id:'citrus' },
  'lime':            { cat:'fruits',    id:'citrus' },
};

function calItemLookup(text) {
  const lower = text.toLowerCase();
  // Try longest keys first to get best match (e.g. "broad beans" before "bean")
  const sorted = Object.keys(CAL_PRODUCE_MAP).sort((a,b) => b.length - a.length);
  for (const key of sorted) {
    if (lower.includes(key)) return CAL_PRODUCE_MAP[key];
  }
  return null;
}

function renderCalendar(month) {
  const data = calendarData[month];
  const content = document.getElementById('calendarContent');
  const icons  = { sow: '🌱', tend: '🪴', harvest: '🧺' };
  const labels = { sow: 'Sow & Plant', tend: 'Tend & Maintain', harvest: 'Harvest' };
  const accentClass = { sow: 'cal-col--sow', tend: 'cal-col--tend', harvest: 'cal-col--harvest' };

  content.innerHTML = ['sow', 'tend', 'harvest'].map(cat => `
    <div class="cal-column ${accentClass[cat]}">
      <h4>${icons[cat]} ${labels[cat]}</h4>
      ${data[cat].map(item => {
        const match = calItemLookup(item);
        if (match) {
          return `<div class="cal-item cal-item--link" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')goToProduceGuide('${match.cat}','${match.id}')" onclick="goToProduceGuide('${match.cat}','${match.id}')" title="View ${item} in Produce Guides →">
            <span>${icons[cat]}</span><span class="cal-item-text">${item}</span><span class="cal-item-arrow">›</span>
          </div>`;
        }
        return `<div class="cal-item"><span>${icons[cat]}</span><span class="cal-item-text">${item}</span></div>`;
      }).join('')}
    </div>
  `).join('');
}


// ── YEAR PLANNER GANTT CHART ──────────────────────────────────────────────

const GANTT_COLORS = {
  si: '#8b5cf6',  // Sow Indoors
  so: '#22c55e',  // Sow Outdoors
  st: '#f59e0b',  // Plant Sets & Tubers
  po: '#84cc16',  // Plant Out Young Plants
  hv: '#ef4444'   // Harvest
};
const GANTT_LABELS = {
  si: 'Sow Indoors',
  so: 'Sow Outdoors',
  st: 'Plant Sets & Tubers',
  po: 'Plant Out',
  hv: 'Harvest'
};

const GANTT_DATA = [
  // 🍅 Fruiting
  { group:'🍅 Fruiting',  crop:'Tomatoes',           si:[2,3,4],       so:[],           st:[],            po:[5,6],      hv:[7,8,9,10]        },
  { group:'🍅 Fruiting',  crop:'Chillies & Peppers', si:[1,2,3],       so:[],           st:[],            po:[5,6],      hv:[8,9,10]          },
  { group:'🍅 Fruiting',  crop:'Aubergines',         si:[2,3],         so:[],           st:[],            po:[5,6],      hv:[8,9,10]          },
  { group:'🍅 Fruiting',  crop:'Courgettes',         si:[4,5],         so:[5],          st:[],            po:[5,6],      hv:[6,7,8,9]         },
  { group:'🍅 Fruiting',  crop:'Cucumbers',          si:[4],           so:[],           st:[],            po:[5,6],      hv:[7,8,9]           },
  { group:'🍅 Fruiting',  crop:'Squash & Pumpkins',  si:[4,5],         so:[5],          st:[],            po:[5,6],      hv:[9,10]            },
  { group:'🍅 Fruiting',  crop:'Sweetcorn',          si:[4,5],         so:[5,6],        st:[],            po:[5,6],      hv:[8,9]             },
  { group:'🍅 Fruiting',  crop:'Sweet Potato',       si:[4,5],         so:[],           st:[],            po:[5,6],      hv:[9,10]            },
  { group:'🍅 Fruiting',  crop:'Melons',             si:[4,5],         so:[],           st:[],            po:[5,6],      hv:[8,9]             },
  // 🥕 Roots
  { group:'🥕 Roots',     crop:'Carrots',            si:[],            so:[3,4,5,6],    st:[],            po:[],         hv:[6,7,8,9,10]      },
  { group:'🥕 Roots',     crop:'Parsnips',           si:[],            so:[2,3,4],      st:[],            po:[],         hv:[10,11,12,1]      },
  { group:'🥕 Roots',     crop:'Beetroot',           si:[3,4],         so:[4,5,6],      st:[],            po:[4,5,6],    hv:[6,7,8,9,10]      },
  { group:'🥕 Roots',     crop:'Potatoes (Early)',   si:[],            so:[],           st:[3,4],         po:[],         hv:[6,7]             },
  { group:'🥕 Roots',     crop:'Potatoes (Maincrop)',si:[],            so:[],           st:[4],           po:[],         hv:[8,9,10]          },
  { group:'🥕 Roots',     crop:'Turnips',            si:[],            so:[3,4,5,6,7],  st:[],            po:[],         hv:[6,7,8,9,10]      },
  { group:'🥕 Roots',     crop:'Swede',              si:[],            so:[5,6],        st:[],            po:[],         hv:[10,11,12]        },
  { group:'🥕 Roots',     crop:'Celeriac',           si:[2,3],         so:[],           st:[],            po:[5,6],      hv:[9,10,11,12]      },
  { group:'🥕 Roots',     crop:'Asparagus (crowns)', si:[],            so:[],           st:[3,4],         po:[],         hv:[4,5,6]           },
  { group:'🥕 Roots',     crop:'Jerusalem Artichoke',si:[],            so:[],           st:[2,3,4],       po:[],         hv:[11,12,1,2,3]     },
  // 🥦 Brassicas
  { group:'🥦 Brassicas', crop:'Cabbage (Summer)',   si:[3,4],         so:[],           st:[],            po:[5,6],      hv:[7,8,9]           },
  { group:'🥦 Brassicas', crop:'Cabbage (Winter)',   si:[4,5],         so:[],           st:[],            po:[6,7],      hv:[11,12,1,2]       },
  { group:'🥦 Brassicas', crop:'Kale',               si:[4,5],         so:[5,6],        st:[],            po:[6,7],      hv:[10,11,12,1,2,3]  },
  { group:'🥦 Brassicas', crop:'Broccoli (PSB)',     si:[4,5],         so:[],           st:[],            po:[6,7],      hv:[2,3,4]           },
  { group:'🥦 Brassicas', crop:'Calabrese',          si:[3,4],         so:[5,6],        st:[],            po:[5,6,7],    hv:[7,8,9,10]        },
  { group:'🥦 Brassicas', crop:'Cauliflower',        si:[1,2,3],       so:[],           st:[],            po:[4,5,6],    hv:[6,7,8,9,10,11]   },
  { group:'🥦 Brassicas', crop:'Brussels Sprouts',   si:[3,4],         so:[],           st:[],            po:[5,6],      hv:[10,11,12,1,2]    },
  { group:'🥦 Brassicas', crop:'Kohlrabi',           si:[3,4],         so:[3,4,5,6,7,8],st:[],            po:[],         hv:[5,6,7,8,9,10]    },
  { group:'🥦 Brassicas', crop:'Chinese Cabbage',    si:[],            so:[7,8],        st:[],            po:[],         hv:[9,10,11]         },
  { group:'🥦 Brassicas', crop:'Pak Choi',           si:[3,4,5,8,9],   so:[3,4,5,8,9],  st:[],            po:[],         hv:[5,6,7,9,10,11]   },
  // 🧅 Alliums
  { group:'🧅 Alliums',   crop:'Onions (from seed)', si:[1,2],         so:[],           st:[],            po:[4,5],      hv:[7,8]             },
  { group:'🧅 Alliums',   crop:'Onions (sets)',      si:[],            so:[],           st:[3,4],         po:[],         hv:[7,8]             },
  { group:'🧅 Alliums',   crop:'Garlic',             si:[],            so:[],           st:[9,10,11],     po:[],         hv:[6,7]             },
  { group:'🧅 Alliums',   crop:'Leeks',              si:[2,3],         so:[],           st:[],            po:[5,6,7],    hv:[10,11,12,1,2]    },
  { group:'🧅 Alliums',   crop:'Shallots',           si:[],            so:[],           st:[2,3],         po:[],         hv:[7,8]             },
  // 🫛 Legumes
  { group:'🫛 Legumes',   crop:'Broad Beans',        si:[],            so:[2,3,10,11],  st:[],            po:[],         hv:[6,7]             },
  { group:'🫛 Legumes',   crop:'Runner Beans',       si:[4,5],         so:[5,6],        st:[],            po:[5,6],      hv:[7,8,9]           },
  { group:'🫛 Legumes',   crop:'French Beans',       si:[4,5],         so:[5,6,7],      st:[],            po:[5,6],      hv:[7,8,9]           },
  { group:'🫛 Legumes',   crop:'Peas',               si:[2,3],         so:[3,4,5,6],    st:[],            po:[],         hv:[6,7,8]           },
  { group:'🫛 Legumes',   crop:'Soya Beans',         si:[4,5],         so:[5],          st:[],            po:[5,6],      hv:[8,9]             },
  // 🥗 Salads
  { group:'🥗 Salads',    crop:'Lettuce',            si:[2,3],         so:[4,5,6,7,8],  st:[],            po:[4,5,6,7],  hv:[4,5,6,7,8,9,10]  },
  { group:'🥗 Salads',    crop:'Spinach',            si:[],            so:[3,4,5,6,7,8],st:[],            po:[],         hv:[4,5,6,7,8,9,10]  },
  { group:'🥗 Salads',    crop:'Chard',              si:[],            so:[4,5,6,7,8],  st:[],            po:[],         hv:[6,7,8,9,10,11,12,1,2,3]},
  { group:'🥗 Salads',    crop:'Radishes',           si:[],            so:[3,4,5,6,7,8],st:[],            po:[],         hv:[4,5,6,7,8,9]     },
  { group:'🥗 Salads',    crop:'Spring Onions',      si:[],            so:[3,4,5,6,7],  st:[],            po:[],         hv:[5,6,7,8,9]       },
  { group:'🥗 Salads',    crop:'Rocket',             si:[],            so:[3,4,5,6,7,8],st:[],            po:[],         hv:[4,5,6,7,8,9,10]  },
  { group:'🥗 Salads',    crop:'Chicory',            si:[],            so:[5,6,7],      st:[],            po:[],         hv:[9,10,11,12,1,2]  },
  { group:'🥗 Salads',    crop:'Florence Fennel',    si:[],            so:[6,7],        st:[],            po:[],         hv:[8,9,10]          },
  { group:'🥗 Salads',    crop:'Celery',             si:[2,3,4],       so:[],           st:[],            po:[6,7],      hv:[8,9,10,11]       },
  { group:'🥗 Salads',    crop:'Globe Artichoke',    si:[3,4],         so:[],           st:[],            po:[4,5],      hv:[6,7,8]           },
  { group:'🥗 Salads',    crop:'Endive',             si:[],            so:[6,7,8],      st:[],            po:[],         hv:[9,10,11,12]      },
  { group:'🥗 Salads',    crop:'Corn Salad',         si:[],            so:[8,9],        st:[],            po:[],         hv:[10,11,12,1,2,3]  },
  { group:'🥗 Salads',    crop:'Mizuna & Mibuna',    si:[],            so:[3,4,5,6,7,8,9],st:[],          po:[],         hv:[4,5,6,7,8,9,10,11]},
  // 🌿 Herbs
  { group:'🌿 Herbs',     crop:'Basil',              si:[4,5,6],       so:[],           st:[],            po:[6,7],      hv:[7,8,9]           },
  { group:'🌿 Herbs',     crop:'Mint',               si:[],            so:[],           st:[3,4,5],       po:[],         hv:[5,6,7,8,9,10]    },
  { group:'🌿 Herbs',     crop:'Chives',             si:[2,3],         so:[3,4],        st:[],            po:[],         hv:[4,5,6,7,8,9,10]  },
  { group:'🌿 Herbs',     crop:'Parsley',            si:[2,3],         so:[4,5],        st:[],            po:[],         hv:[5,6,7,8,9,10,11] },
  { group:'🌿 Herbs',     crop:'Rosemary',           si:[],            so:[],           st:[3,4,5],       po:[],         hv:[1,2,3,4,5,6,7,8,9,10,11,12]},
  { group:'🌿 Herbs',     crop:'Thyme',              si:[],            so:[],           st:[3,4,5],       po:[],         hv:[1,2,3,4,5,6,7,8,9,10,11,12]},
  // 🍓 Fruits
  { group:'🍓 Fruits',    crop:'Strawberries',       si:[],            so:[],           st:[8,9],         po:[3,4],      hv:[6,7,8]           },
  { group:'🍓 Fruits',    crop:'Raspberries',        si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[6,7,8,9]         },
  { group:'🍓 Fruits',    crop:'Blackcurrants',      si:[],            so:[],           st:[10,11,12,1],  po:[],         hv:[7,8]             },
  { group:'🍓 Fruits',    crop:'Red & White Currants',si:[],           so:[],           st:[10,11,12,1],  po:[],         hv:[7,8]             },
  { group:'🍓 Fruits',    crop:'Gooseberries',       si:[],            so:[],           st:[10,11,12,1],  po:[],         hv:[6,7,8]           },
  { group:'🍓 Fruits',    crop:'Blueberries',        si:[],            so:[],           st:[10,11,12,1],  po:[],         hv:[7,8,9]           },
  { group:'🍓 Fruits',    crop:'Blackberries',       si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[8,9,10]          },
  { group:'🍓 Fruits',    crop:'Rhubarb',            si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[3,4,5,6]         },
  { group:'🍓 Fruits',    crop:'Apples',             si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[8,9,10,11]       },
  { group:'🍓 Fruits',    crop:'Pears',              si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[8,9,10]          },
  { group:'🍓 Fruits',    crop:'Cherries',           si:[],            so:[],           st:[11,12,1,2],   po:[],         hv:[6,7]             },
  { group:'🍓 Fruits',    crop:'Plums & Damsons',    si:[],            so:[],           st:[11,12,1,2],   po:[],         hv:[7,8,9]           },
  { group:'🍓 Fruits',    crop:'Greengages',         si:[],            so:[],           st:[11,12,1,2],   po:[],         hv:[8,9]             },
  { group:'🍓 Fruits',    crop:'Peaches',            si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[7,8,9]           },
  { group:'🍓 Fruits',    crop:'Nectarines',         si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[8,9]             },
  { group:'🍓 Fruits',    crop:'Apricots',           si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[7,8]             },
  { group:'🍓 Fruits',    crop:'Quinces',            si:[],            so:[],           st:[11,12,1,2],   po:[],         hv:[10,11]           },
  { group:'🍓 Fruits',    crop:'Figs',               si:[],            so:[],           st:[4,5],         po:[],         hv:[8,9]             },
  { group:'🍓 Fruits',    crop:'Grapes',             si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[9,10]            },
  { group:'🍓 Fruits',    crop:'Kiwi Fruit',         si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[10,11]           },
  { group:'🍓 Fruits',    crop:'Mulberries',         si:[],            so:[],           st:[11,12,1,2,3], po:[],         hv:[8,9]             },
  { group:'🍓 Fruits',    crop:'Olives',             si:[],            so:[],           st:[4,5,6],       po:[],         hv:[10,11]           },
  { group:'🍓 Fruits',    crop:'Citrus',             si:[],            so:[],           st:[4,5],         po:[],         hv:[11,12,1,2,3,4]   },
];

function renderGantt() {
  const wrap = document.getElementById('ganttWrap');

  const legendHtml = Object.entries(GANTT_LABELS).map(([key, label]) =>
    `<div class="gantt-legend-item">
       <div class="gantt-legend-pip" style="background:${GANTT_COLORS[key]}"></div>${label}
     </div>`
  ).join('');

  const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthHeadersHtml = MONTH_ABBR.map(m => `<div class="gantt-month-hdr">${m}</div>`).join('');

  // Group crops
  const groups = {};
  GANTT_DATA.forEach(row => {
    if (!groups[row.group]) groups[row.group] = [];
    groups[row.group].push(row);
  });

  const rowsHtml = Object.entries(groups).map(([groupName, crops]) => {
    const cropRowsHtml = crops.map(crop => {
      const cellsHtml = Array.from({length:12}, (_, i) => {
        const m = i + 1;
        const bars = Object.entries(GANTT_COLORS).map(([key, color]) => {
          if ((crop[key] || []).includes(m)) {
            return `<div class="gantt-bar" style="background:${color}" title="${GANTT_LABELS[key]}"></div>`;
          }
          return '';
        }).join('');
        return `<div class="gantt-cell">${bars}</div>`;
      }).join('');
      return `<div class="gantt-row">
        <div class="gantt-crop-name">${crop.crop}</div>
        <div class="gantt-cells">${cellsHtml}</div>
      </div>`;
    }).join('');
    return `<div class="gantt-group-block">
      <div class="gantt-group-label">${groupName}</div>
      ${cropRowsHtml}
    </div>`;
  }).join('');

  wrap.innerHTML = `
    <div class="gantt-legend">${legendHtml}</div>
    <div class="gantt-outer">
      <div class="gantt-table">
        <div class="gantt-header-row">
          <div class="gantt-name-col">Crop</div>
          <div class="gantt-month-headers">${monthHeadersHtml}</div>
        </div>
        ${rowsHtml}
      </div>
    </div>`;
}

function switchCalView(view) {
  const monthly = document.getElementById('monthNav');
  const calContent = document.getElementById('calendarContent');
  const gantt = document.getElementById('ganttWrap');
  const tabMonthly = document.getElementById('tabMonthly');
  const tabGantt = document.getElementById('tabGantt');
  if (view === 'monthly') {
    monthly.style.display = '';
    calContent.style.display = '';
    gantt.style.display = 'none';
    tabMonthly.classList.add('active');
    tabGantt.classList.remove('active');
  } else {
    monthly.style.display = 'none';
    calContent.style.display = 'none';
    gantt.style.display = '';
    tabMonthly.classList.remove('active');
    tabGantt.classList.add('active');
    if (!gantt.querySelector('.gantt-legend')) renderGantt();
  }
}

function goToProduceGuide(cat, id) {
  // Switch to the guides section, select the right tab, open the detail page
  document.getElementById('guides').scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Small delay to allow scroll before tab switch
  setTimeout(() => {
    // Activate the right tab
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    const tab = document.querySelector(`.ptab[data-cat="${cat}"]`);
    if (tab) { tab.classList.add('active'); renderCards(cat); }
    // Open the detail directly
    setTimeout(() => openDetail(cat, id), 120);
  }, 350);
}


// ── PRODUCE DATA ──
const produce = {
  fruiting: [
    {
      id:'tomato', icon:'🍅', name:'Tomatoes', tag:'Popular', latin:'Solanum lycopersicum',
      difficulty:3, sow:'Feb–Apr (indoors)', harvest:'Jul–Oct', position:'Full sun', spacing:'45–60cm',
      desc:`The crown jewel of the veg plot. Rich, sun-ripened tomatoes from your own garden bear no comparison to shop-bought. They need warmth and attention, but reward generously.`,
      steps:[
        {title:'Sow indoors', text:`Sow seeds thinly in small pots of seed compost in Feb–Mar. Keep at 18–21°C. Germination takes 7–14 days.`},
        {title:'Pot on', text:`When seedlings have two true leaves, pot on into 9cm pots. Keep on a warm, bright windowsill away from cold draughts.`},
        {title:'Harden off', text:`From late April, acclimatise plants to outdoor conditions over 7–10 days before planting out after the last frost (usually late May).`},
        {title:'Support & pinch out', text:`Tie in to canes as they grow. For cordon types, pinch out side shoots (trusses) that appear in the leaf axils weekly.`},
        {title:'Feed & water', text:`Once the first flowers set, feed weekly with a high-potash tomato feed. Water consistently — irregular watering causes blossom end rot.`},
        {title:'Harvest', text:`Pick when fully coloured. At end of season, bring green tomatoes indoors to ripen on a windowsill — a banana nearby speeds the process.`}
      ],
      varieties:[
        {name:`Gardener's Delight`, desc:'Classic cherry type. Reliable, sweet, heavy-cropping.'},
        {name:'Moneymaker', agm:true, desc:'Traditional cordon. Medium fruits, easy to grow.'},
        {name:'Tumbling Tom', agm:true, desc:'Trailing variety, perfect for hanging baskets.'},
        {name:'Black Krim', agm:false, desc:'Dark, complex-flavoured beefsteak. Striking appearance.'}
      ],
      warning:`Watch for blight in warm, humid weather. Remove affected leaves immediately and never compost them.`
    },
    {
      id:'courgette', icon:'🥒', name:'Courgettes', tag:'Prolific', latin:'Cucurbita pepo',
      difficulty:1, sow:'Apr–May (indoors)', harvest:'Jun–Sep', position:'Full sun, sheltered', spacing:'90cm',
      desc:`One plant can feed a family. Courgettes are fast, generous, and easy. The key challenge is remembering to pick them before they become marrows overnight.`,
      steps:[
        {title:'Sow indoors', text:`Sow seeds on their edge in 9cm pots in April–May. Keep warm (20°C+). They germinate in days and grow fast.`},
        {title:'Plant out', text:`After the last frost (late May), plant out into rich, well-manured soil with plenty of space. They spread widely.`},
        {title:'Water well', text:`Water at the base, avoiding the crown. They are thirsty plants — in dry spells, water every other day.`},
        {title:'Hand pollinate', text:`If fruit is dropping without setting, use a small brush to transfer pollen from male to female flowers (females have a tiny fruit behind them).`},
        {title:'Harvest often', text:`Pick every 2–3 days when fruits are 10–15cm. Left longer, they become marrows and signal the plant to stop producing.`}
      ],
      varieties:[
        {name:'Defender F1', agm:true, desc:'Virus-resistant, extremely reliable. Dark green.'},
        {name:'Romanesco', agm:true, desc:'Ridged, nutty-flavoured Italian heritage type.'},
        {name:'Patio Star', agm:true, desc:'Compact plant — ideal for large containers.'},
        {name:'Yellow Patio', agm:false, desc:'Bush type with bright yellow fruits. Very ornamental.'}
      ],
      warning:`Powdery mildew can strike in late summer. Improve airflow and water at the base to reduce risk.`
    },
    {
      id:'squash', icon:'🎃', name:'Winter Squash & Pumpkins', tag:'Autumn', latin:'Cucurbita maxima',
      difficulty:2, sow:'Apr–May (indoors)', harvest:'Sep–Oct', position:'Full sun', spacing:'120cm',
      desc:`Grow them through summer, harvest in autumn, and they'll store on your kitchen counter until Christmas. Few crops are as rewarding or as beautiful.`,
      steps:[
        {title:'Sow indoors', text:`Sow in Apr–May in 9cm pots, one seed per pot on its edge. Germinate at 20°C+.`},
        {title:'Plant out', text:`After frosts, plant into the richest soil you have — a prepared hole filled with compost and well-rotted manure is ideal.`},
        {title:'Train the vines', text:`Squash vines can grow 2–3m. Direct them where you want them. You can even grow them up a strong trellis.`},
        {title:'Remove excess fruits', text:`For large squash, restrict each plant to 2–3 fruits for best size. Pinch off any extras.`},
        {title:'Cure before storing', text:`Leave harvested squash in the sun (or indoors on a sunny windowsill) for 10 days to harden the skin before storing.`}
      ],
      varieties:[
        {name:'Crown Prince', agm:true, desc:'Steel-blue skin, orange flesh. Outstanding flavour.'},
        {name:'Uchiki Kuri', agm:true, desc:'Tear-drop shaped, deep orange. Nutty and sweet.'},
        {name:'Butternut', agm:true, desc:'The classic — stores extremely well into late winter.'},
        {name:'Atlantic Giant', agm:false, desc:'For those who want to grow something enormous.'}
      ],
      warning:`Squash are greedy feeders. If leaves yellow, give them a nitrogen-rich feed. Protect young plants from slugs.`
    },
    {
      id:'cucumber', icon:'🥒', name:'Cucumbers', tag:'Summer', latin:'Cucumis sativus',
      difficulty:2, sow:'Mar–Apr (indoors)', harvest:'Jul–Sep', position:'Warm & sheltered', spacing:'45cm',
      desc:`Nothing beats a fresh cucumber from the greenhouse or a sheltered spot. Modern varieties are far more forgiving than older types and produce heavily all summer.`,
      steps:[
        {title:'Sow on edge', text:`Sow seeds on their side in 9cm pots in Mar–Apr. Keep at 20°C+ for germination.`},
        {title:'Greenhouse or outdoors', text:`Indoor varieties must stay under glass. Outdoor/ridge types can go out after last frost in a warm, sheltered spot.`},
        {title:'Train upwards', text:`Tie to a vertical wire or cane. Pinch out the growing tip when it reaches the top of its support.`},
        {title:'Pinch out side shoots', text:`For indoor types, remove male flowers (no tiny fruit behind them) to prevent bitterness.`},
        {title:'Harvest frequently', text:`Cut fruits when they reach a good size — don\'t let them yellow or the plant slows down.`}
      ],
      varieties:[
        {name:'Marketmore', agm:true, desc:'Outdoor ridge type. Very reliable and prolific.'},
        {name:'Femdan F1', agm:true, desc:'All-female indoor variety. Smooth, long fruits.'},
        {name:'Crystal Lemon', agm:true, desc:'Round, pale yellow fruits. Mild and crisp.'},
        {name:'Burpless Tasty Green', agm:false, desc:'Thin skin, no bitterness. Great for outdoors.'}
      ],
      warning:`Red spider mite loves hot, dry greenhouse conditions. Mist plants and ensure good ventilation.`
    },
    {
      id:'sweetcorn', icon:'🌽', name:'Sweetcorn', tag:'Summer Treat', latin:'Zea mays',
      difficulty:2, sow:'Apr–May (indoors)', harvest:'Aug–Sep', position:'Full sun, sheltered', spacing:'45cm each way',
      desc:`Nothing from the garden tastes more intensely of summer than a cob of sweetcorn eaten within minutes of picking. The sugars start converting to starch the moment it\'s harvested — grow your own and taste the difference.`,
      steps:[
        {title:'Sow indoors', text:`Sow one seed per 9cm pot in Apr–May. Keep warm at 18°C+. Sweetcorn dislikes root disturbance, so avoid pricking out.`},
        {title:'Plant in a block', text:`Plant in a grid pattern (not rows) at 45cm spacing after the last frost. Sweetcorn is wind-pollinated — a block ensures each plant pollinates its neighbours.`},
        {title:'Earth up stems', text:`As plants grow, draw soil up around the base of stems to improve stability and encourage extra roots.`},
        {title:'Check for ripeness', text:`When tassels (the silks) turn brown and dry, check ripeness by peeling back a leaf and pressing a kernel. Milky juice = ready. Clear = too early. Dry = too late.`},
        {title:'Harvest and eat immediately', text:`Twist cobs downward and pull sharply. Cook and eat within the hour if possible — the flavour deteriorates rapidly after picking.`}
      ],
      varieties:[
        {name:'Swift F1', agm:true, desc:'Early-maturing. Reliable in northern UK gardens. Good sweet flavour.'},
        {name:'Lark F1', agm:true, desc:'Very sweet, extremely tender kernels. One of the best-flavoured varieties.'},
        {name:'Sweetness F1', agm:true, desc:'Supersweet type. Exceptionally high sugar content. Retains sweetness longer after picking.'},
        {name:'Sundance F1', agm:true, desc:'Reliable mid-season. Good disease resistance. Excellent all-rounder.'},
        {name:'Indian Summer', agm:false, desc:'Bicolour — mixed white, yellow, red and purple kernels. Very ornamental and tasty.'},
        {name:'Minipop F1', agm:false, desc:'Produces baby corn cobs for stir-fries. Harvest small before pollination at 8–10cm.'},
        {name:'True Gold', agm:false, desc:'Heritage open-pollinated variety. Traditional sweetcorn flavour. Non-F1.'},
        {name:'Fiesta F1', agm:false, desc:'Bicolour supersweet. Large cobs. Very popular in warmer UK regions.'}
      ],
      warning:`Sweetcorn needs warmth to germinate and ripen. In a cold summer it may not mature in time. Choose early varieties in northern gardens.`
    },
    {
      id:'aubergine', icon:'🍆', name:'Aubergines', tag:'Mediterranean', latin:'Solanum melongena',
      difficulty:3, sow:'Feb–Mar (indoors)', harvest:'Aug–Oct', position:'Full sun — greenhouse preferred', spacing:'60cm',
      desc:`Glossy, dramatic, and deeply satisfying to grow. Aubergines need warmth and patience but reward the dedicated gardener with beautiful, meaty fruits perfect for moussaka, ratatouille and curry.`,
      steps:[
        {title:'Sow early indoors', text:`Sow in Feb–Mar in a propagator at 21–24°C. Aubergines need a long growing season and the earliest start possible.`},
        {title:'Pot on progressively', text:`Pot on into larger containers as roots fill the pot — from 9cm to 13cm to final 30cm pot. Keep in a warm greenhouse or very sunny windowsill.`},
        {title:'Pinch out growing tip', text:`When plants reach 30cm, pinch out the growing tip to encourage a bushy, branching habit with more fruiting points.`},
        {title:'Support the fruits', text:`Developing fruits are heavy. Support branches with canes and ties, or use a net. A plant with 4–5 fruits is ideal.`},
        {title:'Feed and water consistently', text:`Feed with a high-potash tomato fertiliser once fruits form. Never let the compost dry out completely.`},
        {title:'Harvest while shiny', text:`Cut fruits with a sharp knife when the skin is still glossy and taut. Dull skin means they are overripe and bitter.`}
      ],
      varieties:[
        {name:'Moneymaker', agm:true, desc:'Classic large purple-black fruits. Most reliable for UK.'},
        {name:'Bonica F1', agm:false, desc:'Compact, early-fruiting. Excellent for containers.'},
        {name:'Rosa Bianca', agm:false, desc:'Italian heritage. Violet and white, mild flavour.'},
        {name:'Ophelia F1', agm:false, desc:'Small, prolific fruits. Very productive in cooler conditions.'}
      ],
      warning:`Aubergines are very cold-sensitive. A single cold night can set plants back severely. Keep above 15°C at all times, especially when young.`
    },
    {
      id:'pepper', icon:'🫑', name:'Peppers & Chillies', tag:'Hot or Sweet', latin:'Capsicum annuum',
      difficulty:2, sow:'Feb–Mar (indoors)', harvest:'Jul–Oct', position:'Full sun — greenhouse or sheltered patio', spacing:'45cm',
      desc:`Whether you prefer sweet bell peppers or fiery chillies, growing your own lets you harvest at the exact moment of peak flavour. Both types thrive in pots in a sunny spot.`,
      steps:[
        {title:'Sow early in warmth', text:`Sow in Feb–Mar at 21°C+ in a heated propagator. Chilli seeds in particular need warmth to germinate well — give them 3–4 weeks.`},
        {title:'Keep in the warmest spot', text:`Grow on a south-facing windowsill or in a greenhouse. Peppers need more warmth than tomatoes to crop reliably outdoors.`},
        {title:'Pot into final container', text:`Move to a 30–35cm pot when roots fill the smaller pot. Use good quality peat-free multipurpose compost.`},
        {title:'Support the plant', text:`Stake with a cane as fruits develop — heavy crops can snap branches.`},
        {title:'Harvest green or ripe', text:`Sweet peppers can be picked green (milder) or left to ripen red, yellow or orange (sweeter). Chillies are hotter when fully ripe.`}
      ],
      varieties:[
        {name:'Gypsy F1', agm:true, desc:'Sweet pepper. Early, prolific, thin-walled. Very reliable.'},
        {name:'Marconi Rosso', agm:false, desc:'Long sweet Italian pepper. Superb roasted.'},
        {name:'Apache F1', agm:true, desc:'Chilli. Medium heat, compact plant. Great for pots.'},
        {name:'Cayenne', agm:false, desc:'Chilli. Hot, prolific, thin fruits. Classic heat.'}
      ],
      warning:`Red spider mite thrives on peppers in hot, dry conditions. Mist plants regularly and ensure good ventilation in the greenhouse.`
    },
    {
      id:'pumpkin', icon:'🎃', name:'Pumpkins', tag:'Autumn Show-Stopper', latin:'Cucurbita maxima / C. pepo',
      difficulty:1, sow:'Apr–May (indoors)', harvest:'Sep–Oct', position:'Full sun, sheltered', spacing:'150–180cm',
      desc:`The most dramatic plant you can grow. A single pumpkin plant can spread 3–4 metres in every direction and produce fruits weighing 5–30kg. Grow them for Halloween lanterns, soup, or the sheer spectacle of it.`,
      steps:[
        {title:'Sow indoors', text:`Sow one seed per 9cm pot on its side in Apr–May. Germinate at 20°C+. They grow very quickly — do not sow too early or plants will outgrow the windowsill.`},
        {title:'Prepare a rich mound', text:`Plant out after all frost risk (late May–early June) into a mound of well-rotted manure and topsoil. Pumpkins are the hungriest plants in the garden.`},
        {title:'Give them space', text:`Allow at least 1.5–2m in every direction. Train the main vine in a spiral if space is limited.`},
        {title:'Feed weekly', text:`Water generously at the base and feed weekly with a high-potash liquid feed once fruits begin to form.`},
        {title:'Limit fruits for size', text:`For large fruits, restrict to 2–3 per plant. Remove all but the best-positioned fruits when they are tennis-ball size.`},
        {title:'Cure before storing', text:`After the first frost blackens the leaves, cut stems leaving 5cm of stalk attached. Cure in sun for 2 weeks to harden the skin, then store in a dry, frost-free place.`}
      ],
      varieties:[
        {name:'Atlantic Giant', agm:false, desc:'The giant competition variety. Can exceed 100kg in good conditions.'},
        {name:'Crown Prince', agm:true, desc:'Blue-grey skin, dense orange flesh. Superb flavour. Excellent keeper.'},
        {name:'Jack Be Little', agm:false, desc:'Tiny ornamental type. Perfect for Halloween decoration.'},
        {name:'Uchiki Kuri', agm:false, desc:'Onion-shaped, red-orange skin. Wonderful nutty, chestnut flavour.'}
      ],
      warning:`Powdery mildew inevitably arrives in late summer — it rarely affects the harvest but makes plants look ragged. Water at the base and ensure good airflow to delay its onset.`
    },
    {
      id:'sweetpotato', icon:'🍠', name:'Sweet Potatoes', tag:'Exotic Crop', latin:'Ipomoea batatas',
      difficulty:3, sow:'Plant slips May–Jun', harvest:'Sep–Oct', position:'Full sun, very warm, sheltered', spacing:'30–40cm',
      desc:`Sweet potatoes are one of the most rewarding challenges for the UK grower. They need warmth, a long season, and patience — but home-grown sweet potatoes have a depth of flavour entirely unlike the supermarket versions.`,
      steps:[
        {title:'Start with slips', text:`Sweet potatoes are grown from slips (rooted cuttings), not seeds. Buy certified disease-free slips in May. Alternatively, suspend a sweet potato in water to sprout shoots, then twist off and root in water.`},
        {title:'Wait for real warmth', text:`Plant out only when soil temperature is reliably above 15°C and all frost risk has passed — late May to June in most of the UK. Use black polythene mulch to warm the soil beforehand.`},
        {title:'Plant through black mulch', text:`Lay black polythene over the bed, cut slits, and plant through. Black mulch is essential — it raises soil temperature by 3–5°C, dramatically improving yield in the UK climate.`},
        {title:'Water moderately', text:`Water regularly but do not overwater — sweet potatoes tolerate some drought better than waterlogging. Reduce watering in August to encourage the plant to bulk up roots.`},
        {title:'Harvest before first frost', text:`Harvest in September–October before the first frost. The foliage dies back and the leaves begin to yellow as an indicator. Lift carefully with a fork — the skins are very thin and easily damaged.`},
        {title:'Cure after harvest', text:`Cure at 28–32°C for 5–7 days (in a warm room or polytunnel) before storing. Curing converts starch to sugar and dramatically improves flavour and sweetness.`}
      ],
      varieties:[
        {name:'Beauregard', agm:false, desc:'The most reliable UK variety. Orange flesh. Good yields in a warm summer.'},
        {name:'Georgia Jet', agm:false, desc:'Orange-fleshed, earlier to mature. Best for shorter UK seasons.'},
        {name:'O\'Henry', agm:false, desc:'Cream-fleshed. Excellent dry, starchy texture for roasting.'},
        {name:'Purple', agm:false, desc:'Purple skin and flesh. Striking, slightly drier texture. Very nutritious.'}
      ],
      warning:`Sweet potatoes absolutely require warmth — in a cold, wet summer they will give a very poor yield. A polytunnel or south-facing raised bed with black mulch gives dramatically better results than open ground in the North.`
    }
  ],
  roots: [
    {
      id:'carrot', icon:'🥕', name:'Carrots', tag:'Classic', latin:'Daucus carota',
      difficulty:2, sow:'Mar–Jul (direct)', harvest:'Jun–Oct', position:'Full sun', spacing:'5–7cm after thinning',
      desc:`Sweet, crunchy, and deeply satisfying to pull from the ground. Carrots demand well-prepared, stone-free soil but reward patience magnificently.`,
      steps:[
        {title:'Prepare the soil', text:`Dig out stones and break up compaction. Avoid fresh manure — it causes forked roots. Sandy, free-draining soil is ideal.`},
        {title:'Sow thinly', text:`Sow seeds thinly in 1cm-deep drills, 15cm apart. Mix seed with dry sand for easier sowing. Cover and firm gently.`},
        {title:'Thin out', text:`When seedlings are 2cm tall, thin to 5–7cm apart. Do this in the evening — the smell of thinnings attracts carrot fly. Remove thinnings immediately.`},
        {title:'Protect from carrot fly', text:`Surround beds with a 60cm barrier of fleece or fine mesh to block the low-flying carrot root fly.`},
        {title:'Harvest', text:`Pull when large enough to use. Use a fork to loosen the soil around them first to avoid snapping.`}
      ],
      varieties:[
        {name:'Nantes 2', agm:true, desc:'Cylindrical, sweet, no woody core. The standard.'},
        {name:'Chantenay Red Core', agm:true, desc:'Short and stout — good for heavier soils.'},
        {name:'Autumn King', agm:true, desc:'Large maincrop variety. Stores well.'},
        {name:'Purple Haze', agm:false, desc:'Purple skin, orange inside. Striking at the table.'}
      ],
      warning:`Carrot fly is the main enemy. Never thin in daytime, and always use a physical barrier as prevention.`
    },
    {
      id:'potato', icon:'🥔', name:'Potatoes', tag:'Beginner Friendly', latin:'Solanum tuberosum',
      difficulty:1, sow:'Mar–May (sets)', harvest:'Jun–Oct', position:'Full sun', spacing:'30cm (30–75cm rows)',
      desc:`Britain's most beloved crop. There's a variety for every use: waxy salad types, fluffy bakers, creamy mash potatoes. Grow your own and you'll never go back.`,
      steps:[
        {title:'Chit your seed potatoes', text:`Stand seed potatoes rose-end up in egg boxes in a cool, light, frost-free room from Jan–Feb. Allow shoots to develop to 2–3cm.`},
        {title:'Prepare the bed', text:`Dig in plenty of compost or well-rotted manure the autumn before. Potatoes love rich, well-drained soil.`},
        {title:'Plant out', text:`Make 10–15cm-deep drills and plant chitted tubers shoot-side up. First earlies: 30cm apart in 60cm rows. Maincrop: 40cm apart in 75cm rows.`},
        {title:'Earth up', text:`As shoots emerge, pull soil up over them to protect from frost and to ensure tubers are covered (light turns them green and toxic).`},
        {title:'Harvest', text:`First earlies are ready when flowers open (Jun). Maincrop: wait until foliage yellows and dies back, then lift on a dry day.`}
      ],
      varieties:[
        {name:'Charlotte', agm:true, desc:'Waxy salad type. Excellent flavour. Very reliable.'},
        {name:'King Edward', agm:true, desc:'Classic floury maincrop. The roast potato standard.'},
        {name:'Maris Piper', agm:true, desc:'The chip and mash potato. Heavy-cropping.'},
        {name:'Sarpo Mira', agm:false, desc:'Exceptional blight resistance. Great for organic growers.'}
      ],
      warning:`Blight can wipe out an entire crop in days in warm, humid weather. Choose resistant varieties and act at first sign of brown patches.`
    },
    {
      id:'beetroot', icon:'🫀', name:'Beetroot', tag:'Easy', latin:'Beta vulgaris',
      difficulty:1, sow:'Apr–Jul (direct)', harvest:'Jul–Oct', position:'Sun or part shade', spacing:'10cm',
      desc:`Fast, colourful, and delicious roasted, pickled, or raw in salads. Beetroot is one of the most forgiving and rewarding crops for beginners.`,
      steps:[
        {title:'Sow clusters', text:`Beetroot seeds are actually clusters of 2–3 seeds. Sow 2.5cm deep, 10cm apart, in rows 30cm apart. Each cluster may produce multiple seedlings.`},
        {title:'Thin if needed', text:`Thin to one strong plant per position, using thinnings as baby leaves in salads.`},
        {title:'Keep moist', text:`Consistent watering prevents tough, woody roots. In dry periods, water at least twice a week.`},
        {title:'Harvest young', text:`Best harvested when golf-ball to tennis-ball sized (5–8cm). Twist off the leaves rather than cutting to prevent bleeding.`}
      ],
      varieties:[
        {name:'Boltardy', agm:true, desc:'The classic — bolt-resistant and sweet. Very reliable.'},
        {name:'Chioggia', agm:true, desc:'Italian heritage variety with spectacular candy-striped rings.'},
        {name:'Albina Vereduna', agm:false, desc:'White variety with mild, sweet flavour.'},
        {name:'Cylindra', agm:false, desc:'Long cylindrical roots — easy to slice uniformly.'}
      ],
      warning:`Bolting (going to seed) is triggered by cold spells followed by warmth. Choose bolt-resistant varieties for early sowings.`
    },
    {
      id:'parsnip', icon:'🌻', name:'Parsnips', tag:'Patience', latin:'Pastinaca sativa',
      difficulty:2, sow:'Mar–Apr (direct)', harvest:'Oct–Feb', position:'Full sun', spacing:'10–15cm',
      desc:`The most patient crop in the garden. Parsnips take all year but improve dramatically after the first frost, which converts their starches to sugars.`,
      steps:[
        {title:'Use fresh seed', text:`Parsnip seed has a notoriously short shelf life. Always buy fresh seed each year — old seed has very poor germination rates.`},
        {title:'Sow in situ', text:`Parsnips dislike being transplanted. Sow 3 seeds per station, 10–15cm apart, in Mar–Apr when soil has warmed. Germination is slow (3–4 weeks).`},
        {title:'Thin to one', text:`When seedlings appear, thin to the strongest one per station.`},
        {title:'Leave in the ground', text:`Parsnips are hardy and improve with frost. Leave them in the ground and harvest as needed through winter.`}
      ],
      varieties:[
        {name:'Gladiator F1', agm:true, desc:'Very reliable germination. Smooth, white roots.'},
        {name:'Tender and True', agm:true, desc:'Long, slim roots with exceptional flavour.'},
        {name:'Javelin F1', agm:true, desc:'Good canker resistance. High-yielding.'},
        {name:'The Student', agm:false, desc:'Heritage variety with a rich, nutty flavour.'}
      ],
      warning:`Parsnip canker causes orange-brown patches near the crown. Choose resistant varieties and rotate beds each year.`
    },
    {
      id:'turnip', icon:'🌑', name:'Turnips', tag:'Quick & Hardy', latin:'Brassica rapa',
      difficulty:1, sow:'Mar–Aug (direct)', harvest:'May–Nov', position:'Full sun or light shade', spacing:'15cm',
      desc:`One of the fastest root vegetables you can grow — baby turnips are ready in as little as six weeks. Sow in spring for tender early crops, or in summer for hardy autumn and winter roots.`,
      steps:[
        {title:'Sow direct', text:`Sow seeds thinly 1cm deep in rows 30cm apart. Turnips grow fast and dislike being transplanted.`},
        {title:'Thin regularly', text:`Thin to 8cm for baby turnips or 15cm for full-sized roots. Use thinnings in salads or stir-fries.`},
        {title:'Keep watered', text:`Consistent moisture prevents woody, bitter roots. Water in dry spells to keep growth even.`},
        {title:'Harvest young for best flavour', text:`Baby turnips (golf ball size) are the sweetest. Larger roots become stronger-flavoured and tougher.`},
        {title:'Leave winter crops in ground', text:`Late-sown turnips can be left in the ground and harvested through autumn and into early winter.`}
      ],
      varieties:[
        {name:'Tokyo Cross F1', agm:false, desc:'Baby turnip. Ready in 35–40 days. Mild and sweet.'},
        {name:'Purple Top Milan', agm:false, desc:'Flat, purple-topped. Classic continental type.'},
        {name:'Golden Ball', agm:false, desc:'Golden-skinned, sweet yellow flesh. Good keeper.'},
        {name:'Snowball', agm:true, desc:'White, round, mild. Excellent for early sowings.'}
      ],
      warning:`Flea beetle creates tiny holes in turnip leaves, especially in dry weather. Grow under fine mesh fleece as protection.`
    },
    {
      id:'swede', icon:'🟤', name:'Swede', tag:'Winter Staple', latin:'Brassica napus',
      difficulty:1, sow:'May–Jun (direct)', harvest:'Oct–Feb', position:'Full sun', spacing:'25–30cm',
      desc:`The most reliable of all the winter roots. Swede is sown in early summer and left in the ground until needed through autumn and winter, improving in flavour with every frost.`,
      steps:[
        {title:'Sow direct in early summer', text:`Sow seeds thinly 2cm deep in rows 38cm apart in May–Jun. Earlier sowing can cause bolting.`},
        {title:'Thin progressively', text:`Thin to 8cm, then again to 25–30cm as plants develop. Use early thinnings as salad leaves.`},
        {title:'Keep weed-free', text:`Swede is slow-growing early on and needs to be kept clear of weeds in the first weeks.`},
        {title:'Leave in the ground', text:`Swede is extremely frost-hardy. Leave roots in the ground until needed — they store perfectly in situ through winter.`}
      ],
      varieties:[
        {name:'Marian', agm:false, desc:'Excellent clubroot and mildew resistance. Very reliable.'},
        {name:'Best of All', agm:false, desc:'Large roots, excellent sweet flavour.'},
        {name:'Magres', agm:false, desc:'Good disease resistance, heavy crops, stores very well.'},
        {name:'Ruby', agm:false, desc:'Striking purple skin. Sweet, orange-yellow flesh.'}
      ],
      warning:`Club root disease can devastate swede. Raise soil pH to 7.0+ with lime and practise long crop rotation cycles.`
    },
    {
      id:'asparagus', icon:'🌿', name:'Asparagus', tag:'Perennial Investment', latin:'Asparagus officinalis',
      difficulty:2, sow:'Plant crowns Mar–Apr (or sow seed Feb–Mar)', harvest:'Apr–Jun (from year 3)', position:'Full sun, sheltered, very well-drained', spacing:'30–45cm in rows 45cm apart',
      desc:`The most luxurious vegetable you can grow. Asparagus demands patience — you cannot harvest in the first two years — but a well-established bed will produce spears every April for 20 years or more. There is nothing quite like eating it within an hour of cutting.`,
      steps:[
        {title:'Prepare a permanent bed', text:`Asparagus is a perennial crop that occupies the same ground for 20+ years. Choose the sunniest, best-drained spot you have. Dig in copious compost and ensure perfect drainage — waterlogging is fatal.`},
        {title:'Plant crowns in trenches', text:`In Mar–Apr, dig trenches 20–30cm deep and 30cm wide. Make a ridge of soil down the centre. Drape crowns (the spidery root masses) over the ridge with roots hanging down each side, 30–45cm apart.`},
        {title:'Do not harvest in years 1–2', text:`Let the plants establish by growing into feathery fern all summer. Cut the fern down in autumn. Repeat in year two. Patience now means decades of harvests later.`},
        {title:'First harvest in year 3', text:`In the third spring, cut spears when they are 15–20cm tall and as thick as a finger. Cut with a sharp knife 2–3cm below soil level. Stop harvesting by mid-June to let plants build reserves.`},
        {title:'Full harvest from year 4', text:`From year four, harvest for 6–8 weeks from late April to mid-June. Cut every other day at its peak. Always stop by the summer solstice.`},
        {title:'Annual maintenance', text:`Cut ferns down to 5cm in autumn. Top-dress with well-rotted manure or compost. Apply a general fertiliser in early spring. Keep weed-free throughout — asparagus competes poorly with weeds.`}
      ],
      varieties:[
        {name:'Gijnlim', agm:true, desc:'F1 hybrid. Very heavy-cropping, early. The commercial standard.'},
        {name:'Backlim', agm:false, desc:'Excellent mid-season cropper. All-male, so no seedling weed problem.'},
        {name:'Purple Pacific', agm:false, desc:'Deep purple spears. Slightly sweeter than green. Very striking.'},
        {name:'Connover\'s Colossal', desc:'Heritage variety. Fat, thick spears. Classic flavour.'}
      ],
      warning:`Never let asparagus beetle go unchecked — the black-and-red adults and grey larvae strip the fern bare. Pick off by hand or use an organic insecticide promptly when seen.`
    },
    {
      id:'celeriac', icon:'⚪', name:'Celeriac', tag:'Winter Luxury', latin:'Apium graveolens (Rapaceum)',
      difficulty:3, sow:'Feb–Mar (indoors)', harvest:'Sep–Mar', position:'Full sun, moist', spacing:'30–38cm',
      desc:`Celeriac is a slow, demanding crop that rewards patience with one of the most complex, celery-like flavours in the vegetable garden. The swollen, knobbly root is the prize — grated raw in remoulade or roasted in chunks, it is sublime.`,
      steps:[
        {title:'Sow early in warmth', text:`Sow Feb–Mar at 15–18°C. Seeds need light to germinate — do not cover. Germination takes 2–3 weeks. Prick out into modules when seedlings are large enough to handle.`},
        {title:'Harden off carefully', text:`Celeriac needs a long hardening-off period. Start exposing to outdoor conditions from late April. Cold exposure (below 10°C for extended periods) triggers bolting.`},
        {title:'Plant out May–June', text:`Plant out after all frost risk into moisture-retentive, fertile soil enriched with plenty of compost. Celeriac needs consistently moist conditions throughout the growing season.`},
        {title:'Remove side shoots', text:`Throughout summer, remove the outer leaves and side shoots that form at the base of the swelling root. This improves airflow and directs energy into the root.`},
        {title:'Feed and water consistently', text:`Water generously throughout summer — celeriac must never dry out. Feed monthly with a balanced liquid feed.`},
        {title:'Leave in the ground', text:`Celeriac is frost-hardy in the ground. Leave through winter and harvest as needed from September to March. Cover with straw mulch in severe frost.`}
      ],
      varieties:[
        {name:'Prinz', agm:true, desc:'The most reliable UK variety. Smooth skin, good size, disease-resistant.'},
        {name:'Monarch', agm:true, desc:'Large, uniform roots. Very reliable. Good for the North.'},
        {name:'Ibis', agm:false, desc:'Excellent flavour. Medium-sized, clean roots.'},
        {name:'Brilliant', agm:false, desc:'Smooth-skinned, large. Stores well into winter.'}
      ],
      warning:`Slugs and carrot fly can damage young roots. Protect with fine mesh from planting and use nematode treatments in August. Never let the soil dry out — irregular watering causes splitting and bitter flavour.`
    },
    {
      id:'jerusalem', icon:'🌻', name:'Jerusalem Artichokes', tag:'Easy Perennial', latin:'Helianthus tuberosus',
      difficulty:1, sow:'Plant tubers Feb–Apr', harvest:'Nov–Mar', position:'Full sun or partial shade', spacing:'30–45cm',
      desc:`One of the most productive and neglected vegetables available. Jerusalem artichokes produce enormous yields of sweet, nutty tubers with almost zero effort. The plants grow 2–3 metres tall and make an excellent windbreak screen.`,
      steps:[
        {title:'Plant tubers in spring', text:`Plant egg-sized tubers 10–15cm deep and 30–45cm apart in Feb–Apr. They will grow in almost any soil, including poor and shaded conditions.`},
        {title:'No further care needed', text:`Jerusalem artichokes are genuinely self-sufficient. They need no feeding, watering (except in extreme drought), or weeding — the plants shade out all competition once established.`},
        {title:'Cut stems in autumn', text:`In October, cut the tall stems down to 30cm to prevent wind rock. The foliage makes excellent compost material.`},
        {title:'Harvest from November onwards', text:`Leave tubers in the ground and harvest as needed through winter. Frost actually improves the flavour by converting inulin to fructose. They store best left in the ground.`},
        {title:'Leave some tubers to grow on', text:`Always leave a few small tubers in the ground — they will re-grow the following year. This converts the bed to a permanently productive patch with zero effort.`}
      ],
      varieties:[
        {name:'Fuseau', agm:false, desc:'Smooth, elongated tubers — much easier to clean and peel than knobbly types.'},
        {name:'Gerard', agm:false, desc:'Traditional knobbly type. Excellent flavour. Very vigorous.'},
        {name:'Dwarf Sunray', agm:false, desc:'Shorter stems (1.5m). Better suited to exposed or windy sites.'},
        {name:'Stampede', agm:false, desc:'Early-maturing. Smooth skin. Good for smaller plots.'}
      ],
      warning:`Jerusalem artichokes are notorious for the flatulence they cause — the inulin fibre is indigestible for most people. Introduce them gradually into your diet. Also note: they can spread very vigorously — a few missed tubers will re-grow year after year, so choose their position carefully.`
    }
  ],
  brassicas: [
    {
      id:'kale', icon:'🥬', name:'Kale', tag:'Hardy', latin:'Brassica oleracea (Acephala)',
      difficulty:1, sow:'Apr–Jun', harvest:'Oct–Mar', position:'Full sun', spacing:'45–60cm',
      desc:`The most nutritious and cold-hardy crop you can grow. Kale soldiers on through the coldest winters and actually improves with frost. A true allotment workhorse.`,
      steps:[
        {title:'Sow in a seedbed', text:`Sow seeds 1cm deep in a seedbed or module trays in Apr–Jun. Keep moist.`},
        {title:'Transplant when ready', text:`Transplant when seedlings are 10–15cm tall, at their final spacing of 45–60cm.`},
        {title:'Firm in well', text:`Kale needs firm soil to anchor its tall stems in winter winds. Press the soil firmly around the base after planting.`},
        {title:'Net against pigeons', text:`Pigeons will destroy kale without protection. Netting is essential throughout the growing season.`},
        {title:'Pick from the outside', text:`Harvest outer leaves first, working your way in. The central growing tip keeps producing.`}
      ],
      varieties:[
        {name:'Cavolo Nero', agm:true, desc:'Italian black kale. Elegant, wrinkled leaves. Rich flavour.'},
        {name:'Red Russian', agm:false, desc:'Frilled red-purple leaves. Milder, sweet flavour.'},
        {name:'Dwarf Green Curled', agm:true, desc:'Compact, very hardy. The traditional allotment choice.'},
        {name:'Redbor F1', agm:true, desc:'Striking deep purple, extremely hardy and ornamental.'}
      ],
      warning:`Cabbage white caterpillars can strip plants. Net early in the season and check leaf undersides weekly for eggs.`
    },
    {
      id:'sprouts', icon:'🟢', name:'Brussels Sprouts', tag:'Winter', latin:'Brassica oleracea (Gemmifera)',
      difficulty:3, sow:'Mar–Apr', harvest:'Oct–Feb', position:'Full sun', spacing:'75cm',
      desc:`Divisive at the table, but deeply satisfying in the garden. Growing your own sprouts — sweet, nutty, harvested fresh on a frosty December morning — is a revelation.`,
      steps:[
        {title:'Sow under cover', text:`Sow in modules or a seedbed in Mar–Apr. Transplant at 10–15cm tall.`},
        {title:'Firm soil is vital', text:`Sprouts need the firmest soil you can provide. Loose soil causes blown sprouts (loose, open buttons).`},
        {title:'Stake against wind', text:`Tall plants are vulnerable to wind rock in autumn. Stake each plant with a strong cane.`},
        {title:'Remove lower leaves', text:`As the season progresses, remove yellowing lower leaves to improve air circulation.`},
        {title:'Harvest from bottom up', text:`Sprouts mature from the bottom of the stem upwards. Snap them off when they are firm and tight.`}
      ],
      varieties:[
        {name:'Brodie F1', agm:false, desc:'Very firm buttons, good disease resistance.'},
        {name:'Red Bull F1', agm:false, desc:'Striking red-purple sprouts. Milder flavour.'},
        {name:'Igor F1', agm:true, desc:'High-yielding, excellent mildew resistance.'},
        {name:'Brilliant F1', agm:true, desc:'Smooth buttons, long harvest season.'}
      ],
      warning:`Club root disease can devastate brassica beds. Lime your soil to raise pH to 7.0+ and practice strict crop rotation.`
    },
    {
      id:'cabbage', icon:'🥬', name:'Cabbage', tag:'Year-round', latin:'Brassica oleracea (Capitata)',
      difficulty:2, sow:'Feb–Jul (varies by type)', harvest:'Year-round (varies)', position:'Full sun', spacing:'45cm',
      desc:`With the right varieties, you can harvest fresh cabbage every single month of the year. Spring cabbage, summer ball heads, winter savoy — plan your succession well.`,
      steps:[
        {title:'Choose the right type', text:`Spring cabbage: sow Jul–Aug. Summer/autumn: sow Feb–Apr under cover. Winter savoy: sow Apr–May. Each type has its own calendar.`},
        {title:'Transplant at 10–15cm', text:`Move seedlings to their final position when large enough, firming the soil thoroughly around each plant.`},
        {title:'Net immediately', text:`Cabbage white butterflies will find your plants within days of planting. Net straight after transplanting.`},
        {title:'Water in dry spells', text:`Consistent moisture prevents splitting heads. Water deeply twice a week in summer.`},
        {title:'Harvest with a knife', text:`Cut heads when they feel firm and solid. Leave the stump in — it may produce a second flush of small leaves.`}
      ],
      varieties:[
        {name:'Savoy King F1', agm:false, desc:'Deeply crinkled winter savoy. Excellent frost hardiness.'},
        {name:'Hispi F1', agm:true, desc:'Pointed summer type. Sweet, tender, very reliable.'},
        {name:'January King', agm:true, desc:'Beautiful red-tinged hardy winter cabbage.'},
        {name:'Durham Early', agm:false, desc:'Spring cabbage. Compact, fast-maturing.'}
      ],
      warning:`Cabbage root fly can kill young plants. Use brassica collars around stems at planting to prevent egg-laying near the base.`
    },
    {
      id:'broccoli', icon:'🥦', name:'Broccoli & Calabrese', tag:'Nutritious', latin:'Brassica oleracea (Italica)',
      difficulty:2, sow:'Mar–Jun', harvest:'Jun–Oct (calabrese) / Feb–May (PSB)', position:'Full sun', spacing:'30–45cm',
      desc:`Two quite different crops share the broccoli name. Calabrese gives you summer heads; Purple Sprouting Broccoli (PSB) is the winter-to-spring hardy wonder that fills the hungry gap.`,
      steps:[
        {title:'Sow calabrese direct', text:`Calabrese does not transplant well. Sow direct in Mar–Jun, 3 seeds per station, thin to one. It matures in 10–12 weeks.`},
        {title:'Sow PSB in modules', text:`Sow PSB in modules or seedbed in Apr–May. Transplant at 10–15cm into its final spot at 45cm spacing.`},
        {title:'Keep well watered', text:`Both types need consistent moisture, especially when heads are forming.`},
        {title:'Harvest the central head first', text:`Cut the central head before any flowers open. Side shoots will follow and can be harvested for weeks.`}
      ],
      varieties:[
        {name:'Marathon F1', agm:false, desc:'Calabrese. Large, tight central head. Very reliable.'},
        {name:'Early Purple Sprouting', agm:false, desc:'PSB. Ready Feb–Mar. Essential for the hungry gap.'},
        {name:'Tenderstem', agm:false, desc:'Thin, sweet stems — the restaurant favourite.'},
        {name:'White Eye', agm:false, desc:'White PSB. Unusual and impressive.'}
      ],
      warning:`Butterflies and aphids are the main pests. Net constantly and check for aphid colonies under leaves.`
    },
    {
      id:'cauliflower', icon:'⬜', name:'Cauliflower', tag:'Challenging', latin:'Brassica oleracea (Botrytis)',
      difficulty:3, sow:'Mar–May (indoors or seedbed)', harvest:'Jun–Nov (varies by type)', position:'Full sun', spacing:'60cm',
      desc:`The most demanding of the brassicas, but a perfect white curd cut fresh from the garden is one of the great vegetable triumphs. Cauliflower rewards attention to detail with a spectacular harvest.`,
      steps:[
        {title:'Sow in modules', text:`Sow one seed per module in Mar–May. Transplant when seedlings are 5–6cm tall with 4–5 leaves.`},
        {title:'Plant into very firm soil', text:`Like all brassicas, cauliflower needs firm ground. Tread the soil before planting and firm each plant in well.`},
        {title:'Water without fail', text:`Any check in growth — from drought, transplant shock, or cold — can cause the plant to bolt or produce tiny, poor curds. Keep evenly moist.`},
        {title:'Blanch the curd', text:`When the curd begins to form, snap some inner leaves over it or tie them with string to protect it from sunlight and keep it white and sweet.`},
        {title:'Harvest promptly', text:`Once the curd is a good size and still tight, cut immediately — it can go from perfect to blown (flowering) in days in warm weather.`}
      ],
      varieties:[
        {name:'Aalsmeer', agm:false, desc:'Autumn type. Large, pure white heads. Very reliable.'},
        {name:'Snowball', agm:true, desc:'Classic summer type. Compact, quick to mature.'},
        {name:'Romanesco', agm:true, desc:'Striking lime-green fractal spirals. Nutty flavour.'},
        {name:'Graffiti F1', agm:false, desc:'Vivid purple heads. Retains colour when lightly cooked.'}
      ],
      warning:`Any stress — drought, heat, cold, root damage — triggers bolting or poor curd development. Cauliflower demands consistency above all else.`
    },
    {
      id:'kohlrabi', icon:'🟣', name:'Kohlrabi', tag:'Unusual & Fast', latin:'Brassica oleracea (Gongylodes)',
      difficulty:1, sow:'Mar–Aug (direct or modules)', harvest:'Jun–Oct', position:'Full sun', spacing:'20–25cm',
      desc:`One of the most underrated vegetables in the garden. Kohlrabi forms a swollen stem that tastes like a mild, sweet turnip crossed with apple — delicious raw, roasted, or in slaws.`,
      steps:[
        {title:'Sow successionally', text:`Sow every 3 weeks for a continuous supply. Sow direct or in modules and transplant at the seedling stage.`},
        {title:'Thin or plant at 20cm', text:`Kohlrabi grows quickly and needs space for the stem to swell. Thin or space at 20–25cm in rows 30cm apart.`},
        {title:'Keep well watered', text:`Irregular watering causes the stem to split. Keep consistently moist, especially as it begins to swell.`},
        {title:'Harvest young', text:`Harvest when the swollen stem is tennis-ball size (5–8cm). Larger stems become woody and pithy.`}
      ],
      varieties:[
        {name:'Logo F1', agm:false, desc:'Green-skinned. Fast, reliable, good in all conditions.'},
        {name:'Kolibri F1', agm:false, desc:'Purple-skinned. Vivid colour, equally good raw or cooked.'},
        {name:'Superschmelz', agm:false, desc:'Giant type — can reach 10kg without going woody.'},
        {name:'Vienna White', agm:false, desc:'Heritage variety. Very mild, sweet flavour.'}
      ],
      warning:`Kohlrabi left too long becomes woody and tough. Harvest promptly at the right size — it won\'t wait.`
    },
    {
      id:'calabrese', icon:'🥦', name:'Calabrese Broccoli', tag:'Summer Brassica', latin:'Brassica oleracea (Italica)',
      difficulty:2, sow:'Mar–Jun (modules or direct)', harvest:'Jul–Oct', position:'Full sun, firm soil', spacing:'30–45cm',
      desc:`Calabrese is the green broccoli sold in supermarkets — it produces a large central head followed by a flush of delicious side shoots. Unlike PSB (purple sprouting broccoli), it is grown as a summer and autumn crop in the same year it is sown.`,
      steps:[
        {title:'Sow in modules', text:`Sow in modules Feb–Apr (under cover) or direct May–Jun. Avoid root disturbance — start in modules and transplant carefully. Calabrese dislikes being moved once established.`},
        {title:'Plant into firm soil', text:`Firm the soil well before and after planting. Loose soil produces loose, open heads. Plant deeply — burying up to the first set of true leaves stabilises the tall stems.`},
        {title:'Net immediately', text:`Net against cabbage white butterfly and pigeons immediately after planting. Do not delay — damage begins within days of planting out in summer.`},
        {title:'Water consistently', text:`Consistent moisture produces dense, firm heads. Water deeply 1–2 times per week rather than little and often.`},
        {title:'Cut central head first', text:`Harvest the central head while it is still tight and before any yellow flowers open. This triggers the plant to produce side shoots, which continue for several weeks.`},
        {title:'Harvest side shoots regularly', text:`Pick side shoots every 2–3 days once they begin — regular picking prolongs production. Side shoots have more flavour than the central head.`}
      ],
      varieties:[
        {name:'Marathon F1', agm:true, desc:'The benchmark UK variety. Dense heads, vigorous side shoots, club root tolerance.'},
        {name:'Ironman F1', agm:false, desc:'Excellent heat and cold tolerance. Very uniform heads.'},
        {name:'Romanesco', agm:false, desc:'Lime-green, architectural, fractal heads. Milder flavour than standard broccoli.'},
        {name:'Waltham 29', agm:false, desc:'Heritage open-pollinated. Heavy side shoot production. Excellent flavour.'}
      ],
      warning:`Cabbage white butterflies are the primary threat to calabrese. Fine mesh netting is the only reliable protection — check weekly for any gaps or damage that allows access.`
    },
    {
      id:'chinesecabbage', icon:'🥬', name:'Chinese Cabbage', tag:'Oriental Brassica', latin:'Brassica rapa (Pekinensis)',
      difficulty:2, sow:'Jul–Aug (direct or modules)', harvest:'Sep–Nov', position:'Full sun or part shade', spacing:'30–35cm',
      desc:`Chinese cabbage (Wong Bok / Pe-tsai) forms large, dense, barrel-shaped heads with crisp, sweet, pale leaves. It is the base of kimchi and Oriental salads and is remarkably productive in the autumn garden.`,
      steps:[
        {title:'Sow in midsummer only', text:`Chinese cabbage bolts almost inevitably if sown before the summer solstice. Sow from mid-July onwards for autumn heads. Earlier sowings are almost always wasted.`},
        {title:'Sow direct or in modules', text:`Sow direct 1cm deep in rows 35cm apart, or in modules and transplant carefully. Minimise root disturbance — direct sowing is usually more reliable.`},
        {title:'Thin to final spacing', text:`Thin direct sowings to 30–35cm. Remove thinnings immediately — they are excellent in salads.`},
        {title:'Net against pests', text:`Net against cabbage white butterfly, flea beetle, and slugs throughout the growing period.`},
        {title:'Harvest before hard frost', text:`Harvest when heads feel firm when squeezed. Chinese cabbage is hardy to about -5°C but heavy frost damages the outer leaves. Cover with fleece for extended harvest.`}
      ],
      varieties:[
        {name:'Bilko F1', agm:true, desc:'Bolt-resistant barrel type. Dense, crisp heads. The most reliable UK variety.'},
        {name:'Kasumi F1', agm:false, desc:'Tall, cylindrical. Very tight head. Excellent disease resistance.'},
        {name:'Richi F1', agm:false, desc:'Compact type for smaller plots. Good mildew resistance.'},
        {name:'Santo F1', agm:false, desc:'Very bolt-resistant. Suitable for earlier sowings (June) compared to others.'}
      ],
      warning:`Bolting (running to seed) is the most common problem with Chinese cabbage — almost always caused by sowing too early. If plants bolt before forming heads, remove them and re-sow in late July.`
    },
    {
      id:'pakchoi', icon:'🥬', name:'Pak Choi', tag:'Fast Oriental', latin:'Brassica rapa (Chinensis)',
      difficulty:1, sow:'Mar–Sep (modules or direct)', harvest:'4–8 weeks after sowing', position:'Full sun or part shade', spacing:'20–25cm',
      desc:`Pak choi (bok choy) is one of the most versatile and productive oriental vegetables — ready in as little as 4 weeks as a baby leaf, or 8 weeks as a full head. It thrives in spring and autumn when brassica whites are less active.`,
      steps:[
        {title:'Sow in modules', text:`Sow in modules for best results — pak choi bolts less readily when transplanted compared to direct sowing. Sow 2–3 seeds per module and thin to the strongest.`},
        {title:'Sow spring and autumn', text:`Pak choi bolts readily in the heat of midsummer. Concentrate sowings in March–May and August–September for the best results.`},
        {title:'Transplant carefully', text:`Move to final positions when 3–4cm tall. Plant at 20–25cm spacing. Firm in well.`},
        {title:'Net against flea beetle', text:`Flea beetle creates shothole damage on pak choi very rapidly. Fine mesh (0.8mm) is essential from sowing to harvest.`},
        {title:'Harvest whole or as baby leaves', text:`Pick individual outer leaves from 4 weeks, or harvest the whole plant by cutting at the base. Plants often re-sprout for a second cut.`}
      ],
      varieties:[
        {name:'Joi Choi F1', agm:true, desc:'White-stemmed. Bolt-resistant. The most reliable UK variety.'},
        {name:'Canton Dwarf', agm:false, desc:'Compact. Very fast. Ideal for baby leaf or mini heads.'},
        {name:'Red Choi', agm:false, desc:'Stunning dark red leaves and green stems. Good flavour, decorative.'},
        {name:'Vitalia F1', agm:false, desc:'Good mildew resistance. Performs well under cover in autumn.'}
      ],
      warning:`Flea beetle is the main pest of pak choi — tiny holes appearing overnight on seedlings are the tell-tale sign. Always grow under fine mesh. In hot weather, water in the morning to keep foliage dry by night.`
    }
  ],
  alliums: [
    {
      id:'onion', icon:'🧅', name:'Onions', tag:'Essential', latin:'Allium cepa',
      difficulty:1, sow:'Mar–Apr (sets) / Jan–Feb (seed)', harvest:'Jul–Aug', position:'Full sun', spacing:'10cm',
      desc:`The foundation of every kitchen. Growing onions from sets (small immature bulbs) gives near-guaranteed results with almost no effort. A must for every plot.`,
      steps:[
        {title:'Prepare a firm bed', text:`Onions need firm, fertile soil. Rake to a fine tilth and avoid fresh manure, which causes soft, rot-prone bulbs.`},
        {title:'Plant sets', text:`Push sets into the soil so just the tip shows, 10cm apart in rows 30cm apart. Plant in Mar–Apr for main crop.`},
        {title:'Protect from birds', text:`Birds pull sets out, thinking they're worms. Cover with fleece for the first few weeks until roots anchor them.`},
        {title:'Keep weed-free', text:`Onions compete poorly with weeds. Hoe between rows regularly throughout summer.`},
        {title:'Harvest when tops fall', text:`When the foliage naturally falls over and begins to yellow, ease bulbs from the soil and dry in the sun for 2 weeks before storing.`}
      ],
      varieties:[
        {name:'Sturon', agm:true, desc:'The classic yellow onion. Stores well into January.'},
        {name:'Red Baron', agm:true, desc:'Deep red, pungent, and very striking. Good keeper.'},
        {name:'Ailsa Craig', agm:true, desc:'Large exhibition onion from seed. Beautiful flavour.'},
        {name:'Setton', agm:false, desc:'Sets variety. Bolt-resistant, excellent storage.'}
      ],
      warning:`White rot is a devastating soil-borne fungus with no cure. Never move infected soil and practice long rotation cycles.`
    },
    {
      id:'garlic', icon:'🧄', name:'Garlic', tag:'Autumn Plant', latin:'Allium sativum',
      difficulty:1, sow:'Oct–Nov (or Feb–Mar)', harvest:'Jun–Jul', position:'Full sun', spacing:'15cm',
      desc:`Plant in autumn, harvest in summer. Garlic is one of the lowest-effort crops on the allotment. A head splits into cloves, each clove becomes a new head — remarkable mathematics.`,
      steps:[
        {title:'Split into cloves', text:`Break a head of garlic into individual cloves. Use only the largest outer cloves for planting — small inner ones give small bulbs.`},
        {title:'Plant in autumn', text:`Plant Oct–Nov, 15cm apart, pointed end up, with tip just below soil surface. Cold weather triggers proper bulb development.`},
        {title:'Keep weed-free', text:`Garlic needs minimal care through winter. Just keep beds weed-free and remove any flowering scapes (curly stems) to redirect energy to the bulb.`},
        {title:'Harvest when half the leaves turn yellow', text:`In June–July, when 50% of the foliage has yellowed, carefully lift bulbs with a fork. Don't wait until all leaves die back.`},
        {title:'Dry thoroughly', text:`Dry in sun or a warm shed for 3–4 weeks until the skins are papery. Then store in a cool, dry place or plait the stems.`}
      ],
      varieties:[
        {name:'Solent Wight', agm:true, desc:'Softneck. Excellent English variety. Stores for a year.'},
        {name:'Elephant Garlic', agm:false, desc:'Enormous, mild-flavoured cloves. Technically a leek.'},
        {name:'Thermidrome', agm:false, desc:'Softneck. Very good disease resistance.'},
        {name:'Purple Wight', agm:false, desc:'Beautiful purple-striped hardneck. Rich flavour.'}
      ],
      warning:`Avoid planting garlic bought from supermarkets — it may carry viruses. Always use certified seed garlic from reputable suppliers.`
    },
    {
      id:'leek', icon:'🥢', name:'Leeks', tag:'Winter Staple', latin:'Allium ampeloprasum',
      difficulty:2, sow:'Feb–Apr (indoors or seedbed)', harvest:'Sep–Mar', position:'Full sun', spacing:'15cm',
      desc:`The backbone of winter cooking and a staple of the British allotment. Leeks occupy the ground for a long time but deliver through the coldest, hungriest months.`,
      steps:[
        {title:'Sow in a seedbed', text:`Sow seeds thinly in a seedbed outdoors in Mar–Apr, or under cover in Feb. They grow slowly.`},
        {title:'Transplant when pencil-thick', text:`When seedlings are pencil-thick (Jun–Jul), transplant to their final position. Use a dibber to make 15cm-deep holes.`},
        {title:'Drop in, don\'t firm', text:`Drop one seedling into each hole and simply fill with water — don\'t back-fill with soil. This blanches the lower stem white.`},
        {title:'Earth up', text:`As leeks grow, draw soil up around them to extend the white blanched stem.`},
        {title:'Harvest as needed', text:`Leeks stand happily in the ground through frost and snow. Harvest from Sep onwards with a fork.`}
      ],
      varieties:[
        {name:'Musselburgh', agm:true, desc:'The classic heritage variety. Hardy and reliable.'},
        {name:'Pandora', agm:false, desc:'Long, slender white shafts. Good rust resistance.'},
        {name:'Carlton F1', agm:false, desc:'Early variety. Good for summer-autumn harvest.'},
        {name:'Bandit', agm:true, desc:'Extremely hardy. Excellent for Dec–Mar harvests.'}
      ],
      warning:`Leek rust (orange powdery pustules on leaves) is disfiguring but rarely fatal. Improve air circulation and avoid overhead watering.`
    },
    {
      id:'shallot', icon:'🧅', name:'Shallots', tag:'Gourmet', latin:'Allium cepa (Aggregatum)',
      difficulty:1, sow:'Feb–Mar (sets)', harvest:'Jul–Aug', position:'Full sun', spacing:'20cm',
      desc:`Shallots have a sweeter, more complex flavour than onions — the chef's allium of choice. They're grown from sets just like onions but each set multiplies into a cluster of 8–12 new bulbs.`,
      steps:[
        {title:'Plant sets in February', text:`Push sets into prepared, firm soil in Feb–Mar, 20cm apart in rows 30cm apart, with just the tip visible. Earlier planting than onions gives bigger bulbs.`},
        {title:'Allow to multiply', text:`Each set will split and form a cluster of bulbs through the season. Do not disturb them — let the cluster develop naturally.`},
        {title:'Keep weed-free', text:`Shallots have shallow roots and compete poorly with weeds. Hoe carefully and regularly.`},
        {title:'Harvest as a cluster', text:`When foliage yellows and falls, lift the whole cluster with a fork. Separate, dry in the sun for 2–3 weeks, then store in a cool, dry place.`}
      ],
      varieties:[
        {name:'Zebrune', agm:false, desc:'French banana shallot. Elongated, superb mild flavour.'},
        {name:'Golden Gourmet', agm:false, desc:'Round, golden. Heavy-cropping and good storage.'},
        {name:'Red Sun', agm:false, desc:'Deep red, attractive. Mild and sweet.'},
        {name:'Jermor', agm:false, desc:'Long, copper-skinned. Exceptional culinary flavour.'}
      ],
      warning:`Like onions, shallots are vulnerable to white rot. Maintain strict crop rotation and never replant in infected soil.`
    }
  ],
  legumes: [
    {
      id:'runner', icon:'🫘', name:'Runner Beans', tag:'Climber', latin:'Phaseolus coccineus',
      difficulty:1, sow:'May (indoors) or May–Jun (direct)', harvest:'Jul–Oct', position:'Full sun, sheltered', spacing:'15cm',
      desc:`Fast-growing, spectacular, and absurdly productive. Runner beans on a wigwam are one of the great sights of an allotment in summer. One sowing feeds a family all season.`,
      steps:[
        {title:'Build supports first', text:`Erect a wigwam of 2.4m canes or a double row of crossed canes before planting. They grow fast and need support from the start.`},
        {title:'Sow indoors or direct', text:`Sow seeds 5cm deep in pots indoors in May, or direct after the last frost. One seed per cane.`},
        {title:'Train up supports', text:`Help young plants to find their canes. They will then twine themselves upward unaided.`},
        {title:'Water flowers well', text:`Irregular watering when flowers are setting causes them to drop without setting pods. Water deeply and consistently.`},
        {title:'Pick every 3–4 days', text:`Once picking begins, harvest every few days without fail. Pods left to mature signal the plant to stop producing.`}
      ],
      varieties:[
        {name:'Enorma', agm:true, desc:'Long, stringless pods. Classic allotment variety.'},
        {name:'Scarlet Emperor', agm:true, desc:'Heritage variety. Excellent flavour. Beautiful red flowers.'},
        {name:'White Lady', agm:true, desc:`White-flowered. Said to be more reliable in dry conditions.`},
        {name:'Hestia', agm:true, desc:'Dwarf (45cm). No staking needed. Good for containers.'}
      ],
      warning:`Bean seed fly larvae eat germinating seeds. Pre-sprouting seeds indoors before sowing direct avoids losses.`
    },
    {
      id:'broadbean', icon:'🫛', name:'Broad Beans', tag:'First of Year', latin:'Vicia faba',
      difficulty:1, sow:'Oct–Nov (autumn) or Feb–Apr (spring)', harvest:'Jun–Aug', position:'Full sun or light shade', spacing:'20–25cm',
      desc:`The very first beans of summer, and a taste of the new season. Broad beans sown in autumn overwinter as sturdy plants and crop a full month earlier than spring sowings.`,
      steps:[
        {title:'Sow deep', text:`Push seeds 5cm deep into the soil, 20–25cm apart in rows 45cm apart. Autumn sowings produce the earliest harvest.`},
        {title:'Support tall varieties', text:`Push canes in at each corner of the row and run string around them to support the stems in wind.`},
        {title:'Pinch out growing tips', text:`When the first pods set (about 10cm long), pinch out the top 5cm of each plant. This speeds pod development and removes blackfly colonies.`},
        {title:'Harvest young', text:`Pick when pods feel well-filled but before the scar on each bean turns black. Young beans are far sweeter.`}
      ],
      varieties:[
        {name:'Aquadulce Claudia', agm:true, desc:'The classic for autumn sowing. Very hardy, long pods.'},
        {name:`Bunyard's Exhibition`, desc:'Long pods, excellent flavour. Heritage variety.'},
        {name:'The Sutton', agm:false, desc:'Dwarf (30cm). No staking. Good for exposed plots.'},
        {name:'Red Epicure', agm:false, desc:'Beautiful crimson seeds. Sweet, unusual flavour.'}
      ],
      warning:`Blackfly colonies congregate on growing tips. Pinching out tips removes the worst colonies instantly and is the most effective organic control.`
    },
    {
      id:'peas', icon:'🟡', name:'Peas', tag:'Sweet', latin:'Pisum sativum',
      difficulty:2, sow:'Mar–Jun (direct)', harvest:'Jun–Sep', position:'Full sun or light shade', spacing:'5–8cm',
      desc:`Freshly picked peas eaten straight from the pod in the garden are one of the best things about growing your own. They are almost too good to bring inside.`,
      steps:[
        {title:'Prepare a flat-bottomed drill', text:`Make a flat-bottomed drill 5cm deep and 20cm wide using a spade. Sow seeds 5–8cm apart in a double or triple row.`},
        {title:'Provide support early', text:`Peas need something to grip from the start. Push in pea sticks (twiggy branches), netting, or wire mesh immediately after sowing.`},
        {title:'Sow in succession', text:`For a continuous harvest, sow every 3–4 weeks from Mar–Jun rather than a single large batch.`},
        {title:'Water when flowering', text:`Water is most critical when plants are flowering and when pods are swelling. Drought at this stage reduces yield dramatically.`},
        {title:'Pick frequently', text:`Start picking from the bottom of the plant. Regular picking encourages the plant to produce more pods.`}
      ],
      varieties:[
        {name:'Kelvedon Wonder', agm:true, desc:'Early, compact, very sweet. Outstanding for successional sowing.'},
        {name:'Alderman', agm:false, desc:'Tall heritage variety (1.5m). Heavy cropper, excellent flavour.'},
        {name:'Sugar Snap', agm:true, desc:'Eat pods and all. Sweet and crunchy. No shelling needed.'},
        {name:'Mange Tout Oregon', agm:false, desc:'Flat pods harvested before peas swell. Tender and sweet.'}
      ],
      warning:`Mice absolutely love pea seeds and will dig them up as fast as you sow them. Pre-germinate seeds on damp kitchen paper before sowing to get them underground and growing faster.`
    },
    {
      id:'frenchbean', icon:'🟩', name:'French Beans', tag:'Versatile', latin:'Phaseolus vulgaris',
      difficulty:1, sow:'May–Jun (direct or indoors)', harvest:'Jul–Sep', position:'Full sun, sheltered', spacing:'15cm',
      desc:`French beans are quicker to mature than runner beans, more compact, and just as productive. Climbing types maximise small spaces; dwarf types need no support at all.`,
      steps:[
        {title:'Sow after last frost', text:`Direct sow or start in pots indoors in May. French beans are frost-tender — don\'t rush planting out.`},
        {title:'Dwarf or climbing', text:`Dwarf varieties (30–45cm) need no support. Climbing types need canes or a net up to 2m and are more productive.`},
        {title:'Water at flowering', text:`As with runner beans, water consistently when flowers are forming to ensure good pod set.`},
        {title:'Pick before strings form', text:`Harvest pods when pencil-thin and snapping clean. Once stringy or bulging, flavour declines.`},
        {title:'Sow in succession', text:`Sow a second batch 3–4 weeks later to extend the harvest into September.`}
      ],
      varieties:[
        {name:'Cobra', agm:false, desc:'Climbing. Long, prolific pods. One of the best for flavour.'},
        {name:'Safari', agm:true, desc:'Dwarf. Stringless, heavy-cropping. Very reliable.'},
        {name:'Borlotti', agm:false, desc:'Shelling bean. Beautiful red-streaked pods and beans.'},
        {name:'Neckar Gold', agm:false, desc:'Yellow-podded dwarf. Mild flavour, very ornamental.'}
      ],
      warning:`French beans are extremely frost-tender. A single late frost will kill them. Always wait until all frost risk has passed before planting out.`
    },
    {
      id:'soyabean', icon:'🫘', name:'Soya Beans', tag:'Protein Powerhouse', latin:'Glycine max',
      difficulty:2, sow:'Apr–May (indoors) or May (direct)', harvest:'Aug–Sep (green) or Oct (dry)', position:'Full sun, warm, sheltered', spacing:'10–15cm',
      desc:`Soya beans (edamame when harvested green) are one of the most nutritious crops you can grow. Harvest the whole pods when plump and bright green and steam them in the pod for a remarkable flavour entirely unlike anything from a shop.`,
      steps:[
        {title:'Sow in warmth', text:`Sow indoors in April at 18–20°C, one seed per 9cm pot. Or sow direct in May when soil has warmed to at least 15°C. Cold soil causes patchy germination.`},
        {title:'Harden off and plant out', text:`Harden off indoor-raised plants carefully over 10–14 days. Plant out after all frost risk in late May. Space 10–15cm apart in rows 30–45cm apart.`},
        {title:'Support if needed', text:`Soya bean plants are bushy and self-supporting up to about 60cm. No stakes are needed for standard varieties in a sheltered position.`},
        {title:'Water during pod fill', text:`Water consistently once pods begin to swell in August — this is the critical period for yield. Inconsistent watering causes pods to abort.`},
        {title:'Harvest edamame green', text:`Harvest pods when they are plump and bright green (August–September). The whole crop ripens more or less at once. Pods can be frozen successfully.`},
        {title:'Or dry for beans', text:`For dry soya beans, leave pods on the plant until they turn brown and rattle. Harvest the whole plant, dry for 2 weeks in a warm shed, then shell.`}
      ],
      varieties:[
        {name:'Envy', agm:false, desc:'The most reliable UK edamame variety. Early, productive, good flavour.'},
        {name:'Ustie', agm:false, desc:'Bred for UK conditions. Short season. Good disease resistance.'},
        {name:'Green Shell', agm:false, desc:'Good all-round edamame type. Bushy plant, heavy crop of plump pods.'},
        {name:'Midori Giant', agm:false, desc:'Large pods with 3 beans each. Excellent for edamame use.'}
      ],
      warning:`Soya beans need warmth to produce a good crop. In a cool, cloudy summer they will yield poorly. A polytunnel or south-facing wall significantly improves performance. Do not sow too early — cold soil is the most common cause of failure.`
    }
  ],
  salads: [
    {
      id:'lettuce', icon:'🥬', name:'Lettuce', tag:'Fastest', latin:'Lactuca sativa',
      difficulty:1, sow:'Mar–Sep (successional)', harvest:'May–Nov', position:'Sun or part shade', spacing:'20–30cm',
      desc:`The most immediate reward in the vegetable garden. Sow lettuce every three weeks and you'll be cutting fresh leaves within 6–8 weeks throughout the entire growing season.`,
      steps:[
        {title:'Sow little and often', text:`Sow a short row every 3 weeks rather than a whole packet at once. This gives continuous harvests rather than a glut followed by nothing.`},
        {title:'Thin or transplant', text:`For hearting types, thin to 25–30cm. For cut-and-come-again leaf varieties, thin to 10cm and harvest outer leaves.`},
        {title:'Water in the morning', text:`Water early to let leaves dry by evening — wet leaves overnight encourages slug damage and mildew.`},
        {title:'Harvest cut-and-come-again', text:`Remove outer leaves or cut the whole plant 5cm above the ground. It will regrow 2–3 times.`},
        {title:'Avoid bolting', text:`In hot weather, lettuce bolts (runs to seed) and turns bitter. Sow bolt-resistant varieties in summer.`}
      ],
      varieties:[
        {name:'Little Gem', agm:true, desc:'Compact cos type. Sweet, crisp, very reliable.'},
        {name:'Lollo Rosso', agm:false, desc:'Frilly red cut-and-come-again. Decorative and tasty.'},
        {name:'Butterhead', agm:false, desc:'Soft, buttery leaves. Classic round head type.'},
        {name:'Oakleaf', agm:false, desc:'Oak-shaped leaves. Slow to bolt. Long season.'}
      ],
      warning:`Slugs devastate lettuce seedlings overnight. Protect with copper tape, slug traps, or go out after dark for hand-picking.`
    },
    {
      id:'radish', icon:'🔴', name:'Radishes', tag:'Quickest of All', latin:'Raphanus sativus',
      difficulty:1, sow:'Mar–Sep (direct)', harvest:'4–6 weeks after sowing', position:'Sun or part shade', spacing:'2.5cm',
      desc:`The fastest crop in the garden — ready in just 3–4 weeks. Radishes are perfect for filling gaps between slower crops and for keeping impatient young gardeners engaged.`,
      steps:[
        {title:'Sow direct and thinly', text:`Sow seeds 1cm deep, thinly in drills. There's no need to thin if you've sown sparingly — they are best eaten young and small anyway.`},
        {title:'Keep well watered', text:`Irregular watering causes woody, hot roots. Keep the soil consistently moist for the best results.`},
        {title:'Harvest young', text:`Pull when golf-ball size (3–4cm). Left too long they become pithy, hollow, and unpleasantly hot.`},
        {title:'Sow successionally', text:`Sow a short row every 2–3 weeks for a continuous supply. Just a dozen seeds at a time is plenty.`}
      ],
      varieties:[
        {name:'French Breakfast', agm:false, desc:'Elongated, mild, crisp. The classic variety.'},
        {name:'Cherry Belle', agm:false, desc:'Round, bright red, very quick. Good for children to grow.'},
        {name:'Watermelon', agm:false, desc:'Green outside, pink-red inside. Striking and sweet.'},
        {name:'Mooli Minowase', agm:false, desc:'Large white Japanese winter radish. Very different flavour.'}
      ],
      warning:`Flea beetle creates tiny holes in leaves. Grow under fine mesh or fleece for protection, especially in hot, dry weather when they're most active.`
    },
    {
      id:'spinach', icon:'🌿', name:'Spinach & Chard', tag:'Versatile', latin:'Spinacia oleracea / Beta vulgaris',
      difficulty:1, sow:'Mar–Sep (direct)', harvest:'May–Nov (chard year-round)', position:'Sun or shade', spacing:'15–20cm',
      desc:`Two of the hardest-working leaves you can grow. Chard is nearly indestructible — it survives frost, heat, and neglect. Spinach is faster but needs more attention.`,
      steps:[
        {title:'Sow direct', text:`Sow thinly 1cm deep, 15cm apart. Chard can also be started in modules for transplanting.`},
        {title:'Thin to final spacing', text:`Thin to 15–20cm for full-sized plants. Use thinnings in salads.`},
        {title:'Keep moist in hot weather', text:`Spinach bolts quickly in heat. Sow in partial shade in summer and keep well watered.`},
        {title:'Cut-and-come-again', text:`Harvest outer leaves regularly or cut the whole plant to 5cm. Both spinach and chard regrow well.`}
      ],
      varieties:[
        {name:'Perpetual Spinach', agm:false, desc:'Actually a chard — extremely hardy and productive.'},
        {name:'Rainbow Chard', agm:false, desc:'Stems in red, yellow, pink and white. Beautiful and tasty.'},
        {name:'Medania', agm:true, desc:'Spinach. Slow to bolt, good in summer.'},
        {name:'Fordhook Giant', agm:false, desc:'Large-stemmed Swiss chard. Reliable and long-cropping.'}
      ],
      warning:`Downy mildew can affect spinach in cool, damp conditions. Improve spacing and airflow.`
    },
    {
      id:'rocket', icon:'🌱', name:'Rocket', tag:'Peppery', latin:'Eruca vesicaria',
      difficulty:1, sow:'Mar–Sep (direct)', harvest:'5–6 weeks after sowing', position:'Sun or part shade', spacing:'10cm',
      desc:`Rocket is one of the fastest and most rewarding salad crops. Its peppery, complex flavour transforms any salad. It bolts in heat, so sow little and often through the season.`,
      steps:[
        {title:'Sow in short rows', text:`Scatter seeds thinly in a 1cm-deep drill. No need to thin — just harvest leaves as the plants grow.`},
        {title:'Keep cool and moist', text:`Rocket bolts quickly in hot, dry conditions. Sow in light shade in summer and water regularly.`},
        {title:'Harvest outer leaves', text:`Pick outer leaves once plants are 10cm tall, leaving the centre to keep growing. Each plant will give 2–3 harvests.`},
        {title:'Sow every 3 weeks', text:`Succession sow every 3 weeks for continuous supplies. Late summer and autumn sowings give the best, least-bitter flavour.`}
      ],
      varieties:[
        {name:'Rocket Salad (Wild)', agm:false, desc:'Smaller, serrated leaves. More intense, complex flavour.'},
        {name:'Apollo', agm:true, desc:'Broad-leaved. Slower to bolt. Mild peppery taste.'},
        {name:'Voyager', agm:false, desc:'Compact, slow-bolt variety. Good for summer sowing.'},
        {name:'Dragon Tongue', agm:false, desc:'Deeply lobed leaves with a strong peppery kick.'}
      ],
      warning:`Flea beetle riddling the leaves with tiny holes is the main problem. Row covers or fine mesh keep them off completely.`
    },
    {
      id:'springonion', icon:'🌿', name:'Spring Onions', tag:'Quick Harvest', latin:'Allium fistulosum',
      difficulty:1, sow:'Mar–Aug (direct)', harvest:'8–10 weeks after sowing', position:'Full sun or light shade', spacing:'1cm',
      desc:`One of the easiest and most useful crops in the kitchen garden. Spring onions are ready in just 8 weeks from sowing and can be succession-sown throughout the growing season for a constant supply.`,
      steps:[
        {title:'Sow direct in drills', text:`Sow seeds thinly in 1cm-deep drills, 15cm between rows. No need to thin — harvest a few at a time as needed.`},
        {title:'Keep moist', text:`Water regularly to keep growth even and stems mild. Dry conditions produce hot, tough onions.`},
        {title:'Sow every 3 weeks', text:`One short row every 3 weeks from Mar–Aug gives a constant supply through the season.`},
        {title:'Harvest before they bolt', text:`Pull when stems are pencil-thick. Don't let them grow too large or they turn tough and too strongly flavoured.`}
      ],
      varieties:[
        {name:'White Lisbon', agm:false, desc:'The classic spring onion. Reliable, mild, quick.'},
        {name:'Ishikura', agm:false, desc:'Long, thick stems. Excellent for stir-fries.'},
        {name:'North Holland Blood Red', agm:false, desc:'Red-tinged stems. Striking colour, mild flavour.'},
        {name:'Guardsman F1', agm:false, desc:'Upright, uniform. Good for close spacing.'}
      ],
      warning:`White rot can affect spring onions just as it does onions and garlic. Never grow alliums in infected soil.`
    },
    {
      id:'chard', icon:'🌈', name:'Chard', tag:'Year-Round Colour', latin:'Beta vulgaris (Cicla)',
      difficulty:1, sow:'Apr–Aug (direct or modules)', harvest:'Jun–Mar', position:'Sun or part shade', spacing:'20–30cm',
      desc:`Chard is one of the most ornamental and reliable vegetables in the garden. Rainbow chard with stems in red, yellow, orange, white, and pink transforms any bed into something spectacular, while delivering leaves over an extraordinary season length.`,
      steps:[
        {title:'Sow direct or in modules', text:`Sow 2cm deep from April onwards. Chard seeds are actually clusters — thin or split them as they germinate. Can be sown direct or started in modules for transplanting.`},
        {title:'Thin to final spacing', text:`Thin to 20–30cm for full-sized plants. Use the thinnings raw in salads — they are delicious.`},
        {title:'Cut-and-come-again', text:`Harvest outer leaves regularly, working from the outside in. Always leave the central growing point intact — it continues to produce new leaves for months.`},
        {title:'Protect in severe frost', text:`Chard is hardy to about -10°C but repeated hard frost damages outer leaves. Cover with fleece in severe weather — the inner leaves will continue to be harvestable through winter.`},
        {title:'Allow to re-grow in spring', text:`Second-year plants re-grow vigorously in spring before eventually flowering. Let them regrow for a final spring harvest before replacing.`}
      ],
      varieties:[
        {name:'Rainbow Chard', agm:false, desc:'Mixed stems in red, yellow, orange, white and pink. Ornamental and productive.'},
        {name:'Bright Lights', agm:false, desc:'Similar to Rainbow but with particularly vivid, reliable colours.'},
        {name:'Fordhook Giant', agm:false, desc:'White-stemmed Swiss chard. Very large leaves. Excellent for cooking.'},
        {name:'Rhubarb Chard', agm:false, desc:'Deep crimson stems and dark green leaves. Strikingly beautiful.'}
      ],
      warning:`Chard is almost entirely problem-free, making it one of the best plants for new gardeners. The main issue is bolting in dry heat — water consistently during dry spells and it will rarely run to seed in the first year.`
    },
    {
      id:'chicory', icon:'🥗', name:'Chicory', tag:'Bitter Leaf', latin:'Cichorium intybus',
      difficulty:2, sow:'May–Jul (direct)', harvest:'Sep–Mar (forced: Nov–Feb)', position:'Full sun', spacing:'25–30cm',
      desc:`Chicory provides salad leaves in the lean autumn and winter months when little else is available. The red types (radicchio) are ornamental as well as delicious. Witloof chicory can be forced indoors in winter to produce the pale, tender chicons used in cooking.`,
      steps:[
        {title:'Sow in early summer', text:`Sow thinly in shallow drills May–July. Thinning to 25–30cm apart. Avoid sowing too early — chicory that matures in autumn rather than summer gives a much better result.`},
        {title:'Leave through autumn', text:`The plants bolt and look tatty in summer — ignore this. The basal rosette that develops in autumn is the edible part. Red types develop their colour as temperatures drop.`},
        {title:'Harvest radicchio and sugarloaf as heads', text:`Cut Sugarloaf and radicchio heads when firm, from October onwards. They stand through light frosts and continue to produce new leaves from the base.`},
        {title:'Force Witloof for chicons', text:`In November, dig up Witloof roots and cut leaves to 2–3cm. Pack roots upright in a large pot of compost, cover with another pot to exclude all light, and keep at 10–18°C. Pale, tender chicons emerge in 3–4 weeks.`},
        {title:'Harvest chicons', text:`Cut chicons when 10–15cm tall. The root will produce a second, smaller chicon before exhausting itself.`}
      ],
      varieties:[
        {name:'Palla Rossa', agm:false, desc:'Classic red radicchio. Intensely coloured in cold weather. Rich bitter flavour.'},
        {name:'Witloof', agm:false, desc:'The classic forcing chicory for producing pale chicons indoors in winter.'},
        {name:'Sugarloaf', agm:false, desc:'Large, pale green cone-shaped heads. Sweeter than radicchio. Very hardy.'},
        {name:'Red Treviso', agm:false, desc:'Long, elegant red leaves. Earlier colouring than roundhead types.'}
      ],
      warning:`Slugs are the main problem early in the season. Chicory becomes considerably more slug-resistant as it matures. Protect seedlings and young plants but once established it is largely trouble-free.`
    },
    {
      id:'fennel', icon:'🌿', name:'Florence Fennel', tag:'Aniseed Luxury', latin:'Foeniculum vulgare (Azoricum)',
      difficulty:3, sow:'Jun–Jul (direct only)', harvest:'Aug–Oct', position:'Full sun, warm, well-drained', spacing:'25–30cm',
      desc:`Florence fennel produces a swollen, aniseed-flavoured bulb at the base of its feathery foliage. Roasted or raw in salads, it is one of the great Italian kitchen vegetables. It bolts at the slightest provocation, which makes timing everything.`,
      steps:[
        {title:'Sow only in summer', text:`Florence fennel bolts almost inevitably from spring sowings. Do not sow before mid-June. July sowings give the most reliable results as shortening days reduce bolt pressure.`},
        {title:'Sow direct only', text:`Florence fennel does not transplant well — root disturbance triggers bolting. Always sow direct into the final bed.`},
        {title:'Thin carefully', text:`Thin progressively to 25–30cm. Do not let plants become crowded — competition stress also triggers bolting.`},
        {title:'Earth up as bulbs swell', text:`When the bulb begins to swell above the soil surface, draw soil up around it to blanch the base. This makes the bulb whiter, sweeter, and more tender.`},
        {title:'Harvest before frost', text:`Harvest when bulbs are the size of a tennis ball. They do not tolerate hard frost — harvest by October in most of the UK, or cover with fleece.`}
      ],
      varieties:[
        {name:'Romanesco', agm:true, desc:'The most reliable bolt-resistant variety. Large, round, white bulbs.'},
        {name:'Zefa Fino', agm:true, desc:'Outstanding bolt resistance. The benchmark variety for UK conditions.'},
        {name:'Orion F1', agm:false, desc:'Very uniform, large bulbs. Good for late sowings.'},
        {name:'Finale', agm:false, desc:'Bred for autumn production. Very good bolting resistance.'}
      ],
      warning:`Bolting (running to seed before forming a bulb) is the main problem. It is caused by cold spells, root disturbance, drought, or early sowing. If plants bolt, let them flower — the flowers attract beneficial insects and the seeds can be used as a culinary spice.`
    },
    {
      id:'celery', icon:'🥬', name:'Celery', tag:'Demanding But Worth It', latin:'Apium graveolens',
      difficulty:3, sow:'Feb–Apr (indoors)', harvest:'Aug–Nov', position:'Full sun, moisture-retentive', spacing:'30cm',
      desc:`Celery is one of the most demanding crops in the kitchen garden — it requires warmth to germinate, a long growing season, consistent moisture, and feeding — but a home-grown celery head harvested crisp from the garden has a flavour and texture entirely unlike anything sold commercially.`,
      steps:[
        {title:'Sow at the right temperature', text:`Sow thinly on the surface of moist compost in Feb–Apr at 15–18°C. Do not cover — celery seeds need light to germinate. Germination takes 2–3 weeks.`},
        {title:'Prick out carefully', text:`When large enough to handle, prick out into individual modules. Grow on slowly indoors until temperatures are reliably above 10°C overnight.`},
        {title:'Harden off slowly', text:`Expose to outdoor conditions gradually over 2–3 weeks from May. Cold exposure below 10°C for extended periods causes bolting — be patient.`},
        {title:'Plant into rich, moist soil', text:`Plant out in June into deeply dug, compost-rich soil that retains moisture well. Space 30cm apart in each direction. Water in thoroughly.`},
        {title:'Feed and water consistently', text:`Water generously — never let the soil dry out. Feed every 2–3 weeks with a balanced liquid fertiliser. Dry conditions produce hollow, bitter, stringy stems.`},
        {title:'Self-blanching or trench blanch', text:`Self-blanching varieties: plant in a block to shade the inner stems. Trench varieties: earth up gradually as stems grow, or wrap with cardboard collars to blanch the stems white.`}
      ],
      varieties:[
        {name:'Victoria F1', agm:true, desc:'Self-blanching. Excellent flavour. Very reliable. The top UK variety.'},
        {name:'Golden Self-blanching', agm:false, desc:'Heritage variety. Yellow-green stems. Mild, sweet flavour.'},
        {name:'Giant Red', agm:false, desc:'Trench type. Pink-red stems. Very good flavour, hardier than white types.'},
        {name:'Loretta F1', agm:false, desc:'Self-blanching. Compact, dense. Good disease resistance.'}
      ],
      warning:`Celery leaf miner creates blistered, browning foliage from June onwards. Pick off affected leaves promptly and cover with fine mesh from planting. Slugs also attack young plants relentlessly — protect with nematode treatments.`
    },
    {
      id:'globeartichoke', icon:'🌸', name:'Globe Artichokes', tag:'Perennial Delicacy', latin:'Cynara cardunculus (Scolymus)',
      difficulty:2, sow:'Mar–Apr (indoors) or plant offsets Apr–May', harvest:'Jun–Aug (from year 2)', position:'Full sun, well-drained, sheltered', spacing:'90cm–1.2m',
      desc:`Globe artichokes are one of the most architecturally beautiful and rewarding plants in the kitchen garden. The enormous silvery-grey thistle plants are spectacular all season, and the tender flower buds — boiled and dipped in butter — are a genuine luxury.`,
      steps:[
        {title:'Start from offsets or seed', text:`Offsets (rooted side-shoots) from existing plants are the fastest and most reliable method — available in April–May. From seed: sow Mar–Apr indoors at 18°C, pot on, and plant out in June.`},
        {title:'Plant into rich, well-drained soil', text:`Prepare a large planting hole with generous compost. Globe artichokes are perennials that will occupy the same spot for 5–10 years — invest in good preparation.`},
        {title:'No harvest in year one', text:`Let the plant establish in the first year without harvesting. It will typically not produce significant buds anyway. Water and weed through the first season.`},
        {title:'Harvest buds before opening', text:`From year two, harvest the central bud first when plump and tight before any purple shows at the tip. Cut with a 10cm stem. Secondary buds then develop on side shoots.`},
        {title:'Cut back after harvest', text:`After the last buds are harvested, cut all stems back to 30cm. The plant will regenerate from the base.`},
        {title:'Winter protection', text:`In cold areas, cut dead foliage back in November and cover the crown with a thick mulch of straw or compost. Uncover in March.`}
      ],
      varieties:[
        {name:'Green Globe', agm:false, desc:'The classic globe artichoke. Large heads, excellent flavour.'},
        {name:'Purple Globe', agm:false, desc:'Smaller, more tender heads. Slightly nuttier flavour. Very ornamental.'},
        {name:'Violetto di Chioggia', agm:false, desc:'Italian heritage. Elongated purple buds. Mild, sweet flavour.'},
        {name:'Gros Vert de Laon', agm:false, desc:'Large green heads. Traditional French variety. Very productive.'}
      ],
      warning:`Globe artichokes are completely hardy but resent waterlogging in winter — ensure excellent drainage. In their second year they spread widely; allow a generous 1.2m spacing from the outset. Blackfly can colonise bud stems — blast off with water or apply insecticidal soap promptly.`
    },
    {
      id:'endive', icon:'🥬', name:'Endive', tag:'Bitter Salad Classic', latin:'Cichorium endivia',
      difficulty:2, sow:'Jun–Aug (direct or modules)', harvest:'Sep–Dec', position:'Full sun or part shade', spacing:'25–30cm',
      desc:`Endive is one of the most valuable autumn and winter salad crops — hardy, productive, and providing a pleasantly bitter flavour when most salad beds are empty. It comes in two distinct forms: the finely cut, frizzy Frisée and the broad-leaved Batavian (escarole), both of which can be blanched to reduce bitterness.`,
      steps:[
        {title:'Sow in midsummer', text:`Sow thinly in shallow drills June–August for autumn and winter harvests. Spring sowings tend to bolt prematurely. Modules work well — sow 2 seeds per module and thin to the strongest.`},
        {title:'Thin or transplant to final spacing', text:`Thin direct sowings to 25–30cm. Transplant module-raised plants at the same spacing. Firm in well and water thoroughly.`},
        {title:'Blanch to reduce bitterness', text:`Two weeks before harvest, blanch hearts by placing an upturned plate, bowl, or the plant's own tied outer leaves over the centre. Light exclusion turns the inner leaves pale, tender and much sweeter.`},
        {title:'Harvest the heart', text:`Cut the blanched heart when it is dense and pale — typically after 10–14 days of blanching. Outer leaves can be harvested as cut-and-come-again before blanching begins.`},
        {title:'Protect from frost', text:`Endive tolerates light frost but heavy freezing destroys the leaves. Cover with a cloche or cold frame in November to extend the season well into December.`}
      ],
      varieties:[
        {name:'Frisée Fine Maraîchère', agm:false, desc:'Classic frizzy-leaved type. Fine, deeply cut leaves. Beautiful as a garnish. Blanches well.'},
        {name:'Ione', agm:false, desc:'Frisée type. Good mildew resistance. Self-blanching tendency. Reliable cropper.'},
        {name:'Bubikopf', agm:false, desc:'Batavian/escarole. Broad, smooth leaves. Larger head. More cold-tolerant than frisée.'},
        {name:'Très Fine Maraîchère', agm:false, desc:'The finest-cut frisée. Exceptional texture. Traditional French market variety.'}
      ],
      warning:`Endive bolts readily from spring sowings — always wait until mid-June to sow. Slugs and snails can decimate young plants. Protect seedlings with netting or slug controls until they are established.`
    },
    {
      id:'cornsalad', icon:'🌿', name:'Corn Salad (Mâche)', tag:'Winter Salad Hero', latin:'Valerianella locusta',
      difficulty:1, sow:'Aug–Sep (for winter) or Mar–Apr (for spring)', harvest:'Oct–Apr', position:'Sun or shade', spacing:'10cm',
      desc:`Corn salad (also known as mâche or lamb's lettuce) is the hardiest and most reliable salad crop you can grow through winter. Small, rosette-forming plants with a mild, slightly nutty flavour, they thrive in conditions that would kill any other salad leaf and require virtually no attention.`,
      steps:[
        {title:'Sow directly in late summer', text:`Sow thinly in short drills 1cm deep from August to September. This is the key sowing window for winter harvests. March–April sowings give spring harvests but the plants are smaller.`},
        {title:'No thinning needed for cut-and-come-again', text:`For cutting individual leaves, no thinning is needed — simply broadcast-sow and harvest from above. For whole rosettes, thin to 10cm.`},
        {title:'Almost no care required', text:`Corn salad is genuinely self-sufficient. It needs no feeding, minimal watering (it copes with winter rainfall), and is naturally resistant to most pests and diseases.`},
        {title:'Harvest whole rosettes or individual leaves', text:`From October to April, pick whole rosettes at the base or harvest outer leaves. The plants continue producing new growth through the mildest winter days.`},
        {title:'Allow to self-seed', text:`Let a few plants run to seed in spring — corn salad self-seeds prolifically and will provide a perpetual free supply in any undisturbed corner of the plot.`}
      ],
      varieties:[
        {name:'Verte de Cambrai', agm:false, desc:'The classic French variety. Small, dark green rosettes. Exceptional cold tolerance.'},
        {name:'Elan', agm:false, desc:'Larger-leaved. Faster-growing. More productive than heritage types. Good flavour.'},
        {name:'Coquille de Louviers', agm:false, desc:'Spoon-shaped, cupped leaves. Attractive and distinctive. Good autumn flavour.'},
        {name:'Cavallo', agm:false, desc:'Large-leaved Dutch type. Heavy yields. Good mildew resistance.'}
      ],
      warning:`Corn salad is almost entirely problem-free — this is part of its great value. The only real enemy is slugs on very young seedlings in early autumn. Once established the rosettes are tough and slug-resistant. Self-seeding can become prolific if plants are allowed to set seed freely — collect or remove seed heads if this is a concern.`
    },
    {
      id:'mizuna', icon:'🌿', name:'Mizuna & Mibuna', tag:'Oriental Salad Leaf', latin:'Brassica rapa (Nipposinica)',
      difficulty:1, sow:'Mar–Sep (direct or modules)', harvest:'5–8 weeks after sowing', position:'Sun or part shade', spacing:'20–30cm (or scatter for baby leaf)',
      desc:`Mizuna is one of the most valuable and versatile oriental salad crops — fast, hardy, productive over a very long season, and providing a mild, slightly peppery flavour that lifts any mixed salad bowl. Mibuna is its close cousin with longer, more strap-shaped leaves and a stronger flavour.`,
      steps:[
        {title:'Sow successionally throughout the season', text:`Sow in short rows every 3–4 weeks from March to September for a continuous supply. Mizuna is reliable in spring and particularly outstanding in autumn when flavour is best and bolting is not an issue.`},
        {title:'Sow direct or in modules', text:`Broadcast-sow for baby leaves (harvest at 8–10cm). For larger plants, sow in rows and thin to 20–30cm. Module-sowing and transplanting reduces flea beetle damage on seedlings.`},
        {title:'Cover against flea beetle', text:`Flea beetle is the main threat — tiny shothole damage on leaves appears very rapidly. Grow under fine mesh (0.8mm) especially for spring and summer sowings when beetle pressure is highest.`},
        {title:'Cut-and-come-again repeatedly', text:`Cut plants 3–5cm above the soil surface. Mizuna is one of the most productive cut-and-come-again crops — each plant regrows 3–5 times before quality declines.`},
        {title:'Autumn sowings for best flavour', text:`August–September sowings produce the finest-flavoured mizuna — cool weather concentrates the mild peppery oils and the plants grow more slowly, giving tender, delicate leaves.`}
      ],
      varieties:[
        {name:'Mizuna Early', agm:false, desc:'The standard variety. Feathery, deeply cut leaves. Mild, fresh flavour. Very fast.'},
        {name:'Red Frills', agm:false, desc:'Deeply cut leaves with red-purple colouring. Stunning in salads. Slightly stronger flavour.'},
        {name:'Mibuna', agm:false, desc:'Strap-shaped leaves. Stronger, more mustard-like flavour than mizuna. Excellent for cooking.'},
        {name:'Kyona', agm:false, desc:'Broad-leaved mizuna. Larger leaves, milder flavour. Ideal for baby leaf production.'}
      ],
      warning:`Flea beetle is the primary pest — this is common to all oriental brassicas. Fine insect mesh is the most reliable protection and allows harvest throughout the season without chemical intervention. Mizuna bolts rapidly in midsummer heat — make short, frequent sowings rather than large single sowings.`
    },
    {
      id:'gardencress', icon:'🌱', name:'Garden Cress', tag:'Fastest Crop of All', latin:'Lepidium sativum',
      difficulty:1, sow:'Year-round (indoors on damp tissue or soil)', harvest:'4–7 days after sowing', position:'Windowsill, greenhouse or direct outdoors', spacing:'Scatter-sow densely',
      desc:`Garden cress is the fastest food crop you can possibly grow — ready to eat in just 4–7 days from sowing. The peppery, distinctive flavour of mustard and cress is beloved in egg sandwiches and salads. It can be grown on a wet paper towel, a windowsill, or directly in the garden throughout the growing season.`,
      steps:[
        {title:'Sow densely on damp tissue or soil', text:`For windowsill growing: scatter seeds thickly on damp paper towel or kitchen roll in a shallow tray. Keep moist. For outdoor growing: scatter thinly in a shallow drill, cover lightly, and water gently.`},
        {title:'Keep moist and in good light', text:`The only requirement is moisture and some light. Seeds germinate in 1–2 days. Move to a bright windowsill or outdoors once sprouted.`},
        {title:'Harvest with scissors', text:`Cut with scissors just above the growing medium when seedlings are 5–8cm tall — typically 4–7 days for indoor cress, 7–10 days outdoors. Cut the whole crop at once for the best texture.`},
        {title:'Sow in succession', text:`A small sowing every week provides a continuous supply. Start a new tray every 5–6 days to ensure fresh cress is always ready. Three or four trays at staggered stages is ideal.`},
        {title:'Grow outdoors for larger harvests', text:`Outdoors in the garden, garden cress grows larger and the leaves develop more complex flavour. Sow in short rows every 2 weeks from April to September.`}
      ],
      varieties:[
        {name:'Plain Cress', agm:false, desc:'Standard curly-leaved type. Classic peppery flavour. The most common.'},
        {name:'Curled Cress', agm:false, desc:'Finely curled leaves. Very decorative as a garnish. Mild flavour.'},
        {name:'Broad-Leaved Cress', agm:false, desc:'Larger, flatter leaves. Stronger flavour. Good for outdoor growing.'},
        {name:'Persian Cress', agm:false, desc:'Heritage type. Rich, complex peppery flavour. Slightly slower to mature.'}
      ],
      warning:`Garden cress is virtually problem-free when grown indoors. Outdoors it can attract flea beetle — use fine mesh or grow as a cut-and-use-immediately crop rather than leaving it to stand for long. Always keep the growing medium moist — if it dries out even briefly, seedlings wilt and die.`
    },
    {
      id:'sorrel', icon:'🌿', name:'Sorrel', tag:'Perennial Sour Leaf', latin:'Rumex acetosa / R. scutatus',
      difficulty:1, sow:'Sow Mar–May (direct) or plant divisions spring/autumn', harvest:'Mar–Nov (perennial)', position:'Sun or part shade', spacing:'30cm',
      desc:`Sorrel is one of the most underrated perennial vegetables in the British garden. Its intensely lemony, sharp, acidic leaves are superb in soup (the classic French soupe à l'oseille), stirred into cream sauces, wilted with fish, or used sparingly in salads. It appears every spring without any effort — a permanent, low-maintenance crop.`,
      steps:[
        {title:'Sow direct or plant divisions', text:`Sow seeds 1cm deep in March–May. Sorrel is extremely easy from seed. Alternatively, buy a plant or beg a division from a friend — established clumps divide readily in spring and autumn.`},
        {title:'Choose a permanent spot', text:`Sorrel is a perennial that returns every year. Choose a position where it can remain undisturbed. It tolerates partial shade well — useful for filling a difficult spot.`},
        {title:'Harvest outer leaves regularly', text:`Pick outer leaves from March onwards, working inward. The central growing crown produces new leaves continuously. The younger, smaller leaves are milder; older leaves become more strongly acidic.`},
        {title:'Remove flower stems promptly', text:`Cut out flower stems as soon as they appear (June–July). Flowering dramatically reduces leaf production and makes the remaining leaves more bitter and coarse.`},
        {title:'Divide every 3 years', text:`Clumps become congested and less productive after 3–4 years. Divide in spring or autumn, replanting the freshest outer sections and discarding the woody centre.`}
      ],
      varieties:[
        {name:'Common Sorrel', agm:false, desc:'Rumex acetosa. Large, arrow-shaped leaves. Very sharp and sour. Most productive.'},
        {name:'Buckler-Leaved Sorrel', agm:false, desc:'Rumex scutatus. Smaller, shield-shaped leaves. Milder, more delicate flavour.'},
        {name:'Red-Veined Sorrel', agm:false, desc:'Striking red veins on green leaves. More ornamental. Mild, lemony flavour.'},
        {name:'Blood Sorrel', agm:false, desc:'Deep red-purple leaves. Very ornamental. Good in salads as a visual contrast.'}
      ],
      warning:`Sorrel leaves contain oxalic acid — the same compound that gives spinach and rhubarb their characteristic taste. It is perfectly safe in normal culinary quantities but should be avoided in large amounts by people with kidney stones, gout, or rheumatism. Never cook in aluminium pans — oxalic acid reacts with aluminium and ruins the colour and flavour.`
    }
  ],
  herbs: [
    {
      id:'basil', icon:'🌿', name:'Basil', tag:'Summer Essential', latin:'Ocimum basilicum',
      difficulty:2, sow:'Apr–Jun (indoors)', harvest:'Jun–Sep', position:'Full sun, warm & sheltered', spacing:'20cm',
      desc:`The smell of summer itself. Basil is frost-tender and temperature-sensitive, but a few pots on a sunny windowsill or warm patio will provide leaves all summer.`,
      steps:[
        {title:'Sow indoors', text:`Sow on the surface of moist compost in Apr–May. Do not cover — seeds need light to germinate. Keep at 20°C+.`},
        {title:'Keep warm always', text:`Basil dies when chilled. Never put outdoors until night temperatures are reliably above 15°C (late June in the UK).`},
        {title:'Pinch out flowering tips', text:`As soon as flower buds appear, pinch them off. Flowering makes the leaves smaller and more bitter. Do this every week.`},
        {title:'Water from below', text:`Stand pots in a saucer and water into the saucer. Overhead watering causes downy mildew and root rot.`}
      ],
      varieties:[
        {name:'Sweet Genovese', agm:true, desc:'The classic Italian basil. Best for pesto.'},
        {name:'Greek Basil', agm:false, desc:'Tiny leaves on a compact mound. Very decorative.'},
        {name:'Purple Ruffles', agm:false, desc:'Dramatic dark purple, slightly spicy.'},
        {name:'Thai Basil', agm:false, desc:'Aniseed flavour. Essential for South-East Asian cooking.'}
      ],
      warning:`Basil is extremely cold-sensitive. Even a single cold night below 10°C can cause irreversible blackening of leaves.`
    },
    {
      id:'mint', icon:'🌱', name:'Mint', tag:'Vigorous', latin:'Mentha spp.',
      difficulty:1, sow:'Division or cuttings (Mar–Sep)', harvest:'Apr–Oct', position:'Sun or shade, moist soil', spacing:'Grow in containers',
      desc:`Grow mint — but always in a pot. Left loose in the ground, it will colonise your entire plot within a season. Contained, it\'s a magnificent, fragrant, near-indestructible herb.`,
      steps:[
        {title:'Plant in a container', text:`Sink a large pot (at least 30cm) into the ground to contain the roots, or grow entirely in a pot. Never plant directly in an open bed.`},
        {title:'Divide each spring', text:`Mint becomes congested quickly. Divide the root mass each spring and replant the freshest, most vigorous sections.`},
        {title:'Cut back after flowering', text:`Cutting stems to the ground after flowering encourages a fresh flush of tender new growth.`},
        {title:'Water freely', text:`Mint loves moisture. Keep the compost consistently moist, especially in hot weather.`}
      ],
      varieties:[
        {name:'Spearmint', agm:false, desc:'The most versatile culinary mint. Classic mint sauce.'},
        {name:'Peppermint', agm:false, desc:'Strong and cooling. Best for teas and drinks.'},
        {name:'Apple Mint', agm:false, desc:'Woolly leaves, mild flavour. Excellent for mojitos.'},
        {name:'Chocolate Mint', agm:false, desc:'Subtle chocolate note. Great in desserts and cocktails.'}
      ],
      warning:`Mint rust (orange powdery pustules) can infect plants. Remove and bin affected leaves; do not compost.`
    },
    {
      id:'chive', icon:'💜', name:'Chives', tag:'Easy Perennial', latin:'Allium schoenoprasum',
      difficulty:1, sow:'Mar–Apr (seed) or division (Mar)', harvest:'Mar–Nov', position:'Sun or part shade', spacing:'20–30cm',
      desc:`The most reliable and self-sufficient herb in the garden. Chives come back every year, produce pretty purple flowers that bees love, and ask for almost nothing in return.`,
      steps:[
        {title:'Sow or plant', text:`Sow seeds in modules in Mar–Apr, or divide an existing clump and replant sections 20cm apart.`},
        {title:'Cut to encourage regrowth', text:`Cutting chives to 5cm above the ground triggers a fresh flush of young growth. Do this 2–3 times per season.`},
        {title:'Allow some flowers', text:`The purple flowers are edible and make beautiful garnishes. Leave some to flower for bees, then cut back after flowering.`},
        {title:'Divide every 2–3 years', text:`Clumps become congested over time. Dig up, split into sections, and replant to rejuvenate.`}
      ],
      varieties:[
        {name:'Common Chives', agm:false, desc:'Fine, hollow stems. Classic onion flavour. Hardy.'},
        {name:'Garlic Chives', agm:false, desc:'Flat leaves with a mild garlic flavour. White flowers.'},
        {name:'Giant Siberian', agm:false, desc:'Larger than common chives. Bold growth.'}
      ],
      warning:`Chives are largely trouble-free. Downy mildew can appear in very humid conditions — improve spacing if this occurs.`
    },
    {
      id:'parsley', icon:'🌱', name:'Parsley', tag:'Kitchen Must-Have', latin:'Petroselinum crispum',
      difficulty:2, sow:'Mar–Jul (indoors or direct)', harvest:'Jun–Mar (if protected)', position:'Sun or part shade', spacing:'20cm',
      desc:`One of the most-used herbs in the kitchen and one that grows beautifully in the garden. Parsley is notoriously slow to germinate — patience is the only skill required.`,
      steps:[
        {title:'Sow with warm water', text:`Pour boiling water along the drill before sowing to warm the soil — this speeds up the notoriously slow germination (3–6 weeks).`},
        {title:'Sow successionally', text:`Parsley is biennial — it flowers and dies in its second year. Sow a new batch each year for continuous supply.`},
        {title:'Keep moist', text:`Never let the soil dry out during germination or the seeds abort. Keep consistently moist.`},
        {title:'Protect in winter', text:`Cover with a cloche or fleece for continued harvesting through winter. Flat-leaf types are less hardy than curled.`}
      ],
      varieties:[
        {name:'Flat-leaf (French)', agm:false, desc:'Stronger flavour, preferred for cooking. Less hardy.'},
        {name:'Moss Curled', agm:false, desc:'Frilly, decorative, very hardy. Classic garnish type.'},
        {name:'Hamburg Rooted', agm:false, desc:'Grown for its parsnip-like root as well as its leaves.'}
      ],
      warning:`Parsley is very slow to germinate — 3 to 6 weeks is normal. Do not give up and re-sow too soon; the original seeds will eventually appear.`
    },
    {
      id:'rosemary', icon:'🌿', name:'Rosemary', tag:'Hardy Perennial', latin:'Salvia rosmarinus',
      difficulty:1, sow:'Buy as plant or take cuttings Apr–Sep', harvest:'Year-round', position:'Full sun, well-drained', spacing:'60–90cm',
      desc:`Rosemary is one of the most aromatic and architectural herbs in the garden. It's fully hardy, evergreen, and provides fresh sprigs year-round — even in the depths of winter.`,
      steps:[
        {title:'Buy or propagate', text:`Easiest to buy as a young plant. To propagate, take 10cm semi-ripe cuttings in summer, strip lower leaves, and root in gritty compost.`},
        {title:'Plant in full sun and sharp drainage', text:`Rosemary hates waterlogged soil. Plant in the sunniest, most free-draining spot you have. On heavy clay, add grit or grow in a raised bed.`},
        {title:'Prune after flowering', text:`Trim lightly after the blue flowers fade in spring to keep the plant bushy and compact. Never cut back into old, bare wood.`},
        {title:'Harvest anytime', text:`Snip young shoot tips throughout the year. The flavour is best in summer but usable year-round.`}
      ],
      varieties:[
        {name:'Miss Jessopp Upright', agm:false, desc:'Tall, architectural. The classic culinary rosemary.'},
        {name:'Prostratus', agm:false, desc:'Trailing form. Beautiful over walls. Less hardy.'},
        {name:'Tuscan Blue', agm:false, desc:'Upright, vigorous, strong-flavoured. Restaurant favourite.'},
        {name:'Majorca Pink', agm:false, desc:'Pink-flowered. Slightly less hardy than blue types.'}
      ],
      warning:`Rosemary beetle (metallic green and purple) can defoliate plants. Pick off adults and larvae by hand — they're large enough to spot easily.`
    },
    {
      id:'thyme', icon:'🌱', name:'Thyme', tag:'Low Maintenance', latin:'Thymus vulgaris',
      difficulty:1, sow:'Buy as plant or sow Mar–May', harvest:'Year-round (best May–Sep)', position:'Full sun, well-drained', spacing:'30cm',
      desc:`Thyme is the most effortless herb in the garden — drought-tolerant, compact, evergreen, and packed with aromatic oils. It loves poor, dry soil and full sun, asking for almost nothing.`,
      steps:[
        {title:'Plant in sun and poor soil', text:`Thyme thrives in conditions that would stress other plants. Rich, moist soil causes soft, disease-prone growth with poor flavour.`},
        {title:'Trim after flowering', text:`Cut back by a third after the pretty pink/purple flowers fade. This prevents the plant becoming woody and leggy.`},
        {title:'Replace every 3–4 years', text:`Thyme becomes increasingly woody with age. Take cuttings in summer and replace old plants regularly.`},
        {title:'Harvest regularly', text:`Pick shoot tips regularly — this actually encourages the plant to produce more fresh growth with better flavour.`}
      ],
      varieties:[
        {name:'Common Thyme', agm:false, desc:'The culinary standard. Strong, classic flavour.'},
        {name:'Lemon Thyme', agm:false, desc:'Citrus-scented. Excellent with fish and chicken.'},
        {name:'Silver Posie', agm:false, desc:'Silver-edged leaves. Ornamental and aromatic.'},
        {name:'Creeping Thyme', agm:false, desc:'Ground-covering form. Releases scent when walked on.'}
      ],
      warning:`Thyme is very vulnerable to waterlogging in winter. Ensure perfect drainage — a raised bed or terracotta pot is ideal in heavy soils.`
    },
    {
      id:'oregano', icon:'🌿', name:'Oregano & Marjoram', tag:'Mediterranean Essential', latin:'Origanum vulgare / O. majorana',
      difficulty:1, sow:'Buy as plant or sow Apr–May indoors', harvest:'May–Oct (fresh) · Jul–Aug (dried)', position:'Full sun, well-drained', spacing:'30–45cm',
      desc:`Oregano is the herb of pizza and pasta — warm, aromatic, and intensely flavoured when dried. Greek and Italian cuisine are built on it. Easy to grow, nearly indestructible once established, and one of the most productive herbs per square centimetre in the garden.`,
      steps:[
        {title:'Plant in full sun and poor soil', text:`Like thyme, oregano is a Mediterranean herb that thrives in lean, free-draining, alkaline soil and full sun. Rich, moist soil produces lush but flavourless growth.`},
        {title:'Sow or buy as plants', text:`Sow seeds on the surface of compost in April–May indoors — seeds need light to germinate. Or simply buy one plant in spring; it will spread to fill its space within a season.`},
        {title:'Harvest shoots regularly', text:`Pinch out the growing tips regularly. This delays flowering, prolongs the harvest season, and keeps the plant bushy. The more you pick, the more it grows.`},
        {title:'Dry at peak flavour', text:`Cut long stems in July–August just before the flowers fully open — this is when essential oil content (and therefore flavour) is at its highest. Tie in bunches and hang upside down in a warm, airy place for 2–3 weeks.`},
        {title:'Cut back in autumn', text:`Cut all stems back to 5cm in October. This prevents the plant becoming too woody and encourages a good flush of fresh growth the following spring.`}
      ],
      varieties:[
        {name:'Common Oregano', agm:false, desc:'Vigorous, spreading. Strong flavour when dried. Classic culinary type.'},
        {name:'Greek Oregano', agm:false, desc:'Stronger, more pungent than common oregano. The authentic pizza herb.'},
        {name:'Sweet Marjoram', agm:false, desc:'Sweeter, more delicate cousin of oregano. Annual in the UK. Excellent fresh.'},
        {name:'Golden Oregano', agm:false, desc:'Gold-leaved ornamental form. Milder flavour. Beautiful in borders.'}
      ],
      warning:`Common oregano can spread aggressively by underground runners. Plant in a container sunk into the ground to control spreading, or divide clumps every 2–3 years to keep it in check.`
    },
    {
      id:'coriander', icon:'🌿', name:'Coriander', tag:'Bolt-Prone but Worth It', latin:'Coriandrum sativum',
      difficulty:2, sow:'Mar–Aug (direct, successional)', harvest:'6–8 weeks after sowing', position:'Sun or part shade', spacing:'15cm (or scatter-sow)',
      desc:`Coriander is one of the most used herbs in global cooking — Indian, Thai, Mexican, and Middle Eastern cuisines depend on it. Growing your own delivers a freshness and intensity that shop-bought bunches (chilled, stressed, and days old) simply cannot match. The trick is managing its relentless urge to bolt.`,
      steps:[
        {title:'Sow direct only', text:`Coriander is deeply tap-rooted and loathes transplanting — direct sowing is the only reliable method. It bolts almost instantly when roots are disturbed.`},
        {title:'Sow little and very often', text:`Sow a short row every 2–3 weeks from March to August. Each sowing lasts only 4–6 weeks before bolting in summer heat. Frequent succession sowing is the secret to a continuous supply.`},
        {title:'Choose the right time', text:`Avoid sowing during the hottest part of summer (July) — heat triggers immediate bolting. The best sowings are in spring (March–May) and late summer (August–September) when days are cooler and shorter.`},
        {title:'Harvest outer leaves early', text:`Begin harvesting outer leaves when plants are 10–15cm tall. Never strip a plant — take a few leaves and let it continue growing.`},
        {title:'Let some bolt for seeds', text:`Allow a few plants to flower and set seed (coriander seed is a spice in its own right). Collect dry seeds in late summer, or leave them to self-seed prolifically for a free autumn crop.`}
      ],
      varieties:[
        {name:'Leisure', agm:false, desc:'Slow-to-bolt variety bred for leaf production. Best for repeated harvesting.'},
        {name:'Confetti', agm:false, desc:'Very fine, feathery leaves. More delicate appearance. Good flavour.'},
        {name:'Santos', agm:false, desc:'Reliable bolt-resistant type. Good leaf production throughout summer.'},
        {name:'Moroccan (Cilantro)', agm:false, desc:'Grown mainly for seed spice. Vigorous, early to bolt, very aromatic seed.'}
      ],
      warning:`Coriander bolts from any stress — root disturbance, heat, drought, or pot-bound conditions. Never transplant. Grow in the ground rather than containers for best results, and water consistently during dry spells.`
    },
    {
      id:'lemonbalm', icon:'🍋', name:'Lemon Balm', tag:'Vigorous & Calming', latin:'Melissa officinalis',
      difficulty:1, sow:'Sow Apr–May or divide existing plants spring', harvest:'Mar–Oct (best before flowering)', position:'Sun or part shade', spacing:'45–60cm',
      desc:`Lemon balm is a hardy, almost indestructible perennial herb with a fresh, lemony fragrance that fills the air with every touch. The leaves make a calming herbal tea, are delicious in summer drinks and desserts, and attract bees in vast numbers when in flower. The main challenge is containing its vigour.`,
      steps:[
        {title:'Sow or divide', text:`Sow indoors in April at 18°C — seeds germinate in 10–14 days. Alternatively, divide an established clump in spring: simply dig up, split, and replant. Division gives a head start over seed.`},
        {title:'Plant in almost any position', text:`Lemon balm grows in sun or shade, in most soil types. It prefers slightly moist conditions but tolerates some drought once established. The most versatile herb in the garden.`},
        {title:'Harvest before flowering', text:`Pick leaves before the plant flowers in July–August — the flavour is strongest in young leaves before flowering. Once it flowers, the leaves become less aromatic.`},
        {title:'Cut back hard after flowering', text:`Cut the whole plant back to 10cm once it finishes flowering. This prevents unwanted self-seeding and stimulates a fresh flush of fragrant young growth within 2–3 weeks.`},
        {title:'Control spreading', text:`Lemon balm spreads vigorously by both runners and prolific self-seeding. Remove flower heads before seeds ripen to limit spread, or grow in a large sunken container to contain roots.`}
      ],
      varieties:[
        {name:'Common Lemon Balm', agm:false, desc:'The standard species. Very vigorous, strong lemon scent.'},
        {name:'All Gold', agm:false, desc:'Golden-yellow leaves. Less vigorous. Ornamental and aromatic.'},
        {name:'Aurea', agm:false, desc:'Gold-variegated leaves. Slightly milder flavour. Good for containers.'},
        {name:'Quedlinburger Niederliegende', agm:false, desc:'Compact, low-growing form. Good for smaller spaces.'}
      ],
      warning:`Lemon balm self-seeds prolifically and can become a nuisance weed in the garden if allowed to flower and set seed. Remove flower heads as soon as they appear — or enjoy the bees and cut back immediately after flowering.`
    },
    {
      id:'chamomile', icon:'🌼', name:'Chamomile', tag:'Soothing & Bee-Friendly', latin:'Matricaria chamomilla / Chamaemelum nobile',
      difficulty:1, sow:'Sow Mar–May (surface of compost, needs light)', harvest:'Jun–Aug (flowers at peak)', position:'Full sun, well-drained', spacing:'15–30cm',
      desc:`Chamomile is one of the most beautiful and useful herbs in the garden — white daisy flowers with a warm apple scent, beloved by bees, and the source of the world's most comforting herbal tea. German chamomile (annual) is best for tea; Roman chamomile (perennial) makes the famous fragrant chamomile lawn.`,
      steps:[
        {title:'Sow on the surface', text:`Chamomile seeds are tiny and need light to germinate — scatter on the surface of damp compost, press gently, but do not cover. Germinate at 18°C in 7–14 days.`},
        {title:'Thin or transplant carefully', text:`Thin seedlings to 15cm apart for German chamomile, 20–30cm for Roman. Handle seedlings gently — they are delicate when young but become robust quickly.`},
        {title:'Harvest flowers at their peak', text:`Pick flowers when the white petals are fully open and horizontal. This is when the essential oil content is highest. Pick on a dry morning after the dew has dried.`},
        {title:'Dry flowers for tea', text:`Spread freshly picked flowers in a single layer on a rack or tray in a warm, airy place out of direct sun. Dry for 1–2 weeks until completely crisp. Store in an airtight jar away from light.`},
        {title:'Allow to self-seed', text:`German chamomile is a prolific self-seeder — allow some plants to scatter seed and you will have a permanent free supply with no sowing required in subsequent years.`}
      ],
      varieties:[
        {name:'German Chamomile (Matricaria)', agm:false, desc:'Annual. Most aromatic. Best for herbal tea production. Very prolific.'},
        {name:'Roman Chamomile (Chamaemelum)', agm:false, desc:'Perennial. Used for chamomile lawns and seats. More compact.'},
        {name:'Treneague', agm:false, desc:'Non-flowering Roman chamomile. The classic chamomile lawn variety.'},
        {name:'Double-Flowered Roman', agm:false, desc:'Fully double white flowers. Very ornamental. Less aromatic than single forms.'}
      ],
      warning:`German chamomile can self-seed aggressively in bare soil — it is not invasive but may pop up uninvited around the garden. Remove unwanted seedlings when small. Do not confuse ornamental mayweed (Tripleurospermum) with true chamomile — true chamomile has a hollow, cone-shaped receptacle and a distinctive apple fragrance.`
    }
  ],
  fruits: [
    {
      id:'strawberry', icon:'🍓', name:'Strawberries', tag:'Easy & Rewarding', latin:'Fragaria × ananassa',
      difficulty:1, sow:'Plant runners Aug–Sep or buy plants Mar–Apr', harvest:'Jun–Sep', position:'Full sun', spacing:'30–45cm',
      desc:`The taste of summer. Strawberries are perfectly suited to gardens, containers, and hanging baskets. They spread by runners, meaning one purchase can supply plants for years.`,
      steps:[
        {title:'Choose your type', text:`Summer-fruiting varieties crop heavily for 3–4 weeks in June–July. Perpetual types fruit lightly from June right through to October. Choose based on your needs.`},
        {title:'Plant at the right depth', text:`Plant so the crown (the knobby central point) sits exactly at soil level — too deep causes rot, too high causes drying out. Firm in well.`},
        {title:'Water well but avoid wetting fruit', text:`Water at the base, especially once fruits are forming. Wet fruit leads to grey mould (botrytis). In dry spells, water every 2–3 days.`},
        {title:'Protect from birds', text:`A net is essential once berries start colouring. Birds will strip a plant bare overnight. Use hoops to keep netting off the fruit.`},
        {title:'Straw beneath fruits', text:`Tuck straw or a strawberry mat under developing fruits to keep them clean, protect from soil splash, and deter slugs.`},
        {title:'Propagate from runners', text:`After fruiting, plants send out long runners with new plantlets. Peg the strongest into small pots of compost. Once rooted (4–6 weeks), cut the runner and plant out.`},
        {title:'Renovate after harvest', text:`Cut all leaves back to 10cm after the last fruit. Remove old straw. This removes pests and disease and encourages strong new growth for next year.`}
      ],
      varieties:[
        {name:'Elsanta', agm:true, desc:'The classic shop-bought type. Heavy-cropping, reliable.'},
        {name:'Cambridge Favourite', agm:true, desc:`Heritage variety. Exceptional old-fashioned flavour.`},
        {name:`Mara des Bois`, agm:false, desc:`Perpetual. Small, intensely flavoured, wild strawberry taste.`},
        {name:'Honeoye', agm:false, desc:'Early, very sweet. One of the first to ripen each season.'}
      ],
      warning:`Vine weevils lay eggs in containers — larvae eat roots and kill plants. Use nematode biological controls in August as prevention.`
    },
    {
      id:'raspberry', icon:'🫐', name:'Raspberries', tag:'British Classic', latin:'Rubus idaeus',
      difficulty:2, sow:'Plant bare-root canes Nov–Mar', harvest:`Jun–Aug (summer) / Sep–Oct (autumn)`, position:'Full sun or part shade', spacing:`45cm in rows 1.8m apart`,
      desc:`Few fruits reward as generously as raspberries. Plant once, harvest for 10+ years. Summer and autumn varieties extend the season from June all the way to October's first frosts.`,
      steps:[
        {title:'Prepare deeply', text:`Raspberries are permanent plantings — dig the bed well and incorporate plenty of compost or rotted manure before planting. They resent waterlogging.`},
        {title:'Plant bare-root canes', text:`Plant canes 45cm apart in rows, spreading roots out horizontally. Plant at the same depth as they were grown — look for the soil mark on the cane.`},
        {title:'Cut to 25cm after planting', text:`Cut all newly planted canes down to 25cm. This hard prune encourages strong new canes from the base in year one. You won\'t get fruit the first year.`},
        {title:'Erect supports', text:`Fix wires horizontally at 60cm, 90cm, and 120cm between sturdy posts. Tie in growing canes as they develop.`},
        {title:'Prune summer varieties correctly', text:`After fruiting, cut all fruited canes to the ground and tie in the current season's new canes for next year. Autumn varieties: cut all canes to the ground in February.`},
        {title:'Mulch annually', text:`Apply a thick mulch of compost or woodchip around the base each spring. This retains moisture, feeds the plants, and suppresses weeds.`}
      ],
      varieties:[
        {name:'Glen Ample', agm:true, desc:'Summer. Heavy-cropping, large berries, spine-free canes.'},
        {name:'Autumn Bliss', agm:true, desc:'Autumn. The most reliable autumn raspberry. Rich flavour.'},
        {name:'Joan J', agm:true, desc:'Autumn. Spine-free. Long season. Excellent for small gardens.'},
        {name:'Tulameen', desc:`Summer. Outstanding flavour — the gourmet's choice.`}
      ],
      warning:`Raspberry beetle grubs can be found inside fruits at harvest. Cultivate around canes in winter to expose pupae to birds and frost.`
    },
    {
      id:'apple', icon:'🍎', name:'Apples', tag:'Long-term Investment', latin:'Malus domestica',
      difficulty:2, sow:'Plant bare-root Nov–Mar', harvest:'Aug–Oct (varies by variety)', position:'Full sun, sheltered from frost', spacing:`Depends on rootstock (1.8m–6m)`,
      desc:`A well-chosen apple tree will feed your family for decades. The key decisions are rootstock (which controls tree size) and pollination group. Get these right and the rest is straightforward.`,
      steps:[
        {title:'Choose the right rootstock', text:`M27 = very dwarf (1.5m), perfect for containers. M9 = dwarf (2.5m), needs staking forever. M26 = semi-dwarf (3.5m). MM106 = semi-vigorous (5m). Choose to match your space.`},
        {title:'Check pollination groups', text:`Most apples need a pollinator in the same or adjacent group. Plant two compatible varieties, or check if a neighbour has an apple tree that could pollinate yours.`},
        {title:'Plant correctly', text:`Dig a wide, shallow hole. Plant at the same depth as the nursery. Stake securely. Water in well and keep watered through the first summer.`},
        {title:'Formative pruning', text:`In the first 3 years, prune to build an open, balanced framework of branches. Remove crossing, rubbing, or inward-growing branches.`},
        {title:'June drop', text:`In early summer, trees shed excess fruitlets naturally. After this, thin remaining fruits to one per cluster for larger, better-quality apples.`},
        {title:'Harvest at the right time', text:`Cup a fruit and gently twist. If it comes away easily, it\'s ready. Early varieties ripen Aug–Sep and don\'t store. Late varieties pick Oct and store through winter.`}
      ],
      varieties:[
        {name:`Cox's Orange Pippin`, desc:'The classic English dessert apple. Superb flavour.'},
        {name:`Bramley's Seedling`, desc:'The king of cooking apples. Keeps until March.'},
        {name:'Discovery', agm:true, desc:'Early season. Bright red, sweet, eat straight off the tree.'},
        {name:'Egremont Russet', agm:true, desc:'Nutty, honeyed flavour. One of the finest eaters.'}
      ],
      warning:`Apple scab (dark, scabby patches) and canker are the main diseases. Choose resistant varieties and prune out infected wood promptly.`
    },
    {
      id:'pear', icon:'🍐', name:'Pears', tag:'Patience Rewarded', latin:'Pyrus communis',
      difficulty:2, sow:'Plant bare-root Nov–Mar', harvest:'Aug–Oct', position:'Warm, sheltered, full sun — south-facing wall ideal', spacing:'3–5m (depends on rootstock)',
      desc:`Pears demand more patience than apples — they take longer to settle and fruit, and need a sheltered, warm spot. But a laden pear tree in September is one of the great garden pleasures.`,
      steps:[
        {title:'Choose a warm wall', text:`Pears flower early and are vulnerable to late frosts. A south- or south-west-facing wall provides warmth and shelter and dramatically improves fruiting.`},
        {title:'Select the right rootstock', text:`Quince A gives a semi-vigorous tree (4–5m). Quince C gives a smaller tree (3m). Most pears are grafted onto quince rootstocks.`},
        {title:'Pollination is critical', text:`Most pears are not self-fertile. Plant two compatible varieties, or choose a self-fertile type like 'Conference' which sets adequately alone.`},
        {title:'Harvest before fully ripe', text:`Unlike apples, pears ripen from the inside out. Pick when the fruit lifts easily off the tree but is still firm, then ripen indoors at room temperature for a few days.`},
        {title:'Store carefully', text:`Store in a cool place, checking frequently. Pears go from perfect to overripe very quickly — they need daily attention when close to ripe.`}
      ],
      varieties:[
        {name:'Conference', agm:true, desc:'The most reliable. Partially self-fertile. Long, green fruit.'},
        {name:'Concorde', agm:true, desc:'Self-fertile. Sweet, smooth-textured. Crops young.'},
        {name:`Williams' Bon Chrétien`, desc:'Classic flavour. Best eaten from the tree in August.'},
        {name:`Doyenné du Comice`, agm:false, desc:'The finest-flavoured pear. Needs a warm spot.'}
      ],
      warning:`Pear leaf blister mite causes red/green blisters on leaves. Remove affected leaves and improve air circulation. Rarely fatal.`
    },
    {
      id:'blueberry', icon:'🫐', name:'Blueberries', tag:'Superfood', latin:'Vaccinium corymbosum',
      difficulty:2, sow:`Plant container-grown plants Mar–Apr or Sep–Oct`, harvest:'Jul–Sep', position:'Full sun', spacing:'1.5m',
      desc:`Blueberries are beautiful in every season — white flowers in spring, blue fruits in summer, and spectacular scarlet foliage in autumn. They do have one firm requirement: acid soil.`,
      steps:[
        {title:'Acid soil is non-negotiable', text:`Blueberries need a soil pH of 4.5–5.5. If your garden soil isn\'t acid, grow in large pots of ericaceous (acid) compost. Do not compromise on this.`},
        {title:'Plant at least two varieties', text:`While technically self-fertile, blueberries fruit far more heavily when cross-pollinated. Plant at least two different varieties together.`},
        {title:'Water with rainwater', text:`Tap water is often alkaline and will gradually raise soil pH, harming the plant. Collect and use rainwater wherever possible.`},
        {title:'Mulch with bark', text:`Mulch generously with pine bark or wood chip, which is slightly acidic and helps maintain the right pH.`},
        {title:'Protect from birds', text:`Birds will strip every berry the moment they ripen. Net the whole bush from when berries start to colour.`},
        {title:'Prune in winter', text:`Remove oldest, darkest stems at the base each winter to encourage productive new growth from the base.`}
      ],
      varieties:[
        {name:'Bluecrop', agm:true, desc:'Mid-season. Heavy-cropping, large berries. Very reliable.'},
        {name:'Earliblue', agm:false, desc:'Early season. Sweet, mild-flavoured. Good in cooler areas.'},
        {name:'Chandler', agm:true, desc:'Very large berries. Exceptional flavour. Mid–late season.'},
        {name:'Pink Lemonade', agm:false, desc:'Unusual pink berries. Striking ornamental value too.'}
      ],
      warning:`If leaves yellow between veins (chlorosis), the soil pH has risen too high. Water with a dilute solution of sulphur chips or switch to ericaceous liquid feed.`
    },
    {
      id:'gooseberry', icon:'🟢', name:'Gooseberries', tag:`Tart & Versatile`, latin:'Ribes uva-crispa',
      difficulty:1, sow:'Plant bare-root Nov–Mar', harvest:'Jun–Aug', position:'Sun or part shade', spacing:`1.2–1.5m`,
      desc:`Underrated and underused, gooseberries are the ultimate low-maintenance fruiting shrub. They tolerate shade, fruit reliably without fuss, and produce magnificent harvests for decades.`,
      steps:[
        {title:'Plant on a short leg', text:`Gooseberries are traditionally grown as an open-centred bush on a short clear stem (a "leg"). This improves air circulation and makes harvesting easier.`},
        {title:'Prune to an open goblet', text:`Each winter, remove crossing or congested branches to maintain an open, goblet-shaped centre. Shorten main branches by a third.`},
        {title:'Feed in early spring', text:`Apply a balanced fertiliser or a good mulch of garden compost around the base in early spring.`},
        {title:'Harvest in two waves', text:`Pick every other fruit in June (small, green, perfect for cooking). Let the remaining fruits swell and ripen to sweet, full-sized gooseberries in July–August.`}
      ],
      varieties:[
        {name:'Invicta', agm:true, desc:'Green. Very heavy-cropping, mildew-resistant. The reliable choice.'},
        {name:`Hinnonmäki Red`, agm:false, desc:'Red. Sweet enough to eat raw. Outstanding flavour.'},
        {name:`Whinham's Industry`, desc:'Red/purple. Old heritage variety. Excellent for jam.'},
        {name:'Careless', agm:false, desc:'Green. The classic culinary gooseberry. Very prolific.'}
      ],
      warning:`Gooseberry sawfly can strip a bush to bare stems in days. Check the centre of the bush for small caterpillars from April and pick them off immediately.`
    },
    {
      id:'blackcurrant', icon:'🖤', name:'Blackcurrants', tag:'Jam & Cordial', latin:'Ribes nigrum',
      difficulty:1, sow:'Plant bare-root Nov–Mar', harvest:'Jul–Aug', position:'Full sun or light shade', spacing:'1.5m',
      desc:`Britain's native superfruit. Blackcurrants are extraordinarily productive, virtually indestructible, and packed with more vitamin C than almost any other crop you can grow.`,
      steps:[
        {title:'Plant deeply', text:`Unlike other soft fruit, plant blackcurrants 5cm deeper than they were grown in the nursery. This encourages more stems to shoot from below ground.`},
        {title:'Hard prune after planting', text:`Cut all stems to within 5cm of the ground after planting. You sacrifice the first year's fruit, but build a much stronger, longer-lived bush.`},
        {title:'Annual renovation pruning', text:`Each winter, cut out a third of the oldest, darkest stems at the base. Blackcurrants fruit on the previous year's wood — keep stems young and productive.`},
        {title:'Harvest in strigs', text:`Pick whole strigs (clusters) rather than individual currants. Strip the berries from the strig in the kitchen.`},
        {title:'Feed generously', text:`Blackcurrants are heavy feeders. Apply a high-nitrogen fertiliser in early spring and a thick mulch of compost to keep growth strong.`}
      ],
      varieties:[
        {name:'Ben Connan', agm:true, desc:'Compact plant. Very large berries. Good mildew resistance.'},
        {name:'Ben Lomond', agm:false, desc:'Reliable, heavy-cropping. The commercial standard.'},
        {name:'Ben Hope', agm:true, desc:'Excellent resistance to big bud mite and mildew.'},
        {name:'Ebony', agm:true, desc:'Very late-ripening. Extends the blackcurrant season into August.'}
      ],
      warning:`Big bud mite causes swollen, rounded buds in spring (normal buds are pointed). Remove and burn affected wood. Choose resistant varieties where possible.`
    },
    {
      id:'rhubarb', icon:'🌹', name:'Rhubarb', tag:'First of the Year', latin:'Rheum × hybridum',
      difficulty:1, sow:'Plant crowns Mar–Apr', harvest:'Mar–Jun', position:'Full sun or light shade', spacing:'90cm',
      desc:`Strictly speaking a vegetable, but used entirely as a fruit. Rhubarb is the first harvest of the year — tangy, vibrant, and deeply welcome after a long winter. Plant once, harvest for 20 years.`,
      steps:[
        {title:'Plant crowns correctly', text:`Plant crowns in spring or autumn with the pink buds just visible at the soil surface. Too deep and they rot; too high and they dry out.`},
        {title:`Don't harvest in year one`, text:`Leave plants completely alone in their first year. This allows them to establish a strong root system that will sustain decades of harvests.`},
        {title:'Force for earlier stalks', text:`In February, cover crowns with a forcing pot, large bucket, or terracotta forcer to exclude all light. Forced stalks emerge pale pink, sweet, and tender — up to 4 weeks earlier.`},
        {title:'Harvest by pulling, not cutting', text:`Grip stalks at the base and pull with a twisting motion. Never cut — leaving a stub can cause rot. Always leave at least 4 stalks per plant.`},
        {title:'Stop harvesting in June', text:`Allow plants to grow freely from June to build energy reserves for next year. Remove any flower stems immediately as they appear.`},
        {title:'Divide every 5–6 years', text:`Lift the crown in autumn and divide with a spade into sections, each with at least one strong bud. Replant the best sections and discard the exhausted centre.`}
      ],
      varieties:[
        {name:'Timperley Early', agm:true, desc:'The earliest to force. Ready as soon as February.'},
        {name:'Victoria', agm:true, desc:'Classic, reliable, heavy-cropping. Good unforced flavour.'},
        {name:'Champagne', agm:false, desc:'Slender, bright red stalks. One of the sweetest varieties.'},
        {name:'Stockbridge Arrow', agm:true, desc:'Very reliable. Thick, deep-red stems. Long season.'}
      ],
      warning:`Do not eat rhubarb leaves — they contain oxalic acid and are toxic. Only the stalks are edible. Composting leaves is fine as cooking destroys the toxins.`
    },
    {
      id:'cherry', icon:'🍒', name:'Cherries', tag:'Summer Treat', latin:'Prunus avium / cerasus',
      difficulty:2, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Jun–Aug', position:'Full sun, sheltered from wind', spacing:'3–6m (or 2.5m on Gisela 5 rootstock)',
      desc:`Few fruits are as dramatically beautiful as a cherry tree in blossom, or as immediately rewarding to eat straight from the branch. Cherries are surprisingly manageable on dwarfing rootstocks and thrive trained as fans against a warm wall.`,
      steps:[
        {title:'Choose your type', text:`Sweet cherries need a warm, sunny spot and a pollination partner (or self-fertile varieties like Stella). Acid cherries (e.g. Morello) are self-fertile and actually prefer a shaded north or east wall — very useful.`},
        {title:'Choose the rootstock', text:`Gisela 5 produces a compact tree (2.5–3m) ideal for smaller gardens. Colt gives a semi-vigorous tree (4–5m). Always stake trees on dwarfing rootstocks permanently.`},
        {title:'Plant and stake', text:`Plant in a generously prepared hole with good drainage. Stake firmly — cherries on dwarfing rootstocks need permanent staking throughout their lives.`},
        {title:'Net against birds', text:`Birds are your biggest enemy. Net the entire tree as soon as the fruit starts to colour, or you will lose everything overnight. Fan-trained trees against a wall are easiest to net.`},
        {title:'Prune only in summer', text:`Never prune cherries in winter — the wounds cannot heal quickly enough and allow bacterial canker and silver leaf disease to enter. Prune lightly in July–August after harvest.`},
        {title:'Harvest promptly', text:`Pick cherries with the stalk attached to extend storage life. Eat within days — they do not keep long once picked.`}
      ],
      varieties:[
        {name:'Stella', agm:true, desc:'Self-fertile sweet cherry. Dark red, rich flavour. Very reliable.'},
        {name:'Sunburst', agm:true, desc:'Large, dark red, self-fertile. Excellent flavour. Compact habit.'},
        {name:'Morello', agm:false, desc:'Acid cherry. Self-fertile. Outstanding for cooking and jam. Tolerates shade.'},
        {name:'Early Rivers', agm:false, desc:'One of the earliest sweet cherries. Pale red, exceptional flavour.'}
      ],
      warning:`Silver leaf disease enters through winter pruning wounds. Always prune in summer (July–August) after leaf is fully out, and paint large cuts with wound sealant.`
    },
    {
      id:'plum', icon:'🟣', name:'Plums & Damsons', tag:'Prolific & Easy', latin:'Prunus domestica',
      difficulty:1, sow:'Plant bare-root Nov–Mar', harvest:'Aug–Oct (plums) / Sep–Oct (damsons)', position:'Full sun, sheltered from spring frosts', spacing:'3–5m (or 2.5m on Pixy rootstock)',
      desc:`One of the most generous and low-maintenance tree fruits you can grow. A good plum in full crop is a spectacular sight — and the problem is usually too much fruit, not too little. Damsons are even tougher and more prolific.`,
      steps:[
        {title:'Choose rootstock', text:`Pixy gives a compact tree (2.5–3m), ideal for smaller gardens but needs good soil. St Julien A is semi-vigorous (3.5–4.5m) and more forgiving of poorer conditions.`},
        {title:'Self-fertile varieties', text:`Many plums are self-fertile (Victoria, Opal, Czar). If space allows, planting two compatible varieties improves cropping significantly.`},
        {title:'Plant in autumn', text:`Bare-root trees planted in autumn establish better than spring. Stake and mulch generously after planting.`},
        {title:'Thin heavy crops', text:`In June, heavy crops cause branches to snap and can kill the tree. Thin fruits to 5–8cm apart. It feels brutal but produces larger, better fruit and protects the tree.`},
        {title:'Net if needed', text:`Wasps and birds attack ripening plums. Net or use fine-mesh fruit bags over clusters if pests are a problem.`},
        {title:'Harvest in stages', text:`Plums don\'t all ripen at once. Check every couple of days and pick when they come away easily. Don't wait until they drop.`}
      ],
      varieties:[
        {name:'Victoria', agm:true, desc:'The definitive British plum. Heavy-cropping, self-fertile, dual-purpose.'},
        {name:'Opal', agm:true, desc:'Early, sweet, self-fertile. Excellent fresh, good crops.'},
        {name:'Czar', agm:false, desc:'Cooking plum. Very reliable and heavy-cropping. Self-fertile.'},
        {name:'Merryweather Damson', agm:false, desc:'Large damson. Superb for jam and sloe gin. Very hardy.'}
      ],
      warning:`Plum moth larvae tunnel into developing fruits. Hang pheromone traps from late May to catch male moths and break the breeding cycle. Organic and highly effective.`
    },
    {
      id:'blackberry', icon:'🫐', name:'Blackberries', tag:'Wild & Abundant', latin:'Rubus fruticosus',
      difficulty:1, sow:'Plant bare-root Nov–Mar or pot-grown Apr–Sep', harvest:'Aug–Oct', position:'Sun or partial shade', spacing:'3–4.5m between plants',
      desc:`The ultimate low-effort fruiting cane. Blackberries thrive in almost any soil, including heavy clay and partial shade that would frustrate other fruits. One plant produces vast quantities of fruit for decades with minimal input.`,
      steps:[
        {title:'Choose thornless varieties', text:`Modern thornless varieties like Loch Ness and Adrienne make harvesting a pleasure rather than a battle. Strongly recommended over thorned types for garden use.`},
        {title:'Erect a strong framework', text:`Blackberry canes can reach 3m and are very vigorous. Fix horizontal wires at 90cm and 150cm between sturdy posts before planting. The framework must be robust.`},
        {title:'Train one-way system', text:`Tie current-year's new canes to one side of the support, fruiting canes to the other. This makes pruning simple and keeps the planting manageable.`},
        {title:'Prune after fruiting', text:`Once all fruit is harvested, cut all the old (fruited) canes to the ground. Tie in the new canes that grew this summer — these will fruit next year.`},
        {title:'Mulch annually', text:`Apply a thick mulch of compost or bark around the base each spring to conserve moisture and suppress weeds.`},
        {title:'Harvest when fully black', text:`Pick when berries are fully black and come away cleanly. Under-ripe berries are hard and very sharp; fully ripe ones are soft, juicy and sweet.`}
      ],
      varieties:[
        {name:'Loch Ness', agm:true, desc:'Thornless. Large berries, excellent flavour. Compact, upright growth.'},
        {name:'Fantasia', agm:false, desc:'Large, glossy berries. Very heavy crops. Thorned.'},
        {name:'Adrienne', agm:true, desc:'Early thornless. Sweet flavour. Good for smaller gardens.'},
        {name:'Waldo', agm:true, desc:'Thornless. High-yielding. Very compact — good for smaller spaces.'}
      ],
      warning:`Blackberries spread vigorously by tip-layering (cane tips touching soil root themselves). Pin tips back or peg them down deliberately only where new plants are wanted.`
    },
    {
      id:'redcurrant', icon:'🔴', name:'Red & White Currants', tag:'Elegant Soft Fruit', latin:'Ribes rubrum',
      difficulty:1, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Jul–Aug', position:'Full sun or partial shade', spacing:'1.5m (bush) or 45cm (cordon)',
      desc:`Red and white currants are among the most beautiful and productive soft fruits you can grow, producing jewel-like strings of translucent berries. Unlike blackcurrants, they fruit on old wood and can be trained as elegant cordons, fans, or standards against walls and fences.`,
      steps:[
        {title:'Choose your form', text:`Grow as a bush (1.5m spacing), single cordon (45cm apart), double cordon, or fan-trained against a wall or fence. Cordons are ideal for small gardens and make netting easy.`},
        {title:'Plant in well-prepared soil', text:`Plant in fertile, well-drained soil enriched with compost. Redcurrants are less fussy than blackcurrants and tolerate partial shade — a north-facing wall suits them well.`},
        {title:'Prune for spurs', text:`Prune in winter to build a framework of permanent branches. Each summer, cut all side shoots to 5 leaves; in winter cut the same side shoots back to 1–2 buds to create fruiting spurs.`},
        {title:'Net against birds', text:`Birds strip redcurrants faster than almost any other crop. Net as soon as the berries begin to colour — without netting you will rarely get a harvest.`},
        {title:'Feed in spring', text:`Apply a balanced fertiliser in early spring and mulch generously around the base. Potassium promotes fruiting — sulphate of potash applied in February is beneficial.`},
        {title:'Harvest whole strings', text:`Harvest entire strings (strigs) rather than individual berries. Strip from the string with a fork when processing for jam or jelly.`}
      ],
      varieties:[
        {name:'Rovada', agm:true, desc:'Late-season. Very long strigs with large, brilliant red berries. Exceptional yields.'},
        {name:'Jonkheer van Tets', agm:true, desc:'Early. Heavy crops of large berries. Vigorous and reliable.'},
        {name:'White Versailles', agm:false, desc:'White currant. Large, sweet, pale berries. More delicate flavour.'},
        {name:'Blanka', agm:true, desc:'White currant. Extremely heavy crops. Outstanding for eating fresh.'}
      ],
      warning:`Big bud mite and reversion virus affect redcurrants less severely than blackcurrants but can occur. Remove any shoots showing distorted or unusually small leaves immediately.`
    },
    {
      id:'grape', icon:'🍇', name:'Grapes', tag:'Wall & Greenhouse Fruit', latin:'Vitis vinifera',
      difficulty:3, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Sep–Oct (outdoor) or Aug–Sep (greenhouse)', position:'Full sun, south-facing wall or greenhouse', spacing:'1.2–1.5m',
      desc:`Grapes are entirely achievable in the UK — the key is choosing the right variety and the right position. Outdoor dessert and wine grapes thrive against a south-facing wall in most of the UK; the South East of England produces commercially viable wine grapes. A heated greenhouse opens up the full range of varieties.`,
      steps:[
        {title:'Choose outdoor or greenhouse', text:`Outdoor varieties (Boskoop Glory, Solaris) are essential outside the South. Greenhouse varieties (Muscat of Alexandria, Black Hamburg) are unbeatable in flavour but need winter protection.`},
        {title:'Plant against a south wall or into the greenhouse border', text:`Train against wires fixed horizontally 30cm apart on a south-facing wall. In a greenhouse, plant in a large border and train up and along the roof structure.`},
        {title:'Train the rod and spur system', text:`Establish a single main rod (stem) trained vertically or at 45°. From this, develop fruiting spurs at 30–45cm intervals. Each year, all lateral growth is pruned back to 1–2 buds in winter.`},
        {title:'Thin bunches for quality', text:`In June–July, thin each bunch to remove the smallest berries and create space — use small scissors. This produces larger, better-developed berries.`},
        {title:'Ventilate rigorously', text:`Botrytis (grey mould) is the biggest threat. Ventilate the greenhouse or wall space maximum in summer. Remove any leaves shading the bunches in August.`},
        {title:'Harvest when ripe', text:`Taste individual berries — do not rely on colour alone. Fully ripe grapes should be sweet and slightly yielding. Cut the whole bunch with scissors leaving a short stalk.`}
      ],
      varieties:[
        {name:'Boskoop Glory', agm:true, desc:'Outdoor dessert grape. Blue-black berries. Excellent flavour. Very reliable in UK.'},
        {name:'Solaris', agm:false, desc:'Outdoor wine/dessert grape. High sugar, disease-resistant. Best outdoor white.'},
        {name:'Black Hamburg', agm:false, desc:'Greenhouse dessert. Large, sweet, blue-black. The classic English greenhouse variety.'},
        {name:'Muscat of Alexandria', agm:false, desc:'Greenhouse dessert. Extraordinary musky flavour. The finest dessert grape.'}
      ],
      warning:`Powdery mildew and botrytis are the two main diseases. Powdery mildew coats leaves and berries with white powder in dry conditions — improve airflow and water at the roots. Botrytis (grey mould) spreads rapidly in humid conditions — ventilate aggressively.`
    },
    {
      id:'melon', icon:'🍈', name:'Melons', tag:'Greenhouse Challenge', latin:'Cucumis melo',
      difficulty:3, sow:'Apr–May (indoors, heated)', harvest:'Aug–Sep', position:'Full sun, greenhouse or polytunnel', spacing:'90cm–1m',
      desc:`Growing your own melons is one of the ultimate challenges and rewards of the kitchen garden. The flavour of a perfectly ripened home-grown melon — picked at the precise moment it is ready — is incomparably better than anything that has spent a week in a refrigerated lorry.`,
      steps:[
        {title:'Sow in warmth', text:`Sow singly in 9cm pots in April at 20–25°C. Germination in 5–10 days. Grow on in a heated greenhouse or very warm windowsill — they cannot tolerate cold.`},
        {title:'Plant into the greenhouse or polytunnel', text:`Plant out in May–June when the greenhouse soil has warmed to 20°C+. Plant into fertile, well-drained beds or large containers (minimum 30L) enriched with compost.`},
        {title:'Train up supports', text:`Tie the main stem to a vertical cane or string. Pinch out the growing tip when 5–6 leaves have formed to encourage lateral shoots.`},
        {title:'Hand pollinate', text:`Transfer pollen from male flowers (plain stalk behind them) to female flowers (with a tiny melon behind) using a soft brush. Do this at midday when pollen is most active.`},
        {title:'Support developing fruits', text:`As fruits swell, support each one in a net or stocking tied to the framework. A ripe melon can weigh 1–3kg and will otherwise break the stem.`},
        {title:'Test for ripeness', text:`Melons are ripe when they emit a sweet fragrance at the stalk end, the skin softens slightly, and the stalk begins to crack and separate from the fruit naturally.`}
      ],
      varieties:[
        {name:'Sweetheart F1', agm:true, desc:'The most reliable UK greenhouse melon. Pale green skin, orange-pink flesh. Excellent flavour.'},
        {name:'Ogen', agm:false, desc:'Green-skinned, green flesh. Very sweet. Excellent for polytunnels.'},
        {name:'Blenheim Orange', agm:false, desc:'Heritage netted melon. Salmon-pink flesh. Rich, complex flavour. Needs warmth.'},
        {name:'Emir F1', agm:false, desc:'Early and reliable. Orange flesh. Good for cooler UK summers.'}
      ],
      warning:`Never let the soil temperature drop below 15°C — even brief cold snaps cause fruit to abort or split. Water consistently at the base; overhead watering encourages powdery mildew which is the main disease problem.`
    },
    {
      id:'watermelon', icon:'🍉', name:'Watermelons', tag:'Ultimate Greenhouse Challenge', latin:'Citrullus lanatus',
      difficulty:3, sow:'Apr–May (indoors, heated)', harvest:'Aug–Sep', position:'Full sun, greenhouse or polytunnel', spacing:'1–1.5m',
      desc:`Watermelons are the most ambitious crop a UK gardener can attempt — requiring sustained high temperatures, a long season, and considerable skill — but the reward of a home-grown watermelon, still warm from the greenhouse, split open at the vine is genuinely extraordinary. Not for the faint-hearted, but deeply satisfying.`,
      steps:[
        {title:'Sow early in real warmth', text:`Sow one seed per 9cm pot in April at 25–30°C — watermelons need higher temperatures than ordinary melons. A heated propagator is essential. Germination in 5–8 days. Grow on at a minimum of 20°C constantly.`},
        {title:'Plant into the warmest spot', text:`Plant out in May–June into the warmest greenhouse border or polytunnel bed. Watermelons need sustained soil and air temperatures above 25°C to develop properly. Black polythene mulch over the soil helps.`},
        {title:'Train the main stem upright', text:`Tie the main stem to a vertical support. Pinch out the growing tip when 5 leaves have formed to encourage laterals. Female flowers (with a tiny striped embryo fruit behind) appear on the laterals.`},
        {title:'Hand pollinate', text:`Watermelons in UK conditions must be hand-pollinated — carefully transfer pollen from male to female flowers with a soft brush at midday. In a good British summer you may get 2–3 successful fruits per plant.`},
        {title:'Support heavy fruits', text:`Once fruits reach the size of a tennis ball, support each one in a strong netting bag or hammock tied to the overhead structure. Watermelons can reach 3–8kg and will snap the stem without support.`},
        {title:'Test for ripeness', text:`Ripeness is the hardest part. Look for: the tendril nearest the fruit turning brown and dry; the ground spot (where it rests) turning from white to creamy yellow; a dull thud rather than a hollow ring when tapped. Pick only when fully ripe.`}
      ],
      varieties:[
        {name:'Sugar Baby', agm:false, desc:'The most reliable UK variety. Small round fruits (2–3kg), deep red flesh. Compact plant. Icebox type.'},
        {name:'Crimson Sweet', agm:false, desc:'Classic striped watermelon. Good flavour. Needs a long warm summer to ripen fully.'},
        {name:'Golden Midget', agm:false, desc:'Very early. Small golden-skinned fruits. Pink flesh. One of the easiest to ripen in the UK.'},
        {name:'Mini Love F1', agm:false, desc:'Compact, early, very sweet. Small seedless fruits. Best for UK polytunnel growing.'}
      ],
      warning:`Watermelons fail completely in a cold, cloudy UK summer — there is no saving them if temperatures are consistently below 20°C. A heated greenhouse or polytunnel with supplementary heat in cool spells is the only reliable approach. Even in a good summer, success is not guaranteed — grow them as the ambitious experiment they are, and celebrate when it works.`
    },
    { icon:'🍑', name:'Peaches & Nectarines', tag:'Wall-Trained Luxury', latin:'Prunus persica',
      difficulty:2, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Jul–Sep', position:'Full sun, south-facing wall or greenhouse', spacing:'3.5–4.5m (fan) or 2–2.5m (container)',
      desc:`Few garden fruits are more rewarding than a sun-warm peach picked straight from a south-facing wall. Both peaches and nectarines thrive in the UK as fan-trained specimens against a sheltered wall — and some varieties are hardy enough for open ground in mild areas.`,
      steps:[
        {title:'Choose fan training or container', text:`Fan training against a south or south-west facing wall is the classic method and gives the best results. Alternatively, grow in a large container (50L+) which can be brought into a cool greenhouse for winter protection.`},
        {title:'Plant and establish the fan', text:`Plant a bare-root tree Nov–Mar or container-grown any time. Begin training by selecting two strong laterals at 45° and tying them to bamboo canes fixed to horizontal wires. Remove all other shoots.`},
        {title:'Hand pollinate', text:`Peach flowers in February–March before bees are active. Pollinate daily by transferring pollen between flowers with a soft brush at midday. This is essential for a good set.`},
        {title:'Protect from peach leaf curl', text:`Cover the fan with a rain-excluding polythene or fleece shelter from December to April. Peach leaf curl (a fungal disease) spreads via rain splash — exclusion is the most effective prevention.`},
        {title:'Thin fruits', text:`When fruits reach marble size, thin to one per cluster, then to 15–20cm between fruits. Thinning seems brutal but produces larger, better-flavoured fruit and prevents branch breakage.`},
        {title:'Harvest at peak', text:`Peaches are ripe when the flesh around the stalk gives slightly under gentle pressure and the fruit lifts off the spur with a slight twist. Eat within days — home-grown peaches do not keep.`}
      ],
      varieties:[
        {name:'Peregrine', agm:true, desc:'The benchmark wall-trained peach. White flesh, rich flavour. Very reliable outdoors.'},
        {name:'Rochester', agm:true, desc:'Yellow flesh, juicy. Mid-season. The most widely grown UK peach.'},
        {name:'Garden Lady', agm:true, desc:'Compact genetic dwarf. Ideal for containers. Crops reliably. Yellow flesh.'},
        {name:'Lord Napier', agm:true, desc:'Nectarine. Large, red-flushed fruit. Excellent flavour. Best against a warm wall.'}
      ],
      warning:`Peach leaf curl causes leaves to blister, redden and fall prematurely, severely weakening trees. The only organic prevention is rain exclusion from December to April. Once visible, remove and destroy all affected leaves immediately.`
    },
    {
      id:'nectarine', icon:'🍑', name:'Nectarines', tag:'Smooth-Skinned Peach', latin:'Prunus persica var. nucipersica',
      difficulty:2, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Aug–Sep', position:'Full sun, south-facing wall or greenhouse', spacing:'3.5–4.5m (fan) or 2–2.5m (container)',
      desc:`Nectarines are genetically a smooth-skinned variant of peaches — identical in their growing requirements but with a slightly firmer, more intensely flavoured flesh. They tend to be marginally less hardy than peaches but thrive in the same conditions and are grown in exactly the same way.`,
      steps:[
        {title:'Treat exactly as a peach', text:`All growing, pruning, training, and care methods are identical to peaches. See the peach guide for the full step-by-step approach.`},
        {title:'Fan train against a warm wall', text:`A south-facing wall with a polythene rain shelter from December to April gives the best results. The smooth skin of nectarines makes them slightly more susceptible to peach leaf curl than peaches.`},
        {title:'Hand pollinate', text:`Nectarines flower in February–March. Hand pollinate with a soft brush daily at midday — essential as bees are not active when nectarines flower in the UK.`},
        {title:'Thin fruits', text:`Thin to 20–23cm apart once fruits reach marble size. Nectarines produce slightly smaller fruits than peaches in general, but thinning still significantly improves quality.`},
        {title:'Consider a container', text:`Nectarines grow very well in large containers (50L+) which allows them to be moved into a cold greenhouse or conservatory in winter, dramatically improving reliability.`},
        {title:'Harvest carefully', text:`Ripe nectarines give slightly under gentle pressure at the stalk end and come away from the spur cleanly. Eat immediately — they do not store. The flavour of a home-grown nectarine is extraordinary.`}
      ],
      varieties:[
        {name:'Lord Napier', agm:true, desc:'The benchmark UK nectarine. Large, red-flushed fruit. Superb flavour. Best against a warm wall.'},
        {name:'Early Rivers', agm:false, desc:'Very early. Pale yellow flesh. Reliable cropper. One of the hardiest nectarines.'},
        {name:'Nectarella', agm:false, desc:'Genetic dwarf — ideal for containers. Good crops of orange-yellow fruit.'},
        {name:'Fantasia', agm:false, desc:'Large red-yellow fruit. Very juicy and sweet. Needs a warm, sheltered wall.'}
      ],
      warning:`Nectarines are slightly more susceptible to peach leaf curl than peaches due to their smooth skin. A rain-excluding polythene cover from December to April is non-negotiable for reliable cropping. Without it, repeated defoliation will eventually kill the tree.`
    },
    {
      id:'apricot', icon:'🟡', name:'Apricots', tag:'Surprising UK Success', latin:'Prunus armeniaca',
      difficulty:2, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Jul–Aug', position:'Full sun, south-facing wall, sheltered from frost', spacing:'4–5m (fan) or 2–3m (container)',
      desc:`Apricots are more achievable in UK gardens than most people realise. They thrive against a south-facing wall and modern self-fertile varieties produce generous crops in warmer summers. The challenge is their very early flowering in February–March — protection from late frosts is the critical factor.`,
      steps:[
        {title:'Choose a self-fertile variety', text:`Always choose self-fertile varieties — Flavourcot, Tomcot, and Goldcot are all self-fertile and UK-adapted. Single trees will crop well without a pollination partner.`},
        {title:'Plant against a warm wall', text:`Fan train against a south or south-west facing wall in well-drained, slightly alkaline soil. Alternatively grow in a large container (60L+) in a cool greenhouse — the most reliable method in northern areas.`},
        {title:'Protect the blossom', text:`Apricots flower in February–March before the last frost. Cover the fan with horticultural fleece on frost-forecast nights from first bud break until April. Frost-damaged blossom produces no fruit.`},
        {title:'Hand pollinate', text:`Transfer pollen between flowers with a soft brush daily at midday during the flowering period. Bees are rarely active when apricots flower in the UK.`},
        {title:'Thin fruits', text:`Thin to one fruit per cluster, then to 8–10cm apart when fruits reach the size of a cherry. Thinning is essential — heavy crops exhaust young trees and cause biennial bearing.`},
        {title:'Harvest carefully', text:`Apricots ripen unevenly — test each fruit individually. Ripe fruits give slightly under gentle pressure, develop a golden-orange colour and come away from the spur cleanly. Eat within 2–3 days.`}
      ],
      varieties:[
        {name:'Flavourcot', agm:true, desc:'Self-fertile. Excellent flavour. One of the most reliable UK varieties.'},
        {name:'Tomcot', agm:false, desc:'Very large fruits. Early. Self-fertile. Good disease resistance.'},
        {name:'Goldcot', agm:false, desc:'Heavy-cropping, self-fertile. Good frost tolerance.'},
        {name:'Moorpark', agm:false, desc:'Heritage variety. Exceptional flavour. Large fruits. Needs a warm summer to ripen fully.'}
      ],
      warning:`Late spring frosts are the single biggest cause of crop failure in apricots. Always cover the blossom on frost-forecast nights — one severe frost at full bloom can eliminate the entire harvest for that year. Grow in a cold greenhouse for maximum reliability in northern areas.`
    },
    {
      id:'gage', icon:'🟢', name:'Greengages & Gages', tag:'The Finest Plum', latin:'Prunus domestica (Italica group)',
      difficulty:2, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Aug–Sep', position:'Full sun, sheltered from late frost', spacing:'3–5m or 2.5m (Pixy rootstock)',
      desc:`Greengages are simply the finest flavoured fruit that can be grown in a British garden — sweet, honeyed, aromatic, and almost impossibly good when eaten sun-warm from the tree. They are grown exactly like plums but ripen slightly later and need a warm, sheltered spot to develop their full flavour.`,
      steps:[
        {title:'Choose rootstock', text:`Pixy rootstock gives a compact tree (2.5–3m) ideal for smaller gardens but needs good soil. St Julien A gives a semi-vigorous tree (3.5–4.5m) and is more forgiving in poorer conditions.`},
        {title:'Choose self-fertile varieties', text:`Cambridge Gage and Oullins Golden Gage are both self-fertile. Some varieties need a pollination partner — check before buying. Most gages will also be pollinated by nearby plum trees.`},
        {title:'Plant in a sheltered, sunny position', text:`Gages need more warmth than plums to develop their full sugar content. Plant against a south-facing wall or fence in all but the most sheltered southern gardens.`},
        {title:'Prune in summer only', text:`Never prune plums or gages in winter — bacterial canker and silver leaf disease enter winter wounds. Prune lightly in July–August after harvest.`},
        {title:'Thin heavy crops', text:`In June, thin fruits to 5–8cm apart to prevent branch breakage and develop larger, better-flavoured fruit. This feels brutal but makes a dramatic difference to quality.`},
        {title:'Harvest at peak ripeness', text:`Gages must be fully ripe to develop their legendary flavour — picked early they are disappointingly sharp. They are ready when they come away from the spur with the gentlest twist.`}
      ],
      varieties:[
        {name:'Cambridge Gage', agm:true, desc:'The benchmark greengage. Self-fertile. Rich, sweet, complex flavour. Very reliable.'},
        {name:'Oullins Golden Gage', agm:true, desc:'Self-fertile. Golden-yellow fruit. Very heavy-cropping. Good for jam and eating.'},
        {name:'Old Green Gage', agm:false, desc:'Heritage variety. Arguably the finest flavour of any plum. Needs a warm wall.'},
        {name:'Reine Claude Dorée', agm:false, desc:'The original French greengage. Exquisite honey flavour. Needs a pollinator.'}
      ],
      warning:`Silver leaf disease enters through pruning wounds made in winter — always prune in July–August and seal large cuts with wound paint. Wasps attack ripe gages aggressively — net or use fruit bags over clusters when the fruits begin to colour.`
    },
    {
      id:'quince', icon:'🍋', name:'Quinces', tag:'Ancient & Aromatic', latin:'Cydonia oblonga',
      difficulty:1, sow:'Plant bare-root Nov–Mar or pot-grown any time', harvest:'Oct–Nov', position:'Full sun, sheltered, moisture-retentive soil', spacing:'3.5–5m',
      desc:`One of the most beautiful and underrated fruit trees for the British garden. Quince produces large, golden, intensely aromatic fruits in October — inedible raw but transformed into the finest jelly, cheese, and membrillo by brief cooking. The tree itself is ornamental, with large white-pink flowers in May.`,
      steps:[
        {title:'Choose a sunny, sheltered position', text:`Quince thrives in a warm, sheltered position with moisture-retentive soil. It tolerates heavier and wetter soil than most fruit trees — even slightly boggy conditions.`},
        {title:'Most quinces are self-fertile', text:`The majority of quince varieties are self-fertile — a single tree will crop well. Plant as a standalone tree, trained as a multi-stem or as a half-standard.`},
        {title:'Minimal pruning needed', text:`Quince requires very little pruning. In the first 3–4 years, develop an open-centred framework by removing crossing and inward-growing branches in winter. Thereafter, simply remove dead or damaged wood.`},
        {title:'No thinning required', text:`Quince sets a self-limiting number of fruits and does not need thinning in most years. In exceptional crops, remove the smallest fruits in July.`},
        {title:'Leave on the tree until late', text:`Quinces must stay on the tree until they are fully golden (October–November) even after the leaves have fallen. Premature picking means under-ripe fruit with poor flavour and poor setting.`},
        {title:'Store after harvest', text:`Quinces ripen further off the tree. Store in a cool, dark place away from other fruits — the intense perfume permeates everything stored nearby. Use within 4–6 weeks.`}
      ],
      varieties:[
        {name:'Vranja', agm:true, desc:'Large, pear-shaped, golden fruit. Excellent flavour. Very vigorous and productive.'},
        {name:'Meech\'s Prolific', agm:true, desc:'The most reliably heavy-cropping quince. Pear-shaped fruits. Good flavour.'},
        {name:'Portugal', agm:false, desc:'Large, tomato-shaped fruits. Early ripening. Strong aromatic flavour.'},
        {name:'Serbian Gold', agm:false, desc:'Golden, aromatic fruits. Compact habit. Good for smaller gardens.'}
      ],
      warning:`Quince leaf blight (brown spots on leaves causing early leaf drop) can reduce crops in wet summers. Remove and destroy affected leaves promptly. Do not compost them. Fire blight occasionally affects quinces — remove affected shoots 30cm below the visible infection and sterilise cutting tools between cuts.`
    },
    {
      id:'fig', icon:'🟣', name:'Figs', tag:'Mediterranean Magic', latin:'Ficus carica',
      difficulty:2, sow:'Plant container-grown Apr–Jun (or bare-root Nov–Mar)', harvest:'Aug–Sep', position:'Full sun, south-facing wall, restricted root run', spacing:'3–4m (wall-trained) or 60L container',
      desc:`Figs are one of the most rewarding fruit trees for a sheltered British garden. Against a south-facing wall with restricted roots, they crop consistently and the flavour of a sun-warm fig split from its own branch cannot be matched by anything in a supermarket.`,
      steps:[
        {title:'Restrict the root run', text:`This is the single most important step for fruiting in the UK. Unrestricted roots produce enormous leafy growth and no fruit. Plant in a brick-lined pit 60cm square, or in a 60L+ container. Restricted roots signal the tree to fruit.`},
        {title:'Train as a fan against a south wall', text:`Fix horizontal wires 30cm apart on a south-facing wall. Fan train by selecting 6–8 main branches and tying to canes fixed to the wires. The wall reflects heat and protects from frost.`},
        {title:'Understand the fruiting cycle', text:`In the UK, only embryo fruits (pea-sized at the end of shoots in autumn) overwinter and ripen the following summer. Large marble-sized fruits visible in summer rarely ripen in the UK — remove them in autumn.`},
        {title:'Protect tiny embryo fruits in winter', text:`The pea-sized embryo fruits are frost-sensitive. In November, loosely wrap the fan with horticultural fleece or straw, or tie the branches together and wrap. Uncover in March.`},
        {title:'Prune in May', text:`Prune in May only — cutting earlier risks frost damage to cut ends. Remove dead wood, thin overcrowded branches, and cut back the tips of main branches to encourage shorter, fruit-bearing side shoots.`},
        {title:'Harvest when drops', text:`Figs are fully ripe when they hang downward, the neck softens, the skin begins to split, and a drop of nectar appears at the eye. Pick with a gentle downward pull.`}
      ],
      varieties:[
        {name:'Brown Turkey', agm:true, desc:'The most reliable UK outdoor fig. Brown-purple skin, red flesh. Heavy crops annually.'},
        {name:'Brunswick', agm:true, desc:'Very hardy. Large green-brown fruits. Very good flavour. Reliable cropper.'},
        {name:'White Marseilles', agm:false, desc:'Pale green skin, white flesh. Very sweet, honey flavour. Excellent against a wall.'},
        {name:'Rouge de Bordeaux', agm:false, desc:'Small, dark purple fruits. Extraordinarily sweet and rich when fully ripe.'}
      ],
      warning:`Root restriction is absolutely critical — figs without it simply will not fruit in the UK. If a planted fig is producing lush growth but no fruit, the roots have escaped the pit. The solution is to replant in a properly constructed root barrier or move to a large container.`
    },
    {
      id:'kiwi', icon:'🥝', name:'Kiwi Fruit', tag:'Climbing Fruiter', latin:'Actinidia deliciosa / A. arguta',
      difficulty:2, sow:'Plant container-grown Apr–Jun or bare-root Nov–Mar', harvest:'Oct–Nov (standard) or Sep–Oct (hardy kiwi)', position:'Full sun, sheltered, strong support', spacing:'3–5m',
      desc:`Kiwi fruit is grown in UK gardens more often than people realise — it simply needs a sturdy pergola or strong wall to climb, a sunny position, and the right combination of male and female plants. The compact hardy kiwi (Actinidia arguta) is fully frost-hardy and crops reliably in most of the UK.`,
      steps:[
        {title:'Choose the right species', text:`Standard kiwi (A. deliciosa) needs a frost-free greenhouse or very sheltered wall in the South. Hardy kiwi (A. arguta) is fully frost-hardy and suited to outdoor growing throughout the UK — smaller but very sweet fruits.`},
        {title:'Plant male and female', text:`Most kiwis are not self-fertile. Plant one male to every 6–8 females. Self-fertile varieties (Issai, Jenny) are available and give adequate yields from a single plant — recommended for most gardens.`},
        {title:'Provide very strong support', text:`Kiwi vines are extremely vigorous — they can exceed 9m in length and produce heavy crops. A sturdy pergola, strong fence wires, or a trellis are essential. The structure must be able to bear 30–50kg of fruit and foliage.`},
        {title:'Train a permanent framework', text:`Establish 2–4 main arms (cordons) in the first 2–3 years by tying to horizontal wires. From these, develop fruiting spurs by pinching laterals at 5 leaves after fruiting each year.`},
        {title:'Be patient', text:`Kiwis take 3–5 years from planting to produce their first significant crop. Do not be discouraged by poor early yields — once established, a mature vine can produce 50kg or more annually.`},
        {title:'Harvest and ripen off the vine', text:`Standard kiwis are harvested in October–November before frost and ripened at room temperature over 2–4 weeks. Hardy kiwi ripens directly on the vine and can be eaten immediately when slightly soft.`}
      ],
      varieties:[
        {name:'Hayward', agm:false, desc:'The supermarket kiwi. Large, hairy fruits. Female. Needs a separate male (Tomuri).'},
        {name:'Issai', agm:false, desc:'Hardy kiwi (A. arguta). Self-fertile. Small, sweet, grape-sized fruits. Fully hardy.'},
        {name:'Jenny', agm:false, desc:'Self-fertile standard kiwi. Smaller fruits than Hayward but reliable without a male.'},
        {name:'Ken\'s Red', agm:false, desc:'Hardy kiwi. Red-flushed fruits. Excellent sweet flavour. Fully hardy to -25°C.'}
      ],
      warning:`Kiwi vines are extremely vigorous and will rapidly overwhelm any inadequate support structure. Invest in the strongest possible pergola or wire system before planting — retrofitting supports around an established vine is very difficult. Also: cats are powerfully attracted to kiwi roots — protect young plants with wire guards.`
    },
    {
      id:'mulberry', icon:'🫐', name:'Mulberries', tag:'Patience & Perfection', latin:'Morus nigra',
      difficulty:1, sow:'Plant container-grown May–Jun or bare-root Nov–Mar', harvest:'Aug–Sep', position:'Full sun, sheltered, deep well-drained soil', spacing:'6–8m (or 4–5m on restricted root)',
      desc:`The mulberry is among the most magnificent fruit trees for a large garden. Black mulberry (Morus nigra) produces extraordinary dark red-black fruits with a rich, complex, tart-sweet flavour — incomparably better than white mulberry. It grows slowly but lives for centuries and demands almost no attention once established.`,
      steps:[
        {title:'Plant in the best position you have', text:`A mulberry is a 100-year tree — choose its position carefully. Full sun, shelter from cold winds, and deep, well-drained soil. Plant it where it can spread without obstruction.`},
        {title:'Allow 3–5 years for first crop', text:`Black mulberries are notoriously slow to bear — most trees take 3–5 years after planting to produce their first crop. White mulberries fruit faster but have far inferior flavour. Patience is the only requirement.`},
        {title:'No pruning needed', text:`Mulberries resent pruning and bleed sap heavily from cuts. Remove dead wood only, and only in summer when the wounds seal quickly. Never prune in winter or spring.`},
        {title:'Let fruit drop naturally', text:`Mulberries ripen unevenly and fall when fully ripe. Lay an old sheet or tarpaulin under the tree and collect fallen fruit daily during the harvest period. Picking directly from the tree stains hands and clothing with indelible juice.`},
        {title:'Stake young trees for 10+ years', text:`Young mulberry trees are brittle and top-heavy. Stake with a substantial post for the first 10 years until the trunk is solid. Old mulberries often need their main branches propped up as they grow outward and heavy with fruit.`}
      ],
      varieties:[
        {name:'Chelsea', agm:true, desc:'Black mulberry. The most reliable UK variety. Good fruiting even as a young tree.'},
        {name:'Wellington', agm:false, desc:'Black mulberry. Very large fruits. Rich, complex flavour. Large spreading habit.'},
        {name:'Charlotte Russe', agm:false, desc:'Compact growing black mulberry. Good for smaller gardens.'},
        {name:'Illinois Everbearing', agm:false, desc:'White × red mulberry hybrid. Very early to fruit from seed. Longer harvest season.'}
      ],
      warning:`Mulberry stains are permanent — the deep purple-red juice of black mulberry is one of the most powerful natural dyes known. Wear old clothes when harvesting, use sheets on the ground, and wash any staining from skin immediately with cold water. Do not use warm water — it sets the stain.`
    },
    {
      id:'olive', icon:'🫒', name:'Olives', tag:'Mediterranean Ornamental', latin:'Olea europaea',
      difficulty:2, sow:'Plant container-grown any time (avoid hard frost periods)', harvest:'Oct–Nov (if ripening occurs)', position:'Full sun, very well-drained, sheltered from cold winds', spacing:'3–5m or large container',
      desc:`Olives are grown throughout the warmer parts of the UK as much for their beautiful silvery-green foliage as for their fruit. In a sheltered, south-facing position they are fully hardy through most UK winters; fruiting crops are achievable in the South and South West of England in most years.`,
      steps:[
        {title:'Choose the position carefully', text:`Full sun, maximum drainage, and shelter from cold north and east winds are essential. A south-facing wall, courtyard, or sheltered terrace dramatically extends what is possible. Olives in pots can be brought under glass for winter in cold areas.`},
        {title:'Excellent drainage is essential', text:`Olives tolerate drought far better than wet feet. Plant in very free-draining soil or a container with 30–40% grit mixed into the compost. They will tolerate poor, stony soils that would kill most fruit trees.`},
        {title:'Two trees for fruiting', text:`Most olives need a cross-pollinator for consistent fruiting. Plant at least two plants of different varieties for reliable crops. Self-fertile varieties (Arbequina) exist but yield better with a partner.`},
        {title:'Light annual pruning in spring', text:`Prune lightly in April–May to maintain an open shape and remove dead or crossing branches. Olives flower and fruit on the previous year's wood — avoid heavy pruning which removes fruiting wood.`},
        {title:'Protect in severe frost', text:`Established olives in the ground survive to around -10°C if dry. In prolonged severe frost, wrap the canopy with horticultural fleece and insulate the root area with a thick straw mulch.`},
        {title:'Harvest and process fruits', text:`UK-grown olives ripen slowly from green through yellow to purple-black in October–November. Raw olives are extremely bitter — they must be cured in brine (saltwater) for 3–6 months before eating. Alternatively press for oil, though large quantities are needed.`}
      ],
      varieties:[
        {name:'Arbequina', agm:false, desc:'Self-fertile. Small fruits. Excellent for oil. One of the hardiest varieties.'},
        {name:'Frantoio', agm:false, desc:'Classic Tuscan oil olive. Good flavour. Hardy to around -10°C.'},
        {name:'Leccino', agm:false, desc:'Very hardy (to -12°C). A good pollinator for other varieties. Mild-flavoured oil.'},
        {name:'Picual', agm:false, desc:'Spanish variety. High oil content. Hardy. Vigorous, large tree.'}
      ],
      warning:`Olive trees in containers need very careful watering — never allow the compost to become waterlogged as root rot is rapid and fatal. Overwatering is far more dangerous than underwatering. In winter, move containers under cover and water very sparingly (once a month at most).`
    },
    {
      id:'citrus', icon:'🍋', name:'Citrus (Lemon, Orange, Lime)', tag:'Container & Conservatory', latin:'Citrus spp.',
      difficulty:3, sow:'Buy grafted plants; grow in containers year-round', harvest:'Year-round (lemons) or winter–spring (oranges)', position:'Full sun indoors or conservatory (Oct–May) — outdoors summer only', spacing:'Large container (minimum 30–50L)',
      desc:`Citrus fruits are among the most rewarding conservatory and container plants in the UK. Lemons in particular are genuinely productive in a bright, frost-free conservatory or south-facing windowsill — a mature lemon tree can produce 20–30 fruits per year in the right conditions.`,
      steps:[
        {title:'Buy grafted plants', text:`Always buy grafted citrus on a rootstock — they crop reliably from year 2–3. Seed-raised citrus takes 7–10 years to fruit. Buy from a specialist citrus nursery for disease-free, correctly grafted plants.`},
        {title:'Move outdoors in summer, indoors in winter', text:`Move containers outside in late May when night temperatures stay above 10°C. Bring back inside in September–October before any frost. Citrus needs a frost-free minimum of 5–7°C in winter — a cool conservatory, greenhouse, or bright cool room.`},
        {title:'Water carefully and consistently', text:`Water when the top 2–3cm of compost is dry. Never let citrus dry out completely — leaves will drop. But never leave in standing water — root rot is equally fatal. Reduce watering significantly in winter.`},
        {title:'Feed throughout the growing season', text:`Use a specific citrus fertiliser (high in nitrogen with added trace elements including iron and manganese) March–October. Yellowing leaves are almost always a sign of nitrogen or iron deficiency — increase feeding before adding anything else.`},
        {title:'Repot every 2–3 years', text:`Repot into a container one size larger in April using citrus-specific compost. Citrus prefers to be slightly pot-bound — never repot into a dramatically oversized container.`},
        {title:'Hand pollinate for fruit set', text:`Lemon trees are self-fertile and often set fruit without assistance. For other citrus under glass, transfer pollen with a soft brush between flowers to ensure reliable fruiting.`}
      ],
      varieties:[
        {name:'Lemon \'Eureka\'', agm:false, desc:'The most reliable UK conservatory lemon. Near-continuous fruiting. High yield.'},
        {name:'Lemon \'Quatre Saisons\'', agm:false, desc:'Four Seasons lemon — crops multiple times per year. Excellent flavour.'},
        {name:'Calamondin Orange', agm:false, desc:'Tiny ornamental orange. Extremely heavy-cropping. Very sour — best for marmalade.'},
        {name:'Clementine / Satsuma', agm:false, desc:'Compact mandarin types. Sweeter than lemons. Need warmer conditions to ripen fruit.'}
      ],
      warning:`Scale insects and mealybug are the two most common citrus pests under glass. Inspect undersides of leaves and stem junctions monthly. Treat with plant oil spray or introduce Cryptolaemus ladybirds for mealybug. Yellowing leaves usually mean insufficient feeding or waterlogging — diagnose before treating.`
    }
  ]
};


// ── SOIL COMPATIBILITY DATA ──
const soilData = {
  "tomato": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Pure sand"
    ],
    "ph": "6.0\u20136.8",
    "notes": "Deep, fertile, free-draining. Add compost generously."
  },
  "courgette": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Waterlogged"
    ],
    "ph": "5.5\u20137.0",
    "notes": "Hungry plants \u2014 dig in plenty of organic matter."
  },
  "squash": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Poor sandy",
      "Waterlogged"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Rich, moisture-retentive soil is ideal."
  },
  "cucumber": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Compacted clay"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Well-drained, warm soil. Cold wet soil causes root rot."
  },
  "sweetcorn": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Poor sandy"
    ],
    "ph": "5.8\u20137.0",
    "notes": "Needs warmth and moisture-retentive, fertile soil."
  },
  "aubergine": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Cold heavy clay"
    ],
    "ph": "5.5\u20136.8",
    "notes": "Warm, well-drained soil. Container growing works well."
  },
  "pepper": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Pure sand"
    ],
    "ph": "6.0\u20136.8",
    "notes": "Similar to tomatoes \u2014 warm, fertile, well-drained."
  },
  "carrot": {
    "best": [
      "Sandy loam",
      "Sandy"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Clay",
      "Stony",
      "Freshly manured"
    ],
    "ph": "6.0\u20136.8",
    "notes": "Deep, loose, stone-free soil essential. Stones cause forking."
  },
  "potato": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam",
      "Sandy"
    ],
    "avoid": [
      "Waterlogged",
      "Alkaline chalk"
    ],
    "ph": "5.0\u20136.0",
    "notes": "Slightly acid, well-drained. Liming increases scab risk."
  },
  "beetroot": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Very acidic",
      "Waterlogged",
      "Stony"
    ],
    "ph": "6.5\u20137.5",
    "notes": "Dislikes acid soils \u2014 add lime if pH below 6.5."
  },
  "parsnip": {
    "best": [
      "Deep loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Stony",
      "Freshly manured",
      "Clay"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Deep, stone-free soil for long straight roots."
  },
  "turnip": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Very sandy",
      "Acid"
    ],
    "ph": "6.0\u20137.5",
    "notes": "Moisture-retentive soil. Avoid drought-prone sandy beds."
  },
  "swede": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Acid",
      "Waterlogged"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Needs firm, fertile soil. Lime if below pH 6."
  },
  "asparagus": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Sandy"
    ],
    "avoid": [
      "Clay",
      "Waterlogged",
      "Compacted"
    ],
    "ph": "6.5\u20137.5",
    "notes": "Drainage is critical \u2014 waterlogging kills crowns. Raised beds ideal on clay."
  },
  "kale": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam",
      "Clay"
    ],
    "avoid": [
      "Waterlogged",
      "Very acid"
    ],
    "ph": "6.5\u20137.5",
    "notes": "Firm, fertile soil. Lime if below pH 6.5 to prevent clubroot."
  },
  "sprouts": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Clay"
    ],
    "avoid": [
      "Sandy",
      "Waterlogged",
      "Loose"
    ],
    "ph": "6.5\u20137.5",
    "notes": "Needs the firmest soil possible. Loose soil causes blown buttons."
  },
  "cabbage": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Clay",
      "Sandy loam"
    ],
    "avoid": [
      "Very acid",
      "Waterlogged"
    ],
    "ph": "6.5\u20137.5",
    "notes": "Heavy, firm soil preferred. Keep pH above 6.5."
  },
  "broccoli": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Waterlogged",
      "Acid"
    ],
    "ph": "6.0\u20137.5",
    "notes": "Fertile, moisture-retentive. Inconsistent moisture causes poor curds."
  },
  "cauliflower": {
    "best": [
      "Deep loam",
      "Clay loam"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Sandy",
      "Waterlogged",
      "Acid"
    ],
    "ph": "6.5\u20137.5",
    "notes": "Needs deep, consistently moist, fertile soil. Very sensitive to drought."
  },
  "kohlrabi": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Compacted"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Light, fertile soil for quick growth. Heavy clay stunts development."
  },
  "onion": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Freshly manured",
      "Acid"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Firm, well-drained soil. Fresh manure causes soft bulbs prone to rot."
  },
  "garlic": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Waterlogged",
      "Heavy clay",
      "Acid"
    ],
    "ph": "6.0\u20137.5",
    "notes": "Free-draining soil is essential \u2014 standing water rots bulbs."
  },
  "leek": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam",
      "Clay"
    ],
    "avoid": [
      "Waterlogged",
      "Compacted"
    ],
    "ph": "6.0\u20137.5",
    "notes": "Deep, rich soil for long, blanched shafts. Tolerates heavier soils well."
  },
  "shallot": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Waterlogged",
      "Heavy clay",
      "Freshly manured"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Similar to onions \u2014 light, free-draining, fertile soil."
  },
  "runner": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Waterlogged",
      "Very sandy"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Deep, moisture-retentive soil. Dig a bean trench with compost in winter."
  },
  "broadbean": {
    "best": [
      "Loam",
      "Clay loam",
      "Clay"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Waterlogged",
      "Acid"
    ],
    "ph": "6.0\u20137.5",
    "notes": "Tolerates heavier soils better than most crops. Fix nitrogen into soil."
  },
  "peas": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Compacted",
      "Very acid"
    ],
    "ph": "6.0\u20137.5",
    "notes": "Well-drained but moisture-retentive. Fix atmospheric nitrogen."
  },
  "frenchbean": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Heavy clay",
      "Waterlogged",
      "Cold"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Light, well-drained soil. Cold heavy clay delays germination and rots seed."
  },
  "lettuce": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam",
      "Sandy"
    ],
    "avoid": [
      "Waterlogged",
      "Very poor"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Moisture-retentive, fertile soil. Tolerates light shade and most soils."
  },
  "radish": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Sandy",
      "Clay loam"
    ],
    "avoid": [
      "Stony",
      "Compacted",
      "Freshly manured"
    ],
    "ph": "5.8\u20136.8",
    "notes": "Fast-growing in almost any well-drained soil. Avoid recently manured beds."
  },
  "spinach": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam"
    ],
    "avoid": [
      "Acid",
      "Waterlogged",
      "Dry sandy"
    ],
    "ph": "6.5\u20137.5",
    "notes": "Needs consistently moist, nutrient-rich soil. Bolts in dry, poor conditions."
  },
  "rocket": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Most soils"
    ],
    "avoid": [
      "Waterlogged"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Very adaptable. Grows in most soils \u2014 best flavour in slightly poor soil."
  },
  "springonion": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Compacted"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Light, open, well-drained soil for straight stems."
  },
  "basil": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Waterlogged",
      "Cold heavy clay",
      "Wet"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Light, well-drained, warm soil. Cold wet compost causes damping off."
  },
  "mint": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Most moist soils"
    ],
    "avoid": [
      "Dry sandy",
      "Very acid"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Prefers moisture-retentive soil. Grow in containers to prevent spread."
  },
  "chive": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Most soils"
    ],
    "avoid": [
      "Waterlogged",
      "Very poor"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Very adaptable perennial. Tolerates most well-drained garden soils."
  },
  "parsley": {
    "best": [
      "Loam",
      "Sandy loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Compacted",
      "Dry"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Deep, moist, well-cultivated soil helps roots establish and prevents bolting."
  },
  "rosemary": {
    "best": [
      "Sandy",
      "Sandy loam"
    ],
    "tolerate": [
      "Loam",
      "Chalky"
    ],
    "avoid": [
      "Clay",
      "Waterlogged",
      "Rich acid"
    ],
    "ph": "6.0\u20138.0",
    "notes": "Thrives in poor, dry, alkaline soil \u2014 the opposite of most vegetables."
  },
  "thyme": {
    "best": [
      "Sandy",
      "Sandy loam",
      "Chalky"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Clay",
      "Waterlogged",
      "Rich"
    ],
    "ph": "6.0\u20138.0",
    "notes": "Excellent drainage essential. Poor, dry, alkaline soil gives the best flavour."
  },
  "strawberry": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Heavy clay",
      "Chalky"
    ],
    "ph": "5.5\u20136.5",
    "notes": "Slightly acid, well-drained, fertile soil. Raised beds ideal on heavy clay."
  },
  "raspberry": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Loam"
    ],
    "avoid": [
      "Chalk",
      "Waterlogged",
      "Heavy clay"
    ],
    "ph": "6.0\u20136.5",
    "notes": "Well-drained, slightly acid soil. Will not tolerate chalk or waterlogging."
  },
  "apple": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam",
      "Clay"
    ],
    "avoid": [
      "Chalky",
      "Waterlogged",
      "Very sandy"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Deep, fertile, well-drained soil. Good moisture retention essential."
  },
  "pear": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Clay",
      "Sandy loam"
    ],
    "avoid": [
      "Chalky",
      "Waterlogged"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Deeper rooting than apples \u2014 needs deep, well-drained fertile soil."
  },
  "blueberry": {
    "best": [
      "Peat",
      "Sandy acid soil"
    ],
    "tolerate": [
      "Acid sandy loam"
    ],
    "avoid": [
      "Chalk",
      "Alkaline",
      "Clay",
      "Neutral loam"
    ],
    "ph": "4.5\u20135.5",
    "notes": "MUST have acid soil \u2014 non-negotiable. Use ericaceous compost in containers."
  },
  "gooseberry": {
    "best": [
      "Loam",
      "Sandy loam",
      "Clay loam"
    ],
    "tolerate": [
      "Most well-drained soils"
    ],
    "avoid": [
      "Waterlogged",
      "Very poor sandy"
    ],
    "ph": "6.0\u20136.5",
    "notes": "The most tolerant of all fruit bushes. Handles partial shade and most soils."
  },
  "blackcurrant": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam",
      "Clay"
    ],
    "avoid": [
      "Waterlogged",
      "Chalky",
      "Very sandy"
    ],
    "ph": "6.0\u20136.5",
    "notes": "Rich, moisture-retentive soil. Heavy feeders \u2014 mulch generously every year."
  },
  "rhubarb": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam",
      "Clay"
    ],
    "avoid": [
      "Waterlogged",
      "Very poor"
    ],
    "ph": "5.5\u20136.8",
    "notes": "Deep, rich soil preferred. Tolerates heavier soils if not waterlogged."
  },
  "cherry": {
    "best": [
      "Sandy loam",
      "Loam"
    ],
    "tolerate": [
      "Clay loam"
    ],
    "avoid": [
      "Waterlogged",
      "Heavy clay",
      "Chalk"
    ],
    "ph": "6.0\u20137.5",
    "notes": "Free-draining soil essential. Fan train against a warm wall on poor soils."
  },
  "plum": {
    "best": [
      "Loam",
      "Clay loam"
    ],
    "tolerate": [
      "Sandy loam",
      "Clay"
    ],
    "avoid": [
      "Waterlogged",
      "Chalky",
      "Very sandy"
    ],
    "ph": "6.0\u20137.0",
    "notes": "Heavy, moisture-retentive soil suits plums well. More tolerant than cherries."
  },
  "blackberry": {
    "best": [
      "Loam",
      "Sandy loam",
      "Clay loam"
    ],
    "tolerate": [
      "Clay",
      "Acid sandy"
    ],
    "avoid": [
      "Waterlogged",
      "Chalky"
    ],
    "ph": "5.5\u20137.0",
    "notes": "Toughest fruiting plant \u2014 tolerates almost any soil except chalk and bog."
  },
  "pumpkin": { "best":["Loam","Clay loam"], "tolerate":["Sandy loam"], "avoid":["Waterlogged","Poor sandy"], "ph":"6.0\u20137.0", "notes":"Rich, moisture-retentive soil is ideal. Same requirements as squash." },
  "sweetpotato": { "best":["Sandy loam","Sandy"], "tolerate":["Loam"], "avoid":["Clay","Waterlogged","Chalky"], "ph":"5.5\u20136.5", "notes":"Light, warm, free-draining soil essential. Heavy clay and cold soils cause failure." },
  "celeriac": { "best":["Loam","Clay loam"], "tolerate":["Sandy loam"], "avoid":["Sandy","Dry","Waterlogged"], "ph":"6.0\u20137.0", "notes":"Moisture-retentive fertile soil. Never allow to dry out." },
  "jerusalem": { "best":["Loam","Sandy loam","Clay loam"], "tolerate":["Clay","Sandy","Poor soil"], "avoid":["Waterlogged"], "ph":"5.5\u20137.5", "notes":"Tolerates almost any soil including poor and partial shade. Remarkably adaptable." },
  "calabrese": { "best":["Loam","Clay loam"], "tolerate":["Sandy loam"], "avoid":["Acid","Waterlogged","Poor sandy"], "ph":"6.5\u20137.5", "notes":"Firm, fertile soil. Lime to raise pH above 6.8 to prevent clubroot." },
  "chinesecabbage": { "best":["Loam","Sandy loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Acid"], "ph":"6.5\u20137.0", "notes":"Fertile, moisture-retentive, well-drained soil. Keep pH above 6.5 to prevent clubroot." },
  "pakchoi": { "best":["Loam","Sandy loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Very acid"], "ph":"6.0\u20137.0", "notes":"Fertile, well-drained soil. Very adaptable but benefits from moisture retention." },
  "soyabean": { "best":["Sandy loam","Loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Cold heavy clay"], "ph":"6.0\u20137.0", "notes":"Well-drained, warm soil essential. Like French beans — needs warmth and drainage." },
  "chard": { "best":["Loam","Clay loam","Sandy loam"], "tolerate":["Most soils"], "avoid":["Waterlogged","Very acid"], "ph":"6.0\u20137.5", "notes":"Highly adaptable. Performs well in most soils with adequate moisture." },
  "chicory": { "best":["Loam","Sandy loam"], "tolerate":["Clay loam","Sandy"], "avoid":["Waterlogged","Compacted"], "ph":"5.5\u20137.0", "notes":"Tolerates poor soils well. Deep, free-draining soil helps witloof root development." },
  "fennel": { "best":["Sandy loam","Loam"], "tolerate":["Chalky"], "avoid":["Waterlogged","Cold heavy clay"], "ph":"6.5\u20137.5", "notes":"Free-draining, warm soil. Tolerates chalky conditions better than most crops." },
  "celery": { "best":["Loam","Clay loam"], "tolerate":["Sandy loam"], "avoid":["Sandy","Waterlogged","Acid","Dry"], "ph":"6.5\u20137.5", "notes":"Needs deep, consistently moist fertile soil. Very sensitive to drought." },
  "globeartichoke": { "best":["Loam","Sandy loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Heavy clay","Cold wet"], "ph":"6.0\u20137.0", "notes":"Deep, fertile, free-draining soil. Perennial — prepare the bed well before planting." },
  "redcurrant":   { "best":["Loam","Sandy loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Very acid"], "ph":"6.0\u20137.0", "notes":"Well-drained, fertile soil. Tolerates partial shade better than most soft fruit." },
  "grape":        { "best":["Sandy loam","Chalky"], "tolerate":["Loam"], "avoid":["Waterlogged","Acid","Rich heavy clay"], "ph":"6.0\u20137.5", "notes":"Free-draining, lean soil. Chalky, alkaline soils give excellent results. Too-rich soil means excess leafy growth." },
  "melon":        { "best":["Loam","Sandy loam"], "tolerate":["Clay loam"], "avoid":["Cold","Waterlogged","Sandy"], "ph":"6.0\u20137.0", "notes":"Rich, warm, moisture-retentive greenhouse soil or large containers." },
  "peach":        { "best":["Sandy loam","Loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Very heavy clay","Chalky"], "ph":"6.0\u20137.0", "notes":"Well-drained, fertile soil. Avoid chalky soils where possible." },
  "nectarine":    { "best":["Sandy loam","Loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Very heavy clay"], "ph":"6.0\u20137.0", "notes":"Identical requirements to peach. Free-draining, fertile soil." },
  "apricot":      { "best":["Sandy loam","Chalky"], "tolerate":["Loam"], "avoid":["Waterlogged","Acid","Heavy clay"], "ph":"6.5\u20137.5", "notes":"Tolerates alkaline and chalky soils well. Free-draining essential." },
  "gage":         { "best":["Loam","Clay loam"], "tolerate":["Sandy loam","Clay"], "avoid":["Waterlogged","Chalky","Very sandy"], "ph":"6.0\u20137.0", "notes":"Same requirements as plums. Rich, moisture-retentive soil preferred." },
  "quince":       { "best":["Loam","Clay loam"], "tolerate":["Clay","Sandy loam","Moisture-retentive"], "avoid":["Very sandy","Drought-prone"], "ph":"6.0\u20137.0", "notes":"Tolerates heavier, wetter soils than most fruit trees. Moisture-retentive is ideal." },
  "fig":          { "best":["Sandy loam","Loam"], "tolerate":["Chalky","Stony"], "avoid":["Rich","Waterlogged","Heavy manured"], "ph":"6.0\u20137.5", "notes":"Poor to moderate fertility with restricted root run. Rich soil produces growth not fruit." },
  "kiwi":         { "best":["Loam","Sandy loam"], "tolerate":["Clay loam"], "avoid":["Waterlogged","Very alkaline","Compacted"], "ph":"5.5\u20137.0", "notes":"Fertile, well-drained. Slightly acid preferred. Avoid waterlogging." },
  "mulberry":     { "best":["Loam","Clay loam"], "tolerate":["Sandy loam","Clay"], "avoid":["Waterlogged","Shallow chalk"], "ph":"6.0\u20137.5", "notes":"Deep, well-drained but moisture-retentive soil. Tolerates heavier soils well." },
  "olive":        { "best":["Sandy loam","Chalky","Stony"], "tolerate":["Sandy"], "avoid":["Waterlogged","Heavy clay","Acid"], "ph":"6.5\u20138.0", "notes":"Very well-drained, lean, alkaline soil. Excellent on chalk. Waterlogging is fatal." },
  "citrus":       { "best":["Sandy loam","Container mix"], "tolerate":["Loam"], "avoid":["Waterlogged","Cold","Alkaline"], "ph":"5.5\u20136.5", "notes":"Slightly acid, very well-drained compost in containers. Citrus-specific compost recommended." },
  "endive":       { "best":["Loam","Sandy loam"], "tolerate":["Clay loam","Sandy"], "avoid":["Waterlogged","Very acid"], "ph":"6.0\u20137.0", "notes":"Fertile, well-drained soil. Very adaptable. Tolerates light shade well." },
  "cornsalad":    { "best":["Most soils"], "tolerate":["Poor sandy","Clay","Loam"], "avoid":["Waterlogged"], "ph":"5.5\u20137.0", "notes":"Extremely tolerant of poor soils and partial shade. One of the least demanding crops." },
  "mizuna":       { "best":["Loam","Sandy loam"], "tolerate":["Most soils"], "avoid":["Waterlogged","Very acid"], "ph":"6.0\u20137.0", "notes":"Very adaptable. Grows in most well-drained soils. Light feeding recommended for cut-and-come-again use." },
  "gardencress":  { "best":["Most soils","Tissue/paper (indoor)"], "tolerate":["Any"], "avoid":["Waterlogged"], "ph":"5.5\u20137.0", "notes":"Extraordinarily tolerant. Can be grown on damp paper tissue. Almost no soil requirements." },
  "sorrel":       { "best":["Loam","Clay loam"], "tolerate":["Most soils","Partial shade"], "avoid":["Very dry","Very alkaline"], "ph":"5.5\u20136.5", "notes":"Tolerates shade and most soils. Slightly acid preferred. Very adaptable perennial." },
  "oregano":      { "best":["Sandy loam","Chalky","Poor dry"], "tolerate":["Loam"], "avoid":["Rich","Waterlogged","Heavy clay"], "ph":"6.0\u20138.0", "notes":"Thrives in poor, dry, alkaline soils. Rich soil produces lush, flavourless growth." },
  "coriander":    { "best":["Loam","Sandy loam"], "tolerate":["Most soils"], "avoid":["Waterlogged","Compacted"], "ph":"6.0\u20137.0", "notes":"Well-drained, moisture-retentive soil. Bolts from dry, hot or disturbed conditions." },
  "lemonbalm":    { "best":["Loam","Clay loam","Sandy loam"], "tolerate":["Most soils"], "avoid":["Very dry"], "ph":"5.5\u20137.0", "notes":"Very adaptable. Prefers slightly moist conditions. Tolerates partial shade well." },
  "chamomile":    { "best":["Sandy loam","Loam"], "tolerate":["Poor sandy","Chalky"], "avoid":["Waterlogged","Rich heavy"], "ph":"5.6\u20137.5", "notes":"Tolerates poor, dry soils. German chamomile thrives on disturbed, fairly infertile ground." },
  "watermelon":   { "best":["Sandy loam","Loam"], "tolerate":["Sandy"], "avoid":["Waterlogged","Cold","Clay","Chalk"], "ph":"6.0\u20137.0", "notes":"Light, warm, free-draining soil with excellent heat retention. Rich compost essential. Greenhouse only in UK." }
};

// ── STORAGE & FREEZING DATA ──
const storageData = {
  // FRUITING
  tomato: {
    store: { method:'Room temperature', duration:'1–2 weeks', detail:'Never refrigerate — cold destroys flavour and texture. Store on a windowsill or kitchen counter, stem end down. Ripen green tomatoes indoors in a single layer near a banana.', icon:'🍅' },
    freeze: { suitable:true, prep:'Blanching not needed. Freeze whole (for cooking) or chopped. Score and freeze on a tray first, then bag. Roasted/pureed tomatoes freeze extremely well.', duration:'Up to 12 months', thaw:'Use from frozen in sauces, soups, stews — skin slips off after freezing.' }
  },
  courgette: {
    store: { method:'Refrigerator', duration:'4–7 days', detail:'Keep whole and unwashed in the fridge crisper. Best used as fresh as possible — quality declines quickly. Marrows store much longer (2–3 months in a cool, dry place).', icon:'🥒' },
    freeze: { suitable:true, prep:'Slice or dice, blanch in boiling water for 2 minutes, plunge into ice water, drain and dry thoroughly. Freeze flat on a tray before bagging.', duration:'Up to 10 months', thaw:'Use from frozen in cooking — will be soft after freezing, not suitable for raw use.' }
  },
  squash: {
    store: { method:'Cool, dry, dark place', duration:'3–6 months', detail:'The best storing vegetable there is. Cure first by leaving in sun or on a warm windowsill for 10–14 days to harden the skin. Store on a rack or wooden shelf — never on cold concrete. Do not stack. Check monthly for soft spots.', icon:'🎃' },
    freeze: { suitable:true, prep:'Peel, deseed, cube, blanch for 2 minutes, cool, dry, and freeze on a tray before bagging. Or roast and freeze as a purée.', duration:'Up to 12 months', thaw:'Defrost in fridge overnight. Use in soups, stews, curries, or reheat from frozen.' }
  },
  cucumber: {
    store: { method:'Refrigerator', duration:'5–7 days', detail:'Wrap cut cucumbers tightly in film. Whole cucumbers prefer 10–13°C — the fridge is slightly too cold. Keep away from ethylene-producing fruits (tomatoes, apples) as they accelerate yellowing.', icon:'🥒' },
    freeze: { suitable:false, prep:'Not recommended for whole or sliced cucumber — cell structure collapses and becomes waterlogged after thawing.', duration:'N/A', thaw:'Pickled cucumber (gherkins) can be made and stored in jars for 6+ months.' }
  },
  sweetcorn: {
    store: { method:'Refrigerator (unhusked)', duration:'1–3 days', detail:'Sweetcorn converts sugar to starch within hours of picking — eat the same day if possible. Keep in the husk in the fridge to slow this. "Rush it from plot to pot" is the golden rule.', icon:'🌽' },
    freeze: { suitable:true, prep:'Blanch whole cobs for 4 minutes, cool completely, then freeze whole or cut kernels off the cob and freeze loose on a tray.', duration:'Up to 12 months', thaw:'Cook from frozen — drop frozen corn into boiling water for 3–4 minutes. Excellent quality after freezing.' }
  },
  aubergine: {
    store: { method:'Room temperature (short) or fridge', duration:'3–5 days', detail:'Aubergines are cold-sensitive — prefer 10–13°C. The fridge is acceptable for short periods. Use quickly — they deteriorate fast once cut.', icon:'🍆' },
    freeze: { suitable:true, prep:'Best frozen cooked: roast or grill slices first, cool, then freeze in portions. Raw aubergine becomes mushy after freezing.', duration:'Up to 10 months', thaw:'Use directly from frozen in cooked dishes — moussaka, ratatouille, curries.' }
  },
  pepper: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Store whole peppers in the fridge crisper unwashed. Cut peppers should be wrapped tightly and used within 3 days. Red and yellow last slightly less well than green.', icon:'🫑' },
    freeze: { suitable:true, prep:'Halve, deseed, and freeze raw without blanching — peppers are one of the few vegetables that freeze well without blanching. Slice or dice, spread on a tray to freeze, then bag.', duration:'Up to 12 months', thaw:'Use directly from frozen in cooking. Not suitable for raw use after freezing.' }
  },
  // ROOTS
  carrot: {
    store: { method:'Refrigerator or root clamp', duration:'3–4 weeks (fridge) · 4–5 months (clamp)', detail:'Remove tops before storing — they draw moisture from the root. Fridge: in a bag or container. Outdoors: store in a box of slightly damp sand in a cool shed. In the ground: leave until needed, protect with straw if hard frosts expected.', icon:'🥕' },
    freeze: { suitable:true, prep:'Peel, slice or dice, blanch for 3–5 minutes, cool, dry, and freeze on a tray.', duration:'Up to 12 months', thaw:'Cook from frozen. Excellent in stews, soups, and casseroles. Quality is very good after freezing.' }
  },
  potato: {
    store: { method:'Dark, cool, dry, frost-free', duration:'2–6 months', detail:'Store in paper sacks, hessian bags, or wooden crates — never plastic (causes sweating and rot). Keep in complete darkness (light turns them green and toxic). Check regularly and remove any that show rot before it spreads. Ideal temperature: 4–7°C.', icon:'🥔' },
    freeze: { suitable:true, prep:'Raw potatoes cannot be frozen — they go grainy. Blanch diced potatoes for 3 minutes, or freeze as mash, roasties (par-cooked), or chips (par-fried).', duration:'Up to 12 months', thaw:'Cook from frozen — roasties and chips go straight in the oven from frozen for best results.' }
  },
  beetroot: {
    store: { method:'Refrigerator or root clamp', duration:'2–4 weeks (fridge) · 3–4 months (clamp)', detail:'Twist off tops 2–3cm from the crown — do not cut (causes bleeding). Store in damp sand like carrots. Cooked beetroot keeps in the fridge for up to a week. Pickled beetroot keeps indefinitely.', icon:'🫀' },
    freeze: { suitable:true, prep:'Cook fully, cool, peel, slice or dice, then freeze. Raw beetroot does not freeze well.', duration:'Up to 12 months', thaw:'Defrost in fridge overnight. Use cold in salads or reheat gently.' }
  },
  parsnip: {
    store: { method:'In the ground or refrigerator', duration:'Until spring in ground · 2–3 weeks in fridge', detail:'Parsnips are best left in the ground and dug as needed — frost actually improves the flavour by converting starch to sugar. If lifted, store like carrots in slightly damp sand in a cool place.', icon:'🌻' },
    freeze: { suitable:true, prep:'Peel, cut into chunks, blanch for 3 minutes, cool, dry, freeze on a tray. Or par-roast and freeze as part of a roast veg mix.', duration:'Up to 12 months', thaw:'Roast from frozen (excellent) or add frozen to stews and soups.' }
  },
  turnip: {
    store: { method:'Root clamp or refrigerator', duration:'1–2 months', detail:'Trim roots and leaves, store in damp sand in a cool shed. Small turnips keep 2–3 weeks in the fridge. Best used fresh.', icon:'🟤' },
    freeze: { suitable:true, prep:'Peel, dice, blanch for 2 minutes, cool, dry, and freeze.', duration:'Up to 10 months', thaw:'Cook from frozen in soups and stews.' }
  },
  swede: {
    store: { method:'In the ground or cool store', duration:'Until spring in ground · 2–3 months in store', detail:'Leave in the ground if possible — frost improves sweetness. If lifted, store like turnips in cool conditions. Keeps very well.', icon:'🟤' },
    freeze: { suitable:true, prep:'Peel, dice, blanch for 3 minutes, cool, and freeze. Or freeze as mashed swede.', duration:'Up to 12 months', thaw:'Reheat from frozen in stews or as mash.' }
  },
  asparagus: {
    store: { method:'Refrigerator — standing in water', duration:'3–5 days', detail:'Stand spears upright in a jar with 2–3cm of water (like flowers), cover loosely with a bag, and refrigerate. Asparagus loses sweetness fast after cutting — eat as fresh as possible.', icon:'🌿' },
    freeze: { suitable:true, prep:'Blanch for 2–3 minutes depending on thickness, cool in ice water, dry thoroughly, and freeze on a tray before bagging.', duration:'Up to 12 months', thaw:'Cook from frozen — steam or boil for 2–3 minutes. Quality is good but softer than fresh.' }
  },
  // BRASSICAS
  kale: {
    store: { method:'Refrigerator', duration:'5–7 days', detail:'Unwashed in a bag in the fridge crisper. Blanched and frozen kale is arguably better than fresh for most cooked dishes.', icon:'🥬' },
    freeze: { suitable:true, prep:'Wash, remove tough stalks, blanch for 2 minutes, cool, squeeze out water, and freeze in portions.', duration:'Up to 12 months', thaw:'Add frozen directly to soups, stews, or stir-fries. No need to defrost.' }
  },
  sprouts: {
    store: { method:'On the stalk or refrigerator', duration:'3–5 weeks on stalk · 1 week in fridge', detail:'Leave on the stalk as long as possible — they keep best this way. Cut stalks store in the fridge crisper. Frost improves sweetness.', icon:'🌱' },
    freeze: { suitable:true, prep:'Remove outer leaves, blanch for 4 minutes, cool, dry, and freeze on a tray before bagging.', duration:'Up to 12 months', thaw:'Cook from frozen — add straight to boiling water for 4–5 minutes.' }
  },
  cabbage: {
    store: { method:'Cool, dry place or refrigerator', duration:'1–3 months', detail:'Whole heads store well in a cool shed or garage at 0–5°C. Red and white cabbages keep far longer than green. Remove outer leaves if damaged. Savoy keeps 1–2 weeks maximum.', icon:'🥬' },
    freeze: { suitable:true, prep:'Shred or cut into wedges, blanch for 2–3 minutes, cool, dry, and freeze.', duration:'Up to 12 months', thaw:'Use from frozen in cooked dishes. Not suitable for raw use after freezing.' }
  },
  broccoli: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Keep unwashed, standing upright in a jar of water or in a bag in the crisper. Broccoli wilts quickly — freeze any surplus promptly.', icon:'🥦' },
    freeze: { suitable:true, prep:'Cut into florets, blanch for 3 minutes, cool in ice water, drain, dry, and freeze on a tray. One of the best vegetables for freezing — excellent quality retained.', duration:'Up to 12 months', thaw:'Cook from frozen — 3–4 minutes in boiling water or steam.' }
  },
  cauliflower: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Store whole, head-down in a bag to prevent darkening. Do not wash until use. Cut cauliflower keeps 3–4 days tightly wrapped.', icon:'🥦' },
    freeze: { suitable:true, prep:'Break into florets, blanch for 3 minutes, cool, dry, freeze on a tray. Slightly more prone to mushiness than broccoli — ensure thorough drying before freezing.', duration:'Up to 12 months', thaw:'Cook from frozen. Excellent in soups and gratins.' }
  },
  kohlrabi: {
    store: { method:'Refrigerator', duration:'2–3 weeks', detail:'Remove leaves (use separately) and store bulbs in a bag in the fridge. Keeps well.', icon:'🟢' },
    freeze: { suitable:true, prep:'Peel, dice, blanch for 2 minutes, cool, dry, and freeze.', duration:'Up to 10 months', thaw:'Cook from frozen in stews or soups.' }
  },
  // ALLIUMS
  onion: {
    store: { method:'Cool, dry, dark, well-ventilated', duration:'3–6 months', detail:'The key is ventilation — store in net bags, string, old tights, or on slatted shelves. Never in plastic bags. Keep dry and cool (below 10°C). Check regularly and remove any that soften or sprout before they spread rot.', icon:'🧅' },
    freeze: { suitable:true, prep:'Peel, chop or slice, and freeze raw in bags with no blanching needed. Frozen onions are perfect for cooked dishes and save enormous prep time.', duration:'Up to 12 months', thaw:'Add frozen directly to cooking — they defrost in seconds in the pan.' }
  },
  garlic: {
    store: { method:'Cool, dry, dark, well-ventilated', duration:'6–9 months', detail:'Braid or hang whole bulbs, or store loose in a mesh bag or basket. Needs airflow to prevent mould. Avoid the fridge — moisture causes it to sprout. Properly cured and stored garlic is one of the longest-storing crops.', icon:'🧄' },
    freeze: { suitable:true, prep:'Peel and freeze whole cloves, or crush and freeze in ice cube trays with oil for instant ready-to-cook portions. No blanching needed.', duration:'Up to 12 months', thaw:'Use directly from frozen. Frozen garlic is softer but ideal for cooking.' }
  },
  leek: {
    store: { method:'In the ground or refrigerator', duration:'Until spring in ground · 1–2 weeks in fridge', detail:'Best left in the ground until needed — they withstand hard frosts beautifully. Lifted leeks keep 1–2 weeks in the fridge crisper, unwashed with roots intact.', icon:'🧅' },
    freeze: { suitable:true, prep:'Trim, slice into rings, wash thoroughly, blanch for 2 minutes, cool, dry well, and freeze on a tray.', duration:'Up to 10 months', thaw:'Use from frozen in soups, stews, pies. Not suitable for raw use after freezing.' }
  },
  shallot: {
    store: { method:'Cool, dry, dark, well-ventilated', duration:'4–6 months', detail:'Store exactly like onions — in nets or mesh in a cool, airy, dark place. Shallots often store even better than onions when well dried after harvest.', icon:'🧅' },
    freeze: { suitable:true, prep:'Peel, halve or quarter, and freeze raw like onions. No blanching needed.', duration:'Up to 12 months', thaw:'Add frozen directly to cooking.' }
  },
  // LEGUMES
  runner: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Keep unwashed in a bag in the fridge crisper. Runner beans deteriorate quickly — freeze any surplus same day as picking for best quality.', icon:'🫘' },
    freeze: { suitable:true, prep:'Top, tail, and slice diagonally. Blanch for 3 minutes, cool in ice water, dry thoroughly, and freeze on a tray before bagging. One of the best crops for freezing.', duration:'Up to 12 months', thaw:'Cook from frozen — drop straight into boiling water for 4–5 minutes.' }
  },
  broadbean: {
    store: { method:'Refrigerator (podded)', duration:'3–5 days', detail:'Keep pods in the fridge. Best used fresh. Large or old beans develop a tough skin — double-peel after cooking for finest flavour.', icon:'🫘' },
    freeze: { suitable:true, prep:'Pod the beans, blanch for 2 minutes, cool, and freeze. Double-podding after freezing and thawing gives the most delicate result. Broad beans freeze exceptionally well.', duration:'Up to 12 months', thaw:'Cook from frozen — 3–4 minutes in boiling water.' }
  },
  peas: {
    store: { method:'Refrigerator (podded)', duration:'2–3 days', detail:'Peas convert sugar to starch within hours of picking. The fridge slows this dramatically. Pod just before eating or freezing for best flavour.', icon:'🫛' },
    freeze: { suitable:true, prep:'Pod, blanch for just 1 minute, cool quickly in ice water, drain, dry, and freeze loose on a tray. Peas freeze better than almost any other vegetable — virtually indistinguishable from fresh when done well.', duration:'Up to 12 months', thaw:'Cook from frozen — 2–3 minutes in boiling water. Do not overcook.' }
  },
  frenchbean: {
    store: { method:'Refrigerator', duration:'4–5 days', detail:'Keep whole and unwashed in a bag in the fridge crisper. Like runner beans, freeze the surplus on the day of picking.', icon:'🫘' },
    freeze: { suitable:true, prep:'Top and tail, blanch for 3 minutes, cool, dry, and freeze on a tray. Excellent quality after freezing.', duration:'Up to 12 months', thaw:'Cook from frozen — 4 minutes in boiling water.' }
  },
  // SALADS
  lettuce: {
    store: { method:'Refrigerator', duration:'3–7 days', detail:'Store whole heads unwashed in a bag with a sheet of kitchen paper to absorb moisture. Cut and mixed leaves keep 2–3 days. Keep away from ethylene-producing fruits.', icon:'🥬' },
    freeze: { suitable:false, prep:'Lettuce cannot be frozen — water content is too high and cells collapse completely on thawing.', duration:'N/A', thaw:'Grow little and often (cut-and-come-again varieties) to avoid surplus.' }
  },
  radish: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Remove tops (they draw out moisture). Store in a bag with a damp cloth in the fridge crisper. Tops can be used in stir-fries or soups.', icon:'🔴' },
    freeze: { suitable:false, prep:'Radishes cannot be frozen — they become hollow and pithy after thawing.', duration:'N/A', thaw:'Sow every 2–3 weeks for continuous fresh supply instead.' }
  },
  spinach: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store unwashed in a loose bag. Wilts quickly once washed. Baby leaf spinach deteriorates faster than full-sized leaves.', icon:'🥬' },
    freeze: { suitable:true, prep:'Blanch for 1–2 minutes, cool, squeeze out as much water as possible, and freeze in portions. Frozen spinach is excellent for cooked dishes.', duration:'Up to 12 months', thaw:'Squeeze defrosted spinach to remove water before using. Add frozen to soups and curries.' }
  },
  rocket: {
    store: { method:'Refrigerator', duration:'2–4 days', detail:'Store loosely in a bag with a damp paper towel. Rocket wilts quickly — best used very fresh. Wild (perennial) rocket keeps slightly longer than annual varieties.', icon:'🌿' },
    freeze: { suitable:false, prep:'Rocket cannot be frozen usefully — becomes limp and unpalatable after thawing.', duration:'N/A', thaw:'Grow in small patches and harvest regularly for continuous supply.' }
  },
  springonion: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Store upright in a glass of water in the fridge (like cut flowers), loosely covered. This keeps them perky for much longer than loose in a bag.', icon:'🧅' },
    freeze: { suitable:true, prep:'Chop and freeze raw without blanching. Excellent for cooking — not suitable for fresh use after freezing.', duration:'Up to 3 months', thaw:'Add frozen directly to cooking — they are ready to use instantly.' }
  },
  // HERBS
  basil: {
    store: { method:'Room temperature in water', duration:'1–2 weeks', detail:'Do NOT refrigerate — basil turns black in the cold. Stand stems in a glass of water at room temperature, loosely covered, away from direct sunlight. Change water every 2 days.', icon:'🌿' },
    freeze: { suitable:true, prep:'Blend fresh basil with olive oil and freeze in ice cube trays. Or freeze leaves flat on a tray then bag. Do not blanch.', duration:'Up to 6 months', thaw:'Add frozen basil-oil cubes directly to pasta, risotto, or sauces.' }
  },
  mint: {
    store: { method:'Refrigerator or water', duration:'1–2 weeks', detail:'Store in water like basil (room temp) or wrapped in a damp cloth in the fridge. Dries well — hang bunches upside down.', icon:'🌿' },
    freeze: { suitable:true, prep:'Freeze in ice cube trays with water (for drinks and sauces) or blanch briefly and freeze in bags for cooking.', duration:'Up to 6 months', thaw:'Mint ice cubes go directly into drinks or sauces.' }
  },
  chive: {
    store: { method:'Refrigerator or pot on windowsill', duration:'1–2 weeks cut · ongoing growing', detail:'Cut chives keep 1–2 weeks in a damp bag in the fridge. Better: keep a pot growing on the windowsill and snip as needed throughout winter.', icon:'🌿' },
    freeze: { suitable:true, prep:'Chop and freeze raw in small portions. No blanching needed. One of the easiest herbs to freeze.', duration:'Up to 6 months', thaw:'Add frozen directly to dishes — no defrosting needed.' }
  },
  parsley: {
    store: { method:'Refrigerator or water', duration:'1–2 weeks', detail:'Store flat-leaf parsley in water at room temperature (like basil). Curly parsley keeps better wrapped in a damp cloth in the fridge. Both dry well if hung upside down.', icon:'🌿' },
    freeze: { suitable:true, prep:'Chop and freeze in small bags or ice cube trays. No blanching needed. Frozen parsley crumbles easily when frozen — very convenient for cooking.', duration:'Up to 6 months', thaw:'Crumble frozen directly into dishes.' }
  },
  rosemary: {
    store: { method:'Refrigerator or dried', duration:'2–3 weeks fresh · 1–2 years dried', detail:'Wrap in a damp cloth and refrigerate, or keep in a glass of water. Far better dried — hang bunches in a warm, dry, airy place for 2 weeks. Dried rosemary is arguably more useful than fresh for cooking.', icon:'🌿' },
    freeze: { suitable:true, prep:'Freeze whole sprigs. The frozen needles crumble off the stem easily for use.', duration:'Up to 6 months', thaw:'Use frozen sprigs directly in roasting or infusing.' }
  },
  thyme: {
    store: { method:'Refrigerator or dried', duration:'1–2 weeks fresh · 1–2 years dried', detail:'Like rosemary, thyme dries exceptionally well. Hang bunches to dry and store in a sealed jar. Fresh thyme keeps 1–2 weeks loosely wrapped in the fridge.', icon:'🌿' },
    freeze: { suitable:true, prep:'Freeze whole sprigs. The frozen leaves crumble off easily.', duration:'Up to 6 months', thaw:'Use from frozen directly — the flavour is excellent.' }
  },
  // FRUITS
  strawberry: {
    store: { method:'Refrigerator', duration:'2–3 days', detail:'Store unwashed in a single layer on kitchen paper. Do not hull until eating. Strawberries deteriorate rapidly — freeze any surplus on the day of picking.', icon:'🍓' },
    freeze: { suitable:true, prep:'Hull, spread on a tray in a single layer, freeze solid, then transfer to bags. Freezing whole gives the best texture for smoothies and jam-making. For sliced, sprinkle with a little sugar before freezing.', duration:'Up to 12 months', thaw:'Use from frozen for smoothies, jam, compote. Defrost in fridge for eating — texture will be softer but flavour excellent.' }
  },
  raspberry: {
    store: { method:'Refrigerator', duration:'2–4 days', detail:'Handle minimally — raspberries crush and mould rapidly. Spread in a single layer unwashed. Freeze the surplus immediately after picking for best quality.', icon:'🍇' },
    freeze: { suitable:true, prep:'Spread in a single layer on a tray and freeze solid before bagging — this prevents them clumping. One of the best fruits for freezing; virtually identical in flavour to fresh when used in cooking.', duration:'Up to 12 months', thaw:'Use from frozen in baking, smoothies, sauces. Defrost in fridge for fresh use.' }
  },
  apple: {
    store: { method:'Cool, dark, frost-free store', duration:'1–5 months depending on variety', detail:'Wrap individual apples in newspaper and layer in slatted crates or on shelves — never touching each other. Check every 2 weeks and remove any that soften. Late season varieties (Cox, Bramley) store far longer than early (Discovery). Temperature: 1–4°C.', icon:'🍎' },
    freeze: { suitable:true, prep:'Peel, core, and slice. To prevent browning, dip in lemon juice water. Blanch for 2 minutes, cool, and freeze on a tray. Alternatively freeze as stewed or pureed apple — this stores extremely well.', duration:'Up to 12 months', thaw:'Use from frozen in pies, crumbles, and sauces. Purée thaws in the fridge overnight.' }
  },
  pear: {
    store: { method:'Cool store or refrigerator when ripe', duration:'1–3 months', detail:'Pears ripen from the inside out and can go from unripe to overripe overnight. Store firm pears in a cool place; move to a warm room to ripen for 2–3 days. Refrigerate once ripe. Most varieties do not store as long as apples.', icon:'🍐' },
    freeze: { suitable:true, prep:'Peel, core, quarter, and poach gently in light syrup for 2–3 minutes before freezing. Raw frozen pears become grainy on thawing.', duration:'Up to 10 months', thaw:'Defrost in fridge. Use in desserts, crumbles, and poached pear dishes.' }
  },
  blueberry: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Do not wash until eating — the bloom (white coating) protects the berry and should not be removed. Store in the original punnet or a breathable container.', icon:'🫐' },
    freeze: { suitable:true, prep:'Freeze unwashed, straight from picking on a tray in a single layer, then bag. Blueberries freeze exceptionally well — widely regarded as indistinguishable from fresh in baking.', duration:'Up to 12 months', thaw:'Use from frozen in muffins, pancakes, and smoothies. Defrost in fridge for fresh use.' }
  },
  gooseberry: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Store in a breathable container in the fridge. Gooseberries keep longer than most soft fruit — up to 2 weeks if picked slightly under-ripe.', icon:'🟢' },
    freeze: { suitable:true, prep:'Top and tail, spread on a tray and freeze before bagging. No blanching needed. One of the best fruits for freezing — retains excellent cooking quality.', duration:'Up to 12 months', thaw:'Use from frozen in jam, crumbles, fools, and pies.' }
  },
  blackcurrant: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store in a lidded container in the fridge. Do not wash until use. Strip from stalks just before using.', icon:'🖤' },
    freeze: { suitable:true, prep:'Strip from stalks, spread on a tray and freeze loose before bagging. No blanching needed. Frozen blackcurrants make excellent cordial, jam, and crumbles year-round.', duration:'Up to 12 months', thaw:'Use from frozen in cooking — jam-making from frozen blackcurrants works perfectly.' }
  },
  rhubarb: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Store unwashed stalks in a bag in the fridge. Do not store leaves — they are toxic. Rhubarb freezes extremely well and is one of the most practical crops to freeze.', icon:'🌹' },
    freeze: { suitable:true, prep:'Wash, trim, and chop into 2–3cm pieces. No blanching required for rhubarb — simply freeze raw in bags. Will be softer after freezing but perfectly suitable for crumbles, compotes, and jams.', duration:'Up to 12 months', thaw:'Cook from frozen — add straight to the pan. No need to defrost first.' }
  },
  cherry: {
    store: { method:'Refrigerator', duration:'4–7 days', detail:'Store unwashed with stems on in a breathable container. Cherries continue to ripen off the tree — refrigerate promptly after picking. Cold-store cherries should be brought to room temperature before eating for best flavour.', icon:'🍒' },
    freeze: { suitable:true, prep:'Wash, pat dry, pit (optional), and freeze on a tray before bagging. Cherries freeze well and are superb for baking, compotes, and clafoutis year-round.', duration:'Up to 12 months', thaw:'Use from frozen in baking. Defrost in fridge for fresh use — texture will be softer.' }
  },
  plum: {
    store: { method:'Room temperature (ripening) or refrigerator (ripe)', duration:'2–4 days at room temp · 1–2 weeks in fridge', detail:'Allow firm plums to ripen at room temperature. Once ripe, refrigerate immediately — ripe plums deteriorate within days at room temperature. Handle gently.', icon:'🟣' },
    freeze: { suitable:true, prep:'Halve, remove stones, and freeze on a tray before bagging. Or freeze whole. Frozen plums are excellent for jam, crumbles, and chutneys.', duration:'Up to 12 months', thaw:'Cook from frozen in crumbles and compotes. Defrost in fridge for eating fresh — will be softer.' }
  },
  blackberry: {
    store: { method:'Refrigerator', duration:'2–4 days', detail:'Store in a single layer in a breathable container. Blackberries mould extremely quickly — freeze the surplus on the day of picking.', icon:'🫐' },
    freeze: { suitable:true, prep:'Spread on a tray in a single layer and freeze before bagging. No blanching or washing needed before freezing (wash after defrosting). Freeze very well.', duration:'Up to 12 months', thaw:'Use from frozen in crumbles, jams, smoothies, and pies.' }
  },
  // NEW PRODUCE
  pumpkin: {
    store: { method:'Cool, dry, frost-free store', duration:'3–6 months', detail:'Cure first by leaving in full sun or a warm room for 10–14 days to harden the skin. Store on a wooden rack or shelf in a frost-free outbuilding — never on cold concrete which draws moisture. Check monthly for soft spots and remove any that show signs of rot before they spread.', icon:'🎃' },
    freeze: { suitable:true, prep:'Peel, deseed, cube and blanch for 2 minutes, cool, dry and freeze on a tray before bagging. Or roast and freeze as a purée — excellent in soups and risottos.', duration:'Up to 12 months', thaw:'Defrost in fridge overnight. Use in soups, curries, or reheat from frozen.' }
  },
  sweetpotato: {
    store: { method:'Warm, dry, dark place (12–15°C)', duration:'2–3 months', detail:'Sweet potatoes must not be refrigerated — cold below 10°C causes chilling injury and flavour loss. Store in a warm, dry, dark place at 12–15°C. Cure first at 28–32°C for 5–7 days to convert starch to sugar and heal skin wounds. Do not store near apples.', icon:'🍠' },
    freeze: { suitable:true, prep:'Cook first — boil, bake, or steam until tender. Cool, mash or cube and freeze. Raw sweet potato does not freeze well. Cooked mash freezes excellently for 10 months.', duration:'Up to 10 months', thaw:'Defrost in fridge overnight. Reheat gently — ideal in soups, curries, and pies.' }
  },
  celeriac: {
    store: { method:'Cool, moist store or in the ground', duration:'Until spring in ground · 2–3 months in store', detail:'Celeriac stores best left in the ground and dug as needed through winter — it is very frost-hardy in situ. If lifted, remove leaves, pack in slightly damp sand or compost in a cool shed. Check regularly for soft spots.', icon:'⚪' },
    freeze: { suitable:true, prep:'Peel, cube or grate, blanch for 3 minutes, cool, dry, and freeze on a tray. Or freeze as soup or purée — excellent results.', duration:'Up to 10 months', thaw:'Cook from frozen in soups, stews and gratins. Not suitable for raw use after freezing.' }
  },
  jerusalem: {
    store: { method:'In the ground — dig as needed', duration:'Nov–Mar in ground', detail:'Jerusalem artichokes store best in the ground and are harvested as required through winter. If lifted, store in a cool, dark place in barely damp sand — they dry out quickly in a warm environment. Frost converts inulin to fructose, dramatically improving sweetness.', icon:'🌻' },
    freeze: { suitable:true, prep:'Peel, cube, blanch for 2 minutes, cool and freeze. Best frozen as soup — roast first, blend with stock, cool, and freeze in portions.', duration:'Up to 10 months', thaw:'Reheat from frozen in soups and stews.' }
  },
  calabrese: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store upright in the fridge in a glass with 2–3cm of water (like flowers) or wrapped in a damp cloth. Broccoli deteriorates quickly — the florets yellow and the heads lose their tightness. Eat as fresh as possible for best flavour and nutrition.', icon:'🥦' },
    freeze: { suitable:true, prep:'Cut into florets, blanch for 2–3 minutes, plunge into ice water, drain thoroughly, and freeze on a tray before bagging. Frozen broccoli is excellent in stir-fries and pasta dishes.', duration:'Up to 12 months', thaw:'Cook directly from frozen — add to boiling water for 2–3 minutes. Do not defrost first.' }
  },
  chinesecabbage: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Wrap loosely in a damp cloth or paper towel and store in the fridge crisper. Chinese cabbage holds better than soft lettuce but deteriorates faster than white cabbage. Keep away from ethylene-producing fruits.', icon:'🥬' },
    freeze: { suitable:false, prep:'Not recommended for salad use. For cooking (soups, stir-fries), blanch briefly and freeze but texture will be soft after thawing. Best used fresh.', duration:'N/A', thaw:'Use blanched frozen pieces directly in cooked dishes only.' }
  },
  pakchoi: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store unwashed in a perforated bag in the fridge crisper. Pak choi wilts quickly at room temperature. Best harvested and eaten the same day for maximum freshness.', icon:'🥬' },
    freeze: { suitable:false, prep:'Pak choi does not freeze well for fresh use. For cooking, blanch whole leaves for 1 minute, cool, and freeze for use in stir-fries and soups only.', duration:'Up to 3 months (cooked)', thaw:'Use from frozen directly in cooked dishes. Not suitable for salad use after freezing.' }
  },
  soyabean: {
    store: { method:'Refrigerator (green) or dry store (dry beans)', duration:'2–3 days (green pods) · 1 year (dry)', detail:'Green edamame pods: refrigerate and eat within 2–3 days of picking — flavour diminishes rapidly. Dry beans: shell, dry thoroughly in a warm room until they rattle, and store in an airtight jar in a cool, dark place.', icon:'🫘' },
    freeze: { suitable:true, prep:'Green pods: blanch whole pods in boiling salted water for 3 minutes, cool in ice water, dry and freeze. Squeeze beans directly from frozen pods when ready to eat.', duration:'Up to 12 months', thaw:'Cook from frozen in boiling water for 2–3 minutes. Outstanding quality after freezing.' }
  },
  chard: {
    store: { method:'Refrigerator', duration:'4–7 days', detail:'Store unwashed in a perforated bag in the fridge crisper. The stems and leaves keep separately if the stems are particularly thick — stems take longer to cook. Pick young leaves for salad use; larger leaves for cooking.', icon:'🌈' },
    freeze: { suitable:true, prep:'Wash, separate leaves from stems. Blanch leaves for 2 minutes, stems for 3 minutes. Cool in ice water, squeeze out moisture, and freeze in portions.', duration:'Up to 12 months', thaw:'Add frozen directly to soups, stews, pasta and stir-fries. Not suitable for salad use after freezing.' }
  },
  chicory: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Wrap heads in paper towel and store in the fridge. Keep away from light — exposure to light increases bitterness. Witloof chicons should be kept in the dark from production to consumption to maintain their pale colour.', icon:'🥗' },
    freeze: { suitable:false, prep:'Chicory does not freeze well due to its high water content — it becomes very limp after thawing. Best used fresh. Braised chicory can be frozen once cooked.', duration:'N/A', thaw:'Not recommended for raw use. Cooked braised chicory freezes acceptably for up to 3 months.' }
  },
  fennel: {
    store: { method:'Refrigerator', duration:'5–7 days', detail:'Store whole bulbs unwashed in the fridge crisper. The fronds (feathery tops) can be used as a herb. Cut fennel discolours quickly — slice only when ready to use and toss in lemon juice if preparing in advance.', icon:'🌿' },
    freeze: { suitable:true, prep:'Trim, slice into wedges or dice, blanch for 2 minutes, cool, dry, and freeze on a tray. Frozen fennel is suitable for cooked use (soups, roasts, braises) but loses the fresh aniseed crunch.', duration:'Up to 10 months', thaw:'Cook from frozen. Excellent in fish dishes, risottos, and slow-cooked meats.' }
  },
  celery: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Wrap entire celery heads in aluminium foil and refrigerate — this keeps them crisp significantly longer than plastic bags. Cut stalks should be stored in water in the fridge. Celery is one of few vegetables that actually benefits from being stored in the fridge in water.', icon:'🥬' },
    freeze: { suitable:true, prep:'Celery loses all crunch after freezing and is only useful cooked. Chop, blanch for 3 minutes, cool, and freeze in usable portions for soups, stews, and stocks.', duration:'Up to 12 months', thaw:'Add frozen directly to cooked dishes. Do not use in raw applications after freezing.' }
  },
  globeartichoke: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store whole heads upright in the fridge with the cut stem submerged in 2–3cm of water (like flowers). Artichokes deteriorate quickly after harvest. Squeeze lemon juice over cut surfaces to prevent blackening.', icon:'🌸' },
    freeze: { suitable:true, prep:'Cook hearts first — boil whole artichokes for 25–35 minutes until outer leaves pull away easily. Remove leaves and choke, leaving the heart. Freeze hearts individually on a tray, then bag. Alternatively freeze cooked hearts in portions with cooking water.', duration:'Up to 12 months', thaw:'Defrost in fridge overnight. Reheat in butter or use cold in salads. Excellent in risottos.' }
  },
  redcurrant: {
    store: { method:'Refrigerator', duration:'5–7 days on the strig', detail:'Store whole strings (strigs) unwashed in a shallow container. Red and white currants keep significantly longer than blackcurrants or raspberries. Do not wash until just before use.', icon:'🔴' },
    freeze: { suitable:true, prep:'Strip berries from strigs, spread on a tray and freeze before bagging. No blanching required. Freeze extremely well.', duration:'Up to 12 months', thaw:'Use from frozen in jelly, jam, and sauces. Defrost gently for raw use.' }
  },
  grape: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Store whole bunches unwashed in the fridge. Place on a layer of tissue to prevent bruising. Home-grown grapes have thinner skins than shop-bought and deteriorate faster.', icon:'🍇' },
    freeze: { suitable:true, prep:'Remove stems, spread individual grapes on a tray and freeze before bagging. Frozen grapes make an excellent healthy snack eaten directly from frozen.', duration:'Up to 12 months', thaw:'Eat from frozen as a snack or use in smoothies. Not suitable for fresh use after defrosting.' }
  },
  melon: {
    store: { method:'Room temperature until ripe, then refrigerator', duration:'1 week (unripe) · 3–5 days (cut)', detail:'Unripe melons ripen at room temperature. Once ripe (fragrant at stalk end), refrigerate and eat within 3–5 days. Cut melon should be wrapped tightly — the scent permeates other foods strongly.', icon:'🍈' },
    freeze: { suitable:true, prep:'Remove seeds and skin, cut into cubes, freeze on a tray before bagging. Texture changes — suitable for smoothies and sorbets only after freezing.', duration:'Up to 12 months', thaw:'Use from frozen in smoothies or blend for sorbet.' }
  },
  peach: {
    store: { method:'Room temperature (ripening) then refrigerator', duration:'2–3 days at room temp · 5 days in fridge', detail:'Ripe peaches should be eaten immediately. Slightly underripe fruit ripens at room temperature in 1–2 days. Never refrigerate unripe peaches — cold stops the ripening process.', icon:'🍑' },
    freeze: { suitable:true, prep:'Peel, stone, and slice. Toss in lemon juice to prevent browning. Freeze on a tray then bag, or freeze in a light sugar syrup for better texture.', duration:'Up to 12 months', thaw:'Defrost in fridge overnight. Use in crumbles, pies, smoothies. Texture is softer after freezing.' }
  },
  nectarine: {
    store: { method:'Room temperature (ripening) then refrigerator', duration:'2–3 days at room temp · 5 days in fridge', detail:'Store identically to peaches. Nectarines have thinner skin and are slightly more delicate — handle with care to avoid bruising. Eat as soon as ripe for maximum flavour.', icon:'🍑' },
    freeze: { suitable:true, prep:'Stone and slice, toss in lemon juice, freeze on a tray then bag. Nectarines freeze very well for cooked use.', duration:'Up to 12 months', thaw:'Use from frozen in crumbles, pies, jams, and smoothies.' }
  },
  apricot: {
    store: { method:'Room temperature until ripe, then refrigerator', duration:'2–4 days', detail:'Apricots ripen quickly at room temperature. Once ripe, refrigerate and use within 2–4 days. Home-grown apricots have a far shorter shelf life than commercial fruit.', icon:'🟡' },
    freeze: { suitable:true, prep:'Halve, stone, and freeze on a tray then bag. No blanching required. Excellent for jam-making from frozen.', duration:'Up to 12 months', thaw:'Use from frozen in jams, crumbles, pies. Defrost in fridge for fresh use — texture will be softer.' }
  },
  gage: {
    store: { method:'Refrigerator or cool store', duration:'3–7 days', detail:'Greengages are best eaten immediately off the tree — their flavour peaks at the moment of harvest. If storing, keep in the fridge and consume within a week. They do not keep as long as plums.', icon:'🟢' },
    freeze: { suitable:true, prep:'Halve, stone, freeze on a tray then bag. Or freeze whole and stone after defrosting. Good for jams, crumbles, and puddings from frozen.', duration:'Up to 12 months', thaw:'Use from frozen in cooked applications. For fresh use, defrost gently in the fridge.' }
  },
  quince: {
    store: { method:'Cool, dark, well-ventilated store', duration:'1–3 months', detail:'Store whole quinces in a single layer — never touching. Keep away from all other stored fruits; the intense perfume permeates everything nearby and taints apples and pears.', icon:'🍋' },
    freeze: { suitable:true, prep:'Must be cooked first — quinces are inedible raw. Poach in syrup until tender, cool, and freeze in portions. Or freeze as purée or membrillo.', duration:'Up to 12 months', thaw:'Defrost in fridge overnight. Use in cooking.' }
  },
  fig: {
    store: { method:'Refrigerator', duration:'2–4 days', detail:'Fresh figs are extremely perishable — eat on the day of picking for peak flavour. If storage is necessary, refrigerate in a single layer wrapped in paper towel.', icon:'🟣' },
    freeze: { suitable:true, prep:'Freeze whole figs on a tray then transfer to bags. Or halve and freeze cut-side up. Dried figs: slice and dry in an oven at 60°C for 6–8 hours.', duration:'Up to 12 months (frozen) · 6 months (dried)', thaw:'Use frozen figs in smoothies, jams, and baking.' }
  },
  kiwi: {
    store: { method:'Room temperature (ripening) then refrigerator', duration:'Several weeks in fridge once ripe', detail:'Unripe kiwis ripen at room temperature in 3–5 days. Once slightly soft to the touch, refrigerate and use within 2–3 weeks. Keep away from apples and bananas — ethylene gas accelerates ripening rapidly.', icon:'🥝' },
    freeze: { suitable:true, prep:'Peel, slice, freeze on a tray then bag. Suitable for smoothies and sorbets after freezing.', duration:'Up to 12 months', thaw:'Use from frozen in smoothies. Not suitable for fresh use after defrosting.' }
  },
  mulberry: {
    store: { method:'Refrigerator', duration:'2–3 days', detail:'Mulberries are among the most perishable fruits. Refrigerate immediately and eat within 2–3 days. Process any surplus into jam or freeze immediately on the day of harvest.', icon:'🫐' },
    freeze: { suitable:true, prep:'Spread on a tray in a single layer and freeze before bagging. Do not wash before freezing. Freeze on the day of harvest.', duration:'Up to 12 months', thaw:'Use from frozen in jams, crumbles, and wine.' }
  },
  olive: {
    store: { method:'Brine (cured) or in oil', duration:'6–12 months (brined)', detail:'Raw fresh olives are inedible — they must be cured first. Brine cure: score each olive, submerge in 10% saltwater brine for 3–6 months, changing monthly. Store cured olives in brine in the fridge.', icon:'🫒' },
    freeze: { suitable:false, prep:'Cured olives do not freeze well — texture becomes unpleasantly mushy. Store in brine in the refrigerator.', duration:'N/A', thaw:'Not recommended.' }
  },
  citrus: {
    store: { method:'Cool room or refrigerator', duration:'2–3 weeks at room temp · 4–6 weeks in fridge', detail:'Citrus stores best at cool room temperature (10–15°C). Lemons and limes refrigerate well; oranges and mandarins are better at cool room temperature. Do not wash until just before use.', icon:'🍋' },
    freeze: { suitable:true, prep:'Juice can be frozen in ice cube trays then bagged. Freeze grated zest in small portions. Whole citrus does not freeze well.', duration:'Up to 12 months (juice/zest)', thaw:'Use frozen juice and zest directly from frozen in cooking and baking.' }
  },
  endive: {
    store: { method:'Refrigerator', duration:'1–2 weeks', detail:'Store whole heads unwashed wrapped in a damp cloth or paper in the fridge. Keep away from light — darkness preserves the blanched inner leaves and prevents them re-greening and turning bitter. Eat as fresh as possible for best flavour.', icon:'🥬' },
    freeze: { suitable:false, prep:'Endive does not freeze well — it collapses completely and becomes watery. Best used fresh. Braised or cooked endive can be frozen once fully cooked.', duration:'N/A', thaw:'Not recommended for fresh use. Cooked braised endive freezes for up to 3 months.' }
  },
  cornsalad: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store unwashed in a perforated bag in the fridge. The delicate leaves wilt quickly at room temperature. Best harvested and used on the same day — the mild, nutty flavour is most pronounced when perfectly fresh.', icon:'🌿' },
    freeze: { suitable:false, prep:'Corn salad does not freeze — the delicate leaves collapse entirely. It is a fresh salad leaf only. As it grows through winter, harvest as needed rather than storing.', duration:'N/A', thaw:'Not applicable.' }
  },
  mizuna: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store unwashed in a perforated bag in the fridge crisper. Mizuna wilts fairly quickly — best harvested and used within a day or two of cutting. The feathery leaves are delicate and benefit from being stored in a slightly damp container.', icon:'🌿' },
    freeze: { suitable:false, prep:'Mizuna is a fresh salad leaf and does not freeze well for raw use. Cooked mizuna (stir-fried or wilted) can be frozen briefly but loses its character significantly.', duration:'N/A', thaw:'Not recommended for salad use. Use fresh only.' }
  },
  gardencress: {
    store: { method:'Use immediately after cutting', duration:'Same day · 1–2 days refrigerated', detail:'Garden cress is best eaten within minutes of cutting — the peppery flavour and crisp texture are at their peak immediately after harvest. If storing, wrap loosely in damp kitchen paper and refrigerate. Quality declines rapidly after cutting.', icon:'🌱' },
    freeze: { suitable:false, prep:'Garden cress does not freeze — it collapses entirely. Always grow and harvest fresh as needed. Stagger sowings for a continuous supply rather than attempting to store.', duration:'N/A', thaw:'Not applicable — use immediately after cutting.' }
  },
  sorrel: {
    store: { method:'Refrigerator', duration:'3–5 days', detail:'Store unwashed in a perforated bag in the fridge. The high oxalic acid content means sorrel wilts and discolours quickly — best picked fresh and used the same day for maximum flavour. Older leaves can be refrigerated a few days.', icon:'🌿' },
    freeze: { suitable:true, prep:'Blanch leaves for 30 seconds, cool in ice water, squeeze out moisture, and freeze in portions. Frozen sorrel is excellent for soups and sauces — it loses its structure but retains its distinctive sharp flavour perfectly.', duration:'Up to 12 months', thaw:'Use from frozen directly in soups, sauces, and omelettes.' }
  },
  oregano: {
    store: { method:'Dried in airtight jar · Fresh in fridge 1 week', duration:'Up to 12 months dried', detail:'Dried oregano stores exceptionally well and is actually more flavourful than fresh for most cooked applications. Store dried oregano in an airtight glass jar away from light. Fresh: wrap in damp paper towel and refrigerate.', icon:'🌿' },
    freeze: { suitable:true, prep:'Freeze fresh oregano leaves whole in a single layer on a tray then bag. Alternatively freeze as herb oil cubes — blend with olive oil and freeze in ice cube trays. Excellent for adding to sauces and stews.', duration:'Up to 12 months', thaw:'Crumble frozen leaves directly into cooking.' }
  },
  coriander: {
    store: { method:'Refrigerator (stems in water) or dried seeds in jar', duration:'1–2 weeks fresh · 12 months dried seed', detail:'Store fresh coriander like flowers — stand stems in a glass of water in the fridge, covered loosely with a bag. For coriander seeds (the spice): dry fully on the plant, strip and store in an airtight jar. Fresh leaves lose flavour rapidly after cutting.', icon:'🌿' },
    freeze: { suitable:true, prep:'Blend fresh leaves with a little water and freeze in ice cube trays — excellent for adding to curries, soups, and dressings directly from frozen. Whole leaves can be frozen but become limp. Frozen coriander is best used in cooked dishes only.', duration:'Up to 6 months', thaw:'Add frozen cubes directly to cooking.' }
  },
  lemonbalm: {
    store: { method:'Dried or fresh (very short shelf life)', duration:'3–5 days fresh · 12 months dried', detail:'Fresh lemon balm wilts very quickly — use on the day of cutting or store in a glass of water in the fridge for 1–2 days. For tea, dry leaves thoroughly in a warm airy place out of direct sunlight for 2–3 weeks and store in an airtight glass jar.', icon:'🍋' },
    freeze: { suitable:true, prep:'Freeze fresh leaves in ice cube trays with water — perfect for adding to summer drinks, herbal teas, and sauces. Alternatively blend with oil and freeze in cubes. Frozen lemon balm loses its texture but retains its fragrance for cooking.', duration:'Up to 12 months', thaw:'Add ice cubes to drinks or drop directly into cooking.' }
  },
  chamomile: {
    store: { method:'Dried flowers in airtight jar', duration:'Up to 12 months dried', detail:'Dry freshly picked flowers on a fine mesh rack in a warm, airy place out of direct sunlight for 1–2 weeks until completely crisp and rustling. Store in an airtight glass jar in a cool, dark place. Properly dried chamomile flowers retain their aroma and medicinal properties for up to a year.', icon:'🌼' },
    freeze: { suitable:false, prep:'Chamomile is not suited to freezing — the delicate flowers collapse and lose their aroma. Drying is the correct preservation method. Dried chamomile makes far better tea than frozen.', duration:'N/A', thaw:'Not recommended — always dry rather than freeze.' }
  },
  watermelon: {
    store: { method:'Room temperature (whole) · Refrigerator (cut)', duration:'2–3 weeks whole · 3–5 days cut', detail:'Whole uncut watermelons store at room temperature for 2–3 weeks. Once cut, wrap tightly in cling film and refrigerate immediately — cut watermelon deteriorates within 5 days. The flesh absorbs odours from other foods so keep well wrapped.', icon:'🍉' },
    freeze: { suitable:true, prep:'Remove skin and seeds, cut into cubes or balls, freeze on a tray then bag. Texture changes significantly after freezing — suitable for smoothies, sorbets and chilled soups only. Frozen watermelon cubes are a refreshing summer snack eaten semi-frozen.', duration:'Up to 12 months', thaw:'Use from frozen in smoothies or blend for sorbet. Not suitable for fresh eating after freezing.' }
  },
};

// ── RENDER CARDS ──
// ── PRODUCE PHOTOS ──
// Wikipedia article titles for each produce — used to fetch verified thumbnails at runtime
const WIKI_TITLES = {
  tomato:'Tomato', courgette:'Courgette', squash:'Cucurbita', cucumber:'Cucumber',
  sweetcorn:'Sweet_corn', aubergine:'Eggplant', pepper:'Capsicum',
  pumpkin:'Pumpkin', sweetpotato:'Sweet_potato',
  carrot:'Carrot', potato:'Potato', beetroot:'Beetroot', parsnip:'Parsnip',
  turnip:'Turnip', swede:'Rutabaga', asparagus:'Asparagus',
  celeriac:'Celeriac', jerusalem:'Jerusalem_artichoke',
  kale:'Kale', sprouts:'Brussels_sprout', cabbage:'Cabbage', broccoli:'Broccoli',
  cauliflower:'Cauliflower', kohlrabi:'Kohlrabi',
  calabrese:'Broccoli', chinesecabbage:'Napa_cabbage', pakchoi:'Bok_choy',
  onion:'Onion', garlic:'Garlic', leek:'Leek', shallot:'Shallot',
  runner:'Runner_bean', broadbean:'Broad_bean', peas:'Pea', frenchbean:'Common_bean',
  soyabean:'Soybean',
  lettuce:'Lettuce', radish:'Radish', spinach:'Spinach', rocket:'Arugula', springonion:'Scallion',
  chard:'Chard', chicory:'Chicory', fennel:'Florence_fennel',
  celery:'Celery', globeartichoke:'Globe_artichoke',
  endive:'Endive', cornsalad:'Valerianella_locusta', mizuna:'Mizuna',
  gardencress:'Garden_cress', sorrel:'Rumex_acetosa',
  oregano:'Oregano', coriander:'Coriander', lemonbalm:'Lemon_balm', chamomile:'Chamomile',
  watermelon:'Watermelon',
  redcurrant:'Redcurrant', grape:'Grape', melon:'Cantaloupe',
  peach:'Peach', nectarine:'Nectarine', apricot:'Apricot',
  gage:'Greengage', quince:'Quince', fig:'Common_fig',
  kiwi:'Kiwifruit', mulberry:'Morus_nigra', olive:'Olive', citrus:'Lemon',
  basil:'Basil', mint:'Mentha', chive:'Chives', parsley:'Parsley', rosemary:'Rosemary', thyme:'Thyme',
  strawberry:'Strawberry', raspberry:'Raspberry', apple:'Apple_(fruit)', pear:'Pear',
  blueberry:'Blueberry', gooseberry:'Gooseberry', blackcurrant:'Blackcurrant',
  rhubarb:'Rhubarb', cherry:'Cherry', plum:'Plum', blackberry:'Blackberry'
};

// Populated at runtime from Wikipedia API — always correct, always matching
const WIKI_PHOTOS = {};
const TOOL_WIKI_PHOTOS = {}; // Populated by fetchToolPhotos()
const SOIL_WIKI_PHOTOS = {}; // Populated by fetchSoilPhotos()

const TOOL_WIKI_TITLES = {
  spade:                'Spade',
  fork:                 'Garden_fork',
  dutchhoe:             'Hoe_(tool)',
  drawhoe:              'Hoe_(tool)',
  loophoe:              'Hoe_(tool)',
  trowel:               'Trowel',
  handfork:             'Garden_fork',
  secateurs:            'Secateurs',
  rake:                 'Rake',
  wateringcan:          'Watering_can',
  dibber:               'Dibber',
  cultivator:           'Cultivator',
  kneeler:              'Kneeling_pad',
  wheelbarrow:          'Wheelbarrow',
  hose:                 'Garden_hose',
  greenhouse:           'Greenhouse',
  coldframe:            'Cold_frame',
  propagator:           'Propagator_(horticulture)',
  cloche:               'Cloche_(agriculture)',
  'petrol-mower':       'Lawn_mower',
  'battery-mower':      'Lawn_mower',
  'petrol-strimmer':    'String_trimmer',
  'battery-strimmer':   'String_trimmer',
  'petrol-hedgetrimmer':'Hedge_trimmer',
  'battery-hedgetrimmer':'Hedge_trimmer',
  'petrol-chainsaw':    'Chainsaw',
  'battery-chainsaw':   'Chainsaw',
  'petrol-tiller':      'Rototiller',
  'petrol-blower':      'Leaf_blower',
  'battery-drill':      'Drill',
  'battery-secateurs':  'Secateurs',
  trugs:                'Trug',
  soiltest:             'Soil_pH',
  irrigation:           'Drip_irrigation',
  netting:              'Bird_netting',
  stringline:           'Plumb_bob',
  coppertools:          'Copper',
  soilblocker:          'Compost',
  hori:                 'Machete',
  stepladder:           'Step_stool',
  ladder:               'Ladder',
  // New tools — base entries (overrides in TOOL_WIKI_ARTICLE_OVERRIDES take precedence)
  borderspade:          'Spade',
  diggingfork:          'Garden_fork',
  lawnrake:             'Rake',
  lopperbypass:         'Secateurs',
  lopperanvil:          'Secateurs',
  handshears:           'Hedge_trimmer',
  edgingshears:         'Hedge_trimmer',
  topyaryshears:        'Pruning',
  treepruner:           'Pruning',
  swoehoe:              'Hoe_(tool)',
};

// Per-tool Wikipedia REST Summary article overrides — used when a tool needs
// a DIFFERENT article than the one shared with other tools in TOOL_WIKI_TITLES.
// These are fetched individually via the REST API (browser has network).
// Kept separate so the main batch can still run, and these supplement/override.
const TOOL_WIKI_ARTICLE_OVERRIDES = {
  fork:                 'Digging_fork',
  handfork:             'Hand_cultivator',
  dutchhoe:             'Dutch_hoe',
  drawhoe:              'Hoe_(tool)',
  loophoe:              'Hula_hoe',
  rake:                 'Garden_rake',
  soilblocker:          'Soil_blocker',
  kneeler:              'Kneeling_pad',
  // New tools — best available Wikipedia articles
  borderspade:          'Spade',
  diggingfork:          'Garden_fork',
  lawnrake:             'Rake',
  lopperbypass:         'Lopper_(tool)',
  lopperanvil:          'Lopper_(tool)',
  handshears:           'Hedge_shears',
  edgingshears:         'Lawn_edger',
  topyaryshears:        'Topiary',
  treepruner:           'Pruning_pole',
  swoehoe:              'Hoe_(tool)',
};

// Hardcoded Wikimedia Commons image URLs for new tools.
// Applied immediately at load — no API call needed — guarantees photo appears.
// Uses upload.wikimedia.org thumb URLs which are stable and don't require API access.
// Hardcoded fallback photos — fetched via Wikipedia REST API thumbnail URLs.
// These are real thumbnail URLs from verified Wikipedia articles.
// Applied immediately so cards show photos without waiting for fetchToolPhotos().
// The REST API in fetchToolPhotos() may replace these with better images.
const TOOL_HARDCODED_PHOTOS = {
  // Digging tools
  borderspade:    'https://en.wikipedia.org/api/rest_v1/page/summary/Spade',
  diggingfork:    'https://en.wikipedia.org/api/rest_v1/page/summary/Garden_fork',
  lawnrake:       'https://en.wikipedia.org/api/rest_v1/page/summary/Rake',
  // Cutting tools
  lopperbypass:   'https://en.wikipedia.org/api/rest_v1/page/summary/Lopper_(tool)',
  lopperanvil:    'https://en.wikipedia.org/api/rest_v1/page/summary/Lopper_(tool)',
  handshears:     'https://en.wikipedia.org/api/rest_v1/page/summary/Hedge_shears',
  edgingshears:   'https://en.wikipedia.org/api/rest_v1/page/summary/Hedge_shears',
  topyaryshears:  'https://en.wikipedia.org/api/rest_v1/page/summary/Topiary',
  treepruner:     'https://en.wikipedia.org/api/rest_v1/page/summary/Pruning_pole',
  // Weeding tools
  swoehoe:        'https://en.wikipedia.org/api/rest_v1/page/summary/Hoe_(tool)',
};

// Pre-fetch hardcoded photos via REST API and apply to TOOL_WIKI_PHOTOS immediately
async function applyHardcodedPhotos() {
  await Promise.allSettled(Object.entries(TOOL_HARDCODED_PHOTOS).map(async ([id, url]) => {
    try {
      const resp = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!resp.ok) return;
      const data = await resp.json();
      const src = data.thumbnail?.source;
      if (src) TOOL_WIKI_PHOTOS[id] = src;
    } catch(e) {}
  }));
  // Re-render current tools tab after hardcoded photos load
  const activeBtn = document.querySelector('#toolsTabs .ptab.active');
  const activeTier = 'all';
  if (activeBtn) toolsShowCat(activeBtn.dataset.toolsCat, activeTier);
}
let wikiPhotosFetched = false;

async function fetchWikiPhotos() {
  if (wikiPhotosFetched) return;
  const ids = Object.keys(WIKI_TITLES);
  const batches = [];
  for (let i = 0; i < ids.length; i += 50) batches.push(ids.slice(i, i + 50));

  try {
    for (const batch of batches) {
      const inputTitles = batch.map(id => WIKI_TITLES[id]);
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(inputTitles.join('|'))}&prop=pageimages&format=json&pithumbsize=600&origin=*&redirects=1`;
      const resp = await fetch(url);
      const data = await resp.json();

      // Build forward chain: original_lowercase → final_lowercase
      // Start with identity for all input titles (underscores→spaces)
      const chain = {};
      for (const t of inputTitles) chain[t.replace(/_/g,' ').toLowerCase()] = t.replace(/_/g,' ').toLowerCase();

      // Apply normalizations (underscore → space, capitalisation fixes)
      for (const n of (data.query.normalized || [])) {
        const from = n.from.replace(/_/g,' ').toLowerCase();
        const to   = n.to.toLowerCase();
        chain[from] = to;
        // Update any chain entry that was pointing to `from`
        for (const k in chain) { if (chain[k] === from) chain[k] = to; }
      }
      // Apply redirects (may chain multiple hops)
      for (const r of (data.query.redirects || [])) {
        const from = r.from.toLowerCase();
        const to   = r.to.toLowerCase();
        chain[from] = to;
        for (const k in chain) { if (chain[k] === from) chain[k] = to; }
      }

      // Reverse map: final_title → produce_id
      const finalToId = {};
      for (const id of batch) {
        const orig  = WIKI_TITLES[id].replace(/_/g,' ').toLowerCase();
        const final = chain[orig] || orig;
        finalToId[final] = id;
      }

      // Match returned pages to produce IDs
      for (const page of Object.values(data.query.pages)) {
        if (!page.thumbnail) continue;
        const matchId = finalToId[page.title.toLowerCase()];
        if (matchId) WIKI_PHOTOS[matchId] = page.thumbnail.source;
      }
    }
  } catch(e) { /* silently fail — emoji fallback covers it */ }

  // ── Direct Wikimedia Commons CDN overrides (hash-computed, always correct) ──
  const COMMONS_OVERRIDES = {
    garlic:     'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Peeled_garlic.JPG/600px-Peeled_garlic.JPG',
    parsnip:    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Parsnips.JPG/600px-Parsnips.JPG',
    apple:      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Red_delicious_red_chief_apple.JPG/600px-Red_delicious_red_chief_apple.JPG',
    asparagus:  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Asparagus_harvest_%2820279184531%29.jpg/600px-Asparagus_harvest_%2820279184531%29.jpg',
    rocket:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eruca_sativa_1.JPG/600px-Eruca_sativa_1.JPG',
    runner:     'https://commons.wikimedia.org/wiki/Special:FilePath/Runner_Beans.jpg',
    frenchbean: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/French_beans_J1.JPG/600px-French_beans_J1.JPG',
    peas:       'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Peas_in_pods_-_Studio.jpg/600px-Peas_in_pods_-_Studio.jpg',
    raspberry:  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Raspberries05.jpg/600px-Raspberries05.jpg',
    blackberry: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Blackberries_%28Rubus_fruticosus%29.jpg/600px-Blackberries_%28Rubus_fruticosus%29.jpg',
    broccoli:   'https://commons.wikimedia.org/wiki/Special:FilePath/Broccoli_and_cross_section_edit.jpg',
    calabrese:  'https://commons.wikimedia.org/wiki/Special:FilePath/Broccoli_and_cross_section_edit.jpg',
    coriander:  'https://commons.wikimedia.org/wiki/Special:FilePath/Coriandrum_sativum_6zz.jpg',
    fig:        'https://commons.wikimedia.org/wiki/Special:FilePath/Ficus_carica_Figowiec_pospolity_2021-06-09_02.jpg',
    peach:      'https://commons.wikimedia.org/wiki/Special:FilePath/Peaches.jpg',
    jerusalem:  'https://commons.wikimedia.org/wiki/Special:FilePath/Helianthus_tuberosus_-_stem_and_leaves.jpg',
    chicory:    'https://commons.wikimedia.org/wiki/Special:FilePath/Radicchio_Treviso.jpg',
    chamomile:  'https://commons.wikimedia.org/wiki/Special:FilePath/Matricaria_chamomilla_plant_(05).jpg',
    nectarine:  'https://commons.wikimedia.org/wiki/Special:FilePath/Nektarin.jpg',
    globeartichoke: 'https://commons.wikimedia.org/wiki/Special:FilePath/-2022-07-03_Globe_artichoke_plant,_Trimingham,_Norfolk_(1).JPG',
    pakchoi:        'https://commons.wikimedia.org/wiki/Special:FilePath/Baby_Pak_Choi_(01).JPG',
    oregano:    'https://commons.wikimedia.org/wiki/Special:FilePath/Origanum_vulgare_15-p.bot-origa.vulga-13.jpg',
  };
  for (const [id, url] of Object.entries(COMMONS_OVERRIDES)) {
    WIKI_PHOTOS[id] = url;
  }

  // ── Fetch fence photos using same API ──
  try {
    const FENCE_TITLES = {
      'wire-mesh':  'Chain-link_fencing',
      'stock':      'Fence',
      'electric':   'Electric_fence',
      'closeboard': 'Wooden_fence',
      'hardware':   'Hardware_cloth',
      'netting':    'Bird_netting',
      'palisade':   'Palisade',
      'vmesh':      'Chain-link_fencing',
    };
    const fTitles = [...new Set(Object.values(FENCE_TITLES))];
    const fUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(fTitles.join('|'))}&prop=pageimages&format=json&pithumbsize=600&origin=*&redirects=1`;
    const fResp = await fetch(fUrl);
    const fData = await fResp.json();
    const fMap = {};
    for (const page of Object.values(fData.query.pages)) {
      if (page.thumbnail) fMap[page.title.toLowerCase()] = page.thumbnail.source;
    }
    const fChain = {};
    for (const t of fTitles) fChain[t.toLowerCase()] = t.toLowerCase();
    for (const n of (fData.query.normalized || [])) fChain[n.from.toLowerCase()] = n.to.toLowerCase();
    for (const r of (fData.query.redirects  || [])) fChain[r.from.toLowerCase()] = r.to.toLowerCase();
    const fResolve = function(t) {
      let k = t.toLowerCase(); const s = new Set();
      while (fChain[k] && !s.has(k)) { s.add(k); k = fChain[k]; }
      return fMap[k] || null;
    };

    for (const [fId, wTitle] of Object.entries(FENCE_TITLES)) {
      const photoUrl = fResolve(wTitle);
      if (!photoUrl) continue;
      const img = document.getElementById('fence-photo-' + fId);
      if (!img) continue;
      img.style.display = 'block';
      img.onerror = function() {
        this.style.display = 'none';
        const svg = this.nextElementSibling;
        if (svg) svg.style.display = 'block';
      };
      img.src = photoUrl;
      // Hide SVG once photo starts loading
      const svg = img.nextElementSibling;
      if (svg) svg.style.display = 'none';
    }
    // Direct Wikimedia Commons overrides for fence types
    // User's own close-board fence photo (embedded)
    const CLOSEBOARD_PHOTO = 'data:image/jpeg;base64,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';
    const FENCE_COMMONS_OVERRIDES = {
      'closeboard': CLOSEBOARD_PHOTO,
      'palisade': 'https://commons.wikimedia.org/wiki/Special:FilePath/Perimeter_Fencing_-_geograph.org.uk_-_7553486.jpg',
    };
    for (const [fId, url] of Object.entries(FENCE_COMMONS_OVERRIDES)) {
      const img = document.getElementById('fence-photo-' + fId);
      if (!img) continue;
      img.style.display = 'block';
      img.onerror = function() { this.style.display = 'none'; };
      img.src = url;
      const svg = img.nextElementSibling;
      if (svg) svg.style.display = 'none';
    }
  } catch(fe) { /* fence photos fail silently */ }

  wikiPhotosFetched = true;
  // Re-render the currently visible produce card grid
  const activePtab = document.querySelector('.ptab.active');
  if (activePtab) renderCards(activePtab.dataset.cat);

  // If a detail panel is open, inject the photo now that we have URLs
  const detailPanel = document.getElementById('produceDetail');
  if (detailPanel && detailPanel.style.display !== 'none') {
    const wrap = detailPanel.querySelector('.detail-photo-wrap');
    if (wrap) {
      const titleEl = detailPanel.querySelector('.detail-title');
      const tagEl   = detailPanel.querySelector('.detail-tag');
      if (titleEl && tagEl) {
        // Find the produce object by matching name
        const name = titleEl.textContent.trim();
        for (const cat of Object.keys(produce)) {
          const p = produce[cat].find(x => x.name === name);
          if (p) {
            const url = getProducePhoto(p.id, 600);
            if (url && !wrap.querySelector('img')) {
              wrap.innerHTML = `<img class="detail-photo" src="${url}" alt="${p.name}"
                onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                <span class="detail-photo-fallback" style="display:none">${p.icon}</span>`;
            }
            break;
          }
        }
      }
    }
  }
}
