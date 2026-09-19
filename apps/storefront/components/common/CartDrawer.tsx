"use client";

import React from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "../../lib/cart-context";
import { formatCurrency } from "@repo/utils";
import { BRAND_CONFIG } from "@repo/config";

export const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, isCartDrawerOpen, closeCart, subtotal, cartCount } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = BRAND_CONFIG.freeDeliveryThreshold;
  const progressToFreeDelivery = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountRemaining = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCart} />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EEDCDA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C94F78]" />
            <h2 className="font-serif text-lg font-bold text-[#3B2A2A]">
              Your Cart ({cartCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-gray-400 hover:text-[#3B2A2A] rounded-full hover:bg-[#FFF9F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#FCEEF2] px-4 py-3 border-b border-[#F8E1E8]">
          <div className="flex items-center justify-between text-xs font-medium text-[#8E294D] mb-1.5">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C94F78]" />
              {amountRemaining === 0 ? "You've unlocked FREE Delivery!" : `Add ${formatCurrency(amountRemaining)} more for FREE Delivery!`}
            </span>
            <span>{progressToFreeDelivery}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#C94F78] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeDelivery}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#EEDCDA]">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FCEEF2] flex items-center justify-center text-[#C94F78]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#3B2A2A] mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-[#7A6868] max-w-xs mx-auto mb-6">
                Explore our handcrafted bouquets and curated gift hampers to make someone smile today.
              </p>
              <button
                onClick={closeCart}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#C94F78] text-white text-xs font-semibold hover:bg-[#8E294D] transition-colors"
              >
                Start Shopping &rarr;
              </button>
            </div>
          ) : (
            items.map((item) => {
              const currentPrice = item.salePrice && item.salePrice < item.price ? item.salePrice : item.price;
              return (
                <div key={`${item.productId}-${item.variantId || ""}`} className="py-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg border border-[#EEDCDA] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-[#3B2A2A] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs font-bold text-[#8E294D] mt-1">
                        {formatCurrency(currentPrice)}
                      </div>
                      {item.personalizationText && (
                        <div className="text-[11px] text-[#7A6868] italic mt-0.5 line-clamp-1">
                          Personalization: &quot;{item.personalizationText}&quot;
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-[#EEDCDA] rounded-full bg-[#FFF9F5]">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-1 px-2 text-[#7A6868] hover:text-[#3B2A2A]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#3B2A2A] px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="p-1 px-2 text-[#7A6868] hover:text-[#3B2A2A]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-xs font-semibold text-[#3B2A2A]">
                        {formatCurrency(currentPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-[#EEDCDA] bg-[#FFF9F5] space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#7A6868]">Subtotal:</span>
              <span className="font-bold text-[#3B2A2A] text-lg font-serif">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-[#7A6868]">
              Taxes and delivery fee calculated during checkout.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full py-3 text-center border border-[#C94F78] text-[#C94F78] text-xs font-bold rounded-full hover:bg-[#FCEEF2] transition-colors"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 text-center bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
