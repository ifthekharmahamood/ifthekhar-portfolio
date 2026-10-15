const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Connect', href: '#contact' },
];

const handleNav = (e, href) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer
      className="rounded-t-[3rem] px-8 md:px-16 pt-16 pb-8"
      style={{ background: 'var(--void)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Col 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="grid place-items-center font-instrument italic"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: 'var(--signal)',
                  color: 'var(--void)',
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                i
              </span>
              <span className="font-mono" style={{ fontSize: 14, color: 'var(--ghost)' }}>
                ifthekhar.dev
              </span>
            </div>
            <p className="font-instrument text-xl" style={{ color: 'var(--ghost)' }}>
              Ifthekhar Enad Mahamood
            </p>
            <p className="font-dm text-sm" style={{ color: 'var(--mist)' }}>
              Product Manager
            </p>
            <p className="font-dm text-xs mt-1 leading-relaxed max-w-xs" style={{ color: 'var(--mist)' }}>
              Building products that move people — from 5M+ app downloads to 40% faster onboarding.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <p
              className="font-barlow font-semibold uppercase tracking-[0.3em] text-xs mb-2"
              style={{ color: 'var(--signal)' }}
            >
              Navigation
            </p>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => handleNav(e, link.href)}
                className="font-dm text-sm no-underline transition-colors"
                style={{ color: 'var(--mist)' }}
                onMouseEnter={e => (e.target.style.color = 'var(--ghost)')}
                onMouseLeave={e => (e.target.style.color = 'var(--mist)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-3">
            <p
              className="font-barlow font-semibold uppercase tracking-[0.3em] text-xs mb-2"
              style={{ color: 'var(--signal)' }}
            >
              System
            </p>
            <div className="flex items-center gap-2">
              <span
                className="pulse-dot w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#22c55e', display: 'inline-block' }}
              />
              <span className="font-mono text-xs" style={{ color: '#22c55e' }}>
                PORTFOLIO LIVE · BUILD 2026
              </span>
            </div>
            <p className="font-mono text-xs mt-2" style={{ color: 'var(--mist)' }}>
              Stack: React 19 + Vite + GSAP
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--mist)' }}>
              Design: Signal Noir v2.0
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="font-dm text-xs" style={{ color: 'var(--mist)' }}>
            © 2026 Ifthekhar Enad Mahamood · All rights reserved
          </p>
          <a
            href="/resume.pdf"
            download="Ifthekhar_Enad_Mahamood_Resume.pdf"
            className="font-dm text-xs no-underline transition-colors"
            style={{ color: 'var(--mist)' }}
            onMouseEnter={e => (e.target.style.color = 'var(--signal)')}
            onMouseLeave={e => (e.target.style.color = 'var(--mist)')}
          >
            Download Resume ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
