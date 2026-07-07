#!/bin/bash
# cPanel automated deployment script via SSH & Rsync (Simplified - No Backup/Rollback)

set -eo pipefail

echo "========================================="
echo "Starting Automated cPanel Deployment (SSH)"
echo "========================================="

# 1. Input Validation
if [ -z "$SSH_HOST" ] || [ -z "$SSH_USER" ] || [ -z "$SSH_PRIVATE_KEY" ] || [ -z "$DEPLOY_PATH" ]; then
  echo "ERROR: Missing required SSH deployment secrets."
  exit 1
fi

SSH_PORT=${SSH_PORT:-22}
HEALTH_CHECK_URL=${HEALTH_CHECK_URL}

# 2. Setup SSH Key
echo "Configuring SSH key..."
mkdir -p ~/.ssh
echo "$SSH_PRIVATE_KEY" > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key
eval $(ssh-agent -s)
ssh-add ~/.ssh/deploy_key

# Define standard SSH command prefix
SSH_CMD="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i ~/.ssh/deploy_key -p $SSH_PORT $SSH_USER@$SSH_HOST"

# 3. Sync Files via Rsync
echo "Syncing files to cPanel server..."
# --delete: remove files from server that were deleted from github
# Exclusions preserve local databases, user uploads, system folders, and configuration files
rsync -avz --delete \
  --exclude='.git*' \
  --exclude='.github*' \
  --exclude='node_modules' \
  --exclude='scripts' \
  --exclude='.cpanel' \
  --exclude='.well-known' \
  --exclude='logs' \
  --exclude='tmp' \
  --exclude='backups' \
  --exclude='mail' \
  --exclude='ssl' \
  --exclude='.env' \
  --exclude='cgi-bin' \
  --exclude='api/db.json' \
  --exclude='uploads' \
  -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i ~/.ssh/deploy_key -p $SSH_PORT" \
  ./ $SSH_USER@$SSH_HOST:$DEPLOY_PATH/

echo "File sync complete."

# 4. Remote Node.js Dependency Management
echo "Installing production dependencies on cPanel..."
$SSH_CMD "cd ${DEPLOY_PATH} && if [ -f package.json ]; then npm install --production; fi"

# 5. Restart cPanel Node.js Application (Passenger)
echo "Restarting application..."
$SSH_CMD "mkdir -p ${DEPLOY_PATH}/tmp && touch ${DEPLOY_PATH}/tmp/restart.txt"

# 6. Health Check Verification
if [ -n "$HEALTH_CHECK_URL" ]; then
  echo "Running health check on $HEALTH_CHECK_URL..."
  
  # Allow some time for Passenger to start and process the app restart
  sleep 3
  
  STATUS_CODE=$(curl -o /dev/null -s -w "%{http_code}" "$HEALTH_CHECK_URL" || echo "000")
  echo "Website response code: $STATUS_CODE"
  
  if [ "$STATUS_CODE" -lt 200 ] || [ "$STATUS_CODE" -ge 400 ]; then
    echo "ERROR: Health check failed! Status code is $STATUS_CODE. Website returned an error."
    exit 1
  fi
  echo "Health check passed!"
else
  echo "Skipping health check (no HEALTH_CHECK_URL provided)."
fi

echo "========================================="
echo "DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "========================================="
