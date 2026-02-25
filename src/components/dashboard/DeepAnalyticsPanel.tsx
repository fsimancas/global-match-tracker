import { MatchData } from "@/data/mockData";
import { X } from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface DeepAnalyticsPanelProps {
  match: MatchData;
  onClose: () => void;
}

const DeepAnalyticsPanel = ({ match, onClose }: DeepAnalyticsPanelProps) => {
  const radarData = [
    { stat: "Posesión", home: match.homeStats.possession, away: match.awayStats.possession },
    { stat: "Pressing", home: match.homeStats.pressing, away: match.awayStats.pressing },
    { stat: "Directness", home: match.homeStats.directness, away: match.awayStats.directness },
    { stat: "Bloque Def.", home: match.homeStats.defensiveBlock, away: match.awayStats.defensiveBlock },
    { stat: "Balón Parado", home: match.homeStats.setPieces, away: match.awayStats.setPieces },
    { stat: "Contra", home: match.homeStats.counterAttack, away: match.awayStats.counterAttack },
  ];

  const zScores = [
    { metric: "Fatiga", home: match.fatigueZ, away: match.fatigueZ * 0.6 },
    { metric: "Presión", home: match.pressureZ, away: match.pressureZ * 0.8 },
    { metric: "Momentum", home: match.momentumZ, away: match.momentumZ * -0.5 },
  ];

  const getZClass = (z: number) => {
    const abs = Math.abs(z);
    if (abs >= 1.96) return "bg-accent/20 text-accent font-bold";
    if (abs >= 1.5) return "bg-warning/15 text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-slide-in">
      <div className="bg-card border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-lg font-bold text-foreground">{match.homeTeam} vs {match.awayTeam}</h2>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">DEEP ANALYTICS · Rarity Index {match.rarityIndex}/100</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Radar */}
          <section>
            <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">Arquetipos Tácticos (Clusters)</h3>
            <div className="flex items-center gap-4 mb-2 text-xs font-mono">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary inline-block" /> {match.homeTeam}: {match.homeCluster}</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-accent inline-block" /> {match.awayTeam}: {match.awayCluster}</span>
            </div>
            <div className="h-72 bg-secondary/30 rounded-lg p-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="stat" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar name={match.homeTeam} dataKey="home" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name={match.awayTeam} dataKey="away" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.1} strokeWidth={2} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "JetBrains Mono" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Z-Score Heatmap */}
          <section>
            <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">Heatmap de Anomalías (Z-Scores)</h3>
            <div className="rounded-lg overflow-hidden border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left p-3 font-mono text-xs text-muted-foreground">Métrica</th>
                    <th className="text-center p-3 font-mono text-xs text-muted-foreground">{match.homeTeam}</th>
                    <th className="text-center p-3 font-mono text-xs text-muted-foreground">{match.awayTeam}</th>
                  </tr>
                </thead>
                <tbody>
                  {zScores.map((row) => (
                    <tr key={row.metric} className="border-t border-border">
                      <td className="p-3 font-mono text-xs text-foreground">{row.metric}</td>
                      <td className={cn("p-3 text-center font-mono text-xs rounded-sm", getZClass(row.home))}>
                        {row.home > 0 ? "+" : ""}{row.home.toFixed(2)}σ
                      </td>
                      <td className={cn("p-3 text-center font-mono text-xs rounded-sm", getZClass(row.away))}>
                        {row.away > 0 ? "+" : ""}{row.away.toFixed(2)}σ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Standings Context */}
          <section>
            <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">Contexto Clasificatorio</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { team: match.homeTeam, ctx: match.standingsContext, isHome: true },
                { team: match.awayTeam, ctx: match.standingsContext, isHome: false },
              ].map(({ team, ctx, isHome }) => {
                const pos = isHome ? ctx.homePosition : ctx.awayPosition;
                const toTitle = isHome ? ctx.homeDistanceToTitle : ctx.awayDistanceToTitle;
                const toReleg = isHome ? ctx.homeDistanceToRelegation : ctx.awayDistanceToRelegation;
                return (
                  <div key={team} className="bg-secondary/30 rounded-lg p-4">
                    <p className="font-semibold text-sm text-foreground">{team}</p>
                    <p className="text-xs font-mono text-muted-foreground mt-1">Posición: #{pos}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-primary">→ Título</span>
                        <span className={cn(toTitle <= 3 ? "text-accent" : "text-muted-foreground")}>{toTitle} pts</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-danger">→ Descenso</span>
                        <span className={cn(toReleg <= 5 ? "text-danger animate-pulse-glow" : "text-muted-foreground")}>{toReleg} pts</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI Observation */}
          <section className="bg-secondary/20 border border-border rounded-lg p-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-2">🤖 Observación AI</h3>
            <p className="text-sm text-foreground leading-relaxed">{match.aiObservation}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeepAnalyticsPanel;
