import { metrics } from '../data/content';
import { useReveal } from '../lib/useReveal';
import SectionHead from './SectionHead';

export default function Proof() {
  const scope = useReveal('[data-metric]', { each: 0.05 });

  return (
    <section id="impact" ref={scope} className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24">
      <SectionHead
        index="01"
        eyebrow="Impact"
        title="Numbers first."
        lead="Every figure below is attached to a shipped product and a named team."
      />

      {/* A visible grid: one hairline shared between neighbouring cells. */}
      <div
        className="grid grid-cols-2 border-l-2 border-t-2 md:grid-cols-4"
        style={{ borderColor: 'var(--line-strong)' }}
      >
        {metrics.map(m => (
          <div
            key={`${m.value}-${m.context}`}
            data-metric
            className="border-b-2 border-r-2 p-5 md:p-6"
            style={{ borderColor: 'var(--line-strong)', background: 'var(--card)' }}
          >
            <div className="display text-[clamp(2rem,5vw,3.25rem)]">{m.value}</div>
            <div className="mt-2 font-display text-[14px] font-semibold leading-snug">
              {m.label}
            </div>
            <div className="label mt-1.5" style={{ letterSpacing: '0.12em' }}>
              {m.context}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
