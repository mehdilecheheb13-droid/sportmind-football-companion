import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--pitch)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#sm-grad)" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="var(--background)" strokeWidth="2.5" />
      <path
        d="M24 16 l6 4.5 -2.3 7 h-7.4 l-2.3 -7 z"
        fill="var(--background)"
      />
      <circle cx="36" cy="12" r="2.2" fill="var(--background)" />
      <circle cx="12" cy="36" r="2.2" fill="var(--background)" />
      <path d="M36 12 L30 20.5 M12 36 L20.3 27.5" stroke="var(--background)" strokeWidth="1.6" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="SportMind AI — accueil">
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight">
        SportMind <span className="text-gradient-brand">AI</span>
      </span>
    </Link>
  );
}
