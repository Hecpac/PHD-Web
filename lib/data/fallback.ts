import type { BlogPost, FAQ, ProcessStep, Project, Review, Service, ServiceDetail } from "@/lib/types/content";

export const fallbackProjects: Project[] = [
  {
    id: "fallback-project-1",
    title: "North Dallas Courtyard Residence",
    slug: "north-dallas-courtyard-residence",
    location: {
      city: "Dallas",
      neighborhood: "Preston Hollow",
      display: "Preston Hollow, Dallas",
    },
    style: "Modern",
    year: 2025,
    summary:
      "A courtyard-centered home designed to maximize privacy, daylight control, and indoor-outdoor continuity.",
    description:
      "This Preston Hollow residence centers on a private courtyard that mediates between public and family zones. The design-build team coordinated a steel-and-glass pavilion structure with site-cast concrete walls, achieving precise daylight control while maintaining visual openness. Located in one of North Dallas's most established neighborhoods, the project required close coordination with local review boards and a construction sequence engineered around mature tree preservation. The result is a 5,100-square-foot home that feels both expansive and intimate — a controlled environment shaped by the specific constraints of its DFW lot.",
    gallery: [
      {
        src: "/projects/north-dallas-courtyard-residence/hero.jpg",
        alt: "North Dallas Courtyard Residence front elevation in Preston Hollow, Dallas",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/north-dallas-courtyard-residence/living.jpg",
        alt: "Double-height living room with black stone fireplace in Preston Hollow, Dallas",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/north-dallas-courtyard-residence/kitchen.jpg",
        alt: "White waterfall island kitchen with open stair connection in Preston Hollow, Dallas",
        width: 2000,
        height: 1126,
      },
    ],
    highlights: [
      "Architect-led concept and detailing",
      "Integrated permitting and trade coordination",
      "High-efficiency envelope and systems",
    ],
    specs: {
      sqft: 5100,
      beds: 5,
      baths: 6,
      stories: 2,
    },
    isFeatured: true,
    featuredOrder: 1,
    heroImage: {
      src: "/projects/north-dallas-courtyard-residence/hero.jpg",
      alt: "North Dallas Courtyard Residence front elevation in Preston Hollow, Dallas",
      width: 2000,
      height: 1334,
    },
    tags: ["Modern", "5,100 sqft", "Preston Hollow"],
  },
  {
    id: "fallback-project-2",
    title: "Fort Worth Bluff House",
    slug: "fort-worth-bluff-house",
    location: {
      city: "Fort Worth",
      neighborhood: "Westover Hills",
      display: "Westover Hills, Fort Worth",
    },
    style: "Transitional",
    year: 2024,
    summary:
      "A layered material palette and disciplined massing strategy for a sloped infill lot in Fort Worth.",
    description:
      "The Bluff House in Westover Hills, Fort Worth addresses a challenging sloped infill lot with a disciplined massing strategy that steps with the grade rather than fighting it. The design-build team developed a layered material palette — limestone, weathered steel, and white oak — that ages gracefully in the North Texas climate. BIM-based coordination before field work eliminated trade conflicts and kept the project on its 14-month schedule. The 4,600-square-foot home includes a cantilevered main living volume with panoramic views of the Fort Worth skyline, achieved through careful structural engineering and site planning specific to the DFW terrain.",
    gallery: [
      {
        src: "/projects/fort-worth-bluff-house/hero.jpg",
        alt: "Fort Worth Bluff House front elevation in Westover Hills, Fort Worth",
        width: 2000,
        height: 2666,
      },
      {
        src: "/projects/fort-worth-bluff-house/kitchen.jpg",
        alt: "White kitchen with black tile backsplash in Westover Hills, Fort Worth",
        width: 2000,
        height: 2666,
      },
      {
        src: "/projects/fort-worth-bluff-house/living.jpg",
        alt: "Open living and kitchen area with polished tile floors in Fort Worth",
        width: 2000,
        height: 1500,
      },
    ],
    highlights: [
      "Site strategy aligned with neighborhood covenants",
      "BIM-based coordination before field work",
      "Detailed quality-control punch process",
    ],
    specs: {
      sqft: 4600,
      beds: 4,
      baths: 5,
      stories: 2,
    },
    isFeatured: true,
    featuredOrder: 2,
    heroImage: {
      src: "/projects/fort-worth-bluff-house/hero.jpg",
      alt: "Fort Worth Bluff House two-story exterior in Westover Hills, Fort Worth",
      width: 2000,
      height: 2666,
    },
    tags: ["Transitional", "4,600 sqft", "Westover Hills"],
  },
  {
    id: "fallback-project-3",
    title: "Prosper Linear Pavilion",
    slug: "prosper-linear-pavilion",
    location: {
      city: "Prosper",
      display: "Prosper, DFW Metroplex",
    },
    style: "Modern Farmhouse",
    year: 2023,
    summary:
      "A linear plan that separates entertainment and family wings while maintaining a cohesive circulation spine.",
    gallery: [
      {
        src: "/projects/prosper-linear-pavilion/hero.jpg",
        alt: "Prosper Linear Pavilion aerial exterior in Prosper, Texas",
        width: 2000,
        height: 1126,
      },
      {
        src: "/projects/prosper-linear-pavilion/living.jpg",
        alt: "Bright living room with corner windows in the Prosper Linear Pavilion",
        width: 2000,
        height: 1336,
      },
      {
        src: "/projects/prosper-linear-pavilion/kitchen.jpg",
        alt: "White kitchen with center island in the Prosper Linear Pavilion",
        width: 2000,
        height: 1336,
      },
    ],
    highlights: [
      "Program-first preconstruction process",
      "Transparent decision gates and allowances",
      "Owner walkthroughs at each milestone",
    ],
    specs: {
      sqft: 4200,
      beds: 4,
      baths: 4,
      stories: 1,
    },
    isFeatured: false,
    tags: ["Modern Farmhouse", "4,200 sqft", "Prosper"],
  },
  {
    id: "fallback-project-4",
    title: "Southlake Estate Retreat",
    slug: "southlake-estate-retreat",
    location: {
      city: "Southlake",
      neighborhood: "Estes Park",
      display: "Estes Park, Southlake",
    },
    style: "Contemporary",
    year: 2025,
    summary:
      "An estate-scale contemporary residence with a resort-style outdoor pavilion and integrated smart-home systems.",
    gallery: [
      {
        src: "/projects/southlake-estate-retreat/hero.jpg",
        alt: "Southlake Estate Retreat twilight exterior in Estes Park, Southlake",
        width: 2000,
        height: 1126,
      },
      {
        src: "/projects/southlake-estate-retreat/open-living.jpg",
        alt: "Open living and kitchen layout in the Southlake Estate Retreat",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/southlake-estate-retreat/primary-bath.jpg",
        alt: "Primary bathroom with freestanding tub in the Southlake Estate Retreat",
        width: 2000,
        height: 1334,
      },
    ],
    highlights: [
      "Resort-style pool and outdoor kitchen pavilion",
      "Full home automation and lighting control",
      "Custom millwork and steel fabrication detailing",
    ],
    specs: {
      sqft: 6800,
      beds: 6,
      baths: 7,
      stories: 2,
    },
    isFeatured: true,
    featuredOrder: 3,
    heroImage: {
      src: "/projects/southlake-estate-retreat/hero.jpg",
      alt: "Southlake Estate Retreat twilight exterior in Estes Park, Southlake",
      width: 2000,
      height: 1126,
    },
    tags: ["Contemporary", "6,800 sqft", "Southlake"],
  },
  {
    id: "fallback-project-5",
    title: "Highland Park Tudor Revival",
    slug: "highland-park-tudor-revival",
    location: {
      city: "Highland Park",
      display: "Highland Park, Dallas",
    },
    style: "Tudor Revival",
    year: 2024,
    summary:
      "A ground-up Tudor Revival that honors the neighborhood's historic character while integrating modern construction and energy systems.",
    gallery: [
      {
        src: "/projects/highland-park-tudor-revival/hero.jpg",
        alt: "Highland Park Tudor Revival rear exterior in Highland Park, Dallas",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/highland-park-tudor-revival/exterior-rear.jpg",
        alt: "Backyard elevation of the Highland Park Tudor Revival home",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/highland-park-tudor-revival/bedroom.jpg",
        alt: "Sunlit bedroom with neutral finishes in the Highland Park Tudor Revival",
        width: 2000,
        height: 1334,
      },
    ],
    highlights: [
      "Navigated Highland Park architectural review board",
      "Reclaimed brick and limestone facade detailing",
      "High-performance envelope behind traditional aesthetic",
    ],
    specs: {
      sqft: 5500,
      beds: 5,
      baths: 6,
      stories: 2,
    },
    isFeatured: true,
    featuredOrder: 4,
    heroImage: {
      src: "/projects/highland-park-tudor-revival/hero.jpg",
      alt: "Highland Park Tudor Revival rear exterior in Highland Park, Dallas",
      width: 2000,
      height: 1334,
    },
    tags: ["Tudor Revival", "5,500 sqft", "Highland Park"],
  },
];

