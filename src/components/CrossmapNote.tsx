interface Props {
  note: string;
}

export default function CrossmapNote({ note }: Props) {
  return (
    <div className="relative mt-8 rounded-2xl overflow-hidden">
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-teal-500/30 rounded-2xl" />
      <div className="relative m-[1px] rounded-2xl bg-slate-900/90 backdrop-blur-sm p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-slate-700/60 flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2">
              <span className="gradient-text">Cross-framework insight</span>
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
