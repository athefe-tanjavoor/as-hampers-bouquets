# System Architecture & Technical Specifications

This document outlines the complete architectural blueprints, component relationships, data flows, state machines, and security boundaries of the **Bloom & Blossom** e-commerce platform.

---

## 1. High-Level System Architecture

Bloom & Blossom is designed as a modern, decoupled monorepo leveraging Next.js for storefront and administrative applications, Express + TypeScript + Mongoose for the REST API and transaction tier, and MongoDB for persistence.

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|   +------------------------------------+    +---------------------------------+   |
|   |         Next.js Storefront         |    |        Next.js Admin Panel      |   |
|   |   (App Router, SSR, Tailwind CSS)  |    |  (App Router, RBAC, Data Mgmt)  |   |
|   |        Port: 3000                  |    |        Port: 3001               |   |
|   +-----------------+------------------+    +----------------+----------------+   |
+---------------------|----------------------------------------|--------------------+
                      | HTTPS / REST                           | HTTPS / REST
                      +-------------------+--------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
|                               API & APPLICATION LAYER                             |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   |                          Node.js + Express API                            |   |
|   |                               Port: 5000                                  |   |
|   |                                                                           |   |
|   |  - Middleware: Helmet, CORS, Morgan, Cookie-Parser, Rate-Limiting, JWT    |   |
|   |  - Pricing Engine: Server-side recalculation, coupon validation           |   |
|   |  - Delivery Engine: Pincode lookup, cut-off hours, slot allocation        |   |
|   |  - Payment Engine: Razorpay Orders & HMAC-SHA256 Signature Verification   |   |
|   |  - Order State Machine: Strict status transition validations              |   |
|   |  - Audit Log Service: Immutable administrative action tracking            |   |
|   +-------------------------------------+-------------------------------------+   |
+-----------------------------------------|-----------------------------------------+
                                          | Mongoose ORM / MongoDB Wire Protocol
+-----------------------------------------v-----------------------------------------+
|                                PERSISTENCE LAYER                                  |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   |                         MongoDB Database Cluster                          |   |
|   |                                                                           |   |
|   |  Collections:                                                             |   |
|   |  - users, products, categories, orders, payments, delivery_zones          |   |
|   |  - coupons, reviews, blog_posts, homepage_sections, seo_pages, audits     |   |
|   |                                                                           |   |
|   |  Indexes: Compound indexes on (category, status, price), text search on   |   |
|   |  (title, description, tags), unique constraints on orderNumber & slugs    |   |
|   +---------------------------------------------------------------------------+   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Monorepo Structure & Package Boundaries

The platform organizes shared logic and applications inside an npm workspaces repository:

```
├── apps/
│   ├── storefront/     # Next.js 14/15 App Router customer experience
│   ├── admin/          # Next.js 14/15 App Router internal operations & CMS
│   └── api/            # Express.js, Mongoose, and TypeScript backend
└── packages/
    ├── config/         # Brand tokens, site navigation, order statuses, delivery slots
    ├── types/          # Universal TypeScript interfaces & domain entities
    ├── utils/          # Currency formatting (INR), discounts, order numbering, pincodes
    ├── validation/     # Zod schemas for checkout, inquiries, reviews, and address forms
    └── ui/             # Cross-app UI components (Badges, StarRating, PriceDisplay, etc.)
```

### Dependency Rules
- Applications (`apps/*`) may import from shared packages (`packages/*`).
- Applications NEVER import directly from other applications.
- Shared packages NEVER import from applications.
- Business validation schemas (`packages/validation`) are utilized identically on both frontend forms and backend request controllers to ensure complete contract parity.

---

## 3. Order Lifecycle & Finite State Machine

All order status changes are enforced server-side using the `VALID_ORDER_TRANSITIONS` state table defined in `@repo/config`. Direct or illegal state jumps (e.g., from `PENDING_PAYMENT` to `DELIVERED` without passing through payment confirmation and dispatch) are rejected with HTTP 400.

```
       [ PENDING_PAYMENT ] (Initial state for online payment)
               |
               +--------------------------------------+
               |                                      |
       (Payment Success)                       (Payment Failed)
               v                                      v
       [ PAYMENT_CONFIRMED ]                      [ CANCELLED ]
               |
               +--------------------------------------+
               |                                      |
       (Store Accepted)                         (Cancellation)
               v                                      v
          [ PROCESSING ]                          [ CANCELLED ]
               |
       (Packed & Handed to Courier)
               v
       [ OUT_FOR_DELIVERY ]
               |
               +--------------------------------------+
               |                                      |
      (Delivered to Recipient)                  (Delivery Failed)
               v                                      v
          [ DELIVERED ]                          [ RETURNED ]
               |                                      |
         (Within Return Window)                (Refund Actioned)
               v                                      v
          [ REFUNDED ]                           [ REFUNDED ]
```

