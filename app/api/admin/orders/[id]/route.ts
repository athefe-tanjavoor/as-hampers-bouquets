import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { OrderModel } from "@/lib/db/models/Order";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const order = await OrderModel.findById(id).populate("items.product");
    if (!order) return errorResponse("Order not found", "NOT_FOUND", 404);
    return successResponse(order);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
