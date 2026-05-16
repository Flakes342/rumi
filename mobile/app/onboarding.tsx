/**
 * Rumi — Onboarding Flow
 *
 * Conversational, emotionally intelligent, visually beautiful.
 * Varied input types: pills, multi-select, text input, sliders.
 * Smooth transitions between questions.
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, BorderRadius, Typography, Animation } from '@/constants/Theme';
import { ONBOARDING_QUESTIONS, ONBOARDING_SECTIONS, TOTAL_QUESTIONS } from '@/constants/OnboardingQuestions';
import { useRumiStore } from '@/store/useRumiStore';

const { width, height } = Dimensions.get('window');

// ── Progress Indicator ───────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current + 1) / total;

  const animatedWidth = useAnimatedStyle(() => ({
    width: withSpring(`${progress * 100}%` as any, {
      damping: 20,
      stiffness: 100,
    }),
  }));

  // Find current section
  const currentQuestion = ONBOARDING_QUESTIONS[current];
  const section = ONBOARDING_SECTIONS.find((s) => s.id === currentQuestion?.category);

  return (
    <View style={progressStyles.container}>
      <View style={progressStyles.barTrack}>
        <Animated.View style={[progressStyles.barFill, animatedWidth]} />
      </View>
      {section && (
        <Animated.Text
          entering={FadeIn.duration(300)}
          style={progressStyles.sectionLabel}
        >
          {section.emoji} {section.label}
        </Animated.Text>
      )}
    </View>
  );
}

const progressStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
  },
  barTrack: {
    height: 3,
    backgroundColor: Colors.cloud,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.rose,
    borderRadius: 2,
  },
  sectionLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.warmGray,
    fontWeight: Typography.weights.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

// ── Pill Button ──────────────────────────────────────────
function PillButton({
  label,
  emoji,
  selected,
  onPress,
  delay = 0,
}: {
  label: string;
  emoji?: string;
  selected: boolean;
  onPress: () => void;
  delay?: number;
}) {
  return (
    <Animated.View entering={FadeIn.delay(delay).duration(400)}>
      <Pressable
        style={({ pressed }) => [
          pillStyles.pill,
          selected && pillStyles.pillSelected,
          pressed && pillStyles.pillPressed,
        ]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }}
      >
        {emoji && <Text style={pillStyles.emoji}>{emoji}</Text>}
        <Text style={[pillStyles.label, selected && pillStyles.labelSelected]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const pillStyles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.cardBg,
    borderWidth: 1.5,
    borderColor: Colors.cloud,
    gap: Spacing.xs,
  },
  pillSelected: {
    backgroundColor: Colors.rose,
    borderColor: Colors.rose,
  },
  pillPressed: {
    transform: [{ scale: 0.97 }],
  },
  emoji: {
    fontSize: 18,
  },
  label: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.charcoal,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});

// ── Text Input Card ─────────────────────────────────────
function TextInputCard({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <Animated.View entering={FadeIn.delay(200).duration(400)}>
      <TextInput
        style={textInputStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.softGray}
        autoFocus
        autoCapitalize="words"
      />
    </Animated.View>
  );
}

const textInputStyles = StyleSheet.create({
  input: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.medium,
    color: Colors.charcoal,
    borderBottomWidth: 2,
    borderBottomColor: Colors.rose,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
});

// ── Main Onboarding Screen ──────────────────────────────
export default function OnboardingScreen() {
  const {
    onboardingAnswers,
    setOnboardingAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useRumiStore();

  const [textValue, setTextValue] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  const question = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const answer = onboardingAnswers[question?.key];

  const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

  const canProceed = (() => {
    if (!question) return false;
    if (question.type === 'single-pill') {
      return textValue.trim().length > 0 || (typeof answer === 'string' && answer.length > 0);
    }
    if (question.multiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  })();

  const handlePillSelect = useCallback(
    (value: string) => {
      if (question.multiSelect) {
        const current = (Array.isArray(answer) ? answer : []) as string[];
        if (current.includes(value)) {
          setOnboardingAnswer(
            question.key,
            current.filter((v) => v !== value)
          );
        } else {
          setOnboardingAnswer(question.key, [...current, value]);
        }
      } else {
        setOnboardingAnswer(question.key, value);
      }
    },
    [question, answer]
  );

  const goNext = useCallback(() => {
    // Save text inputs
    if (question.type === 'single-pill' && textValue) {
      setOnboardingAnswer(question.key, textValue);
    }

    if (isLastQuestion) {
      // Navigate to reveal
      router.replace('/reveal');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTextValue('');
    setAnimationKey((k) => k + 1);
  }, [currentQuestionIndex, isLastQuestion, textValue, question]);

  const goBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTextValue('');
      setAnimationKey((k) => k + 1);
    } else {
      router.back();
    }
  }, [currentQuestionIndex]);

  if (!question) return null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#FFF8F0', '#FDFAF6']}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <ProgressBar current={currentQuestionIndex} total={TOTAL_QUESTIONS} />
      </View>

      {/* Question Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.questionContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          key={animationKey}
          entering={SlideInRight.duration(400).easing(Easing.out(Easing.exp))}
          style={styles.questionContainer}
        >
          {/* Question title */}
          <View style={styles.titleSection}>
            <Text style={styles.questionTitle}>{question.title}</Text>
            {question.subtitle && (
              <Text style={styles.questionSubtitle}>{question.subtitle}</Text>
            )}
          </View>

          {/* Answer options */}
          <View style={styles.optionsSection}>
            {question.type === 'single-pill' ? (
              <TextInputCard
                value={textValue || (typeof answer === 'string' ? answer : '')}
                onChangeText={setTextValue}
                placeholder={
                  question.key === 'name' ? 'Your name' : 'Type here...'
                }
              />
            ) : (
              <View style={styles.pillsContainer}>
                {question.options?.map((option, index) => (
                  <PillButton
                    key={option.value}
                    label={option.label}
                    emoji={option.emoji}
                    selected={
                      question.multiSelect
                        ? (Array.isArray(answer) ? answer : []).includes(option.value)
                        : answer === option.value
                    }
                    onPress={() => handlePillSelect(option.value)}
                    delay={index * 60}
                  />
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomSection}>
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            !canProceed && styles.continueButtonDisabled,
            pressed && canProceed && styles.continueButtonPressed,
          ]}
          onPress={goNext}
          disabled={!canProceed}
        >
          <Text
            style={[
              styles.continueText,
              !canProceed && styles.continueTextDisabled,
            ]}
          >
            {isLastQuestion ? 'Analyze my skin ✨' : 'Continue'}
          </Text>
        </Pressable>

        {!question.multiSelect && question.type !== 'single-pill' && (
          <Text style={styles.hintText}>Tap to select</Text>
        )}
        {question.multiSelect && (
          <Text style={styles.hintText}>Select all that apply</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    paddingTop: Spacing['3xl'],
    gap: Spacing.md,
  },
  backButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: Typography.sizes.xl,
    color: Colors.charcoal,
  },
  scrollView: {
    flex: 1,
  },
  questionContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  questionContainer: {
    flex: 1,
    gap: Spacing['2xl'],
  },
  titleSection: {
    gap: Spacing.xs,
  },
  questionTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.semibold,
    color: Colors.charcoal,
    lineHeight: Typography.sizes['2xl'] * Typography.lineHeights.snug,
  },
  questionSubtitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.regular,
    color: Colors.warmGray,
    lineHeight: Typography.sizes.base * Typography.lineHeights.relaxed,
    marginTop: Spacing.xxs,
  },
  optionsSection: {
    gap: Spacing.sm,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
    paddingTop: Spacing.md,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.charcoal,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: Colors.cloud,
  },
  continueButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  continueText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: '#FFFFFF',
  },
  continueTextDisabled: {
    color: Colors.softGray,
  },
  hintText: {
    fontSize: Typography.sizes.xs,
    color: Colors.softGray,
  },
});
