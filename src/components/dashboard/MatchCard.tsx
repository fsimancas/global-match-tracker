import { cn } from "@/lib/utils";
import { MatchData } from "@/data/mockData";
import RarityRing from "./RarityRing";
import MetricBadge from "./MetricBadge";
import MiniSparkline from "./MiniSparkline";
import { AlertTriangle, Zap, Shield } from "lucide-react";

interface MatchCardProps {
  match: MatchData;
  onClick: (match: MatchData) => void;
}

const tagConfig: Record<string, { icon: typeof AlertTriangle; label: string; className: string }> = {
  MUST_WIN: { icon: AlertTriangle, label: "MUST WIN - Escenario Crítico", className: "text-accent bg-accent/10" },
  HIGH_VOLATILITY: { icon: Zap, label: "Alta Volatilidad", className: "text-warning bg-warning/10" },
  CRITICAL_SCENARIO: { icon: AlertTriangle, label: "Escenario Crítico", className: "text-danger bg-danger/10" },
  TACTICAL_BATTLE: { icon: Shield, label: "Batalla Táctica", className: "text-primary bg-primary/10" },
};

const MatchCard = ({ match, onClick }: MatchCardProps) => {
  const tag = tagConfig[match.eventualityTag] || tagConfig.TACTICAL_BATTLE;
  const TagIcon = tag.icon;
  const isHighRarity = match.rarityIndex >= 70;

  return (
    <div
      onClick={() => onClick(match)}
      className={cn(
        "group relative bg-card rounded-lg border p-4 cursor-pointer transition-all duration-300 hover:scale-[1.01]",
        isHighRarity
          ? "border-l-4 border-l-accent border-t-border border-r-border border-b-border glow-orange"
          : "border-border hover:border-primary/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn("inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full", tag.className)}>
          <TagIcon className="h-3 w-3" />
          {tag.label}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">J{match.matchday} · {match.date}</span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between py-3">
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground text-sm">{match.homeTeam}</p>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{match.homeCluster}</p>
          <MiniSparkline data={match.xgHome} />
        </div>

        <div className="flex flex-col items-center mx-4">
          <RarityRing value={match.rarityIndex} />
          <span className="text-[9px] font-mono text-muted-foreground mt-1 uppercase">Rarity</span>
        </div>

        <div className="flex-1 text-right">
          <p className="font-semibold text-foreground text-sm">{match.awayTeam}</p>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{match.awayCluster}</p>
          <div className="flex justify-end">
            <MiniSparkline data={match.xgAway} color="hsl(var(--orange-neon))" />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mt-3 border-t border-border pt-3">
        <MetricBadge label="Fatiga" value={match.fatigue} zScore={match.fatigueZ} status={match.fatigueZ > 1.5 ? "danger" : "normal"} />
        <MetricBadge label="Presión" value={match.pressure} zScore={match.pressureZ} status={match.pressureZ > 1.5 ? "danger" : match.pressureZ > 1 ? "warning" : "normal"} />
        <MetricBadge label="Momentum" value={match.momentum} zScore={match.momentumZ} status={match.momentumZ < -1 ? "warning" : "normal"} />
      </div>

      {/* Narrative */}
      <p className="mt-3 text-xs italic text-muted-foreground line-clamp-2">
        "{match.eventualityNarrative}"
      </p>
    </div>
  );
};

export default MatchCard;
