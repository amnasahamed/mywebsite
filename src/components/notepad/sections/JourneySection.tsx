import React from 'react';
import { Milestone, Calendar, ArrowUpRight } from 'lucide-react';

interface MilestoneItem {
  period: string;
  badge?: string;
  title: string;
  role: string;
  details: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    period: '2024 — Present',
    badge: 'Current Focus',
    title: 'Edapt × IIT Madras Pravartak',
    role: 'GenAI Educator & Product Manager',
    details: 'Collaborating on the Applied AI Mastery Program at IIT Madras Pravartak. Mentoring professionals and founders in generative AI workflows, agentic automation, and building responsibly with LLMs.',
  },
  {
    period: '2022 — Present',
    title: 'Pelago Consultants',
    role: 'Founding Partner',
    details: 'Modernizing tax, finance, and corporate compliance operations through automated workflows, client portals, and streamlined digital systems.',
  },
  {
    period: '2021 — Present',
    title: 'CLAPS Learn',
    role: 'Co-Founder & Operations Lead',
    details: 'Pioneered custom curriculum pathways and operational systems for a personalized EdTech network operating across multiple cities.',
  },
  {
    period: '2023 — 2025',
    title: 'Desgro Creatives',
    role: 'Technology Consultant',
    details: 'Structured technical execution for high-touch digital brand experiences, design systems, and creative campaigns.',
  },
  {
    period: '2021 — 2023',
    badge: 'UGC NET',
    title: 'Pondicherry University',
    role: 'MBA — Operations & Marketing',
    details: 'Rigorous studies in operational research, supply chains, and consumer behavior. Qualified UGC NET (Assistant Professor eligibility in Management).',
  },
  {
    period: '2016 — 2020',
    title: 'University of Calicut',
    role: 'B.Sc Computer Science',
    details: 'Formed core foundations in algorithms, data structures, systems programming, and web architecture.',
  },
];

export const JourneySection: React.FC = () => {
  return (
    <div className="space-y-8 text-[var(--text-main)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line-color)] pb-2 text-xs font-mono opacity-70">
        <span>Section: 04 • Chronological Journal</span>
        <span>"Connecting the dots"</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold font-handwriting text-blue-900 dark:text-blue-200">
          The Journey So Far ⏳
        </h2>
        <p className="text-xs md:text-sm opacity-80 leading-relaxed">
          A non-linear journey from computer science to operations, business strategy, and educating the next generation of builders in GenAI.
        </p>
      </div>

      {/* Ruled Timeline */}
      <div className="relative border-l-2 border-dashed border-[var(--line-color)] ml-3 md:ml-4 pl-5 md:pl-6 space-y-6">
        {MILESTONES.map((m, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline bullet knot */}
            <div className="absolute -left-[27px] md:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-[var(--paper-bg)] group-hover:scale-125 transition-transform" />

            {/* Period Stamp */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-[11px] font-bold tracking-wider text-amber-800 dark:text-amber-300">
                {m.period}
              </span>
              {m.badge && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                  {m.badge}
                </span>
              )}
            </div>

            {/* Title & Role */}
            <h3 className="text-base md:text-lg font-bold text-blue-950 dark:text-blue-100">
              {m.title}
            </h3>
            <div className="text-xs md:text-sm font-semibold opacity-75 font-mono mb-1.5">
              {m.role}
            </div>

            {/* Narrative text */}
            <p className="text-xs md:text-sm leading-relaxed opacity-85">
              {m.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
