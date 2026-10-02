import React from 'react';
import { ArrowUpRight, ArrowRight, MapPin, Code2, GraduationCap, Workflow } from 'lucide-react';
import type { NotepadTab } from '../NotepadTabs';
export const AboutSection: React.FC<{onNavigate: (tab: NotepadTab) => void}> = ({onNavigate}) => (
  <section className="about-page">
    <div className="intro-grid">
      <div className="intro-copy">
        <div className="eyebrow"><span className="status-dot"/> Entrepreneur · Builder · Educator</div>
        <h1>Curiosity is where<br/>it <em>all begins.</em></h1>
        <p className="intro-name">Hey, I’m Amnas <span className="hand-wave">↗</span></p>
        <p className="intro-description">I turn everyday problems into useful products, build systems that make life simpler, and help people find their footing with AI.</p>
        <div className="intro-actions"><button className="primary-action" onClick={() => onNavigate('projects')}>Explore my work <ArrowUpRight size={17}/></button><button className="text-action" onClick={() => onNavigate('contact')}>Leave a note <ArrowRight size={16}/></button></div>
        <div className="location-note"><MapPin size={13}/> Based in Kerala, India <span>·</span> Building for everywhere</div>
      </div>
      <figure className="portrait-note"><div className="photo-tape"/><img src="/media/amnas_me.webp" alt="Amnas Ahamed" width="320" height="380"/><figcaption>Builder by instinct.<br/><span>Learner, always.</span></figcaption><span className="portrait-number">01 / ME, IN MY ELEMENT</span></figure>
    </div>
    <section className="currently-note"><span className="currently-label"><span className="status-dot"/> ON MY DESK RIGHT NOW</span><div><h2>Making AI a little more human.</h2><p>Teaching practical GenAI at IIT Madras Pravartak, shipping small products, and following the next interesting problem.</p></div><GraduationCap size={30} strokeWidth={1.2}/></section>
    <div className="section-label"><span>A FEW THINGS I CARE ABOUT</span><span>01 — 03</span></div>
    <div className="interests-grid">
      {[{icon: Code2,title:'Products with purpose',body:'Small, thoughtful tools that solve a real frustration. Built to be used, not just launched.'},{icon:Workflow,title:'Systems that make sense',body:'Turning messy workflows into clear, reliable operations with automation and a little patience.'},{icon:GraduationCap,title:'Learning by doing',body:'Helping curious people move from “what is AI?” to “look what I made.”'}].map(({icon: Icon,title,body}, i) => <article key={title}><span className="interest-number">0{i+1}</span><Icon size={21} strokeWidth={1.4}/><h3>{title}</h3><p>{body}</p></article>)}
    </div>
    <figure className="kerala-note"><img src="/media/kerala-backwaters.webp" alt="Coconut palms reflected in the quiet Kerala backwaters at dawn" loading="lazy"/><figcaption><span>A little perspective from home.</span><span>KERALA, INDIA ↗</span></figcaption></figure>
    <div className="about-footnote"><p>Computer science roots. An MBA in Operations & Marketing.<br/>A winding path through entrepreneurship, technology, and education.</p><button className="text-action" onClick={() => onNavigate('journey')}>Read my journey <ArrowUpRight size={16}/></button></div>
  </section>
);
