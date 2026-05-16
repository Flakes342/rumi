/**
 * Rumi — Skin Profile Reveal
 *
 * "Analyzing your skin rhythm…" → magical animated reveal
 * This moment creates emotional attachment.
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

const { width, height } = Dimensions.get('window');

// ── Analysis Phase ──────────────────────────────────────
function AnalyzingPhase({ onComplete }: { onComplete: () => void }) {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.4);
  const dotOpacity1 = useSharedValue(0);
  const dotOpacity2 = useSharedValue(0);
  const dotOpacity3 = useSharedValue(0);

  useEffect(() => {
    // Pulse animation for the orb
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Typing dots
    dotOpacity1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.3, { duration: 400 })
      ),
      -1,
      true
    );
    dotOpacity2.value = withDelay(
      200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        true
      )
    );
    dotOpacity3.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        ),
        -1,
        true
      )
    );

    // Complete after 3 seconds
    const timer = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const dot1Style = useAnimatedStyle(() => ({ opacity: dotOpacity1.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dotOpacity2.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dotOpacity3.value }));

  return (
    <View style={analyzingStyles.container}>
      {/* Pulsing orb */}
      <Animated.View style={[analyzingStyles.orb, orbStyle]}>
        <LinearGradient
          colors={['#E8C4B8', '#C9A9B8', '#B8C9B8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={analyzingStyles.orbGradient}
        />
      </Animated.View>

      <Text style={analyzingStyles.title}>Analyzing your skin rhythm</Text>

      {/* Animated dots */}
      <View style={analyzingStyles.dotsContainer}>
        <Animated.Text style={[analyzingStyles.dot, dot1Style]}>·</Animated.Text>
        <Animated.Text style={[analyzingStyles.dot, dot2Style]}>·</Animated.Text>
        <Animated.Text style={[analyzingStyles.dot, dot3Style]}>·</Animated.Text>
      </View>
    </View>
  );
}

const analyzingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  orb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.charcoal,
    letterSpacing: 0.3,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: Spacing.xxs,
  },
  dot: {
    fontSize: 32,
    color: Colors.rose,
    fontWeight: Typography.weights.bold,
  },
});

// ── Priority Chip ───────────────────────────────────────
function PriorityChip({ label, index }: { label: string; index: number }) {
  const colors: Record<string, string> = {
    'Hydration': Colors.sage,
    'Barrier repair': Colors.rose,
    'Oil balancing': Colors.mauve,
    'Acne control': Colors.terracotta,
    'Brightening': '#D4C47A',
    'Calming': Colors.sage,
  };
  const chipColor = colors[label] || Colors.rose;

  return (
    <Animated.View
      entering={FadeInDown.delay(800 + index * 150).duration(500)}
      style={[
        priorityStyles.chip,
        { backgroundColor: chipColor + '20', borderColor: chipColor + '40' },
      ]}
    >
      <View style={[priorityStyles.dot, { backgroundColor: chipColor }]} />
      <Text style={[priorityStyles.label, { color: chipColor }]}>{label}</Text>
    </Animated.View>
  );
}

const priorityStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});

// ── Insight Row ─────────────────────────────────────────
function InsightRow({ icon, text, index }: { icon: string; text: string; index: number }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(1200 + index * 120).duration(400)}
      style={insightStyles.row}
    >
      <Text style={insightStyles.icon}>{icon}</Text>
      <Text style={insightStyles.text}>{text}</Text>
    </Animated.View>
  );
}

const insightStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  icon: {
    fontSize: 16,
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontSize: Typography.sizes.sm,
    color: Colors.charcoal,
    fontWeight: Typography.weights.regular,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.relaxed,
  },
});

