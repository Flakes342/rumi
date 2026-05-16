"""Skin profile routes with dummy analysis engine."""
from fastapi import APIRouter
from ..schemas import OnboardingData, SkinAnalysisResponse, SkinProfileResponse

router = APIRouter()


def analyze_skin(data: OnboardingData) -> SkinAnalysisResponse:
    """Deterministic skin analysis from onboarding data."""
    # Barrier health: lower if sensitive + stressed + poor sleep
    barrier = 80.0
    if data.sensitivity in ("high", "extreme"):
        barrier -= 15
    if data.stress_level in ("high", "extreme"):
        barrier -= 8
    if data.sleep_quality in ("poor", "terrible"):
        barrier -= 5
    if data.pollution_exposure == "high":
        barrier -= 5

    # Irritation risk
    irritation = 30.0
    if data.sensitivity in ("high", "extreme"):
        irritation += 25
    if data.acne_frequency in ("often", "always"):
        irritation += 15
    if data.hormonal_acne in ("always", "sometimes"):
        irritation += 10

    # Priorities
    priorities = []
    if data.skin_type in ("dry", "combination") or data.water_intake == "low":
        priorities.append("Hydration")
    if barrier < 70:
        priorities.append("Barrier repair")
    if data.skin_type in ("oily", "combination"):
        priorities.append("Oil balancing")
    if data.acne_frequency in ("often", "always"):
        priorities.append("Acne control")
    if data.pigmentation in ("moderate", "severe"):
        priorities.append("Brightening")
    if not priorities:
        priorities = ["Maintenance", "Prevention"]

    # Skin label
    parts = []
    if data.sensitivity in ("high", "extreme"):
        parts.append("Sensitive")
    if data.water_intake == "low":
        parts.append("dehydrated")
    parts.append(data.skin_type or "combination")
    parts.append("skin")
    skin_label = " ".join(parts)

    # Insights
    insights = []
    if barrier < 70:
        insights.append("Barrier slightly compromised — gentle products recommended")
    if irritation > 60:
        insights.append("High irritation risk — avoid harsh actives for now")
    if data.hormonal_acne in ("always", "sometimes"):
        insights.append("Hormonal breakout tendency — cycle-aware care recommended")
    insights.append("Daily SPF 50+ is essential for your skin")
    if data.water_intake == "low":
        insights.append("Dehydrated skin type — humectants are your best friend")

    return SkinAnalysisResponse(
        skin_label=skin_label,
        summary=f"Your {skin_label} needs focused attention on {', '.join(priorities[:2]).lower()}.",
        priorities=priorities[:4],
        barrier_health=max(barrier, 20),
        irritation_risk=min(irritation, 95),
        insights=insights,
    )


@router.post("/onboarding", response_model=SkinAnalysisResponse)
async def submit_onboarding(data: OnboardingData):
    return analyze_skin(data)


@router.get("/me", response_model=SkinProfileResponse)
async def get_profile():
    return SkinProfileResponse(
        skin_type="combination",
        sensitivity="high",
        analysis=SkinAnalysisResponse(
            skin_label="Sensitive dehydrated combination skin",
            summary="Your skin tells a story of sensitivity and dehydration.",
            priorities=["Hydration", "Barrier repair", "Oil balancing"],
            barrier_health=62,
            irritation_risk=74,
            insights=[
                "Barrier slightly compromised",
                "High irritation risk",
                "Hormonal breakout tendency",
            ],
        ),
    )
