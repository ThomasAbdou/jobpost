const TOTAL = 31;

interface SegmentedProgressBarProps {
  filledCount: number;
  showLabel?: boolean;
}

export default function SegmentedProgressBar({ filledCount, showLabel = true }: SegmentedProgressBarProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[400px]">
      {showLabel && (
        <span className="font-semibold text-[14px] leading-[16px] text-black font-[Montserrat,sans-serif]">
          Profile
        </span>
      )}
      <div className="flex gap-1 w-full">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-[4px]"
            style={{ backgroundColor: i < filledCount ? "rgb(0,0,0)" : "rgb(226,230,235)" }}
          />
        ))}
      </div>
    </div>
  );
}
