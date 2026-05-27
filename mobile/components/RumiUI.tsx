import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Gradients, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';

export const iconMap = {
  home: 'home',
  discover: 'compass',
  routine: 'droplet',
  rumi: 'message-circle',
  profile: 'heart',
  search: 'search',
  settings: 'settings',
  bell: 'bell',
  shield: 'shield',
  drop: 'droplet',
  leaf: 'feather',
  sparkle: 'star',
  lab: 'thermometer',
  save: 'bookmark',
  saved: 'heart',
  plus: 'plus',
  arrow: 'chevron-right',
  back: 'chevron-left',
  share: 'share',
  scan: 'maximize',
  check: 'check',
  sun: 'sun',
  moon: 'moon',
  chart: 'bar-chart-2',
  shelf: 'archive',
  edit: 'edit-2',
  wallet: 'credit-card',
  calendar: 'calendar',
  send: 'arrow-up',
  filter: 'sliders',
} as const;

export type RumiIconName = keyof typeof iconMap;

export function Icon({
  name,
  size = 20,
  color = Colors.text,
}: {
  name: RumiIconName;
  size?: number;
  color?: string;
}) {
  return <Feather name={iconMap[name] as any} size={size} color={color} strokeWidth={1.8} />;
}

export function haptic() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}

export function ScreenContainer({
  children,
  padded = true,
}: {
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={Gradients.screen} style={StyleSheet.absoluteFill} />
      <View style={[styles.screenInner, padded && styles.screenPadded]}>{children}</View>
    </View>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CircleIcon({
  name,
  tone = Colors.pink,
  size = 44,
}: {
  name: RumiIconName;
  tone?: string;
  size?: number;
}) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: `${tone}40` }]}>
      <Icon name={name} size={size * 0.38} color={Colors.text} />
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  icon,
  light,
  disabled,
}: {
  label: string;
  onPress: () => void;
  icon?: RumiIconName;
  light?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        haptic();
        onPress();
      }}
      style={({ pressed }) => [
        styles.primary,
        light && styles.primaryLight,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {icon && <Icon name={icon} color={light ? Colors.text : Colors.white} />}
      <Text style={[styles.primaryText, light && styles.primaryTextLight]}>{label}</Text>
    </Pressable>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
      {action && (
        <Pressable onPress={action} style={styles.headerAction}>
          <Text style={styles.headerActionText}>View all</Text>
          <Icon name="arrow" size={18} color={Colors.secondary} />
        </Pressable>
      )}
    </View>
  );
}

export function Orb({ size = 112, letter }: { size?: number; letter?: string }) {
  return (
    <LinearGradient colors={Gradients.orb} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.orb, { width: size, height: size, borderRadius: size / 2 }]}>
      {letter && <Text style={[styles.orbLetter, { fontSize: size * 0.44 }]}>{letter}</Text>}
    </LinearGradient>
  );
}

export function MetricPill({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <View style={styles.metricPill}>
      <View style={[styles.statusDot, { backgroundColor: tone }]} />
      <View>
        <Text style={styles.metricPillLabel}>{label}</Text>
        <Text style={styles.metricPillValue}>{value}</Text>
      </View>
    </View>
  );
}

export function ProductThumb({ source, size = 76 }: { source: ImageSourcePropType; size?: number }) {
  return (
    <View style={[styles.thumb, { width: size, height: size }]}>
      <Image source={source} style={styles.thumbImage} />
    </View>
  );
}

export function AnimatedIn({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  return (
    <Animated.View entering={FadeInDown.delay(80 + index * 60).duration(420)}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenInner: {
    flex: 1,
  },
  screenPadded: {
    paddingHorizontal: Spacing.x4,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadows.soft,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    minHeight: 48,
    borderRadius: Radius.pill,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.x2,
    paddingHorizontal: Spacing.x6,
  },
  primaryLight: {
    backgroundColor: '#F3ECE7',
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  primaryText: {
    color: Colors.white,
    fontFamily: Typography.sans,
    fontSize: Typography.sizes.body,
    fontWeight: '700',
  },
  primaryTextLight: {
    color: Colors.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.x4,
  },
  sectionTitle: {
    fontFamily: Typography.serif,
    fontSize: 20,
    color: Colors.text,
    fontWeight: '700',
  },
  sectionSubtitle: {
    marginTop: Spacing.x1,
    fontFamily: Typography.sans,
    fontSize: Typography.sizes.small,
    color: Colors.secondary,
    lineHeight: 19,
  },
  headerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.x1,
    paddingBottom: Spacing.x1,
  },
  headerActionText: {
    fontFamily: Typography.sans,
    fontSize: Typography.sizes.small,
    color: Colors.secondary,
    fontWeight: '600',
  },
  orb: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbLetter: {
    fontFamily: Typography.serif,
    color: Colors.white,
    fontWeight: '700',
  },
  metricPill: {
    flex: 1,
    alignItems: 'flex-start',
    gap: Spacing.x1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  metricPillLabel: {
    fontFamily: Typography.sans,
    fontSize: 12,
    color: Colors.text,
    fontWeight: '700',
  },
  metricPillValue: {
    marginTop: 2,
    fontFamily: Typography.sans,
    fontSize: 11,
    color: Colors.secondary,
  },
  thumb: {
    borderRadius: Radius.medium,
    backgroundColor: '#F4ECE7',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});
