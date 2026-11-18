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

const heroSlides = [...document.querySelectorAll('.hero-slide')];
let activeSlide = 0;
let slideshowTimer;
function updateSlideshow() {
  clearInterval(slideshowTimer);
  if (!document.hidden) {
    slideshowTimer = setInterval(() => {
      heroSlides[activeSlide].classList.remove('is-active');
      activeSlide = (activeSlide + 1) % heroSlides.length;
      heroSlides[activeSlide].classList.add('is-active');
    }, 5000);
  }
}
document.addEventListener('visibilitychange', updateSlideshow);
updateSlideshow();

const priceMenu = document.querySelector('#price-menu');
const menuButtons = [...document.querySelectorAll('[data-menu]')];
const money = value => value == null ? '—' : `₹${value.toLocaleString('en-IN')}`;
const iconPaths = {
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.2 8.2 19 19M8.2 15.8 19 5"/>',
  colour: '<path d="M12 3c-2 3-6 6.5-6 10.5a6 6 0 0 0 12 0C18 9.5 14 6 12 3Z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
  care: '<path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/><circle cx="12" cy="12" r="3"/>',
  sparkle: '<path d="m12 3 1.8 5.7L19.5 10.5l-5.7 1.8L12 18l-1.8-5.7-5.7-1.8 5.7-1.8L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/>',
  hands: '<path d="M7 12V6a1.5 1.5 0 0 1 3 0v4-6a1.5 1.5 0 0 1 3 0v6-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v6c0 4-2.5 7-6.5 7H12c-2.5 0-4-1-5.5-3L3 14a1.5 1.5 0 0 1 2.2-2l1.8 2Z"/>'
};
function iconFor(title) {
  const t = title.toLowerCase();
  if (/brid|groom|facial|mask|clean|tan|wax|thread|removal/.test(t)) return 'sparkle';
  if (/colour/.test(t)) return 'colour';
  if (/pedicure|manicure|nail/.test(t)) return 'hands';
  if (/cut|beard|styling/.test(t)) return 'scissors';
  return 'care';
}

function showMenu(key, featuredGroup) {
  let featuredSummary;
  priceMenu.replaceChildren();
  menuButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.menu === key)));
  serviceMenus[key].forEach((group, index) => {
    const details = document.createElement('details');
    details.className = 'price-group';
    details.open = featuredGroup ? group.title === featuredGroup : index === 0;
    const summary = document.createElement('summary');
    if (group.title === featuredGroup) featuredSummary = summary;
    const icon = document.createElement('span');
    icon.className = 'price-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${iconPaths[iconFor(group.title)]}</svg>`;
    const label = document.createElement('span');
    label.className = 'price-title';
    label.textContent = group.title;
    summary.append(icon, label);
    details.append(summary);
    if (group.columns.length > 2) {
      const hint = document.createElement('p');
      hint.className = 'price-scroll-hint';
      hint.textContent = 'Swipe across to see all prices →';
      details.append(hint);
    }
    const scroll = document.createElement('div');
    scroll.className = 'price-table-wrap';
    scroll.tabIndex = 0;
    scroll.setAttribute('role', 'region');
    scroll.setAttribute('aria-label', `${group.title} prices`);
    const table = document.createElement('table');
    const header = table.createTHead().insertRow();
    ['Service', ...group.columns].forEach(label => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = label;
      header.append(th);
    });
    const body = table.createTBody();
    group.rows.forEach(([name, ...prices]) => {
      const row = body.insertRow();
      const label = document.createElement('th');
      label.scope = 'row';
      label.textContent = name;
      row.append(label);
      prices.forEach(value => {
        const cell = row.insertCell();
        cell.textContent = money(value);
      });
    });
    scroll.append(table);
    details.append(scroll);
    if (group.note) {
      const note = document.createElement('p');
      note.className = 'price-group-note';
      note.textContent = group.note;
      details.append(note);
    }
    priceMenu.append(details);
  });
  return featuredSummary;
}
menuButtons.forEach(button => button.addEventListener('click', () => showMenu(button.dataset.menu)));
document.querySelector('.service-links').addEventListener('click', event => {
  const link = event.target.closest('[data-service-group]');
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const summary = showMenu(link.dataset.serviceMenu, link.dataset.serviceGroup);
  summary.focus({ preventScroll: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  summary.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'instant' : 'smooth' });
});
showMenu('women');
