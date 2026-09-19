import mongoose, { Schema, Document } from "mongoose";

export interface IReviewDocument extends Document {
  product: mongoose.Types.ObjectId;
  customer?: mongoose.Types.ObjectId;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", default: null },
    customerName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
    images: [{ type: String }],
    isVerifiedPurchase: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "HIDDEN"],
      default: "PENDING",
      index: true
    }
  },
  { timestamps: true }
);

export const ReviewModel =
  mongoose.models.Review || mongoose.model<IReviewDocument>("Review", ReviewSchema);
