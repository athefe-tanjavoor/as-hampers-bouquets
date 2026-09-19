import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { EnquiryModel } from "@/lib/db/models/Enquiry";
import { corporateEnquirySchema } from "@/lib/validation";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const parse = corporateEnquirySchema.safeParse(body);

    if (!parse.success) {
      return errorResponse("Invalid form input", "VALIDATION_FAILED", 400);
    }

    const {
      company,
      contactPerson,
      email,
      phone,
      quantity,
      deliveryCity,
      requiredDate,
      occasion,
      budgetRange,
      customizationRequirements
    } = parse.data;

    const enquiry = await EnquiryModel.create({
      type: "CORPORATE",
      name: contactPerson,
      email,
      phone,
      company,
      quantity,
      city: deliveryCity,
      eventDate: requiredDate,
      budget: budgetRange,
      message: `Occasion: ${occasion} | Details: ${customizationRequirements}`
    });

    return successResponse(
      { id: enquiry._id },
      { message: "Thank you for your enquiry. Our corporate gifting specialist will get in touch with you shortly." },
      201
    );
  } catch (err: any) {
    return errorResponse(err.message);
  }
}
