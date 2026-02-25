export interface TeamStats {
  team: string;
  league: string;
  gp: number;
  homeGP: number;
  awayGP: number;
  w: number;
  d: number;
  l: number;
  homeW: number;
  homeD: number;
  homeL: number;
  awayW: number;
  awayD: number;
  awayL: number;
  form: string;
  formHome: string;
  formAway: string;
  last4: string;
  last8: string;
  gf: number;
  ga: number;
  gd: number;
  goalsPerMatch: number;
  homeGoals: number;
  awayGoals: number;
  homeGoalsConceded: number;
  awayGoalsConceded: number;
  htGoalsScored: number;
  htGoalsConceded: number;
  avgMinuteFirstGoal: number;
  leadDurationPct: number;
  levelPct: number;
  over05: number;
  over15: number;
  over25: number;
  over35: number;
  over45: number;
  avgGoals: number;
  bts: number;
  cs: number;
  homeCS: number;
  awayCS: number;
  fts: number;
  wtn: number;
  ltn: number;
  pts: number;
  ppg: number;
  ppgHome: number;
  ppgAway: number;
  position: number;
  ppi: number;
  performanceRating: number;
  pPPG: number;
  projectedPts: number;
  opponentsPPG: number;
  remainingOpponentsPPG: number;
  scoredFirst: number;
  leadDefendingRate: number;
  equalizingRate: number;
  cornersFor: number;
  cornersAgainst: number;
  cornersPerMatch: number;
  cornersOver85: number;
  cornersOver95: number;
  cornersOver105: number;
  unbeatenRun: number;
  failedToWinRun: number;
  failedToScoreRun: number;
  concededFirstGoal: number;
  goalsAfter75: number;
  goalsFirst15: number;
  ptsEarnedHomePct: number;
  ptsEarnedAwayPct: number;
  scoredBothHalves: number;
}

export interface PlayerStats {
  name: string;
  team: string;
  league: string;
  age: number;
  goals: number;
  homeGoals: number;
  awayGoals: number;
  teamGoalsPct: number;
  assists: number;
  minutesPlayed: number;
  goalsPerMatch: number;
}

export interface LeagueContextStats {
  league: string;
  homeWinsPct: number;
  awayWinsPct: number;
  drawsPct: number;
  completedPct: number;
  totalGoals: number;
  goalsPerMatch: number;
  homeGoalsPerMatch: number;
  awayGoalsPerMatch: number;
  noGoalMatches: number;
  btsMatches: number;
}

