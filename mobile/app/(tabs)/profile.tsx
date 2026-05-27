import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Card, CircleIcon, Icon, Orb, ScreenContainer } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

function display(value: unknown, fallback: string) {
  if (Array.isArray(value)) return value.map((item) => String(item)).join(', ');
  if (typeof value === 'string' && value.trim()) return value;
  return fallback;
}

function CircularMetric({ value, label, tone, caption }: { value: string; label: string; tone: string; caption: string }) {
  return (
    <View style={styles.metric}>
      <View style={[styles.circle, { borderColor: tone }]}>
        <Text style={styles.circleValue}>{value}</Text>
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricCaption, { color: tone }]}>{caption}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { onboardingAnswers, skinAnalysis, savedProducts, shelfProducts, streak } = useRumiStore();
  const name = String(onboardingAnswers.name || 'Ayush');
  const profile = skinAnalysis?.skinLabel || 'Sensitive Dehydrated Combination';

  const rows = [
    ['Skin type', profile, 'profile'],
    ['Goals', display(onboardingAnswers.goals, 'Even tone, strengthen barrier'), 'sparkle'],
    ['Climate', `${display(onboardingAnswers.climate, 'Humid')} with ${display(onboardingAnswers.pollution, 'moderate')} pollution`, 'leaf'],
    ['Preferences', `${display(onboardingAnswers.veganPreference, 'Vegan')} and ${display(onboardingAnswers.fragrancePreference, 'fragrance free')}`, 'shield'],
  ];

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Orb size={92} letter={name[0]?.toUpperCase() || 'A'} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Hi {name}</Text>
            <Text style={styles.profileText} numberOfLines={2}>{profile}</Text>
          </View>
          <Pressable style={styles.round} onPress={() => router.push('/settings')}>
            <Icon name="settings" />
          </Pressable>
        </View>

        <Card style={styles.metricPanel}>
          <CircularMetric value="62%" label="Barrier Health" caption="Good" tone={Colors.good} />
          <View style={styles.vLine} />
          <CircularMetric value="74%" label="Irritation Risk" caption="Moderate" tone={Colors.gold} />
          <View style={styles.vLine} />
          <CircularMetric value={String(streak)} label="Day Streak" caption="Keep it up" tone={Colors.purple} />
        </Card>

        <Card style={styles.profileCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Skin profile</Text>
            <Pressable style={styles.smallRound} onPress={() => router.push({ pathname: '/reveal', params: { mode: 'results' } } as any)}>
              <Icon name="chart" />
            </Pressable>
          </View>
          {rows.map(([label, value, icon], index) => (
            <View key={label} style={[styles.profileRow, index < rows.length - 1 && styles.profileBorder]}>
              <CircleIcon name={icon as any} tone={Colors.shell} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.rowValue}>{value}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Text style={styles.spaceTitle}>Your space</Text>
        <View style={styles.spaceGrid}>
          {[
            ['Saved products', `${savedProducts.length} saved`, 'save', () => router.push('/(tabs)/discover')],
            ['My shelf', `${shelfProducts.length} products`, 'shelf', () => Alert.alert('My shelf', 'Add owned products from product detail pages.')],
            ['Routine settings', 'Reminders and timing', 'bell', () => router.push('/settings')],
          ].map(([title, subtitle, icon, action]) => (
            <Pressable key={title as string} style={styles.spaceCard} onPress={action as () => void}>
              <Icon name={icon as any} />
              <View style={{ flex: 1 }}>
                <Text style={styles.spaceCardTitle}>{title as string}</Text>
                <Text style={styles.spaceCardText}>{subtitle as string}</Text>
              </View>
              <Icon name="arrow" color={Colors.secondary} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.editCard} onPress={() => router.push('/edit-profile')}>
          <Icon name="edit" />
          <View style={{ flex: 1 }}>
            <Text style={styles.spaceCardTitle}>Edit profile</Text>
            <Text style={styles.spaceCardText}>Update your skin quiz and preferences</Text>
          </View>
          <Icon name="arrow" color={Colors.secondary} />
        </Pressable>
        <Text style={styles.version}>Rumi v1.0.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 50, paddingBottom: 88, gap: Spacing.x4 },
  hero: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x4 },
  name: { fontFamily: Typography.serif, fontSize: 25, lineHeight: 30, color: Colors.text, fontWeight: '700' },
  profileText: { marginTop: Spacing.x1, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 13, lineHeight: 18 },
  round: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  metricPanel: { flexDirection: 'row', alignItems: 'center', padding: Spacing.x3 },
  metric: { flex: 1, alignItems: 'center' },
  circle: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  circleValue: { fontFamily: Typography.sans, fontSize: 18, color: Colors.text, fontWeight: '900' },
  metricLabel: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: Colors.text, fontSize: 11, lineHeight: 15, fontWeight: '800', textAlign: 'center' },
  metricCaption: { marginTop: 3, fontFamily: Typography.sans, fontSize: 11, fontWeight: '800' },
  vLine: { width: 1, height: 78, backgroundColor: Colors.line },
  profileCard: { padding: Spacing.x3, backgroundColor: '#FFFDFC' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontFamily: Typography.serif, fontSize: 23, color: Colors.text, fontWeight: '700' },
  smallRound: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FBF7F4', alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3, paddingVertical: Spacing.x2 },
  profileBorder: { borderBottomWidth: 1, borderBottomColor: Colors.line },
  rowLabel: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 13 },
  rowValue: { marginTop: 3, fontFamily: Typography.sans, color: Colors.text, fontSize: 14, lineHeight: 19, fontWeight: '800', textTransform: 'capitalize' },
  spaceTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 19, fontWeight: '900' },
  spaceGrid: { gap: Spacing.x3 },
  spaceCard: { minHeight: 76, borderRadius: Radius.medium, backgroundColor: Colors.card, padding: Spacing.x4, gap: Spacing.x3, flexDirection: 'row', alignItems: 'center', ...Shadows.soft },
  spaceCardTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 15, fontWeight: '900' },
  spaceCardText: { marginTop: 4, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 13, lineHeight: 18 },
  editCard: { minHeight: 68, borderRadius: Radius.medium, backgroundColor: Colors.card, padding: Spacing.x3, flexDirection: 'row', alignItems: 'center', gap: Spacing.x3, ...Shadows.soft },
  version: { textAlign: 'center', fontFamily: Typography.sans, color: Colors.muted, fontSize: 12 },
});
