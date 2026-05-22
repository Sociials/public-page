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

## Release (this repo)

1. Bump `"version"` in `package.json` (e.g. `0.1.6` → `0.1.7`).
2. Commit, push, and tag:

```bash
git add package.json
git commit -m "chore(release): v0.1.7"
git push origin main
git tag v0.1.7
git push origin v0.1.7
```

3. In **client** / **frontend** deploy repos, pin the tag and refresh the lock file:

```json
"@sociials/public-page": "github:Sociials/public-page#v0.1.7"
```

```bash
npm install
```

Commit `package.json` and `package-lock.json`, then redeploy.

Monorepo local dev uses `file:../packages/public-page` — use the GitHub spec only in deploy repos.
