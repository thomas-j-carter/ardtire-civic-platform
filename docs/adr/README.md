# Architecture Decision Records (ADRs)

ADRs are institutional records. They are required for decisions that materially affect:

- Identity boundaries (Keycloak, auth flows, step-up policy)
- Authorization model (RBAC/ABAC, permissions, eligibility rules)
- Data model (schemas, migrations, retention)
- Audit logging and register semantics
- Deployment substrate (Docker/K8s, networking, domains)
- Contract surface (OpenAPI changes, breaking changes)
- Cross-service boundaries (Payload, Decidim integration strategy)
- Security posture (threat model, scanning gates)

## Rules
1. ADRs are short, specific, and decisive.
2. An ADR is written **before** or **with** the code change.
3. Every ADR has:
   - Context
   - Decision
   - Consequences
   - Status
4. ADRs are immutable once accepted; amendments use a new ADR.

## Naming
`ADR-XXXX-short-title.md` where `XXXX` is a zero-padded number (0001, 0002, ...).
