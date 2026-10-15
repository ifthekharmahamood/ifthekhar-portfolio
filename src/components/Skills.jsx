import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    category: 'TOOLING',
    pills: ['Jira', 'Figma', 'Confluence', 'ClickUp', 'Postman', 'Power BI', 'Tableau', 'Canva'],
  },
  {
    category: 'METHODOLOGY',
    pills: ['Scrum', 'Kanban', 'Sprint Planning', 'PRD Writing', 'User Story Writing', 'A/B Testing', 'ASO', 'Go-to-Market'],
  },
  {
    category: 'TECHNICAL',
    pills: ['SQL', 'Python', 'Excel', 'SAP NetWeaver', 'Salesforce', 'Power BI', 'Data Analytics'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-pill', {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power3.out',
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
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 md:px-16"
      style={{ background: 'var(--void)' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="04" eyebrow="Toolkit" title="The" accent="arsenal." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {columns.map(col => (
            <div key={col.category}>
              <p
                className="font-barlow font-semibold uppercase tracking-[0.3em] text-xs mb-5"
                style={{ color: 'var(--signal)' }}
              >
                {col.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {col.pills.map(pill => (
                  <span
                    key={pill}
                    className="skill-pill font-dm text-sm px-4 py-2 rounded-full border"
                    style={{
                      background: 'var(--steel)',
                      borderColor: 'var(--border)',
                      color: 'var(--ghost)',
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
