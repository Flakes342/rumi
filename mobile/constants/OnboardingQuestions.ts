export type QuestionType = 'text' | 'single' | 'multi' | 'slider' | 'boolean';

export type OnboardingQuestion = {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: string[];
  minLabel?: string;
  maxLabel?: string;
};

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  { id: 'name', key: 'name', title: 'What should Rumi call you?', type: 'text' },
  { id: 'skin-type', key: 'skinType', title: 'What is your skin type?', subtitle: 'Choose the closest match.', type: 'single', options: ['Oily', 'Dry', 'Combination', 'Normal', 'Not sure'] },
  { id: 'oiliness', key: 'oiliness', title: 'How oily does your T zone get?', type: 'slider', minLabel: 'Barely', maxLabel: 'Very oily' },
  { id: 'dehydration', key: 'dehydration', title: 'How often does your skin feel dehydrated?', type: 'single', options: ['Rarely', 'Sometimes', 'Often', 'Most days'] },
  { id: 'acne', key: 'acne', title: 'How often do you break out?', type: 'single', options: ['Rarely', 'Monthly', 'Weekly', 'Most days'] },
  { id: 'sensitivity', key: 'sensitivity', title: 'How reactive is your skin?', type: 'single', options: ['Calm', 'Mildly sensitive', 'Sensitive', 'Very reactive'] },
  { id: 'redness', key: 'redness', title: 'How much redness do you notice?', type: 'slider', minLabel: 'Low', maxLabel: 'High' },
  { id: 'pigmentation', key: 'pigmentation', title: 'Do you deal with dark spots or uneven tone?', type: 'single', options: ['Not really', 'A little', 'Quite a bit', 'A lot'] },
  { id: 'goals', key: 'goals', title: 'What are your skin goals?', subtitle: 'Pick every goal that matters.', type: 'multi', options: ['Hydration', 'Barrier repair', 'Even tone', 'Oil balancing', 'Calmer skin', 'Texture support'] },
  { id: 'budget', key: 'budget', title: 'What budget feels comfortable?', type: 'single', options: ['Under Rs 1000', 'Rs 1000 to 2000', 'Rs 2000 to 4000', 'Flexible'] },
  { id: 'allergies', key: 'allergies', title: 'Any allergies Rumi should remember?', type: 'text', subtitle: 'You can write none.' },
  { id: 'fragrance', key: 'fragrancePreference', title: 'How do you feel about fragrance?', type: 'single', options: ['Avoid fragrance', 'Low fragrance is okay', 'No preference'] },
  { id: 'vegan', key: 'veganPreference', title: 'Do you prefer vegan products?', type: 'boolean' },
  { id: 'routine', key: 'currentRoutine', title: 'What is your current routine like?', type: 'multi', options: ['Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Retinol', 'Exfoliant'] },
  { id: 'climate', key: 'climate', title: 'What climate are you in most days?', type: 'single', options: ['Humid', 'Dry', 'Hot', 'Cold', 'Mixed'] },
  { id: 'pollution', key: 'pollution', title: 'How polluted is your area?', type: 'single', options: ['Low', 'Moderate', 'High'] },
  { id: 'sleep', key: 'sleep', title: 'How has your sleep been?', type: 'single', options: ['Restful', 'Okay', 'Interrupted', 'Poor'] },
  { id: 'stress', key: 'stress', title: 'What is your stress level lately?', type: 'slider', minLabel: 'Low', maxLabel: 'High' },
  { id: 'retinol', key: 'retinolExperience', title: 'What is your retinol experience?', type: 'single', options: ['Never used', 'Beginner', 'Comfortable', 'Experienced'] },
];

export const TOTAL_QUESTIONS = ONBOARDING_QUESTIONS.length;
