export default function GradientEdge2() {
  return (
    <svg viewBox="0 0 10 10" style={{ height: 0, width: 0 }}>
      <defs>
        <linearGradient id="edgegradient2" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor="red" />
          <stop offset="95%" stopColor="gold" />
        </linearGradient>
      </defs>
      <circle cx="5" cy="5" r="4" fill="url('#myGradient')" />
    </svg>
  );
}
