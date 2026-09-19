import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { transitionOrderStatus } from "@/lib/db/services/order.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const { status, note, changedBy } = body;

    const order = await transitionOrderStatus(id, status, changedBy || "ADMIN", note);
    return successResponse(order);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
