# Industry Navigator AI — project context

This document is for AI assistants and developers working in this repo. It summarizes stack, architecture, design choices, what ships today, and what is still open.

## Product intent

**Orange Business–branded internal demo** for a “Gen AI sustainability profiling” workflow: account managers pick a company, watch a simulated multi-agent pipeline, then read a structured **sustainability brief** (challenges, mapped Orange solutions, export hooks). The experience is aimed at **enterprise sales reps** (dense UI, minimal marketing chrome).

---

## Tech stack

| Layer | Choice |
|--------|--------|
| Build | **Vite 5** (`@vitejs/plugin-react-swc`) |
| UI | **React 18** + **TypeScript** |
| Styling | **Tailwind CSS 3.4** + **tailwindcss-animate** |
| Components | **shadcn/ui** pattern — **Radix UI** primitives under `src/components/ui/` |
| Icons | **lucide-react** |
| Routing | **react-router-dom** v6 — only `/` and `*` are used in practice |
| Server state | **TanStack Query** — `QueryClientProvider` in `App.tsx`; main screens do not depend on it yet |
| Charts | **Recharts** — dashboard challenge breakdown (donut) |
| Backend (scaffold) | **Supabase** — `@supabase/supabase-js`, client in `src/integrations/supabase/client.ts`, generated `types.ts` |
| Forms / validation | **react-hook-form**, **zod**, **@hookform/resolvers** (available; not central to current flows) |
| Toasts | **shadcn Toaster** + **Sonner** (both mounted in `App.tsx`) |

**Path alias:** `@/` → `src/` (see `vite.config.ts`, `tsconfig`).

**Dev server:** Vite defaults to port **8080**, host `::` (see `vite.config.ts`).

---

## Repository layout (high signal)

```
src/
  App.tsx                 # Router shell, providers, toasters
  main.tsx
  pages/
    Index.tsx             # Main app: tab state + view switching (heart of navigation)
    NotFound.tsx
  components/
    layout/               # Sidebar, Header
    dashboard/            # AccountDashboard, RoadmapView, SystemArchitecture (+ unused legacy widgets)
    search/               # SearchPanel (new profile entry)
    pipeline/             # PipelineView (simulated steps)
    brief/                # SustainabilityBrief, SolutionDetail
    ui/                   # shadcn primitives
  data/
    briefData.ts          # Static brief dataset (Renault + Carrefour)
  lib/
    briefMetrics.ts       # Derived stats for dashboard (contract sum, CO₂ label, chart rows)
    utils.ts              # cn() etc.
  integrations/supabase/
    client.ts             # createClient — expects VITE_SUPABASE_* env vars
    types.ts              # Database types (generated)
```

---

## Navigation and state model

**Important:** Most “screens” are **not separate routes**. `Index.tsx` keeps `activeTab` as a string and renders one of several views. Sidebar / mobile header call `onTabChange`.

**Known `activeTab` values** (from `Index.tsx` + `Sidebar.tsx`):

| Tab id | View |
|--------|------|
| `dashboard` | `AccountDashboard` |
| `search` | `SearchPanel` |
| `pipeline` | `PipelineView` (after search) |
| `brief` | `SustainabilityBrief` (uses `searchQuery` as company name) |
| `renault-brief` | `SustainabilityBrief` with `companyName="Renault"` |
| `carrefour-brief` | `SustainabilityBrief` with `companyName="Carrefour"` |
| `roadmap` | `RoadmapView` (Phase 2 placeholder) |
| `architecture` | `SystemArchitecture` |

**Other state in `Index`:** `searchQuery`, `isLoading`, `hasSearched` — only parts of this are fully wired (e.g. loading flag for search is not driven to true today).

**Brief routing quirk:** `SustainabilityBrief` resolves data with  
`companyName.toLowerCase().includes("carrefour") ? "carrefour" : "renault"` — any other name falls back to **Renault** data.

---

## Data and “business logic”

- **Source of truth for copy/structure:** `src/data/briefData.ts` — challenges, solutions, benchmarks, contacts, financial blocks, etc.
- **Dashboard aggregates:** `src/lib/briefMetrics.ts` — e.g. summed contract labels, CO₂ string, `BRIEF_COMPANY_KEYS` (`renault`, `carrefour`).
- **No live API** in the main user path: pipeline durations are **fixed timeouts** in `PipelineView`; export and CRM actions show **toasts only**.

