export interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeCluster: string;
  awayCluster: string;
  rarityIndex: number;
  compositeRisk: number;
  fatigueZ: number;
  pressureZ: number;
  momentumZ: number;
  fatigue: string;
  pressure: string;
  momentum: string;
  eventualityNarrative: string;
  aiObservation: string;
  eventualityTag: string;
  league: string;
  matchday: number;
  date: string;
  xgHome: number[];
  xgAway: number[];
  homeStats: TeamRadarStats;
  awayStats: TeamRadarStats;
  standingsContext: {
    homePosition: number;
    awayPosition: number;
    homeDistanceToTitle: number;
    homeDistanceToRelegation: number;
    awayDistanceToTitle: number;
    awayDistanceToRelegation: number;
  };
}

export interface TeamRadarStats {
  possession: number;
  pressing: number;
  directness: number;
  defensiveBlock: number;
  setPieces: number;
  counterAttack: number;
}

export interface League {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  matchCount: number;
  anomalyCount: number;
}

export const leagues: League[] = [
  { id: "bundesliga", name: "Bundesliga", country: "Alemania", countryCode: "DEU", flag: "🇩🇪", matchCount: 9, anomalyCount: 3 },
  { id: "laliga", name: "La Liga", country: "España", countryCode: "ESP", flag: "🇪🇸", matchCount: 10, anomalyCount: 5 },
  { id: "betplay", name: "Liga BetPlay", country: "Colombia", countryCode: "COL", flag: "🇨🇴", matchCount: 10, anomalyCount: 4 },
  { id: "premier", name: "Premier League", country: "Inglaterra", countryCode: "GBR", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", matchCount: 10, anomalyCount: 2 },
  { id: "seriea", name: "Serie A", country: "Italia", countryCode: "ITA", flag: "🇮🇹", matchCount: 10, anomalyCount: 3 },
];

// Map from country ISO3 code to whether they have matches today
export const getCountriesWithMatchesToday = (): string[] => {
  const today = new Date().toISOString().split("T")[0];
  const leaguesWithMatches = new Set(
    matches.filter((m) => m.date === today).map((m) => m.league)
  );
  return leagues
    .filter((l) => leaguesWithMatches.has(l.id))
    .map((l) => l.countryCode);
};

// Countries that have any competitions (always highlighted lightly)
export const getCountriesWithCompetitions = (): string[] => {
  return leagues.map((l) => l.countryCode);
};

export const matches: MatchData[] = [
  {
    id: "m1",
    homeTeam: "Real Madrid",
    awayTeam: "FC Barcelona",
    homeCluster: "Dominant Controller",
    awayCluster: "Positional Fluid",
    rarityIndex: 87,
    compositeRisk: 0.92,
    fatigueZ: 2.14,
    pressureZ: 1.87,
    momentumZ: -0.34,
    fatigue: "Crítica",
    pressure: "Alta",
    momentum: "-0.34",
    eventualityNarrative: "Partido decisivo para la pelea por el título con ambos equipos separados por 2 puntos",
    aiObservation: "La fatiga acumulada del Real Madrid tras la Champions sugiere vulnerabilidad en el pressing alto",
    eventualityTag: "MUST_WIN",
    league: "laliga",
    matchday: 34,
    date: "2026-02-28",
    xgHome: [2.1, 1.8, 2.4, 1.2, 2.7],
    xgAway: [1.9, 2.3, 2.1, 2.5, 1.8],
    homeStats: { possession: 85, pressing: 70, directness: 45, defensiveBlock: 60, setPieces: 75, counterAttack: 40 },
    awayStats: { possession: 90, pressing: 80, directness: 35, defensiveBlock: 50, setPieces: 65, counterAttack: 30 },
    standingsContext: { homePosition: 2, awayPosition: 1, homeDistanceToTitle: 2, homeDistanceToRelegation: 52, awayDistanceToTitle: 0, awayDistanceToRelegation: 54 },
  },
  {
    id: "m2",
    homeTeam: "Bayern München",
    awayTeam: "Borussia Dortmund",
    homeCluster: "Dominant Controller",
    awayCluster: "Direct Counter-Attacker",
    rarityIndex: 72,
    compositeRisk: 0.78,
    fatigueZ: 1.65,
    pressureZ: 0.92,
    momentumZ: 1.12,
    fatigue: "Elevada",
    pressure: "Media",
    momentum: "+1.12",
    eventualityNarrative: "Der Klassiker con Bayern intentando recuperar el liderato tras dos derrotas consecutivas",
    aiObservation: "El momentum positivo del Dortmund coincide con patrón histórico de sorpresas en este fixture",
    eventualityTag: "HIGH_VOLATILITY",
    league: "bundesliga",
    matchday: 28,
    date: "2026-03-01",
    xgHome: [3.1, 2.5, 1.8, 1.4, 2.0],
    xgAway: [1.2, 1.8, 2.2, 2.6, 2.4],
    homeStats: { possession: 88, pressing: 85, directness: 50, defensiveBlock: 55, setPieces: 70, counterAttack: 35 },
    awayStats: { possession: 55, pressing: 75, directness: 80, defensiveBlock: 70, setPieces: 60, counterAttack: 90 },
    standingsContext: { homePosition: 3, awayPosition: 1, homeDistanceToTitle: 5, homeDistanceToRelegation: 40, awayDistanceToTitle: 0, awayDistanceToRelegation: 45 },
  },
  {
    id: "m3",
    homeTeam: "Atlético Nacional",
    awayTeam: "Millonarios FC",
    homeCluster: "Aggressive Presser",
    awayCluster: "Structure Collapse",
    rarityIndex: 94,
    compositeRisk: 0.96,
    fatigueZ: 2.45,
    pressureZ: 2.12,
    momentumZ: -1.87,
    fatigue: "Extrema",
    pressure: "Crítica",
    momentum: "-1.87",
    eventualityNarrative: "Clásico colombiano con Millonarios en caída libre y riesgo de descenso indirecto",
    aiObservation: "Anomalía estadística severa: Millonarios presenta colapso estructural en métricas defensivas coincidiendo con racha de 5 derrotas",
    eventualityTag: "CRITICAL_SCENARIO",
    league: "betplay",
    matchday: 18,
    date: "2026-02-25",
    xgHome: [1.5, 2.0, 1.8, 2.2, 2.5],
    xgAway: [1.8, 1.2, 0.8, 0.5, 0.3],
    homeStats: { possession: 60, pressing: 90, directness: 70, defensiveBlock: 65, setPieces: 55, counterAttack: 75 },
    awayStats: { possession: 50, pressing: 40, directness: 60, defensiveBlock: 30, setPieces: 45, counterAttack: 55 },
    standingsContext: { homePosition: 2, awayPosition: 14, homeDistanceToTitle: 3, homeDistanceToRelegation: 20, awayDistanceToTitle: 25, awayDistanceToRelegation: 2 },
  },
  {
    id: "m4",
    homeTeam: "Atlético de Madrid",
    awayTeam: "Real Sociedad",
    homeCluster: "Defensive Block",
    awayCluster: "Positional Fluid",
    rarityIndex: 58,
    compositeRisk: 0.61,
    fatigueZ: 0.87,
    pressureZ: 1.45,
    momentumZ: 0.23,
    fatigue: "Normal",
    pressure: "Elevada",
    momentum: "+0.23",
    eventualityNarrative: "Atlético busca plaza Champions con la Sociedad como rival directo",
    aiObservation: "Partido de bajo riesgo anómalo pero alta presión clasificatoria",
    eventualityTag: "TACTICAL_BATTLE",
    league: "laliga",
    matchday: 34,
    date: "2026-02-25",
    xgHome: [1.2, 1.0, 1.5, 1.3, 1.1],
    xgAway: [1.4, 1.6, 1.3, 1.5, 1.7],
    homeStats: { possession: 45, pressing: 55, directness: 40, defensiveBlock: 92, setPieces: 80, counterAttack: 70 },
    awayStats: { possession: 65, pressing: 70, directness: 50, defensiveBlock: 55, setPieces: 60, counterAttack: 45 },
    standingsContext: { homePosition: 4, awayPosition: 5, homeDistanceToTitle: 12, homeDistanceToRelegation: 35, awayDistanceToTitle: 14, awayDistanceToRelegation: 33 },
  },
  {
    id: "m5",
    homeTeam: "Deportivo Cali",
    awayTeam: "América de Cali",
    homeCluster: "Structure Collapse",
    awayCluster: "Aggressive Presser",
    rarityIndex: 81,
    compositeRisk: 0.85,
    fatigueZ: 1.92,
    pressureZ: 2.34,
    momentumZ: -1.45,
    fatigue: "Crítica",
    pressure: "Extrema",
    momentum: "-1.45",
    eventualityNarrative: "Clásico vallecaucano con Cali luchando por evitar el descenso",
    aiObservation: "Patrón de colapso detectado: equipos en 'Structure Collapse' pierden el 73% de derbis bajo presión extrema",
    eventualityTag: "MUST_WIN",
    league: "betplay",
    matchday: 18,
    date: "2026-02-25",
    xgHome: [1.0, 0.8, 0.6, 0.9, 0.5],
    xgAway: [1.5, 1.8, 2.0, 1.7, 2.2],
    homeStats: { possession: 48, pressing: 50, directness: 65, defensiveBlock: 35, setPieces: 40, counterAttack: 60 },
    awayStats: { possession: 55, pressing: 85, directness: 70, defensiveBlock: 60, setPieces: 65, counterAttack: 55 },
    standingsContext: { homePosition: 17, awayPosition: 6, homeDistanceToTitle: 30, homeDistanceToRelegation: -2, awayDistanceToTitle: 10, awayDistanceToRelegation: 18 },
  },
];

export const getMatchesByLeague = (leagueId: string) => matches.filter(m => m.league === leagueId);
export const getAnomalyMatches = () => matches.filter(m => m.rarityIndex >= 70).sort((a, b) => b.rarityIndex - a.rarityIndex);
export const getTotalAnomalies = () => matches.filter(m => m.rarityIndex >= 70).length;
export const getLeaguesByCountryCode = (code: string) => leagues.filter(l => l.countryCode === code);
