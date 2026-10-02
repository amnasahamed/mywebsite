import React from 'react';
import { Building2, Briefcase, ChevronRight, Check } from 'lucide-react';

interface VentureItem {
  period: string;
  title: string;
  role: string;
  desc: string;
  highlights: string[];
  tag: string;
}

const VENTURES: VentureItem[] = [
  {
    period: 'Since 2021',
    title: 'CLAPS Learn',
    role: 'Founding Partner',
    desc: 'Co-founding and leading the end-to-end operational scaling of a personalized EdTech ecosystem. Scaled across multiple cities through modular learning systems.',
    highlights: [
      'Designed end-to-end learning workflows and operational architecture.',
      'Constructed internal automation pipelines for student enrollment & mentor matching.',
      'Spearheading product strategy and strategic business partnerships.',
    ],
    tag: 'EdTech & Operations',
  },
  {
    period: 'Since 2022',
    title: 'Pelago Consultants',
    role: 'Founding Partner',
    desc: 'Leading the modernization and digital transformation of a contemporary tax & financial compliance firm, pivoting toward automated client engagement.',
    highlights: [
      'Architected digital web presence, inbound funnels, and consultation scheduling.',
      'Created custom communication tools to keep clients updated on compliance filings.',
      'Established disciplined client pipeline tracking and automated follow-ups.',
    ],
    tag: 'Compliance & Digital Systems',
  },
  {
    period: '2023 – 2025',
    title: 'Desgro Creatives',
    role: 'Technology Consultant',
    desc: 'Established foundational systems of a modern creative and branding agency, instilling structured process-driven delivery.',
    highlights: [
      'Recruited and mentored the foundational creative and technical squad.',
      'Directed technical consulting for complex web platforms and brand experiences.',
      'Streamlined asset handoff pipelines between design and client stakeholders.',
    ],
    tag: 'Creative Agency & Tech',
  },
];

export const VenturesSection: React.FC = () => {
  return (
    <div className="space-y-8 text-[var(--text-main)]">

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold font-handwriting text-blue-900 dark:text-blue-200">
          Building beyond the product.
        </h2>
        <p className="text-xs md:text-sm opacity-80 leading-relaxed">
          Building and operating companies where technology and efficient systems create tangible, sustainable value.
        </p>
      </div>

      {/* Ventures Cards */}
      <div className="grid grid-cols-1 gap-6">
        {VENTURES.map((v) => (
          <div
            key={v.title}
            className="p-5 rounded-md border border-[var(--line-color)] bg-black/[0.015] dark:bg-white/[0.02] relative"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                  {v.period}
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-blue-950 dark:text-blue-100">
                  {v.title}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40">
                {v.role}
              </span>
            </div>

            <p className="text-xs md:text-sm leading-relaxed opacity-85 mb-4">
              {v.desc}
            </p>

            {/* Highlights bullet list */}
            <div className="space-y-2 bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-sm border border-[var(--line-color)]/60">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider opacity-60 block">
                Key Contributions
              </span>
              <ul className="space-y-1.5 text-xs md:text-sm">
                {v.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span className="opacity-90 leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
