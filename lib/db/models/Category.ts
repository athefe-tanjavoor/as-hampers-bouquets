import mongoose, { Schema, Document } from "mongoose";

export interface ICategoryDocument extends Document {
  name: string;
  slug: string;
  parent?: mongoose.Types.ObjectId;
  image?: string;
  banner?: string;
  intro?: string;
  content?: string;
  h1: string;
  sortOrder: number;
  featured: boolean;
  status: "ACTIVE" | "INACTIVE";
  seo: {
    title: string;
    description: string;
    canonical?: string;
    robots?: string;
    ogImage?: string;
  };
  faq: Array<{ question: string; answer: string }>;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    image: { type: String },
    banner: { type: String },
    intro: { type: String },
    content: { type: String },
    h1: { type: String, required: true },
    sortOrder: { type: Number, default: 0, index: true },
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE", index: true },
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      canonical: { type: String },
      robots: { type: String, default: "index, follow" },
      ogImage: { type: String }
    },
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export const CategoryModel =
  mongoose.models.Category || mongoose.model<ICategoryDocument>("Category", CategorySchema);
