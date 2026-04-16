# Industry Navigator AI — project context

This document is for AI assistants and developers working in this repo. It summarizes stack, architecture, design choices, what ships today, and what is still open.

## Product intent

**Orange Business–branded internal demo** for a "Gen AI sustainability profiling" workflow: account managers pick a company, watch a simulated multi-agent pipeline, then read a structured **sustainability brief** (challenges, mapped Orange solutions, export hooks). The experience is aimed at **enterprise sales reps** (dense UI, minimal marketing chrome).

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
| Charts | **Recharts** — used in `AccountDashboard` (bar chart) and `SustainabilityBrief` Overview tab (impact score bar chart) |
| Backend (scaffold) | **Supabase** — `@supabase/supabase-js`, client in `src/integrations/supabase/client.ts`, generated `types.ts` |
| Forms / validation | **react-hook-form**, **zod**, **@hookform/resolvers** (available; not central to current flows) |
| Toasts | **shadcn Toaster** + **Sonner** (both mounted in `App.tsx`) |
| Animation | **CSS keyframes only** — framer-motion is NOT installed; do not add it |

**Path alias:** `@/` → `src/` (see `vite.config.ts`, `tsconfig`).

**Dev server:** Vite defaults to port **8080**, host `::` (see `vite.config.ts`).

---

## Repository layout (high signal)

```
src/
  App.tsx                 # Router shell, providers, toasters
  main.tsx
  index.css               # Tailwind base + HSL tokens + glass utility classes + custom keyframes
  pages/
    Index.tsx             # Main app: tab state + view switching (heart of navigation)
    NotFound.tsx
  components/
    layout/               # Sidebar, Header
    dashboard/            # AccountDashboard, RoadmapView, SystemArchitecture (+ unused legacy widgets)
    search/               # SearchPanel (new profile entry / hero page)
    pipeline/             # PipelineView (simulated steps)
    brief/                # SustainabilityBrief, SolutionDetail
    ui/                   # shadcn primitives
  data/
    briefData.ts          # Static brief dataset — all 10 companies (see below)
  lib/
    briefMetrics.ts       # Derived stats for dashboard (contract sum, CO₂ label, chart rows)
    utils.ts              # cn() etc.
  integrations/supabase/
    client.ts             # createClient — expects VITE_SUPABASE_* env vars
    types.ts              # Database types (generated)
```

---

## Navigation and state model

**Important:** Most "screens" are **not separate routes**. `Index.tsx` keeps `activeTab` as a string and renders one of several views. Sidebar / mobile header call `onTabChange`.

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

**Brief routing — UPDATED:** `SustainabilityBrief` now resolves company data via a `nameMap` object with explicit keys for all 10 companies. If the company name doesn't match any key, `data` is `null` and a proper empty state is shown — **no silent Renault fallback anymore**.

---

## Data and "business logic"

- **Source of truth for copy/structure:** `src/data/briefData.ts` — challenges, solutions, benchmarks, contacts, financial blocks, etc.
- **Companies in briefData:** `renault`, `carrefour`, `stellantis`, `totalenergies`, `saintgobain`, `schneiderelectric`, `veolia`, `airfranceklm`, `danone`, `loreal` — **all 10 are fully populated**.
- **Solution data shape** (important for Overview additions and SolutionDetail):
  ```ts
  {
    challengeId: number,
    challengeLabel: string,
    product: string,
    detail: string,
    icon: LucideIcon,
    impactScore: number,           // 0–100, used in Overview bar chart + Top Play card
    metrics: {
      profitability: string,       // e.g. "€2.4M estimated contract value | High margin service"
      clientBenefit: string,
      co2Impact: string,           // e.g. "-12,400 tCO2e/year estimated"
    },
    details: {
      overview: string[],
      financialCase: {
        contractValue: string,     // e.g. "€2.4M" — used in Top Play card
        revenueType: string,
        upsellPotential: string,
        years: { year: string, revenue: string }[],
      },
      esgCase: string[],
      keySellingPoints: string[],
      nextSteps: string[],
    }
  }
  ```
