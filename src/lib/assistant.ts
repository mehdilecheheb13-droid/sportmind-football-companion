import { MATCHES, STANDINGS, TEAMS, TEAM_STATS, teamById } from "@/data/demo";
import { points, rankStandings } from "@/lib/standings";

/**
 * Assistant de démonstration à règles (mots-clés).
 * Aucun modèle d'IA n'est connecté : les réponses sont générées à partir des données de démo.
 */

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const TEAM_ALIASES: Record<string, string[]> = {
  "real-madrid": ["real", "madrid", "rma", "merengue", "blancos"],
  barcelona: ["barca", "barcelone", "barcelona", "fcb", "blaugrana"],
  "man-city": ["city", "manchester", "mci", "citizens"],
  psg: ["psg", "paris"],
  "mc-alger": ["mca", "mouloudia", "alger", "mc alger"],
};

export function findTeam(text: string) {
  const t = normalize(text);
  for (const [id, aliases] of Object.entries(TEAM_ALIASES)) {
    if (aliases.some((a) => t.includes(a))) return teamById(id);
  }
  return undefined;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

const nameOf = (id: string) => teamById(id)?.name ?? id;

export function replyTo(input: string): string {
  const t = normalize(input.trim());
  if (!t) return "Posez-moi une question sur le football 😊";

  if (/^(salut|bonjour|bonsoir|hello|coucou|salam)/.test(t)) {
    return "Bonjour ! Je suis l'assistant de démonstration SportMind. Demandez-moi une équipe, le classement, les prochains matchs ou les meilleurs buteurs.";
  }

  if (/(pronostic|prediction|predire|gagner|qui va)/.test(t)) {
    return "Je ne fais pas de vrais pronostics : aucun modèle prédictif n'est connecté à ce prototype. Je peux en revanche comparer les statistiques de démo de deux équipes.";
  }

  const team = findTeam(t);

  if (/(classement|leader|premier|tete|table)/.test(t)) {
    const ranked = rankStandings(STANDINGS);
    if (team) {
      const pos = ranked.findIndex((r) => r.teamId === team.id);
      if (pos >= 0) {
        const row = ranked[pos];
        return `${team.name} est ${pos + 1}${pos === 0 ? "er" : "e"} du classement de démo avec ${points(row)} points (${row.won}V ${row.drawn}N ${row.lost}D).`;
      }
    }
    const top = ranked.slice(0, 3).map((r, i) => `${i + 1}. ${r.team} – ${points(r)} pts`);
    return `Podium du classement de démonstration :\n${top.join("\n")}`;
  }

  if (/(prochain|match|calendrier|quand|joue)/.test(t)) {
    const upcoming = MATCHES.filter(
      (m) => m.status === "a-venir" && (!team || m.home === team.id || m.away === team.id),
    );
    if (!upcoming.length) return "Aucun match à venir trouvé dans les données de démo.";
    const m = upcoming[0];
    return `Prochain match${team ? ` de ${team.name}` : ""} (démo) : ${nameOf(m.home)} – ${nameOf(m.away)}, ${fmtDate(m.date)} au ${m.venue}.`;
  }

  if (/(buteur|but|marque|attaque)/.test(t) && !team) {
    return "Meilleur buteur de démo : Attaquant A (RMA) avec 11 buts. Le FC Barcelona possède l'attaque la plus prolifique (30 buts).";
  }

  if (team) {
    const s = TEAM_STATS[team.id];
    return `${team.name} (${team.nickname}) — fondé en ${team.founded}, joue au ${team.stadium}. Style : ${team.style}${
      s ? ` Stats de démo : ${s.goals} buts marqués, ${s.possession}% de possession moyenne.` : ""
    }`;
  }

  if (/(equipe|club)/.test(t)) {
    return `Équipes disponibles : ${TEAMS.map((x) => x.name).join(", ")}.`;
  }

  return "Je n'ai pas compris. Essayez : « classement », « prochain match du PSG », « parle-moi du MC Alger » ou « meilleur buteur ».";
}
