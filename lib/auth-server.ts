import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { UserRole } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_bloom_blossom_2026_production";

export interface DecodedUser {
  id: string;
  email: string;
  role: UserRole;
}

export function getUserFromRequest(req: NextRequest): DecodedUser | null {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as DecodedUser;
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest, allowedRoles?: UserRole[]): { user?: DecodedUser; errorResponse?: { message: string; code: string; status: number } } {
  const user = getUserFromRequest(req);
  if (!user) {
    return { errorResponse: { message: "Authentication required", code: "UNAUTHORIZED", status: 401 } };
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return { errorResponse: { message: "You do not have permission to perform this action", code: "FORBIDDEN", status: 403 } };
  }

  return { user };
}
