import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { checkPincodeServiceability } from "@/lib/db/services/delivery.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const pincode = searchParams.get("pincode");

    if (!pincode) {
      return errorResponse("Pincode is required", "BAD_REQUEST", 400);
    }

    const result = await checkPincodeServiceability(pincode);
    return successResponse(result);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
