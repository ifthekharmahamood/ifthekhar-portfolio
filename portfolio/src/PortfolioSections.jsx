import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, Database, TrendingUp, Layers, Wallet, GraduationCap, Award, Trophy } from 'lucide-react';
import { additionalProjects, education, certifications, awards, hobbies, career } from './data/portfolio';

const projectIcons={systems:Database,growth:TrendingUp,concept:Layers,finance:Wallet};
// Keyed by hobby name rather than array position, so reordering `hobbies`
// cannot silently pair a hobby with the wrong icon.
const hobbyIcons={Books:'books',Photography:'photography',Travelling:'travelling',Soccer:'soccer',Camping:'camping',Cycling:'cycling'};

export function MoreProjects({ onSelect }) {
  return <section className="more-projects" id="more-projects" aria-labelledby="more-projects-title"><div className="container"><div className="section-heading" data-reveal><h2 id="more-projects-title">More Projects</h2></div><div className="project-grid">{additionalProjects.map((project,index)=>{
    const Icon=projectIcons[project.icon];
    return <article className="project-card" key={project.id} data-reveal><div className="project-card-top"><Icon size={28} strokeWidth={1.4} aria-hidden="true"/><span className="project-status">{project.status}</span></div><p className="eyebrow">0{index+4} / {project.category}</p><h3>{project.title}</h3><p className="project-description">{project.summary}</p><p className="project-result">{project.result}</p><button className="text-link" onClick={()=>onSelect(project)}>Read the project story <ArrowUpRight size={18} aria-hidden="true"/></button></article>;
  })}</div></div></section>;
}

// Vertical timeline with a scroll-tracking rail: a hairline spine, numbered markers
// that fill as each role reaches reading height, and a progress line that follows.
export function ExperienceSection(){
  const section=useRef(null);
  const items=useRef([]);
  const [active,setActive]=useState(0);
  const [fill,setFill]=useState(0);

  useEffect(()=>{
    let frame=0;
    const update=()=>{
      frame=0;
      const nodes=items.current.filter(Boolean);
      if(!nodes.length) return;
      // Reading line sits ~42% down the viewport.
      const line=window.innerHeight*0.42;
      let current=0;
      nodes.forEach((node,index)=>{ if(node.getBoundingClientRect().top<=line) current=index; });
      setActive(current);
      const first=nodes[0].getBoundingClientRect();
      const last=nodes[nodes.length-1].getBoundingClientRect();
      const span=(last.top+last.height*0.5)-(first.top+first.height*0.5);
      const travelled=line-(first.top+first.height*0.5);
      setFill(span>0 ? Math.max(0,Math.min(1,travelled/span)) : 0);
    };
    const onScroll=()=>{ if(!frame) frame=requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',onScroll,{ passive:true });
    window.addEventListener('resize',onScroll);
    return ()=>{ cancelAnimationFrame(frame); window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); };
  },[]);

  return <section id="experience" className="experience-section" aria-labelledby="experience-title" ref={section}>
    <div className="container">
      <div className="section-heading" data-reveal><h2 id="experience-title">Experience</h2></div>
      <ol className="timeline" style={{ '--fill':fill }}>
        <div className="timeline-spine" aria-hidden="true"><span className="timeline-progress" /></div>
        {career.map((item,index)=>
          <li key={`${item.company}-${item.period}`} className={`timeline-item ${index<=active ? 'is-active' : ''}`} ref={node=>{ items.current[index]=node; }} data-reveal>
            <span className="timeline-marker" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
            <div className="timeline-body">
              <div className="timeline-meta">
                <p className="timeline-period">{item.period}</p>
                {item.status && <span className="timeline-status">{item.status}</span>}
              </div>
              <h3>{item.role}</h3>
              <p className="timeline-company">{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.company}<ArrowUpRight size={14} aria-hidden="true" /></a> : item.company}{item.location && <span> · {item.location}</span>}</p>
              {item.promotedFrom && <p className="timeline-promotion"><ArrowUp size={14} aria-hidden="true" />{item.promotedFrom}</p>}
              {item.blurb && <p className="timeline-text">{item.blurb}</p>}
              {item.points?.length > 0 && <ul className="timeline-points">{item.points.map(point => <li key={point}>{point}</li>)}</ul>}
              {item.projects?.length > 0 && <div className="timeline-projects"><p className="timeline-projects-label">Projects</p><ul>{item.projects.map(name => <li key={name}>{name}</li>)}</ul></div>}
            </div>
          </li>
        )}
      </ol>
    </div>
  </section>;
}

export function EducationSection(){
  return <section id="education" className="education-section" aria-labelledby="education-title"><div className="container"><div className="section-heading" data-reveal><h2 id="education-title">Education</h2></div><div className="education-grid">{education.map(school=><article key={school.school} className="education-card" data-reveal><GraduationCap size={32} strokeWidth={1.3} aria-hidden="true"/><p className="eyebrow">{school.current?'Current chapter':'Foundation'}</p><h3>{school.degree}</h3><p className="school-name">{school.url ? <a href={school.url} target="_blank" rel="noreferrer">{school.school}<ArrowUpRight size={14} aria-hidden="true" /></a> : school.school}</p><p>{school.location}</p><p>{school.period}</p><p className="degree-gpa">CGPA {school.gpa}</p></article>)}</div></div></section>;
}

export function CertificationsSection(){
  return <section id="certifications" className="certifications-section" aria-labelledby="certifications-title"><div className="container"><div className="section-heading" data-reveal><h2 id="certifications-title">Certifications</h2></div><div className="certification-list">{certifications.map(item=><article key={item.title} data-reveal><Award size={31} strokeWidth={1.3} aria-hidden="true"/><div><h3>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.title}<ArrowUpRight size={15} aria-hidden="true" /></a> : item.title}</h3><p>{item.issuer} · {item.date}</p>{item.skills?.length > 0 && <div className="cert-skills"><p className="cert-skills-label">Skills</p><ul>{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>}</div></article>)}</div></div></section>;
}

export function AwardsSection(){
  return <section id="awards" className="awards-section" aria-labelledby="awards-title"><div className="container"><div className="section-heading" data-reveal><h2 id="awards-title">Awards &amp; Scholarships</h2></div><div className="award-grid">{awards.map(item=><article key={item.title} data-reveal><Trophy size={29} strokeWidth={1.3} aria-hidden="true"/><h3>{item.title}</h3><p>{item.context}</p></article>)}</div></div></section>;
}

export function HobbiesSection(){
  return <section id="hobbies" className="hobbies-section" aria-labelledby="hobbies-title"><div className="container"><div className="section-heading" data-reveal><h2 id="hobbies-title">Hobbies</h2></div><div className="hobby-grid">{hobbies.map(hobby=><div className="hobby-item" key={hobby} data-reveal><img className="hobby-icon" src={`/images/hobbies/${hobbyIcons[hobby]}.svg`} alt="" width="48" height="48" decoding="async" /><h3>{hobby}</h3></div>)}</div></div></section>;
}
