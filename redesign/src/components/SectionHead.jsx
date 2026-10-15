/* One header treatment for every section: an index, a mono eyebrow,
   a full-width rule, then the display headline. */
export default function SectionHead({ index, eyebrow, title, lead }) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-baseline gap-4">
        <span className="label text-accent" style={{ color: 'var(--accent)' }}>
          {index}
        </span>
        <span className="label">{eyebrow}</span>
        <span className="rule-strong flex-1 translate-y-[-4px]" aria-hidden="true" />
      </div>

      <h2 className="display mt-5 text-[clamp(2.25rem,6vw,4.5rem)]">{title}</h2>

      {lead && (
        <p
          className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed"
          style={{ color: 'var(--muted-fg)' }}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
