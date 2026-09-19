export interface BrandConfig {
  name: string;
  tagline: string;
  description: string;
  domain: string;
  baseUrl: string;
  primaryCity: string;
  serviceArea: string;
  supportPhone: string;
  supportEmail: string;
  currency: string;
  currencyCode: string;
  deliveryPromise: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  announcementText: string;
  announcementCta: string;
  announcementUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    pinterest: string;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  name: "Bloom & Blossom",
  tagline: "Beautiful Bouquets, Thoughtful Hampers & Gifts Made With Love",
  description: "Celebrate every little and big moment with handcrafted bouquets, elegant flower arrangements, curated gift hampers and personalized keepsakes.",
  domain: "bloomandblossom.com",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bloomandblossom.com",
  primaryCity: "Chennai",
  serviceArea: "Chennai & selected areas",
  supportPhone: "+91 98765 43210",
  supportEmail: "hello@bloomandblossom.com",
  currency: "₹",
  currencyCode: "INR",
  deliveryPromise: "Same-day delivery in selected areas",
  freeDeliveryThreshold: 1499,
  standardDeliveryFee: 99,
  announcementText: "Free Delivery on Selected Orders • Beautiful Gifts, Thoughtfully Delivered",
  announcementCta: "Shop Now",
  announcementUrl: "/bouquets",
  socials: {
    instagram: "https://instagram.com/bloomandblossom",
    facebook: "https://facebook.com/bloomandblossom",
    whatsapp: "https://wa.me/919876543210",
    pinterest: "https://pinterest.com/bloomandblossom"
  }
};

export const COLOR_TOKENS = {
  primaryPink: "#C94F78",
  softPink: "#F8E1E8",
  blush: "#FCEEF2",
  deepBerry: "#8E294D",
  ivory: "#FFF9F5",
  warmBeige: "#F6EFE8",
  textCharcoal: "#3B2A2A",
  mutedText: "#7A6868",
  borderLight: "#EEDCDA"
};

export const DEFAULT_DELIVERY_SLOTS = [
  { id: "morning", label: "Morning Slot (9:00 AM - 1:00 PM)", startTime: "09:00", endTime: "13:00", cutoffHour: 8, additionalFee: 0 },
  { id: "afternoon", label: "Afternoon Slot (1:00 PM - 5:00 PM)", startTime: "13:00", endTime: "17:00", cutoffHour: 12, additionalFee: 0 },
  { id: "evening", label: "Evening Slot (5:00 PM - 9:00 PM)", startTime: "17:00", endTime: "21:00", cutoffHour: 16, additionalFee: 0 },
  { id: "midnight", label: "Midnight Surprise (11:00 PM - 12:00 AM)", startTime: "23:00", endTime: "00:00", cutoffHour: 19, additionalFee: 249 }
];

export const ORDER_STATUSES = [
  "PENDING_PAYMENT",
  "PAYMENT_FAILED",
  "CONFIRMED",
  "PROCESSING",
  "PACKED",
  "DISPATCHED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "REFUND_REQUESTED",
  "REFUNDED"
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const VALID_ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING_PAYMENT: ["PAYMENT_FAILED", "CONFIRMED", "CANCELLED"],
  PAYMENT_FAILED: ["PENDING_PAYMENT", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["PACKED", "CANCELLED"],
  PACKED: ["DISPATCHED", "CANCELLED"],
  DISPATCHED: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "CANCELLED"],
  DELIVERED: ["REFUND_REQUESTED"],
  CANCELLED: ["REFUND_REQUESTED"],
  REFUND_REQUESTED: ["REFUNDED"],
  REFUNDED: []
};

export const SITE_NAVIGATION = [
  { label: "Bouquets", href: "/bouquets" },
  { label: "Flowers", href: "/flowers" },
  { label: "Hampers", href: "/hampers" },
  { label: "Personalized Gifts", href: "/personalized-gifts" },
  { label: "Birthday Gifts", href: "/birthday-gifts" },
  { label: "Anniversary Gifts", href: "/anniversary-gifts" },
  { label: "Wedding Flowers", href: "/wedding-flowers" },
  { label: "Corporate Gifting", href: "/corporate-gifts" },
  { label: "Bestsellers", href: "/bestsellers" },
  { label: "Blog", href: "/blog" },
  { label: "Track Order", href: "/track-order" }
];

export const PRICE_COLLECTIONS = [
  { label: "Gifts Under ₹599", href: "/under-599", maxPrice: 599 },
  { label: "Gifts Under ₹999", href: "/under-999", maxPrice: 999 },
  { label: "Gifts Under ₹1,499", href: "/under-1499", maxPrice: 1499 },
  { label: "Gifts Under ₹2,499", href: "/under-2499", maxPrice: 2499 },
  { label: "Premium Gifts", href: "/premium-gifts", minPrice: 2500 }
];
