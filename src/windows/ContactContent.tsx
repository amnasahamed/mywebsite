import { useForm, ValidationError } from '@formspree/react';
import type { Theme } from '../types';

export const ContactContent = ({ theme }: { theme?: Theme }) => {
  const [state, handleSubmit] = useForm('xaqlkgzy');
  const isMacos = theme === 'macos';

  if (state.succeeded) {
    return (
      <div className={`space-y-6 py-10 text-center ${isMacos ? 'text-gray-800' : 'font-retro'}`}>
        <div className={`w-16 h-16 mx-auto flex items-center justify-center ${isMacos ? 'bg-green-100 text-green-600 rounded-full' : 'bg-green-200 text-green-800 retro-border'}`}>
          ✅
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Message Sent!</h2>
          <p className="text-sm opacity-70">Thanks for reaching out! I'll get back to you soon.</p>
        </div>
        <div className="text-[10px] opacity-40 pt-10">
          © 2026 Amnas Ahamed • Crafted with curiosity ✨
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isMacos ? 'text-gray-800' : 'font-retro text-black'}`} id="contact">
      <div className="space-y-1">
        <h2 className={`text-2xl font-bold tracking-tight ${isMacos ? 'text-black' : ''}`}>Let's Connect</h2>
        <p className="text-sm opacity-70 leading-relaxed font-medium">
          Got a project? A question? A random thought at 2am? I'm here for it.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/amnasahamed/', color: 'bg-[#0077B5]' },
          { label: 'Instagram', url: 'https://www.instagram.com/amnabcd/', color: 'bg-[#E4405F]' },
          { label: 'GitHub', url: 'https://github.com/amnasahamed', color: 'bg-black' },
          { label: 'Email', url: 'mailto:amnaskt05@gmail.com', color: 'bg-gray-600' }
        ].map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all ${
              isMacos 
                ? 'bg-gray-100 hover:bg-gray-200 rounded-xl' 
                : 'bg-[#c0c0c0] retro-border active:retro-border-inset'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <form
        className={`space-y-4 ${isMacos ? 'bg-black/5 p-5 rounded-[24px]' : 'retro-border-thin p-3 bg-[#e0e0e0]'}`}
        onSubmit={handleSubmit}
      >
        <div className="space-y-1">
          <label htmlFor="contact-name" className="block text-[10px] uppercase font-bold opacity-50 tracking-widest ml-1">
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className={`w-full px-3 py-2 text-sm outline-none transition-all ${
              isMacos ? 'bg-white rounded-xl border border-black/5 focus:ring-2 focus:ring-blue-500/20' : 'retro-border-inset bg-white'
            }`}
            placeholder="John Doe"
            disabled={state.submitting}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-email" className="block text-[10px] uppercase font-bold opacity-50 tracking-widest ml-1">
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className={`w-full px-3 py-2 text-sm outline-none transition-all ${
              isMacos ? 'bg-white rounded-xl border border-black/5 focus:ring-2 focus:ring-blue-500/20' : 'retro-border-inset bg-white'
            }`}
            placeholder="john@example.com"
            disabled={state.submitting}
          />
          <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-700 text-[10px] mt-1 font-bold" />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-message" className="block text-[10px] uppercase font-bold opacity-50 tracking-widest ml-1">
            Your Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            className={`w-full px-3 py-2 text-sm outline-none transition-all h-24 resize-none ${
              isMacos ? 'bg-white rounded-xl border border-black/5 focus:ring-2 focus:ring-blue-500/20' : 'retro-border-inset bg-white'
            }`}
            placeholder="Tell me about your project..."
            disabled={state.submitting}
          />
          <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-700 text-[10px] mt-1 font-bold" />
        </div>
        
        <button
          type="submit"
          className={`w-full py-3 font-bold transition-all flex items-center justify-center gap-2 ${
            isMacos ? 'bg-[#007AFF] text-white rounded-xl shadow-lg hover:bg-blue-600' : 'bg-[#c0c0c0] text-black retro-border active:retro-border-inset'
          }`}
          disabled={state.submitting}
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};
