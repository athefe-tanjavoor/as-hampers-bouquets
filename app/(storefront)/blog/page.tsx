import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";
import { api } from "@/lib/api";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Gift Ideas, Flower Guides & Gifting Inspiration | ${BRAND_CONFIG.name}`,
  description: `Explore flower guides, gifting ideas, occasion inspiration, bouquet care tips and personalized gift ideas from ${BRAND_CONFIG.name}.`,
  alternates: {
    canonical: `https://${BRAND_CONFIG.domain}/blog`
  }
};

export default async function BlogPage() {
  const posts = await api.getBlogPosts();

  const blogCategories = ["All", "Gift Ideas", "Flower Guides", "Occasion Ideas", "Wedding", "Corporate Gifting", "Care Tips"];

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            The Floral Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3B2A2A]">
            Gift Ideas, Flower Guides & Inspiration
          </h1>
          <p className="text-xs sm:text-base text-[#7A6868] leading-relaxed">
            Discover ideas to help you choose better gifts, understand flowers, plan celebrations and make meaningful moments even more special.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
          {blogCategories.map((c) => (
            <span
              key={c}
              className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border transition-colors ${
                c === "All"
                  ? "bg-[#C94F78] text-white border-[#C94F78]"
                  : "bg-white text-[#3B2A2A] border-[#EEDCDA] hover:bg-[#FCEEF2]"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl overflow-hidden border border-[#EEDCDA] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#C94F78]">
                    {post.category}
                  </span>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3B2A2A] group-hover:text-[#C94F78] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-[#7A6868] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-[11px] text-[#7A6868] border-t border-gray-100 mt-4">
                <span>By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-[#C94F78] hover:underline flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
