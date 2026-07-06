#!/bin/bash
# cPanel automated deployment script via SSH & Rsync

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

# 3. Create Backup on cPanel Server
echo "Creating backup of current deployment on cPanel..."
BACKUP_TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${DEPLOY_PATH}/backups"
BACKUP_FILE="${BACKUP_DIR}/deploy_backup_${BACKUP_TIMESTAMP}.tar.gz"

$SSH_CMD "mkdir -p ${BACKUP_DIR}"

# Run remote backup. We exclude backups, dynamic state, node_modules, and system folders
# We use '|| true' because tar might exit with code 1 if files change during tar or if directories don't exist
$SSH_CMD "tar \
  --exclude='./backups' \
  --exclude='./logs' \
  --exclude='./tmp' \
  --exclude='./.well-known' \
  --exclude='./mail' \
  --exclude='./ssl' \
  --exclude='./uploads' \
  --exclude='./api/db.json' \
  --exclude='./.env' \
  --exclude='./cgi-bin' \
  -czf ${BACKUP_FILE} -C ${DEPLOY_PATH} . || true"

echo "Backup created successfully on the server."

# Define Rollback function
rollback_deployment() {
  echo "========================================="
  echo "DEPLOYMENT FAILED: Initiating Rollback..."
  echo "========================================="
  
  # Fetch latest backup
  LATEST_BACKUP=$($SSH_CMD "ls -t ${BACKUP_DIR}/deploy_backup_*.tar.gz 2>/dev/null | head -n 1 || true")
  
  if [ -n "$LATEST_BACKUP" ]; then
    echo "Found backup file: $LATEST_BACKUP"
    echo "Restoring files..."
    # Extract backup back to deployment directory
    $SSH_CMD "tar -xzf ${LATEST_BACKUP} -C ${DEPLOY_PATH}"
    
    # Run npm install on restored package.json to ensure dependencies match
    $SSH_CMD "cd ${DEPLOY_PATH} && if [ -f package.json ]; then npm install --production; fi"
    
    # Restart Node.js application (if Phusion Passenger is used)
    $SSH_CMD "mkdir -p ${DEPLOY_PATH}/tmp && touch ${DEPLOY_PATH}/tmp/restart.txt"
    echo "Rollback restoration complete."
  else
    echo "CRITICAL WARNING: No deployment backup found to roll back to!"
  fi
}

# Trap failures to trigger rollback automatically
trap 'rollback_deployment' ERR

# 4. Sync Files via Rsync
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

# 5. Remote Node.js Dependency Management
echo "Installing production dependencies on cPanel..."
$SSH_CMD "cd ${DEPLOY_PATH} && if [ -f package.json ]; then npm install --production; fi"

# 6. Restart cPanel Node.js Application (Passenger)
echo "Restarting application..."
$SSH_CMD "mkdir -p ${DEPLOY_PATH}/tmp && touch ${DEPLOY_PATH}/tmp/restart.txt"

# 7. Health Check Verification
if [ -n "$HEALTH_CHECK_URL" ]; then
  echo "Running health check on $HEALTH_CHECK_URL..."
  
  # Allow some time for Passenger to start and process the app restart
  sleep 3
  
  STATUS_CODE=$(curl -o /dev/null -s -w "%{http_code}" "$HEALTH_CHECK_URL" || echo "000")
  echo "Website response code: $STATUS_CODE"
  
  if [ "$STATUS_CODE" -lt 200 ] || [ "$STATUS_CODE" -ge 400 ]; then
    echo "Health check failed! Status code is $STATUS_CODE."
    exit 1 # Triggers the trap rollback
  fi
  echo "Health check passed!"
else
  echo "Skipping health check (no HEALTH_CHECK_URL provided)."
fi

# 8. Prune Old Backups (Keep latest 5 backups)
echo "Pruning older backups..."
$SSH_CMD "cd ${BACKUP_DIR} && ls -t deploy_backup_*.tar.gz 2>/dev/null | tail -n +6 | xargs rm -f || true"

echo "========================================="
echo "DEPLOYMENT COMPLETED SUCCESSFULLY!"
echo "========================================="
