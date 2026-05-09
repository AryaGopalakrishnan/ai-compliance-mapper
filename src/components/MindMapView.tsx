'use client';

import { useState, useMemo } from 'react';
import type { MindMapDef, MindMapNode } from '@/data/mindmap-data';

// ── Layout types ────────────────────────────────────────────────────────────

interface LayoutNode {
  node: MindMapNode;
  x: number;
  y: number;
  depth: number;
  angle: number;
  px: number;
  py: number;
}

// ── Branch icons (Heroicons outline, 24×24 viewBox) ─────────────────────────

const BRANCH_ICONS: Record<string, string> = {
  // EU AI Act
  eua_risk:       'M9 12.75L11.25 15 15 9.75M12 3L3 8v5c0 5.2 3.9 10.1 9 11 5.1-.9 9-5.8 9-11V8L12 3z',
  eua_prohibited: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
  eua_duties:     'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0a2 2 0 014 0M9 12h6m-6 4h4',
  eua_gpai:       'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0H5a2 2 0 01-2-2V9m14 12h4a2 2 0 002-2V9m-18 0h18',
  eua_gov:        'M3 21h18M3 7l9-4 9 4M4 11v10h6v-6h4v6h6V11',
  eua_time:       'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  // GDPR
  gdpr_principles:'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2zM9 9h6m-6 4h6m-6 4h4',
  gdpr_rights:    'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  gdpr_basis:     'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.169.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z',
  gdpr_controller:'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  gdpr_breach:    'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
  gdpr_transfers: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0-18c2.761 0 4.5 4.03 4.5 9s-1.739 9-4.5 9-4.5-4.03-4.5-9 1.739-9 4.5-9zM3.055 11H5.5m13 0h2.445M12 3.055v2.083m0 13.724v2.083',
  gdpr_ai:        'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z',
  // ISO 42001
  iso_context:    'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  iso_leadership: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  iso_planning:   'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  iso_operations: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  iso_annex:      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  iso_improvement:'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
};

// ── Framework headline stats for empty state ─────────────────────────────────

const FRAMEWORK_STATS: Record<string, [string, string, string, string]> = {
  eu_ai_act:  ['Key deadline', 'Aug 2026',  'Max penalty', '€35M / 7%'],
  gdpr:       ['Breach window', '72 hours', 'Max penalty', '€20M / 4%'],
  iso_42001:  ['Annex A controls', '38',    'Control domains', '9'],
};

// ── Radial layout ───────────────────────────────────────────────────────────

const R1 = 170;
const R2 = 320;

function buildLayout(root: MindMapNode): LayoutNode[] {
  const nodes: LayoutNode[] = [
    { node: root, x: 0, y: 0, depth: 0, angle: 0, px: 0, py: 0 },
  ];
  if (!root.children?.length) return nodes;

  const n1 = root.children.length;
  root.children.forEach((child, i) => {
    const a = (i / n1) * 2 * Math.PI - Math.PI / 2;
    const x = R1 * Math.cos(a);
    const y = R1 * Math.sin(a);
    nodes.push({ node: child, x, y, depth: 1, angle: a, px: 0, py: 0 });

    if (!child.children?.length) return;
    const n2 = child.children.length;
    const sector = (2 * Math.PI / n1) * 0.82;
    child.children.forEach((gc, j) => {
      const ca = n2 === 1 ? a : a - sector / 2 + (j / (n2 - 1)) * sector;
      nodes.push({ node: gc, x: R2 * Math.cos(ca), y: R2 * Math.sin(ca), depth: 2, angle: ca, px: x, py: y });
    });
  });
  return nodes;
}

// ── Curved path ─────────────────────────────────────────────────────────────

function arc(px: number, py: number, cx: number, cy: number): string {
  const pm = Math.hypot(px, py);
  const cm = Math.hypot(cx, cy);
  if (pm < 5) return `M 0 0 Q ${cx * 0.42} ${cy * 0.42} ${cx} ${cy}`;
  const t = Math.min(pm, cm) * 0.44;
  return `M ${px} ${py} C ${px + (px / pm) * t} ${py + (py / pm) * t} ${cx - (cx / cm) * t} ${cy - (cy / cm) * t} ${cx} ${cy}`;
}

// ── Label wrapping ───────────────────────────────────────────────────────────

function wrapLabel(text: string, maxLen: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && next.length > maxLen) { lines.push(cur); cur = w; }
    else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── Constants ────────────────────────────────────────────────────────────────

const NODE_R = [48, 30, 18] as const;
const LABEL_GAP = 12;
const LINE_H = 13;

