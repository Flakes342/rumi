/**
 * Rumi — AI Agent Chat
 * "Smart skincare bestie" — NOT ChatGPT.
 * Floating orb, emotional states, conversational UI.
 */
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '@/constants/Theme';
import { useRumiStore } from '@/store/useRumiStore';
import { useEffect } from 'react';

function PulsingOrb() {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withSequence(
      withTiming(1.08, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
    ), -1, true);
  }, []);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[orbS.wrap, style]}>
      <LinearGradient colors={['#E8C4B8', '#C9A9B8', '#B8C9B8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={orbS.gradient} />
    </Animated.View>
  );
}

const orbS = StyleSheet.create({
  wrap: { width: 64, height: 64, borderRadius: 32, overflow: 'hidden', alignSelf: 'center', marginBottom: 8 },
  gradient: { width: '100%', height: '100%' },
});

const QUICK_PROMPTS = [
  'Why is my skin dry today?',
  'Can I use niacinamide with retinol?',
  'Suggest a routine under ₹1500',
  'Is this safe during periods?',
];

const DUMMY_REPLIES: Record<string, string> = {
  default: "I'd love to help with that! Based on your sensitive combination skin profile, here's what I think...\n\nYour skin barrier is slightly compromised right now, so I'd suggest focusing on gentle, hydrating products. Avoid harsh actives for the next week or so. 💛",
  'Why is my skin dry today?': "Great question! 💧 Delhi's humidity is at 42% today — that's quite low for your skin type.\n\nYour combination skin loses moisture faster in dry air. I'd suggest:\n• Double up on hyaluronic acid serum\n• Use a heavier moisturizer today\n• Mist throughout the day\n\nYour barrier health is at 62%, so extra hydration will help repair it too! 🌸",
  'Can I use niacinamide with retinol?': "Yes, you can! But with your sensitive skin, I'd recommend using them at different times. 🌙\n\n• Niacinamide → Morning routine\n• Retinol → Evening routine\n\nThis way your skin gets both benefits without irritation. Start with retinol 2-3 nights/week and build up slowly.\n\nYour irritation risk is 74%, so going slow is key! 💛",
  'Suggest a routine under ₹1500': "Absolutely! Here's a complete routine within budget: 💚\n\n☀️ Morning:\n1. Cetaphil Gentle Cleanser — ₹290\n2. Minimalist Niacinamide 10% — ₹599\n3. Neutrogena Oil-Free Moisturizer — ₹350\n4. UV Doux Sunscreen — ₹390\n\nTotal: ~₹1,629 (close!)\n\nAll products are fragrance-free and safe for your sensitive barrier. 🌸",
};

export default function AgentScreen() {
  const { agentMessages, addAgentMessage } = useRumiStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const hour = new Date().getHours();
  const mood = hour < 12 ? 'Good morning! ☀️' : hour < 18 ? 'Hey there! 🌸' : 'Evening vibes 🌙';

  const sendMessage = (text: string) => {
    const msg = text.trim();
    if (!msg) return;
    addAgentMessage('user', msg);
    setInput('');
    setTimeout(() => {
      const reply = DUMMY_REPLIES[msg] || DUMMY_REPLIES.default;
      addAgentMessage('agent', reply);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1000);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView style={st.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <LinearGradient colors={['#FFF8F0', '#FDFAF6']} style={StyleSheet.absoluteFill} />

      <ScrollView ref={scrollRef} contentContainerStyle={st.scroll} showsVerticalScrollIndicator={false}>
        {/* Header with orb */}
        <View style={st.header}>
          <PulsingOrb />
          <Text style={st.title}>Rumi</Text>
          <Text style={st.subtitle}>{mood} I'm your skincare bestie.</Text>
        </View>

        {/* Empty state */}
        {agentMessages.length === 0 && (
          <Animated.View entering={FadeInDown.delay(300).duration(500)} style={st.emptyState}>
            <Text style={st.emptyTitle}>Ask me anything about skincare</Text>
            <View style={st.promptsGrid}>
              {QUICK_PROMPTS.map((p, i) => (
                <Animated.View key={p} entering={FadeInDown.delay(400 + i * 80).duration(400)}>
                  <Pressable style={({ pressed }) => [st.promptPill, pressed && { opacity: 0.8 }]} onPress={() => sendMessage(p)}>
                    <Text style={st.promptText}>{p}</Text>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Messages */}
        {agentMessages.map((msg, i) => (
          <Animated.View key={i} entering={FadeInDown.duration(300)} style={[st.msgRow, msg.role === 'user' && st.msgRowUser]}>
            <View style={[st.bubble, msg.role === 'user' ? st.userBubble : st.agentBubble]}>
              <Text style={[st.msgText, msg.role === 'user' && st.userMsgText]}>{msg.content}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={st.inputRow}>
        <TextInput style={st.input} value={input} onChangeText={setInput} placeholder="Ask Rumi anything..." placeholderTextColor={Colors.softGray} multiline onSubmitEditing={() => sendMessage(input)} />
        <Pressable style={[st.sendBtn, !input.trim() && { opacity: 0.4 }]} onPress={() => sendMessage(input)} disabled={!input.trim()}>
          <Text style={st.sendText}>↑</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cream },
  scroll: { paddingTop: 72, paddingBottom: 16, paddingHorizontal: Spacing.lg, gap: 12 },
  header: { alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '600', color: Colors.charcoal },
  subtitle: { fontSize: 13, color: Colors.warmGray, marginTop: 4 },
  emptyState: { alignItems: 'center', gap: 16, marginTop: 24 },
  emptyTitle: { fontSize: 15, fontWeight: '500', color: Colors.warmGray },
  promptsGrid: { gap: 8, width: '100%' },
  promptPill: { backgroundColor: Colors.cardBg, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: Colors.cloud },
  promptText: { fontSize: 14, color: Colors.charcoal, fontWeight: '500' },
  msgRow: { alignItems: 'flex-start' },
  msgRowUser: { alignItems: 'flex-end' },
  bubble: { maxWidth: '85%', padding: 14, borderRadius: 20 },
  userBubble: { backgroundColor: Colors.charcoal, borderBottomRightRadius: 6 },
  agentBubble: { backgroundColor: Colors.cardBg, borderBottomLeftRadius: 6, ...Shadows.soft },
  msgText: { fontSize: 14, color: Colors.charcoal, lineHeight: 21 },
  userMsgText: { color: '#FFFFFF' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 16, paddingBottom: Platform.OS === 'ios' ? 32 : 16, paddingTop: 8, gap: 8, backgroundColor: Colors.cream },
  input: { flex: 1, backgroundColor: Colors.cardBg, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: Colors.charcoal, maxHeight: 100, borderWidth: 1, borderColor: Colors.cloud },
  sendBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.charcoal, alignItems: 'center', justifyContent: 'center' },
  sendText: { fontSize: 18, color: '#FFF', fontWeight: '700' },
});
