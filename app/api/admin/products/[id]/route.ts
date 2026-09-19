import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { ProductModel } from "@/lib/db/models/Product";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await ProductModel.findById(id).populate("category", "name slug");
    if (!product) return errorResponse("Product not found", "NOT_FOUND", 404);
    return successResponse(product);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const product = await ProductModel.findByIdAndUpdate(id, body, { new: true });
    if (!product) return errorResponse("Product not found", "NOT_FOUND", 404);
    return successResponse(product);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await ProductModel.findByIdAndDelete(id);
    return successResponse({ message: "Product deleted" });
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
