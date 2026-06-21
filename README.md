<p align="center">
  <img src="https://img.shields.io/badge/🌿_Carbon_Compass-Sustainability_Dashboard-22c55e?style=for-the-badge&labelColor=0a0f0d" alt="Carbon Compass" />
</p>

<h1 align="center">🧭 Carbon Compass</h1>

<p align="center">
  <strong>Track, Analyze, and Reduce Your Carbon Footprint</strong><br/>
  A full-stack sustainability dashboard powered by AI — built for a greener tomorrow.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61dafb?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285f4?logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Vite-8.0-646cff?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-22c55e" alt="License" />
</p>

---

## 🌍 Problem Statement

Climate change is the defining challenge of our generation, yet **most individuals have no idea how much CO₂ their daily habits produce**. Existing carbon calculators are either too complex, too generic, or provide no actionable path to reduction.

**Carbon Compass** bridges this gap by providing:

- **Instant visibility** — See your carbon footprint broken down by category in seconds
- **AI-powered intelligence** — Upload electricity bills for automatic data extraction via Gemini Vision
- **Actionable coaching** — Personalized, AI-driven recommendations to reduce emissions
- **Progress tracking** — Weekly goals and impact forecasts to keep you on track

> 💡 *The average person generates ~4.5 tonnes of CO₂ per year. Carbon Compass makes that number visible, understandable, and — most importantly — reducible.*

---

## ✨ Features

### 📊 Dashboard
| Feature | Description |
|---------|-------------|
| **Carbon Score Card** | Animated circular gauge (0–100) showing your sustainability score in real-time |
| **Monthly CO₂ Emissions** | Interactive area chart tracking your emissions trend over 6 months |
| **Emission Breakdown** | Donut chart splitting your footprint across Transport, Energy, Food, Housing & Shopping |
| **Impact Forecast** | 2026 projections for trees saved, water conserved, and CO₂ reduced |
| **Weekly Sustainability Goals** | Interactive checklist with toggleable goals and live CO₂ savings counter |

### 🧮 Carbon Calculator
| Feature | Description |
|---------|-------------|
| **Multi-Input Form** | Electricity (kWh), Car travel (km), Bus travel (km), and Food type inputs |
| **Real-Time Computation** | Backend calculates emissions using validated emission factors |
| **Sustainability Score** | Dynamic 0–100 score derived from your total footprint |

### 🤖 AI-Powered Features
| Feature | Description |
|---------|-------------|
| **Bill OCR** | Upload electricity bills → Gemini 2.5 Flash extracts kWh, amount, billing period |
| **Smart Recommendations** | AI-generated personalized tips based on your highest emission categories |
| **Impact Forecasting** | Business-as-usual vs. improved scenario modeling |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  React 19 + Vite + Tailwind CSS 3                                │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │   Navbar    │  │ CarbonInput  │  │   Dashboard Cards      │  │
│  │             │  │    Form      │  │  ┌──────┐ ┌──────────┐ │  │
│  └─────────────┘  └──────┬───────┘  │  │Score │ │ Monthly  │ │  │
│                          │          │  │ Card │ │ Emissions│ │  │
│                          ▼          │  └──────┘ └──────────┘ │  │
│                    REST API Calls   │  ┌──────┐ ┌──────────┐ │  │
│                          │          │  │Break │ │ Impact   │ │  │
│                          │          │  │ down │ │ Forecast │ │  │
│                          │          │  └──────┘ └──────────┘ │  │
│                          │          │  ┌──────────────────┐   │  │
│                          │          │  │  Weekly Goals     │   │  │
│                          │          │  └──────────────────┘   │  │
│                          │          └────────────────────────┘  │
└──────────────────────────┼───────────────────────────────────────┘
                           │
                    HTTP / JSON
                           │
