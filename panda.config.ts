import { defineConfig } from "@pandacss/dev";

const isCI = !!process.env.CI;

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },
  presets: [],

  strictTokens: true,
  strictPropertyValues: true,

  // The output directory for your css system
  clean: true,
  outdir: "styled-system",
  outExtension: "js",

  // Import configuration
  importMap: "#panda",

  minify: isCI,
  hash: isCI,
});
