'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { RiskTier } from '@/types';
import { classifySystem } from '@/lib/classifier';
import RiskBadge from '@/components/RiskBadge';

interface ClassifyResult {
  risk_tier: RiskTier;
  risk_reason: string;
  gdpr_obligations: string[];
  iso_clauses: string[];
  summary: string;
}

const tierDescriptions: Record<RiskTier, string> = {
  unacceptable: 'This system falls under prohibited practices and cannot be deployed in the EU.',
  high: 'This system requires full Chapter III compliance before deployment.',
  limited: 'This system has transparency obligations only.',
  minimal: 'No specific obligations apply. Voluntary codes of conduct are recommended.',
};

export default function ClassifyPage() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<ClassifyResult | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setResult(classifySystem(description));
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full blur-[100px] animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Compliance Mapper</Link>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-slate-400">Risk Classifier</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 text-xs font-medium text-slate-400 uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
            Instant · No API key required
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">AI System Classifier</h1>
          <p className="text-slate-400 leading-relaxed">
            Describe your AI system and instantly receive an EU AI Act risk tier, GDPR obligations, and ISO 42001 clauses — determined by keyword analysis of the EU regulatory frameworks.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden focus-within:border-slate-600 transition-colors duration-200">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. An AI system that screens CVs and ranks job applicants for HR departments at large companies, using natural language processing on uploaded resumes and personal data..."
              rows={5}
              className="w-full bg-transparent px-5 pt-5 pb-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none resize-none"
            />
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800">
              <span className="text-xs text-slate-600">{description.length} characters</span>
              <button
                type="submit"
                disabled={!description.trim()}
                className="rounded-xl px-5 py-2 text-sm font-semibold bg-white text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Classify →
              </button>
            </div>
          </div>
        </form>

        {/* Example prompts */}
        {!result && (
          <div>
            <p className="text-xs text-slate-600 mb-3 uppercase tracking-widest">Try an example</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'A chatbot for customer support that uses LLMs to answer queries about products',
                'An AI system that scores loan applications based on financial and behavioural data',
                'A real-time biometric system that identifies individuals in public spaces',
                'A spam filter that classifies incoming emails as safe or malicious',
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => { setDescription(example); setResult(null); }}
                  className="text-left rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-xs text-slate-400 hover:border-slate-600 hover:text-slate-300 transition-all duration-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-fade-up">
            {/* Risk tier */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/60 to-slate-800/20 rounded-2xl" />
              <div className="relative m-[1px] rounded-2xl bg-slate-900/80 backdrop-blur-sm overflow-hidden">
                <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500" />
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white">EU AI Act Risk Tier</h2>
                  <RiskBadge tier={result.risk_tier} />
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-slate-300 mb-2">{tierDescriptions[result.risk_tier]}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{result.risk_reason}</p>
                </div>
              </div>
            </div>

            {/* GDPR */}
            <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 className="text-sm font-semibold text-white">GDPR Obligations</h2>
              </div>
              <div className="px-5 py-4">
                <ul className="space-y-2.5">
                  {result.gdpr_obligations.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ISO 42001 */}
            <div className="rounded-2xl border border-purple-500/20 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <h2 className="text-sm font-semibold text-white">ISO 42001 Clauses</h2>
              </div>
              <div className="px-5 py-4">
                <ul className="space-y-2.5">
                  {result.iso_clauses.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Summary */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-2xl" />
              <div className="relative m-[1px] rounded-2xl bg-slate-900/90 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-2">
                  <span className="gradient-text">Summary</span>
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">{result.summary}</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 pt-1">
              Based on keyword analysis. Not legal advice — consult a qualified AI governance expert for formal compliance assessments.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => { setResult(null); setDescription(''); }}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                ← Classify another
              </button>
              <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                Explore themes →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
