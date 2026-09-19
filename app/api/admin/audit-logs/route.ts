import { connectDB } from "@/lib/db/connection";
import { AuditLogModel } from "@/lib/db/models/AuditLog";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectDB();
    const logs = await AuditLogModel.find().sort({ createdAt: -1 }).limit(50);
    return successResponse(logs);
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
