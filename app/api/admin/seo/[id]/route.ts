import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { SEOPageModel } from "@/lib/db/models/SEOPage";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const page = await SEOPageModel.findByIdAndUpdate(id, body, { new: true });
    if (!page) return errorResponse("SEO page record not found", "NOT_FOUND", 404);
    return successResponse(page);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await SEOPageModel.findByIdAndDelete(id);
    return successResponse({ message: "SEO page record deleted" });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
