FACTORS = {
    "car_petrol": 0.192, "bus": 0.105, "train": 0.041,
    "electricity": 0.42,
    "diet_vegan": 1.5, "diet_vegetarian": 1.7, "diet_omnivore": 2.5,
    "flight_short_haul": 250,
}

def calculate(transport_km, transport_mode, electricity_kwh, diet_type, flights_per_year):
    transport = transport_km * FACTORS[transport_mode]
    electricity = electricity_kwh * FACTORS["electricity"]
    diet = FACTORS[f"diet_{diet_type}"] * 30
    flights = flights_per_year * FACTORS["flight_short_haul"] / 12
    total = transport + electricity + diet + flights
    return {"transport_kg": transport, "electricity_kg": electricity,
            "diet_kg": diet, "flights_kg": flights, "total_kg": total}

