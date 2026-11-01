import { createFileRoute } from "@tanstack/react-router";
import { Info, RotateCcw, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/site/Logo";
import { PageHeader, PageShell } from "@/components/site/common";
import { replyTo } from "@/lib/assistant";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Assistant IA — SportMind AI" },
      { name: "description", content: "Chatbot football de démonstration : posez des questions sur les équipes, matchs et classements." },
      { property: "og:title", content: "Assistant IA — SportMind AI" },
      { property: "og:description", content: "Interface de chatbot football (réponses préprogrammées)." },
    ],
  }),
  component: Assistant,
});

type Msg = { id: number; role: "user" | "bot"; text: string };

const WELCOME: Msg = {
  id: 0,
  role: "bot",
  text: "Bonjour ! Je suis l'assistant SportMind. Posez-moi une question sur les équipes, les matchs ou le classement de démonstration.",
};

const SUGGESTIONS = [
  "Qui est en tête du classement ?",
  "Prochain match du PSG",
  "Parle-moi du MC Alger",
  "Meilleur buteur",
  "Qui va gagner le Clasico ?",
];

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { id: idRef.current++, role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, role: "bot", text: replyTo(q) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Assistant"
        title="Assistant IA"
        description="Une interface de chatbot football pour interroger les données du prototype."
      />

      <div className="mb-4 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-warning" />
        <p>
          <strong>Mode démonstration :</strong> aucun modèle d'intelligence artificielle n'est
          connecté. Les réponses sont générées par des règles simples (mots-clés) à partir des
          données de démo du site.
        </p>
      </div>

      <div className="panel flex h-[min(70vh,640px)] flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <LogoMark className="size-9" />
            <div>
              <p className="font-display font-bold">SportMind Assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-pitch">
                <span className="size-1.5 rounded-full bg-pitch" /> En ligne (démo)
              </p>
            </div>
          </div>
          <button
            onClick={() => setMessages([WELCOME])}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="size-4" /> Effacer
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 animate-float-in ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "bot" && <LogoMark className="size-7 shrink-0" />}
              <p
                className={`max-w-[85%] whitespace-pre-line text-sm leading-relaxed sm:max-w-[70%] ${
                  m.role === "user"
                    ? "rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground"
                    : "pt-1 text-foreground"
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-3">
              <LogoMark className="size-7 shrink-0" />
              <span className="flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="size-2 animate-bounce rounded-full bg-pitch" style={{ animationDelay: `${d}ms` }} />
                ))}
              </span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-3">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-pitch/60 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question football…"
              aria-label="Votre message"
              className="h-11 flex-1 rounded-xl border border-input bg-background/60 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Envoyer"
              className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow transition-opacity disabled:opacity-40"
            >
              <SendHorizontal className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