### State Machine Rules
1. **COD Orders**: Start directly at `PROCESSING` or `PAYMENT_CONFIRMED` upon OTP / automated checkout approval.
2. **Online (Razorpay) Orders**: Created with `PENDING_PAYMENT`. Only upgraded to `PAYMENT_CONFIRMED` once the cryptographic HMAC-SHA256 signature is verified.
3. **Cancellation Window**: An order can only be cancelled while in `PENDING_PAYMENT`, `PAYMENT_CONFIRMED`, or `PROCESSING`. Once `OUT_FOR_DELIVERY`, cancellation requires support supervisor intervention.
4. **Audit Trail**: Every state transition generates an immutable `AuditLog` record containing the previous status, new status, actor ID, and IP address.

---

## 4. Payment Security & Integrity Architecture

Bloom & Blossom implements a strict 3-tier payment security model:

```
[Storefront]                                     [Backend API]                                   [Razorpay Gateway]
     |                                                 |                                                  |
     | 1. POST /api/checkout/create-order              |                                                  |
     |    (Sends item IDs, variant IDs, coupon)        |                                                  |
     |------------------------------------------------>|                                                  |
     |                                                 | 2. Recalculate price server-side                 |
     |                                                 |    (Query MongoDB, apply active coupon rules)    |
     |                                                 |                                                  |
     |                                                 | 3. Create Gateway Order with calculated amount   |
     |                                                 |------------------------------------------------->|
     |                                                 |<-------------------------------------------------|
     |                                                 | 4. Return razorpayOrderId & verified total       |
     |<------------------------------------------------|                                                  |
     |                                                 |                                                  |
     | 5. Mount Razorpay Checkout modal                |                                                  |
     | 6. User enters card/UPI/netbanking details      |                                                  |
     |--------------------------------------------------------------------------------------------------->|
     |<---------------------------------------------------------------------------------------------------|
     | 7. Modal returns payment_id, order_id, signature|                                                  |
     |                                                 |                                                  |
     | 8. POST /api/checkout/verify-payment            |                                                  |
     |------------------------------------------------>|                                                  |
     |                                                 | 9. Compute HMAC-SHA256:                          |
     |                                                 |    expected = crypto.createHmac("sha256", secret)|
     |                                                 |      .update(order_id + "|" + payment_id)        |
     |                                                 |      .digest("hex")                              |
     |                                                 |                                                  |
     |                                                 | 10. Timing-safe comparison against signature     |
     |                                                 |     If match: mark PAID, decrement stock         |
     |                                                 |     If mismatch: log fraud alert, reject         |
     | 11. Confirmation / Receipt Screen               |                                                  |
     |<------------------------------------------------|                                                  |
```

### Critical Security Principles
- **No Client Pricing**: The frontend NEVER submits order totals to the server. Only product IDs and quantities are transmitted. The server re-queries MongoDB for authoritative unit prices.
- **Timing Safe Verification**: Signature matching uses `crypto.timingSafeEqual` to prevent side-channel timing attacks.
- **Webhook Reconciliation**: An asynchronous webhook receiver (`/api/checkout/webhook`) captures out-of-band payment events if the customer closes their browser before returning to the storefront.

---

## 5. Pincode & Delivery Slot Engine

Flower bouquets and luxury hampers have distinct delivery constraints:
1. **Freshness Window**: Bouquets must be assembled same-day; delivery slots require strict cutoff hours (e.g., standard same-day cutoff at 5:00 PM; midnight cutoff at 6:00 PM).
2. **Geographical Zones**:
   - **Core Metro**: Same-day delivery, 2-hour express, and midnight slots supported.
   - **Outer Metro**: Same-day and fixed-time delivery supported.
   - **Rest of India**: Shipped via express courier (2-4 business days, non-perishable hampers only).
3. **Dynamic Slot Validation**: During checkout, the server evaluates current timestamp vs. the requested slot cutoff. Expired slots are disabled in real-time.

---

## 6. Technical SEO & Rich Snippet Architecture

Every page on the storefront is architected for maximum indexing speed and Google SERP dominance:
- **Server-Side Rendering (SSR)**: Core catalog pages (`/bouquets`, `/hampers`, `/products/[slug]`) render HTML with complete text and links directly on the server for instant crawler ingestion.
- **JSON-LD Schema Hierarchy**:
  - `Organization` & `WebSite` schemas on the homepage.
  - `Product` + `Offer` + `AggregateRating` schemas on product detail pages.
  - `BreadcrumbList` schema on all category and sub-collection pages.
  - `FAQPage` schema on category footers and `/faq` page.
  - `Article` schema on `/blog/[slug]`.
- **Indexing Directives**:
  - Utility and administrative routes (`/cart`, `/checkout`, `/search`, `/wishlist`, `/admin/*`) emit `robots: { index: false, follow: false }` to prevent crawl budget waste.
  - Category pages utilize canonical links referencing the root URL without transient sort/filter parameters.
