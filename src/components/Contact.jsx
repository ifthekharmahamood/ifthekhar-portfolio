import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';

function LinkedinIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-item', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex items-center justify-center px-6 py-24 overflow-hidden"
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse 60% 50% at 80% 10%, rgba(245,197,24,0.12) 0%, transparent 70%), var(--void)',
      }}
    >
      <div className="border-t w-full max-w-6xl absolute top-0" style={{ borderColor: 'var(--border)' }} />

      <div className="max-w-4xl text-center relative z-10">
        <h2
          className="contact-item font-bebas leading-none"
          style={{ fontSize: 'clamp(64px, 11vw, 144px)', color: 'var(--ghost)' }}
        >
          LET'S BUILD
        </h2>
        <h2
          className="contact-item font-instrument italic leading-none"
          style={{ fontSize: 'clamp(56px, 9.6vw, 126px)', color: 'var(--signal)', marginTop: '0.02em' }}
        >
          something real.
        </h2>

        {/* Email */}
        <div className="contact-item mt-10 mb-8">
          <a
            href="mailto:enadmahamood123@gmail.com"
            className="font-barlow font-semibold text-xl relative group no-underline inline-block"
            style={{ color: 'var(--ghost)' }}
          >
            <span className="relative">
              enadmahamood123@gmail.com
              <span
                className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'var(--signal)' }}
              />
            </span>
          </a>
        </div>

        {/* Buttons */}
        <div className="contact-item flex flex-wrap gap-4 justify-center mb-10">
          <a
            href="mailto:enadmahamood123@gmail.com"
            className="btn-sweep flex items-center gap-2 px-8 py-3 rounded-full font-barlow font-semibold text-base tracking-wider no-underline"
            style={{ background: 'var(--signal)', color: 'var(--void)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--void)')}
          >
            <span className="sweep-inner rounded-full" style={{ background: 'var(--signal-muted)' }} />
            <Mail size={16} className="relative z-10" />
            <span className="relative z-10">Send a Message</span>
          </a>

          <a
            href="https://linkedin.com/in/ifthekharenadmahamood"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep flex items-center gap-2 px-8 py-3 rounded-full font-barlow font-semibold text-base tracking-wider border no-underline"
            style={{ borderColor: 'var(--ghost)', color: 'var(--ghost)', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--void)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ghost)')}
          >
            <span className="sweep-inner rounded-full" style={{ background: 'var(--ghost)' }} />
            <LinkedinIcon size={16} />
            <span className="relative z-10">Connect on LinkedIn</span>
          </a>
        </div>

        {/* Social icons */}
        <div className="contact-item flex justify-center gap-6">
          <a
            href="https://linkedin.com/in/ifthekharenadmahamood"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: 'var(--mist)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--signal)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--mist)')}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
