import type { BlogPost, FAQ, ProcessStep, Project, Review, Service, ServiceDetail } from "@/lib/types/content";

export const fallbackProjects: Project[] = [
  {
    id: "fallback-project-1",
    title: "Royal Lane Residence",
    slug: "royal-lane-residence",
    location: {
      city: "Dallas",
      neighborhood: "Royal Lane",
      display: "Royal Lane, Dallas",
    },
    style: "Transitional",
    year: 2020,
    summary:
      "A ground-up custom home on Royal Lane featuring a brick-and-stone facade, open-concept interiors, and full design-build coordination from foundation to landscaping.",
    description:
      "This Royal Lane new construction replaced an existing structure with a two-story, four-bedroom home built for a growing family. The design-build team managed every phase — from demolition and foundation engineering through framing, MEP coordination, and finish selections. A traditional brick-and-stone exterior anchors the home to its established Dallas neighborhood while the interior delivers modern open-plan living with shaker cabinetry, polished tile floors, and generous natural light. The project was completed on schedule with full permit coordination through the City of Dallas.",
    gallery: [
      {
        src: "/projects/royal-lane/hero.jpg",
        alt: "Royal Lane Residence completed brick facade in Dallas",
        width: 4032,
        height: 3024,
      },
      {
        src: "/projects/royal-lane/kitchen.jpg",
        alt: "Open kitchen with white shaker cabinets and polished tile floor at Royal Lane, Dallas",
        width: 4032,
        height: 3024,
      },
      {
        src: "/projects/royal-lane/construction.jpg",
        alt: "Royal Lane Residence during exterior construction with scaffolding",
        width: 4032,
        height: 3024,
      },
    ],
    highlights: [
      "Design-led concept through completion",
      "Full permit coordination with City of Dallas",
      "Ground-up new construction on established lot",
    ],
    specs: {
      sqft: 3800,
      beds: 4,
      baths: 4,
      stories: 2,
    },
    isFeatured: true,
    featuredOrder: 1,
    heroImage: {
      src: "/projects/royal-lane/hero.jpg",
      alt: "Royal Lane Residence completed brick facade in Dallas",
      width: 4032,
      height: 3024,
    },
    tags: ["Transitional", "3,800 sqft", "Royal Lane"],
  },
  {
    id: "fallback-project-2",
    title: "802 Mango Ct",
    slug: "802-mango-ct",
    location: {
      city: "Coppell",
      neighborhood: "Coppell",
      display: "Coppell, TX 75019",
    },
    style: "Modern Transitional",
    year: 2024,
    summary:
      "A clean, material-forward remodel in Coppell combining open-plan living with refined finishes throughout.",
    description:
      "The 802 Mango Ct project in Coppell, TX is a comprehensive interior renovation that prioritizes open sightlines, natural light, and a curated material palette. The design-build team reconfigured the main living level to connect kitchen, dining, and living areas into a single flowing space. Finish selections — white cabinetry, warm wood accents, and large-format tile — were coordinated to work cohesively across natural and artificial lighting conditions. Detailed scope management and early trade coordination kept the project on schedule within the Coppell market.",
    gallery: [
      {
        src: "/projects/802-mango/hero.jpg",
        alt: "802 Mango exterior view",
        width: 2000,
        height: 2666,
      },
      {
        src: "/projects/802-mango/kitchen.jpg",
        alt: "802 Mango kitchen",
        width: 2000,
        height: 2666,
      },
      {
        src: "/projects/802-mango/living.jpg",
        alt: "802 Mango living area",
        width: 2000,
        height: 1500,
      },
    ],
    highlights: [
      "Full interior renovation with open-plan reconfiguration",
      "Curated material palette coordinated across all spaces",
      "Detailed quality-control punch process",
    ],
    specs: {
      sqft: 3200,
      beds: 4,
      baths: 3,
      stories: 2,
    },
    isFeatured: true,
    featuredOrder: 2,
    heroImage: {
      src: "/projects/802-mango/hero.jpg",
      alt: "802 Mango Ct exterior, Coppell TX",
      width: 2000,
      height: 2666,
    },
    tags: ["Modern Transitional", "3,200 sqft", "Coppell"],
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
    title: "1300 Rockcliff St",
    slug: "1300-rockcliff-st",
    location: {
      city: "Plano",
      neighborhood: "Plano",
      display: "Plano, TX 75093",
    },
    style: "Modern Transitional",
    year: 2022,
    summary:
      "A complete interior renovation in Coppell with refined material selections and updated living spaces throughout.",
    gallery: [
      {
        src: "/projects/1300-roxkliff/hero.jpg",
        alt: "1300 Rockcliff St exterior view, Plano TX",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/1300-roxkliff/img-1.jpg",
        alt: "1300 Rockcliff St interior",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/1300-roxkliff/img-2.jpg",
        alt: "1300 Rockcliff St interior detail",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/1300-roxkliff/img-3.jpg",
        alt: "1300 Rockcliff St living area",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/1300-roxkliff/img-4.jpg",
        alt: "1300 Rockcliff St detail",
        width: 2000,
        height: 1334,
      },
    ],
    highlights: [
      "Full interior renovation with updated material palette",
      "Open-plan living and kitchen reconfiguration",
      "Detailed quality-control punch process",
    ],
    specs: {
      sqft: 3800,
      beds: 4,
      baths: 4,
      stories: 2,
    },
    isFeatured: true,
    featuredOrder: 3,
    heroImage: {
      src: "/projects/1300-roxkliff/hero.jpg",
      alt: "1300 Rockcliff St exterior view, Plano TX",
      width: 2000,
      height: 1126,
    },
    tags: ["Modern Transitional", "Plano", "Renovation"],
  },
  {
    id: "fallback-project-5",
    title: "806 Mango Ct",
    slug: "806-mango-ct",
    location: {
      city: "Coppell",
      neighborhood: "Coppell",
      display: "Coppell, TX 75019",
    },
    style: "Modern Transitional",
    year: 2021,
    summary:
      "A full interior renovation in Coppell delivering refined finishes, updated spaces, and cohesive material selections throughout.",
    gallery: [
      {
        src: "/projects/806-mango/hero.jpg",
        alt: "806 Mango exterior view",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/806-mango/exterior-rear.jpg",
        alt: "806 Mango rear elevation",
        width: 2000,
        height: 1334,
      },
      {
        src: "/projects/806-mango/bedroom.jpg",
        alt: "806 Mango bedroom",
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
      src: "/projects/806-mango/hero.jpg",
      alt: "806 Mango exterior view",
      width: 2000,
      height: 1334,
    },
    tags: ["Modern Transitional", "Coppell", "Renovation"],
  },
];

export const fallbackServices: Service[] = [
  {
    id: "service-custom-home-design",
    title: "Custom Home Design",
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
    id: "detail-custom-home-design",
    slug: "custom-home-design",
    title: "Custom Home Design",
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
    title: "Landscape Design",
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
    title: "The True Cost of Building a Custom Home in Dallas-Fort Worth (2026)",
    slug: "true-cost-building-custom-home-dfw-2026",
    excerpt:
      "An up-to-date 2026 breakdown of custom home construction costs per square foot in DFW, from efficient luxury builds to fully bespoke estates.",
    category: "Budget",
    author: "DFW Design-Build Team",
    date: "2026-03-05",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/north-dallas-courtyard-residence/hero.jpg",
      alt: "Modern custom home in Preston Hollow",
      width: 2000,
      height: 1334,
    },
    content:
      "One of the first questions serious homeowners ask is: *What does it cost per square foot to build a custom home in Dallas-Fort Worth in 2026?* The honest answer depends on design complexity, structural demands, finish level, municipality, and how early scope gets aligned.\n\n## Current 2026 pricing bands\n\nAs of March 2026, the DFW market still rewards disciplined planning. For projects with efficient layouts and restrained finish packages, **entry-level custom homes** generally begin around **$190 to $260 per square foot**. Once the project moves into more tailored architecture, upgraded millwork, larger spans, premium windows, and layered finish selections, **mid-range custom homes** typically land between **$260 and $380 per square foot**.\n\nFor the kind of architect-driven homes we are usually asked to deliver, **high-end custom homes** commonly start around **$380 per square foot** and can exceed **$650 per square foot** when the brief includes complex engineering, imported finishes, advanced mechanical systems, or extensive site work.\n\n## What those numbers usually do not include\n\nThose ranges describe **vertical construction cost**. They rarely include land acquisition, demolition, abnormal foundations, major utility upgrades, pools, extensive landscape packages, retaining walls, or unusually strict municipal and HOA review requirements. In neighborhoods like Preston Hollow, Southlake, and Highland Park, those add-ons can move the all-in project cost dramatically.\n\n## Where design-build changes the outcome\n\nThe difference between a controllable budget and a drifting budget is usually not one finish selection. It is whether architecture, engineering assumptions, allowances, and site realities are coordinated before drawings advance. Our Discovery and Feasibility process is built to establish that budget band early, so the design direction stays ambitious without becoming financially fictional.",
    tags: ["Budget", "Cost Per Sqft", "DFW", "2026"],
  },
  {
    id: "blog-2",
    title: "Building on Expansive Clay Soils in North Texas: Foundation Solutions",
    slug: "building-expansive-clay-soils-north-texas",
    excerpt:
      "Understanding the Blackland Prairie soil of DFW and why engineered post-tension slabs or pier and beam foundations remain critical in 2026.",
    category: "Engineering",
    author: "DFW Design-Build Team",
    date: "2026-02-24",
    readTime: "7 min read",
    coverImage: {
      src: "/projects/fort-worth-bluff-house/hero.jpg",
      alt: "Fort Worth Bluff House on a sloped lot",
      width: 2000,
      height: 2666,
    },
    content:
      "The Dallas-Fort Worth area still sits on one of the most unforgiving residential building conditions in Texas: expansive clay. This Blackland Prairie soil expands when saturated, contracts during prolonged heat, and puts constant pressure on slabs, grade beams, and utility runs. In 2026, it remains the single most common geotechnical issue behind structural distress in North Texas homes.\n\n## Post-tension slabs\n\nFor many flat or gently sloped sites, a **post-tension slab** remains the most practical foundation strategy. Steel tendons are tensioned after the pour, keeping the slab in compression and improving its ability to tolerate differential soil movement. When engineered correctly for the lot's soil report, this approach can deliver strong long-term performance with reasonable cost control.\n\n## Pier and beam systems\n\nWhere the site is more volatile, the architecture is more demanding, or long-term serviceability takes priority over first cost, **pier and beam** often becomes the better answer. Deep piers transfer load below the active clay zone, while the crawl space improves access to plumbing and electrical systems over the life of the home. That flexibility matters on complex estates where future modifications are expected.\n\n## Why soils reports still drive the decision\n\nNo serious recommendation should be made before a geotechnical engineer studies the actual lot. Plasticity index, moisture variation, drainage behavior, and topography all affect the correct structural response. In practice, the best 2026 foundation strategy is not a template. It is a lot-specific system coordinated between the geotechnical report, structural engineer, and construction team before pricing is finalized.",
    tags: ["Engineering", "Foundations", "Soils", "DFW"],
  },
  {
    id: "blog-3",
    title: "Navigating Architectural Review Boards: Highland Park & Beyond",
    slug: "navigating-architectural-review-boards-highland-park",
    excerpt:
      "A current guide to zoning, ARC, and HOA review in premium DFW municipalities like Highland Park, University Park, and Southlake.",
    category: "Regulations",
    author: "DFW Design-Build Team",
    date: "2026-02-10",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/highland-park-tudor-revival/hero.jpg",
      alt: "Highland Park Tudor Revival",
      width: 2000,
      height: 1334,
    },
    content:
      "Building a luxury custom home in established DFW municipalities involves much more than obtaining a city permit. In 2026, the most schedule-sensitive approvals often come from layered review structures: city zoning, neighborhood conservation rules, HOA design standards, and formal Architectural Review Committees.\n\n## The Highland Park standard\n\nIn Highland Park and nearby legacy neighborhoods, the review is rarely limited to square footage and setbacks. Boards pay close attention to roof forms, street presence, garage orientation, exterior material percentages, and how new construction fits the surrounding block. A technically compliant submittal can still face resistance if the design appears tone-deaf to neighborhood expectations.\n\n## Southlake, Frisco, and master-planned communities\n\nIn Southlake, Frisco, and other high-end communities, HOA design controls often sit on top of municipal rules. Tree preservation, drainage strategy, fence design, masonry palette, and even lighting placement can all become part of review. Those requirements are not side notes. They affect architecture, estimating, and schedule from the beginning.\n\n## Why preparation matters\n\nThe projects that move through review efficiently are the ones that anticipate objections early. That means validating the lot restrictions before concept design, building the submission package with the right drawings and renderings, and coordinating the narrative around why the design belongs there. In practical terms, review boards are not an afterthought in DFW. They are a design constraint that needs to be priced and managed from day one.",
    tags: ["HOA", "Zoning", "Highland Park", "Regulations"],
  },
  {
    id: "blog-4",
    title: "2026 Interior Architecture Trends for DFW Custom Homes",
    slug: "2026-interior-architecture-trends-dfw",
    excerpt:
      "The strongest 2026 interior direction in DFW favors warmth, tactile materials, layered lighting, and wellness-driven planning over sterile minimalism.",
    category: "Design",
    author: "DFW Design-Build Team",
    date: "2026-01-30",
    readTime: "8 min read",
    coverImage: {
      src: "/projects/southlake-estate-retreat/open-living.jpg",
      alt: "Warm modern interior living space",
      width: 2000,
      height: 1334,
    },
    content:
      "Interior architecture in Dallas-Fort Worth has become noticeably more grounded in 2026. Clients are asking for spaces that feel composed, tactile, and deeply livable rather than cold, over-minimal, or designed only for listing photography.\n\n## Warm palettes and quieter contrast\n\nThe dominant direction is warm neutrals with depth: mineral whites, clay tones, tobacco browns, olive accents, and muted stone colors. Instead of relying on hard black-and-white contrast, strong interiors are using layered tonal variation, softer shadow lines, and richer natural textures to create visual weight.\n\n## Materials that read authentic up close\n\nWhite oak, walnut, limewash, plaster, quartzite, travertine, unlacquered metal, and handmade tile all continue to lead because they age with dignity. The common thread is not trendiness. It is credibility. Clients want materials that still look expensive when viewed at arm's length, not only in a polished rendering.\n\n## Wellness and retreat spaces\n\nAnother clear shift is the amount of square footage being allocated to recovery and privacy. In 2026, we are seeing more requests for quiet lounge spaces, gym-adjacent wellness rooms, secondary prep kitchens, filtered-air strategies, cold plunge or sauna zones, and stronger indoor-outdoor continuity. The homes that feel most current are not simply more decorative. They are better calibrated to how families actually recover, host, and live.",
    tags: ["Design Trends", "Interior Architecture", "Wellness", "2026"],
  },
  {
    id: "blog-5",
    title: "Designing Luxury Outdoor Living for the North Texas Climate",
    slug: "luxury-outdoor-living-north-texas-climate",
    excerpt:
      "How 2026 DFW outdoor living spaces balance heat, storm exposure, hospitality, and year-round usability without feeling overbuilt.",
    category: "Outdoor Living",
    author: "DFW Design-Build Team",
    date: "2026-01-17",
    readTime: "7 min read",
    coverImage: {
      src: "/projects/southlake-estate-retreat/hero.jpg",
      alt: "Luxury outdoor pool and patio at twilight",
      width: 2000,
      height: 1126,
    },
    content:
      "In Dallas-Fort Worth, outdoor living is no longer a bonus space. On premium projects in 2026, it is one of the primary environments the architecture must solve. The challenge is doing that in a climate defined by severe heat, sun exposure, sudden storms, and short cold snaps.\n\n## Resort amenities are now baseline expectations\n\nExpansive covered patios, outdoor kitchens, integrated pool edges, flush spas, concealed AV, and motorized screening systems have moved from luxury extras to standard expectations on many upper-tier homes. The question is no longer whether those amenities are included. It is how elegantly they are integrated.\n\n## Climate control has to be designed in, not added on\n\nThe strongest projects start by coordinating shade structures, prevailing wind, drainage, lighting, and equipment locations before the detailing phase. Radiant heat, misting, louvers, and rain sensing systems only feel premium when they are embedded into the architecture rather than attached as visible afterthoughts.\n\n## The best outdoor rooms still feel like architecture\n\nWhat separates a polished outdoor living environment from a crowded backyard is restraint. Material transitions need to feel intentional, circulation has to stay clean, and the view from the primary interior spaces has to remain composed. In North Texas, the most successful outdoor rooms are the ones that extend the house without visually competing with it.",
    tags: ["Outdoor Living", "Pool Design", "Climate Adaptation", "DFW"],
  },
  {
    id: "blog-6",
    title: "Heat-Tolerant Landscaping for Dallas-Fort Worth Estates",
    slug: "heat-tolerant-landscaping-dfw-estates",
    excerpt:
      "A 2026 guide to plant selection, irrigation zoning, and hardscape strategy for landscapes that stay disciplined under North Texas heat.",
    category: "Landscape",
    author: "DFW Design-Build Team",
    date: "2026-01-08",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/prosper-linear-pavilion/hero.jpg",
      alt: "Modern home exterior with native Texas landscaping",
      width: 2000,
      height: 1126,
    },
    content:
      "A strong home can be visually undermined by a weak landscape package. In North Texas, that usually happens when plant selection ignores heat tolerance, irrigation is not zoned intelligently, or hardscape coverage is treated as an afterthought. In 2026, the most resilient estate landscapes are balancing aesthetics with water discipline from the beginning.\n\n## Plant palettes should match the site, not the mood board\n\nNative and well-adapted species still outperform exotic palettes under sustained DFW heat. Texas Red Oak, Cedar Elm, Texas Sage, Yaupon Holly, Autumn Sage, and hardy ornamental grasses remain dependable because they are suited to the region's actual stress profile. They also age better visually than fragile, high-maintenance planting schemes.\n\n## Irrigation strategy matters as much as plant choice\n\nHydrozoning remains essential. Grouping plants by water demand allows irrigation to be tuned precisely, which protects both drought-tolerant material and higher-demand accent planting. In practice, this is one of the simplest ways to keep a landscape performing well through August without wasting water or overworking root systems.\n\n## Hardscape and soil preparation do the quiet work\n\nPermeable paving, decomposed granite paths, well-drained planting beds, and heavy mulch layers do not get the same visual attention as a pool or facade, but they are often what make the landscape durable. On estate work across DFW, the best 2026 landscape packages are the ones that feel clean and lush while quietly respecting soil movement, drainage, and maintenance reality.",
    tags: ["Landscape", "Heat-Tolerant", "Native Plants", "Texas"],
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
      "In DFW, efficient custom homes typically begin around $190–$260 per square foot, more tailored homes often land between $260–$380, and architect-driven high-end homes commonly start around $380 and can exceed $650 per square foot. Final pricing depends on site conditions, structural complexity, and finish level. We develop a detailed budget range during Discovery so you have realistic numbers before design advances.",
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
