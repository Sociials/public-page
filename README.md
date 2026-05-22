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
