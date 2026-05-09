import type { Mapping, Framework } from '@/types';
import FrameworkBadge from './FrameworkBadge';
import EnforcementBadge from './EnforcementBadge';

const frameworkStyles: Record<Framework, {
  border: string;
  topBar: string;
  bg: string;
  actionBg: string;
  actionBorder: string;
  actionText: string;
  glow: string;
}> = {
  eu_ai_act: {
    border: 'border-blue-500/25 hover:border-blue-500/50',
    topBar: 'from-blue-600 to-blue-400',
    bg: 'bg-[#030d1a]/80',
    actionBg: 'bg-blue-950/40',
    actionBorder: 'border-blue-500/20',
    actionText: 'text-blue-200',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]',
  },
  gdpr: {
    border: 'border-emerald-500/25 hover:border-emerald-500/50',
    topBar: 'from-emerald-600 to-teal-400',
    bg: 'bg-[#030f0d]/80',
    actionBg: 'bg-emerald-950/40',
    actionBorder: 'border-emerald-500/20',
    actionText: 'text-emerald-200',
    glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]',
  },
  iso_42001: {
    border: 'border-purple-500/25 hover:border-purple-500/50',
    topBar: 'from-purple-600 to-violet-400',
    bg: 'bg-[#0a030f]/80',
    actionBg: 'bg-purple-950/40',
    actionBorder: 'border-purple-500/20',
    actionText: 'text-purple-200',
    glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]',
  },
};

interface Props {
  mapping: Mapping;
}

export default function MappingPanel({ mapping }: Props) {
  const s = frameworkStyles[mapping.framework];

  return (
    <div className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden flex flex-col transition-all duration-300 ${s.border} ${s.bg} ${s.glow}`}>
      {/* Gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${s.topBar} flex-shrink-0`} />

      {/* Header */}
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-white/5">
        <FrameworkBadge framework={mapping.framework} size="md" />
        <EnforcementBadge date={mapping.enforcement_date} />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-5 flex-1">
        {/* Ref + title */}
        <div>
          <span className="text-[10px] font-mono tracking-widest text-slate-600 uppercase">{mapping.ref}</span>
          <h3 className="mt-1 text-base font-semibold text-white leading-snug">{mapping.title}</h3>
        </div>

        {/* Obligation */}
        <div className="flex-1">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Obligation</p>
          <p className="text-sm text-slate-400 leading-relaxed">{mapping.obligation}</p>
        </div>

        {/* Action — visually elevated */}
        <div className={`rounded-xl border p-4 ${s.actionBg} ${s.actionBorder}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5 ${s.actionText}`}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            What to do
          </p>
          <p className={`text-sm font-medium leading-relaxed ${s.actionText}`}>{mapping.action}</p>
        </div>
      </div>
    </div>
  );
}
