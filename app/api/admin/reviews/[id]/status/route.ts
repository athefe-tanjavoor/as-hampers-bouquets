import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ReviewModel } from "@/lib/db/models/Review";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    const review = await ReviewModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!review) return errorResponse("Review not found", "NOT_FOUND", 404);
    return successResponse(review);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
