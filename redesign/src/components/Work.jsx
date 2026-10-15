import { ArrowUpRight } from 'lucide-react';
import { work } from '../data/content';
import { useReveal } from '../lib/useReveal';
import SectionHead from './SectionHead';

function Card({ item }) {
  const Wrapper = item.href ? 'a' : 'div';
  const linkProps = item.href
    ? {
        href: item.href,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${item.title} — open in the Play Store`,
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      data-card
      className={`slab ${item.href ? 'slab-lift cursor-pointer' : ''} flex flex-col no-underline`}
      style={{ borderColor: 'var(--line-strong)', color: 'var(--fg)' }}
    >
      {/* Headline metric band */}
      <div
        className="flex items-start justify-between gap-4 border-b-2 p-6"
        style={{ borderColor: 'var(--line-strong)' }}
      >
        <div>
          <div className="display text-[clamp(2.5rem,6vw,4rem)]" style={{ color: 'var(--accent)' }}>
            {item.headline}
          </div>
          <div className="label mt-1">{item.headlineLabel}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="label" style={{ opacity: 0.6 }}>
            {item.id}
          </span>
          {item.href && <ArrowUpRight size={20} aria-hidden="true" />}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="display m-0 text-2xl">{item.title}</h3>
        <p className="label mt-2">
          {item.org} / {item.kind}
        </p>

        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--muted-fg)' }}>
          {item.summary}
        </p>

        <dl className="mt-6 border-t" style={{ borderColor: 'var(--line)' }}>
          {item.facts.map(([k, v]) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-4 border-b py-2.5"
              style={{ borderColor: 'var(--line)' }}
            >
              <dt className="label" style={{ letterSpacing: '0.14em' }}>
                {k}
              </dt>
              <dd className="m-0 text-right font-mono text-[13px] font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
          {item.tags.map(t => (
            <li
              key={t}
              className="border px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.12em]"
              style={{ borderColor: 'var(--line)', color: 'var(--muted-fg)' }}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}

export default function Work() {
  const scope = useReveal('[data-card]', { each: 0.08 });

  return (
    <section id="work" ref={scope} className="mx-auto max-w-shell px-5 py-16 md:px-8 md:py-24">
      <SectionHead
        index="02"
        eyebrow="Selected work"
        title="Four things that shipped."
        lead="Consumer apps and internal platforms, each taken from discovery through launch and measured afterwards."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {work.map(item => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