export const teamStats: TeamStats[] = [
  {
    team: "Real Madrid", league: "laliga", gp: 33, homeGP: 17, awayGP: 16,
    w: 24, d: 5, l: 4, homeW: 14, homeD: 2, homeL: 1, awayW: 10, awayD: 3, awayL: 3,
    form: "WWDWL", formHome: "WWWDW", formAway: "WDLWW", last4: "WWDW", last8: "WWDWLWWW",
    gf: 72, ga: 28, gd: 44, goalsPerMatch: 2.18, homeGoals: 42, awayGoals: 30, homeGoalsConceded: 10, awayGoalsConceded: 18,
    htGoalsScored: 32, htGoalsConceded: 11, avgMinuteFirstGoal: 22, leadDurationPct: 58, levelPct: 24,
    over05: 31, over15: 27, over25: 21, over35: 12, over45: 5, avgGoals: 3.03,
    bts: 20, cs: 14, homeCS: 9, awayCS: 5, fts: 3, wtn: 10, ltn: 1,
    pts: 77, ppg: 2.33, ppgHome: 2.65, ppgAway: 2.0, position: 2,
    ppi: 3.73, performanceRating: 88, pPPG: 2.28, projectedPts: 88, opponentsPPG: 1.6, remainingOpponentsPPG: 1.72,
    scoredFirst: 22, leadDefendingRate: 82, equalizingRate: 60,
    cornersFor: 198, cornersAgainst: 132, cornersPerMatch: 10.0, cornersOver85: 24, cornersOver95: 18, cornersOver105: 12,
    unbeatenRun: 8, failedToWinRun: 0, failedToScoreRun: 0, concededFirstGoal: 11, goalsAfter75: 14, goalsFirst15: 8, ptsEarnedHomePct: 61, ptsEarnedAwayPct: 39, scoredBothHalves: 18,
  },
  {
    team: "FC Barcelona", league: "laliga", gp: 33, homeGP: 17, awayGP: 16,
    w: 25, d: 4, l: 4, homeW: 15, homeD: 1, homeL: 1, awayW: 10, awayD: 3, awayL: 3,
    form: "WLWWW", formHome: "WWWWL", formAway: "WWDWL", last4: "WLWW", last8: "WLWWWDWW",
    gf: 78, ga: 25, gd: 53, goalsPerMatch: 2.36, homeGoals: 48, awayGoals: 30, homeGoalsConceded: 8, awayGoalsConceded: 17,
    htGoalsScored: 38, htGoalsConceded: 9, avgMinuteFirstGoal: 18, leadDurationPct: 62, levelPct: 20,
    over05: 32, over15: 29, over25: 24, over35: 15, over45: 7, avgGoals: 3.12,
    bts: 18, cs: 16, homeCS: 11, awayCS: 5, fts: 2, wtn: 13, ltn: 1,
    pts: 79, ppg: 2.39, ppgHome: 2.76, ppgAway: 2.0, position: 1,
    ppi: 3.95, performanceRating: 92, pPPG: 2.35, projectedPts: 91, opponentsPPG: 1.65, remainingOpponentsPPG: 1.58,
    scoredFirst: 25, leadDefendingRate: 88, equalizingRate: 67,
    cornersFor: 210, cornersAgainst: 118, cornersPerMatch: 9.9, cornersOver85: 22, cornersOver95: 17, cornersOver105: 11,
    unbeatenRun: 4, failedToWinRun: 0, failedToScoreRun: 0, concededFirstGoal: 8, goalsAfter75: 16, goalsFirst15: 10, ptsEarnedHomePct: 63, ptsEarnedAwayPct: 37, scoredBothHalves: 21,
  },
  {
    team: "Atlético de Madrid", league: "laliga", gp: 33, homeGP: 17, awayGP: 16,
    w: 20, d: 8, l: 5, homeW: 12, homeD: 4, homeL: 1, awayW: 8, awayD: 4, awayL: 4,
    form: "DWWDW", formHome: "WDWWW", formAway: "DWDLW", last4: "DWWD", last8: "DWWDWWDL",
    gf: 55, ga: 30, gd: 25, goalsPerMatch: 1.67, homeGoals: 32, awayGoals: 23, homeGoalsConceded: 10, awayGoalsConceded: 20,
    htGoalsScored: 22, htGoalsConceded: 12, avgMinuteFirstGoal: 32, leadDurationPct: 42, levelPct: 35,
    over05: 28, over15: 22, over25: 15, over35: 7, over45: 2, avgGoals: 2.58,
    bts: 16, cs: 15, homeCS: 10, awayCS: 5, fts: 5, wtn: 9, ltn: 2,
    pts: 68, ppg: 2.06, ppgHome: 2.35, ppgAway: 1.75, position: 3,
    ppi: 3.30, performanceRating: 78, pPPG: 2.0, projectedPts: 82, opponentsPPG: 1.6, remainingOpponentsPPG: 1.80,
    scoredFirst: 18, leadDefendingRate: 78, equalizingRate: 55,
    cornersFor: 165, cornersAgainst: 145, cornersPerMatch: 9.4, cornersOver85: 20, cornersOver95: 14, cornersOver105: 8,
    unbeatenRun: 5, failedToWinRun: 0, failedToScoreRun: 0, concededFirstGoal: 15, goalsAfter75: 10, goalsFirst15: 5, ptsEarnedHomePct: 59, ptsEarnedAwayPct: 41, scoredBothHalves: 14,
  },
  {
    team: "Bayern München", league: "bundesliga", gp: 27, homeGP: 14, awayGP: 13,
    w: 19, d: 4, l: 4, homeW: 12, homeD: 1, homeL: 1, awayW: 7, awayD: 3, awayL: 3,
    form: "WLWDW", formHome: "WWWLW", formAway: "WDWLW", last4: "WLWD", last8: "WLWDWWWL",
    gf: 68, ga: 26, gd: 42, goalsPerMatch: 2.52, homeGoals: 40, awayGoals: 28, homeGoalsConceded: 8, awayGoalsConceded: 18,
    htGoalsScored: 30, htGoalsConceded: 10, avgMinuteFirstGoal: 20, leadDurationPct: 55, levelPct: 22,
    over05: 26, over15: 24, over25: 20, over35: 14, over45: 6, avgGoals: 3.48,
    bts: 18, cs: 10, homeCS: 7, awayCS: 3, fts: 2, wtn: 8, ltn: 1,
    pts: 61, ppg: 2.26, ppgHome: 2.64, ppgAway: 1.85, position: 3,
    ppi: 3.62, performanceRating: 85, pPPG: 2.20, projectedPts: 75, opponentsPPG: 1.6, remainingOpponentsPPG: 1.65,
    scoredFirst: 19, leadDefendingRate: 80, equalizingRate: 58,
    cornersFor: 175, cornersAgainst: 105, cornersPerMatch: 10.4, cornersOver85: 20, cornersOver95: 15, cornersOver105: 10,
    unbeatenRun: 3, failedToWinRun: 0, failedToScoreRun: 0, concededFirstGoal: 8, goalsAfter75: 12, goalsFirst15: 7, ptsEarnedHomePct: 62, ptsEarnedAwayPct: 38, scoredBothHalves: 16,
  },
  {
    team: "Borussia Dortmund", league: "bundesliga", gp: 27, homeGP: 14, awayGP: 13,
    w: 17, d: 5, l: 5, homeW: 11, homeD: 2, homeL: 1, awayW: 6, awayD: 3, awayL: 4,
    form: "WWWDL", formHome: "WWWWD", formAway: "WDLLW", last4: "WWWD", last8: "WWWDLWWW",
    gf: 60, ga: 32, gd: 28, goalsPerMatch: 2.22, homeGoals: 38, awayGoals: 22, homeGoalsConceded: 10, awayGoalsConceded: 22,
    htGoalsScored: 26, htGoalsConceded: 14, avgMinuteFirstGoal: 25, leadDurationPct: 48, levelPct: 28,
    over05: 25, over15: 22, over25: 18, over35: 10, over45: 4, avgGoals: 3.41,
    bts: 19, cs: 8, homeCS: 6, awayCS: 2, fts: 3, wtn: 6, ltn: 2,
    pts: 56, ppg: 2.07, ppgHome: 2.50, ppgAway: 1.62, position: 1,
    ppi: 3.31, performanceRating: 82, pPPG: 2.10, projectedPts: 72, opponentsPPG: 1.6, remainingOpponentsPPG: 1.55,
    scoredFirst: 17, leadDefendingRate: 76, equalizingRate: 52,
    cornersFor: 162, cornersAgainst: 130, cornersPerMatch: 10.8, cornersOver85: 22, cornersOver95: 16, cornersOver105: 11,
    unbeatenRun: 4, failedToWinRun: 0, failedToScoreRun: 0, concededFirstGoal: 10, goalsAfter75: 11, goalsFirst15: 6, ptsEarnedHomePct: 63, ptsEarnedAwayPct: 37, scoredBothHalves: 15,
  },
  {
    team: "Atlético Nacional", league: "betplay", gp: 17, homeGP: 9, awayGP: 8,
    w: 11, d: 3, l: 3, homeW: 7, homeD: 1, homeL: 1, awayW: 4, awayD: 2, awayL: 2,
    form: "WWDWW", formHome: "WWWDW", formAway: "WDLWW", last4: "WWDW", last8: "WWDWWLWW",
    gf: 28, ga: 14, gd: 14, goalsPerMatch: 1.65, homeGoals: 18, awayGoals: 10, homeGoalsConceded: 4, awayGoalsConceded: 10,
    htGoalsScored: 12, htGoalsConceded: 5, avgMinuteFirstGoal: 28, leadDurationPct: 50, levelPct: 30,
    over05: 15, over15: 12, over25: 8, over35: 3, over45: 1, avgGoals: 2.47,
    bts: 9, cs: 7, homeCS: 5, awayCS: 2, fts: 3, wtn: 5, ltn: 1,
    pts: 36, ppg: 2.12, ppgHome: 2.44, ppgAway: 1.75, position: 2,
    ppi: 2.97, performanceRating: 80, pPPG: 2.05, projectedPts: 45, opponentsPPG: 1.4, remainingOpponentsPPG: 1.50,
    scoredFirst: 12, leadDefendingRate: 75, equalizingRate: 50,
    cornersFor: 85, cornersAgainst: 68, cornersPerMatch: 9.0, cornersOver85: 10, cornersOver95: 7, cornersOver105: 4,
    unbeatenRun: 5, failedToWinRun: 0, failedToScoreRun: 0, concededFirstGoal: 5, goalsAfter75: 6, goalsFirst15: 4, ptsEarnedHomePct: 64, ptsEarnedAwayPct: 36, scoredBothHalves: 8,
  },
  {
    team: "Millonarios FC", league: "betplay", gp: 17, homeGP: 9, awayGP: 8,
    w: 4, d: 5, l: 8, homeW: 3, homeD: 3, homeL: 3, awayW: 1, awayD: 2, awayL: 5,
    form: "LLLLD", formHome: "DLWLD", formAway: "LLLLD", last4: "LLLL", last8: "LLLLDWDL",
    gf: 15, ga: 24, gd: -9, goalsPerMatch: 0.88, homeGoals: 10, awayGoals: 5, homeGoalsConceded: 9, awayGoalsConceded: 15,
    htGoalsScored: 5, htGoalsConceded: 12, avgMinuteFirstGoal: 42, leadDurationPct: 18, levelPct: 40,
    over05: 14, over15: 10, over25: 6, over35: 2, over45: 0, avgGoals: 2.29,
    bts: 8, cs: 4, homeCS: 3, awayCS: 1, fts: 7, wtn: 2, ltn: 5,
    pts: 17, ppg: 1.0, ppgHome: 1.33, ppgAway: 0.63, position: 14,
    ppi: 1.40, performanceRating: 35, pPPG: 0.95, projectedPts: 23, opponentsPPG: 1.4, remainingOpponentsPPG: 1.60,
    scoredFirst: 5, leadDefendingRate: 40, equalizingRate: 25,
    cornersFor: 62, cornersAgainst: 82, cornersPerMatch: 8.5, cornersOver85: 8, cornersOver95: 5, cornersOver105: 2,
    unbeatenRun: 0, failedToWinRun: 5, failedToScoreRun: 2, concededFirstGoal: 12, goalsAfter75: 3, goalsFirst15: 1, ptsEarnedHomePct: 71, ptsEarnedAwayPct: 29, scoredBothHalves: 3,
  },
  {
    team: "Deportivo Cali", league: "betplay", gp: 17, homeGP: 9, awayGP: 8,
    w: 3, d: 4, l: 10, homeW: 2, homeD: 3, homeL: 4, awayW: 1, awayD: 1, awayL: 6,
    form: "LLLDL", formHome: "DLLDL", formAway: "LLLDL", last4: "LLDL", last8: "LLLDLDDL",
    gf: 12, ga: 28, gd: -16, goalsPerMatch: 0.71, homeGoals: 8, awayGoals: 4, homeGoalsConceded: 11, awayGoalsConceded: 17,
    htGoalsScored: 4, htGoalsConceded: 14, avgMinuteFirstGoal: 48, leadDurationPct: 12, levelPct: 38,
    over05: 15, over15: 11, over25: 8, over35: 4, over45: 1, avgGoals: 2.35,
    bts: 7, cs: 3, homeCS: 2, awayCS: 1, fts: 8, wtn: 1, ltn: 6,
    pts: 13, ppg: 0.76, ppgHome: 1.0, ppgAway: 0.50, position: 17,
    ppi: 1.07, performanceRating: 25, pPPG: 0.80, projectedPts: 19, opponentsPPG: 1.4, remainingOpponentsPPG: 1.45,
    scoredFirst: 4, leadDefendingRate: 33, equalizingRate: 20,
    cornersFor: 55, cornersAgainst: 90, cornersPerMatch: 8.5, cornersOver85: 9, cornersOver95: 6, cornersOver105: 3,
    unbeatenRun: 0, failedToWinRun: 4, failedToScoreRun: 3, concededFirstGoal: 13, goalsAfter75: 2, goalsFirst15: 1, ptsEarnedHomePct: 75, ptsEarnedAwayPct: 25, scoredBothHalves: 2,
  },
];

