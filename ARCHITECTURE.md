# 🏗️ Carbon Compass — Architecture Documentation

> System design, data flow, and technical decisions for the Carbon Compass sustainability platform.

---

## Table of Contents

- [System Overview](#system-overview)
- [High-Level Architecture](#high-level-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [AI Layer — Gemini OCR](#ai-layer--gemini-ocr)
- [Data Flow](#data-flow)
  - [Flow 1: Carbon Footprint Calculation](#flow-1-carbon-footprint-calculation)
  - [Flow 2: Electricity Bill OCR](#flow-2-electricity-bill-ocr)
  - [Flow 3: Recommendations Engine](#flow-3-recommendations-engine)
  - [Flow 4: Impact Forecasting](#flow-4-impact-forecasting)
  - [Flow 5: Dashboard Rendering](#flow-5-dashboard-rendering)
- [Database Schema](#database-schema)
- [Emission Factor Model](#emission-factor-model)
- [API Contract](#api-contract)
- [Security & Error Handling](#security--error-handling)
- [Design Decisions](#design-decisions)

---

## System Overview

Carbon Compass is a **full-stack sustainability platform** that calculates, visualizes, and helps reduce a user's carbon footprint. The system follows a **decoupled client-server architecture** where:

- A **React SPA** handles all presentation and user interaction
- A **FastAPI backend** provides stateless computation endpoints
- **Google Gemini 2.5 Flash** powers AI features (bill OCR, coaching)
- **SQLite** persists historical emission data

```
┌─────────────┐       HTTP/JSON       ┌─────────────┐      Gemini API
│   Browser   │ ◄──────────────────► │   FastAPI    │ ◄───────────────► Google AI
│  React SPA  │                       │   Backend    │
└─────────────┘                       └──────┬───────┘
                                             │
                                      ┌──────▼───────┐
                                      │    SQLite     │
                                      │   Database    │
                                      └──────────────┘
```

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                        │
│                     React 19 · Vite 8 · Tailwind CSS 3                       │
│                                                                              │
│   ┌──────────┐  ┌────────────────┐  ┌────────────────────────────────────┐   │
│   │  Navbar  │  │ CarbonInput    │  │         Dashboard Grid             │   │
│   │          │  │    Form        │  │                                    │   │
│   │  • Logo  │  │                │  │  ┌────────────┐  ┌─────────────┐  │   │
│   │  • Tabs  │  │  • Electricity │  │  │  Carbon    │  │  Monthly    │  │   │
│   │  • User  │  │  • Car km      │  │  │  Score     │  │  CO₂        │  │   │
│   │          │  │  • Bus km      │  │  │  Card      │  │  Emissions  │  │   │
│   └──────────┘  │  • Food type   │  │  │  (SVG)     │  │  (Recharts) │  │   │
│                 │                │  │  └────────────┘  └─────────────┘  │   │
│                 │  ┌───────────┐ │  │                                    │   │
│                 │  │ Calculate │ │  │  ┌────────────┐  ┌─────────────┐  │   │
│                 │  │ Footprint │ │  │  │  Emission  │  │  Impact     │  │   │
│                 │  └─────┬─────┘ │  │  │  Breakdown │  │  Forecast   │  │   │
│                 └────────┼───────┘  │  │  (Donut)   │  │  (Metrics)  │  │   │
│                          │          │  └────────────┘  └─────────────┘  │   │
│                          │          │                                    │   │
│                          │          │  ┌────────────────────────────┐    │   │
│                          │          │  │  Weekly Sustainability     │    │   │
│                          │          │  │  Goals (Interactive)       │    │   │
│                          │          │  └────────────────────────────┘    │   │
│                          │          └────────────────────────────────────┘   │
└──────────────────────────┼───────────────────────────────────────────────────┘
                           │
                    fetch() / POST
                     JSON payload
                           │
┌──────────────────────────┼───────────────────────────────────────────────────┐
│                          ▼           BACKEND                                 │
│                    FastAPI + Uvicorn (ASGI)                                   │
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐   │
│   │                        API Router Layer                              │   │
│   │                                                                      │   │
│   │   POST /api/calculate          POST /api/recommendations             │   │
│   │   GET  /api/forecast           POST /api/extract-bill                │   │
│   │   GET  /                                                             │   │
│   └──────────┬────────────────────────────────┬──────────────────────────┘   │
│              │                                │                              │
│              ▼                                ▼                              │
│   ┌────────────────────┐          ┌─────────────────────┐                   │
│   │   Service Layer    │          │     AI Layer         │                   │
│   │                    │          │                      │                   │
│   │ carbon_calculator  │          │  Gemini 2.5 Flash    │                   │
│   │   .py              │          │  ┌───────────────┐   │                   │
│   │ forecast_service   │          │  │ Vision API    │   │                   │
│   │   .py              │          │  │ (Bill OCR)    │   │                   │
│   │ recommendation_    │          │  └───────────────┘   │                   │
│   │   service.py       │          │  ┌───────────────┐   │                   │
│   └────────┬───────────┘          │  │ Text API      │   │                   │
│            │                      │  │ (Coach)       │   │                   │
│            ▼                      │  └───────────────┘   │                   │
│   ┌────────────────────┐          └─────────────────────┘                   │
│   │  Data Layer        │                                                     │
│   │  SQLAlchemy ORM    │                                                     │
│   │  SQLite DB         │                                                     │
│   └────────────────────┘                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Technology Choices

| Technology | Version | Role |
|------------|---------|------|
| React | 19.1 | Component-based UI rendering |
| Vite | 8.0 | Build tool + HMR dev server |
| Tailwind CSS | 3.4 | Utility-first styling framework |
| Recharts | 2.15 | Data visualization (Area, Pie charts) |
| Lucide React | 0.511 | SVG icon library |

### Component Hierarchy

```
App
├── Navbar                          # Sticky glassmorphism nav
│   ├── Logo + Branding
│   ├── Navigation Tabs
│   └── User Actions (Bell, Settings, Avatar)
│
├── Page Header                     # Live tracking badge + export
│
├── Dashboard Grid (12-col)         # Responsive CSS Grid
│   ├── CarbonScoreCard             # [col 1-4]  Animated SVG gauge
│   ├── MonthlyEmissions            # [col 5-12] Recharts AreaChart
│   ├── EmissionBreakdown           # [col 1-5]  Recharts PieChart + legend
│   ├── ImpactForecast              # [col 6-12] Metrics + progress bar
│   └── WeeklySustainabilityGoals   # [col 1-12] Interactive checklist
│
├── CarbonInputForm                 # Calculator form (4 fields)
│
└── Footer
```

### Design System

The frontend implements a **custom glassmorphism design system** defined across two files:

**`tailwind.config.js`** — Design tokens:
- **Colors**: `carbon-50` → `carbon-950` (green), `surface-*` (dark), `accent-*` (emerald, teal, lime, amber, rose)
- **Shadows**: `shadow-glow`, `shadow-glow-lg` (green-tinted box shadows)
- **Animations**: `fade-in`, `slide-up`, `score-fill`, `float`, `shimmer`, `pulse-slow`
- **Typography**: Inter (UI) + JetBrains Mono (data values)

**`index.css`** — Component classes:
- `glass-card` / `glass-card-hover` — Backdrop-blur cards with subtle borders and inset highlights
- `gradient-text` — Emerald-to-teal gradient on text
- `badge-success` / `badge-warning` / `badge-danger` — Status pills
- `progress-track` / `progress-fill` — Animated progress bars
- `bg-mesh` — Multi-point radial gradient background

### State Management

State is managed **locally within components** using React `useState`:

| Component | State | Behavior |
|-----------|-------|----------|
| `CarbonScoreCard` | `displayScore` | Animates 0→72 on mount via `requestAnimationFrame` |
| `CarbonInputForm` | `formData`, `focused` | Controlled form inputs + focus tracking |
| `WeeklySustainabilityGoals` | `goals[]` | Toggleable completion, derived progress |

No global state library is needed at this scale — props flow downward, API responses trigger local updates.

---

## Backend Architecture

### Technology Choices

| Technology | Role |
|------------|------|
| FastAPI | Async API framework with auto-generated OpenAPI docs |
| Pydantic | Request/response schema validation |
| SQLAlchemy | ORM for database operations |
| Uvicorn | ASGI server (production-grade) |
| google-generativeai | Gemini SDK for AI features |
| python-multipart | Multipart file upload support |

### Layered Architecture

The backend follows a strict **3-layer separation**:

```
┌─────────────────────────────────────────────────┐
│  API Layer (app/api/)                            │
│  Handles HTTP, validates input, returns JSON     │
│                                                  │
│  calculator.py  recommendations.py  forecast.py  │
│  ocr.py                                         │
├─────────────────────────────────────────────────┤
│  Service Layer (app/services/)                   │
│  Pure business logic, no HTTP awareness          │
│                                                  │
│  carbon_calculator.py    forecast_service.py      │
│  recommendation_service.py                        │
├─────────────────────────────────────────────────┤
│  Data Layer                                      │
│  SQLAlchemy models + SQLite persistence           │
│                                                  │
│  app/models/                                      │
└─────────────────────────────────────────────────┘
```

**Why this separation matters:**
- **API layer** can change routes, add auth, or swap frameworks without touching logic
- **Service layer** is unit-testable with no HTTP dependency
- **AI calls** are isolated in `gemini.py` with graceful fallbacks so the app degrades, never crashes

### CORS Configuration

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Open during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

All routes are mounted under the `/api` prefix for clean separation from frontend routes.

---

## AI Layer — Gemini OCR

### Overview

Carbon Compass uses **Google Gemini 2.5 Flash** for two AI-powered features:

```
┌──────────────┐                    ┌───────────────────────┐
│  User        │   Upload image     │  Gemini 2.5 Flash     │
│  (Browser)   │ ─────────────────► │                       │
│              │                    │  ┌─────────────────┐  │
│              │                    │  │  Vision API     │  │
│              │ ◄───Structured──── │  │  Multimodal     │  │
│              │     JSON response  │  │  Processing     │  │
│              │                    │  └─────────────────┘  │
└──────────────┘                    │                       │
                                    │  ┌─────────────────┐  │
                                    │  │  Text API       │  │
                                    │  │  Sustainability │  │
                                    │  │  Coaching       │  │
                                    │  └─────────────────┘  │
                                    └───────────────────────┘
```

### Feature 1: Bill OCR (`POST /api/extract-bill`)

**Purpose:** Extract electricity consumption data from photographed/scanned bills.

**How it works:**
1. User uploads an image file (JPEG, PNG, etc.)
2. Backend validates the file is an image (`content_type` check)
3. Image is converted to PIL format and sent to Gemini Vision API
4. Gemini receives a structured output schema (`ElectricityBillData`) via Pydantic
5. Response is parsed into validated fields:
   - `units_consumed` — kWh from the bill
   - `bill_amount` — Financial amount due
   - `billing_period` — Date range covered
   - `consumer_number` — Account ID

**Configuration:**
```python
config = types.GenerateContentConfig(
    response_mime_type="application/json",    # Force JSON output
    response_schema=ElectricityBillData,      # Pydantic schema enforcement
    temperature=0.1                           # Low temp for factual accuracy
)
```

**Graceful degradation:** If Gemini fails (rate limit, network, parsing), the endpoint returns a 500 error and the frontend falls back to manual entry — the user is never blocked.

### Feature 2: Sustainability Coach (`gemini.py`)

**Purpose:** Provide personalized carbon reduction advice based on the user's breakdown.

**Design pattern:** The emission breakdown is injected into the prompt context so Gemini generates advice specific to the user's highest-impact categories, not generic tips.

```python
async def coach_reply(message, breakdown, history) -> str:
    try:
        # Gemini text call with breakdown context
        ...
    except Exception:
        return "Fallback: try cutting one car trip a week."
```

---

## Data Flow

### Flow 1: Carbon Footprint Calculation

This is the **primary data flow** — user inputs daily habits, gets emissions breakdown.

```
┌────────────┐     ┌────────────┐     ┌──────────────┐     ┌───────────────┐
│            │     │            │     │              │     │               │
│  User      │     │  Carbon    │     │   FastAPI    │     │  carbon_      │
│  (Browser) │     │  InputForm │     │   /api/      │     │  calculator   │
│            │     │  Component │     │   calculate  │     │  .py          │
│            │     │            │     │              │     │               │
└─────┬──────┘     └─────┬──────┘     └──────┬───────┘     └───────┬───────┘
      │                  │                   │                     │
      │  Fill form:      │                   │                     │
      │  electricity=150 │                   │                     │
      │  car_km=200      │                   │                     │
      │  bus_km=50       │                   │                     │
      │  food=mixed      │                   │                     │
      │ ────────────────►│                   │                     │
      │                  │                   │                     │
      │                  │  POST /api/       │                     │
      │                  │  calculate        │                     │
      │                  │  {JSON body}      │                     │
      │                  │ ─────────────────►│                     │
      │                  │                   │                     │
      │                  │                   │  Pydantic           │
      │                  │                   │  validates input    │
      │                  │                   │                     │
      │                  │                   │  call calculate_    │
      │                  │                   │  carbon_footprint() │
      │                  │                   │ ───────────────────►│
      │                  │                   │                     │
      │                  │                   │                     │  Apply factors:
      │                  │                   │                     │  elec = 150 × 0.85
      │                  │                   │                     │  car  = 200 × 0.20
      │                  │                   │                     │  bus  =  50 × 0.05
      │                  │                   │                     │  food = 250.0 (mixed)
      │                  │                   │                     │  total = 420.0 kg
      │                  │                   │                     │
      │                  │                   │                     │  score = max(5,
      │                  │                   │                     │   min(100,
      │                  │                   │                     │    100-(420/15)))
      │                  │                   │                     │  score = 72
      │                  │                   │                     │
      │                  │                   │  ◄─────────────────│
      │                  │                   │  {total, breakdown, │
      │                  │  ◄────────────────│   score}            │
      │                  │  200 OK + JSON    │                     │
      │  ◄───────────────│                   │                     │
      │  Update dashboard│                   │                     │
      │  with results    │                   │                     │
      ▼                  ▼                   ▼                     ▼
```

**Computation formula:**
```
electricity_emission = electricity_units × 0.85 kg/kWh
car_emission         = car_km × 0.20 kg/km
bus_emission         = bus_km × 0.05 kg/km
food_emission        = lookup(food_type)  →  veg: 150 | mixed: 250 | non-veg: 400

total_footprint      = sum(all emissions)
sustainability_score = clamp(5, 100 − (total / 15), 100)
```

---

### Flow 2: Electricity Bill OCR

```
  User                    Frontend              Backend               Gemini AI
   │                         │                     │                      │
   │  Upload bill photo      │                     │                      │
   │ ───────────────────────►│                     │                      │
   │                         │                     │                      │
   │                         │  POST /extract-bill │                      │
   │                         │  multipart/form     │                      │
   │                         │ ───────────────────►│                      │
   │                         │                     │                      │
   │                         │                     │  Validate image      │
   │                         │                     │  Convert to PIL      │
   │                         │                     │                      │
   │                         │                     │  generate_content()  │
   │                         │                     │  model=gemini-2.5-   │
   │                         │                     │    flash             │
   │                         │                     │  schema=Electricity  │
   │                         │                     │    BillData          │
   │                         │                     │ ────────────────────►│
   │                         │                     │                      │
   │                         │                     │                      │ Extract:
   │                         │                     │                      │ units_consumed
   │                         │                     │                      │ bill_amount
   │                         │                     │                      │ billing_period
   │                         │                     │                      │ consumer_number
   │                         │                     │                      │
   │                         │                     │  ◄───────────────────│
   │                         │                     │  Structured JSON     │
   │                         │                     │                      │
   │                         │  ◄──────────────────│                      │
   │                         │  200 OK + extracted │                      │
   │                         │  data               │                      │
   │  ◄─────────────────────│                     │                      │
   │  Pre-fill form fields   │                     │                      │
   │  User confirms/edits    │                     │                      │
   │                         │                     │                      │
   │  Submit confirmed data  │                     │                      │
   │ ───────────────────────►│  POST /api/         │                      │
   │                         │  calculate          │                      │
   │                         │ ───────────────────►│                      │
   │                         │                     │  (Flow 1 continues)  │
   ▼                         ▼                     ▼                      ▼
```

> **Key design choice:** OCR does NOT auto-submit. The extracted data pre-fills the form for user confirmation. This prevents erroneous Gemini extractions from silently producing wrong results.

---

### Flow 3: Recommendations Engine

```
  Frontend                   Backend                    Recommendation Service
     │                          │                               │
     │  POST /api/              │                               │
     │  recommendations         │                               │
     │  {electricity, car,      │                               │
     │   bus, food}             │                               │
     │ ────────────────────────►│                               │
     │                          │                               │
     │                          │  generate_recommendations()   │
     │                          │ ─────────────────────────────►│
     │                          │                               │
     │                          │                     ┌─────────┴──────────┐
     │                          │                     │ 1. Find highest    │
     │                          │                     │    emission source │
     │                          │                     │    max(emissions)  │
     │                          │                     │                    │
     │                          │                     │ 2. Sample 3 tips   │
     │                          │                     │    from category   │
     │                          │                     │    database        │
     │                          │                     │                    │
     │                          │                     │ 3. Pick weekly     │
     │                          │                     │    challenge       │
     │                          │                     └─────────┬──────────┘
     │                          │                               │
     │                          │  ◄────────────────────────────│
     │                          │  {top_source,                 │
     │  ◄──────────────────────│   recommendations[3],          │
     │  Display tips + challenge│   weekly_challenge}            │
     ▼                          ▼                               ▼
```

**Recommendation DB structure:** 4 categories × 4–5 tips each, plus weekly challenges. Tips are randomly sampled so repeat visits feel fresh.

---

### Flow 4: Impact Forecasting

```
  Frontend                    Backend                   Forecast Service
     │                           │                            │
     │  GET /api/forecast        │                            │
     │  ?current_footprint=420   │                            │
     │ ─────────────────────────►│                            │
     │                           │  calculate_forecast(420)   │
     │                           │ ──────────────────────────►│
     │                           │                            │
     │                           │              future  = 420 × 1.05  = 441.0
     │                           │              improved = 420 × 0.85 = 357.0
     │                           │              savings  = 441 − 357  = 84.0
     │                           │                            │
     │                           │  ◄─────────────────────────│
     │  ◄────────────────────────│  {future_emissions,        │
     │  Render Impact Forecast   │   improved_emissions,      │
     │  card with projections    │   potential_savings}        │
     ▼                           ▼                            ▼
```

**Model:** Simple linear projection — business-as-usual (+5% growth) vs. improved scenario (−15% reduction). Intentionally straightforward for hackathon scope; real production would use ML time-series.

---

### Flow 5: Dashboard Rendering

```
  Browser Load
       │
       ▼
  ┌─ App.jsx ──────────────────────────────────────────────┐
  │                                                         │
  │  1. Render ambient background (3 blurred glow orbs)     │
  │  2. Mount <Navbar />                                    │
  │  3. Mount Page Header with "Live Tracking" badge        │
  │  4. Render 12-column CSS Grid:                          │
  │     ┌──────────────────────────────────────────────┐    │
  │     │  Row 1:                                      │    │
  │     │  ┌────────────┬──────────────────────────┐   │    │
  │     │  │ ScoreCard  │  MonthlyEmissions         │   │    │
  │     │  │ (cols 1-4) │  (cols 5-12)              │   │    │
  │     │  │            │  AreaChart animates in     │   │    │
  │     │  │ SVG gauge  │  with gradient fill        │   │    │
  │     │  │ counts up  │                            │   │    │
  │     │  └────────────┴──────────────────────────┘   │    │
  │     │                                              │    │
  │     │  Row 2:                                      │    │
  │     │  ┌──────────────┬────────────────────────┐   │    │
  │     │  │ Breakdown    │  ImpactForecast         │   │    │
  │     │  │ (cols 1-5)   │  (cols 6-12)            │   │    │
  │     │  │ PieChart +   │  3 metric cards +       │   │    │
  │     │  │ legend       │  progress bar           │   │    │
  │     │  └──────────────┴────────────────────────┘   │    │
  │     │                                              │    │
  │     │  Row 3:                                      │    │
  │     │  ┌───────────────────────────────────────┐   │    │
  │     │  │  WeeklySustainabilityGoals (cols 1-12) │   │    │
  │     │  │  5 toggleable goals, live progress     │   │    │
  │     │  └───────────────────────────────────────┘   │    │
  │     └──────────────────────────────────────────────┘    │
  │                                                         │
  │  5. Mount Footer                                        │
  └─────────────────────────────────────────────────────────┘
```

**Animation sequence:** Components use `animate-fade-in` and `animate-slide-up` CSS classes that trigger on mount, creating a staggered reveal effect as the page loads.

---

## Database Schema

```sql
CREATE TABLE entries (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         TEXT,           -- Browser-generated UUID (no auth required)
    total_kg        REAL,
    transport_kg    REAL,
    electricity_kg  REAL,
    diet_kg         REAL,
    flights_kg      REAL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Design choice:** `user_id` is a client-side UUID stored in `localStorage`. No authentication is required — this is a personal tracking tool, not a multi-tenant platform. This dramatically reduces complexity for hackathon scope.

---

## Emission Factor Model

All calculations use peer-reviewed emission factors:

```python
ELECTRICITY_FACTOR = 0.85    # kg CO₂ per kWh (India CEA grid average)
CAR_FACTOR         = 0.20    # kg CO₂ per km  (IPCC petrol vehicle)
BUS_FACTOR         = 0.05    # kg CO₂ per km  (IPCC public transit)

FOOD_FACTORS = {
    "vegetarian":     150.0,  # kg CO₂ per month (FAO lifecycle)
    "mixed":          250.0,  # kg CO₂ per month (FAO lifecycle)
    "non-vegetarian": 400.0,  # kg CO₂ per month (FAO lifecycle)
}
```

**Sustainability Score** is a normalized inverse of total emissions on a 0–100 scale:

```
score = clamp(5, 100, 100 − (total_footprint / 15))
```

This maps roughly:
| Total CO₂ (kg/month) | Score | Rating |
|----------------------|-------|--------|
| < 150 | 90+ | Excellent |
| 150 – 400 | 70–90 | Good |
| 400 – 800 | 45–70 | Average |
| 800+ | < 45 | Needs Improvement |

---

## API Contract

| Method | Endpoint | Input | Output | Purpose |
|--------|----------|-------|--------|---------|
| `POST` | `/api/calculate` | `{electricity_units, car_km, bus_km, food_type}` | `{total_carbon_footprint, category_breakdown, sustainability_score}` | Core calculation |
| `POST` | `/api/recommendations` | `{electricity, car, bus, food}` | `{top_emission_source, recommendations[], weekly_challenge}` | Actionable tips |
| `GET` | `/api/forecast` | `?current_footprint=float` | `{future_emissions, improved_emissions, potential_savings}` | Impact projection |
| `POST` | `/api/extract-bill` | `multipart file (image/*)` | `{units_consumed, bill_amount, billing_period, consumer_number}` | AI bill OCR |
| `GET` | `/` | — | `{status: "...running..."}` | Health check |

**OpenAPI docs** are auto-generated by FastAPI at `/docs` (Swagger UI) and `/redoc` (ReDoc).

---

## Security & Error Handling

### CORS
- Development: `allow_origins=["*"]` for rapid iteration
- Production: Should be locked to the specific frontend domain

### AI Fault Tolerance
The Gemini integration follows a **"degrade gracefully, never crash"** pattern:

```
Gemini available  →  Use AI-extracted data
Gemini fails      →  Frontend shows manual input fallback
                     User is NEVER blocked from using the app
```

### Input Validation
Every endpoint uses **Pydantic models** for strict type validation. Malformed requests return `422 Unprocessable Entity` with field-level error details.

### Bill Upload
- File type validated (`content_type.startswith("image/")`)
- Files processed in-memory (no disk storage of user data)
- `temperature=0.1` ensures deterministic, factual extraction

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **React SPA over SSR** | Simpler deployment, better interactivity for a dashboard app |
| **Vite over CRA/Webpack** | 10× faster HMR, native ESM support, minimal config |
| **Tailwind over CSS-in-JS** | Faster prototyping, consistent design tokens, smaller bundle |
| **FastAPI over Flask/Django** | Async by default, auto-docs, Pydantic integration, modern Python |
| **SQLite over Postgres** | Zero setup for hackathon, file-based, sufficient for single-user |
| **Gemini 2.5 Flash over Pro** | Faster inference, lower cost, sufficient accuracy for OCR |
| **Pydantic schema for OCR** | Forces structured JSON output from Gemini, eliminates parsing bugs |
| **No global state library** | Component-local state is sufficient at current scale |
| **Client-side UUID for user_id** | Avoids authentication complexity, appropriate for personal tracking |
| **OCR pre-fills, not auto-submits** | Prevents AI extraction errors from silently corrupting data |

---

<p align="center">
  <em>Carbon Compass — Architectured for clarity, built for impact.</em>
</p>