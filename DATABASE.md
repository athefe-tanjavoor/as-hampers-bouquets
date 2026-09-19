# MongoDB Database Architecture & Schema Reference

This document provides complete documentation for the MongoDB database models, collection schemas, relationships, indexing strategies, and data integrity safeguards in **Bloom & Blossom**.

---

## 1. Database Overview

- **Engine**: MongoDB (v6.0+)
- **Object Modeling**: Mongoose (v8.6+)
- **Strict Rule**: No Prisma. Pure Mongoose schemas with native validation, timestamps, and indexes.

---

## 2. Collections & Entity Relationship Diagram

```
                 +-------------------+
                 |       User        |
                 +-------------------+
                 | _id (ObjectId)    |
                 | name (String)     |
                 | email (String)    |
                 | role (Enum)       |
                 +--------+----------+
                          |
              +-----------+-----------+
              | 1:N                   | 1:N
              v                       v
      +---------------+       +---------------+
      |     Order     |       |    Review     |
      +---------------+       +---------------+
      | _id           |       | _id           |
      | orderNumber   |       | product (Ref) |
      | user (Ref)    |       | user (Ref)    |
      | items: []     |       | rating (1-5)  |
      | totals: {}    |       | status (Enum) |
      +-------+-------+       +---------------+
              |
              | 1:1
              v
      +---------------+
      |    Payment    |
      +---------------+
      | _id           |
      | order (Ref)   |
      | gateway (RP)  |
      | signature     |
      | status        |
      +---------------+

      +-------------------+          +-------------------+
      |     Category      | 1:N      |      Product      |
      +-------------------+<---------+-------------------+
      | _id               |          | _id               |
      | name              |          | title             |
      | slug (unique)     |          | slug (unique)     |
      | parent (Ref)      |          | category (Ref)    |
      | faqs: []          |          | price, mrp        |
      +-------------------+          | stock, sku        |
                                     | variants: []      |
                                     | personalization   |
                                     +-------------------+
```

---

## 3. Detailed Schema Definitions

### 3.1 `Product` Collection
Stores all bouquets, floral arrangements, gift hampers, and customizable keepsakes.

| Field | Type | Required | Description / Constraints |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Auto | Unique identifier |
| `title` | String | Yes | Full product name (e.g. "Velvet Crimson 24-Rose Bouquet") |
| `slug` | String | Yes | SEO-friendly unique URL identifier (Indexed, Unique) |
| `sku` | String | Yes | Stock Keeping Unit code (e.g. "FLW-ROS-001") |
| `description` | String | Yes | Rich markdown or HTML product description |
| `category` | ObjectId (Ref) | Yes | Reference to `Category` |
| `tags` | [String] | No | Array of keywords (e.g. `["romantic", "roses", "anniversary"]`) |
| `price` | Number | Yes | Current selling price in INR (Min: 0) |
| `mrp` | Number | Yes | Maximum Retail Price / Strike-through price |
| `stock` | Number | Yes | Available warehouse stem/unit inventory (Min: 0) |
| `lowStockThreshold` | Number | Default: 5 | Inventory alert trigger |
| `images` | [String] | Yes | Array of image URLs (Minimum 1 image required) |
| `rating` | Number | Default: 4.8 | Calculated aggregate rating (1.0 to 5.0) |
| `reviewCount` | Number | Default: 0 | Number of approved reviews |
| `featured` | Boolean | Default: false | Show on homepage featured carousels |
| `isBestSeller` | Boolean | Default: false | Show best seller badge |
| `isPersonalizable` | Boolean | Default: false | Requires custom engraving, card message, or photo |
| `personalizationPrompt` | String | No | Instructions (e.g. "Enter custom name or message") |
| `deliveryType` | Enum | Yes | `SAME_DAY`, `NEXT_DAY`, `EXPRESS_2HR`, `STANDARD` |
| `careInstructions` | [String] | No | Bulleted care guidelines for vases/stems |
| `metaTitle` | String | No | Overriding SEO title |
| `metaDescription` | String | No | Overriding SEO description |
| `createdAt`, `updatedAt` | Date | Auto | Timestamps |

**Indexes**:
- Compound: `{ category: 1, status: 1, price: 1 }`
- Text: `{ title: "text", description: "text", tags: "text" }`
- Unique: `{ slug: 1 }`, `{ sku: 1 }`

