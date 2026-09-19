import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPostDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  altText: string;
  author: string;
  category: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
  };
  faq: Array<{ question: string; answer: string }>;
  status: "DRAFT" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPostDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true },
    altText: { type: String, required: true },
    author: { type: String, default: "Bloom & Blossom Editorial" },
    category: { type: String, required: true, index: true },
    tags: [{ type: String, index: true }],
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      canonical: { type: String },
      ogImage: { type: String }
    },
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ],
    status: {
      type: String,
      enum: ["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"],
      default: "PUBLISHED",
      index: true
    },
    publishedAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

export const BlogPostModel =
  mongoose.models.BlogPost || mongoose.model<IBlogPostDocument>("BlogPost", BlogPostSchema);
