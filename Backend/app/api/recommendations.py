from fastapi import APIRouter
from pydantic import BaseModel
from ..services.recommendation_service import generate_recommendations

router = APIRouter()

class RecommendationRequest(BaseModel):
    electricity: float
    car: float
    bus: float
    food: float

@router.post("/recommendations")
async def recommendations_endpoint(data: RecommendationRequest):
    # Pack into a standard dictionary to match the service layer's expected input structure
    emissions_dict = {
        "electricity": data.electricity,
        "car": data.car,
        "bus": data.bus,
        "food": data.food
    }
    
    result = generate_recommendations(emissions_dict)
    return result