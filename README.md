# @sociials/public-page

Shared public bio page UI (UniversalTheme and building blocks).

Consumed by:

- `frontend` — production `/[username]` pages (thin wrapper wires Next router + analytics)
- `client` — admin live preview (thin wrapper wires React Router + analytics)

## Usage

```jsx
import { UniversalTheme } from "@sociials/public-page";

<UniversalTheme
  user={pageDocument}
  onGoHome={() => navigate("/")}
  onTrackView={(pageId) => trackView(pageId)}
  onTrackClick={({ pageId, linkId }) => trackClick({ pageId, linkId })}
  apiBaseUrl={API_URL}
  renderReportModal={({ isOpen, onClose, pageId, username }) => (
    <ReportModal isOpen={isOpen} onClose={onClose} pageId={pageId} username={username} />
  )}
/>
```

No separate deployment — bundled by Vite/Next at app build time.

## Release (separate repo)

On each `git push`, the pre-push hook (installed via `npm install` → `prepare`):

1. Bumps patch in `package.json` (e.g. `0.1.1` → `0.1.2`)
2. Commits `chore(release): v0.1.2`
3. Tags `v0.1.2`
4. Pushes branch + tags

Skip once: `SKIP_RELEASE=1 git push`

Manual release: `npm run release` then `git push --follow-tags`

In **client** / **frontend** prod `package.json`, pin the new tag:

```json
"@sociials/public-page": "github:Sociials/public-page#v0.1.2"
```

Monorepo local dev uses `file:../packages/public-page` — change to the GitHub spec only in deploy repos.
