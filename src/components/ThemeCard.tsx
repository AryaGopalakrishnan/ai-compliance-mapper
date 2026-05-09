import Link from 'next/link';
import type { Theme, Framework } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  'ti-shield-check': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  'ti-eye': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  'ti-user-check': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  'ti-database': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  'ti-file-text': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  'ti-alert-triangle': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  ),
  'ti-cpu': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
    </svg>
  ),
  'ti-scale': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
    </svg>
  ),
};

const frameworkDots: Record<Framework, string> = {
  eu_ai_act: 'bg-blue-500',
  gdpr: 'bg-emerald-500',
  iso_42001: 'bg-purple-500',
};

const frameworkLabels: Record<Framework, string> = {
  eu_ai_act: 'EU AI Act',
  gdpr: 'GDPR',
  iso_42001: 'ISO 42001',
};

const tagLabels: Record<string, string> = {
  always_applicable: 'Always',
  high_risk_system: 'High-risk',
  personal_data: 'Personal data',
  automated_decisions: 'Automated decisions',
  always: 'Always',
  societal_impact: 'Societal impact',
};

interface Props {
  theme: Theme;
  dimmed: boolean;
  index: number;
}

export default function ThemeCard({ theme, dimmed, index }: Props) {
  const frameworks = theme.mappings.map((m) => m.framework) as Framework[];

  return (
    <Link
      href={`/themes/${theme.id}`}
      className={`group relative block rounded-2xl transition-all duration-300 ${
        dimmed ? 'opacity-20 pointer-events-none scale-95' : 'opacity-100 hover:scale-[1.02] hover:-translate-y-1'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Gradient border wrapper */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/50 via-slate-800/30 to-slate-700/50 group-hover:from-blue-500/30 group-hover:via-purple-500/20 group-hover:to-teal-500/30 transition-all duration-300" />

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 40px rgba(99,102,241,0.12), 0 0 80px rgba(99,102,241,0.06)' }}
      />

      {/* Card body */}
      <div className="relative m-[1px] rounded-2xl bg-slate-900/80 backdrop-blur-sm p-5 h-full flex flex-col">
        {/* Icon + arrow */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-slate-600 transition-colors duration-200">
            {iconMap[theme.icon]}
          </div>
          <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>

        {/* Label + description */}
        <h3 className="font-semibold text-white mb-1.5 group-hover:text-blue-100 transition-colors">{theme.label}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{theme.description}</p>

        {/* Framework dots */}
        <div className="flex items-center gap-2 mb-3">
          {frameworks.map((fw) => (
            <span key={fw} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className={`w-1.5 h-1.5 rounded-full ${frameworkDots[fw]}`} />
              {frameworkLabels[fw]}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {theme.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700/50">
              {tagLabels[tag] ?? tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
