#!/bin/bash
# Installs Syzygy org pre-push hook into .git/hooks/
set -e
HOOKS_DIR="$(git rev-parse --git-dir)/hooks"
mkdir -p "$HOOKS_DIR"
cat > "$HOOKS_DIR/pre-push" << 'EOF'
#!/bin/bash
# Syzygy AI RN — pre-push hook
# Runs typecheck and lint before allowing push
echo "Running typecheck before push..."
npx tsc --noEmit 2>&1
if [ $? -ne 0 ]; then
  echo "Typecheck failed — push blocked."
  exit 1
fi
echo "Running lint before push..."
npx eslint src/ 2>&1
if [ $? -ne 0 ]; then
  echo "Lint failed — push blocked."
  exit 1
fi
echo "All checks passed."
EOF
chmod +x "$HOOKS_DIR/pre-push"
echo "Pre-push hook installed successfully."
