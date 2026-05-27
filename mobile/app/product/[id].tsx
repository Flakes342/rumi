import React from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Card, CircleIcon, Icon, PrimaryButton, ScreenContainer, haptic } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { products } from '@/constants/RumiData';
import { useRumiStore } from '@/store/useRumiStore';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id) || products[0];
  const { savedProducts, toggleSavedProduct, addToShelf } = useRumiStore();
  const saved = savedProducts.includes(product.id);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.round} onPress={() => router.back()}>
            <Icon name="back" />
          </Pressable>
          <Pressable
            style={styles.round}
            onPress={() => {
              haptic();
              toggleSavedProduct(product.id);
            }}
          >
            <Icon name={saved ? 'saved' : 'save'} color={saved ? '#B84E4A' : Colors.text} />
          </Pressable>
        </View>

        <View style={styles.imageShell}>
          <Image source={product.image} style={styles.image} />
        </View>

        <View>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>Rs {product.price}</Text>
        </View>

        <Card style={styles.compatibility}>
          <CircleIcon name="sparkle" tone={Colors.sage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{product.match}% compatible</Text>
            <Text style={styles.body}>{product.why}</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.body}>{product.ingredient}</Text>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Usage guidance</Text>
          <Text style={styles.body}>{product.usage}</Text>
          <View style={styles.placement}>
            <Icon name="routine" size={18} color="#C98276" />
            <Text style={styles.placementText}>{product.placement}</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Warnings</Text>
          {product.warnings.map((warning) => (
            <Text key={warning} style={styles.body}>{warning}</Text>
          ))}
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Suitable skin types</Text>
          <View style={styles.pills}>
            {product.suitableFor.map((item) => (
              <Text key={item} style={styles.pill}>{item}</Text>
            ))}
          </View>
        </Card>

        <View style={styles.actions}>
          <PrimaryButton label="Add to routine" icon="plus" light onPress={() => addToShelf(product.id)} />
          <PrimaryButton label="Open retailer" icon="arrow" onPress={() => Linking.openURL(product.retailers[0].url)} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 64, paddingBottom: 48, gap: Spacing.x5 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  round: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  imageShell: { height: 224, borderRadius: Radius.large, backgroundColor: '#FAF1ED', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...Shadows.soft },
  image: { width: '88%', height: '88%', resizeMode: 'contain' },
  brand: { fontFamily: Typography.sans, color: '#C98276', fontWeight: '900', fontSize: 13, textTransform: 'uppercase' },
  title: { marginTop: Spacing.x2, fontFamily: Typography.serif, color: Colors.text, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  price: { marginTop: Spacing.x3, fontFamily: Typography.sans, color: Colors.text, fontSize: 20, fontWeight: '900' },
  compatibility: { padding: Spacing.x5, flexDirection: 'row', gap: Spacing.x4, alignItems: 'center' },
  cardTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 18, fontWeight: '900' },
  body: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 15, lineHeight: 23 },
  section: { padding: Spacing.x5 },
  sectionTitle: { fontFamily: Typography.serif, color: Colors.text, fontSize: 23, fontWeight: '700' },
  placement: { marginTop: Spacing.x4, flexDirection: 'row', alignItems: 'center', gap: Spacing.x2 },
  placementText: { fontFamily: Typography.sans, color: Colors.text, fontWeight: '800', fontSize: 14 },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.x2, marginTop: Spacing.x4 },
  pill: { borderRadius: Radius.pill, backgroundColor: '#F4EEEA', paddingHorizontal: Spacing.x4, paddingVertical: Spacing.x2, fontFamily: Typography.sans, color: Colors.text, fontSize: 13, fontWeight: '800' },
  actions: { gap: Spacing.x3 },
});
