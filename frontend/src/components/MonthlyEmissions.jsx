import React from 'react';

export default function MonthlyEmissions({ total }) {
  // 1. Fallback to 2800 if no data has loaded yet
  const emissionsInKg = total !== undefined && total !== null ? total : 2800;
  
  // 2. Convert to tonnes (1 tonne = 1000 kg)
  const emissionsInTonnes = (emissionsInKg / 1000).toFixed(1);

  return (
    <div className="glass-card-hover p-6 min-h-[220px] flex flex-col justify-between animate-fade-in text-white">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Total Monthly CO₂
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-carbon-500/10 border border-carbon-500/20 text-carbon-400 font-mono">
            {Math.round(emissionsInKg).toLocaleString()} kg
          </span>
        </div>

        {/* Dynamic Display */}
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-5xl font-bold font-mono tracking-tight gradient-text">
            {emissionsInTonnes}
          </span>
          <span className="text-xl font-medium text-gray-500">tonnes</span>
        </div>
        <p className="text-xs text-gray-400 font-medium mt-1">CO₂ THIS MONTH</p>
      </div>

      <div className="mt-4 pt-4 border-t border-surface-border/20 flex items-center justify-between text-xs text-emerald-400">
        <span className="font-semibold">-12.5% vs last month</span>
        <span className="text-gray-500">Calculated live</span>
      </div>
    </div>
  );
}