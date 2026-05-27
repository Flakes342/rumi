import React, { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { Card, CircleIcon, Icon, ScreenContainer } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { products } from '@/constants/RumiData';
import { RoutineMode, RoutineStep, useRumiStore } from '@/store/useRumiStore';

function days() {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index - 3);
    return {
      key: date.toDateString(),
      date: date.getDate(),
      label: index === 3 ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'short' }),
    };
  });
}

function RoutineStepCard({ step, index, mode, onToggle }: { step: RoutineStep; index: number; mode: RoutineMode; onToggle: () => void }) {
  return (
    <Pressable style={styles.stepRow} onPress={onToggle}>
      <View style={styles.timelineNumber}>
        <Text style={styles.timelineText}>{index + 1}</Text>
      </View>
      <Card style={styles.stepCard}>
        <Image source={products[index % products.length].image} style={styles.stepImage} />
        <View style={styles.stepCopy}>
          <View style={styles.stepTitleRow}>
            <Text style={styles.stepName} numberOfLines={2}>{step.name}</Text>
            <Text style={[styles.category, { backgroundColor: categoryColor(step.category) }]}>{step.category}</Text>
          </View>
          <Text style={styles.ingredient}>{step.ingredient}</Text>
          <Text style={styles.why} numberOfLines={2}>{step.why}</Text>
          <Text style={styles.modeText}>{mode === 'morning' ? 'AM' : 'PM'}</Text>
        </View>
        <View style={[styles.check, step.completed && styles.checkOn]}>
          {step.completed && <Icon name="check" color={Colors.white} size={18} />}
        </View>
      </Card>
    </Pressable>
  );
}

function categoryColor(category: RoutineStep['category']) {
  return {
    Cleanse: '#DCEBF2',
    Treat: '#E5F0DF',
    Hydrate: '#DCEBF2',
    Protect: '#F4DFC9',
  }[category];
}

