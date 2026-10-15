import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

/* ── Sparkline SVG ─────────────────────────────────────────── */
function Sparkline({ color = 'var(--signal)' }) {
  const pathRef = useRef(null);
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <svg width="100%" height="40" viewBox="0 0 200 40" fill="none">
      <path
        ref={pathRef}
        d="M0 35 L20 30 L40 28 L60 22 L80 18 L100 14 L120 10 L140 7 L160 5 L180 3 L200 1"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="300"
        strokeDashoffset="300"
      />
    </svg>
  );
}

/* ── Card 1: Time Warp Scan ────────────────────────────────── */
function TimeWarpCard() {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 5000000,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = (obj.val / 1000000).toFixed(1) + 'M';
        },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="project-card rounded-[2rem] border flex flex-col overflow-hidden"
      style={{ background: 'var(--carbon)', borderColor: 'var(--border)' }}
    >
      {/* Dashboard panel */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-barlow font-semibold text-sm tracking-wide" style={{ color: 'var(--ghost)' }}>
            Time Warp Scan
          </span>
          <span
            className="font-mono text-xs px-3 py-1 rounded-full font-bold tracking-widest"
            style={{ background: 'rgba(245,197,24,0.15)', color: 'var(--signal)' }}
          >
            ⬆ TRENDING
          </span>
        </div>

        {/* Big counter */}
        <div className="font-bebas mb-1" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--signal)' }}>
          <span ref={numRef}>5.0M</span>+
        </div>
        <div className="font-dm text-xs mb-4" style={{ color: 'var(--mist)' }}>Total Downloads</div>

        {/* Stats */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-dm text-xs" style={{ color: 'var(--mist)' }}>⭐ Rating</span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-24 rounded-full overflow-hidden" style={{ background: 'var(--steel)' }}>
                <div className="h-full rounded-full" style={{ width: '80%', background: 'var(--signal)' }} />
              </div>
              <span className="font-mono text-xs" style={{ color: 'var(--signal)' }}>4.0</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-dm text-xs" style={{ color: 'var(--mist)' }}>💬 Reviews</span>
            <span className="font-mono text-xs" style={{ color: 'var(--ghost)' }}>23,600+</span>
          </div>
        </div>

        {/* Viral channels */}
        <div className="flex gap-2 flex-wrap mb-4">
          {['TikTok', 'Instagram', 'YouTube Shorts'].map(tag => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-1 rounded-full border"
              style={{ borderColor: 'var(--border)', color: 'var(--mist)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Sparkline />
      </div>

      {/* Card footer */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-barlow font-bold text-xl" style={{ color: 'var(--ghost)' }}>
              Time Warp Scan
            </h3>
            <p className="font-dm text-sm mt-1" style={{ color: 'var(--mist)' }}>
              Viral Photography App · 5M+ Downloads · Kite Games Studio
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.kgs.timewarpscan&hl=en_US"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--mist)' }}
            className="mt-1 flex-shrink-0"
            aria-label="View on Play Store"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Consumer App', 'Viral Growth', 'Creator Economy'].map(t => (
            <span
              key={t}
              className="font-dm text-xs px-3 py-1 rounded-full border"
              style={{ background: 'var(--steel)', borderColor: 'var(--border)', color: 'var(--ghost)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Card 2: Beauty Editor ─────────────────────────────────── */
function BeautyEditorCard() {
  const barRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      barRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          width: el.dataset.target,
          duration: 1.2,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const bars = [
    { label: 'Retention', value: '+21%', pct: '65%' },
    { label: 'Engagement', value: '+24%', pct: '72%' },
    { label: 'Rating ★', value: '4.6', pct: '92%' },
  ];

  return (
    <div
      className="project-card rounded-[2rem] border flex flex-col overflow-hidden"
      style={{ background: 'var(--carbon)', borderColor: 'var(--border)' }}
    >
      <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-barlow font-semibold text-sm tracking-wide" style={{ color: 'var(--ghost)' }}>
            Beauty Editor
          </span>
          <div className="flex items-center gap-2">
            <span className="pulse-dot w-2 h-2 rounded-full" style={{ background: '#22c55e', display: 'inline-block' }} />
            <span className="font-mono text-xs" style={{ color: '#22c55e' }}>LIVE</span>
          </div>
        </div>

        {/* Bars */}
        <div className="flex flex-col gap-3 mb-4">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex justify-between mb-1">
                <span className="font-dm text-xs" style={{ color: 'var(--mist)' }}>{b.label}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--signal)' }}>{b.value}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--steel)' }}>
                <div
                  ref={el => (barRefs.current[i] = el)}
                  className="h-full rounded-full"
                  data-target={b.pct}
                  style={{ width: 0, background: 'var(--signal)' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="font-mono text-sm mb-3" style={{ color: 'var(--ghost)' }}>
          50,000+ Downloads
        </div>

        <Sparkline color="#22c55e" />
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-barlow font-bold text-xl" style={{ color: 'var(--ghost)' }}>
              Beauty Editor
            </h3>
            <p className="font-dm text-sm mt-1" style={{ color: 'var(--mist)' }}>
              Photo Editing App · iOS & Android · Kite Games Studio
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.app.beautyeditor"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--mist)' }}
            className="mt-1 flex-shrink-0"
            aria-label="View on Play Store"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['ASO Strategy', 'Agile', 'Jira'].map(t => (
            <span
              key={t}
              className="font-dm text-xs px-3 py-1 rounded-full border"
              style={{ background: 'var(--steel)', borderColor: 'var(--border)', color: 'var(--ghost)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Card 3: Shuttle Partner App ───────────────────────────── */
function ShuttleCard() {
  const linesRef = useRef(null);

  const termLines = [
    '> INITIALIZING DRIVER ONBOARDING...',
    '> ONBOARDING COST:   ▼ 40% REDUCED',
    '> ENGAGEMENT GROWTH: ▲ 3× BASELINE',
    '> PAYMENT SPEED:     ▼ 50% FASTER',
    '> STATUS: SHIPPED ✓',
  ];

  useEffect(() => {
    const container = linesRef.current;
    if (!container) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          typeLines(container, termLines);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  function typeLines(container, lines) {
    container.innerHTML = '';
    let lineIdx = 0;

    function nextLine() {
      if (lineIdx >= lines.length) return;
      const lineEl = document.createElement('div');
      lineEl.style.color = lineIdx === lines.length - 1 ? 'var(--signal)' : 'var(--ghost)';
      container.appendChild(lineEl);

      const text = lines[lineIdx];
      let charIdx = 0;
      const interval = setInterval(() => {
        lineEl.textContent = text.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx >= text.length) {
          clearInterval(interval);
          lineIdx++;
          setTimeout(nextLine, 120);
        }
      }, 25);
    }
    nextLine();
  }

  return (
    <div
      className="project-card rounded-[2rem] border flex flex-col overflow-hidden"
      style={{ background: 'var(--carbon)', borderColor: 'var(--border)' }}
    >
      <div className="p-6 border-b" style={{ borderColor: 'var(--border)', background: '#0a0a0a' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs" style={{ color: 'var(--mist)' }}>terminal v2.0</span>
          <div className="flex items-center gap-2">
            <span className="pulse-dot w-2 h-2 rounded-full" style={{ background: 'var(--signal)', display: 'inline-block' }} />
            <span className="font-mono text-xs" style={{ color: 'var(--signal)' }}>Live Feed</span>
          </div>
        </div>

        <div
          ref={linesRef}
          className="font-mono text-sm leading-relaxed min-h-[120px]"
          style={{ color: 'var(--ghost)' }}
        >
          <span className="blink" style={{ color: 'var(--signal)' }}>█</span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-barlow font-bold text-xl" style={{ color: 'var(--ghost)' }}>
              Shuttle Partner App
            </h3>
            <p className="font-dm text-sm mt-1" style={{ color: 'var(--mist)' }}>
              Ride-Sharing Driver Platform · Shuttle Technologies BD
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.easytransport.shuttle.driver&hl=en&gl=US"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--mist)' }}
            className="mt-1 flex-shrink-0"
            aria-label="View on Play Store"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Product Ownership', 'MVP Development'].map(t => (
            <span
              key={t}
              className="font-dm text-xs px-3 py-1 rounded-full border"
              style={{ background: 'var(--steel)', borderColor: 'var(--border)', color: 'var(--ghost)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Card 4: Smart Shelf ───────────────────────────────────── */
function SmartShelfCard() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let tl;
    const ctx = gsap.context(() => {
      const cursor = svg.querySelector('#shelf-cursor');
      const zones = [
        svg.querySelector('#zone1'),
        svg.querySelector('#zone2'),
        svg.querySelector('#zone3'),
      ];
      const deployBtn = svg.querySelector('#deploy-btn');

      tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      zones.forEach((z, i) => {
        const cx = 60 + i * 80;
        tl
          .to(cursor, { attr: { cx, cy: 60 }, duration: 0.5, ease: 'power2.inOut' })
          .to(z, { fill: 'rgba(245,197,24,0.3)', stroke: '#F5C518', duration: 0.3 })
          .to(z, { fill: 'rgba(245,197,24,0.1)', stroke: '#F5C518', duration: 0.4 }, '+=0.2');
      });

      tl
        .to(cursor, { attr: { cx: 200, cy: 130 }, duration: 0.6, ease: 'power2.inOut' })
        .to(deployBtn, { scaleY: 0.95, scaleX: 0.95, transformOrigin: 'center', duration: 0.15 })
        .to(deployBtn, { fill: '#F5C518', duration: 0.2 })
        .to(deployBtn, { scaleY: 1, scaleX: 1, duration: 0.15 })
        .to(deployBtn, { fill: 'rgba(245,197,24,0.15)', duration: 0.5 }, '+=0.5');
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="project-card rounded-[2rem] border flex flex-col overflow-hidden"
      style={{ background: 'var(--carbon)', borderColor: 'var(--border)' }}
    >
      <div className="p-6 border-b flex items-center justify-center" style={{ borderColor: 'var(--border)', minHeight: '200px' }}>
        <svg
          ref={svgRef}
          viewBox="0 0 260 180"
          width="100%"
          height="160"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shelf frame */}
          <rect x="20" y="30" width="220" height="100" rx="6" fill="none" stroke="rgba(245,197,24,0.3)" strokeWidth="1.5" />
          {/* Shelf dividers */}
          <line x1="20" y1="80" x2="240" y2="80" stroke="rgba(245,197,24,0.2)" strokeWidth="1" />

          {/* Sensor zones */}
          <rect id="zone1" x="30" y="38" width="60" height="35" rx="4" fill="rgba(245,197,24,0.05)" stroke="rgba(245,197,24,0.3)" strokeWidth="1" />
          <rect id="zone2" x="100" y="38" width="60" height="35" rx="4" fill="rgba(245,197,24,0.05)" stroke="rgba(245,197,24,0.3)" strokeWidth="1" />
          <rect id="zone3" x="170" y="38" width="60" height="35" rx="4" fill="rgba(245,197,24,0.05)" stroke="rgba(245,197,24,0.3)" strokeWidth="1" />

          {/* Zone labels */}
          <text x="60" y="60" textAnchor="middle" fontSize="9" fill="rgba(245,197,24,0.6)" fontFamily="JetBrains Mono">ZONE 1</text>
          <text x="130" y="60" textAnchor="middle" fontSize="9" fill="rgba(245,197,24,0.6)" fontFamily="JetBrains Mono">ZONE 2</text>
          <text x="200" y="60" textAnchor="middle" fontSize="9" fill="rgba(245,197,24,0.6)" fontFamily="JetBrains Mono">ZONE 3</text>

          {/* Items on shelf */}
          {[35, 50, 65, 105, 120, 135, 175, 190, 205].map((x, i) => (
            <rect key={i} x={x} y="88" width="10" height="20" rx="2" fill="rgba(245,197,24,0.15)" stroke="rgba(245,197,24,0.2)" strokeWidth="0.5" />
          ))}

          {/* Deploy button */}
          <rect id="deploy-btn" x="170" y="115" width="60" height="18" rx="4" fill="rgba(245,197,24,0.15)" stroke="#F5C518" strokeWidth="1" />
          <text x="200" y="127" textAnchor="middle" fontSize="8" fill="#F5C518" fontFamily="JetBrains Mono">✓ DEPLOY</text>

          {/* Animated cursor */}
          <circle id="shelf-cursor" cx="60" cy="60" r="5" fill="#F5C518" opacity="0.9" />
        </svg>
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-barlow font-bold text-xl" style={{ color: 'var(--ghost)' }}>
            Smart Shelf
          </h3>
          <p className="font-dm text-sm mt-1" style={{ color: 'var(--mist)' }}>
            AI Hardware + Software · Fashol Dotcom Limited
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['B2C Launch', 'Hardware-Software Integration'].map(t => (
            <span
              key={t}
              className="font-dm text-xs px-3 py-1 rounded-full border"
              style={{ background: 'var(--steel)', borderColor: 'var(--border)', color: 'var(--ghost)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Projects Section ─────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,translate,rotate,scale',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-24 px-6 md:px-16" style={{ background: 'var(--void)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          eyebrow="Case Studies"
          title="The work that"
          accent="shipped."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TimeWarpCard />
          <BeautyEditorCard />
        </div>

        {/* Kite Games Studio connector */}
        <div className="text-center my-4">
          <span className="font-mono text-xs" style={{ color: 'var(--mist)' }}>
            Kite Games Studio Portfolio → 20M+ Downloads Combined
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <ShuttleCard />
          <SmartShelfCard />
        </div>
      </div>
    </section>
  );
}
