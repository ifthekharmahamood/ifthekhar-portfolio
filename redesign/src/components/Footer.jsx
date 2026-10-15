import { ArrowUp } from 'lucide-react';
import { nav, profile } from '../data/content';

/* The anchor owns a 44px row; the inner span hugs the text so the
   hover underline stays on the baseline instead of drifting to the
   bottom of the padding box. Rows sit flush, so targets never overlap. */
function FooterLink({ href, children, ...rest }) {
  return (
    <a
      href={href}
      className="flex min-h-[44px] w-fit cursor-pointer items-center text-[14px] no-underline"
      style={{ color: 'var(--fg)' }}
      {...rest}
    >
      <span className="ul-draw">{children}</span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="border-t-2"
      style={{ borderColor: 'var(--line-strong)', background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-shell px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display m-0 text-2xl">{profile.name}</p>
            <p className="label mt-2">{profile.role}</p>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed" style={{ color: 'var(--muted-fg)' }}>
              Building products that move people — from 5M+ app downloads to 40% faster onboarding.
            </p>
          </div>

          <nav className="md:col-span-4" aria-label="Footer">
            <p className="label m-0">Index</p>
            <ul className="mt-3 flex list-none flex-col p-0">
              {nav.map(l => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label m-0">Elsewhere</p>
            <ul className="mt-3 flex list-none flex-col p-0">
              <li>
                <FooterLink href={`mailto:${profile.email}`}>Email</FooterLink>
              </li>
              <li>
                <FooterLink href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </FooterLink>
              </li>
              <li>
                <FooterLink href={profile.resume} download={profile.resumeFileName}>
                  Résumé (PDF)
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
          style={{ borderColor: 'var(--line)' }}
        >
          <p className="label m-0">© 2026 {profile.name}</p>
          <a
            href="#top"
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] no-underline"
            style={{ color: 'var(--fg)' }}
          >
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
