import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, ArrowUp, Menu, X, Mail, MapPin, User } from 'lucide-react';
import { person, outcomes, stories, career } from './data/portfolio';
import ResumePreview from './ResumePreview';
import ProductJourney, { stages as journeyStages } from './ProductJourney';
import { MoreProjects, ExperienceSection, EducationSection, CertificationsSection, AwardsSection, HobbiesSection } from './PortfolioSections';

gsap.registerPlugin(ScrollTrigger);
const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navigation = [ ['Projects', '#projects'], ['How I Work', '#how-i-work'], ['Experience', '#experience'], ['Education', '#education'], ['Certifications', '#certifications'], ['Awards', '#awards'], ['Hobbies', '#hobbies'], ['Contact', '#contact'] ];

// Serves the WebP produced by scripts/optimize-images.mjs, falling back to the
// original file wherever WebP is unsupported. Same pixels, far fewer bytes.
function Picture({ src, className, ...rest }) {
  const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
  return <picture className={className}>
    {webp !== src && <source srcSet={webp} type="image/webp" />}
    <img src={src} {...rest} />
  </picture>;
}

// A bare mailto: silently does nothing when the visitor has no desktop mail
// client registered (common on Windows with webmail). Try the mail client,
// then fall back to Gmail's compose window in a new tab.
function MailLink({ className, children, subject = '', ...rest }) {
  const mailto = `mailto:${person.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  const onClick = event => {
    event.preventDefault();
    const started = Date.now();
    const away = () => document.hidden;
    window.location.href = mailto;
    // If nothing took over the page within a moment, no handler exists.
    window.setTimeout(() => {
      if (!away() && Date.now() - started < 2500) {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(person.email)}` +
          (subject ? `&su=${encodeURIComponent(subject)}` : ''),
          '_blank', 'noopener,noreferrer'
        );
      }
    }, 600);
  };
  return <a className={className} href={mailto} onClick={onClick} {...rest}>{children}</a>;
}

// A one-line preview of the lifecycle in the hero. The full interactive
// section sits further down; this makes the process visible immediately,
// which is what a recruiter screening for PM roles looks for first.
function JourneyTeaser() {
  return (
    <a className="hero-journey" href="#how-i-work" data-intro>
      <span className="hero-journey-label">How I work</span>
      <span className="hero-journey-stages">
        {journeyStages.map((stage, index) => (
          <span key={stage.name}>
            {index > 0 && <i aria-hidden="true">/</i>}
            {stage.name}
          </span>
        ))}
      </span>
      <ArrowDown size={15} aria-hidden="true" />
    </a>
  );
}

function Counter({ metric }) {
  return <div className="outcome" data-reveal><p className="outcome-number" aria-label={metric.spoken}><span aria-hidden="true">{metric.prefix}<span data-counter data-target={metric.value} data-decimals={metric.decimals || 0}>{metric.value}</span>{metric.suffix}</span></p><p className="outcome-label">{metric.label}{metric.metric && <span>{metric.metric}</span>}</p></div>;
}

function usePortfolioMotion(scope) {
  useEffect(() => {
    const media = gsap.matchMedia();
    const counterTweens = [];
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('[data-intro]', { opacity:0, y:24, duration:0.8, stagger:0.1, ease:'power3.out', clearProps:'opacity,transform' });
        gsap.utils.toArray('[data-reveal]').forEach(node => gsap.from(node, { opacity:0, y:30, duration:0.85, ease:'power3.out', clearProps:'opacity,transform', scrollTrigger:{ trigger:node, start:'top 90%', once:true } }));
        gsap.utils.toArray('[data-counter]').forEach(node => {
          const target = Number(node.dataset.target), decimals = Number(node.dataset.decimals);
          const count = { value:0 };
          ScrollTrigger.create({ trigger:node, start:'top 94%', once:true, onEnter:() => {
            node.textContent = '0';
            counterTweens.push(gsap.to(count, { value:target, duration:1.6, ease:'power2.out', onUpdate:() => { node.textContent = count.value.toFixed(decimals).replace(/\.0$/, ''); }, onComplete:() => { node.textContent = String(target); } }));
          } });
        });
        gsap.utils.toArray('[data-parallax]').forEach(node => gsap.fromTo(node, { y:-16 }, { y:16, ease:'none', scrollTrigger:{ trigger:node.parentElement, start:'top bottom', end:'bottom top', scrub:0.8 } }));
      }, scope);
      return () => {
        counterTweens.forEach(tween => tween.kill()); counterTweens.length = 0;
        ctx.revert();
        scope.current?.querySelectorAll('[data-counter]').forEach(node => { node.textContent = node.dataset.target; });
      };
    });
    const refresh = () => ScrollTrigger.refresh();
    const images = [...scope.current.querySelectorAll('img')];
    images.forEach(img => img.addEventListener('load', refresh));
    document.fonts?.ready.then(refresh);
    return () => { images.forEach(img => img.removeEventListener('load', refresh)); media.revert(); };
  }, [scope]);
}

