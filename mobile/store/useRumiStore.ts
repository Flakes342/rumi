import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type RoutineMode = 'morning' | 'evening';

export type RoutineStep = {
  id: string;
  order: number;
  category: 'Cleanse' | 'Treat' | 'Hydrate' | 'Protect';
  name: string;
  ingredient: string;
  why: string;
  completed: boolean;
};

export type SkinAnalysis = {
  skinLabel: string;
  summary: string;
  barrierLabel: string;
  riskLabel: string;
  priorities: string[];
  insights: string[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'rumi';
  content: string;
  timestamp: number;
};

type NotificationSettings = {
  morning: boolean;
  evening: boolean;
  morningTime: string;
  eveningTime: string;
  customReminders: { id: string; label: string; time: string; enabled: boolean }[];
};

type RumiStore = {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  hasSeenResults: boolean;
  notificationPromptSeen: boolean;
  onboardingAnswers: Record<string, string | string[] | number | boolean>;
  currentQuestionIndex: number;
  skinAnalysis: SkinAnalysis | null;
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  streak: number;
  savedProducts: string[];
  shelfProducts: string[];
  chatMessages: ChatMessage[];
  notificationSettings: NotificationSettings;
  setAuthenticated: (value: boolean) => void;
  setOnboardingAnswer: (key: string, value: string | string[] | number | boolean) => void;
  setCurrentQuestionIndex: (index: number) => void;
  completeOnboarding: () => void;
  setHasSeenResults: (value: boolean) => void;
  setNotificationPromptSeen: (value: boolean) => void;
  setSkinAnalysis: (analysis: SkinAnalysis) => void;
  toggleStep: (mode: RoutineMode, id: string) => void;
  toggleSavedProduct: (id: string) => void;
  addToShelf: (id: string) => void;
  removeFromShelf: (id: string) => void;
  addChatMessage: (role: 'user' | 'rumi', content: string) => void;
  setNotificationSetting: (key: keyof NotificationSettings, value: boolean | string) => void;
  addCustomReminder: (label: string, time: string) => void;
  toggleCustomReminder: (id: string) => void;
  updateProfileField: (key: string, value: string) => void;
  resetOnboarding: () => void;
};

const morning: RoutineStep[] = [
  {
    id: 'm1',
    order: 1,
    category: 'Cleanse',
    name: 'Gentle Cleanser',
    ingredient: 'Ceramides',
    why: 'Removes overnight buildup without stripping your barrier',
    completed: false,
  },
  {
    id: 'm2',
    order: 2,
    category: 'Treat',
    name: 'Niacinamide Serum',
    ingredient: 'Niacinamide 10%',
    why: 'Controls oil production and minimizes visible pores',
    completed: false,
  },
  {
    id: 'm3',
    order: 3,
    category: 'Hydrate',
    name: 'Lightweight Moisturizer',
    ingredient: 'Hyaluronic acid',
    why: 'Locks in hydration without feeling heavy',
    completed: false,
  },
  {
    id: 'm4',
    order: 4,
    category: 'Protect',
    name: 'SPF 50 Sunscreen',
    ingredient: 'UV filters',
    why: 'Protects from UV damage and dark spots',
    completed: false,
  },
];

const evening: RoutineStep[] = [
  {
    id: 'e1',
    order: 1,
    category: 'Cleanse',
    name: 'Barrier Cleanser',
    ingredient: 'Amino acids',
    why: 'Clears sunscreen and buildup while keeping skin calm',
    completed: false,
  },
  {
    id: 'e2',
    order: 2,
    category: 'Treat',
    name: 'Retinol Serum',
    ingredient: 'Retinol 0.3%',
    why: 'Supports texture and tone when introduced slowly',
    completed: false,
  },
  {
    id: 'e3',
    order: 3,
    category: 'Hydrate',
    name: 'Barrier Cream',
    ingredient: 'Ceramides and peptides',
    why: 'Cushions your barrier through the night',
    completed: false,
  },
];

export const useRumiStore = create<RumiStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      hasSeenResults: false,
      notificationPromptSeen: false,
      onboardingAnswers: {},
      currentQuestionIndex: 0,
      skinAnalysis: null,
      morningRoutine: morning,
      eveningRoutine: evening,
      streak: 7,
      savedProducts: ['ordinary-niacinamide', 'minimalist-ha'],
      shelfProducts: ['reequil-ceramide'],
      chatMessages: [],
      notificationSettings: {
        morning: false,
        evening: false,
        morningTime: '08:30',
        eveningTime: '21:30',
        customReminders: [
          { id: 'water', label: 'Drink water', time: '12:30', enabled: true },
          { id: 'spf', label: 'Reapply SPF', time: '15:30', enabled: false },
        ],
      },
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setOnboardingAnswer: (key, value) =>
        set((state) => ({ onboardingAnswers: { ...state.onboardingAnswers, [key]: value } })),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true, hasSeenResults: true }),
      setHasSeenResults: (value) => set({ hasSeenResults: value }),
      setNotificationPromptSeen: (value) => set({ notificationPromptSeen: value }),
      setSkinAnalysis: (analysis) => set({ skinAnalysis: analysis }),
      toggleStep: (mode, id) =>
        set((state) => {
          const key = mode === 'morning' ? 'morningRoutine' : 'eveningRoutine';
          return {
            [key]: state[key].map((step) =>
              step.id === id ? { ...step, completed: !step.completed } : step
            ),
          };
        }),
      toggleSavedProduct: (id) =>
        set((state) => ({
          savedProducts: state.savedProducts.includes(id)
            ? state.savedProducts.filter((productId) => productId !== id)
            : [...state.savedProducts, id],
        })),
      addToShelf: (id) =>
        set((state) => ({
          shelfProducts: state.shelfProducts.includes(id)
            ? state.shelfProducts
            : [...state.shelfProducts, id],
        })),
      removeFromShelf: (id) =>
        set((state) => ({ shelfProducts: state.shelfProducts.filter((productId) => productId !== id) })),
      addChatMessage: (role, content) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            { id: `${Date.now()}-${state.chatMessages.length}`, role, content, timestamp: Date.now() },
          ],
        })),
      setNotificationSetting: (key, value) =>
        set((state) => ({
          notificationSettings: { ...state.notificationSettings, [key]: value },
        })),
      addCustomReminder: (label, time) =>
        set((state) => ({
          notificationSettings: {
            ...state.notificationSettings,
            customReminders: [
              ...state.notificationSettings.customReminders,
              { id: `${Date.now()}`, label, time, enabled: true },
            ],
          },
        })),
      toggleCustomReminder: (id) =>
        set((state) => ({
          notificationSettings: {
            ...state.notificationSettings,
            customReminders: state.notificationSettings.customReminders.map((reminder) =>
              reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
            ),
          },
        })),
      updateProfileField: (key, value) =>
        set((state) => ({
          onboardingAnswers: { ...state.onboardingAnswers, [key]: value },
        })),
      resetOnboarding: () =>
        set({
          hasCompletedOnboarding: false,
          hasSeenResults: false,
          notificationPromptSeen: false,
          currentQuestionIndex: 0,
          onboardingAnswers: {},
        }),
    }),
    {
      name: 'rumi-store-v2',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasSeenResults: state.hasSeenResults,
        notificationPromptSeen: state.notificationPromptSeen,
        onboardingAnswers: state.onboardingAnswers,
        currentQuestionIndex: state.currentQuestionIndex,
        skinAnalysis: state.skinAnalysis,
        morningRoutine: state.morningRoutine,
        eveningRoutine: state.eveningRoutine,
        streak: state.streak,
        savedProducts: state.savedProducts,
        shelfProducts: state.shelfProducts,
        chatMessages: state.chatMessages,
        notificationSettings: state.notificationSettings,
      }),
    }
  )
);
