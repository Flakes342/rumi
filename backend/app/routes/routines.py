"""Routine routes with dummy data."""
from fastapi import APIRouter
from ..schemas import RoutineResponse, RoutineStepResponse

router = APIRouter()


@router.get("/morning", response_model=RoutineResponse)
async def get_morning_routine():
    return RoutineResponse(
        id="r-morning",
        type="morning",
        steps=[
            RoutineStepResponse(id="m1", order=1, type="cleanser", name="Gentle Cleanser", ingredient="Ceramides", why="Removes overnight buildup without stripping barrier"),
            RoutineStepResponse(id="m2", order=2, type="serum", name="Niacinamide Serum", ingredient="Niacinamide 10%", why="Controls oil and minimizes pores"),
            RoutineStepResponse(id="m3", order=3, type="moisturizer", name="Lightweight Moisturizer", ingredient="Hyaluronic Acid", why="Locks in hydration without heaviness"),
            RoutineStepResponse(id="m4", order=4, type="sunscreen", name="SPF 50 Sunscreen", ingredient="UV Filters", why="Protects from UV damage and dark spots"),
        ],
    )


@router.get("/evening", response_model=RoutineResponse)
async def get_evening_routine():
    return RoutineResponse(
        id="r-evening",
        type="evening",
        steps=[
            RoutineStepResponse(id="e1", order=1, type="cleanser", name="Oil Cleanser", ingredient="Jojoba Oil", why="Dissolves sunscreen and makeup gently"),
            RoutineStepResponse(id="e2", order=2, type="cleanser", name="Water-based Cleanser", ingredient="Salicylic Acid", why="Deep cleans pores without over-drying"),
            RoutineStepResponse(id="e3", order=3, type="treatment", name="Retinol Treatment", ingredient="Retinol 0.3%", why="Boosts cell renewal while you sleep"),
            RoutineStepResponse(id="e4", order=4, type="moisturizer", name="Barrier Repair Cream", ingredient="Ceramides + Peptides", why="Rebuilds skin barrier overnight"),
        ],
    )


@router.post("/{routine_id}/log")
async def log_routine(routine_id: str, completed_steps: list[str]):
    return {"status": "logged", "routine_id": routine_id, "steps": completed_steps}
