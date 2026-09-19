import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User";
import { ProductModel } from "../models/Product";
import { CategoryModel } from "../models/Category";
import { OrderModel } from "../models/Order";
import { DeliveryZoneModel } from "../models/DeliveryZone";
import { CouponModel } from "../models/Coupon";
import { ReviewModel } from "../models/Review";
import { HomepageSectionModel } from "../models/HomepageSection";
import { BlogPostModel } from "../models/BlogPost";
import { SEOPageModel } from "../models/SEOPage";
import { AuditLogModel } from "../models/AuditLog";
import { transitionOrderStatus } from "../services/order.service";
import { authenticate, authorizeRoles, AuthenticatedRequest } from "../middleware/auth.middleware";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_bloom_blossom_2026_production";

// Admin Authentication Login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: { message: "Email and password are required" } });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.role === "CUSTOMER") {
      return res.status(401).json({ success: false, error: { message: "Invalid credentials or unauthorized" } });
    }

    // Check password (supports default seeded admin or hashed passwords)
    const isMatch = user.passwordHash
      ? await bcrypt.compare(password, user.passwordHash)
      : password === "Admin@123456";

    if (!isMatch) {
      return res.status(401).json({ success: false, error: { message: "Invalid credentials" } });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

// Dashboard Metrics
router.get("/dashboard/metrics", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      todayOrders,
      pendingOrders,
      processingOrders,
      outForDeliveryOrders,
      deliveredOrders,
      revenueResult,
      lowStockProducts,
      recentOrders
    ] = await Promise.all([
      OrderModel.countDocuments(),
      OrderModel.countDocuments({ createdAt: { $gte: today } }),
      OrderModel.countDocuments({ orderStatus: "PENDING_PAYMENT" }),
      OrderModel.countDocuments({ orderStatus: { $in: ["CONFIRMED", "PROCESSING", "PACKED"] } }),
      OrderModel.countDocuments({ orderStatus: { $in: ["DISPATCHED", "OUT_FOR_DELIVERY"] } }),
      OrderModel.countDocuments({ orderStatus: "DELIVERED" }),
      OrderModel.aggregate([
        { $match: { paymentStatus: "PAID" } },
        { $group: { _id: null, totalRevenue: { $sum: "$pricing.total" } } }
      ]),
      ProductModel.find({ stock: { $lte: 5 }, status: "ACTIVE" }).select("name stock price sku images"),
      OrderModel.find().sort({ createdAt: -1 }).limit(8)
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.json({
      success: true,
      data: {
        metrics: {
          totalRevenue,
          totalOrders,
          todayOrders,
          pendingOrders,
          processingOrders,
          outForDeliveryOrders,
          deliveredOrders,
          lowStockCount: lowStockProducts.length
        },
        lowStockProducts,
        recentOrders
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

// Products Admin CRUD
router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category", "name slug").sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.post("/products", async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: product });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

// Categories Admin CRUD
router.get("/categories", async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ sortOrder: 1 });
    res.json({ success: true, data: categories });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

router.put("/categories/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: category });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

// Orders Admin List & Status Transition
router.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ success: false, error: { message: "Order not found" } });
    res.json({ success: true, data: order });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.patch("/orders/:id/status", async (req, res) => {
  try {
    const { status, note, changedBy } = req.body;
    const order = await transitionOrderStatus(req.params.id, status, changedBy || "ADMIN", note);
    res.json({ success: true, data: order });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

// Delivery Zones Admin CRUD
router.get("/delivery-zones", async (req, res) => {
  try {
    const zones = await DeliveryZoneModel.find().sort({ pincode: 1 });
    res.json({ success: true, data: zones });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.post("/delivery-zones", async (req, res) => {
  try {
    const zone = await DeliveryZoneModel.create(req.body);
    res.status(201).json({ success: true, data: zone });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

router.put("/delivery-zones/:id", async (req, res) => {
  try {
    const zone = await DeliveryZoneModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: zone });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

// Coupons Admin CRUD
router.get("/coupons", async (req, res) => {
  try {
    const coupons = await CouponModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.post("/coupons", async (req, res) => {
  try {
    const coupon = await CouponModel.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

// Reviews Admin Moderation
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await ReviewModel.find().populate("product", "name slug").sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.patch("/reviews/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const review = await ReviewModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

// Homepage Sections Admin CRUD
router.get("/homepage-sections", async (req, res) => {
  try {
    const sections = await HomepageSectionModel.find().sort({ sortOrder: 1 });
    res.json({ success: true, data: sections });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.put("/homepage-sections/:id", async (req, res) => {
  try {
    const section = await HomepageSectionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: section });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

// SEO Pages Admin CRUD
router.get("/seo", async (req, res) => {
  try {
    const pages = await SEOPageModel.find().sort({ path: 1 });
    res.json({ success: true, data: pages });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.put("/seo/:id", async (req, res) => {
  try {
    const page = await SEOPageModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: page });
  } catch (err: any) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

// Audit Logs
router.get("/audit-logs", async (req, res) => {
  try {
    const logs = await AuditLogModel.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
