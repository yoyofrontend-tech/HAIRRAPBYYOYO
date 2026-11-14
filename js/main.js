const initializePage = () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const yearNode = document.querySelector('#year');
  const heroSlider = document.querySelector('.hero-slider');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (heroSlider) {
    const slides = [...heroSlider.querySelectorAll('.hero-slide')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeSlide = 0;
    let autoplayId;

    const updateAutoplay = () => {
      const shouldPause = reducedMotion.matches || document.hidden || heroSlider.matches(':hover') || heroSlider.contains(document.activeElement);

      if (shouldPause && autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = undefined;
      } else if (!shouldPause && !autoplayId && slides.length > 1) {
        autoplayId = window.setInterval(() => {
          slides[activeSlide].classList.remove('is-active');
          activeSlide = (activeSlide + 1) % slides.length;
          slides[activeSlide].classList.add('is-active');
        }, 6000);
      }
    };

    heroSlider.addEventListener('mouseenter', updateAutoplay);
    heroSlider.addEventListener('mouseleave', updateAutoplay);
    heroSlider.addEventListener('focusin', updateAutoplay);
    heroSlider.addEventListener('focusout', updateAutoplay);
    document.addEventListener('visibilitychange', updateAutoplay);
    reducedMotion.addEventListener('change', updateAutoplay);
    updateAutoplay();
  }

  if (navToggle && mainNav) {
    const header = navToggle.closest('.site-header');
    const setMenuOpen = (isOpen) => {
      mainNav.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };

    navToggle.addEventListener('click', () => {
      setMenuOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        setMenuOpen(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (navToggle.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        navToggle.focus();
      }
    });

    window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    });
  }

};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage, { once: true });
} else {
  initializePage();
}
