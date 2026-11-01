import React, { useState } from 'react';
import { X, Check, Copy, Terminal, Shield, Globe, FileCode, CheckCircle2 } from 'lucide-react';

interface FirebaseDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseDeployModal: React.FC<FirebaseDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const commands = [
    {
      label: '1. Install Firebase CLI',
      cmd: 'npm install -g firebase-tools',
    },
    {
      label: '2. Authenticate with Google / Firebase',
      cmd: 'firebase login',
    },
    {
      label: '3. Build Production Distribution (Vite)',
      cmd: 'npm run build',
    },
    {
      label: '4. Deploy to Firebase Hosting',
      cmd: 'npm run deploy:firebase',
    },
  ];

  const handleCopy = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#151a22] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 text-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Firebase Hosting Deployment Hub</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Production Deployment Blueprint
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-slate-400">
            Firebase Readiness Checklist
          </h4>
          <div className="space-y-2 bg-[#0e1116] p-4 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><code>firebase.json</code> configured with public <code>dist</code> directory</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Single-Page Application (SPA) rewrites to <code>/index.html</code> enabled</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Immutable 1-year cache headers configured for <code>/assets/*</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Hardened HTTP security headers (CSP, X-Frame-Options, X-Content-Type)</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><code>.firebaserc</code> project pointer configured</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>NPM script <code>deploy:firebase</code> registered in <code>package.json</code></span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Commands */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-slate-400">
            Deployment Runbook
          </h4>
          <div className="space-y-2.5">
            {commands.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">{item.label}</div>
                <div className="flex items-center justify-between gap-3 bg-[#0e1116] border border-slate-800/90 rounded-lg px-3 py-2 text-xs font-mono">
                  <span className="text-indigo-200 select-all">{item.cmd}</span>
                  <button
                    onClick={() => handleCopy(item.cmd, idx)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors shrink-0"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Firebase Config Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-amber-400" /> Active firebase.json
            </span>
            <span>Production Spec</span>
          </div>
          <pre className="p-3 rounded-lg bg-[#0e1116] border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-36">
            <code>{`{
  "hosting": {
    "public": "dist",
    "rewrites": [{ "source": "**", "destination": "/index.html" }],
    "headers": [{ "source": "**/*.@(jpg|js|css|woff2)", "headers": [{ "key": "Cache-Control", "value": "max-age=31536000, immutable" }] }]
  }
}`}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            SSL Certificate & Global CDN automatically provisioned by Firebase Hosting.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
