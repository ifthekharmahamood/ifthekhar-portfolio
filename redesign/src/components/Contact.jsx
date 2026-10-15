import { Mail, ArrowUpRight } from 'lucide-react';
import { LinkedInIcon } from './BrandIcons';
import { profile } from '../data/content';
import { useReveal } from '../lib/useReveal';

export default function Contact() {
  const scope = useReveal('[data-contact]', { each: 0.08, y: 22 });

  return (
    <section
      id="contact"
      ref={scope}
      className="border-t-2"
      style={{ borderColor: 'var(--line-strong)', background: 'var(--fg)', color: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-shell px-5 py-24 md:px-8 md:py-32">
        <div className="flex items-baseline gap-4" data-contact>
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] opacity-60">05</span>
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] opacity-60">
            Contact
          </span>
        </div>

        <h2
          className="display mt-5 text-[clamp(2.5rem,10vw,7rem)]"
          data-contact
        >
          Let&rsquo;s build
          <br />
          something real.
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="ul-draw mt-10 inline-block font-display text-[clamp(1.125rem,3vw,1.75rem)] font-medium no-underline"
          style={{ color: 'var(--bg)' }}
          data-contact
        >
          {profile.email}
        </a>

        <div className="mt-10 flex flex-wrap gap-3" data-contact>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 border-2 px-7 font-mono text-[12px] uppercase tracking-[0.16em] no-underline transition-transform hover:-translate-y-0.5"
            style={{ borderColor: 'var(--bg)', background: 'var(--bg)', color: 'var(--fg)' }}
          >
            <Mail size={16} aria-hidden="true" />
            Send a message
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 border-2 px-7 font-mono text-[12px] uppercase tracking-[0.16em] no-underline transition-transform hover:-translate-y-0.5"
            style={{ borderColor: 'var(--bg)', color: 'var(--bg)' }}
          >
            <LinkedInIcon size={16} />
            LinkedIn
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <a
            href={profile.resume}
            download={profile.resumeFileName}
            className="inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 border-2 px-7 font-mono text-[12px] uppercase tracking-[0.16em] no-underline transition-transform hover:-translate-y-0.5"
            style={{ borderColor: 'var(--bg)', color: 'var(--bg)' }}
          >
            Résumé
          </a>
        </div>
      </div>
    </section>
  );
}
