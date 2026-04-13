export type UrgencyLevel = "Critical" | "High" | "Medium";

export interface LiveSignal {
  title: string;
  description: string;
  urgency: UrgencyLevel;
  daysUntilDeadline?: number; // hardcoded as of 2026-04-13
}

export interface WhyOBSCard {
  solution: string;
  competitors: string[];     // exactly 2
  differentiators: string[]; // exactly 3
}

export type StakeholderArchetype =
  | "Economic Buyer"
  | "Technical Evaluator"
  | "Internal Champion"
  | "Likely Blocker";

export interface Stakeholder {
  archetype: StakeholderArchetype;
  title: string;
  concern: string;
  opener: string;
}

export interface WinStrategy {
  whyNow: LiveSignal[];
  whyOBS: WhyOBSCard[];
  howToWin: Stakeholder[];
}

export const winStrategyData: Record<string, WinStrategy> = {
  renault: {
    whyNow: [
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Phase 1 CSRD requires auditor sign-off on FY2025 ESG data by June 30. Fleet lifecycle and Scope 3 supplier data are the two open gaps.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "EU Fleet CO2 2025 Penalty Assessment",
        description:
          "Renault faces €7.5M+ in projected OEM pool penalties if the 2025 fleet-average CO2 target is missed — final regulatory assessment is published Q2 2026.",
        urgency: "Critical",
      },
      {
        title: "EU Battery Regulation Passport Mandate",
        description:
          "EU Battery Regulation digital passport requirement enters force for industrial batteries in February 2027. Renault's EV lines need traceability infrastructure operational by Q3 2026.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Ocean + Circular Mobility",
        competitors: ["Capgemini", "IBM"],
        differentiators: [
          "OBS owns the full IoT-to-fleet connectivity stack; Capgemini resells third-party telematics with no network layer.",
          "Orange's sovereign French data centres mean fleet telemetry never leaves EU jurisdiction — critical for Renault's CSRD audit trail.",
          "Circular Mobility closes the EV battery end-of-life loop that pure software vendors cannot address without hardware partners.",
        ],
      },
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "Accenture"],
        differentiators: [
          "Siemens requires a full BMS replacement; Orange connects to existing Renault plant infrastructure via non-invasive IoT overlay.",
          "Orange Cyberdefense is embedded in the IoT layer — manufacturing OT security is included, not a separate SOW.",
          "Self-funding model: energy savings at Flins and Douai cover the subscription cost within 14 months based on comparable plant deployments.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO / VP Finance",
        concern: "OEM CO2 penalty exposure and CapEx justification for ESG platforms.",
        opener:
          "What's Renault's current estimate of the 2025 fleet CO2 penalty, and has finance modelled the offset from a mobility optimisation programme?",
      },
      {
        archetype: "Technical Evaluator",
        title: "VP Manufacturing Operations",
        concern: "Integration downtime and compatibility with existing MES systems at Flins and Douai.",
        opener:
          "How are you currently capturing energy data at line level — is it manual meter reads or do you have SCADA feeds we can plug into directly?",
      },
      {
        archetype: "Internal Champion",
        title: "Chief Sustainability Officer",
        concern: "Needs audit-ready CSRD data by June and a credible vendor narrative for the board.",
        opener:
          "Which ESRS indicators are you most nervous about for the June sign-off — E1 Scope 1 or E1 Scope 3 fleet data?",
      },
      {
        archetype: "Likely Blocker",
        title: "Group CIO / IT Procurement",
        concern: "Data sovereignty, vendor lock-in, and adding another connectivity layer to OT environments.",
        opener:
          "Orange Business runs its own sovereign cloud infrastructure in France — does that change the residency conversation for manufacturing telemetry?",
      },
    ],
  },

  carrefour: {
    whyNow: [
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Cold chain energy data and Scope 3 food waste volumes are the two ESRS E1/E5 gaps most likely to trigger a qualified audit opinion.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "EU F-Gas Regulation Phase-Down",
        description:
          "The 2024 F-Gas Regulation phase-down tightens HFC refrigerant availability through 2026, increasing cold chain maintenance costs and audit scrutiny on refrigerant leakage rates.",
        urgency: "High",
      },
      {
        title: "Last-Mile ZFE Access Restrictions",
        description:
          "Paris, Lyon, and Brussels zero-emission urban logistics zones take full effect H2 2026. Carrefour's diesel last-mile fleet faces access restrictions across 40% of French urban stores.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "IBM"],
        differentiators: [
          "Orange connects to Carrefour's existing refrigeration BMS without rip-and-replace — Siemens typically requires proprietary controller upgrades.",
          "Anomaly detection alerts are actionable within 90 seconds; IBM's platform requires a separate analytics SOW before alerting is live.",
          "The IoT subscription is revenue-positive within 18 months from energy savings — a CFO-ready business case at store level.",
        ],
      },
      {
        solution: "Ocean Platform",
        competitors: ["Capgemini", "Accenture"],
        differentiators: [
          "Ocean's route optimisation uses live Orange network traffic data — no competitor has carrier-grade real-time urban congestion as a routing input.",
          "Capgemini's last-mile offering is consulting-led with no proprietary platform; Orange delivers SaaS with defined SLAs.",
          "Orange's existing relationships with Carrefour's logistics subcontractors (DHL, Chronopost) accelerate onboarding by 6–8 weeks.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO / Deputy CEO",
        concern: "Cold chain CapEx cycle and demonstrating ESG ROI to activist investors.",
        opener:
          "Has finance quantified the annual energy cost of the cold chain estate — and what would a 20% reduction mean for Carrefour's reported Scope 2?",
      },
      {
        archetype: "Technical Evaluator",
        title: "Director of Digital Transformation",
        concern: "API compatibility with Carrefour's existing ERP and store management platforms.",
        opener:
          "What integration standards does your current BMS infrastructure use — Modbus, BACnet, or proprietary Carrier protocols?",
      },
      {
        archetype: "Internal Champion",
        title: "Head of Supply Chain and Logistics",
        concern: "Hit the last-mile zero-emission target before ZFE access restrictions bite.",
        opener:
          "Which stores are most exposed to the Paris and Lyon ZFE expansion in H2 2026 — have you mapped the diesel fleet by zone?",
      },
      {
        archetype: "Likely Blocker",
        title: "VP of Store Operations",
        concern: "Sensor installation disruption to store trading hours and staff retraining burden.",
        opener:
          "Would a pilot in five off-peak-trading hypermarkets de-risk the rollout model enough to proceed without a full store operations review?",
      },
    ],
  },

  stellantis: {
    whyNow: [
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Multi-brand consolidation of Scope 1 and Scope 3 fleet CO2 data across 15 brands is the highest-risk ESRS E1 item — auditors are already flagging methodology gaps.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "EU Fleet CO2 Pool Compliance 2025",
        description:
          "Stellantis faces potential €6.2B in EU fleet CO2 fines if the 2025 targets are missed across its brand pool — Q2 2026 is the regulatory assessment trigger point.",
        urgency: "Critical",
      },
      {
        title: "EU Battery Regulation Passport — 2027 Mandate",
        description:
          "Industrial EV batteries require digital passports from February 2027. Stellantis needs a data architecture across all 15 brands operational by Q3 2026.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Ocean + Circular Mobility",
        competitors: ["IBM", "Capgemini"],
        differentiators: [
          "Orange's Circular Mobility platform covers all 15 Stellantis brands under one contract; IBM's fleet platform requires per-brand licensing and separate data integrations.",
          "OBS provides the managed connectivity backbone (private 5G / LTE across European plants) — Capgemini cannot deliver this as part of a fleet solution.",
          "End-of-life battery traceability is native to Circular Mobility — competitors offer it only as a consulting add-on with 9-month implementation timelines.",
        ],
      },
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "Accenture"],
        differentiators: [
          "Orange's non-invasive IoT overlay works across Stellantis's 40+ heterogeneous plant environments without requiring Siemens proprietary controllers.",
          "Orange Cyberdefense provides OT security across all connected plant assets as part of the IoT subscription — no separate security SOW.",
          "Plant-level energy dashboards are CSRD-ready out of the box; Accenture's energy consulting delivers reports, not live data infrastructure.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO (Stellantis SE)",
        concern: "The €6.2B fleet CO2 fine exposure and ESG premium in sustainable bond markets.",
        opener:
          "Has the finance team modelled the NPV of avoiding the 2025 fleet CO2 penalty against the cost of a mobility optimisation platform across the EU brand pool?",
      },
      {
        archetype: "Technical Evaluator",
        title: "VP of Manufacturing Operations",
        concern: "Deploying a consistent IoT solution across 40+ plants with different legacy systems.",
        opener:
          "Which plants have the highest energy intensity per vehicle produced — and do you have SCADA connectivity at line level, or are you still on manual meter reads?",
      },
      {
        archetype: "Internal Champion",
        title: "Chief Sustainability Officer",
        concern: "Consolidate multi-brand CSRD data and close the Scope 3 fleet gap before June.",
        opener:
          "Which of the 15 brands has the weakest ESG data quality today — and is that the one most likely to trigger a qualified audit opinion?",
      },
      {
        archetype: "Likely Blocker",
        title: "Group CIO / IT Architecture",
        concern: "Data sovereignty across a multinational brand structure and IT integration complexity.",
        opener:
          "Would a sovereign cloud architecture hosted in Orange's French and German data centres resolve the residency requirements across your brand legal entities?",
      },
    ],
  },

  totalenergies: {
    whyNow: [
      {
        title: "EU ETS Allowance Surrender 2025",
        description:
          "EU ETS allowances for 2025 refining and LNG emissions must be surrendered by April 30. Any over-allowance gap triggers spot market purchases at current €65/tonne.",
        urgency: "Critical",
        daysUntilDeadline: 17,
      },
      {
        title: "EU Taxonomy FY2025 Disclosure",
        description:
          "TotalEnergies' renewables CapEx Taxonomy-alignment percentage is under direct investor scrutiny. Methodological gaps in the Substantial Contribution calculation risk a downgrade in the sustainability-linked bond covenant.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "Scope 3 Investor Ultimatum — June AGM",
        description:
          "Three major institutional investors have tabled shareholder resolutions for the June 2026 AGM requiring a Scope 3 reduction pathway with verifiable annual milestones.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "IBM"],
        differentiators: [
          "Orange operates private 5G networks certified for ATEX Zone 2 refinery environments — Siemens requires a separate certified integrator to deploy in explosive atmospheres.",
          "IoT telemetry from refinery process units feeds directly into Orange's sovereign French cloud — IBM routes data through US data centres incompatible with TotalEnergies' sovereignty policy.",
          "Real-time flare monitoring reduces EU ETS over-allowance purchasing at €65/tonne — the ROI case is directly quantifiable from existing emissions data.",
        ],
      },
      {
        solution: "Evolution Platform",
        competitors: ["Accenture", "IBM"],
        differentiators: [
          "Orange's Evolution Platform is pre-built for CSRD and EU Taxonomy reporting templates; Accenture delivers bespoke consulting with no reusable platform.",
          "The platform aggregates Scope 3 downstream data via API from TotalEnergies' fuel retail network — IBM's ESG platform requires manual data ingestion.",
          "GreenOps principles are embedded in the platform architecture — not an add-on — reducing TotalEnergies' own Scope 3 from its IT estate simultaneously.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO (TotalEnergies SE)",
        concern: "EU ETS cost exposure and Taxonomy-alignment percentage affecting sustainable bond coupon rates.",
        opener:
          "With EU ETS at €65/tonne, what's TotalEnergies' projected over-allowance requirement for 2025 — and how much is attributable to refinery flaring that real-time monitoring could have prevented?",
      },
      {
        archetype: "Technical Evaluator",
        title: "VP of Operational Excellence",
        concern: "ATEX certification for IoT deployment in refinery zones and SCADA integration complexity.",
        opener:
          "At Gonfreville, are you using a Honeywell or ABB DCS — and has your operations team done a connectivity feasibility assessment for Zone 2 IoT sensors?",
      },
      {
        archetype: "Internal Champion",
        title: "Head of ESG Reporting & Investor Relations",
        concern: "Needs verifiable Taxonomy-eligible CapEx data and Scope 3 milestones before the June AGM.",
        opener:
          "Which line items in the FY2025 Taxonomy report are you most uncertain about for the Substantial Contribution test — is the gap in the data or the methodology?",
      },
      {
        archetype: "Likely Blocker",
        title: "Director of Information Systems / CISO",
        concern: "Data sovereignty for refinery operational data and cybersecurity of OT environments.",
        opener:
          "Orange Cyberdefense is embedded in the IoT layer and all data is processed in Orange's sovereign French infrastructure — does that satisfy your OT security and data localisation requirements?",
      },
    ],
  },

  saintgobain: {
    whyNow: [
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Float glass furnace decarbonisation data and Environmental Product Declaration coverage are the two ESRS E1/E5 gaps most exposed to auditor qualification.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "EU ETS 2025 Allowance Surrender",
        description:
          "Saint-Gobain's glass furnaces are among the highest EU ETS-exposed industrial assets in the portfolio — the 2025 allowance surrender deadline is April 30.",
        urgency: "High",
        daysUntilDeadline: 17,
      },
      {
        title: "EU Construction Products Regulation — EPD Mandate",
        description:
          "The revised EU CPR requires third-party verified Environmental Product Declarations for all structural products by January 2027. Saint-Gobain's construction market access depends on this pipeline.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "IBM"],
        differentiators: [
          "Orange's IoT overlay connects to Saint-Gobain's existing furnace SCADA without replacing the process control layer — Siemens requires a full BMS upgrade to unlock energy analytics.",
          "Real-time energy monitoring at furnace level provides CSRD-auditable Scope 1 data with no manual reconciliation — IBM requires a separate data engineering engagement.",
          "Predictive maintenance alerts from furnace sensor anomalies reduce unplanned shutdown costs, which at a float glass line exceed €800K per incident.",
        ],
      },
      {
        solution: "Evolution Platform",
        competitors: ["Accenture", "Capgemini"],
        differentiators: [
          "The Evolution Platform generates EPD-compatible product carbon footprint data natively — Accenture's sustainability consulting produces reports, not machine-readable EPD inputs.",
          "Orange's GreenOps framework maps directly to the EU Construction Products Regulation EPD methodology — no bespoke configuration needed.",
          "Capgemini's supply chain traceability offering has no construction industry reference implementation; Orange has documented deployments in process manufacturing.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO / Deputy CEO",
        concern: "EU ETS cost exposure from furnace emissions and CapEx required for electrification transition.",
        opener:
          "What's Saint-Gobain's EU ETS budget for 2026 based on current furnace profiles — and how would a 15% reduction in furnace energy intensity change that allowance requirement?",
      },
      {
        archetype: "Technical Evaluator",
        title: "VP of Industrial Operations",
        concern: "Integration with legacy float glass furnace control systems in a continuous-process environment.",
        opener:
          "Are your furnace SCADA systems on a proprietary Siemens or Rockwell stack — and do you have existing historian data we could use to baseline the energy optimisation model?",
      },
      {
        archetype: "Internal Champion",
        title: "Chief Sustainability Officer",
        concern: "Needs furnace-level decarbonisation data for CSRD and a credible EPD pipeline for the construction market.",
        opener:
          "Which product lines are most at risk of losing construction market access if EPD coverage isn't in place by the 2027 EU CPR deadline?",
      },
      {
        archetype: "Likely Blocker",
        title: "Head of Product Compliance & Certification",
        concern: "Legal validity of AI-assisted EPDs and data quality for regulatory submissions.",
        opener:
          "The Evolution Platform generates EPD inputs conforming to ISO 14044 and EN 15804 — would a technical review with your certification team confirm it meets your third-party verifier's requirements?",
      },
    ],
  },

  schneiderelectric: {
    whyNow: [
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Schneider's ESRS E1 Category 11 Scope 3 disclosure is the most scrutinised item — product-in-use emissions methodology must be auditor-approved by June.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "EU Right to Repair — Transposition Deadline",
        description:
          "Member states must transpose the Right to Repair Directive by July 31, 2026. Schneider's WEEE and repairability obligations across its product range require a compliance data infrastructure now.",
        urgency: "High",
      },
      {
        title: "Supplier ESG Audit Wave — CSRD Art. 29",
        description:
          "CSRD Article 29 due diligence obligations require Schneider to verify ESG data from Tier 1 suppliers by FY2025. With 50,000+ suppliers, manual audit coverage is not viable.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Evolution Platform",
        competitors: ["IBM", "Accenture"],
        differentiators: [
          "Orange's Evolution Platform has a pre-built CSRD ESRS E1 Category 11 module for product-in-use emissions — IBM requires 6+ months of custom configuration for this specific disclosure.",
          "The platform ingests telemetry from Schneider's deployed EcoStruxure devices directly, building a live Scope 3 Category 11 dataset without an Accenture consulting layer.",
          "Supplier ESG data collection is built in via automated supplier portal — IBM's approach relies on manual questionnaire workflows.",
        ],
      },
      {
        solution: "Ocean + Circular Mobility",
        competitors: ["Capgemini", "Siemens"],
        differentiators: [
          "Orange's Circular Mobility covers WEEE compliance tracking and product return logistics — Capgemini's offering requires a separate WEEE specialist sub-contractor.",
          "Right to Repair documentation for each product SKU is generated automatically from the platform — Siemens does not offer a WEEE/repairability compliance module.",
          "Orange's connectivity infrastructure enables end-of-life device tracking across Schneider's installed base in 100+ countries — a capability requiring carrier-grade global presence no competitor can match.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO (Schneider Electric SE)",
        concern: "CSRD audit qualification risk and cost of manual supplier ESG verification at scale.",
        opener:
          "What's the current cost of your supplier ESG audit programme for 50,000+ Tier 1 suppliers — and what would a qualified CSRD audit opinion cost in terms of investor relations and bond pricing?",
      },
      {
        archetype: "Technical Evaluator",
        title: "Director of Digital Infrastructure",
        concern: "Integration with EcoStruxure and existing Schneider IT architecture.",
        opener:
          "Does EcoStruxure already expose device telemetry via API — and would you need us to build a dedicated connector, or is the existing EcoStruxure data lake accessible?",
      },
      {
        archetype: "Internal Champion",
        title: "Chief Sustainability Officer",
        concern: "Needs a Category 11 Scope 3 methodology that withstands auditor scrutiny and investor challenge.",
        opener:
          "Which EcoStruxure product lines generate the largest Category 11 emissions volumes — and do you have live telemetry from deployed units, or is it currently modelled from sales data?",
      },
      {
        archetype: "Likely Blocker",
        title: "VP Supply Chain & Procurement",
        concern: "Supplier adoption of a new data portal and disruption to existing procurement relationships.",
        opener:
          "What if we started with just the top 200 suppliers by spend — what adoption rate would you need to see to justify a full rollout?",
      },
    ],
  },

  veolia: {
    whyNow: [
      {
        title: "EU ETS 2025 Surrender — Waste-to-Energy",
        description:
          "Veolia's waste-to-energy facilities are material EU ETS participants. The April 30 allowance surrender deadline creates immediate cash exposure if monitoring data is incomplete.",
        urgency: "Critical",
        daysUntilDeadline: 17,
      },
      {
        title: "EU Drinking Water Directive — PFAS Enforcement",
        description:
          "Revised PFAS limits under the EU Drinking Water Directive are under active enforcement across French and Dutch concessions from Q1 2026. A single exceedance triggers a mandatory public notification.",
        urgency: "High",
      },
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Veolia's Scope 1 waste processing emissions and Scope 3 client waste volumes are the two ESRS E1 disclosures most likely to face auditor challenge.",
        urgency: "High",
        daysUntilDeadline: 78,
      },
    ],
    whyOBS: [
      {
        solution: "Ocean + Circular Mobility",
        competitors: ["IBM", "Capgemini"],
        differentiators: [
          "Orange's Circular Mobility covers Veolia's mixed field operations fleet — waste collection, water treatment, hazmat transport — under one platform; IBM's fleet solution is logistics-only.",
          "Route optimisation uses Orange's live network traffic data, reducing field operations diesel consumption without hardware changes to existing vehicles.",
          "Capgemini's fleet offering has no operator safety module; Orange integrates driver behaviour monitoring with eco-driving scores across Veolia's 15,000-vehicle fleet.",
        ],
      },
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "Accenture"],
        differentiators: [
          "Orange's IoT overlay monitors waste-to-energy plant energy flows in real time, providing CSRD-auditable Scope 1 data with full chain of custody — Siemens requires a full SCADA upgrade.",
          "Predictive anomaly detection on combustion processes reduces unplanned EU ETS over-allowance events — Accenture's energy consulting cannot provide this real-time capability.",
          "Orange Cyberdefense secures water treatment OT environments against critical infrastructure threat vectors — included in the IoT subscription.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO (Veolia Environnement)",
        concern: "EU ETS cost exposure from waste-to-energy and financial risk of a PFAS public notification event.",
        opener:
          "What's Veolia's EU ETS budget for 2026 based on waste-to-energy combustion volumes — and has finance modelled the cost of a single PFAS exceedance notification event?",
      },
      {
        archetype: "Technical Evaluator",
        title: "VP Water Treatment Operations",
        concern: "PFAS sensor validation and regulatory acceptance of automated monitoring data in concession reporting.",
        opener:
          "Which concessions have the highest PFAS risk profile — and are you currently using lab sampling only, or do you have any inline sensor infrastructure we could build on?",
      },
      {
        archetype: "Internal Champion",
        title: "Chief Sustainability Officer",
        concern: "Needs audit-ready Scope 1 emissions data from waste processing and a credible PFAS compliance narrative.",
        opener:
          "For the CSRD June sign-off, which waste-to-energy sites are you least confident about — is it the combustion measurement methodology or the waste composition inputs?",
      },
      {
        archetype: "Likely Blocker",
        title: "Director of Regulatory Affairs",
        concern: "Regulatory acceptance of IoT-based monitoring data versus accredited laboratory analysis for concession compliance.",
        opener:
          "Orange's IoT monitoring data is structured to meet EN ISO 17025 audit trail requirements — would a session with your regulatory team and our technical lead confirm it meets the concession reporting standard?",
      },
    ],
  },

  airfranceklm: {
    whyNow: [
      {
        title: "EU ETS Aviation 2025 Compliance",
        description:
          "Air France-KLM's 2025 EU ETS aviation allowance surrender is due April 30. Any shortfall requires spot market purchases at current €65/tonne — the group's second-largest variable compliance cost.",
        urgency: "Critical",
        daysUntilDeadline: 17,
      },
      {
        title: "ReFuelEU SAF Blending Verification",
        description:
          "The 2% ReFuelEU SAF blending mandate for 2025 is under active verification by EU airport authorities. Supply chain traceability gaps risk a €100/tonne deficiency penalty per metric tonne of aviation fuel.",
        urgency: "Critical",
      },
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Aviation Scope 1 emissions and SAF mass balance documentation are the two ESRS E1 gaps most exposed to auditor qualification at board level.",
        urgency: "High",
        daysUntilDeadline: 78,
      },
    ],
    whyOBS: [
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "IBM"],
        differentiators: [
          "Orange's IoT overlay connects to ground operations energy systems at CDG and AMS without requiring airport infrastructure modifications — Siemens requires full BMS replacement.",
          "Real-time ground operations energy monitoring provides CSRD-auditable Scope 2 data by airport — IBM aggregates at group level only, losing per-airport granularity needed for concession reporting.",
          "Gate electrification tracking (GPU vs APU usage) is built into the Smart Eco Energy dashboard — directly linked to the Air France-KLM 2025 ground Scope 1 reduction target.",
        ],
      },
      {
        solution: "Evolution Platform",
        competitors: ["Accenture", "Capgemini"],
        differentiators: [
          "Orange's Evolution Platform has a pre-built ReFuelEU mass balance module that generates CORSIA-compatible lifecycle documentation — Accenture requires 12-month bespoke development.",
          "SAF chain-of-custody data from multiple suppliers is ingested via API — Capgemini's approach relies on manual supplier document collection.",
          "The platform integrates directly with Air France-KLM's existing ERP to generate regulatory submissions without a separate data engineering engagement.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO (Air France-KLM Group)",
        concern: "EU ETS spot market cost exposure and ReFuelEU deficiency penalty risk across CDG and AMS hubs.",
        opener:
          "With EU ETS at €65/tonne, what's the group's projected allowance shortfall for 2025 — and has finance modelled the cost of a ReFuelEU deficiency penalty across CDG and AMS hub volumes?",
      },
      {
        archetype: "Technical Evaluator",
        title: "Director of Fleet & Engineering",
        concern: "IoT integration with ground support equipment across two hub airports with different infrastructure owners.",
        opener:
          "At CDG, does Air France control the gate energy infrastructure directly, or is it managed by ADP — and does that change the IoT deployment model for GPU monitoring?",
      },
      {
        archetype: "Internal Champion",
        title: "Head of SAF Procurement & Strategy",
        concern: "Needs a defensible SAF traceability platform before the ReFuelEU verification window closes.",
        opener:
          "Which SAF suppliers are you most concerned about for mass balance documentation completeness — do they provide digital sustainability certificates or is it still paper-based?",
      },
      {
        archetype: "Likely Blocker",
        title: "VP Ground Operations",
        concern: "Sensor installation disruption to operational turnaround times at CDG and AMS.",
        opener:
          "What if we started with a 10-gate pilot at CDG on a low-frequency rotation slot — what uptime SLA would you need from Orange to proceed without a full ground operations review?",
      },
    ],
  },

  danone: {
    whyNow: [
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Agricultural Scope 3 Category 1 emissions from 20,000+ dairy suppliers are the single highest-risk ESRS E1 disclosure — auditors are already requesting farm-level methodology documentation.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "EU EPR — Plastic Packaging Rates",
        description:
          "France's EPR contribution rates for plastic packaging increased 35% from January 2026. Danone's packaging portfolio requires traceability data to qualify for recycled content fee reductions.",
        urgency: "High",
      },
      {
        title: "Activist Investor Scope 3 Resolution — June AGM",
        description:
          "Two major institutional shareholders have tabled a resolution at the June 2026 AGM requiring Danone to publish farm-level Scope 3 baselines by FY2026.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Evolution Platform",
        competitors: ["IBM", "Accenture"],
        differentiators: [
          "Orange's Evolution Platform collects farm-level ESG data via a mobile-first supplier portal accessible to smallholder dairy farmers — IBM's platform is enterprise-only and requires desktop connectivity most farms lack.",
          "Scope 3 Category 1 calculation is built into the platform using IPCC Tier 2 agricultural emission factors — Accenture delivers a consulting methodology, not a live calculation engine.",
          "Packaging traceability and EPR reporting are integrated into the same platform, reducing Danone's vendor count for ESG data infrastructure.",
        ],
      },
      {
        solution: "Smart Eco Energy",
        competitors: ["Siemens", "Capgemini"],
        differentiators: [
          "Orange's IoT connects to Danone's existing plant energy management systems without requiring BMS replacement — Siemens mandates proprietary hardware upgrades.",
          "Water consumption monitoring is native to the Smart Eco Energy platform — critical for Danone's ESRS E3 water intensity disclosure — Capgemini's energy offering does not cover water.",
          "Self-funding model: energy and water savings across Danone's 100+ European plants cover the platform cost within 20 months.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO (Danone SA)",
        concern: "EPR contribution rate exposure and Scope 3 audit qualification risk ahead of the June AGM investor resolution.",
        opener:
          "Has finance modelled the EPR fee reduction Danone could capture with verified recycled content data — and what does the AGM Scope 3 resolution cost in investor confidence if farm baselines aren't ready?",
      },
      {
        archetype: "Technical Evaluator",
        title: "Director of Industrial Operations",
        concern: "Plant integration and whether IoT sensors can capture water and energy data without disrupting continuous production.",
        opener:
          "Which plants run the longest continuous production cycles — and do you have maintenance windows long enough for a non-invasive IoT installation, or would we need to schedule around a planned shutdown?",
      },
      {
        archetype: "Internal Champion",
        title: "Chief Sustainability Officer",
        concern: "Needs farm-level Scope 3 baselines and a supplier portal that 20,000+ dairy farmers can actually use.",
        opener:
          "What language and connectivity constraints do you face with your smallest dairy suppliers — and have you tested any digital data collection tools with them, or is it still manual audit forms?",
      },
      {
        archetype: "Likely Blocker",
        title: "VP Agricultural Sourcing & Supply Chain",
        concern: "Supplier relationship disruption and data quality from smallholder farmers with no prior digital ESG reporting.",
        opener:
          "What if we started with the top 200 dairy co-operatives by volume — what data quality threshold would you need to see before expanding to individual farm-level collection?",
      },
    ],
  },

  loreal: {
    whyNow: [
      {
        title: "EUDR Enforcement — Active from 2026",
        description:
          "The EU Deforestation Regulation requires L'Oréal to demonstrate active due diligence for all 1,500+ natural ingredients by December 31, 2026. Static risk assessments no longer satisfy the monitoring requirement.",
        urgency: "Critical",
        daysUntilDeadline: 261,
      },
      {
        title: "CSRD FY2025 Board Sign-Off",
        description:
          "Ingredient Scope 3 deforestation emissions and plastic packaging EPR data are the two ESRS E1/E5 gaps most likely to receive an auditor qualification.",
        urgency: "Critical",
        daysUntilDeadline: 78,
      },
      {
        title: "ECHA Microplastics Restriction — Phase 2",
        description:
          "ECHA's microplastics restriction enters phase 2 for rinse-off cosmetics in 2026, requiring substitution documentation across L'Oréal's top 500 SKUs.",
        urgency: "High",
      },
    ],
    whyOBS: [
      {
        solution: "Evolution Platform",
        competitors: ["IBM", "Accenture"],
        differentiators: [
          "Orange's Evolution Platform integrates satellite deforestation monitoring APIs directly into the supplier due diligence workflow — IBM's ESG platform has no native geospatial layer and requires a separate satellite data vendor.",
          "EUDR-compliant due diligence statements are generated automatically from supplier GPS polygon data — Accenture's EUDR programme is consulting-led with no automated document generation.",
          "Packaging traceability and ingredient sourcing are managed in the same platform, reducing L'Oréal's vendor count and data reconciliation overhead for the June CSRD sign-off.",
        ],
      },
      {
        solution: "Ocean + Circular Mobility",
        competitors: ["Capgemini", "Siemens"],
        differentiators: [
          "Orange's Circular Mobility handles reverse logistics of packaging collection programmes across L'Oréal's 150+ markets — Capgemini has no reverse logistics capability.",
          "Route optimisation for L'Oréal's distribution fleet reduces Scope 3 Category 4 emissions — directly supporting the CSRD downstream transport disclosure.",
          "Siemens has no consumer goods packaging circularity offering; Orange covers the full packaging lifecycle from factory to consumer return point.",
        ],
      },
    ],
    howToWin: [
      {
        archetype: "Economic Buyer",
        title: "CFO (L'Oréal SA)",
        concern: "EUDR customs clearance risk and CSRD audit qualification ahead of the June board meeting.",
        opener:
          "What's L'Oréal's exposure if a single ingredient lot is blocked at EU customs under EUDR — and has finance modelled the revenue impact of a palm oil or shea sourcing suspension?",
      },
      {
        archetype: "Technical Evaluator",
        title: "Head of Packaging Innovation",
        concern: "Integrating a new supplier platform with L'Oréal's existing PLM and procurement systems.",
        opener:
          "Does your current PLM system hold GPS coordinates for ingredient sourcing plots, or is that data managed outside the core system in spreadsheets?",
      },
      {
        archetype: "Internal Champion",
        title: "Chief Sustainability Officer",
        concern: "Needs automated EUDR due diligence documentation and a packaging traceability system ready for the June CSRD sign-off.",
        opener:
          "Which ingredient categories are you most exposed on for EUDR — palm derivatives, shea, or cocoa — and do you have satellite monitoring in place for any of them already?",
      },
      {
        archetype: "Likely Blocker",
        title: "VP Global Sourcing & Procurement",
        concern: "Supplier adoption of a new digital platform across 1,500+ ingredient suppliers in 60+ countries.",
        opener:
          "What if we started with the 50 highest-deforestation-risk ingredients by volume — what supplier response rate would you need to see in the pilot before expanding?",
      },
    ],
  },
};
