function CircularProgress({ time, totalTime }) {
  const radius = 45;

  const circumference = 2 * Math.PI * radius;

  const progress = time / totalTime;

  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#333"
          strokeWidth="8"
          fill="transparent"
          transform="rotate(-90 60 60)"
          className="transition-[stroke-dashoffset] duration-100 ease-linear "
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="white"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default CircularProgress;
