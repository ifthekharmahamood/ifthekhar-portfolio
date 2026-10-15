import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile, marquee } from '../data/content';
import { prefersReducedMotion } from '../lib/useReveal';

const spec = [
  ['Role', profile.role],
  ['Based', profile.location],
  ['Status', profile.available],
];

function Marquee() {
  // Duplicated once so the -50% translate loops seamlessly.
  const row = [...marquee, ...marquee];
  return (
    <div
      className="overflow-hidden border-y-2 py-3"
      style={{ borderColor: 'var(--line-strong)', background: 'var(--fg)' }}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[12px] uppercase tracking-[0.2em]"
            style={{ color: 'var(--bg)' }}
          >
            {item}
            <span className="ml-10 opacity-40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const scope = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.09,
        clearProps: 'transform,opacity',
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={scope}>
      <div className="mx-auto max-w-shell px-5 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
        <div className="flex items-center gap-3" data-hero-line>
          <span
            className="inline-block h-2 w-2 shrink-0"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          />
          <span className="label">{profile.role}</span>
          <span className="label hidden sm:inline" style={{ opacity: 0.55 }}>
            / {profile.available}
          </span>
        </div>

        <h1
          className="display mt-6 text-[clamp(2.75rem,11vw,8.5rem)]"
          data-hero-line
        >
          Ifthekhar
          <br />
          <span style={{ color: 'var(--accent)' }}>Enad Mahamood</span>
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7" data-hero-line>
            <p className="max-w-xl text-[1.125rem] leading-relaxed md:text-[1.25rem]">
              {profile.statement}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 border-2 px-6 font-mono text-[12px] uppercase tracking-[0.16em] no-underline transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: 'var(--line-strong)',
                  background: 'var(--fg)',
                  color: 'var(--bg)',
                }}
              >
                See the work
                <ArrowDown size={15} aria-hidden="true" />
              </a>
              <a
                href={profile.resume}
                download={profile.resumeFileName}
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 border-2 px-6 font-mono text-[12px] uppercase tracking-[0.16em] no-underline transition-transform hover:-translate-y-0.5"
                style={{ borderColor: 'var(--line-strong)', color: 'var(--fg)' }}
              >
                Download résumé
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Spec table — the dossier device that recurs through the page */}
          <dl
            className="border-2 md:col-span-5 md:self-start"
            style={{ borderColor: 'var(--line-strong)', background: 'var(--card)' }}
            data-hero-line
          >
            {spec.map(([k, v], i) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 px-5 py-4"
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                }}
              >
                <dt className="label">{k}</dt>
                <dd className="m-0 text-right font-display text-[15px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
