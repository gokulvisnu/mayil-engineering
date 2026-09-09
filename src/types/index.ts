export interface NavMenuItem {
  name: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  keyFeatures: string[];
  equipmentUsed: string[];
  image: string;
}

export interface DevelopmentCategoryItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Roads" | "Public Works" | "Drainage" | "Earthwork" | "Buildings" | "Water Infrastructure";
  location: string;
  description: string;
  fullDetails: string;
  image: string;
  scope: string[];
  completionTime: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string[];
  availability: string;
  image: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SafetyQualityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WorkProcessItem {
  step: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
}

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    subTagline: string;
    shortDescription: string;
    fullDescription: string;
    mission: string;
    qualityCommitment: string;
    establishedYear: number;
    headquarters: string;
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    gstin: string;
    email?: string;
    address: string;
    addressArea: string;
    workingHours: string;
    workingDays: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
  };
  maps: {
    embedUrl: string;
    locationName: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  trustIndicators: string[];
  stats: StatItem[];
  services: ServiceItem[];
  developmentCategories: DevelopmentCategoryItem[];
  projects: ProjectItem[];
  equipment: EquipmentItem[];
  advantages: AdvantageItem[];
  safetyPriorities: SafetyQualityItem[];
  workProcess: WorkProcessItem[];
  testimonials: TestimonialItem[];
}
