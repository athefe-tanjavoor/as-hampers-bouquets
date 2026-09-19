# Environment Variables Reference & Configuration Guide

This document lists and explains all required and optional environment variables across the **Bloom & Blossom** monorepo workspaces.

---

## 1. Master `.env.example` Matrix

| Workspace | Variable Name | Required | Default / Example | Purpose / Description |
| :--- | :--- | :---: | :--- | :--- |
| **Root / Global** | `NODE_ENV` | Yes | `development` / `production` | Node environment flag |
| **apps/api** | `PORT` | No | `5000` | Port for the Express server |
| **apps/api** | `MONGODB_URI` | Yes | `mongodb://localhost:27017/bloom_db` | MongoDB connection connection string |
| **apps/api** | `JWT_SECRET` | Yes | `replace_with_64_char_crypto_random_secret` | Secret used to sign administrative JWT tokens |
| **apps/api** | `JWT_EXPIRES_IN` | No | `7d` | Lifespan of admin authentication tokens |
| **apps/api** | `CORS_ORIGIN` | Yes | `http://localhost:3000,http://localhost:3001` | Comma-separated list of allowed frontend origins |
| **apps/api** | `RAZORPAY_KEY_ID` | Yes | `rzp_test_...` | Razorpay API key identifier |
| **apps/api** | `RAZORPAY_KEY_SECRET` | Yes | `secret_...` | Razorpay secret key used for HMAC signature checks |
| **apps/api** | `RAZORPAY_WEBHOOK_SECRET` | No | `webhook_secret_...` | Secret used to verify incoming webhook payloads |
| **apps/api** | `ADMIN_DEFAULT_EMAIL` | No | `admin@bloomandblossom.com` | Email for database seeding script |
| **apps/api** | `ADMIN_DEFAULT_PASSWORD` | No | `SuperSecretAdmin2026!` | Password for database seeding script |
| **apps/storefront**| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:5000/api` | Base URL for REST API calls |
| **apps/storefront**| `NEXT_PUBLIC_SITE_URL` | Yes | `http://localhost:3000` | Canonical site URL for metadata & sitemaps |
| **apps/storefront**| `NEXT_PUBLIC_RAZORPAY_KEY_ID`| Yes | `rzp_test_...` | Public Razorpay key loaded into client browser checkout |
| **apps/admin** | `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:5000/api` | Base URL for admin REST API calls |

---

## 2. Security Best Practices for Secrets

1. **Never Commit Secrets to Version Control**:
   - The `.env` files are explicitly excluded via `.gitignore`.
   - Only commit `.env.example` containing dummy/placeholder values.

2. **Generate Cryptographically Secure JWT Secrets**:
   To generate a secure 256-bit key for production, run:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Key Separation**:
   - Razorpay **Key Secret** must **NEVER** be exposed with a `NEXT_PUBLIC_` prefix. It resides strictly inside `apps/api` environment variables.
   - Frontend storefront only receives `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
