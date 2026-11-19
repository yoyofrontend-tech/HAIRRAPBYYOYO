const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const siteHeader = document.querySelector('.header');
const homepageHero = document.querySelector('.hero');

function updateHeaderSurface() {
  const overContent = homepageHero.getBoundingClientRect().bottom <= siteHeader.getBoundingClientRect().bottom;
  siteHeader.classList.toggle('is-over-content', overContent);
}

window.addEventListener('scroll', updateHeaderSurface, { passive: true });
window.addEventListener('resize', updateHeaderSurface);
window.addEventListener('pageshow', updateHeaderSurface);
updateHeaderSurface();

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
const navigationLinks = [...navigation.querySelectorAll('a')];
const homeLink = navigationLinks.find(link => link.getAttribute('aria-current') === 'page');

function updateCurrentNavigation() {
  const target = document.getElementById(location.hash.slice(1));
  const sectionLink = target && navigationLinks.find(link =>
    link.hash && document.getElementById(link.hash.slice(1))?.contains(target));
  const currentLink = sectionLink || homeLink;

  for (const link of navigationLinks) {
    if (link === currentLink) link.setAttribute('aria-current', sectionLink ? 'location' : 'page');
    else link.removeAttribute('aria-current');
  }
}

window.addEventListener('hashchange', updateCurrentNavigation);
updateCurrentNavigation();

const sectionLinks = navigationLinks.map(link => {
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
