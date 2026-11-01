import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0e1116] transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Career Milestones</span>
            <span aria-hidden="true">·</span>
            <span>Track Record</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering Leadership & Production Impact
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Chronological systems engineering trajectory across financial transaction fabrics and multi-region infrastructure platforms.
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs dark:shadow-md"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                  <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">{exp.company}</div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {exp.summary}
              </p>

              {/* Quantified Accomplishments */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                  Verified Engineering Outcomes:
                </div>
                <ul className="space-y-2">
                  {exp.impactMetrics.map((impact, iIdx) => (
                    <li key={iIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack: Clean unboxed text with typographic separators */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono text-slate-400 dark:text-slate-500">Stack:</span>
                {exp.technologies.map((t, tIdx) => (
                  <React.Fragment key={tIdx}>
                    <span className="text-slate-700 dark:text-slate-300">{t}</span>
                    {tIdx < exp.technologies.length - 1 && (
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
