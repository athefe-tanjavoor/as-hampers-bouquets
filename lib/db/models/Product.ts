import mongoose, { Schema, Document } from "mongoose";

export interface IProductDocument extends Document {
  name: string;
  slug: string;
  sku: string;
  category: mongoose.Types.ObjectId;
  collections: mongoose.Types.ObjectId[];
  shortDescription: string;
  description: string;
  images: Array<{
    url: string;
    altText: string;
    isPrimary?: boolean;
  }>;
  price: number;
  salePrice?: number;
  stock: number;
  lowStockThreshold: number;
  variants: Array<{
    sku: string;
    name: string;
    price: number;
    salePrice?: number;
    stock: number;
    image?: string;
  }>;
  occasion: string[];
  recipient: string[];
  colour?: string;
  materials?: string;
  dimensions?: string;
  careInstructions?: string;
  deliveryInformation?: string;
  whatsIncluded: string[];
  whyTheyllLoveIt: string[];
  personalization: {
    isAvailable: boolean;
    prompt?: string;
    characterLimit?: number;
    placeholder?: string;
  };
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  ratingAverage: number;
  reviewCount: number;
  seo: {
    title: string;
    description: string;
    canonical?: string;
    robots?: string;
    ogImage?: string;
  };
  faq: Array<{ question: string; answer: string }>;
  relatedProducts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema({
  sku: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String }
});

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String, required: true },
        isPrimary: { type: Boolean, default: false }
      }
    ],
    price: { type: Number, required: true, min: 0, index: true },
    salePrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, default: 0, index: true },
    lowStockThreshold: { type: Number, default: 5 },
    variants: [ProductVariantSchema],
    occasion: [{ type: String, index: true }],
    recipient: [{ type: String, index: true }],
    colour: { type: String },
    materials: { type: String },
    dimensions: { type: String },
    careInstructions: { type: String },
    deliveryInformation: { type: String },
    whatsIncluded: [{ type: String }],
    whyTheyllLoveIt: [{ type: String }],
    personalization: {
      isAvailable: { type: Boolean, default: false },
      prompt: { type: String },
      characterLimit: { type: Number, default: 50 },
      placeholder: { type: String }
    },
    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "ARCHIVED"],
      default: "ACTIVE",
      index: true
    },
    featured: { type: Boolean, default: false, index: true },
    bestseller: { type: Boolean, default: false, index: true },
    newArrival: { type: Boolean, default: false, index: true },
    ratingAverage: { type: Number, default: 5.0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
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
    ],
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }]
  },
  { timestamps: true }
);

ProductSchema.index({ status: 1, category: 1, price: 1 });
ProductSchema.index({ status: 1, bestseller: 1 });
ProductSchema.index({ status: 1, featured: 1 });
ProductSchema.index({ status: 1, occasion: 1 });

export const ProductModel =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);
