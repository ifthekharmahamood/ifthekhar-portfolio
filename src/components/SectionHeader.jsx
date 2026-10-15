/* ──────────────────────────────────────────────────────────────
   One header treatment for every section, numbered like the
   stations in the hero: 01 / EYEBROW, then a Bebas headline that
   hands its last phrase to the serif italic from the hero.
   ────────────────────────────────────────────────────────────── */
export default function SectionHeader({ index, eyebrow, title, accent, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-center gap-4 mb-5">
        <span
          className="font-mono"
          style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--signal)' }}
        >
          {index}
        </span>
        <span className="h-px w-7" style={{ background: 'rgba(245,197,24,0.4)' }} />
        <span
          className="font-mono uppercase whitespace-nowrap"
          style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--mist)' }}
        >
          {eyebrow}
        </span>
        <span
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to right, rgba(245,197,24,0.22), transparent)' }}
        />
      </div>

      <h2
        className="font-bebas leading-none m-0"
        style={{ fontSize: 'clamp(44px, 7vw, 88px)', color: 'var(--ghost)' }}
      >
        {title}{' '}
        <span
          className="font-instrument italic"
          style={{ color: 'var(--signal)', fontSize: '0.94em', letterSpacing: '-0.01em' }}
        >
          {accent}
        </span>
      </h2>
    </div>
  );
}
