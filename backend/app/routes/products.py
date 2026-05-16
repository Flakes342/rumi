"""Product routes with dummy data."""
from fastapi import APIRouter
from ..schemas import ProductResponse

router = APIRouter()

DUMMY_PRODUCTS = [
    ProductResponse(id="1", name="Minimalist 10% Niacinamide Serum", brand="Minimalist", category="Serum", price=599, match_score=94, why_it_works="Low comedogenic risk + excellent oil control.", green_flags=["Fragrance-free", "Non-comedogenic"], red_flags=[]),
    ProductResponse(id="2", name="Cetaphil Gentle Skin Cleanser", brand="Cetaphil", category="Cleanser", price=450, match_score=91, why_it_works="Ultra-gentle formula for sensitive skin.", green_flags=["pH balanced", "Fragrance-free"], red_flags=[]),
    ProductResponse(id="3", name="La Shield SPF 50 Sunscreen", brand="La Shield", category="Sunscreen", price=780, match_score=89, why_it_works="High UV protection without white cast.", green_flags=["No white cast", "SPF 50+"], red_flags=["Contains fragrance"]),
    ProductResponse(id="4", name="Bioderma Sensibio Micellar Water", brand="Bioderma", category="Cleanser", price=1150, match_score=87, why_it_works="Cleanses without disrupting barrier.", green_flags=["Alcohol-free", "Hypoallergenic"], red_flags=[]),
    ProductResponse(id="5", name="Dot & Key CICA Calming Moisturizer", brand="Dot & Key", category="Moisturizer", price=695, match_score=86, why_it_works="CICA repairs barrier damage.", green_flags=["Barrier repair", "Lightweight"], red_flags=["Contains fragrance"]),
]


@router.get("/", response_model=list[ProductResponse])
async def list_products():
    return DUMMY_PRODUCTS


@router.get("/recommendations", response_model=list[ProductResponse])
async def get_recommendations():
    return sorted(DUMMY_PRODUCTS, key=lambda p: p.match_score, reverse=True)


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    for p in DUMMY_PRODUCTS:
        if p.id == product_id:
            return p
    return DUMMY_PRODUCTS[0]
