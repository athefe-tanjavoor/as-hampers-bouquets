# Bloom & Blossom — Production E-Commerce Platform

> **Artisan Bouquets • Luxury Flowers • Curated Gift Hampers • Personalized Keepsakes**  
> An enterprise-grade, SEO-dominated full-stack e-commerce ecosystem engineered with **Next.js (App Router)**, **Node.js + Express + TypeScript**, **MongoDB + Mongoose**, and **Tailwind CSS**.

---

## 🌟 Executive Summary

**Bloom & Blossom** is a complete, production-ready luxury floral and gift hampers platform built according to the comprehensive specifications in `Bouquets_Hampers_Full_Content_SEO_UI_UX_Documentation.docx`.

It provides a high-converting customer storefront, a secure REST API backend, and a real-time administrative operations portal with inventory alerts, delivery cutoffs, review moderation, and CMS controls.

---

## 🏗️ Architecture & Workspaces

The platform is organized as a high-performance monorepo using npm workspaces:

```
├── apps/
│   ├── storefront/     # Next.js 14/15 App Router customer storefront (Port 3000)
│   ├── admin/          # Next.js 14/15 App Router admin portal & CMS (Port 3001)
│   └── api/            # Express.js + Mongoose + TypeScript REST API (Port 5000)
└── packages/
    ├── config/         # Shared brand settings, navigation, order statuses & slots
    ├── types/          # Universal TypeScript domain interfaces & data contracts
    ├── utils/          # Currency formatting (INR), discounts, order numbering
    ├── validation/     # Zod schemas for forms, checkout, and API requests
    └── ui/             # Shared luxury design components (Badges, StarRating, etc.)
```

---

## 🚀 Key Features

### 1. Customer-Facing Storefront (`apps/storefront`)
- **Luxury Aesthetic**: Curated color palette (Primary Pink `#C94F78`, Soft Pink `#F8E1E8`, Blush `#FCEEF2`, Deep Berry `#8E294D`, Warm Ivory `#FFF9F5`) paired with editorial typography (`Playfair Display` + `Inter`).
- **Complete Homepage**: All 22 documented sections including Hero with micro-animations, Category Quick Rail, Occasion Collections, Price Baskets (`Under ₹599`, `Under ₹999`, `Under ₹1,499`, `Under ₹2,499`), Video Gifting showcase, Customer Reviews, Trust Points, and Educational FAQs.
- **Dynamic Catalog & Category Landing Pages**: Dedicated pages for `/bouquets`, `/flowers`, `/hampers`, `/personalized-gifts`, `/birthday-gifts`, `/anniversary-gifts`, etc., with live sorting, filter pills, and bottom SEO content.
- **Product Detail Experience (PDP)**: Multiple image switching, variant pricing, live 6-digit pincode serviceability check, delivery slot selector, stem breakdown, vase care guidelines, and verified customer testimonials.
- **Frictionless Checkout**:
  - Cart drawer and dedicated `/cart` page with real-time coupon validation (`FIRST10`, `BLOOM15`, `FESTIVE200`).
  - Complimentary greeting card message box with character count.
  - Multi-step checkout with delivery slot selection (Standard, Fixed Window, 2-Hour Express, Midnight 11 PM - 12 AM).
  - Razorpay payment integration architecture with HMAC-SHA256 signature verification and Cash on Delivery (COD) support.
- **Self-Service Order Tracking**: Public tracking stepper timeline at `/track-order` displaying real-time fulfillment progression.

### 2. Administrative Operations Portal (`apps/admin`)
- **Executive Dashboard**: Revenue metrics, average order value, gross order volume, and low-inventory stem alerts.
- **Order Fulfillment & Dispatch**: Strict state-machine status updates (`PENDING_PAYMENT` ➔ `PAYMENT_CONFIRMED` ➔ `PROCESSING` ➔ `OUT_FOR_DELIVERY` ➔ `DELIVERED`). Includes one-click print preview for luxury gift enclosure cards.
- **Product Catalog Management**: Create, edit, and adjust pricing, MRP, tags, and stock.
- **Categories & FAQ Schema Builder**: Manage taxonomy and configure question-answer pairs that automatically generate Google `FAQPage` rich snippets.
- **Inventory & Safety Stock Control**: Real-time counter monitoring with alert triggers when stock reaches safety thresholds.
- **Delivery Zones & Cutoff Manager**: Configure serviceable pincodes, cutoff hours for same-day delivery, and surcharges for midnight deliveries.
- **Coupons & Promotions**: Set percentage or flat rupee discounts with cart minimums, maximum discount caps, and redemption limits.
- **Review Moderation Queue**: Approve or reject buyer testimonials with verified purchaser validation.
- **Homepage CMS**: Toggle visibility and edit headlines of all 22 storefront sections on the fly without code deployments.
- **Editorial Blog CMS**: Publish floral care guides and gifting etiquette articles with built-in `Article` JSON-LD schema.
- **Immutable Audit Logs**: Trace every administrative status change, price override, and login attempt with timestamp and IP address.

