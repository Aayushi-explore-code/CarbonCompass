import React, { useState } from 'react';
import { Zap, Car, Bus, Utensils, Calculator, Leaf } from 'lucide-react';

const FOOD_OPTIONS = [
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥦', color: 'carbon' },
  { value: 'mixed', label: 'Mixed', emoji: '🍳', color: 'amber' },
  { value: 'non-vegetarian', label: 'Non-Veg', emoji: '🥩', color: 'rose' },
];

// 1. Update the incoming prop signature from onSubmit to onCalculate
export default function CarbonInputForm({ onCalculate }) {
  const [formData, setFormData] = useState({
    electricity: '',
    carDistance: '',
    busDistance: '',
    foodType: 'mixed',
  });

  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoodSelect = (value) => {
    setFormData((prev) => ({ ...prev, foodType: value }));
  };

  // 2. Map local state to match your FastAPI router schema exactly
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onCalculate?.({
      electricity_units: parseFloat(formData.electricity) || 0,
      car_km: parseFloat(formData.carDistance) || 0,
      bus_km: parseFloat(formData.busDistance) || 0,
      food_type: formData.foodType, // sends standard "vegetarian", "mixed", etc.
    });
  };

  const isValid =
    formData.electricity !== '' ||
    formData.carDistance !== '' ||
    formData.busDistance !== '';

  return (
    <div className="glass-card-hover p-6 sm:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-carbon-500 to-accent-teal flex items-center justify-center shadow-glow">
          <Calculator className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Carbon Footprint Calculator</h2>
          <p className="text-xs text-gray-500">Enter your monthly usage to estimate emissions</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Numeric Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Electricity */}
          <label className="block group">
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gray-500 mb-2">
              <Zap className="w-3.5 h-3.5 text-accent-amber" />
              Electricity Units
            </span>
            <div
              className={`relative rounded-xl border transition-all duration-300 ${
                focused === 'electricity'
                  ? 'border-carbon-500/60 shadow-glow bg-surface-elevated/60'
                  : 'border-surface-border/60 bg-surface-elevated/30 hover:border-surface-border'
              }`}
            >
              <input
                type="number"
                name="electricity"
                min="0"
                step="any"
                placeholder="0"
                value={formData.electricity}
                onChange={handleChange}
                onFocus={() => setFocused('electricity')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-4 py-3 text-white font-mono text-lg placeholder-gray-600 outline-none rounded-xl"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium">
                kWh
              </span>
            </div>
          </label>

          {/* Car Travel */}
          <label className="block group">
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gray-500 mb-2">
              <Car className="w-3.5 h-3.5 text-accent-emerald" />
              Car Travel
            </span>
            <div
              className={`relative rounded-xl border transition-all duration-300 ${
                focused === 'carDistance'
                  ? 'border-carbon-500/60 shadow-glow bg-surface-elevated/60'
                  : 'border-surface-border/60 bg-surface-elevated/30 hover:border-surface-border'
              }`}
            >
              <input
                type="number"
                name="carDistance"
                min="0"
                step="any"
                placeholder="0"
                value={formData.carDistance}
                onChange={handleChange}
                onFocus={() => setFocused('carDistance')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-4 py-3 text-white font-mono text-lg placeholder-gray-600 outline-none rounded-xl"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium">
                km
              </span>
            </div>
          </label>

          {/* Bus Travel */}
          <label className="block group">
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gray-500 mb-2">
              <Bus className="w-3.5 h-3.5 text-accent-teal" />
              Bus Travel
            </span>
            <div
              className={`relative rounded-xl border transition-all duration-300 ${
                focused === 'busDistance'
                  ? 'border-carbon-500/60 shadow-glow bg-surface-elevated/60'
                  : 'border-surface-border/60 bg-surface-elevated/30 hover:border-surface-border'
              }`}
            >
              <input
                type="number"
                name="busDistance"
                min="0"
                step="any"
                placeholder="0"
                value={formData.busDistance}
                onChange={handleChange}
                onFocus={() => setFocused('busDistance')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-4 py-3 text-white font-mono text-lg placeholder-gray-600 outline-none rounded-xl"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium">
                km
              </span>
            </div>
          </label>
        </div>

        {/* Food Type Selector */}
        <div>
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">
            <Utensils className="w-3.5 h-3.5 text-accent-lime" />
            Food Type
          </span>
          <div className="grid grid-cols-3 gap-3">
            {FOOD_OPTIONS.map((opt) => {
              const isActive = formData.foodType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleFoodSelect(opt.value)}
                  className={`relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? opt.color === 'carbon'
                        ? 'border-carbon-500/60 bg-carbon-500/10 shadow-glow'
                        : opt.color === 'amber'
                        ? 'border-amber-500/60 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.1)]'
                        : 'border-rose-500/60 bg-rose-500/10 shadow-[0_0_20px_rgba(251,113,133,0.1)]'
                      : 'border-surface-border/60 bg-surface-elevated/30 hover:border-surface-border hover:bg-surface-elevated/50'
                  }`}
                >
                  <span className="text-2xl leading-none">{opt.emoji}</span>
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? opt.color === 'carbon'
                          ? 'text-carbon-400'
                          : opt.color === 'amber'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {opt.label}
                  </span>
                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                        opt.color === 'carbon'
                          ? 'bg-carbon-400'
                          : opt.color === 'amber'
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-surface-border/30" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            isValid
              ? 'bg-gradient-to-r from-carbon-600 to-carbon-500 text-white hover:from-carbon-500 hover:to-accent-emerald shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-surface-elevated/50 text-gray-600 border border-surface-border/40 cursor-not-allowed'
          }`}
        >
          <Leaf className="w-4 h-4" />
          Calculate My Footprint
        </button>
      </form>
    </div>
  );
}
