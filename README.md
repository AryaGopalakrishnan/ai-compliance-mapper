# AI Compliance Mapper

> Cross-framework GRC tool mapping EU AI Act, GDPR, and ISO 42001 obligations simultaneously — with interactive mind maps and an AI system risk classifier.

**Live:** https://ai-compliance-mapper.vercel.app

---

## What it does

Most organisations navigating AI regulation face three overlapping frameworks at once: the **EU AI Act** (Reg. 2024/1689), **GDPR** (Reg. 2016/679), and **ISO/IEC 42001:2023**. Compliance teams typically run these as three separate workstreams, duplicating effort and missing cross-framework obligations.

This tool maps all three simultaneously — showing where they align, where they diverge, and exactly what to do in practice.

---

## Features

### Interactive Mind Maps
Radial mind maps for each framework covering 97 compliance concepts. Click any node to see a plain-English definition and why it matters. Concepts include cross-framework overlap annotations — for example, the GDPR Art. 22 and EU AI Act Art. 14 human-oversight requirements are flagged as the same obligation in different legislative clothing.

### AI System Risk Classifier
Describe an AI system in plain text and get an instant risk-tier assessment under the EU AI Act (Unacceptable / High / Limited / Minimal), with the GDPR obligations and ISO 42001 clauses that apply.

### Cross-Framework Compliance Themes
Eight compliance themes (risk management, transparency, human oversight, data governance, etc.) mapped across all three frameworks — showing the article references, enforcement dates, and practical actions for each.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Visualisation | Pure SVG — no D3 or chart libraries |
| Data | Compiled from EU AI Act, GDPR, and ISO 42001 Lead Implementer training materials |
| Deployment | Vercel (Hobby — free) |

No external APIs. No environment variables. Entirely client-side.

---

## Run locally

```bash
git clone https://github.com/aryagopalakrishnan/ai-compliance-mapper.git
cd ai-compliance-mapper
npm install
npm run dev
```

Open http://localhost:3000

---

## Routes

| Route | Description |
|---|---|
| `/` | Cross-framework compliance themes with filter by obligation type |
| `/mindmap` | Interactive mind maps — EU AI Act, GDPR, ISO 42001 |
| `/classify` | AI system risk classifier |
| `/themes/[id]` | Deep-dive on a single compliance theme |

---

## Data sources

- EU AI Act — Regulation (EU) 2024/1689 (full legislative text)
- GDPR — Regulation (EU) 2016/679 (full legislative text)
- ISO/IEC 42001:2023 — AI Management Systems standard (PECB Lead Implementer training materials)

---

*Not legal advice. For informational and educational purposes only.*
