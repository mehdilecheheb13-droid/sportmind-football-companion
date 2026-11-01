<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All demo content lives in `src/data/demo.ts`; pages read from it so the "données de démonstration" labelling stays consistent.
- The assistant (`src/lib/assistant.ts`) is keyword-based with no AI model; keep the on-page disclaimer unless a real model is wired in.
