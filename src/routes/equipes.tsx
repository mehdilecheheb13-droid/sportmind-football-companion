import { createFileRoute, useLocation } from "@tanstack/react-router";
import { Building2, Calendar, MapPin, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader, PageShell, TeamCrest } from "@/components/site/common";
import { TEAMS, TEAM_STATS } from "@/data/demo";

export const Route = createFileRoute("/equipes")({
  head: () => ({
    meta: [
      { title: "Équipes — SportMind AI" },
      { name: "description", content: "Fiches du Real Madrid, FC Barcelona, Manchester City, PSG et MC Alger : stade, histoire, style de jeu." },
      { property: "og:title", content: "Équipes — SportMind AI" },
      { property: "og:description", content: "Real Madrid, FC Barcelona, Manchester City, PSG et MC Alger en un coup d'œil." },
    ],
  }),
  component: Equipes,
});

function Equipes() {
  const [selected, setSelected] = useState(TEAMS[0]!.id);
  const hash = useLocation({ select: (l) => l.hash });
  useEffect(() => {
    if (hash && TEAMS.some((t) => t.id === hash)) setSelected(hash);
  }, [hash]);
  const team = TEAMS.find((t) => t.id === selected)!;
  const stats = TEAM_STATS[team.id]!;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Clubs"
        title="Équipes"
        description="Informations générales sur cinq clubs. Les statistiques affichées proviennent d'une saison fictive."
      />

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Choisir une équipe">
        {TEAMS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === selected}
            onClick={() => setSelected(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
              t.id === selected
                ? "border-primary bg-primary/15 text-foreground shadow-glow"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <TeamCrest team={t} size="sm" />
            {t.name}
          </button>
        ))}
      </div>

      <section id={team.id} className="panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]" key={team.id}>
        <div className="animate-float-in">
          <div className="flex items-center gap-4">
            <TeamCrest team={team} size="lg" />
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{team.name}</h2>
              <p className="text-pitch">« {team.nickname} » · {team.league}</p>
            </div>
          </div>
          <p className="mt-5 text-muted-foreground">{team.description}</p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { icon: MapPin, label: "Ville", value: `${team.city}, ${team.country}` },
              { icon: Calendar, label: "Fondation", value: String(team.founded) },
              { icon: Building2, label: "Stade", value: team.stadium },
              { icon: Users, label: "Capacité", value: team.capacity },
            ].map((i) => (
              <div key={i.label} className="flex items-start gap-3 rounded-xl bg-secondary/60 p-3">
                <i.icon className="mt-0.5 size-4 text-primary-glow" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{i.label}</dt>
                  <dd className="font-semibold">{i.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <h3 className="mt-6 flex items-center gap-2 font-bold">
            <Trophy className="size-4 text-warning" /> Palmarès (résumé)
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {team.honours.map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <span className="font-semibold">Style de jeu : </span>
            <span className="text-muted-foreground">{team.style}</span>
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background/50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Saison fictive (démo)
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["Buts marqués", stats.goals],
              ["Buts encaissés", stats.conceded],
              ["Possession", `${stats.possession}%`],
              ["Précision passes", `${stats.passAccuracy}%`],
              ["Tirs / match", stats.shotsPerGame],
              ["xG", stats.xg],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-card p-3">
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="font-display text-xl font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {stats.radar.map((r) => (
              <div key={r.axe}>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{r.axe}</span>
                  <span className="font-semibold">{r.value}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {TEAMS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelected(t.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="panel p-4 text-left transition-all hover:-translate-y-1 hover:border-pitch/60"
          >
            <TeamCrest team={t} />
            <p className="mt-3 font-bold">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.country} · depuis {t.founded}</p>
          </button>
        ))}
      </div>
    </PageShell>
  );
}
