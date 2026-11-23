function setupCategoryPicker(track) {
  const picker = track.parentElement;
  const [previous, next] = picker.querySelectorAll('.category-picker-arrow');
  const filters = [...track.children];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function syncArrows() {
    previous.setAttribute('aria-disabled', String(track.scrollLeft <= 1));
    next.setAttribute('aria-disabled', String(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1));
  }

  function revealSelected() {
    const selected = track.querySelector('[aria-current="true"], [aria-pressed="true"]');
    if (selected) {
      const left = selected.offsetLeft;
      const right = left + selected.offsetWidth;
      if (left < track.scrollLeft) track.scrollLeft = left;
      else if (right > track.scrollLeft + track.clientWidth) track.scrollLeft = right - track.clientWidth;
    }
    syncArrows();
  }

  function fitFilters() {
    previous.hidden = next.hidden = track.scrollWidth <= picker.clientWidth + 1;
    revealSelected();
  }

  function move(forward) {
    if ((forward ? next : previous).getAttribute('aria-disabled') === 'true') return;
    const left = track.scrollLeft;
    const right = left + track.clientWidth;
    const filter = forward
      ? filters.find(item => item.offsetLeft + item.offsetWidth > right + 1)
      : filters.findLast(item => item.offsetLeft < left - 1);
    if (!filter) return;

    track.scrollTo({
      left: forward ? filter.offsetLeft : filter.offsetLeft + filter.offsetWidth - track.clientWidth,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  }

  previous.addEventListener('click', () => move(false));
  next.addEventListener('click', () => move(true));
  track.addEventListener('scroll', syncArrows, { passive: true });
  window.addEventListener('resize', fitFilters);
  document.fonts.ready.then(fitFilters);
  fitFilters();
  return revealSelected;
}
