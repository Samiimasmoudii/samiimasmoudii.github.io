/**
 * Scroll-driven reveals, timeline draw-in, and magnetic CTAs — dependency-free
 * (previously GSAP + ScrollTrigger, ~47 KB gzipped for these three effects).
 *
 * No-flash strategy: `[data-reveal]` elements are only hidden by CSS when the
 * `.js` class is present AND the user allows motion (see global.css). So if
 * JS is disabled or reduced-motion is on, content is visible by default and
 * this function returns early.
 *
 * Reveals animate the standalone `translate` property (not `transform`), so
 * they never fight a component's own hover transform (e.g. the project-card
 * lift). The final state lives in CSS via `.is-revealed`.
 */
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function initReveals(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return; // content already visible; honour the preference

  initScrollReveals();
  initTimelineProgress();
  initMagnetic();
}

function initScrollReveals(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  const show = (el: HTMLElement, animate = true) => {
    if (el.classList.contains('is-revealed')) return;
    el.classList.add('is-revealed');
    if (animate && typeof el.animate === 'function') {
      el.animate(
        [
          { opacity: 0, translate: '0 24px' },
          { opacity: 1, translate: '0 0' },
        ],
        { duration: 800, easing: EASE_OUT },
      );
    }
  };

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => show(el, false));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));

  // Failsafe: anything in view but still hidden shortly after load gets shown.
  window.setTimeout(() => {
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) show(el, false);
    });
  }, 1200);
}

/**
 * Draw the amber Experience line as the section scrolls past: 0 when the
 * timeline's top reaches 65% of the viewport, 1 when its bottom reaches 75%.
 * The scroll listener is only attached while the timeline is near view.
 */
function initTimelineProgress(): void {
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  const progress = document.querySelector<HTMLElement>('[data-timeline-progress]');
  if (!timeline || !progress) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const r = timeline.getBoundingClientRect();
    const span = r.height - 0.1 * vh;
    const p = span > 0 ? (0.65 * vh - r.top) / span : 1;
    progress.style.transform = `scaleY(${Math.min(1, Math.max(0, p))})`;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  update();
  if (typeof IntersectionObserver === 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true });
    return;
  }
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
      } else {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
      update(); // settle at 0 or 1 when entering/leaving
    },
    { rootMargin: '25% 0px' },
  ).observe(timeline);
}

/** Magnetic hover for primary CTAs (fine pointers only). */
function initMagnetic(): void {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const strength = 0.4;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    // Keep the button's own hover transitions (colour, shadow) and add ours.
    // Uses `translate` so it composes with any `transform` on the element.
    const base = getComputedStyle(el).transition;
    const withTranslate = (t: string) => (base && base !== 'none' ? `${base}, ${t}` : t);

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transition = withTranslate(`translate 0.4s ${EASE_OUT}`);
      el.style.translate = `${x}px ${y}px`;
    });
    el.addEventListener('pointerleave', () => {
      // Slight overshoot back to rest, standing in for GSAP's elastic ease.
      el.style.transition = withTranslate('translate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)');
      el.style.translate = '';
    });
  });
}
