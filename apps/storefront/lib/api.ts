import { BRAND_CONFIG } from "@repo/config";
import { Product, Category, HomepageSection, BlogPost, SEOPage } from "@repo/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      }
    });

    if (!res.ok) {
      console.warn(`API request error at ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn(`Network error fetching from ${endpoint}:`, err);
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
    const res = await fetch(`${API_BASE_URL}/checkout/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  verifyRazorpay: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/checkout/razorpay-verify`, {
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
    const res = await fetch(`${API_BASE_URL}/enquiry/corporate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  submitWeddingEnquiry: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/enquiry/wedding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  submitContact: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/enquiry/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  submitReview: async (payload: any) => {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
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
