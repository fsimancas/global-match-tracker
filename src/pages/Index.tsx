import { useState, useMemo } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MatchCard from "@/components/dashboard/MatchCard";
import DeepAnalyticsPanel from "@/components/dashboard/DeepAnalyticsPanel";
import WorldMap from "@/components/dashboard/WorldMap";
import { matches, getMatchesByLeague, getAnomalyMatches, MatchData, leagues, getLeaguesByCountryCode } from "@/data/mockData";
import { Filter, TrendingUp, Search, Globe, MapPin } from "lucide-react";

const Index = () => {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [minRarity, setMinRarity] = useState(0);
  const [mapSearch, setMapSearch] = useState("");

  const displayedMatches = useMemo(() => {
    const base = selectedLeague ? getMatchesByLeague(selectedLeague) : getAnomalyMatches();
    return base.filter((m) => m.rarityIndex >= minRarity);
  }, [selectedLeague, minRarity]);

  const handleCountryClick = (countryCode: string) => {
    const countryLeagues = getLeaguesByCountryCode(countryCode);
    if (countryLeagues.length > 0) {
      setSelectedLeague(countryLeagues[0].id);
    }
  };

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar selectedLeague={selectedLeague} onSelectLeague={setSelectedLeague} />

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="border-b border-border px-6 py-4 flex items-center justify-between bg-card/50 backdrop-blur-sm shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              {selectedLeague
                ? leagues.find((l) => l.id === selectedLeague)?.name || "Liga"
                : "Mapa Mundial de Competiciones"}
            </h2>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">
              {selectedLeague
                ? `${displayedMatches.length} partidos · Jornada activa`
                : today}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Rarity Filter */}
            <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Min. Rarity</span>
              <input
                type="range"
                min={0}
                max={90}
                step={5}
                value={minRarity}
                onChange={(e) => setMinRarity(Number(e.target.value))}
                className="w-20 h-1 accent-primary"
              />
              <span className="text-xs font-mono text-primary font-bold w-6 text-right">{minRarity}</span>
            </div>

            {selectedLeague && (
              <button
                onClick={() => setSelectedLeague(null)}
                className="text-xs font-mono text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <TrendingUp className="h-3.5 w-3.5" />
                Ver mapa
              </button>
            )}
          </div>
        </header>

        {/* World Map Section (when no league selected) */}
        {!selectedLeague && (
          <div className="relative flex-shrink-0">
            {/* Map Search */}
            <div className="absolute top-4 left-4 z-10">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar país o competición..."
                  value={mapSearch}
                  onChange={(e) => setMapSearch(e.target.value)}
                  className="w-64 bg-card/90 backdrop-blur-sm border border-border rounded-md py-2 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="h-[400px] bg-background">
              <WorldMap onCountryClick={handleCountryClick} searchQuery={mapSearch} />
            </div>

            {/* Countries with matches today */}
            <div className="px-6 py-3 border-t border-border bg-card/30 flex items-center gap-3 overflow-x-auto scrollbar-thin">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase shrink-0">Hoy:</span>
              {leagues.map((l) => {
                const hasMatchesToday = matches.some(
                  (m) => m.league === l.id && m.date === new Date().toISOString().split("T")[0]
                );
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLeague(l.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                      hasMatchesToday
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                    {hasMatchesToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Match Grid */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
          <div className="mb-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              {selectedLeague ? "Partidos" : "Anomalías Globales"}
            </h3>
          </div>
          {displayedMatches.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {displayedMatches.map((match) => (
                <MatchCard key={match.id} match={match} onClick={setSelectedMatch} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <Filter className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-mono">No hay partidos con Rarity ≥ {minRarity}</p>
                <p className="text-xs mt-1">Ajusta el filtro para ver más resultados</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Deep Analytics Modal */}
      {selectedMatch && (
        <DeepAnalyticsPanel match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
};

export default Index;
