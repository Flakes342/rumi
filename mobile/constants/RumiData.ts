import { ImageSourcePropType } from 'react-native';

export type RetailerPrice = {
  name: string;
  price: number;
  url: string;
};

export type Product = {
  id: string;
  brand: string;
  name: string;
  category: string;
  ingredient: string;
  price: number;
  mrp?: number;
  discount?: string;
  match: number;
  badge?: string;
  image: ImageSourcePropType;
  imageUri: string;
  retailers: RetailerPrice[];
  why: string;
  warnings: string[];
  usage: string;
  placement: string;
  suitableFor: string[];
};

const serum = require('../assets/images/product_serum_1778924224889.png');
const cream = require('../assets/images/product_cream_1778924244807.png');
const cleanser = require('../assets/images/product_cleanser_1778924269802.png');

const retail = (name: string, price: number): RetailerPrice => ({
  name,
  price,
  url: `https://www.google.com/search?q=${encodeURIComponent(`${name} skincare`)}`,
});

export const products: Product[] = [
  {
    id: 'ordinary-niacinamide',
    brand: 'The Ordinary',
    name: 'Niacinamide 10% and Zinc 1% Serum',
    category: 'Serum',
    ingredient: 'Niacinamide 10%',
    price: 520,
    mrp: 650,
    discount: '20% off',
    match: 92,
    image: serum,
    imageUri: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900',
    retailers: [retail('Nykaa', 520), retail('Amazon', 549), retail('Tira', 575)],
    why: 'A strong fit for oil balancing while staying light enough for combination skin.',
    warnings: ['Introduce slowly if your barrier feels reactive.'],
    usage: 'Apply two to three drops after cleansing, then follow with moisturizer.',
    placement: 'Morning treatment step',
    suitableFor: ['Combination skin', 'Oiliness', 'Uneven tone'],
  },
  {
    id: 'lrp-cicaplast',
    brand: 'La Roche Posay',
    name: 'Cicaplast Baume B5+',
    category: 'Moisturizer',
    ingredient: 'Panthenol and madecassoside',
    price: 990,
    mrp: 1150,
    discount: '14% off',
    match: 90,
    image: cream,
    imageUri: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=900',
    retailers: [retail('Nykaa', 990), retail('Amazon', 1050), retail('Maccaron', 1120)],
    why: 'Barrier support for sensitive days when your cheeks feel tight or warm.',
    warnings: ['Use a pea sized layer if your T zone feels oily.'],
    usage: 'Smooth a thin layer over moisturizer or use as your final evening step.',
    placement: 'Evening moisturizer step',
    suitableFor: ['Sensitive skin', 'Barrier repair', 'Redness'],
  },
  {
    id: 'cosrx-snail',
    brand: 'COSRX',
    name: 'Advanced Snail 96 Mucin Power Essence',
    category: 'Essence',
    ingredient: 'Snail mucin',
    price: 1349,
    mrp: 1699,
    discount: '21% off',
    match: 88,
    image: serum,
    imageUri: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900',
    retailers: [retail('Nykaa', 1349), retail('Amazon', 1399), retail('Flipkart', 1499)],
    why: 'Adds cushiony hydration without heavy occlusion, useful in humid weather.',
    warnings: ['Patch test if you are sensitive to snail derived ingredients.'],
    usage: 'Pat one pump onto damp skin before serum or moisturizer.',
    placement: 'Hydrating essence step',
    suitableFor: ['Dehydration', 'Dullness', 'Barrier comfort'],
  },
  {
    id: 'minimalist-ha',
    brand: 'Minimalist',
    name: 'Hyaluronic Acid 2% Serum',
    category: 'Serum',
    ingredient: 'Hyaluronic acid',
    price: 599,
    match: 95,
    badge: 'New',
    image: serum,
    imageUri: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900',
    retailers: [retail('Nykaa', 599), retail('Amazon', 615), retail('Tira', 625)],
    why: 'A simple hydration booster for dehydrated combination skin.',
    warnings: ['Seal it with moisturizer so it does not leave skin tight.'],
    usage: 'Apply to damp skin before moisturizer.',
    placement: 'Hydration step',
    suitableFor: ['Dehydration', 'Sensitive skin', 'Humid climate'],
  },
  {
    id: 'isntree-green-tea',
    brand: 'Isntree',
    name: 'Green Tea Fresh Cleanser',
    category: 'Cleanser',
    ingredient: 'Green tea',
    price: 890,
    match: 93,
    badge: 'Trending',
    image: cleanser,
    imageUri: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900',
    retailers: [retail('Maccaron', 890), retail('Amazon', 930), retail('Nykaa', 940)],
    why: 'A calm cleanse for oilier areas without making cheeks feel stripped.',
    warnings: ['Avoid over cleansing if your barrier feels warm.'],
    usage: 'Massage for thirty seconds, then rinse with lukewarm water.',
    placement: 'Cleanse step',
    suitableFor: ['Combination skin', 'Oiliness', 'Sensitive skin'],
  },
  {
    id: 'reequil-ceramide',
    brand: "Re'equil",
    name: 'Ceramide and Hyaluronic Moisturizer',
    category: 'Moisturizer',
    ingredient: 'Ceramides',
    price: 750,
    match: 92,
    badge: 'Bestseller',
    image: cream,
    imageUri: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900',
    retailers: [retail('Nykaa', 750), retail('Amazon', 790), retail('Flipkart', 820)],
    why: 'Ceramide support that fits a barrier repair goal without feeling too rich.',
    warnings: ['Use less during very humid mornings.'],
    usage: 'Apply one pump after serum.',
    placement: 'Moisturizer step',
    suitableFor: ['Barrier repair', 'Dehydration', 'Sensitive skin'],
  },
];

export const educationCards = [
  {
    id: 'niacinamide-redness',
    label: 'Rumi insight',
    title: 'Niacinamide can help with your redness',
    subtitle: 'Learn why it works',
    image: serum,
  },
  {
    id: 'humid-moisturizers',
    label: 'New',
    title: 'Lightweight moisturizers for humid weather',
    subtitle: 'Five products for you',
    image: cream,
  },
  {
    id: 'retinol-barrier',
    label: 'Tip',
    title: 'Avoid pairing strong acids with retinol nights',
    subtitle: 'See what to use instead',
    image: cleanser,
  },
];
