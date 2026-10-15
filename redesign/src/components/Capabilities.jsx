import { GraduationCap } from 'lucide-react';
import { capabilities, education } from '../data/content';
import { useReveal } from '../lib/useReveal';
import SectionHead from './SectionHead';

export default function Capabilities() {
  const scope = useReveal('[data-chip]', { each: 0.02, y: 10, scale: 0.94 });

  return (
    <section
      id="capabilities"
      ref={scope}
      className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24"
    >
      <SectionHead index="04" eyebrow="Capabilities" title="How the work gets done." />

      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {capabilities.map(col => (
          <div key={col.group}>
            <h3
              className="label m-0 border-b-2 pb-3"
              style={{ borderColor: 'var(--line-strong)', color: 'var(--fg)' }}
            >
              {col.group}
            </h3>
            <ul className="mt-5 flex list-none flex-wrap gap-2 p-0">
              {col.items.map(item => (
                <li
                  key={item}
                  data-chip
                  className="border px-3 py-2 font-mono text-[12px]"
                  style={{
                    borderColor: 'var(--line)',
                    background: 'var(--card)',
                    color: 'var(--fg)',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education reads as one more spec row rather than its own thin section */}
      <div
        className="mt-14 flex flex-wrap items-center justify-between gap-6 border-2 p-6 md:mt-16 md:p-8"
        style={{ borderColor: 'var(--line-strong)', background: 'var(--card)' }}
      >
        <div className="flex items-center gap-5">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center border-2"
            style={{ borderColor: 'var(--line-strong)', color: 'var(--accent)' }}
            aria-hidden="true"
          >
            <GraduationCap size={22} strokeWidth={1.75} />
          </span>
          <div>
            <p className="label m-0">Education</p>
            <h3 className="display m-0 mt-1 text-[clamp(1.35rem,3vw,1.9rem)]">
              {education.school}
            </h3>
            <p className="mt-1 text-[14px]" style={{ color: 'var(--muted-fg)' }}>
              {education.location}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="display text-[clamp(2.25rem,5vw,3rem)]" style={{ color: 'var(--accent)' }}>
            {education.gpa}
          </div>
          <div className="label mt-1">GPA</div>
        </div>
      </div>
    </section>
  );
}