export function RoutineView() {
  const { morningRoutine, eveningRoutine, toggleStep, notificationSettings, setNotificationSetting } = useRumiStore();
  const [selectedDay, setSelectedDay] = useState(new Date().toDateString());
  const [mode, setMode] = useState<RoutineMode>(new Date().getHours() >= 17 ? 'evening' : 'morning');
  const dayList = useMemo(days, []);
  const routine = mode === 'morning' ? morningRoutine : eveningRoutine;
  const completed = routine.filter((step) => step.completed).length;
  const progress = Math.round((completed / routine.length) * 100);

  const toggleReminder = async () => {
    const next = !notificationSettings[mode];
    if (next) {
      const permission = await Notifications.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Reminders are off', 'You can continue normally and enable notifications later.');
        return;
      }
    }
    setNotificationSetting(mode, next);
    Alert.alert(next ? 'Reminder enabled' : 'Reminder paused', next ? 'Rumi will remind you gently.' : 'Your routine is still ready whenever you are.');
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.round}>
            <Icon name="back" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Daily routine</Text>
            <Text style={styles.subtitle}>Consistency is the secret to healthy skin</Text>
          </View>
          <Pressable onPress={toggleReminder} style={styles.round}>
            <Icon name="bell" color={notificationSettings[mode] ? '#C98276' : Colors.text} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayRow}>
          {dayList.map((day) => {
            const active = day.key === selectedDay;
            return (
              <Pressable key={day.key} style={[styles.day, active && styles.dayOn]} onPress={() => setSelectedDay(day.key)}>
                <Text style={[styles.dayDate, active && styles.dayDateOn]}>{day.date}</Text>
                <Text style={[styles.dayLabel, active && styles.dayLabelOn]}>{day.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Card style={styles.summary}>
          <CircleIcon name={mode === 'morning' ? 'sun' : 'moon'} tone={mode === 'morning' ? Colors.gold : Colors.lavender} />
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>{mode === 'morning' ? 'Morning routine' : 'Evening routine'}</Text>
            <Text style={styles.summaryText}>{completed} of {routine.length} steps completed</Text>
            <View style={styles.progressTrack}>
              {routine.map((step) => <View key={step.id} style={[styles.progressSegment, step.completed && styles.progressSegmentOn]} />)}
            </View>
          </View>
          <View>
            <Text style={styles.percent}>{progress}%</Text>
            <Text style={styles.complete}>Complete</Text>
          </View>
        </Card>

        <View style={styles.segment}>
          {(['morning', 'evening'] as RoutineMode[]).map((item) => (
            <Pressable key={item} style={[styles.segmentButton, mode === item && styles.segmentOn]} onPress={() => setMode(item)}>
              <Icon name={item === 'morning' ? 'sun' : 'moon'} color={mode === item ? Colors.white : Colors.text} />
              <Text style={[styles.segmentText, mode === item && styles.segmentTextOn]}>{item === 'morning' ? 'Morning' : 'Evening'}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.steps}>
          {routine.map((step, index) => (
            <RoutineStepCard
              key={step.id}
              step={step}
              index={index}
              mode={mode}
              onToggle={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
                toggleStep(mode, step.id);
              }}
            />
          ))}
        </View>

        <Card style={styles.tip}>
          <CircleIcon name="sparkle" tone={Colors.pink} />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Pro tip</Text>
            <Text style={styles.tipText}>Wait 30 to 60 seconds between each step for better absorption.</Text>
          </View>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 48, paddingBottom: 88, gap: Spacing.x3 },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  round: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  title: { fontFamily: Typography.sans, color: Colors.text, fontSize: 24, fontWeight: '900' },
  subtitle: { marginTop: 2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12 },
  dayRow: { gap: Spacing.x2, paddingRight: Spacing.x4 },
  day: { width: 50, height: 58, borderRadius: Radius.small, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', gap: Spacing.x1, ...Shadows.soft },
  dayOn: { backgroundColor: Colors.black },
  dayDate: { fontFamily: Typography.sans, color: Colors.text, fontSize: 18, fontWeight: '900' },
  dayDateOn: { color: Colors.white },
  dayLabel: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, fontWeight: '700' },
  dayLabelOn: { color: Colors.white },
  summary: { padding: Spacing.x3, flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  summaryTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 16, fontWeight: '900' },
  summaryText: { marginTop: 3, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, fontWeight: '700' },
  progressTrack: { flexDirection: 'row', gap: Spacing.x2, marginTop: Spacing.x4 },
  progressSegment: { flex: 1, height: 7, borderRadius: Radius.pill, backgroundColor: Colors.line },
  progressSegmentOn: { backgroundColor: Colors.pink },
  percent: { fontFamily: Typography.sans, color: Colors.text, fontSize: 21, fontWeight: '900', textAlign: 'right' },
  complete: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12 },
  segment: { flexDirection: 'row', backgroundColor: '#EEE6E1', borderRadius: Radius.pill, padding: 5 },
  segmentButton: { flex: 1, height: 40, borderRadius: Radius.pill, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.x2 },
  segmentOn: { backgroundColor: Colors.black },
  segmentText: { fontFamily: Typography.sans, color: Colors.text, fontSize: 15, fontWeight: '900' },
  segmentTextOn: { color: Colors.white },
  steps: { gap: Spacing.x4 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x2 },
  timelineNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F8DCD4', alignItems: 'center', justifyContent: 'center' },
  timelineText: { fontFamily: Typography.sans, color: Colors.text, fontWeight: '900' },
  stepCard: { flex: 1, minHeight: 96, padding: Spacing.x2, flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  stepImage: { width: 66, height: 66, borderRadius: Radius.small, backgroundColor: '#F0E8E3', resizeMode: 'contain' },
  stepCopy: { flex: 1, minWidth: 0, paddingRight: 34 },
  stepTitleRow: { alignItems: 'flex-start', gap: Spacing.x1 },
  stepName: { fontFamily: Typography.sans, color: Colors.text, fontSize: 14, lineHeight: 17, fontWeight: '900' },
  category: { overflow: 'hidden', borderRadius: Radius.pill, paddingHorizontal: Spacing.x2, paddingVertical: 3, fontFamily: Typography.sans, color: Colors.text, fontSize: 11, fontWeight: '800' },
  ingredient: { marginTop: Spacing.x1, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, fontWeight: '900' },
  why: { marginTop: 2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 11, lineHeight: 14 },
  modeText: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: '#C98276', fontSize: 12, fontWeight: '900' },
  check: { position: 'absolute', right: Spacing.x3, width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: Colors.muted, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: Colors.black, borderColor: Colors.black },
  tip: { padding: Spacing.x3, flexDirection: 'row', gap: Spacing.x3, alignItems: 'center', backgroundColor: '#FBF0EA' },
  tipTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 16, fontWeight: '900' },
  tipText: { marginTop: 4, fontFamily: Typography.sans, color: Colors.text, fontSize: 14, lineHeight: 20 },
});
