import type { BlogPost, FAQ, ProcessStep, Project, Review, Service, ServiceDetail } from "@/lib/types/content";

export const fallbackProjects: Project[] = [
  {
    id: "fallback-project-roxcliff",
    title: "Rockcliff Residence",
    slug: "roxcliff",
    location: {
      city: "Plano",
      display: "Plano, TX",
    },
    summary:
      "A modern residential build coordinated end-to-end by PHD — drafting, floor plans, interior design, construction, and custom cabinetry resolved on the same team. Clean white interiors with carefully detailed lighting and material transitions.",
    description:
      "Rockcliff is a ground-up residence delivered under PHD's all-in-one model. The interiors center on a restrained white-and-light-wood palette, with custom cabinetry and lighting detail designed and coordinated by the same people who managed construction. No external handoffs — drafting, design intent, field execution, and cabinetry all lived on one team from concept to completion.",
    gallery: [
      { src: "/projects/roxcliff/40.jpg", alt: "Rockcliff Residence front elevation at sunset with stone entry and floor-to-ceiling glass", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/36.jpg", alt: "Rockcliff Residence rear elevation at sunset with pool and spa", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/38.jpg", alt: "Rockcliff Residence backyard view with covered patio and balcony at sunset", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/01.jpg", alt: "Rockcliff Residence interior view with vertical pendant lighting", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/02.jpg", alt: "Rockcliff Residence open-plan living area with white walls and oak flooring", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/03.jpg", alt: "Rockcliff Residence kitchen with custom white cabinetry and island", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/04.jpg", alt: "Rockcliff Residence dining area with designer lighting fixture", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/05.jpg", alt: "Rockcliff Residence primary bedroom with floor-to-ceiling windows", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/06.jpg", alt: "Rockcliff Residence primary bathroom with freestanding tub", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/07.jpg", alt: "Rockcliff Residence hallway with recessed lighting and wood accents", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/08.jpg", alt: "Rockcliff Residence staircase detail with metal railing", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/09.jpg", alt: "Rockcliff Residence guest bathroom with modern tile work", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/10.jpg", alt: "Rockcliff Residence outdoor covered patio with seating area", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/11.jpg", alt: "Rockcliff Residence laundry room with built-in storage", width: 3000, height: 2000 },
      { src: "/projects/roxcliff/12.jpg", alt: "Rockcliff Residence garage and driveway approach", width: 3000, height: 2000 },
    ],
    highlights: [
      "All-in-one delivery — drafting, design, construction, and cabinetry in-house",
      "Modern white-and-light-wood interior palette with custom lighting detail",
      "Coordinated finish and cabinet execution without external vendor handoffs",
    ],
    specs: { sqft: 4200, beds: 4, baths: 4, stories: 2 },
    isFeatured: true,
    featuredOrder: 1,
    heroImage: {
      src: "/projects/roxcliff/40.jpg",
      alt: "Rockcliff Residence front elevation at sunset with stone entry and floor-to-ceiling glass",
      width: 3000,
      height: 2000,
    },
  },
  {
    id: "fallback-project-1",
    title: "Bickers Residence",
    slug: "1930-bickers",
    location: {
      city: "Dallas",
      neighborhood: "Bickers",
      display: "Dallas, TX",
    },
    summary:
      "A ground-up two-story residence in Dallas featuring double-height ceilings, a floating wood staircase, and a curated palette of matte tile, oak, and matte-black hardware.",
    description:
      "The Bickers Residence is a new-construction custom home in an established Dallas neighborhood. The design centers on a double-height entry with a skylight and a floating staircase with oak treads and integrated LED step lighting. The open-plan main level connects a white-cabinet kitchen with herringbone tile backsplash to the main living areas. Upstairs, the primary suite includes a walk-in glass shower with textured accent tile and rain-head fixture. A dedicated laundry and built-in storage optimize everyday function without sacrificing material consistency.",
    gallery: [
      {
        src: "/projects/1930-bickers/hero.jpg",
        alt: "Bickers Residence staircase and double-height living space in Dallas",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/1930-bickers/bathroom.jpg",
        alt: "Guest bathroom with textured accent wall and dark tile",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/1930-bickers/kitchen.jpg",
        alt: "White kitchen with herringbone tile and matte-black fixtures",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/1930-bickers/master-bath.jpg",
        alt: "Primary bathroom with glass shower enclosure and dual showerheads",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/1930-bickers/staircase-detail.jpg",
        alt: "Floating staircase LED step lighting detail",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/1930-bickers/double-height.jpg",
        alt: "Double-height entry with skylight and chandelier",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/1930-bickers/built-in.jpg",
        alt: "Built-in storage niche with wood accent wall",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/1930-bickers/laundry.jpg",
        alt: "Dedicated laundry with white cabinetry and herringbone floor",
        width: 2400,
        height: 1800,
      },
    ],
    highlights: [
      "Floating oak staircase with integrated step lighting",
      "Double-height entry with skylight",
      "Full design-build coordination from concept to turnover",
    ],
    specs: { sqft: 3800, beds: 4, baths: 3, stories: 2 },
    isFeatured: true,
    featuredOrder: 2,
    heroImage: {
      src: "/projects/1930-bickers/hero.jpg",
      alt: "Bickers Residence staircase and double-height living space in Dallas",
      width: 2400,
      height: 1800,
    },
  },
  {
    id: "fallback-project-2",
    title: "Modern Duplex",
    slug: "duplex",
    location: {
      city: "Dallas",
      neighborhood: "East Dallas",
      display: "East Dallas, TX",
    },
    summary:
      "A spec-built modern duplex featuring open-plan living, marble-waterfall kitchen islands, and spa-grade primary bathrooms across mirrored floorplans.",
    description:
      "This modern duplex in East Dallas delivers high-end finishes within a developer-grade program. Each unit features a double-height living room with cable railing, wide-plank oak flooring, and floor-to-ceiling windows. The kitchen combines oak and black cabinetry with a marble-waterfall island and copper pendant lighting. The primary bathroom includes a freestanding soaking tub and frameless glass rain shower. The rear yard features a covered patio with ceiling fan — designed for indoor-outdoor living in the Texas climate.",
    gallery: [
      {
        src: "/projects/duplex/hero.jpg",
        alt: "Modern duplex front elevation with black and white facade",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/duplex/living-room.jpg",
        alt: "Double-height living room with cable railing and oak floors",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/duplex/kitchen-dining.jpg",
        alt: "Open kitchen and dining with marble island and copper pendants",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/duplex/spa-bathroom.jpg",
        alt: "Primary bathroom with freestanding tub and rain shower",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/duplex/backyard.jpg",
        alt: "Private rear yard with covered patio",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/duplex/kitchen-detail.jpg",
        alt: "Kitchen and staircase view with oak and black cabinetry",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/duplex/bedroom.jpg",
        alt: "Primary bedroom with natural light and oak floors",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/duplex/hallway.jpg",
        alt: "Entry hallway and staircase",
        width: 2400,
        height: 1600,
      },
    ],
    highlights: [
      "Double-height living rooms with cable railing loft",
      "Marble-waterfall kitchen islands with copper pendants",
      "Spa-grade primary bathrooms with freestanding tubs",
    ],
    specs: { sqft: 5600, beds: 6, baths: 6, stories: 2 },
    isFeatured: true,
    featuredOrder: 3,
    heroImage: {
      src: "/projects/duplex/hero.jpg",
      alt: "Modern duplex front elevation with black and white facade",
      width: 2400,
      height: 1600,
    },
  },
  {
    id: "fallback-project-3",
    title: "Pueblo Residence",
    slug: "pueblo",
    location: {
      city: "Dallas",
      display: "Dallas, TX",
    },
    summary:
      "A two-story new build mixing cedar siding, stone veneer, and standing-seam metal in a modern farmhouse expression.",
    description:
      "The Pueblo Residence in Waxahachie combines a modern farmhouse envelope with clean interior finishes. The exterior uses a deliberate mix of horizontal cedar siding, natural stone veneer, and dark standing-seam metal roofing. The angled roofline and large-format windows create a distinctive street presence. Inside, the primary bathroom features a soaking tub with tile surround, separate glass-enclosed shower, and clean ceramic tilework. The design-build scope covered design planning, structural coordination, and finish selection.",
    gallery: [
      {
        src: "/projects/pueblo/hero.jpg",
        alt: "Pueblo Residence front elevation with cedar and stone facade",
        width: 2400,
        height: 1599,
      },
      {
        src: "/projects/pueblo/exterior-angle.jpg",
        alt: "Pueblo Residence angled view showing mixed materials",
        width: 2400,
        height: 1599,
      },
      {
        src: "/projects/pueblo/master-bath.jpg",
        alt: "Primary bathroom with soaking tub and glass shower",
        width: 2400,
        height: 1599,
      },
      {
        src: "/projects/pueblo/interior-01.jpg",
        alt: "Pueblo Residence interior view",
        width: 2400,
        height: 1599,
      },
      {
        src: "/projects/pueblo/interior-02.jpg",
        alt: "Pueblo Residence interior view",
        width: 2400,
        height: 1599,
      },
      {
        src: "/projects/pueblo/interior-03.jpg",
        alt: "Pueblo Residence interior view",
        width: 2400,
        height: 1599,
      },
      {
        src: "/projects/pueblo/interior-04.jpg",
        alt: "Pueblo Residence interior view",
        width: 2400,
        height: 1599,
      },
      {
        src: "/projects/pueblo/interior-05.jpg",
        alt: "Pueblo Residence interior view",
        width: 2400,
        height: 1599,
      },
    ],
    highlights: [
      "Cedar, stone, and metal exterior material mix",
      "Angled roofline with large-format windows",
      "Full design-build from site planning to finishes",
    ],
    specs: { sqft: 3200, beds: 4, baths: 3, stories: 1 },
    isFeatured: true,
    featuredOrder: 4,
    heroImage: {
      src: "/projects/pueblo/hero.jpg",
      alt: "Pueblo Residence front elevation with cedar and stone facade",
      width: 2400,
      height: 1599,
    },
  },
  {
    id: "fallback-project-4",
    title: "Gallagher Residence",
    slug: "gallagher",
    location: {
      city: "Dallas",
      display: "Dallas, TX",
    },
    summary:
      "A full-scope renovation transforming a dated ranch into a modern stucco residence with updated interiors and a reimagined floor plan.",
    description:
      "The Gallagher Residence in North Dallas is a whole-house renovation that replaced the original 1960s ranch exterior with a modern stucco-and-stone facade, new black aluminum windows, and a reconfigured driveway. Inside, the team gutted and rebuilt all bathrooms with white shaker vanities, dark concrete-look countertops, and matte-black fixtures. The scope included structural modifications, new MEP systems, and a complete interior finish package — flooring, paint, lighting, and millwork — all coordinated through a single design-build contract.",
    gallery: [
      {
        src: "/projects/gallagher/hero.jpg",
        alt: "Gallagher Residence modern stucco exterior in North Dallas",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/gallagher/bathroom.jpg",
        alt: "Renovated bathroom with white vanity and dark countertop",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/gallagher/bathroom-02.jpg",
        alt: "Guest bathroom with matte-black fixtures",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/gallagher/interior-01.jpg",
        alt: "Gallagher Residence interior renovation detail",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/gallagher/interior-02.jpg",
        alt: "Gallagher Residence interior renovation detail",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/gallagher/interior-03.jpg",
        alt: "Gallagher Residence interior renovation detail",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/gallagher/interior-04.jpg",
        alt: "Gallagher Residence interior renovation detail",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/gallagher/interior-05.jpg",
        alt: "Gallagher Residence interior renovation detail",
        width: 2400,
        height: 1800,
      },
    ],
    highlights: [
      "Complete exterior transformation — stucco and stone over original ranch",
      "All-new bathroom finishes with matte-black hardware",
      "Single-contract design-build from demo to certificate of occupancy",
    ],
    specs: { sqft: 2800, beds: 3, baths: 2, stories: 1 },
    isFeatured: true,
    featuredOrder: 5,
    heroImage: {
      src: "/projects/gallagher/hero.jpg",
      alt: "Gallagher Residence modern stucco exterior in North Dallas",
      width: 2400,
      height: 1800,
    },
  },
  {
    id: "fallback-project-5",
    title: "Mango Court Residence",
    slug: "806-mango-ct",
    location: {
      city: "Coppell",
      neighborhood: "Coppell",
      display: "Coppell, TX",
    },
    summary:
      "A ground-up modern home in Coppell with white-brick and cedar exterior, pool with water feature, and open-plan living designed for indoor-outdoor entertaining.",
    description:
      "The Mango Court Residence in Coppell is a new-construction custom home designed around indoor-outdoor living. The two-story white-brick and cedar-panel facade frames large-format black aluminum windows. The rear elevation opens to a covered patio, pool with raised water feature, and horizontal cedar privacy fence. Inside, the open-plan main level features light oak floors, a concrete fireplace surround, and floor-to-ceiling sliding doors to the pool area. The design-build team managed every phase from foundation engineering through pool construction and landscape coordination.",
    gallery: [
      {
        src: "/projects/806-mango/hero.jpg",
        alt: "Mango Court Residence exterior at night with accent lighting",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/806-mango/rear-pool.jpg",
        alt: "Rear elevation with pool and covered patio",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/806-mango/pool.jpg",
        alt: "Pool with raised water feature and cedar privacy fence",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/806-mango/living.jpg",
        alt: "Open living room with concrete fireplace and oak floors",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/806-mango/exterior.jpg",
        alt: "Exterior during construction with brick and cedar panels",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/806-mango/drone.jpg",
        alt: "Aerial drone view of Mango Court Residence during construction",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/806-mango/framing.jpg",
        alt: "Framing phase showing structural layout",
        width: 2400,
        height: 1350,
      },
    ],
    highlights: [
      "Pool with raised water feature and cedar privacy fence",
      "White-brick and cedar-panel exterior",
      "Full design-build from foundation to landscape",
    ],
    specs: { sqft: 3500, beds: 4, baths: 3, stories: 2 },
    isFeatured: false,
    heroImage: {
      src: "/projects/806-mango/hero.jpg",
      alt: "Mango Court Residence exterior at night with accent lighting",
      width: 2400,
      height: 1800,
    },
  },
];

export const fallbackServices: Service[] = [
  {
    id: "service-custom-home-design",
    title: "Custom Home Design",
    summary: "We align design intent, structural systems, and buildability from day one.",
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
      "We validate lot constraints, priorities, and budget ranges for projects across DFW & North Texas.",
    deliverables: ["Project brief", "Site constraints memo", "Initial budget band"],
    decisionGate: "Proceed to concept planning",
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Concept & Cost Alignment",
    description:
      "Design and builder teams align scope, systems, and cost before drawings are advanced.",
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
    summary: "Design-led concept development calibrated for North Texas lot conditions, codes, and climate.",
    description:
      "Our design process starts with site analysis and program definition specific to the DFW & North Texas corridor. We coordinate massing, orientation, and material strategies with structural and MEP consultants from day one, ensuring the design intent survives the transition to construction documentation.",
    deliverables: [
      "Site analysis and constraints report",
      "Concept massing and floor plan options",
      "Schematic design package with 3D views",
      "Design development drawings",
      "Material and finish palette coordination",
      "Permit-ready construction documentation",
    ],
    benefits: [
      "Design and buildability aligned from the first sketch",
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
      "We develop interior plans that integrate with the home's overall design from the start. Finish selections, millwork detailing, lighting design, and furniture layouts are coordinated before construction begins, eliminating costly change orders and ensuring a cohesive result.",
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
      "Coordinated palette across exterior and interior spaces",
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
      "Builder or design partner selection guidance",
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
    summary: "Schedule, budget, and quality control for custom homes across DFW & North Texas.",
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
    id: "detail-landscape-design",
    slug: "landscape-design",
    title: "Landscape Design",
    summary: "Outdoor environments engineered for the DFW climate and integrated with the home's overall design.",
    description:
      "Our landscape design extends the home's design intent to the full site. We work with the DFW climate — heat-tolerant plantings, smart irrigation, drainage engineering — and coordinate hardscape, pools, and outdoor living spaces with the home's structural and MEP systems.",
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
      "Outdoor spaces designed as natural extensions of the home, not afterthoughts",
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
    author: "Veronica Marin",
    location: "Dallas, TX",
    rating: 5,
    text: "Quiero dar infinitamente, las gracias a la compañía Premium Home Design por haberme construido mi casa estoy tan feliz y tan contenta. Me encantó todo desde la cocina el baño, la recámaras, la sala todo la verdad es que se los recomiendo 100% ellos siempre están al pendiente hasta en el más mínimo detalle.",
    projectType: "New Construction",
    date: "2026-02-01",
  },
  {
    id: "review-2",
    author: "Martin G.",
    location: "Coppell, TX",
    rating: 5,
    text: "Wish I could give 10 stars! Premium Home Design is a great company, with great people. I had my house built by them and wow! Great communication, fast responders. Whenever you have a question/doubt or anything really they respond so fast! I would definitely recommend them 100/100 times!",
    projectType: "New Construction",
    date: "2026-01-01",
  },
  {
    id: "review-3",
    author: "Alan Daoust",
    location: "Waxahachie, TX",
    rating: 5,
    text: "Premium Home Design exceeded our expectations in every way. They completed a full remodel of our entire first floor, and the final result is absolutely stunning — we truly love our home. The finished space matched the design renderings perfectly, which speaks volumes about their attention to detail and craftsmanship. They finished ahead of their initial deadline, allowing us to move back in earlier than expected.",
    projectType: "Renovation",
    date: "2026-01-01",
  },
  {
    id: "review-4",
    author: "Rose Cerda",
    location: "East Dallas, TX",
    rating: 5,
    text: "Very happy with the outcome of my addition, from the design to the execution. The team is committed to build your dream design at the best possible price. I look forward to working with them in the future.",
    projectType: "Addition",
    date: "2026-01-01",
  },
  {
    id: "review-5",
    author: "Edgar Santamaria",
    location: "North Dallas, TX",
    rating: 5,
    text: "We had the privilege of collaborating with Premium Home Design on our home renovation project. From the very beginning, we were struck by their professionalism and genuine passion for their work. They demonstrated exceptional listening skills and effectively incorporated our needs into the design of our new home. The final outcome was breathtaking and great quality work! Their design sense is truly remarkable, and their work consistently exceeds our expectations.",
    projectType: "Renovation",
    date: "2026-01-01",
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
    author: "Premium Home Design",
    date: "2026-03-05",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/pueblo/hero.jpg",
      alt: "Modern custom home in Preston Hollow",
      width: 2000,
      height: 1334,
    },
    content:
      "One of the first questions serious homeowners ask is: *What does it cost per square foot to build a custom home in Dallas-Fort Worth in 2026?* The honest answer depends on design complexity, structural demands, finish level, municipality, and how early scope gets aligned.\n\n## The short answer for 2026\n\nAs of March 2026, the DFW market still rewards disciplined planning. For projects with efficient layouts and restrained finish packages, **entry-level custom homes** generally begin around **$190 to $260 per square foot**. Once the project moves into a more tailored design language, upgraded millwork, larger spans, premium windows, and layered finish selections, **mid-range custom homes** typically land between **$260 and $380 per square foot**.\n\nFor the kind of high-end homes we are usually asked to deliver, **high-end custom homes** commonly start around **$380 per square foot** and can exceed **$650 per square foot** when the brief includes complex engineering, imported finishes, advanced mechanical systems, or extensive site work.\n\n## What drives cost in DFW beyond square footage\n\nSquare footage matters, but it is not the true pricing engine. In Dallas-Fort Worth, cost moves fastest when one or more of the following variables increase:\n\n- structural complexity, including long spans, steel framing, basements, or large cantilevers\n- municipality requirements, especially in Highland Park, University Park, Southlake, and other review-heavy areas\n- finish level, including imported stone, custom millwork, premium windows, and integrated lighting systems\n- site conditions, such as slope, drainage work, tree protection, or difficult utility connections\n- schedule expectations, especially when an accelerated timeline forces labor stacking or early procurement\n\nA 5,000-square-foot house with a disciplined layout and straightforward detailing may price more cleanly than a smaller house with difficult geometry, major retaining walls, and highly custom interiors.\n\n## A practical budget framework by tier\n\n### 1. Efficient custom: $190–$260 per sqft\n\nThis tier usually applies when the plan is efficient, the structural system is straightforward, and finish selections are selective rather than fully bespoke. Think cleaner rooflines, rational spans, and fewer one-off assemblies. This is still custom work — not tract construction — but it requires discipline.\n\n### 2. Tailored custom: $260–$380 per sqft\n\nThis is where many serious DFW custom homes land. The home becomes more expressive, openings get larger, millwork improves, lighting becomes more integrated, and the overall result reflects a more specific design language. In this range, planning quality becomes critical because small upgrades across many categories add up quickly.\n\n### 3. High-end custom: $380+ per sqft\n\nThis tier usually includes more complex structure, premium glazing packages, custom interior detailing, advanced mechanical systems, extensive site work, and tighter tolerance expectations in the field. Once a project crosses into this band, execution quality matters just as much as design quality because mistakes become expensive very quickly.\n\n## What those numbers usually do not include\n\nThose ranges describe **vertical construction cost**. They rarely include land acquisition, demolition, abnormal foundations, major utility upgrades, pools, extensive landscape packages, retaining walls, or unusually strict municipal and HOA review requirements. In neighborhoods like Preston Hollow, Southlake, and Highland Park, those add-ons can move the all-in project cost dramatically.\n\n## City and neighborhood context matters\n\nNot every DFW project behaves the same way. Some municipalities create more friction in permitting, review, and inspections. Some neighborhoods create more complexity through design standards, tree preservation rules, or utility constraints. A cost model that feels realistic in one part of the Metroplex can become misleading in another.\n\nIn practical terms, clients should expect more schedule and pricing sensitivity when building in places like:\n\n- Highland Park and University Park\n- Preston Hollow and legacy Dallas neighborhoods\n- Southlake and master-planned luxury communities\n- sloped or heavily treed lots in Fort Worth and surrounding areas\n\n## The hidden cost categories clients underestimate\n\nMost initial budgets focus on framing, finishes, and visible selections. In reality, a major share of budget pressure often comes from categories clients do not see in inspiration boards:\n\n- demolition and haul-off\n- soils engineering and foundation upgrades\n- stormwater strategy and drainage corrections\n- temporary power, builder's risk, and site logistics\n- permitting revisions and consultant coordination\n- HVAC, electrical, and plumbing upgrades required by the design\n- long-lead procurement risk on windows, doors, and specialty finishes\n\nThese are the categories that separate an optimistic budget from a real one.\n\n## Why square-foot averages can mislead buyers\n\nConsumers often search for a single number because it feels efficient. The problem is that **cost per square foot is only useful when the scope behind it is clear**. A builder can quote an attractive number while excluding site prep, premium windows, built-ins, appliance allowances, or exterior living spaces. Another builder may include those items and appear more expensive while actually being more realistic.\n\nThat is why serious budgeting should always compare:\n\n- scope inclusions\n- allowance assumptions\n- site constraints\n- engineering assumptions\n- municipality and HOA review risk\n\nWithout that, two quotes with the same square-foot number can represent completely different projects.\n\n## Where design-build changes the outcome\n\nThe difference between a controllable budget and a drifting budget is usually not one finish selection. It is whether design intent, engineering assumptions, allowances, and site realities are coordinated before drawings advance. Our Discovery and Feasibility process is built to establish that budget band early, so the design direction stays ambitious without becoming financially fictional.\n\nIn a strong design-build workflow, budget is not treated as a late-stage constraint. It becomes part of the design brief from the beginning. That allows the team to make better trade-offs earlier, when they are still inexpensive to solve.\n\n## A better question than “what is your cost per square foot?”\n\nFor serious homeowners, the better question is not just *what do you charge per square foot?* It is:\n\n- what assumptions are behind that number?\n- what is excluded?\n- what municipality risks are already accounted for?\n- when will the budget be validated against actual scope?\n- how are change orders and allowance decisions controlled?\n\nThose questions usually reveal far more than the headline number.\n\n## Final takeaway\n\nIn 2026, realistic DFW custom home pricing starts with square-foot benchmarks — but it should not end there. The projects that stay aligned are the ones that price structure, site risk, finish level, and approval complexity early. If the design is ambitious, the budgeting process has to be equally rigorous.\n\nFor homeowners planning a custom build in Dallas-Fort Worth, the goal is not to chase the lowest number. The goal is to establish a number you can actually build from.",
    tags: ["Budget", "Cost Per Sqft", "DFW", "2026"],
  },
  {
    id: "blog-2",
    title: "Building on Expansive Clay Soils in North Texas: Foundation Solutions",
    slug: "building-expansive-clay-soils-north-texas",
    excerpt:
      "Understanding the Blackland Prairie soil of DFW and why engineered post-tension slabs or pier and beam foundations remain critical in 2026.",
    category: "Engineering",
    author: "Premium Home Design",
    date: "2026-02-24",
    readTime: "7 min read",
    coverImage: {
      src: "/projects/pueblo/hero.jpg",
      alt: "Fort Worth Bluff House on a sloped lot",
      width: 2000,
      height: 2666,
    },
    content:
      "The Dallas-Fort Worth area still sits on one of the most unforgiving residential building conditions in Texas: expansive clay. This Blackland Prairie soil expands when saturated, contracts during prolonged heat, and puts constant pressure on slabs, grade beams, and utility runs. In 2026, it remains the single most common geotechnical issue behind structural distress in North Texas homes.\n\n## Post-tension slabs\n\nFor many flat or gently sloped sites, a **post-tension slab** remains the most practical foundation strategy. Steel tendons are tensioned after the pour, keeping the slab in compression and improving its ability to tolerate differential soil movement. When engineered correctly for the lot's soil report, this approach can deliver strong long-term performance with reasonable cost control.\n\n## Pier and beam systems\n\nWhere the site is more volatile, the design is more demanding, or long-term serviceability takes priority over first cost, **pier and beam** often becomes the better answer. Deep piers transfer load below the active clay zone, while the crawl space improves access to plumbing and electrical systems over the life of the home. That flexibility matters on complex estates where future modifications are expected.\n\n## Why soils reports still drive the decision\n\nNo serious recommendation should be made before a geotechnical engineer studies the actual lot. Plasticity index, moisture variation, drainage behavior, and topography all affect the correct structural response. In practice, the best 2026 foundation strategy is not a template. It is a lot-specific system coordinated between the geotechnical report, structural engineer, and construction team before pricing is finalized.",
    tags: ["Engineering", "Foundations", "Soils", "DFW"],
  },
  {
    id: "blog-3",
    title: "Navigating Design Review Boards: Highland Park & Beyond",
    slug: "navigating-architectural-review-boards-highland-park",
    excerpt:
      "A current guide to zoning, ARC, and HOA review in premium DFW municipalities like Highland Park, University Park, and Southlake.",
    category: "Regulations",
    author: "Premium Home Design",
    date: "2026-02-10",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/gallagher/hero.jpg",
      alt: "Highland Park Tudor Revival",
      width: 2000,
      height: 1334,
    },
    content:
      "Building a luxury custom home in established DFW municipalities involves much more than obtaining a city permit. In 2026, the most schedule-sensitive approvals often come from layered review structures: city zoning, neighborhood conservation rules, HOA design standards, and formal design review committees.\n\n## The Highland Park standard\n\nIn Highland Park and nearby legacy neighborhoods, the review is rarely limited to square footage and setbacks. Boards pay close attention to roof forms, street presence, garage orientation, exterior material percentages, and how new construction fits the surrounding block. A technically compliant submittal can still face resistance if the design appears tone-deaf to neighborhood expectations.\n\n## Southlake, Frisco, and master-planned communities\n\nIn Southlake, Frisco, and other high-end communities, HOA design controls often sit on top of municipal rules. Tree preservation, drainage strategy, fence design, masonry palette, and even lighting placement can all become part of review. Those requirements are not side notes. They affect design, estimating, and schedule from the beginning.\n\n## Why preparation matters\n\nThe projects that move through review efficiently are the ones that anticipate objections early. That means validating the lot restrictions before concept design, building the submission package with the right drawings and renderings, and coordinating the narrative around why the design belongs there. In practical terms, review boards are not an afterthought in DFW. They are a design constraint that needs to be priced and managed from day one.",
    tags: ["HOA", "Zoning", "Highland Park", "Regulations"],
  },
  {
    id: "blog-4",
    title: "2026 Interior Design Trends for DFW Custom Homes",
    slug: "2026-interior-design-trends-dfw",
    excerpt:
      "The strongest 2026 interior direction in DFW favors warmth, tactile materials, layered lighting, and wellness-driven planning over sterile minimalism.",
    category: "Design",
    author: "Premium Home Design",
    date: "2026-01-30",
    readTime: "8 min read",
    coverImage: {
      src: "/projects/duplex/hero.jpg",
      alt: "Warm modern interior living space",
      width: 2000,
      height: 1334,
    },
    content:
      "Interior design in Dallas-Fort Worth has become noticeably more grounded in 2026. Clients are asking for spaces that feel composed, tactile, and deeply livable rather than cold, over-minimal, or designed only for listing photography.\n\n## Warm palettes and quieter contrast\n\nThe dominant direction is warm neutrals with depth: mineral whites, clay tones, tobacco browns, olive accents, and muted stone colors. Instead of relying on hard black-and-white contrast, strong interiors are using layered tonal variation, softer shadow lines, and richer natural textures to create visual weight.\n\n## Materials that read authentic up close\n\nWhite oak, walnut, limewash, plaster, quartzite, travertine, unlacquered metal, and handmade tile all continue to lead because they age with dignity. The common thread is not trendiness. It is credibility. Clients want materials that still look expensive when viewed at arm's length, not only in a polished rendering.\n\n## Wellness and retreat spaces\n\nAnother clear shift is the amount of square footage being allocated to recovery and privacy. In 2026, we are seeing more requests for quiet lounge spaces, gym-adjacent wellness rooms, secondary prep kitchens, filtered-air strategies, cold plunge or sauna zones, and stronger indoor-outdoor continuity. The homes that feel most current are not simply more decorative. They are better calibrated to how families actually recover, host, and live.",
    tags: ["Design Trends", "Interior Design", "Wellness", "2026"],
  },
  {
    id: "blog-5",
    title: "Designing Luxury Outdoor Living for the North Texas Climate",
    slug: "luxury-outdoor-living-north-texas-climate",
    excerpt:
      "How 2026 DFW outdoor living spaces balance heat, storm exposure, hospitality, and year-round usability without feeling overbuilt.",
    category: "Outdoor Living",
    author: "Premium Home Design",
    date: "2026-01-17",
    readTime: "7 min read",
    coverImage: {
      src: "/projects/806-mango/hero.jpg",
      alt: "Luxury outdoor pool and patio at twilight",
      width: 2000,
      height: 1126,
    },
    content:
      "In Dallas-Fort Worth, outdoor living is no longer a bonus space. On premium projects in 2026, it is one of the primary environments the home design must solve. The challenge is doing that in a climate defined by severe heat, sun exposure, sudden storms, and short cold snaps.\n\n## Resort amenities are now baseline expectations\n\nExpansive covered patios, outdoor kitchens, integrated pool edges, flush spas, concealed AV, and motorized screening systems have moved from luxury extras to standard expectations on many upper-tier homes. The question is no longer whether those amenities are included. It is how elegantly they are integrated.\n\n## Climate control has to be designed in, not added on\n\nThe strongest projects start by coordinating shade structures, prevailing wind, drainage, lighting, and equipment locations before the detailing phase. Radiant heat, misting, louvers, and rain sensing systems only feel premium when they are embedded into the overall design rather than attached as visible afterthoughts.\n\n## The best outdoor rooms still feel intentional\n\nWhat separates a polished outdoor living environment from a crowded backyard is restraint. Material transitions need to feel intentional, circulation has to stay clean, and the view from the primary interior spaces has to remain composed. In North Texas, the most successful outdoor rooms are the ones that extend the house without visually competing with it.",
    tags: ["Outdoor Living", "Pool Design", "Climate Adaptation", "DFW"],
  },
  {
    id: "blog-6",
    title: "Heat-Tolerant Landscaping for Dallas-Fort Worth Estates",
    slug: "heat-tolerant-landscaping-dfw-estates",
    excerpt:
      "A 2026 guide to plant selection, irrigation zoning, and hardscape strategy for landscapes that stay disciplined under North Texas heat.",
    category: "Landscape",
    author: "Premium Home Design",
    date: "2026-01-08",
    readTime: "6 min read",
    coverImage: {
      src: "/projects/pueblo/hero.jpg",
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
    question: "What area do you serve?",
    answer:
      "We accept design-build projects across the DFW Metroplex & North Texas. This regional focus lets us maintain strong relationships with vetted trade partners, stay current on municipal codes across multiple jurisdictions, and provide reliable timelines based on North Texas conditions.",
    category: "Service Area",
  },
  {
    id: "faq-2",
    question: "Can you build on our lot in the region?",
    answer:
      "Yes. We frequently work on client-owned lots throughout DFW & North Texas, and include a feasibility assessment during the Discovery phase. We evaluate zoning, setbacks, soil conditions, floodplain status, and utility access before any design work begins.",
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
    question: "How long does a custom home take to build in the region?",
    answer:
      "Most custom homes in the 3,500–6,000 sqft range take 6–18 months from permit to move-in across DFW & North Texas. We provide a detailed critical-path schedule during the Concept & Cost Alignment phase.",
    category: "Timeline",
  },
  {
    id: "faq-5",
    question: "What does a custom home cost per square foot across DFW & North Texas?",
    answer:
      "Custom home pricing in the region varies significantly based on design complexity, structural demands, finish level, site conditions, and municipality requirements. A single square-foot number can be misleading without defined scope — the same figure can represent very different projects. That is why we develop a detailed, project-specific budget range with you during Discovery, so you have realistic numbers tied to your actual program before design advances.",
    category: "Budget",
  },
  {
    id: "faq-6",
    question: "Do you handle permits and HOA approvals?",
    answer:
      "Yes. We manage the full permitting process across multiple jurisdictions — DFW municipalities and North Texas counties — and coordinate HOA design review submissions where required. Our team has direct experience with review boards in Highland Park, Southlake, Prosper, Frisco, Sherman, and other regulated communities.",
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
    question: "Can I bring my own design partner or do I have to use yours?",
    answer:
      "Both options work. We have in-house design capability and also partner with independent design professionals across DFW & North Texas. If you already have a designer on the team, we join during preconstruction to align the project with construction realities, budget, and schedule.",
    category: "Design",
  },
  {
    id: "faq-10",
    question: "How do you select subcontractors and trade partners?",
    answer:
      "We maintain a vetted network of regional trade partners across DFW & North Texas, built over years of local projects. Every sub is evaluated on quality, reliability, insurance, and licensing. We do not accept the lowest bid by default — we select based on the best value for each scope of work.",
    category: "Construction",
  },
  {
    id: "faq-11",
    question: "What financing options are available for a custom home build?",
    answer:
      "Most clients use a construction-to-permanent loan, which converts to a traditional mortgage at completion. We work with several Texas lenders experienced in custom home financing and can provide referrals. Our draw schedule is structured to align with standard lender inspection milestones.",
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