// ── Shared panel content ─────────────────────────────────────────────────────

function PanelContent({
  selected, onClose, color,
}: {
  selected: MindMapNode;
  onClose: () => void;
  color: string;
}) {
  return (
    <>
      <div className="flex items-start justify-between mb-3 gap-3">
        <h3 className="text-white font-semibold text-base leading-snug">{selected.label}</h3>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors flex-shrink-0 mt-0.5"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed mb-4">{selected.description}</p>
      <div className="rounded-xl p-3.5" style={{ background: `${color}12`, border: `1px solid ${color}28` }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color }}>
          Why it matters
        </p>
        <p className="text-slate-300 leading-relaxed text-sm">{selected.importance}</p>
      </div>
    </>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props { def: MindMapDef; }

export default function MindMapView({ def }: Props) {
  const [selected, setSelected] = useState<MindMapNode | null>(null);
  const nodes = useMemo(() => buildLayout(def.root), [def]);
  const c = def.primaryColor;
  const [s1l, s1v, s2l, s2v] = FRAMEWORK_STATS[def.id] ?? ['', '', '', ''];

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full items-start">

      {/* ── SVG canvas ─────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <p className="sm:hidden text-xs text-slate-600 text-center mb-2">Swipe to explore the full map</p>
        <div className="overflow-x-auto">
          <div className="min-w-[700px] lg:min-w-0">
            <svg
              viewBox="-520 -500 1040 1000"
              style={{
                display: 'block',
                width: '100%',
                maxHeight: '68vh',
                maxWidth: 'calc(68vh * 1040 / 1000)',
              }}
              aria-label={`${def.name} mind map`}
            >
              <defs>
                <radialGradient id={`rg-${def.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={c} stopOpacity="1" />
                  <stop offset="100%" stopColor={c} stopOpacity="0.5" />
                </radialGradient>
                <filter id={`glow-${def.id}`} x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Edges */}
              <g>
                {nodes.filter((n) => n.depth > 0).map((n) => (
                  <path
                    key={`edge-${n.node.id}`}
                    d={arc(n.px, n.py, n.x, n.y)}
                    fill="none"
                    stroke={c}
                    strokeWidth={n.depth === 1 ? 2.5 : 1.5}
                    strokeOpacity={n.depth === 1 ? 0.5 : 0.25}
                    strokeLinecap="round"
                  />
                ))}
              </g>

              {/* Nodes */}
              {nodes.map((n, i) => {
                const r = NODE_R[n.depth];
                const isRoot = n.depth === 0;
                const isSelected = selected?.id === n.node.id;
                const cosA = Math.cos(n.angle);
                const sinA = Math.sin(n.angle);
                const labelOffset = r + LABEL_GAP;

                let lx: number, ly: number, anchor: 'middle' | 'start' | 'end';
                if (isRoot) {
                  lx = 0; ly = 0; anchor = 'middle';
                } else if (Math.abs(cosA) > 0.38) {
                  lx = n.x + (cosA > 0 ? labelOffset : -labelOffset);
                  ly = n.y;
                  anchor = cosA > 0 ? 'start' : 'end';
                } else {
                  lx = n.x;
                  ly = n.y + (sinA > 0 ? labelOffset : -labelOffset);
                  anchor = 'middle';
                }

                const maxChars = isRoot ? 10 : n.depth === 1 ? 15 : 13;
                const lines = wrapLabel(n.node.label, maxChars);
                const blockH = lines.length * LINE_H;
                const textStartY = isRoot
                  ? -(blockH / 2) + LINE_H * 0.8
                  : Math.abs(cosA) > 0.38
                  ? ly - blockH / 2 + LINE_H * 0.8
                  : sinA > 0
                  ? ly + LINE_H * 0.8
                  : ly - blockH + LINE_H * 0.2;

                const icon = n.depth === 1 ? BRANCH_ICONS[n.node.id] : null;
                const delay = i * 30;

                return (
                  <g
                    key={n.node.id}
                    onClick={() => setSelected(isSelected ? null : n.node)}
                    style={{ cursor: 'pointer', animation: `node-appear 0.4s ease-out ${delay}ms both` }}
                  >
                    {/* Pulse beacon on root when nothing selected */}
                    {isRoot && !selected && (
                      <circle
                        cx={0} cy={0} r={r + 16}
                        fill="none" stroke={c} strokeWidth="1.5"
                        style={{
                          transformBox: 'fill-box' as React.CSSProperties['transformBox'],
                          transformOrigin: 'center',
                          animation: 'pulse-ring 2.5s ease-out infinite',
                        }}
                      />
                    )}

                    {/* Selection glow */}
                    {isSelected && (
                      <circle
                        cx={n.x} cy={n.y} r={r + 10}
                        fill={c} fillOpacity="0.14"
                        stroke={c} strokeWidth="1.5" strokeOpacity="0.7"
                        filter={`url(#glow-${def.id})`}
                      />
                    )}

                    {/* Main circle */}
                    <circle
                      cx={n.x} cy={n.y} r={r}
                      fill={isRoot ? `url(#rg-${def.id})` : c}
                      fillOpacity={isRoot ? 1 : n.depth === 1 ? 0.2 : 0.1}
                      stroke={c}
                      strokeWidth={isRoot ? 0 : n.depth === 1 ? 2 : 1}
                      strokeOpacity={isSelected ? 1 : n.depth === 1 ? 0.8 : 0.55}
                    />

                    {/* Branch icon (L1 only) */}
                    {icon && (
                      <g
                        transform={`translate(${n.x}, ${n.y}) scale(0.5)`}
                        style={{ pointerEvents: 'none' }}
                      >
                        <g transform="translate(-12,-12)">
                          <path
                            d={icon}
                            fill="none"
                            stroke={isSelected ? 'white' : c}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity={isSelected ? 1 : 0.9}
                          />
                        </g>
                      </g>
                    )}

                    {/* Hit target */}
                    <circle cx={n.x} cy={n.y} r={r + 6} fill="transparent" stroke="none" />

                    {/* Label — hidden for L1 nodes that have an icon (icon is the label) */}
                    {!(n.depth === 1 && icon) && (
                      <text
                        x={isRoot ? 0 : lx}
                        y={textStartY}
                        textAnchor={anchor}
                        fontSize={isRoot ? 13 : n.depth === 1 ? 11 : 10}
                        fontWeight={isRoot ? 700 : n.depth === 1 ? 600 : 500}
                        fill={isRoot ? 'white' : n.depth === 1 ? 'white' : 'rgba(255,255,255,0.82)'}
                        style={{ userSelect: 'none', pointerEvents: 'none' }}
                      >
                        {lines.map((line, li) => (
                          <tspan key={li} x={isRoot ? 0 : lx} dy={li === 0 ? 0 : LINE_H}>{line}</tspan>
                        ))}
                      </text>
                    )}

                    {/* L1 label always shown below icon */}
                    {n.depth === 1 && icon && (
                      <text
                        x={lx}
                        y={textStartY}
                        textAnchor={anchor}
                        fontSize={11}
                        fontWeight={600}
                        fill="white"
                        style={{ userSelect: 'none', pointerEvents: 'none' }}
                      >
                        {lines.map((line, li) => (
                          <tspan key={li} x={lx} dy={li === 0 ? 0 : LINE_H}>{line}</tspan>
                        ))}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ── Desktop sidebar panel ───────────────────────────────────────────── */}
      <div className="hidden lg:block lg:w-[300px] lg:flex-shrink-0">
        {selected ? (
          <div
            className="rounded-2xl p-5 border overflow-y-auto"
            style={{
              background: 'rgba(15,23,42,0.75)',
              backdropFilter: 'blur(12px)',
              borderColor: `${c}30`,
              animation: 'fade-up 0.25s ease-out both',
              maxHeight: '62vh',
            }}
          >
            <PanelContent selected={selected} onClose={() => setSelected(null)} color={c} />
          </div>
        ) : (
          <div
            className="rounded-2xl p-6 border border-slate-800/40 flex flex-col items-start gap-4"
            style={{ background: 'rgba(15,23,42,0.4)' }}
          >
            {/* Framework headline stats */}
            <div className="w-full grid grid-cols-2 gap-3">
              {[[s1l, s1v], [s2l, s2v]].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl p-3"
                  style={{ background: `${c}10`, border: `1px solid ${c}20` }}
                >
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="font-bold text-sm" style={{ color: c }}>{value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2.5 mt-1">
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: `${c}18` }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                </svg>
              </div>
              <p className="text-slate-500 text-xs leading-snug">
                Click any node to read its definition and why it matters
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile bottom sheet ─────────────────────────────────────────────── */}
      {selected && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          {/* Sheet */}
          <div
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-x overflow-y-auto"
            style={{
              background: 'rgba(8,15,30,0.97)',
              borderColor: `${c}30`,
              animation: 'slide-up 0.3s ease-out both',
              maxHeight: '72vh',
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-700" />
            </div>
            <div className="p-5">
              <PanelContent selected={selected} onClose={() => setSelected(null)} color={c} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
