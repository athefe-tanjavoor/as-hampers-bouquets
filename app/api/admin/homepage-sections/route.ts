import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { HomepageSectionModel } from "@/lib/db/models/HomepageSection";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const sections = await HomepageSectionModel.find().sort({ sortOrder: 1 });
    return successResponse(sections);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const section = await HomepageSectionModel.create(body);
    return successResponse(section, {}, 201);
  } catch (err: any) {
    return errorResponse(err.message, "BAD_REQUEST", 400);
  }
}
