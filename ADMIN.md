# Admin Portal User Guide & Operations Manual

The **Bloom & Blossom Admin Portal** (`http://localhost:3001` or `https://admin.bloomandblossom.com`) provides store managers, florists, and customer support agents with an intuitive, unified dashboard to manage orders, inventory, pricing, promotions, and content.

---

## 1. Access & Role-Based Access Control (RBAC)

- **Default Superadmin**: `admin@bloomandblossom.com` / `SuperSecretAdmin2026!` (seeded during initial database provisioning).
- **Supported Roles**:
  - `SUPER_ADMIN`: Complete access to all modules, financial settings, and user management.
  - `STORE_MANAGER`: Order status dispatch, inventory overrides, and coupon management.
  - `CONTENT_EDITOR`: Homepage CMS, blog articles, and review moderation.

---

## 2. Admin Modules Reference

### 2.1 Dashboard Overview (`/`)
- Real-time revenue, gross order count, and average order value (AOV) metrics.
- Today's pending deliveries broken down by time slot (Standard, Fixed Window, Midnight).
- Low-stock stem warnings requiring immediate supplier purchase orders.

### 2.2 Order Fulfillment & Dispatch (`/orders`)
- **Order Filters**: Filter by order status (`PENDING_PAYMENT`, `PAYMENT_CONFIRMED`, `PROCESSING`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`).
- **State Machine Enforcement**: Action buttons dynamically display only *legal* next statuses based on the strict state transition table.
- **Gift Message Printing**: Dedicated print preview to generate luxury physical gift enclosure cards for florist pack benches.
- **Status Timeline**: View full timestamped audit log of every change made to an order.

### 2.3 Product Catalog & Variants (`/products`)
- Create new flower bouquets, exotic vases, gourmet hampers, and custom engraved items.
- Configure stem breakdowns, vase dimensions, care instructions, and shelf-life notes.
- Set standard price, MRP (strike-through), and SKU.
- Toggle features: `Featured in Hero Carousel`, `Bestseller Badge`, `Requires Personalization Prompt`.

### 2.4 Categories & Rich Snippet SEO (`/categories`)
- Edit category names, slugs, and hierarchy.
- Configure category-specific FAQs to power Google **FAQPage schema** rich dropdowns directly from search results.
- Set custom meta titles and descriptions for high-traffic SERP targeting.

### 2.5 Inventory & Stock Alerts (`/inventory`)
- Monitor unit counts across all product SKUs.
- Highlight items breaching safety thresholds (e.g. stock <= 5 units).
- Quick inline `+` and `-` adjustments for rapid daily inventory updates after morning flower auctions.

### 2.6 Delivery Zones & Slot Cutoffs (`/delivery`)
- Manage 6-digit postal code coverage areas (e.g. Core Chennai metro vs. suburban zones).
- Configure order cutoff times (e.g., 5:00 PM for same-day delivery; 6:00 PM for midnight delivery).
- Set surcharges for express and midnight slots.
- Test customer pincodes with the interactive Pincode Zone Validator.

### 2.7 Coupons & Promotions (`/coupons`)
- Generate percentage-based or flat rupee discount codes (`FIRST10`, `FESTIVE200`).
- Set minimum cart value thresholds, maximum discount caps, and lifetime redemption limits.
- Toggle active/disabled status with a single click.

### 2.8 Customer Review Moderation (`/reviews`)
- Moderate customer feedback and rating submissions.
- Verified buyer badges automatically confirmed from order purchase records.
- Approving a review immediately updates the live storefront and enriches the product's Google **AggregateRating** JSON-LD schema.

### 2.9 Homepage CMS Builder (`/homepage`)
- Edit announcement bar copy and promotional discount links.
- Toggle visibility of all 22 homepage sections without deploying code.
- Customize hero headlines, subtitles, and primary CTAs.

### 2.10 Blog & Journal CMS (`/blog`)
- Draft, edit, and publish flower care tutorials and gifting etiquette guides.
- Built-in markdown support and automatic Article JSON-LD generation.

### 2.11 Audit & Security Logs (`/audit-logs`)
- Trace who made each change, what was modified, when it occurred, and the originating IP address.
- Essential for dispute resolution, fraud prevention, and operational compliance.
