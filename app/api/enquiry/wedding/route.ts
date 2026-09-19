import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { EnquiryModel } from "@/lib/db/models/Enquiry";
import { weddingEnquirySchema } from "@/lib/validation";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const parse = weddingEnquirySchema.safeParse(body);

    if (!parse.success) {
      return errorResponse("Invalid form input", "VALIDATION_FAILED", 400);
    }

    const { name, phone, email, eventDate, eventType, venueCity, budget, requirements } = parse.data;

    const enquiry = await EnquiryModel.create({
      type: "WEDDING",
      name,
      email,
      phone,
      eventDate,
      eventType,
      city: venueCity,
      budget,
      message: requirements
    });

    return successResponse(
      { id: enquiry._id },
      { message: "Thank you for reaching out. Our wedding floral team will connect with you to design your celebration." },
      201
    );
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
