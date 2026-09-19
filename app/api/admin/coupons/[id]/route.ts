import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { CouponModel } from "@/lib/db/models/Coupon";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const coupon = await CouponModel.findByIdAndUpdate(id, body, { new: true });
    if (!coupon) return errorResponse("Coupon not found", "NOT_FOUND", 404);
    return successResponse(coupon);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await CouponModel.findByIdAndDelete(id);
    return successResponse({ message: "Coupon deleted" });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
