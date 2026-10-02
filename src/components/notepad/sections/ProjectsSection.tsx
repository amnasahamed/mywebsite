import React from 'react';
import { ExternalLink, Sparkles, Smartphone, Layers, CheckCircle2 } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  desc: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'closelist',
    title: 'CloseList',
    subtitle: 'Send invites. Track your list.',
    badge: 'v1.3 • iOS',
    desc: 'Write personal messages, add invitation links, and work through your WhatsApp invitation list one person at a time without losing your place. 50 free confirmed sends, optional rewarded ads, or ₹499 one-time Unlimited. 100% on-device privacy.',
    tags: ['📱 iOS Native', '🔒 100% On-Device', '💬 WhatsApp Ready', '⚡ No Subscription'],
    link: '/closelist',
    linkLabel: 'View App',
  },
  {
    id: 'clapsboard',
    title: 'ClapsBoard',
    subtitle: 'The whiteboard that keeps educators visible',
    badge: 'Free Tool',
    desc: 'Teaching on Zoom from mobile often forces the camera off during screen sharing. Built ClapsBoard to solve this with a fluid picture-in-picture camera feed, infinite digital canvas, and instant drawing annotation.',
    tags: ['📹 PiP Camera', '✍️ Real-time Drawing', '📱 Mobile First', '⚡ Zero Lag'],
  },
  {
    id: 'weddingtracker',
    title: 'WeddingTracker',
    subtitle: 'Guest communication & RSVP pipeline',
    badge: 'Live SaaS',
    desc: 'Turned the chaos of personal wedding coordination into a lightweight SaaS. Built to track guest communications (calls, messages, RSVP follow-ups) with seamless contact importing.',
    tags: ['📥 Gmail Auth', '💬 Interaction Log', '📊 Guest Pipeline', '📱 Responsive'],
    link: 'https://invite.vahiy.in/',
    linkLabel: 'Visit Tool',
  },
  {
    id: 'rapidseo',
    title: 'RapidSEO Audit',
    subtitle: 'AI-Powered Landing Page Analyzer',
    badge: 'AI Automation',
    desc: 'An automated agent using LLMs to deliver instantaneous conversion audits and copy optimization for early-stage landing pages. Adapted from an autonomous n8n workflow.',
    tags: ['🔍 AI Audit', '🤖 n8n Workflow', '🚀 Conversion Rate', '⚡ Instant Report'],
    link: 'http://seo.vahiy.in/',
    linkLabel: 'Try Analyzer',
  },
];

export const ProjectsSection: React.FC = () => (
  <section>
    <h2 className="font-handwriting">Useful things, built from real life.</h2>
    <p className="section-description">Every project starts with a small frustration. These are a few of the products and experiments that came out of mine.</p>
    <img className="project-banner" src="/media/builders-still-life.webp" alt="A notebook of ideas, a green pencil and a folded paper airplane" />
    <div className="projects-list">
      {PROJECTS.map((project, i) => (
        <article className="project-card" key={project.id}>
          <div className="project-card-top"><span>0{i + 1} / PRODUCT NOTES</span><span>{project.badge}</span></div>
          <h3>{project.title}</h3><h4>{project.subtitle}</h4><p>{project.desc}</p>
          <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag.replace(/^[^a-zA-Z0-9]+/, '')}</span>)}</div>
          {project.link ? <a className="text-action" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ExternalLink size={13}/></a> : <span className="text-action">Built for educators</span>}
        </article>
      ))}
    </div>
  </section>
);
