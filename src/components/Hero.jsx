import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Download } from 'lucide-react';
import JourneyBackdrop from './JourneyBackdrop';

export default function Hero() {
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [tagRef.current, line1Ref.current, line2Ref.current, btnsRef.current],
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '100dvh',
        background:
          'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(245,197,24,0.07) 0%, transparent 72%), #080808',
      }}
    >
      <JourneyBackdrop />

      {/* Scrim — keeps the name legible where the path runs behind it */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 34% 20% at 50% 46%, rgba(8,8,8,0.62) 0%, rgba(8,8,8,0.30) 55%, transparent 80%)',
        }}
      />

      {/* Bottom fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }}
      />

      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center">
        {/* Status tag */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 mb-8"
          style={{ borderColor: 'rgba(245,197,24,0.22)', background: 'rgba(8,8,8,0.55)' }}
        >
          <span
            className="pulse-dot w-1.5 h-1.5 rounded-full"
            style={{ background: '#22c55e', display: 'inline-block' }}
          />
          <span
            className="font-mono uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--mist)' }}
          >
            Product Manager
          </span>
        </div>

        {/* Name */}
        <h1 className="m-0 font-instrument" style={{ lineHeight: 0.98 }}>
          <span
            ref={line1Ref}
            className="block"
            style={{ fontSize: 'clamp(40px, 6.6vw, 84px)', color: 'var(--ghost)' }}
          >
            Ifthekhar
          </span>
          <span
            ref={line2Ref}
            className="block italic"
            style={{
              fontSize: 'clamp(40px, 6.6vw, 84px)',
              color: 'var(--signal)',
              marginTop: '0.04em',
            }}
          >
            Enad Mahamood
          </span>
        </h1>

        {/* Actions */}
        <div ref={btnsRef} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={scrollToWork}
            className="btn-sweep inline-flex items-center gap-2 px-7 py-3 rounded-full font-barlow font-semibold text-base tracking-wider border-0"
            style={{ background: 'var(--signal)', color: 'var(--void)' }}
          >
            <span className="sweep-inner rounded-full" style={{ background: 'var(--signal-muted)' }} />
            <span className="relative z-10 inline-flex items-center gap-2">
              View My Work
              <ArrowRight size={16} strokeWidth={2.4} />
            </span>
          </button>

          <a
            href="/resume.pdf"
            download="Ifthekhar_Enad_Mahamood_Resume.pdf"
            className="btn-sweep inline-flex items-center gap-2 px-7 py-3 rounded-full font-barlow font-semibold text-base tracking-wider border no-underline"
            style={{ borderColor: 'rgba(244,244,244,0.28)', color: 'var(--ghost)', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--void)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ghost)')}
          >
            <span className="sweep-inner rounded-full" style={{ background: 'var(--ghost)' }} />
            <span className="relative z-10 inline-flex items-center gap-2">
              <Download size={16} strokeWidth={2.2} />
              Download Resume
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
