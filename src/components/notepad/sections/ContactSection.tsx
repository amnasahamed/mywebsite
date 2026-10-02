import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle, Linkedin, Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [state, handleSubmit] = useForm('xaqlkgzy');

  const SOCIALS = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/amnasahamed/', icon: <Linkedin size={14} />, tag: 'Network' },
    { label: 'GitHub', url: 'https://github.com/amnasahamed', icon: <Github size={14} />, tag: 'Code' },
    { label: 'Instagram', url: 'https://www.instagram.com/amnabcd/', icon: <Instagram size={14} />, tag: 'Life' },
    { label: 'Email Me', url: 'mailto:amnaskt05@gmail.com', icon: <Mail size={14} />, tag: 'Direct' },
  ];

  return (
    <div className="space-y-8 text-[var(--text-main)]">

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold font-handwriting text-blue-900 dark:text-blue-200">
          Good things start with a hello.
        </h2>
        <p className="text-xs md:text-sm opacity-80 leading-relaxed">
          Got a project idea, want to collaborate on GenAI education, or just want to say hi? Write your note below and it will reach my primary inbox.
        </p>
      </div>

      {/* Quick Social / Connect Tags */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SOCIALS.map((soc) => (
          <a
            key={soc.label}
            href={soc.url}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-sm border border-[var(--line-color)] bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] transition-all flex items-center justify-between text-xs group"
          >
            <div className="flex items-center gap-1.5 font-semibold">
              {soc.icon}
              <span>{soc.label}</span>
            </div>
            <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      {/* The Lined Contact Memo Form */}
      <div className="p-4 md:p-6 rounded-md border border-[var(--line-color)] bg-black/[0.015] dark:bg-white/[0.02] relative">
        {/* Top Memo Stamp */}
        <div className="flex items-center justify-between border-b border-[var(--line-color)] pb-3 mb-4 text-xs font-mono">
          <span className="font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
            MEMORANDUM
          </span>
          <span className="opacity-60">TO: Amnas Ahamed</span>
        </div>

        {state.succeeded ? (
          <div role="status" aria-live="polite" className="py-10 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
              ✓
            </div>
            <h3 className="text-xl font-bold font-handwriting text-2xl text-emerald-800 dark:text-emerald-300">
              Note received
            </h3>
            <p className="text-xs md:text-sm opacity-80 max-w-md mx-auto leading-relaxed">
              Thanks for reaching out. Your note has been delivered to Amnas's inbox. I'll get back to you shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form space-y-5" aria-label="Send a note to Amnas">
            <div role="status" aria-live="polite"><ValidationError errors={state.errors} className="form-error" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div className="space-y-1">
                <label 
                  htmlFor="contact-name" 
                  className="block text-[11px] font-mono font-bold uppercase tracking-wider opacity-70"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  required
                  placeholder="Your name"
                  disabled={state.submitting}
                  className="w-full px-3 py-2 text-sm bg-transparent border-b-2 border-[var(--line-color)] focus:border-amber-600 outline-none transition-colors font-sans"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label 
                  htmlFor="contact-email" 
                  className="block text-[11px] font-mono font-bold uppercase tracking-wider opacity-70"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  disabled={state.submitting}
                  className="w-full px-3 py-2 text-sm bg-transparent border-b-2 border-[var(--line-color)] focus:border-amber-600 outline-none transition-colors font-sans"
                />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-600 text-xs font-mono" />
              </div>
            </div>

            {/* Message Area styled to lines */}
            <div className="space-y-1 pt-1">
              <label 
                htmlFor="contact-message" 
                className="block text-[11px] font-mono font-bold uppercase tracking-wider opacity-70"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Write your note here... ask a question, pitch a project, or share feedback."
                disabled={state.submitting}
                className="w-full p-3 text-sm bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--line-color)] focus:border-amber-600 rounded-sm outline-none resize-y leading-relaxed font-sans"
              />
              <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-600 text-xs font-mono" />
            </div>

            <p className="form-helper">Your name, email, and message are required. Your note goes directly to Amnas.</p>
            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={state.submitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-sm font-semibold text-xs md:text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send size={14} />
                <span>{state.submitting ? 'Sending Note...' : 'Send your note'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
