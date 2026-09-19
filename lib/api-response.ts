import { NextResponse } from "next/server";

export function successResponse(data: any, extra: Record<string, any> = {}, status = 200) {
  return NextResponse.json({ success: true, data, ...extra }, { status });
}

export function errorResponse(message: string, code = "SERVER_ERROR", status = 500) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}
