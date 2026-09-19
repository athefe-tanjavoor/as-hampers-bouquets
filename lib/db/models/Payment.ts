import mongoose, { Schema, Document } from "mongoose";

export interface IPaymentDocument extends Document {
  order: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  provider: "RAZORPAY" | "COD";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  status: "CREATED" | "SUCCESS" | "FAILED";
  rawPayload?: any;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPaymentDocument>(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    provider: { type: String, enum: ["RAZORPAY", "COD"], required: true },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String, index: true },
    razorpaySignature: { type: String },
    status: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED"],
      default: "CREATED",
      index: true
    },
    rawPayload: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const PaymentModel =
  mongoose.models.Payment || mongoose.model<IPaymentDocument>("Payment", PaymentSchema);
