#!/usr/bin/env sh
set -eu

APP_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/apps/backend" && pwd)"

cd "$APP_DIR"

if [ ! -x node_modules/.bin/tsc ]; then
  npm ci --include=dev
fi

if [ ! -f dist/index.js ]; then
  npm run build
fi

exec npm start
