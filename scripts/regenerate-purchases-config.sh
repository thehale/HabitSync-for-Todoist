#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

source "$ROOT_DIR/fastlane/.env"

cat "$ROOT_DIR/src/lib/purchases/config.ts.dist" \
  | sed -e "s|REVENUECAT_GOOGLE_PLAY_PUBLIC_API_KEY|${REVENUECAT_GOOGLE_PLAY_PUBLIC_API_KEY}|g" \
  > "$ROOT_DIR/src/lib/purchases/config.ts"