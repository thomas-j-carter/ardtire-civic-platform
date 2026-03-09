# Ardtire Civic Platform

Unified digital civic operating system for the Ardtire Society.

Surfaces:
- Public site: ardtire.org
- Member portal: portal.ardtire.org
- Admin dashboard: admin.ardtire.org
- CMS: cms.ardtire.org
- Identity: id.ardtire.org

This repository is a pnpm monorepo. Foundation is built to enterprise/government-grade standards:
- strict TypeScript
- contract-first API (OpenAPI 3.1)
- comprehensive testing and CI/CD
- auditability as a core design constraint
- formal architecture decision records (ADRs)

## Structure

- `apps/` — user-facing applications (public/portal/admin/cms/docs)
- `services/` — backend services (api/worker/decidim-proxy)
- `packages/` — shared libraries (ui/auth/policy/db/audit/etc.)
- `infra/` — docker, compose, deployment artifacts
- `docs/` — ADRs and operational documentation
- `openapi/` — canonical OpenAPI spec (to be introduced)
