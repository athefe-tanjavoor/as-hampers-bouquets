# Production Deployment & DevOps Playbook

This document details the recommended deployment topologies, continuous integration pipelines, environment setup, and release procedures for **Bloom & Blossom**.

---

## 1. Production Hosting Topology

| Component | Target Platform | Runtime / Framework | Domain / Subdomain |
| :--- | :--- | :--- | :--- |
| **Storefront** | Vercel or AWS Amplify | Next.js 14/15 App Router | `https://bloomandblossom.com` |
| **Admin Panel** | Vercel (Restricted Access) | Next.js 14/15 App Router | `https://admin.bloomandblossom.com` |
| **Backend API** | Railway, Render, or ECS | Node.js 20+ / Docker | `https://api.bloomandblossom.com` |
| **Database** | MongoDB Atlas | MongoDB 7.0+ Replica Set | AWS / GCP Mumbai (`ap-south-1`) |
| **Static Media** | Cloudflare R2 / AWS S3 | CDN Edge Storage | `https://cdn.bloomandblossom.com` |

---

## 2. Docker Configuration for API

For containerized deployments on Docker, Kubernetes, or container PaaS platforms, use the production multi-stage `Dockerfile`:

```dockerfile
# Multi-stage Dockerfile for apps/api
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.base.json ./
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

RUN npm ci
RUN npm run build --workspace=apps/api

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

EXPOSE 5000

USER node
CMD ["node", "apps/api/dist/server.js"]
```

---

## 3. Step-by-Step Deployment Guide

### 3.1 Deploying Database (MongoDB Atlas)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Provision an `M10` or higher cluster in `ap-south-1` (Mumbai) to ensure single-digit millisecond latency to Indian consumers.
3. Configure Database Access: Create an application user `bloom_app` with readWrite permissions on `bloom_db`.
4. Configure Network Access: Whitelist backend IP addresses or configure VPC peering.
5. Copy the SRV connection string:
   ```
   mongodb+srv://bloom_app:<password>@cluster0.mongodb.net/bloom_db?retryWrites=true&w=majority
   ```

### 3.2 Deploying Backend API (`apps/api`)
1. Connect repository to Railway or Render.
2. Set Root Directory: `.`
3. Build Command: `npm ci && npm run build --workspace=apps/api`
4. Start Command: `npm start --workspace=apps/api`
5. Configure environment variables (see `ENVIRONMENT.md`).
6. Run database seed to bootstrap categories and settings:
   ```bash
   npm run seed --workspace=apps/api
   ```
7. Verify healthcheck endpoint: `GET https://api.bloomandblossom.com/health`.

### 3.3 Deploying Storefront (`apps/storefront`)
1. Import repository into Vercel.
2. Select Root Directory: `apps/storefront`.
3. Framework Preset: Next.js.
4. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL=https://api.bloomandblossom.com/api`
   - `NEXT_PUBLIC_SITE_URL=https://bloomandblossom.com`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...`
5. Deploy and attach custom apex domain `bloomandblossom.com`.

### 3.4 Deploying Admin Panel (`apps/admin`)
1. Import repository into Vercel as a separate project.
2. Select Root Directory: `apps/admin`.
3. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL=https://api.bloomandblossom.com/api`
4. Restrict access via Vercel Deployment Protection, Cloudflare Zero Trust Access, or VPN IP allowlisting.

---

## 4. Production Readiness Checklist

- [ ] **SSL/TLS**: Valid HTTPS certificates on all domains with HTTP to HTTPS forced redirection.
- [ ] **Payment Keys**: Live Razorpay Key ID and Secret configured; Test mode keys removed.
- [ ] **Webhooks**: Razorpay payment webhook endpoint registered and listening for `order.paid`.
- [ ] **Error Monitoring**: Sentry integrated across storefront and backend API.
- [ ] **Rate Limiting**: Express rate limiter enabled on `/api/checkout/*` and `/api/admin/login` to thwart brute-force attempts.
- [ ] **CORS Settings**: `CORS_ORIGIN` restricted strictly to `https://bloomandblossom.com` and `https://admin.bloomandblossom.com`.
- [ ] **Database Backups**: Continuous daily automated snapshots enabled in MongoDB Atlas.
