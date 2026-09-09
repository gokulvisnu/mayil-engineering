import { SiteConfig } from "@/types";

/**
 * =======================================================================
 * CENTRALIZED WEBSITE CONFIGURATION
 * =======================================================================
 * All company details, contact information, services, projects, machinery,
 * statistics, and testimonials can be easily modified here in ONE single file!
 * All figures and project names are realistic editable placeholders.
 */

export const siteConfig: SiteConfig = {
  company: {
    name: "Mayil Engineering & Traders",
    tagline: "BUILDING BETTER COMMUNITIES THROUGH QUALITY INFRASTRUCTURE",
    subTagline: "Reliable Civil Construction & Infrastructure Solutions",
    shortDescription:
      "We deliver dependable civil construction and infrastructure solutions with a focus on quality, safety, durability and timely project execution.",
    fullDescription:
      "We are a civil construction and infrastructure company focused on delivering reliable solutions for rural infrastructure, roads, drainage, earthwork, excavation and other civil development projects.",
    mission:
      "To build enduring rural and community infrastructure that fosters regional connectivity, improves public utilities, and uplifts local communities through uncompromising engineering quality and transparent execution.",
    qualityCommitment:
      "We strictly adhere to standard civil engineering specifications, utilizing laboratory-tested concrete mixes, approved construction aggregates, and systematic stage-wise compaction tests for every project.",
    establishedYear: 2014,
    headquarters: "Annur, Tamil Nadu, India",
  },

  contact: {
    phoneDisplay: "99428 03565 / 90800 72602",
    phoneRaw: "+919942803565",
    gstin: "33DKAPM4088M1ZT",
    address: "No. B 2/2, ST-4, Dharmar Kovil Street, Kaverivayal, Annur – 641 653, Tamil Nadu, India",
    addressArea: "Kaverivayal, Annur, Tamil Nadu, India",
    workingHours: "8:00 AM – 7:30 PM",
    workingDays: "Monday – Saturday (Sunday on-call for active projects)",
    whatsappNumber: "+9190800 72602",
    whatsappDefaultMessage: "Hello, I would like to enquire about your civil & infrastructure works.",
  },

  maps: {
    embedUrl:
      "https://www.google.com/maps?q=ST-4%2C%20Dharmar%20Kovil%20Street%2C%20Kaverivayal%2C%20Annur%2C%20Tamil%20Nadu%20641653&output=embed",
    locationName: "Kaverivayal, Annur, Tamil Nadu, India",
  },

  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },

  trustIndicators: [
    "Quality Work",
    "Experienced Team",
    "Modern Equipment",
    "Timely Execution",
  ],

  // EDITABLE PLACEHOLDER STATISTICS
  stats: [
    {
      value: "10+",
      label: "Years Experience",
      sublabel: "Dedicated to Civil & Rural Infrastructure",
    },
    {
      value: "100+",
      label: "Projects Completed",
      sublabel: "Executed with High Quality Standards",
    },
    {
      value: "50+",
      label: "Infrastructure Works",
      sublabel: "Public & Rural Facilities",
    },
    {
      value: "100%",
      label: "Commitment to Quality",
      sublabel: "Tested Materials & Precision Compaction",
    },
  ],

  // 8 DETAILED CIVIL SERVICES
  services: [
    {
      id: "public-works",
      number: "01",
      title: "Public & Community Works",
      description: "Community infrastructure and regional development civil works.",
      longDescription:
        "Comprehensive local body works adhering strictly to Rural Development & Public Works specifications. We execute community halls, Anganwadi facilities, village street infrastructure, market complexes, and public convenience units with thorough cost accountability.",
      iconName: "Landmark",
      keyFeatures: [
        "Community hall & administrative building construction",
        "Village street paving & concrete pavement blocks",
        "Public utility shed & sanitation facility works",
        "Reconstruction & maintenance of public community assets",
      ],
      equipmentUsed: ["Concrete Mixers", "Tractor Trolleys", "Vibrators", "Mini Rollers"],
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "road-construction",
      number: "02",
      title: "Road Construction",
      description: "Rural roads, internal roads, road improvement and maintenance.",
      longDescription:
        "End-to-end roadway construction encompassing Water Bound Macadam (WBM), Wet Mix Macadam (WMM), Bituminous Macadam, Dense Bituminous Macadam (DBM), Premix Carpet, and heavy-duty M30/M40 Cement Concrete (CC) rural connectivity roads.",
      iconName: "Compass",
      keyFeatures: [
        "Sub-base preparation, grading, and mechanical compaction",
        "Bituminous road laying with precision camber and drainage slope",
        "Cement concrete (CC) internal village roadways",
        "Pothole rectification, shoulder building & edge repair",
      ],
      equipmentUsed: ["Vibratory Road Roller", "Motor Grader", "Bitumen Sprayer", "Tipper Trucks"],
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "earthwork-excavation",
      number: "03",
      title: "Earthwork & Excavation",
      description: "Excavation, earth cutting, filling, grading and site preparation.",
      longDescription:
        "High-capacity bulk earthmoving services utilizing modern hydraulic excavators and backhoe loaders. Capable of soil cutting in hard strata, gravel filling, site elevation building, and controlled foundation trenching.",
      iconName: "Shovel",
      keyFeatures: [
        "Bulk excavation and rock-free sub-grade preparation",
        "Gravel and morrum backfilling with proctor density testing",
        "Precision embankment cutting and hill/slope stabilization",
        "Foundation and basement trench excavation",
      ],
      equipmentUsed: ["Hydraulic Excavators", "JCB Backhoe Loaders", "Dumper Fleet"],
      image:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "drainage-works",
      number: "04",
      title: "Drainage Works",
      description: "Roadside drains, storm-water drainage and related civil works.",
      longDescription:
        "Engineered drainage systems designed to eliminate monsoon flooding and road waterlogging. We construct Reinforced Cement Concrete (RCC) box drains, precast covered drains, and stone-masonry open storm water canals.",
      iconName: "Waves",
      keyFeatures: [
        "RCC storm-water box drain construction with heavy precast slabs",
        "Random rubble & brick masonry roadside open gutters",
        "Inter-connecting village drain networks and culvert inlets",
        "Desilting, gradient alignment and hydraulic slope correction",
      ],
      equipmentUsed: ["JCB Trench Bucket", "Concrete Mixers", "Steel Shuttering Sets"],
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "culvert-construction",
      number: "05",
      title: "Culvert Construction",
      description: "Construction and improvement of culverts and water-crossing structures.",
      longDescription:
        "Reliable cross-drainage structures facilitating natural watercourse flow beneath roads and tracks. Specializing in single and multi-cell RCC box culverts, NP3/NP4 Hume pipe culverts, and vented causeways.",
      iconName: "Waypoints",
      keyFeatures: [
        "Reinforced concrete box culvert construction with wing walls",
        "NP3/NP4 high-strength Hume pipe cross-drain installations",
        "Parapet wall construction with reflective safety markers",
        "Scour protection, stone pitching and apron works",
      ],
      equipmentUsed: ["Hydraulic Crane / Boom", "Bar Bending Tools", "Compactors"],
      image:
        "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "water-infrastructure",
      number: "06",
      title: "Water Infrastructure",
      description: "Pipeline trenching, water-related civil works and infrastructure preparation.",
      longDescription:
        "Civil execution for drinking water supply distribution, Overhead Tank (OHT) foundation platforms, pipeline trenching, thrust blocks, community recharge ponds, and percolation pits.",
      iconName: "Droplets",
      keyFeatures: [
        "Underground pipeline trenching and sand cushioning",
        "OHT (Overhead Tank) civil foundations and pumphouse civil works",
        "Rainwater percolation pond excavation and bund consolidation",
        "Valve chambers, thrust blocks, and pipeline crossings",
      ],
      equipmentUsed: ["Chain Trenchers", "Tippers", "Dewatering Pumps", "Mixers"],
      image:
        "https://images.unsplash.com/photo-1584463623578-3011370248ad?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "building-civil-works",
      number: "07",
      title: "Building & Civil Works",
      description: "Foundations, concrete works, public buildings and other civil works.",
      longDescription:
        "Structural RCC frame construction, solid brick/block masonry, structural plastering, flooring, and roof waterproofing for commercial, institutional, and residential projects.",
      iconName: "Building2",
      keyFeatures: [
        "Column footings, grade beams, and structural RCC slabs",
        "Fly-ash brick & solid block masonry with mortar ratio checks",
        "Industrial flooring, screed concrete, and waterproof finishes",
        "Compound walls, security fencing, and entry gate structures",
      ],
      equipmentUsed: ["Transit Mixers", "Scaffolding Towers", "Concrete Vibrators"],
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "land-development",
      number: "08",
      title: "Land Development",
      description: "Land levelling, grading, filling and site development.",
      longDescription:
        "Large-scale site transformation for residential layouts, educational institutes, agro-farms, and commercial yards. We perform jungle clearance, boulder breaking, contour surveying, level marking, and sub-grade grading.",
      iconName: "Layers",
      keyFeatures: [
        "Total Station survey support, boundary marking, and levelling",
        "Jungle clearing, vegetation stripping, and root extraction",
        "Soil filling, contour shaping, and perimeter bund building",
        "Access road formation and internal drainage layout planning",
      ],
      equipmentUsed: ["Motor Graders", "Bulldozers", "Heavy Rollers", "Excavators"],
      image:
        "https://images.unsplash.com/photo-1618090584176-7132b9911661?auto=format&fit=crop&w=800&q=80",
    },
  ],

  // 9 COMMUNITY & LOCAL DEVELOPMENT WORK CATEGORIES
  developmentCategories: [
    {
      id: "village-roads",
      title: "Village Roads",
      shortDesc: "All-weather connectivity linking hamlets to main transport highways.",
      iconName: "Route",
    },
    {
      id: "internal-roads",
      title: "Internal Roads",
      shortDesc: "Concrete paver and cement roads providing dust-free village lanes.",
      iconName: "Milestone",
    },
    {
      id: "drainage-systems",
      title: "Drainage Systems",
      shortDesc: "Pucca covered and open gutters preventing domestic waterlogging.",
      iconName: "GitCommitVertical",
    },
    {
      id: "culverts",
      title: "Culverts",
      shortDesc: "Box and pipe culverts for smooth natural watercourse crossings.",
      iconName: "Split",
    },
    {
      id: "community-infra",
      title: "Community Infrastructure",
      shortDesc: "Public community halls, Anganwadis, bus shelters & utility sheds.",
      iconName: "Users",
    },
    {
      id: "earthwork",
      title: "Earthwork",
      shortDesc: "Pond deepening, ground levelling, and public playground creation.",
      iconName: "Hammer",
    },
    {
      id: "land-development",
      title: "Land Development",
      shortDesc: "Site clearance and preparation for institutional and public housing projects.",
      iconName: "Boxes",
    },
    {
      id: "water-infra",
      title: "Water Infrastructure",
      shortDesc: "Pumphouse platforms, pipe trenching and OHT civil support foundations.",
      iconName: "Droplet",
    },
    {
      id: "public-utilities",
      title: "Public Utility Works",
      shortDesc: "Weekly market platforms, compost yards, cremation shed pathways & lighting poles.",
      iconName: "ShieldCheck",
    },
  ],

  // EDITABLE PROJECT PORTFOLIO (Clearly marked as representative placeholders)
  projects: [
    {
      id: "proj-1",
      title: "Rural Road Development & Blacktopping",
      category: "Roads",
      location: "Rural Taluk, Tamil Nadu",
      description: "Bituminous road widening and surfacing with graded stone sub-base.",
      fullDetails:
        "Execution of a 3.8 km connectivity road linking agrarian villages. Included sub-base stabilization, mechanical rolling, bitumen tack coat, and premix carpet wearing course with side gravel shoulders.",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      scope: ["3.8 KM WBM & Bitumen road", "Gravel shoulder dressing", "Signage & milestone markers"],
      completionTime: "Estimated 90 Days",
    },
    {
      id: "proj-2",
      title: "Public Drainage Improvement Work",
      category: "Drainage",
      location: "District Area, Tamil Nadu",
      description: "Constructing reinforced concrete covered storm drain network along community streets.",
      fullDetails:
        "Construction of 1,200 meters of RCC U-drain with removable heavy-duty precast cover slabs to manage seasonal rainfall and domestic wastewater runoff safely.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      scope: ["1,200M RCC Box Drain", "Precast slab covering", "Gradient leveling to prevent stagnation"],
      completionTime: "Estimated 60 Days",
    },
    {
      id: "proj-3",
      title: "Community Infrastructure & Public Center",
      category: "Public Works",
      location: "Local Community Jurisdiction, Tamil Nadu",
      description: "Multi-purpose community building with concrete foundation and sanitary facilities.",
      fullDetails:
        "Civil construction of a 2,400 sq.ft. public community hall featuring structural RCC frame, vitrified flooring, electrical conduits, and surrounding paver apron.",
      image:
        "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
      scope: ["RCC Framed Structure", "Sanitary & water connections", "External paver pavement"],
      completionTime: "Estimated 120 Days",
    },
    {
      id: "proj-4",
      title: "Earthwork & Site Land Development",
      category: "Earthwork",
      location: "District Border, Tamil Nadu",
      description: "Large scale ground levelling, morrum filling, and soil consolidation.",
      fullDetails:
        "Excavation of uneven terrain, 15,000 cubic meters of borrow earth filling, vibratory roller compaction, and natural slope creation for an upcoming public facility layout.",
      image:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
      scope: ["15,000 m³ Earthmoving", "Heavy vibratory compaction", "Perimeter bund formation"],
      completionTime: "Estimated 45 Days",
    },
    {
      id: "proj-5",
      title: "RCC Box Culvert & Water Crossing",
      category: "Roads",
      location: "Irrigation Canal Crossing, Tamil Nadu",
      description: "High-capacity twin-cell RCC box culvert facilitating flood water flow.",
      fullDetails:
        "Demolition of deteriorated stone causeway and erection of a modern 2-cell reinforced concrete box culvert with RCC retaining wing walls and stone masonry pitching.",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      scope: ["Twin-cell RCC Culvert", "Stone pitching protection", "Safety guard railings"],
      completionTime: "Estimated 40 Days",
    },
    {
      id: "proj-6",
      title: "Water Infrastructure & Pipeline Work",
      category: "Water Infrastructure",
      location: "Rural Sub-Division, Tamil Nadu",
      description: "Trench excavation, pipe laying, and civil support bases for distribution.",
      fullDetails:
        "Excavation of 4,500 meters of pipeline trenches, sand bedding, HDPE pipe positioning, concrete valve pit construction, and civil pumphouse foundation execution.",
      image:
        "https://images.unsplash.com/photo-1584463623578-3011370248ad?auto=format&fit=crop&w=800&q=80",
      scope: ["4.5 KM Trenching & Backfilling", "Valve chambers & thrust blocks", "Pumphouse foundation"],
      completionTime: "Estimated 75 Days",
    },
  ],

  // HEAVY MACHINERY & FLEET SHOWCASE
  equipment: [
    {
      id: "jcb-backhoe",
      name: "JCB 3DX Backhoe Loader",
      category: "Earthmoving & Trenching",
      description:
        "Versatile multi-purpose earthmoving machine equipped with 6-in-1 front loader bucket and deep digging rear backhoe for foundation and pipeline works.",
      specifications: ["Digging Depth: 4.77 meters", "Loader Bucket: 1.0 m³", "Trenching Buckets: 1 ft, 1.5 ft, 2 ft"],
      availability: "Available for Project Deployment",
      image:
        "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hydraulic-excavator",
      name: "Heavy Hydraulic Excavator",
      category: "Heavy Earthwork & Canal Deepening",
      description:
        "High-tonnage tracked excavator delivering heavy digging force for pond deepening, rock breaking, hill cutting, and major earth excavation.",
      specifications: ["Operating Weight: 20 Ton Class", "Heavy Duty Bucket: 1.2 m³", "Hydraulic Breaker Compatible"],
      availability: "Available for Project Deployment",
      image:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "vibratory-roller",
      name: "Vibratory Road Compactor",
      category: "Road Sub-Base & Asphalt Compaction",
      description:
        "Dual-frequency soil and asphalt vibratory roller ensuring high Proctor density for road sub-bases, WMM layers, and bituminous surfacing.",
      specifications: ["Static Linear Load: 30+ kg/cm", "Drum Width: 2,100 mm", "Vibration Amplitude: High/Low Settings"],
      availability: "Available for Project Deployment",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "tipper-truck",
      name: "Heavy Tipper Trucks & Dumpers",
      category: "Haulage & Material Transport",
      description:
        "Robust multi-axle dumper fleet for rapid transportation of excavated earth, blue metal gravel aggregates, sand, and asphalt.",
      specifications: ["Capacity: 10 - 16 Wheelers", "Hydraulic Body Lift", "Equipped for rough terrain access"],
      availability: "Active Fleet Ready",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "tractor-trolley",
      name: "Tractors with Hydraulic Trolleys",
      category: "Local Transport & Village Maneuvering",
      description:
        "High-torque 4WD agricultural tractors with hydraulic tipping trailers, ideal for maneuvering through narrow rural roads and interior sites.",
      specifications: ["50+ HP Engine", "Heavy Duty Trolley with Hydraulic Tipping", "Leveller blade attachment"],
      availability: "Available for Project Deployment",
      image:
        "https://images.unsplash.com/photo-1592985737300-1ee418b794a0?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "concrete-machinery",
      name: "Site Concrete Mixers & Vibrators",
      category: "Structural Concrete & Pavements",
      description:
        "Mechanical hopper concrete mixers, diesel pin vibrators, and surface plate compactors for dense honey-comb-free concrete work.",
      specifications: ["Batch Capacity: 1 Bag (10/7 CFT)", "Diesel & Electric Power Options", "Needle Vibrators: 40mm & 60mm"],
      availability: "Ready on Site",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    },
  ],

  // 6 WHY CHOOSE US PILLARS
  advantages: [
    {
      id: "adv-1",
      title: "Experienced Team",
      description: "Skilled personnel with practical construction experience across civil and infrastructure projects.",
      iconName: "HardHat",
    },
    {
      id: "adv-2",
      title: "Quality Workmanship",
      description: "Focus on durable and reliable construction adhering to engineering specifications.",
      iconName: "Award",
    },
    {
      id: "adv-3",
      title: "Modern Equipment",
      description: "Suitable machinery for efficient project execution, rapid excavation, and precise compaction.",
      iconName: "Truck",
    },
    {
      id: "adv-4",
      title: "Safety First",
      description: "Strong focus on worker and site safety, mandatory PPE compliance, and careful hazard management.",
      iconName: "ShieldCheck",
    },
    {
      id: "adv-5",
      title: "Timely Completion",
      description: "Planned execution to meet project schedules and milestone deadlines.",
      iconName: "Clock",
    },
    {
      id: "adv-6",
      title: "Transparent Execution",
      description: "Clear communication, detailed measurement records, and professional project handling.",
      iconName: "CheckCircle2",
    },
  ],

  // SAFETY & QUALITY PRIORITIES
  safetyPriorities: [
    {
      id: "sq-1",
      title: "Worker Safety",
      description: "Daily safety briefings, hazard awareness training, and comprehensive insurance protocols for all personnel.",
      iconName: "Users2",
    },
    {
      id: "sq-2",
      title: "Personal Protective Equipment",
      description: "Strict enforcement of high-visibility reflective vests, ISI-certified hard hats, steel-toe boots, and gloves.",
      iconName: "ShieldAlert",
    },
    {
      id: "sq-3",
      title: "Site Safety Procedures",
      description: "Barricading of open excavation trenches, warning retro-reflective signboards, and safe traffic diversions.",
      iconName: "TrafficCone",
    },
    {
      id: "sq-4",
      title: "Equipment Maintenance",
      description: "Routine pre-operational machinery safety checks, certified operators, and hydraulic line preventative upkeep.",
      iconName: "Wrench",
    },
    {
      id: "sq-5",
      title: "Quality Materials",
      description: "Procurement of approved grade 53/43 cement, river/M-sand with silt checks, and tested blue metal aggregates.",
      iconName: "Layers",
    },
    {
      id: "sq-6",
      title: "Construction Quality Checks",
      description: "Standard concrete slump testing, test cube compressive strength checks, and sub-grade core cutter compaction tests.",
      iconName: "ClipboardCheck",
    },
    {
      id: "sq-7",
      title: "Environmental Responsibility",
      description: "Controlled dust suppression with water tankers, safe construction waste disposal, and zero blockages to natural drains.",
      iconName: "Leaf",
    },
    {
      id: "sq-8",
      title: "Proper Project Planning",
      description: "Structured Bill of Quantities (BOQ) planning, stage-wise resource allocation, and constant engineering oversight.",
      iconName: "FileSpreadsheet",
    },
  ],

  // 5-STEP WORK PROCESS
  workProcess: [
    {
      step: "01",
      title: "Project Discussion",
      description: "Understand the client's requirements.",
      details:
        "Initial consultation with project coordinators, engineers, or private clients to evaluate scope, timeline goals, and statutory specifications.",
      iconName: "MessageSquareText",
    },
    {
      step: "02",
      title: "Site Inspection",
      description: "Inspect the site and identify project requirements.",
      details:
        "Thorough physical site reconnaissance, level checking, soil suitability evaluation, water table assessment, and surrounding access study.",
      iconName: "MapPin",
    },
    {
      step: "03",
      title: "Planning & Estimation",
      description: "Prepare the work plan, resources and estimate.",
      details:
        "Detailed BOQ preparation, transparent cost estimation, equipment deployment scheduling, and timeline milestone charting.",
      iconName: "Calculator",
    },
    {
      step: "04",
      title: "Construction",
      description: "Execute the project using skilled workers and appropriate equipment.",
      details:
        "Phase-wise ground execution utilizing our own machinery fleet, adhering strictly to civil design benchmarks and daily quality supervision.",
      iconName: "HardHat",
    },
    {
      step: "05",
      title: "Completion",
      description: "Conduct quality checks and complete project handover.",
      details:
        "Final site cleanup, joint level measurement checks, durability inspection, and smooth handover documentation.",
      iconName: "CheckCircle",
    },
  ],

  // EDITABLE CLIENT TESTIMONIALS
  testimonials: [
    {
      id: "test-1",
      name: "S. Murugan",
      role: "Project Coordinator",
      organization: "Rural Development Union, Central District",
      content:
        "The team demonstrated great professionalism during our village internal road and drainage project. The concrete mixing and compaction were carried out with precision, and the work was completed right on schedule.",
      rating: 5,
    },
    {
      id: "test-2",
      name: "K. Rangarajan",
      role: "Site Coordinator",
      organization: "Community Infrastructure Committee",
      content:
        "We engaged Mayil Engineering for earthwork and culvert construction. Their fleet of JCBs and tippers operated reliably, and the on-site supervisor maintained clear daily communication.",
      rating: 5,
    },
    {
      id: "test-3",
      name: "P. Selvakumar",
      role: "Private Property Developer",
      organization: "Sri Lakshmi Land Layouts",
      content:
        "Exceptional land levelling, site clearance, and perimeter storm drain works for our 8-acre development. Transparent billing and dedicated machinery on site made a huge difference.",
      rating: 5,
    },
    {
      id: "test-4",
      name: "R. Anbarasan",
      role: "Civil Project Engineer",
      organization: "Regional Infrastructure Consultancy",
      content:
        "Appreciate their strict adherence to safety gear and material quality. The concrete cube test reports matched specifications, and their team was receptive to engineering suggestions.",
      rating: 5,
    },
  ],
};
