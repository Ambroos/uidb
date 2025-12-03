import { defineConfig } from "@pandacss/dev";

const isCI = !!process.env.CI;

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ["./src/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	globalCss: {
		html: {
			"--global-font-body": "Inter, sans-serif",
			"--global-color-border": "colors.Neutral/Neutral-03-light",
			"--global-color-placeholder": "colors.Text/Text-3",
			"--global-color-selection": "colors.Neutral/Neutral-03-light",
			"--global-color-focus-ring": "colors.Primary/web-unifi-color-ublue-06",
		},
		":focus-visible": {
			borderRadius: "4px",
		},
	},

	// Useful for theme customization
	theme: {
		extend: {
			textStyles: {
				bodyPrimary: {
					description: "Web/Body-primary in Figma",
					value: {
						fontFamily: "Inter, sans-serif",
						fontSize: "14px",
						fontOpticalSizing: "auto",
						fontStyle: "normal",
						fontWeight: "400",
						lineHeight: "20px",
					},
				},
				headingMedium: {
					description: "Web/Heading-Medium in Figma",
					value: {
						fontFamily: "Inter, sans-serif",
						fontSize: "14px",
						fontOpticalSizing: "auto",
						fontStyle: "normal",
						fontWeight: "700",
						lineHeight: "20px",
					},
				},
				headingXlarge1: {
					description: "Web/Heading-xlarge-1 in Figma",
					value: {
						fontFamily: "Inter, sans-serif",
						fontSize: "20px",
						fontOpticalSizing: "auto",
						fontStyle: "normal",
						fontWeight: "700",
						lineHeight: "28px",
					},
				},
				caption: {
					description: "Web/Caption in Figma",
					value: {
						fontFamily: "Inter, sans-serif",
						fontSize: "12px",
						fontOpticalSizing: "auto",
						fontStyle: "normal",
						fontWeight: "400",
						lineHeight: "16px",
					},
				},
			},
			tokens: {
				sizes: {
					"100%": { value: "100%" },
					headerHeight: { value: "50px" },
				},
				spacing: {
					"0.5x": { value: "4px" },
					"0.75x": { value: "6px" },
					"1x": { value: "8px" },
					"2x": { value: "16px" },
					"3x": { value: "24px" },
					"4x": { value: "32px" },
				},
				colors: {
					"Neutral-web-unifi-color-neutral-00": { value: "#FFFFFF" },
					"Neutral-web-unifi-color-neutral-01": { value: "#F9FAFA" },
					"Neutral-web-unifi-color-neutral-02": { value: "#F4F5F6" },
					"Neutral-web-unifi-color-neutral-10": { value: "#50565E" },
					"Neutral-Neutral-03-light": { value: "#EDEDF0" },
					"Text-Text-1": { value: "rgba(0, 0, 0, 0.85)" },
					"Text-Text-2-light": { value: "rgba(0, 0, 0, 0.65)" },
					"Text-Text-3": { value: "rgba(0, 0, 0, 0.45)" },
					"Text-web-unifi-text-3": { value: "#808893" },
					"Semantic-Destructive-web-unifi-color-red-06": { value: "#F03A3E" },
					"Primary-web-unifi-color-ublue-06": { value: "#006FFF" },
					"Primary-web-unifi-color-ublue-07": { value: "#0059CC" },
					blurBackdrop: { value: "rgba(255, 255, 255, 0.85)" },
				},
				shadows: {
					"Shadow-low-light": {
						value:
							"0 0 1px 0 rgba(0, 0, 0, 0.06), 0 8px 24px 0 rgba(0, 0, 0, 0.08)",
					},
				},
			},
			semanticTokens: {
				sizes: {
					productTable: {
						rowHeight: { value: "32px" },
					},
				},
				colors: {
					bg: {
						hoverable: {
							DEFAULT: { value: "transparent" },
							hover: { value: "{colors.Neutral-web-unifi-color-neutral-02}" },
						},
						inverseHoverable: {
							DEFAULT: { value: "transparent" },
							hover: { value: "{colors.Neutral-web-unifi-color-neutral-00}" },
						},
						card: {
							DEFAULT: { value: "transparent" },
							hover: { value: "{colors.Neutral-web-unifi-color-neutral-01}" },
							image: {
								DEFAULT: {
									value: "{colors.Neutral-web-unifi-color-neutral-01}",
								},
								hover: { value: "{colors.Neutral-web-unifi-color-neutral-02}" },
							},
						},
					},
				},
				radii: {
					standard: { value: "4px" },
					card: { value: "8px" },
				},
			},
			keyframes: {
				spin: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
		},
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
