import { connectDB } from "@/lib/db/connection";
import { HomepageSectionModel } from "@/lib/db/models/HomepageSection";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const sections = await HomepageSectionModel.find({ isActive: true }).sort({ sortOrder: 1 });
    return successResponse(sections);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
