import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  Check,
  Presentation,
  Palette,
  ShieldCheck,
  ChevronRight,
  Leaf,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  RefreshCw,
  Loader2,
  X,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SolutionDetail, SolutionData } from "./SolutionDetail";
import { briefData } from "@/data/briefData";
import { winStrategyData } from "@/data/winStrategyData";
import { cn } from "@/lib/utils";
import { CompanyLogo, COMPANY_DOMAINS } from "@/lib/companyLogos";

interface SustainabilityBriefProps {
  companyName: string;
  onBack: (returnTo: string) => void;
  returnTo: string;
}

interface CustomSolution {
  title: string;
  challengeAddressed: string;
  divisions: string[];
  description: string;
  feasibilityNotes: string;
}

const TAB_ORDER = ["overview", "challenges", "solutions", "export"] as const;
type TabId = (typeof TAB_ORDER)[number];

type ContactEntry = (typeof briefData)[keyof typeof briefData]["contacts"][number];

function impactBadgeClass(score: number): string {
  if (score >= 90) return "text-emerald-600 bg-emerald-50 border border-emerald-200/80";
  if (score >= 75) return "text-amber-600 bg-amber-50 border border-amber-200/80";
  return "text-red-600 bg-red-50 border border-red-200/80";
}

// Competitor names keyed by custom solution title
const CUSTOM_SOLUTION_COMPETITORS: Record<string, [string, string]> = {
  // Renault
  "EV Lifecycle Intelligence Platform":           ["Siemens Xcelerator", "Capgemini"],
  "Automated CSRD Reporting Agent":               ["SAP Sustainability", "IBM Envizi"],
  // Carrefour
  "Predictive Cold Chain AI":                     ["Honeywell", "Siemens Building Tech"],
  "Supplier Sustainability Intelligence Hub":     ["SAP Ariba", "Accenture"],
  // Stellantis
  "Multi-Brand Battery Digital Passport Hub":     ["IBM", "Siemens"],
  "Multi-Market EV Penalty Avoidance Intelligence": ["Accenture", "Capgemini"],
  // TotalEnergies
  "Refinery Decarbonisation Digital Twin":        ["Siemens", "Honeywell"],
  "EU Taxonomy CapEx Classification Engine":      ["SAP", "IBM Envizi"],
  // Saint-Gobain
  "Furnace Hydrogen Transition Simulator":        ["Siemens", "Emerson"],
  "Automated EPD Generation Platform":            ["Sphera", "EcoVadis"],
  // Schneider Electric
  "Avoided Emissions Intelligence Platform":      ["Accenture", "IBM Envizi"],
  "Smart WEEE Recovery Network Optimizer":        ["SAP", "Capgemini"],
  // Veolia
  "PFAS Real-Time Sentinel Network":              ["Xylem", "Siemens Water"],
  "WtE Carbon Optimisation Co-Pilot":             ["Siemens", "Honeywell"],
  // Air France-KLM
  "SAF Chain-of-Custody Intelligence Hub":        ["IBM", "Accenture"],
  "Airside Zero-Emission Transition Planner":     ["Siemens", "Capgemini"],
  // Danone
  "Farm-Level Carbon Intelligence Platform":      ["IBM Food Trust", "SAP"],
  "Aquifer Stewardship Sentinel":                 ["Xylem", "Siemens Water"],
  // L'Oréal
  "Ingredient Deforestation Sentinel":            ["IBM", "Accenture"],
  "Beauty Circularity Intelligence Network":      ["SAP", "Capgemini"],
};

