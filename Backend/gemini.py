async def extract_bill_kwh(image_bytes: bytes) -> dict:
    try:
        # one Gemini vision call, prompt asks for JSON: {kwh, confidence}
        ...
    except Exception:
        return {"kwh": None, "confidence": "low"}  # frontend shows manual entry instead

async def coach_reply(message: str, breakdown: dict, history: list) -> str:
    try:
        # one Gemini text call, breakdown injected into prompt for personalization
        ...
    except Exception:
        return "I'm having trouble connecting right now — but based on your numbers, try cutting one car trip a week."