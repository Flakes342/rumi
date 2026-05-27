import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { Card, Icon, ScreenContainer } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

export default function SettingsScreen() {
  const { notificationSettings, addCustomReminder, toggleCustomReminder } = useRumiStore();
  const [label, setLabel] = useState('');
  const [time, setTime] = useState('');

  const addReminder = async () => {
    if (!label.trim() || !time.trim()) {
      Alert.alert('Add a reminder', 'Enter a reminder name and time, like SPF reapply at 15:30.');
      return;
    }
    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Notifications are off', 'The reminder is saved. Enable notifications later to receive alerts.');
    }
    addCustomReminder(label.trim(), time.trim());
    setLabel('');
    setTime('');
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.round} onPress={() => router.back()}>
            <Icon name="back" />
          </Pressable>
          <Text style={styles.title}>Settings</Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Custom reminders</Text>
          <Text style={styles.copy}>Create any skincare, water, refill, or SPF reminder at the time you want.</Text>
          <View style={styles.inputRow}>
            <TextInput value={label} onChangeText={setLabel} placeholder="Reminder" placeholderTextColor={Colors.muted} style={[styles.input, { flex: 1.2 }]} />
            <TextInput value={time} onChangeText={setTime} placeholder="HH:MM" placeholderTextColor={Colors.muted} style={styles.input} />
            <Pressable style={styles.add} onPress={addReminder}>
              <Icon name="plus" color={Colors.white} size={18} />
            </Pressable>
          </View>
          {notificationSettings.customReminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderRow}>
              <View>
                <Text style={styles.rowTitle}>{reminder.label}</Text>
                <Text style={styles.rowText}>{reminder.time}</Text>
              </View>
              <Switch value={reminder.enabled} onValueChange={() => toggleCustomReminder(reminder.id)} trackColor={{ false: Colors.line, true: Colors.pink }} thumbColor={Colors.card} />
            </View>
          ))}
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Profile</Text>
          {['Skin profile', 'My shelf', 'Saved products', 'Privacy'].map((item) => (
            <Pressable key={item} style={styles.linkRow} onPress={() => item === 'Skin profile' ? router.push('/edit-profile') : undefined}>
              <Text style={styles.rowTitle}>{item}</Text>
              <Icon name="arrow" color={Colors.secondary} size={18} />
            </Pressable>
          ))}
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 46, paddingBottom: 88, gap: Spacing.x4 },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  round: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  title: { fontFamily: Typography.serif, color: Colors.text, fontSize: 25, fontWeight: '700' },
  card: { padding: Spacing.x3, gap: Spacing.x3 },
  sectionTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 16, fontWeight: '900' },
  copy: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12, lineHeight: 17 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x2 },
  input: { height: 42, borderRadius: Radius.small, backgroundColor: '#FBF7F4', borderWidth: 1, borderColor: Colors.line, paddingHorizontal: Spacing.x3, fontFamily: Typography.sans, color: Colors.text, fontSize: 12 },
  add: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.black, alignItems: 'center', justifyContent: 'center' },
  reminderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.x3, borderTopWidth: 1, borderTopColor: Colors.line },
  rowTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 13, fontWeight: '800' },
  rowText: { marginTop: 2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12 },
  linkRow: { minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.line },
});
