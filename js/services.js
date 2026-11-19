const priceRowReveal = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 })
  : null;

const priceMenu = document.querySelector('#price-menu');
const servicePriceHeading = document.querySelector('#service-prices');
const servicePriceBody = priceMenu.querySelector('tbody');
const servicePriceNotes = priceMenu.querySelector('.service-price-notes');
const servicePricePrompt = document.querySelector('#service-price-prompt');
const serviceCategoryLinks = [...document.querySelectorAll('[data-service-category]')];
const categoryGroups = {
  colour: ['Hair colour', 'Luxury colour'],
  hair: ['Hair cut', 'Hair styling', 'Beard', 'Extra care', 'Hair treatments', 'Hair care',
    'Hair texture', 'Lux volumizer', 'Hair toppers', 'Hair extensions · per strand'],
  makeup: ['Bridal packages', 'Side bride & kids', 'Pre-bride packages', 'Groom packages', 'Pre-groom packages'],
  skin: ['Ethereal facials', 'Elegant facials', 'Clean up', 'Express facial masks', 'De-tan',
    'Body therapy', 'Threading', 'Waxing', 'Brazilian wax', 'Hair removal'],
  nails: ['Nail extensions & nail art', 'Manicure', 'Pedicure'],
  massage: ['Head massage'],
};
const makeupAudiences = {
  'Bridal packages': 'Bride',
  'Pre-bride packages': 'Bride',
  'Side bride & kids': 'Bridal party & children',
  'Groom packages': 'Groom',
  'Pre-groom packages': 'Groom',
};
const serviceGroupsByTitle = new Map();
const money = value => value == null ? '—' : '₹' + value.toLocaleString('en-IN');

for (const [menu, groups] of Object.entries(serviceMenus)) {
  for (const group of groups) {
    if (!serviceGroupsByTitle.has(group.title)) serviceGroupsByTitle.set(group.title, new Map());
    const titleGroups = serviceGroupsByTitle.get(group.title);
    const key = JSON.stringify(group);
    if (!titleGroups.has(key)) titleGroups.set(key, { ...group, audiences: [] });
    const audience = menu === 'makeup' ? makeupAudiences[group.title] : { women: 'Women', men: 'Men' }[menu];
    titleGroups.get(key).audiences.push(audience);
  }
}

function makePriceRow(name, columns, prices, context) {
  const row = document.createElement('tr');
  const label = document.createElement('th');
  label.scope = 'row';
  label.textContent = name;

  const detail = document.createElement('span');
  detail.className = 'service-price-context';
  detail.textContent = context;
  label.append(detail);
  row.append(label);

  const cell = row.insertCell();
  if (columns.length === 1) {
    cell.textContent = money(prices[0]);
  } else {
    const tiers = document.createElement('dl');
    tiers.className = 'service-price-tiers';
    columns.forEach((column, index) => {
      const tier = document.createElement('div');
      const term = document.createElement('dt');
      const price = document.createElement('dd');
      term.textContent = column;
      price.textContent = money(prices[index]);
      tier.append(term, price);
      tiers.append(tier);
    });
    cell.append(tiers);
  }
  return row;
}

function showServiceCategory(link) {
  const groupTitles = categoryGroups[link.dataset.serviceCategory];
  const rows = document.createDocumentFragment();
  const notes = document.createDocumentFragment();
  for (const title of groupTitles) {
    for (const group of serviceGroupsByTitle.get(title).values()) {
      const audience = group.audiences.length === 2 ? 'Women and men' : group.audiences[0];
      const context = groupTitles.length > 1 ? audience + ' · ' + title : audience;
      for (const [name, ...prices] of group.rows) {
        rows.append(makePriceRow(name, group.columns, prices, context));
      }
      if (group.note) {
        const note = document.createElement('li');
        note.textContent = context + ' — ' + group.note;
        notes.append(note);
      }
    }
  }

  link.setAttribute('aria-current', 'true');
  servicePriceHeading.textContent = link.textContent.trim();
  servicePriceBody.append(rows);
  servicePriceNotes.append(notes);
  priceMenu.hidden = false;
  for (const row of servicePriceBody.rows) priceRowReveal?.observe(row);
}

const categoryKey = new URLSearchParams(location.search).get('category');
const activeCategory = serviceCategoryLinks.find(link => link.dataset.serviceCategory === categoryKey);
if (activeCategory) showServiceCategory(activeCategory);
else servicePricePrompt.hidden = false;
