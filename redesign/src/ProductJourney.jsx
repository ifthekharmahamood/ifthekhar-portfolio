import { useEffect, useRef, useState } from 'react';
import { Lightbulb, ListChecks, PanelsTopLeft, Code2, Rocket, ChartNoAxesCombined, ArrowRight, Check, Pause, Play, Repeat2 } from 'lucide-react';

const stages = [
  { name:'Ideation', icon:Lightbulb, question:'What problem is worth solving?', artifact:'The opportunity brief', title:'Start with the user.', description:'Understand the friction before falling in love with a solution.', items:['Listen to users', 'Frame the problem', 'Test the riskiest assumption'], output:'A validated problem', next:'Turn the opportunity into a plan' },
  { name:'Planning', icon:ListChecks, question:'What should we build first?', artifact:'The product roadmap', title:'Make the tradeoffs.', description:'Align the team around a clear outcome and a focused first release.', items:['Define success', 'Prioritize the smallest useful scope', 'Align people and dependencies'], output:'A shared direction', next:'Make the idea tangible' },
  { name:'Design', icon:PanelsTopLeft, question:'Does the solution work for people?', artifact:'The tested prototype', title:'Learn before building.', description:'Explore the experience, test it with users, and refine what matters.', items:['Map the core user journey', 'Prototype and test', 'Refine with design and engineering'], output:'A tested direction', next:'Build it together' },
  { name:'Development', icon:Code2, question:'Are we building the right thing well?', artifact:'The delivery board', title:'Bring the team together.', description:'Keep decisions clear and the feedback loop short as the product takes shape.', items:['Clarify stories and acceptance criteria', 'Unblock and review increments', 'Check quality and instrumentation'], output:'A release-ready product', next:'Get ready for real users' },
  { name:'Launch', icon:Rocket, question:'How do we release with confidence?', artifact:'The rollout checklist', title:'Ship with intention.', description:'Prepare the people, the product, and the signals for a measured rollout.', items:['Align support and communications', 'Roll out in stages', 'Monitor adoption and reliability'], output:'In the hands of users', next:'Find out what actually changed' },
  { name:'Follow-up', icon:ChartNoAxesCombined, question:'Did we solve the problem?', artifact:'The learning review', title:'Shipping is a beginning.', description:'Compare outcomes with the goal. Let real usage shape the next decision.', items:['Measure against success criteria', 'Listen to feedback', 'Feed the learning into the roadmap'], output:'Evidence for what comes next', next:'Back to discovery, with better questions' },
];

export default function ProductJourney() {
  const root = useRef(null);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = event => setReduced(event.matches);
    const onVisibility = () => setVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold:0.15 });
    observer.observe(root.current);
    media.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); media.removeEventListener('change', onMotion); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  const current = stages[stage];
  const Icon = current.icon;
  const running = !paused && inView && visible && !reduced;
  return <aside ref={root} className={`product-journey ${running ? 'is-running' : 'is-paused'}`} aria-label="How a product ships" data-stage={stage} data-running={running}>
    <div className="journey-heading"><p>From idea to impact</p>{!reduced && <button className="journey-play" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play product journey' : 'Pause product journey'}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? 'Play' : 'Pause'}</span></button>}</div>
    <div className="journey-body">
      <ol className="journey-stages" aria-label="Product lifecycle stages">{stages.map((item,index) => {
        const StageIcon = item.icon;
        return <li key={item.name} className={index < stage ? 'is-complete' : ''}><button type="button" aria-label={`Explore ${item.name}`} aria-pressed={stage===index} aria-controls="journey-detail" onClick={() => { setStage(index); setPaused(true); }}><span className="journey-stage-icon"><StageIcon size={20} strokeWidth={1.5} aria-hidden="true" /></span><span><small>0{index+1}</small>{item.name}</span></button></li>;
      })}</ol>
      <div id="journey-detail" className="journey-detail" aria-live={paused || reduced ? 'polite' : 'off'}>
        <div className="journey-scene" key={stage}>
          <div className="journey-scene-top"><Icon size={29} strokeWidth={1.4} aria-hidden="true" /><span>0{stage+1} / 06</span></div>
          <p className="journey-question">{current.question}</p>
          <h2>{current.title}</h2>
          <p className="journey-description">{current.description}</p>
          <div className="journey-artifact"><p>{current.artifact}</p><ul>{current.items.map((item,index) => <li key={item} style={{ '--item':index }}><Check size={14} aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
          <p className="journey-output"><ArrowRight size={15} aria-hidden="true" />{current.output}</p>
          <div className="journey-timer" aria-hidden="true"><span onAnimationEnd={event => { if (event.target===event.currentTarget && running) setStage(value => (value+1)%stages.length); }} /></div>
        </div>
      </div>
    </div>
    <div className="journey-loop"><Repeat2 size={19} strokeWidth={1.5} aria-hidden="true" /><p>{current.next}</p></div>
  </aside>;
}
