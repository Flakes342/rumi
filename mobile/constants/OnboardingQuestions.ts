/**
 * Onboarding questions for Rumi
 * Designed to feel conversational and emotionally intelligent
 */

export type QuestionType = 'pills' | 'slider' | 'image-select' | 'single-pill' | 'multi-pill';

export interface OnboardingQuestion {
  id: string;
  category: 'intro' | 'skin' | 'lifestyle' | 'environment' | 'hormonal' | 'preferences';
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: { label: string; value: string; emoji?: string; icon?: string }[];
  sliderConfig?: { min: number; max: number; step: number; labels: string[] };
  multiSelect?: boolean;
  key: string;
}

export const ONBOARDING_SECTIONS = [
  { id: 'intro', label: "Let's get to know you", emoji: '✨' },
  { id: 'skin', label: 'Your skin story', emoji: '🌸' },
  { id: 'lifestyle', label: 'Your lifestyle', emoji: '🌿' },
  { id: 'environment', label: 'Your environment', emoji: '☁️' },
  { id: 'hormonal', label: 'Hormonal health', emoji: '🌙' },
  { id: 'preferences', label: 'Your preferences', emoji: '💫' },
];

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  // ── Intro ──────────────────────────────────────────
  {
    id: 'name',
    category: 'intro',
    title: "First, what should we call you?",
    subtitle: "We'll personalize everything just for you.",
    type: 'single-pill',
    key: 'name',
  },
  {
    id: 'age',
    category: 'intro',
    title: "What's your age range?",
    subtitle: "Your skin changes with time, and so should your care.",
    type: 'pills',
    options: [
      { label: 'Under 18', value: 'under-18', emoji: '🌱' },
      { label: '18–24', value: '18-24', emoji: '🌿' },
      { label: '25–30', value: '25-30', emoji: '🌸' },
      { label: '31–40', value: '31-40', emoji: '🌺' },
      { label: '40+', value: '40+', emoji: '🌻' },
    ],
    key: 'ageRange',
  },
  {
    id: 'goals',
    category: 'intro',
    title: "What are your skin goals?",
    subtitle: "Pick all that speak to you.",
    type: 'multi-pill',
    multiSelect: true,
    options: [
      { label: 'Clear skin', value: 'clear-skin', emoji: '✨' },
      { label: 'Glow & radiance', value: 'glow', emoji: '🌟' },
      { label: 'Even tone', value: 'even-tone', emoji: '🎨' },
      { label: 'Anti-aging', value: 'anti-aging', emoji: '⏳' },
      { label: 'Hydration', value: 'hydration', emoji: '💧' },
      { label: 'Oil control', value: 'oil-control', emoji: '🍃' },
      { label: 'Calm & soothe', value: 'calm', emoji: '🕊️' },
      { label: 'Barrier repair', value: 'barrier', emoji: '🛡️' },
    ],
    key: 'skinGoals',
  },

  // ── Skin Profile ───────────────────────────────────
  {
    id: 'skin-type',
    category: 'skin',
    title: "How would you describe your skin?",
    subtitle: "Think about how your skin feels by midday.",
    type: 'pills',
    options: [
      { label: 'Oily', value: 'oily', emoji: '💦' },
      { label: 'Dry', value: 'dry', emoji: '🏜️' },
      { label: 'Combination', value: 'combination', emoji: '☯️' },
      { label: 'Normal', value: 'normal', emoji: '🌤️' },
      { label: 'Not sure', value: 'unsure', emoji: '🤔' },
    ],
    key: 'skinType',
  },
  {
    id: 'sensitivity',
    category: 'skin',
    title: "How sensitive is your skin?",
    subtitle: "Does your skin react easily to new products?",
    type: 'pills',
    options: [
      { label: 'Not at all', value: 'low', emoji: '💪' },
      { label: 'Slightly', value: 'moderate', emoji: '🤏' },
      { label: 'Very sensitive', value: 'high', emoji: '🌸' },
      { label: 'Extremely reactive', value: 'extreme', emoji: '⚡' },
    ],
    key: 'sensitivity',
  },
  {
    id: 'acne',
    category: 'skin',
    title: "How often do you break out?",
    type: 'pills',
    options: [
      { label: 'Rarely', value: 'rarely', emoji: '🌙' },
      { label: 'Sometimes', value: 'sometimes', emoji: '🌤️' },
      { label: 'Often', value: 'often', emoji: '🌧️' },
      { label: 'Constantly', value: 'always', emoji: '⛈️' },
    ],
    key: 'acneFrequency',
  },
  {
    id: 'pigmentation',
    category: 'skin',
    title: "Do you deal with dark spots or uneven tone?",
    type: 'pills',
    options: [
      { label: 'Not really', value: 'none', emoji: '✨' },
      { label: 'A little', value: 'mild', emoji: '🌤️' },
      { label: 'Quite a bit', value: 'moderate', emoji: '🌗' },
      { label: 'A lot', value: 'severe', emoji: '🌑' },
    ],
    key: 'pigmentation',
  },

  // ── Lifestyle ──────────────────────────────────────
  {
    id: 'sleep',
    category: 'lifestyle',
    title: "How's your sleep been?",
    subtitle: "Sleep deeply affects your skin's repair cycle.",
    type: 'pills',
    options: [
      { label: 'Amazing', value: 'great', emoji: '😴' },
      { label: 'Decent', value: 'average', emoji: '😊' },
      { label: 'Could be better', value: 'poor', emoji: '😔' },
      { label: 'Barely sleeping', value: 'terrible', emoji: '🥱' },
    ],
    key: 'sleepQuality',
  },
  {
    id: 'water',
    category: 'lifestyle',
    title: "How much water do you drink?",
    subtitle: "Hydration from within reflects on your skin.",
    type: 'pills',
    options: [
      { label: 'A lot (8+ glasses)', value: 'high', emoji: '🚰' },
      { label: 'Moderate (4-7)', value: 'moderate', emoji: '💧' },
      { label: 'Not enough', value: 'low', emoji: '🏜️' },
    ],
    key: 'waterIntake',
  },
  {
    id: 'stress',
    category: 'lifestyle',
    title: "What's your stress level like?",
    subtitle: "Stress triggers cortisol which affects your skin.",
    type: 'pills',
    options: [
      { label: 'Pretty chill', value: 'low', emoji: '🧘' },
      { label: 'Manageable', value: 'moderate', emoji: '😌' },
      { label: 'High', value: 'high', emoji: '😰' },
      { label: 'Off the charts', value: 'extreme', emoji: '🤯' },
    ],
    key: 'stressLevel',
  },

  // ── Environment ────────────────────────────────────
  {
    id: 'city',
    category: 'environment',
    title: "Where do you live?",
    subtitle: "We'll factor in your local weather and pollution.",
    type: 'single-pill',
    key: 'city',
  },
  {
    id: 'pollution',
    category: 'environment',
    title: "How polluted is your area?",
    type: 'pills',
    options: [
      { label: 'Clean air', value: 'low', emoji: '🌿' },
      { label: 'Moderate', value: 'moderate', emoji: '🏙️' },
      { label: 'Very polluted', value: 'high', emoji: '😷' },
    ],
    key: 'pollutionExposure',
  },

  // ── Hormonal ───────────────────────────────────────
  {
    id: 'cycle',
    category: 'hormonal',
    title: "Do you track your menstrual cycle?",
    subtitle: "Hormones play a huge role in skin behavior.",
    type: 'pills',
    options: [
      { label: 'Yes', value: 'yes', emoji: '📅' },
      { label: 'No', value: 'no', emoji: '🚫' },
      { label: 'Not applicable', value: 'na', emoji: '➡️' },
    ],
    key: 'tracksCycle',
  },
  {
    id: 'pcos',
    category: 'hormonal',
    title: "Do you have PCOS?",
    subtitle: "This helps us understand hormonal breakout patterns.",
    type: 'pills',
    options: [
      { label: 'Yes', value: 'yes', emoji: '✓' },
      { label: 'No', value: 'no', emoji: '✗' },
      { label: 'Not sure', value: 'unsure', emoji: '🤔' },
    ],
    key: 'hasPCOS',
  },
  {
    id: 'hormonal-acne',
    category: 'hormonal',
    title: "Do you notice breakouts around your period?",
    type: 'pills',
    options: [
      { label: 'Always', value: 'always', emoji: '😣' },
      { label: 'Sometimes', value: 'sometimes', emoji: '🤷' },
      { label: 'Rarely', value: 'rarely', emoji: '🙂' },
      { label: 'Not applicable', value: 'na', emoji: '➡️' },
    ],
    key: 'hormonalAcne',
  },

  // ── Preferences ────────────────────────────────────
  {
    id: 'budget',
    category: 'preferences',
    title: "What's your skincare budget?",
    subtitle: "Great skin exists at every price point.",
    type: 'pills',
    options: [
      { label: 'Affordable', value: 'affordable', emoji: '💚' },
      { label: 'Balanced', value: 'balanced', emoji: '💛' },
      { label: 'Luxury', value: 'luxury', emoji: '💜' },
    ],
    key: 'budget',
  },
  {
    id: 'preferences',
    category: 'preferences',
    title: "Any specific preferences?",
    subtitle: "We'll keep these in mind for every recommendation.",
    type: 'multi-pill',
    multiSelect: true,
    options: [
      { label: 'Vegan & cruelty-free', value: 'vegan', emoji: '🐰' },
      { label: 'Fragrance-free', value: 'fragrance-free', emoji: '🚫' },
      { label: 'Minimalist routine', value: 'minimalist', emoji: '🍃' },
      { label: 'Korean skincare', value: 'k-beauty', emoji: '🇰🇷' },
      { label: 'Indian brands', value: 'indian', emoji: '🇮🇳' },
      { label: 'Dermatologist brands', value: 'derm', emoji: '👩‍⚕️' },
    ],
    key: 'preferences',
  },
];

export const TOTAL_QUESTIONS = ONBOARDING_QUESTIONS.length;
