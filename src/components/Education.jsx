import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

/* ── Edit these to match your transcript ───────────────────────
   Any field left as an empty string simply does not render. */
const schools = [
  {
    school: 'Lamar University',
    location: 'Beaumont, Texas · USA',
    degree: '',
    period: '',
    stats: [{ value: '4.00', label: 'GPA' }],
    notes: [],
  },
];

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'transform,translate,rotate,scale',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 px-6 md:px-16"
      style={{ background: 'var(--void)' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="05" eyebrow="Education" title="The" accent="foundation." />

        <div className={`grid gap-6 ${schools.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {schools.map(s => (
            <div
              key={s.school}
              className="edu-card project-card rounded-[1.5rem] border p-7 flex flex-col md:flex-row md:items-center gap-7"
              style={{ background: 'var(--carbon)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start gap-4 flex-1">
                <span
                  className="grid place-items-center flex-shrink-0 rounded-2xl border"
                  style={{
                    width: 48,
                    height: 48,
                    borderColor: 'rgba(245,197,24,0.28)',
                    background: 'rgba(245,197,24,0.05)',
                    color: 'var(--signal)',
                  }}
                >
                  <GraduationCap size={22} strokeWidth={1.5} />
                </span>

                <div className="flex-1">
                  {s.period && (
                    <div className="font-mono text-xs mb-2" style={{ color: 'var(--signal)' }}>
                      {s.period}
                    </div>
                  )}
                  <h3 className="font-barlow font-bold text-2xl m-0" style={{ color: 'var(--ghost)' }}>
                    {s.school}
                  </h3>
                  {s.degree && (
                    <p className="font-dm text-sm mt-1 mb-0" style={{ color: 'var(--ghost)' }}>
                      {s.degree}
                    </p>
                  )}
                  <p className="font-dm text-sm mt-1 mb-0" style={{ color: 'var(--mist)' }}>
                    {s.location}
                  </p>
                </div>
              </div>

              {s.stats.length > 0 && (
                <div
                  className="flex flex-wrap gap-10 pt-6 border-t md:pt-0 md:pl-10 md:border-t-0 md:border-l flex-shrink-0"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {s.stats.map(st => (
                    <div key={st.label}>
                      <div
                        className="font-bebas leading-none"
                        style={{ fontSize: '38px', color: 'var(--signal)' }}
                      >
                        {st.value}
                      </div>
                      <div
                        className="font-mono uppercase mt-1"
                        style={{ fontSize: 10, letterSpacing: '0.24em', color: 'var(--mist)' }}
                      >
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {s.notes.length > 0 && (
                <ul className="flex flex-col gap-2 p-0 m-0 basis-full" style={{ listStyle: 'none' }}>
                  {s.notes.map(n => (
                    <li
                      key={n}
                      className="flex gap-3 font-dm text-sm leading-relaxed"
                      style={{ color: 'var(--mist)' }}
                    >
                      <span
                        className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
                        style={{ background: 'var(--signal)' }}
                      />
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
