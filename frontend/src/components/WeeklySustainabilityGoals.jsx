import React, { useState } from 'react'
import { CheckCircle2, Circle, Bike, Leaf, Recycle, Lightbulb, ShoppingBag } from 'lucide-react'

const initialGoals = [
  { id: 1, text: 'Bike to work 3 days', icon: Bike, completed: true, impact: '-2.4 kg CO₂' },
  { id: 2, text: 'Meatless Monday meal prep', icon: Leaf, completed: true, impact: '-1.8 kg CO₂' },
  { id: 3, text: 'Recycle all packaging', icon: Recycle, completed: false, impact: '-0.5 kg CO₂' },
  { id: 4, text: 'Switch off standby devices', icon: Lightbulb, completed: false, impact: '-0.3 kg CO₂' },
  { id: 5, text: 'Use reusable shopping bags', icon: ShoppingBag, completed: true, impact: '-0.2 kg CO₂' },
]

export default function WeeklySustainabilityGoals() {
  const [goals, setGoals] = useState(initialGoals)

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    )
  }

  const completedCount = goals.filter((g) => g.completed).length
  const totalCount = goals.length
  const completionPercent = (completedCount / totalCount) * 100

  const totalSaved = goals
    .filter((g) => g.completed)
    .reduce((sum, g) => {
      const value = parseFloat(g.impact.replace(/[^0-9.]/g, ''))
      return sum + value
    }, 0)
    .toFixed(1)

  return (
    <div className="glass-card-hover p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100">Weekly Goals</h2>
        <span className="badge-success text-xs font-mono px-2 py-0.5 rounded-full">
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-track mb-5">
        <div
          className="progress-fill bg-gradient-to-r from-carbon-500 to-accent-emerald"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      {/* Goal List */}
      <div className="space-y-0">
        {goals.map((goal) => {
          const Icon = goal.icon
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-surface-elevated/50 w-full text-left border-b border-surface-border/30 last:border-0`}
            >
              {/* Check / Circle Icon */}
              {goal.completed ? (
                <CheckCircle2 size={20} className="text-carbon-400 shrink-0" />
              ) : (
                <Circle size={20} className="text-gray-600 shrink-0" />
              )}

              {/* Category Icon */}
              <Icon
                size={16}
                className="text-gray-500 shrink-0"
              />

              {/* Goal Text */}
              <span
                className={`flex-1 text-sm ${
                  goal.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-300'
                }`}
              >
                {goal.text}
              </span>

              {/* Impact */}
              <span
                className={`text-xs font-mono shrink-0 ${
                  goal.completed ? 'text-carbon-400' : 'text-gray-600'
                }`}
              >
                {goal.impact}
              </span>
            </button>
          )
        })}
      </div>

      {/* Total Impact */}
      <div className="mt-5 pt-4 border-t border-surface-border/30">
        <p className="text-sm font-semibold text-carbon-400">
          Total saved: {totalSaved} kg CO₂
        </p>
      </div>
    </div>
  )
}
