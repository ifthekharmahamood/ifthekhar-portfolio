import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const noiseRef = useRef(null);
  const wordsRef = useRef([]);

  const bigWords = ['I', 'MEASURE', 'IT', 'BY', '5', 'MILLION', 'DOWNLOADS.'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax noise
      if (noiseRef.current) {
        gsap.to(noiseRef.current, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Word-by-word reveal
      const validWords = wordsRef.current.filter(Boolean);
      if (validWords.length > 0) {
        gsap.from(validWords, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden flex items-center justify-center"
      style={{ background: 'var(--carbon)', minHeight: '60vh' }}
    >
      {/* Parallax noise overlay */}
      <div
        ref={noiseRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          willChange: 'transform',
        }}
      />

      <div className="relative z-10 max-w-3xl text-center">
        <p className="font-dm mb-8 italic" style={{ fontSize: '18px', color: 'var(--mist)' }}>
          "Most product teams measure success by features shipped."
        </p>

        <div
          className="font-bebas leading-none"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--ghost)' }}
        >
          <span
            ref={el => (wordsRef.current[0] = el)}
            className="inline-block mr-[0.25em]"
          >
            I MEASURE IT BY
          </span>
          <br />
          <span
            ref={el => (wordsRef.current[1] = el)}
            className="inline-block font-instrument italic"
            style={{ color: 'var(--signal)', fontSize: '1.06em' }}
          >
            5 million downloads.
          </span>
        </div>
      </div>
    </section>
  );
}
