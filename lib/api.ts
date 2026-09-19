import { BRAND_CONFIG } from "@/lib/config";
import { Product, Category, HomepageSection, BlogPost, SEOPage } from "@/lib/types";

function getBaseUrl() {
  if (typeof window !== "undefined") return "/api";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`;
  if (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.startsWith("http")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
  }
  return "http://localhost:3000/api";
}

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      }
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch {
    // Graceful handling during SSG / build when local dev server isn't up
    return null;
  }
}

export const api = {
  getHomepageSections: async (): Promise<HomepageSection[]> => {
    const data = await fetcher<HomepageSection[]>("/homepage");
    return data || [];
  },

  getCategories: async (): Promise<Category[]> => {
    const data = await fetcher<Category[]>("/categories");
    return data || [];
  },

  getCategoryBySlug: async (slug: string, query = ""): Promise<{ category: Category; products: Product[]; relatedCategories: Category[] } | null> => {
    return await fetcher(`/categories/${slug}${query}`);
  },

  getProducts: async (query = ""): Promise<Product[]> => {
    const data = await fetcher<Product[]>(`/products${query}`);
    return data || [];
  },

  getProductBySlug: async (slug: string): Promise<{ product: Product; reviews: any[]; relatedProducts: Product[] } | null> => {
    return await fetcher(`/products/${slug}`);
  },

  search: async (q: string): Promise<{ products: Product[]; suggestions: string[] }> => {
    const data = await fetcher<{ products: Product[]; suggestions: string[] }>(`/products/search?q=${encodeURIComponent(q)}`);
    return data || { products: [], suggestions: [] };
  },

  checkPincode: async (pincode: string) => {
    return await fetcher(`/delivery/check-pincode?pincode=${pincode}`);
  },

  recalculatePricing: async (items: any[], couponCode?: string, deliveryCharge?: number) => {
    return await fetcher("/cart/recalculate", {
      method: "POST",
      body: JSON.stringify({ items, couponCode, deliveryCharge })
    });
  },

  createOrder: async (payload: any) => {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/checkout/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  verifyRazorpay: async (payload: any) => {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/checkout/razorpay-verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  trackOrder: async (orderNumber: string, contact: string) => {
    return await fetcher(`/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&contact=${encodeURIComponent(contact)}`);
  },

  getBlogPosts: async (query = ""): Promise<BlogPost[]> => {
    const data = await fetcher<BlogPost[]>(`/blog${query}`);
    return data || [];
  },

  getBlogPostBySlug: async (slug: string): Promise<{ post: BlogPost; relatedPosts: BlogPost[]; recommendedProducts: Product[] } | null> => {
    return await fetcher(`/blog/${slug}`);
  },

  submitCorporateEnquiry: async (payload: any) => {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/enquiry/corporate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  submitWeddingEnquiry: async (payload: any) => {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/enquiry/wedding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  submitContact: async (payload: any) => {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/enquiry/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  submitReview: async (payload: any) => {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  getSeoPage: async (path: string): Promise<SEOPage | null> => {
    return await fetcher<SEOPage>(`/seo/page?path=${encodeURIComponent(path)}`);
  }
};
