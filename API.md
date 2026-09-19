# REST API Documentation & Endpoint Reference

The **Bloom & Blossom** backend API exposes a comprehensive set of RESTful endpoints powering both the customer storefront and the administrative portal.

---

## 1. General Principles & Standards

- **Base URL**: `http://localhost:5000/api` (Local) / `https://api.bloomandblossom.com/api` (Production)
- **Content Type**: `application/json`
- **Authentication**: JWT Bearer token in `Authorization: Bearer <token>` or HttpOnly session cookie
- **Response Format**: Standard JSON with consistent payload envelopes:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Optional descriptive status"
  }
  ```
- **Error Response Format**:
  ```json
  {
    "success": false,
    "error": {
      "code": "INVALID_COUPON",
      "message": "Coupon code is expired or invalid for this cart total."
    }
  }
  ```

---

## 2. Public Storefront Endpoints

### 2.1 Configuration & Site Settings
- **`GET /api/config`**
  - **Description**: Returns brand settings, active delivery slot types, navigation links, and policy details.
  - **Response**:
    ```json
    {
      "success": true,
      "data": {
        "brand": {
          "name": "Bloom & Blossom",
          "city": "Chennai",
          "phone": "+91 98765 43210",
          "email": "orders@bloomandblossom.com",
          "currency": "INR",
          "currencySymbol": "₹"
        },
        "deliverySlots": [ ... ]
      }
    }
    ```

### 2.2 Catalog & Categories
- **`GET /api/categories`**
  - **Query Params**: `featured=true` (optional)
  - **Description**: Returns list of active categories with product counts and hierarchy.
- **`GET /api/categories/:slug`**
  - **Description**: Returns category details, lower SEO content, and FAQ rich snippet entries.

### 2.3 Products & Collections
- **`GET /api/products`**
  - **Query Params**:
    - `category`: Category slug (e.g. `bouquets`, `hampers`)
    - `priceMax`: Filter price <= amount (e.g. `599`, `999`, `1499`)
    - `sort`: `price-low`, `price-high`, `rating`, `newest`
    - `page`: Page number (Default: `1`)
    - `limit`: Items per page (Default: `20`)
- **`GET /api/products/:slug`**
  - **Description**: Returns full product details, variants, stem composition, care tips, verified buyer reviews, and related collection items.
- **`GET /api/products/search?q=query`**
  - **Description**: Full-text keyword search across product titles, descriptions, and occasion tags.

### 2.4 Pincode & Delivery Validation
- **`POST /api/delivery/check-pincode`**
  - **Payload**:
    ```json
    {
      "pincode": "600017"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "data": {
        "serviceable": true,
        "zoneName": "Chennai Core Metro",
        "sameDayEligible": true,
        "midnightEligible": true,
        "baseDeliveryFee": 0,
        "availableSlots": [
          { "id": "slot-std", "name": "Standard Delivery", "surcharge": 0 },
          { "id": "slot-midnight", "name": "Midnight (11 PM - 12 AM)", "surcharge": 250 }
        ]
      }
    }
    ```

### 2.5 Cart & Pricing Calculations
- **`POST /api/cart/calculate`**
  - **Description**: Server-side price recalculator. Prevents client price tampering.
  - **Payload**:
    ```json
    {
      "items": [
        { "productId": "prod-1", "quantity": 1, "variantId": null }
      ],
      "couponCode": "FIRST10",
      "pincode": "600017",
      "slotType": "STANDARD"
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "data": {
        "subtotal": 2499,
        "discount": 200,
        "couponApplied": "FIRST10",
        "deliveryFee": 0,
        "slotSurcharge": 0,
        "total": 2299
      }
    }
    ```

### 2.6 Checkout & Payments
- **`POST /api/checkout/create-order`**
  - **Description**: Validates stock, re-verifies pricing, stores order as `PENDING_PAYMENT`, and creates Razorpay gateway order.
  - **Payload**: Includes recipient shipping address, sender contact, gift message, delivery date/slot, payment method (`RAZORPAY` or `COD`), and cart items.
  - **Response**:
    ```json
    {
      "success": true,
      "data": {
        "orderNumber": "BB-2026-9812",
        "razorpayOrderId": "order_LhG782Jq1",
        "amount": 229900,
        "currency": "INR"
      }
    }
    ```

- **`POST /api/checkout/verify-payment`**
  - **Description**: Cryptographically verifies `razorpay_signature` using HMAC-SHA256. Updates order status to `PAYMENT_CONFIRMED`.
  - **Payload**:
    ```json
    {
      "orderNumber": "BB-2026-9812",
      "razorpayOrderId": "order_LhG782Jq1",
      "razorpayPaymentId": "pay_OrZkX82h41q",
      "razorpaySignature": "4bf43890...hex"
    }
    ```

- **`GET /api/orders/track/:orderNumber`**
  - **Description**: Public order status timeline lookup by order number and customer phone/email.

### 2.7 Customer Reviews & Inquiries
- **`POST /api/reviews/submit`**
  - **Description**: Submits product review. Marked as `PENDING` until approved by moderator.
- **`POST /api/enquiry/corporate`**
  - **Description**: Submits B2B bulk floral and hamper requests.
- **`POST /api/enquiry/wedding`**
  - **Description**: Submits bespoke bridal and venue decor inquiries.

---

## 3. Administrative Endpoints (RBAC Required)

Protected by JWT authentication middleware (`requireAdmin`).

### 3.1 Auth & Dashboard
- **`POST /api/admin/login`**: Authenticates admin user and issues JWT.
- **`GET /api/admin/dashboard`**: Returns live KPIs (Revenue, Total Orders, Average Order Value, Low Stock Alerts, Pending Reviews).

### 3.2 Order Management
- **`GET /api/admin/orders`**: Lists all customer orders with filtering by status, date, or customer.
- **`PATCH /api/admin/orders/:id/status`**:
  - **Payload**: `{ "status": "OUT_FOR_DELIVERY", "note": "Dispatched via van #4" }`
  - Validates legal transition in state machine, updates timeline, and creates audit log.

### 3.3 Products & Inventory
- **`POST /api/admin/products`**: Creates new product with variants, stock, and SEO data.
- **`PUT /api/admin/products/:id`**: Updates catalog item details and pricing.
- **`PATCH /api/admin/products/:id/stock`**: Inline inventory adjustment.
- **`DELETE /api/admin/products/:id`**: Soft-deletes catalog product.

### 3.4 Review Moderation
- **`PATCH /api/admin/reviews/:id/status`**: Approves (`APPROVED`) or rejects (`REJECTED`) reviews. Approved reviews immediately feed into schema aggregate ratings.

### 3.5 Audit History
- **`GET /api/admin/audit-logs`**: Paginated view of all administrative operations, IP addresses, and state changes.