export const playerStats: PlayerStats[] = [
  { name: "Robert Lewandowski", team: "FC Barcelona", league: "laliga", age: 37, goals: 22, homeGoals: 14, awayGoals: 8, teamGoalsPct: 28.2, assists: 5, minutesPlayed: 2640, goalsPerMatch: 0.73 },
  { name: "Vinícius Jr.", team: "Real Madrid", league: "laliga", age: 25, goals: 18, homeGoals: 11, awayGoals: 7, teamGoalsPct: 25.0, assists: 10, minutesPlayed: 2520, goalsPerMatch: 0.60 },
  { name: "Antoine Griezmann", team: "Atlético de Madrid", league: "laliga", age: 35, goals: 14, homeGoals: 8, awayGoals: 6, teamGoalsPct: 25.5, assists: 7, minutesPlayed: 2700, goalsPerMatch: 0.47 },
  { name: "Harry Kane", team: "Bayern München", league: "bundesliga", age: 32, goals: 24, homeGoals: 15, awayGoals: 9, teamGoalsPct: 35.3, assists: 8, minutesPlayed: 2340, goalsPerMatch: 0.89 },
  { name: "Serhou Guirassy", team: "Borussia Dortmund", league: "bundesliga", age: 30, goals: 18, homeGoals: 12, awayGoals: 6, teamGoalsPct: 30.0, assists: 4, minutesPlayed: 2160, goalsPerMatch: 0.67 },
  { name: "Dayro Moreno", team: "Atlético Nacional", league: "betplay", age: 40, goals: 10, homeGoals: 7, awayGoals: 3, teamGoalsPct: 35.7, assists: 2, minutesPlayed: 1350, goalsPerMatch: 0.59 },
  { name: "Leonardo Castro", team: "Millonarios FC", league: "betplay", age: 34, goals: 5, homeGoals: 4, awayGoals: 1, teamGoalsPct: 33.3, assists: 1, minutesPlayed: 1260, goalsPerMatch: 0.29 },
];

