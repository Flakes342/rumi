/**
 * Rumi — Tab Navigation Layout
 * Premium floating tab bar with central FAB
 */
import React from 'react';
import { Tabs, router } from 'expo-router';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { Colors, Shadows } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 70 : 65,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 35,
          paddingBottom: 0,
          ...Shadows.medium,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={24} 
              color={focused ? Colors.charcoal : Colors.softGray} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'chatbubble' : 'chatbubble-outline'} 
              size={24} 
              color={focused ? Colors.charcoal : Colors.softGray} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan_placeholder"
        options={{
          tabBarButton: (props) => (
            <Pressable 
              style={styles.fabContainer} 
              onPress={() => router.push('/scan')}
            >
              <View style={styles.fab}>
                <Ionicons name="scan" size={24} color="#FFFFFF" />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="agent"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'hexagon' : 'hexagon-outline'} 
              size={24} 
              color={focused ? Colors.charcoal : Colors.softGray} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? 'heart' : 'heart-outline'} 
              size={24} 
              color={focused ? Colors.charcoal : Colors.softGray} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E1E1E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