### 3. Backend REST API (`apps/api`)
- **Persistence**: Strictly MongoDB + Mongoose (zero Prisma dependency).
- **Zero Client Price Trust**: Pricing and discounts are recalculated server-side by directly querying the database.
- **Payment Cryptography**: Timing-safe HMAC-SHA256 signature verification for Razorpay transactions and webhook receivers.
- **Security Middleware**: Helmet, CORS origin restriction, rate limiting, and JWT-authenticated route guards.

### 4. Technical SEO Mastery
- **JSON-LD Rich Snippets**:
  - `Organization` & `WebSite` schemas on homepage.
  - `Product`, `Offer`, and `AggregateRating` schemas on product detail pages.
  - `BreadcrumbList` on all collection routes.
  - `FAQPage` schemas on category landing pages.
  - `Article` schema on blog journal entries.
- **Robots & Sitemap**: Dynamic `sitemap.ts` covering all products, categories, and articles; `robots.ts` disallowing utility paths (`/cart`, `/checkout`, `/admin`).

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or MongoDB Atlas connection string

### 1. Installation
Clone the repository and install all monorepo dependencies:
```bash
git clone <repository-url>
cd as
npm install
```

### 2. Environment Configuration
Copy `.env.example` into `apps/api/.env`:
```bash
cp .env.example apps/api/.env
```
Ensure `MONGODB_URI`, `JWT_SECRET`, and `RAZORPAY_KEY_ID` are configured.

### 3. Seed Database
Populate the database with authentic initial categories, products, delivery zones, promo coupons, and the default superadmin:
```bash
npm run seed
```
> **Default Admin Credentials**:  
> Email: `admin@bloomandblossom.com`  
> Password: `SuperSecretAdmin2026!`

### 4. Run Development Servers
Start all applications concurrently:
```bash
# Terminal 1: Backend API (Port 5000)
npm run dev:api

# Terminal 2: Customer Storefront (Port 3000)
npm run dev:storefront

# Terminal 3: Admin Portal (Port 3001)
npm run dev:admin
```

Visit:
- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3001](http://localhost:3001)
- **API Healthcheck**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 📚 Complete Documentation Suite

Detailed architectural, deployment, and operational guides are available in the repository root:

- 📘 [ARCHITECTURE.md](file:///e:/as/ARCHITECTURE.md) — System design, component communication, state machines, and payment security.
- 🗄️ [DATABASE.md](file:///e:/as/DATABASE.md) — Mongoose schemas, collection specifications, indexing strategies, and relationships.
- 🔌 [API.md](file:///e:/as/API.md) — RESTful API catalog, request/response JSON schemas, and status codes.
- 🔍 [SEO.md](file:///e:/as/SEO.md) — Technical SEO blueprint, canonical strategies, rich snippet JSON-LD, and robots directives.
- 🚀 [DEPLOYMENT.md](file:///e:/as/DEPLOYMENT.md) — Cloud deployment guides for Vercel, Railway, Render, Docker, and MongoDB Atlas.
- ⚙️ [ENVIRONMENT.md](file:///e:/as/ENVIRONMENT.md) — Complete environment variable reference and security policies.
- 🛡️ [ADMIN.md](file:///e:/as/ADMIN.md) — Admin portal operations, order fulfillment workflow, and CMS guide.
- 🧪 [TESTING.md](file:///e:/as/TESTING.md) — Test matrix, unit, integration, and end-to-end testing scenarios.
- 💾 [BACKUP-RESTORE.md](file:///e:/as/BACKUP-RESTORE.md) — Disaster recovery, continuous backups, point-in-time recovery, and restore commands.

---

## 📄 License
This project is licensed under the ISC License.
