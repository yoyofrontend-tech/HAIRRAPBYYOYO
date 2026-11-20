(() => {
  const root = new URL('../', document.currentScript.src);
  const header = document.querySelector('.header');
  const menu = header.querySelector('.menu-toggle');
  menu.insertAdjacentHTML('beforebegin', `
    <button class="site-search-toggle" type="button" aria-label="Open site search" aria-expanded="false" aria-controls="site-search">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
        <g class="site-search-icon"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.4 15.4 4.2 4.2"/></g>
        <path class="site-search-dismiss" d="m6 6 12 12M18 6 6 18"/>
      </svg>
    </button>`);
  header.insertAdjacentHTML('beforeend', `
    <div class="site-search" id="site-search" inert>
      <div class="site-search-inner">
        <form class="site-search-form" role="search" aria-label="Site search">
          <label class="sr-only" for="site-search-query">Search the site</label>
          <input id="site-search-query" type="search" placeholder="Search services, products, and pages" autocomplete="off" maxlength="120">
          <ul class="site-search-results" aria-label="Search results"></ul>
          <p class="site-search-status" role="status" hidden></p>
        </form>
      </div>
    </div>`);

  const toggle = header.querySelector('.site-search-toggle');
  const panel = header.querySelector('.site-search');
  const form = panel.querySelector('form');
  const input = form.querySelector('input');
  const results = form.querySelector('ul');
  const status = form.querySelector('.site-search-status');
  const entries = [];
  const seen = new Set();
  let searchData;
  let loading = false;
  let incomplete = false;

  function normalize(value) {
    return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function addEntry(title, type, path, detail = '', keywords = '', params = {}) {
    const url = new URL(path, root);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    if (seen.has(url.href)) return;

    seen.add(url.href);
    const name = normalize(title);
    entries.push({ title, type, detail, url, name, text: normalize([title, type, detail, keywords].join(' ')) });
  }

  const serviceLabels = {
    colour: 'Hair Color & Balayage',
    hair: 'Haircut & Styling',
    makeup: 'Bridal Makeup',
    skin: 'Skin & Facial Treatments',
    nails: 'Nail Art & Extensions',
    massage: 'Luxury Head Massage',
  };

  for (const [title, path, keywords] of [
    ['Home', 'index.html', 'hair rap by yoyo salon'],
    ['Services', 'pages/services.html', 'service price list menu'],
    ['Products', 'pages/products.html', 'shop catalogue'],
    ['Membership', 'pages/membership.html', 'compare membership plans service credit fee'],
    ['Salon Membership Overview', 'index.html#membership', 'annual benefits'],
    ['Portfolio', 'pages/portfolio.html', 'gallery photos hairstyles made in our chair'],
    ['Contact', 'pages/contact.html', 'book appointment whatsapp phone email hours location map directions address bodakdev ahmedabad'],
    ['About the Salon', 'index.html#about', 'history team yoyo anuj garima'],
    ['Celebs at YOYO', 'index.html#celeb-reels', 'celebrity reels videos'],
    ['Client Reviews', 'index.html#reviews', 'testimonials guest feedback'],
  ]) addEntry(title, 'Page', path, '', keywords);

  for (const [category, title] of Object.entries(serviceLabels)) {
    const aliases = category === 'colour' ? 'hair colour highlights' : category === 'hair' ? 'hair cut beard grooming' : '';
    addEntry(title, 'Service category', 'pages/services.html', '', aliases, { category });
  }

  for (const plan of ['Bella', 'Estilo', 'Cabeza', 'Dios', 'Aqua', 'Elegante']) {
    addEntry(plan, 'Membership plan', `pages/membership.html#membership-${plan.toLowerCase()}`, 'Membership');
  }

  function loadScript(path) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL(path, root);
      script.addEventListener('load', resolve, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.append(script);
    });
  }

  async function addCatalogueEntries() {
    await Promise.all([
      typeof products === 'undefined' ? loadScript('js/product-data.js') : null,
      typeof productCatalogue === 'undefined' ? loadScript('js/product-catalogue.js?v=5') : null,
    ]);
    const brandsById = new Map(products.map(({ id, brand }) => [id, brand]));
    for (const { key, name, products: catalogued } of productCatalogue) {
      addEntry(name, 'Product category', 'pages/products.html', '', '', { category: key });
      for (const [id, , title, size] of catalogued) {
        const brand = brandsById.get(id);
        const displayBrand = brandNames[brand] || brand;
        const brandKeywords = `${brand} ${normalize(displayBrand).replace(/ /g, '')}`;
        addEntry(displayBrand, 'Product brand', 'pages/products.html', '', brandKeywords, { brand });
        const detail = [size, displayBrand].filter(Boolean).join(' · ');
        addEntry(title, 'Product', 'pages/products.html#catalogue-sections', detail, `${brandKeywords} ${name}`, {
          category: key, brand, q: [title, size].filter(Boolean).join(' '),
        });
      }
    }
  }

  async function addServiceEntries() {
    if (typeof serviceMenus === 'undefined') await loadScript('js/service-menu-data.js?v=2');
    const groups = Object.values(serviceMenus).flat();
    for (const [category, titles] of Object.entries(categoryGroups)) {
      for (const group of groups) {
        if (!titles.includes(group.title)) continue;
        for (const [service] of group.rows) {
          addEntry(service, 'Service', 'pages/services.html#service-result', serviceLabels[category], group.title, { category, service });
        }
      }
    }
  }

  function getResults(query) {
    const terms = query.split(' ');
    const matches = entries.filter(entry => terms.every(term => entry.text.includes(term)));
    const rank = entry => entry.name === query ? 0 : entry.name.startsWith(query) ? 1 : 2;
    return matches.sort((a, b) => rank(a) - rank(b)).slice(0, 9);
  }

  function renderResults() {
    const query = normalize(input.value);
    const matches = query ? getResults(query) : [];
    results.replaceChildren(...matches.map(entry => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const title = document.createElement('span');
      const detail = document.createElement('small');
      link.href = entry.url.href;
      title.textContent = entry.title;
      detail.textContent = [entry.type, entry.detail].filter(Boolean).join(' · ');
      link.append(title, detail);
      item.append(link);
      return item;
    }));
    status.textContent = loading ? 'Searching the catalogue and service menu…'
      : incomplete ? 'Some search results are unavailable.'
      : 'No matching results.';
    status.hidden = !query || (matches.length > 0 && !incomplete);
  }

  function setSearch(open) {
    if (open) setMenu(false);
    panel.inert = !open;
    header.classList.toggle('is-search-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close site search' : 'Open site search');
    if (!open) return;

    input.focus({ preventScroll: true });
    if (!searchData) {
      loading = true;
      searchData = Promise.allSettled([addCatalogueEntries(), addServiceEntries()]).then(loads => {
        incomplete = loads.some(load => load.status === 'rejected');
        loading = false;
        if (panel.contains(document.activeElement) && document.activeElement !== input) return;
        renderResults();
      });
    }
    renderResults();
  }

  toggle.addEventListener('click', () => setSearch(panel.inert));
  menu.addEventListener('click', () => setSearch(false));
  input.addEventListener('input', renderResults);
  form.addEventListener('submit', event => {
    event.preventDefault();
    results.querySelector('a')?.click();
  });
  results.addEventListener('click', event => { if (event.target.closest('a')) setSearch(false); });
  document.addEventListener('pointerdown', event => {
    if (!panel.inert && !header.contains(event.target)) setSearch(false);
  });
  header.addEventListener('keydown', event => {
    if (panel.inert) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setSearch(false);
      toggle.focus();
    } else if (event.key === 'ArrowDown' && event.target === input) {
      const firstMatch = results.querySelector('a');
      if (!firstMatch) return;
      event.preventDefault();
      firstMatch.focus();
    }
  });
})();
