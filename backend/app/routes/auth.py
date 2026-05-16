"""Auth routes — dummy for now."""
from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
async def login():
    return {
        "access_token": "dummy-jwt-token",
        "user_id": "user-001",
        "is_new_user": True,
    }


@router.post("/register")
async def register():
    return {
        "access_token": "dummy-jwt-token",
        "user_id": "user-001",
        "is_new_user": True,
    }
