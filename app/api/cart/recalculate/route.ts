import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { calculateCartPricing } from "@/lib/db/services/pricing.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { items, couponCode, deliveryCharge } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return successResponse({
        items: [],
        subtotal: 0,
        discount: 0,
        deliveryFee: 0,
        tax: 0,
        total: 0
      });
    }

    const pricing = await calculateCartPricing(items, couponCode, deliveryCharge);
    return successResponse(pricing);
  } catch (err: any) {
    return errorResponse(err.message, "PRICING_ERROR", 400);
  }
}
