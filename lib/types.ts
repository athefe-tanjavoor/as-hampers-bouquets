import { OrderStatus } from "@/lib/config";

export type UserRole = "CUSTOMER" | "ADMIN" | "CATALOG_MANAGER" | "FULFILLMENT_STAFF";

export interface Address {
  _id?: string;
  name: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  addresses: Address[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  _id?: string;
  sku: string;
  name: string;
  price: number;
  salePrice?: number;
  stock: number;
  image?: string;
}

export interface ProductPersonalization {
  isAvailable: boolean;
  prompt?: string;
  characterLimit?: number;
  placeholder?: string;
  requireImageUpload?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schemaJson?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  category: string | Category;
  collections?: string[] | Collection[];
  shortDescription: string;
  description: string;
  images: ProductImage[];
  price: number;
  salePrice?: number;
  stock: number;
  lowStockThreshold: number;
  variants: ProductVariant[];
  occasion: string[];
  recipient: string[];
  colour?: string;
  materials?: string;
  dimensions?: string;
  careInstructions?: string;
  deliveryInformation?: string;
  whatsIncluded?: string[];
  whyTheyllLoveIt?: string[];
  personalization?: ProductPersonalization;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  ratingAverage: number;
  reviewCount: number;
  seo: SeoMetadata;
  faq: FaqItem[];
  relatedProducts?: string[] | Product[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent?: string | Category;
  image?: string;
  banner?: string;
  intro?: string;
  content?: string;
  h1: string;
  sortOrder: number;
  featured: boolean;
  status: "ACTIVE" | "INACTIVE";
  seo: SeoMetadata;
  faq: FaqItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  _id: string;
  name: string;
  slug: string;
  intro?: string;
  h1: string;
  banner?: string;
  content?: string;
  products: string[] | Product[];
  featured: boolean;
  seo: SeoMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image: string;
  slug: string;
  personalizationText?: string;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  giftMessage?: string;
  pincode?: string;
  deliverySlotId?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

export interface DeliverySlotOption {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  cutoffHour: number;
  additionalFee: number;
}

export interface DeliveryZone {
  _id?: string;
  pincode: string;
  city: string;
  state: string;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  isSameDayAvailable: boolean;
  cutoffTime: string;
  activeSlots: DeliverySlotOption[];
  isActive: boolean;
}

export interface OrderItem {
  product: string | Product;
  variantId?: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  personalizationText?: string;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  changedBy?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer?: string | User;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: Address;
  items: OrderItem[];
  giftMessage?: string;
  deliverySlot?: {
    date: string;
    slotId: string;
    slotName: string;
    fee: number;
  };
  pricing: {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    total: number;
  };
  couponApplied?: {
    code: string;
    discountAmount: number;
  };
  paymentMethod: "RAZORPAY" | "COD";
  paymentStatus: "PENDING" | "AUTHORIZED" | "PAID" | "FAILED" | "REFUNDED";
  orderStatus: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  cancellationReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_DELIVERY";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usageCount: number;
  perUserLimit?: number;
  applicableCategories?: string[];
  applicableProducts?: string[];
  excludedProducts?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  product: string | Product;
  customer?: string | User;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  createdAt: string;
  updatedAt: string;
}

export type HomepageSectionType =
  | "HERO"
  | "CATEGORY_RAIL"
  | "OCCASION_GRID"
  | "PRODUCT_CAROUSEL"
  | "BANNER"
  | "PRICE_COLLECTION"
  | "WEDDING_BANNER"
  | "CORPORATE_BANNER"
  | "TRUST_BLOCK"
  | "VIDEO_RAIL"
  | "REVIEWS"
  | "BLOG_SECTION"
  | "SEO_CONTENT";

export interface HomepageSection {
  _id: string;
  sectionType: HomepageSectionType;
  title: string;
  heading?: string;
  subheading?: string;
  body?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  desktopImage?: string;
  mobileImage?: string;
  altText?: string;
  sortOrder: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  settings?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  altText: string;
  author: string;
  category: string;
  tags: string[];
  seo: SeoMetadata;
  faq?: FaqItem[];
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SEOPage {
  _id: string;
  path: string;
  h1: string;
  seo: SeoMetadata;
  intro?: string;
  seoContent?: string;
  faq?: FaqItem[];
  internalLinks?: { label: string; url: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Redirect {
  _id: string;
  fromPath: string;
  toPath: string;
  statusCode: 301 | 302;
  isActive: boolean;
}

export interface AuditLog {
  _id: string;
  user?: string | User;
  action: string;
  module: string;
  recordId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
