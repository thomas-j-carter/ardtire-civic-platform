# Local Development Runbook

## Start everything
From repo root:

```bash
pnpm dev
````

This will:

* start docker compose services (Postgres, Keycloak, Mailpit, Meilisearch)
* start the Platform API
* start public/portal/admin apps

## URLs (dev)

* Keycloak Admin: [http://localhost:8090](http://localhost:8090)
* Platform API: [http://localhost:8080/health](http://localhost:8080/health)
* Mailpit: [http://localhost:8025](http://localhost:8025)
* Meilisearch: [http://localhost:7700](http://localhost:7700)

## Login (portal/admin)

1. Start infra: `pnpm infra:up` (or `pnpm dev`)
2. Visit the portal or admin app.
3. You will be redirected to Keycloak for login.
4. After login, the app calls Platform API `/auth/session` to set an HttpOnly cookie on localhost.
5. The app gates access by calling Platform API `/auth/whoami`.

## Security notes

* `/auth/whoami` now verifies JWT signature using Keycloak JWKS (issuer-based).
* Audience/client enforcement is a later hardening step.
