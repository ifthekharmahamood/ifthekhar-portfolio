import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const entries = [
  {
    date: 'APR 2024 – DEC 2024',
    company: 'Kite Games Studio',
    role: 'Product Manager',
    badge: 'Studio Portfolio: 20M+ Downloads',
    bullets: [
      'Managed two live apps — Time Warp Scan (5M+ downloads, 4.0 rating, 23,600+ reviews) and Beauty Editor (50K+ downloads, 4.6+ rating) — contributing to the studio\'s 20M+ download milestone.',
      'Led full-cycle revamp of Beauty Editor — 21% retention improvement, 24% engagement uplift, 23% download growth — via redefined onboarding and feature prioritization.',
      'Drove 10% customer acquisition growth across USA, UK, and Japan through data-driven ASO strategy and market research.',
      'Coordinated cross-functional delivery across 10+ engineers, QA, and marketing using Agile sprints in Jira.',
    ],
  },
  {
    date: 'OCT 2023 – FEB 2024',
    company: 'Fashol Dotcom Limited',
    role: 'Product Manager',
    badge: null,
    bullets: [
      'Directed development of Smart Shelf — an AI-driven automated vegetable shelf merging hardware and software for a seamless user experience.',
      'Led a 5-member cross-functional team through pilot phase and market launch strategy, resolving technical challenges during prototype refinement.',
      'Collaborated with Singapore-based investors to align technical and business objectives, emphasizing inventory systems and IT efficiency.',
    ],
  },
  {
    date: 'JUN 2021 – SEP 2023',
    company: 'Shuttle Technologies BD',
    role: 'Product Specialist',
    badge: null,
    bullets: [
      'Built Partner App MVP — reduced onboarding costs by 40%, achieved 3× engagement growth, and improved driver satisfaction scores.',
      'Shipped Driver\'s Earnings feature — 50% faster payment processing; implemented OnDemand ride requests, cutting backup failure rates by 5%.',
      'Designed Partner ERP system — 60% operational efficiency gain, 50% manual workload reduction, real-time vehicle request automation.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw vertical timeline line
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }

      // Stagger entries
      gsap.from('.timeline-entry', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
      id="experience"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 relative"
      style={{ background: 'var(--void)' }}
    >
      {/* Section border top */}
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="03" eyebrow="Timeline" title="The" accent="journey." />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (SVG for animation) */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block" style={{ marginLeft: '7px' }}>
            <svg width="2" height="100%" viewBox="0 0 2 800" preserveAspectRatio="none" style={{ height: '100%' }}>
              <line
                ref={lineRef}
                x1="1" y1="0" x2="1" y2="800"
                stroke="rgba(245,197,24,0.4)"
                strokeWidth="2"
                strokeDasharray="800"
                strokeDashoffset="800"
              />
            </svg>
          </div>

          {/* Entries */}
          <div className="flex flex-col gap-12 md:pl-12">
            {entries.map((entry, i) => (
              <div key={i} className="timeline-entry relative">
                {/* Timeline dot */}
                <div
                  className="absolute -left-12 top-2 hidden md:block w-[14px] h-[14px] rounded-full border-2"
                  style={{
                    background: 'var(--signal)',
                    borderColor: 'var(--void)',
                    boxShadow: '0 0 0 3px rgba(245,197,24,0.2)',
                    marginLeft: '-13px',
                  }}
                />

                {/* Date badge */}
                <div
                  className="font-mono text-xs mb-3 inline-block"
                  style={{ color: 'var(--signal)' }}
                >
                  {entry.date}
                </div>

                {/* Card */}
                <div
                  className="rounded-[1.5rem] border p-6"
                  style={{ background: 'var(--carbon)', borderColor: 'var(--border)' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3
                        className="font-barlow font-bold text-2xl"
                        style={{ color: 'var(--ghost)' }}
                      >
                        {entry.company}
                      </h3>
                      <p className="font-dm text-sm mt-1" style={{ color: 'var(--mist)' }}>
                        {entry.role}
                      </p>
                    </div>
                    {entry.badge && (
                      <span
                        className="font-mono text-xs px-3 py-1 rounded-full border"
                        style={{ borderColor: 'var(--border)', color: 'var(--signal)' }}
                      >
                        {entry.badge}
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-2">
                    {entry.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 font-dm text-sm leading-relaxed" style={{ color: 'var(--mist)' }}>
                        <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: 'var(--signal)' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
