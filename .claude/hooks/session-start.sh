#!/bin/bash
# Make playwright-cli available in Claude Code cloud sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v playwright-cli >/dev/null 2>&1; then
  npm install -g @playwright/cli@latest >/dev/null 2>&1 || echo "playwright-cli install failed" >&2
fi

# Use the container's preinstalled Chromium; it runs as root, so disable the sandbox.
if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  {
    echo "export PLAYWRIGHT_MCP_EXECUTABLE_PATH=/opt/pw-browsers/chromium"
    echo "export PLAYWRIGHT_MCP_SANDBOX=false"
  } >> "$CLAUDE_ENV_FILE"
fi
