import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { CategoryModel } from "@/lib/db/models/Category";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const category = await CategoryModel.findByIdAndUpdate(id, body, { new: true });
    if (!category) return errorResponse("Category not found", "NOT_FOUND", 404);
    return successResponse(category);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await CategoryModel.findByIdAndDelete(id);
    return successResponse({ message: "Category deleted" });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
