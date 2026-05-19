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
    blurb: "Brand-led websites and web platforms including Sikhsha.in and other business-facing product surfaces.",
    accent: "from-[#f6f1ea] via-[#efe5d8] to-[#ded0bf]",
    position: "left-0 top-0"
  },
  {
    slug: "mobile-apps",
    label: "Mobile Apps",
    blurb: "Mobile products like Mindspring and Sikhsha's AI-assisted school experience built for everyday use, not demos.",
    accent: "from-[#e8f1ff] via-[#d9e7ff] to-[#bfd3ff]",
    position: "right-0 top-0 text-right"
  },
  {
    slug: "crm-systems",
    label: "CRM Systems",
    blurb: "Operational systems for school management, client workflows, and internal business tracking including Sikhsha and Accelify.",
    accent: "from-[#edf7eb] via-[#dff0db] to-[#c7e0c1]",
    position: "bottom-0 left-0"
  },
  {
    slug: "automation",
    label: "Automation",
    blurb: "Automation systems for HR, payroll, outbound email, and internal ops where repeat work needed to disappear.",
    accent: "from-[#fff2d8] via-[#ffe7b8] to-[#ffd58a]",
    position: "bottom-0 right-0 text-right"
  }
];

export const projects: ProjectEntry[] = [
  {
    name: "Sikhsha.in",
    domain: "School ERP Website",
    summary:
      "Marketing and product website for Sikhsha, positioning the platform around school ERP operations, AI teaching tools, and student learning support.",
    sourceLabel: "sikhsha.in",
    sourceUrl: "https://sikhsha.in/",
    categories: ["web-apps"]
  },
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
    name: "Mindspring",
    domain: "Education Mobile App",
    summary:
      "Student companion app for accessing books, notes, results, and study materials with teacher-uploaded resources in one mobile experience.",
    sourceLabel: "Google Play",
    sourceUrl: "https://play.google.com/store/apps/details?id=com.sumit.mindspring",
    categories: ["mobile-apps"]
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
    name: "Sikhsha AI Teaching Assistant",
    domain: "AI Learning App",
    summary:
      "AI-based teaching assistant experience for lesson planning, deck generation, classroom activities, and student doubt support inside the Sikhsha school workflow.",
    sourceLabel: "sikhsha.in",
    sourceUrl: "https://sikhsha.in/",
    categories: ["mobile-apps"]
  },
  {
    name: "Sikhsha School ERP",
    domain: "School CRM / ERP",
    summary:
      "Role-based ERP for owners, principals, admins, teachers, students, and parents with admissions, fees, attendance, communication, analytics, and AI classroom tools.",
    sourceLabel: "sikhsha.in",
    sourceUrl: "https://sikhsha.in/",
    categories: ["crm-systems"]
  },
  {
    name: "Accelify",
    domain: "Client Operations CRM",
    summary:
      "Custom CRM and workflow system for managing business operations and client movement across the pipeline. Currently closed.",
    sourceLabel: "Private client work",
    sourceUrl: "https://femur.studio/",
    categories: ["crm-systems"]
  },
  {
    name: "Incubator Online",
    domain: "Platform Development",
    summary:
      "Operational platform for startup-facing workflows, used here as the third CRM and systems example in Femur's work index.",
    sourceLabel: "Femur project index",
    sourceUrl: "https://femur.studio/",
    categories: ["crm-systems"]
  },
  {
    name: "HR Management System",
    domain: "HR Automation",
    summary:
      "Internal HR system for employee records, attendance, approvals, and repetitive people-ops tasks that should not depend on spreadsheets.",
    sourceLabel: "Private automation work",
    sourceUrl: "https://femur.studio/",
    categories: ["automation"]
  },
  {
    name: "Payroll Automation",
    domain: "Finance Operations",
    summary:
      "Payroll workflow automation for recurring salary calculations, payout tracking, and admin-side reporting across routine finance operations.",
    sourceLabel: "Private automation work",
    sourceUrl: "https://femur.studio/",
    categories: ["automation"]
  },
  {
    name: "Prane Outreach Engine",
    domain: "Email Outreach",
    summary:
      "Outbound email outreach workflow for Prane, covering prospect movement, follow-ups, and repeatable campaign handling without manual chasing.",
    sourceLabel: "prane.in",
    sourceUrl: "https://prane.in/",
    categories: ["automation"]
  },
  {
    name: "Ops Handoff Automation",
    domain: "Internal Workflow Systems",
    summary:
      "Internal handoff and status automation to move work cleanly between teams without repeated manual updates or task duplication.",
    sourceLabel: "Private automation work",
    sourceUrl: "https://femur.studio/",
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
