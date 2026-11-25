# Ideas: Dynamic backend on the VM

Status: draft (ideas only, **not a plan**) · Issue: none · Branch: not started

> This file records a brainstorm from 2026-11-25. Nothing here is decided or scheduled. Before any work starts, turn it into a real plan (`<issue#>-<name>.md`) and revisit each point.

## Context

The club now has a VM (2 cores, 4 GB RAM, Ubuntu Server). The idea is to move the content (films, people, events, blog, palmarès) out of the repo's JSON files into a backend with an admin panel, while keeping the public site fast and cheap to run.

## Ideas discussed

### Backend

- A **separate application**, designed with DDD, that this site consumes. Start it as a **modular monolith** (one process, contexts separated in code) rather than microservices, since it runs on a single small VM.
- Candidate bounded contexts, taken from the current data:
  - **Catalog:** films, credits, genres, visibility (`public`, `playerVisible`). A credit refers to a person by ID only.
  - **People / Membership:** persons, membership status, club roles.
  - **Events:** events, schedule, galleries. `status` could be derived from dates.
  - **Editorial:** blog articles, authors.
  - **Awards (Palmarès):** festivals, awards, links to films and people.
  - **Identity / Admin:** editors, roles, permissions.
  - **Analytics** (supporting): see below.
- The API returns read DTOs, never the aggregates (CQRS-lite). Version it (`/v1/`).
- Language not chosen. Node/TypeScript (NestJS or Hono/Fastify), .NET and Spring Boot all fit in 4 GB with Postgres; Spring needs a capped heap.

### Database

- **Postgres** preferred over SQLite. One database, one schema per context.
- Keep it on localhost only. Starting tuning for 4 GB: `shared_buffers = 512MB`, `effective_cache_size = 2GB`, `max_connections = 20`.
- Schema migrations in the backend repo. A seed script imports the current JSON files, so the move can be repeated and checked.
- Scheduled `pg_dump` backups copied off the VM.

### Hosting and Cloudflare

- Expose the API through a **Cloudflare Tunnel** (`cloudflared`): no open ports, no public IP, no certificates to manage.
- Cache public GET routes at Cloudflare with a Cache Rule (JSON isn't cached by default) and `Cache-Control: public, s-maxage=…, stale-while-revalidate=…`. Admin and auth routes are `private, no-store` and bypassed.
- **Purge on write:** a domain event (such as `FilmUpdated`) purges the affected URLs through Cloudflare's API.
- Version headers / ETags were considered as a way to see visitors, but don't work for that: Cloudflare answers revalidations itself and the origin only sees edge refreshes.
- Basic VM hardening: SSH keys only, `ufw`, `unattended-upgrades`. Build in CI and deploy artifacts, so the VM never runs heavy builds.

### The website

- Preferred: keep the site **static**. At build time, the `src/data/` helpers fetch from the API instead of reading JSON. A content change triggers a rebuild (webhook, for example GitHub `repository_dispatch`). The site keeps working if the VM is down; only editing stops.
- Alternative: run Next.js on the VM with ISR and on-demand revalidation. Updates show faster, but the site's uptime then depends on the VM.
- Check the switch with `tools/parity.mjs` against the current output.

### Analytics

- **Now:** Cloudflare Web Analytics (enabled). No cookies, no personal data.
- **Admin panel:** read it through Cloudflare's GraphQL Analytics API (`rumPageloadEventsAdaptiveGroups`, token with Account Analytics Read only, called from the backend only). Put it behind an `Analytics` port with a Cloudflare adapter, cache results 5–15 minutes, and map paths to films and events. Store daily snapshots in Postgres if long-term history is wanted. Check dataset names and retention limits in Cloudflare's docs first.
- **Later:** replace with a self-hosted tool such as Umami (runs on Postgres) by writing a new adapter.
- Keep visitor data aggregate and anonymous to stay clear of personal-data rules (Tunisian law, GDPR for EU visitors).

## Open questions

- Which backend language, and does the API live in its own repository?
- Does this replace [members-login](members-login.md), which assumes no server and uses Firebase Auth because hosting had to stay free?
- What do editors need first: films, events, blog, or members?
- Who maintains the VM (updates, backups, uptime)?
