"""
Rumi — Pydantic Schemas
Request/response models for the API.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ── Auth ─────────────────────────────────────────────────
class AuthRequest(BaseModel):
    provider: str  # google, apple
    token: str


class AuthResponse(BaseModel):
    access_token: str
    user_id: str
    is_new_user: bool


# ── Skin Profile ────────────────────────────────────────
class OnboardingData(BaseModel):
    name: Optional[str] = None
    age_range: Optional[str] = None
    skin_goals: Optional[list[str]] = None
    skin_type: Optional[str] = None
    sensitivity: Optional[str] = None
    acne_frequency: Optional[str] = None
    pigmentation: Optional[str] = None
    sleep_quality: Optional[str] = None
    water_intake: Optional[str] = None
    stress_level: Optional[str] = None
    city: Optional[str] = None
    pollution_exposure: Optional[str] = None
    tracks_cycle: Optional[str] = None
    has_pcos: Optional[str] = None
    hormonal_acne: Optional[str] = None
    budget: Optional[str] = None
    preferences: Optional[list[str]] = None


class SkinAnalysisResponse(BaseModel):
    skin_label: str
    summary: str
    priorities: list[str]
    barrier_health: float
    irritation_risk: float
    insights: list[str]


class SkinProfileResponse(BaseModel):
    skin_type: str
    sensitivity: str
    analysis: SkinAnalysisResponse


# ── Products ────────────────────────────────────────────
class ProductResponse(BaseModel):
    id: str
    name: str
    brand: str
    category: str
    price: float
    image_url: Optional[str] = None
    match_score: float
    why_it_works: str
    green_flags: list[str]
    red_flags: list[str]


class ProductDetailResponse(ProductResponse):
    description: Optional[str] = None
    ingredients: list[dict]
    buy_links: list[dict]


# ── Routines ────────────────────────────────────────────
class RoutineStepResponse(BaseModel):
    id: str
    order: int
    type: str
    name: str
    ingredient: Optional[str] = None
    why: str
    completed: bool = False


class RoutineResponse(BaseModel):
    id: str
    type: str
    steps: list[RoutineStepResponse]


# ── Agent ────────────────────────────────────────────────
class AgentMessage(BaseModel):
    content: str


class AgentResponse(BaseModel):
    reply: str
    sources: Optional[list[str]] = None


# ── Weather ──────────────────────────────────────────────
class WeatherResponse(BaseModel):
    humidity: int
    uv_index: int
    pollution: str
    temperature: int
    skin_advice: str
    city: str
