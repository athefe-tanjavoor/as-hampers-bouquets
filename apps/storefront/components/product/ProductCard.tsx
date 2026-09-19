"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@repo/types";
import { formatCurrency, calculateDiscountPercentage } from "@repo/utils";
import { StarRating, Badge } from "@repo/ui";
import { useCart } from "../../lib/cart-context";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, isWishlisted, toggleWishlist } = useCart();
  const [added, setAdded] = React.useState(false);

  const primaryImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80";
  const hoverImage = product.images?.[1]?.url || primaryImage;

  const currentPrice = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount ? calculateDiscountPercentage(product.price, product.salePrice!) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product._id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice,
      quantity: 1,
      image: primaryImage,
      slug: product.slug
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product._id);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-[#EEDCDA] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#C94F78]/50 transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] bg-[#FFF9F5] overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={primaryImage}
            alt={product.images?.[0]?.altText || product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.bestseller && (
            <Badge variant="berry">Bestseller</Badge>
          )}
          {hasDiscount && (
            <Badge variant="sale">{discountPercent}% OFF</Badge>
          )}
          {product.newArrival && (
            <Badge variant="pink">New</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white text-[#7A6868] hover:text-[#C94F78] transition-colors z-10"
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted(product._id) ? "fill-[#C94F78] text-[#C94F78]" : ""}`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category Pill / Tag */}
          <div className="flex items-center justify-between text-xs text-[#7A6868] mb-1.5">
            <span className="capitalize">
              {typeof product.category === "object" ? product.category.name : "Bouquet"}
            </span>
            <StarRating rating={product.ratingAverage || 5.0} reviewCount={product.reviewCount || 0} />
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-base font-bold text-[#3B2A2A] group-hover:text-[#C94F78] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#7A6868] line-clamp-2 mt-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-[#EEDCDA]/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-bold text-[#3B2A2A]">
                {formatCurrency(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              added
                ? "bg-green-600 text-white"
                : "bg-[#C94F78] hover:bg-[#8E294D] text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
