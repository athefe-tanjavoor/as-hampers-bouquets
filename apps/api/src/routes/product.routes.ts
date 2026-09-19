import { Router } from "express";
import { ProductModel } from "../models/Product";
import { ReviewModel } from "../models/Review";

const router = Router();

// GET all products with filtering & sorting
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 24;
    const skip = (page - 1) * limit;

    const query: any = { status: "ACTIVE" };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.occasion) {
      query.occasion = req.query.occasion;
    }

    if (req.query.recipient) {
      query.recipient = req.query.recipient;
    }

    if (req.query.bestseller === "true") {
      query.bestseller = true;
    }

    if (req.query.featured === "true") {
      query.featured = true;
    }

    if (req.query.priceMin || req.query.priceMax) {
      query.price = {};
      if (req.query.priceMin) query.price.$gte = Number(req.query.priceMin);
      if (req.query.priceMax) query.price.$lte = Number(req.query.priceMax);
    }

    let sort: any = { createdAt: -1 };
    if (req.query.sort === "price_asc") sort = { price: 1 };
    if (req.query.sort === "price_desc") sort = { price: -1 };
    if (req.query.sort === "rating") sort = { ratingAverage: -1 };
    if (req.query.sort === "newest") sort = { createdAt: -1 };

    const [products, total] = await Promise.all([
      ProductModel.find(query).populate("category", "name slug").sort(sort).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: products,
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

// Search products & suggestions
router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q as string || "").trim();
    if (!q) {
      return res.json({ success: true, data: { products: [], suggestions: [] } });
    }

    const regex = new RegExp(q, "i");
    const products = await ProductModel.find({
      status: "ACTIVE",
      $or: [{ name: regex }, { shortDescription: regex }, { occasion: regex }, { colour: regex }]
    })
      .limit(12)
      .populate("category", "name slug");

    const suggestions = [
      "Pink Rose Bouquet",
      "Birthday Gift Hamper",
      "Anniversary Red Roses",
      "Personalized Photo Frame Hamper",
      "Wedding Floral Garlands"
    ].filter((s) => s.toLowerCase().includes(q.toLowerCase()));

    res.json({ success: true, data: { products, suggestions } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET single product by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug, status: "ACTIVE" })
      .populate("category", "name slug")
      .populate("relatedProducts", "name slug price salePrice images ratingAverage reviewCount");

    if (!product) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Product not found" } });
    }

    // Fetch approved reviews
    const reviews = await ReviewModel.find({ product: product._id, status: "APPROVED" }).sort({ createdAt: -1 });

    // If relatedProducts is empty, fetch fallback products from the same category
    let related = product.relatedProducts;
    if (!related || related.length === 0) {
      related = await ProductModel.find({
        category: (product.category as any)?._id || product.category,
        _id: { $ne: product._id },
        status: "ACTIVE"
      }).limit(4);
    }

    res.json({
      success: true,
      data: {
        product,
        reviews,
        relatedProducts: related
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

export default router;
