"""
Rumi — SQLAlchemy Models
Complete database schema for the skincare companion.
"""
from sqlalchemy import (
    Column, String, Text, Integer, Float, Boolean, DateTime, JSON, ForeignKey,
    UniqueConstraint, func
)
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import DeclarativeBase, relationship
import uuid
from datetime import datetime


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    name = Column(String)
    avatar_url = Column(String)
    auth_provider = Column(String)  # google, apple
    city = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    skin_profile = relationship("SkinProfile", back_populates="user", uselist=False)
    routines = relationship("Routine", back_populates="user")


class SkinProfile(Base):
    __tablename__ = "skin_profiles"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"), unique=True)

    age_range = Column(String)
    skin_type = Column(String)
    sensitivity = Column(String)
    acne_frequency = Column(String)
    pigmentation = Column(String)

    sleep_quality = Column(String)
    water_intake = Column(String)
    stress_level = Column(String)
    pollution_exposure = Column(String)

    tracks_menstrual_cycle = Column(Boolean, default=False)
    has_pcos = Column(Boolean, default=False)
    hormonal_acne = Column(String)

    budget_tier = Column(String)
    preferences = Column(JSON)
    skin_goals = Column(JSON)

    barrier_health_score = Column(Float)
    irritation_risk_score = Column(Float)
    skin_summary = Column(Text)
    skin_priorities = Column(JSON)

    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="skin_profile")


class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True)
    category = Column(String)
    comedogenic_rating = Column(Integer)
    irritancy_rating = Column(Integer)
    fungal_acne_safe = Column(Boolean)
    pregnancy_safe = Column(Boolean)
    description = Column(Text)
    benefits = Column(JSON)
    cautions = Column(JSON)


class Product(Base):
    __tablename__ = "products"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    brand = Column(String)
    category = Column(String)
    subcategory = Column(String)
    price = Column(Float)
    currency = Column(String, default="INR")
    image_url = Column(String)
    description = Column(Text)
    skin_types = Column(JSON)
    is_vegan = Column(Boolean)
    is_fragrance_free = Column(Boolean)
    country_of_origin = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


class ProductIngredient(Base):
    __tablename__ = "product_ingredients"

    product_id = Column(PGUUID(as_uuid=True), ForeignKey("products.id"), primary_key=True)
    ingredient_id = Column(PGUUID(as_uuid=True), ForeignKey("ingredients.id"), primary_key=True)
    position = Column(Integer)


class CompatibilityScore(Base):
    __tablename__ = "compatibility_scores"

    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    product_id = Column(PGUUID(as_uuid=True), ForeignKey("products.id"), primary_key=True)
    overall_score = Column(Float)
    acne_risk_score = Column(Float)
    irritation_score = Column(Float)
    barrier_compatibility = Column(Float)
    fungal_acne_safety = Column(Float)
    reasoning = Column(JSON)
    computed_at = Column(DateTime, default=datetime.utcnow)


class Routine(Base):
    __tablename__ = "routines"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"))
    type = Column(String)  # morning, evening
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="routines")
    steps = relationship("RoutineStep", back_populates="routine")


class RoutineStep(Base):
    __tablename__ = "routine_steps"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    routine_id = Column(PGUUID(as_uuid=True), ForeignKey("routines.id"))
    step_order = Column(Integer)
    step_type = Column(String)
    ingredient_focus = Column(String)
    why_recommended = Column(Text)
    product_id = Column(PGUUID(as_uuid=True), ForeignKey("products.id"), nullable=True)

    routine = relationship("Routine", back_populates="steps")


class RoutineLog(Base):
    __tablename__ = "routine_logs"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"))
    routine_id = Column(PGUUID(as_uuid=True), ForeignKey("routines.id"))
    completed_steps = Column(JSON)
    completed_at = Column(DateTime, default=datetime.utcnow)
    streak_count = Column(Integer, default=0)


class SavedProduct(Base):
    __tablename__ = "saved_products"

    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    product_id = Column(PGUUID(as_uuid=True), ForeignKey("products.id"), primary_key=True)
    shelf_category = Column(String)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class BuyLink(Base):
    __tablename__ = "buy_links"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(PGUUID(as_uuid=True), ForeignKey("products.id"))
    platform = Column(String)
    url = Column(String)
    affiliate_url = Column(String)
    price = Column(Float)
    in_stock = Column(Boolean, default=True)
    last_checked = Column(DateTime)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"))
    type = Column(String)
    title = Column(String)
    body = Column(Text)
    scheduled_at = Column(DateTime)
    sent_at = Column(DateTime)
    opened_at = Column(DateTime)


class AgentConversation(Base):
    __tablename__ = "agent_conversations"

    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"))
    messages = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
