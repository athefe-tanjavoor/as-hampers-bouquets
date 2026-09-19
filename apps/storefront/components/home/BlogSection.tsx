import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { BlogPost } from "@repo/types";

interface BlogSectionProps {
  posts?: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const defaultPosts = [
    {
      title: "Best Birthday Gifts to Make Someone Feel Special",
      slug: "best-birthday-gifts",
      excerpt: "Discover thoughtful birthday gift ideas combining fresh floral arrangements, personalized keepsakes, and gourmet hampers.",
      featuredImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      author: "Editorial Team",
      category: "Gift Ideas",
      publishedAt: "September 2026"
    },
    {
      title: "How to Choose the Right Flowers for an Anniversary",
      slug: "anniversary-flowers-guide",
      excerpt: "Celebrate your love story with the right floral symbolism. A complete guide to anniversary flower arrangements.",
      featuredImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      author: "Floral Stylist",
      category: "Flower Guides",
      publishedAt: "September 2026"
    },
    {
      title: "How to Keep Fresh Flowers Beautiful for Longer",
      slug: "how-to-care-for-fresh-flowers",
      excerpt: "Simple florist secrets to extend your bouquet's vase life for up to 7 to 10 days.",
      featuredImage: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
      author: "Care Specialist",
      category: "Care Tips",
      publishedAt: "September 2026"
    }
  ];

  const displayPosts = posts && posts.length > 0 ? posts : defaultPosts;

  return (
    <section className="py-16 bg-[#FFF9F5] border-b border-[#EEDCDA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block mb-1">
              From Our Journal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
              Gift Ideas, Flower Guides & Inspiration
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6868] mt-1.5 max-w-xl">
              Discover thoughtful gifting ideas, flower meanings, care tips, celebration inspiration and practical guides.
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-[#C94F78] hover:text-[#8E294D] transition-colors group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.slice(0, 3).map((post: any) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-[#EEDCDA] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#C94F78] mb-2 block">
                    {post.category}
                  </span>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-serif text-lg font-bold text-[#3B2A2A] group-hover:text-[#C94F78] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#7A6868] line-clamp-2 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-[#C94F78]" />
                  {post.author}
                </span>
                <span className="font-semibold text-[#C94F78] group-hover:underline">
                  Read Article &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
