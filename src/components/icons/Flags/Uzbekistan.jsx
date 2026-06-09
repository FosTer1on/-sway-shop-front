export const UzbekistanFlag = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="32" fill="#1eb53a" />
    <clipPath id="uzbekistan-clip">
      <rect width="64" height="64" rx="32" />
    </clipPath>

    <g clipPath="url(#uzbekistan-clip)">
      <rect width="64" height="64" fill="#1eb53a" />
      <rect width="64" height="38.4" fill="#fff" />
      <rect width="64" height="21.3" fill="#0099b5" />
      <rect y="21.3" width="64" height="2.1" fill="#ce1126" />
      <rect y="40.5" width="64" height="2.1" fill="#ce1126" />

      <path d="M14 5a8 8 0 1 0 0 16 6.3 6.3 0 1 1 0-16z" fill="#fff" />

      {[
        [28, 7],
        [34, 7],
        [40, 7],
        [46, 7],
        [28, 13],
        [34, 13],
        [40, 13],
        [46, 13],
        [28, 19],
        [34, 19],
        [40, 19],
        [46, 19],
      ].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="1.2" fill="#fff" />
      ))}
    </g>
  </svg>
);
