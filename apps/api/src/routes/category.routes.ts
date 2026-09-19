import { Router } from "express";
import { CategoryModel } from "../models/Category";
import { ProductModel } from "../models/Product";

const router = Router();

// GET all active categories
router.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find({ status: "ACTIVE" }).sort({ sortOrder: 1 });
    res.json({ success: true, data: categories });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET single category with products and SEO by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await CategoryModel.findOne({ slug, status: "ACTIVE" });
    if (!category) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Category not found" } });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 24;
    const skip = (page - 1) * limit;

    const query: any = { category: category._id, status: "ACTIVE" };

    if (req.query.priceMin || req.query.priceMax) {
      query.price = {};
      if (req.query.priceMin) query.price.$gte = Number(req.query.priceMin);
      if (req.query.priceMax) query.price.$lte = Number(req.query.priceMax);
    }

    if (req.query.occasion) {
      query.occasion = req.query.occasion;
    }

    let sort: any = { createdAt: -1 };
    if (req.query.sort === "price_asc") sort = { price: 1 };
    if (req.query.sort === "price_desc") sort = { price: -1 };
    if (req.query.sort === "rating") sort = { ratingAverage: -1 };
    if (req.query.sort === "bestseller") sort = { bestseller: -1, createdAt: -1 };

    const [products, total] = await Promise.all([
      ProductModel.find(query).sort(sort).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ]);

    // Related categories
    const relatedCategories = await CategoryModel.find({
      _id: { $ne: category._id },
      status: "ACTIVE"
    }).limit(6);

    res.json({
      success: true,
      data: {
        category,
        products,
        relatedCategories
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

export default router;
