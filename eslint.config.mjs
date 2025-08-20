import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Hint: use shared Counter component
      "no-restricted-imports": ["warn", {
        paths: [
          { name: "three", message: "Importa three sólo desde components/ui/* para 3D encapsulado." },
        ],
      }],
    },
    files: ["**/*.ts", "**/*.tsx"],
  },
];

export default eslintConfig;
