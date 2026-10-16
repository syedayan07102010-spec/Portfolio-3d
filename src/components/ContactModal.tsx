import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('3D Modeling');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('ayan@3dcreator.studio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#121212] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={resetForm}
          aria-label="Close contact dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
              Message Received!
            </h3>
            <p className="text-white/70 text-sm max-w-xs leading-relaxed">
              Thanks for reaching out, {name}. Ayan will review your project details and get back to you within 24 hours.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-4 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium uppercase tracking-wider text-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold">
                Available for Q4 / 2026 Projects
              </span>
            </div>
            <h3
              id="contact-modal-title"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2"
            >
              Let&apos;s Build Together
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mb-6 leading-relaxed">
              Have an ambitious vision or need cutting-edge 3D assets? Send a note or reach out directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Service Interested In
                </label>
                <select
                  id="contact-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c1c1c] border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm cursor-pointer"
                >
                  <option value="3D Modeling">01 - 3D Modeling</option>
                  <option value="Rendering">02 - Rendering</option>
                  <option value="Motion Design">03 - Motion Design</option>
                  <option value="Branding">04 - Branding</option>
                  <option value="Web Design">05 - Web Design</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                  Project Brief
                </label>
                <textarea
                  id="contact-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your product, timeline, and goals..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-400 text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-full font-medium uppercase tracking-widest text-white text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-4 py-3.5 rounded-full border border-white/20 text-white text-xs sm:text-sm uppercase tracking-wider font-medium hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>
            </form>

            <div className="mt-5 pt-4 border-t border-white/10 text-center">
              <a
                href="mailto:ayan@3dcreator.studio"
                className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ayan@3dcreator.studio</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
