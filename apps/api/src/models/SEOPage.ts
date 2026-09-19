import mongoose, { Schema, Document } from "mongoose";

export interface ISEOPageDocument extends Document {
  path: string;
  h1: string;
  seo: {
    title: string;
    description: string;
    canonical?: string;
    robots?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    schemaJson?: string;
  };
  intro?: string;
  seoContent?: string;
  faq: Array<{ question: string; answer: string }>;
  internalLinks: Array<{ label: string; url: string }>;
  createdAt: Date;
  updatedAt: Date;
}

const SEOPageSchema = new Schema<ISEOPageDocument>(
  {
    path: { type: String, required: true, unique: true, index: true },
    h1: { type: String, required: true },
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      canonical: { type: String },
      robots: { type: String, default: "index, follow" },
      ogTitle: { type: String },
      ogDescription: { type: String },
      ogImage: { type: String },
      schemaJson: { type: String }
    },
    intro: { type: String },
    seoContent: { type: String },
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ],
    internalLinks: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export const SEOPageModel =
  mongoose.models.SEOPage || mongoose.model<ISEOPageDocument>("SEOPage", SEOPageSchema);