export const leagueContextStats: LeagueContextStats[] = [
  { league: "laliga", homeWinsPct: 46, awayWinsPct: 28, drawsPct: 26, completedPct: 87, totalGoals: 856, goalsPerMatch: 2.71, homeGoalsPerMatch: 1.52, awayGoalsPerMatch: 1.19, noGoalMatches: 12, btsMatches: 178 },
  { league: "bundesliga", homeWinsPct: 44, awayWinsPct: 30, drawsPct: 26, completedPct: 82, totalGoals: 720, goalsPerMatch: 2.96, homeGoalsPerMatch: 1.68, awayGoalsPerMatch: 1.28, noGoalMatches: 8, btsMatches: 152 },
  { league: "betplay", homeWinsPct: 48, awayWinsPct: 24, drawsPct: 28, completedPct: 85, totalGoals: 380, goalsPerMatch: 2.24, homeGoalsPerMatch: 1.32, awayGoalsPerMatch: 0.92, noGoalMatches: 18, btsMatches: 88 },
];

export const getTeamsByLeague = (leagueId: string) => teamStats.filter(t => t.league === leagueId);
export const getPlayersByLeague = (leagueId: string) => playerStats.filter(p => p.league === leagueId);
export const getLeagueContext = (leagueId: string) => leagueContextStats.find(l => l.league === leagueId);
export const getAllTeams = () => teamStats;
