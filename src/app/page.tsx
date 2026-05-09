'use client';

import { useState, useMemo } from 'react';
import { getAllThemes } from '@/lib/knowledge-base';
import type { FilterTag } from '@/types';
import ThemeCard from '@/components/ThemeCard';
import FilterBar from '@/components/FilterBar';

const themes = getAllThemes();

export default function HomePage() {
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([]);

  const displayedThemes = useMemo(() => {
    if (activeFilters.length === 0) return themes.map((t) => ({ theme: t, dimmed: false }));
    return themes.map((theme) => {
      const matches = activeFilters.some((filter) => {
        if (filter === 'always_applicable') {
          return theme.tags.includes('always_applicable') || theme.tags.includes('always' as FilterTag);
        }
        return theme.tags.includes(filter);
      });
      return { theme, dimmed: !matches };
    });
  }, [activeFilters]);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] animate-float-slow animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', animationDelay: '2s', animation: 'float-slow 13s ease-in-out infinite 1s, pulse-glow 5s ease-in-out infinite 1s' }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)', animationDelay: '4s' }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm text-xs font-medium text-slate-400 uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            AI Governance · Compliance Intelligence
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
            <span className="text-white">Cross-Framework</span>
            <br />
            <span className="gradient-text">Compliance Mapper</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Navigate EU AI Act, GDPR, and ISO 42001 obligations simultaneously. See where they align, where they diverge, and exactly what to do in practice.
          </p>

          {/* Framework pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { label: 'EU AI Act', dot: 'bg-blue-500', ring: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
              { label: 'GDPR', dot: 'bg-emerald-500', ring: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
              { label: 'ISO 42001', dot: 'bg-purple-500', ring: 'border-purple-500/30 bg-purple-500/10 text-purple-300' },
            ].map(({ label, dot, ring }) => (
              <span key={label} className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium ${ring}`}>
                <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
                {label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/classify"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
            Classify your AI system
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-slate-800/60 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-3 gap-4">
          {[
            { value: '8', label: 'Compliance themes' },
            { value: '3', label: 'Frameworks mapped' },
            { value: '24', label: 'Obligations cross-referenced' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold gradient-text">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Themes grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Explore themes</h2>
        </div>

        <div className="mb-8">
          <FilterBar active={activeFilters} onChange={setActiveFilters} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedThemes.map(({ theme, dimmed }, i) => (
            <ThemeCard key={theme.id} theme={theme} dimmed={dimmed} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            EU AI Act — Reg. (EU) 2024/1689 · GDPR — Reg. (EU) 2016/679 · ISO/IEC 42001:2023
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-700">Not legal advice. For informational purposes only.</p>
            <a
              href="https://aryagopalakrishnan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-white transition-colors duration-150"
            >
              @aryagopalakrishnan
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
