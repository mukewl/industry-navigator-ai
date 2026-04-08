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
      { role: "Chief Sustainability Officer", icon: Leaf },
      { role: "VP of Manufacturing Operations", icon: Building2 },
      { role: "Head of Fleet and Mobility Services", icon: Truck },
      { role: "Group Procurement Director", icon: Users },
    ]
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
      { role: "Chief Sustainability Officer", icon: Leaf },
      { role: "VP of Store Operations", icon: Store },
      { role: "Head of Supply Chain and Logistics", icon: Truck },
      { role: "Director of Digital Transformation", icon: Laptop },
    ]
  }
};