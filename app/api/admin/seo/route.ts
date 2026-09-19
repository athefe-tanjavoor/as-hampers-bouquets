import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { SEOPageModel } from "@/lib/db/models/SEOPage";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const pages = await SEOPageModel.find().sort({ path: 1 });
    return successResponse(pages);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const page = await SEOPageModel.create(body);
    return successResponse(page, {}, 201);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
