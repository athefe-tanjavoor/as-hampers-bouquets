"use client";

import React, { useState } from "react";
import { FolderTree, Plus, Edit2, Trash2, Eye, HelpCircle, CheckCircle, Search, Layers } from "lucide-react";

interface CategoryFAQ {
  question: string;
  answer: string;
}

interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  productCount: number;
  featured: boolean;
  metaTitle: string;
  metaDescription: string;
  faqs: CategoryFAQ[];
}

const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: "cat-1",
    name: "Bouquets",
    slug: "bouquets",
    parent: null,
    productCount: 24,
    featured: true,
    metaTitle: "Fresh Flower Bouquets Online | Handcrafted Floral Arrangements",
    metaDescription: "Explore artisan flower bouquets online for birthdays, anniversaries, and special moments with same-day delivery.",
    faqs: [
      {
        question: "How long do freshly delivered flower bouquets last?",
        answer: "With fresh water changes every two days and stem trimming, our bouquets typically stay vibrant for 5 to 7 days."
      },
      {
        question: "Can I request specific flowers or color customizations?",
        answer: "Yes, you can leave custom requests during checkout or message our floral concierge via WhatsApp."
      }
    ]
  },
  {
    id: "cat-2",
    name: "Luxury Hampers",
    slug: "hampers",
    parent: null,
    productCount: 18,
    featured: true,
    metaTitle: "Curated Gift Hampers Online | Gourmet, Spa & Luxury Gifts",
    metaDescription: "Send curated luxury gift hampers packed with artisan chocolates, premium treats, and wellness essentials.",
    faqs: [
      {
        question: "Are gift hampers delivered pan-India?",
        answer: "Yes, non-perishable gift hampers ship pan-India within 2 to 4 business days."
      }
    ]
  },
  {
    id: "cat-3",
    name: "Personalized Gifts",
    slug: "personalized-gifts",
    parent: null,
    productCount: 15,
    featured: true,
    metaTitle: "Customized & Personalized Gifts Online | Bloom & Blossom",
    metaDescription: "Find customized gifts including photo frames, engraved keepsakes, and personalized chocolates.",
    faqs: [
      {
        question: "How do I upload custom photos or engravings?",
        answer: "You can enter your custom text and photo link directly on the product detail page before adding to cart."
      }
    ]
  },
  {
    id: "cat-4",
    name: "Exotic Flowers",
    slug: "flowers",
    parent: null,
    productCount: 20,
    featured: true,
    metaTitle: "Exotic Fresh Flowers Online | Lilies, Orchids & Roses",
    metaDescription: "Order premium cut flowers sourced directly from farm growers for daily elegance and celebration.",
    faqs: []
  },
  {
    id: "cat-5",
    name: "Birthday Specials",
    slug: "birthday-gifts",
    parent: "Bouquets",
    productCount: 16,
    featured: false,
    metaTitle: "Birthday Flowers & Gift Hampers Online | Bloom & Blossom",
    metaDescription: "Celebrate birthdays with joyful flower arrangements and surprise gift packages delivered same day.",
    faqs: []
  },
  {
    id: "cat-6",
    name: "Anniversary Collection",
    slug: "anniversary-gifts",
    parent: "Bouquets",
    productCount: 14,
    featured: false,
    metaTitle: "Romantic Anniversary Bouquets & Hampers | Bloom & Blossom",
    metaDescription: "Express your love with hand-tied red roses, champagne chocolates, and luxury anniversary gifts.",
    faqs: []
  }
];

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<AdminCategory[]>(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AdminCategory | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState<AdminCategory>({
    id: "",
    name: "",
    slug: "",
    parent: null,
    productCount: 0,
    featured: false,
    metaTitle: "",
    metaDescription: "",
    faqs: []
  });

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: AdminCategory) => {
    setSelectedCategory(category);
    setFormData(JSON.parse(JSON.stringify(category)));
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setFormData({
      id: `cat-${Date.now()}`,
      name: "",
      slug: "",
      parent: null,
      productCount: 0,
      featured: false,
      metaTitle: "",
      metaDescription: "",
      faqs: [{ question: "", answer: "" }]
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      setCategories([...categories, formData]);
    } else {
      setCategories(categories.map((c) => (c.id === formData.id ? formData : c)));
    }
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
      if (selectedCategory?.id === id) {
        setIsEditing(false);
      }
    }
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }]
    });
  };

  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...formData.faqs];
    updated[index][field] = value;
    setFormData({ ...formData, faqs: updated });
  };

  const handleRemoveFaq = (index: number) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#3B2A2A]">Categories & Taxonomy</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage category structure, SEO metadata, and SERP FAQ rich snippet entries.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-[#C94F78] hover:bg-[#8E294D] text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search categories by name or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {filtered.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FCEEF2] flex items-center justify-center text-[#C94F78]">
                      <FolderTree className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 text-sm">{cat.name}</span>
                        {cat.featured && (
                          <span className="bg-[#F8E1E8] text-[#8E294D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <code>/{cat.slug}</code>
                        <span>•</span>
                        <span>{cat.productCount} Products</span>
                        {cat.parent && (
                          <>
                            <span>•</span>
                            <span className="text-slate-400">Child of {cat.parent}</span>
                          </>
                        )}
                        {cat.faqs.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600 font-medium flex items-center gap-1">
                              <HelpCircle className="w-3 h-3" /> {cat.faqs.length} FAQs
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 text-slate-500 hover:text-[#C94F78] hover:bg-[#FCEEF2] rounded-lg transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-6">
          {isEditing || isCreating ? (
            <form
              onSubmit={handleSave}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="font-serif font-bold text-slate-900 text-lg">
                  {isCreating ? "New Category" : `Edit: ${formData.name}`}
                </h2>
                <span className="text-xs text-slate-400">Slug: /{formData.slug || "new"}</span>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({
                        ...formData,
                        name,
                        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Parent Category
                  </label>
                  <select
                    value={formData.parent || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, parent: e.target.value || null })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                  >
                    <option value="">None (Top Level)</option>
                    {categories
                      .filter((c) => c.id !== formData.id && !c.parent)
                      .map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-[#C94F78] focus:ring-[#C94F78]"
                    />
                    Feature on Homepage Rail
                  </label>
                </div>
              </div>

              {/* SEO Meta Fields */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  SEO & Search Engine Metadata
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Meta Title (Max 60 chars)
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Meta Description (Max 160 chars)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                  />
                </div>
              </div>

              {/* FAQs for Rich Snippets */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Category FAQs (JSON-LD FAQPage Schema)
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="text-xs font-medium text-[#C94F78] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add FAQ
                  </button>
                </div>

                {formData.faqs.map((faq, index) => (
                  <div key={index} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">FAQ #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(index)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Question..."
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                    />
                    <textarea
                      placeholder="Answer..."
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C94F78] hover:bg-[#8E294D] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 text-slate-400">
              <Layers className="w-12 h-12 mb-3 stroke-[1.5]" />
              <h3 className="font-semibold text-slate-700 mb-1">Select a Category</h3>
              <p className="text-xs max-w-xs">
                Click any category on the left to edit taxonomy details and SEO FAQ schemas, or click Add Category above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
