'use client';

import { useState } from 'react';
import { mindMaps } from '@/data/mindmap-data';
import MindMapView from '@/components/MindMapView';

const TAB_STYLES: Record<string, { active: string; inactive: string; dot: string }> = {
  eu_ai_act: {
    active:   'border-blue-500/60 bg-blue-500/10 text-blue-300',
    inactive: 'border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600',
    dot: 'bg-blue-500',
  },
  gdpr: {
    active:   'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
    inactive: 'border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600',
    dot: 'bg-emerald-500',
  },
  iso_42001: {
    active:   'border-purple-500/60 bg-purple-500/10 text-purple-300',
    inactive: 'border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600',
    dot: 'bg-purple-500',
  },
  nist_ai_rmf: {
    active:   'border-amber-500/60 bg-amber-500/10 text-amber-300',
    inactive: 'border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600',
    dot: 'bg-amber-500',
  },
};

// Meaningful headline stats per framework
const HEADLINE: Record<string, Array<{ v: string; l: string }>> = {
  eu_ai_act:   [{ v: 'Aug 2026', l: 'Key deadline' }, { v: '€35M / 7%', l: 'Max penalty' }],
  gdpr:        [{ v: '72 hours', l: 'Breach window' }, { v: '€20M / 4%', l: 'Max penalty' }],
  iso_42001:   [{ v: '38',       l: 'Annex A controls' }, { v: '9', l: 'Control domains' }],
  nist_ai_rmf: [{ v: '4',        l: 'Core functions' }, { v: 'Jan 2023', l: 'Published' }],
};

export default function MindMapPage() {
  const [activeId, setActiveId] = useState('eu_ai_act');
  const active = mindMaps.find((m) => m.id === activeId)!;
  const c = active.primaryColor;

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-10 sm:px-6">
        {/* Orbs — keyed so they fade in on tab switch */}
        <div
          key={activeId}
          className="absolute inset-0 pointer-events-none"
          style={{ animation: 'node-appear 0.6s ease-out both' }}
        >
          <div
            className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-glow"
            style={{ background: `radial-gradient(circle, ${c}25 0%, transparent 70%)` }}
          />
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse-glow"
            style={{ background: `radial-gradient(circle, ${c}18 0%, transparent 70%)`, animationDelay: '2s' }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm text-xs font-medium text-slate-400 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Interactive Mind Maps
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 leading-tight">
            <span className="text-white">Understand the</span>{' '}
            <span className="gradient-text">Frameworks</span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            Explore the key concepts of EU AI Act, GDPR, and ISO 42001. Click any node to understand its role and why it matters.
          </p>
        </div>
      </section>

      {/* ── Tab switcher ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex gap-2 flex-wrap">
          {mindMaps.map((m) => {
            const s = TAB_STYLES[m.id];
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                  isActive ? s.active : s.inactive
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${s.dot} transition-opacity duration-300 ${isActive ? '' : 'opacity-40'}`} />
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Framework content (keyed for fade-in on tab switch) ───────────────── */}
      <div
        key={activeId}
        className="max-w-5xl mx-auto px-4 sm:px-6"
        style={{ animation: 'fade-up 0.35s ease-out both' }}
      >

        {/* Framework header */}
        <div
          className="rounded-2xl border px-5 py-4 flex items-center gap-4 mb-6 transition-colors duration-500"
          style={{ background: `${c}0a`, borderColor: `${c}28` }}
        >
          {/* Icon dot */}
          <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${c}22` }}>
            <span className="w-3 h-3 rounded-full" style={{ background: c }} />
          </div>

          {/* Name + tagline */}
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm">{active.name}</p>
            <p className="text-slate-400 text-xs mt-0.5 truncate">{active.tagline}</p>
          </div>

          {/* Headline stats — meaningful, not branch counts */}
          <div className="ml-auto hidden sm:flex items-center gap-5">
            {HEADLINE[activeId]?.map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="text-base font-bold leading-tight" style={{ color: c }}>{v}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mind map container with framework-coloured glow */}
        <div
          className="rounded-2xl border p-4 sm:p-6 mb-5"
          style={{
            background: 'rgba(15,23,42,0.5)',
            backdropFilter: 'blur(12px)',
            borderColor: `${c}18`,
            boxShadow: `0 0 70px ${c}10`,
            transition: 'box-shadow 0.6s ease, border-color 0.6s ease',
          }}
        >
          <MindMapView key={`mm-${activeId}`} def={active} />
        </div>

        {/* Legend */}
        <div className="pb-16 flex flex-wrap items-center gap-5 text-xs text-slate-500">
          {[
            { r: 12, label: 'Framework root' },
            { r: 9,  label: 'Main concept'   },
            { r: 6,  label: 'Sub-concept'    },
          ].map(({ r, label }) => (
            <div key={label} className="flex items-center gap-2">
              <svg width={r * 2 + 2} height={r * 2 + 2} className="flex-shrink-0">
                <circle
                  cx={r + 1} cy={r + 1} r={r}
                  fill={c} fillOpacity={r === 12 ? 0.8 : r === 9 ? 0.25 : 0.12}
                  stroke={c} strokeWidth={r === 12 ? 0 : 1.2} strokeOpacity="0.65"
                />
              </svg>
              <span>{label}</span>
            </div>
          ))}
          <span className="ml-auto text-slate-600 hidden sm:block">Click any node for details</span>
        </div>
      </div>

    </main>
  );
}
