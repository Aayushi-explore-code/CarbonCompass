import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Car, Zap, Utensils, Lightbulb, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const { name, value, color } = payload[0].payload

  return (
    <div className="glass-card px-3 py-2 !bg-surface-elevated/80 backdrop-blur-xl border border-surface-border shadow-glow text-sm">
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-white font-semibold ml-1">{value} kg</span>
      </div>
    </div>
  )
}

export default function EmissionBreakdown({ breakdown, insights }) {
  // 1. Map incoming dynamic backend parameters (with safe fallbacks)
  const electricityVal = breakdown?.electricity || 0
  const carVal = breakdown?.car || 0
  const busVal = breakdown?.bus || 0
  const foodVal = breakdown?.food || 0

  const totalCalculated = electricityVal + carVal + busVal + foodVal

  const topSource = insights?.top_emission_source || "None"
  const recommendationList = insights?.recommendations || [
    "Submit your calculator metrics above to generate custom coaching strategies."
  ]

  // 2. Format database mapping straight into your Recharts tracking structure
  const chartData = [
    { name: 'Electricity', value: Number(electricityVal.toFixed(1)), color: '#2dd4bf', icon: Zap },
    { name: 'Car Travel', value: Number(carVal.toFixed(1)), color: '#34d399', icon: Car },
    { name: 'Bus Travel', value: Number(busVal.toFixed(1)), color: '#a3e635', icon: HelpCircle },
    { name: 'Food Footprint', value: Number(foodVal.toFixed(1)), color: '#fbbf24', icon: Utensils },
  ]

  return (
    <div className="glass-card-hover p-6 animate-fade-in text-white">
      {/* Header */}
      <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
        <Lightbulb className="text-accent-teal w-5 h-5" />
        <span>Emission Breakdown & Coach</span>
      </h2>

      {/* Grid Layout splitting Donut Chart from Coach Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Left Aspect — Dynamic Donut Graphic */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-[180px] h-[180px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  cornerRadius={4}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Summary Counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-white font-mono">
                {Math.round(totalCalculated)}
              </span>
              <span className="text-[10px] text-gray-500 uppercase font-medium">Total kg</span>
            </div>
          </div>

          {/* Simple Legend List */}
          <ul className="w-full space-y-1 text-xs">
            {chartData.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <Icon size={12} className="text-gray-400" />
                  <span className="text-gray-300">{item.name}</span>
                  <span className="ml-auto font-mono text-gray-400">{item.value} kg</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right Aspect — AI Sustainability Insights Banners */}
        <div className="space-y-4 w-full">
          {/* Highlight Indicator Badge */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5">
            <AlertTriangle className="text-amber-400 w-4 h-4 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Highest Footprint Category</p>
              <p className="text-xs font-bold text-amber-200 capitalize">{topSource}</p>
            </div>
          </div>

          {/* Loop-driven Text Recommendations */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Personalized Plan:
            </h4>
            {recommendationList.map((rec, index) => (
              <div 
                key={index} 
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface/30 border border-surface-border/20 text-xs"
              >
                <CheckCircle className="text-accent-teal w-3.5 h-3.5 mt-0.5 shrink-0" />
                <p className="text-gray-300 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}