import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '@/constants/Theme';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Ionicons name="heart" size={20} color={Colors.terracotta} />
          </View>
          <Text style={styles.points}>• 2648 points</Text>
          <Image 
            source={require('../../assets/images/avatar_1778924190238.png')} 
            style={styles.avatar} 
          />
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingTitle}>Hello <Text style={styles.greetingName}>Marta</Text>,</Text>
          <Text style={styles.greetingSubtitle}>Let's take care of your skin!</Text>
        </View>

        {/* Daily Routine Card */}
        <Pressable style={styles.routineCard} onPress={() => router.push('/routine')}>
          <View style={styles.routineLeft}>
            <View style={styles.routineIcon}>
              <Ionicons name="leaf-outline" size={20} color={Colors.charcoal} />
            </View>
            <Text style={styles.routineText}>Daily Routine</Text>
          </View>
          <View style={styles.routineRight}>
            <Text style={styles.routinePercentage}>70%</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </Pressable>

        {/* For You Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>For you</Text>
          <Text style={styles.viewMore}>View more ></Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.forYouList}>
          {/* Main Video Card */}
          <View style={styles.videoCard}>
            <Image 
              source={require('../../assets/images/scan_face_1778924204369.png')} 
              style={styles.videoImage}
            />
            <View style={styles.videoOverlay}>
              <View style={styles.timeTag}>
                <Ionicons name="time-outline" size={12} color={Colors.charcoal} />
                <Text style={styles.timeText}>3 min</Text>
              </View>
              <View style={styles.playButton}>
                <Ionicons name="play" size={16} color={Colors.terracotta} />
              </View>
              <View style={styles.titleTag}>
                <Text style={styles.videoTitle}>5 advices for{"\n"}your skincare{"\n"}routine</Text>
              </View>
            </View>
          </View>

          {/* Secondary Card (Decorative) */}
          <View style={[styles.videoCard, { width: width * 0.4, opacity: 0.5 }]}>
            <Image 
              source={require('../../assets/images/product_serum_1778924224889.png')} 
              style={styles.videoImage}
            />
          </View>
        </ScrollView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Very light grey/white background
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120, // Space for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.soft,
  },
  points: {
    fontSize: 14,
    color: Colors.softGray,
    fontWeight: '500',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetingContainer: {
    marginBottom: 30,
  },
  greetingTitle: {
    fontSize: 32,
    color: Colors.charcoal,
    fontWeight: '400',
  },
  greetingName: {
    fontWeight: '700',
  },
  greetingSubtitle: {
    fontSize: 16,
    color: Colors.softGray,
    marginTop: 4,
  },
  routineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 40,
    ...Shadows.soft,
  },
  routineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0ECE8',
  },
  routineText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  routineRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routinePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.softGray,
  },
  progressBar: {
    width: 40,
    height: 6,
    backgroundColor: Colors.cloud,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#9A8CFA', // Purple from the design
    borderRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  viewMore: {
    fontSize: 14,
    color: Colors.softGray,
  },
  forYouList: {
    gap: 16,
  },
  videoCard: {
    width: width * 0.65,
    height: width * 0.85,
    borderRadius: 32,
    overflow: 'hidden',
  },
  videoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  playButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.soft,
  },
  titleTag: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    ...Shadows.soft,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.charcoal,
    lineHeight: 20,
  },
});
