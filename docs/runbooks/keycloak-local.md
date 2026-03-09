# Keycloak Local Runbook

## Services
- Keycloak: http://localhost:8090 (admin console)
- Mailpit (SMTP capture): http://localhost:8025

## Start
```bash
pnpm infra:up
```

## Stop
```bash
pnpm infra:down
```

## Realm import
The realm is imported automatically on Keycloak start:
'infra/keycloak/realm/ardtire-realm.json'

## Admin credentials (dev only)
Configured via .env (copy from .env.example and set):
KEYCLOAK_ADMIN
KEYCLOAK_ADMIN_PASSWORD

## Notes
Client redirect URIs are localhost placeholders (public=3000, portal=3001, admin=3002). We will align actual app ports in the auth integration step.
Rotate secrets before any public deployment.