export const fallbackServices: Service[] = [
  {
    id: "service-architecture",
    title: "Architectural Design Coordination",
    summary: "We align architecture, structural systems, and buildability from day one.",
    deliverables: [
      "Concept massing and planning package",
      "Budget-aware design alignment meetings",
      "Permit-ready documentation handoff",
    ],
    order: 1,
    icon: "Compass",
  },
  {
    id: "service-precon",
    title: "Preconstruction & Pricing",
    summary: "Scope, schedule, and risk controls before construction starts.",
    deliverables: [
      "Trade scoping and bid leveling",
      "Phased budget and allowance matrix",
      "Critical-path schedule baseline",
    ],
    order: 2,
    icon: "Ruler",
  },
  {
    id: "service-construction",
    title: "Construction Management",
    summary: "Execution rigor with verified quality checkpoints and communication cadence.",
    deliverables: [
      "Weekly owner progress reports",
      "Quality-control inspections by milestone",
      "Closeout punch and warranty orientation",
    ],
    order: 3,
    icon: "Hammer",
  },
];

export const fallbackProcessSteps: ProcessStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "Discovery & Feasibility",
    description:
      "We validate lot constraints, priorities, and budget ranges for projects in the DFW Metroplex.",
    deliverables: ["Project brief", "Site constraints memo", "Initial budget band"],
    decisionGate: "Proceed to concept planning",
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Concept & Cost Alignment",
    description:
      "Architecture and builder teams align scope, systems, and cost before drawings are advanced.",
    deliverables: ["Concept package", "Engineering assumptions", "Updated target budget"],
    decisionGate: "Approve schematic direction",
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "Documentation & Permits",
    description:
      "Technical documentation is coordinated, reviewed, and prepared for permitting and procurement.",
    deliverables: ["Permit submittal set", "Bid-ready scopes", "Milestone schedule"],
    decisionGate: "Release to construction",
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "Build & Handover",
    description:
      "Construction is managed through QA checkpoints, owner walkthroughs, and closeout documentation.",
    deliverables: ["Progress reporting", "Punch completion", "Warranty handoff packet"],
  },
];

