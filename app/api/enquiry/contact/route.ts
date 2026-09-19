import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { EnquiryModel } from "@/lib/db/models/Enquiry";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return errorResponse("Name, email, and message are required", "BAD_REQUEST", 400);
    }

    const enquiry = await EnquiryModel.create({
      type: "CONTACT",
      name,
      email,
      phone: phone || "",
      message: `Subject: ${subject || "General Enquiry"} | Message: ${message}`
    });

    return successResponse(
      { id: enquiry._id },
      { message: "Thank you for contacting us. We will get back to you as soon as possible." },
      201
    );
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
