import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: "default" | "accent" | "success" | "danger" | "warning";
}

const variantStyles = {
  default: "border-border text-primary",
  accent: "border-accent/30 text-accent",
  success: "border-success/30 text-success",
  danger: "border-destructive/30 text-destructive",
  warning: "border-warning/30 text-warning",
};

const StatCard = ({ label, value, subtitle, icon: Icon, variant = "default" }: StatCardProps) => (
  <div className={cn("bg-card border rounded-lg p-4 flex flex-col gap-1", variantStyles[variant])}>
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
      {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
    </div>
    <span className="text-2xl font-bold font-mono">{value}</span>
    {subtitle && <span className="text-[10px] font-mono text-muted-foreground">{subtitle}</span>}
  </div>
);

export default StatCard;
