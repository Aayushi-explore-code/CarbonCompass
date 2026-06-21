from fastapi import APIRouter
from pydantic import BaseModel
# 1. Add the real service layer import here
from ..services.carbon_calculator import calculate_carbon_footprint

router = APIRouter()

# 2. Update your data validation model to match the new fields
class CalculationRequest(BaseModel):
    electricity_units: float
    car_km: float
    bus_km: float
    food_type: str

# 3. Use the real function inside the endpoint instead of mock data
@router.post("/calculate")
async def calculate_footprint(data: CalculationRequest):
    result = calculate_carbon_footprint(
        electricity_units=data.electricity_units,
        car_km=data.car_km,
        bus_km=data.bus_km,
        food_type=data.food_type
    )
    
    return {
        "total_carbon_footprint": result.get("total_carbon_footprint"),
        "category_breakdown": {
            "electricity": result.get("category_breakdown", {}).get("electricity"),
            "car": result.get("category_breakdown", {}).get("car"),
            "bus": result.get("category_breakdown", {}).get("bus"),
            "food": result.get("category_breakdown", {}).get("food")
        },
        "sustainability_score": result.get("sustainability_score")
    }