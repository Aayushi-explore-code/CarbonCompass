import random

# Recommendations database
RECOMMENDATIONS = {
    "electricity": [
        "Switch to LED bulbs if not already using them.",
        "Turn off appliances instead of leaving them on standby.",
        "Use natural light during daytime whenever possible.",
        "Set AC temperature between 24°C and 26°C.",
        "Unplug chargers and electronics when not in use."
    ],

    "car": [
        "Combine multiple errands into a single trip.",
        "Use public transport once or twice a week.",
        "Carpool with friends or colleagues.",
        "Walk or cycle for short distances.",
        "Maintain proper tire pressure to improve fuel efficiency."
    ],

    "bus": [
        "Choose direct routes when available.",
        "Walk or cycle for trips under 2 km.",
        "Use shared mobility options for short distances.",
        "Plan trips efficiently to reduce unnecessary travel."
    ],

    "food": [
        "Add one plant-based meal each day.",
        "Reduce red meat consumption.",
        "Buy local and seasonal produce.",
        "Avoid food waste by planning meals.",
        "Use reusable containers for food storage."
    ]
}

# Weekly sustainability challenges
CHALLENGES = {
    "electricity": [
        "Reduce electricity usage by 10% this week.",
        "Spend one evening without using AC.",
        "Track and switch off all standby devices daily."
    ],

    "car": [
        "Avoid using your car for at least 2 days this week.",
        "Walk or cycle for trips under 3 km.",
        "Use public transport for one commute this week."
    ],

    "bus": [
        "Walk an extra 2 km this week instead of taking transport.",
        "Choose eco-friendly travel routes whenever possible."
    ],

    "food": [
        "Have a completely vegetarian week.",
        "Reduce food waste to zero for 7 days.",
        "Replace 3 meat-based meals with plant-based alternatives."
    ]
}


def generate_recommendations(emissions):
    """
    emissions = {
        'electricity': float,
        'car': float,
        'bus': float,
        'food': float
    }
    """

    # Find highest emission category
    top_source = max(emissions, key=emissions.get)

    # Get top 3 recommendations
    recommendations = random.sample(
        RECOMMENDATIONS[top_source],
        min(3, len(RECOMMENDATIONS[top_source]))
    )

    # Pick weekly challenge
    weekly_challenge = random.choice(CHALLENGES[top_source])

    return {
        "top_emission_source": top_source,
        "recommendations": recommendations,
        "weekly_challenge": weekly_challenge
    }


# Example Usage
if __name__ == "__main__":
    user_emissions = {
        "electricity": 120.5,
        "car": 85.2,
        "bus": 12.4,
        "food": 65.0
    }

    result = generate_recommendations(user_emissions)

    print("Top Emission Source:", result["top_emission_source"])
    print("\nRecommendations:")
    for rec in result["recommendations"]:
        print("-", rec)

    print("\nWeekly Challenge:")
    print(result["weekly_challenge"])