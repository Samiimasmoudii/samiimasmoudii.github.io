import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll-driven reveals, timeline draw-in, and magnetic CTAs.
 *
 * No-flash strategy: `[data-reveal]` elements are only hidden by CSS when the
 * `.js` class is present AND the user allows motion (see global.css). So if
 * JS is disabled or reduced-motion is on, content is visible by default and
 * this function returns early.
 *
 * Reveals use IntersectionObserver (reliable for elements already in view on
 * load and across viewports) rather than ScrollTrigger, plus a visibility
 * failsafe — content must never stay hidden.
 */
export function initReveals(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return; // content already visible; honour the preference

  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  const show = (el: HTMLElement, animate = true) =>
    gsap.to(el, { opacity: 1, y: 0, duration: animate ? 0.8 : 0, ease: 'power3.out' });

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => show(el, false));
  } else {
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

    // Failsafe: anything in-view but still hidden shortly after load gets shown.
    window.setTimeout(() => {
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const inView = r.top < window.innerHeight && r.bottom > 0;
        if (inView && getComputedStyle(el).opacity === '0') show(el, false);
      });
    }, 1200);
  }

  // Timeline: draw the amber progress line as the section scrolls past.
  gsap.registerPlugin(ScrollTrigger);
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  const progress = document.querySelector<HTMLElement>('[data-timeline-progress]');
  if (timeline && progress) {
    gsap.fromTo(
      progress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: timeline, start: 'top 65%', end: 'bottom 75%', scrub: true },
      },
    );
  }

  // Magnetic hover for primary CTAs.
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = 0.4;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}
