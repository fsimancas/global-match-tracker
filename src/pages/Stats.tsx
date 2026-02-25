import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsTable from "@/components/stats/StatsTable";
import FormBadge from "@/components/stats/FormBadge";
import { leagues } from "@/data/mockData";
import {
  TeamStats, PlayerStats,
  getTeamsByLeague, getPlayersByLeague, getLeagueContext,
} from "@/data/statsData";
import {
  Trophy, Target, Shield, TrendingUp, BarChart3,
  CornerDownRight, Users, Activity, Timer, Crosshair,
  ChevronRight, Calendar, Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const primaryTabs = [
  { id: "standings", label: "STANDINGS" },
  { id: "form", label: "FORM" },
  { id: "overunder", label: "OVER/UNDER" },
  { id: "htft", label: "HT/FT" },
  { id: "topscorers", label: "TOP SCORERS" },
  { id: "bts", label: "BTS/CS" },
  { id: "corners", label: "CORNERS" },
  { id: "advanced", label: "ADVANCED" },
  { id: "trends", label: "TRENDS" },
];

const viewTabs = ["OVERALL", "HOME", "AWAY"] as const;
type ViewTab = typeof viewTabs[number];

const Stats = () => {
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState<string>("laliga");
  const [activeTab, setActiveTab] = useState("standings");
  const [viewTab, setViewTab] = useState<ViewTab>("OVERALL");

  const teams = useMemo(() => getTeamsByLeague(selectedLeague), [selectedLeague]);
  const players = useMemo(() => getPlayersByLeague(selectedLeague), [selectedLeague]);
  const ctx = useMemo(() => getLeagueContext(selectedLeague), [selectedLeague]);
  const league = leagues.find((l) => l.id === selectedLeague);

  const sortedTeams = useMemo(() => [...teams].sort((a, b) => a.position - b.position), [teams]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar selectedLeague={selectedLeague} onSelectLeague={setSelectedLeague} />

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Breadcrumb */}
        <div className="px-4 py-2 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground border-b border-border bg-card/30">
          <button onClick={() => navigate("/")} className="hover:text-primary transition-colors flex items-center gap-1">
            <Globe className="h-3 w-3" />
            FOOTBALL
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="flex items-center gap-1">
            {league?.flag} {league?.country.toUpperCase()}
          </span>
        </div>

        {/* League Header */}
        <div className="px-6 py-5 border-b border-border bg-card/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center text-2xl border border-border">
              {league?.flag}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">{league?.name}</h1>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">2025/2026</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1 flex-1 max-w-xs bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${ctx?.completedPct || 0}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                  <span>15.08.</span>
                  <Calendar className="h-3 w-3" />
                  <span>24.05.</span>
                </div>
              </div>
            </div>
            {ctx && (
              <div className="hidden lg:flex items-center gap-4">
                <MiniStat label="G/P" value={ctx.goalsPerMatch.toFixed(2)} />
                <MiniStat label="Local %" value={`${ctx.homeWinsPct}`} color="text-success" />
                <MiniStat label="Visit. %" value={`${ctx.awayWinsPct}`} color="text-accent" />
                <MiniStat label="Empate %" value={`${ctx.drawsPct}`} color="text-warning" />
              </div>
            )}
          </div>
        </div>

        {/* Primary Tabs */}
        <div className="px-4 py-2 border-b border-border bg-card/30 flex items-center gap-1 overflow-x-auto scrollbar-thin">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setViewTab("OVERALL"); }}
              className={cn(
                "px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wide whitespace-nowrap transition-all",
                activeTab === tab.id
                  ? "bg-destructive text-destructive-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub-tabs */}
        {["standings", "form", "overunder", "bts", "corners", "trends"].includes(activeTab) && (
          <div className="px-4 py-1.5 border-b border-border/50 flex items-center gap-1">
            {viewTabs.map((vt) => (
              <button
                key={vt}
                onClick={() => setViewTab(vt)}
                className={cn(
                  "px-3 py-1 rounded text-[11px] font-medium transition-all",
                  viewTab === vt
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {vt}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-4xl mx-auto py-4 px-4">
            {activeTab === "standings" && <StandingsView teams={sortedTeams} viewTab={viewTab} />}
            {activeTab === "form" && <FormView teams={sortedTeams} viewTab={viewTab} />}
            {activeTab === "overunder" && <OverUnderView teams={sortedTeams} />}
            {activeTab === "htft" && <HalfTimeView teams={sortedTeams} />}
            {activeTab === "topscorers" && <TopScorersView players={players} />}
            {activeTab === "bts" && <BTSView teams={sortedTeams} />}
            {activeTab === "corners" && <CornersView teams={sortedTeams} />}
            {activeTab === "advanced" && <AdvancedView teams={sortedTeams} />}
            {activeTab === "trends" && <TrendsView teams={sortedTeams} />}
          </div>
        </div>
      </main>
    </div>
  );
};

const MiniStat = ({ label, value, color }: { label: string; value: string; color?: string }) => (
  <div className="text-center">
    <p className={cn("text-sm font-bold font-mono", color || "text-foreground")}>{value}</p>
    <p className="text-[9px] font-mono text-muted-foreground uppercase">{label}</p>
  </div>
);

const StandingsView = ({ teams, viewTab }: { teams: TeamStats[]; viewTab: ViewTab }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => (
        <span className={cn("font-bold text-[11px]",
          r.position <= 4 ? "text-primary" : r.position >= 17 ? "text-destructive" : "text-muted-foreground"
        )}>{r.position}</span>
      )},
      { key: "team", label: "Team", highlight: true },
      { key: "gp", label: "MP", align: "center" },
      ...(viewTab === "OVERALL" ? [
        { key: "w", label: "W", align: "center" as const, render: (r: TeamStats) => <span className="text-success">{r.w}</span> },
        { key: "d", label: "D", align: "center" as const, render: (r: TeamStats) => <span className="text-warning">{r.d}</span> },
        { key: "l", label: "L", align: "center" as const, render: (r: TeamStats) => <span className="text-destructive">{r.l}</span> },
        { key: "gf", label: "GF", align: "center" as const },
        { key: "ga", label: "GA", align: "center" as const },
      ] : viewTab === "HOME" ? [
        { key: "homeW", label: "W", align: "center" as const, render: (r: TeamStats) => <span className="text-success">{r.homeW}</span> },
        { key: "homeD", label: "D", align: "center" as const, render: (r: TeamStats) => <span className="text-warning">{r.homeD}</span> },
        { key: "homeL", label: "L", align: "center" as const, render: (r: TeamStats) => <span className="text-destructive">{r.homeL}</span> },
        { key: "homeGoals", label: "GF", align: "center" as const },
        { key: "homeGoalsConceded", label: "GA", align: "center" as const },
      ] : [
        { key: "awayW", label: "W", align: "center" as const, render: (r: TeamStats) => <span className="text-success">{r.awayW}</span> },
        { key: "awayD", label: "D", align: "center" as const, render: (r: TeamStats) => <span className="text-warning">{r.awayD}</span> },
        { key: "awayL", label: "L", align: "center" as const, render: (r: TeamStats) => <span className="text-destructive">{r.awayL}</span> },
        { key: "awayGoals", label: "GF", align: "center" as const },
        { key: "awayGoalsConceded", label: "GA", align: "center" as const },
      ]),
      { key: "gd", label: "GD", align: "center", render: (r: TeamStats) => (
        <span className={cn("font-mono", r.gd > 0 ? "text-success" : r.gd < 0 ? "text-destructive" : "text-muted-foreground")}>
          {r.gd > 0 ? `+${r.gd}` : r.gd}
        </span>
      )},
      { key: "pts", label: "PTS", align: "center", highlight: true, render: (r: TeamStats) => (
        <span className="font-bold text-foreground">{r.pts}</span>
      )},
      { key: "form", label: "Form", render: (r: TeamStats) => (
        <FormBadge form={viewTab === "HOME" ? r.formHome : viewTab === "AWAY" ? r.formAway : r.form} />
      )},
    ]}
  />
);

const FormView = ({ teams, viewTab }: { teams: TeamStats[]; viewTab: ViewTab }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => <span className="text-muted-foreground">{r.position}</span> },
      { key: "team", label: "Team", highlight: true },
      { key: "ppg", label: "PPG", align: "center", render: (r: TeamStats) => (
        <span className="text-primary font-bold">{(viewTab === "HOME" ? r.ppgHome : viewTab === "AWAY" ? r.ppgAway : r.ppg).toFixed(2)}</span>
      )},
      { key: "form", label: "Last 5", render: (r: TeamStats) => (
        <FormBadge form={viewTab === "HOME" ? r.formHome : viewTab === "AWAY" ? r.formAway : r.form} />
      )},
      { key: "last4", label: "Last 4", render: (r: TeamStats) => <FormBadge form={r.last4} /> },
      { key: "last8", label: "Last 8", render: (r: TeamStats) => <FormBadge form={r.last8} /> },
    ]}
  />
);

const OverUnderView = ({ teams }: { teams: TeamStats[] }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => <span className="text-muted-foreground">{r.position}</span> },
      { key: "team", label: "Team", highlight: true },
      { key: "gp", label: "MP", align: "center" },
      { key: "over05", label: "0.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.over05} total={r.gp} /> },
      { key: "over15", label: "1.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.over15} total={r.gp} /> },
      { key: "over25", label: "2.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.over25} total={r.gp} /> },
      { key: "over35", label: "3.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.over35} total={r.gp} /> },
      { key: "over45", label: "4.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.over45} total={r.gp} /> },
      { key: "avgGoals", label: "AVG", align: "center", render: (r: TeamStats) => <span className="text-accent font-bold">{r.avgGoals.toFixed(2)}</span> },
    ]}
  />
);

const HalfTimeView = ({ teams }: { teams: TeamStats[] }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => <span className="text-muted-foreground">{r.position}</span> },
      { key: "team", label: "Team", highlight: true },
      { key: "htGoalsScored", label: "HT GF", align: "center", render: (r: TeamStats) => <span className="text-success">{r.htGoalsScored}</span> },
      { key: "htGoalsConceded", label: "HT GA", align: "center", render: (r: TeamStats) => <span className="text-destructive">{r.htGoalsConceded}</span> },
      { key: "avgMinuteFirstGoal", label: "Avg 1st Goal", align: "center", render: (r: TeamStats) => <span className="text-accent">{r.avgMinuteFirstGoal}'</span> },
      { key: "leadDurationPct", label: "Leading %", align: "center", render: (r: TeamStats) => <PercentBar value={r.leadDurationPct} color="success" /> },
      { key: "levelPct", label: "Level %", align: "center", render: (r: TeamStats) => <PercentBar value={r.levelPct} color="warning" /> },
      { key: "scoredBothHalves", label: "SBH", align: "center" },
    ]}
  />
);

const TopScorersView = ({ players }: { players: PlayerStats[] }) => (
  <StatsTable
    data={[...players].sort((a, b) => b.goals - a.goals)}
    columns={[
      { key: "rank", label: "#", align: "center", render: (_: PlayerStats, i?: number) => <span className="text-muted-foreground">{(i ?? 0) + 1}</span> },
      { key: "name", label: "Player", highlight: true },
      { key: "team", label: "Team" },
      { key: "goals", label: "Goals", align: "center", render: (r: PlayerStats) => <span className="text-accent font-bold text-sm">{r.goals}</span> },
      { key: "assists", label: "Assists", align: "center" },
      { key: "homeGoals", label: "Home", align: "center" },
      { key: "awayGoals", label: "Away", align: "center" },
      { key: "teamGoalsPct", label: "% Team", align: "center", render: (r: PlayerStats) => (
        <span className="text-primary">{r.teamGoalsPct.toFixed(1)}%</span>
      )},
      { key: "minutesPlayed", label: "Min", align: "center", render: (r: PlayerStats) => (
        <span className="text-muted-foreground">{r.minutesPlayed.toLocaleString()}</span>
      )},
    ]}
  />
);

const BTSView = ({ teams }: { teams: TeamStats[] }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => <span className="text-muted-foreground">{r.position}</span> },
      { key: "team", label: "Team", highlight: true },
      { key: "gp", label: "MP", align: "center" },
      { key: "bts", label: "BTS", align: "center", render: (r: TeamStats) => <OverBar value={r.bts} total={r.gp} /> },
      { key: "cs", label: "CS", align: "center", render: (r: TeamStats) => <span className="text-success font-bold">{r.cs}</span> },
      { key: "homeCS", label: "CS H", align: "center" },
      { key: "awayCS", label: "CS A", align: "center" },
      { key: "fts", label: "FTS", align: "center", render: (r: TeamStats) => <span className="text-destructive">{r.fts}</span> },
      { key: "wtn", label: "WTN", align: "center", render: (r: TeamStats) => <span className="text-success">{r.wtn}</span> },
      { key: "ltn", label: "LTN", align: "center", render: (r: TeamStats) => <span className="text-destructive">{r.ltn}</span> },
    ]}
  />
);

