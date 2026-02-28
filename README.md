
  # Personal website for Joel Karr

  This is a code bundle for Personal website for Joel Karr. The original project is available at https://www.figma.com/design/d5YI1XyleB9T6vmG1zWBrs/Personal-website-for-Joel-Karr.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## CI/CD Setup

  Two GitHub Actions workflows handle infrastructure provisioning and content deployment:

  | Workflow | File | Trigger |
  |---|---|---|
  | Provision Azure Infrastructure | `.github/workflows/infra-deploy.yml` | Push to `infra/**` on `main`, or manual |
  | Deploy to Azure Static Web Apps | `.github/workflows/azure-deploy.yml` | Push / PR to `main` |

  ### Required repository secrets

  Go to **Settings → Secrets and variables → Actions → New repository secret** and add:

  | Secret | How to get the value |
  |---|---|
  | `AZURE_CLIENT_ID` | Azure Portal → App registrations → your app → **Application (client) ID** |
  | `AZURE_TENANT_ID` | Azure Portal → Microsoft Entra ID → **Tenant ID** |
  | `AZURE_SUBSCRIPTION_ID` | Azure Portal → Subscriptions → your subscription → **Subscription ID** |
  | `AZURE_STATIC_WEB_APPS_API_TOKEN` | Set automatically by `infra-deploy.yml` when `GH_ADMIN_TOKEN` is present; or run `az staticwebapp secrets list --name swa-joelkarr-com --resource-group rg-joelkarr-com --query 'properties.apiKey' --output tsv` |
  | `GH_ADMIN_TOKEN` *(optional)* | GitHub → Settings → Developer settings → Personal access tokens → generate a **classic** token with the `repo` scope (needed to auto-write `AZURE_STATIC_WEB_APPS_API_TOKEN` after provisioning) |

  > **Can I copy secrets from another repo?**
  >
  > GitHub never exposes a secret's value after it is saved — it is encrypted and write-only, so there is no
  > built-in way to "read" a secret from one repo and paste it into another.
  >
  > **Option A — Organization secrets (recommended if both repos are in the same org)**
  >
  > Set the secret once at the organization level and it becomes available to every repo in that org:
  >
  > 1. Go to your **GitHub organization → Settings → Secrets and variables → Actions**
  > 2. Add the secret there instead of at the repo level
  > 3. Under **Repository access**, select this repo (or "All repositories")
  >
  > **Option B — Set secrets via the `gh` CLI**
  >
  > If you already have the values in your shell environment (e.g. from a local Azure login), you can set all
  > secrets in one shot:
  >
  > ```bash
  > # 1. Make sure you are logged in to GitHub
  > gh auth login
  >
  > # 2. Fetch the Azure values with the Azure CLI and push them as secrets
  > AZURE_TENANT_ID=$(az account show --query tenantId --output tsv)
  > AZURE_SUBSCRIPTION_ID=$(az account show --query id --output tsv)
  >
  > # Replace <APP_CLIENT_ID> with the client ID of your app registration
  > gh secret set AZURE_TENANT_ID        --body "$AZURE_TENANT_ID"        --repo joel-karr/joelkarr-website
  > gh secret set AZURE_SUBSCRIPTION_ID  --body "$AZURE_SUBSCRIPTION_ID"  --repo joel-karr/joelkarr-website
  > gh secret set AZURE_CLIENT_ID        --body "<APP_CLIENT_ID>"          --repo joel-karr/joelkarr-website
  > ```
  >
  > If you need the same secrets in multiple repos just repeat the `gh secret set` commands for each repo, or
  > use the `--org` flag to set them at organization level:
  >
  > ```bash
  > gh secret set AZURE_TENANT_ID --body "$AZURE_TENANT_ID" --org <YOUR_ORG> --visibility all
  > ```
  