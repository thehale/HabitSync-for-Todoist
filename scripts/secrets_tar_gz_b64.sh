#!/bin/bash

# Copyright (c) 2026 Joseph Hale
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

# Generates the `SECRETS_TAR_GZ_B64` secret for GitHub Actions

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FASTLANE_DIR="$ROOT_DIR/fastlane"

(
	cd "$FASTLANE_DIR"
	tar -cz .env *.p8 *.json *.keystore
) | base64 | tr -d '\n'

echo >&2
echo "Generated value for GitHub secret: SECRETS_TAR_GZ_B64" >&2

