import { experience } from '../data/content';
import { useReveal } from '../lib/useReveal';
import SectionHead from './SectionHead';

export default function Experience() {
  const scope = useReveal('[data-role]', { each: 0.1, y: 20 });

  return (
    <section
      id="experience"
      ref={scope}
      className="border-y-2"
      style={{ borderColor: 'var(--line-strong)', background: 'var(--muted)' }}
    >
      <div className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24">
        <SectionHead
          index="03"
          eyebrow="Experience"
          title="Three and a half years."
          lead="Consumer scale at a games studio, zero-to-one at a hardware startup, and platform work at a ride-sharing company."
        />

        <ol className="m-0 list-none p-0">
          {experience.map(job => (
            <li
              key={job.company}
              data-role
              className="grid gap-4 border-t-2 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              style={{ borderColor: 'var(--line-strong)' }}
            >
              <div className="md:col-span-3">
                <p className="label m-0">{job.period}</p>
                {job.note && (
                  <p
                    className="mt-3 inline-block border px-2.5 py-1 font-mono text-[12px] leading-snug"
                    style={{ borderColor: 'var(--line-strong)', color: 'var(--accent)' }}
                  >
                    {job.note}
                  </p>
                )}
              </div>

              <div className="md:col-span-9">
                <h3 className="display m-0 text-[clamp(1.5rem,3.2vw,2.25rem)]">{job.company}</h3>
                <p className="mt-1 font-display text-[15px] font-medium" style={{ color: 'var(--accent)' }}>
                  {job.role}
                </p>

                <ul className="mt-5 flex list-none flex-col gap-3 p-0">
                  {job.bullets.map(b => (
                    <li
                      key={b}
                      className="grid grid-cols-[10px_1fr] gap-3 text-[15px] leading-relaxed"
                      style={{ color: 'var(--muted-fg)' }}
                    >
                      <span
                        className="mt-2 block h-[2px] w-[10px]"
                        style={{ background: 'var(--accent)' }}
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
