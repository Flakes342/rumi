/**
 * Rumi — Discover Feed
 * Beauty Pinterest energy, personalized product cards, editorial content.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '@/constants/Theme';
import { useRumiStore, DUMMY_PRODUCTS, DISCOVERY_CARDS } from '@/store/useRumiStore';

const { width } = Dimensions.get('window');

function ProductCard({ product, index }: { product: any; index: number }) {
  const { savedProducts, toggleSavedProduct } = useRumiStore();
  const isSaved = savedProducts.includes(product.id);
  const emoji = product.category === 'Serum' ? '💧' : product.category === 'Cleanser' ? '🫧' : product.category === 'Sunscreen' ? '☀️' : '🧴';

  return (
    <Animated.View entering={FadeInDown.delay(200 + index * 100).duration(500)}>
      <Pressable style={({ pressed }) => [pStyles.card, pressed && { opacity: 0.95 }]}>
        <LinearGradient colors={[Colors.cloud, Colors.blush]} style={pStyles.imgBox}>
          <Text style={{ fontSize: 48, opacity: 0.6 }}>{emoji}</Text>
          <Pressable style={pStyles.saveBtn} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); toggleSavedProduct(product.id); }}>
            <Text style={{ fontSize: 18, color: Colors.terracotta }}>{isSaved ? '♥' : '♡'}</Text>
          </Pressable>
        </LinearGradient>
        <View style={pStyles.info}>
          <View style={pStyles.matchBadge}><Text style={pStyles.matchText}>{product.matchScore}% match</Text></View>
          <Text style={pStyles.brand}>{product.brand}</Text>
          <Text style={pStyles.name} numberOfLines={2}>{product.name}</Text>
          <Text style={pStyles.why} numberOfLines={2}>{product.whyItWorks}</Text>
          <View style={pStyles.flagsRow}>
            {product.greenFlags.slice(0, 2).map((f: string) => (
              <View key={f} style={pStyles.gf}><Text style={pStyles.gfT}>✓ {f}</Text></View>
            ))}
            {product.redFlags.map((f: string) => (
              <View key={f} style={pStyles.rf}><Text style={pStyles.rfT}>⚠ {f}</Text></View>
            ))}
          </View>
          <Text style={pStyles.price}>₹{product.price}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const pStyles = StyleSheet.create({
  card: { backgroundColor: Colors.cardBg, borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadows.soft },
  imgBox: { height: 160, alignItems: 'center', justifyContent: 'center', position: 'relative' as const },
  saveBtn: { position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.glass, alignItems: 'center', justifyContent: 'center' },
  info: { padding: Spacing.md, gap: 3 },
  matchBadge: { alignSelf: 'flex-start', backgroundColor: Colors.sage + '20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, marginBottom: 4 },
  matchText: { fontSize: 11, fontWeight: '600', color: Colors.sage },
  brand: { fontSize: 11, fontWeight: '500', color: Colors.warmGray, textTransform: 'uppercase', letterSpacing: 0.5 },
  name: { fontSize: 15, fontWeight: '600', color: Colors.charcoal },
  why: { fontSize: 11, color: Colors.warmGray, marginTop: 2 },
  flagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  gf: { backgroundColor: Colors.greenFlag + '15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  gfT: { fontSize: 10, color: Colors.greenFlag, fontWeight: '500' },
  rf: { backgroundColor: Colors.redFlag + '15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  rfT: { fontSize: 10, color: Colors.redFlag, fontWeight: '500' },
  price: { fontSize: 15, fontWeight: '700', color: Colors.charcoal, marginTop: 8 },
});

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState('for-you');
  const tabs = [{ id: 'for-you', label: 'For You' }, { id: 'trending', label: 'Trending' }, { id: 'editorial', label: 'Editorial' }];

  return (
    <View style={s.container}>
      <LinearGradient colors={['#FFF8F0', '#FDFAF6']} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.delay(100).duration(400)}>
          <Text style={s.title}>Discover</Text>
          <Text style={s.subtitle}>Personalized for your sensitive combination skin</Text>
        </Animated.View>

        <View style={s.tabRow}>
          {tabs.map(t => (
            <Pressable key={t.id} style={[s.tab, activeTab === t.id && s.tabOn]} onPress={() => setActiveTab(t.id)}>
              <Text style={[s.tabText, activeTab === t.id && s.tabTextOn]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={s.callout}><Text style={s.calloutText}>✨ Because your skin is sensitive and dehydrated...</Text></View>

        <Text style={s.secTitle}>Explore</Text>
        {DISCOVERY_CARDS.slice(0, 4).map((card, i) => (
          <Animated.View key={card.id} entering={FadeInDown.delay(100 + i * 100).duration(500)}>
            <Pressable style={[s.editCard, { backgroundColor: card.color }]}>
              <Text style={{ fontSize: 36 }}>{card.emoji}</Text>
              <View style={{ flex: 1 }}><Text style={s.editTitle}>{card.title}</Text><Text style={s.editSub}>{card.subtitle}</Text></View>
            </Pressable>
          </Animated.View>
        ))}

        <Text style={[s.secTitle, { marginTop: 16 }]}>Recommended for you</Text>
        {DUMMY_PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scroll: { paddingTop: 72, paddingBottom: 64, paddingHorizontal: Spacing.lg, gap: 12 },
  title: { fontSize: 34, fontWeight: '600', color: Colors.charcoal },
  subtitle: { fontSize: 13, color: Colors.warmGray, marginBottom: 8 },
  tabRow: { flexDirection: 'row', gap: 4 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999 },
  tabOn: { backgroundColor: Colors.charcoal },
  tabText: { fontSize: 13, fontWeight: '500', color: Colors.warmGray },
  tabTextOn: { color: '#FFF' },
  callout: { backgroundColor: Colors.rose + '10', borderRadius: 16, padding: 12 },
  calloutText: { fontSize: 13, fontWeight: '500', color: Colors.charcoal },
  secTitle: { fontSize: 20, fontWeight: '600', color: Colors.charcoal, marginTop: 8 },
  editCard: { borderRadius: 24, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 16, ...Shadows.soft },
  editTitle: { fontSize: 15, fontWeight: '600', color: Colors.charcoal },
  editSub: { fontSize: 11, color: Colors.warmGray },
});