┌──────────────────────────┼───────────────────────────────────────┐
│                         BACKEND                                  │
│  FastAPI + Python                                                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      API Layer                               │ │
│  │  POST /api/calculate  │  POST /api/recommendations          │ │
│  │  GET  /api/forecast   │  POST /api/extract-bill             │ │
│  └───────────┬───────────┴──────────────┬──────────────────────┘ │
│              │                          │                        │
│  ┌───────────▼───────────┐  ┌───────────▼──────────────┐        │
│  │    Service Layer      │  │     AI Layer             │        │
│  │  carbon_calculator.py │  │  Gemini 2.5 Flash (OCR)  │        │
│  │  forecast_service.py  │  │  Recommendation Engine   │        │
│  │  recommendation_svc   │  │                          │        │
│  └───────────────────────┘  └──────────────────────────┘        │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                     SQLite Database                          │ │
│  │  entries (id, user_id, total_kg, transport_kg, ...)          │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | Component-based UI framework |
| **Vite 8** | Lightning-fast build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling with custom green theme |
| **Recharts** | Interactive data visualization (Area, Pie charts) |
| **Lucide React** | Premium icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance async Python API framework |
| **Pydantic** | Request/response validation & serialization |
| **SQLAlchemy** | ORM for SQLite database operations |
| **Gemini 2.5 Flash** | AI-powered bill OCR & smart coaching |
| **Uvicorn** | ASGI server for production deployment |