function CaseStudy({ selected, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    if (selected) { node.showModal(); document.body.classList.add('dialog-open'); }
    else if (node.open) node.close();
    return () => { document.body.classList.remove('dialog-open'); if (node.open) node.close(); };
  }, [selected]);
  return <dialog ref={dialog} className="case-dialog" aria-labelledby="case-title" onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === dialog.current) onClose(); }}>
    {selected && <div className="case-content"><div className="case-top"><span className="eyebrow">{selected.company} / {selected.category}</span><button className="icon-button" aria-label="Close case study" onClick={onClose}><X size={23} /></button></div><h2 id="case-title">{selected.title}</h2><p className="case-lead">{selected.context}</p><p className="case-result">{selected.result}</p>{selected.sections.map(([title,text]) => <section key={title}><h3>{title}</h3><p>{text}</p></section>)}{selected.link && <a className="text-link" href={selected.link} target="_blank" rel="noreferrer">{selected.linkLabel || 'View the current app listing'} <ArrowUpRight size={18} aria-hidden="true" /></a>}</div>}
  </dialog>;
}

export default function Portfolio() {
  const scope = useRef(null), progress = useRef(null);
  const [menuOpen,setMenuOpen] = useState(false), [active,setActive] = useState(''), [selected,setSelected] = useState(null), [resumeOpen,setResumeOpen] = useState(false), [showTop,setShowTop] = useState(false), [atBottom,setAtBottom] = useState(false);
  usePortfolioMotion(scope);
  useEffect(() => {
    let frame = 0;
    const sections=navigation.map(([,hash])=>({hash,node:document.querySelector(hash)}));
    const update = () => {
      frame=0;
      const max=document.documentElement.scrollHeight-window.innerHeight;
      const current=sections.reduce((result,section)=>section.node && section.node.getBoundingClientRect().top<=window.innerHeight*0.32 ? section.hash : result,'');
      progress.current.style.transform=`scaleX(${max>0 ? window.scrollY/max : 0})`;
      setActive(current);
      setShowTop(window.scrollY > window.innerHeight * 0.9);
      setAtBottom(max > 0 && window.scrollY >= max - 4);
    };
    const onScroll = () => { if (!frame) frame=requestAnimationFrame(update); };
    update(); window.addEventListener('scroll',onScroll,{ passive:true }); window.addEventListener('resize',onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll',onScroll); window.removeEventListener('resize',onScroll); };
  }, []);
  useEffect(() => { const close=event => { if(event.key==='Escape') setMenuOpen(false); }; window.addEventListener('keydown',close); return () => window.removeEventListener('keydown',close); }, []);

  return <div className="portfolio" ref={scope}>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="scroll-progress" ref={progress} aria-hidden="true" /><nav className="container nav" aria-label="Primary"><a className="wordmark" href="#top">{person.name}</a><div className="desktop-links">{navigation.map(([label,href]) => <a key={href} href={href} aria-current={active===href ? 'location' : undefined}>{label}</a>)}</div><button type="button" className="resume-link" onClick={() => setResumeOpen(true)}>Resume <ArrowUpRight size={16} aria-hidden="true" /></button><button className="menu-button icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></nav>{menuOpen && <nav id="mobile-navigation" className="mobile-links" aria-label="Mobile">{navigation.map(([label,href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}</header>
    
    <main id="main">
      <section id="top" className="hero"><div className="container hero-content"><p className="eyebrow" data-intro>Product Manager</p><h1 data-intro>Ifthekhar Enad<br />Mahamood</h1><p className="hero-lead" data-intro>I build useful products across consumer apps, mobility marketplaces, and enterprise systems.</p><p className="hero-description" data-intro>Four years in product. Now completing an MS in Management Information Systems at Lamar University.</p><div className="hero-actions" data-intro><a className="button" href="#projects">Explore my work <ArrowUpRight size={19} aria-hidden="true" /></a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="hero-status" data-intro><p className="availability"><span className="availability-dot" aria-hidden="true" />Seeking Product Manager &amp; APM roles <span>·</span> From Dec 2026</p><p className="location"><MapPin size={17} aria-hidden="true" /> Beaumont, Texas <span>·</span> Open to relocation</p></div><JourneyTeaser /></div><div className="hero-portrait" data-intro><div className="portrait-frame"><Picture src="/images/headshot.png" alt="Ifthekhar Enad Mahamood" width="900" height="1100" decoding="async" onLoad={event=>{event.currentTarget.closest('.portrait-frame').classList.add('has-photo');}} onError={event=>{event.currentTarget.closest('.portrait-frame').classList.remove('has-photo');}} /><div className="portrait-placeholder" aria-hidden="true"><User size={44} strokeWidth={1.2} /><p>Add your photo</p><code>public/images/headshot.png</code></div></div></div><a className="scroll-cue" href="#impact"><ArrowDown size={25} aria-hidden="true" /><span>Scroll to explore</span></a></section>
      <section id="impact" className="impact" aria-labelledby="impact-title"><div className="container"><div className="section-heading" data-reveal><h2 id="impact-title">Impact</h2></div><div className="outcomes">{outcomes.map(metric => <Counter key={metric.label} metric={metric} />)}</div></div></section>
      <section id="projects" className="work" aria-labelledby="work-title"><div className="container"><div className="section-heading" data-reveal><h2 id="work-title">Selected Work</h2></div>{stories.map((story,index) => <article className={`work-story ${index%2 ? 'reverse' : ''}`} key={story.id}><div className="work-image" data-reveal><Picture data-parallax src={story.image} alt={story.imageAlt || ''} width="1448" height="1086" loading="lazy" decoding="async" /></div><div className="work-copy" data-reveal><p className="eyebrow">0{index+1} / {story.category}</p><h3>{story.title}</h3><p className="work-subtitle">{story.heading}</p><p className="work-summary">{story.summary}</p><p className="story-result">{story.result}</p><p className="work-focus">{story.focus}</p><button className="text-link" onClick={() => setSelected(story)}>Explore the case study <ArrowUpRight size={19} aria-hidden="true" /></button></div></article>)}</div></section>
      <section id="how-i-work" className="process" aria-labelledby="how-i-work-title"><div className="container"><div className="section-heading" data-reveal><h2 id="how-i-work-title">How I Work</h2></div><ProductJourney /></div></section>
      <MoreProjects onSelect={setSelected} />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <AwardsSection />
      <HobbiesSection />
      <section id="contact" className="contact" aria-labelledby="contact-title"><div className="container"><h2 id="contact-title" data-reveal>Contact</h2><p className="contact-lead" data-reveal>I’m exploring product management opportunities and would love to hear about the problems your team is working on.</p><div className="contact-actions" data-reveal><MailLink className="button" subject="Hello from your portfolio"><Mail size={19} aria-hidden="true" /> Say hello</MailLink><a className="text-link" href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={19} aria-hidden="true" /></a><button className="text-link" onClick={() => setResumeOpen(true)}>View resume <ArrowUpRight size={19} aria-hidden="true" /></button></div><MailLink className="email-link" data-reveal>{person.email}</MailLink></div></section>
    </main>
    <footer className="footer"><div className="container"><p>{person.name} <span>· Product Manager</span></p></div></footer>
    <button type="button" className={`to-top ${showTop ? 'is-visible' : ''} ${atBottom ? 'is-labelled' : ''}`} onClick={()=>window.scrollTo({ top:0, behavior:prefersReduced() ? 'auto' : 'smooth' })} aria-label="Back to top"><ArrowUp size={21} aria-hidden="true" /><span className="to-top-label">Back to top</span></button>
    <CaseStudy selected={selected} onClose={() => setSelected(null)} />
    <ResumePreview open={resumeOpen} onClose={() => setResumeOpen(false)} />
  </div>;
}
