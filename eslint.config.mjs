import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    // Extra ignores on top of the Next.js defaults to keep lint output clean locally
    ignores: ["node_modules/**", "public/**/*.png", "public/.DS_Store"],
  },
];

export default eslintConfig;
