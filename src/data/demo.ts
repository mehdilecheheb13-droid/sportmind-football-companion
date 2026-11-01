// Données de démonstration — aucune donnée en direct. Utilisées dans tout le prototype.

export type Team = {
  id: string;
  name: string;
  short: string;
  city: string;
  country: string;
  league: string;
  founded: number;
  stadium: string;
  capacity: string;
  nickname: string;
  colors: [string, string];
  honours: string[];
  description: string;
  style: string;
};

export const TEAMS: Team[] = [
  {
    id: "real-madrid",
    name: "Real Madrid",
    short: "RMA",
    city: "Madrid",
    country: "Espagne",
    league: "LaLiga",
    founded: 1902,
    stadium: "Santiago Bernabéu",
    capacity: "≈ 83 000 places",
    nickname: "Los Blancos",
    colors: ["#f5f5f5", "#d4af37"],
    honours: ["Club le plus titré en Ligue des champions", "Nombreux titres de champion d'Espagne"],
    description:
      "Club emblématique de la capitale espagnole, réputé pour son histoire européenne exceptionnelle.",
    style: "Transitions rapides et grande efficacité dans les matchs à élimination directe.",
  },
  {
    id: "barcelona",
    name: "FC Barcelona",
    short: "FCB",
    city: "Barcelone",
    country: "Espagne",
    league: "LaLiga",
    founded: 1899,
    stadium: "Spotify Camp Nou",
    capacity: "≈ 99 000 places (après rénovation)",
    nickname: "Blaugrana",
    colors: ["#a50044", "#004d98"],
    honours: ["Plusieurs Ligues des champions", "Célèbre centre de formation La Masia"],
    description:
      "Club catalan connu pour sa philosophie de jeu basée sur la possession et la formation.",
    style: "Possession, pressing haut et jeu de position.",
  },
  {
    id: "man-city",
    name: "Manchester City",
    short: "MCI",
    city: "Manchester",
    country: "Angleterre",
    league: "Premier League",
    founded: 1880,
    stadium: "Etihad Stadium",
    capacity: "≈ 53 000 places",
    nickname: "The Citizens",
    colors: ["#6cabdd", "#1c2c5b"],
    honours: ["Ligue des champions 2023", "Plusieurs titres de Premier League"],
    description: "Club anglais devenu une référence du football moderne au cours de la dernière décennie.",
    style: "Contrôle du ballon, rotations et domination territoriale.",
  },
  {
    id: "psg",
    name: "Paris Saint-Germain",
    short: "PSG",
    city: "Paris",
    country: "France",
    league: "Ligue 1",
    founded: 1970,
    stadium: "Parc des Princes",
    capacity: "≈ 48 000 places",
    nickname: "Les Parisiens",
    colors: ["#004170", "#da291c"],
    honours: ["Club le plus titré du championnat de France", "Ligue des champions 2025"],
    description: "Principal club de la capitale française, ambitieux sur la scène européenne.",
    style: "Jeu offensif, vitesse sur les ailes et pressing intense.",
  },
  {
    id: "mc-alger",
    name: "MC Alger",
    short: "MCA",
    city: "Alger",
    country: "Algérie",
    league: "Ligue 1 Mobilis",
    founded: 1921,
    stadium: "Stade du 5-Juillet-1962 (historique)",
    capacity: "≈ 64 000 places",
    nickname: "Le Mouloudia",
    colors: ["#c8102e", "#00843d"],
    honours: [
      "Coupe d'Afrique des clubs champions 1976",
      "Plusieurs titres de champion d'Algérie",
    ],
    description:
      "Le Mouloudia Club d'Alger, l'un des plus anciens et populaires clubs d'Algérie, soutenu par une immense communauté.",
    style: "Engagement physique, ferveur du public et jeu direct.",
  },
];

export const teamById = (id: string) => TEAMS.find((t) => t.id === id);

export type MatchStatus = "termine" | "a-venir";

export type Match = {
  id: string;
  competition: string;
  date: string; // ISO
  home: string; // team id or name
  away: string;
  status: MatchStatus;
  score?: [number, number];
  possession?: [number, number];
  shots?: [number, number];
  venue: string;
};

