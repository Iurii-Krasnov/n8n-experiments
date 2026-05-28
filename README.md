# Check Weather Workflow — local n8n

This folder runs the workflow defined in `AI Agent workflow.json` with a local n8n instance.

## Prerequisites

- **Node.js** 20.19 or newer (required by n8n 1.x)
- Optional: **Docker Desktop** if you prefer `docker compose` over Node

## First-time setup (Node)

```bash
npm install
npm run setup
```

`setup` runs `import-workflow`, which loads the workflow into n8n’s local database under **`.n8n/`** in this project (the npm scripts set `N8N_USER_FOLDER=.n8n` via `cross-env`). Run `npm run import-workflow` again only if you delete `.n8n/`; importing twice can create a duplicate workflow.

## Start n8n

```bash
npm start
```

Open [http://localhost:5678](http://localhost:5678), complete the first-run owner account if prompted, then open **AI Agent workflow**.

## Credentials

**OpenWeatherMap** — set `OPENWEATHERMAP_API_KEY` in `.env` (copy from `.env.example`). `npm start` loads it into n8n automatically for the **OpenWeatherMap API** credential type.

**Google Sheets** and **Gmail** — add in the n8n UI when you start the app (OAuth connect on each credential). Assign them to **Append row in sheet** and **Send alert to email**, or reconnect if nodes show “Credentials not found”.

| Credential | Where to configure |
|------------|-------------------|
| OpenWeatherMap API | `.env` → `OPENWEATHERMAP_API_KEY` |
| Google Sheets OAuth2 API | n8n UI |
| Gmail OAuth2 API | n8n UI |

## Optional: Docker

```bash
docker compose up
```

Import the workflow once: either from the UI (**Workflows → Import from file**) and choose `AI Agent workflow.json`, or run `npm install && npm run import-workflow` on the host (same `.n8n` is not shared with the container by default). For CLI import inside Docker you would need to mount `.n8n` from the host or use `docker compose run` with the n8n image; the simplest path with the compose file above is **UI import** on first use.

## Triggers

- **Schedule Trigger** runs every minute when the workflow is **active** (pin data is for editor testing only).
- **Webhook** path is in the node; URL is `http://localhost:5678/webhook/<path>` when n8n is in development mode.
