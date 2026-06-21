import unittest
import sys
from pathlib import Path

# 1. Point sys.path directly to the 'services' folder where the module actually lives
services_path = str(Path(__file__).resolve().parent.parent / "app" / "services")
sys.path.insert(0, services_path)

# 2. Now Python can successfully import it directly
from carbon_calculator import calculate_carbon_footprint


class TestCarbonCalculator(unittest.TestCase):

    def test_vegetarian(self):
        result = calculate_carbon_footprint(
            100,
            100,
            100,
            "Vegetarian"
        )

        self.assertGreater(
            result["total_carbon_footprint"],
            0
        )

    def test_non_vegetarian_higher(self):
        veg = calculate_carbon_footprint(
            100,
            100,
            100,
            "Vegetarian"
        )

        non_veg = calculate_carbon_footprint(
            100,
            100,
            100,
            "Non-Vegetarian"
        )

        self.assertGreater(
            non_veg["total_carbon_footprint"],
            veg["total_carbon_footprint"]
        )

    def test_score_range(self):
        result = calculate_carbon_footprint(
            500,
            1000,
            500,
            "Non-Vegetarian"
        )

        self.assertTrue(
            0 <= result["sustainability_score"] <= 100
        )


if __name__ == "__main__":
    unittest.main()