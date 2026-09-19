import { MetadataRoute } from "next";
import { BRAND_CONFIG } from "@/lib/config";
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BRAND_CONFIG.baseUrl;

  // Static indexable routes
  const staticRoutes = [
    "",
    "/bouquets",
    "/flowers",
    "/hampers",
    "/personalized-gifts",
    "/birthday-gifts",
    "/anniversary-gifts",
    "/congratulations-gifts",
    "/thank-you-gifts",
    "/housewarming-gifts",
    "/wedding-flowers",
    "/corporate-gifts",
    "/under-599",
    "/under-999",
    "/under-1499",
    "/under-2499",
    "/bestsellers",
    "/premium-gifts",
    "/blog",
    "/about",
    "/contact",
    "/faq",
    "/delivery-information",
    "/shipping-policy",
    "/refund-cancellation",
    "/privacy-policy",
    "/terms-and-conditions"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));

  // Dynamic products
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await api.getProducts();
    productRoutes = products.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(p.updatedAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.9
    }));
  } catch (e) {}

  // Dynamic blog articles
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await api.getBlogPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }));
  } catch (e) {}

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
