def calculate_forecast(current_footprint: float) -> dict:
    """
    Calculates impact forecast scenarios based on a user's current carbon footprint.
    """
    # Business logic from the specification blueprint
    future = current_footprint * 1.05       # Business-as-usual projected growth
    improved = current_footprint * 0.85     # Projected footprint if actions are taken
    saving = future - improved              # Total carbon saved

    return {
        "future_emissions": round(future, 2),
        "improved_emissions": round(improved, 2),
        "potential_savings": round(saving, 2)
    }