const CornersView = ({ teams }: { teams: TeamStats[] }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => <span className="text-muted-foreground">{r.position}</span> },
      { key: "team", label: "Team", highlight: true },
      { key: "cornersFor", label: "For", align: "center", render: (r: TeamStats) => <span className="text-success">{r.cornersFor}</span> },
      { key: "cornersAgainst", label: "Against", align: "center", render: (r: TeamStats) => <span className="text-destructive">{r.cornersAgainst}</span> },
      { key: "cornersPerMatch", label: "C/M", align: "center", render: (r: TeamStats) => r.cornersPerMatch.toFixed(1) },
      { key: "cornersOver85", label: "8.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.cornersOver85} total={r.gp} /> },
      { key: "cornersOver95", label: "9.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.cornersOver95} total={r.gp} /> },
      { key: "cornersOver105", label: "10.5+", align: "center", render: (r: TeamStats) => <OverBar value={r.cornersOver105} total={r.gp} /> },
    ]}
  />
);

const AdvancedView = ({ teams }: { teams: TeamStats[] }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => <span className="text-muted-foreground">{r.position}</span> },
      { key: "team", label: "Team", highlight: true },
      { key: "ppi", label: "PPI", align: "center", render: (r: TeamStats) => <span className="text-primary font-bold">{r.ppi.toFixed(2)}</span> },
      { key: "performanceRating", label: "Rating", align: "center", render: (r: TeamStats) => (
        <span className={cn("font-bold", r.performanceRating >= 80 ? "text-success" : r.performanceRating >= 50 ? "text-warning" : "text-destructive")}>
          {r.performanceRating}
        </span>
      )},
      { key: "pPPG", label: "pPPG", align: "center", render: (r: TeamStats) => r.pPPG.toFixed(2) },
      { key: "projectedPts", label: "Proj. Pts", align: "center", highlight: true },
      { key: "opponentsPPG", label: "Opp PPG", align: "center", render: (r: TeamStats) => r.opponentsPPG.toFixed(2) },
      { key: "remainingOpponentsPPG", label: "Rem. Opp", align: "center", render: (r: TeamStats) => (
        <span className={cn(r.remainingOpponentsPPG > r.opponentsPPG ? "text-destructive" : "text-success")}>
          {r.remainingOpponentsPPG.toFixed(2)}
        </span>
      )},
    ]}
  />
);

