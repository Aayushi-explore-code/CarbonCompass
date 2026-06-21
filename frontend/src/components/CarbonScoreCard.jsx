import React, { useState, useEffect } from 'react';

const SCORE_MAX = 100;
const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~282.74
const STROKE_DASHARRAY = '283';

function CarbonScoreCard({ score }) {
  // Safe default values if the parent component hasn't finished loading backend data yet
  const targetScore = score !== undefined && score !== null ? score : 72;

  const [displayScore, setDisplayScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger mount fade-in animation
    setMounted(true);

    // Animate counter from current displayScore to the targetScore received via props
    let frame;
    const duration = 1200; // ms
    const startTime = performance.now();
    const startScore = displayScore;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic calculation curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(startScore + eased * (targetScore - startScore)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [targetScore]); // Triggers smoothly every single time the user clicks "Calculate"

  const strokeOffset = CIRCUMFERENCE - (displayScore / SCORE_MAX) * CIRCUMFERENCE;

  return (
    <div
      className={`glass-card p-8 flex flex-col items-center justify-center transition-all duration-700 ${
        mounted ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      {/* Score Gauge */}
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Radial glow behind the circle */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl scale-110 pointer-events-none" />

        <svg
          width="160"
          height="160"
          viewBox="0 0 100 100"
          className="relative z-10 -rotate-90"
        >
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            className="text-surface-border"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Animated score arc */}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={STROKE_DASHARRAY}
            strokeDashoffset={strokeOffset}
            style={{
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
        </svg>

        {/* Center label inside the circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="gradient-text text-5xl font-bold font-mono leading-none">
            {displayScore}
          </span>
          <span className="stat-label mt-1 text-sm">Carbon Score</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-5">
        <span className="badge-success">Good</span>
      </div>

      {/* Subtext */}
      <p className="mt-3 text-sm text-carbon-400">
        ↑ 5 points from last month
      </p>
    </div>
  );
}

export default CarbonScoreCard;