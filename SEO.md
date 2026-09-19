# Technical SEO Architecture & Rich Snippet Playbook

The **Bloom & Blossom** storefront has been engineered from the ground up to secure first-page Google search rankings for high-intent floral, gift hamper, and customized gifting queries across metropolitan India.

---

## 1. Information Architecture & URL Hierarchy

All URLs follow a clean, human-readable, and crawl-efficient kebab-case structure:

| Page Type | URL Pattern | Canonical Strategy |
| :--- | :--- | :--- |
| **Homepage** | `/` | Self-canonical to `https://bloomandblossom.com/` |
| **Primary Category** | `/[category]` (e.g. `/bouquets`, `/hampers`, `/flowers`) | Self-canonical; parameter queries (`?sort=...`) canonicalize to clean URL |
| **Occasion Collections**| `/[occasion]` (e.g. `/birthday-gifts`, `/anniversary-gifts`) | Dedicated landing page with unique editorial H1, intro, and lower SEO text |
| **Price Buckets** | `/[budget]` (e.g. `/under-599`, `/under-999`, `/under-1499`) | Targeted landing pages capturing high-converting price-sensitive searches |
| **Product Detail (PDP)**| `/products/[slug]` | Strict slug-based canonical; never nested inside multiple category paths |
| **Blog Articles** | `/blog/[slug]` | Educational content targeting informational queries and long-tail keywords |
| **Utility Pages** | `/cart`, `/checkout`, `/search`, `/track-order`, `/admin` | Explicitly marked with `noindex, nofollow` meta tags |

---

## 2. Meta Tags & Title Hierarchy

Every page implements standard OpenGraph, Twitter Card, and Google-compliant title formatting:

- **Template**: `%s | Bloom & Blossom`
- **Title Character Limit**: 55–65 characters
- **Meta Description Limit**: 150–160 characters, with strong action-oriented call to action (e.g. *"Handcrafted fresh flower bouquets with same-day delivery in Chennai. Order online with free delivery & personalized cards."*)
- **Heading Discipline**: Exactly one `<h1>` per page, followed by logical `<h2>` and `<h3>` tags. Never skip heading levels.

---

## 3. Structured Data / JSON-LD Schemas

Search engine crawlers consume rich structured data on all critical routes:

### 3.1 Organization & WebSite (`/`)
Establishes brand identity, corporate logo, contact points, and Sitelinks Searchbox:
```json
{
  "@context": "https://schema.org",
  "@type": "Florist",
  "name": "Bloom & Blossom",
  "url": "https://bloomandblossom.com",
  "logo": "https://bloomandblossom.com/images/logo.png",
  "telephone": "+919876543210",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "T. Nagar",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600017",
    "addressCountry": "IN"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://bloomandblossom.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### 3.2 Product + Offer + AggregateRating (`/products/[slug]`)
Qualifies product pages for Google Rich Snippet stars, price badges, and in-stock flags:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Velvet Crimson 24-Rose Hand-Tied Luxury Bouquet",
  "image": ["https://bloomandblossom.com/images/crimson-roses-1.jpg"],
  "description": "24 freshly harvested Dutch velvet crimson red roses arranged with silver dollar eucalyptus.",
  "sku": "FLW-ROS-001",
  "brand": {
    "@type": "Brand",
    "name": "Bloom & Blossom"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://bloomandblossom.com/products/velvet-crimson-24-rose-hand-tied-luxury-bouquet",
    "priceCurrency": "INR",
    "price": "2499",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128"
  }
}
```

### 3.3 BreadcrumbList
Rendered on all collection and product pages to display navigational breadcrumbs in SERPs:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bloomandblossom.com" },
    { "@type": "ListItem", "position": 2, "name": "Bouquets", "item": "https://bloomandblossom.com/bouquets" },
    { "@type": "ListItem", "position": 3, "name": "Crimson Roses", "item": "https://bloomandblossom.com/products/velvet-crimson-24-rose-hand-tied-luxury-bouquet" }
  ]
}
```

### 3.4 FAQPage Schema
Rendered on category pages and `/faq` to earn accordion dropdown answers directly in Google search results.

---

## 4. Robots.txt & Dynamic Sitemap

### 4.1 Crawl Directives (`/robots.txt`)
- **Allowed**: Complete storefront catalog, category taxonomy, price collections, blog guides, and static policy pages.
- **Disallowed**:
  - `/cart`
  - `/checkout`
  - `/search`
  - `/wishlist`
  - `/admin/*`
  - `/api/*`
- **Sitemap Reference**: Points directly to `https://bloomandblossom.com/sitemap.xml`.

### 4.2 Dynamic Sitemap (`/sitemap.xml`)
Generated on-the-fly in Next.js (`apps/storefront/app/sitemap.ts`) including:
- Homepage (`priority: 1.0`, `changeFrequency: 'daily'`)
- Core Category Collections (`priority: 0.9`, `changeFrequency: 'daily'`)
- Occasion & Price Landing Pages (`priority: 0.8`, `changeFrequency: 'weekly'`)
- All Active Products (`priority: 0.8`, `changeFrequency: 'daily'`)
- Blog Posts (`priority: 0.7`, `changeFrequency: 'weekly'`)
- Policy & Contact Pages (`priority: 0.5`, `changeFrequency: 'monthly'`)

---

## 5. Core Web Vitals & Image Optimization

- **Next/Image**: All imagery serves modern WebP / AVIF formats with automatic width srcsets and responsive sizing (`sizes="(max-width: 768px) 100vw, 50vw"`).
- **LCP Optimization**: Above-the-fold hero banners load with `priority={true}` to prevent layout shifts.
- **Font Loading**: `Playfair Display` and `Inter` load via `next/font/google` using `display: swap` and zero external network render blocking.
- **CLS (Cumulative Layout Shift) Prevention**: Fixed aspect ratios (`aspect-square`, `aspect-[4/3]`) applied to all card skeletons and image containers.
