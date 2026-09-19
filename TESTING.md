# Testing Strategy, Quality Assurance & Test Cases

This document defines the testing methodology, automated test suites, critical user flows, and manual QA scenarios for **Bloom & Blossom**.

---

## 1. Automated Testing Strategy

The test suite spans three primary tiers:

```
                  +--------------------------+
                  |  End-to-End (Playwright) |  -> Complete checkout & admin flows
                  +--------------------------+
                  |  Integration (Supertest) |  -> REST APIs, DB transactions, Webhooks
                  +--------------------------+
                  |     Unit (Jest / Vitest) |  -> Pricing recalculations, Zod schemas, state machine
                  +--------------------------+
```

---

## 2. Critical Test Scenarios & Test Matrix

### 2.1 Pricing & Calculation Integrity (Unit)
- **Zero Client Trust**: Verify that submitting client-altered prices in `/api/checkout/create-order` is completely ignored and overridden by server database queries.
- **Coupon Math**:
  - Verify that percentage discounts (e.g. 15% off ₹2,000 = ₹300) are accurate to the rupee.
  - Verify that maximum discount caps (e.g. cap at ₹250) prevent excess deduction.
  - Verify that minimum order value enforcement rejects coupons when cart value is below threshold.
- **Delivery Surcharges**:
  - Verify standard slot fee is ₹0 when cart exceeds free shipping threshold.
  - Verify midnight delivery fee (₹250) is added to order total regardless of cart value.

### 2.2 Order State Machine (Unit & Integration)
- **Legal Transitions**:
  - `PENDING_PAYMENT` -> `PAYMENT_CONFIRMED` (Allowed on valid signature)
  - `PAYMENT_CONFIRMED` -> `PROCESSING` (Allowed)
  - `PROCESSING` -> `OUT_FOR_DELIVERY` (Allowed)
  - `OUT_FOR_DELIVERY` -> `DELIVERED` (Allowed)
- **Illegal Transitions**:
  - `PENDING_PAYMENT` -> `DELIVERED` (Must fail with HTTP 400)
  - `DELIVERED` -> `PROCESSING` (Must fail with HTTP 400)
  - `CANCELLED` -> `OUT_FOR_DELIVERY` (Must fail with HTTP 400)

### 2.3 Razorpay Payment Cryptography (Integration)
- **Signature Verification**:
  - Generate valid HMAC SHA-256 using test secret. Verify that verification returns `true` and order updates to `PAYMENT_CONFIRMED`.
  - Mutate one character of signature. Verify that verification returns `false` with HTTP 400 and creates a security fraud audit log.

### 2.4 Pincode & Delivery Slot Engine (Integration)
- **Cutoff Time Enforcement**:
  - Test order placed at 4:30 PM for a zone with a 5:00 PM cutoff -> Same-day delivery available.
  - Test order placed at 5:30 PM for the same zone -> Same-day delivery disabled; next available date selected.
- **Pincode Boundary Checking**:
  - Valid core pincode (`600017`) returns all delivery slots.
  - Out-of-service pincode displays clear serviceability message and directs to national hamper shipping.

---

## 3. End-to-End User Journeys (E2E)

1. **Guest Checkout Flow**:
   - Visitor navigates to `/bouquets`.
   - Selects "Velvet Crimson 24-Rose Hand-Tied Luxury Bouquet".
   - Enters delivery pincode `600017` -> Validated as eligible for same-day delivery.
   - Adds custom gift message: *"Happy Anniversary my love!"*.
   - Proceeds to `/cart` and applies coupon `FIRST10` -> Verified discount applied.
   - Enters recipient and sender details in `/checkout`.
   - Selects Standard slot and completes payment -> Order confirmation page shows order number `BB-2026-XXXX`.

2. **Order Tracking Flow**:
   - Customer opens `/track-order`.
   - Enters order number and registered phone number.
   - Stepper displays status progress bar with active step highlighted.

3. **Admin Fulfillment Flow**:
   - Store manager logs into `/orders`.
   - Views newly placed order, reviews gift message, and clicks "Print Gift Enclosure".
   - Moves order status from `PAYMENT_CONFIRMED` to `PROCESSING`.
   - Once packed, transitions status to `OUT_FOR_DELIVERY`.
   - Delivery driver completes hand-off; manager transitions status to `DELIVERED`.
