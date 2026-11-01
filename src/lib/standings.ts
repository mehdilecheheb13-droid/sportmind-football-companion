import type { StandingRow } from "@/data/demo";

export const POINTS_WIN = 3;
export const POINTS_DRAW = 1;

export const points = (r: StandingRow) => r.won * POINTS_WIN + r.drawn * POINTS_DRAW;
export const goalDiff = (r: StandingRow) => r.goalsFor - r.goalsAgainst;

/** Classement : points, puis différence de buts, puis buts marqués. */
export function rankStandings(rows: StandingRow[]) {
  return [...rows].sort(
    (a, b) => points(b) - points(a) || goalDiff(b) - goalDiff(a) || b.goalsFor - a.goalsFor,
  );
}
