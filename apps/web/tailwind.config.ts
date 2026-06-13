import type { Config } from 'tailwindcss';
import { colors, typography, borderRadius, spacing } from '@binger/ui-config';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        surface: colors.surface,
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary,
        error: colors.error,
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
        display: typography.fontFamily.display,
      },
      borderRadius: {
        md: borderRadius.md,
      },
      spacing: {
        xs: spacing.xs,
        sm: spacing.sm,
        md: spacing.md,
        lg: spacing.lg,
        xl: spacing.xl,
        'margin-mobile': spacing['margin-mobile'],
        'margin-desktop': spacing['margin-desktop'],
      }
    },
  },
  plugins: [],
} satisfies Config;