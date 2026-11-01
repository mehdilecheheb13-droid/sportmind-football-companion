import { describe, expect, it } from "vitest";
import { STANDINGS } from "@/data/demo";
import { points, rankStandings } from "@/lib/standings";
import { findTeam, replyTo } from "@/lib/assistant";

describe("classement", () => {
  it("une victoire vaut 3 points et un nul 1 point", () => {
    expect(points({ team: "X", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] })).toBe(7);
  });

  it("Manchester City est en tête du classement de démo", () => {
    expect(rankStandings(STANDINGS)[0].team).toBe("Manchester City");
  });
});

describe("assistant de démonstration", () => {
  it("reconnaît le Mouloudia comme MC Alger", () => {
    expect(findTeam("parle-moi du Mouloudia")?.id).toBe("mc-alger");
  });

  it("refuse de faire de vrais pronostics", () => {
    expect(replyTo("qui va gagner ?")).toContain("pas de vrais pronostics");
  });
});
