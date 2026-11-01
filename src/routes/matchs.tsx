import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader, PageShell, TeamCrest } from "@/components/site/common";
import { MATCHES, TEAMS, teamById, type Match } from "@/data/demo";

export const Route = createFileRoute("/matchs")({
  head: () => ({
    meta: [
      { title: "Matchs — SportMind AI" },
      { name: "description", content: "Liste de matchs de démonstration : résultats fictifs et calendrier à venir, filtrables par équipe." },
      { property: "og:title", content: "Matchs — SportMind AI" },
      { property: "og:description", content: "Résultats fictifs et calendrier de démonstration." },
    ],
  }),
  component: Matchs,
});

const FILTERS = [
  { id: "tous", label: "Tous" },
  { id: "termine", label: "Terminés" },
  { id: "a-venir", label: "À venir" },
] as const;

function Matchs() {
  const [status, setStatus] = useState<(typeof FILTERS)[number]["id"]>("tous");
  const [team, setTeam] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(
    () =>
      MATCHES.filter(
        (m) =>
          (status === "tous" || m.status === status) &&
          (team === "all" || m.home === team || m.away === team),
      ),
    [status, team],
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Calendrier"
        title="Matchs"
        description="Rencontres fictives entre les clubs suivis. Les scores ne correspondent à aucun résultat réel."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl border border-border bg-card/60 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setStatus(f.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                status === f.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Équipe
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Toutes les équipes</option>
            {TEAMS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3">
        {list.length === 0 && (
          <p className="panel p-6 text-center text-muted-foreground">Aucun match pour ces filtres.</p>
        )}
        {list.map((m) => (
          <MatchCard key={m.id} m={m} open={open === m.id} onToggle={() => setOpen(open === m.id ? null : m.id)} />
        ))}
      </div>
    </PageShell>
  );
}

function MatchCard({ m, open, onToggle }: { m: Match; open: boolean; onToggle: () => void }) {
  const home = teamById(m.home);
  const away = teamById(m.away);
  const done = m.status === "termine";
  const date = new Date(m.date);

  return (
    <article className={`panel overflow-hidden transition-colors ${open ? "border-primary/60" : ""}`}>
      <button onClick={onToggle} className="w-full p-4 text-left sm:p-5" aria-expanded={open}>
        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{m.competition}</span>
          <span
            className={`rounded-full px-2 py-0.5 font-semibold ${
              done ? "bg-muted text-muted-foreground" : "bg-pitch/15 text-pitch"
            }`}
          >
            {done ? "Terminé (démo)" : "À venir"}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center gap-3">
            <TeamCrest team={home} />
            <span className="font-semibold max-sm:text-sm">{home?.name}</span>
          </div>
          <div className="text-center">
            {done && m.score ? (
              <p className="font-display text-2xl font-extrabold sm:text-3xl">
                {m.score[0]} <span className="text-muted-foreground">-</span> {m.score[1]}
              </p>
            ) : (
              <p className="font-display text-lg font-bold text-primary-glow">
                {date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <span className="text-right font-semibold max-sm:text-sm">{away?.name}</span>
            <TeamCrest team={away} />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          Détails <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <div className="border-t border-border bg-background/40 p-4 sm:p-5 animate-float-in">
          <p className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" /> {m.venue}
          </p>
          {done && m.possession && m.shots ? (
            <div className="space-y-4">
              <StatBar label="Possession (%)" values={m.possession} />
              <StatBar label="Tirs" values={m.shots} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Match pas encore joué. Les statistiques apparaîtront ici (données de démo).
            </p>
          )}
        </div>
      )}
    </article>
  );
}

function StatBar({ label, values }: { label: string; values: [number, number] }) {
  const total = values[0] + values[1] || 1;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-semibold">{values[0]}</span>
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{values[1]}</span>
      </div>
      <div className="flex h-2 gap-1 overflow-hidden rounded-full">
        <div className="rounded-full bg-primary" style={{ width: `${(values[0] / total) * 100}%` }} />
        <div className="rounded-full bg-pitch" style={{ width: `${(values[1] / total) * 100}%` }} />
      </div>
    </div>
  );
}
