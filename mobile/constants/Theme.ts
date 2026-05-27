export const Colors = {
  background: '#F8F4F1',
  card: '#FFFFFF',
  text: '#1F1B18',
  secondary: '#7D746D',
  muted: '#B3AAA4',
  line: '#EDE4DF',
  pink: '#EAC7C1',
  lavender: '#D9C1E6',
  sage: '#C9D7C5',
  gold: '#E9C7A1',
  blue: '#DCEBF2',
  shell: '#F2E8E2',
  black: '#1F1B18',
  white: '#FFFFFF',
  good: '#6F9B76',
  risk: '#C98276',
  purple: '#9472BF',
};

export const Spacing = {
  x1: 4,
  x2: 8,
  x3: 12,
  x4: 16,
  x5: 20,
  x6: 24,
  x8: 32,
  x10: 40,
  x12: 48,
};

export const Radius = {
  small: 12,
  medium: 20,
  large: 28,
  pill: 999,
};

export const Shadows = {
  soft: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
};

export const Typography = {
  serif: 'serif',
  sans: 'sans-serif',
  sizes: {
    caption: 12,
    small: 13,
    body: 15,
    lead: 17,
    title: 24,
    heading: 34,
    display: 52,
  },
};

export const Gradients = {
  screen: [Colors.background, '#FFFDFC'] as const,
  orb: [Colors.pink, Colors.lavender, Colors.sage] as const,
  peach: ['#F6D8D1', '#F2E3D8'] as const,
  sage: ['#EAF1E8', '#FFFFFF'] as const,
  lavender: ['#F0E5F5', '#FFFFFF'] as const,
  gold: ['#F3DDC3', '#FFFFFF'] as const,
};
