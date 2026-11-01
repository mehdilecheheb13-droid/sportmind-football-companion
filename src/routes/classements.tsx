import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownUp } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader, PageShell, TeamCrest } from "@/components/site/common";
import { STANDINGS, teamById, type StandingRow } from "@/data/demo";
import { goalDiff, points, rankStandings } from "@/lib/standings";

export const Route = createFileRoute("/classements")({
  head: () => ({
    meta: [
      { title: "Classements — SportMind AI" },
      { name: "description", content: "Classement de la SportMind League, une ligue fictive de démonstration avec points, différence de buts et forme." },
      { property: "og:title", content: "Classements — SportMind AI" },
      { property: "og:description", content: "Classement d'une ligue fictive de démonstration." },
    ],
  }),
  component: Classements,
});

type SortKey = "rang" | "pts" | "gf" | "ga" | "diff";

const SORTERS: Record<SortKey, (r: StandingRow) => number> = {
  rang: points,
  pts: points,
  gf: (r) => r.goalsFor,
  ga: (r) => -r.goalsAgainst,
  diff: goalDiff,
};

const formStyle = { V: "bg-pitch text-pitch-foreground", N: "bg-muted-foreground/40 text-foreground", D: "bg-destructive text-destructive-foreground" };

function Classements() {
  const [sort, setSort] = useState<SortKey>("rang");
  const [highlight, setHighlight] = useState<string | null>(null);
  const ranked = useMemo(() => rankStandings(STANDINGS), []);
  const rows = useMemo(
    () => (sort === "rang" ? ranked : [...ranked].sort((a, b) => SORTERS[sort](b) - SORTERS[sort](a))),
    [ranked, sort],
  );

  const SortBtn = ({ k, children }: { k: SortKey; children: string }) => (
    <button
      onClick={() => setSort(k)}
      className={`inline-flex items-center gap-1 ${sort === k ? "text-pitch" : "hover:text-foreground"}`}
    >
      {children}
      <ArrowDownUp className="size-3" />
    </button>
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="SportMind League"
        title="Classements"
        description="Ligue fictive de 12 clubs après 12 journées. Victoire = 3 pts, nul = 1 pt. Cliquez sur une colonne pour trier."
      />

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3"><SortBtn k="rang">#</SortBtn></th>
              <th className="px-2 py-3">Équipe</th>
              <th className="px-2 py-3 text-center">J</th>
              <th className="px-2 py-3 text-center">V</th>
              <th className="px-2 py-3 text-center">N</th>
              <th className="px-2 py-3 text-center">D</th>
              <th className="px-2 py-3 text-center"><SortBtn k="gf">BP</SortBtn></th>
              <th className="px-2 py-3 text-center"><SortBtn k="ga">BC</SortBtn></th>
              <th className="px-2 py-3 text-center"><SortBtn k="diff">Diff</SortBtn></th>
              <th className="px-2 py-3 text-center"><SortBtn k="pts">Pts</SortBtn></th>
              <th className="px-4 py-3">Forme</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const pos = ranked.indexOf(r) + 1;
              const zone = pos <= 4 ? "border-l-pitch" : pos >= ranked.length - 1 ? "border-l-destructive" : "border-l-transparent";
              return (
                <tr
                  key={r.team}
                  onClick={() => setHighlight(highlight === r.team ? null : r.team)}
                  className={`cursor-pointer border-b border-l-4 border-border/50 transition-colors last:border-b-0 hover:bg-secondary/60 ${zone} ${
                    highlight === r.team ? "bg-primary/15" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-display font-bold">{pos}</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2.5">
                      <TeamCrest team={r.teamId ? teamById(r.teamId) : undefined} size="sm" />
                      <span className="font-semibold">{r.team}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center text-muted-foreground">{r.played}</td>
                  <td className="px-2 py-3 text-center">{r.won}</td>
                  <td className="px-2 py-3 text-center">{r.drawn}</td>
                  <td className="px-2 py-3 text-center">{r.lost}</td>
                  <td className="px-2 py-3 text-center">{r.goalsFor}</td>
                  <td className="px-2 py-3 text-center">{r.goalsAgainst}</td>
                  <td className="px-2 py-3 text-center">{goalDiff(r) > 0 ? `+${goalDiff(r)}` : goalDiff(r)}</td>
                  <td className="px-2 py-3 text-center font-display text-base font-extrabold">{points(r)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {r.form.map((f, i) => (
                        <span key={i} className={`grid size-5 place-items-center rounded text-[10px] font-bold ${formStyle[f]}`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-pitch" /> Qualification (top 4)</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-destructive" /> Relégation</span>
        <span>V = victoire · N = nul · D = défaite · BP/BC = buts pour/contre</span>
      </div>
    </PageShell>
  );
}
