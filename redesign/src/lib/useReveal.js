import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Scroll-triggered stagger reveal.
   Under reduced motion nothing animates and nothing is left hidden —
   the elements simply render in their final state. */
export function useReveal(selector, { y = 16, scale = 0.97, each = 0.06, start = 'top 82%' } = {}) {
  const scope = useRef(null);

  useEffect(() => {
    if (!scope.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);
      if (!targets.length) return;

      gsap.from(targets, {
        opacity: 0,
        y,
        scale,
        duration: 0.42,
        ease: 'back.out(1.4)',
        stagger: { each, from: 'start', grid: 'auto' },
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: scope.current, start, once: true },
      });
    }, scope);

    return () => ctx.revert();
  }, [selector, y, scale, each, start]);

  return scope;
}
