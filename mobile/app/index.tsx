/**
 * Rumi — Welcome / Splash Screen
 *
 * Minimal. Soft animation. Floating gradients.
 * "Rumi — Your skin, understood."
 * Continue with Google / Continue with Apple
 */
import React, { useEffect } from 'react';
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
  interpolate,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

const { width, height } = Dimensions.get('window');

// Animated floating orb component
function FloatingOrb({
  size,
  color,
  initialX,
  initialY,
  delay,
}: {
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  delay: number;
}) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 1500 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 1500 }));
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          withTiming(20, { duration: 3000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: initialX,
          top: initialY,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

export default function WelcomeScreen() {
  const { setAuthenticated } = useRumiStore();

  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(30);
  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(20);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(30);

  useEffect(() => {
    // Staggered entrance animation
    logoOpacity.value = withDelay(400, withTiming(1, { duration: 1000 }));
    logoTranslateY.value = withDelay(
      400,
      withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) })
    );

    taglineOpacity.value = withDelay(900, withTiming(1, { duration: 800 }));
    taglineTranslateY.value = withDelay(
      900,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) })
    );

    buttonsOpacity.value = withDelay(1400, withTiming(1, { duration: 800 }));
    buttonsTranslateY.value = withDelay(
      1400,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) })
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  const handleContinue = () => {
    setAuthenticated(true);
    router.push('/onboarding');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF8F0', '#F5E6DA', '#E8D8CC', '#F5E6DA', '#FFF8F0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating orbs for depth */}
      <FloatingOrb size={180} color="rgba(232,196,184,0.15)" initialX={-40} initialY={height * 0.15} delay={0} />
      <FloatingOrb size={120} color="rgba(201,169,184,0.12)" initialX={width * 0.65} initialY={height * 0.1} delay={300} />
      <FloatingOrb size={200} color="rgba(184,201,184,0.1)" initialX={width * 0.3} initialY={height * 0.55} delay={600} />
      <FloatingOrb size={100} color="rgba(232,196,184,0.12)" initialX={width * 0.7} initialY={height * 0.65} delay={900} />
      <FloatingOrb size={140} color="rgba(245,230,218,0.2)" initialX={-20} initialY={height * 0.7} delay={400} />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo area */}
        <View style={styles.logoSection}>
          <Animated.View style={logoStyle}>
            <Text style={styles.logoText}>Rumi</Text>
          </Animated.View>

          <Animated.View style={taglineStyle}>
            <Text style={styles.tagline}>Your skin, understood.</Text>
          </Animated.View>
        </View>

        {/* Auth buttons */}
        <Animated.View style={[styles.buttonSection, buttonsStyle]}>
          <Pressable
            style={({ pressed }) => [
              styles.authButton,
              styles.googleButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.authButtonIcon}>G</Text>
            <Text style={styles.authButtonText}>Continue with Google</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.authButton,
              styles.appleButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleContinue}
          >
            <Text style={[styles.authButtonIcon, { color: '#FFF8F0' }]}>⌘</Text>
            <Text style={[styles.authButtonText, { color: '#FFF8F0' }]}>
              Continue with Apple
            </Text>
          </Pressable>

          <Text style={styles.termsText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: height * 0.3,
    paddingBottom: Spacing['3xl'],
  },
  logoSection: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: Typography.sizes.hero,
    fontWeight: Typography.weights.semibold,
    color: Colors.charcoal,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.light,
    color: Colors.warmGray,
    marginTop: Spacing.sm,
    letterSpacing: 0.5,
  },
  buttonSection: {
    gap: Spacing.sm,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.pill,
    gap: Spacing.sm,
  },
  googleButton: {
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.cloud,
  },
  appleButton: {
    backgroundColor: Colors.charcoal,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  authButtonIcon: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.charcoal,
  },
  authButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    color: Colors.charcoal,
  },
  termsText: {
    fontSize: Typography.sizes.xs,
    color: Colors.softGray,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
