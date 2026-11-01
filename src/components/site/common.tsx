import { FlaskConical } from "lucide-react";
import type { ReactNode } from "react";
import type { Team } from "@/data/demo";
import { Logo } from "./Logo";

export function DemoBadge({ children = "Données de démonstration" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
      <FlaskConical className="size-3.5" />
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pitch">{eyebrow}</p>
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <DemoBadge />
        {children}
      </div>
    </div>
  );
}

/** Écusson stylisé (pas de logo officiel) aux couleurs du club. */
export function TeamCrest({ team, size = "md" }: { team?: Team; size?: "sm" | "md" | "lg" }) {
  const dims = { sm: "size-8 text-[10px]", md: "size-11 text-xs", lg: "size-16 text-sm" }[size];
  if (!team) {
    return (
      <span className={`${dims} grid shrink-0 place-items-center rounded-full bg-muted font-bold text-muted-foreground`}>
        ?
      </span>
    );
  }
  const [a, b] = team.colors;
  return (
    <span
      className={`${dims} grid shrink-0 place-items-center rounded-full font-display font-bold ring-2 ring-border`}
      style={{ background: `linear-gradient(135deg, ${a} 50%, ${b} 50%)` }}
      aria-hidden="true"
    >
      <span className="rounded bg-background/85 px-1 py-0.5 text-foreground">{team.short}</span>
    </span>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 animate-float-in">{children}</main>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo />
        <p className="max-w-xl">
          Prototype universitaire. Toutes les données (scores, classements, statistiques) sont des
          données de démonstration, sans lien avec des résultats réels en direct.
        </p>
      </div>
    </footer>
  );
}
