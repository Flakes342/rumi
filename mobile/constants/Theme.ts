/**
 * Rumi Design System
 * Soft luxury, airy whitespace, muted neutrals, emotional UI
 */

export const Colors = {
  // Core palette
  cream: '#FFF8F0',
  blush: '#F5E6DA',
  rose: '#E8C4B8',
  mauve: '#C9A9B8',
  sage: '#B8C9B8',
  terracotta: '#C4847A',
  pastelBlue: '#E6F0F9',
  pastelPeach: '#FDECE4',
  pastelLavender: '#F3E8FF',


  // Text
  charcoal: '#2D2926',
  warmGray: '#8B7E74',
  softGray: '#B8AFA8',

  // Surfaces
  cloud: '#F0ECE8',
  glass: 'rgba(255,248,240,0.85)',
  cardBg: '#FDFAF6',

  // Status
  greenFlag: '#8FB996',
  redFlag: '#D4847A',
  yellowFlag: '#D4C47A',

  // Gradients
  gradientStart: '#FFF8F0',
  gradientMid: '#F5E6DA',
  gradientEnd: '#E8D8CC',

  // Shadows
  shadowColor: '#2D2926',
};

export const Gradients = {
  primary: ['#FFF8F0', '#F5E6DA', '#E8D8CC'],
  warm: ['#FFF8F0', '#F5E6DA'],
  rose: ['#F5E6DA', '#E8C4B8'],
  subtle: ['#FDFAF6', '#F0ECE8'],
  glow: ['rgba(232,196,184,0.3)', 'rgba(232,196,184,0)'],
};

export const Typography = {
  // Font families (will be loaded via expo-font)
  headingFamily: 'Playfair',
  bodyFamily: 'Outfit',

  // Sizes
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
    '4xl': 42,
    hero: 52,
  },

  // Weights
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeights: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
  circle: 9999,
};

export const Shadows = {
  soft: {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  glow: {
    shadowColor: Colors.rose,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
};

export const Animation = {
  spring: {
    damping: 20,
    stiffness: 150,
    mass: 0.8,
  },
  springGentle: {
    damping: 25,
    stiffness: 120,
    mass: 1,
  },
  springBouncy: {
    damping: 12,
    stiffness: 180,
    mass: 0.6,
  },
  timing: {
    fast: 200,
    normal: 350,
    slow: 500,
    reveal: 800,
  },
};
