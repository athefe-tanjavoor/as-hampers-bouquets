import mongoose, { Schema, Document } from "mongoose";
import { HomepageSectionType } from "@repo/types";

export interface IHomepageSectionDocument extends Document {
  sectionType: HomepageSectionType;
  title: string;
  heading?: string;
  subheading?: string;
  body?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  desktopImage?: string;
  mobileImage?: string;
  altText?: string;
  sortOrder: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  settings?: any;
  createdAt: Date;
  updatedAt: Date;
}

const HomepageSectionSchema = new Schema<IHomepageSectionDocument>(
  {
    sectionType: {
      type: String,
      required: true,
      enum: [
        "HERO",
        "CATEGORY_RAIL",
        "OCCASION_GRID",
        "PRODUCT_CAROUSEL",
        "BANNER",
        "PRICE_COLLECTION",
        "WEDDING_BANNER",
        "CORPORATE_BANNER",
        "TRUST_BLOCK",
        "VIDEO_RAIL",
        "REVIEWS",
        "BLOG_SECTION",
        "SEO_CONTENT"
      ],
      index: true
    },
    title: { type: String, required: true },
    heading: { type: String },
    subheading: { type: String },
    body: { type: String },
    ctaText: { type: String },
    ctaUrl: { type: String },
    ctaSecondaryText: { type: String },
    ctaSecondaryUrl: { type: String },
    desktopImage: { type: String },
    mobileImage: { type: String },
    altText: { type: String },
    sortOrder: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
    startDate: { type: Date },
    endDate: { type: Date },
    settings: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const HomepageSectionModel =
  mongoose.models.HomepageSection ||
  mongoose.model<IHomepageSectionDocument>("HomepageSection", HomepageSectionSchema);
