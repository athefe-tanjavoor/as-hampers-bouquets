import { MetadataRoute } from "next";
import { BRAND_CONFIG } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/checkout",
          "/account",
          "/wishlist",
          "/admin",
          "/api",
          "/search*"
        ]
      }
    ],
    sitemap: `${BRAND_CONFIG.baseUrl}/sitemap.xml`
  };
}
