import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { BRAND_CONFIG } from "@repo/config";
import { CartProvider } from "../lib/cart-context";
import { AnnouncementBar } from "../components/common/AnnouncementBar";
import { Header } from "../components/common/Header";
import { MegaMenu } from "../components/common/MegaMenu";
import { MobileNav, MobileBottomNav } from "../components/common/MobileNav";
import { CartDrawer } from "../components/common/CartDrawer";
import { Footer } from "../components/common/Footer";
import { LayoutWrapper } from "./layout-wrapper";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_CONFIG.baseUrl),
  title: {
    default: `${BRAND_CONFIG.name} | Bouquets, Flowers & Gift Hampers Online`,
    template: `%s | ${BRAND_CONFIG.name}`
  },
  description: BRAND_CONFIG.description,
  keywords: [
    "bouquets",
    "fresh flowers",
    "flower delivery",
    "gift hampers",
    "personalized gifts",
    "birthday gifts",
    "anniversary gifts",
    "wedding flowers",
    "corporate gifting"
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  creator: BRAND_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BRAND_CONFIG.baseUrl,
    siteName: BRAND_CONFIG.name,
    title: `${BRAND_CONFIG.name} | Bouquets, Flowers & Gift Hampers Online`,
    description: BRAND_CONFIG.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${BRAND_CONFIG.name} Floral and Gift Collections`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_CONFIG.name} | Bouquets, Flowers & Gift Hampers Online`,
    description: BRAND_CONFIG.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Florist",
    "name": BRAND_CONFIG.name,
    "url": BRAND_CONFIG.baseUrl,
    "logo": `${BRAND_CONFIG.baseUrl}/logo.png`,
    "description": BRAND_CONFIG.description,
    "telephone": BRAND_CONFIG.supportPhone,
    "email": BRAND_CONFIG.supportEmail,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": BRAND_CONFIG.primaryCity,
      "addressCountry": "IN"
    },
    "sameAs": [
      BRAND_CONFIG.socials.instagram,
      BRAND_CONFIG.socials.facebook
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BRAND_CONFIG.name,
    "url": BRAND_CONFIG.baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BRAND_CONFIG.baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
