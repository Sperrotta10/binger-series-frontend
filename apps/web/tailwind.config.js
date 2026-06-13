import { colors, typography, borderRadius, spacing } from '@binger/ui-config';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors, // Spread existing colors from ui-config
        "tertiary-container": "#5b6471",
        "inverse-primary": "#8422dc",
        "on-primary-container": "#eed9ff",
        "surface-container": "#1f1f24",
        "tertiary-fixed": "#dae3f2",
        "on-primary-fixed": "#2c0051",
        "on-tertiary-container": "#d8e1f0",
        "border-overlay": "rgba(255, 255, 255, 0.1)",
        "surface-dim": "#121317",
        "primary-fixed-dim": "#dcb8ff",
        "on-secondary-container": "#007070",
        "error-container": "#93000a",
        "secondary-fixed": "#00fbfb",
        "inverse-on-surface": "#2f3035",
        "primary-fixed": "#efdbff",
        "on-surface": "#e3e2e8",
        "surface-container-highest": "#343439",
        "secondary-container": "#00fbfb",
        "surface-variant": "#343439",
        "surface-container-high": "#292a2e",
        "tertiary-fixed-dim": "#bec7d6",
        "on-surface-variant": "#cfc2d7",
        "primary-container": "#8a2be2",
        "on-primary-fixed-variant": "#6700b5",
        "secondary-fixed-dim": "#00dddd",
        "on-secondary": "#003737",
        "primary": "#dcb8ff",
        "surface-tint": "#dcb8ff",
        "on-secondary-fixed-variant": "#004f4f",
        "error": "#ffb4ab",
        "tertiary": "#bec7d6",
        "streak-amber": "#FFB300",
        "surface": "#121317",
        "surface-container-lowest": "#0d0e12",
        "surface-glass": "rgba(31, 40, 51, 0.8)",
        "secondary": "#ffffff",
        "on-tertiary-fixed": "#131c27",
        "outline-variant": "#4c4354",
        "on-tertiary": "#28313c",
        "on-secondary-fixed": "#002020",
        "inverse-surface": "#e3e2e8",
        "surface-bright": "#38393e",
        "on-primary": "#480081",
        "outline": "#988ca0",
        "surface-container-low": "#1a1b20",
        "on-error": "#690005",
        "on-tertiary-fixed-variant": "#3e4753",
        "background": "#121317",
        "on-background": "#e3e2e8",
        "on-error-container": "#ffdad6"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "base": "8px",
        "md": "24px",
        "sm": "12px",
        "lg": "48px",
        "margin-mobile": "16px",
        "xs": "4px",
        "margin-desktop": "64px",
        "xl": "80px",
        "gutter": "24px"
      },
      fontFamily: {
        "headline-lg": ["Sora"],
        "display-lg": ["Sora"],
        "body-lg": ["Hanken Grotesk"],
        "body-md": ["Hanken Grotesk"],
        "label-md": ["Hanken Grotesk"],
        "label-sm": ["Hanken Grotesk"],
        "headline-md": ["Sora"]
      },
      fontSize: {
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "500"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "500"}]
      }
    },
  },
  plugins: [],
};