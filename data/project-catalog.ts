export type ProjectCategorySlug =
  | "web-apps"
  | "mobile-apps"
  | "crm-systems"
  | "automation";

export type ProjectEntry = {
  name: string;
  client?: string;
  domain: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
  categories: ProjectCategorySlug[];
};

export type ProjectCategory = {
  slug: ProjectCategorySlug;
  label: string;
  blurb: string;
  accent: string;
  position: string;
};

export const projectCategories: ProjectCategory[] = [
  {
    slug: "web-apps",
    label: "Web Apps",
    blurb: "Sites, platforms, e-commerce builds, and digital experiences listed across Femur's public work.",
    accent: "from-[#f6f1ea] via-[#efe5d8] to-[#ded0bf]",
    position: "left-0 top-0"
  },
  {
    slug: "mobile-apps",
    label: "Mobile Apps",
    blurb: "Native and cross-platform product work gathered from Femur's portfolio and case study listings.",
    accent: "from-[#e8f1ff] via-[#d9e7ff] to-[#bfd3ff]",
    position: "right-0 top-0 text-right"
  },
  {
    slug: "crm-systems",
    label: "CRM Systems",
    blurb: "Sales, platform, and internal operations systems surfaced from Femur's public case studies and testimonials.",
    accent: "from-[#edf7eb] via-[#dff0db] to-[#c7e0c1]",
    position: "bottom-0 left-0"
  },
  {
    slug: "automation",
    label: "Automation",
    blurb: "Automation, QA, AI operations, and workflow system projects listed on Femur's automation portfolio.",
    accent: "from-[#fff2d8] via-[#ffe7b8] to-[#ffd58a]",
    position: "bottom-0 right-0 text-right"
  }
];

export const projects: ProjectEntry[] = [
  {
    name: "The Oak Bistro",
    domain: "Hospitality",
    summary: "Luxury dining experience and reservation website listed on web.femur.studio.",
    sourceLabel: "web.femur.studio",
    sourceUrl: "https://web.femur.studio/",
    categories: ["web-apps"]
  },
  {
    name: "Aurora Estates",
    domain: "Real Estate",
    summary: "Premium Australian real estate portfolio listed in Femur's web development work.",
    sourceLabel: "web.femur.studio",
    sourceUrl: "https://web.femur.studio/",
    categories: ["web-apps"]
  },
  {
    name: "Bijin Salon",
    domain: "Beauty & Wellness",
    summary: "Elite beauty and wellness platform featured in Femur's development portfolio.",
    sourceLabel: "web.femur.studio",
    sourceUrl: "https://web.femur.studio/",
    categories: ["web-apps"]
  },
  {
    name: "Schmuckwerk",
    domain: "E-Commerce",
    summary: "Luxury jewelry e-commerce boutique showcased on Femur's web portfolio.",
    sourceLabel: "web.femur.studio",
    sourceUrl: "https://web.femur.studio/",
    categories: ["web-apps"]
  },
  {
    name: "Awadhi Homes",
    domain: "Real Estate",
    summary: "Premium interior design platform presented in Femur's public work list.",
    sourceLabel: "web.femur.studio",
    sourceUrl: "https://web.femur.studio/",
    categories: ["web-apps"]
  },
  {
    name: "Servox Store",
    domain: "E-Commerce",
    summary: "High-performance marketplace listed among Femur's featured development projects.",
    sourceLabel: "web.femur.studio",
    sourceUrl: "https://web.femur.studio/",
    categories: ["web-apps"]
  },
  {
    name: "TechCorp E-commerce Platform",
    client: "TechCorp Solutions",
    domain: "E-Commerce",
    summary: "Complete commerce platform with payments, inventory management, and analytics dashboard.",
    sourceLabel: "web.femur.studio/portfolio",
    sourceUrl: "https://web.femur.studio/portfolio",
    categories: ["web-apps"]
  },
  {
    name: "TechCorp E-commerce Transformation",
    client: "TechCorp Solutions",
    domain: "Case Study",
    summary: "Case study around a redesigned commerce platform with improved checkout flow and mobile-first UX.",
    sourceLabel: "web.femur.studio/portfolio",
    sourceUrl: "https://web.femur.studio/portfolio",
    categories: ["web-apps"]
  },
  {
    name: "FitnessPal Workout App",
    domain: "Mobile Apps",
    summary: "Fitness app with workout plans, progress tracking, and social features.",
    sourceLabel: "web.femur.studio/portfolio",
    sourceUrl: "https://web.femur.studio/portfolio",
    categories: ["mobile-apps"]
  },
  {
    name: "HealthTracker App Success Story",
    client: "WellnessTech Inc.",
    domain: "Mobile Apps",
    summary: "Cross-platform health monitoring app with AI insights and telemedicine features.",
    sourceLabel: "web.femur.studio/portfolio",
    sourceUrl: "https://web.femur.studio/portfolio",
    categories: ["mobile-apps"]
  },
  {
    name: "Incubator Online",
    domain: "Platform Development",
    summary: "Scalable platform for startups referenced in Femur's public testimonial section.",
    sourceLabel: "web.femur.studio",
    sourceUrl: "https://web.femur.studio/",
    categories: ["crm-systems"]
  },
  {
    name: "Vendavo Sales AI",
    domain: "Sales Automation",
    summary: "Lead response acceleration system with predictive AI scoring.",
    sourceLabel: "automation.femur.studio",
    sourceUrl: "https://automation.femur.studio/",
    categories: ["crm-systems", "automation"]
  },
  {
    name: "Grammarly Ops Scale",
    domain: "AI Operations",
    summary: "Support operations scaled with neural-network-based text analysis.",
    sourceLabel: "automation.femur.studio",
    sourceUrl: "https://automation.femur.studio/",
    categories: ["crm-systems", "automation"]
  },
  {
    name: "Airbnb QA Automation",
    domain: "Software QA",
    summary: "Intelligent test suite work reducing global testing time by 50%.",
    sourceLabel: "automation.femur.studio",
    sourceUrl: "https://automation.femur.studio/",
    categories: ["automation"]
  },
  {
    name: "Landmark Retail Bots",
    domain: "RPA Logistics",
    summary: "500+ RPA bots deployed to transform retail logistics workflows.",
    sourceLabel: "automation.femur.studio",
    sourceUrl: "https://automation.femur.studio/",
    categories: ["automation"]
  }
];

export function getCategoryBySlug(slug: string) {
  return projectCategories.find((category) => category.slug === slug);
}

export function getProjectsForCategory(slug: ProjectCategorySlug) {
  return projects.filter((project) => project.categories.includes(slug));
}