---

### 3.2 `Category` Collection
Hierarchical taxonomy for occasions, price buckets, and floral collections.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Category display title |
| `slug` | String | Unique category slug (`/bouquets`, `/hampers`, `/anniversary-gifts`) |
| `description` | String | Editorial overview for top of category page |
| `seoContent` | String | In-depth SEO text rendered at bottom of collection |
| `parent` | ObjectId (Ref) | Self-referencing parent category (nullable) |
| `featured` | Boolean | Displayed in homepage category rail |
| `faqs` | Array | `[{ question: String, answer: String }]` for JSON-LD FAQPage schema |
| `metaTitle` | String | SERP page title |
| `metaDescription` | String | SERP page summary |

---

### 3.3 `Order` Collection
Central transaction entity tracking items, recipients, delivery slots, and payment status.

| Field | Type | Description |
| :--- | :--- | :--- |
| `orderNumber` | String | Unique human-friendly order ID (e.g. `BB-2026-9812`) |
| `user` | ObjectId (Ref) | Reference to User (or null for guest checkout) |
| `items` | Array | Snapshots of products at time of purchase: `[{ product, title, price, quantity, variant, personalization }]` |
| `shippingAddress` | Object | `{ recipientName, recipientPhone, street, landmark, city, state, pincode }` |
| `sender` | Object | `{ name, email, phone }` |
| `giftMessage` | String | Message printed on luxury complimentary greeting card |
| `deliverySlot` | Object | `{ date: Date, timeSlot: String, type: Enum, surcharge: Number }` |
| `pricing` | Object | `{ subtotal: Number, discount: Number, deliveryFee: Number, slotSurcharge: Number, total: Number }` |
| `couponCode` | String | Applied coupon code (if any) |
| `status` | Enum | Valid status from state machine |
| `paymentStatus` | Enum | `PENDING`, `PAID`, `FAILED`, `REFUNDED` |
| `paymentMethod` | Enum | `RAZORPAY`, `COD` |
| `tracking` | Array | Status timeline: `[{ status, timestamp, note }]` |

**Indexes**:
- Unique: `{ orderNumber: 1 }`
- Lookup: `{ "sender.email": 1 }`, `{ status: 1 }`, `{ createdAt: -1 }`

---

### 3.4 `DeliveryZone` Collection
Pincode mapping rules and fulfillment cutoffs.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Zone title (e.g. "Chennai Metro Core") |
| `pincodes` | [String] | Array of 6-digit postal codes |
| `sameDayCutoffHour` | Number | Cut-off hour (24-hr format, e.g. 17) |
| `midnightAvailable` | Boolean | True if midnight delivery fleet covers zone |
| `baseDeliveryFee` | Number | Flat delivery cost (0 if free) |
| `freeDeliveryThreshold` | Number | Minimum cart value for waived delivery fee |

---

### 3.5 `Coupon` Collection
Promotional and seasonal discount codes.

| Field | Type | Description |
| :--- | :--- | :--- |
| `code` | String | Unique uppercase code (`FIRST10`, `BLOOM15`) |
| `type` | Enum | `PERCENTAGE` or `FIXED` |
| `value` | Number | Percentage value or flat amount in INR |
| `minOrderValue` | Number | Minimum cart total required to activate |
| `maxDiscount` | Number | Optional cap on percentage discounts |
| `usageLimit` | Number | Total lifetime redemption limit |
| `usageCount` | Number | Current redemption tally |
| `validUntil` | Date | Expiration timestamp |
| `active` | Boolean | Admin activation toggle |

---

### 3.6 `AuditLog` Collection
Security and regulatory audit trail.

| Field | Type | Description |
| :--- | :--- | :--- |
| `actor` | String | Name/Email of administrator or "System Automation" |
| `action` | String | Action type (e.g. `ORDER_STATUS_CHANGED`, `STOCK_OVERRIDE`) |
| `resource` | String | Target collection or module (`Order`, `Product`, `Coupon`) |
| `resourceId` | String | Target document identifier |
| `details` | String | Human-readable diff or action explanation |
| `ipAddress` | String | Request source IP address |
| `timestamp` | Date | Immutable record timestamp |
