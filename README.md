# Industry Navigator AI

**A concept demo of a Gen AI sustainability-profiling workflow for enterprise account managers.**

Pick a company → watch a multi-agent research pipeline run → read a structured sustainability brief that maps every challenge to a sellable solution, with its financial case attached.

🔗 **[Live demo](https://industry-navigator-ai-main.vercel.app)**

> **Note:** this is a self-initiated design and product concept. The Orange Business branding is used illustratively to make the demo concrete — the project is not affiliated with, commissioned by, or endorsed by Orange Business.

---

## The problem it models

An enterprise account manager walking into a sustainability conversation has two things missing: a credible read on what the client's actual environmental challenges are, and a fast translation of those challenges into things their company can sell. Usually that gap is filled by a week of desk research and a deck.

This demo compresses that into one screen. The user searches a company; the interface shows a research pipeline working; the output is a brief structured the way a rep actually needs it — challenge, mapped solution, impact score, contract value, key contacts, next steps.

---

## The flow

| Screen | What happens |
|---|---|
| **Search** | Entry point — pick or type a company |
| **Pipeline** | A staged multi-agent research run, visualised step by step |
| **Brief** | The output: challenges → mapped solutions → impact scores → financial case → export hooks |
| **Solution detail** | Drill into one solution: overview, financial case by year, ESG case, selling points, next steps |
| **Dashboard** | Portfolio view across accounts — contract value totals, CO₂ aggregate, comparison chart |
| **Architecture** | The system diagram behind the concept |

**Ten companies are fully profiled** — Renault, Carrefour, Stellantis, TotalEnergies, Saint-Gobain, Schneider Electric, Veolia, Air France-KLM, Danone and L'Oréal — each with its own challenges, solution mapping, benchmarks, contacts and financial blocks.

---

## Design system

The UI is deliberately dense — built for a sales rep who lives in it, not for a marketing page.

- **Always dark.** Pure black canvas (`hsl(0 0% 0%)`), no light-mode toggle.
- **Frosted glass surfaces** layered over the black — four utility tiers (`glass-nav`, `glass-panel`, `glass-panel-strong`, `glass-inset`) rather than ad-hoc card styles.
- **One chromatic accent.** Orange `#FF6900` on a zinc/slate neutral base. Nothing else in the chrome carries colour, so anything orange is unambiguously interactive or important.
- **Typography scale as utility classes** — `type-eyebrow`, `type-section-label`, `type-prose`, `type-ui` — so density stays consistent across screens instead of drifting per-component.
- **CSS keyframes only** for motion; no animation library.

The full rationale, colour roles and type scale live in [`DESIGN.md`](DESIGN.md).

---

## Stack

| Layer | Choice |
|---|---|
| Build | Vite 5 (`@vitejs/plugin-react-swc`) |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS 3.4 + `tailwindcss-animate` |
| Components | shadcn/ui pattern over Radix UI primitives |
| Charts | Recharts |
| Icons | lucide-react |
| Server state | TanStack Query |
| Forms | react-hook-form + zod |
| Backend (scaffold) | Supabase client wired, not yet queried |

---

## Architecture notes

**Views are not routes.** `src/pages/Index.tsx` holds an `activeTab` string and swaps views; only `/` and `*` exist as real routes. This keeps the whole flow in one state container, which is what makes the search → pipeline → brief transition feel continuous.

**One source of truth for content.** `src/data/briefData.ts` holds every challenge, solution, benchmark, contact and financial block for all ten companies. `src/lib/briefMetrics.ts` derives the dashboard aggregates from it.

```
src/
  pages/Index.tsx          # tab state + view switching — the heart of navigation
  components/
    layout/                # Sidebar, Header
    search/                # SearchPanel
    pipeline/              # PipelineView
    brief/                 # SustainabilityBrief, SolutionDetail
    dashboard/             # AccountDashboard, RoadmapView, SystemArchitecture
    ui/                    # shadcn primitives
  data/briefData.ts        # the dataset
  lib/briefMetrics.ts      # derived dashboard stats
  integrations/supabase/   # client + generated types
```

---

## What's real and what's simulated

Stated plainly, because a demo that hides this is worth less than one that doesn't:

- ✅ The full UI, navigation, design system and all ten company briefs are real and complete.
- ⚠️ The research pipeline is **visual** — stage durations are fixed timeouts, not live agent calls.
- ⚠️ Export and CRM actions fire toasts; there's no integration behind them.
- ⚠️ Supabase is scaffolded (client + generated types) but no screen queries it yet.

Wiring live research, persistence and real export is the natural next phase.

---

## Running locally

```bash
npm install
npm run dev
```

Vite serves on port **8080**. For the Supabase scaffold, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

```bash
npm run build      # production build
npm run lint       # eslint
```

Deeper implementation context — state model, data shapes, conventions — is in [`CLAUDE.md`](CLAUDE.md).

---

Built by [Mukul Shrivas](https://github.com/mukewl).
