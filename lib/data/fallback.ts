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
    title: "The True Cost of Building a Custom Home in Dallas-Fort Worth (2025-2026)",
    slug: "true-cost-building-custom-home-dfw-2025",
    excerpt:
      "A realistic breakdown of custom home construction costs per square foot in DFW, from entry-level builds to high-end luxury estates.",
    category: "Budget",
    author: "DFW Design-Build Team",
    date: "2025-08-20",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/north-dallas-courtyard-residence/hero.jpg",
      alt: "Modern custom home in Preston Hollow",
      width: 2000,
      height: 1334,
    },
    content:
      "One of the first questions any prospective homeowner asks is: *'What does it cost per square foot to build a custom home in Dallas-Fort Worth?'* The answer depends heavily on the level of customization, materials, and the specific municipality.\n\nHeading into 2025 and 2026, the DFW construction market continues to reflect the premium nature of true custom building. According to recent market data, **entry-level custom homes**—which typically feature efficient layouts and standard finishes—start between **$180 and $250 per square foot**. Moving up to **mid-range custom homes** with semi-custom layouts, upgraded finishes like quartz countertops, and hardwood floors, expect to invest between **$250 and $350 per square foot**.\n\nFor **high-end and luxury custom homes**—the category where we focus—prices generally range from **$350 to $600+ per square foot**. These homes involve architect-driven designs, complex structural engineering, premium mechanical systems, and highly bespoke interior finishes.\n\nIt is crucial to understand that these figures represent the *vertical construction cost* (materials, labor, and builder fees). They **do not include the cost of land**, which in premium neighborhoods like Preston Hollow or Southlake can easily exceed $1M to $3M alone. Other exclusions typically include site preparation, utility extensions, extensive landscaping, and swimming pools. When you enter our Discovery & Feasibility phase, we provide a holistic budget band that accounts for the hard costs of the home, the land, and the site-specific soft costs so there are no surprises.",
    tags: ["Budget", "Cost Per Sqft", "DFW", "2026"],
  },
  {
    id: "blog-2",
    title: "Building on Expansive Clay Soils in North Texas: Foundation Solutions",
    slug: "building-expansive-clay-soils-north-texas",
    excerpt:
      "Understanding the Blackland Prairie soil of DFW and why engineered post-tension slabs or pier and beam foundations are critical for longevity.",
    category: "Engineering",
    author: "DFW Design-Build Team",
    date: "2025-09-05",
    readTime: "7 min read",
    coverImage: {
      src: "/projects/fort-worth-bluff-house/hero.jpg",
      alt: "Fort Worth Bluff House on a sloped lot",
      width: 2000,
      height: 2666,
    },
    content:
      "The Dallas-Fort Worth area sits atop the Blackland Prairie, characterized by highly expansive clay soil. This soil undergoes a continuous 'shrink-swell cycle'—it expands significantly when wet and shrinks dramatically during our scorching, dry summers. This constant movement puts immense stress on building foundations and is the leading cause of structural failure in North Texas.\n\nTo successfully build a custom home that will last generations in DFW, the foundation must be specifically engineered for these conditions. There are two primary solutions we deploy:\n\n**1. Post-Tension Slab Foundations**\nUnlike traditional concrete slabs that can crack under pressure, post-tension slabs are designed to 'float' on the moving soil. Before the concrete is poured, high-strength steel cables (tendons) are laid in a grid. Once the concrete cures, these cables are pulled tight (tensioned). This puts the entire slab under compression, vastly increasing its strength and resistance to the tensile forces caused by shifting clay.\n\n**2. Pier and Beam Foundations**\nA pier and beam foundation elevates the home above the volatile surface soil, creating a crawl space. Concrete or steel piers are driven deep into the ground until they reach stable soil or bedrock, bypassing the active clay layer entirely. While often more expensive upfront than a slab, pier and beam foundations provide superior long-term stability and offer the added benefit of easy access to under-floor plumbing and electrical systems.\n\nBefore we ever pour a foundation, a geotechnical engineer performs a soil test on your specific lot to determine the exact plasticity index of the clay. This data dictates the structural engineering of the foundation, ensuring your home is built on a solid, scientifically validated base.",
    tags: ["Engineering", "Foundations", "Soils", "DFW"],
  },
  {
    id: "blog-3",
    title: "Navigating Architectural Review Boards: Highland Park & Beyond",
    slug: "navigating-architectural-review-boards-highland-park",
    excerpt:
      "A guide to the strict zoning and HOA architectural guidelines in premium DFW municipalities like Highland Park and Southlake.",
    category: "Regulations",
    author: "DFW Design-Build Team",
    date: "2025-09-18",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/highland-park-tudor-revival/hero.jpg",
      alt: "Highland Park Tudor Revival",
      width: 2000,
      height: 1334,
    },
    content:
      "Building a luxury custom home in established DFW municipalities involves much more than simply securing a city building permit. Upscale neighborhoods and independent towns—most notably Highland Park, University Park, and certain communities in Southlake—enforce rigorous zoning ordinances and require approval from strict Architectural Review Committees (ARCs).\n\n**The Highland Park Standard**\nIn the Town of Highland Park, Chapter 14 of the Zoning Ordinance heavily dictates building height, bulk, lot coverage, and Floor-Area-Ratio (FAR). But beyond basic zoning, your design must pass an architectural review. Committees often regulate aesthetic compatibility with the neighborhood. For instance, flat or low-slope roofs may be explicitly prohibited in favor of specific pitches. Exterior materials are highly scrutinized; many enclaves mandate a high percentage of natural stone or brick, and front-facing garages are almost universally banned.\n\n**Southlake and Frisco HOAs**\nIn Southlake and Frisco, high-end subdivisions often layer their own HOA design guidelines on top of city codes. These can dictate everything from the preservation of existing mature trees to the exact color palettes permitted on exterior trim.\n\nNavigating these boards requires experience and diplomacy. A design-build approach is particularly advantageous here. We involve our architectural team and project managers early to analyze the specific ARC guidelines of your lot before conceptual design begins. We prepare detailed submission packages, including 3D renderings and material boards, to anticipate the committee's concerns and secure approval faster, keeping your project on schedule.",
    tags: ["HOA", "Zoning", "Highland Park", "Regulations"],
  },
  {
    id: "blog-4",
    title: "2026 Interior Architecture Trends for DFW Custom Homes",
    slug: "2026-interior-architecture-trends-dfw",
    excerpt:
      "A shift towards warm, earthy palettes, authentic natural materials, and integrated wellness features defines the upcoming design cycle for luxury homes in Dallas-Fort Worth.",
    category: "Design",
    author: "DFW Design-Build Team",
    date: "2025-10-12",
    readTime: "8 min read",
    coverImage: {
      src: "/projects/southlake-estate-retreat/open-living.jpg",
      alt: "Warm modern interior living space",
      width: 2000,
      height: 1334,
    },
    content:
      "As we approach 2026, the interior architecture of custom homes in Dallas-Fort Worth is undergoing a notable shift. We are moving away from the stark, sterile minimalism and all-gray palettes that dominated previous years, leaning heavily into spaces that feel warm, authentic, and deeply lived-in. Homeowners in communities like Southlake, Westlake, and Preston Hollow are requesting environments that serve as personal sanctuaries rather than just showpieces.\n\n**Warmth, Earthy Palettes, and Meaningful Maximalism**\nThe new baseline for luxury interiors involves warm neutral tones—creams, taupes, clays, and rich terracottas. We are frequently implementing 'color drenching', a technique where a single rich hue, such as deep olive or tobacco brown, is applied across walls, trim, and ceilings to create an immersive, cocoon-like atmosphere. Alongside this color shift, a trend towards 'meaningful maximalism' is emerging, where clients are choosing to curate personal, intentional collections of art and artifacts that add character without feeling cluttered.\n\n**Authentic Materials and Wellness Integration**\nMateriality is paramount. We are specifying extensive natural wood, particularly rift-sawn white oak and walnut, paired with heavily veined natural stones like quartzite and travertine. Walls are receiving tactile treatments like limewash or plaster, adding subtle depth. \n\nBeyond aesthetics, wellness-centered design has become a non-negotiable for high-end builds. Our recent floor plans integrate dedicated recovery spaces featuring infrared saunas and cold plunges, advanced whole-home air filtration systems, and biophilic elements such as indoor courtyards and expansive glass walls that seamlessly connect the interior with the Texas landscape. The resulting homes are not just visually stunning; they actively contribute to the well-being of their inhabitants.",
    tags: ["Design Trends", "Interior Architecture", "Wellness", "2026"],
  },
  {
    id: "blog-5",
    title: "Designing Luxury Outdoor Living for the North Texas Climate",
    slug: "luxury-outdoor-living-north-texas-climate",
    excerpt:
      "How to engineer custom pools, outdoor kitchens, and climate-controlled patios that extend the entertaining season despite DFW's extreme weather.",
    category: "Architecture",
    author: "DFW Design-Build Team",
    date: "2025-11-04",
    readTime: "7 min read",
    coverImage: {
      src: "/projects/southlake-estate-retreat/hero.jpg",
      alt: "Luxury outdoor pool and patio at twilight",
      width: 2000,
      height: 1126,
    },
    content:
      "In the Dallas-Fort Worth Metroplex, a luxury custom home is incomplete without a highly engineered outdoor living space. However, designing these spaces requires a deep understanding of our demanding climate—which ranges from triple-digit summer heat to sudden winter freezes. The current standard for outdoor entertaining areas focuses on seamless indoor-outdoor flow, advanced climate control, and resort-style amenities.\n\n**Seamless Flow and Resort Pools**\nThe boundaries between indoor and outdoor living are virtually disappearing. We frequently install expansive, multi-panel sliding or folding glass wall systems that open the main living area directly onto a covered lanai. The focal point of these spaces is often a sleek, modern pool featuring infinity edges, large Baja shelves (tanning ledges), and integrated, flush-level spas. To elevate the experience, we are integrating automated LED lighting and fire-on-water bowls that create dramatic nighttime ambiance.\n\n**Climate Adaptation and Gourmet Kitchens**\nTo make these spaces usable for more than just a few months a year, aggressive climate control is required. Motorized louvered pergolas equipped with automated rain and wind sensors allow homeowners to adjust shade and weather protection on demand. We incorporate high-velocity misting systems and flush-mounted radiant heaters directly into the architectural structure.\n\nFurthermore, the outdoor kitchen has evolved far beyond a built-in grill. Today's luxury outdoor culinary centers include pizza ovens, specialized beverage stations, under-counter refrigeration, and durable, weather-resistant cabinetry, ensuring that hosting a large gathering outdoors is as effortless as doing so in the main kitchen.",
    tags: ["Outdoor Living", "Pool Design", "Climate Adaptation", "DFW"],
  },
  {
    id: "blog-6",
    title: "Heat-Tolerant Landscaping for Dallas-Fort Worth Estates",
    slug: "heat-tolerant-landscaping-dfw-estates",
    excerpt:
      "Strategic plant selection, efficient irrigation, and intelligent hardscaping to create lush, sustainable landscapes that thrive in the Texas heat.",
    category: "Landscape",
    author: "DFW Design-Build Team",
    date: "2025-11-20",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/prosper-linear-pavilion/hero.jpg",
      alt: "Modern home exterior with native Texas landscaping",
      width: 2000,
      height: 1126,
    },
    content:
      "A beautifully designed custom home can be entirely undermined by a failing landscape. In North Texas, the combination of intense summer heat, prolonged dry spells, and heavy, expansive clay soils presents a unique challenge. Successful estate landscaping in DFW relies on a balance of native plant selection, smart water management, and strategic hardscaping—achieving a lush aesthetic without fighting the local environment.\n\n**Native Plant Palettes and Hydrozoning**\nThe foundation of a heat-tolerant landscape is selecting native and deeply adapted species that naturally thrive in USDA Zone 8a. We anchor designs with resilient shade trees like Texas Red Oak and Cedar Elm. For structural shrubs and groundcover, we utilize Texas Sage (Cenizo), Dwarf Yaupon Holly, Autumn Sage (Salvia greggii), and ornamental grasses like Gulf Muhly. \n\nCrucially, we employ 'hydrozoning'—grouping plants with similar water requirements together. This allows for highly targeted, efficient drip irrigation zones, ensuring that water-intensive ornamentals receive what they need without overwatering drought-tolerant native sections.\n\n**Smart Hardscaping and Soil Management**\nHardscaping plays a vital role in reducing the overall water footprint and mitigating the 'heat island' effect. We incorporate permeable materials like decomposed granite pathways and spaced flagstone patios, which allow rainwater to percolate back into the soil rather than running off into storm drains. \n\nFinally, managing the volatile Blackland Prairie clay soil is essential. We heavily amend planting beds with organic matter to improve drainage and apply thick layers of hardwood or cedar mulch. This simple step drastically reduces soil temperature, limits evaporation, and protects root systems during the brutal August heat, ensuring the estate's grounds remain vibrant year-round.",
    tags: ["Landscape", "Heat-Tolerant", "Native Plants", "Texas"],
  }
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
