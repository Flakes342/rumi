import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import { router, useLocalSearchParams } from 'expo-router';
import { AnimatedIn, Card, CircleIcon, Icon, Orb, PrimaryButton, ScreenContainer } from '@/components/RumiUI';
import { Colors, Gradients, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

const analysis = {
  skinLabel: 'Sensitive Dehydrated Combination Skin',
  summary: 'Your skin tells a story of sensitivity and dehydration. While your T zone tends oily, your cheeks crave moisture. Your barrier needs some extra love right now.',
  barrierLabel: 'Good',
  riskLabel: 'Moderate',
  priorities: ['Hydration', 'Barrier repair', 'Oil balancing'],
  insights: [
    'Your skin barrier is slightly compromised, so gentle products are recommended.',
    'Irritation risk is elevated, so strong actives should be introduced slowly.',
    'Hormonal breakout tendency calls for cycle aware skincare.',
    'UV sensitive skin needs daily SPF 50 protection.',
    'Dehydrated skin responds best to humectants and barrier supporting ingredients.',
  ],
};

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const rotate = useSharedValue(0);
  const breathe = useSharedValue(1);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(360, { duration: 5200, easing: Easing.linear }), -1, false);
    breathe.value = withRepeat(withTiming(1.08, { duration: 1800, easing: Easing.inOut(Easing.ease) }), -1, true);
    const timer = setTimeout(onDone, 6200);
    return () => clearTimeout(timer);
  }, []);

  const ringStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotate.value}deg` }] }));
  const orbStyle = useAnimatedStyle(() => ({ transform: [{ scale: breathe.value }] }));

  return (
    <ScreenContainer>
      <View style={load.center}>
        <View style={load.sparkleA} />
        <View style={load.sparkleB} />
        <View style={load.orbWrap}>
          <Animated.View style={[load.ring, ringStyle]} />
          <Animated.View style={orbStyle}>
            <Orb size={156} />
          </Animated.View>
          <View style={load.flask}>
            <Icon name="lab" size={36} color={Colors.text} />
          </View>
        </View>
        <Text style={load.title}>Analyzing your skin</Text>
        <Text style={load.subtitle}>Rumi is carefully studying your answers to build a profile that is truly yours.</Text>
        <View style={load.steps}>
          {[
            ['shield', 'Checking your skin barrier', 'Assessing hydration and protection levels', Colors.pink],
            ['drop', 'Evaluating irritation potential', 'Understanding sensitivity and reactivity', Colors.lavender],
            ['leaf', 'Matching your environment', 'Analyzing climate and pollution factors', Colors.sage],
            ['sparkle', 'Personalizing your results', 'Putting it all together for you', Colors.gold],
          ].map(([icon, title, subtitle, tone], index) => (
            <AnimatedIn key={title} index={index}>
              <View style={load.step}>
                <CircleIcon name={icon as any} tone={tone as string} />
                <View style={load.stepCopy}>
                  <Text style={load.stepTitle}>{title}</Text>
                  <Text style={load.stepText}>{subtitle}</Text>
                  <View style={load.track}>
                    <LinearGradient colors={[tone as string, '#F1EAE6']} style={[load.fill, { width: `${58 + index * 7}%` }]} />
                  </View>
                </View>
              </View>
            </AnimatedIn>
          ))}
        </View>
        <Card style={load.note}>
          <CircleIcon name="sparkle" tone={Colors.pink} />
          <View style={{ flex: 1 }}>
            <Text style={load.noteTitle}>This takes under a minute</Text>
            <Text style={load.noteText}>Hang tight. Great skin days are worth the wait.</Text>
          </View>
        </Card>
      </View>
    </ScreenContainer>
  );
}

export default function RevealScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const [phase, setPhase] = useState<'loading' | 'results'>(params.mode === 'results' ? 'results' : 'loading');
  const { setSkinAnalysis, completeOnboarding, setNotificationPromptSeen } = useRumiStore();

  const startJourney = async () => {
    setSkinAnalysis(analysis);
    completeOnboarding();
    Alert.alert(
      'Gentle reminders',
      'Let Rumi gently remind you when your skin needs care.',
      [
        { text: 'Not now', onPress: () => router.replace('/(tabs)') },
        {
          text: 'Allow',
          onPress: async () => {
            await Notifications.requestPermissionsAsync();
            setNotificationPromptSeen(true);
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  if (phase === 'loading') return <LoadingScreen onDone={() => setPhase('results')} />;

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(420)} style={styles.top}>
          <Pressable onPress={() => router.back()} style={styles.roundButton}>
            <Icon name="back" />
          </Pressable>
          <Pressable style={styles.share}>
            <Icon name="share" size={18} />
            <Text style={styles.shareText}>Share</Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(420)} style={styles.profileHero}>
          <Orb size={124} letter="A" />
          <View style={styles.profileCopy}>
            <View style={styles.badge}>
              <Icon name="sparkle" size={14} color="#C77F72" />
              <Text style={styles.badgeText}>Your Skin Profile</Text>
            </View>
            <Text style={styles.title}>{analysis.skinLabel}</Text>
            <Text style={styles.summary}>{analysis.summary}</Text>
          </View>
        </Animated.View>

        <Card style={styles.metrics}>
          <View style={styles.metric}>
            <CircleIcon name="shield" tone={Colors.sage} />
            <View>
              <Text style={[styles.metricValue, { color: Colors.good }]}>{analysis.barrierLabel}</Text>
              <Text style={styles.metricLabel}>Barrier Health</Text>
              <Text style={styles.metricText}>Your barrier is holding up well. Keep it strong.</Text>
            </View>
          </View>
          <View style={styles.metricLine} />
          <View style={styles.metric}>
            <CircleIcon name="drop" tone={Colors.pink} />
            <View>
              <Text style={[styles.metricValue, { color: Colors.risk }]}>{analysis.riskLabel}</Text>
              <Text style={styles.metricLabel}>Irritation Risk</Text>
              <Text style={styles.metricText}>Some sensitivity detected. Be gentle with actives.</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Your skin priorities</Text>
        <View style={styles.priorityGrid}>
          {analysis.priorities.map((item, index) => (
            <Card key={item} style={styles.priority}>
              <CircleIcon name={index === 0 ? 'drop' : index === 1 ? 'shield' : 'chart'} tone={[Colors.blue, Colors.pink, Colors.lavender][index]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.priorityTitle}>{item}</Text>
                <Text style={styles.priorityText}>{index === 0 ? 'Replenish moisture' : index === 1 ? 'Support your barrier' : 'Control excess oil'}</Text>
              </View>
            </Card>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Key insights</Text>
        <Card style={styles.insights}>
          {analysis.insights.map((item, index) => (
            <View key={item} style={[styles.insightRow, index < analysis.insights.length - 1 && styles.insightBorder]}>
              <View style={styles.dot} />
              <CircleIcon name={index === 0 ? 'shield' : index === 1 ? 'drop' : index === 2 ? 'calendar' : index === 3 ? 'sun' : 'sparkle'} size={48} tone={Colors.shell} />
              <Text style={styles.insightText}>{item}</Text>
            </View>
          ))}
        </Card>

        <LinearGradient colors={['#F9E5E1', '#FFF4F1']} style={styles.cta}>
          <CircleIcon name="sparkle" tone={Colors.pink} />
          <View style={styles.ctaCopy}>
            <Text style={styles.ctaTitle}>Ready to glow?</Text>
            <Text style={styles.ctaText}>Let us build a routine that works for your skin.</Text>
          </View>
          <Pressable onPress={startJourney} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Start my journey</Text>
            <Icon name="arrow" color={Colors.white} />
          </Pressable>
        </LinearGradient>
        <Text style={styles.private}>Your data is private and secure</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const load = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', paddingTop: 40 },
  sparkleA: { position: 'absolute', left: 34, top: 142, width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.card, ...Shadows.soft },
  sparkleB: { position: 'absolute', right: 44, top: 250, width: 18, height: 18, borderRadius: 9, backgroundColor: '#F4E3D7' },
  orbWrap: { height: 172, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 166, height: 166, borderRadius: 83, borderWidth: 2, borderColor: '#E7C5BE', borderRightColor: '#C98276' },
  flask: { position: 'absolute' },
  title: { textAlign: 'center', fontFamily: Typography.serif, fontSize: 28, fontWeight: '700', color: Colors.text },
  subtitle: { marginTop: Spacing.x2, textAlign: 'center', fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, lineHeight: 18, paddingHorizontal: Spacing.x4 },
  steps: { marginTop: Spacing.x6, gap: Spacing.x4 },
  step: { flexDirection: 'row', gap: Spacing.x3, alignItems: 'center' },
  stepCopy: { flex: 1, gap: Spacing.x2 },
  stepTitle: { fontFamily: Typography.serif, fontSize: 16, color: Colors.text, fontWeight: '700' },
  stepText: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 11 },
  track: { height: 6, borderRadius: Radius.pill, backgroundColor: Colors.line, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: Radius.pill },
  note: { marginTop: Spacing.x6, padding: Spacing.x3, flexDirection: 'row', gap: Spacing.x3, alignItems: 'center' },
  noteTitle: { fontFamily: Typography.serif, fontSize: 16, color: Colors.text, fontWeight: '700' },
  noteText: { marginTop: 4, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 14, lineHeight: 20 },
});

const styles = StyleSheet.create({
  scroll: { paddingTop: 46, paddingBottom: 28, gap: Spacing.x4 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roundButton: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  share: { height: 52, borderRadius: 26, backgroundColor: Colors.card, paddingHorizontal: Spacing.x5, flexDirection: 'row', alignItems: 'center', gap: Spacing.x2, ...Shadows.soft },
  shareText: { fontFamily: Typography.sans, color: Colors.text, fontWeight: '700', fontSize: 15 },
  profileHero: { flexDirection: 'row', gap: Spacing.x3, alignItems: 'center' },
  profileCopy: { flex: 1, gap: Spacing.x3 },
  badge: { alignSelf: 'flex-start', flexDirection: 'row', gap: Spacing.x2, alignItems: 'center', paddingHorizontal: Spacing.x4, paddingVertical: Spacing.x2, borderRadius: Radius.pill, backgroundColor: '#FFF7F5', borderWidth: 1, borderColor: Colors.line },
  badgeText: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, fontWeight: '700' },
  title: { fontFamily: Typography.serif, fontSize: 23, lineHeight: 29, color: Colors.text, fontWeight: '700' },
  summary: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, lineHeight: 18 },
  metrics: { flexDirection: 'row', padding: Spacing.x3, gap: Spacing.x3 },
  metric: { flex: 1, gap: Spacing.x3 },
  metricLine: { width: 1, backgroundColor: Colors.line },
  metricValue: { fontFamily: Typography.serif, fontSize: 19, fontWeight: '700' },
  metricLabel: { fontFamily: Typography.sans, fontSize: 12, color: Colors.text, fontWeight: '700' },
  metricText: { marginTop: Spacing.x1, fontFamily: Typography.sans, fontSize: 10, lineHeight: 14, color: Colors.secondary },
  sectionTitle: { fontFamily: Typography.serif, fontSize: 20, color: Colors.text, fontWeight: '700', marginTop: Spacing.x2 },
  priorityGrid: { flexDirection: 'row', gap: Spacing.x3 },
  priority: { flex: 1, padding: Spacing.x2, gap: Spacing.x2 },
  priorityTitle: { fontFamily: Typography.sans, color: Colors.text, fontWeight: '800', fontSize: 14 },
  priorityText: { marginTop: 4, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, lineHeight: 17 },
  insights: { paddingHorizontal: Spacing.x5 },
  insightRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3, paddingVertical: Spacing.x3 },
  insightBorder: { borderBottomWidth: 1, borderBottomColor: Colors.line },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.pink },
  insightText: { flex: 1, fontFamily: Typography.sans, color: Colors.text, fontSize: 12, lineHeight: 18 },
  cta: { marginTop: Spacing.x4, borderRadius: Radius.large, padding: Spacing.x5, flexDirection: 'row', alignItems: 'center', gap: Spacing.x4 },
  ctaCopy: { flex: 1 },
  ctaTitle: { fontFamily: Typography.serif, color: Colors.text, fontSize: 22, fontWeight: '700' },
  ctaText: { marginTop: 4, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 13 },
  ctaButton: { minHeight: 52, borderRadius: Radius.pill, backgroundColor: Colors.black, paddingHorizontal: Spacing.x5, flexDirection: 'row', alignItems: 'center', gap: Spacing.x2 },
  ctaButtonText: { fontFamily: Typography.sans, color: Colors.white, fontWeight: '800', fontSize: 14 },
  private: { textAlign: 'center', color: Colors.muted, fontFamily: Typography.sans, fontSize: 12 },
});
