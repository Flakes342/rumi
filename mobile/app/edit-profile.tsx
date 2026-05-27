import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Card, Icon, ScreenContainer } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

export default function EditProfileScreen() {
  const { onboardingAnswers, updateProfileField } = useRumiStore();
  const fields = [
    ['name', 'Name', 'Ayush'],
    ['skinType', 'Skin type', 'Combination'],
    ['goals', 'Goals', 'Hydration, barrier repair'],
    ['climate', 'Climate', 'Humid'],
    ['pollution', 'Pollution', 'Moderate'],
    ['fragrancePreference', 'Fragrance preference', 'Avoid fragrance'],
  ];

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.round} onPress={() => router.back()}>
            <Icon name="back" />
          </Pressable>
          <Text style={styles.title}>Edit profile</Text>
        </View>
        <Card style={styles.card}>
          {fields.map(([key, label, placeholder]) => (
            <View key={key} style={styles.field}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                value={String(onboardingAnswers[key] || '')}
                onChangeText={(value) => updateProfileField(key, value)}
                placeholder={placeholder}
                placeholderTextColor={Colors.muted}
                style={styles.input}
              />
            </View>
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
  field: { gap: Spacing.x1 },
  label: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  input: { height: 42, borderRadius: Radius.small, backgroundColor: '#FBF7F4', borderWidth: 1, borderColor: Colors.line, paddingHorizontal: Spacing.x3, fontFamily: Typography.sans, color: Colors.text, fontSize: 13 },
});
