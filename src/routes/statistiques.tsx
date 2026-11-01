import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, PageShell } from "@/components/site/common";
import { GOALS_BY_MATCHDAY, GOAL_TYPES, TEAMS, TEAM_STATS, TOP_SCORERS } from "@/data/demo";

export const Route = createFileRoute("/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques — SportMind AI" },
      { name: "description", content: "Graphiques de statistiques football : buts, possession, profil de jeu et buteurs (données de démonstration)." },
      { property: "og:title", content: "Statistiques — SportMind AI" },
      { property: "og:description", content: "Graphiques football interactifs sur une saison fictive." },
    ],
  }),
  component: Statistiques,
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
const LINE_KEYS = ["Real Madrid", "FC Barcelona", "Manchester City", "PSG", "MC Alger"];

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    color: "var(--foreground)",
  },
  labelStyle: { color: "var(--foreground)" },
  itemStyle: { color: "var(--foreground)" },
};
const axis = { stroke: "var(--muted-foreground)", fontSize: 12 };

function ChartCard({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`panel p-5 ${className}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-4 h-72">{children}</div>
    </section>
  );
}

function Statistiques() {
  const [radarTeam, setRadarTeam] = useState("barcelona");
  const [metric, setMetric] = useState<"goals" | "possession" | "passAccuracy">("goals");
  const [hidden, setHidden] = useState<string[]>([]);

  const compare = TEAMS.map((t) => ({ name: t.short, ...TEAM_STATS[t.id] }));
  const metricLabel = { goals: "Buts marqués", possession: "Possession (%)", passAccuracy: "Précision des passes (%)" }[metric];
  const totals = TEAMS.map((t) => TEAM_STATS[t.id]!.goals).reduce((a, b) => a + b, 0);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Analyse"
        title="Statistiques"
        description="Saison fictive pour illustrer l'analyse de données. Survolez les graphiques et changez les indicateurs."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          ["Buts (5 clubs)", totals],
          ["Meilleure attaque", "FC Barcelona"],
          ["Meilleure défense", "Manchester City"],
          ["Possession max.", "64% (MCI)"],
        ].map(([k, v]) => (
          <div key={k} className="panel p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
            <p className="mt-1 font-display text-xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">Comparaison des clubs</h2>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as typeof metric)}
              className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Indicateur"
            >
              <option value="goals">Buts marqués</option>
              <option value="possession">Possession</option>
              <option value="passAccuracy">Précision des passes</option>
            </select>
          </div>
          <p className="text-sm text-muted-foreground">{metricLabel}</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={compare}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" {...axis} />
                <YAxis {...axis} />
                <Tooltip {...tooltipStyle} cursor={{ fill: "var(--secondary)" }} />
                <Bar dataKey={metric} name={metricLabel} radius={[8, 8, 0, 0]}>
                  {compare.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">Profil de jeu</h2>
            <select
              value={radarTeam}
              onChange={(e) => setRadarTeam(e.target.value)}
              className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Équipe"
            >
              {TEAMS.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <p className="text-sm text-muted-foreground">Note sur 100 (évaluation fictive)</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <RadarChart data={TEAM_STATS[radarTeam]!.radar} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="axe" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Radar dataKey="value" name="Note" stroke="var(--pitch)" fill="var(--primary)" fillOpacity={0.45} />
                <Tooltip {...tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel p-5 lg:col-span-2">
          <h2 className="text-lg font-bold">Buts par journée</h2>
          <p className="text-sm text-muted-foreground">Cliquez sur une équipe de la légende pour l'afficher ou la masquer.</p>
          <div className="mt-4 h-80">
            <ResponsiveContainer>
              <LineChart data={GOALS_BY_MATCHDAY}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="journee" {...axis} />
                <YAxis allowDecimals={false} {...axis} />
                <Tooltip {...tooltipStyle} />
                <Legend
                  onClick={(e) => {
                    const k = String(e.dataKey);
                    setHidden((h) => (h.includes(k) ? h.filter((x) => x !== k) : [...h, k]));
                  }}
                  wrapperStyle={{ cursor: "pointer", fontSize: 12 }}
                />
                {LINE_KEYS.map((k, i) => (
                  <Line
                    key={k}
                    type="monotone"
                    dataKey={k}
                    hide={hidden.includes(k)}
                    stroke={COLORS[i]}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <ChartCard title="Origine des buts" subtitle="Répartition en % (démo)">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={GOAL_TYPES} dataKey="value" nameKey="type" innerRadius="55%" outerRadius="85%" paddingAngle={3} stroke="none">
                {GOAL_TYPES.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Meilleurs buteurs" subtitle="Joueurs anonymisés (démo)">
          <ResponsiveContainer>
            <BarChart data={TOP_SCORERS} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid stroke="var(--border)" horizontal={false} />
              <XAxis type="number" {...axis} allowDecimals={false} />
              <YAxis type="category" dataKey="player" width={130} {...axis} />
              <Tooltip {...tooltipStyle} cursor={{ fill: "var(--secondary)" }} />
              <Bar dataKey="goals" name="Buts" fill="var(--pitch)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </PageShell>
  );
}
