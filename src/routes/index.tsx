import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Bot, CalendarDays, ListOrdered, Shield } from "lucide-react";
import hero from "@/assets/stadium-hero.jpg";
import { LogoMark } from "@/components/site/Logo";
import { DemoBadge, TeamCrest } from "@/components/site/common";
import { MATCHES, STANDINGS, TEAMS, teamById } from "@/data/demo";
import { points, rankStandings } from "@/lib/standings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SportMind AI — Accueil" },
      { name: "description", content: "SportMind AI : le football analysé par la donnée. Équipes, matchs, classements, statistiques et assistant de démonstration." },
      { property: "og:title", content: "SportMind AI — Accueil" },
      { property: "og:description", content: "Le football analysé par la donnée — prototype avec données de démonstration." },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { to: "/equipes", icon: Shield, title: "Équipes", text: "5 clubs majeurs, de Madrid à Alger." },
  { to: "/matchs", icon: CalendarDays, title: "Matchs", text: "Résultats et calendrier de démo." },
  { to: "/classements", icon: ListOrdered, title: "Classements", text: "Une ligue fictive triable." },
  { to: "/statistiques", icon: BarChart3, title: "Statistiques", text: "Graphiques interactifs." },
  { to: "/assistant", icon: Bot, title: "Assistant IA", text: "Chatbot football à règles." },
] as const;

function Index() {
  const leader = rankStandings(STANDINGS)[0];
  const next = MATCHES.find((m) => m.status === "a-venir");
  const played = MATCHES.filter((m) => m.status === "termine");
  const goals = played.reduce((acc, m) => acc + (m.score ? m.score[0] + m.score[1] : 0), 0);

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden">
        <img
          src={hero}
          alt="Stade de football de nuit éclairé en violet et vert"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 pb-24 pt-20 sm:px-6 sm:pt-28 animate-float-in">
          <div className="mb-6 flex items-center gap-3">
            <LogoMark className="size-14 drop-shadow-xl" />
            <DemoBadge>Prototype universitaire</DemoBadge>
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Le football, lu par <span className="text-gradient-brand">la donnée</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            SportMind AI réunit équipes, matchs, classements et statistiques dans un tableau de bord
            moderne, avec un assistant conversationnel pour explorer les chiffres.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/statistiques"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Explorer les statistiques <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-5 py-3 font-semibold backdrop-blur transition-colors hover:bg-secondary"
            >
              <Bot className="size-4 text-pitch" /> Parler à l'assistant
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-12 grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
        <div className="panel relative p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Leader (démo)</p>
          <div className="mt-3 flex items-center gap-3">
            <TeamCrest team={leader.teamId ? teamById(leader.teamId) : undefined} />
            <div>
              <p className="font-display text-lg font-bold">{leader.team}</p>
              <p className="text-sm text-pitch">{points(leader)} points</p>
            </div>
          </div>
        </div>
        <div className="panel relative p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Prochain match (démo)</p>
          {next && (
            <div className="mt-3 flex items-center gap-2">
              <TeamCrest team={teamById(next.home)} size="sm" />
              <span className="font-display font-bold">{teamById(next.home)?.short}</span>
              <span className="text-muted-foreground">vs</span>
              <span className="font-display font-bold">{teamById(next.away)?.short}</span>
              <TeamCrest team={teamById(next.away)} size="sm" />
              <span className="ml-auto text-sm text-muted-foreground">
                {new Date(next.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
              </span>
            </div>
          )}
        </div>
        <div className="panel relative p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Buts sur {played.length} matchs (démo)</p>
          <p className="mt-2 font-display text-4xl font-extrabold text-gradient-brand">{goals}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Tout le tableau de bord</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURES.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="panel group p-5 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary-glow">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              <ArrowRight className="mt-4 size-4 text-pitch transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <p className="text-sm text-muted-foreground">Clubs suivis :</p>
          {TEAMS.map((t) => (
            <Link
              key={t.id}
              to="/equipes"
              hash={t.id}
              className="flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 pl-1 pr-3 text-sm transition-colors hover:border-pitch/60"
            >
              <TeamCrest team={t} size="sm" />
              {t.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
