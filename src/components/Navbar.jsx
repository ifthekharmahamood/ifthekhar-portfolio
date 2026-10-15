import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'CONNECT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        background: scrolled ? 'rgba(8,8,8,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(245,197,24,0.12)' : 'transparent'}`,
      }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        {/* Logo */}
        <a
          href="#top"
          onClick={e => handleNav(e, '#top')}
          className="flex items-center gap-3 no-underline"
          style={{ transform: 'none' }}
        >
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
          <span
            className="font-mono"
            style={{ fontSize: 14, letterSpacing: '0.02em', color: 'var(--ghost)' }}
          >
            ifthekhar.dev
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-9">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={e => handleNav(e, l.href)}
              className="nav-link font-mono no-underline"
              style={{ fontSize: 11.5, letterSpacing: '0.2em', color: 'var(--mist)' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg border"
          style={{ borderColor: 'var(--border)', color: 'var(--ghost)', background: 'transparent' }}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden px-6 pb-6 pt-2 flex flex-col gap-5 border-t"
          style={{
            background: 'rgba(8,8,8,0.96)',
            borderColor: 'var(--border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={e => handleNav(e, l.href)}
              className="font-mono no-underline"
              style={{ fontSize: 12, letterSpacing: '0.2em', color: 'var(--ghost)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="Ifthekhar_Enad_Mahamood_Resume.pdf"
            className="font-mono no-underline"
            style={{ fontSize: 12, letterSpacing: '0.2em', color: 'var(--signal)' }}
          >
            RESUME ↓
          </a>
        </div>
      )}
    </header>
  );
}
