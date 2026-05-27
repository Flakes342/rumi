import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Icon } from '@/components/RumiUI';
import { Colors, Radius, Spacing, Typography } from '@/constants/Theme';
import { products } from '@/constants/RumiData';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/scan_face_1778924204369.png')} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <View style={[styles.scanDot, { top: '38%', left: '31%' }]} />
        <View style={[styles.scanDot, { top: '35%', left: '68%' }]} />
        <View style={[styles.scanDot, { top: '62%', left: '46%' }]} />
      </View>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Icon name="back" color={Colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>Scan product</Text>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Icon name="check" color={Colors.white} />
        </Pressable>
      </View>
      <View style={styles.sheetWrap}>
        <BlurView intensity={76} tint="light" style={styles.sheet}>
          <Text style={styles.sheetTitle}>Ingredient check</Text>
          <Text style={styles.sheetText}>Point your camera at a product label. Rumi will read ingredients and flag routine placement.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.products}>
            {products.slice(0, 3).map((product) => (
              <Pressable key={product.id} style={styles.product} onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } } as any)}>
                <Image source={product.image} style={styles.productImage} />
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={styles.button} onPress={() => router.push('/(tabs)/discover')}>
            <Text style={styles.buttonText}>View compatible products</Text>
          </Pressable>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black },
  backgroundImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject },
  scanDot: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.white, borderWidth: 3, borderColor: 'rgba(255,255,255,0.45)' },
  header: { paddingTop: 64, paddingHorizontal: Spacing.x6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(31,27,24,0.28)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: Typography.sans, color: Colors.white, fontSize: 18, fontWeight: '800' },
  sheetWrap: { position: 'absolute', left: Spacing.x5, right: Spacing.x5, bottom: Spacing.x8 },
  sheet: { borderRadius: Radius.large, overflow: 'hidden', padding: Spacing.x6 },
  sheetTitle: { fontFamily: Typography.serif, color: Colors.text, fontSize: 30, fontWeight: '700', textAlign: 'center' },
  sheetText: { marginTop: Spacing.x3, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 14, lineHeight: 21, textAlign: 'center' },
  products: { gap: Spacing.x4, marginTop: Spacing.x5, marginBottom: Spacing.x5 },
  product: { width: 82, height: 82, borderRadius: Radius.medium, backgroundColor: 'rgba(255,255,255,0.74)', alignItems: 'center', justifyContent: 'center' },
  productImage: { width: '78%', height: '78%', resizeMode: 'contain' },
  button: { height: 56, borderRadius: Radius.pill, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontFamily: Typography.sans, color: Colors.text, fontWeight: '900', fontSize: 15 },
});
