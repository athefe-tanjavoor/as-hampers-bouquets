import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "@repo/types";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  phone?: string;
  role: UserRole;
  addresses: Array<{
    name: string;
    phone: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault?: boolean;
  }>;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSubSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String },
    phone: { type: String, trim: true, index: true },
    role: {
      type: String,
      enum: ["CUSTOMER", "ADMIN", "CATALOG_MANAGER", "FULFILLMENT_STAFF"],
      default: "CUSTOMER",
      index: true
    },
    addresses: [AddressSubSchema],
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
