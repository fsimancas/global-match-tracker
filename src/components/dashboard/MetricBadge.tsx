import { cn } from "@/lib/utils";

interface MetricBadgeProps {
  label: string;
  value: string;
  zScore?: number;
  status?: "normal" | "warning" | "danger";
}

const MetricBadge = ({ label, value, zScore, status = "normal" }: MetricBadgeProps) => {
  return (
    <div
      className={cn(
        "rounded-md px-3 py-2 text-center transition-all duration-300",
        status === "danger" && "bg-accent/10 glow-orange",
        status === "warning" && "bg-warning/10",
        status === "normal" && "bg-secondary"
      )}
    >
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-sm font-bold font-mono mt-0.5",
          status === "danger" && "text-accent",
          status === "warning" && "text-warning",
          status === "normal" && "text-primary"
        )}
      >
        {value}
      </p>
      {zScore !== undefined && (
        <p className={cn(
          "text-[9px] font-mono mt-0.5",
          Math.abs(zScore) > 1.96 ? "text-accent" : "text-muted-foreground"
        )}>
          σ {zScore > 0 ? "+" : ""}{zScore.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default MetricBadge;
