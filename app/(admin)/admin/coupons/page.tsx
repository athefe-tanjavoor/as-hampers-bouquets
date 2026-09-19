"use client";

import React, { useState } from "react";
import { TicketPercent, Plus, Edit2, Trash2, Calendar, Check, Copy } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface AdminCoupon {
  id: string;
  code: string;
  description: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageCount: number;
  usageLimit: number;
  validUntil: string;
  active: boolean;
}

const INITIAL_COUPONS: AdminCoupon[] = [
  {
    id: "cp-1",
    code: "FIRST10",
    description: "10% off for first-time floral shoppers",
    type: "PERCENTAGE",
    value: 10,
    minOrderValue: 599,
    maxDiscount: 200,
    usageCount: 142,
    usageLimit: 1000,
    validUntil: "2026-12-31",
    active: true
  },
  {
    id: "cp-2",
    code: "BLOOM15",
    description: "Special seasonal 15% discount on fresh flower bouquets",
    type: "PERCENTAGE",
    value: 15,
    minOrderValue: 999,
    maxDiscount: 350,
    usageCount: 88,
    usageLimit: 500,
    validUntil: "2026-10-31",
    active: true
  },
  {
    id: "cp-3",
    code: "FESTIVE200",
    description: "Flat ₹200 off on festive and corporate gift hampers",
    type: "FIXED",
    value: 200,
    minOrderValue: 1499,
    usageCount: 45,
    usageLimit: 200,
    validUntil: "2026-11-15",
    active: true
  },
  {
    id: "cp-4",
    code: "VALENTINE25",
    description: "Flash Valentine's romantic rose discount",
    type: "PERCENTAGE",
    value: 25,
    minOrderValue: 1999,
    maxDiscount: 500,
    usageCount: 200,
    usageLimit: 200,
    validUntil: "2026-02-15",
    active: false
  }
];

export default function CouponsAdminPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(INITIAL_COUPONS);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newCoupon, setNewCoupon] = useState<Omit<AdminCoupon, "id" | "usageCount">>({
    code: "",
    description: "",
    type: "PERCENTAGE",
    value: 10,
    minOrderValue: 599,
    maxDiscount: 200,
    usageLimit: 500,
    validUntil: "2026-12-31",
    active: true
  });

  const toggleStatus = (id: string) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const created: AdminCoupon = {
      ...newCoupon,
      id: `cp-${Date.now()}`,
      code: newCoupon.code.toUpperCase().trim(),
      usageCount: 0
    };
    setCoupons([created, ...coupons]);
    setIsCreating(false);
    setNewCoupon({
      code: "",
      description: "",
      type: "PERCENTAGE",
      value: 10,
      minOrderValue: 599,
      maxDiscount: 200,
      usageLimit: 500,
      validUntil: "2026-12-31",
      active: true
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this promotional coupon?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#3B2A2A]">Coupons & Promotions</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create discount codes, set cart threshold requirements, and track redemption limits.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 bg-[#C94F78] hover:bg-[#8E294D] text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {isCreating ? "Cancel" : "New Coupon"}
        </button>
      </div>

      {/* Creation Form */}
      {isCreating && (
        <form
          onSubmit={handleCreateCoupon}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6"
        >
          <h2 className="font-serif font-bold text-slate-900 text-lg">Create New Discount Coupon</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. WELCOME20"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Discount Type
              </label>
              <select
                value={newCoupon.type}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, type: e.target.value as "PERCENTAGE" | "FIXED" })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              >
                <option value="PERCENTAGE">Percentage (%) Off</option>
                <option value="FIXED">Flat Amount (₹) Off</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Discount Value
              </label>
              <input
                type="number"
                required
                min={1}
                value={newCoupon.value}
                onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Min. Order Amount (₹)
              </label>
              <input
                type="number"
                value={newCoupon.minOrderValue}
                onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Max Discount Cap (₹)
              </label>
              <input
                type="number"
                placeholder="Optional max cap"
                value={newCoupon.maxDiscount || ""}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, maxDiscount: e.target.value ? Number(e.target.value) : undefined })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Valid Until
              </label>
              <input
                type="date"
                required
                value={newCoupon.validUntil}
                onChange={(e) => setNewCoupon({ ...newCoupon, validUntil: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Description / Terms
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 15% discount for first 500 shoppers on flowers"
              value={newCoupon.description}
              onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C94F78]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#C94F78] hover:bg-[#8E294D] text-white text-sm font-medium shadow-sm"
            >
              Save & Activate Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between transition-all ${
              coupon.active ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => copyToClipboard(coupon.code)}
                  className="flex items-center gap-1.5 font-mono text-base font-bold text-[#8E294D] bg-[#F8E1E8] px-3 py-1 rounded-lg hover:bg-[#FCEEF2] transition-colors"
                >
                  <span>{coupon.code}</span>
                  {copiedCode === coupon.code ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </button>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    coupon.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {coupon.active ? "Active" : "Disabled"}
                </span>
              </div>

              <div className="text-xl font-bold font-serif text-slate-900 mb-1">
                {coupon.type === "PERCENTAGE" ? `${coupon.value}% OFF` : `FLAT ${formatCurrency(coupon.value)} OFF`}
              </div>
              <p className="text-xs text-slate-500 mb-4">{coupon.description}</p>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Min. Cart Value:</span>
                  <span className="font-medium">{formatCurrency(coupon.minOrderValue)}</span>
                </div>
                {coupon.maxDiscount && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Discount:</span>
                    <span className="font-medium">{formatCurrency(coupon.maxDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Redemptions:</span>
                  <span className="font-medium">
                    {coupon.usageCount} / {coupon.usageLimit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Valid Until:</span>
                  <span className="font-medium">{coupon.validUntil}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => toggleStatus(coupon.id)}
                className="text-xs font-semibold text-slate-700 hover:text-[#C94F78]"
              >
                {coupon.active ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => handleDelete(coupon.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
