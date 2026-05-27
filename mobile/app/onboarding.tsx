import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Icon, PrimaryButton, ScreenContainer, haptic } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { ONBOARDING_QUESTIONS, TOTAL_QUESTIONS } from '@/constants/OnboardingQuestions';
import { useRumiStore } from '@/store/useRumiStore';

function optionValue(label: string) {
  return label.toLowerCase().replace(/\s+/g, ' ');
}

export default function OnboardingScreen() {
  const { onboardingAnswers, setOnboardingAnswer, currentQuestionIndex, setCurrentQuestionIndex } = useRumiStore();
  const question = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const [text, setText] = useState('');
  const answer = onboardingAnswers[question.key];
  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
  const isLast = currentQuestionIndex === TOTAL_QUESTIONS - 1;

  useEffect(() => {
    setText(typeof answer === 'string' ? answer : '');
  }, [question.id]);

  const canProceed = useMemo(() => {
    if (question.type === 'text') return text.trim().length > 0;
    if (question.type === 'multi') return Array.isArray(answer) && answer.length > 0;
    return answer !== undefined && answer !== '';
  }, [answer, question.type, text]);

  const saveOption = (label: string) => {
    haptic();
    if (question.type === 'multi') {
      const current = Array.isArray(answer) ? answer : [];
      const value = optionValue(label);
      setOnboardingAnswer(
        question.key,
        current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
      );
      return;
    }
    setOnboardingAnswer(question.key, optionValue(label));
  };

  const goNext = () => {
    if (question.type === 'text') setOnboardingAnswer(question.key, text.trim());
    haptic();
    if (isLast) {
      router.replace('/reveal');
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const goBack = () => {
    if (currentQuestionIndex === 0) {
      router.back();
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.top}>
          <Pressable onPress={goBack} style={styles.back}>
            <Icon name="back" />
          </Pressable>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.count}>{currentQuestionIndex + 1} of {TOTAL_QUESTIONS}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Animated.View key={question.id} entering={FadeInDown.duration(420)} style={styles.questionCard}>
            <Text style={styles.kicker}>Skin profile</Text>
            <Text style={styles.title}>{question.title}</Text>
            {question.subtitle && <Text style={styles.subtitle}>{question.subtitle}</Text>}

            {question.type === 'text' && (
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Type here"
                placeholderTextColor={Colors.muted}
                style={styles.input}
                autoFocus
              />
            )}

            {(question.type === 'single' || question.type === 'multi') && (
              <View style={styles.options}>
                {question.options?.map((label) => {
                  const value = optionValue(label);
                  const selected = question.type === 'multi' ? Array.isArray(answer) && answer.includes(value) : answer === value;
                  return (
                    <Pressable key={label} onPress={() => saveOption(label)} style={({ pressed }) => [styles.option, selected && styles.optionOn, pressed && styles.pressed]}>
                      <Text style={[styles.optionText, selected && styles.optionTextOn]}>{label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {question.type === 'boolean' && (
              <View style={styles.options}>
                {['Yes', 'No'].map((label) => {
                  const value = label === 'Yes';
                  const selected = answer === value;
                  return (
                    <Pressable key={label} onPress={() => setOnboardingAnswer(question.key, value)} style={[styles.option, selected && styles.optionOn]}>
                      <Text style={[styles.optionText, selected && styles.optionTextOn]}>{label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {question.type === 'slider' && (
              <View style={styles.sliderBox}>
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>{question.minLabel}</Text>
                  <Text style={styles.sliderLabel}>{question.maxLabel}</Text>
                </View>
                <View style={styles.scale}>
                  {[1, 2, 3, 4, 5].map((value) => {
                    const selected = answer === value;
                    return (
                      <Pressable key={value} onPress={() => setOnboardingAnswer(question.key, value)} style={[styles.scaleDot, selected && styles.scaleDotOn]}>
                        <Text style={[styles.scaleText, selected && styles.scaleTextOn]}>{value}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}
          </Animated.View>
        </ScrollView>

        <View style={styles.bottom}>
          <PrimaryButton label={isLast ? 'Analyze my skin' : 'Continue'} onPress={goNext} disabled={!canProceed} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  top: { paddingTop: 44, flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  progressTrack: { flex: 1, height: 4, borderRadius: Radius.pill, backgroundColor: Colors.line, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.pink, borderRadius: Radius.pill },
  count: { fontFamily: Typography.sans, fontSize: 12, color: Colors.secondary, fontWeight: '700' },
  content: { flexGrow: 1, justifyContent: 'flex-start', paddingTop: Spacing.x8, paddingBottom: Spacing.x4 },
  questionCard: { gap: Spacing.x4 },
  kicker: { fontFamily: Typography.sans, color: '#C47E72', textTransform: 'uppercase', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  title: { fontFamily: Typography.serif, fontSize: 24, lineHeight: 31, color: Colors.text, fontWeight: '700' },
  subtitle: { fontFamily: Typography.sans, fontSize: 12, lineHeight: 18, color: Colors.secondary },
  input: { height: 48, borderRadius: Radius.medium, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.line, paddingHorizontal: Spacing.x3, fontFamily: Typography.sans, fontSize: 14, color: Colors.text, ...Shadows.soft },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.x2 },
  option: { paddingVertical: Spacing.x2, paddingHorizontal: Spacing.x3, borderRadius: Radius.pill, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.line, ...Shadows.soft },
  optionOn: { backgroundColor: Colors.black, borderColor: Colors.black },
  optionText: { fontFamily: Typography.sans, fontSize: 12, color: Colors.text, fontWeight: '700' },
  optionTextOn: { color: Colors.white },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  sliderBox: { gap: Spacing.x3 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabel: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 13 },
  scale: { flexDirection: 'row', justifyContent: 'space-between' },
  scaleDot: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.line },
  scaleDotOn: { backgroundColor: Colors.black },
  scaleText: { fontFamily: Typography.sans, color: Colors.secondary, fontWeight: '800' },
  scaleTextOn: { color: Colors.white },
  bottom: { paddingBottom: 20 },
});
