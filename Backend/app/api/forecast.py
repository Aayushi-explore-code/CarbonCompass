from fastapi import APIRouter
from ..services.forecast_service import calculate_forecast

router = APIRouter()

@router.get("/forecast")
async def forecast_endpoint(current_footprint: float):
    """
    Exposes the forecast calculations to the frontend.
    Expects a query parameter: ?current_footprint=123.45
    """
    result = calculate_forecast(current_footprint)
    return result