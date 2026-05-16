import os


def get_allowed_origins() -> list[str]:
    raw = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:8081,http://127.0.0.1:8081")
    return [origin.strip() for origin in raw.split(",") if origin.strip()]
