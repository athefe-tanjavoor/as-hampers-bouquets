import { ProductModel } from "../models/Product";
import { CouponModel } from "../models/Coupon";
import { BRAND_CONFIG } from "@/lib/config";

export interface CartItemInput {
  productId: string;
  variantId?: string;
  quantity: number;
  personalizationText?: string;
}

export interface PricingCalculationResult {
  items: Array<{
    productId: string;
    variantId?: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    itemTotal: number;
    image: string;
    personalizationText?: string;
  }>;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  couponApplied?: {
    code: string;
    discountAmount: number;
  };
}

export async function calculateCartPricing(
  itemsInput: CartItemInput[],
  couponCode?: string,
  deliveryCharge = BRAND_CONFIG.standardDeliveryFee
): Promise<PricingCalculationResult> {
  const verifiedItems: PricingCalculationResult["items"] = [];
  let subtotal = 0;

  for (const itemInput of itemsInput) {
    const product = await ProductModel.findById(itemInput.productId);
    if (!product || product.status !== "ACTIVE") {
      throw new Error(`Product not found or currently unavailable: ${itemInput.productId}`);
    }

    let unitPrice = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;
    let sku = product.sku;
    let name = product.name;
    let image = product.images?.[0]?.url || "/placeholder-flower.jpg";

    if (itemInput.variantId && product.variants?.length) {
      const variant = product.variants.find((v: any) => v._id?.toString() === itemInput.variantId || v.sku === itemInput.variantId);
      if (variant) {
        unitPrice = variant.salePrice && variant.salePrice < variant.price ? variant.salePrice : variant.price;
        sku = variant.sku;
        name = `${product.name} (${variant.name})`;
        if (variant.image) image = variant.image;
      }
    }

    const itemTotal = unitPrice * itemInput.quantity;
    subtotal += itemTotal;

    verifiedItems.push({
      productId: product._id.toString(),
      variantId: itemInput.variantId,
      name,
      sku,
      price: unitPrice,
      quantity: itemInput.quantity,
      itemTotal,
      image,
      personalizationText: itemInput.personalizationText
    });
  }

  let discount = 0;
  let finalDeliveryFee = subtotal >= BRAND_CONFIG.freeDeliveryThreshold ? 0 : deliveryCharge;
  let couponApplied: PricingCalculationResult["couponApplied"] = undefined;

  if (couponCode) {
    const coupon = await CouponModel.findOne({
      code: couponCode.trim().toUpperCase(),
      isActive: true,
      endDate: { $gte: new Date() }
    });

    if (coupon) {
      if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
        // Minimum order amount not satisfied
      } else {
        if (coupon.discountType === "PERCENTAGE") {
          let calculated = (subtotal * coupon.discountValue) / 100;
          if (coupon.maxDiscountAmount && calculated > coupon.maxDiscountAmount) {
            calculated = coupon.maxDiscountAmount;
          }
          discount = Math.round(calculated);
        } else if (coupon.discountType === "FIXED_AMOUNT") {
          discount = Math.min(coupon.discountValue, subtotal);
        } else if (coupon.discountType === "FREE_DELIVERY") {
          finalDeliveryFee = 0;
        }

        couponApplied = {
          code: coupon.code,
          discountAmount: discount
        };
      }
    }
  }

  const total = Math.max(0, subtotal - discount + finalDeliveryFee);

  return {
    items: verifiedItems,
    subtotal,
    discount,
    deliveryFee: finalDeliveryFee,
    tax: 0, // In India, prices are inclusive of GST for retail consumers
    total,
    couponApplied
  };
}
