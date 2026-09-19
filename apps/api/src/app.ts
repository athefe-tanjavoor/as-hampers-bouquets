import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import configRoutes from "./routes/config.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import checkoutRoutes from "./routes/checkout.routes";
import deliveryRoutes from "./routes/delivery.routes";
import orderRoutes from "./routes/order.routes";
import homepageRoutes from "./routes/homepage.routes";
import blogRoutes from "./routes/blog.routes";
import enquiryRoutes from "./routes/enquiry.routes";
import reviewRoutes from "./routes/review.routes";
import seoRoutes from "./routes/seo.routes";
import adminRoutes from "./routes/admin.routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:3000",
      process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001"
    ],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Mount API v1 routes
app.use("/api/v1/config", configRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/delivery", deliveryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/homepage", homepageRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/enquiry", enquiryRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/seo", seoRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: `Route ${req.originalUrl} not found` } });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Internal Server Error:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: err.message || "An unexpected error occurred. Please try again."
    }
  });
});
