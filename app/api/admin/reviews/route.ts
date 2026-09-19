import { connectDB } from "@/lib/db/connection";
import { ReviewModel } from "@/lib/db/models/Review";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const reviews = await ReviewModel.find().populate("product", "name slug").sort({ createdAt: -1 });
    return successResponse(reviews);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
