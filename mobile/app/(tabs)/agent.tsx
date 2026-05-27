import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Card, CircleIcon, Icon, Orb, ScreenContainer, haptic } from '@/components/RumiUI';
import { Colors, Radius, Shadows, Spacing, Typography } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';

const prompts = [
  ['Why is my skin dry today?', 'Understand what your skin needs', 'drop'],
  ['Can I use niacinamide with retinol?', 'Check ingredient compatibility', 'lab'],
  ['Suggest a routine under Rs 1500', 'Get budget friendly routine picks', 'wallet'],
  ['Is this safe during periods?', 'Learn what works and what does not', 'calendar'],
];

const replies: Record<string, string> = {
  'Why is my skin dry today?': 'Your skin can feel dry today because low humidity pulls water from the outer barrier. Use hyaluronic acid on damp skin, then seal it with a ceramide moisturizer. Keep exfoliation paused tonight.',
  'Can I use niacinamide with retinol?': 'Yes. For sensitive combination skin, use niacinamide in the morning and retinol at night. Start retinol two nights a week and keep moisturizer close.',
  'Suggest a routine under Rs 1500': 'A calm budget routine could be a gentle cleanser, Minimalist niacinamide, a ceramide moisturizer, and a lightweight sunscreen. I would keep retinol out until your barrier feels steadier.',
  'Is this safe during periods?': 'During periods, skin can be more reactive. Keep actives gentle, avoid introducing new exfoliants, and prioritize hydration plus sunscreen.',
};

