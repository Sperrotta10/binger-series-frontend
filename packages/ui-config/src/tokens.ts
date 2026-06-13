export const colors = {
  background: '#121317',
  surface: {
    DEFAULT: '#121317',
    dim: '#121317',
    bright: '#38393e',
    container: {
      lowest: '#0d0e12',
      low: '#1a1b20',
      DEFAULT: '#1f1f24',
      high: '#292a2e',
      highest: '#343439',
    }
  },
  primary: {
    DEFAULT: '#dcb8ff',
    container: '#8a2be2',
  },
  secondary: {
    DEFAULT: '#ffffff',
    fixed: '#00fbfb',
  },
  tertiary: {
    DEFAULT: '#bec7d6',
  },
  error: {
    DEFAULT: '#ffb4ab',
    container: '#93000a',
  }
} as const;

export const typography = {
  fontFamily: {
    sans: ['"Hanken Grotesk"', 'sans-serif'],
    display: ['"Sora"', 'sans-serif'],
  }
} as const;

export const borderRadius = {
  md: '4px',
} as const;

export const spacing = {
  xs: '4px',
  sm: '12px',
  md: '24px',
  lg: '48px',
  xl: '80px',
  'margin-mobile': '16px',
  'margin-desktop': '64px',
} as const;

export const elevation = {
  1: '0 4px 12px 0 rgba(0, 0, 0, 0.5)',
  2: '0 8px 24px 0 rgba(0, 0, 0, 0.7)',
} as const;

export const tokens = {
  colors,
  typography,
  borderRadius,
  spacing,
  elevation,
} as const;
