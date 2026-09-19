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

export const ProjectsSection: React.FC = () => {
  return (
    <div className="space-y-8 text-[var(--text-main)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line-color)] pb-2 text-xs font-mono opacity-70">
        <span>Section: 02 • Products & Prototypes</span>
        <span>"Built from real problems"</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold font-handwriting text-blue-900 dark:text-blue-200">
          Featured Projects & Tools 🚀
        </h2>
        <p className="text-xs md:text-sm opacity-80 leading-relaxed">
          I prefer building things that solve an immediate frustration over hypothetical software. Here are a few things I've built and shipped:
        </p>
      </div>

      {/* Projects List on Ruled Lines */}
      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="p-4 md:p-5 rounded-md border border-[var(--line-color)] bg-black/[0.015] dark:bg-white/[0.02] hover:bg-black/[0.03] transition-all relative group"
          >
            {/* Top row with Title and Link */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded-sm">
                  #{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-blue-950 dark:text-blue-100 font-sans">
                  {project.title}
                </h3>
                {project.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                    {project.badge}
                  </span>
                )}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-sm border border-blue-200/50"
                >
                  <span>{project.linkLabel || 'Visit'}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Subtitle / Pitch */}
            <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 font-mono mb-2">
              {project.subtitle}
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm leading-relaxed opacity-85 mb-3 font-sans">
              {project.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-[var(--line-color)] rounded-xs opacity-80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
