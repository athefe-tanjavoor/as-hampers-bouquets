import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiryDocument extends Document {
  type: "CORPORATE" | "WEDDING" | "CONTACT";
  name: string;
  email: string;
  phone: string;
  company?: string;
  quantity?: string;
  eventDate?: string;
  eventType?: string;
  city?: string;
  budget?: string;
  message: string;
  status: "NEW" | "CONTACTED" | "RESOLVED" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiryDocument>(
  {
    type: { type: String, enum: ["CORPORATE", "WEDDING", "CONTACT"], required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    quantity: { type: String },
    eventDate: { type: String },
    eventType: { type: String },
    city: { type: String },
    budget: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["NEW", "CONTACTED", "RESOLVED", "ARCHIVED"], default: "NEW", index: true }
  },
  { timestamps: true }
);

export const EnquiryModel =
  mongoose.models.Enquiry || mongoose.model<IEnquiryDocument>("Enquiry", EnquirySchema);
