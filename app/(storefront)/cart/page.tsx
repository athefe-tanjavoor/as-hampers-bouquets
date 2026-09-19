"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, Sparkles, Tag, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";
import { BRAND_CONFIG } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    couponCode,
    setCouponCode,
    giftMessage,
    setGiftMessage
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(couponCode);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const freeDeliveryThreshold = BRAND_CONFIG.freeDeliveryThreshold;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : BRAND_CONFIG.standardDeliveryFee;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = inputCoupon.trim().toUpperCase();
    if (code === "WELCOME100" && subtotal >= 999) {
      setAppliedDiscount(100);
      setCouponCode(code);
      setCouponSuccess("WELCOME100 applied! ₹100 discount added.");
    } else if (code === "BLOOM10" && subtotal >= 1499) {
      const disc = Math.min(300, Math.round(subtotal * 0.1));
      setAppliedDiscount(disc);
      setCouponCode(code);
      setCouponSuccess(`BLOOM10 applied! ${formatCurrency(disc)} discount added.`);
    } else if (code === "FREEDEL") {
      setAppliedDiscount(deliveryFee);
      setCouponCode(code);
      setCouponSuccess("FREEDEL applied! Free delivery unlocked.");
    } else {
      setCouponError("Invalid coupon code or minimum cart value not met.");
    }
  };

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Your Cart", href: "/cart" }]} />

        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2A2A] mb-8">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-[#EEDCDA] shadow-sm space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FCEEF2] text-[#C94F78] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#3B2A2A]">
                Your cart is waiting for something beautiful.
              </h2>
              <p className="text-xs text-[#7A6868] max-w-sm mx-auto">
                Explore our handcrafted bouquets and curated gift hampers to celebrate someone special today.
              </p>
              <div className="pt-4">
                <Link
                  href="/bouquets"
                  className="px-8 py-3.5 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-semibold shadow-md transition-colors inline-block"
                >
                  Continue Shopping &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items Table */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm space-y-6">
                <div className="divide-y divide-[#EEDCDA]">
                  {items.map((item) => {
                    const price = item.salePrice && item.salePrice < item.price ? item.salePrice : item.price;
                    return (
                      <div key={`${item.productId}-${item.variantId || ""}`} className="py-5 flex gap-4 sm:gap-6 items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded-xl border border-[#EEDCDA] flex-shrink-0"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-serif text-base font-bold text-[#3B2A2A]">
                            {item.name}
                          </h3>
                          <div className="text-xs font-semibold text-[#8E294D]">
                            {formatCurrency(price)}
                          </div>
                          {item.personalizationText && (
                            <div className="text-[11px] text-[#7A6868] italic">
                              Message: &quot;{item.personalizationText}&quot;
                            </div>
                          )}

                          <div className="flex items-center gap-4 pt-2">
                            <div className="inline-flex items-center border border-[#EEDCDA] rounded-full bg-[#FFF9F5]">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                                className="p-1 px-2.5 text-[#7A6868] hover:text-[#3B2A2A] font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold text-[#3B2A2A] px-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                                className="p-1 px-2.5 text-[#7A6868] hover:text-[#3B2A2A] font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId, item.variantId)}
                              className="text-gray-400 hover:text-red-600 text-xs flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        <div className="font-serif text-sm font-bold text-[#3B2A2A] sm:text-base">
                          {formatCurrency(price * item.quantity)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Gift Message Box */}
                <div className="pt-6 border-t border-[#EEDCDA] space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A2A]">
                    Complimentary Gift Card Message:
                  </label>
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Write a warm heartfelt note to be handwritten or printed on our luxury gift card..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
              </div>

              {/* Order Summary & Coupon Box */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-[#EEDCDA] shadow-sm space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#3B2A2A]">
                    Order Summary
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#7A6868] divide-y divide-gray-100">
                    <div className="flex justify-between pt-1">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-[#3B2A2A]">{formatCurrency(subtotal)}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between pt-2 text-green-700">
                        <span>Coupon Discount:</span>
                        <span className="font-semibold">-{formatCurrency(appliedDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-2">
                      <span>Estimated Delivery:</span>
                      <span className="font-semibold text-[#3B2A2A]">
                        {deliveryFee === 0 ? <span className="text-green-700 uppercase font-bold text-[11px]">Free</span> : formatCurrency(deliveryFee)}
                      </span>
                    </div>

                    <div className="flex justify-between pt-3 text-sm font-bold text-[#3B2A2A]">
                      <span>Grand Total:</span>
                      <span className="font-serif text-xl text-[#8E294D]">{formatCurrency(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-[#EEDCDA] space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3B2A2A]">
                      Have a Coupon?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="WELCOME100 / BLOOM10"
                        className="flex-1 px-3 py-2 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs uppercase font-semibold focus:outline-none focus:border-[#C94F78]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#8E294D] text-white text-xs font-semibold hover:bg-[#C94F78] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                    {couponSuccess && <p className="text-[11px] text-green-700">{couponSuccess}</p>}
                  </form>

                  {/* Checkout Button */}
                  <div className="pt-2">
                    <Link
                      href="/checkout"
                      className="w-full py-3.5 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Trust text */}
                <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#EEDCDA] text-center text-xs text-[#7A6868] flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C94F78]" />
                  <span>Secure checkout • Clear pricing • Order updates</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
