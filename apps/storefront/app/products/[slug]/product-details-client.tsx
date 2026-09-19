"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Truck,
  Sparkles,
  Check,
  ShieldCheck,
  Clock,
  ChevronDown,
  Info
} from "lucide-react";
import { Product, ProductVariant } from "@repo/types";
import { formatCurrency, calculateDiscountPercentage } from "@repo/utils";
import { StarRating, Badge, Breadcrumbs } from "@repo/ui";
import { useCart } from "../../../lib/cart-context";
import { api } from "../../../lib/api";

interface ProductDetailsClientProps {
  product: Product;
  reviews: any[];
  relatedProducts: Product[];
}

export const ProductDetailsClient: React.FC<ProductDetailsClientProps> = ({
  product,
  reviews,
  relatedProducts
}) => {
  const router = useRouter();
  const { addItem, isWishlisted, toggleWishlist, openCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.url || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80"
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [personalizationText, setPersonalizationText] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<any>(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "included" | "care" | "delivery">("about");
  const [added, setAdded] = useState(false);

  const currentPrice = selectedVariant
    ? selectedVariant.salePrice || selectedVariant.price
    : product.salePrice && product.salePrice < product.price
    ? product.salePrice
    : product.price;

  const originalPrice = selectedVariant ? selectedVariant.price : product.price;
  const hasDiscount = originalPrice > currentPrice;
  const discountPercent = hasDiscount ? calculateDiscountPercentage(originalPrice, currentPrice) : 0;

  const handlePincodeCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput || pincodeInput.trim().length !== 6) return;
    setPincodeLoading(true);
    const res = await api.checkPincode(pincodeInput.trim());
    setPincodeLoading(false);
    setPincodeStatus(res);
  };

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      variantId: selectedVariant?._id || selectedVariant?.sku,
      name: selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name,
      sku: selectedVariant ? selectedVariant.sku : product.sku,
      price: originalPrice,
      salePrice: currentPrice,
      quantity,
      image: selectedImage,
      slug: product.slug,
      personalizationText: personalizationText.trim() || undefined
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          {
            label: typeof product.category === "object" ? product.category.name : "Catalog",
            href: typeof product.category === "object" ? `/${product.category.slug}` : "/bouquets"
          },
          { label: product.name }
        ]}
      />

      {/* Main Top Section: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-[#EEDCDA] shadow-md">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.bestseller && (
              <div className="absolute top-4 left-4">
                <Badge variant="berry">Bestseller</Badge>
              </div>
            )}
          </div>

          {/* Thumbnail list */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === img.url ? "border-[#C94F78] shadow-md" : "border-[#EEDCDA] opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Attributes & Buy Box */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C94F78]">
                {typeof product.category === "object" ? product.category.name : "Artisanal Flowers"}
              </span>
              <StarRating rating={product.ratingAverage || 5.0} reviewCount={product.reviewCount || 0} />
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#3B2A2A] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#7A6868] mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Price & Discounts */}
          <div className="p-4 rounded-2xl bg-white border border-[#EEDCDA] flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#3B2A2A]">
              {formatCurrency(currentPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-base text-gray-400 line-through">
                  {formatCurrency(originalPrice)}
                </span>
                <span className="text-xs font-bold text-[#C94F78] bg-[#FCEEF2] px-2 py-0.5 rounded-full">
                  {discountPercent}% OFF
                </span>
              </>
            )}
            <span className="ml-auto text-[11px] text-gray-400">Inclusive of all taxes</span>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3B2A2A]">
                Select Size / Style:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.sku === v.sku;
                  return (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "border-[#C94F78] bg-[#FCEEF2] text-[#8E294D] font-bold shadow-sm"
                          : "border-[#EEDCDA] bg-white text-[#3B2A2A] hover:bg-[#FFF9F5]"
                      }`}
                    >
                      <div className="text-xs">{v.name}</div>
                      <div className="text-xs font-semibold mt-1">
                        {formatCurrency(v.salePrice || v.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Personalization text input */}
          {product.personalization?.isAvailable && (
            <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#EEDCDA] space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#3B2A2A]">
                <span>{product.personalization.prompt || "Personalized Gift Message / Name"}</span>
                <span className="text-[10px] text-gray-400 font-normal">
                  {personalizationText.length} / {product.personalization.characterLimit || 100}
                </span>
              </div>
              <input
                type="text"
                maxLength={product.personalization.characterLimit || 100}
                value={personalizationText}
                onChange={(e) => setPersonalizationText(e.target.value)}
                placeholder={product.personalization.placeholder || "Enter custom text or greeting card message..."}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDCDA] text-xs text-[#3B2A2A] focus:outline-none focus:border-[#C94F78]"
              />
            </div>
          )}

          {/* Pincode & Express Delivery Checker */}
          <div className="p-4 rounded-2xl bg-white border border-[#EEDCDA] space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3B2A2A]">
              <Truck className="w-4 h-4 text-[#C94F78]" />
              <span>Check Delivery Availability & Express Slots</span>
            </label>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value)}
                placeholder="Enter 6-digit delivery pincode (e.g. 600001)"
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FFF9F5] border border-[#EEDCDA] text-xs text-[#3B2A2A] focus:outline-none focus:border-[#C94F78]"
              />
              <button
                type="submit"
                disabled={pincodeLoading}
                className="px-5 py-2.5 rounded-full bg-[#8E294D] text-white text-xs font-semibold hover:bg-[#C94F78] transition-colors"
              >
                {pincodeLoading ? "Checking..." : "Check"}
              </button>
            </form>

            {pincodeStatus && (
              <div className="pt-2 text-xs">
                {pincodeStatus.serviceable ? (
                  <div className="text-green-700 font-semibold space-y-1 bg-green-50 p-3 rounded-xl border border-green-200">
                    <div>✓ Delivery available in {pincodeStatus.city}, {pincodeStatus.state}</div>
                    {pincodeStatus.isSameDayAvailable && (
                      <div className="text-[#C94F78]">⚡ Same-day and midnight delivery slots available!</div>
                    )}
                  </div>
                ) : (
                  <div className="text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                    ✕ {pincodeStatus.message || "Pincode is unserviceable. Please check standard areas."}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity counter */}
              <div className="flex items-center border border-[#EEDCDA] rounded-full bg-white px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-gray-500 hover:text-black font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#3B2A2A]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-gray-500 hover:text-black font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-full text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all ${
                  added ? "bg-green-600 text-white" : "bg-[#C94F78] hover:bg-[#8E294D] text-white"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className={`p-3 rounded-full border border-[#EEDCDA] bg-white transition-colors ${
                  isWishlisted(product._id) ? "text-[#C94F78]" : "text-gray-400 hover:text-[#C94F78]"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted(product._id) ? "fill-[#C94F78]" : ""}`} />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-full bg-[#8E294D] hover:bg-[#3B2A2A] text-white text-xs font-bold shadow-md transition-colors text-center"
            >
              Buy Now with 1-Click
            </button>
          </div>
        </div>
      </div>

      {/* Tabs / Accordions: Product Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EEDCDA] shadow-sm space-y-8">
        <div className="flex border-b border-[#EEDCDA] gap-6 text-sm font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === "about" ? "border-[#C94F78] text-[#C94F78]" : "border-transparent text-[#7A6868]"
            }`}
          >
            About This Arrangement
          </button>
          <button
            onClick={() => setActiveTab("included")}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === "included" ? "border-[#C94F78] text-[#C94F78]" : "border-transparent text-[#7A6868]"
            }`}
          >
            What&apos;s Included
          </button>
          <button
            onClick={() => setActiveTab("care")}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === "care" ? "border-[#C94F78] text-[#C94F78]" : "border-transparent text-[#7A6868]"
            }`}
          >
            Care Instructions
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === "delivery" ? "border-[#C94F78] text-[#C94F78]" : "border-transparent text-[#7A6868]"
            }`}
          >
            Delivery Information
          </button>
        </div>

        <div className="text-xs sm:text-sm text-[#7A6868] leading-relaxed">
          {activeTab === "about" && (
            <div className="space-y-4">
              <p>{product.description}</p>
              {product.whyTheyllLoveIt && product.whyTheyllLoveIt.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-serif font-bold text-[#3B2A2A] text-base mb-2">Why They&apos;ll Love It:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.whyTheyllLoveIt.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "included" && (
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-[#3B2A2A] text-base">Package Specifications:</h4>
              {product.whatsIncluded && product.whatsIncluded.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {product.whatsIncluded.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>Includes fresh blooms hand-tied with signature craft wrap, protective water vial, and gift message card.</p>
              )}
            </div>
          )}

          {activeTab === "care" && (
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-[#3B2A2A] text-base">Florist Care Tips:</h4>
              <p>{product.careInstructions || "Trim stems diagonally by 1 inch before placing in clean, cool water. Keep in a shaded, cool corner away from direct sunlight."}</p>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-[#3B2A2A] text-base">Delivery Promises:</h4>
              <p>{product.deliveryInformation || "Delivered by hand in secure floral carry boxes to preserve shape and freshness throughout transit."}</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews for this Product */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EEDCDA] shadow-sm space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#3B2A2A]">
          Customer Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="text-xs text-[#7A6868]">Be the first to review this handcrafted arrangement!</p>
        ) : (
          <div className="divide-y divide-[#EEDCDA]">
            {reviews.map((rev: any) => (
              <div key={rev._id || rev.title} className="py-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <StarRating rating={rev.rating} showCount={false} />
                  <span className="text-[10px] text-gray-400">Verified Buyer</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#3B2A2A]">{rev.title}</h4>
                <p className="text-xs text-[#7A6868]">{rev.comment}</p>
                <div className="text-[11px] text-[#C94F78] font-medium">— {rev.customerName}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products / You May Also Like */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#3B2A2A]">
            Complete the Gift • You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <div key={p._id} className="bg-white rounded-2xl border border-[#EEDCDA] p-4 flex flex-col justify-between">
                <img src={p.images?.[0]?.url} alt={p.name} className="w-full aspect-square object-cover rounded-xl mb-3" />
                <h4 className="font-serif text-sm font-bold text-[#3B2A2A] line-clamp-1">{p.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-[#8E294D]">{formatCurrency(p.salePrice || p.price)}</span>
                  <button
                    onClick={() => router.push(`/products/${p.slug}`)}
                    className="text-[11px] font-semibold text-[#C94F78] hover:underline"
                  >
                    View Details &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EEDCDA] p-3 flex items-center justify-between z-40 lg:hidden shadow-2xl">
        <div>
          <div className="text-xs font-bold text-[#3B2A2A] line-clamp-1">{product.name}</div>
          <div className="font-serif text-sm font-bold text-[#C94F78]">{formatCurrency(currentPrice)}</div>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-2.5 rounded-full bg-[#C94F78] text-white text-xs font-bold shadow-md hover:bg-[#8E294D]"
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
