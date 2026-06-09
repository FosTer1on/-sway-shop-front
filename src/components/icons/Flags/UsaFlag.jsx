export const UsaFlag = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="32" fill="#fff" />
    <clipPath id="usa-clip">
      <rect width="64" height="64" rx="32" />
    </clipPath>

    <g clipPath="url(#usa-clip)">
      <rect width="64" height="64" fill="#b22234" />

      {[8, 18, 28, 38, 48, 58].map((y) => (
        <rect key={y} y={y} width="64" height="5" fill="#fff" />
      ))}

      <rect width="29" height="35" fill="#3c3b6e" />

      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={4 + col * 7}
            cy={5 + row * 6}
            r="1.1"
            fill="#fff"
          />
        ))
      )}
    </g>
  </svg>
);
