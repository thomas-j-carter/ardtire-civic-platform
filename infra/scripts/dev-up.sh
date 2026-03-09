#!/usr/bin/env bash
set -euo pipefail
# Loads .env if present, otherwise uses defaults from compose file.
docker compose -f infra/compose/dev.compose.yml up -d
docker compose -f infra/compose/dev.compose.yml ps
