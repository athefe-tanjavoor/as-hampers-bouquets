import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";
import { api } from "@/lib/api";
import { User, Calendar, Tag, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await api.getBlogPostBySlug(params.slug);
  if (!data || !data.post) {
    return { title: "Blog Article" };
  }
  const { post } = data;

  return {
    title: post.seo?.title || `${post.title} | ${BRAND_CONFIG.name}`,
    description: post.seo?.description || post.excerpt,
    alternates: {
      canonical: post.seo?.canonical || `https://${BRAND_CONFIG.domain}/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://${BRAND_CONFIG.domain}/blog/${post.slug}`,
      images: [{ url: post.featuredImage, alt: post.altText }]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const data = await api.getBlogPostBySlug(params.slug);
  if (!data || !data.post) {
    notFound();
  }

  const { post, relatedPosts, recommendedProducts } = data;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.featuredImage],
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": BRAND_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${BRAND_CONFIG.baseUrl}/logo.png`
      }
    },
    "description": post.excerpt
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title }
          ]}
        />

        {/* Article Header */}
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B2A2A] leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs text-[#7A6868] pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C94F78]" />
              {post.author}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-md border border-[#EEDCDA] aspect-[16/9]">
          <img src={post.featuredImage} alt={post.altText || post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEDCDA] shadow-sm space-y-6 text-sm sm:text-base text-[#3B2A2A] leading-relaxed">
          <div className="text-lg text-[#8E294D] font-serif italic border-l-4 border-[#C94F78] pl-4 py-1">
            {post.excerpt}
          </div>

          <div className="prose prose-pink max-w-none space-y-4">
            {post.content.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-serif text-2xl font-bold text-[#3B2A2A] pt-4">
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-8 p-6 rounded-2xl bg-[#FCEEF2] border border-[#F8E1E8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#8E294D]">Looking for the Perfect Gift?</h3>
              <p className="text-xs text-[#7A6868]">Explore our hand-tied fresh bouquets and curated gift hampers.</p>
            </div>
            <Link
              href="/bouquets"
              className="px-6 py-3 rounded-full bg-[#C94F78] text-white text-xs font-semibold hover:bg-[#8E294D] transition-colors whitespace-nowrap"
            >
              Shop Collection &rarr;
            </Link>
          </div>
        </article>

        {/* Recommended Products */}
        {recommendedProducts && recommendedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="font-serif text-2xl font-bold text-[#3B2A2A]">
              Recommended Products for This Guide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#EEDCDA]">
            <h3 className="font-serif text-2xl font-bold text-[#3B2A2A]">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="bg-white rounded-2xl p-4 border border-[#EEDCDA] shadow-sm hover:border-[#C94F78] transition-all block group"
                >
                  <img src={rp.featuredImage} alt={rp.title} className="w-full aspect-video object-cover rounded-xl mb-3" />
                  <h4 className="font-serif text-sm font-bold text-[#3B2A2A] group-hover:text-[#C94F78] transition-colors line-clamp-2">
                    {rp.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
