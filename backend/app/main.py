"""
Rumi Backend — FastAPI Application
Skincare companion API: profiles, recommendations, routines, agent.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import auth, profiles, products, routines, agent, weather

app = FastAPI(
    title="Rumi API",
    description="Your skin, understood. Personalized skincare companion API.",
    version="1.0.0",
)

# CORS — allow mobile app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ───────────────────────────────────────────────
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(profiles.router, prefix="/api/profiles", tags=["profiles"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(routines.router, prefix="/api/routines", tags=["routines"])
app.include_router(agent.router, prefix="/api/agent", tags=["agent"])
app.include_router(weather.router, prefix="/api/weather", tags=["weather"])


@app.get("/")
async def root():
    return {"message": "🌙 Rumi API — Your skin, understood."}


@app.get("/health")
async def health():
    return {"status": "healthy"}
