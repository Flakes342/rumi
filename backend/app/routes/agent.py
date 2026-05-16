"""Rumi Agent routes — dummy conversational AI."""
from fastapi import APIRouter
from ..schemas import AgentMessage, AgentResponse

router = APIRouter()

KNOWLEDGE = {
    "niacinamide": "Niacinamide (Vitamin B3) is excellent for oil control, pore minimization, and barrier repair. Safe to combine with most ingredients except Vitamin C at high concentrations.",
    "retinol": "Retinol boosts cell turnover and collagen. Start low (0.3%) and build up. Avoid during pregnancy. Use only at night with SPF next morning.",
    "dry": "Dry skin needs humectants (hyaluronic acid, glycerin) and occlusives (ceramides, squalane). Avoid foaming cleansers and alcohol-based products.",
    "acne": "For acne-prone skin, look for salicylic acid, niacinamide, and benzoyl peroxide. Avoid comedogenic ingredients. Check products against your skin profile.",
}


@router.post("/chat", response_model=AgentResponse)
async def chat(message: AgentMessage):
    content = message.content.lower()

    # Simple keyword matching for dummy responses
    if "niacinamide" in content and "retinol" in content:
        reply = "Yes, you can use both! But I'd recommend separating them — niacinamide in the morning, retinol at night. Your sensitive skin (irritation risk: 74%) will handle them better this way. 💛"
    elif "dry" in content or "dehydrat" in content:
        reply = "Your skin feels dry because Delhi's humidity is only 42% today. Double up on hyaluronic acid and use a heavier moisturizer. Your barrier health is at 62%, so extra hydration will help repair it! 💧"
    elif "routine" in content and ("₹" in content or "budget" in content or "1500" in content):
        reply = "Here's a complete routine under ₹1500:\n\n☀️ Morning:\n1. Cetaphil Cleanser — ₹290\n2. Minimalist Niacinamide — ₹599\n3. Neutrogena Moisturizer — ₹350\n\n🌙 Evening:\n1. Simple Micellar Water — ₹275\n2. Same cleanser\n3. Dot & Key CICA Cream — ₹695\n\nAll safe for your sensitive skin! 🌸"
    elif "period" in content or "hormonal" in content or "cycle" in content:
        reply = "During your period, your skin produces more sebum due to hormonal shifts. I'd suggest:\n• Switch to a lighter moisturizer\n• Add salicylic acid 2-3 times/week\n• Don't start new actives during this phase\n\nYour hormonal breakout tendency is noted in your profile — I'll adjust recommendations accordingly. 🌙"
    elif "breakout" in content or "breaking out" in content:
        reply = "Breakouts can happen for many reasons. Based on your profile:\n• Check if you introduced a new product recently\n• Your barrier is slightly compromised (62%), which makes breakouts more likely\n• Stress level and sleep also play a role\n\nWant me to review your current routine for potential irritants? 🔍"
    else:
        reply = f"Great question! Based on your sensitive combination skin profile, here's what I think...\n\nYour skin barrier is at 62% health right now, so I'd focus on gentle, hydrating products. Avoid harsh actives for the next week or so.\n\nWant me to suggest specific products or adjust your routine? 💛"

    return AgentResponse(reply=reply)
