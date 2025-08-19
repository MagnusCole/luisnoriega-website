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
    slug: "valuador-pyme",
    title: "Valuador PYME",
    excerpt: "Calculadora de valuación simple para dueños de negocios en LATAM.",
    tags: ["Next.js", "TypeScript", "Product"],
    year: 2025,
    link: "/vender",
  },
  {
    slug: "aqxion-portal",
    title: "AQXION Investor Portal",
    excerpt: "Dashboard privado para inversores con métricas en tiempo real.",
    tags: ["Next.js", "Supabase", "Analytics"],
    year: 2025,
  },
];

export const achievements: Achievement[] = [
  {
    title: "Certificate: M&A Fundamentals",
    issuer: "Coursera",
    date: "2024-06",
    link: "https://coursera.org",
  },
  {
    title: "QLA Implementation — Deal Pipeline",
    issuer: "AQXION",
    date: "2025-03",
  },
];
