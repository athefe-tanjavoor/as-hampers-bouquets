import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { HomepageSectionModel } from "@/lib/db/models/HomepageSection";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const section = await HomepageSectionModel.findByIdAndUpdate(id, body, { new: true });
    if (!section) return errorResponse("Section not found", "NOT_FOUND", 404);
    return successResponse(section);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await HomepageSectionModel.findByIdAndDelete(id);
    return successResponse({ message: "Section deleted" });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