const TrendsView = ({ teams }: { teams: TeamStats[] }) => (
  <StatsTable
    data={teams}
    columns={[
      { key: "position", label: "#", align: "center", render: (r: TeamStats) => <span className="text-muted-foreground">{r.position}</span> },
      { key: "team", label: "Team", highlight: true },
      { key: "unbeatenRun", label: "Unbeaten", align: "center", render: (r: TeamStats) => (
        <span className={cn(r.unbeatenRun >= 5 ? "text-success font-bold" : "text-muted-foreground")}>{r.unbeatenRun}</span>
      )},
      { key: "failedToWinRun", label: "No Win", align: "center", render: (r: TeamStats) => (
        <span className={cn(r.failedToWinRun >= 3 ? "text-destructive font-bold" : "text-muted-foreground")}>{r.failedToWinRun}</span>
      )},
      { key: "scoredFirst", label: "Scored 1st", align: "center", render: (r: TeamStats) => <span className="text-success">{r.scoredFirst}</span> },
      { key: "concededFirstGoal", label: "Conceded 1st", align: "center", render: (r: TeamStats) => <span className="text-destructive">{r.concededFirstGoal}</span> },
      { key: "goalsAfter75", label: "G 75+", align: "center", render: (r: TeamStats) => <span className="text-accent">{r.goalsAfter75}</span> },
      { key: "goalsFirst15", label: "G 0-15", align: "center" },
      { key: "ptsEarnedHomePct", label: "Home %", align: "center", render: (r: TeamStats) => `${r.ptsEarnedHomePct}%` },
    ]}
  />
);

const OverBar = ({ value, total }: { value: number; total: number }) => {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-10 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", pct >= 70 ? "bg-success" : pct >= 40 ? "bg-accent" : "bg-destructive")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] font-mono w-4 text-right">{value}</span>
    </div>
  );
};

const PercentBar = ({ value, color }: { value: number; color: string }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-10 h-1.5 bg-secondary rounded-full overflow-hidden">
      <div className={cn("h-full rounded-full", `bg-${color}`)} style={{ width: `${value}%` }} />
    </div>
    <span className="text-[11px] font-mono">{value}%</span>
  </div>
);

export default Stats;
