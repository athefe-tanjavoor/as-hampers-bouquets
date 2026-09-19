import { connectDB } from "@/lib/db/connection";
import { ReviewModel } from "@/lib/db/models/Review";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const reviews = await ReviewModel.find({ status: "APPROVED" })
      .populate("product", "name slug images")
      .sort({ createdAt: -1 })
      .limit(6);

    return successResponse(reviews);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
