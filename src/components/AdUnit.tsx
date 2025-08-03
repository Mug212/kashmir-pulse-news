interface AdUnitProps {
  slot: string;
  className?: string;
}

export const AdUnit = ({ slot, className = "" }: AdUnitProps) => {
  return (
    <div className={`bg-ad-background border border-border/30 rounded-lg p-4 text-center ${className}`}>
      <div className="text-news-metadata text-xs mb-2">Advertisement</div>
      <div className="bg-muted/50 rounded p-8 border-2 border-dashed border-border/50">
        <div className="text-news-metadata text-sm">
          Google AdSense Slot: {slot}
        </div>
        <div className="text-news-metadata text-xs mt-1">
          Ad content will display here
        </div>
      </div>
    </div>
  );
};