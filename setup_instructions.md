# Setup Instructions: Automated GitHub → cPanel Deployment

This guide explains how to set up the automated CI/CD deployment pipeline for your website. 

The pipeline is configured to automatically deploy your website whenever you push code to the `main` or `master` branch. It automatically detects which hosting credentials you have configured in your GitHub Secrets and chooses the appropriate pathway:
1. **Path A: SSH & Rsync (Recommended)** - Fastest, most secure, incremental uploads, runs commands on server.
2. **Path B: FTP / SFTP (Fallback)** - Syncs files via FTP and uses a secure PHP helper for backups and rollbacks.

---

## 🛠️ Step 1: Choose Your Deployment Method

### Option A: SSH & Rsync (Highly Recommended)
If your cPanel hosting package includes **SSH Access** (shell access), use this method. It is much faster (only uploads changed parts of files) and is highly secure.

#### 1. Generate SSH Keys
1. Log in to your **cPanel**.
2. Search for and click **SSH Access** (under the *Security* section).
3. Click **Manage SSH Keys** → **Generate a New Key**.
4. Set the following fields:
   * **Key Name**: `id_github_actions` (or leave as default `id_rsa`).
   * **Key Password**: **Leave this blank** (GitHub Actions needs passwordless authentication).
   * **Key Type**: `RSA`.
   * **Key Size**: `2048` or `4096`.
5. Click **Generate Key**.

#### 2. Authorize the SSH Key
1. Go back to the **Manage SSH Keys** screen.
2. Under **Public Keys**, find your generated key and click **Manage**.
3. Click **Authorize** to enable the key for SSH login.

#### 3. Retrieve Private & Public Keys
1. In cPanel **SSH Access** -> **Manage SSH Keys**:
   * Under **Private Keys**, click **View/Download** next to your key.
   * Copy the entire text block (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`). You will save this in GitHub Secrets.
2. Go to **SSH Access** -> **Public Keys** and click **View/Download** next to your key. Copy the public key text.

---

### Option B: FTP / SFTP (Fallback)
If your host has disabled SSH access, you can deploy using FTP/SFTP.

#### 1. Retrieve FTP Credentials
Log in to cPanel, go to **FTP Accounts**, and note down:
*   **FTP Server Host**: (e.g. `ftp.example.com` or your domain/IP)
*   **FTP Username**: (e.g. `deployer@example.com` or cPanel username)
*   **FTP Password**

---

## 🔑 Step 2: Configure GitHub Secrets

1. Go to your repository on GitHub.
2. Navigate to **Settings** → **Secrets and Variables** → **Actions**.
3. Click **New repository secret** and add the secrets for your chosen method:

### Secrets for Option A: SSH & Rsync (Recommended)
| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `SSH_HOST` | Server domain or IP address | `192.168.1.1` or `ssh.example.com` |
| `SSH_USER` | cPanel / SSH username | `mycpanelusername` |
| `SSH_PRIVATE_KEY` | The Private key text copied from cPanel | `-----BEGIN RSA PRIVATE KEY-----\nMIIE...` |
| `SSH_PORT` | SSH Port (default is 22. Check with your host) | `22` or `22002` (e.g. Namecheap) |
| `DEPLOY_PATH` | Full absolute path to your deployment folder | `/home/mycpanelusername/public_html` |
| `HEALTH_CHECK_URL` | URL of your site to verify post-deployment | `https://example.com/` |

### Secrets for Option B: FTP / SFTP (Fallback)
| Secret Name | Description | Verified Value to Use |
| :--- | :--- | :--- |
| `FTP_HOST` | FTP host address | `padminivasthra.com` |
| `FTP_USER` | FTP username | `padminivasthra` |
| `FTP_PASSWORD` | FTP password | `=2YktVB};[y3` |
| `FTP_SERVER_DIR` | Directory relative to FTP root to upload to | `public_html/` |
| `FTP_PORT` | FTP Port (usually 21) | `21` |
| `DEPLOY_TOKEN` | The secret token set in `cpanel-deploy-helper.php` | `padmini_deploy_token_2026_xyz` |
| `HEALTH_CHECK_URL` | URL of your site to verify post-deployment | `https://padminivasthra.com/` |

---

## 📁 Step 3: Deployment Exclusions (Crucial Details)

Both deployment methods are configured to preserve crucial live directories and dynamic files. 

### What is preserved?
The following directories and files are **never overwritten or deleted** on the server during deployments:
*   📁 **Uploads**: `uploads/` (Contains user/product images).
*   📁 **Local Database**: `api/db.json` (Stores application data like users and orders).
*   📄 **Secrets**: `.env` (Production environment variables).
*   📁 **cPanel/System Folders**: `.cpanel/`, `.well-known/` (SSL certificates), `logs/`, `tmp/`, `backups/`, `mail/`, `ssl/`, `cgi-bin/`
*   📄 **Logs**: Any Apache/PHP `error_log` generated dynamically.

---

## 🚀 Step 4: Verify Deployment and Test Rollbacks

To test the deployment pipeline, perform these verification tasks:

### 1. Test a Successful Run
1. Commit the deployment files and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Add automated cPanel deployment pipeline"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to the **Actions** tab in GitHub.
3. Observe the deployment run. If successful, check your website.
4. Verify that `api/db.json` and the `uploads/` directory on cPanel **have not** been deleted or modified.

### 2. Test the Automatic Rollback Functionality
The pipeline is designed to roll back if the health check fails:
1. Push a temporary file that crashes the Node server (e.g. write invalid JavaScript in `server.js` or add an intentional `process.exit(1)`).
2. Push to GitHub.
3. The deployment will proceed, restart the Node server, and perform a health check (curl).
4. The health check will fail because the site is down.
5. The pipeline will immediately trigger the **Rollback** script, restoring the website to the pre-deployment backup, and restarting the server.
6. The GitHub Action run will show a **Failed** red status, indicating the deploy failed but the site was rolled back safely. Check the GitHub Actions logs for full execution details.
