// App constants
export const SITE_CONFIG = {
  name: "Luis Noriega",
  description: "Portfolio personal de Luis Noriega",
  url: "https://luisnoriega.dev", // Actualizar con tu dominio
  author: "Luis Noriega",
  social: {
    twitter: "@luisnoriega", // Actualizar con tus redes
    linkedin: "luisnoriega",
    github: "luisnoriega"
  }
} as const;

export const NAVIGATION_ITEMS = [
  { href: "#bio", label: "Bio" },
  { href: "#projects", label: "Proyectos" },
  { href: "#certs", label: "Certificaciones" },
  { href: "#books", label: "Libros" },
  { href: "#contact", label: "Contacto" }
] as const;

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0
} as const;
