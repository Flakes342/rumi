import React, { useMemo, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Card, CircleIcon, Icon, ScreenContainer, SectionHeader, haptic } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { Product, products } from '@/constants/RumiData';
import { useRumiStore } from '@/store/useRumiStore';

function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const { savedProducts, toggleSavedProduct, addToShelf } = useRumiStore();
  const saved = savedProducts.includes(product.id);

  return (
    <Pressable style={[styles.productCard, compact && styles.compactCard]} onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } } as any)}>
      <View style={styles.productImageWrap}>
        {(product.discount || product.badge) && <Text style={styles.badge}>{product.discount || product.badge}</Text>}
        <Pressable
          style={styles.saveButton}
          onPress={() => {
            haptic();
            toggleSavedProduct(product.id);
          }}
        >
          <Icon name={saved ? 'saved' : 'save'} size={20} color={saved ? '#B84E4A' : Colors.text} />
        </Pressable>
        <Image source={product.image} style={styles.productImage} />
      </View>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.match}>{product.match}% match</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>Rs {product.price}</Text>
        {product.mrp && <Text style={styles.mrp}>Rs {product.mrp}</Text>}
      </View>
      {!compact && (
        <View style={styles.retailers}>
          {product.retailers.slice(0, 3).map((retailer) => (
            <View key={retailer.name} style={styles.retailerRow}>
              <Text style={styles.retailer}>{retailer.name}</Text>
              <Text style={styles.retailerPrice}>Rs {retailer.price}</Text>
            </View>
          ))}
        </View>
      )}
      <Pressable
        style={styles.productAction}
        onPress={() => compact ? addToShelf(product.id) : Linking.openURL(product.retailers[0].url)}
      >
        <Text style={styles.productActionText}>{compact ? 'Add to routine' : 'View product'}</Text>
        <Icon name={compact ? 'plus' : 'arrow'} size={18} />
      </Pressable>
    </Pressable>
  );
}

export default function DiscoverScreen() {
  const [query, setQuery] = useState('');
  const { savedProducts } = useRumiStore();
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;
    return products.filter((product) =>
      [product.name, product.brand, product.ingredient, product.category].join(' ').toLowerCase().includes(normalized)
    );
  }, [query]);
  const saved = products.filter((product) => savedProducts.includes(product.id));

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Smart picks, best deals and products your skin will love.</Text>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Icon name="search" color={Colors.secondary} />
            <TextInput value={query} onChangeText={setQuery} placeholder="Search for products, brands or ingredients" placeholderTextColor={Colors.secondary} style={styles.searchInput} />
          </View>
          <Pressable style={styles.filter}>
            <Icon name="filter" />
          </Pressable>
        </View>

        <SectionHeader title="Best deals" subtitle="Top offers across trusted platforms" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontal}>
          {filtered.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
        </ScrollView>

        <SectionHeader title="For you" subtitle="AI picks tailored to your skin and goals" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontal}>
          {filtered.slice(3).map((product) => <ProductCard key={product.id} product={product} compact />)}
        </ScrollView>

        <SectionHeader title="Saved products" subtitle="Your saved favorites" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.savedRow}>
          {(saved.length ? saved : products.slice(0, 4)).map((product) => (
            <Pressable key={product.id} style={styles.savedCard} onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } } as any)}>
              <Image source={product.image} style={styles.savedImage} />
              <Text style={styles.savedTitle}>{product.brand}</Text>
              <Text style={styles.savedName}>{product.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 50, paddingBottom: 88, gap: Spacing.x4 },
  title: { fontFamily: Typography.sans, fontSize: 30, color: Colors.text, fontWeight: '900' },
  subtitle: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 15, lineHeight: 22 },
  searchRow: { flexDirection: 'row', gap: Spacing.x3 },
  searchBox: { flex: 1, height: 44, borderRadius: Radius.pill, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.line, paddingHorizontal: Spacing.x3, flexDirection: 'row', alignItems: 'center', gap: Spacing.x2, ...Shadows.soft },
  searchInput: { flex: 1, fontFamily: Typography.sans, fontSize: 14, color: Colors.text },
  filter: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.line, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  horizontal: { gap: Spacing.x4, paddingRight: Spacing.x6 },
  productCard: { width: 170, borderRadius: Radius.medium, backgroundColor: Colors.card, padding: Spacing.x2, ...Shadows.soft },
  compactCard: { width: 162 },
  productImageWrap: { height: 104, borderRadius: Radius.small, backgroundColor: '#FAF4F1', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  productImage: { width: '88%', height: '88%', resizeMode: 'contain' },
  badge: { position: 'absolute', left: Spacing.x3, top: Spacing.x3, zIndex: 2, borderRadius: Radius.pill, backgroundColor: '#FFF4F2', paddingHorizontal: Spacing.x3, paddingVertical: 5, fontFamily: Typography.sans, color: '#B84E4A', fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  saveButton: { position: 'absolute', right: Spacing.x3, top: Spacing.x3, zIndex: 2, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.82)', alignItems: 'center', justifyContent: 'center' },
  brand: { marginTop: Spacing.x3, fontFamily: Typography.sans, fontSize: 13, color: Colors.text, fontWeight: '900' },
  productName: { marginTop: 3, minHeight: 32, fontFamily: Typography.sans, fontSize: 12, lineHeight: 16, color: Colors.text, fontWeight: '700' },
  match: { alignSelf: 'flex-start', marginTop: Spacing.x2, borderRadius: Radius.pill, backgroundColor: '#E7F1E5', paddingHorizontal: Spacing.x2, paddingVertical: 4, fontFamily: Typography.sans, color: '#5F945F', fontSize: 11, fontWeight: '900' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x2, marginTop: Spacing.x2 },
  price: { fontFamily: Typography.sans, color: Colors.text, fontSize: 14, fontWeight: '900' },
  mrp: { fontFamily: Typography.sans, color: Colors.muted, fontSize: 13, textDecorationLine: 'line-through' },
  retailers: { marginTop: Spacing.x2, gap: 3 },
  retailerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  retailer: { fontFamily: Typography.sans, color: Colors.text, fontSize: 12, fontWeight: '700' },
  retailerPrice: { fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12 },
  productAction: { marginTop: Spacing.x2, height: 34, borderRadius: Radius.pill, backgroundColor: '#F4EEEA', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.x1 },
  productActionText: { fontFamily: Typography.sans, color: Colors.text, fontSize: 11, fontWeight: '900' },
  savedRow: { gap: Spacing.x3, paddingRight: Spacing.x6 },
  savedCard: { width: 152, borderRadius: Radius.medium, backgroundColor: Colors.card, padding: Spacing.x3, ...Shadows.soft },
  savedImage: { width: '100%', height: 110, resizeMode: 'contain', backgroundColor: '#FAF4F1', borderRadius: Radius.small },
  savedTitle: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: Colors.text, fontSize: 12, fontWeight: '900' },
  savedName: { marginTop: 2, fontFamily: Typography.sans, color: Colors.text, fontSize: 12, lineHeight: 17 },
});
