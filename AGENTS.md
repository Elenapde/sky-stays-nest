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

- River experience public content and commercially validated offers are stored separately with RLS, so unvalidated prices never reach anonymous readers.
- Experience administration uses verified Lovable workspace identity and a separately provisioned editor permission; never auto-grant access to the first visitor or switch the existing Guesty auth model.
- River UI uses shared query options and distinct components for editorial content, Home promotion, and administration; lodging amenities remain separate.

- River modalities render in a dedicated editorial component; narrative and explicitly approved public inclusions live in experience_content JSON, while draft prices and commercial terms remain in validated experience_offers. Public inclusions are edited separately; validated offers override them when published.
