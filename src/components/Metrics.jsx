import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 5, suffix: 'M+', label: 'Downloads — Time Warp Scan' },
  { value: 20, suffix: 'M+', label: 'Studio Portfolio Downloads' },
  { value: 50, suffix: 'K+', label: 'Downloads — Beauty Editor' },
  { value: 40, suffix: '%', label: 'Onboarding Cost Reduction' },
  { value: 3, suffix: '×', label: 'Driver Engagement Growth' },
  { value: 21, suffix: '%', label: 'User Retention Improvement' },
  { value: 60, suffix: '%', label: 'Operational Efficiency Gain' },
  { value: 4.0, suffix: '', label: 'GPA · Lamar University', decimals: 1 },
];

function MetricTile({ metric, index }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: metric.value,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = metric.decimals
            ? obj.val.toFixed(metric.decimals)
            : Math.floor(obj.val);
        },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    return () => ctx.revert();
  }, [metric.value, metric.decimals]);

  return (
    <div className="metric-tile">
      <span className="metric-index font-mono">{String(index + 1).padStart(2, '0')}</span>

      <div
        className="font-bebas leading-none"
        style={{ fontSize: 'clamp(40px, 5vw, 66px)', color: 'var(--signal)' }}
      >
        <span ref={numRef}>
          {metric.decimals ? metric.value.toFixed(metric.decimals) : metric.value}
        </span>
        <span>{metric.suffix}</span>
      </div>

      <div
        className="font-dm mt-2"
        style={{ fontSize: '13px', color: 'var(--mist)', lineHeight: 1.45 }}
      >
        {metric.label}
      </div>
    </div>
  );
}

export default function Metrics() {
  return (
    <section id="impact" className="py-24 px-6 md:px-16" style={{ background: 'var(--carbon)' }}>
      <style>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }
        @media (min-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .metric-tile {
          position: relative;
          padding: 34px 24px 30px;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transition: background 0.3s ease;
        }
        .metric-tile::before {
          content: '';
          position: absolute;
          left: 0; top: -1px; height: 2px; width: 0;
          background: var(--signal);
          transition: width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .metric-tile:hover { background: rgba(245,197,24,0.035); }
        .metric-tile:hover::before { width: 100%; }
        .metric-index {
          position: absolute;
          top: 14px;
          right: 16px;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(154,154,154,0.35);
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <SectionHeader index="01" eyebrow="Impact" title="By the" accent="numbers." />

        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <MetricTile key={i} metric={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
