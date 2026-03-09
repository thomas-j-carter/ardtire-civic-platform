#!/usr/bin/env bash
set -euo pipefail

echo "==> Starting infra (docker compose)..."
docker compose -f infra/compose/dev.compose.yml up -d

echo "==> Starting dev processes (api + apps)..."
pnpm -s turbo dev --filter @ardtire/api --filter @ardtire/public --filter @ardtire/portal --filter @ardtire/admin
