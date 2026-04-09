import {
  Truck,
  Zap,
  Globe,
  Thermometer,
  Recycle,
  Store,
  Laptop,
  Building2,
  Users,
  Leaf,
  Plane,
  Droplets,
  FlameKindling,
} from "lucide-react";

export const briefData = {
  renault: {
    name: "Renault",
    score: 87,
    sources: 34,
    challenges: [
      {
        id: 1,
        icon: Truck,
        title: "Fleet Electrification and Lifecycle Emissions",
        description:
          "Renault faces pressure to decarbonise its full vehicle fleet lifecycle including manufacturing, logistics and end-of-life recycling. EU emissions targets for 2025 and 2030 create direct regulatory exposure.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Zap,
        title: "Energy Consumption in Manufacturing",
        description:
          "Renault's production plants, particularly in France and Romania, face rising energy costs and scope 2 emissions scrutiny from investors and regulators.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Globe,
        title: "Supply Chain Transparency and ESG Compliance",
        description:
          "Tier 1 and Tier 2 supplier ESG compliance is increasingly required under CSRD and customer due diligence obligations.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Fleet Electrification and Lifecycle Emissions",
        product: "Ocean + Circular Mobility",
        detail:
          "Ocean platform for fleet optimization and eco-driving, plus Circular Mobility for fleet electrification support",
        icon: Truck,
        impactScore: 94,
        metrics: {
          profitability: "€2.4M estimated contract value | High margin service",
          clientBenefit: "30% reduction in fleet lifecycle emissions | CSRD compliant",
          co2Impact: "-12,400 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Orange Business's Sustainable Mobility solution combines our Ocean platform with full Circular Mobility practices to address the massive scope 1 and 3 emissions produced by Renault's logistics operations.",
            "By implementing connected IoT sensors across the delivery and sales fleet, Orange enables eco-driving behaviors and intelligent route optimization, while also managing the lifecycle of EV batteries and connected components.",
            "For Renault, this reduces immediate regulatory exposure ahead of 2025 and 2030 EU targets, while creating a foundation for their long-term transition to fully electrified networks."
          ],
          financialCase: {
            contractValue: "€2.4M",
            revenueType: "Software & Services Subscription",
            upsellPotential: "High - Expansion to 3rd party logistics",
            years: [
              { year: "Year 1", revenue: "€600K" },
              { year: "Year 2", revenue: "€850K" },
              { year: "Year 3", revenue: "€950K" }
            ]
          },
          esgCase: [
            "30% reduction in fleet lifecycle emissions",
            "Ensures compliance with EU 2025/2030 emission targets",
            "Demonstrates direct CSRD adherence to investors",
            "Outperforms automotive sector average fleet efficiency by 12%",
            "Estimated CO2 reduction: -12,400 tCO2e/year"
          ],
          keySellingPoints: [
            "We aren't just selling tracking; we are selling measurable regulatory compliance.",
            "The Ocean platform provides board-ready dashboards for CSRD audits.",
            "Orange Business operates with an intrinsically green IT backbone, unlike pure-play software vendors.",
            "Circular Mobility offsets the battery footprint, closing the vehicle lifecycle loop."
          ],
          nextSteps: [
            "Schedule a direct discovery call with Renault's Head of Fleet and Mobility Services.",
            "Prepare the Ocean Platform dashboard demo populated with automotive logistics synthetic data.",
            "Identify internal Orange subject matter experts who can speak to EV battery IoT telemetry."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "Energy Consumption in Manufacturing",
        product: "Smart Eco Energy",
        detail:
          "IoT-based energy monitoring and optimization for factories and facilities",
        icon: Zap,
        impactScore: 89,
        metrics: {
          profitability: "€1.8M estimated contract value | Recurring IoT revenue",
          clientBenefit: "20-25% energy cost reduction in manufacturing facilities",
          co2Impact: "-8,200 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Smart Eco Energy leverages Orange Business's leading IoT connectivity and edge computing capabilities to provide hyper-granular visibility into factory-floor energy consumption.",
            "By connecting CNC machines, HVAC units, and lighting arrays inside Renault's French and Romanian plants, we detect anomalous energy draws and automate shutdown sequences during non-peak production.",
            "This tackles the immense scope 2 emissions footprint inherent to automotive manufacturing, delivering immediate operational expense reductions alongside vital sustainability metrics."
          ],
          financialCase: {
            contractValue: "€1.8M",
            revenueType: "Hardware + Recurring Platform SaaS",
            upsellPotential: "Medium - Predictive Maintenance",
            years: [
              { year: "Year 1", revenue: "€800K" },
              { year: "Year 2", revenue: "€500K" },
              { year: "Year 3", revenue: "€500K" }
            ]
          },
          esgCase: [
            "20-25% energy cost reduction in manufacturing facilities",
            "Direct improvement in Scope 2 category emissions",
            "Provides verifiable data for regulatory environmental audits",
            "Aligns with EU Taxonomy 'Do No Significant Harm' principles",
            "Estimated CO2 reduction: -8,200 tCO2e/year"
          ],
          keySellingPoints: [
            "Self-funding project: energy savings typically cover the IoT subscription cost within 14 months.",
            "End-to-end security handled by Orange Cyberdefense (critical for manufacturing environments).",
            "Replaces manual meter reading with real-time, actionable alerts.",
            "Scalable from one legacy manufacturing line to gigafactory-level deployments."
          ],
          nextSteps: [
            "Set up introductory meeting with the VP of Manufacturing Operations centering on OpEx reduction.",
            "Request sample energy bill data from one Renault specific plant to run an ROI simulation.",
            "Prepare a case study highlighting similar outcomes achieved with other heavy manufacturing clients."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "Supply Chain Transparency and ESG Compliance",
        product: "Evolution Platform",
        detail:
          "ESG-by-design platform services and GreenOps for supplier data tracking",
        icon: Globe,
        impactScore: 81,
        metrics: {
          profitability: "€900K estimated contract value | Platform upsell potential",
          clientBenefit: "Full CSRD supplier compliance coverage by 2025 deadline",
          co2Impact: "Indirect - enables -5,000 tCO2e supply chain reduction"
        },
        details: {
          overview: [
            "The Evolution Platform supplies the digital infrastructure necessary to securely aggregate, process, and report on Tier 1 and Tier 2 supplier ESG metrics.",
            "Renault struggles to track the carbon intensity of thousands of varied component suppliers. By adopting Orange's secure, API-driven platform overlaid with GreenOps principles, they gain an automated view of supplier compliance.",
            "This moves their procurement department away from passive reporting into proactive carbon management, directly addressing mandatory CSRD disclosure requirements."
          ],
          financialCase: {
            contractValue: "€900K",
            revenueType: "Professional Services & Platform Usage",
            upsellPotential: "Very High - Core IT Modernization",
            years: [
              { year: "Year 1", revenue: "€400K" },
              { year: "Year 2", revenue: "€250K" },
              { year: "Year 3", revenue: "€250K" }
            ]
          },
          esgCase: [
            "Full CSRD supplier compliance coverage by 2025 deadline",
            "Standardizes ESG scorecards across thousands of vendors",
            "Applies GreenOps to reduce the carbon footprint of IT workloads",
            "Creates verifiable audit trails for supplier due diligence legislation",
            "Indirectly enables -5,000 tCO2e supply chain reduction"
          ],
          keySellingPoints: [
            "Evolution Platform natively integrates with existing legacy procurement systems securely.",
            "Solves the 'data silo' problem that frequently derails CSRD compliance efforts.",
            "Provides an immediate way to enforce ESG minimums on the supplier base.",
            "Orange Business acts as a trusted, neutral data orchestrator."
          ],
          nextSteps: [
            "Organize a joint workshop with Group Procurement Director to map their current supplier data landscape.",
            "Position GreenOps as an immediate 'quick win' for their IT and Cloud modernization initiatives.",
            "Provide the technical whitepaper detailing Evolution Platform's data aggregation capabilities."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "Peer average carbon intensity",
        value: "4.2 tCO₂e",
        context: "per vehicle in automotive manufacturing",
      },
      {
        metric: "Supplier ESG scorecards",
        value: "78%",
        context: "of top 20 automotive OEMs now publish them",
      },
      {
        metric: "EU CSRD applicability",
        value: "FY 2024",
        context: "applies to Renault from this financial year",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Sophie Marchand", email: "s.marchand@renault.com", icon: Leaf },
      { role: "VP of Manufacturing Operations", icon: Building2 },
      { role: "Head of Fleet and Mobility Services", icon: Truck },
      { role: "Group Procurement Director", icon: Users },
    ],
    customSolutions: [
      {
        title: "EV Lifecycle Intelligence Platform",
        challengeAddressed: "Fleet battery lifecycle tracking and end-of-life compliance across EV fleet",
        divisions: ["IoT & Datavenue", "Live Intelligence", "Digital Services"],
        description: "Sovereign AI platform combining IoT sensor networks with fleet telemetry to model battery health, recycling eligibility, and lifecycle CO₂ across the full EV estate.",
      },
      {
        title: "Automated CSRD Reporting Agent",
        challengeAddressed: "Multi-entity CSRD compliance consolidation across all Renault subsidiaries",
        divisions: ["Live Intelligence", "Digital Services", "Orange Cyberdefense"],
        description: "GenAI-powered regulatory agent aggregating ESG data across all subsidiaries, drafting CSRD disclosures, and flagging compliance gaps in real time.",
      },
    ],
  },
  carrefour: {
    name: "Carrefour",
    score: 91,
    sources: 41,
    challenges: [
      {
        id: 1,
        icon: Thermometer,
        title: "Cold Chain Energy Efficiency",
        description:
          "Carrefour operates thousands of refrigeration units across hypermarkets and logistics. Energy consumption from cold chain represents a major share of scope 1 and 2 emissions and is under direct regulatory focus.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Recycle,
        title: "Food Waste and Circular Economy Compliance",
        description:
          "Under French anti-waste legislation (AGEC) and EU targets, Carrefour must demonstrate measurable reduction in food waste and packaging across its supply chain.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Truck,
        title: "Last-Mile Delivery Emissions",
        description:
          "Urban delivery fleet emissions are subject to increasing city-level restrictions across France and Europe, requiring rapid electrification and route optimization.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Cold Chain Energy Efficiency",
        product: "Smart Eco Energy",
        detail:
          "IoT-based energy dashboards and monitoring across stores and logistics facilities",
        icon: Thermometer,
        impactScore: 92,
        metrics: {
          profitability: "€3.1M estimated contract value | High margin IoT + monitoring",
          clientBenefit: "22% cold chain energy reduction across hypermarket network",
          co2Impact: "-18,600 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Carrefour's hypermarket model relies heavily on resource-intensive commercial refrigeration systems. Smart Eco Energy deploys connected temperature sensors and automated localized control logic directly in-store.",
            "This continuous, real-time monitoring ensures strict food safety compliance while intelligently modulating power cycles based on foot traffic, external temperature, and grid load.",
            "Given the escalating cost of European energy, optimizing the cold chain provides a massive return on investment, while severely cutting Carrefour's decentralized scope 2 emissions."
          ],
          financialCase: {
            contractValue: "€3.1M",
            revenueType: "IoT Hardware, Deployment + SaaS",
            upsellPotential: "High - Global store rollout",
            years: [
              { year: "Year 1", revenue: "€1.5M" },
              { year: "Year 2", revenue: "€800K" },
              { year: "Year 3", revenue: "€800K" }
            ]
          },
          esgCase: [
            "22% cold chain energy reduction across hypermarket network",
            "Significantly reduces Scope 2 emissions locally per store",
            "Ensures uncompromised food safety and quality compliance",
            "Peer leader metrics: beats retail average energy intensity by 18%",
            "Estimated CO2 reduction: -18,600 tCO2e/year"
          ],
          keySellingPoints: [
            "Direct impact on the bottom line: refrigeration is typically the #1 operating expense for a hypermarket.",
            "Plug-and-play local deployment that doesn't disrupt store operations.",
            "Bridges the gap between physical retail operations and corporate ESG goals.",
            "Orange manages the full stack: from sensor hardware to cellular connectivity to the dashboard."
          ],
          nextSteps: [
            "Pitch a 5-store pilot program to the VP of Store Operations focused purely on refrigeration.",
            "Prepare an ROI calculator showing the energy cost savings offset against the hardware investment.",
            "Coordinate with the IoT practice lead to draft a rapid deployment timeline."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "Food Waste and Circular Economy Compliance",
        product: "RE Program & Circular Mobility",
        detail:
          "Refurbishment, reuse and takeback programs adapted to retail operations",
        icon: Recycle,
        impactScore: 85,
        metrics: {
          profitability: "€1.2M estimated contract value | Circular economy services",
          clientBenefit: "AGEC compliance achieved + packaging waste reduction target met",
          co2Impact: "-4,800 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Orange Business's RE Program focuses on instilling circular economic models into Carrefour's sprawling retail ecosystem, particularly targeting IT waste, digital signage, and connected POS systems.",
            "We facilitate the secure take-back, refurbishment, and redeployment of enterprise electronic assets, dramatically extending hardware lifespans and reducing e-waste footprints.",
            "This initiative perfectly aligns with France's strict AGEC anti-waste legislation, providing Carrefour with documented proof of circularity and waste reduction across its operational footprint."
          ],
          financialCase: {
            contractValue: "€1.2M",
            revenueType: "Service Retainer & Asset Management",
            upsellPotential: "Medium - Integration into supply chain",
            years: [
              { year: "Year 1", revenue: "€400K" },
              { year: "Year 2", revenue: "€400K" },
              { year: "Year 3", revenue: "€400K" }
            ]
          },
          esgCase: [
            "AGEC compliance achieved + packaging waste reduction target met",
            "Direct reduction in corporate Scope 3 e-waste emissions",
            "Ensures secure data wiping and verifiable asset destruction when necessary",
            "Puts Carrefour ahead of tightening EU WEEE directives",
            "Estimated CO2 reduction: -4,800 tCO2e/year"
          ],
          keySellingPoints: [
            "A tangible, visible sustainability win that employees and customers can see.",
            "Replaces the traditional 'buy and scrap' IT lifecycle with a sustainable 'use and renew' model.",
            "Orange holds top-tier certifications for secure hardware refurbishing.",
            "Directly mitigates the risk of AGEC related financial penalties."
          ],
          nextSteps: [
            "Schedule a call with the Director of Digital Transformation to map the current lifecycle of POS terminals.",
            "Provide the 'Orange RE Program' playbook highlighting how other large organizations handled IT asset takeback.",
            "Propose an initial audit of Carrefour's corporate IT hardware end-of-life policies."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "Last-Mile Delivery Emissions",
        product: "Ocean Platform",
        detail:
          "Ocean platform for fleet optimization, eco-driving analytics and electrification planning",
        icon: Truck,
        impactScore: 88,
        metrics: {
          profitability: "€2.0M estimated contract value | Fleet analytics subscription",
          clientBenefit: "35% last-mile delivery emissions reduction + city access compliance",
          co2Impact: "-9,100 tCO2e/year estimated"
        },
        details: {
          overview: [
            "With the explosive growth of hyper-local grocery delivery, Carrefour's last-mile logistics represent a rapidly growing emissions source. Orange's Ocean platform addresses this directly.",
            "By utilizing advanced telematics, Ocean maps the most efficient, low-emission routing patterns in real-time while monitoring driver behaviors (idling, harsh braking) that unnecessarily burn fuel.",
            "Crucially, the platform aids in identifying which delivery routes are most immediately suitable for EV replacements, allowing Carrefour to remain compliant with strict European Zero-Emission Zones (ZEZ) popping up in major cities."
          ],
          financialCase: {
            contractValue: "€2.0M",
            revenueType: "Telematics Hardware + SaaS Dashboard",
            upsellPotential: "High - Deep logistics integration",
            years: [
              { year: "Year 1", revenue: "€800K" },
              { year: "Year 2", revenue: "€600K" },
              { year: "Year 3", revenue: "€600K" }
            ]
          },
          esgCase: [
            "35% last-mile delivery emissions reduction + city access compliance",
            "Secures ongoing access to urban centers enforcing Zero Emission Zones",
            "Improves road safety and reduces fleet maintenance costs",
            "Provides transparent logistics emissions data for consumer-facing sustainability reports",
            "Estimated CO2 reduction: -9,100 tCO2e/year"
          ],
          keySellingPoints: [
            "Simultaneously reduces fuel costs, maintenance overhead, and carbon emissions.",
            "A vital tool for navigating the messy transition from ICE to EV delivery fleets.",
            "Produces demonstrable ESG improvements that Carrefour can market directly to end consumers.",
            "Backed by Orange's pervasive, ultra-reliable European cellular networks."
          ],
          nextSteps: [
            "Engage the Head of Supply Chain and Logistics to discuss current last-mile telematics roadblocks.",
            "Draft a mini-proposal demonstrating ROI based on fuel savings specifically for urban delivery routes.",
            "Showcase the Ocean platform's 'EV Transition' module that predicts battery strain in city stop-and-go traffic."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "Retail sector average scope 2 emissions intensity",
        value: "180 tCO₂e",
        context: "per store per year",
      },
      {
        metric: "Major European retailers",
        value: "65%",
        context: "now report against CSRD or equivalent frameworks",
      },
      {
        metric: "AGEC full implementation deadline",
        value: "2025",
        context: "for Carrefour tier legislation compliance",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Laurent Dubois", email: "l.dubois@carrefour.com", icon: Leaf },
      { role: "VP of Store Operations", icon: Store },
      { role: "Head of Supply Chain and Logistics", icon: Truck },
      { role: "Director of Digital Transformation", icon: Laptop },
    ],
    customSolutions: [
      {
        title: "Predictive Cold Chain AI",
        challengeAddressed: "Reactive refrigeration maintenance driving energy spikes and food spoilage",
        divisions: ["IoT & Datavenue", "Live Intelligence"],
        description: "ML-driven anomaly detection across cold chain sensors to predict equipment failure 48–72 hours in advance, minimising spoilage and energy waste across all stores.",
      },
      {
        title: "Supplier Sustainability Intelligence Hub",
        challengeAddressed: "Real-time ESG compliance visibility across thousands of food and non-food suppliers",
        divisions: ["Digital Services", "Orange Cyberdefense", "Live Intelligence"],
        description: "Secure data ingestion and AI analysis platform providing real-time supplier ESG scores, audit trails, and compliance flags under CSRD, AGEC, and EU deforestation rules.",
      },
    ],
  },
  stellantis: {
    name: "Stellantis",
    score: 83,
    sources: 38,
    challenges: [
      {
        id: 1,
        icon: Truck,
        title: "EU Fleet CO2 Compliance Across 15 Brands",
        description:
          "Stellantis faces mandatory EU fleet average CO2 targets of 95g/km for 2025 and 81g/km by 2030, covering over 6 million vehicles sold annually across 15 brands. Non-compliance carries penalties of €95 per g/km above the limit per vehicle registered, creating direct financial exposure exceeding €1B if electrification pace slips.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Zap,
        title: "Manufacturing Energy Intensity Across 40+ Plants",
        description:
          "Stellantis operates over 40 assembly and manufacturing plants across Europe, North America, and South America. Energy consumption represents a dominant Scope 2 emissions source, with European plants facing direct pressure from rising EU ETS carbon prices and investor-led Scope 2 intensity reduction targets in the Dare Forward 2030 plan.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Globe,
        title: "EU Battery Regulation & Critical Mineral Traceability",
        description:
          "The EU Battery Regulation (2023/1542) requires automotive-grade batteries to carry digital passports from 2026, disclosing cobalt, lithium, and nickel sourcing, recycled content, and carbon footprint per kWh. Stellantis's multi-brand EV portfolio creates an extremely complex battery supply chain requiring end-to-end ESG transparency under CSDDD due diligence obligations.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "EU Fleet CO2 Compliance Across 15 Brands",
        product: "Ocean + Circular Mobility",
        detail:
          "Fleet electrification intelligence and EV lifecycle management across all Stellantis marques",
        icon: Truck,
        impactScore: 93,
        metrics: {
          profitability: "€3.2M estimated contract value | High-margin recurring service",
          clientBenefit: "EU CO2 penalty avoidance + accelerated EV transition roadmap",
          co2Impact: "-15,800 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Stellantis's Dare Forward 2030 plan targets 100% BEV sales in Europe by 2030, but coordinating electrification across 15 distinct brands with different customer segments, charging infrastructure needs, and residual value profiles is operationally complex.",
            "Orange Business's Ocean platform provides a unified fleet telemetry layer that spans all brands, enabling Stellantis's fleet and B2B sales teams to model EV transition scenarios, monitor real-world BEV utilisation rates, and detect early signs of customer range anxiety.",
            "Circular Mobility closes the loop by managing end-of-life battery logistics, second-life assessment, and certified recycling partnerships — directly addressing the battery passport traceability obligations coming into force from 2026."
          ],
          financialCase: {
            contractValue: "€3.2M",
            revenueType: "Software & Services Subscription",
            upsellPotential: "Very High — Multi-brand B2B fleet services",
            years: [
              { year: "Year 1", revenue: "€900K" },
              { year: "Year 2", revenue: "€1.2M" },
              { year: "Year 3", revenue: "€1.1M" }
            ]
          },
          esgCase: [
            "Positions Stellantis below the 2025 EU fleet CO2 threshold, avoiding material financial penalties",
            "Provides board-level dashboard tracking BEV share per brand against regulatory targets",
            "Demonstrates CSRD-compliant Scope 1 fleet reporting across all sales subsidiaries",
            "Battery lifecycle tracking supports EU Battery Regulation digital passport requirements from 2026",
            "Estimated CO2 reduction: -15,800 tCO2e/year"
          ],
          keySellingPoints: [
            "One platform spanning all 15 brands removes the silo problem that typically derails multi-marque fleet ESG reporting.",
            "Ocean's regulatory compliance dashboards are pre-configured for EU CO2 target tracking — not a custom build.",
            "Circular Mobility positions Stellantis ahead of competitors on battery second-life, a differentiating commercial offer.",
            "Orange Business operates across every major European market where Stellantis sells — no third-party coverage gaps."
          ],
          nextSteps: [
            "Request introductory call with Head of Electrification Strategy to map current BEV telemetry coverage per brand.",
            "Prepare an EU CO2 penalty exposure model using publicly available Stellantis sales mix data.",
            "Identify which brand (e.g. Citroën or Opel) is most advanced in fleet B2B to propose a pilot."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "Manufacturing Energy Intensity Across 40+ Plants",
        product: "Smart Eco Energy",
        detail:
          "IoT energy monitoring and automated demand optimisation across multi-country manufacturing footprint",
        icon: Zap,
        impactScore: 87,
        metrics: {
          profitability: "€2.1M estimated contract value | Recurring IoT + SaaS",
          clientBenefit: "18-22% energy intensity reduction across European assembly plants",
          co2Impact: "-11,400 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Stellantis's European manufacturing network — spanning Sochaux, Poissy, Mirafiori, Rüsselsheim, and Gliwice among others — consumes enormous quantities of grid electricity, making Scope 2 emissions reduction a top priority for Dare Forward 2030.",
            "Smart Eco Energy deploys granular IoT sensing across stamping presses, paint shops, body-in-white lines, and HVAC systems, creating a real-time energy model of each facility that identifies waste at machine level.",
            "Automated demand-response logic then smooths energy peaks, shifts non-time-critical loads to cheaper, lower-carbon grid windows, and integrates with on-site renewable generation where present — delivering OpEx savings that fund the platform subscription within 18 months."
          ],
          financialCase: {
            contractValue: "€2.1M",
            revenueType: "Hardware + Recurring Platform SaaS",
            upsellPotential: "High — Predictive Maintenance & Renewable Integration",
            years: [
              { year: "Year 1", revenue: "€900K" },
              { year: "Year 2", revenue: "€600K" },
              { year: "Year 3", revenue: "€600K" }
            ]
          },
          esgCase: [
            "18-22% energy intensity reduction across audited European plants",
            "Direct improvement in verified Scope 2 market-based emissions",
            "Provides plant-level energy data required for CSRD environmental disclosure",
            "Aligns with EU Taxonomy 'Do No Significant Harm' criteria for manufacturing climate adaptation",
            "Estimated CO2 reduction: -11,400 tCO2e/year"
          ],
          keySellingPoints: [
            "Retrofitable to legacy manufacturing equipment — no production line downtime required for installation.",
            "Machine-level granularity reveals energy waste that plant managers cannot see with utility bill-level data.",
            "Orange Cyberdefense secures all OT/IT connectivity within each plant environment.",
            "Multi-country deployment is managed centrally via a single Orange Business project team."
          ],
          nextSteps: [
            "Engage VP of Manufacturing Operations to nominate a single plant for a 90-day Smart Eco Energy pilot.",
            "Run an energy bill analysis for the Sochaux or Mirafiori plant to model the ROI case.",
            "Prepare a security architecture overview tailored to automotive OT environments."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "EU Battery Regulation & Critical Mineral Traceability",
        product: "Evolution Platform",
        detail:
          "Secure supply chain data platform for battery passport compliance and critical mineral due diligence",
        icon: Globe,
        impactScore: 79,
        metrics: {
          profitability: "€1.1M estimated contract value | Platform & professional services",
          clientBenefit: "EU Battery Regulation digital passport readiness by 2026 deadline",
          co2Impact: "Indirect — enables -6,200 tCO2e supply chain visibility"
        },
        details: {
          overview: [
            "EU Regulation 2023/1542 mandates that EV batteries above 2kWh sold in Europe carry a digital battery passport from February 2027, disclosing carbon footprint, recycled content, supply chain due diligence, and State of Health data across the full lifecycle.",
            "The Evolution Platform provides the secure, API-driven data infrastructure to collect, validate, and expose this information to regulators, customers, and recyclers — connecting Stellantis's Tier 1 cell suppliers (CATL, Samsung SDI, ACC) with their own reporting systems.",
            "By acting as a neutral, trusted data intermediary, Orange Business enables Stellantis to meet CSDDD supply chain due diligence obligations for cobalt and lithium sourcing without sharing commercially sensitive supplier data externally."
          ],
          financialCase: {
            contractValue: "€1.1M",
            revenueType: "Professional Services & Platform Usage",
            upsellPotential: "Very High — Full IT Modernisation & CSRD Reporting",
            years: [
              { year: "Year 1", revenue: "€450K" },
              { year: "Year 2", revenue: "€350K" },
              { year: "Year 3", revenue: "€300K" }
            ]
          },
          esgCase: [
            "Achieves EU Battery Regulation digital passport compliance before the February 2027 deadline",
            "Automates CSDDD due diligence evidence collection for cobalt, lithium, and nickel",
            "Enables CSRD double-materiality disclosure on battery supply chain environmental and social impacts",
            "Creates verifiable audit trails for regulators and ESG rating agencies",
            "Indirectly enables -6,200 tCO2e supply chain footprint visibility and reduction"
          ],
          keySellingPoints: [
            "Orange Business is a neutral data custodian — suppliers trust us where they would not trust a direct competitor.",
            "Evolution Platform integrates with SAP and existing Stellantis procurement systems without a rip-and-replace.",
            "Pre-built battery passport data schema reduces implementation time by an estimated 40%.",
            "Positions Stellantis ahead of peers on a regulation that will define market access from 2027."
          ],
          nextSteps: [
            "Map current data flows from Stellantis's top three battery cell suppliers to identify integration points.",
            "Engage Group Supply Chain Director with a battery passport readiness assessment workshop.",
            "Provide the technical overview of Evolution Platform's API security model for legal and procurement review."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "Automotive peer average CO2 intensity",
        value: "4.6 tCO₂e",
        context: "per vehicle produced across European OEMs",
      },
      {
        metric: "EU fleet CO2 penalty exposure",
        value: "€95/g/km",
        context: "per vehicle above 2025 target — material P&L risk",
      },
      {
        metric: "CSRD applicability",
        value: "FY 2024",
        context: "Stellantis reporting as a large PIE under CSRD",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Chiara Romano", email: "c.romano@stellantis.com", icon: Leaf },
      { role: "VP of Manufacturing Operations", icon: Building2 },
      { role: "Head of Electrification Strategy", icon: Zap },
      { role: "Group Supply Chain Director", icon: Globe },
    ]
  },
  totalenergies: {
    name: "TotalEnergies",
    score: 76,
    sources: 52,
    challenges: [
      {
        id: 1,
        icon: FlameKindling,
        title: "Scope 1 & 2 Emissions from Refining and LNG Operations",
        description:
          "TotalEnergies' European refining and LNG terminal operations generate substantial Scope 1 emissions from combustion and flaring, with full EU ETS exposure. With EU ETS carbon prices averaging €65/tCO2 in 2024 and the free allocation phase-out accelerating through 2030, direct carbon cost exposure runs into hundreds of millions of euros annually.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Globe,
        title: "EU Taxonomy Alignment for Renewables CapEx Classification",
        description:
          "TotalEnergies is investing over €5B annually in low-carbon energy but must demonstrate strict EU Taxonomy Technical Screening Criteria alignment to qualify investments as 'sustainable' for Green Bond issuance and institutional investor mandates. CSRD double-materiality reporting from FY 2024 raises the bar for disclosure quality and auditability.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 3,
        icon: Thermometer,
        title: "Scope 3 Downstream Emissions Disclosure",
        description:
          "Over 80% of TotalEnergies' total GHG footprint resides in Scope 3 Category 11 (use of sold products — fuels). CSRD double-materiality now requires detailed disclosure of these emissions, and climate litigation risk is growing as courts in France and the Netherlands have held energy companies accountable for misalignment between stated and actual climate commitments.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Scope 1 & 2 Emissions from Refining and LNG Operations",
        product: "Smart Eco Energy",
        detail:
          "Industrial IoT energy optimisation and real-time carbon monitoring across refinery and LNG terminal infrastructure",
        icon: FlameKindling,
        impactScore: 91,
        metrics: {
          profitability: "€4.2M estimated contract value | High-value industrial IoT deployment",
          clientBenefit: "12-16% operational energy reduction + verified EU ETS cost avoidance",
          co2Impact: "-28,000 tCO2e/year estimated"
        },
        details: {
          overview: [
            "TotalEnergies' refineries at Gonfreville, Donges, and Feyzin, along with its Dunkirk LNG terminal, represent some of the largest industrial energy consumers in France — with direct EU ETS carbon cost exposure that grows as free allowances are phased out through 2030.",
            "Smart Eco Energy deploys edge-connected IoT across process heating units, compressor trains, steam networks, and site utilities, providing real-time energy and emissions visibility at the asset level — well beyond what legacy SCADA systems typically expose to ESG teams.",
            "Automated anomaly detection identifies energy waste from fouled heat exchangers, steam leaks, and sub-optimal furnace operation, enabling maintenance teams to act before waste compounds — directly reducing both OpEx and verified EU ETS obligations."
          ],
          financialCase: {
            contractValue: "€4.2M",
            revenueType: "Industrial IoT Hardware + Platform SaaS",
            upsellPotential: "High — Global refinery network expansion",
            years: [
              { year: "Year 1", revenue: "€1.8M" },
              { year: "Year 2", revenue: "€1.2M" },
              { year: "Year 3", revenue: "€1.2M" }
            ]
          },
          esgCase: [
            "12-16% operational energy reduction translates directly to verified EU ETS allowance savings",
            "Asset-level emissions data feeds directly into CSRD Scope 1 disclosures with audit-grade provenance",
            "Reduces methane and flare combustion waste — key metrics for emerging EU methane regulation",
            "Demonstrates credible operational decarbonisation aligned with TotalEnergies' net-zero trajectory",
            "Estimated CO2 reduction: -28,000 tCO2e/year"
          ],
          keySellingPoints: [
            "ROI is self-funding: EU ETS cost avoidance at €65/tCO2 typically covers the platform cost within 20 months.",
            "Orange Business provides carrier-grade private network connectivity inside the refinery perimeter — critical for safe OT communications.",
            "The platform is pre-certified for ATEX Zone 2 environments, removing a key barrier to refinery IoT deployment.",
            "Real-time emissions dashboards give the CFO and ESG team the same view — closing the gap between operations and reporting."
          ],
          nextSteps: [
            "Engage VP of Operational Excellence with a carbon cost exposure model specific to the Gonfreville refinery.",
            "Propose a 90-day pilot on one process unit with full EU ETS savings attribution methodology.",
            "Bring in Orange's industrial IoT specialists with refinery credentials for the technical discovery call."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "EU Taxonomy Alignment for Renewables CapEx Classification",
        product: "Evolution Platform",
        detail:
          "ESG data infrastructure for EU Taxonomy Technical Screening Criteria assessment and CSRD double-materiality reporting",
        icon: Globe,
        impactScore: 88,
        metrics: {
          profitability: "€2.4M estimated contract value | Platform & advisory services",
          clientBenefit: "Taxonomy-aligned CapEx classification covering €5B+ annual green investment",
          co2Impact: "Indirect — enables credible net-zero reporting framework"
        },
        details: {
          overview: [
            "TotalEnergies publishes an annual Sustainability & Climate report, but the quality and auditability of underlying data — especially for the EU Taxonomy's Technical Screening Criteria and DNSH (Do No Significant Harm) assessments — is under increasing scrutiny from the AMF, institutional investors, and ESG rating agencies.",
            "The Evolution Platform provides a structured data collection and validation layer that maps TotalEnergies' project portfolio to Taxonomy activity codes, automates DNSH evidence collection from operations, and produces audit-ready output for CSRD Annex I disclosure.",
            "For the Green Bond issuance pipeline, this directly improves investor confidence in the Taxonomy-eligible CapEx label — a prerequisite for maintaining access to Europe's growing sustainable debt market."
          ],
          financialCase: {
            contractValue: "€2.4M",
            revenueType: "Professional Services & Platform Usage",
            upsellPotential: "Very High — Full ESG Data Management Transformation",
            years: [
              { year: "Year 1", revenue: "€1.0M" },
              { year: "Year 2", revenue: "€700K" },
              { year: "Year 3", revenue: "€700K" }
            ]
          },
          esgCase: [
            "Enables credible EU Taxonomy alignment for €5B+ in annual low-carbon CapEx",
            "Produces CSRD Annex I compliant ESG disclosure with full data lineage for auditors",
            "Reduces litigation risk by closing the gap between stated and documented climate commitments",
            "Strengthens access to Green Bond markets and ESG-indexed institutional capital",
            "Indirect — creates the reporting infrastructure for credible net-zero trajectory disclosure"
          ],
          keySellingPoints: [
            "Orange Business acts as a trusted independent data platform — not a consultant with a conflict of interest.",
            "Pre-built Taxonomy activity mapping library reduces the time-to-compliance versus bespoke builds.",
            "Evolution Platform integrates with SAP and TotalEnergies' existing HSEQ systems without data duplication.",
            "Audit-ready output is aligned with EFRAG's ESRS standards, not a proprietary framework."
          ],
          nextSteps: [
            "Schedule workshop with Head of ESG Reporting & Investor Relations to map current Taxonomy classification process.",
            "Provide a gap analysis against CSRD ESRS E1 (Climate) requirements based on TotalEnergies' latest public disclosures.",
            "Identify which renewables project types create the most complex DNSH assessment burden."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "Scope 3 Downstream Emissions Disclosure",
        product: "Ocean Platform",
        detail:
          "Fleet and logistics optimisation to reduce Scope 3 Category 4 (upstream transportation) and distribution emissions",
        icon: Thermometer,
        impactScore: 82,
        metrics: {
          profitability: "€1.6M estimated contract value | Fleet analytics subscription",
          clientBenefit: "25% reduction in distribution fleet emissions across European network",
          co2Impact: "-7,400 tCO2e/year estimated"
        },
        details: {
          overview: [
            "While TotalEnergies' Category 11 Scope 3 is dominated by fuel combustion at customer level, their Scope 3 Categories 4 (upstream transport) and 9 (downstream transport) represent a measurable and actionable portion of their supply chain footprint — and one where OBS can make a demonstrable difference.",
            "Ocean platform connects to TotalEnergies' fuel distribution truck fleet and marine tanker scheduling systems, providing eco-driving analytics, route efficiency scoring, and electrification transition modelling for depot-to-station and B2B fuel delivery operations.",
            "Reducing fleet emissions produces verifiable Scope 3 data that strengthens the credibility of TotalEnergies' overall climate disclosure — a key concern given ongoing climate litigation scrutiny in France."
          ],
          financialCase: {
            contractValue: "€1.6M",
            revenueType: "Telematics + SaaS Dashboard Subscription",
            upsellPotential: "Medium — Integration with broader logistics providers",
            years: [
              { year: "Year 1", revenue: "€600K" },
              { year: "Year 2", revenue: "€500K" },
              { year: "Year 3", revenue: "€500K" }
            ]
          },
          esgCase: [
            "25% reduction in distribution fleet Scope 3 emissions with verifiable telemetry data",
            "Provides CSRD-compliant Scope 3 Category 4 measurement methodology",
            "Demonstrates credible operational decarbonisation actions beyond carbon offsets",
            "Supports Zero Emission Zone compliance across urban delivery routes in France and Belgium",
            "Estimated CO2 reduction: -7,400 tCO2e/year"
          ],
          keySellingPoints: [
            "Moves TotalEnergies' Scope 3 story from disclosure-only to action-with-evidence — a key differentiator in litigation contexts.",
            "Ocean platform is already deployed with European fuel distributors — no proof of concept required.",
            "Real-time fleet data integrates directly into CSRD Scope 3 reporting workflows via the Evolution Platform.",
            "Backed by Orange's pervasive European mobile network with 99.9% fleet connectivity uptime."
          ],
          nextSteps: [
            "Map TotalEnergies' current fuel distribution fleet size and existing telematics coverage across France.",
            "Draft a joint Scope 3 reduction roadmap that connects Ocean fleet data to CSRD reporting obligations.",
            "Identify a regional depot for a 60-day eco-driving pilot with baseline fuel consumption benchmarking."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "EU ETS carbon price",
        value: "~€65/tCO₂",
        context: "2024 average — rising to est. €100+ by 2030 as free allocations phase out",
      },
      {
        metric: "Scope 3 share of total footprint",
        value: ">80%",
        context: "Category 11 (use of sold fuels) dominates TotalEnergies' GHG inventory",
      },
      {
        metric: "CSRD applicability",
        value: "FY 2024",
        context: "Large PIE — first full CSRD report due 2025",
      },
    ],
    contacts: [
      { role: "Group Chief Sustainability Officer", name: "Antoine Girard", email: "a.girard@totalenergies.com", icon: Leaf },
      { role: "VP of Operational Excellence", icon: Building2 },
      { role: "Head of ESG Reporting & Investor Relations", icon: Globe },
      { role: "Director of Energy Transition", icon: Zap },
    ]
  },
  saintgobain: {
    name: "Saint-Gobain",
    score: 84,
    sources: 29,
    challenges: [
      {
        id: 1,
        icon: FlameKindling,
        title: "Float Glass Furnace Decarbonisation",
        description:
          "Saint-Gobain's flat glass manufacturing relies on natural gas-fired furnaces operating at above 1,550°C continuously. These are among the hardest industrial processes to abate — electrification and hydrogen pathways remain expensive and technically immature. Glass operations account for the majority of Saint-Gobain's Scope 1 emissions and carry full EU ETS exposure with minimal free allocations remaining.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Building2,
        title: "Environmental Product Declarations for Construction Market Access",
        description:
          "The EU Construction Products Regulation (CPR) recast and national green building standards (RE2020 in France, GEG in Germany) increasingly require Environmental Product Declarations (EPDs) for building materials. Architects and developers using Saint-Gobain products for BREEAM, LEED, or HQE certified projects demand verified, third-party EPD data — creating a compliance and commercial imperative.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Recycle,
        title: "Construction Waste Circularity and Recycled Content Targets",
        description:
          "The EU Construction & Demolition Waste regulation and CSRD value chain reporting require Saint-Gobain to demonstrate measurable increases in recycled glass and mineral wool content across its product lines. The company has committed to 30% recycled cullet in flat glass by 2030, requiring a transformed reverse logistics and waste collection capability.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Float Glass Furnace Decarbonisation",
        product: "Smart Eco Energy",
        detail:
          "IoT energy intelligence across glass furnaces, annealing lehrs, and site utilities to maximise thermal efficiency and reduce EU ETS exposure",
        icon: FlameKindling,
        impactScore: 90,
        metrics: {
          profitability: "€3.6M estimated contract value | Industrial IoT + long-term SaaS",
          clientBenefit: "10-14% thermal energy reduction per tonne of glass produced",
          co2Impact: "-24,200 tCO2e/year estimated"
        },
        details: {
          overview: [
            "While full furnace electrification or hydrogen conversion represents a decade-long capital programme, significant efficiency gains are available now through precise thermal monitoring and combustion optimisation — and this is where Smart Eco Energy delivers immediate value for Saint-Gobain.",
            "By deploying high-temperature IoT sensors across furnace crowns, ports, and regenerator chambers, Orange Business provides glass plant operators with real-time combustion efficiency scoring, enabling adjustments that reduce natural gas consumption by 10-14% without altering glass quality.",
            "Combined with site-level energy management across annealing lines, HVAC, and compressed air systems, the platform creates a verified energy savings baseline that directly reduces EU ETS cost exposure and provides the data foundation for future green hydrogen furnace transition business cases."
          ],
          financialCase: {
            contractValue: "€3.6M",
            revenueType: "Industrial IoT Hardware + Recurring Platform SaaS",
            upsellPotential: "High — European glass plant network rollout",
            years: [
              { year: "Year 1", revenue: "€1.4M" },
              { year: "Year 2", revenue: "€1.1M" },
              { year: "Year 3", revenue: "€1.1M" }
            ]
          },
          esgCase: [
            "10-14% thermal energy reduction per tonne of glass produced, verified at asset level",
            "Direct EU ETS allowance cost reduction — material given rising carbon prices",
            "Provides furnace-level emissions data required for CSRD Scope 1 granular disclosure",
            "Creates the verified baseline required for EU Taxonomy climate mitigation activity assessment",
            "Estimated CO2 reduction: -24,200 tCO2e/year"
          ],
          keySellingPoints: [
            "Deployable on existing furnaces without shutdown — zero production disruption during sensor installation.",
            "High-temperature industrial IoT is a proven Orange Business capability with refinery and cement references.",
            "Energy savings ROI typically funds the platform within 22 months at current EU ETS prices.",
            "Platform data feeds directly into Saint-Gobain's furnace transition modelling for hydrogen or electric conversion."
          ],
          nextSteps: [
            "Identify which glass plant (e.g. Thourotte or Aniche) would be most receptive to a pilot programme.",
            "Prepare an EU ETS savings model using Saint-Gobain's publicly disclosed glass production volumes.",
            "Engage VP Industrial Operations with a reference case from a comparable float glass or container glass site."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "Environmental Product Declarations for Construction Market Access",
        product: "Evolution Platform",
        detail:
          "ESG data management platform for automated EPD data collection, third-party verification workflow, and CSRD product-level disclosure",
        icon: Building2,
        impactScore: 84,
        metrics: {
          profitability: "€1.4M estimated contract value | Platform & professional services",
          clientBenefit: "EPD coverage across top 80% of product revenue — green building market access",
          co2Impact: "Indirect — enables product carbon footprint reduction roadmap"
        },
        details: {
          overview: [
            "Saint-Gobain manufactures thousands of distinct building product SKUs across glass, insulation, gypsum, and mortars — each requiring a Product Category Rules-aligned Environmental Product Declaration to access premium green building projects certified under BREEAM, LEED, or the French RE2020 standard.",
            "Today, EPD production is largely manual, fragmented across business units, and inconsistent in data quality — creating both a compliance gap and a commercial disadvantage against competitors who can provide EPDs on request.",
            "The Evolution Platform centralises the lifecycle assessment input data from manufacturing plants, automates the calculation to ISO 14044 methodology, and manages the third-party verifier workflow — cutting EPD production time from months to weeks per product family."
          ],
          financialCase: {
            contractValue: "€1.4M",
            revenueType: "Professional Services & Platform License",
            upsellPotential: "Very High — CSRD Product-Level Reporting Expansion",
            years: [
              { year: "Year 1", revenue: "€600K" },
              { year: "Year 2", revenue: "€400K" },
              { year: "Year 3", revenue: "€400K" }
            ]
          },
          esgCase: [
            "EPD availability across the top 80% of Saint-Gobain product revenue within 18 months",
            "Unlocks access to premium green building and public infrastructure projects requiring EPDs",
            "Provides CSRD Scope 3 Category 11 (use of sold products) environmental data foundation",
            "Automated data lineage satisfies third-party EPD verifier evidence requirements",
            "Indirect — creates the product carbon intensity baseline for reduction investment prioritisation"
          ],
          keySellingPoints: [
            "EPD availability is rapidly becoming a commercial disqualifier in European construction procurement.",
            "Orange's neutral platform position means the EPD data is credibly independent — not self-declared.",
            "Built-in integration with ISO 14044 and EN 15804 calculation standards, not a proprietary method.",
            "Evolution Platform's audit trail architecture directly satisfies CSRD ESRS E1 product-level requirements."
          ],
          nextSteps: [
            "Map which product categories (flat glass, insulation, gypsum board) have the highest EPD demand from customers.",
            "Engage Head of Product Compliance & Certification with a competitor EPD coverage benchmarking analysis.",
            "Propose a pilot covering the glass insulation product family, which has the clearest green building market demand."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "Construction Waste Circularity and Recycled Content Targets",
        product: "Ocean + Circular Mobility",
        detail:
          "Reverse logistics intelligence and circular waste collection fleet management for cullet and mineral wool recovery",
        icon: Recycle,
        impactScore: 77,
        metrics: {
          profitability: "€1.0M estimated contract value | Fleet analytics + circular services",
          clientBenefit: "Recycled cullet logistics optimised — supporting 30% recycled glass target by 2030",
          co2Impact: "-4,600 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Achieving Saint-Gobain's 30% recycled cullet target requires a reliable, high-volume supply of post-consumer and post-industrial flat glass — which in turn requires an optimised reverse logistics network connecting demolition sites, glass processors, and manufacturing plants.",
            "Ocean platform provides real-time visibility of the cullet collection fleet, optimising routing between collection points and batch-scheduling to maintain furnace-ready cullet quality and volume consistency.",
            "Circular Mobility extends the model to manage the full asset lifecycle of collection vehicles — tracking maintenance, optimising EV substitution on urban collection routes, and providing the CSRD-compliant circular economy data that Saint-Gobain's sustainability reports require."
          ],
          financialCase: {
            contractValue: "€1.0M",
            revenueType: "Fleet Telematics + Circular Services",
            upsellPotential: "Medium — Expansion to mineral wool and gypsum streams",
            years: [
              { year: "Year 1", revenue: "€380K" },
              { year: "Year 2", revenue: "€310K" },
              { year: "Year 3", revenue: "€310K" }
            ]
          },
          esgCase: [
            "Optimised cullet logistics directly supports the 30% recycled glass content commitment by 2030",
            "Provides CSRD value chain circularity metrics with verified data from fleet telemetry",
            "Reduces Scope 3 Category 4 emissions from reverse logistics fleet",
            "Supports EU Construction & Demolition Waste Regulation compliance documentation",
            "Estimated CO2 reduction: -4,600 tCO2e/year"
          ],
          keySellingPoints: [
            "Logistics optimisation on cullet collection directly improves furnace economics — circular and commercial at once.",
            "Ocean's routing intelligence adapts to variable demolition site locations — unlike static logistics contracts.",
            "EV fleet transition planning for collection vehicles is built into Circular Mobility from day one.",
            "Verified circular content data improves EPD recycled content scores, compounding the benefit of the Evolution Platform."
          ],
          nextSteps: [
            "Identify the regional cullet collection operation most aligned with a pilot (Nord-Pas-de-Calais or Ile-de-France).",
            "Prepare a logistics optimisation model using publicly available demolition volume data by region.",
            "Connect with the Group Procurement Director on how cullet supply reliability currently limits furnace recycled content."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "Glass manufacturing CO2 intensity",
        value: "~0.5 tCO₂e",
        context: "per tonne of glass produced — hard-to-abate Scope 1",
      },
      {
        metric: "EU construction sector energy share",
        value: "40%",
        context: "of total EU energy consumption — decarbonisation priority",
      },
      {
        metric: "EPD mandatory timeline",
        value: "2027",
        context: "for CE-marked construction products under CPR recast",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Pierre-Henri Blanchard", email: "ph.blanchard@saint-gobain.com", icon: Leaf },
      { role: "VP of Industrial Operations", icon: Building2 },
      { role: "Head of Product Compliance & Certification", icon: Globe },
      { role: "Group Procurement Director", icon: Users },
    ]
  },
  schneiderelectric: {
    name: "Schneider Electric",
    score: 89,
    sources: 44,
    challenges: [
      {
        id: 1,
        icon: Globe,
        title: "Scope 3 Product-in-Use Emissions (Category 11)",
        description:
          "Over 92% of Schneider Electric's total GHG footprint sits in Scope 3 Category 11 — emissions from customers using their electrical distribution, automation, and energy management products. CSRD double-materiality requires Schneider to disclose these with far greater granularity and link them to a credible reduction strategy, moving beyond aggregated estimates to product-level lifecycle data.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Recycle,
        title: "WEEE Compliance and EU Right to Repair Obligations",
        description:
          "As a major manufacturer of electrical switchgear, industrial controls, and data centre UPS systems, Schneider faces material obligations under the EU WEEE Directive recast and the EU Right to Repair Regulation (2024/1610). Extended producer responsibility schemes now require demonstrated take-back programmes, spare parts availability for 10 years, and verifiable collection and recycling rates.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Users,
        title: "ESG Transparency Across 50,000+ Tier 1 Suppliers",
        description:
          "Schneider Electric's global manufacturing and R&D supply chain spans over 50,000 Tier 1 suppliers. CSRD value chain reporting and the EU Corporate Sustainability Due Diligence Directive (CSDDD) require Schneider to assess, document, and remediate ESG risks — including labour standards and environmental performance — across this supplier network at a scale and rigour not previously required.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Scope 3 Product-in-Use Emissions (Category 11)",
        product: "Evolution Platform",
        detail:
          "Product lifecycle data infrastructure for Scope 3 Category 11 disclosure and customer-level carbon impact intelligence",
        icon: Globe,
        impactScore: 92,
        metrics: {
          profitability: "€2.8M estimated contract value | Platform & data services",
          clientBenefit: "Product-level Scope 3 Category 11 disclosure — CSRD compliant",
          co2Impact: "Indirect — enables -40,000 tCO2e customer energy savings visibility"
        },
        details: {
          overview: [
            "Schneider Electric already leads its sector on sustainability ambition, but the shift from aggregated Scope 3 estimates to product-level, customer-specific emissions data required by CSRD ESRS E1 represents a major data architecture challenge.",
            "The Evolution Platform creates a structured product carbon footprint database that links bill-of-materials data, manufacturing energy intensity, logistics emissions, and customer usage profiles — enabling Schneider to report Category 11 emissions per product family with full data lineage.",
            "This also unlocks a commercial opportunity: Schneider can offer customers a 'carbon reduction guarantee' based on measured product-level impact data, differentiating against competitors who still rely on estimated averages."
          ],
          financialCase: {
            contractValue: "€2.8M",
            revenueType: "Platform License & Data Engineering Services",
            upsellPotential: "Very High — Customer-Facing Carbon Impact Reporting",
            years: [
              { year: "Year 1", revenue: "€1.2M" },
              { year: "Year 2", revenue: "€800K" },
              { year: "Year 3", revenue: "€800K" }
            ]
          },
          esgCase: [
            "Enables CSRD ESRS E1-compliant Scope 3 Category 11 disclosure with product-level granularity",
            "Moves Schneider from estimated to measured Scope 3 data — a significant credibility improvement for ESG ratings",
            "Creates the data foundation for verified 'avoided emissions' claims used in customer value propositions",
            "Directly supports Science Based Targets initiative (SBTi) Scope 3 trajectory validation",
            "Indirect — enables visibility of -40,000 tCO2e in customer energy savings attributable to Schneider products"
          ],
          keySellingPoints: [
            "Orange Business as a neutral data platform removes the perceived conflict in self-reported product carbon data.",
            "Pre-built integration with SAP PLM and MES systems means no rip-and-replace of Schneider's existing architecture.",
            "Product-level carbon data becomes a commercial differentiator in public sector and corporate procurement tenders.",
            "Platform is future-proofed against evolving ESRS standards — schema updates handled by Orange, not Schneider's IT."
          ],
          nextSteps: [
            "Workshop with CSRD programme team to map the gap between current Scope 3 Category 11 methodology and ESRS E1 requirements.",
            "Identify two to three product families (e.g. medium voltage switchgear, EcoStruxure) for a pilot product carbon passport.",
            "Engage Chief Sustainability Officer with a peer benchmarking review of Category 11 disclosure quality in the sector."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "WEEE Compliance and EU Right to Repair Obligations",
        product: "Ocean + Circular Mobility",
        detail:
          "Reverse logistics management and take-back fleet optimisation for WEEE collection and spare parts distribution",
        icon: Recycle,
        impactScore: 85,
        metrics: {
          profitability: "€1.5M estimated contract value | Fleet analytics + reverse logistics",
          clientBenefit: "WEEE collection rate target met + Right to Repair spare parts SLA compliance",
          co2Impact: "-5,200 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Schneider Electric's obligation under the EU WEEE Directive to collect and recycle at a rate of 85% by weight requires a sophisticated reverse logistics infrastructure capable of recovering electrical products from across Europe efficiently and cost-effectively.",
            "Ocean platform provides real-time fleet visibility for take-back collection vehicles and spare parts distribution, optimising multi-stop routes across distributor and end-customer locations — reducing collection cost per tonne while maximising WEEE recovery rates.",
            "Circular Mobility extends the value by managing the lifecycle of the take-back fleet itself — planning EV substitution on high-frequency urban collection routes and providing the verified emissions data required for CSRD circular economy disclosures."
          ],
          financialCase: {
            contractValue: "€1.5M",
            revenueType: "Telematics + Circular Logistics Services",
            upsellPotential: "Medium — Integration with refurbishment network",
            years: [
              { year: "Year 1", revenue: "€580K" },
              { year: "Year 2", revenue: "€460K" },
              { year: "Year 3", revenue: "€460K" }
            ]
          },
          esgCase: [
            "Achieves 85% WEEE collection rate target under EU Directive — avoids producer compliance penalties",
            "Right to Repair spare parts routing optimisation reduces delivery lead times, meeting 10-year availability obligation",
            "Verified circular logistics data feeds directly into CSRD value chain circularity reporting",
            "Fleet electrification reduces Scope 3 Category 4 reverse logistics emissions",
            "Estimated CO2 reduction: -5,200 tCO2e/year"
          ],
          keySellingPoints: [
            "WEEE compliance penalties for missed collection rates can reach 4% of annual EU revenue — the ROI case writes itself.",
            "Ocean's dynamic routing adapts to variable WEEE collection volumes — superior to fixed logistics contracts.",
            "Take-back logistics data integrates with the Evolution Platform for a single circular economy reporting view.",
            "Orange's European network coverage ensures fleet visibility even in low-connectivity industrial zones."
          ],
          nextSteps: [
            "Map current WEEE take-back collection network coverage and reported collection rate versus 85% target.",
            "Identify which product categories (UPS, switchgear, drives) have the highest WEEE volume and most complex collection.",
            "Engage Head of Circular Economy with a Right to Repair readiness assessment against the 2024 regulation timeline."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "ESG Transparency Across 50,000+ Tier 1 Suppliers",
        product: "Evolution Platform",
        detail:
          "Supplier ESG data collection, risk scoring, and CSDDD due diligence workflow management at scale",
        icon: Users,
        impactScore: 81,
        metrics: {
          profitability: "€1.3M estimated contract value | Platform expansion & data services",
          clientBenefit: "CSDDD-compliant supplier ESG due diligence covering top 80% of spend",
          co2Impact: "Indirect — enables supply chain carbon reduction programme"
        },
        details: {
          overview: [
            "Schneider Electric's ZeroCarbon Project already engages its top 1,000 suppliers on emissions reduction, but CSDDD and CSRD value chain requirements extend the obligation to a much broader supplier base — requiring documented evidence of environmental and social due diligence at scale.",
            "The Evolution Platform automates supplier ESG questionnaire distribution, response validation, risk scoring, and remediation tracking across Schneider's Tier 1 network — dramatically reducing the manual burden on the procurement team while increasing data coverage.",
            "Integration with existing supplier management systems (Ariba, Coupa) means Schneider's procurement team sees ESG risk scores alongside commercial risk scores — embedding sustainability into every sourcing decision without a separate workflow."
          ],
          financialCase: {
            contractValue: "€1.3M",
            revenueType: "Platform License & Implementation Services",
            upsellPotential: "High — Tier 2 expansion and audit services",
            years: [
              { year: "Year 1", revenue: "€550K" },
              { year: "Year 2", revenue: "€375K" },
              { year: "Year 3", revenue: "€375K" }
            ]
          },
          esgCase: [
            "CSDDD-compliant supplier due diligence covering the top 80% of Schneider's procurement spend",
            "Automated CSRD value chain reporting with supplier-level environmental and social risk documentation",
            "Extends ZeroCarbon Project supplier engagement from top 1,000 to a significantly broader supplier base",
            "Documented audit trail satisfies European supervisory authority due diligence evidence requirements",
            "Indirect — creates the supplier carbon data infrastructure for a Scope 3 Category 1 reduction programme"
          ],
          keySellingPoints: [
            "Automation reduces supplier ESG data collection cost by an estimated 60% versus manual questionnaire processes.",
            "Orange Business as platform provider is independent of Schneider's commercial supplier relationships — improving response rates.",
            "Pre-built CSDDD and CSRD mapping means no custom legal framework translation needed.",
            "Ariba and Coupa connectors are production-ready — deployment measured in weeks, not quarters."
          ],
          nextSteps: [
            "Engage VP Supply Chain & Procurement with a CSDDD readiness gap assessment against current ZeroCarbon Project scope.",
            "Identify five to ten strategic suppliers for a pilot ESG data collection workflow to validate platform fit.",
            "Map which Tier 1 supplier categories carry the highest environmental and social risk for prioritisation."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "Scope 3 share of total GHG footprint",
        value: "~92%",
        context: "Category 11 product-in-use emissions dominate Schneider's inventory",
      },
      {
        metric: "EU WEEE collection target",
        value: "85%",
        context: "by weight — mandatory for producers under EU WEEE Directive recast",
      },
      {
        metric: "CSRD applicability",
        value: "FY 2024",
        context: "Schneider reporting under CSRD from this financial year",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Isabelle Fontaine", email: "i.fontaine@se.com", icon: Leaf },
      { role: "VP Supply Chain & Procurement", icon: Users },
      { role: "Head of Circular Economy", icon: Recycle },
      { role: "Director of Digital Infrastructure", icon: Laptop },
    ]
  },
  veolia: {
    name: "Veolia",
    score: 82,
    sources: 36,
    challenges: [
      {
        id: 1,
        icon: Zap,
        title: "GHG Emissions from Waste Processing and EU ETS Exposure",
        description:
          "Veolia's waste-to-energy (WtE) and landfill operations generate significant Scope 1 GHG emissions from biogenic and fossil waste combustion and landfill methane. The European Commission has confirmed waste incineration will be included in the EU ETS from 2028, creating a material, quantifiable future carbon cost. Proactive energy efficiency and methane capture investments are now a strategic financial priority.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Droplets,
        title: "PFAS and Emerging Contaminant Compliance in Water Treatment",
        description:
          "The EU Drinking Water Directive (2020/2184) introduces a maximum total PFAS limit of 0.5 μg/L from 2026. Veolia operates water treatment plants serving over 90 million people globally, and the cost of upgrading treatment processes (activated carbon filtration, high-pressure membranes) for PFAS removal is substantial. Real-time water quality monitoring and treatment process optimisation are critical to compliance.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Truck,
        title: "Field Operations Fleet Decarbonisation",
        description:
          "Veolia operates over 30,000 service vehicles globally across water, waste, and energy services operations — from tanker trucks and waste collection vehicles to field maintenance vans. This fleet represents a major and growing Scope 1 emissions source, increasingly subject to urban access restrictions under Zero Emission Zone legislation in major European cities.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "GHG Emissions from Waste Processing and EU ETS Exposure",
        product: "Smart Eco Energy",
        detail:
          "IoT energy intelligence across waste-to-energy plants and water treatment facilities to reduce EU ETS exposure ahead of the 2028 inclusion date",
        icon: Zap,
        impactScore: 89,
        metrics: {
          profitability: "€2.9M estimated contract value | Industrial IoT + SaaS",
          clientBenefit: "15-18% WtE plant energy efficiency improvement + methane capture optimisation",
          co2Impact: "-19,800 tCO2e/year estimated"
        },
        details: {
          overview: [
            "With waste incineration entering the EU ETS in 2028, Veolia's WtE plant operators face a rapidly approaching financial inflection point: every tonne of avoidable CO2 emitted above free allocation will carry a direct carbon cost at prevailing ETS prices.",
            "Smart Eco Energy deploys sensor networks across steam turbines, boiler systems, flue gas treatment units, and auxiliary power systems within WtE plants, providing plant managers with real-time energy conversion efficiency data and automated optimisation recommendations.",
            "For landfill sites, the platform integrates with methane capture systems to maximise gas-to-energy recovery rates — reducing uncontrolled methane emissions (a potent GHG) while improving site energy self-sufficiency, a double benefit ahead of ETS inclusion."
          ],
          financialCase: {
            contractValue: "€2.9M",
            revenueType: "Industrial IoT Hardware + Recurring Platform SaaS",
            upsellPotential: "High — European WtE plant network expansion",
            years: [
              { year: "Year 1", revenue: "€1.2M" },
              { year: "Year 2", revenue: "€850K" },
              { year: "Year 3", revenue: "€850K" }
            ]
          },
          esgCase: [
            "15-18% WtE plant energy efficiency improvement reduces both operational cost and EU ETS exposure from 2028",
            "Methane capture optimisation on landfill sites reduces high-GWP emissions that compound the carbon footprint",
            "Provides plant-level verified Scope 1 data required for CSRD environmental disclosure",
            "Creates the efficiency baseline for ETS compliance cost modelling and carbon budget planning",
            "Estimated CO2 reduction: -19,800 tCO2e/year"
          ],
          keySellingPoints: [
            "2028 EU ETS inclusion is a confirmed, finite deadline — acting now builds the efficiency baseline that determines the allowance budget.",
            "Smart Eco Energy is proven in energy-from-waste and industrial thermal environments.",
            "Energy efficiency improvements at WtE plants directly improve municipal contract economics — a competitive differentiator in tenders.",
            "Orange's private network connectivity handles the secure, reliable OT communications inside plant perimeters."
          ],
          nextSteps: [
            "Engage VP Water & Waste Operations with a 2028 ETS exposure quantification model for Veolia's French WtE plants.",
            "Propose a pilot at the Thiverval-Grignon or Echillais WtE facility focused on steam cycle efficiency.",
            "Map current methane capture rates across Veolia's managed landfill portfolio to identify highest-impact sites."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "PFAS and Emerging Contaminant Compliance in Water Treatment",
        product: "Evolution Platform",
        detail:
          "Real-time water quality data management and regulatory compliance reporting platform for EU Drinking Water Directive and PFAS limit compliance",
        icon: Droplets,
        impactScore: 83,
        metrics: {
          profitability: "€1.8M estimated contract value | Platform & integration services",
          clientBenefit: "EU DWD PFAS compliance across managed water treatment network by 2026 deadline",
          co2Impact: "Indirect — optimised treatment processes reduce energy and chemical use"
        },
        details: {
          overview: [
            "The 0.5 μg/L total PFAS limit under the EU Drinking Water Directive (applicable from January 2026) represents one of the most operationally complex water quality compliance challenges Veolia has faced — requiring not just treatment upgrades but a robust, real-time monitoring and reporting infrastructure to demonstrate ongoing compliance to regulators and municipal clients.",
            "The Evolution Platform integrates with Veolia's existing water quality sensor networks (SCADA, online analysers) to create a consolidated, real-time PFAS and emerging contaminant monitoring dashboard — with automated regulatory threshold alerts and audit-ready compliance reporting.",
            "For municipal water authority clients who demand transparency, the platform provides a white-label compliance reporting portal — a commercial differentiator in contract renewals and new tender submissions."
          ],
          financialCase: {
            contractValue: "€1.8M",
            revenueType: "Platform Integration & Managed Reporting Services",
            upsellPotential: "Very High — Global water utility client network",
            years: [
              { year: "Year 1", revenue: "€750K" },
              { year: "Year 2", revenue: "€525K" },
              { year: "Year 3", revenue: "€525K" }
            ]
          },
          esgCase: [
            "EU DWD PFAS compliance monitoring across Veolia's European water treatment network before the 2026 deadline",
            "Real-time regulatory threshold alerting reduces risk of compliance breaches and associated municipal penalties",
            "Transparent compliance reporting portal strengthens Veolia's position in municipal contract renewals",
            "Provides the verified water quality data required for CSRD environmental reporting on water treatment performance",
            "Indirect — optimised coagulation and filtration processes reduce both chemical consumption and energy use"
          ],
          keySellingPoints: [
            "Regulatory risk for Veolia's municipal clients if PFAS limits are breached is both contractual and reputational — this platform provides the safety net.",
            "Orange Business handles the complex multi-sensor SCADA integration that Veolia's IT team would otherwise need to resource internally.",
            "White-label municipal client portal creates a visible, commercial quality-of-service differentiator in tender evaluations.",
            "Pre-built EU DWD compliance reporting templates eliminate months of custom development."
          ],
          nextSteps: [
            "Map which of Veolia's French water treatment concessions are closest to EU DWD PFAS limits based on current monitoring data.",
            "Engage Director of Regulatory Affairs with a DWD compliance readiness timeline and gap analysis.",
            "Propose a pilot on a high-profile concession (e.g. a major metropolitan area) to build a reference case for the broader portfolio."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "Field Operations Fleet Decarbonisation",
        product: "Ocean + Circular Mobility",
        detail:
          "Multi-service field fleet optimisation, eco-driving analytics, and EV transition planning across water, waste, and energy field operations",
        icon: Truck,
        impactScore: 86,
        metrics: {
          profitability: "€2.2M estimated contract value | Fleet analytics + mobility services",
          clientBenefit: "30% field fleet emissions reduction + Zero Emission Zone compliance",
          co2Impact: "-11,600 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Veolia's 30,000+ vehicle fleet spans highly diverse operation types — heavy waste collection trucks, water tankers, sewage jetting vehicles, and light field maintenance vans — making a one-size-fits-all electrification approach impossible and requiring sophisticated route-by-route transition analysis.",
            "Ocean platform unifies telematics across all vehicle types and service lines, providing Veolia's fleet managers with eco-driving score cards, idling reduction analysis, and route efficiency optimisation — delivering immediate fuel and emissions savings before any capital electrification investment.",
            "Circular Mobility then layers on EV suitability modelling for each route type — identifying which urban light fleet routes are immediately viable for BEV conversion and which heavy specialist vehicles require CNG, hydrogen, or fleet renewal strategies — producing a prioritised, costed transition roadmap."
          ],
          financialCase: {
            contractValue: "€2.2M",
            revenueType: "Telematics Hardware + SaaS + Mobility Advisory",
            upsellPotential: "High — Global fleet footprint expansion",
            years: [
              { year: "Year 1", revenue: "€900K" },
              { year: "Year 2", revenue: "€650K" },
              { year: "Year 3", revenue: "€650K" }
            ]
          },
          esgCase: [
            "30% field fleet emissions reduction across urban and peri-urban operations",
            "Zero Emission Zone compliance for field service vehicles in Paris, Amsterdam, and Brussels",
            "Verified Scope 1 fleet emissions data for CSRD environmental disclosure",
            "EV transition roadmap supports Science Based Targets Scope 1 trajectory for transport",
            "Estimated CO2 reduction: -11,600 tCO2e/year"
          ],
          keySellingPoints: [
            "Eco-driving improvements deliver 8-12% fuel savings from day one — before any fleet replacement investment.",
            "Multi-service fleet coverage (waste, water, energy) in a single platform removes data fragmentation across Veolia's business lines.",
            "EV suitability modelling prevents premature electrification of routes that are not operationally viable — protecting capex.",
            "Ocean's coverage extends to Veolia's international operations, supporting a global fleet carbon reduction programme."
          ],
          nextSteps: [
            "Map Veolia's Paris Île-de-France field fleet by vehicle type and daily route profile as an EV transition pilot candidate.",
            "Engage Head of Fleet Management with an eco-driving ROI model based on current Veolia fuel consumption data.",
            "Identify which Zero Emission Zone deadlines (Paris 2024, Amsterdam 2025) create the most urgent vehicle compliance risk."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "EU ETS waste incineration inclusion",
        value: "2028",
        context: "confirmed — WtE operators face direct carbon cost exposure from this date",
      },
      {
        metric: "EU DWD total PFAS limit",
        value: "0.5 μg/L",
        context: "maximum total PFAS — mandatory from January 2026 for all drinking water supplies",
      },
      {
        metric: "Water treatment energy reduction potential",
        value: "35%",
        context: "average efficiency improvement achievable in municipal water treatment through IoT optimisation",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Nicolas Perrin", email: "n.perrin@veolia.com", icon: Leaf },
      { role: "VP Water Treatment Operations", icon: Droplets },
      { role: "Head of Fleet Management", icon: Truck },
      { role: "Director of Regulatory Affairs", icon: Building2 },
    ]
  },
  airfranceklm: {
    name: "Air France-KLM",
    score: 71,
    sources: 47,
    challenges: [
      {
        id: 1,
        icon: Plane,
        title: "Aviation Scope 1 Emissions and EU ETS Compliance",
        description:
          "Air France-KLM's jet fuel combustion on intra-EEA routes is fully subject to the EU ETS, with free allocations reducing to zero by 2026. The ReFuelEU Aviation regulation mandates 2% SAF (Sustainable Aviation Fuel) blending from 2025, rising to 70% by 2050. Non-compliance with SAF blending mandates at EU airports carries penalties of €50 per GJ of non-compliant fuel — creating direct and growing financial exposure.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Building2,
        title: "Ground Operations Energy and Scope 2 Emissions",
        description:
          "Airport ground operations — including maintenance, repair & overhaul (MRO) facilities, cargo terminals, catering operations, and ground support equipment — contribute significantly to Air France-KLM's Scope 2 emissions and are directly managed. CDG, Amsterdam Schiphol, and Lyon facilities together represent substantial, reducible energy loads with mature IoT optimisation potential.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Globe,
        title: "SAF Supply Chain Traceability and ReFuelEU Reporting",
        description:
          "ReFuelEU Aviation (EU 2023/2405) requires airlines to report SAF volumes uplifted at each EU airport with verified mass balance chain-of-custody documentation. As SAF supply chains involve multiple producers, blenders, and distributors across diverse feedstocks, creating an auditable, regulation-compliant SAF traceability system from 2025 is a critical compliance and investor credibility challenge.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Aviation Scope 1 Emissions and EU ETS Compliance",
        product: "Ocean + Circular Mobility",
        detail:
          "Ground support vehicle fleet electrification and airside operations emissions management",
        icon: Plane,
        impactScore: 82,
        metrics: {
          profitability: "€1.9M estimated contract value | Fleet analytics + EV transition services",
          clientBenefit: "Ground fleet Zero Emission Zone compliance at CDG and Schiphol by 2025",
          co2Impact: "-8,700 tCO2e/year estimated"
        },
        details: {
          overview: [
            "While jet fuel combustion dominates Air France-KLM's Scope 1 footprint, ground support equipment (GSE) — baggage tugs, catering vehicles, pushback tractors, ground power units — represents a material and highly actionable Scope 1 source, with CDG and Schiphol both implementing zero-emission ground operation targets.",
            "Ocean platform provides real-time telematics across the GSE fleet at Air France-KLM's main hubs, enabling operations teams to optimise vehicle utilisation, eliminate unnecessary engine idling, and identify the specific vehicle types and routes most suited to immediate battery-electric conversion.",
            "Circular Mobility manages the EV transition programme itself — coordinating charging infrastructure planning, tracking battery lifecycle, and ensuring second-life or recycling pathways for retired GSE — producing a CSRD-compliant ground operation decarbonisation roadmap."
          ],
          financialCase: {
            contractValue: "€1.9M",
            revenueType: "Telematics + EV Transition Advisory Services",
            upsellPotential: "High — Full European hub network expansion",
            years: [
              { year: "Year 1", revenue: "€750K" },
              { year: "Year 2", revenue: "€575K" },
              { year: "Year 3", revenue: "€575K" }
            ]
          },
          esgCase: [
            "Positions Air France-KLM ground operations ahead of CDG and Schiphol zero-emission GSE deadlines",
            "GSE electrification directly reduces Scope 1 ground emissions with measurable, verifiable impact",
            "Verified emissions data supports CSRD Scope 1 ground operations disclosure",
            "Demonstrates tangible ground-level decarbonisation action alongside the longer-term SAF flight path",
            "Estimated CO2 reduction: -8,700 tCO2e/year"
          ],
          keySellingPoints: [
            "Airport zero-emission GSE deadlines are regulatory — non-compliance risks operating licence conditions at CDG and Schiphol.",
            "GSE electrification is commercially proven and available now, unlike SAF at scale — it is an achievable, visible win.",
            "Ocean's telematics data enables precise utilisation modelling to right-size the charging infrastructure investment.",
            "Circular Mobility battery lifecycle management reduces total cost of ownership of the EV GSE fleet."
          ],
          nextSteps: [
            "Map current GSE fleet composition at CDG by vehicle type, engine age, and daily utilisation cycle.",
            "Prepare a zero-emission GSE transition roadmap aligned with CDG's stated airside electrification timeline.",
            "Engage Head of Fleet & Engineering with a cost-of-ownership model comparing EV GSE versus ICE fleet continuation."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "Ground Operations Energy and Scope 2 Emissions",
        product: "Smart Eco Energy",
        detail:
          "IoT energy monitoring and optimisation across MRO hangars, cargo terminals, catering facilities, and airport office buildings",
        icon: Building2,
        impactScore: 86,
        metrics: {
          profitability: "€2.6M estimated contract value | IoT hardware + long-term SaaS",
          clientBenefit: "20% ground facilities energy reduction across CDG, Schiphol, and Lyon",
          co2Impact: "-16,400 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Air France-KLM's ground infrastructure at its main hubs represents a significant, consolidated energy load — MRO hangar heating and lighting, cargo terminal refrigeration and handling, catering kitchen systems, and airline terminal offices together consume energy at industrial scale.",
            "Smart Eco Energy deploys IoT sensors across all facility types, creating a real-time energy map that identifies waste from oversized HVAC systems, inefficient lighting, and unoccupied space conditioning — particularly relevant in MRO hangars where large volumes must be temperature-controlled around maintenance schedules.",
            "For Air France-KLM, the business case is twofold: direct OpEx reduction in ground infrastructure costs (a significant fixed-cost line), and verified Scope 2 emissions reduction that improves the overall GHG intensity metric reported to the EU ETS and CSRD auditors."
          ],
          financialCase: {
            contractValue: "€2.6M",
            revenueType: "IoT Hardware Deployment + Recurring SaaS",
            upsellPotential: "High — Expansion to outstations and partner airports",
            years: [
              { year: "Year 1", revenue: "€1.1M" },
              { year: "Year 2", revenue: "€750K" },
              { year: "Year 3", revenue: "€750K" }
            ]
          },
          esgCase: [
            "20% energy reduction across major ground facilities — verifiable at building level",
            "Direct Scope 2 emissions reduction disclosed in CSRD and EU ETS Annual Emissions Report",
            "MRO energy optimisation reduces fixed operating cost per aircraft cycle — commercial benefit aligned with ESG",
            "Facility-level data enables Schiphol and CDG landlord sustainability reporting requirements to be met",
            "Estimated CO2 reduction: -16,400 tCO2e/year"
          ],
          keySellingPoints: [
            "MRO hangars have highly variable occupancy and heating loads — IoT optimisation delivers unusually large savings versus static controls.",
            "Orange Business has aviation ground infrastructure references — no sector-specific learning curve.",
            "Smart Eco Energy's reporting module produces the precise Scope 2 format required for Air France-KLM's EU ETS Approved Monitoring Plan.",
            "Energy savings typically return the hardware investment within 16-18 months — making it a straightforward internal capex approval."
          ],
          nextSteps: [
            "Secure access to CDG MRO complex energy bills for a 12-month baseline consumption analysis.",
            "Engage VP Ground Operations with a benchmark showing peer airline ground facility energy intensity.",
            "Propose a two-hangar pilot at CDG Orly maintenance base as the initial deployment."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "SAF Supply Chain Traceability and ReFuelEU Reporting",
        product: "Evolution Platform",
        detail:
          "SAF mass balance chain-of-custody data management and ReFuelEU Aviation regulatory reporting platform",
        icon: Globe,
        impactScore: 85,
        metrics: {
          profitability: "€2.1M estimated contract value | Platform & compliance services",
          clientBenefit: "ReFuelEU reporting compliance from January 2025 mandatory deadline",
          co2Impact: "Indirect — enables credible SAF volume and lifecycle GHG reporting"
        },
        details: {
          overview: [
            "ReFuelEU Aviation requires airlines to report SAF volumes uplifted at each EU airport annually, with feedstock and lifecycle GHG intensity documentation to the CORSIA methodology — a complex, multi-party chain-of-custody requirement that Air France-KLM must operationalise across its entire EU hub network from 2025.",
            "The Evolution Platform creates a secure, API-connected data hub that collects SAF delivery notes, producer sustainability certificates, and mass balance documentation from across Air France-KLM's SAF supply chain — then automates the aggregation and formatting required for ReFuelEU regulatory submissions.",
            "For investor-facing disclosure, the platform generates a verified SAF uplift report with full lifecycle GHG intensity attribution — providing the credible, auditable SAF data that institutional investors and ESG analysts require following widespread greenwashing scrutiny in the aviation sector."
          ],
          financialCase: {
            contractValue: "€2.1M",
            revenueType: "Platform License & Regulatory Services",
            upsellPotential: "High — CSRD full emissions reporting integration",
            years: [
              { year: "Year 1", revenue: "€850K" },
              { year: "Year 2", revenue: "€625K" },
              { year: "Year 3", revenue: "€625K" }
            ]
          },
          esgCase: [
            "Achieves ReFuelEU Aviation compliance from the January 2025 mandatory reporting deadline",
            "Verified SAF chain-of-custody data strengthens credibility of climate commitments with ESG investors",
            "Automated regulatory submission eliminates manual aggregation errors that risk compliance penalty",
            "Provides the data foundation for CORSIA-aligned carbon offsetting documentation",
            "Indirect — enables credible disclosure of SAF lifecycle GHG savings versus conventional jet fuel"
          ],
          keySellingPoints: [
            "ReFuelEU non-compliance penalties (€50/GJ) are a confirmed financial risk from 2025 — the platform eliminates this exposure.",
            "Orange Business handles the complex multi-party SAF supplier integration — a task that would require significant internal resource otherwise.",
            "Pre-built ReFuelEU reporting templates are already aligned with EASA's published technical guidance.",
            "SAF data from Evolution Platform feeds directly into Air France-KLM's CSRD climate disclosure — one data source, multiple reporting outputs."
          ],
          nextSteps: [
            "Map Air France-KLM's current SAF uplift volumes, supplier roster, and existing sustainability certificate workflow.",
            "Engage Head of SAF Procurement & Strategy with a ReFuelEU readiness assessment against the 2025 reporting timeline.",
            "Identify which EU hub airports have the most complex multi-supplier SAF mass balance scenarios for priority integration."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "ReFuelEU SAF blending mandate",
        value: "2% from 2025",
        context: "rising to 6% by 2030 and 70% by 2050 — non-compliance penalised at €50/GJ",
      },
      {
        metric: "EU ETS aviation free allocations",
        value: "Zero by 2026",
        context: "intra-EEA flights fully exposed to market carbon price from this date",
      },
      {
        metric: "Aviation CO2 intensity",
        value: "~90g CO₂/RPK",
        context: "revenue passenger kilometre — sector benchmark for Air France-KLM peer comparison",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Anne-Sophie Leroy", email: "as.leroy@airfranceklm.com", icon: Leaf },
      { role: "VP Ground Operations", icon: Building2 },
      { role: "Head of SAF Procurement & Strategy", icon: Plane },
      { role: "Director of Fleet & Engineering", icon: Truck },
    ]
  },
  danone: {
    name: "Danone",
    score: 85,
    sources: 38,
    challenges: [
      {
        id: 1,
        icon: Globe,
        title: "Agricultural Supply Chain Scope 3 Emissions",
        description:
          "Over 70% of Danone's total GHG footprint sits in Scope 3 Category 1 (purchased goods) — dominated by dairy farming methane, feed crop cultivation, and fertiliser use. CSRD double-materiality requires Danone to disclose these with product-level granularity and demonstrate a credible supplier reduction programme, moving beyond aggregated estimates to farm-level data collection from a supplier base of over 20,000 farms.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Recycle,
        title: "Plastic Packaging Circularity and EPR Compliance",
        description:
          "Danone uses approximately 750,000 tonnes of plastic packaging annually across yoghurt, water, and infant nutrition products. The EU Packaging & Packaging Waste Regulation (PPWR) recast mandates 50% recycled content in plastic packaging by 2030 and expanded Extended Producer Responsibility (EPR) contributions. France's AGEC anti-waste law and plastic reduction targets create additional national-level compliance pressure.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Zap,
        title: "Manufacturing Energy and Water Intensity",
        description:
          "Danone's dairy and water processing plants (Évian, Volvic, Alpro) are energy and water-intensive operations. Several key water bottling sites operate in water-stressed basins under regulatory scrutiny from French prefectures and NGO pressure. Energy costs represent a significant input cost pressure, and Scope 2 emissions from manufacturing are subject to direct CSRD Scope 2 market-based disclosure requirements.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Agricultural Supply Chain Scope 3 Emissions",
        product: "Evolution Platform",
        detail:
          "Supplier data platform for farm-level Scope 3 Category 1 collection, CSRD value chain disclosure, and dairy farmer carbon reduction programme management",
        icon: Globe,
        impactScore: 91,
        metrics: {
          profitability: "€2.2M estimated contract value | Platform & data services",
          clientBenefit: "CSRD-compliant Scope 3 Category 1 disclosure across 20,000+ farm suppliers",
          co2Impact: "Indirect — enables -85,000 tCO2e agricultural supply chain reduction"
        },
        details: {
          overview: [
            "Danone's Scope 3 agricultural footprint — primarily dairy farm methane emissions from enteric fermentation and manure management — is both its largest emissions source and the most difficult to measure and reduce, requiring individual farm-level data from over 20,000 milk suppliers across Europe and North America.",
            "The Evolution Platform provides a secure, farmer-friendly data collection portal that integrates with farm management systems and herd management data to calculate farm-level GHG intensity — aggregated into Danone's Scope 3 Category 1 inventory with full data lineage for CSRD auditors.",
            "Beyond compliance, the platform enables Danone's agricultural sustainability team to segment suppliers by GHG intensity, identify high-impact reduction opportunities (feed additives, manure methane capture, soil carbon), and track progress against reduction targets — turning a reporting obligation into an active supplier engagement programme."
          ],
          financialCase: {
            contractValue: "€2.2M",
            revenueType: "Platform License & Agricultural Data Services",
            upsellPotential: "Very High — CSRD full value chain expansion",
            years: [
              { year: "Year 1", revenue: "€900K" },
              { year: "Year 2", revenue: "€650K" },
              { year: "Year 3", revenue: "€650K" }
            ]
          },
          esgCase: [
            "CSRD ESRS E1-compliant Scope 3 Category 1 disclosure with farm-level data granularity",
            "Moves from estimated average emission factors to actual farm GHG intensity data — significant credibility improvement",
            "Enables SBTi FLAG (Forest, Land and Agriculture) target validation for the agricultural supply chain",
            "Farm-level reduction programme tracking demonstrates active stewardship of Scope 3 to investors and ESG raters",
            "Indirect — creates the infrastructure to enable -85,000 tCO2e of agricultural supply chain reduction"
          ],
          keySellingPoints: [
            "Farm-level data collection at the scale of 20,000+ suppliers is not achievable through manual processes — this requires the platform approach.",
            "Orange Business handles the complex data integration between diverse farm management software environments.",
            "CSRD auditors specifically flag aggregated agricultural Scope 3 estimates as inadequate — farm-level data is becoming mandatory.",
            "The platform reframes farmer data collection as a business benefit (precision farming intelligence) rather than a compliance burden, improving participation rates."
          ],
          nextSteps: [
            "Engage VP Agricultural Sourcing & Supply Chain with a gap analysis of current Scope 3 Category 1 methodology versus CSRD ESRS E1 requirements.",
            "Pilot with 200 high-volume French dairy suppliers to validate data collection workflow and GHG calculation methodology.",
            "Map which agricultural regions have the highest average GHG intensity to prioritise reduction programme investment."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "Plastic Packaging Circularity and EPR Compliance",
        product: "Ocean + Circular Mobility",
        detail:
          "Packaging return logistics intelligence and reverse supply chain optimisation for deposit return schemes and EPR compliance",
        icon: Recycle,
        impactScore: 84,
        metrics: {
          profitability: "€1.6M estimated contract value | Reverse logistics + circular services",
          clientBenefit: "EU PPWR recycled content target roadmap + AGEC EPR compliance management",
          co2Impact: "-7,900 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Meeting the EU PPWR's 50% recycled content target by 2030 requires Danone to significantly expand the collection and recycling of post-consumer plastic packaging — which in turn depends on optimised deposit return scheme (DRS) logistics and collaboration with packaging waste recovery organisations across multiple European markets.",
            "Ocean platform provides real-time visibility and routing optimisation for Danone's packaging return logistics — covering the collection of deposit-return PET bottles, yoghurt pot take-back pilots, and the transportation of recovered materials to certified recyclers or reprocessors.",
            "Circular Mobility extends the service to manage the lifecycle of the light commercial vehicles used for packaging collection, identifying the optimal electrification timeline for urban collection routes and providing the verified emissions data for CSRD circular economy reporting."
          ],
          financialCase: {
            contractValue: "€1.6M",
            revenueType: "Reverse Logistics Analytics + Circular Fleet Services",
            upsellPotential: "Medium — Expansion across European markets",
            years: [
              { year: "Year 1", revenue: "€620K" },
              { year: "Year 2", revenue: "€490K" },
              { year: "Year 3", revenue: "€490K" }
            ]
          },
          esgCase: [
            "Optimised packaging return logistics increases recycled PET collection rates — supporting the 50% recycled content target",
            "Verified collection volume data satisfies AGEC EPR reporting requirements for plastic packaging",
            "Reduces Scope 3 Category 4 emissions from reverse packaging logistics fleet",
            "Provides the circular economy performance metrics required for CSRD value chain disclosure",
            "Estimated CO2 reduction: -7,900 tCO2e/year"
          ],
          keySellingPoints: [
            "DRS logistics optimisation directly improves the economics of recycled PET supply — reducing Danone's dependence on virgin plastic.",
            "Ocean's dynamic routing handles the unpredictable collection volumes typical of consumer-facing packaging return schemes.",
            "Verified collection data provides the EPR audit trail that national compliance schemes require.",
            "Fleet electrification planning for light urban collection vehicles is immediately viable — a quick win alongside the longer-term packaging transition."
          ],
          nextSteps: [
            "Map Danone's current French and German PET bottle collection logistics network and identify the highest inefficiency points.",
            "Engage Head of Packaging Sustainability with a DRS logistics optimisation ROI model based on collection route data.",
            "Identify which EU markets have the most mature DRS infrastructure for an initial Ocean platform integration pilot."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "Manufacturing Energy and Water Intensity",
        product: "Smart Eco Energy",
        detail:
          "IoT energy and water monitoring across dairy processing, water bottling, and plant-based food manufacturing facilities",
        icon: Zap,
        impactScore: 87,
        metrics: {
          profitability: "€1.8M estimated contract value | Industrial IoT + SaaS",
          clientBenefit: "18% manufacturing energy reduction + water extraction intensity improvement",
          co2Impact: "-10,200 tCO2e/year estimated"
        },
        details: {
          overview: [
            "Danone's Évian and Volvic water bottling operations in the Haute-Savoie and Auvergne regions face growing regulatory pressure on extraction volumes from water-stressed alpine aquifers, alongside significant energy consumption from bottling lines, PET preform heating, and refrigeration systems.",
            "Smart Eco Energy deploys connected sensors across filling lines, sterilisation units, compressed air networks, and chilled water systems — providing plant engineers with real-time energy and water intensity dashboards that enable operational adjustments and shift scheduling to reduce peak consumption.",
            "For dairy processing facilities (Activia, Danette), the platform monitors pasteurisation and homogenisation energy intensity, cold room management, and wastewater treatment — delivering verified efficiency data for CSRD Scope 2 disclosure and internal manufacturing cost reduction programmes."
          ],
          financialCase: {
            contractValue: "€1.8M",
            revenueType: "IoT Hardware + Recurring SaaS",
            upsellPotential: "High — Multi-site European manufacturing network",
            years: [
              { year: "Year 1", revenue: "€750K" },
              { year: "Year 2", revenue: "€525K" },
              { year: "Year 3", revenue: "€525K" }
            ]
          },
          esgCase: [
            "18% manufacturing energy intensity reduction across audited production sites",
            "Direct improvement in verified Scope 2 market-based emissions for CSRD disclosure",
            "Water extraction intensity reduction at Évian and Volvic sites under regulatory and community scrutiny",
            "Aligns with Danone's Livelihoods for Nature programme water stewardship commitments",
            "Estimated CO2 reduction: -10,200 tCO2e/year"
          ],
          keySellingPoints: [
            "Water extraction and energy are both regulatory risk and operational cost at Danone's bottling sites — one platform addresses both simultaneously.",
            "Machine-level granularity identifies specific filling line inefficiencies invisible to utility-level billing data.",
            "Smart Eco Energy's water module includes regulatory threshold alerting for prefecture-monitored extraction limits.",
            "Self-funding within 20 months through energy cost savings — straightforward capex case for plant investment committee."
          ],
          nextSteps: [
            "Propose a pilot at the Évian-les-Bains bottling plant covering filling lines and compressed air — highest energy density per site.",
            "Prepare an energy intensity benchmark comparing Danone's published plant performance against peer food & beverage manufacturers.",
            "Engage Director of Industrial Operations with a water extraction reduction business case for the Volvic regulatory compliance context."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "Scope 3 share of total GHG footprint",
        value: ">70%",
        context: "Category 1 agricultural emissions — dairy farming methane dominant",
      },
      {
        metric: "EU PPWR recycled plastic content target",
        value: "50% by 2030",
        context: "mandatory for all plastic packaging — major supply chain transformation required",
      },
      {
        metric: "CSRD applicability",
        value: "FY 2024",
        context: "Danone reporting as a large PIE — first full ESRS report due 2025",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Marc-Antoine Boucher", email: "ma.boucher@danone.com", icon: Leaf },
      { role: "VP Agricultural Sourcing & Supply Chain", icon: Globe },
      { role: "Head of Packaging Sustainability", icon: Recycle },
      { role: "Director of Industrial Operations", icon: Building2 },
    ]
  },
  loreal: {
    name: "L'Oréal",
    score: 88,
    sources: 41,
    challenges: [
      {
        id: 1,
        icon: Globe,
        title: "Ingredient Supply Chain Deforestation and EUDR Compliance",
        description:
          "L'Oréal sources over 1,500 natural ingredients globally, including palm oil, mica, soy, and wood-derived cellulose — several of which are linked to high deforestation-risk origins. The EU Deforestation Regulation (EUDR), applicable to large operators from December 2025, requires documented evidence that each ingredient lot did not originate from recently deforested or forest-degraded land, with geolocation data to plot level. Non-compliance risks EU market access suspension.",
        urgency: "Critical",
        urgencyColor: "text-red-400 bg-red-950/50 border-red-500/30",
      },
      {
        id: 2,
        icon: Recycle,
        title: "Plastic Packaging Waste and Microplastics Regulation",
        description:
          "L'Oréal uses approximately 500,000 tonnes of packaging annually, with plastic representing the largest share across shampoo bottles, cream jars, and tube packaging. The EU Packaging & Packaging Waste Regulation recast mandates 50% recycled content in plastic packaging by 2030. ECHA's microplastic restriction (effective 2027) further requires the phase-out of intentionally added microplastics from rinse-off cosmetic formulations.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
      {
        id: 3,
        icon: Zap,
        title: "Manufacturing Water Consumption and Scope 2 Energy",
        description:
          "L'Oréal's manufacturing plants — including Caudry, Rambouillet, and Burgos — have committed to carbon neutrality at plant level under the L'Oréal for the Future programme. However, several sites remain heavily dependent on purchased electricity with high carbon intensity, and water consumption in cosmetics manufacturing (emulsification, rinsing, cleaning-in-place) is a growing concern in water-stressed regions where plants are located.",
        urgency: "High",
        urgencyColor: "text-amber-400 bg-amber-950/40 border-amber-500/25",
      },
    ],
    solutions: [
      {
        challengeId: 1,
        challengeLabel: "Ingredient Supply Chain Deforestation and EUDR Compliance",
        product: "Evolution Platform",
        detail:
          "Ingredient traceability and geolocation data platform for EUDR due diligence statements and CSRD value chain deforestation disclosure",
        icon: Globe,
        impactScore: 93,
        metrics: {
          profitability: "€2.5M estimated contract value | Platform & traceability services",
          clientBenefit: "EUDR compliance for all in-scope ingredients by December 2025 deadline",
          co2Impact: "Indirect — enables deforestation prevention across high-risk sourcing regions"
        },
        details: {
          overview: [
            "EUDR compliance is not a reporting exercise — it is an operational transformation of how L'Oréal sources, verifies, and documents every shipment of palm oil, soy derivatives, wood cellulose, and other in-scope commodities. Each due diligence statement must include GPS polygon data for the production plot, a negligible deforestation risk assessment, and a chain-of-custody audit trail.",
            "The Evolution Platform provides the central data hub that receives geolocation and sourcing documentation from L'Oréal's ingredient suppliers and traders, validates it against satellite deforestation monitoring datasets (EU JRC, Global Forest Watch), and produces the EUDR-compliant due diligence statements required for EU customs declaration.",
            "Beyond regulatory compliance, the platform creates L'Oréal's first comprehensive ingredient origin map — enabling the sustainable sourcing team to identify which suppliers are in high deforestation-risk zones, prioritise audit visits, and make evidence-based sourcing decisions that protect both compliance and brand reputation."
          ],
          financialCase: {
            contractValue: "€2.5M",
            revenueType: "Platform License & Traceability Data Services",
            upsellPotential: "Very High — Full CSRD supply chain disclosure expansion",
            years: [
              { year: "Year 1", revenue: "€1.1M" },
              { year: "Year 2", revenue: "€700K" },
              { year: "Year 3", revenue: "€700K" }
            ]
          },
          esgCase: [
            "EUDR-compliant due diligence statements for all in-scope ingredients before the December 2025 large operator deadline",
            "Plot-level geolocation data with satellite deforestation verification — the highest standard of EUDR evidence",
            "CSRD ESRS E4 (Biodiversity & Ecosystems) disclosure with verified deforestation risk data by sourcing region",
            "Supplier segmentation by deforestation risk enables proactive sourcing decisions — not reactive compliance",
            "Indirect — creates the traceability foundation for deforestation prevention across palm oil and soy supply chains"
          ],
          keySellingPoints: [
            "EUDR non-compliance means EU market access suspension for in-scope products — the business risk is existential for affected SKUs.",
            "Orange Business as a neutral data custodian enables L'Oréal to receive sensitive supplier GPS data without commercial conflict.",
            "Pre-built integration with Global Forest Watch and EU JRC monitoring datasets removes the satellite data acquisition burden.",
            "EUDR data feeds directly into CSRD ESRS E4 biodiversity disclosures — one platform serving two compliance frameworks."
          ],
          nextSteps: [
            "Inventory L'Oréal's top 20 ingredient suppliers for EUDR in-scope commodities and current geolocation data availability.",
            "Engage VP Global Sourcing & Procurement with an EUDR readiness timeline assessment against the December 2025 deadline.",
            "Pilot with palm oil supply chain (highest risk, most complex) as the first traceability module to validate platform methodology."
          ]
        }
      },
      {
        challengeId: 2,
        challengeLabel: "Plastic Packaging Waste and Microplastics Regulation",
        product: "Ocean + Circular Mobility",
        detail:
          "Packaging return logistics and reverse supply chain management for cosmetics packaging EPR compliance and recycled content targets",
        icon: Recycle,
        impactScore: 82,
        metrics: {
          profitability: "€1.4M estimated contract value | Reverse logistics + circular services",
          clientBenefit: "EU PPWR recycled plastic content roadmap + ECHA microplastic phase-out tracking",
          co2Impact: "-5,400 tCO2e/year estimated"
        },
        details: {
          overview: [
            "L'Oréal's L'Oréal for the Future target of 100% recyclable, reusable, or compostable packaging by 2025 was largely achieved for design compliance, but the next challenge is physical recovery — ensuring that recyclable packaging actually re-enters the recycling stream at high rates across diverse European markets.",
            "Ocean platform provides logistics intelligence for L'Oréal's cosmetics packaging take-back partnerships (in-store collection points, post-consumer recovery schemes), optimising collection routes, container fill rates, and transport to certified recyclers — improving the economics of reverse logistics sufficiently to expand coverage.",
            "Circular Mobility manages the EV transition of the light fleet used for packaging collection, providing verified emissions data for CSRD circular economy metrics and supporting L'Oréal's engagement with Extended Producer Responsibility schemes across France, Germany, and the UK."
          ],
          financialCase: {
            contractValue: "€1.4M",
            revenueType: "Reverse Logistics Analytics + Circular Fleet Services",
            upsellPotential: "Medium — European retail partner network expansion",
            years: [
              { year: "Year 1", revenue: "€550K" },
              { year: "Year 2", revenue: "€425K" },
              { year: "Year 3", revenue: "€425K" }
            ]
          },
          esgCase: [
            "Optimised collection logistics increases cosmetics packaging recycling rates — supporting the EU PPWR 50% recycled content target",
            "Verified collection volume data satisfies EPR reporting requirements in France, Germany, and the UK",
            "Reduces Scope 3 Category 4 emissions from packaging reverse logistics operations",
            "Circular economy performance data feeds directly into CSRD value chain environmental reporting",
            "Estimated CO2 reduction: -5,400 tCO2e/year"
          ],
          keySellingPoints: [
            "Collection logistics efficiency determines whether recyclable packaging design actually translates into real-world recycling — this closes the gap.",
            "Ocean's dynamic routing adapts to in-store collection point locations as L'Oréal's retail partner network evolves.",
            "EPR compliance data is automatically formatted for national producer compliance scheme submission.",
            "Partnership with Orange Business — a recognised European sustainability leader — enhances L'Oréal's partner credibility in retail ESG discussions."
          ],
          nextSteps: [
            "Map L'Oréal's current in-store packaging take-back network coverage across the top five European markets.",
            "Engage Head of Packaging Innovation with a collection route efficiency model for the French hypermarket partnership network.",
            "Identify which packaging formats (shampoo bottles, mascara tubes) have the highest collection infrastructure maturity for an initial pilot."
          ]
        }
      },
      {
        challengeId: 3,
        challengeLabel: "Manufacturing Water Consumption and Scope 2 Energy",
        product: "Smart Eco Energy",
        detail:
          "IoT energy and water monitoring across cosmetics and haircare manufacturing plants targeting carbon and water neutrality",
        icon: Zap,
        impactScore: 88,
        metrics: {
          profitability: "€1.9M estimated contract value | Industrial IoT + SaaS",
          clientBenefit: "Plant-level carbon neutrality roadmap + 20% water intensity reduction",
          co2Impact: "-8,600 tCO2e/year estimated"
        },
        details: {
          overview: [
            "L'Oréal has committed to carbon neutrality at all its sites by 2025 under the L'Oréal for the Future programme — a target that requires precise energy accounting, renewable sourcing verification, and systematic reduction of residual energy waste before any remaining offset is applied.",
            "Smart Eco Energy provides the granular, site-level energy monitoring infrastructure that makes this commitment credible and auditable — connecting emulsification reactors, filling machines, clean-room HVAC, and utilities to a real-time dashboard that tracks energy intensity per tonne of finished product.",
            "The water monitoring module addresses an increasingly sensitive operational issue: cosmetics manufacturing requires large quantities of purified water (PW) and water-for-injection (WFI) grade water, and optimising cleaning-in-place cycles, PW generation, and reject water management reduces both site water consumption and the energy cost of water treatment."
          ],
          financialCase: {
            contractValue: "€1.9M",
            revenueType: "IoT Hardware + Recurring SaaS",
            upsellPotential: "High — Global plant network rollout",
            years: [
              { year: "Year 1", revenue: "€800K" },
              { year: "Year 2", revenue: "€550K" },
              { year: "Year 3", revenue: "€550K" }
            ]
          },
          esgCase: [
            "Plant-level energy intensity data provides the verified baseline for L'Oréal's carbon neutrality claims — essential for credible third-party assurance",
            "20% water intensity reduction at audited sites addresses regulatory and community water stewardship obligations",
            "Direct improvement in verified Scope 2 market-based emissions for CSRD ESRS E1 disclosure",
            "Energy savings reduce the volume of renewable energy or offsets required to achieve plant neutrality — improving programme economics",
            "Estimated CO2 reduction: -8,600 tCO2e/year"
          ],
          keySellingPoints: [
            "L'Oréal's 2025 carbon neutrality commitment requires verified, site-level data — Smart Eco Energy provides exactly the evidence standard required.",
            "Cleaning-in-place optimisation in cosmetics manufacturing is a highly specialised application where Orange's industrial IoT specialists add unique value.",
            "Water intensity dashboards provide the community engagement data that L'Oréal's plant managers need in water-stressed regions.",
            "Platform scales from a single plant pilot to the full 38-site European manufacturing network without rearchitecting."
          ],
          nextSteps: [
            "Propose a pilot at the Caudry haircare manufacturing plant — one of L'Oréal's largest European sites by production volume.",
            "Prepare an energy intensity benchmark comparing L'Oréal's published manufacturing footprint against peer beauty manufacturers.",
            "Engage Director of Industrial Excellence with a water intensity reduction business case aligned with the 2025 water neutrality commitments."
          ]
        }
      }
    ],
    benchmarks: [
      {
        metric: "EUDR compliance deadline",
        value: "December 2025",
        context: "for large operators — EU market access at risk for non-compliant in-scope products",
      },
      {
        metric: "EU PPWR recycled plastic content",
        value: "50% by 2030",
        context: "mandatory for all plastic packaging across L'Oréal's product range",
      },
      {
        metric: "Beauty sector water intensity",
        value: "~3.2L/unit",
        context: "average water consumption per unit produced — L'Oréal targeting below sector average",
      },
    ],
    contacts: [
      { role: "Chief Sustainability Officer", name: "Céline Duchamp", email: "c.duchamp@loreal.com", icon: Leaf },
      { role: "VP Global Sourcing & Procurement", icon: Globe },
      { role: "Head of Packaging Innovation", icon: Recycle },
      { role: "Director of Industrial Excellence", icon: Building2 },
    ]
  }
};