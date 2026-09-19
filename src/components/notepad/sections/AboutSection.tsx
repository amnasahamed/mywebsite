import React from 'react';
import { CheckSquare, GraduationCap, Sparkles, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8 text-[var(--text-main)]">
      {/* Date & Location Note Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line-color)] pb-2 text-xs font-mono opacity-70">
        <span className="flex items-center gap-1">
          <MapPin size={12} className="text-red-500" />
          <span>Kerala, India</span>
        </span>
        <span>Memo #01 • Personal Dossier</span>
      </div>

      {/* Hero: Pinned Photo & Intro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Bio Info */}
        <div className="md:col-span-8 space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-handwriting text-3xl md:text-4xl text-blue-900 dark:text-blue-200">
              Hey, I'm Amnas Ahamed 👋
            </h1>
            <p className="text-base md:text-lg font-semibold leading-snug">
              I build things that <span className="highlighter-yellow font-bold">actually work</span>
              <br />
              <span className="text-xs md:text-sm font-normal opacity-70">
                (and occasionally fix things that don't)
              </span>
            </p>
          </div>

          <div className="p-3.5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-md text-xs md:text-sm leading-relaxed">
            <strong className="font-bold flex items-center gap-1 mb-1 text-amber-700 dark:text-amber-300">
              <Sparkles size={14} /> Currently:
            </strong>
            Turning curiosity into products • Teaching AI at IIT Madras Pravartak • Vibe coding my way through complex problems.
          </div>

          <div className="space-y-3 text-sm md:text-base leading-relaxed opacity-90">
            <p>
              Entrepreneur passionate about building clear systems, strong operations, and meaningful digital experiences.
            </p>
            <p>
              I'm that person who sees something broken and thinks, <span className="font-handwriting text-xl text-blue-800 dark:text-blue-300">"I could probably fix that."</span> Then spends weeks making it reliable while everyone else says "that's just how it works."
            </p>
            <p className="text-xs md:text-sm opacity-80">
              My background is a patchwork — MBA in Operations & Marketing, UGC NET qualified, and hands-on work in PR, content, media, and systems before landing full-time in tech and GenAI education.
            </p>
          </div>
        </div>

        {/* Right: Pinned Polaroid Snapshot */}
        <div className="md:col-span-4 flex justify-center">
          <div className="sticky-note p-3 pb-4 rounded-xs max-w-[210px] transform md:rotate-2 hover:rotate-0 transition-transform">
            {/* Paperclip */}
            <div className="paperclip" />
            <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded-xs mb-2">
              <img
                src="/media/amnas_me.webp"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/media/amnas_me.png';
                }}
                alt="Amnas Ahamed"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="text-center font-handwriting text-lg text-gray-800 leading-tight">
              Amnas Ahamed
            </div>
            <div className="text-center font-mono text-[10px] text-gray-500 tracking-wider">
              Product & GenAI
            </div>
          </div>
        </div>
      </div>

      {/* Handwritten Pull Quote */}
      <div className="my-6 p-4 rounded-md border border-dashed border-[var(--line-color)] bg-black/[0.02] dark:bg-white/[0.02]">
        <p className="font-kalam text-base md:text-lg italic text-blue-900 dark:text-blue-200 leading-relaxed">
          "Sessions with learners remind me how far simple curiosity can really go... today, helping others understand AI practically feels like the most important work I can do."
        </p>
        <span className="block mt-2 text-right font-handwriting text-sm opacity-60">— Amnas</span>
      </div>

      {/* Skills Checklist & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Skills Section */}
        <div className="space-y-3">
          <h2 className="text-base font-bold uppercase tracking-wider font-mono border-b border-[var(--line-color)] pb-1 flex items-center gap-1.5">
            <CheckSquare size={16} className="text-blue-600 dark:text-blue-400" />
            <span>Core Competencies</span>
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400">Technical</span>
              <ul className="space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> n8n Automation
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> No-Code & Web Apps
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> Systems Design
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> GenAI Prompting & LLMs
                </li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">Strategy</span>
              <ul className="space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> Operations Design
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> Digital Marketing
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> Product Roadmapping
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> Educational Design
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-3">
          <h2 className="text-base font-bold uppercase tracking-wider font-mono border-b border-[var(--line-color)] pb-1 flex items-center gap-1.5">
            <GraduationCap size={16} className="text-amber-600 dark:text-amber-400" />
            <span>Academic Background</span>
          </h2>
          <div className="space-y-3 text-xs md:text-sm">
            <div className="flex justify-between items-start">
              <div>
                <strong className="block font-semibold">MBA — Operations & Marketing</strong>
                <span className="text-xs opacity-70">Pondicherry University • 2021 – 2023</span>
              </div>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-sm">
                UGC NET
              </span>
            </div>
            <div>
              <strong className="block font-semibold">B.Sc Computer Science</strong>
              <span className="text-xs opacity-70">University of Calicut • 2016 – 2020</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
