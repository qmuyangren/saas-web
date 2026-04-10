#!/usr/bin/env bash
set -e

echo "Building for production..."
npm run build

echo "Build complete. Output in dist/"
ls -lh dist/
