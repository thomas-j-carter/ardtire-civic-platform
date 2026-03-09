# Contributing

This repository follows trunk-based development with Conventional Commits.

## Branching
- `main` is always releasable.
- Use short-lived branches and open PRs early.

## Commit messages
Conventional Commits are required:
- `feat(scope): ...`
- `fix(scope): ...`
- `chore(scope): ...`
- `docs(scope): ...`
- `ci(scope): ...`
- `test(scope): ...`

## ADR requirement
If your change affects identity boundaries, authorization, data model, audit logging/register semantics,
deployment substrate, or API contracts, you must include an ADR.

## Quality gates
PRs must pass:
- formatting/linting (Biome)
- strict TypeScript
- tests (as applicable)
- contract validation (OpenAPI, when introduced)