**Supabase:** Client is ready (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`). **No feature code in the current UI imports or queries it** — wiring persistence, auth, or real profiles is future work.

---

## Design system (current)

- **Theme:** `index.html` sets `<html class="dark">`. Tokens live in `src/index.css` (HSL CSS variables).
- **Palette:** **Zinc / slate neutrals** + **single accent** — Orange **primary** (`hsl` orange ~ `#FF6900`).
- **Typography:** **IBM Plex Sans** (UI), **JetBrains Mono** (code). Utility classes in `index.css` `@layer components`:
  - `type-eyebrow` — small uppercase metadata
  - `type-section-label` — section headers
  - `type-prose` / `type-prose-md` / `type-ui` — readable body density
- **Body:** `text-base`, slightly looser line-height in `.dark` for readability.
- **Explicit non-goals (recent UX direction):** no hero marketing layout, no glassmorphism as primary chrome; tool-like, Linear/Notion-adjacent density.

---

## What is built (feature checklist)

- [x] **Dashboard** — Two-panel layout: scrollable client list (Renault / Carrefour), selection, summary stats, Recharts donut + legend, **Open full brief** CTA.
- [x] **New profile** — Search by company name; example chips; transitions to pipeline.
- [x] **Pipeline** — Five named steps with progress animation and sidebar “parallel agents” / live stats (illustrative).
- [x] **Brief** — Tabbed: Overview (table), Challenges (collapsible detail), Solutions (cards → **SolutionDetail** playbook), Export (checkboxes, PowerPoint/Canva toasts, Save to CRM toast, confidence, benchmarks, targets).
- [x] **Roadmap** — Static Phase 2 feature list (moved off dashboard).
- [x] **System architecture** — Separate informational view.
- [x] **Responsive shell** — Sidebar (lg+), sheet + header on small screens.
- [x] **404** — `NotFound` route for unknown paths.

---

## Legacy / unused in main flow

These files exist under `src/components/dashboard/` (and related) but are **not** mounted from `Index.tsx` today:

- `TrendsDashboard.tsx`, `ExecutiveSummary.tsx`, `CompanyAnalysis.tsx`, `CapabilityMap.tsx`, `Recommendations.tsx`
- `agents/AgentStatusPanel.tsx`

They may be leftovers from an earlier layout or Lovable scaffold. Safe to remove or reintegrate intentionally — do not assume they are dead without checking imports.

---

## Known gaps and suggested next work

### Product / backend

1. **Real pipeline** — Replace timers with API jobs; surface errors, cancel/retry, map job output to brief sections.
2. **Dynamic companies** — Avoid silent Renault fallback; empty state or API-driven brief when unknown.
3. **Supabase** — Persist profiles, users, brief versions; RLS; optional real “Save to CRM” integration.
4. **Export** — Implement PowerPoint / Canva (or other) generation; wire checkboxes to real selection state.
5. **Search `isLoading`** — Parent never sets loading true; button “Running” state is effectively unused.

### UX / IA

6. **URL sync** — Deep-link tabs or briefs (`/brief/renault`) for share/bookmark (optional).
7. **Nav duplication** — Sidebar has both Dashboard paths and direct “Renault Brief” / “Carrefour Brief”; confirm IA with stakeholders.

### Engineering

8. **Bundle size** — Recharts inflates main chunk; consider `React.lazy` for dashboard chart.
9. **Tests** — No test suite described in repo; add e2e or critical unit tests if product hardens.
10. **ESLint** — `npm run lint` exists; keep CI-aligned if added.

### Housekeeping

11. **`package.json` name** — Still `vite_react_shadcn_ts`; rename if publishing.
12. **`scripts/extract-brief-data.mjs`** — Utility used to extract `briefData.ts`; optional to delete or document.
13. **`.bak` files** — Remove `src/data/briefData.ts.bak` if present (accidental backup).

---

## Conventions for agents

- Prefer **`@/` imports** for `src`.
- **Do not break** `Index` tab contract without updating `Sidebar` / `Header` / any `setActiveTab` callers.
- **Brief content** edits: start from `src/data/briefData.ts` (or the consuming components) — keep `SolutionData` / structure compatible with `SolutionDetail`.
- **Design changes:** respect existing tokens (`bg-background`, `text-muted-foreground`, `border-border`, `primary`); avoid hard-coded hex except where charts require explicit fills.
- **Skills:** The repo includes optional Claude skills under `.claude/skills/` (audit, typeset, redesign, etc.) — use when the user invokes them.

---

## Quick commands

```bash
npm install
npm run dev      # Vite dev server (port 8080 by default)
npm run build
npm run preview
npm run lint
```

**Env (Supabase):** set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for any future integration that uses `client.ts`.

---

*Last aligned with the codebase layout and main flows in this workspace. Update this file when routing, data sources, or major UI sections change.*
