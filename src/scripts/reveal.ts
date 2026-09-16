import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll-driven reveals, timeline draw-in, and magnetic CTAs.
 *
 * No-flash strategy: `[data-reveal]` elements are only hidden by CSS when the
 * `.js` class is present AND the user allows motion (see global.css). So if
 * JS is disabled or reduced-motion is on, content is visible by default and
 * this function simply returns.
 */
export function initReveals(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return; // content already visible; honour the preference

  gsap.registerPlugin(ScrollTrigger);

  // Reveal each marked element as it scrolls into view.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
    });
  });

  // Timeline: draw the amber progress line as the section scrolls past.
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  const progress = document.querySelector<HTMLElement>('[data-timeline-progress]');
  if (timeline && progress) {
    gsap.fromTo(
      progress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: true,
        },
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
