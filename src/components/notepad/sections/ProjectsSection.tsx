import React from 'react';
import { ExternalLink, Video, UsersRound, ScanSearch, ArrowRight } from 'lucide-react';

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

const SUMMARIES: Record<string, string> = {
  closelist: 'Send personal WhatsApp invitations and keep track of every guest, with your data on your device.',
  clapsboard: 'Draw, teach, and stay on camera with an infinite whiteboard and picture-in-picture video.',
  weddingtracker: 'Keep guest conversations, invitations, and RSVP follow-ups together in one place.',
  rapidseo: 'Get an AI-assisted landing page audit with practical suggestions for copy and conversion.',
};
const VISUALS = { clapsboard: Video, weddingtracker: UsersRound, rapidseo: ScanSearch };
export const ProjectsSection: React.FC = () => (
  <section>
    <h2 className="font-handwriting">Useful things, built from real life.</h2>
    <p className="section-description">Every project starts with a small frustration. Here are a few products and experiments that came out of mine.</p>
    <div className="projects-list">
      {PROJECTS.map((project, i) => {
        const Icon = VISUALS[project.id as keyof typeof VISUALS];
        return (
          <article className="project-card" key={project.id}>
            {project.id === 'closelist' ? <div className="project-visual project-visual-photo"><img src="/closelist/screenshot1.png" alt="CloseList invitation dashboard and guest list preview" loading="lazy"/><span>APP PREVIEW</span></div> : <div className={`project-visual project-visual-${project.id}`} aria-hidden="true"><Icon size={46} strokeWidth={1.2}/><span>{project.id === 'clapsboard' ? 'Draw. Teach. Stay visible.' : project.id === 'weddingtracker' ? 'Every guest. Every conversation.' : 'A clearer view of your website.'}</span><i/><i/><i/></div>}
            <div className="project-card-body">
              <div className="project-card-top"><span>0{i + 1}</span><span>{project.badge}</span></div>
              <h3>{project.title}</h3><p>{SUMMARIES[project.id]}</p>
              <div className="project-tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag.replace(/^[^a-zA-Z0-9]+/, '')}</span>)}</div>
              <details className="project-details"><summary>Project details</summary><p>{project.desc}</p></details>
              <div className="project-card-action">{project.link ? <a className="text-action" href={project.link} target={project.link.startsWith('/') ? undefined : '_blank'} rel="noreferrer">{project.linkLabel} <ExternalLink size={16}/></a> : <a className="text-action" href="#contact">Ask about this project <ArrowRight size={16}/></a>}</div>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);
