"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Edit2, Trash2, Eye, Calendar, User, ExternalLink, CheckCircle } from "lucide-react";

interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  readTime: string;
  publishDate: string;
  status: "PUBLISHED" | "DRAFT";
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
}

const INITIAL_POSTS: AdminBlogPost[] = [
  {
    id: "post-1",
    title: "10 Proven Florist Secrets to Keep Fresh Bouquets Lasting 10+ Days",
    slug: "10-secrets-to-keep-fresh-bouquets-lasting",
    author: "Elena Vance (Master Florist)",
    category: "Flower Care & Guides",
    readTime: "6 min read",
    publishDate: "2026-09-14",
    status: "PUBLISHED",
    excerpt: "Learn how cold water, 45-degree angle stem cuts, and flower food transform the vase life of your roses and lilies.",
    content: "## The Secret of Water Temperature\nAlways use room-temperature water for cut flowers unless caring for spring bulbs like tulips...\n\n## Cutting Stems at 45-Degree Angles\nNever cut stems flat across. A 45-degree angled snip prevents stems from resting flat on the bottom of the vase...",
    metaTitle: "10 Proven Florist Secrets to Keep Fresh Bouquets Lasting 10+ Days",
    metaDescription: "Learn master florist tips to double the vase life of your cut bouquets. Simple stem trimming, water changing, and nourishment tricks."
  },
  {
    id: "post-2",
    title: "The Meaning of Rose Colors: How to Choose the Perfect Rose for Every Occasion",
    slug: "meaning-of-rose-colors-guide",
    author: "Aditi Rao",
    category: "Gifting Etiquette",
    readTime: "5 min read",
    publishDate: "2026-09-10",
    status: "PUBLISHED",
    excerpt: "From fiery crimson passion to gentle peach gratitude, discover what each rose hue speaks to your recipient.",
    content: "## Red Roses: Passion & Eternal Devotion\nThe classic scarlet rose remains the universal emblem of romantic devotion...\n\n## Yellow Roses: Joy & Friendship\nRadiant yellow represents sunshine, warmth, and enduring friendship...",
    metaTitle: "The Complete Guide to Rose Color Meanings | Bloom & Blossom",
    metaDescription: "Understand the cultural and romantic meanings behind red, pink, yellow, white, and peach roses before you gift."
  },
  {
    id: "post-3",
    title: "How to Build a Luxury Corporate Gift Hamper that Clients Remember",
    slug: "luxury-corporate-gift-hamper-guide",
    author: "Vikram Singhania",
    category: "Corporate Gifting",
    readTime: "7 min read",
    publishDate: "2026-09-05",
    status: "PUBLISHED",
    excerpt: "Why premium gourmet pairings, handcrafted packaging, and branded personalization make all the difference in B2B gifting.",
    content: "## Beyond Cheap Swag\nIn corporate gifting, items bearing generic plastic logos end up discarded. Curate artisan gourmet treats in wooden keepsake boxes instead...",
    metaTitle: "Corporate Gift Hampers Guide | Premium B2B Gifting Ideas",
    metaDescription: "Elevate your client relationships with bespoke corporate hampers. Best packaging, gourmet items, and bulk delivery tips."
  }
];

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<AdminBlogPost[]>(INITIAL_POSTS);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<AdminBlogPost | null>(null);

  const [formData, setFormData] = useState<AdminBlogPost>({
    id: "",
    title: "",
    slug: "",
    author: "Bloom & Blossom Editorial Team",
    category: "Flower Care & Guides",
    readTime: "5 min read",
    publishDate: new Date().toISOString().split("T")[0],
    status: "PUBLISHED",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: ""
  });

  const handleEdit = (post: AdminBlogPost) => {
    setSelectedPost(post);
    setFormData(JSON.parse(JSON.stringify(post)));
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setFormData({
      id: `post-${Date.now()}`,
      title: "",
      slug: "",
      author: "Bloom & Blossom Editorial Team",
      category: "Flower Care & Guides",
      readTime: "5 min read",
      publishDate: new Date().toISOString().split("T")[0],
      status: "PUBLISHED",
      excerpt: "",
      content: "",
      metaTitle: "",
      metaDescription: ""
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      setPosts([formData, ...posts]);
    } else {
      setPosts(posts.map((p) => (p.id === formData.id ? formData : p)));
    }
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this blog article?")) {
      setPosts(posts.filter((p) => p.id !== id));
      if (selectedPost?.id === id) {
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#3B2A2A]">Editorial Blog & CMS</h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish educational flower care guides, gifting etiquette journals, and boost search engine authority.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-[#C94F78] hover:bg-[#8E294D] text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Write Article
        </button>
      </div>

      {isEditing || isCreating ? (
        /* Edit / Create Form */
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-serif font-bold text-slate-900 text-lg">
              {isCreating ? "Write New Article" : `Editing: ${formData.title}`}
            </h2>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "PUBLISHED" | "DRAFT" })}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Article Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData({
                    ...formData,
                    title,
                    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                    metaTitle: `${title} | Bloom & Blossom`
                  });
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              >
                <option value="Flower Care & Guides">Flower Care & Guides</option>
                <option value="Gifting Etiquette">Gifting Etiquette</option>
                <option value="Corporate Gifting">Corporate Gifting</option>
                <option value="Seasonal Trends">Seasonal Trends</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Read Time</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Excerpt / Summary</label>
            <textarea
              rows={2}
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value, metaDescription: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Markdown Body Content</label>
            <textarea
              rows={8}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
            />
          </div>

          {/* SEO Metadata */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">SEO & Article Schema (JSON-LD)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Meta Title</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Meta Description</label>
                <input
                  type="text"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setIsCreating(false);
              }}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#C94F78] hover:bg-[#8E294D] text-white text-sm font-medium shadow-sm"
            >
              Save Article
            </button>
          </div>
        </form>
      ) : (
        /* Post List */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {posts.map((post) => (
              <div key={post.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-base">{post.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        post.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.publishDate}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span className="text-[#C94F78] font-medium">{post.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`http://localhost:3000/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                    title="View live post"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-slate-500 hover:text-[#C94F78] hover:bg-[#FCEEF2] rounded-lg"
                    title="Edit article"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
