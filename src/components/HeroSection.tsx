import React from 'react';
import { ArrowDown, Terminal, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';

interface HeroSectionProps {
  onOpenFirebaseModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenFirebaseModal }) => {
  return (
    <section className="relative w-full pt-6 pb-16 border-b border-slate-200 dark:border-slate-800/80 overflow-hidden bg-slate-50 dark:bg-[#0e1116] transition-colors">
      {/* 3D Background Canvas */}
      <div className="w-full">
        <Hero3DCanvas />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Clean unboxed kicker (No pill enclosures) */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Systems Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Concurrent Java</span>
              <span aria-hidden="true">·</span>
              <span>Quantitative Modeling</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              Architecting ultra-low latency distributed engines and high-throughput systems.
            </h1>

            {/* Lead Prose */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Hi, I'm <strong className="font-semibold text-slate-900 dark:text-white">Brindha K.</strong> Over 8 years designing fault-tolerant backends, JVM memory-optimized pipelines, and distributed consensus state machines handling hundreds of thousands of operations per second with microsecond predictability.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
              >
                <span>Explore Featured Systems</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#benchmarks"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#161b22] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 rounded-lg transition-colors shadow-xs"
              >
                <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Interactive Benchmarks</span>
              </a>

              <button
                onClick={onOpenFirebaseModal}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Firebase Architecture Specs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Highlights Card */}
          <div className="lg:col-span-4 bg-white dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm dark:shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Current Focus Area</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Q4 2026</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-[#0e1116] rounded-lg border border-slate-200 dark:border-slate-800/60">
                <div className="font-semibold text-slate-900 dark:text-white mb-0.5">Generational ZGC & Loom R&D</div>
                <div className="text-slate-500 dark:text-slate-400">Zero-allocation byte-buffer protocols over virtual thread worker pools.</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#0e1116] rounded-lg border border-slate-200 dark:border-slate-800/60">
                <div className="font-semibold text-slate-900 dark:text-white mb-0.5">Multi-Raft Consensus Partitions</div>
                <div className="text-slate-500 dark:text-slate-400">Bounded staleness replication across active-active cloud regions.</div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Location: {PERSONAL_INFO.location}</span>
              <a href="#about" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium">
                More <ArrowDown className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Metric Row */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {PERSONAL_INFO.metrics.map((m, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                {m.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