export const fallbackServiceDetails: ServiceDetail[] = [
  {
    id: "detail-architectural-design",
    slug: "architectural-design",
    title: "Architectural Design",
    summary: "Architecture-led concept development calibrated for DFW lot conditions, codes, and climate.",
    description:
      "Our architectural design process starts with site analysis and program definition specific to the Dallas-Fort Worth Metroplex. We coordinate massing, orientation, and material strategies with structural and MEP consultants from day one, ensuring the design intent survives the transition to construction documentation.",
    deliverables: [
      "Site analysis and constraints report",
      "Concept massing and floor plan options",
      "Schematic design package with 3D views",
      "Design development drawings",
      "Material and finish palette coordination",
      "Permit-ready construction documentation",
    ],
    benefits: [
      "Architecture and buildability aligned from the first sketch",
      "DFW code and HOA compliance built into the design",
      "Budget-aware design decisions at every stage",
    ],
    order: 1,
    icon: "Compass",
  },
  {
    id: "detail-interior-design",
    slug: "interior-design",
    title: "Interior Design & Planning",
    summary: "Interior environments designed for how DFW families actually live — not showroom fiction.",
    description:
      "We develop interior plans that integrate with the architectural shell from the start. Finish selections, millwork detailing, lighting design, and furniture layouts are coordinated before construction begins, eliminating costly change orders and ensuring a cohesive result.",
    deliverables: [
      "Interior space planning and layouts",
      "Material, finish, and fixture selections",
      "Custom millwork and cabinetry design",
      "Lighting design and fixture specification",
      "Furniture layout and procurement coordination",
      "Color and palette development",
    ],
    benefits: [
      "Selections locked before drywall — no delays",
      "Coordinated palette across architecture and interiors",
      "Trade-ready specifications reduce field decisions",
    ],
    order: 2,
    icon: "Palette",
  },
  {
    id: "detail-consulting",
    slug: "consulting",
    title: "Consulting Services",
    summary: "Expert guidance for owners navigating the custom home process in Dallas-Fort Worth.",
    description:
      "Whether you need a second opinion on a builder's bid, help evaluating a lot in Frisco, or guidance on a renovation scope in Highland Park, our consulting engagements provide objective, experienced insight without a long-term commitment.",
    deliverables: [
      "Bid review and leveling analysis",
      "Lot feasibility evaluation",
      "Project scope and budget assessment",
      "Builder or architect selection guidance",
      "Construction progress audits",
      "Dispute resolution consultation",
    ],
    benefits: [
      "Objective expert opinion with no construction conflict of interest",
      "Hourly or fixed-fee engagements — flexible commitment",
      "DFW-specific market knowledge and trade relationships",
    ],
    order: 3,
    icon: "MessageCircle",
  },
  {
    id: "detail-project-management",
    slug: "project-management",
    title: "Project Management",
    summary: "Schedule, budget, and quality control for custom homes across the DFW Metroplex.",
    description:
      "Our project management methodology applies structured oversight to every phase — from preconstruction through closeout. Weekly reporting, milestone inspections, and documented decision gates keep the project on track and the owner informed.",
    deliverables: [
      "Critical-path schedule with milestone tracking",
      "Weekly owner progress reports",
      "Budget tracking with allowance management",
      "Trade coordination and scheduling",
      "Quality-control inspections at each milestone",
      "Closeout punch list and warranty handoff",
    ],
    benefits: [
      "Single point of accountability for schedule and budget",
      "Documented decision gates prevent scope creep",
      "94% on-time completion rate across DFW projects",
    ],
    order: 4,
    icon: "ClipboardList",
  },
  {
    id: "detail-landscape-architecture",
    slug: "landscape-architecture",
    title: "Landscape Architecture",
    summary: "Outdoor environments engineered for the DFW climate and integrated with the home's architecture.",
    description:
      "Our landscape design extends the architectural intent to the full site. We work with the DFW climate — heat-tolerant plantings, smart irrigation, drainage engineering — and coordinate hardscape, pools, and outdoor living spaces with the home's structural and MEP systems.",
    deliverables: [
      "Site grading and drainage design",
      "Planting plan with DFW-adapted species",
      "Hardscape and outdoor living design",
      "Pool and water feature coordination",
      "Irrigation system specification",
      "Landscape lighting plan",
    ],
    benefits: [
      "Plant selections proven for North Texas heat and clay soils",
      "Drainage engineered to DFW storm standards",
      "Outdoor spaces designed as architectural extensions, not afterthoughts",
    ],
    order: 5,
    icon: "TreePine",
  },
  {
    id: "detail-3d-rendering",
    slug: "3d-rendering",
    title: "3D Rendering Visualization",
    summary: "Photorealistic visualization so you can see your DFW home before ground breaks.",
    description:
      "We produce high-fidelity 3D renderings and virtual walkthroughs that show materials, lighting, and spatial relationships as they will appear in the built project. Renderings are used during design reviews to validate decisions and align expectations before construction begins.",
    deliverables: [
      "Exterior photorealistic renderings",
      "Interior room visualizations",
      "Material and finish comparisons",
      "Virtual walkthrough animations",
      "Site context renderings with DFW landscape",
      "Design option comparison studies",
    ],
    benefits: [
      "Eliminate guesswork — see the home before you build it",
      "Faster decision-making on materials and finishes",
      "Shareable visuals for HOA and permitting submissions",
    ],
    order: 6,
    icon: "Box",
  },
  {
    id: "detail-feasibility-studies",
    slug: "feasibility-studies",
    title: "Feasibility Studies",
    summary: "Data-driven analysis before you commit to a lot or project scope in Dallas-Fort Worth.",
    description:
      "Before you invest in land or commit to a build program, our feasibility studies evaluate the site, zoning, utilities, and budget realities of your project. We analyze DFW-specific factors — HOA restrictions, floodplain status, soil conditions, and utility availability — to identify risks before they become costly surprises.",
    deliverables: [
      "Zoning and code compliance analysis",
      "Site survey and topography review",
      "Utility and infrastructure assessment",
      "Preliminary budget range estimate",
      "Risk identification matrix",
      "Go/no-go recommendation report",
    ],
    benefits: [
      "Know the true cost of a lot before you close",
      "DFW-specific zoning and HOA expertise",
      "Data-driven decision — not gut feeling",
    ],
    order: 7,
    icon: "Search",
  },
];

