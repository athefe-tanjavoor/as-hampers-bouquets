import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLogDocument extends Document {
  user?: mongoose.Types.ObjectId;
  action: string;
  module: string;
  recordId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLogDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    action: { type: String, required: true },
    module: { type: String, required: true, index: true },
    recordId: { type: String, required: true, index: true },
    oldValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLogModel =
  mongoose.models.AuditLog || mongoose.model<IAuditLogDocument>("AuditLog", AuditLogSchema);
