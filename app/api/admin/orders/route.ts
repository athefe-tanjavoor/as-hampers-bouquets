import { connectDB } from "@/lib/db/connection";
import { OrderModel } from "@/lib/db/models/Order";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    return successResponse(orders);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
