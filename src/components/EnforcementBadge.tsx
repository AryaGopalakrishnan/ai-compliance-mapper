interface Props {
  date: string;
}

export default function EnforcementBadge({ date }: Props) {
  const isInForce =
    date === 'In force' ||
    date.toLowerCase().includes('in force') ||
    date.toLowerCase().includes('voluntary');

  let isUpcoming = false;
  if (!isInForce && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    isUpcoming = new Date(date) > new Date();
  }

  if (isInForce) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
        {date}
      </span>
    );
  }

  if (isUpcoming) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full px-2.5 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
        {date}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700 rounded-full px-2.5 py-0.5">
      {date}
    </span>
  );
}