### Design
| Element | Implementation |
|---------|---------------|
| **Theme** | Dark glassmorphism with emerald/teal palette |
| **Typography** | Inter (UI) + JetBrains Mono (data) |
| **Animations** | CSS keyframe animations (fade-in, slide-up, score-fill) |
| **Responsive** | Mobile-first 12-column grid layout |

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.10
- **Gemini API Key** ([Get one here](https://aistudio.google.com/apikey))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CarbonCompass.git
cd CarbonCompass
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv .venv

# Activate it
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set your Gemini API key
# Windows:
set GEMINI_API_KEY=your_api_key_here
# macOS/Linux:
export GEMINI_API_KEY=your_api_key_here

# Start the API server
uvicorn main:app --reload --port 8000
```

The API will be running at **http://localhost:8000**

### 3. Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The dashboard will be live at **http://localhost:5173**

### 4. Production Build

```bash
cd frontend
npm run build    # Outputs to frontend/dist/
npm run preview  # Preview production build locally
```

---

## 📡 API Endpoints

### Core Endpoints

#### `POST /api/calculate`
Calculate carbon footprint from user inputs.

```json
// Request
{
  "electricity_units": 150.0,
  "car_km": 200.0,
  "bus_km": 50.0,
  "food_type": "mixed"
}

// Response
{
  "total_carbon_footprint": 420.0,
  "category_breakdown": {
    "electricity": 127.5,
    "car": 40.0,
    "bus": 2.5,
    "food": 250.0
  },
  "sustainability_score": 72
}
```

#### `POST /api/recommendations`
Get AI-driven sustainability tips based on emission breakdown.

```json
// Request
{
  "electricity": 127.5,
  "car": 40.0,
  "bus": 2.5,
  "food": 250.0
}

// Response
{
  "recommendations": [
    {
      "category": "food",
      "tip": "Try 2 vegetarian days per week to reduce food emissions by ~30%",
      "potential_reduction": "75 kg CO₂/month"
    }
  ]
}
```

#### `GET /api/forecast?current_footprint=420.0`
Get future emission projections.

```json
// Response
{
  "future_emissions": 441.0,
  "improved_emissions": 357.0,
  "potential_savings": 84.0
}
```

#### `POST /api/extract-bill`
Upload an electricity bill image for AI-powered OCR extraction.

```
Content-Type: multipart/form-data
Body: file (image/*)
```

```json
// Response
{
  "units_consumed": "342",
  "bill_amount": "₹2,450",
  "billing_period": "May 2026",
  "consumer_number": "1234567890"
}
```

#### `GET /`
Health check endpoint.

```json
{ "status": "Carbon Compass API is running successfully!" }
```

---

## 📁 Project Structure

```
CarbonCompass/
├── frontend/                          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Glassmorphism navigation bar
│   │   │   ├── CarbonScoreCard.jsx    # Animated circular score gauge
│   │   │   ├── MonthlyEmissions.jsx   # Area chart — CO₂ trend
│   │   │   ├── EmissionBreakdown.jsx  # Donut chart — category split
│   │   │   ├── ImpactForecast.jsx     # Projections + progress bar
│   │   │   ├── WeeklySustainabilityGoals.jsx  # Interactive checklist
│   │   │   └── CarbonInputForm.jsx    # Calculator input form
│   │   ├── App.jsx                    # Main layout + grid
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Tailwind + glassmorphism styles
│   ├── tailwind.config.js             # Custom carbon theme
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                           # FastAPI + Python
│   ├── main.py                        # App entry, CORS, route registration
│   ├── calculator.py                  # Emission factor constants
│   ├── gemini.py                      # Gemini AI integration (OCR + coach)
│   ├── requirements.txt
│   └── app/
│       ├── api/
│       │   ├── calculator.py          # POST /api/calculate
│       │   ├── recommendations.py     # POST /api/recommendations
│       │   ├── forecast.py            # GET  /api/forecast
│       │   └── ocr.py                 # POST /api/extract-bill
│       ├── services/
│       │   ├── carbon_calculator.py   # Emission math + scoring
│       │   ├── forecast_service.py    # Scenario projection logic
│       │   └── recommendation_service.py  # Smart tip generation
│       └── models/
│
├── docs/                              # Documentation
├── tests/                             # Test suites
├── ARCHITECTURE.md                    # System design blueprint
├── SECURITY.md                        # Security policies
├── TESTING.md                         # Test strategy
├── ACCESSIBILITY.md                   # A11y guidelines
└── README.md                          # ← You are here
```

---

## 🔬 Emission Factors

Carbon Compass uses internationally recognized emission factors:

| Category | Factor | Unit | Source |
|----------|--------|------|--------|
| Electricity | 0.85 | kg CO₂/kWh | India CEA Grid Average |
| Car (Petrol) | 0.20 | kg CO₂/km | IPCC Transport |
| Bus | 0.05 | kg CO₂/km | IPCC Public Transit |
| Diet — Vegetarian | 150 | kg CO₂/month | FAO Lifecycle Assessment |
| Diet — Mixed | 250 | kg CO₂/month | FAO Lifecycle Assessment |
| Diet — Non-Vegetarian | 400 | kg CO₂/month | FAO Lifecycle Assessment |

---

## 🔮 Future Scope

| Phase | Feature | Description |
|-------|---------|-------------|
| **v2.0** | 🔐 User Authentication | OAuth 2.0 login with Google, persistent user profiles |
| **v2.0** | 📱 PWA Support | Installable progressive web app with offline mode |
| **v2.1** | 🏢 Org Dashboards | Team & organization-level carbon tracking |
| **v2.1** | 🛩️ Flight Tracking | Air travel integration with airport code lookup |
| **v3.0** | 🌐 Carbon Marketplace | Carbon credit purchasing & offset integration |
| **v3.0** | 📊 Advanced Analytics | ML-driven anomaly detection in consumption patterns |
| **v3.0** | 🤖 AI Coach Chat | Real-time conversational sustainability coaching via Gemini |
| **v3.1** | 🏆 Gamification | Leaderboards, achievements, and community challenges |
| **v3.1** | 📡 IoT Integration | Smart meter & home automation data ingestion |
| **v4.0** | 🌍 Multi-Region | Localized emission factors for 50+ countries |

---

## 🏆 Hackathon Highlights

- ⚡ **Full-stack** — React frontend + FastAPI backend, fully functional end-to-end
- 🤖 **AI-Powered** — Gemini 2.5 Flash for bill OCR and smart recommendations
- 🎨 **Premium UI** — Dark glassmorphism theme with micro-animations and data viz
- 📱 **Responsive** — Mobile-first design that works on any screen size
- 🧮 **Real Science** — Emission factors from IPCC, FAO, and CEA datasets
- 🧩 **Modular** — Clean separation of API, service, and AI layers

---

## 👥 Team

Built with ❤️ and 🌿 for the planet.

---

<p align="center">
  <strong>🌱 Every kilogram of CO₂ you don't emit matters.</strong><br/>
  <em>Carbon Compass — Making sustainability measurable.</em>
</p>