- **Contact data shape:** `{ role: string, icon: LucideIcon }` — roles are displayed in Overview "Key contacts" and Export "Targets" sections.
- **Dashboard aggregates:** `src/lib/briefMetrics.ts` — e.g. summed contract labels, CO₂ string, `BRIEF_COMPANY_KEYS`. **This file still only references `renault` and `carrefour`** — it has not been updated to include all 10 companies. This is intentional (dashboard is a two-client view); update carefully if expanding the dashboard client list.
- **No live API** in the main user path: pipeline durations are **fixed timeouts** in `PipelineView`; export and CRM actions show **toasts only**.

**Supabase:** Client is ready (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`). **No feature code in the current UI imports or queries it** — wiring persistence, auth, or real profiles is future work.

---

## Design system (current)

- **Theme:** `index.html` sets `<html class="dark">`. Tokens live in `src/index.css` (HSL CSS variables). The app is **always dark mode** — there is no light/dark toggle.
- **Background:** Pure black (`hsl(0 0% 0%)`). Glass panels are `rgba(255,255,255,0.78–0.88)` which appear as frosted light cards against the dark background.
- **Palette:** Zinc / slate neutrals + **single chromatic accent — Orange `#FF6900`** (`--primary: 24 100% 50%`). No other chromatic colours in the UI chrome.
- **Typography:** SF Pro via system stack (`-apple-system, BlinkMacSystemFont`). JetBrains Mono for code only. Custom utility classes in `index.css` `@layer components`:
  - `type-eyebrow` — 12px uppercase metadata (column headers, dt labels)
  - `type-section-label` — 12px uppercase section headers (slightly looser tracking than eyebrow)
  - `type-prose` / `type-prose-md` / `type-ui` — readable body density
- **Glass utility classes** (defined in `index.css`, use these — don't invent new ones):
  - `glass-nav` — dark glass for sidebar rail
  - `glass-panel` — light frosted content surface (78% white)
  - `glass-panel-strong` — heavier frosted surface (88% white), used for primary cards
  - `glass-inset` — recessed frosted inset (55% white)
  - `glass-tab-shell` — tab bar container
  - `glass-stat` — stat pill
- **Shadows:** `shadow-apple` (3px 5px 30px / 0.22) and `shadow-apple-soft` (3px 5px 24px / 0.08) — use sparingly via utility classes, not inline styles.
- **Animation classes** in `index.css` `@layer utilities`:
  - `animate-fade-in` — 0.45s fade, used on page/view entry
  - `animate-slide-up` — 0.45s slide up + fade
  - `animate-tab-from-right` — 0.2s slide from +20px, used for forward tab transitions
  - `animate-tab-from-left` — 0.2s slide from −20px, used for backward tab transitions
- **Explicit non-goals:** no hero marketing layout, no glassmorphism as primary chrome, no gradient text on headings, no glassmorphism used decoratively — tool-like, Linear/Notion-adjacent density.

---

## What is built (feature checklist)

- [x] **Dashboard** — Two-panel layout: scrollable client list (Renault / Carrefour), selection, summary stats, Recharts bar chart, **Open full brief** CTA.
- [x] **New profile / hero page** — Redesigned: full-bleed background with radial orange glow + dot grid, large headline "Generate a sustainability brief.", search card, Solution Type filter only (Recent Briefs, Available Companies, ESG Risk filter, and Sector filter removed). Two-tier container width (44rem outer, 32rem inner for card).
- [x] **Pipeline** — Five named steps with progress animation and sidebar "parallel agents" / live stats (illustrative).
- [x] **Brief — tab animation** — Tab switching uses directional CSS slide animation (right for forward, left for backward). Tabs component is controlled; content re-mounts on switch via `key`.
- [x] **Brief — Overview tab** — Meta row + pressure/play table + **impact score bar chart** (Recharts) + **Top Recommended Play card** (highest impactScore, contract value, CO₂ impact, link to playbook). Key Contacts and OBS Custom Capabilities (customSolutions preview) have been **removed** from this tab.
- [x] **Brief — Challenges tab** — Redesigned as a table with columns: #, Challenge, Urgency badge, Solution Type (pulled from matched solution's `product` field), Description (truncated). Replaces the previous collapsible cards.
- [x] **Brief — Solutions tab** — Cards → SolutionDetail playbook view. **Win Strategy tab built** inside SolutionDetail (per-solution win strategy content). Win Strategy is currently being **moved into each solution card** and the standalone Win Strategy tab is being **removed** — in progress on `final-changes` branch.
- [x] **Brief — Export tab** — Checkboxes, PowerPoint/Canva toasts, Save to CRM toast, confidence bar, benchmarks, targets. **Next Steps** section moved here from Overview.
- [x] **Brief — empty state** — Proper "no brief available" screen for unrecognised companies; lists all 10 supported names.
- [x] **POC card** — Fixed.
- [x] **Back button** — Fixed (returns correctly from SolutionDetail to Solutions list).
- [x] **Sidebar — Library with Recent + solution-type groups** — Recent section (up to 3, persisted to localStorage) + three collapsible solution-type groups (Smart Eco Energy, Evolution Platform, Ocean + Circular Mobility). Group membership is derived dynamically from `briefData` — a company only appears under a group if it has a solution whose `product` field matches. Groups with no members are hidden.
- [x] **Roadmap** — Static Phase 2 feature list.
- [x] **System architecture** — Separate informational view.
- [x] **Responsive shell** — Sidebar (lg+), sheet + header on small screens.
- [x] **404** — `NotFound` route for unknown paths.

### In progress (2026-04-14, `final-changes` branch)

- [ ] **Win Strategy → solution cards** — Moving Win Strategy content out of the standalone tab and into each individual solution card inside SolutionDetail. Win Strategy tab will be removed once complete. **Do not merge to `master` until finished.**

### Upcoming / to do

- [ ] **Score tooltip on hover** — Impact score bar chart (Overview tab) should show a tooltip on bar hover with score value and context.
- [ ] **Competitor info under non-portfolio solutions** — For challenges not addressed by an OBS solution, surface competitor landscape / market context in the Solutions or Challenges view.
- [ ] **Existing vs New Prospect tag + last updated + refresh** — Overview meta row should show whether the account is an existing client or a new prospect, a "last updated" timestamp, and a manual refresh trigger.
- [ ] **Dashboard advanced filters** — AccountDashboard client list needs filter controls (sector, urgency, contract size, etc.) beyond the current static two-client view.
- [ ] **Presentation details card in dashboard** — A card or panel in AccountDashboard surfacing presentation-ready deal highlights (top play, contract value, next step) for each client.
- [ ] **Architecture page** — `SystemArchitecture` view is a placeholder; needs real content (agent topology diagram, data flow, integration points).

---

## Recently changed files (current session — 2026-04-14)

| File | What changed |
|------|-------------|
| `src/components/search/SearchPanel.tsx` | Stripped to search input + Solution Type filter only. Removed: Recent Briefs section, Available Companies (sector-grouped list), ESG Risk filter row, Sector filter row, and all related dead code |
| `src/components/brief/SustainabilityBrief.tsx` | Overview: removed Key Contacts + OBS Capabilities, moved Next Steps → Export, added Win Strategy tab in SolutionDetail. Challenges: replaced collapsible cards with table (columns: #, Challenge, Urgency, Solution Type, Description). Removed `Collapsible`/`ChevronDown` imports. |
| `src/components/brief/SolutionDetail.tsx` | Win Strategy tab added; POC card fixed; back button fixed |
| `src/components/layout/Sidebar.tsx` | Library section restructured: Recent (localStorage, up to 3) + solution-type groups derived dynamically from `briefData` (company appears in group only if it has a matching `product`). Removed hardcoded id arrays; added `COMPANY_KEY_TO_TAB` map and `briefData` import. |

## Previously changed files (prior sessions)

| File | What changed |
|------|-------------|
| `src/components/search/SearchPanel.tsx` | Full redesign: background decoration layers (radial glow + dot grid + vignette), enlarged headline, stat row, eyebrow badge pill, two-tier container (44rem / 32rem), all 10 chips, centered alignment |
| `src/components/brief/SustainabilityBrief.tsx` | Controlled tabs with directional slide animation; Overview tab additions (bar chart, contacts, Top Play card); silent Renault fallback replaced with proper null/empty state |
| `src/index.css` | Added `animate-tab-from-right`, `animate-tab-from-left`, `@keyframes tabSlideFromRight`, `@keyframes tabSlideFromLeft` |

---

## Patterns and decisions established this session

### Tab animation pattern
`SustainabilityBrief` uses **controlled Radix `Tabs`** (`value` + `onValueChange`) but does **not** use `TabsContent` — content is rendered manually in a single `div` with `key={slideKey}`. Incrementing `slideKey` forces a React re-mount, which retriggers the CSS animation. Direction is computed by comparing the incoming tab's index in `TAB_ORDER` against the current tab's index.

```ts
const TAB_ORDER = ["overview", "challenges", "solutions", "export"] as const;

const handleTabChange = (tab: string) => {
  const fromIdx = TAB_ORDER.indexOf(tab as TabId);   // destination
  const toIdx   = TAB_ORDER.indexOf(activeTab);       // current
  setSlideDir(fromIdx > toIdx ? "right" : "left");
  setActiveTab(tab as TabId);
  setSlideKey((k) => k + 1);
};
```

Apply this same pattern if other multi-tab views need directional animation in future.

### SearchPanel two-tier width
The hero page uses a **nested container strategy** to let chips span a wider column than the card:
- Outer: `max-w-[44rem]` — chip section uses this full width
- Inner: `max-w-[32rem]` — heading and search card are narrower for readability

### Bar chart data pattern (Overview)
Chart data is derived inline from `data.solutions` before the return:
```ts
const chartData = data.solutions.map((s) => ({
  label: `#${s.challengeId}`,   // short X-axis label
  fullName: s.product,           // shown in tooltip
  score: s.impactScore,
}));
```
Tooltip uses `payload[0].payload` cast to `(typeof chartData)[number]` to show `fullName`.

### Top Recommended Play
`topPlay` is derived by sorting solutions descending on `impactScore`:
```ts
const topPlay = [...data.solutions].sort((a, b) => b.impactScore - a.impactScore)[0];
```
Contract value is accessed via `(topPlay as any).details?.financialCase?.contractValue` with `?? "—"` fallback because TypeScript's inference through the union of all `briefData` values is not always reliable for deeply nested properties.

### No framer-motion
Framer Motion is **not installed** and should **not be added**. All animation uses CSS keyframes defined in `src/index.css`. New animations go in the `@layer utilities` block alongside existing ones.

### Recharts styling conventions
Match the existing `AccountDashboard` chart style:
- `CartesianGrid vertical={false}` with `stroke="rgba(0,0,0,0.06)"`
- `axisLine={false}`, `tickLine={false}` on both axes
- Tick fill: `hsl(240 3.8% 46.1%)` (matches `--muted-foreground`)
- Bar fill: `hsl(24 100% 50%)` (matches `--primary`) with `radius={[4, 4, 0, 0]}`
- Custom tooltip: `rounded-lg border border-black/[0.06] bg-white/95 px-3 py-2 text-[0.8125rem] shadow-apple-sm backdrop-blur-xl`

---

## Legacy / unused in main flow

These files exist under `src/components/dashboard/` (and related) but are **not** mounted from `Index.tsx` today:

- `TrendsDashboard.tsx`, `ExecutiveSummary.tsx`, `CompanyAnalysis.tsx`, `CapabilityMap.tsx`, `Recommendations.tsx`
- `agents/AgentStatusPanel.tsx`

They may be leftovers from an earlier layout or Lovable scaffold. Safe to remove or reintegrate intentionally — do not assume they are dead without checking imports.

---

## Known gaps and suggested next work

### Highest priority (product completeness)

1. **`briefMetrics.ts` covers only 2 companies** — Dashboard stats (contract sum, CO₂ label) only aggregate Renault + Carrefour. If the dashboard expands to show all clients, this file needs updating.
2. **Search `isLoading`** — `Index.tsx` never sets `isLoading` to true; the "Running" button state in `SearchPanel` is dead. Wire the loading state through the pipeline transition.
3. **Export** — Implement real PowerPoint / Canva generation; wire checkboxes to actual selection state (currently `defaultChecked` only).

### Product / backend

5. **Real pipeline** — Replace fixed timeouts in `PipelineView` with API jobs; surface errors, cancel/retry, map job output to brief sections.
6. **Supabase** — Persist profiles, users, brief versions; RLS; optional real "Save to CRM" integration.

### UX / IA

7. **URL sync** — Deep-link tabs or briefs (`/brief/renault`) for share/bookmark. Currently all navigation is in-memory state only.
8. **Nav duplication** — Sidebar has both Dashboard entry and direct "Renault Brief" / "Carrefour Brief" links — confirm IA with stakeholders before expanding to all 10.

### Engineering

9. **Bundle size** — Recharts inflates main chunk (~887KB gzipped ~259KB). Consider `React.lazy` for dashboard and brief charts.
10. **Tests** — No test suite; add e2e or critical unit tests if product hardens.
11. **ESLint** — `npm run lint` exists; keep CI-aligned if added.

### Housekeeping

12. **`package.json` name** — Still `vite_react_shadcn_ts`; rename if publishing.
13. **`scripts/extract-brief-data.mjs`** — Utility used to extract `briefData.ts`; optional to delete or document.
14. **`.bak` files** — Remove `src/data/briefData.ts.bak` if present.

---

## Conventions for agents

- Prefer **`@/` imports** for `src`.
- **Do not break** `Index` tab contract without updating `Sidebar` / `Header` / any `setActiveTab` callers.
- **Brief content** edits: start from `src/data/briefData.ts` — keep `SolutionData` / structure compatible with `SolutionDetail`. Do not add fields to some companies without adding them to all 10.
- **Design changes:** use existing glass utility classes (`glass-panel`, `glass-panel-strong`, etc.) and token variables (`bg-background`, `text-muted-foreground`, `border-border`, `primary`). Avoid hard-coded hex **except** where Recharts requires explicit colour strings (use `hsl(24 100% 50%)` for primary, `hsl(240 3.8% 46.1%)` for muted).
- **Animation:** add new keyframes to `src/index.css` `@layer utilities` block; name classes `animate-*`.
- **No framer-motion.** Do not install it.
- **Skills:** The repo includes optional Claude skills under `.claude/skills/` (audit, typeset, redesign, arrange, etc.) — use when the user invokes them via `/skill-name`.

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

**Active branch:** `final-changes` — all current and pending work lives here. **Do not touch `master`** until the Win Strategy migration is complete and signed off.

*Last updated: 2026-04-14. Reflects SearchPanel strip-down, Overview removals, Next Steps → Export, Win Strategy tab built, POC card + back button fixes, Sidebar Library restructured with data-driven solution-type groups, Challenges tab redesigned as table. Win Strategy → solution cards migration in progress. Upcoming: score tooltip, competitor info, Existing/New Prospect tag, dashboard filters, presentation card, architecture page content.*
