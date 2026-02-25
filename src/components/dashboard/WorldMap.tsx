import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { leagues, getCountriesWithMatchesToday, getCountriesWithCompetitions, getLeaguesByCountryCode } from "@/data/mockData";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map country names to ISO3 codes for matching
const NAME_TO_ISO3: Record<string, string> = {
  Germany: "DEU",
  Spain: "ESP",
  Colombia: "COL",
  "United Kingdom": "GBR",
  Italy: "ITA",
  France: "FRA",
  Brazil: "BRA",
  Argentina: "ARG",
  Portugal: "PRT",
  Netherlands: "NLD",
  Belgium: "BEL",
  Turkey: "TUR",
  "United States of America": "USA",
  Mexico: "MEX",
  Japan: "JPN",
  "South Korea": "KOR",
  China: "CHN",
  "Saudi Arabia": "SAU",
};

interface WorldMapProps {
  onCountryClick: (countryCode: string) => void;
  searchQuery: string;
}

const WorldMap = ({ onCountryClick, searchQuery }: WorldMapProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const countriesWithMatches = useMemo(() => getCountriesWithMatchesToday(), []);
  const countriesWithCompetitions = useMemo(() => getCountriesWithCompetitions(), []);

  const getCountryISO3 = (geo: any): string => {
    // Try different property names
    return geo.properties?.ISO_A3 || NAME_TO_ISO3[geo.properties?.name] || geo.properties?.iso_a3 || "";
  };

  const getCountryColor = (geo: any) => {
    const iso3 = getCountryISO3(geo);
    if (countriesWithMatches.includes(iso3)) return "hsl(var(--primary))";
    if (countriesWithCompetitions.includes(iso3)) return "hsl(var(--map-hover))";
    return "hsl(var(--map-inactive))";
  };

  const getHoverColor = (geo: any) => {
    const iso3 = getCountryISO3(geo);
    if (countriesWithMatches.includes(iso3)) return "hsl(187 100% 60%)";
    if (countriesWithCompetitions.includes(iso3)) return "hsl(187 80% 50%)";
    return "hsl(222 30% 28%)";
  };

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
        className="w-full h-full"
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso3 = getCountryISO3(geo);
                const countryName = geo.properties?.name || "";
                const hasCompetitions = countriesWithCompetitions.includes(iso3);
                const hasMatchesToday = countriesWithMatches.includes(iso3);
                const matchesSearch = searchQuery
                  ? countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    leagues.some(
                      (l) =>
                        l.countryCode === iso3 &&
                        (l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.country.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                  : true;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (hasCompetitions) onCountryClick(iso3);
                    }}
                    onMouseEnter={() => setHoveredCountry(countryName)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: {
                        fill: matchesSearch ? getCountryColor(geo) : "hsl(222 30% 12%)",
                        stroke: "hsl(var(--border))",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: hasCompetitions ? "pointer" : "default",
                        opacity: searchQuery && !matchesSearch ? 0.3 : 1,
                        transition: "all 0.3s ease",
                      },
                      hover: {
                        fill: getHoverColor(geo),
                        stroke: hasCompetitions ? "hsl(var(--primary))" : "hsl(var(--border))",
                        strokeWidth: hasCompetitions ? 1.5 : 0.5,
                        outline: "none",
                        cursor: hasCompetitions ? "pointer" : "default",
                      },
                      pressed: {
                        fill: "hsl(var(--primary))",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredCountry && (
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 pointer-events-none">
          <p className="text-xs font-mono text-foreground">{hoveredCountry}</p>
          {(() => {
            const iso3 = Object.entries(NAME_TO_ISO3).find(([name]) => name === hoveredCountry)?.[1];
            if (!iso3) return null;
            const countryLeagues = getLeaguesByCountryCode(iso3);
            if (countryLeagues.length === 0) return null;
            return (
              <div className="mt-1 space-y-0.5">
                {countryLeagues.map((l) => (
                  <p key={l.id} className="text-[10px] font-mono text-primary">
                    {l.flag} {l.name}
                  </p>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-muted-foreground">Partidos hoy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-map-hover" />
            <span className="text-muted-foreground">Con competiciones</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-map-inactive" />
            <span className="text-muted-foreground">Sin datos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
