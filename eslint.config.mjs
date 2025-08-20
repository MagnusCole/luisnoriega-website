import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore compiled and vendor outputs
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/dist/**", "**/build/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        paths: [
          { name: "gsap", message: "Usa `lib/motion/gsap`" },
          { name: "gsap/ScrollTrigger", message: "Usa `lib/motion/gsap`" },
          { name: "three", message: "Importa Three solo desde components/three/*" },
          { name: "three/*", message: "Importa Three solo desde components/three/*" }
        ]
      }]
    }
  },
  // Allow the wrapper itself to import gsap/ScrollTrigger
  {
    files: ["lib/motion/gsap.ts"],
    rules: {
      "no-restricted-imports": "off"
    }
  },
];

export default eslintConfig;
