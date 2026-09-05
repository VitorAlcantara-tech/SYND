export function SummaryMetricCard({
  label,
  value,
  detail,
  progress,
  icon: Icon,
  iconColor,
  badgeBg,
  badgeText,
  barColor,
}: {
  label: string;
  value: string;
  detail: string;
  progress: number;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  barColor: string;
}) {
  return (
    <div
      className="
        px-5
        py-5
      "
    >
      <p className="text-[18px] font-semibold text-[#F2F8FB]">
        {label}
      </p>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-[20px] font-bold text-white md:text-[20px]">
          {value}
        </span>

        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>

      <div className="mt-2">
        <span
          className={`
            inline-flex items-center rounded-[4px]
            px-2 py-[3px]
            text-[10px] font-medium
            ${badgeBg} ${badgeText}
          `}
        >
          {detail}
        </span>
      </div>

      <div className="mt-4 h-[10px] w-full overflow-hidden rounded-[3px] bg-[#08324A]">
        <div
          className={`h-full rounded-left-[3px] ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}