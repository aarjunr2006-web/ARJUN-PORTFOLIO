import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Sparkles, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { personal } from '../data';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'Full-Stack Web App',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        project: 'Full-Stack Web App',
        budget: '$1,000 - $3,000',
        message: '',
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-py px-4 sm:px-6 relative z-10"
      aria-label="Contact Section"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 font-mono text-xs text-accent-blue tracking-widest uppercase font-semibold">
            <Sparkles size={14} />
            <span>07 // Get In Touch</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-white">
            Let's Build Something <span className="gradient-text-blue-purple">Extraordinary</span>
          </h2>
          <p className="font-body text-text-muted max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind, a freelance proposal, or a career opportunity? Drop a message below.
          </p>
        </div>

        {/* Contact Form & Information Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column — Contact Info & Direct Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="glass-card rounded-hero p-8 border border-white/10 space-y-6">
              <h3 className="font-heading text-2xl font-bold text-text-white">
                Contact Information
              </h3>

              <div className="space-y-5">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 group p-3 rounded-xl bg-bg-surface/50 border border-white/5 hover:border-accent-blue/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-text-muted">Direct Email</div>
                    <div className="font-heading font-semibold text-text-white group-hover:text-accent-blue transition-colors">
                      {personal.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${personal.phone}`}
                  className="flex items-center gap-4 group p-3 rounded-xl bg-bg-surface/50 border border-white/5 hover:border-accent-purple/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-text-muted">Call / WhatsApp</div>
                    <div className="font-heading font-semibold text-text-white group-hover:text-accent-purple transition-colors">
                      {personal.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-bg-surface/50 border border-white/5">
                  <div className="w-11 h-11 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-text-muted">Location</div>
                    <div className="font-heading font-semibold text-text-white">
                      {personal.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Panel */}
            <div className="glass-card rounded-hero overflow-hidden border border-white/10 h-64 relative">
              <iframe
                title="Jodhpur Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114483.9575990263!2d72.9313175249567!3d26.264779435649987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c4eaa06c28f%3A0x51ef0ee73f225ca9!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1689123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(120%)' }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column — Large Glass Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-hero p-8 sm:p-10 border border-white/10 relative">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <CheckCircle size={56} className="text-accent-cyan animate-bounce" />
                  <h3 className="font-heading text-3xl font-bold text-text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-body text-text-muted max-w-md">
                    Thank you for reaching out. I will review your message details and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="input-name" className="font-mono text-xs text-text-light font-medium">
                        Your Name *
                      </label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-text-white placeholder-text-muted focus:border-accent-blue focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="input-email" className="font-mono text-xs text-text-light font-medium">
                        Your Email *
                      </label>
                      <input
                        id="input-email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-text-white placeholder-text-muted focus:border-accent-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label htmlFor="select-project" className="font-mono text-xs text-text-light font-medium">
                        Project Type
                      </label>
                      <select
                        id="select-project"
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-text-white focus:border-accent-blue focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Full-Stack Web App">Full-Stack Web App</option>
                        <option value="UI/UX Design System">UI/UX Design System</option>
                        <option value="Landing Page & Branding">Landing Page & Branding</option>
                        <option value="Freelance Consultation">Freelance Consultation</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <label htmlFor="select-budget" className="font-mono text-xs text-text-light font-medium">
                        Estimated Budget
                      </label>
                      <select
                        id="select-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-text-white focus:border-accent-blue focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="< $1,000">&lt; $1,000</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="textarea-message" className="font-mono text-xs text-text-light font-medium">
                      Message Details *
                    </label>
                    <textarea
                      id="textarea-message"
                      required
                      rows={5}
                      placeholder="Describe your project goals, timelines, and requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-bg-surface border border-white/10 rounded-xl p-4 text-sm text-text-white placeholder-text-muted focus:border-accent-blue focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-form"
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan text-text-white font-heading font-bold text-sm py-4 rounded-xl shadow-glow-blue transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