// ── Main Reveal Screen ──────────────────────────────────
export default function RevealScreen() {
  const [phase, setPhase] = useState<'analyzing' | 'revealed'>('analyzing');
  const { onboardingAnswers, setSkinAnalysis, completeOnboarding } = useRumiStore();

  // Generate analysis from answers
  const analysis = {
    skinLabel: 'Sensitive dehydrated combination skin',
    summary:
      "Your skin tells a story of sensitivity and dehydration. While your T-zone tends oily, your cheeks crave moisture. Your barrier needs some extra love right now.",
    priorities: ['Hydration', 'Barrier repair', 'Oil balancing'],
    insights: [
      { icon: '🌸', text: 'Barrier slightly compromised — gentle products recommended' },
      { icon: '⚡', text: 'High irritation risk — avoid harsh actives for now' },
      { icon: '🌙', text: 'Hormonal breakout tendency — cycle-aware care recommended' },
      { icon: '☀️', text: 'UV-sensitive — daily SPF 50+ is essential' },
      { icon: '💧', text: 'Dehydrated skin type — humectants are your best friend' },
    ],
    barrierHealth: 62,
    irritationRisk: 74,
  };

  const handleContinue = () => {
    setSkinAnalysis({
      summary: analysis.summary,
      skinLabel: analysis.skinLabel,
      priorities: analysis.priorities,
      barrierHealth: analysis.barrierHealth,
      irritationRisk: analysis.irritationRisk,
      insights: analysis.insights.map((i) => i.text),
    });
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF8F0', '#F5E6DA', '#FFF8F0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {phase === 'analyzing' ? (
        <AnalyzingPhase onComplete={() => setPhase('revealed')} />
      ) : (
        <Animated.ScrollView
          entering={FadeIn.duration(600)}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            style={styles.headerSection}
          >
            <Text style={styles.headerEmoji}>✨</Text>
            <Text style={styles.headerTitle}>Your Skin Profile</Text>
          </Animated.View>

          {/* Skin Label Card */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(500)}
            style={styles.labelCard}
          >
            <LinearGradient
              colors={['#FDFAF6', '#F5E6DA']}
              style={styles.labelCardGradient}
            >
              <Text style={styles.skinLabel}>{analysis.skinLabel}</Text>
              <Text style={styles.skinSummary}>{analysis.summary}</Text>
            </LinearGradient>
          </Animated.View>

          {/* Scores */}
          <Animated.View
            entering={FadeInDown.delay(500).duration(500)}
            style={styles.scoresRow}
          >
            <View style={styles.scoreCard}>
              <Text style={styles.scoreValue}>{analysis.barrierHealth}%</Text>
              <Text style={styles.scoreLabel}>Barrier Health</Text>
            </View>
            <View style={[styles.scoreCard, { backgroundColor: Colors.terracotta + '10' }]}>
              <Text style={[styles.scoreValue, { color: Colors.terracotta }]}>
                {analysis.irritationRisk}%
              </Text>
              <Text style={styles.scoreLabel}>Irritation Risk</Text>
            </View>
          </Animated.View>

          {/* Priorities */}
          <Animated.View
            entering={FadeInDown.delay(700).duration(500)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Your skin priorities</Text>
            <View style={styles.prioritiesRow}>
              {analysis.priorities.map((p, i) => (
                <PriorityChip key={p} label={p} index={i} />
              ))}
            </View>
          </Animated.View>

          {/* Insights */}
          <Animated.View
            entering={FadeInDown.delay(1000).duration(500)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Key insights</Text>
            <View style={styles.insightsList}>
              {analysis.insights.map((insight, i) => (
                <InsightRow key={i} icon={insight.icon} text={insight.text} index={i} />
              ))}
            </View>
          </Animated.View>

          {/* CTA */}
          <Animated.View
            entering={FadeInDown.delay(1800).duration(500)}
            style={styles.ctaSection}
          >
            <Pressable
              style={({ pressed }) => [
                styles.ctaButton,
                pressed && styles.ctaButtonPressed,
              ]}
              onPress={handleContinue}
            >
              <Text style={styles.ctaText}>Start my skincare journey</Text>
            </Pressable>
          </Animated.View>
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'] + Spacing.lg,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  headerEmoji: {
    fontSize: 36,
  },
  headerTitle: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.semibold,
    color: Colors.charcoal,
    letterSpacing: -0.5,
  },
  labelCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.soft,
  },
  labelCardGradient: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  skinLabel: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.charcoal,
    textTransform: 'capitalize',
  },
  skinSummary: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.regular,
    color: Colors.warmGray,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.relaxed,
  },
  scoresRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: Colors.sage + '15',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  scoreValue: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.sage,
  },
  scoreLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    color: Colors.warmGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.charcoal,
  },
  prioritiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  insightsList: {
    gap: Spacing.xxs,
  },
  ctaSection: {
    marginTop: Spacing.lg,
  },
  ctaButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.charcoal,
    alignItems: 'center',
  },
  ctaButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: '#FFFFFF',
  },
});
