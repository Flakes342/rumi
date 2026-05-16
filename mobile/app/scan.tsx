import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Theme';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      {/* Background Face Image */}
      <Image 
        source={require('../assets/images/scan_face_1778924204369.png')} 
        style={styles.backgroundImage}
      />
      
      {/* Face Mapping Overlay Mock */}
      <View style={styles.mappingOverlay}>
        <View style={[styles.dot, { top: '40%', left: '30%' }]} />
        <View style={[styles.dot, { top: '35%', left: '70%' }]} />
        <View style={[styles.dot, { top: '65%', left: '45%' }]} />
        
        {/* Mock dotted lines (just borders for now or SVG) */}
        <View style={styles.dottedLineLeft} />
        <View style={styles.dottedLineRight} />
      </View>

      {/* Header Controls */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Scan your face</Text>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="close" size={24} color="#FFF" />
        </Pressable>
      </View>

      {/* Glassmorphic Bottom Sheet */}
      <View style={styles.bottomSheetContainer}>
        <BlurView intensity={80} tint="light" style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Special <Text style={{fontWeight: '700'}}>for you</Text></Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
            {/* Product 1 */}
            <View style={styles.productItem}>
              <View style={[styles.productBox, { backgroundColor: Colors.pastelBlue }]}>
                <Image source={require('../assets/images/product_serum_1778924224889.png')} style={styles.productImage} />
              </View>
              <View style={styles.addBadge}>
                <Ionicons name="add" size={12} color="#FFF" />
              </View>
            </View>

            {/* Product 2 */}
            <View style={styles.productItem}>
              <View style={[styles.productBox, { backgroundColor: Colors.pastelPeach }]}>
                <Image source={require('../assets/images/product_cream_1778924244807.png')} style={styles.productImage} />
              </View>
              <View style={styles.addBadge}>
                <Ionicons name="add" size={12} color="#FFF" />
              </View>
            </View>

            {/* Product 3 */}
            <View style={styles.productItem}>
              <View style={[styles.productBox, { backgroundColor: Colors.pastelLavender }]}>
                <Image source={require('../assets/images/product_cleanser_1778924269802.png')} style={styles.productImage} />
              </View>
              <View style={styles.addBadge}>
                <Ionicons name="add" size={12} color="#FFF" />
              </View>
            </View>
          </ScrollView>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>View all products</Text>
          </Pressable>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mappingOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  dottedLineLeft: {
    position: 'absolute',
    top: '35%',
    left: '20%',
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    borderStyle: 'dashed',
    borderRadius: 50,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  dottedLineRight: {
    position: 'absolute',
    top: '30%',
    right: '20%',
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    borderStyle: 'dashed',
    borderRadius: 60,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  bottomSheet: {
    borderRadius: 32,
    padding: 24,
    overflow: 'hidden',
  },
  sheetTitle: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  productList: {
    gap: 16,
    marginBottom: 24,
  },
  productItem: {
    position: 'relative',
  },
  productBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  addBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.charcoal,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.charcoal,
  },
});
