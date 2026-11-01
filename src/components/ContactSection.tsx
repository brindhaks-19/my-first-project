import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenFirebaseModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenFirebaseModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Architecture Consultation',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        const storedInquiries = JSON.parse(localStorage.getItem('portfolio_inquiries') || '[]');
        storedInquiries.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('portfolio_inquiries', JSON.stringify(storedInquiries));
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  const handleDownloadResume = () => {
    const resumeText = `BRINDHA K.
Senior Systems Engineer & Software Architect
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

SUMMARY:
${PERSONAL_INFO.bio}

CORE SPECIALIZATIONS:
- Core Java 21, JVM Internals, Generational ZGC, Loom Virtual Threads
- Distributed Systems, Raft Consensus, High-Throughput Event Streaming (Kafka)
- Low-Latency Lock-Free Architectures (Disruptor RingBuffer, Aeron UDP)
- Quantitative Performance Modeling & JMH Microbenchmarking

EXPERIENCE:
- Principal Systems Architect (2023 - Present) | Enterprise Distributed Platforms
- Staff Backend & Performance Engineer (2020 - 2023) | Financial Ingestion Systems
- Senior Software Engineer (2017 - 2020) | Cloud Scale Infrastructure Corp

PRODUCTION METRICS:
- Peak QPS: 450,000+ ops/sec
- Tail Latency: < 1.8ms p99
- Service Availability SLA: 99.999%
`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Brindha_K_Systems_Architect_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-20 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1116] transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Initiate Dialogue</span>
            <span aria-hidden="true">·</span>
            <span>Technical Advisory & Roles</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's Build Resilient Systems Together
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Available for principal architecture opportunities, low-latency consulting, and technical advisory discussions.
          </p>
        </div>

        {/* 2-Column Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs dark:shadow-md">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Direct Communication</h3>
              
              <div className="space-y-3">
                {/* Email Box with One-Click Copy */}
                <div className="p-3.5 bg-white dark:bg-[#0e1116] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Direct Email</div>
                      <div className="text-xs sm:text-sm font-mono text-slate-900 dark:text-white truncate select-all">
                        {PERSONAL_INFO.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Professional Socials */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-[#0e1116] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 transition-colors shadow-xs"
                  >
                    <Github className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>GitHub Profile</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-[#0e1116] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 transition-colors shadow-xs"
                  >
                    <Linkedin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>

              {/* Resume Download Action */}
              <div className="pt-2">
                <button
                  onClick={handleDownloadResume}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-[#0e1116] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Download Curriculum Vitae (CV)</span>
                </button>
              </div>
            </div>

            {/* Firebase Deployment Notice Box */}
            <div className="bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs dark:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Firebase Ready Architecture</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60 px-2 py-0.5 rounded">
                  Validated
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                This portfolio is engineered with zero runtime server dependencies, strict SPA routing rewrites, and 1-year immutable asset caching for Firebase Hosting deployment.
              </p>
              <button
                onClick={onOpenFirebaseModal}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>View Firebase Hosting Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-md">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Transmission Received</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. Your inquiry regarding <span className="text-indigo-600 dark:text-indigo-300">{formData.inquiryType}</span> has been logged. I typically respond within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        inquiryType: 'Architecture Consultation',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800/80 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Send Structured Inquiry</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Submit your project parameters or schedule an architectural consultation.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-lg">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-indigo-600 dark:text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#0e1116] border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-indigo-600 dark:text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#0e1116] border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Inquiry Scope</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#0e1116] border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
                  >
                    <option value="Architecture Consultation">Architecture Consultation & Review</option>
                    <option value="Principal Engineering Role">Full-Time Principal / Staff Engineering</option>
                    <option value="Low-Latency Advisory">Low-Latency / JVM Tuning Advisory</option>
                    <option value="Speaking / Panel">Keynote / Technical Seminar</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Message / System Context <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your current systems throughput requirements, latency targets, or engineering challenge..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#0e1116] border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-y shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <span>Dispatching Payload...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Architecture Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
