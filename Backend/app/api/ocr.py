import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from google import genai
from google.genai import types
from PIL import Image
import io

app = FastAPI(title="Carbon Compass - Bill Extractor")

# Initialize the Gemini Client
# Ensure GEMINI_API_KEY is set in your environment variables
client = genai.Client()

# Define the desired output structure using Pydantic
class ElectricityBillData(BaseModel):
    units_consumed: Optional[str] = Field(None, description="The total electricity units consumed (e.g., in kWh).")
    bill_amount: Optional[str] = Field(None, description="The total financial amount due for the bill period.")
    billing_period: Optional[str] = Field(None, description="The date range or month covering the bill.")
    consumer_number: Optional[str] = Field(None, description="The unique consumer or account identification number.")

@app.post("/extract-bill", response_model=ElectricityBillData)
async def extract_bill_data(file: UploadFile = File(...)):
    # 1. Validate file extension
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    try:
        # 2. Read and convert the uploaded file to a PIL Image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # 3. Call Gemini with Structured Outputs enabled
        # Using gemini-2.5-flash as it is highly efficient for multimodal tasks
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                image, 
                "Extract the required details from this electricity bill. If a field cannot be found, leave it as null."
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ElectricityBillData,
                temperature=0.1 # Low temperature for factual extraction consistency
            ),
        )
        
        # 4. The SDK automatically parses the JSON response into the schema object if successful,
        # but since we want to return it safely through FastAPI, we parse the text string.
        return ElectricityBillData.model_validate_json(response.text)

    except Exception as e:
        # Handle API errors or parsing failures gracefully
        raise HTTPException(status_code=500, detail=f"Failed to process bill: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)