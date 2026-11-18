const results = document.querySelector('#catalogue-sections');
const filters = document.querySelector('#catalogue-filters');
const search = document.querySelector('#product-search');
const count = document.querySelector('#catalogue-count');
const inventory = new Map(products.map(product => [product.id, product]));
const previewSize = 4;
const brandNames = {
  'MILK SHAKE (MS)': 'milk_shake',
  'BIOTOP PROFESSIONAL': 'Biotop Professional',
  SKEYNDOR: 'Skeyndor',
  GK: 'GK Hair',
  '18.21': '18.21 Man Made',
  OLAPLEX: 'Olaplex',
};
let activeCategory = '';

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function cardFor([id, photo, displayName, size]) {
  const { brand, type } = inventory.get(id);
  const displayBrand = brandNames[brand] || brand;
  const card = element('article', 'catalogue-card');
  const visual = element('div', 'catalogue-visual');
  const img = document.createElement('img');
  img.src = photo;
  img.alt = displayName + (size ? ', ' + size : '');
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('error', () => {
    visual.textContent = 'Image unavailable';
    visual.classList.add('catalogue-visual--empty');
  }, { once: true });
  visual.append(img);

  const content = element('div', 'catalogue-content');
  const brandLabel = element('p', 'catalogue-brand', displayBrand);
  const name = element('h4', 'catalogue-name', displayName);
  const details = [size, type === 'Professional' ? 'Professional' : ''].filter(Boolean);
  const link = element('a', 'catalogue-enquire', 'Enquire on WhatsApp ↗');
  const item = size ? displayName + ' (' + size + ')' : displayName;
  const message = 'Hi, I’d like to ask about the price and availability of ' + item + ' by ' + displayBrand + '.';
  link.href = 'https://wa.me/919099938886?text=' + encodeURIComponent(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  content.append(brandLabel, name);
  if (details.length) content.append(element('p', 'catalogue-meta', details.join(' · ')));
  content.append(link);
  card.append(visual, content);
  return card;
}

function selectCategory(key) {
  activeCategory = key;
  for (const button of filters.children) {
    button.setAttribute('aria-pressed', String(button.dataset.category === key));
  }
  renderProducts();
}

function renderGroup(group, matches, showPreview) {
  const section = element('section', 'catalogue-section');
  const heading = element('h3', 'catalogue-section-title', group.name);
  heading.id = 'products-' + group.key;
  heading.tabIndex = -1;
  section.setAttribute('aria-labelledby', heading.id);
  const titleRow = element('div', 'catalogue-section-header');
  titleRow.append(heading, element('span', 'catalogue-section-count', matches.length + (matches.length === 1 ? ' product' : ' products')));

  const grid = element('div', 'catalogue-grid');
  grid.append(...(showPreview ? matches.slice(0, previewSize) : matches).map(cardFor));
  section.append(titleRow, grid);

  if (showPreview && matches.length > previewSize) {
    const viewAll = element('button', 'catalogue-view-all', 'View all ' + matches.length + ' ↗');
    viewAll.type = 'button';
    viewAll.setAttribute('aria-label', 'View all ' + matches.length + ' products in ' + group.name);
    viewAll.addEventListener('click', () => {
      selectCategory(group.key);
      document.getElementById(heading.id).focus({ preventScroll: true });
      filters.scrollIntoView({ block: 'start' });
    });
    titleRow.append(viewAll);
  }

  return section;
}

function renderProducts() {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visibleGroups = activeCategory ? productCatalogue.filter(group => group.key === activeCategory) : productCatalogue;
  const showPreview = !activeCategory && terms.length === 0;
  const sections = [];
  let total = 0;

  for (const group of visibleGroups) {
    const matches = group.products.filter(([id, , name, size]) => {
      const product = inventory.get(id);
      const searchable = [name, size, product.brand, brandNames[product.brand], group.name].join(' ').toLowerCase();
      return terms.every(term => searchable.includes(term));
    });
    if (matches.length === 0) continue;
    total += matches.length;
    sections.push(renderGroup(group, matches, showPreview));
  }

  count.textContent = total === 1 ? '1 product' : total + ' products';
  if (!sections.length) {
    const message = activeCategory
      ? 'No products match your search in this section. Try another search or select All products.'
      : 'No products match your search. Try a different product or brand.';
    sections.push(element('p', 'catalogue-empty', message));
  }
  results.replaceChildren(...sections);
}

for (const { key, name } of [{ key: '', name: 'All products' }, ...productCatalogue]) {
  const button = element('button', 'catalogue-filter', name);
  button.type = 'button';
  button.dataset.category = key;
  button.setAttribute('aria-controls', results.id);
  button.addEventListener('click', () => selectCategory(key));
  filters.append(button);
}
search.addEventListener('input', renderProducts);
selectCategory('');
