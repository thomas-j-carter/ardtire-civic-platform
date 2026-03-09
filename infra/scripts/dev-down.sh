#!/usr/bin/env bash
set -euo pipefail
docker compose -f infra/compose/dev.compose.yml down
