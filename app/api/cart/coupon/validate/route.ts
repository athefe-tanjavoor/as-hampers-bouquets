import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { CouponModel } from "@/lib/db/models/Coupon";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { code, subtotal } = body;

    if (!code) {
      return errorResponse("Coupon code required", "BAD_REQUEST", 400);
    }

    const coupon = await CouponModel.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
      endDate: { $gte: new Date() }
    });

    if (!coupon) {
      return errorResponse("Coupon is invalid or expired.", "INVALID_COUPON", 404);
    }

    if (coupon.minOrderAmount && (subtotal || 0) < coupon.minOrderAmount) {
      return errorResponse(
        `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon.`,
        "MIN_ORDER_UNMET",
        400
      );
    }

    return successResponse({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maxDiscountAmount: coupon.maxDiscountAmount
    });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
