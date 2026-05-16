/**
 * Rumi global state management with Zustand
 */
import { create } from 'zustand';

export interface SkinProfile {
  name: string;
  ageRange: string;
  skinGoals: string[];
  skinType: string;
  sensitivity: string;
  acneFrequency: string;
  pigmentation: string;
  sleepQuality: string;
  waterIntake: string;
  stressLevel: string;
  city: string;
  pollutionExposure: string;
  tracksCycle: string;
  hasPCOS: string;
  hormonalAcne: string;
  budget: string;
  preferences: string[];
}

export interface SkinAnalysis {
  summary: string;
  skinLabel: string;
  priorities: string[];
  barrierHealth: number;
  irritationRisk: number;
  insights: string[];
}

export interface RoutineStep {
  id: string;
  order: number;
  type: string;
  name: string;
  ingredient?: string;
  why: string;
  completed: boolean;
}

export interface WeatherData {
  humidity: number;
  uvIndex: number;
  pollution: string;
  temperature: number;
  skinAdvice: string;
  city: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  matchScore: number;
  whyItWorks: string;
  greenFlags: string[];
  redFlags: string[];
}

interface RumiStore {
  // Auth state
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;

  // Onboarding answers
  onboardingAnswers: Record<string, string | string[]>;
  setOnboardingAnswer: (key: string, value: string | string[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;

  // Skin profile
  skinProfile: SkinProfile | null;
  skinAnalysis: SkinAnalysis | null;
  setSkinProfile: (profile: SkinProfile) => void;
  setSkinAnalysis: (analysis: SkinAnalysis) => void;

  // Routines
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  toggleStep: (routineType: 'morning' | 'evening', stepId: string) => void;
  streak: number;

  // Weather
  weather: WeatherData | null;

  // Products
  savedProducts: string[];
  toggleSavedProduct: (productId: string) => void;

  // Agent
  agentMessages: { role: 'user' | 'agent'; content: string; timestamp: number }[];
  addAgentMessage: (role: 'user' | 'agent', content: string) => void;

  // Auth actions
  completeOnboarding: () => void;
  setAuthenticated: (val: boolean) => void;
}

export const useRumiStore = create<RumiStore>((set, get) => ({
  isAuthenticated: false,
  hasCompletedOnboarding: false,

  onboardingAnswers: {},
  setOnboardingAnswer: (key, value) =>
    set((state) => ({
      onboardingAnswers: { ...state.onboardingAnswers, [key]: value },
    })),
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  skinProfile: null,
  skinAnalysis: null,
  setSkinProfile: (profile) => set({ skinProfile: profile }),
  setSkinAnalysis: (analysis) => set({ skinAnalysis: analysis }),

  morningRoutine: [
    {
      id: 'm1',
      order: 1,
      type: 'cleanser',
      name: 'Gentle Cleanser',
      ingredient: 'Ceramides',
      why: 'Removes overnight buildup without stripping your barrier',
      completed: false,
    },
    {
      id: 'm2',
      order: 2,
      type: 'serum',
      name: 'Niacinamide Serum',
      ingredient: 'Niacinamide 10%',
      why: 'Controls oil production and minimizes pores',
      completed: false,
    },
    {
      id: 'm3',
      order: 3,
      type: 'moisturizer',
      name: 'Lightweight Moisturizer',
      ingredient: 'Hyaluronic Acid',
      why: 'Locks in hydration without feeling heavy',
      completed: false,
    },
    {
      id: 'm4',
      order: 4,
      type: 'sunscreen',
      name: 'SPF 50 Sunscreen',
      ingredient: 'UV Filters',
      why: 'Protects from UV damage and prevents dark spots',
      completed: false,
    },
  ],

  eveningRoutine: [
    {
      id: 'e1',
      order: 1,
      type: 'cleanser',
      name: 'Oil Cleanser',
      ingredient: 'Jojoba Oil',
      why: 'Dissolves sunscreen and makeup gently',
      completed: false,
    },
    {
      id: 'e2',
      order: 2,
      type: 'cleanser',
      name: 'Water-based Cleanser',
      ingredient: 'Salicylic Acid',
      why: 'Deep cleans pores without over-drying',
      completed: false,
    },
    {
      id: 'e3',
      order: 3,
      type: 'treatment',
      name: 'Retinol Treatment',
      ingredient: 'Retinol 0.3%',
      why: 'Boosts cell renewal while you sleep',
      completed: false,
    },
    {
      id: 'e4',
      order: 4,
      type: 'moisturizer',
      name: 'Barrier Repair Cream',
      ingredient: 'Ceramides + Peptides',
      why: 'Rebuilds and strengthens your skin barrier overnight',
      completed: false,
    },
  ],

  toggleStep: (routineType, stepId) =>
    set((state) => {
      const key = routineType === 'morning' ? 'morningRoutine' : 'eveningRoutine';
      return {
        [key]: state[key].map((step) =>
          step.id === stepId ? { ...step, completed: !step.completed } : step
        ),
      };
    }),

  streak: 7,

  weather: {
    humidity: 42,
    uvIndex: 7,
    pollution: 'Moderate',
    temperature: 38,
    skinAdvice: "Delhi is extra dry today. Focus on hydration and don't skip sunscreen.",
    city: 'Delhi',
  },

  savedProducts: [],
  toggleSavedProduct: (productId) =>
    set((state) => ({
      savedProducts: state.savedProducts.includes(productId)
        ? state.savedProducts.filter((id) => id !== productId)
        : [...state.savedProducts, productId],
    })),

  agentMessages: [],
  addAgentMessage: (role, content) =>
    set((state) => ({
      agentMessages: [
        ...state.agentMessages,
        { role, content, timestamp: Date.now() },
      ],
    })),

  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  setAuthenticated: (val) => set({ isAuthenticated: val }),
}));

// ── Dummy product data ──────────────────────────────────
export const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist 10% Niacinamide Serum',
    brand: 'Minimalist',
    category: 'Serum',
    price: 599,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300',
    matchScore: 94,
    whyItWorks: 'Low comedogenic risk + excellent oil control for your combination skin.',
    greenFlags: ['Fragrance-free', 'Non-comedogenic', 'Barrier-friendly'],
    redFlags: [],
  },
  {
    id: '2',
    name: 'Cetaphil Gentle Skin Cleanser',
    brand: 'Cetaphil',
    category: 'Cleanser',
    price: 450,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300',
    matchScore: 91,
    whyItWorks: 'Ultra-gentle formula perfect for your sensitive, reactive skin.',
    greenFlags: ['pH balanced', 'Fragrance-free', 'Dermatologist tested'],
    redFlags: [],
  },
  {
    id: '3',
    name: 'La Shield SPF 50 Sunscreen',
    brand: 'La Shield',
    category: 'Sunscreen',
    price: 780,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300',
    matchScore: 89,
    whyItWorks: 'High UV protection without white cast, ideal for Indian skin tones.',
    greenFlags: ['No white cast', 'SPF 50+', 'Lightweight'],
    redFlags: ['Contains fragrance'],
  },
  {
    id: '4',
    name: 'Bioderma Sensibio Micellar Water',
    brand: 'Bioderma',
    category: 'Cleanser',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300',
    matchScore: 87,
    whyItWorks: 'Micellar technology that cleanses without disrupting your compromised barrier.',
    greenFlags: ['Alcohol-free', 'Hypoallergenic', 'Fragrance-free'],
    redFlags: [],
  },
  {
    id: '5',
    name: 'Dot & Key CICA Calming Moisturizer',
    brand: 'Dot & Key',
    category: 'Moisturizer',
    price: 695,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300',
    matchScore: 86,
    whyItWorks: 'CICA repairs barrier damage while keeping combination skin balanced.',
    greenFlags: ['Barrier repair', 'Lightweight', 'Non-greasy'],
    redFlags: ['Contains fragrance'],
  },
  {
    id: '6',
    name: 'Plum Green Tea Renewed Clarity Night Gel',
    brand: 'Plum',
    category: 'Treatment',
    price: 575,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300',
    matchScore: 83,
    whyItWorks: 'Antioxidant-rich overnight treatment that calms hormonal breakouts.',
    greenFlags: ['Vegan', 'Cruelty-free', 'Antioxidant-rich'],
    redFlags: [],
  },
];

export const DISCOVERY_CARDS = [
  {
    id: 'd1',
    title: 'Best sunscreens for humid weather',
    subtitle: '5 lightweight picks that won\'t melt off',
    emoji: '☀️',
    color: '#FFF3E0',
  },
  {
    id: 'd2',
    title: '5 fungal acne-safe moisturizers',
    subtitle: 'Dermatologist-verified formulas',
    emoji: '🛡️',
    color: '#E8F5E9',
  },
  {
    id: 'd3',
    title: 'Budget serums under ₹700',
    subtitle: 'Effective actives that don\'t break the bank',
    emoji: '💚',
    color: '#F3E5F5',
  },
  {
    id: 'd4',
    title: 'Products dermatologists secretly love',
    subtitle: 'What they actually use themselves',
    emoji: '👩‍⚕️',
    color: '#E3F2FD',
  },
  {
    id: 'd5',
    title: 'Niacinamide vs Vitamin C',
    subtitle: 'Which one does YOUR skin need?',
    emoji: '⚡',
    color: '#FFF8E1',
  },
  {
    id: 'd6',
    title: 'The Korean skincare edit',
    subtitle: 'Essential K-beauty for Indian skin',
    emoji: '🇰🇷',
    color: '#FCE4EC',
  },
];