// Tooltip explanations keyed by "companyKey:challengeId"
// Each entry: [ESG urgency line, revenue + CO₂ line]
const SCORE_TOOLTIPS: Record<string, [string, string]> = {
  "renault:1":           ["Critical EU 2025/2030 fleet CO₂ targets risk direct financial penalties — peak ESG urgency.", "€2.4M contract with high upsell; -12,400 tCO₂e/year is Renault's highest CO₂ play."],
  "renault:2":           ["High Scope 2 investor scrutiny at French and Romanian manufacturing plants drives strong urgency.", "€1.8M recurring IoT contract; 20-25% energy reduction delivers -8,200 tCO₂e/year."],
  "renault:3":           ["CSRD 2025 supplier compliance deadline creates urgency, though CO₂ impact is indirect.", "€900K with very high IT modernisation upsell; enables -5,000 tCO₂e supply chain reduction."],
  "carrefour:1":         ["Refrigeration is Carrefour's #1 operating cost and primary Scope 2 source — critical regulatory focus.", "€3.1M with global store rollout potential; -18,600 tCO₂e/year is the strongest CO₂ case for Carrefour."],
  "carrefour:2":         ["AGEC anti-waste legislation creates direct financial penalty risk — high compliance urgency.", "€1.2M steady recurring contract; achieves AGEC compliance and eliminates regulatory exposure."],
  "carrefour:3":         ["Urban ZEZ restrictions threatening last-mile delivery access across major French cities create high operational urgency.", "€2.0M with deep logistics integration upsell; 35% delivery emissions cut yields -9,100 tCO₂e/year."],
  "stellantis:1":        ["EU fleet CO₂ penalties of €95/g/km across 6M+ vehicles create >€1B potential exposure — peak ESG urgency.", "€3.2M with very high multi-brand upsell; -15,800 tCO₂e/year spanning all 15 Stellantis marques."],
  "stellantis:2":        ["Rising EU ETS prices and Dare Forward 2030 Scope 2 intensity targets create direct cost and compliance pressure.", "€2.1M recurring contract; 18-22% energy reduction across 40+ plants yields -11,400 tCO₂e/year."],
  "stellantis:3":        ["EU Battery Regulation digital passport mandate from 2027 sets a hard compliance deadline for the full EV portfolio.", "€1.1M with very high upsell potential; supply chain traceability enables -6,200 tCO₂e indirect reduction."],
  "totalenergies:1":     ["Full EU ETS exposure on refining with free allocations phasing out through 2030 — every avoided tonne is direct cost savings.", "€4.2M high-value industrial contract; -28,000 tCO₂e/year is the largest CO₂ impact across all solutions."],
  "totalenergies:2":     ["Green Bond access and institutional mandates require credible EU Taxonomy alignment for €5B+ annual CapEx.", "€2.4M with very high ESG data management upsell; creates the infrastructure for a credible net-zero trajectory."],
  "totalenergies:3":     ["Climate litigation risk in France amplifies urgency to demonstrate verifiable Scope 3 action beyond disclosure.", "€1.6M subscription; 25% fleet emissions cut delivers -7,400 tCO₂e/year with CSRD-compliant telemetry data."],
  "saintgobain:1":       ["EU ETS exposure on hard-to-abate glass furnaces is critical and growing — efficiency ROI funds the platform within 22 months.", "€3.6M with European plant network expansion; -24,200 tCO₂e/year is the strongest CO₂ case for Saint-Gobain."],
  "saintgobain:2":       ["EPDs are becoming a commercial disqualifier in European construction procurement — high urgency for revenue protection.", "€1.4M with very high CSRD expansion; EPD coverage unlocks green building and public infrastructure project access."],
  "saintgobain:3":       ["CSRD circularity reporting and 30% recycled glass target by 2030 create medium urgency for reverse logistics.", "€1.0M contract; optimised cullet collection directly supports the recycled content commitment with -4,600 tCO₂e/year."],
  "schneiderelectric:1": ["92% of Schneider's GHG footprint is Scope 3 Cat 11 — CSRD demands product-level data, creating critical disclosure pressure.", "€2.8M with customer-facing carbon reporting upsell; enables visibility of -40,000 tCO₂e in customer energy savings."],
  "schneiderelectric:2": ["WEEE non-compliance penalties can reach 4% of annual EU revenue — strong financial urgency to hit the 85% collection rate.", "€1.5M contract; achieves WEEE and Right to Repair compliance with -5,200 tCO₂e/year."],
  "schneiderelectric:3": ["CSDDD and CSRD extend ESG due diligence to 50,000+ suppliers — significant compliance and operational urgency.", "€1.3M with high Tier 2 expansion potential; automates 60% of manual supplier ESG data collection cost."],
  "veolia:1":            ["2028 EU ETS inclusion of waste incineration is a confirmed deadline — efficiency gains now set the carbon allowance baseline.", "€2.9M with European WtE network expansion; -19,800 tCO₂e/year including methane capture optimisation."],
  "veolia:2":            ["January 2026 EU PFAS limit of 0.5 μg/L creates a hard regulatory deadline across Veolia's 90M-person water network.", "€1.8M with very high global water utility upsell; white-label portal strengthens municipal contract renewals."],
  "veolia:3":            ["30,000+ vehicles face Zero Emission Zone bans in Paris (2024) and Amsterdam (2025) — immediate operational access risk.", "€2.2M with global fleet expansion potential; 8-12% fuel savings from day one and -11,600 tCO₂e/year."],
  "airfranceklm:1":      ["CDG and Schiphol zero-emission GSE deadlines carry operating-licence risk — high urgency for ground operations wins.", "€1.9M with full European hub expansion; -8,700 tCO₂e/year from proven ground vehicle electrification."],
  "airfranceklm:2":      ["EU ETS aviation free allocations reach zero by 2026 — every verified Scope 2 reduction is directly financially valuable.", "€2.6M with outstation expansion; 20% ground facilities energy reduction yields -16,400 tCO₂e/year."],
  "airfranceklm:3":      ["ReFuelEU non-compliance carries €50/GJ penalties from 2025 — direct financial and reputational urgency for SAF traceability.", "€2.1M contract; SAF chain-of-custody data feeds directly into CSRD climate disclosure from one platform."],
  "danone:1":            ["70%+ of Danone's footprint is agricultural Scope 3 Cat 1 — CSRD auditors flag aggregated estimates, forcing farm-level data.", "€2.2M with very high value chain expansion; farm-level infrastructure enables -85,000 tCO₂e supply chain reduction."],
  "danone:2":            ["EU PPWR 50% recycled plastic content mandate by 2030 requires transformed reverse logistics — high commercial urgency.", "€1.6M with European market expansion; -7,900 tCO₂e/year while directly improving recycled PET supply economics."],
  "danone:3":            ["Regulatory scrutiny on water extraction at Évian and Volvic creates dual energy and water urgency at bottling sites.", "€1.8M self-funding within 20 months; 18% energy reduction yields -10,200 tCO₂e/year across processing plants."],
  "loreal:1":            ["EUDR non-compliance risks EU market access suspension for in-scope ingredients by December 2025 — existential product urgency.", "€2.5M with very high CSRD expansion; EUDR and ESRS E4 biodiversity disclosure served from one platform."],
  "loreal:2":            ["EU PPWR 50% recycled content target and ECHA microplastic ban by 2027 create compounding packaging compliance pressure.", "€1.4M with European retail network expansion; -5,400 tCO₂e/year while improving EPR audit trail quality."],
  "loreal:3":            ["L'Oréal's 2025 carbon neutrality commitment requires verified site-level energy data — high urgency for credible measurement.", "€1.9M scaling to 38-site European network; -8,600 tCO₂e/year with 20% water intensity reduction at bottling sites."],
};

