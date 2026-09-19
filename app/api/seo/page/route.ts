import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { SEOPageModel } from "@/lib/db/models/SEOPage";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path") || "/";

    const page = await SEOPageModel.findOne({ path });
    if (!page) {
      return errorResponse("SEO page record not found", "NOT_FOUND", 404);
    }

    return successResponse(page);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
