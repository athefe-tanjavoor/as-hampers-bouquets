import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { DeliveryZoneModel } from "@/lib/db/models/DeliveryZone";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const zone = await DeliveryZoneModel.findByIdAndUpdate(id, body, { new: true });
    if (!zone) return errorResponse("Delivery zone not found", "NOT_FOUND", 404);
    return successResponse(zone);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await DeliveryZoneModel.findByIdAndDelete(id);
    return successResponse({ message: "Delivery zone deleted" });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
