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
