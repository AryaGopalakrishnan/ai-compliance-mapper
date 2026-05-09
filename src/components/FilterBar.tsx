'use client';

import type { FilterTag } from '@/types';

const filters: { id: FilterTag; label: string; color: string; activeColor: string }[] = [
  { id: 'high_risk_system', label: 'High-risk system', color: 'border-slate-700 text-slate-400 hover:border-amber-500/40 hover:text-amber-300', activeColor: 'border-amber-500/60 bg-amber-500/10 text-amber-300' },
  { id: 'personal_data', label: 'Personal data', color: 'border-slate-700 text-slate-400 hover:border-teal-500/40 hover:text-teal-300', activeColor: 'border-teal-500/60 bg-teal-500/10 text-teal-300' },
  { id: 'automated_decisions', label: 'Automated decisions', color: 'border-slate-700 text-slate-400 hover:border-blue-500/40 hover:text-blue-300', activeColor: 'border-blue-500/60 bg-blue-500/10 text-blue-300' },
  { id: 'always_applicable', label: 'Always applicable', color: 'border-slate-700 text-slate-400 hover:border-purple-500/40 hover:text-purple-300', activeColor: 'border-purple-500/60 bg-purple-500/10 text-purple-300' },
];

interface Props {
  active: FilterTag[];
  onChange: (filters: FilterTag[]) => void;
}

export default function FilterBar({ active, onChange }: Props) {
  function toggle(id: FilterTag) {
    onChange(active.includes(id) ? active.filter((f) => f !== id) : [...active, id]);
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {filters.map(({ id, label, color, activeColor }) => {
        const isActive = active.includes(id);
        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border backdrop-blur-sm transition-all duration-200 ${
              isActive ? activeColor : color
            }`}
          >
            {label}
          </button>
        );
      })}
      {active.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="rounded-full px-3 py-1.5 text-sm text-slate-600 hover:text-slate-400 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
