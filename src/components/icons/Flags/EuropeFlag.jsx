export const EuropeFlag = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="32" fill="#003399" />

    {Array.from({ length: 12 }).map((_, index) => {
      const angle = (index * 30 * Math.PI) / 180;
      const cx = 32 + Math.sin(angle) * 15;
      const cy = 32 - Math.cos(angle) * 15;

      return <circle key={index} cx={cx} cy={cy} r="2" fill="#ffcc00" />;
    })}
  </svg>
);
