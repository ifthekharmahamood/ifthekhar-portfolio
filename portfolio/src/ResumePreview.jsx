import { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import { person } from './data/portfolio';
import resume from './data/resume.json';

export default function ResumePreview({ open, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node=dialog.current;
    if(open){node.showModal();document.body.classList.add('dialog-open');}
    else if(node.open) node.close();
    return()=>{document.body.classList.remove('dialog-open');if(node.open)node.close();};
  },[open]);
  return <dialog ref={dialog} className="resume-dialog" aria-labelledby="resume-dialog-title" onCancel={onClose} onClose={onClose} onClick={event=>{if(event.target===dialog.current)onClose();}}>
    {open && <><div className="resume-toolbar"><div><p className="eyebrow">Resume</p><h2 id="resume-dialog-title">{person.name}</h2></div><div className="resume-toolbar-actions"><a className="resume-download" aria-label="Download master resume (Word)" title="Download master resume (Word)" href={person.resume} download><Download size={17} aria-hidden="true" /><span>Download Word</span></a><button className="icon-button" onClick={onClose} aria-label="Close resume"><X size={23}/></button></div></div>
      <article className="resume-sheet" aria-label="Master resume"><h3>{resume.name}</h3><p className="resume-profession">{resume.role}</p><p className="resume-contact">{resume.contact}</p>
        {resume.blocks.map((block,index)=>{
          if(block.type==='heading')return <h4 key={index}>{block.text}</h4>;
          if(block.type==='list')return <ul key={index}>{block.items.map((text,i)=><li key={i}>{text}</li>)}</ul>;
          if(block.type==='split')return <div className="resume-split" key={index}><strong>{block.parts[0]}</strong><span>{block.parts.slice(1).join(' · ')}</span></div>;
          return <p key={index}>{block.text}</p>;
        })}
      </article></>}
  </dialog>;
}
