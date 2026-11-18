const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  navigation.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); } });

const siteSearchToggle = document.querySelector('.site-search-toggle');
const siteSearch = document.querySelector('#site-search');
const siteSearchQuery = siteSearch.querySelector('input');
const siteSearchResults = siteSearch.querySelector('.site-search-results');
const siteSearchEmpty = siteSearch.querySelector('.site-search-empty');
const sectionLinks = [...navigation.querySelectorAll('a')].map(link => {
  const result = link.cloneNode(true);
  result.removeAttribute('aria-current');
  siteSearchResults.append(result);
  return result;
});

function searchText(text) {
  return text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').trim();
}

function filterSections() {
  const query = searchText(siteSearchQuery.value);
  for (const link of sectionLinks) {
    link.hidden = !searchText(link.textContent).includes(query);
  }
  siteSearchEmpty.hidden = sectionLinks.some(link => !link.hidden);
}

siteSearchToggle.addEventListener('click', () => {
  setMenu(false);
  siteSearchQuery.value = '';
  filterSections();
  siteSearch.showModal();
});
siteSearchQuery.addEventListener('input', filterSections);
siteSearchResults.addEventListener('click', event => {
  if (event.target.closest('a')) siteSearch.close();
});

const heroSlides = [...document.querySelectorAll('.hero-slide')];
let activeSlide = 0;
let slideshowTimer;

function prepareNextHeroSlide() {
  const next = heroSlides[(activeSlide + 1) % heroSlides.length];
  if (!next.hasAttribute('src')) next.src = next.dataset.src;
  return next;
}

if (heroSlides[0].complete) {
  prepareNextHeroSlide();
} else {
  heroSlides[0].addEventListener('load', prepareNextHeroSlide, { once: true });
}

function updateSlideshow() {
  clearInterval(slideshowTimer);
  if (!document.hidden) {
    slideshowTimer = setInterval(() => {
      const next = prepareNextHeroSlide();
      if (!next.complete || !next.naturalWidth) return;
      heroSlides[activeSlide].classList.remove('is-active');
      activeSlide = (activeSlide + 1) % heroSlides.length;
      next.classList.add('is-active');
      prepareNextHeroSlide();
    }, 5000);
  }
}
document.addEventListener('visibilitychange', updateSlideshow);
updateSlideshow();

const cardReveal = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 })
  : null;
document.querySelectorAll('.membership-card').forEach(card => cardReveal?.observe(card));

const priceMenu = document.querySelector('#price-menu');
const servicePriceHeading = priceMenu.querySelector('h3');
const servicePriceBody = priceMenu.querySelector('tbody');
const servicePriceNotes = priceMenu.querySelector('.service-price-notes');
const servicePricePrompt = document.querySelector('#service-price-prompt');
const serviceCategoryButtons = [...document.querySelectorAll('[data-service-category]')];
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

function showServiceCategory(button) {
  const groupTitles = categoryGroups[button.dataset.serviceCategory];
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

  serviceCategoryButtons.forEach(category => category.setAttribute('aria-pressed', String(category === button)));
  servicePriceHeading.textContent = [...button.children]
    .filter(child => child.getAttribute('aria-hidden') !== 'true')
    .map(child => child.textContent).join(' ');
  for (const row of servicePriceBody.rows) cardReveal?.unobserve(row);
  servicePriceBody.replaceChildren(rows);
  servicePriceNotes.replaceChildren(notes);
  servicePricePrompt.hidden = true;
  priceMenu.hidden = false;
  for (const row of servicePriceBody.rows) cardReveal?.observe(row);
  servicePriceHeading.focus({ preventScroll: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  servicePriceHeading.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'instant' : 'smooth' });
}

servicePricePrompt.hidden = false;
serviceCategoryButtons.forEach(button => button.addEventListener('click', () => showServiceCategory(button)));

const reducedReelMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reelConnection = navigator.connection;
const reelSideCount = 2;
const reelViewer = document.querySelector('.reel-viewer');
const reelViewerVideo = reelViewer.querySelector('video');
const reelViewerTitle = reelViewer.querySelector('h2');
const reelViewerStatus = reelViewer.querySelector('[role="status"]');
let reelViewerOpener;