export const MATCHES: Match[] = [
  {
    id: "m1",
    competition: "Match amical (démo)",
    date: "2026-10-04T20:00:00",
    home: "real-madrid",
    away: "barcelona",
    status: "termine",
    score: [2, 2],
    possession: [46, 54],
    shots: [14, 12],
    venue: "Santiago Bernabéu",
  },
  {
    id: "m2",
    competition: "Match amical (démo)",
    date: "2026-10-11T21:00:00",
    home: "psg",
    away: "man-city",
    status: "termine",
    score: [1, 3],
    possession: [41, 59],
    shots: [9, 17],
    venue: "Parc des Princes",
  },
  {
    id: "m3",
    competition: "Tournoi SportMind (démo)",
    date: "2026-10-18T19:00:00",
    home: "mc-alger",
    away: "psg",
    status: "termine",
    score: [1, 1],
    possession: [44, 56],
    shots: [8, 13],
    venue: "Stade du 5-Juillet",
  },
  {
    id: "m4",
    competition: "Tournoi SportMind (démo)",
    date: "2026-10-25T18:30:00",
    home: "barcelona",
    away: "man-city",
    status: "termine",
    score: [3, 1],
    possession: [61, 39],
    shots: [18, 10],
    venue: "Spotify Camp Nou",
  },
  {
    id: "m5",
    competition: "Tournoi SportMind (démo)",
    date: "2026-11-08T20:00:00",
    home: "man-city",
    away: "real-madrid",
    status: "a-venir",
    venue: "Etihad Stadium",
  },
  {
    id: "m6",
    competition: "Match amical (démo)",
    date: "2026-11-15T17:00:00",
    home: "mc-alger",
    away: "barcelona",
    status: "a-venir",
    venue: "Stade du 5-Juillet",
  },
  {
    id: "m7",
    competition: "Tournoi SportMind (démo)",
    date: "2026-11-22T21:00:00",
    home: "psg",
    away: "real-madrid",
    status: "a-venir",
    venue: "Parc des Princes",
  },
  {
    id: "m8",
    competition: "Match amical (démo)",
    date: "2026-11-29T19:30:00",
    home: "barcelona",
    away: "psg",
    status: "a-venir",
    venue: "Spotify Camp Nou",
  },
];

export type StandingRow = {
  team: string; // display name
  teamId?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  form: ("V" | "N" | "D")[];
};

// Ligue fictive « SportMind League » — classement de démonstration.
export const STANDINGS: StandingRow[] = [
  { team: "Manchester City", teamId: "man-city", played: 12, won: 9, drawn: 2, lost: 1, goalsFor: 28, goalsAgainst: 9, form: ["V", "V", "N", "V", "V"] },
  { team: "Real Madrid", teamId: "real-madrid", played: 12, won: 8, drawn: 3, lost: 1, goalsFor: 25, goalsAgainst: 11, form: ["V", "N", "V", "V", "N"] },
  { team: "FC Barcelona", teamId: "barcelona", played: 12, won: 8, drawn: 2, lost: 2, goalsFor: 30, goalsAgainst: 14, form: ["V", "V", "D", "V", "V"] },
  { team: "Paris Saint-Germain", teamId: "psg", played: 12, won: 7, drawn: 3, lost: 2, goalsFor: 24, goalsAgainst: 13, form: ["N", "V", "V", "D", "V"] },
  { team: "Bayern Munich", played: 12, won: 6, drawn: 3, lost: 3, goalsFor: 22, goalsAgainst: 15, form: ["V", "D", "N", "V", "V"] },
  { team: "Inter Milan", played: 12, won: 5, drawn: 4, lost: 3, goalsFor: 17, goalsAgainst: 14, form: ["N", "N", "V", "D", "V"] },
  { team: "MC Alger", teamId: "mc-alger", played: 12, won: 5, drawn: 3, lost: 4, goalsFor: 16, goalsAgainst: 15, form: ["V", "N", "D", "V", "N"] },
  { team: "Liverpool", played: 12, won: 4, drawn: 4, lost: 4, goalsFor: 18, goalsAgainst: 17, form: ["D", "V", "N", "N", "V"] },
  { team: "Juventus", played: 12, won: 3, drawn: 5, lost: 4, goalsFor: 13, goalsAgainst: 15, form: ["N", "D", "N", "V", "N"] },
  { team: "Al Ahly", played: 12, won: 3, drawn: 3, lost: 6, goalsFor: 12, goalsAgainst: 19, form: ["D", "V", "D", "N", "D"] },
  { team: "Benfica", played: 12, won: 2, drawn: 3, lost: 7, goalsFor: 11, goalsAgainst: 22, form: ["D", "D", "N", "V", "D"] },
  { team: "Ajax", played: 12, won: 1, drawn: 2, lost: 9, goalsFor: 8, goalsAgainst: 30, form: ["D", "D", "D", "N", "D"] },
];

