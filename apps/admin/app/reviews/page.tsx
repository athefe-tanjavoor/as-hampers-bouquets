"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, XCircle, Trash2, ShieldCheck, Filter, MessageSquare } from "lucide-react";

interface AdminReview {
  id: string;
  customerName: string;
  productTitle: string;
  productSlug: string;
  rating: number;
  title: string;
  comment: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  verifiedBuyer: boolean;
  createdAt: string;
}

const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: "rev-1",
    customerName: "Priya Sundaram",
    productTitle: "Velvet Crimson 24-Rose Hand-Tied Luxury Bouquet",
    productSlug: "velvet-crimson-24-rose-hand-tied-luxury-bouquet",
    rating: 5,
    title: "Surpassed all expectations for our 10th anniversary!",
    comment: "The velvety deep red roses were intensely fresh, arranged with rich eucalyptus, and arrived promptly at 11:45 PM for our midnight surprise. Outstanding packaging!",
    status: "APPROVED",
    verifiedBuyer: true,
    createdAt: "2026-09-18"
  },
  {
    id: "rev-2",
    customerName: "Karthik Raja",
    productTitle: "Artisan Belgian Chocolate & Dry Fruit Festive Hamper",
    productSlug: "artisan-belgian-chocolate-dry-fruit-festive-hamper",
    rating: 5,
    title: "Perfect corporate festival gift box",
    comment: "We sent 35 of these hampers to our tier-1 clients across Chennai. The handmade pinewood box, brass latch, and premium Belgian truffles received rave compliments.",
    status: "APPROVED",
    verifiedBuyer: true,
    createdAt: "2026-09-16"
  },
  {
    id: "rev-3",
    customerName: "Ananya M.",
    productTitle: "Blush Lilies & Pastel Carnations Spring Bouquet",
    productSlug: "blush-lilies-pastel-carnations-spring-bouquet",
    rating: 4,
    title: "Very pretty and fragrant blooms",
    comment: "The lilies bloomed gracefully over 6 days. The delivery slot was 15 minutes later than promised due to rain, but the florals arrived pristine.",
    status: "PENDING",
    verifiedBuyer: true,
    createdAt: "2026-09-19"
  },
  {
    id: "rev-4",
    customerName: "Anonymous",
    productTitle: "Custom Engraved Walnut Wood Keepsake Box",
    productSlug: "custom-engraved-walnut-wood-keepsake-box",
    rating: 2,
    title: "Spelling had a lowercase typo in custom name",
    comment: "The wood was fine but the monogram had lowercase instead of uppercase. Customer support reached out quickly to send a replacement lid.",
    status: "PENDING",
    verifiedBuyer: false,
    createdAt: "2026-09-19"
  },
  {
    id: "rev-5",
    customerName: "Spammer101",
    productTitle: "Velvet Crimson 24-Rose Hand-Tied Luxury Bouquet",
    productSlug: "velvet-crimson-24-rose-hand-tied-luxury-bouquet",
    rating: 1,
    title: "Visit discount loans xyz",
    comment: "Visit http://spamlink.xyz for free loans and discounts today!",
    status: "REJECTED",
    verifiedBuyer: false,
    createdAt: "2026-09-15"
  }
];

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<AdminReview[]>(INITIAL_REVIEWS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const setStatus = (id: string, newStatus: "APPROVED" | "PENDING" | "REJECTED") => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete review permanently?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const filtered = reviews.filter((r) =>
    filterStatus === "ALL" ? true : r.status === filterStatus
  );

  const pendingCount = reviews.filter((r) => r.status === "PENDING").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#3B2A2A]">Product Reviews & Moderation</h1>
          <p className="text-sm text-slate-500 mt-1">
            Moderate customer testimonials, verify authentic buyers, and ensure high-integrity ratings for Google rich snippets.
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3.5 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            {pendingCount} Pending Moderation
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === tab
                ? "bg-[#C94F78] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab === "ALL" ? `All Reviews (${reviews.length})` : `${tab} (${reviews.filter((r) => r.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Reviews Queue */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
            No reviews match the selected filter.
          </div>
        ) : (
          filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3 transition-all hover:border-slate-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">{rev.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      rev.status === "APPROVED"
                        ? "bg-emerald-50 text-emerald-700"
                        : rev.status === "PENDING"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {rev.status}
                  </span>
                  <span className="text-xs text-slate-400">{rev.createdAt}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{rev.comment}</p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="font-medium text-slate-800">{rev.customerName}</span>
                  {rev.verifiedBuyer && (
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                  <span>on</span>
                  <span className="text-slate-700 font-medium italic truncate max-w-xs">
                    {rev.productTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {rev.status !== "APPROVED" && (
                    <button
                      onClick={() => setStatus(rev.id, "APPROVED")}
                      className="flex items-center gap-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {rev.status !== "REJECTED" && (
                    <button
                      onClick={() => setStatus(rev.id, "REJECTED")}
                      className="flex items-center gap-1 text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
