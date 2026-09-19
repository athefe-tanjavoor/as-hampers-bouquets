import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { CouponModel } from "@/lib/db/models/Coupon";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const coupons = await CouponModel.find().sort({ createdAt: -1 });
    return successResponse(coupons);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const coupon = await CouponModel.create(body);
    return successResponse(coupon, {}, 201);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
