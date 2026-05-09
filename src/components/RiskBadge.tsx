import type { RiskTier } from '@/types';

const config: Record<RiskTier, { label: string; className: string; dot: string }> = {
  unacceptable: {
    label: 'Prohibited',
    className: 'border-red-500/40 bg-red-500/10 text-red-300',
    dot: 'bg-red-400',
  },
  high: {
    label: 'High risk',
    className: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    dot: 'bg-amber-400',
  },
  limited: {
    label: 'Limited risk',
    className: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    dot: 'bg-blue-400',
  },
  minimal: {
    label: 'Minimal risk',
    className: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    dot: 'bg-emerald-400',
  },
};

interface Props {
  tier: RiskTier;
}

export default function RiskBadge({ tier }: Props) {
  const { label, className, dot } = config[tier];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border text-sm font-semibold px-3 py-1 ${className}`}>
      <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
      {label}
    </span>
  );
}
