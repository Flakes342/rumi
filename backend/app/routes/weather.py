"""Weather routes with dummy data."""
from fastapi import APIRouter
from ..schemas import WeatherResponse

router = APIRouter()


@router.get("/", response_model=WeatherResponse)
async def get_weather(city: str = "Delhi"):
    # Dummy weather data — will integrate OpenWeatherMap later
    weather_data = {
        "Delhi": WeatherResponse(humidity=42, uv_index=7, pollution="Moderate", temperature=38, skin_advice="Delhi is extra dry today. Focus on hydration and don't skip sunscreen.", city="Delhi"),
        "Mumbai": WeatherResponse(humidity=78, uv_index=9, pollution="Low", temperature=33, skin_advice="Mumbai's humidity is high — use a lightweight, non-comedogenic moisturizer. UV is intense, SPF is essential.", city="Mumbai"),
        "Bangalore": WeatherResponse(humidity=55, uv_index=6, pollution="Low", temperature=28, skin_advice="Pleasant weather today. Your regular routine should work well.", city="Bangalore"),
    }
    return weather_data.get(city, weather_data["Delhi"])


@router.get("/skin-forecast")
async def skin_forecast(city: str = "Delhi"):
    return {
        "city": city,
        "forecast": [
            {"day": "Today", "risk": "moderate", "advice": "Focus on hydration"},
            {"day": "Tomorrow", "risk": "high", "advice": "High UV — double SPF application"},
            {"day": "Day 3", "risk": "low", "advice": "Great skin day — maintain routine"},
        ],
    }
