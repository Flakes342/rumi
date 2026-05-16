import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '@/constants/Theme';
import { router } from 'expo-router';

export default function RoutineScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.charcoal} />
        </Pressable>
        <Text style={styles.headerTitle}>Daily routine</Text>
        <View style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.charcoal} />
        </View>
      </View>

      {/* Calendar Strip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarStrip}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
          const isSelected = day === 'Tue'; // mock selected state
          const date = index + 5;
          return (
            <View key={day} style={[styles.dayItem, isSelected && styles.dayItemSelected]}>
              <Text style={[styles.dayDate, isSelected && styles.dayDateSelected]}>{date}</Text>
              <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Product List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.productList}>
        
        {/* Product 1 */}
        <View style={styles.productRow}>
          <View style={[styles.productCard, { backgroundColor: Colors.pastelBlue }]}>
            <Image 
              source={require('../assets/images/product_serum_1778924224889.png')} 
              style={styles.productImage} 
            />
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={14} color={Colors.charcoal} />
            </View>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Mineral UV{"\n"}Filters SPF</Text>
            <Text style={styles.productStep}>Step 2</Text>
          </View>
        </View>

        {/* Product 2 */}
        <View style={[styles.productRow, { flexDirection: 'row-reverse' }]}>
          <View style={[styles.productCard, { backgroundColor: Colors.pastelPeach }]}>
            <Image 
              source={require('../assets/images/product_cream_1778924244807.png')} 
              style={styles.productImage} 
            />
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={14} color={Colors.charcoal} />
            </View>
          </View>
          <View style={[styles.productInfo, { alignItems: 'flex-start' }]}>
            <Text style={styles.productName}>100% Organic{"\n"}Fruit Oil</Text>
            <Text style={styles.productStep}>Step 1</Text>
          </View>
        </View>

        {/* Product 3 */}
        <View style={styles.productRow}>
          <View style={[styles.productCard, { backgroundColor: Colors.pastelLavender }]}>
            <Image 
              source={require('../assets/images/product_cleanser_1778924269802.png')} 
              style={styles.productImage} 
            />
            <View style={[styles.checkCircle, styles.checkCircleEmpty]} />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Niacinamide{"\n"}10% + Zinc 1%</Text>
            <Text style={styles.productStep}>Step 3</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.soft,
  },
  calendarStrip: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 40,
  },
  dayItem: {
    width: 60,
    height: 80,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    ...Shadows.soft,
  },
  dayItemSelected: {
    backgroundColor: '#FFF',
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  dayDate: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  dayDateSelected: {
    color: Colors.charcoal,
  },
  dayText: {
    fontSize: 12,
    color: Colors.softGray,
  },
  dayTextSelected: {
    color: Colors.charcoal,
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: 24,
    gap: 40,
    paddingBottom: 100,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  productCard: {
    width: 140,
    height: 180,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  checkCircle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.soft,
  },
  checkCircleEmpty: {
    borderWidth: 1.5,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },
  productInfo: {
    flex: 1,
    gap: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.charcoal,
    lineHeight: 22,
  },
  productStep: {
    fontSize: 14,
    color: Colors.softGray,
  },
});
