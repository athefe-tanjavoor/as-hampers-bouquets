import { connectDB } from "@/lib/db/connection";
import { SEOPageModel } from "@/lib/db/models/SEOPage";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const pages = await SEOPageModel.find({}, "path updatedAt");
    return successResponse(pages);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