function BreathingOrb() {
  const scale = useSharedValue(1);
  React.useEffect(() => {
    scale.value = withRepeat(withTiming(1.08, { duration: 2200, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, []);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return <Animated.View style={style}><Orb size={64} /></Animated.View>;
}

export default function AgentScreen() {
  const { onboardingAnswers, chatMessages, addChatMessage } = useRumiStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const name = String(onboardingAnswers.name || 'Ayush');

  const send = (text: string) => {
    const message = text.trim();
    if (!message) return;
    haptic();
    addChatMessage('user', message);
    setInput('');
    setTimeout(() => {
      addChatMessage('rumi', replies[message] || 'I would keep this gentle for your current profile. Tell me the product name or ingredient list and I can place it in your routine with timing and cautions.');
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }, 650);
  };

  return (
    <ScreenContainer padded={false}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.topActions}>
            <Pressable style={styles.round}><Icon name="settings" /></Pressable>
            <Pressable style={styles.round}><Icon name="bell" /></Pressable>
          </View>
          <View style={styles.hero}>
            <BreathingOrb />
            <Text style={styles.title}>Rumi</Text>
            <Text style={styles.greeting}>Good morning, {name}</Text>
            <Text style={styles.subtitle}>I am your skincare companion. Ask me anything.</Text>
          </View>

          <Card style={styles.insight}>
            <CircleIcon name="sparkle" tone={Colors.pink} />
            <View style={{ flex: 1 }}>
              <Text style={styles.insightKicker}>Today's skin insight</Text>
              <Text style={styles.insightTitle}>Your skin looks a bit dehydrated.</Text>
              <Text style={styles.insightText}>Low humidity and late nights could be the reason.</Text>
            </View>
            <Pressable style={styles.details}>
              <Text style={styles.detailsText}>See details</Text>
              <Icon name="arrow" size={18} />
            </Pressable>
          </Card>

          {chatMessages.length === 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular questions</Text>
                <Text style={styles.seeAll}>See all</Text>
              </View>
              <View style={styles.promptStack}>
                {prompts.map(([title, subtitle, icon]) => (
                  <Pressable key={title} style={styles.promptCard} onPress={() => send(title)}>
                    <CircleIcon name={icon as any} tone={Colors.pink} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.promptTitle}>{title}</Text>
                      <Text style={styles.promptSubtitle}>{subtitle}</Text>
                    </View>
                    <View style={styles.promptArrow}><Icon name="arrow" size={18} /></View>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          <View style={styles.chatStack}>
            {chatMessages.map((message) => (
              <View key={message.id} style={[styles.messageRow, message.role === 'user' && styles.messageRowUser]}>
                <View style={[styles.bubble, message.role === 'user' ? styles.userBubble : styles.rumiBubble]}>
                  <Text style={[styles.messageText, message.role === 'user' && styles.userText]}>{message.content}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputPanel}>
          <View style={styles.inputRow}>
            <CircleIcon name="sparkle" tone={Colors.shell} size={54} />
            <TextInput value={input} onChangeText={setInput} placeholder="Ask Rumi anything..." placeholderTextColor={Colors.muted} multiline style={styles.input} />
            <Pressable disabled={!input.trim()} onPress={() => send(input)} style={[styles.send, !input.trim() && styles.sendDisabled]}>
              <Icon name="send" color={Colors.white} />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
            {['Acne help', 'Product review', 'Ingredient check'].map((pill) => (
              <Pressable key={pill} style={styles.pill} onPress={() => setInput(pill)}>
                <Text style={styles.pillText}>{pill}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingTop: 48, paddingHorizontal: Spacing.x4, paddingBottom: 172, gap: Spacing.x3 },
  topActions: { flexDirection: 'row', justifyContent: 'space-between' },
  round: { width: 54, height: 54, borderRadius: 27, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', ...Shadows.soft },
  hero: { alignItems: 'center' },
  title: { marginTop: Spacing.x1, fontFamily: Typography.serif, color: Colors.text, fontSize: 34, fontWeight: '700' },
  greeting: { marginTop: Spacing.x1, fontFamily: Typography.serif, color: Colors.text, fontSize: 18, fontWeight: '700' },
  subtitle: { marginTop: Spacing.x1, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 12 },
  insight: { padding: Spacing.x3, flexDirection: 'row', alignItems: 'center', gap: Spacing.x3 },
  insightKicker: { fontFamily: Typography.sans, color: '#C98276', fontSize: 14, fontWeight: '800' },
  insightTitle: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: Colors.text, fontSize: 17, fontWeight: '900' },
  insightText: { marginTop: Spacing.x2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 14 },
  details: { borderRadius: Radius.pill, backgroundColor: '#F4E9E5', paddingHorizontal: Spacing.x2, paddingVertical: Spacing.x2, flexDirection: 'row', alignItems: 'center', gap: Spacing.x1 },
  detailsText: { fontFamily: Typography.sans, color: Colors.text, fontWeight: '800', fontSize: 13 },
  sectionHeader: { marginTop: Spacing.x2, flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: { fontFamily: Typography.serif, color: Colors.text, fontSize: 19, fontWeight: '700' },
  seeAll: { fontFamily: Typography.sans, color: Colors.secondary, fontWeight: '700' },
  promptStack: { gap: Spacing.x4 },
  promptCard: { minHeight: 60, borderRadius: Radius.medium, backgroundColor: Colors.card, flexDirection: 'row', alignItems: 'center', gap: Spacing.x3, padding: Spacing.x3, ...Shadows.soft },
  promptTitle: { fontFamily: Typography.sans, color: Colors.text, fontSize: 13, fontWeight: '900' },
  promptSubtitle: { marginTop: 2, fontFamily: Typography.sans, color: Colors.secondary, fontSize: 11 },
  promptArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F4EEEA', alignItems: 'center', justifyContent: 'center' },
  chatStack: { gap: Spacing.x3 },
  messageRow: { alignItems: 'flex-start' },
  messageRowUser: { alignItems: 'flex-end' },
  bubble: { maxWidth: '86%', borderRadius: Radius.medium, padding: Spacing.x4 },
  rumiBubble: { backgroundColor: Colors.card, ...Shadows.soft },
  userBubble: { backgroundColor: Colors.black },
  messageText: { fontFamily: Typography.sans, color: Colors.text, fontSize: 15, lineHeight: 22 },
  userText: { color: Colors.white },
  inputPanel: { position: 'absolute', left: Spacing.x4, right: Spacing.x4, bottom: 82, borderRadius: Radius.medium, backgroundColor: Colors.card, padding: Spacing.x2, gap: Spacing.x2, ...Shadows.soft },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.x2 },
  input: { flex: 1, maxHeight: 56, fontFamily: Typography.sans, color: Colors.text, fontSize: 13, backgroundColor: '#FBF8F6', borderRadius: Radius.pill, paddingHorizontal: Spacing.x3, paddingVertical: Spacing.x2 },
  send: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#7D746D', alignItems: 'center', justifyContent: 'center' },
  sendDisabled: { opacity: 0.45 },
  pills: { gap: Spacing.x3 },
  pill: { borderRadius: Radius.pill, borderWidth: 1, borderColor: Colors.line, paddingHorizontal: Spacing.x4, paddingVertical: Spacing.x2 },
  pillText: { fontFamily: Typography.sans, color: Colors.text, fontWeight: '700', fontSize: 13 },
});