function openReelViewer(button, video, title) {
  reelViewerOpener = button;
  reelViewerTitle.textContent = title;
  reelViewerVideo.poster = video.dataset.poster;
  reelViewerVideo.src = video.dataset.fullSrc;
  reelViewer.showModal();
  document.documentElement.classList.add('reel-viewing');
  refreshReelStages();
  reelViewerVideo.play().catch(error => {
    if (reelViewer.open && error.name !== 'AbortError') {
      reelViewerStatus.textContent = 'This reel could not play. Close it and try again.';
    }
  });
}

reelViewer.addEventListener('close', () => {
  reelViewerVideo.pause();
  reelViewerVideo.removeAttribute('poster');
  reelViewerVideo.removeAttribute('src');
  reelViewerVideo.load();
  reelViewerStatus.textContent = '';
  document.documentElement.classList.remove('reel-viewing');
  reelViewerOpener?.focus({ preventScroll: true });
  refreshReelStages();
});

function setupReelStage(stage) {
  const cards = [...stage.querySelectorAll('.reel-card')];
  const videos = cards.map(card => card.querySelector('video'));
  const buttons = cards.map((card, index) => {
    const title = card.querySelector('figcaption').textContent;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'reel-open';
    button.setAttribute('aria-label', 'Watch ' + title + ' full-screen');
    button.setAttribute('aria-haspopup', 'dialog');
    button.addEventListener('click', () => openReelViewer(button, videos[index], title));
    card.append(button);
    return button;
  });

  let activeReel = 0;
  let stageVisible = !('IntersectionObserver' in window);
  let timer;

  function syncPlayback() {
    const reduced = reducedReelMotion.matches;
    const saveData = reelConnection?.saveData || reelConnection?.effectiveType === 'slow-2g';
    const centerOnly = ['2g', '3g'].includes(reelConnection?.effectiveType);
    const canPlay = stageVisible && !document.hidden && !reduced && !reelViewer.open && !saveData;
    cards.forEach((card, index) => {
      const position = Number(card.dataset.reelPosition);
      const shown = reduced || Math.abs(position) <= reelSideCount;
      card.inert = !shown;
      const video = videos[index];
      const enteringNext = position === reelSideCount + 1;
      if (stageVisible && (shown || enteringNext) && !video.hasAttribute('poster')) {
        video.poster = video.dataset.poster;
      }
      if (canPlay && shown && (!centerOnly || position === 0)) {
        if (!video.hasAttribute('src')) video.src = video.dataset.previewSrc;
        if (video.paused) video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    });
  }

  function positionCards() {
    const wrapPosition = -reelSideCount - 1;
    cards.forEach((card, index) => {
      const position = (index - activeReel + cards.length - wrapPosition) % cards.length + wrapPosition;
      card.dataset.reelPosition = String(position);
    });
    syncPlayback();
  }

  function refresh() {
    syncPlayback();
    if (!stageVisible || document.hidden || reducedReelMotion.matches || reelViewer.open) {
      clearInterval(timer);
      timer = undefined;
      return;
    }
    if (timer !== undefined) return;
    timer = setInterval(() => {
      if (buttons.some(button => button.matches(':focus-visible'))) return;
      activeReel = (activeReel + 1) % cards.length;
      positionCards();
    }, 6500);
  }

  positionCards();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      stageVisible = entry.isIntersecting;
      refresh();
    }, { rootMargin: '160px 0px' });
    observer.observe(stage);
  } else {
    refresh();
  }
  return refresh;
}

const updateReelStages = [...document.querySelectorAll('.reel-stage')].map(setupReelStage);

function refreshReelStages() {
  updateReelStages.forEach(update => update());
}

document.addEventListener('visibilitychange', refreshReelStages);
reducedReelMotion.addEventListener('change', refreshReelStages);
reelConnection?.addEventListener('change', refreshReelStages);
