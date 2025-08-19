export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  year: number;
  link?: string;
  owned?: boolean; // true si somos dueños
};

export type Achievement = {
  title: string;
  issuer?: string;
  date?: string; // YYYY-MM
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "aqxion",
    title: "AQXION",
    excerpt: "Holding de adquisición: dueños operadores de PYMES selectas en LATAM.",
    tags: ["Holding", "M&A", "Operación"],
    year: 2025,
    link: "/aqxion",
    owned: true,
  },
  {
  slug: "b2b-leadgen-automation",
  title: "Automatización B2B de generación de leads",
  excerpt: "Pipelines multicanal con scraping ético, enriquecimiento y scoring para SDRs y growth.",
  tags: ["Automation", "Lead Gen", "B2B"],
  year: 2025,
  },
];

export const achievements: Achievement[] = [
  { title: "Measure and Optimize Social Media Marketing Campaigns", issuer: "Meta", date: "2025-08" },
  { title: "Advertising with Meta", issuer: "Meta", date: "2025-08" },
  { title: "Fundamentals of Social Media Advertising", issuer: "Meta", date: "2025-08" },
  { title: "Social Media Management", issuer: "Meta", date: "2025-08" },
  { title: "Introduction to Social Media Marketing", issuer: "Meta", date: "2025-08" },
  { title: "Generative AI: Prompt Engineering Basics", issuer: "IBM", date: "2025-08" },
  { title: "Fundamentals of Customer Acquisition Management", issuer: "Coursera Instructor Network", date: "2025-08" },
  { title: "Grow with AI: Your AI-driven Growth Marketing strategy", issuer: "Starweaver", date: "2025-08" },
  { title: "Trello for Beginners", issuer: "Coursera Project Network", date: "2022-04" },
];
