import { cn } from "@/lib/utils";
import { leagues, getTotalAnomalies } from "@/data/mockData";
import { Activity, BarChart3, ChevronRight, Search, Zap, Globe } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  selectedLeague: string | null;
  onSelectLeague: (id: string) => void;
}

const Sidebar = ({ selectedLeague, onSelectLeague }: SidebarProps) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const totalAnomalies = getTotalAnomalies();

  const filtered = leagues.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h1 className="font-bold text-sm tracking-tight text-foreground">
            INSIGHT<span className="text-primary">ENGINE</span>
          </h1>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground mt-1">Sports Intelligence System</p>
      </div>

      {/* Live Anomalies */}
      <div className="p-3 mx-3 mt-3 rounded-lg bg-accent/5 border border-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-accent animate-pulse-glow" />
            <span className="text-xs font-mono uppercase tracking-wider text-accent">Live Anomalies</span>
          </div>
          <span className="bg-accent text-accent-foreground text-xs font-mono font-bold px-1.5 py-0.5 rounded-md">
            {totalAnomalies}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 mt-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar liga o país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Leagues */}
      <nav className="flex-1 px-3 mt-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-2 mb-2">Competiciones</p>
        {filtered.map((league) => (
          <button
            key={league.id}
            onClick={() => onSelectLeague(league.id)}
            className={cn(
              "w-full flex items-center justify-between rounded-md px-2.5 py-2 text-left transition-all text-sm",
              selectedLeague === league.id
                ? "bg-primary/10 text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{league.flag}</span>
              <div>
                <p className="text-xs font-medium">{league.name}</p>
                <p className="text-[10px] text-muted-foreground">{league.matchCount} partidos</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {league.anomalyCount > 0 && (
                <span className="bg-accent/15 text-accent text-[10px] font-mono px-1.5 py-0.5 rounded">
                  {league.anomalyCount}
                </span>
              )}
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </button>
        ))}
      </nav>

      {/* Nav Links */}
      <div className="px-3 mb-2 space-y-0.5">
        <button
          onClick={() => navigate("/")}
          className={cn(
            "w-full flex items-center gap-2 rounded-md px-2.5 py-2 text-left transition-all text-sm",
            location.pathname === "/"
              ? "bg-primary/10 text-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium">Mapa Mundial</span>
        </button>
        <button
          onClick={() => navigate("/stats")}
          className={cn(
            "w-full flex items-center gap-2 rounded-md px-2.5 py-2 text-left transition-all text-sm",
            location.pathname === "/stats"
              ? "bg-primary/10 text-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <BarChart3 className="h-4 w-4" />
          <span className="text-xs font-medium">Estadísticas</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <p className="text-[9px] font-mono text-muted-foreground text-center">
          v2.0 · Intelligence as a Service
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
