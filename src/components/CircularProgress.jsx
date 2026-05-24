import React from "react";

function CircularProgress({ 
  time, 
  totalTime, 
  size = 280, 
  strokeWidth = 3, 
  className = "" 
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Guard against divide by zero or negative bounds
  const progress = totalTime > 0 ? Math.min(Math.max(time / totalTime, 0), 1) : 0;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* SVG Container */}
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 select-none pointer-events-none"
      >
        {/* Track circle (extremely thin and elegant) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Dynamic active circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-75 ease-linear"
          style={{
            filter: "drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.2))",
          }}
        />
      </svg>
    </div>
  );
}

export default CircularProgress;