function buildDraftEmail(
  contactRole: string,
  companyName: string,
  challenge: { title: string; description: string },
  solution: { product: string; detail: string; metrics?: { clientBenefit: string } }
): string {
  return `Subject: Orange Business × ${companyName} — ${solution.product}

Dear ${contactRole},

I'm reaching out from Orange Business regarding ${companyName}'s sustainability priorities, particularly around ${challenge.title}.

${solution.detail}

${solution.metrics?.clientBenefit ?? ""}

I'd welcome a brief discovery call to explore how Orange Business can support your ESG objectives.

Best regards,
[Your name]
Orange Business`;
}

export const SustainabilityBrief = ({ companyName, onBack, returnTo }: SustainabilityBriefProps) => {
  const { toast } = useToast();
  const [selectedSolution, setSelectedSolution] = useState<SolutionData | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [slideKey, setSlideKey] = useState(0);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");
  const [draftContact, setDraftContact] = useState<ContactEntry | null>(null);
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [highlightedSolutionId, setHighlightedSolutionId] = useState<number | null>(null);
  const [feasibilityCustom, setFeasibilityCustom] = useState<CustomSolution | null>(null);
  const [isFeasibilityOpen, setIsFeasibilityOpen] = useState(false);
  const [focusedCustomIdx, setFocusedCustomIdx] = useState<number | null>(null);
  const [winStrategyModal, setWinStrategyModal] = useState<SolutionData | null>(null);
  const [briefDate, setBriefDate] = useState("18 Mar 2026");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      setBriefDate(formatted);
      setIsRefreshing(false);
      toast({ title: "Brief refreshed", description: "Data updated to today's date." });
    }, 1500);
  };

  const nameMap: Record<string, keyof typeof briefData> = {
    renault: "renault",
    carrefour: "carrefour",
    stellantis: "stellantis",
    totalenergies: "totalenergies",
    "total energies": "totalenergies",
    "saint-gobain": "saintgobain",
    "saint gobain": "saintgobain",
    saintgobain: "saintgobain",
    "schneider electric": "schneiderelectric",
    schneiderelectric: "schneiderelectric",
    schneider: "schneiderelectric",
    veolia: "veolia",
    "air france": "airfranceklm",
    "air france-klm": "airfranceklm",
    "air france klm": "airfranceklm",
    airfranceklm: "airfranceklm",
    danone: "danone",
    "l'oréal": "loreal",
    loreal: "loreal",
    "l'oreal": "loreal",
  };
  const queryKey = nameMap[companyName.toLowerCase()] ?? null;
  const data = queryKey ? briefData[queryKey] : null;

  const handleTabChange = (tab: string) => {
    const fromIdx = TAB_ORDER.indexOf(tab as TabId);
    const toIdx = TAB_ORDER.indexOf(activeTab);
    setSlideDir(fromIdx > toIdx ? "right" : "left");
    setActiveTab(tab as TabId);
    setSlideKey((k) => k + 1);
  };

  // Scroll to focused custom solution after tab animation completes
  useEffect(() => {
    if (activeTab === "solutions" && focusedCustomIdx !== null) {
      const timer = setTimeout(() => {
        document.getElementById(`custom-solution-${focusedCustomIdx}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [activeTab, focusedCustomIdx, slideKey]);

  const handleSaveToCRM = () => {
    toast({
      title: "Saved to CRM",
      description: `${data!.name} sustainability brief has been saved to your CRM.`,
    });
  };

  const handleExport = (type: "PowerPoint" | "Canva") => {
    toast({
      description:
        type === "PowerPoint"
          ? "Preparing your deck... This feature will be available in the live version."
          : "Connecting to Canva... This feature will be available in the live version.",
      className: "bg-primary text-primary-foreground border-primary font-medium",
      duration: 3000,
    });
  };

  if (!data) {
    return (
      <div className="mx-auto max-w-4xl animate-fade-in pb-16 sm:pb-20">
        <header className="mb-10 flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onBack(returnTo)}
            className="h-9 min-w-9 shrink-0 rounded-lg px-2 text-muted-foreground hover:bg-black/[0.05]"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Button>
          <div className="type-section-label flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            Brief
          </div>
        </header>
        <div className="glass-panel-strong rounded-2xl px-8 py-14 text-center">
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">
            No brief available for &ldquo;{companyName}&rdquo;
          </p>
          <p className="mt-2 text-[0.9375rem] text-muted-foreground">
            This demo includes profiles for Renault, Carrefour, Stellantis, TotalEnergies,
            Saint-Gobain, Schneider Electric, Veolia, Air France-KLM, Danone, and L&apos;Oréal.
          </p>
          <Button type="button" className="mt-8" onClick={() => onBack(returnTo)}>
            Back to dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (selectedSolution) {
    return (
      <SolutionDetail
        companyName={data.name}
        solution={selectedSolution}
        challenges={data.challenges}
        onBack={() => setSelectedSolution(null)}
      />
    );
  }

  // Derived data for overview additions
  const rankedSolutions = [...data.solutions].sort((a, b) => b.impactScore - a.impactScore);
  const topPlay = rankedSolutions[0];
  const topChallenge = data.challenges[0];
  const topChallengeSolution =
    data.solutions.find((s) => s.challengeIds.includes(topChallenge?.id ?? -1)) ?? topPlay;
  const challengeTitles = (s: SolutionData) =>
    data.challenges
      .filter((c) => s.challengeIds.includes(c.id))
      .map((c) => c.title)
      .join(" · ");

  return (
    <div className="mx-auto max-w-4xl animate-fade-in pb-16 sm:pb-20">
      <header className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onBack(returnTo)}
            className="h-9 min-w-9 shrink-0 rounded-lg px-2 text-muted-foreground hover:bg-black/[0.06]"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Button>
          <CompanyLogo domain={queryKey ? COMPANY_DOMAINS[queryKey] : undefined} name={data.name} className="h-10 w-10 shrink-0 rounded-xl" />
          <div className="min-w-0">
            <div className="mb-0.5 flex items-center gap-1.5">
              <Leaf className="h-3 w-3 shrink-0 text-primary" aria-hidden />
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.07em] text-primary/70">Sustainability Brief</span>
            </div>
            <h1 className="truncate font-display text-xl font-bold leading-tight tracking-tight text-foreground sm:text-[1.625rem]">
              {data.name}
            </h1>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-10 inline-flex h-auto w-full max-w-full flex-wrap justify-start gap-1 rounded-xl border border-black/[0.07] bg-black/[0.03] p-1 shadow-none">
          {(
            [
              ["overview", "Overview"],
              ["challenges", "Challenges"],
              ["solutions", "Categories"],
              ["export", "Export"],
            ] as const
          ).map(([v, label]) => (
            <TabsTrigger
              key={v}
              value={v}
              className={cn(
                "rounded-lg border-0 px-5 py-2.5 text-[0.875rem] font-semibold text-muted-foreground shadow-none transition-all duration-200",
                "data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-[0_1px_4px_rgba(0,0,0,0.10)]",
                "data-[state=inactive]:hover:bg-white/60 data-[state=inactive]:hover:text-foreground"
              )}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Animated tab content — keyed to re-mount on each tab change, direction drives animation */}
        <div
          key={slideKey}
          role="tabpanel"
          className={slideDir === "right" ? "animate-tab-from-right" : "animate-tab-from-left"}
        >
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="focus-visible:outline-none">
              {/* Meta row */}
              <div className="mb-8 flex flex-wrap items-end gap-10 tabular-nums border-b border-black/[0.06] pb-8 sm:gap-12">
                <div>
                  <p className="type-eyebrow">Confidence</p>
                  <p className="mt-1 text-base font-medium tracking-tight text-foreground">{data.score}%</p>
                </div>
                <div>
                  <p className="type-eyebrow">Sources</p>
                  <p className="mt-1 text-base font-medium tracking-tight text-foreground">{data.sources}</p>
                </div>
                <div>
                  <p className="type-eyebrow">Last Updated</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <p className="text-base font-medium tracking-tight text-foreground">{briefDate}</p>
                    <button
                      type="button"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      aria-label="Refresh brief date"
                      className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 transition-colors hover:text-muted-foreground disabled:cursor-not-allowed"
                    >
                      {isRefreshing
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                        : <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                      }
                    </button>
                  </div>
                </div>
                <div>
                  <p className="type-eyebrow">Account</p>
                  {(data as any).clientStatus === "existing" ? (
                    <span className="mt-1 inline-flex items-center rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-emerald-700">
                      Existing Client
                    </span>
                  ) : (
                    <span className="mt-1 inline-flex items-center rounded-full border border-sky-200/80 bg-sky-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-sky-700">
                      New Prospect
                    </span>
                  )}
                </div>
              </div>

              {/* Pressure / play table */}
              <div className="glass-panel overflow-hidden rounded-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="type-eyebrow border-b border-black/[0.06] bg-black/[0.02] text-left backdrop-blur-sm">
                      <th scope="col" className="w-8 px-3 py-2.5 font-medium">#</th>
                      <th scope="col" className="px-3 py-2.5 font-medium">Pressure</th>
                      <th scope="col" className="px-3 py-2.5 font-medium">Matched play</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.challenges.map((c) => {
                      const play = data.solutions.find((s) => s.challengeIds.includes(c.id));
                      return (
                        <tr
                          key={c.id}
                          className="group/row border-b border-black/[0.05] transition-colors duration-100 hover:bg-primary/[0.04] last:border-0"
                        >
                          <td className="px-3 py-3 tabular-nums text-muted-foreground align-top">{c.id}</td>
                          <td className="px-3 py-3 font-medium leading-snug text-foreground align-top">{c.title}</td>
                          <td className="px-3 py-3 align-top">
                            {play ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setHighlightedSolutionId(c.id);
                                    handleTabChange("solutions");
                                  }}
                                  className="font-medium leading-snug text-primary text-left hover:underline"
                                >
                                  {play.product}
                                </button>
                                <div className="mt-0.5 flex items-center gap-1.5 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100">
                                  <span className="text-[0.6875rem] tabular-nums text-muted-foreground">
                                    {(play as any).details?.financialCase?.contractValue ?? "—"}
                                  </span>
                                  <span className="text-[0.6875rem] text-muted-foreground">·</span>
                                  <span className="text-[0.6875rem] font-semibold tabular-nums text-primary">
                                    score {play.impactScore}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <span className="font-medium leading-snug text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── Solution impact scores ── */}
              <section className="mt-8">
                <p className="type-section-label mb-3">Category impact scores</p>
                <div className="glass-panel divide-y divide-black/[0.05] overflow-hidden rounded-xl">
                  {rankedSolutions.map((s, idx) => (
                    <div key={s.challengeIds[0]} className="flex items-center gap-4 px-4 py-3">
                      <span className="type-eyebrow w-4 shrink-0 tabular-nums text-muted-foreground/60 normal-case">
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug text-foreground">{s.product}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{challengeTitles(s)}</p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${impactBadgeClass(s.impactScore)}`}
                      >
                        {s.impactScore}
                      </span>
                    </div>
                  ))}
                </div>
              </section>


              {/* ── Top recommended play ── */}
              <section className="mt-6">
                <p className="type-section-label mb-3">Top recommended play</p>
                <div className="glass-panel-strong rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug tracking-tight text-foreground">
                        {topPlay.product}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{challengeTitles(topPlay)}</p>
                    </div>
                    <span className="shrink-0 text-2xl font-semibold tabular-nums tracking-tight text-primary">
                      {topPlay.impactScore}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-black/[0.06] pt-4">
                    <div>
                      <dt className="type-eyebrow">Contract value</dt>
                      <dd className="mt-1 text-xs font-medium text-foreground">
                        {(topPlay as any).details?.financialCase?.contractValue ?? "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-eyebrow">CO₂ impact</dt>
                      <dd className="mt-1 text-xs font-medium text-foreground">
                        {topPlay.metrics?.co2Impact ?? "—"}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => setSelectedSolution(topPlay as SolutionData)}
                    className="mt-4 inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    View Full Category →
                  </button>
                </div>
              </section>


            </div>
          )}

          {/* ── CHALLENGES ── */}
          {activeTab === "challenges" && (
            <div className="focus-visible:outline-none">
              <div className="glass-panel overflow-hidden rounded-xl">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-black/[0.06]">
                      <th className="type-eyebrow w-10 px-4 py-3 text-left text-muted-foreground">#</th>
                      <th className="type-eyebrow px-4 py-3 text-left text-muted-foreground">Challenge</th>
                      <th className="type-eyebrow whitespace-nowrap px-4 py-3 text-left text-muted-foreground">Urgency</th>
                      <th className="type-eyebrow whitespace-nowrap px-4 py-3 text-left text-muted-foreground">Category</th>
                      <th className="type-eyebrow px-4 py-3 text-left text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.challenges.map((c) => {
                      const solution = data.solutions.find((s) => s.challengeIds.includes(c.id));
                      return (
                        <tr
                          key={c.id}
                          className="border-b border-black/[0.04] transition-colors last:border-0 hover:bg-black/[0.02]"
                        >
                          <td className="px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground">
                            {c.id}
                          </td>
                          <td className="px-4 py-3 font-medium leading-snug tracking-tight text-foreground">
                            {c.title}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={cn(
                                "type-eyebrow h-5 shrink-0 border px-1.5 py-0 font-medium normal-case tracking-normal",
                                c.urgencyColor
                              )}
                            >
                              {c.urgency}
                            </Badge>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                            {solution?.product ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">
                            {c.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SOLUTIONS ── */}
          {activeTab === "solutions" && (
            <div className="focus-visible:outline-none">
              <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
                {(() => {
                  const ws = winStrategyData[queryKey ?? ""] ?? null;
                  return data.solutions.map((s) => {
                  const Icon = s.icon;
                  const isHighlighted = s.challengeIds.includes(highlightedSolutionId ?? -1);
                  return (
                    <button
                      key={s.challengeIds[0]}
                      type="button"
                      onClick={() => { setHighlightedSolutionId(null); setSelectedSolution(s as SolutionData); }}
                      className={cn(
                        "glass-panel flex flex-col rounded-xl p-5 text-left shadow-apple-sm transition-[box-shadow,background,outline] duration-200 hover:bg-white hover:shadow-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isHighlighted && "ring-2 ring-primary/40 bg-primary/[0.03]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc]">
                            <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                          </div>
                          <span className="type-eyebrow normal-case tracking-normal text-muted-foreground">
                            #{s.challengeIds[0]}
                          </span>
                        </div>
                        {(() => {
                          const tip = SCORE_TOOLTIPS[`${queryKey}:${s.challengeIds[0]}`];
                          return tip ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-default text-xl font-medium tabular-nums tracking-tight text-primary">
                                  {s.impactScore}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-[240px] px-3 py-2.5">
                                <p className="text-xs leading-snug">{tip[0]}</p>
                                <p className="mt-1 text-xs leading-snug opacity-70">{tip[1]}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="text-xl font-medium tabular-nums tracking-tight text-primary">
                              {s.impactScore}
                            </span>
                          );
                        })()}
                      </div>
                      <p className="mt-2 text-sm font-medium leading-snug tracking-tight text-foreground">
                        {s.product}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-sm font-normal leading-relaxed text-muted-foreground">
                        {s.detail}
                      </p>
                      <dl className="mt-4 space-y-2 border-t border-black/[0.06] pt-4 text-xs">
                        <div>
                          <dt className="type-eyebrow normal-case">Revenue (est.)</dt>
                          <dd className="mt-1 font-medium leading-snug text-foreground">
                            {s.metrics?.profitability}
                          </dd>
                        </div>
                        <div>
                          <dt className="type-eyebrow normal-case">Client benefit</dt>
                          <dd className="mt-1 font-medium leading-snug text-foreground">
                            {s.metrics?.clientBenefit}
                          </dd>
                        </div>
                        <div>
                          <dt className="type-eyebrow normal-case">CO₂</dt>
                          <dd className="mt-1 font-medium leading-snug text-foreground">
                            {s.metrics?.co2Impact}
                          </dd>
                        </div>
                      </dl>
                      <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-dashed border-black/[0.1] bg-[#fafafc] px-2 py-1.5 text-xs leading-snug text-muted-foreground">
                        <span className="truncate">Mapped: {challengeTitles(s)}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                      </div>
                      <div className="mt-3 flex-1 flex items-end gap-2">
                        <div className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                          View Full Category →
                        </div>
                        {ws && (
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setWinStrategyModal(s as SolutionData);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                e.preventDefault();
                                setWinStrategyModal(s as SolutionData);
                              }
                            }}
                            className="inline-flex items-center gap-1 rounded-md border border-black/[0.12] bg-transparent px-3 py-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            Win Strategy
                          </div>
                        )}
                      </div>
                    </button>
                  );
                  });
                })()}
              </div>

              {/* ── Custom Solutions via OBS Capabilities ── */}
              {(() => {
                const customSolutions = (data as any).customSolutions as CustomSolution[] | undefined;
                if (!customSolutions?.length) return null;
                return (
                  <section className="mt-10">
                    <div className="mb-4 flex flex-wrap items-baseline gap-3">
                      <p className="type-section-label">Custom Solutions via OBS Capabilities</p>
                      <span className="rounded-full border border-sky-200/80 bg-sky-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-sky-700">
                        Built with OBS Capabilities — not in current portfolio
                      </span>
                    </div>
                    <div className="rounded-2xl border border-sky-200/50 bg-sky-50/60 p-5 sm:p-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {customSolutions.map((cs, idx) => (
                          <div
                            id={`custom-solution-${idx}`}
                            key={idx}
                            className={cn(
                              "glass-panel rounded-xl p-5 transition-[box-shadow,ring] duration-300",
                              focusedCustomIdx === idx && "ring-2 ring-primary/40"
                            )}
                          >
                            <p className="text-sm font-semibold leading-snug tracking-tight text-foreground">
                              {cs.title}
                            </p>
                            <p className="mt-2 text-sm font-normal leading-relaxed text-muted-foreground">
                              {cs.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {cs.divisions.map((d) => (
                                <span
                                  key={d}
                                  className="rounded-full border border-sky-200/70 bg-sky-100/70 px-2 py-0.5 text-[0.6875rem] font-medium text-sky-700"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">Challenge: </span>
                              {cs.challengeAddressed}
                            </p>
                            {(() => {
                              const competitors = CUSTOM_SOLUTION_COMPETITORS[cs.title];
                              if (!competitors) return null;
                              return (
                                <div className="mt-3 flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground/55">
                                  <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
                                  <span>Competitors in this space: {competitors[0]}, {competitors[1]}</span>
                                </div>
                              );
                            })()}
                            <button
                              type="button"
                              onClick={() => {
                                setFocusedCustomIdx(null);
                                setFeasibilityCustom(cs);
                                setIsFeasibilityOpen(true);
                              }}
                              className="mt-4 inline-flex h-7 items-center gap-1 rounded-md border border-primary/40 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                            >
                              Explore Feasibility
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })()}
            </div>
          )}

          {/* ── EXPORT ── */}
          {activeTab === "export" && (
            <div className="space-y-12 focus-visible:outline-none">
              <section className="glass-panel-strong space-y-6 rounded-xl p-8 sm:p-10">
                <h2 className="type-section-label">Pitch deck</h2>
                <div className="space-y-2">
                  {data.solutions.map((s) => (
                    <label
                      key={s.challengeIds[0]}
                      className="-mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-black/[0.04]"
                    >
                      <div className="relative mt-0.5 flex shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-black/[0.12] bg-white checked:border-primary checked:bg-primary"
                        />
                        <Check
                          className="pointer-events-none absolute h-2.5 w-2.5 text-primary-foreground opacity-0 peer-checked:opacity-100"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-sm leading-snug text-foreground">
                        <span className="font-medium">{s.product}</span>
                        <span className="font-normal text-muted-foreground"> · {challengeTitles(s)}</span>
                        <span className="tabular-nums font-normal text-muted-foreground"> · {s.impactScore}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" className="h-11" onClick={() => handleExport("PowerPoint")}>
                    <Presentation className="mr-2 h-3.5 w-3.5" />
                    PowerPoint
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11"
                    onClick={() => handleExport("Canva")}
                  >
                    <Palette className="mr-2 h-3.5 w-3.5" />
                    Canva
                  </Button>
                </div>
              </section>

              <div className="flex flex-wrap gap-2">
                <Button type="button" className="h-11 gap-2" onClick={handleSaveToCRM}>
                  <Save className="h-3.5 w-3.5" />
                  Save to CRM
                </Button>
              </div>

              <section className="glass-panel rounded-xl p-8 sm:p-10">
                <h2 className="type-section-label mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  Confidence
                </h2>
                <div className="flex items-end justify-between gap-4">
                  <p className="max-w-md text-sm font-normal leading-relaxed text-muted-foreground">
                    {data.sources} sources · ESG, CSRD, filings, regulatory DBs
                  </p>
                  <p className="text-3xl font-medium tabular-nums leading-none tracking-tight text-primary">
                    {data.score}%
                  </p>
                </div>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-1 rounded-full bg-primary transition-[width] duration-300"
                    style={{ width: `${data.score}%` }}
                  />
                </div>
              </section>

              <section>
                <h2 className="type-section-label mb-2">Benchmarks</h2>
                <div className="glass-panel divide-y divide-black/[0.06] overflow-hidden rounded-xl">
                  {data.benchmarks.map((b) => (
                    <div
                      key={b.metric}
                      className="flex flex-wrap items-baseline justify-between gap-2 px-3 py-2.5 text-sm"
                    >
                      <span className="leading-snug text-muted-foreground">{b.metric}</span>
                      <span className="tabular-nums font-medium text-foreground">{b.value}</span>
                      <span className="type-eyebrow w-full normal-case leading-snug text-muted-foreground">
                        {b.context}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="type-section-label mb-2">Targets</h2>
                <div className="glass-panel divide-y divide-black/[0.06] overflow-hidden rounded-xl">
                  {data.contacts.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.role} className="flex items-center gap-3 px-3 py-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-[#fafafc]">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                        </div>
                        <span className="flex-1 text-sm font-medium text-foreground">{c.role}</span>
                        <div className="flex shrink-0 items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-foreground"
                            aria-label={`View ${c.role} on LinkedIn`}
                            onClick={() => toast({ title: "Coming soon" })}
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-foreground"
                            aria-label={`Email ${c.role}`}
                            onClick={() => toast({ title: "Coming soon" })}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            className="ml-1 h-9"
                            onClick={() => toast({ title: "Coming soon" })}
                          >
                            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                            Enrich Profile
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </Tabs>

      {/* ── Feasibility Modal ── */}
      {/* ── Win Strategy Modal ── */}
      {(() => {
        const ws = winStrategyData[queryKey ?? ""] ?? null;
        const obsCard = winStrategyModal
          ? (ws?.whyOBS.find((c) => c.solution === winStrategyModal.product) ?? null)
          : null;
        return (
          <Dialog open={!!winStrategyModal} onOpenChange={(open) => { if (!open) setWinStrategyModal(null); }}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="leading-snug tracking-tight">
                  {winStrategyModal?.product}
                </DialogTitle>
                <DialogDescription>Win Strategy</DialogDescription>
              </DialogHeader>
              {ws && winStrategyModal && (
                <div className="mt-2 space-y-6">

                  {/* Why Now */}
                  <div>
                    <p className="type-eyebrow mb-2 flex items-center gap-1.5">
                      <AlertCircle className="h-3 w-3 text-primary" aria-hidden /> Why Now
                    </p>
                    <div className="space-y-2">
                      {ws.whyNow.map((sig, i) => (
                        <div key={i} className="glass-panel rounded-xl px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                              <span className={cn(
                                "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.06em]",
                                sig.urgency === "Critical" && "text-red-600 bg-red-50 border-red-200/80",
                                sig.urgency === "High" && "text-amber-600 bg-amber-50 border-amber-200/80",
                                sig.urgency === "Medium" && "text-yellow-700 bg-yellow-50 border-yellow-200/80",
                              )}>
                                {sig.urgency}
                              </span>
                              <p className="text-sm font-medium leading-snug text-foreground">{sig.title}</p>
                            </div>
                            {sig.daysUntilDeadline !== undefined && (
                              <span className={cn(
                                "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold tabular-nums",
                                sig.daysUntilDeadline <= 30
                                  ? "border-red-200/80 bg-red-50 text-red-600"
                                  : "border-black/[0.08] bg-[#fafafc] text-muted-foreground"
                              )}>
                                <Calendar className="h-2.5 w-2.5" aria-hidden />
                                {sig.daysUntilDeadline}d
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why OBS — only if a card matches this solution */}
                  {obsCard && (() => {
                    // Split a differentiator string into [OBS-positive, competitor-negative].
                    // Splits on " — " or "; ", assigning the part that names a competitor (or
                    // starts with "no competitor") to the competitor column. Returns "" for the
                    // competitor side when no explicit counter-point can be derived.
                    const parseDiff = (text: string, comps: string[]): [string, string] => {
                      const re = new RegExp(comps.join("|"), "i");
                      const assign = (a: string, b: string): [string, string] => {
                        if (re.test(b) || /^no competitor/i.test(b)) return [a, b];
                        if (re.test(a)) return [b, a];
                        return [a, ""];
                      };
                      if (text.includes(" — ")) {
                        const idx = text.indexOf(" — ");
                        return assign(text.slice(0, idx).trim(), text.slice(idx + 3).trim());
                      }
                      if (text.includes("; ")) {
                        const idx = text.indexOf("; ");
                        return assign(text.slice(0, idx).trim(), text.slice(idx + 2).trim());
                      }
                      return [text, ""];
                    };
                    return (
                      <div>
                        <p className="type-eyebrow mb-2 flex items-center gap-1.5">
                          <ShieldCheck className="h-3 w-3 text-primary" aria-hidden /> Why OBS
                        </p>
                        <div className="glass-panel overflow-hidden rounded-xl">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-black/[0.06]">
                                <th className="w-1/2 px-4 py-2.5 text-left text-[0.6875rem] font-semibold uppercase tracking-wide text-foreground">
                                  Orange Business
                                </th>
                                <th className="w-1/2 px-4 py-2.5 text-left text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                                  {obsCard.competitors.join(" / ")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {obsCard.differentiators.map((d, j) => {
                                const [obsText, compText] = parseDiff(d, obsCard.competitors);
                                return (
                                  <tr key={j} className="border-b border-black/[0.06] last:border-0">
                                    <td className="px-4 py-3 align-top">
                                      <div className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
                                        <span className="text-[0.8125rem] leading-snug text-foreground">{obsText}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                      <div className="flex items-start gap-2">
                                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" aria-hidden />
                                        <span className="text-[0.8125rem] leading-snug text-muted-foreground">
                                          {compText || "—"}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })()}

                  {/* How to Win */}
                  <div>
                    <p className="type-eyebrow mb-2 flex items-center gap-1.5">
                      <Users className="h-3 w-3 text-primary" aria-hidden /> How to Win
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {ws.howToWin.map((st, i) => (
                        <div key={i} className="glass-panel rounded-xl px-4 py-4">
                          <p className="type-eyebrow mb-1">{st.archetype}</p>
                          <p className="text-sm font-semibold leading-snug text-foreground">{st.title}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{st.concern}</p>
                          <div className="mt-3 rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-2">
                            <p className="text-xs leading-relaxed text-foreground">"{st.opener}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </DialogContent>
          </Dialog>
        );
      })()}

      <Dialog open={isFeasibilityOpen} onOpenChange={setIsFeasibilityOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="leading-snug tracking-tight">
              {feasibilityCustom?.title}
            </DialogTitle>
            <DialogDescription className="mt-1 leading-relaxed">
              {feasibilityCustom?.description}
            </DialogDescription>
          </DialogHeader>
          {feasibilityCustom && (
            <div className="mt-1 space-y-5">
              {/* Divisions */}
              <div>
                <p className="type-eyebrow mb-2">OBS Divisions Involved</p>
                <div className="flex flex-wrap gap-1.5">
                  {feasibilityCustom.divisions.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-sky-200/70 bg-sky-50 px-2.5 py-0.5 text-[0.75rem] font-medium text-sky-700"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feasibility Notes */}
              <div>
                <p className="type-eyebrow mb-2">Feasibility Notes</p>
                <p className="rounded-lg border border-black/[0.06] bg-[#fafafc] px-4 py-3 text-[0.8125rem] leading-relaxed text-foreground">
                  {feasibilityCustom.feasibilityNotes}
                </p>
              </div>

              {/* Challenge addressed */}
              <div>
                <p className="type-eyebrow mb-1">Challenge Addressed</p>
                <p className="text-sm text-muted-foreground">{feasibilityCustom.challengeAddressed}</p>
              </div>

              {/* CTA row */}
              <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
                <button
                  type="button"
                  onClick={() => setIsFeasibilityOpen(false)}
                  className="inline-flex h-9 items-center rounded-lg border border-black/[0.1] bg-transparent px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/[0.04]"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-primary px-4 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  Schedule Internal Review
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Draft Email Modal ── */}
      <Dialog open={isDraftOpen} onOpenChange={setIsDraftOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Draft Email</DialogTitle>
            <DialogDescription>
              {draftContact?.role} · {companyName}
            </DialogDescription>
          </DialogHeader>
          {draftContact && topChallenge && (
            <>
              <pre className="mt-2 max-h-80 overflow-y-auto whitespace-pre-wrap rounded-lg border border-black/[0.06] bg-[#fafafc] p-4 font-sans text-[0.8125rem] leading-relaxed text-foreground">
                {buildDraftEmail(
                  draftContact.role,
                  companyName,
                  topChallenge,
                  topChallengeSolution
                )}
              </pre>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      buildDraftEmail(
                        draftContact.role,
                        companyName,
                        topChallenge,
                        topChallengeSolution
                      )
                    );
                    toast({ title: "Copied", description: "Email draft copied to clipboard." });
                  }}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Copy to clipboard
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