// Statistiques de démonstration (saison fictive)
export const TEAM_STATS: Record<
  string,
  { goals: number; conceded: number; possession: number; shotsPerGame: number; passAccuracy: number; xg: number; radar: { axe: string; value: number }[] }
> = {
  "real-madrid": { goals: 25, conceded: 11, possession: 55, shotsPerGame: 15.2, passAccuracy: 88, xg: 23.4, radar: [ { axe: "Attaque", value: 90 }, { axe: "Défense", value: 82 }, { axe: "Possession", value: 74 }, { axe: "Pressing", value: 70 }, { axe: "Coups de pied arrêtés", value: 78 }, { axe: "Contre-attaque", value: 92 } ] },
  barcelona: { goals: 30, conceded: 14, possession: 63, shotsPerGame: 16.8, passAccuracy: 90, xg: 27.1, radar: [ { axe: "Attaque", value: 92 }, { axe: "Défense", value: 72 }, { axe: "Possession", value: 94 }, { axe: "Pressing", value: 86 }, { axe: "Coups de pied arrêtés", value: 65 }, { axe: "Contre-attaque", value: 70 } ] },
  "man-city": { goals: 28, conceded: 9, possession: 64, shotsPerGame: 17.5, passAccuracy: 91, xg: 26.0, radar: [ { axe: "Attaque", value: 91 }, { axe: "Défense", value: 88 }, { axe: "Possession", value: 95 }, { axe: "Pressing", value: 84 }, { axe: "Coups de pied arrêtés", value: 74 }, { axe: "Contre-attaque", value: 72 } ] },
  psg: { goals: 24, conceded: 13, possession: 60, shotsPerGame: 15.9, passAccuracy: 89, xg: 22.8, radar: [ { axe: "Attaque", value: 88 }, { axe: "Défense", value: 78 }, { axe: "Possession", value: 85 }, { axe: "Pressing", value: 88 }, { axe: "Coups de pied arrêtés", value: 68 }, { axe: "Contre-attaque", value: 84 } ] },
  "mc-alger": { goals: 16, conceded: 15, possession: 49, shotsPerGame: 11.4, passAccuracy: 79, xg: 15.2, radar: [ { axe: "Attaque", value: 70 }, { axe: "Défense", value: 74 }, { axe: "Possession", value: 62 }, { axe: "Pressing", value: 72 }, { axe: "Coups de pied arrêtés", value: 76 }, { axe: "Contre-attaque", value: 78 } ] },
};

export const GOALS_BY_MATCHDAY = [
  { journee: "J1", "Real Madrid": 2, "FC Barcelona": 3, "Manchester City": 2, PSG: 1, "MC Alger": 1 },
  { journee: "J2", "Real Madrid": 1, "FC Barcelona": 2, "Manchester City": 3, PSG: 2, "MC Alger": 0 },
  { journee: "J3", "Real Madrid": 3, "FC Barcelona": 1, "Manchester City": 2, PSG: 3, "MC Alger": 2 },
  { journee: "J4", "Real Madrid": 2, "FC Barcelona": 4, "Manchester City": 1, PSG: 2, "MC Alger": 1 },
  { journee: "J5", "Real Madrid": 2, "FC Barcelona": 2, "Manchester City": 3, PSG: 1, "MC Alger": 2 },
  { journee: "J6", "Real Madrid": 3, "FC Barcelona": 3, "Manchester City": 2, PSG: 2, "MC Alger": 1 },
];

export const GOAL_TYPES = [
  { type: "Jeu ouvert", value: 58 },
  { type: "Contre-attaque", value: 17 },
  { type: "Coup franc / corner", value: 15 },
  { type: "Penalty", value: 10 },
];

export const TOP_SCORERS = [
  { player: "Attaquant A (RMA)", goals: 11 },
  { player: "Attaquant B (FCB)", goals: 10 },
  { player: "Attaquant C (MCI)", goals: 9 },
  { player: "Ailier D (PSG)", goals: 8 },
  { player: "Avant-centre E (MCA)", goals: 7 },
];
