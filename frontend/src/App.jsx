import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CarbonScoreCard from './components/CarbonScoreCard';
import MonthlyEmissions from './components/MonthlyEmissions';
import EmissionBreakdown from './components/EmissionBreakdown';
import ImpactForecast from './components/ImpactForecast';
import WeeklySustainabilityGoals from './components/WeeklySustainabilityGoals';
import { Leaf, Activity, Globe, RefreshCw } from 'lucide-react';
import CarbonInputForm from './components/CarbonInputForm';

function App() {
  // 1. Unified state hooks to power all components
  const [carbonData, setCarbonData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. Initial state data simulating a user profile or form input
  const [userInput, setUserInput] = useState({
    electricity_units: 200.0,
    car_km: 120.0,
    bus_km: 45.0,
    food_type: "omnivore"
  });

  // 3. Central dashboard data synchronization engine
  const refreshDashboardData = async (inputs = userInput) => {
    setLoading(true);
    try {
      // Step A: Calculate footprint metrics
      const calcRes = await fetch("http://localhost:8000/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });
      const calcData = await calcRes.json();
      setCarbonData(calcData); 

      // Step B: Fetch personalized dynamic insights using breakdown results
      const recRes = await fetch("http://localhost:8000/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calcData.category_breakdown)
      });
      const recData = await recRes.json();
      setRecommendations(recData); 

      // Step C: Fetch potential predictive trajectory metrics
      const forecastRes = await fetch(
        `http://localhost:8000/api/forecast?current_footprint=${calcData.total_carbon_footprint}`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData);

    } catch (error) {
      console.error("Dashboard connection sync error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run automatically on component load
  useEffect(() => {
    refreshDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-surface bg-mesh relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-carbon-500/[0.03] rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-teal/[0.02] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-emerald/[0.015] rounded-full blur-[150px]" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-carbon-500/10 border border-carbon-500/20">
                  <Activity className="w-3 h-3 text-carbon-400" />
                  <span className="text-xs font-semibold text-carbon-400">Live Tracking</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Sustainability Dashboard
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Monitor your environmental impact • Updated just now
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-card/60 border border-surface-border/40 backdrop-blur-sm">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">June 2026</span>
              </div>
              <button 
                onClick={() => refreshDashboardData()}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-carbon-600 to-carbon-500 text-white text-sm font-semibold hover:from-carbon-500 hover:to-carbon-400 transition-all duration-300 shadow-glow disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Syncing...' : 'Sync Live Data'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Task 1.3: CarbonInputForm explicitly placed ABOVE the dashboard grid layout */}
        <div className="mb-8">
          <CarbonInputForm onCalculate={refreshDashboardData} loading={loading} />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Row 1: Score + Monthly Emissions */}
          <div className="lg:col-span-4">
            <CarbonScoreCard score={carbonData?.sustainability_score} />
          </div>
          <div className="lg:col-span-8">
            <MonthlyEmissions total={carbonData?.total_carbon_footprint} />
          </div>

          {/* Row 2: Breakdown + Impact Forecast */}
          <div className="lg:col-span-5">
            <EmissionBreakdown 
              breakdown={carbonData?.category_breakdown} 
              insights={recommendations} 
            />
          </div>
          <div className="lg:col-span-7">
            <ImpactForecast forecast={forecast} />
          </div>

          {/* Row 3: Weekly Goals */}
          <div className="lg:col-span-12">
            <WeeklySustainabilityGoals challenge={recommendations?.weekly_challenge} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-xs">
            <Leaf className="w-3 h-3" />
            <span>Carbon Compass © 2026 • Making sustainability measurable</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;