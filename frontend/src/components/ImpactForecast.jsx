import { TrendingDown, TreePine, Droplets, Wind } from 'lucide-react';

const metrics = [
  { icon: TreePine, iconColor: 'text-carbon-400', value: '124', label: 'Trees Saved' },
  { icon: Droplets, iconColor: 'text-accent-teal', value: '18.5K L', label: 'Water Saved' },
  { icon: Wind, iconColor: 'text-accent-lime', value: '-32%', label: 'CO₂ Reduced' },
];

export default function ImpactForecast() {
  return (
    <div className="glass-card-hover p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Impact Forecast</h2>
        <span className="bg-surface-elevated text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-surface-border">
          2026 Projection
        </span>
      </div>

      {/* Mini Metric Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {metrics.map(({ icon: Icon, iconColor, value, label }) => (
          <div
            key={label}
            className="rounded-xl bg-surface-elevated/50 p-4 flex flex-col items-center text-center gap-2"
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <span className="font-mono font-bold text-xl text-white">{value}</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Annual Reduction Goal</span>
          <span className="text-sm font-semibold text-white">68%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill bg-gradient-to-r from-carbon-500 to-accent-teal"
            style={{ width: '68%' }}
          />
        </div>
      </div>

      {/* Motivational Forecast */}
      <div className="flex items-center gap-2">
        <TrendingDown className="w-4 h-4 text-carbon-400 shrink-0" />
        <p className="text-sm text-gray-400 italic">
          On track to reduce 4.2 tonnes by Dec 2026
        </p>
      </div>
    </div>
  );
}
