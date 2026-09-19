"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, Clock, CreditCard, Banknote, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";
import { BRAND_CONFIG, DEFAULT_DELIVERY_SLOTS } from "@/lib/config";
import { Breadcrumbs } from "@/lib/ui";
import { api } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, couponCode, giftMessage, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "Tanya Sharma",
    email: "tanya@example.com",
    phone: "9876543210",
    street: "Flat 4B, Floral Palms Residency, 1st Main Road",
    landmark: "Near Rose Garden",
    city: BRAND_CONFIG.primaryCity,
    state: "Tamil Nadu",
    pincode: "600001",
    deliveryDate: new Date().toISOString().slice(0, 10),
    deliverySlotId: "morning",
    paymentMethod: "RAZORPAY" as "RAZORPAY" | "COD"
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);

  const deliveryFee = subtotal >= BRAND_CONFIG.freeDeliveryThreshold ? 0 : BRAND_CONFIG.standardDeliveryFee;
  const grandTotal = Math.max(0, subtotal + deliveryFee);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        deliveryDate: formData.deliveryDate,
        deliverySlotId: formData.deliverySlotId,
        giftMessage: giftMessage || undefined,
        paymentMethod: formData.paymentMethod,
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
          personalizationText: i.personalizationText
        })),
        couponCode: couponCode || undefined
      };

      const result = await api.createOrder(payload);

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to create order");
      }

      const { order, razorpayOrder } = result.data;

      if (formData.paymentMethod === "RAZORPAY") {
        // Complete verification test simulation
        const verifyRes = await api.verifyRazorpay({
          orderId: order._id,
          razorpayOrderId: razorpayOrder.id,
          razorpayPaymentId: `pay_mock_${Date.now()}`,
          razorpaySignature: "test_verified_signature"
        });

        if (verifyRes.success) {
          clearCart();
          setOrderConfirmed({ ...order, orderStatus: "CONFIRMED", paymentStatus: "PAID" });
        } else {
          setErrorMessage(verifyRes.message || "Payment verification failed.");
        }
      } else {
        // COD order
        clearCart();
        setOrderConfirmed(order);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected checkout error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#EEDCDA] shadow-lg">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#C94F78] font-bold block">
            Order Confirmed
          </span>

          <h1 className="font-serif text-3xl font-bold text-[#3B2A2A]">
            Thank You for Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-[#7A6868] leading-relaxed">
            Your {BRAND_CONFIG.name} order <span className="font-bold text-[#8E294D] font-mono">#{orderConfirmed.orderNumber}</span> has been successfully placed. We will send delivery tracking updates to <span className="font-semibold text-[#3B2A2A]">{orderConfirmed.customerDetails?.email}</span>.
          </p>

          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#EEDCDA] text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Number:</span>
              <span className="font-bold font-mono">{orderConfirmed.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Slot:</span>
              <span className="font-semibold">{orderConfirmed.deliverySlot?.slotName} ({orderConfirmed.deliverySlot?.date})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status:</span>
              <span className="font-bold text-green-700">{orderConfirmed.paymentStatus}</span>
            </div>
            <div className="flex justify-between border-t border-[#EEDCDA] pt-2 text-sm font-bold">
              <span>Total Paid:</span>
              <span className="font-serif text-[#8E294D]">{formatCurrency(orderConfirmed.pricing?.total || grandTotal)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href={`/track-order?orderNumber=${orderConfirmed.orderNumber}&contact=${encodeURIComponent(orderConfirmed.customerDetails?.phone || "")}`}
              className="px-6 py-3 rounded-full bg-[#8E294D] hover:bg-[#C94F78] text-white text-xs font-semibold shadow-md transition-colors"
            >
              Track Your Order &rarr;
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-[#EEDCDA] bg-white text-[#3B2A2A] text-xs font-semibold hover:bg-[#FCEEF2] transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: "Cart", href: "/cart" },
            { label: "Secure Checkout" }
          ]}
        />

        <div className="flex items-center justify-between pb-4 border-b border-[#EEDCDA]">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2A2A]">
            Secure Checkout
          </h1>
          <div className="flex items-center text-xs text-[#7A6868] gap-1">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>256-Bit SSL Encryption</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Customer Contact */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#3B2A2A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8E294D] text-white text-xs flex items-center justify-center">1</span>
                <span>Customer Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#3B2A2A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8E294D] text-white text-xs flex items-center justify-center">2</span>
                <span>Delivery Address in {formData.city}</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Street Address, Flat / Villa No. *</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Landmark</label>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Date & Slot */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#3B2A2A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8E294D] text-white text-xs flex items-center justify-center">3</span>
                <span>Select Delivery Date & Time Slot</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Delivery Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B2A2A] mb-1">Available Delivery Slot *</label>
                  <select
                    value={formData.deliverySlotId}
                    onChange={(e) => setFormData({ ...formData, deliverySlotId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EEDCDA] bg-[#FFF9F5] text-xs focus:outline-none focus:border-[#C94F78]"
                  >
                    {DEFAULT_DELIVERY_SLOTS.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label} {slot.additionalFee > 0 && `(+${formatCurrency(slot.additionalFee)})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Payment Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#3B2A2A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#8E294D] text-white text-xs flex items-center justify-center">4</span>
                <span>Select Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "RAZORPAY" })}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === "RAZORPAY"
                      ? "border-[#C94F78] bg-[#FCEEF2]"
                      : "border-[#EEDCDA] bg-[#FFF9F5]"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C94F78]" />
                  <div>
                    <div className="text-xs font-bold text-[#3B2A2A]">Online Payment (Razorpay)</div>
                    <div className="text-[11px] text-gray-500">UPI, Cards, NetBanking, Wallets</div>
                  </div>
                </label>

                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "COD" })}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    formData.paymentMethod === "COD"
                      ? "border-[#C94F78] bg-[#FCEEF2]"
                      : "border-[#EEDCDA] bg-[#FFF9F5]"
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#8E294D]" />
                  <div>
                    <div className="text-xs font-bold text-[#3B2A2A]">Cash on Delivery (COD)</div>
                    <div className="text-[11px] text-gray-500">Pay when your order arrives</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EEDCDA] shadow-sm space-y-6 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-[#3B2A2A]">
              Order Summary ({items.length} items)
            </h3>

            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={`${i.productId}-${i.variantId}`} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={i.image} alt={i.name} className="w-10 h-12 object-cover rounded-md" />
                    <div>
                      <div className="font-semibold text-[#3B2A2A] line-clamp-1">{i.name}</div>
                      <div className="text-gray-400">Qty: {i.quantity}</div>
                    </div>
                  </div>
                  <span className="font-bold text-[#3B2A2A]">
                    {formatCurrency((i.salePrice || i.price) * i.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EEDCDA] space-y-2 text-xs text-[#7A6868]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-[#3B2A2A]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-semibold text-[#3B2A2A]">
                  {deliveryFee === 0 ? <span className="text-green-700 font-bold uppercase">Free</span> : formatCurrency(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#EEDCDA] pt-3 text-sm font-bold text-[#3B2A2A]">
                <span>Total Amount:</span>
                <span className="font-serif text-xl text-[#8E294D]">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#C94F78] hover:bg-[#8E294D] text-white text-xs font-bold shadow-lg transition-all tracking-wide uppercase flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Processing Order...</span>
              ) : (
                <span>Place Order • {formatCurrency(grandTotal)}</span>
              )}
            </button>

            <p className="text-[11px] text-gray-400 text-center leading-tight">
              By placing your order, you agree to our Terms & Conditions and Delivery Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
