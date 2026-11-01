import React, { useState } from 'react';
import { BarChart2, Play, RefreshCw, Zap } from 'lucide-react';
import { BENCHMARKS } from '../data/portfolioData';

export const BenchmarkExplorer: React.FC = () => {
  const [selectedBenchmarkIdx, setSelectedBenchmarkIdx] = useState<number>(0);
  const [threadConcurrency, setThreadConcurrency] = useState<number>(16);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResults, setSimResults] = useState<{ p50: number; p99: number; p999: number } | null>(null);

  const activeBenchmark = BENCHMARKS[selectedBenchmarkIdx];

  const runSimulation = () => {
    setIsSimulating(true);
    setSimResults(null);
    setTimeout(() => {
      const factor = threadConcurrency / 16;
      if (selectedBenchmarkIdx === 0) {
        setSimResults({
          p50: Number((0.12 * factor).toFixed(2)),
          p99: Number((1.82 * Math.sqrt(factor)).toFixed(2)),
          p999: Number((3.45 * Math.sqrt(factor)).toFixed(2)),
        });
      } else if (selectedBenchmarkIdx === 1) {
        setSimResults({
          p50: Number((0.45 * factor).toFixed(2)),
          p99: Number((1.42 * factor).toFixed(2)),
          p999: Number((2.88 * factor).toFixed(2)),
        });
      } else {
        setSimResults({
          p50: 0.18,
          p99: 0.45,
          p999: 0.82,
        });
      }
      setIsSimulating(false);
    }, 450);
  };

  return (
    <section id="benchmarks" className="py-20 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0e1116] transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Quantitative Profiling</span>
            <span aria-hidden="true">·</span>
            <span>JMH Benchmarks</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Quantitative Aptitude & Systems Benchmarks
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Empirical data from JMH microbenchmarks, async-profiler allocations, and latency histogram evaluations under sustained load.
          </p>
        </div>

        {/* Benchmark Explorer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Benchmark Selector & Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                Select Benchmark Suite:
              </span>
              <div className="space-y-2">
                {BENCHMARKS.map((bench, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedBenchmarkIdx(idx);
                      setSimResults(null);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedBenchmarkIdx === idx
                        ? 'bg-slate-50 dark:bg-[#151a22] border-indigo-500 shadow-sm ring-1 ring-indigo-500/20'
                        : 'bg-white dark:bg-[#151a22]/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">{bench.name}</span>
                      <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">{bench.unit}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {bench.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Concurrency Slider */}
            <div className="p-5 bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">Worker Concurrency</span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {threadConcurrency} Threads
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="64"
                step="1"
                value={threadConcurrency}
                onChange={(e) => setThreadConcurrency(Number(e.target.value))}
                className="w-full accent-indigo-600 dark:accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 Core</span>
                <span>16 Cores</span>
                <span>64 Cores</span>
              </div>

              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Statistical Profiler...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Simulate Under {threadConcurrency} Threads</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Comparative Graph & Mathematical Insights */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-[#151a22] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeBenchmark.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{activeBenchmark.metricLabel}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>Time: {activeBenchmark.complexity.time}</span>
                <span>·</span>
                <span>Space: {activeBenchmark.complexity.space}</span>
              </div>
            </div>

            {/* Comparative Bars */}
            <div className="space-y-4">
              {activeBenchmark.competitors.map((comp, idx) => {
                const maxVal = Math.max(...activeBenchmark.competitors.map((c) => c.value));
                const percent = (comp.value / maxVal) * 100;

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${comp.isOptimal ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>
                          {comp.name}
                        </span>
                        {comp.isOptimal && (
                          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60 px-1.5 py-0.2 rounded">
                            Optimal
                          </span>
                        )}
                      </div>
                      <span className="font-mono tabular-nums text-slate-900 dark:text-white font-medium">
                        {comp.value} {activeBenchmark.unit}
                      </span>
                    </div>

                    {/* Visual Bar */}
                    <div className="w-full h-3 bg-slate-200 dark:bg-[#0e1116] rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-800/80">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          comp.isOptimal
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-500 dark:to-indigo-400'
                            : 'bg-slate-400 dark:bg-slate-700'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {comp.baselineNote}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Tail Latency Output (when run) */}
            {simResults && (
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1116] border border-indigo-200 dark:border-indigo-900/60 space-y-2 animate-in fade-in duration-300 shadow-xs">
                <div className="flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Zap className="w-3.5 h-3.5" /> Simulated Latency Distribution ({threadConcurrency} Workers)
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">HDRHistogram Sample</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center pt-1">
                  <div className="p-2 bg-slate-50 dark:bg-[#151a22] rounded border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">p50 Latency</div>
                    <div className="text-sm font-mono font-bold text-slate-900 dark:text-white tabular-nums">{simResults.p50} ms</div>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-[#151a22] rounded border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">p99 Latency</div>
                    <div className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-300 tabular-nums">{simResults.p99} ms</div>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-[#151a22] rounded border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">p99.9 Latency</div>
                    <div className="text-sm font-mono font-bold text-amber-600 dark:text-amber-300 tabular-nums">{simResults.p999} ms</div>
                  </div>
                </div>
              </div>
            )}

            {/* Architectural & Mathematical Insight */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
              <div className="text-xs font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 font-semibold">
                <BarChart2 className="w-3.5 h-3.5" /> Mechanical Sympathy Insight:
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeBenchmark.insight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
