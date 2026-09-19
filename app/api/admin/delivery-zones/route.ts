import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { DeliveryZoneModel } from "@/lib/db/models/DeliveryZone";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const zones = await DeliveryZoneModel.find().sort({ pincode: 1 });
    return successResponse(zones);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const zone = await DeliveryZoneModel.create(body);
    return successResponse(zone, {}, 201);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