export const fallbackReviews: Review[] = [
  {
    id: "review-1",
    author: "Michael & Sarah T.",
    location: "Preston Hollow, Dallas",
    rating: 5,
    text: "From the first feasibility meeting to the day we moved in, every step was documented and transparent. The decision gate process gave us confidence that we were never going to be surprised by a budget overrun. Our home in Preston Hollow turned out exactly as the 3D renderings showed.",
    projectType: "New Construction",
    date: "2025-08-15",
  },
  {
    id: "review-2",
    author: "Jennifer L.",
    location: "Westover Hills, Fort Worth",
    rating: 5,
    text: "We interviewed four builders in the DFW area before choosing this team. The difference was the architecture-first approach — they didn't just want to build a house, they wanted to protect the design intent through every phase of construction. The weekly reports kept us informed without overwhelming us.",
    projectType: "New Construction",
    date: "2025-06-20",
  },
  {
    id: "review-3",
    author: "David & Maria R.",
    location: "Southlake",
    rating: 5,
    text: "The preconstruction process was incredibly thorough. They caught a drainage issue on our lot that two other builders missed. The feasibility study alone saved us from a costly mistake. Our Southlake home was delivered on time and on budget.",
    projectType: "New Construction",
    date: "2025-04-10",
  },
  {
    id: "review-4",
    author: "Robert K.",
    location: "Frisco",
    rating: 5,
    text: "As someone who's built three custom homes, I can say this was the most organized process I've experienced. The milestone QA inspections caught things before they became problems. Our Frisco project came in under the original timeline.",
    projectType: "New Construction",
    date: "2025-02-28",
  },
  {
    id: "review-5",
    author: "Amanda & Chris P.",
    location: "Highland Park, Dallas",
    rating: 5,
    text: "Working within Highland Park's strict building guidelines required a team that understood local codes inside and out. They navigated the approval process smoothly and delivered a modern home that respects the neighborhood's character while pushing design boundaries.",
    projectType: "Major Renovation",
    date: "2024-11-12",
  },
  {
    id: "review-6",
    author: "Thomas W.",
    location: "Prosper",
    rating: 5,
    text: "The interior design coordination was seamless. Every material selection was made before framing started, which meant zero delays from indecision. The landscape architecture team also delivered an outdoor space that handles the Texas heat beautifully.",
    projectType: "New Construction",
    date: "2024-09-05",
  },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Design-Build vs. Traditional: Which Delivery Method Fits Your DFW Custom Home?",
    slug: "design-build-vs-traditional-dfw",
    excerpt:
      "Comparing the two most common project delivery methods for custom homes in Dallas-Fort Worth, with cost, timeline, and accountability analysis.",
    category: "Process",
    author: "DFW Design-Build Team",
    date: "2025-09-10",
    readTime: "6 min read",
    content:
      "When planning a custom home in the Dallas-Fort Worth Metroplex, one of the first decisions you will face is choosing a project delivery method. The two most common approaches are design-build and the traditional design-bid-build model. Understanding how each works — and where each tends to fail — is essential for protecting your budget and timeline.\n\nIn a traditional delivery, you hire an architect to complete drawings, then solicit bids from multiple builders. This creates a competitive pricing environment, but it also introduces a structural gap: the architect and builder operate under separate contracts with separate incentives. In DFW's fast-moving market, where material costs and trade availability shift quickly, this gap frequently leads to redesigns, budget overruns, and adversarial relationships between the design and construction teams.\n\nThe design-build model consolidates architecture and construction under one contract and one team. At our firm, this means the builder is involved from the first concept sketch — validating costs, identifying constructability issues, and aligning the design with real DFW trade pricing before drawings are finalized. The result is a more predictable process with fewer change orders, faster permitting, and a single point of accountability from concept through move-in. For homeowners in communities like Preston Hollow, Southlake, and Frisco, where HOA requirements add another layer of coordination, this integrated approach consistently delivers better outcomes.",
    tags: ["Design-Build", "Process", "DFW"],
  },
  {
    id: "blog-2",
    title: "Understanding DFW Lot Feasibility: What to Evaluate Before You Buy",
    slug: "dfw-lot-feasibility-guide",
    excerpt:
      "A guide to evaluating zoning, soil conditions, floodplain status, and utility access for custom home lots across the Dallas-Fort Worth Metroplex.",
    category: "Feasibility",
    author: "DFW Design-Build Team",
    date: "2025-08-22",
    readTime: "8 min read",
    content:
      "Buying a lot for a custom home in Dallas-Fort Worth is not the same as buying a finished house. A beautiful piece of land in Prosper or Flower Mound can hide costly surprises — expansive clay soils, floodplain encroachment, inadequate utility access, or zoning restrictions that limit your build program. A thorough feasibility evaluation before you close on the lot is the single most effective way to protect your investment.\n\nStart with zoning and setback analysis. Every DFW municipality has different requirements, and some communities like Highland Park and Southlake layer additional architectural review standards on top of city code. Confirm that the lot size, setbacks, and height restrictions actually support the square footage and massing you have in mind. Next, evaluate soil conditions. North Texas is known for its expansive clay soils, which can cause significant foundation movement if not properly engineered. A geotechnical report will tell you what foundation system the site requires and what that adds to your budget.\n\nFinally, assess utility and infrastructure access. Not every lot in the DFW Metroplex has city water, sewer, and gas at the property line. Rural parcels in McKinney or Prosper may require well and septic systems, and utility extension costs can add tens of thousands to a project. We conduct these evaluations during our Discovery phase so that clients have a complete picture of what a lot will actually cost to build on — not just the purchase price, but the true cost of making it construction-ready.",
    tags: ["Feasibility", "Lot Evaluation", "DFW"],
  },
  {
    id: "blog-3",
    title: "How Decision Gates Prevent Budget Overruns in Custom Home Projects",
    slug: "decision-gates-budget-control",
    excerpt:
      "Our phased approval process ensures every scope, material, and cost decision is documented and owner-approved before advancing to the next milestone.",
    category: "Budget",
    author: "DFW Design-Build Team",
    date: "2025-07-15",
    readTime: "5 min read",
    content:
      "Budget overruns are the most common complaint among custom home owners in Dallas-Fort Worth — and in most cases, the root cause is not material costs or labor rates. It is the absence of a structured decision-making process. When scope decisions are made verbally, when allowances are vaguely defined, and when changes are approved without written cost impact analysis, the budget drifts. Our decision gate methodology is designed to prevent exactly this.\n\nAt each phase transition — from Discovery to Concept, Concept to Documentation, Documentation to Construction — the project pauses for a formal owner review. We present the complete scope, updated budget, and schedule impact. The owner approves or requests changes before the project advances. No verbal agreements, no ambiguity. Every change order during construction follows the same discipline: written scope, cost impact, schedule impact, and owner signature before any work proceeds.\n\nThis approach works because it respects a fundamental truth about custom home building in DFW: the decisions that drive cost happen early. By the time framing starts, roughly 80% of the budget is already committed through design decisions, material selections, and trade contracts. Our gate process forces these decisions to be made deliberately, with full cost visibility, at the point where they can still be adjusted without waste. Clients in Preston Hollow, Southlake, and Frisco have consistently told us that this transparency is what distinguishes their experience from previous builds.",
    tags: ["Budget", "Decision Gates", "Process"],
  },
  {
    id: "blog-4",
    title: "Modern Architecture in Dallas-Fort Worth: Trends Shaping Custom Homes in 2025",
    slug: "modern-architecture-dfw-2025-trends",
    excerpt:
      "From courtyard-centered plans to integrated indoor-outdoor living, the architectural trends defining DFW's custom home landscape this year.",
    category: "Design",
    author: "DFW Design-Build Team",
    date: "2025-06-01",
    readTime: "7 min read",
    content:
      "The architectural landscape for custom homes in Dallas-Fort Worth continues to evolve, driven by climate realities, lifestyle shifts, and advances in construction technology. In 2025, several trends are defining the projects we design and build across the Metroplex, from Preston Hollow to Southlake to Prosper.\n\nCourtyard-centered plans have become one of the most requested layouts. In a climate where summer temperatures routinely exceed 100 degrees, a central courtyard creates a protected outdoor zone with controlled shade, cross-ventilation, and privacy. These plans work particularly well on DFW's typical rectangular lots, where side setbacks limit window placement on exterior walls. By turning the home inward around a courtyard, every major room gains natural light and an outdoor connection without sacrificing privacy.\n\nIntegrated indoor-outdoor living remains a defining feature of DFW custom homes, but the approach has matured. Clients are moving beyond the standard covered patio toward fully engineered outdoor rooms with climate control — retractable screens, misting systems, radiant heating, and outdoor kitchens with the same appliance and finish standards as the interior. Steel-and-glass wall systems that open entire living areas to the outdoors are now structurally and thermally practical, thanks to improvements in thermal break technology. These systems require careful coordination between the architect, structural engineer, and builder from the earliest design phase — exactly the kind of integration that the design-build model facilitates.",
    tags: ["Architecture", "Design Trends", "DFW", "2025"],
  },
  {
    id: "blog-5",
    title: "Navigating HOA and Building Codes in North Texas Municipalities",
    slug: "hoa-building-codes-north-texas",
    excerpt:
      "A builder's perspective on working within the regulatory frameworks of Highland Park, Southlake, Frisco, Prosper, and other DFW communities.",
    category: "Regulations",
    author: "DFW Design-Build Team",
    date: "2025-04-18",
    readTime: "6 min read",
    content:
      "Building a custom home in Dallas-Fort Worth means navigating a patchwork of municipal codes, HOA architectural standards, and review board processes that vary significantly from one community to the next. What is approved without question in Frisco may require months of review in Highland Park. Understanding these differences before you start design is essential for protecting your timeline and avoiding costly redesigns.\n\nHighland Park and University Park have some of the most rigorous architectural review processes in North Texas. Submissions are evaluated not just for code compliance but for aesthetic compatibility with the neighborhood character. Material choices, roof pitches, facade proportions, and even landscape plans are subject to board approval. Southlake's development standards similarly include detailed architectural guidelines that govern everything from masonry percentages to garage door visibility. In Prosper, rapid growth has led to evolving zoning requirements as the city works to maintain development quality while accommodating new construction.\n\nOur approach to regulatory navigation begins during the Discovery phase. We identify every applicable code, HOA covenant, and review board requirement before design work starts. This upfront investment in regulatory research prevents the most expensive kind of delay: a design that has to be reworked after it has already been engineered and priced. For communities with formal review boards, we prepare submission packages that anticipate common objections and include the documentation reviewers need to approve the project efficiently. Across DFW, the builders who deliver on time are the ones who treat permitting and HOA coordination as a design input — not an afterthought.",
    tags: ["HOA", "Building Codes", "Regulations", "DFW"],
  },
  {
    id: "blog-6",
    title: "Landscape Design for the DFW Climate: Heat-Tolerant Strategies That Last",
    slug: "landscape-design-dfw-climate",
    excerpt:
      "Selecting plant species, irrigation systems, and hardscape materials engineered for North Texas clay soils, heat, and storm patterns.",
    category: "Landscape",
    author: "DFW Design-Build Team",
    date: "2025-03-05",
    readTime: "5 min read",
    content:
      "Landscape design in the Dallas-Fort Worth Metroplex operates under constraints that most national design publications ignore. Summer temperatures regularly exceed 100 degrees Fahrenheit. Clay soils expand and contract dramatically with moisture changes. Intense storm events can dump several inches of rain in hours, followed by weeks of drought. A landscape that does not account for these realities will fail within a few seasons — regardless of how much was spent on it.\n\nPlant selection is the foundation. We specify species proven to thrive in USDA Zone 8a conditions with North Texas clay soils: native and adapted varieties like Texas sage, Lindheimer muhly, cedar elm, and desert willow. These species require less irrigation once established, tolerate heat stress, and maintain visual quality through DFW's extreme summers. For clients in Southlake, Prosper, and Flower Mound, where larger lots allow for more extensive planting, we design in hydrozones — grouping plants by water need so the irrigation system can deliver precisely what each zone requires without waste.\n\nDrainage engineering is equally critical. DFW's clay soils drain poorly, and the flat topography of many North Texas lots means water has to be actively managed. We design grading, French drains, and surface drainage systems as part of the landscape plan, coordinating with the home's foundation engineering to ensure water is directed away from structures. Hardscape materials are selected for thermal performance — lighter-colored pavers and natural stone that do not become dangerously hot underfoot in summer. Every material and system choice is evaluated for long-term performance in the DFW climate, not just how it looks on installation day.",
    tags: ["Landscape", "Climate", "DFW", "Hardscape"],
  },
];

