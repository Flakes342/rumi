/**
 * Rumi — Profile Screen
 * Skin profile summary, priorities, settings, saved products.
 */
import React from 'react';
import { Alert } from 'react-native';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { onboardingAnswers, savedProducts, streak } = useRumiStore();
  const name = (onboardingAnswers.name as string) || 'You';

  return (
    <View style={s.container}>
      <LinearGradient colors={['#FFF8F0', '#FDFAF6']} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={s.header}>
          <View style={s.avatar}>
            <LinearGradient colors={['#E8C4B8', '#C9A9B8']} style={s.avatarGrad}>
              <Text style={s.avatarText}>{name[0]?.toUpperCase()}</Text>
            </LinearGradient>
          </View>
          <Text style={s.name}>{name}</Text>
          <Text style={s.label}>Sensitive Combination Skin</Text>
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={s.statsRow}>
          <View style={s.statCard}><Text style={s.statVal}>{streak}</Text><Text style={s.statLbl}>Day Streak</Text></View>
          <View style={s.statCard}><Text style={s.statVal}>{savedProducts.length}</Text><Text style={s.statLbl}>Saved</Text></View>
          <View style={s.statCard}><Text style={s.statVal}>62%</Text><Text style={s.statLbl}>Barrier</Text></View>
        </Animated.View>

        {/* Skin Profile Card */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <LinearGradient colors={['#FDFAF6', '#F5E6DA']} style={s.profileCard}>
            <Text style={s.cardTitle}>Your Skin Profile</Text>
            <View style={s.priorityRow}>
              {['Hydration', 'Barrier Repair', 'Oil Balance'].map(p => (
                <View key={p} style={s.priorityChip}><Text style={s.priorityText}>{p}</Text></View>
              ))}
            </View>
            <View style={s.insightList}>
              <Text style={s.insight}>Barrier slightly compromised</Text>
              <Text style={s.insight}>High irritation risk</Text>
              <Text style={s.insight}>Hormonal breakout tendency</Text>
              <Text style={s.insight}>UV sensitive skin</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={s.menu}>
          {['My Skin Journey', 'Saved Products', 'My Shelf', 'Notification Settings', 'Edit Profile', 'About Rumi'].map((item) => (
            <Pressable key={item} style={({ pressed }) => [s.menuItem, pressed && { opacity: 0.7 }]} onPress={() => {
              if (item === 'Saved Products') router.push('/(tabs)/discover');
              else if (item === 'My Skin Journey') router.push('/reveal');
              else Alert.alert(item, 'This section is being connected to backend data.');
            }}>
              <Text style={s.menuText}>{item}</Text>
              <Text style={s.menuArrow}>›</Text>
            </Pressable>
          ))}
        </Animated.View>

        <Text style={s.version}>Rumi v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scroll: { paddingTop: 72, paddingBottom: 64, paddingHorizontal: Spacing.lg, gap: 16 },
  header: { alignItems: 'center', gap: 8 },
  avatar: { width: 72, height: 72, borderRadius: 36, overflow: 'hidden' },
  avatarGrad: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '600', color: '#FFF' },
  name: { fontSize: 24, fontWeight: '600', color: Colors.charcoal },
  label: { fontSize: 13, color: Colors.warmGray, fontWeight: '500' },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, backgroundColor: Colors.cardBg, borderRadius: 16, padding: 14, alignItems: 'center', gap: 4, ...Shadows.soft },
  statVal: { fontSize: 18, fontWeight: '700', color: Colors.charcoal },
  statLbl: { fontSize: 11, color: Colors.warmGray, fontWeight: '500' },
  profileCard: { borderRadius: 24, padding: 20, gap: 12, ...Shadows.soft },
  cardTitle: { fontSize: 17, fontWeight: '600', color: Colors.charcoal },
  priorityRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  priorityChip: { backgroundColor: Colors.rose + '20', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: Colors.rose + '40' },
  priorityText: { fontSize: 12, fontWeight: '600', color: Colors.rose },
  insightList: { gap: 6 },
  insight: { fontSize: 13, color: Colors.charcoal, lineHeight: 20 },
  menu: { backgroundColor: Colors.cardBg, borderRadius: 20, overflow: 'hidden', ...Shadows.soft },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: Colors.cloud },
  menuText: { fontSize: 15, fontWeight: '500', color: Colors.charcoal },
  menuArrow: { fontSize: 20, color: Colors.softGray },
  version: { fontSize: 11, color: Colors.softGray, textAlign: 'center', marginTop: 8 },
});
