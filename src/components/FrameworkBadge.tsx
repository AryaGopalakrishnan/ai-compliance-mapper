import type { Framework } from '@/types';

const config: Record<Framework, { label: string; className: string }> = {
  eu_ai_act: {
    label: 'EU AI Act',
    className: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  },
  gdpr: {
    label: 'GDPR',
    className: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  },
  iso_42001: {
    label: 'ISO 42001',
    className: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
  },
  nist_ai_rmf: {
    label: 'NIST AI RMF',
    className: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  },
};

interface Props {
  framework: Framework;
  size?: 'sm' | 'md';
}

export default function FrameworkBadge({ framework, size = 'sm' }: Props) {
  const { label, className } = config[framework];
  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1 font-semibold';
  return (
    <span className={`inline-block rounded-full border font-medium ${sizeClass} ${className}`}>
      {label}
    </span>
  );
}
