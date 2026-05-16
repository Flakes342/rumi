"""Auth routes with typed contracts and provider validation."""
from uuid import uuid4

from fastapi import APIRouter, HTTPException, status

from ..schemas import AuthRequest, AuthResponse

router = APIRouter()


SUPPORTED_PROVIDERS = {"google", "apple"}


def _is_token_valid(token: str) -> bool:
    return bool(token and len(token.strip()) >= 12 and "." in token)


def _issue_auth_response() -> AuthResponse:
    user_id = str(uuid4())
    access_token = f"rumi.{uuid4()}"
    return AuthResponse(access_token=access_token, user_id=user_id, is_new_user=False)


@router.post("/login", response_model=AuthResponse)
async def login(payload: AuthRequest):
    provider = payload.provider.lower()
    if provider not in SUPPORTED_PROVIDERS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported provider")
    if not _is_token_valid(payload.token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid provider token")
    return _issue_auth_response()


@router.post("/register", response_model=AuthResponse)
async def register(payload: AuthRequest):
    provider = payload.provider.lower()
    if provider not in SUPPORTED_PROVIDERS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported provider")
    if not _is_token_valid(payload.token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid provider token")
    response = _issue_auth_response()
    response.is_new_user = True
    return response
