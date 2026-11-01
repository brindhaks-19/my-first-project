import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Code, X, Check } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = [
    'All',
    'Distributed Systems',
    'Quantitative Engine',
    'High-Throughput Java',
    'Cloud Infrastructure',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0e1116] transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Engineered Systems</span>
              <span aria-hidden="true">·</span>
              <span>Production Deployments</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Selected Architectural Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              High-throughput engines, distributed state machines, and microsecond-level financial order routers.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-[#151a22] rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => {
            return (
              <div
                key={project.id}
                className="lg:col-span-6 bg-white dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-xs dark:shadow-md group"
              >
                <div className="space-y-4">
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium font-mono">{project.kicker}</span>
                    <span className="font-mono text-slate-400 dark:text-slate-500">System #{idx + 1}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Key Metrics Strip on Card */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0e1116]/50 rounded-lg px-3">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-0.5">
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{m.label}</div>
                        <div className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white truncate">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack: Clean unboxed text with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    {project.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                        {tIdx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>Inspect System Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View Architecture Specs"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  <span>{activeProjectModal.category}</span>
                  <span>·</span>
                  <span>System Architecture Spec</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {activeProjectModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                aria-label="Close modal"
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">System Overview</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeProjectModal.overview}
              </p>
            </div>

            {/* Verified Performance Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Benchmark Metrics</h4>
              <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-[#0e1116] p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                {activeProjectModal.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.label}</div>
                    <div className="text-sm sm:text-base font-bold font-mono text-indigo-600 dark:text-indigo-300">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Architectural Mechanisms</h4>
              <ul className="space-y-2">
                {activeProjectModal.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tradeoffs Analysis */}
            <div className="space-y-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
              <h4 className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400">Trade-Offs & Invariants</h4>
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">
                {activeProjectModal.tradeoffs}
              </p>
            </div>

            {/* Code Snippet if Available */}
            {activeProjectModal.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Core Kernel Implementation
                  </span>
                  <span>Java 21</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 dark:bg-[#0e1116] border border-slate-800 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                  <code>{activeProjectModal.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Production Artifacts Ready
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
