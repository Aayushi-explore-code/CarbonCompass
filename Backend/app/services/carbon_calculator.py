def calculate_carbon_footprint(electricity_units: float, car_km: float, bus_km: float, food_type: str):
    # 1. Standard emission multipliers (CO2 kg per unit)
    ELECTRICITY_FACTOR = 0.85  # kg CO2 per kWh
    CAR_FACTOR = 0.20         # kg CO2 per km
    BUS_FACTOR = 0.05         # kg CO2 per km
    
    # Monthly base food footprints in kg CO2
    FOOD_FACTORS = {
        "vegetarian": 150.0,
        "mixed": 250.0,
        "non-vegetarian": 400.0
    }

    # 2. Compute category emissions dynamically
    electricity_emission = electricity_units * ELECTRICITY_FACTOR
    car_emission = car_km * CAR_FACTOR
    bus_emission = bus_km * BUS_FACTOR
    
    # Clean up string variation inputs safely
    clean_food_type = food_type.strip().lower()
    food_emission = FOOD_FACTORS.get(clean_food_type, 250.0)

    # 3. Sum total footprint metrics
    total_footprint = electricity_emission + car_emission + bus_emission + food_emission

    # 4. Generate dynamic sustainability score (0-100 scale)
    # Lower emission values scale into a cleaner, higher carbon score
    sustainability_score = max(5, min(100, int(100 - (total_footprint / 15))))

    return {
        "total_carbon_footprint": total_footprint,
        "sustainability_score": sustainability_score,
        "category_breakdown": {
            "electricity": electricity_emission,
            "car": car_emission,
            "bus": bus_emission,
            "food": food_emission
        }
    }