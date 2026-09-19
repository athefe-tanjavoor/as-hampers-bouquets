import React from "react";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";

export interface BadgeProps {
  variant?: "pink" | "soft" | "berry" | "sale" | "green" | "gold";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = "pink", children, className = "" }) => {
  const variantStyles = {
    pink: "bg-[#FCEEF2] text-[#C94F78] border-[#F8E1E8]",
    soft: "bg-[#FFF9F5] text-[#8E294D] border-[#F6EFE8]",
    berry: "bg-[#8E294D] text-white border-[#8E294D]",
    sale: "bg-[#FFE8E8] text-[#D32F2F] border-[#FFCDD2]",
    green: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]",
    gold: "bg-[#FFF8E1] text-[#F57F17] border-[#FFECB3]"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, size = "sm", showCount = true }) => {
  const stars = [1, 2, 3, 4, 5];
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5 stars`}>
      <div className="flex items-center text-[#F59E0B]">
        {stars.map((star) => (
          <svg
            key={star}
            className={`${starSize} ${star <= Math.round(rating) ? "fill-current" : "text-gray-300 fill-current"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-[#7A6868] font-medium">
          {rating.toFixed(1)} {reviewCount !== undefined && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
};

export interface PriceDisplayProps {
  price: number;
  salePrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, salePrice, size = "md", className = "" }) => {
  const currentPrice = salePrice && salePrice < price ? salePrice : price;
  const hasDiscount = salePrice && salePrice < price;
  const discountPercent = hasDiscount ? calculateDiscountPercentage(price, salePrice) : 0;

  const sizeClasses = {
    sm: "text-sm font-semibold",
    md: "text-base font-bold",
    lg: "text-xl font-bold",
    xl: "text-2xl md:text-3xl font-bold"
  };

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`${sizeClasses[size]} text-[#3B2A2A] tracking-tight`}>
        {formatCurrency(currentPrice)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-xs md:text-sm text-gray-400 line-through">
            {formatCurrency(price)}
          </span>
          <span className="text-xs font-semibold text-[#C94F78]">
            ({discountPercent}% OFF)
          </span>
        </>
      )}
    </div>
  );
};

export interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs md:text-sm text-[#7A6868]">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <a href="/" className="hover:text-[#C94F78] transition-colors">
            Home
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <span className="text-gray-400">/</span>
            {item.href && index < items.length - 1 ? (
              <a href={item.href} className="hover:text-[#C94F78] transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-[#3B2A2A] font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
