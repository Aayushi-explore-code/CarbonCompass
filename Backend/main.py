from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import the routers we built
from app.api.calculator import router as calculator_router
from app.api.recommendations import router as recommendations_router
from app.api.forecast import router as forecast_router

app = FastAPI(title="Carbon Compass API")

# Crucial for Hackathons: Enable CORS so your React frontend can talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the routes under the /api prefix
app.include_router(calculator_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")
app.include_router(forecast_router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "Carbon Compass API is running successfully!"}