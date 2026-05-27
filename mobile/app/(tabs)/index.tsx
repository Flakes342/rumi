import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { AnimatedIn, Card, CircleIcon, Icon, MetricPill, ProductThumb, ScreenContainer, SectionHeader } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { educationCards, products } from '@/constants/RumiData';
import { useRumiStore } from '@/store/useRumiStore';

export default function HomeScreen() {
  const { onboardingAnswers, eveningRoutine, morningRoutine } = useRumiStore();
  const name = String(onboardingAnswers.name || 'Ayush');
  const hour = new Date().getHours();
  const isEvening = hour >= 17;
  const routine = isEvening ? eveningRoutine : morningRoutine;
  const completed = routine.filter((step) => step.completed).length;
  const progress = routine.length ? Math.round((completed / routine.length) * 100) : 0;
  const greetings = [
    'Your barrier is calmer today',
    'Hydration is the move today',
    'A gentle routine fits tonight',
    'Your skin needs a quiet reset',
  ];
  const greetingCopy = greetings[new Date().getDate() % greetings.length];
  const pollution = String(onboardingAnswers.pollution || 'moderate');
  const water = String(onboardingAnswers.waterIntake || 'moderate');
  const cycle = String(onboardingAnswers.hormonalAcne || 'sometimes');

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AnimatedIn>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{greetingCopy}</Text>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{name}</Text>
                <Icon name="sparkle" size={18} color={Colors.gold} />
              </View>
            </View>
            <View style={styles.headerActions}>
              <Pressable style={styles.round} onPress={() => router.push('/settings')}>
                <Icon name="bell" />
                <View style={styles.alertDot} />
              </Pressable>
            </View>
          </View>
        </AnimatedIn>

        <AnimatedIn index={1}>
          <Card style={styles.insight}>
            <CircleIcon name="sparkle" tone={Colors.pink} />
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Your skin barrier is recovering well.</Text>
              <Text style={styles.insightText}>Humidity is low tonight. Hydrate and lock in moisture.</Text>
            </View>
          </Card>
        </AnimatedIn>

        <AnimatedIn index={2}>
          <Card style={styles.statusCard}>
            <View style={styles.statusTop}>
              <Text style={styles.cardTitle}>Skin status today</Text>
            </View>
            <View style={styles.statusRow}>
              <MetricPill label="Weather" value={pollution === 'high' ? 'Protect' : 'Stable'} tone={Colors.sage} />
              <View style={styles.vLine} />
              <MetricPill label="Water" value={water === 'low' ? 'Low' : 'Good'} tone={Colors.blue} />
              <View style={styles.vLine} />
              <MetricPill label="Cycle" value={cycle === 'always' ? 'Reactive' : 'Calm'} tone={Colors.gold} />
            </View>
          </Card>
        </AnimatedIn>

        <AnimatedIn index={3}>
          <LinearGradient colors={['#E9C8BF', '#F2DCD4']} style={styles.routineCard}>
            <View style={styles.routineTop}>
              <CircleIcon name={isEvening ? 'moon' : 'sun'} tone="#D0A79C" />
              <View style={{ flex: 1 }}>
                <Text style={styles.routineTitle}>{isEvening ? 'Evening routine' : 'Morning routine'}</Text>
                <Text style={styles.routineMeta}>{routine.length} steps  5 min</Text>
              </View>
              <View style={styles.progressBadge}>
                <Text style={styles.progressBadgeText}>{progress}% completed</Text>
              </View>
            </View>
            <View style={styles.productSequence}>
              {routine.slice(0, 3).map((step, index) => (
                <View key={step.id} style={styles.sequenceItem}>
                  <ProductThumb source={products[index].image} size={68} />
                  <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
                  <Text style={styles.sequenceText}>{step.category}</Text>
                </View>
              ))}
            </View>
            <Pressable style={styles.routineCta} onPress={() => router.push('/routine')}>
              <Text style={styles.routineCtaText}>Start {isEvening ? 'Evening' : 'Morning'} Routine</Text>
              <Icon name="arrow" />
            </Pressable>
          </LinearGradient>
        </AnimatedIn>

        <SectionHeader title="For you today" action={() => router.push('/(tabs)/discover')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.educationRow}>
          {educationCards.map((item, index) => (
            <Pressable key={item.id} style={styles.educationCard} onPress={() => router.push({ pathname: '/product/[id]', params: { id: products[index].id } } as any)}>
              <Text style={styles.educationLabel}>{item.label}</Text>
              <Text style={styles.educationTitle}>{item.title}</Text>
              <Text style={styles.educationText}>{item.subtitle}</Text>
              <Image source={item.image} style={styles.educationImage} />
            </Pressable>
          ))}
        </ScrollView>

        <Card style={styles.progressCard}>
          <View>
            <Text style={styles.cardTitle}>Your progress</Text>
            <View style={styles.progressContent}>
              <View style={styles.circleProgress}>
                <Text style={styles.circleProgressText}>82%</Text>
              </View>
              <View>
                <Text style={styles.progressTitle}>Routine consistency</Text>
                <Text style={styles.progressText}>You are building a strong habit.</Text>
              </View>
            </View>
          </View>
          <View style={styles.month}>
            <Text style={styles.streakNumber}>12</Text>
            <Text style={styles.progressText}>Day streak</Text>
            <View style={styles.chart}>
              {[22, 28, 26, 34, 42, 54, 48].map((height, index) => (
                <View key={index} style={[styles.bar, { height, backgroundColor: index === 6 ? '#D58F88' : '#E5DDD7' }]} />
              ))}
            </View>
          </View>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 54, paddingBottom: 92, gap: Spacing.x4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontFamily: Typography.sans, fontSize: 16, color: Colors.secondary, fontWeight: '700' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x2 },
  name: { marginTop: 2, fontFamily: Typography.sans, fontSize: 28, color: Colors.text, fontWeight: '900' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  round: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  alertDot: { position: 'absolute', right: 14, top: 13, width: 8, height: 8, borderRadius: 4, backgroundColor: '#D58F88' },
  insight: { padding: Spacing.x3, flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  insightTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 13, fontWeight: '800' },
  insightText: { marginTop: 4, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, lineHeight: 17 },
  statusCard: { padding: Spacing.x3, gap: Spacing.x3 },
  statusTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontFamily: Typography.sans, fontSize: 17, color: Colors.text, fontWeight: '900' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x2 },
  vLine: { width: 1, height: 34, backgroundColor: Colors.line },
  routineCard: { borderRadius: Radius.medium, padding: Spacing.x4, gap: Spacing.x4, overflow: 'hidden' },
  routineTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  routineTitle: { fontFamily: Typography.sans, fontSize: 18, color: Colors.text, fontWeight: '900' },
  routineMeta: { marginTop: 4, fontFamily: Typography.sans, color: Colors.text, fontSize: 12 },
  progressBadge: { borderRadius: Radius.pill, backgroundColor: 'rgba(255,255,255,0.28)', paddingHorizontal: Spacing.x4, paddingVertical: Spacing.x2 },
  progressBadgeText: { fontFamily: Typography.sans, fontSize: 13, color: Colors.text, fontWeight: '700' },
  productSequence: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sequenceItem: { alignItems: 'center', width: '30%', gap: Spacing.x2 },
  stepNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { fontFamily: Typography.sans, fontSize: 12, color: Colors.text, fontWeight: '800' },
  sequenceText: { fontFamily: Typography.sans, color: Colors.text, fontSize: 12, fontWeight: '700' },
  routineCta: { height: 46, borderRadius: Radius.pill, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: Spacing.x2 },
  routineCtaText: { fontFamily: Typography.sans, color: Colors.text, fontSize: 13, fontWeight: '900' },
  educationRow: { gap: Spacing.x4, paddingRight: Spacing.x6 },
  educationCard: { width: 172, minHeight: 122, borderRadius: Radius.medium, backgroundColor: Colors.card, padding: Spacing.x3, overflow: 'hidden', ...Shadows.soft },
  educationLabel: { alignSelf: 'flex-start', borderRadius: Radius.pill, backgroundColor: '#F5E4E0', paddingHorizontal: Spacing.x3, paddingVertical: Spacing.x1, fontFamily: Typography.sans, color: '#B96D63', fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  educationTitle: { marginTop: Spacing.x2, width: 104, fontFamily: Typography.sans, color: Colors.text, fontSize: 13, lineHeight: 17, fontWeight: '900' },
  educationText: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 11 },
  educationImage: { position: 'absolute', right: -8, bottom: -4, width: 74, height: 98, resizeMode: 'contain' },
  progressCard: { padding: Spacing.x3, flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.x3 },
  progressContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3, marginTop: Spacing.x3 },
  circleProgress: { width: 56, height: 56, borderRadius: 28, borderWidth: 5, borderColor: '#D58F88', alignItems: 'center', justifyContent: 'center' },
  circleProgressText: { fontFamily: Typography.sans, fontSize: 18, fontWeight: '900', color: Colors.text },
  progressTitle: { fontFamily: Typography.sans, fontSize: 13, color: Colors.text, fontWeight: '900' },
  progressText: { marginTop: 3, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 11, lineHeight: 15 },
  month: { minWidth: 92, alignItems: 'flex-start' },
  streakNumber: { fontFamily: Typography.sans, fontSize: 24, color: Colors.text, fontWeight: '900' },
  chart: { marginTop: Spacing.x3, height: 42, flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  bar: { width: 9, borderRadius: 8 },
});