export const fallbackFaqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Do you build outside Dallas-Fort Worth?",
    answer:
      "No. We only accept design-build projects within the Dallas-Fort Worth Metroplex. This geographic focus lets us maintain strong relationships with local trade partners, stay current on municipal codes, and provide reliable timelines based on DFW-specific conditions.",
    category: "Service Area",
  },
  {
    id: "faq-2",
    question: "Can you build on our lot in DFW?",
    answer:
      "Yes. We frequently work on client-owned lots and include a feasibility assessment during the Discovery phase. We evaluate zoning, setbacks, soil conditions, floodplain status, and utility access before any design work begins.",
    category: "Process",
  },
  {
    id: "faq-3",
    question: "How do you keep budget decisions transparent?",
    answer:
      "Every phase includes clear deliverables, decision gates, and allowance tracking. You approve scope and cost at each milestone before the project advances. Weekly reports include budget status, change-order tracking, and allowance balances so there are no surprises.",
    category: "Budget",
  },
  {
    id: "faq-4",
    question: "How long does a custom home take to build in DFW?",
    answer:
      "Most custom homes in the 3,500–6,000 sqft range take 12–18 months from permit to move-in. The preconstruction phase (design, documentation, permitting) typically adds 3–5 months before that. We provide a detailed critical-path schedule during the Concept & Cost Alignment phase.",
    category: "Timeline",
  },
  {
    id: "faq-5",
    question: "What does a custom home cost per square foot in Dallas-Fort Worth?",
    answer:
      "Custom homes in DFW typically range from $250–$500+ per square foot depending on site conditions, finishes, and design complexity. We develop a detailed budget range during the Discovery phase so you have realistic numbers before committing to design. Our goal is no budget surprises — ever.",
    category: "Budget",
  },
  {
    id: "faq-6",
    question: "Do you handle permits and HOA approvals?",
    answer:
      "Yes. We manage the full permitting process with DFW municipalities and coordinate HOA architectural review submissions where required. Our team has direct experience with review boards in Highland Park, Southlake, Prosper, Frisco, and other regulated communities.",
    category: "Process",
  },
  {
    id: "faq-7",
    question: "What happens if I want to change something during construction?",
    answer:
      "Change orders are a normal part of custom home building. We document every change request with a written scope, cost impact, and schedule impact before any work proceeds. You approve or decline each change in writing — no verbal agreements, no ambiguity.",
    category: "Process",
  },
  {
    id: "faq-8",
    question: "Do you provide a warranty on your work?",
    answer:
      "Yes. We provide a comprehensive warranty that covers structural elements, major systems (HVAC, plumbing, electrical), and workmanship. Specific terms are outlined in your contract. We also conduct a warranty orientation walkthrough at move-in and a follow-up review at the 11-month mark.",
    category: "Warranty",
  },
  {
    id: "faq-9",
    question: "Can I choose my own architect or do I have to use yours?",
    answer:
      "Both options work. We have in-house design capability and also partner with independent architects across DFW. If you already have an architect, we join the team during preconstruction to align the design with construction realities, budget, and schedule.",
    category: "Design",
  },
  {
    id: "faq-10",
    question: "How do you select subcontractors and trade partners?",
    answer:
      "We maintain a vetted network of DFW-based trade partners built over years of local projects. Every sub is evaluated on quality, reliability, insurance, and licensing. We do not accept the lowest bid by default — we select based on the best value for each scope of work.",
    category: "Construction",
  },
  {
    id: "faq-11",
    question: "What financing options are available for a custom home build?",
    answer:
      "Most clients use a construction-to-permanent loan, which converts to a traditional mortgage at completion. We work with several DFW lenders experienced in custom home financing and can provide referrals. Our draw schedule is structured to align with standard lender inspection milestones.",
    category: "Budget",
  },
  {
    id: "faq-12",
    question: "How involved will I be during the build process?",
    answer:
      "As involved as you want to be. At minimum, you'll participate in milestone walkthroughs, decision gate approvals, and weekly progress reviews. Many clients visit the site regularly. We provide a dedicated project manager as your single point of contact throughout the build.",
    category: "Process",
  },
];
