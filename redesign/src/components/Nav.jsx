import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { nav, profile } from '../data/content';

function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage can be unavailable (private mode); the theme still applies */
    }
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={`grid h-11 w-11 cursor-pointer place-items-center border-2 bg-transparent transition-colors ${className}`}
      style={{ borderColor: 'var(--line-strong)', color: 'var(--fg)' }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border-2 focus:px-4 focus:py-3"
        style={{ background: 'var(--card)', borderColor: 'var(--line-strong)', color: 'var(--fg)' }}
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-50 border-b-2"
        style={{ background: 'var(--bg)', borderColor: 'var(--line-strong)' }}
      >
        <nav
          className="mx-auto flex max-w-shell items-center justify-between gap-4 px-5 py-3 md:px-8"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="font-mono text-[13px] font-medium tracking-tight no-underline"
            style={{ color: 'var(--fg)' }}
          >
            <span
              className="mr-2 inline-grid h-7 w-7 place-items-center align-middle font-display text-[15px] font-bold"
              style={{ background: 'var(--fg)', color: 'var(--bg)' }}
              aria-hidden="true"
            >
              I
            </span>
            {profile.handle}
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {nav.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="ul-draw hit-44 font-mono text-[12px] uppercase tracking-[0.18em] no-underline"
                style={{ color: 'var(--fg)' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download={profile.resumeFileName}
              className="hidden h-11 cursor-pointer items-center gap-2 border-2 px-4 font-mono text-[12px] uppercase tracking-[0.14em] no-underline transition-colors sm:inline-flex"
              style={{
                borderColor: 'var(--line-strong)',
                background: 'var(--fg)',
                color: 'var(--bg)',
              }}
            >
              Résumé
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <ThemeToggle />

            <button
              type="button"
              className="grid h-11 w-11 cursor-pointer place-items-center border-2 bg-transparent lg:hidden"
              style={{ borderColor: 'var(--line-strong)', color: 'var(--fg)' }}
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[68px] z-40 flex flex-col gap-1 border-t-2 p-5 lg:hidden"
          style={{ background: 'var(--bg)', borderColor: 'var(--line-strong)' }}
        >
          {nav.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display border-b py-5 text-4xl no-underline"
              style={{ color: 'var(--fg)', borderColor: 'var(--line)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resume}
            download={profile.resumeFileName}
            onClick={() => setOpen(false)}
            className="display py-5 text-4xl no-underline"
            style={{ color: 'var(--accent)' }}
          >
            Résumé ↓
          </a>
        </div>
      )}
    </>
  );
}
