# Purpose

Explain what this PR does and why it is necessary. Write for a future maintainer.

## Type of change (check all that apply)
- [ ] feat (user-facing capability)
- [ ] fix (bug fix)
- [ ] chore (tooling/build/refactor)
- [ ] docs (documentation / ADR)
- [ ] ci (pipelines)
- [ ] security (auth, permissions, scanning)

## Scope (check all that apply)
- [ ] public (ardtire.org)
- [ ] portal (portal.ardtire.org)
- [ ] admin (admin.ardtire.org)
- [ ] cms (cms.ardtire.org)
- [ ] api (platform boundary)
- [ ] worker/jobs
- [ ] identity (keycloak)
- [ ] governance/decidim integration
- [ ] ui design system
- [ ] docs

## Decision record
- [ ] ADR required? If yes, link it: `docs/adr/ADR-XXXX-...md`
- [ ] ADR not required

## Behavior
Describe user-visible behavior changes. Include screenshots for UI changes where applicable.

## Security & permissions
- What roles can access the new behavior?
- Any ABAC attributes involved?
- Any step-up auth requirement?

## Data & audit
- Any schema changes? (Drizzle migrations)
- Any audit events emitted/required?
- Any register entries impacted?

## Testing
- [ ] Unit tests
- [ ] Component tests
- [ ] E2E tests
- [ ] Contract tests (OpenAPI)
- [ ] Manual verification notes

## Deployment notes
Anything ops should know (env vars, migrations, backfills, breaking changes).

## Checklist
- [ ] Biome format/lint passes locally
- [ ] Typecheck passes locally
- [ ] Tests pass locally (as applicable)
- [ ] Docs updated (as applicable)
