import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getThemeById, getAllThemes } from '@/lib/knowledge-base';
import MappingPanel from '@/components/MappingPanel';
import CrossmapNote from '@/components/CrossmapNote';
import type { Framework } from '@/types';

export function generateStaticParams() {
  return getAllThemes().map((t) => ({ id: t.id }));
}

const frameworkOrder: Framework[] = ['eu_ai_act', 'gdpr', 'iso_42001', 'nist_ai_rmf'];

const frameworkLabels: Record<Framework, { label: string; sub: string; color: string }> = {
  eu_ai_act:   { label: 'EU AI Act',    sub: 'Reg. (EU) 2024/1689',  color: 'text-blue-400' },
  gdpr:        { label: 'GDPR',         sub: 'Reg. (EU) 2016/679',   color: 'text-emerald-400' },
  iso_42001:   { label: 'ISO 42001',    sub: 'ISO/IEC 42001:2023',   color: 'text-purple-400' },
  nist_ai_rmf: { label: 'NIST AI RMF', sub: 'NIST AI 100-1 (2023)', color: 'text-amber-400' },
};

const iconMap: Record<string, React.ReactNode> = {
  'ti-shield-check': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  'ti-eye': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  'ti-user-check': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  'ti-database': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  'ti-file-text': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  'ti-alert-triangle': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  ),
  'ti-cpu': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
    </svg>
  ),
  'ti-scale': (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
    </svg>
  ),
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ThemeDetailPage({ params }: Props) {
  const { id } = await params;
  const theme = getThemeById(id);
  if (!theme) notFound();

  const orderedMappings = frameworkOrder
    .map((fw) => theme.mappings.find((m) => m.framework === fw))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Hero header */}
      <section className="relative overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] animate-pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)', animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-8">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            All themes
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 flex-shrink-0">
              {iconMap[theme.icon]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{theme.label}</h1>
              <p className="text-slate-400 leading-relaxed max-w-2xl">{theme.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Cross-framework insight — surfaced first */}
        <CrossmapNote note={theme.crossmap_note} />

        {/* Framework column headers */}
        <div>
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-3">
            {frameworkOrder.map((fw) => {
              const { label, sub, color } = frameworkLabels[fw];
              return (
                <div key={fw} className="px-1">
                  <p className={`text-sm font-semibold ${color}`}>{label}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{sub}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orderedMappings.map((mapping) =>
              mapping ? <MappingPanel key={mapping.framework} mapping={mapping} /> : null
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
