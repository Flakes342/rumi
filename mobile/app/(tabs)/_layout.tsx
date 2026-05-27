import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Icon, RumiIconName } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Typography } from '@/constants/Theme';

const tabs: Record<string, { label: string; icon: RumiIconName }> = {
  index: { label: 'Home', icon: 'home' },
  discover: { label: 'Discover', icon: 'discover' },
  routine: { label: 'Routine', icon: 'routine' },
  agent: { label: 'Rumi', icon: 'rumi' },
  profile: { label: 'Profile', icon: 'profile' },
};

function TabIcon({ focused, route }: { focused: boolean; route: keyof typeof tabs }) {
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focused ? 1.08 : 1, { duration: 180 }) }],
  }));

  return (
    <Animated.View style={[styles.tabItem, style]}>
      <View style={[styles.iconShell, focused && styles.iconShellOn]}>
        <Icon name={tabs[route].icon} size={20} color={focused ? Colors.text : Colors.secondary} />
      </View>
      <Text style={[styles.label, focused && styles.labelOn]}>{tabs[route].label}</Text>
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} route={route.name as keyof typeof tabs} />,
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="routine" />
      <Tabs.Screen name="agent" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="recommender" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: Platform.OS === 'ios' ? 12 : 10,
    height: Platform.OS === 'ios' ? 70 : 64,
    borderRadius: 24,
    borderTopWidth: 0,
    backgroundColor: Colors.card,
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 14 : 8,
    ...Shadows.soft,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    width: 58,
  },
  iconShell: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconShellOn: {
    backgroundColor: '#F2ECE8',
  },
  label: {
    fontFamily: Typography.sans,
    fontSize: 10,
    color: Colors.secondary,
  },
  labelOn: {
    color: Colors.text,
    fontWeight: '700',
  },
});
