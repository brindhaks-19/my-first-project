import React, { useState } from 'react';
import { Cpu, Network, TrendingUp, Server, Layers, Check } from 'lucide-react';
import { SKILL_CATEGORIES, METHODOLOGIES } from '../data/portfolioData';

export const AboutExpertise: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <section id="about" className="py-20 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1116] transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Technical Profile</span>
            <span aria-hidden="true">·</span>
            <span>Domain Mastery</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
            Engineering for mechanical sympathy, concurrency, and mathematical rigor.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            I specialize in the intersection of low-level runtime performance and distributed system design. Rather than relying on guesswork, my engineering workflow centers on formal invariants, hardware cache awareness, and statistically grounded microbenchmarks.
          </p>
        </div>

        {/* 2-Column Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Detailed Bio & Core Principles */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Engineering Philosophy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Modern distributed microservices frequently suffer from bloated abstractions, excessive object allocations, and erratic GC pauses. My focus is restoring deterministic latency and high density per core:
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Zero Garbage Collector Pressure on Critical Paths</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Off-heap continuous buffers, reusable object pools, and zero-copy byte buffers for predictable microsecond execution.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Quantitative & Algorithmic Discipline</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Amortized algorithmic complexity, cache-line padded data layouts, and probabilistic counting structures like HyperLogLog.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Provable Distributed Invariants</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Designing linearizable consensus protocols and state machine transitions resilient to network partitions and packet reordering.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Primary Tech: Java 21, Kafka, Raft, WebGL</span>
              <a href="#projects" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                View Systems →
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Proficiencies & Competencies */}
          <div className="lg:col-span-7 space-y-4">
            {/* Functional Category Selector Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-[#151a22] rounded-xl border border-slate-200 dark:border-slate-800">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === idx
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>

            {/* Active Category Details Card */}
            <div className="bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-md">
              <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4">
                <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Proficiency Deep Dive
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {SKILL_CATEGORIES[activeTab].title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {SKILL_CATEGORIES[activeTab].subtitle}
                </p>
              </div>

              {/* Skills Bars & Context */}
              <div className="space-y-4">
                {SKILL_CATEGORIES[activeTab].skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-white">{skill.name}</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400">{skill.proficiency}% Depth</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {skill.context}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Production Highlights */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                  Key Production Accomplishments:
                </div>
                <ul className="space-y-1.5">
                  {SKILL_CATEGORIES[activeTab].highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Problem-Solving Methodologies */}
        <div id="architecture" className="pt-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Methodology</span>
              <span aria-hidden="true">·</span>
              <span>Engineering Process</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Systematic Problem-Solving Framework
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              How complex systems are decomposed from abstract problem statements into deterministic, verifiable software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGIES.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {m.number}.
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">Outputs:</div>
                  <ul className="space-y-1">
                    {m.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
