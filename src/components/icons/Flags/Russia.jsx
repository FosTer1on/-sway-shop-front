export const RussiaFlag = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="32" fill="#fff" />
    <clipPath id="russia-clip">
      <rect width="64" height="64" rx="32" />
    </clipPath>

    <g clipPath="url(#russia-clip)">
      <rect width="64" height="21.33" y="0" fill="#fff" />
      <rect width="64" height="21.33" y="21.33" fill="#0039a6" />
      <rect width="64" height="21.34" y="42.66" fill="#d52b1e" />
    </g>
  </svg>
);
