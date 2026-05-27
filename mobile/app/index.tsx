import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Card, CircleIcon, Icon, PrimaryButton, ScreenContainer } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

export default function LoginScreen() {
  const { isAuthenticated, hasCompletedOnboarding, setAuthenticated } = useRumiStore();
  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && hasCompletedOnboarding) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, hasCompletedOnboarding]);

  const continueFlow = () => {
    setLoading(true);
    setTimeout(() => {
      setAuthenticated(true);
      setLoading(false);
      router.replace(hasCompletedOnboarding ? '/(tabs)' : '/onboarding');
    }, 500);
  };

  return (
    <ScreenContainer padded={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.botanical} />
          <View style={styles.sideGlow} />

          <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.hero}>
            <Image source={require('../assets/images/rumi-logo-clean.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.tagline}>Personalized skin care, powered by intelligence.</Text>
            <View style={styles.rule}>
              <View style={styles.ruleLine} />
              <Icon name="sparkle" size={16} color={Colors.pink} />
              <View style={styles.ruleLine} />
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(180).duration(500)} style={styles.features}>
            {[
              ['sparkle', 'AI powered recommendations'],
              ['shield', 'Ingredient transparency'],
              ['chart', 'Track and improve your skin'],
            ].map(([icon, label]) => (
              <View key={label} style={styles.feature}>
                <CircleIcon name={icon as any} size={40} tone={Colors.shell} />
                <Text style={styles.featureText}>{label}</Text>
              </View>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(260).duration(500)} style={styles.authStack}>
            <Pressable onPress={continueFlow} style={({ pressed }) => [styles.authButton, pressed && styles.pressed]}>
              <Text style={styles.google}>G</Text>
              <Text style={styles.authText}>{loading ? 'Preparing your profile' : 'Continue with Google'}</Text>
            </Pressable>
            <Pressable onPress={continueFlow} style={({ pressed }) => [styles.authButton, styles.appleButton, pressed && styles.pressed]}>
              <Text style={styles.appleMark}>Apple</Text>
              <Text style={[styles.authText, styles.appleText]}>Continue with Apple</Text>
            </Pressable>

            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            {!emailOpen ? (
              <PrimaryButton label="Continue with Email" icon="edit" light onPress={() => setEmailOpen(true)} />
            ) : (
              <Card style={styles.emailCard}>
                <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={Colors.muted} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
                <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={Colors.muted} secureTextEntry style={styles.input} />
                <PrimaryButton label="Continue" onPress={continueFlow} disabled={!email || !password} />
              </Card>
            )}
          </Animated.View>

          <Text style={styles.join}>Join thousands on their skin journey</Text>
          <Text style={styles.terms}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    minHeight: '100%',
    paddingTop: 46,
    paddingBottom: Spacing.x5,
    paddingHorizontal: Spacing.x5,
  },
  botanical: {
    position: 'absolute',
    left: -52,
    top: 132,
    width: 86,
    height: 240,
    borderRadius: 80,
    backgroundColor: '#E8DDD4',
    opacity: 0.34,
  },
  sideGlow: {
    position: 'absolute',
    right: -116,
    top: 64,
    width: 190,
    height: 330,
    borderRadius: 160,
    backgroundColor: '#F2D9CF',
    opacity: 0.45,
  },
  hero: { alignItems: 'center', marginTop: Spacing.x5 },
  logo: { width: 220, height: 150 },
  tagline: {
    marginTop: Spacing.x2,
    maxWidth: 286,
    textAlign: 'center',
    fontFamily: Typography.serif,
    fontSize: 25,
    lineHeight: 34,
    color: Colors.text,
  },
  rule: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x3, marginTop: Spacing.x4 },
  ruleLine: { width: 56, height: 1, backgroundColor: Colors.line },
  features: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.x6 },
  feature: { width: '31%', alignItems: 'center', gap: Spacing.x2 },
  featureText: { fontFamily: Typography.sans, textAlign: 'center', fontSize: 11, lineHeight: 15, color: Colors.text },
  authStack: { marginTop: Spacing.x8, gap: Spacing.x3 },
  authButton: {
    height: 54,
    borderRadius: Radius.pill,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.x3,
    ...Shadows.soft,
  },
  appleButton: { backgroundColor: Colors.black },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  google: { fontSize: 21, fontWeight: '800', color: '#4285F4' },
  appleMark: { color: Colors.white, fontWeight: '800', fontSize: 12 },
  authText: { fontFamily: Typography.sans, fontSize: 16, color: Colors.text, fontWeight: '700' },
  appleText: { color: Colors.white },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x4, marginVertical: Spacing.x2 },
  orLine: { flex: 1, height: 1, backgroundColor: Colors.line },
  orText: { fontFamily: Typography.sans, color: Colors.muted, fontWeight: '700' },
  emailCard: { padding: Spacing.x4, gap: Spacing.x3, borderRadius: Radius.large },
  input: {
    height: 52,
    borderRadius: Radius.medium,
    backgroundColor: '#FBF7F4',
    borderWidth: 1,
    borderColor: Colors.line,
    paddingHorizontal: Spacing.x4,
    fontFamily: Typography.sans,
    color: Colors.text,
  },
  join: { marginTop: Spacing.x6, textAlign: 'center', fontFamily: Typography.sans, fontSize: 13, color: '#C77F72', fontWeight: '600' },
  terms: { marginTop: Spacing.x4, textAlign: 'center', fontFamily: Typography.sans, fontSize: 10, lineHeight: 15, color: Colors.muted },
});
