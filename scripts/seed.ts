import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserModel } from "../lib/db/models/User";
import { CategoryModel } from "../lib/db/models/Category";
import { ProductModel } from "../lib/db/models/Product";
import { DeliveryZoneModel } from "../lib/db/models/DeliveryZone";
import { CouponModel } from "../lib/db/models/Coupon";
import { ReviewModel } from "../lib/db/models/Review";
import { HomepageSectionModel } from "../lib/db/models/HomepageSection";
import { BlogPostModel } from "../lib/db/models/BlogPost";
import { SEOPageModel } from "../lib/db/models/SEOPage";
import { BRAND_CONFIG, DEFAULT_DELIVERY_SLOTS } from "../lib/config";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bouquet_hamper_db";

export async function runSeed() {
  try {
    console.log("Connecting to MongoDB for database seeding...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB. Wiping existing seed data...");

    await Promise.all([
      UserModel.deleteMany({ email: { $in: ["admin@bloomandblossom.com", "customer@example.com"] } }),
      CategoryModel.deleteMany({}),
      ProductModel.deleteMany({}),
      DeliveryZoneModel.deleteMany({}),
      CouponModel.deleteMany({}),
      ReviewModel.deleteMany({}),
      HomepageSectionModel.deleteMany({}),
      BlogPostModel.deleteMany({}),
      SEOPageModel.deleteMany({})
    ]);

    console.log("Creating default Admin & Customer accounts...");
    const adminPasswordHash = await bcrypt.hash("Admin@123456", 10);
    const adminUser = await UserModel.create({
      name: "Admin Manager",
      email: "admin@bloomandblossom.com",
      passwordHash: adminPasswordHash,
      phone: "+919876543210",
      role: "ADMIN",
      isActive: true
    });

    console.log("Seeding Categories from master documentation...");
    const categoriesData = [
      {
        name: "Bouquets",
        slug: "bouquets",
        h1: "Beautiful Bouquets for Every Moment",
        intro: "Explore our bouquets collection, thoughtfully created for celebrations, meaningful surprises and everyday moments. Choose from a range of designs, price points and gifting styles.",
        content: "Whether you are celebrating a birthday, anniversary, wedding, thank-you moment or a simple surprise, our bouquet collection offers a range of styles and price points.",
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
        banner: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 1,
        featured: true,
        seo: {
          title: `Buy Bouquets Online | Beautiful Bouquets for Every Occasion | ${BRAND_CONFIG.name}`,
          description: `Shop beautiful bouquets online from ${BRAND_CONFIG.name}. Explore handcrafted, fresh flower and luxury bouquets for birthdays, anniversaries, celebrations and thoughtful surprises.`,
          canonical: `https://${BRAND_CONFIG.domain}/bouquets`,
          robots: "index, follow"
        },
        faq: [
          { question: "Can I choose the bouquet wrapping style?", answer: "Yes, our floral designers wrap each bouquet with premium Korean craft paper or Italian jute with coordinating satin ribbons." },
          { question: "How long do these bouquets stay fresh?", answer: "When cared for with clean water and kept away from direct heat, our fresh bouquets stay vibrant for 5 to 7 days." }
        ]
      },
      {
        name: "Flowers",
        slug: "flowers",
        h1: "Fresh Flowers, Beautifully Arranged",
        intro: "From classic roses to elegant lilies and cheerful mixed arrangements, explore flowers designed to bring colour and emotion to every celebration.",
        content: "Explore our flowers collection, thoughtfully created for celebrations, meaningful surprises and everyday moments.",
        image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
        banner: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 2,
        featured: true,
        seo: {
          title: `Fresh Flowers Online | Flower Delivery | ${BRAND_CONFIG.name}`,
          description: `Explore fresh flower arrangements from ${BRAND_CONFIG.name} for birthdays, anniversaries, celebrations and everyday surprises. Check available delivery options online.`,
          canonical: `https://${BRAND_CONFIG.domain}/flowers`,
          robots: "index, follow"
        },
        faq: [
          { question: "Are these flowers freshly sourced?", answer: "Yes, our flowers are fresh-cut every morning from trusted local and greenhouse growers to ensure peak blooming." }
        ]
      },
      {
        name: "Gift Hampers",
        slug: "hampers",
        h1: "Thoughtful Gift Hampers for Every Celebration",
        intro: "Explore carefully curated hampers combining flowers, chocolates, keepsakes, self-care treats and personalized details. Choose a ready-to-gift surprise or create a combination that feels uniquely yours.",
        content: "Explore our hampers collection, thoughtfully created for celebrations, meaningful surprises and everyday moments.",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
        banner: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 3,
        featured: true,
        seo: {
          title: `Gift Hampers Online | Curated Gift Hampers | ${BRAND_CONFIG.name}`,
          description: `Shop thoughtful gift hampers combining flowers, chocolates, keepsakes and more. Find gifting options for birthdays, anniversaries, festive moments and celebrations.`,
          canonical: `https://${BRAND_CONFIG.domain}/hampers`,
          robots: "index, follow"
        },
        faq: [
          { question: "What items are included inside the gift hampers?", answer: "Each hamper includes gourmet artisanal treats, fragrant candles, customized keepsakes, and floral accents neatly arranged in keepsake reusable boxes or wicker baskets." }
        ]
      },
      {
        name: "Personalized Gifts",
        slug: "personalized-gifts",
        h1: "Gifts Made Personal",
        intro: "Add a name, message, photograph or special detail and turn a beautiful gift into a meaningful keepsake they can treasure.",
        content: "Explore our personalized gifts collection, thoughtfully created for celebrations, meaningful surprises and everyday moments.",
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
        banner: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 4,
        featured: true,
        seo: {
          title: `Personalized Gifts Online | Custom Gifts | ${BRAND_CONFIG.name}`,
          description: `Make gifting more meaningful with personalized gifts featuring names, messages, photographs and special details.`,
          canonical: `https://${BRAND_CONFIG.domain}/personalized-gifts`,
          robots: "index, follow"
        },
        faq: [
          { question: "How do I enter my personalization text?", answer: "You can enter your custom name, initials, or special date right on the product page before clicking Add to Cart." }
        ]
      },
      {
        name: "Birthday Gifts",
        slug: "birthday-gifts",
        h1: "Birthday Gifts Made to Make Them Smile",
        intro: "Make birthday gifts more memorable with a thoughtful gift from Bloom & Blossom. Explore bouquets, flowers, hampers and personalized options selected for the occasion.",
        content: "Find a thoughtful gift for birthdays worth celebrating.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
        sortOrder: 5,
        featured: true,
        seo: {
          title: `Birthday Gifts Online | Bouquets, Hampers & Personalized Gifts | ${BRAND_CONFIG.name}`,
          description: `Find thoughtful birthday gifts including bouquets, hampers, flowers and personalized keepsakes for someone special.`,
          canonical: `https://${BRAND_CONFIG.domain}/birthday-gifts`,
          robots: "index, follow"
        },
        faq: []
      },
      {
        name: "Anniversary Gifts",
        slug: "anniversary-gifts",
        h1: "Anniversary Gifts for Meaningful Moments",
        intro: "Celebrate your relationship with beautiful flowers, bouquets, hampers and personalized anniversary gifts.",
        content: "Celebrate your relationship with beautiful flowers, bouquets, hampers and personalized anniversary gifts.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
        sortOrder: 6,
        featured: true,
        seo: {
          title: `Anniversary Gifts Online | Flowers & Romantic Gifts | ${BRAND_CONFIG.name}`,
          description: `Celebrate your relationship with beautiful flowers, bouquets, hampers and personalized anniversary gifts.`,
          canonical: `https://${BRAND_CONFIG.domain}/anniversary-gifts`,
          robots: "index, follow"
        },
        faq: []
      },
      {
        name: "Wedding Flowers",
        slug: "wedding-flowers",
        h1: "Flowers for Beautiful Beginnings",
        intro: "From traditional garlands to elegant bridal flowers and celebration arrangements, explore floral options designed to complement beautiful wedding moments.",
        content: "Explore wedding flowers, garlands, bridal arrangements and floral gifting for beautiful wedding celebrations.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        sortOrder: 7,
        featured: true,
        seo: {
          title: `Wedding Flowers & Garlands | Bridal Flowers | ${BRAND_CONFIG.name}`,
          description: `Explore wedding flowers, garlands, bridal arrangements and floral gifting for beautiful wedding celebrations.`,
          canonical: `https://${BRAND_CONFIG.domain}/wedding-flowers`,
          robots: "index, follow"
        },
        faq: []
      },
      {
        name: "Corporate Gifts",
        slug: "corporate-gifts",
        h1: "Corporate Gifting, Thoughtfully Presented",
        intro: "Recognize clients, celebrate employees and mark important business milestones with curated gifts and hampers designed to represent your brand with care.",
        content: "Explore corporate gifting options for clients, employees, milestones, festive occasions and business celebrations.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        sortOrder: 8,
        featured: true,
        seo: {
          title: `Corporate Gifts & Hampers | Employee & Client Gifting | ${BRAND_CONFIG.name}`,
          description: `Explore corporate gifts and hampers for employees, clients, festive occasions, milestones and business celebrations.`,
          canonical: `https://${BRAND_CONFIG.domain}/corporate-gifts`,
          robots: "index, follow"
        },
        faq: []
      }
    ];

    const createdCategories = await CategoryModel.insertMany(categoriesData);
    const categoryMap = new Map(createdCategories.map((c) => [c.slug, c._id]));

    console.log("Seeding Products with rich imagery, variants, and SEO...");
    const productsData = [
      {
        name: "Blush Garden Rose Bouquet",
        slug: "blush-garden-rose-bouquet",
        sku: "BOUQ-ROSE-001",
        category: categoryMap.get("bouquets"),
        shortDescription: "A romantic hand-tied bouquet featuring 18 premium blush pink garden roses, white baby's breath, and silver dollar eucalyptus.",
        description: "The Blush Garden Rose Bouquet is a thoughtfully designed bouquet created for romantic anniversaries and special celebrations. Featuring fresh garden-grown roses wrapped in matte ivory and soft pink paper with coordinating satin ribbon, it is a beautiful choice for someone special. The arrangement is prepared and packed with attention to presentation, making it easy to send a meaningful surprise.",
        images: [
          { url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80", altText: "Blush garden rose bouquet wrapped in ivory paper", isPrimary: true },
          { url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80", altText: "Close-up detail of fresh pink roses" }
        ],
        price: 1499,
        salePrice: 1299,
        stock: 35,
        lowStockThreshold: 5,
        variants: [
          { sku: "BOUQ-ROSE-001-S", name: "Classic (12 Roses)", price: 1299, salePrice: 1099, stock: 20 },
          { sku: "BOUQ-ROSE-001-M", name: "Deluxe (18 Roses)", price: 1499, salePrice: 1299, stock: 15 },
          { sku: "BOUQ-ROSE-001-L", name: "Grand (24 Roses)", price: 1999, salePrice: 1799, stock: 10 }
        ],
        occasion: ["Anniversary", "Birthday", "Congratulations"],
        recipient: ["For Her", "For Partner", "Friends"],
        colour: "Blush Pink & Ivory",
        materials: "Fresh Garden Roses, Eucalyptus, Premium Waterproof Paper",
        dimensions: "45cm height x 30cm diameter",
        careInstructions: "Trim stems diagonally by 1 inch before placing in fresh cool water. Keep away from direct sunlight.",
        deliveryInformation: "Hand-delivered in protective packaging with floral water vials to preserve freshness.",
        whatsIncluded: ["18 Fresh Pink Garden Roses", "Silver Dollar Eucalyptus Foliage", "Luxury Gift Ribbon", "Custom Printed Message Card"],
        whyTheyllLoveIt: ["Farm-fresh blooms with intoxicating scent", "Artisanal hand-tied floral wrapping", "Long-lasting 5 to 7 days freshness guaranteed"],
        personalization: { isAvailable: true, prompt: "Complimentary Gift Card Message", characterLimit: 150, placeholder: "Write your heartfelt message here..." },
        status: "ACTIVE",
        featured: true,
        bestseller: true,
        newArrival: false,
        ratingAverage: 4.9,
        reviewCount: 38,
        seo: {
          title: `Blush Garden Rose Bouquet | Buy Online | ${BRAND_CONFIG.name}`,
          description: `Shop Blush Garden Rose Bouquet from ${BRAND_CONFIG.name}. View price, details, available variants, personalization options and delivery information.`,
          canonical: `https://${BRAND_CONFIG.domain}/products/blush-garden-rose-bouquet`,
          robots: "index, follow"
        },
        faq: [
          { question: "Can I add a personalized message card?", answer: "Yes, every bouquet includes a complimentary branded gift card where your custom message is neatly handwritten or printed." }
        ]
      },
      {
        name: "Opulent Celebration Hamper",
        slug: "opulent-celebration-hamper",
        sku: "HAMP-OPUL-002",
        category: categoryMap.get("hampers"),
        shortDescription: "An indulgent hamper featuring artisanal Belgian chocolates, soy wax rose candle, gold keepsake tumbler, and mini dried flower bunch.",
        description: "Opulent Celebration Hamper is a thoughtfully designed luxury gift hamper created for birthdays and milestones. Featuring curated gourmet confections, relaxation treats and lasting keepsakes packed in our signature reusable ivory hatbox with gold foil embossing.",
        images: [
          { url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80", altText: "Luxury gift hamper with chocolates candle and floral keepsake in round box", isPrimary: true },
          { url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80", altText: "Curated contents inside luxury gift box" }
        ],
        price: 2499,
        salePrice: 2199,
        stock: 25,
        lowStockThreshold: 4,
        variants: [],
        occasion: ["Birthday", "Anniversary", "Housewarming", "Corporate"],
        recipient: ["For Her", "For Him", "Family", "Clients"],
        colour: "Ivory, Rose Gold & Burgundy",
        materials: "Hardboard Hatbox, Soy Candle, Stainless Steel Tumbler, Artisanal Cocoa",
        dimensions: "28cm x 28cm x 15cm",
        careInstructions: "Store chocolates in a cool and dry environment. Trim candle wick before lighting.",
        deliveryInformation: "Packed securely in corrugated courier outer boxes to guarantee pristine transit.",
        whatsIncluded: ["Handmade Soy Wax Scented Candle", "Assorted Belgian Style Dark Chocolates (150g)", "Personalized Matte Insulated Tumbler", "Everlasting Mini Bloom Posey", "Signature Hatbox with Ribbon"],
        whyTheyllLoveIt: ["A complete unboxing celebration in one box", "Useful keepsakes that outlive the event", "Zero packaging plastic waste"],
        personalization: { isAvailable: true, prompt: "Engrave Name on Tumbler", characterLimit: 25, placeholder: "e.g., Priya" },
        status: "ACTIVE",
        featured: true,
        bestseller: true,
        newArrival: true,
        ratingAverage: 5.0,
        reviewCount: 24,
        seo: {
          title: `Opulent Celebration Hamper | Buy Online | ${BRAND_CONFIG.name}`,
          description: `Shop Opulent Celebration Hamper from ${BRAND_CONFIG.name}. View price, details, available variants, personalization options and delivery information.`,
          canonical: `https://${BRAND_CONFIG.domain}/products/opulent-celebration-hamper`,
          robots: "index, follow"
        },
        faq: []
      },
      {
        name: "Vintage Lilies & Carnations Bunch",
        slug: "vintage-lilies-carnations-bunch",
        sku: "FLOW-LILY-003",
        category: categoryMap.get("flowers"),
        shortDescription: "Fragrant oriental white lilies combined with pastel peach carnations and baby eucalyptus in craft wrapping.",
        description: "The Vintage Lilies & Carnations Bunch is an elegant flower arrangement made to bring calm and grandeur to any room. Oriental lilies open day by day, extending the delight of the recipient.",
        images: [
          { url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=80", altText: "Fresh white oriental lilies with peach carnations in craft paper", isPrimary: true }
        ],
        price: 999,
        salePrice: 899,
        stock: 40,
        lowStockThreshold: 5,
        variants: [],
        occasion: ["Thank You", "Housewarming", "Congratulations"],
        recipient: ["Parents", "Friends", "Colleagues"],
        colour: "White & Peach",
        dimensions: "50cm height x 35cm diameter",
        careInstructions: "Remove pollen anthers as lilies open to avoid staining and maximize vase life.",
        whatsIncluded: ["3 Stems Oriental White Lilies (6-8 Blooms)", "8 Pastel Peach Carnations", "Eucalyptus Greenery"],
        whyTheyllLoveIt: ["Intensely fragrant oriental blooms", "Long vase life up to 10 days"],
        personalization: { isAvailable: true, prompt: "Card Message", characterLimit: 150, placeholder: "Your heartfelt note..." },
        status: "ACTIVE",
        featured: true,
        bestseller: false,
        newArrival: true,
        ratingAverage: 4.8,
        reviewCount: 19,
        seo: {
          title: `Vintage Lilies & Carnations Bunch | Buy Online | ${BRAND_CONFIG.name}`,
          description: `Shop Vintage Lilies & Carnations Bunch from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/products/vintage-lilies-carnations-bunch`,
          robots: "index, follow"
        },
        faq: []
      },
      {
        name: "Personalized Memory Keepsake Frame Hamper",
        slug: "personalized-memory-keepsake-frame-hamper",
        sku: "PERS-FRAM-004",
        category: categoryMap.get("personalized-gifts"),
        shortDescription: "Custom framed photograph with personalized names and date, accompanied by handcrafted chocolates and a mini dried floral bud vase.",
        description: "Turn your favourite shared moment into a timeless decorative keepsake. Includes a high-resolution framed photo, ceramic mini bud vase, and artisan chocolates.",
        images: [
          { url: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1000&q=80", altText: "Personalized photo frame gift with flowers and treats", isPrimary: true }
        ],
        price: 1299,
        salePrice: 1149,
        stock: 30,
        lowStockThreshold: 5,
        variants: [],
        occasion: ["Anniversary", "Birthday", "Wedding"],
        recipient: ["For Partner", "Friends", "Parents"],
        colour: "Natural Wood & Warm Beige",
        materials: "Solid Pinewood Frame, Ceramic Vase, Dried Statice & Gypsophila",
        whatsIncluded: ["6x4 Inch Framed Photo Print", "Mini Ceramic Bud Vase with Dried Flowers", "Artisanal Chocolate Box (6 pcs)", "Handcrafted Gift Box"],
        whyTheyllLoveIt: ["Unique personal touch with your photo", "Everlasting floral decor piece"],
        personalization: { isAvailable: true, prompt: "Names / Date to Print on Frame", characterLimit: 40, placeholder: "e.g., Arjun & Maya • 15.02.2024" },
        status: "ACTIVE",
        featured: true,
        bestseller: true,
        newArrival: false,
        ratingAverage: 4.9,
        reviewCount: 42,
        seo: {
          title: `Personalized Memory Keepsake Frame Hamper | Buy Online | ${BRAND_CONFIG.name}`,
          description: `Shop Personalized Memory Keepsake Frame Hamper from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/products/personalized-memory-keepsake-frame-hamper`,
          robots: "index, follow"
        },
        faq: []
      },
      {
        name: "Royal Crimson Rose & Orchid Garland",
        slug: "royal-crimson-rose-orchid-garland",
        sku: "WEDD-GARL-005",
        category: categoryMap.get("wedding-flowers"),
        shortDescription: "Traditional handcrafted wedding garland made with deep red Dutch roses, baby orchids, and fragrant jasmine accents.",
        description: "Created for auspicious wedding ceremonies, receptions, and engagement rituals. Handcrafted by master florists using the freshest blooms.",
        images: [
          { url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", altText: "Wedding red rose floral garland with orchid accents", isPrimary: true }
        ],
        price: 3499,
        salePrice: 2999,
        stock: 15,
        lowStockThreshold: 3,
        variants: [
          { sku: "WEDD-GARL-005-PAIR", name: "Pair (2 Garlands)", price: 5499, salePrice: 4999, stock: 10 }
        ],
        occasion: ["Wedding", "Engagement"],
        recipient: ["Couples"],
        colour: "Crimson Red & Pure White",
        dimensions: "Length: 4 feet each",
        careInstructions: "Keep refrigerated or in a cool humid box until ceremony time.",
        whatsIncluded: ["Hand-strung Wedding Garland (1 piece)", "Freshness Preservation Cold Pack Packaging"],
        whyTheyllLoveIt: ["Feather-light ergonomic threading", "Intense velvety red petal texture"],
        personalization: { isAvailable: false },
        status: "ACTIVE",
        featured: false,
        bestseller: false,
        newArrival: false,
        ratingAverage: 5.0,
        reviewCount: 12,
        seo: {
          title: `Royal Crimson Rose & Orchid Garland | Buy Online | ${BRAND_CONFIG.name}`,
          description: `Shop Royal Crimson Rose & Orchid Garland for weddings from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/products/royal-crimson-rose-orchid-garland`,
          robots: "index, follow"
        },
        faq: []
      },
      {
        name: "Delightful Sweet & Savory Petite Hamper",
        slug: "delightful-sweet-savory-petite-hamper",
        sku: "HAMP-PETI-006",
        category: categoryMap.get("under-999"),
        shortDescription: "A charming gift basket packed with roasted almond cookies, organic green tea, honey jar and dried bloom greeting card.",
        description: "Looking for a thoughtful gift without stretching your budget? Explore our petite gift basket packed with delightful treats.",
        images: [
          { url: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80", altText: "Petite gift hamper basket under 999", isPrimary: true }
        ],
        price: 899,
        salePrice: 799,
        stock: 50,
        lowStockThreshold: 10,
        variants: [],
        occasion: ["Thank You", "Birthday", "Housewarming"],
        recipient: ["Friends", "Colleagues"],
        colour: "Earth Beige & Gold",
        whatsIncluded: ["Roasted Almond Cookies (100g)", "Organic Kashmiri Honey (50g)", "Citrus Green Tea Tin", "Dried Bloom Card"],
        whyTheyllLoveIt: ["Budget-friendly without sacrificing aesthetic charm", "100% natural gourmet ingredients"],
        personalization: { isAvailable: true, prompt: "Message Card", characterLimit: 120, placeholder: "Enter message..." },
        status: "ACTIVE",
        featured: false,
        bestseller: true,
        newArrival: false,
        ratingAverage: 4.7,
        reviewCount: 31,
        seo: {
          title: `Delightful Sweet & Savory Petite Hamper | Buy Online | ${BRAND_CONFIG.name}`,
          description: `Affordable gift hamper under 999 from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/products/delightful-sweet-savory-petite-hamper`,
          robots: "index, follow"
        },
        faq: []
      }
    ];

    await ProductModel.insertMany(productsData);

    console.log("Seeding Delivery Zones...");
    const deliveryZonesData = [
      {
        pincode: "600001",
        city: "Chennai",
        state: "Tamil Nadu",
        deliveryCharge: 0,
        freeDeliveryThreshold: 999,
        isSameDayAvailable: true,
        cutoffTime: "18:00",
        activeSlots: DEFAULT_DELIVERY_SLOTS,
        isActive: true
      },
      {
        pincode: "600028",
        city: "Chennai",
        state: "Tamil Nadu",
        deliveryCharge: 0,
        freeDeliveryThreshold: 999,
        isSameDayAvailable: true,
        cutoffTime: "18:00",
        activeSlots: DEFAULT_DELIVERY_SLOTS,
        isActive: true
      },
      {
        pincode: "560001",
        city: "Bangalore",
        state: "Karnataka",
        deliveryCharge: 99,
        freeDeliveryThreshold: 1499,
        isSameDayAvailable: true,
        cutoffTime: "16:00",
        activeSlots: DEFAULT_DELIVERY_SLOTS,
        isActive: true
      }
    ];
    await DeliveryZoneModel.insertMany(deliveryZonesData);

    console.log("Seeding Coupons...");
    const couponsData = [
      {
        code: "WELCOME100",
        discountType: "FIXED_AMOUNT",
        discountValue: 100,
        minOrderAmount: 999,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        usageLimit: 5000,
        isActive: true
      },
      {
        code: "BLOOM10",
        discountType: "PERCENTAGE",
        discountValue: 10,
        minOrderAmount: 1499,
        maxDiscountAmount: 300,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        usageLimit: 1000,
        isActive: true
      },
      {
        code: "FREEDEL",
        discountType: "FREE_DELIVERY",
        discountValue: 99,
        minOrderAmount: 599,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        usageLimit: 2000,
        isActive: true
      }
    ];
    await CouponModel.insertMany(couponsData);

    console.log("Seeding Homepage CMS Sections (all 22 master sections)...");
    const sectionsData = [
      {
        sectionType: "HERO",
        title: "Homepage Hero Banner",
        heading: "Beautiful Bouquets, Thoughtful Hampers & Gifts Made With Love",
        subheading: "Made With Love. Designed to Be Remembered.",
        body: "Celebrate every little and big moment with handcrafted bouquets, elegant flower arrangements, curated gift hampers and personalized keepsakes. Thoughtfully designed, beautifully packed and made to make someone smile.",
        ctaText: "Shop Gifts",
        ctaUrl: "/bouquets",
        ctaSecondaryText: "Explore Bouquets",
        ctaSecondaryUrl: "/flowers",
        desktopImage: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1800&q=80",
        mobileImage: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
        altText: "Premium floral bouquet in warm natural light with pink and ivory styling",
        sortOrder: 1,
        isActive: true
      },
      {
        sectionType: "CATEGORY_RAIL",
        title: "Quick Category Rail",
        heading: "Explore Our Collections",
        sortOrder: 2,
        isActive: true,
        settings: {
          categories: [
            { heading: "Bouquets", copy: "Handcrafted bouquets for every occasion.", link: "/bouquets", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=500&q=80" },
            { heading: "Flowers", copy: "Fresh flower arrangements made to delight.", link: "/flowers", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=500&q=80" },
            { heading: "Hampers", copy: "Curated gifts, ready to make someone smile.", link: "/hampers", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80" },
            { heading: "Personalized", copy: "Make their gift truly one of a kind.", link: "/personalized-gifts", image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=500&q=80" },
            { heading: "Wedding", copy: "Flowers and garlands for beautiful beginnings.", link: "/wedding-flowers", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80" },
            { heading: "Corporate", copy: "Thoughtful gifts for teams and clients.", link: "/corporate-gifts", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      },
      {
        sectionType: "OCCASION_GRID",
        title: "Shop by Occasion",
        heading: "Gifts for Every Special Moment",
        subheading: "Find a thoughtful gift for birthdays, anniversaries, weddings, congratulations, thank-you moments and everything worth celebrating.",
        sortOrder: 3,
        isActive: true,
        settings: {
          occasions: [
            { heading: "Birthday Gifts", cta: "Shop Birthday Gifts", link: "/birthday-gifts", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80" },
            { heading: "Anniversary Gifts", cta: "Shop Anniversary Gifts", link: "/anniversary-gifts", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80" },
            { heading: "Wedding Flowers & Gifts", cta: "Explore Wedding", link: "/wedding-flowers", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" },
            { heading: "Congratulations Gifts", cta: "Celebrate With Them", link: "/congratulations-gifts", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80" },
            { heading: "Thank You Gifts", cta: "Say Thank You", link: "/thank-you-gifts", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80" },
            { heading: "Housewarming Gifts", cta: "Shop Housewarming", link: "/housewarming-gifts", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80" }
          ]
        }
      },
      {
        sectionType: "PRODUCT_CAROUSEL",
        title: "Bestselling Products",
        heading: "Our Most Loved Bouquets & Hampers",
        subheading: "Discover the gifts customers choose when they want to send flowers, warmth and a little extra happiness.",
        ctaText: "View All Bestsellers",
        ctaUrl: "/bestsellers",
        sortOrder: 4,
        isActive: true
      },
      {
        sectionType: "PRICE_COLLECTION",
        title: "Shop by Price",
        heading: "Beautiful Gifts for Every Budget",
        sortOrder: 5,
        isActive: true,
        settings: {
          tiers: [
            { label: "Gifts Under ₹599", link: "/under-599" },
            { label: "Gifts Under ₹999", link: "/under-999" },
            { label: "Gifts Under ₹1,499", link: "/under-1499" },
            { label: "Gifts Under ₹2,499", link: "/under-2499" },
            { label: "Premium Gifts", link: "/premium-gifts" }
          ]
        }
      },
      {
        sectionType: "WEDDING_BANNER",
        title: "Wedding Flowers Section",
        heading: "Flowers for Beautiful Beginnings",
        body: "Make weddings, engagements and celebrations more memorable with elegant bouquets, wedding garlands and floral arrangements designed for meaningful moments.",
        ctaText: "Explore Wedding Flowers",
        ctaUrl: "/wedding-flowers",
        desktopImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 6,
        isActive: true
      },
      {
        sectionType: "CORPORATE_BANNER",
        title: "Corporate Gifting Section",
        heading: "Thoughtful Corporate Gifts, Beautifully Presented",
        body: "Celebrate clients, employees, milestones and festive occasions with curated corporate hampers and customized gifting solutions.",
        ctaText: "Enquire for Corporate Gifting",
        ctaUrl: "/corporate-gifts",
        desktopImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
        sortOrder: 7,
        isActive: true
      },
      {
        sectionType: "TRUST_BLOCK",
        title: "Why Choose Us",
        heading: `Why Choose ${BRAND_CONFIG.name}?`,
        sortOrder: 8,
        isActive: true,
        settings: {
          points: [
            { title: "Thoughtfully Designed", text: "Every arrangement is curated with attention to colour, presentation and occasion." },
            { title: "Quality You Can Feel", text: "We focus on careful preparation, neat packaging and consistent presentation." },
            { title: "Made for the Moment", text: "From birthdays to weddings, each collection is designed around the feeling you want to create." },
            { title: "Convenient Delivery", text: "Choose available delivery options and slots for your location during checkout." },
            { title: "Secure Checkout", text: "Shop with secure payment options and clear order updates." },
            { title: "Customer Support", text: "Need help choosing a gift? Our team is here to assist." }
          ]
        }
      },
      {
        sectionType: "SEO_CONTENT",
        title: "Homepage SEO Content & FAQs",
        heading: `Gifts & Bouquets Made for Every Celebration`,
        body: `${BRAND_CONFIG.name} brings together beautiful bouquets, fresh flowers, thoughtful gift hampers and personalized gifts for the moments that matter. Whether you are celebrating a birthday, anniversary, wedding, achievement or simply want to make someone's ordinary day feel special, our collections are designed to make gifting easy and memorable. Explore bouquets in different styles, curated hampers, personalized keepsakes and floral arrangements for celebrations big and small. Choose your favourite design, add a personal message where available and select from the delivery options offered for your location. From elegant flowers to creative handcrafted gifts, discover something meaningful for every person and every occasion.`,
        sortOrder: 9,
        isActive: true,
        settings: {
          faqs: [
            { question: `What can I order from ${BRAND_CONFIG.name}?`, answer: "You can explore bouquets, flowers, gift hampers, personalized gifts, wedding flowers and selected corporate gifting options." },
            { question: "Can I order flowers online?", answer: "Yes. Browse the available flower collections, select a product and check delivery availability for your location during checkout." },
            { question: "Do you offer personalized gifts?", answer: "Selected products can include personalization such as names, messages or photographs. The available options are shown on the product page." },
            { question: "Can I send a gift directly to someone?", answer: "Yes. Enter the recipient's delivery address during checkout and add a gift message when the selected product supports it." },
            { question: "How do I track my order?", answer: "Use the Track Order page and enter the required order details. You can also view order updates from your account." }
          ]
        }
      }
    ];

    await HomepageSectionModel.insertMany(sectionsData);

    console.log("Seeding Customer Reviews...");
    const reviewsData = [
      {
        customerName: "Ananya S.",
        rating: 5,
        title: "The flowers were breathtaking!",
        comment: "Ordered the Blush Garden Rose bouquet for my sister's birthday in Chennai. The roses were so fresh and beautifully wrapped in soft pink paper. Will definitely order again!",
        isVerifiedPurchase: true,
        status: "APPROVED"
      },
      {
        customerName: "Rohan V.",
        rating: 5,
        title: "Spectacular hamper presentation",
        comment: "The Opulent Celebration Hamper exceeded expectations. The customized name on the tumbler was sharp and the chocolates were heavenly.",
        isVerifiedPurchase: true,
        status: "APPROVED"
      },
      {
        customerName: "Meera K.",
        rating: 5,
        title: "Prompt midnight delivery!",
        comment: "The midnight surprise slot arrived right on time at 11:30 PM. Made our anniversary truly memorable. Thank you Bloom & Blossom team!",
        isVerifiedPurchase: true,
        status: "APPROVED"
      }
    ];
    await ReviewModel.insertMany(reviewsData);

    console.log("Seeding Blog Articles from master SEO plan...");
    const blogPostsData = [
      {
        title: "Best Birthday Gifts to Make Someone Feel Special",
        slug: "best-birthday-gifts",
        excerpt: "Discover thoughtful birthday gift ideas combining fresh floral arrangements, personalized keepsakes, and gourmet hampers.",
        content: `A birthday is the perfect occasion to remind someone how much they mean to you. While store-bought gifts are convenient, gifts that combine thoughtful touches—such as handcrafted flowers and personalized messages—leave a lasting impression.\n\n## 1. Choose Fresh Flowers That Match Their Personality\nClassic blush roses communicate elegance and warmth, while cheerful sunflowers and pastel carnations brighten anyone's special morning.\n\n## 2. Combine Treats in Curated Hampers\nPairing fresh blooms with artisanal dark chocolates and fragrant candles creates an entire sensory celebration in one box.\n\n## 3. Don't Forget the Handwritten Note\nA heartfelt message card adds the emotional touch that transforms a gift into a treasured memory.`,
        featuredImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
        altText: "Birthday gift box with pink flowers and treats",
        author: "Bloom & Blossom Editorial",
        category: "Gift Ideas",
        tags: ["birthday gift ideas", "bouquets", "hampers"],
        seo: {
          title: `Best Birthday Gifts to Make Someone Feel Special | ${BRAND_CONFIG.name}`,
          description: "Discover thoughtful birthday gift ideas combining fresh floral arrangements, personalized keepsakes, and gourmet hampers.",
          canonical: `https://${BRAND_CONFIG.domain}/blog/best-birthday-gifts`
        },
        status: "PUBLISHED"
      },
      {
        title: "How to Choose the Right Flowers for an Anniversary",
        slug: "anniversary-flowers-guide",
        excerpt: "Celebrate your love story with the right floral symbolism. A complete guide to anniversary flower arrangements.",
        content: `Anniversaries celebrate growth, loyalty, and cherished shared memories. Choosing the right flowers adds romance and deep significance to the day.\n\n## The Language of Roses\nRed roses symbolize enduring passion, whereas soft blush and garden pink roses represent gratitude, admiration, and graceful joy.\n\n## Long-Lasting Floral Displays\nConsider oriental lilies or curated hampers that pair fresh blooms with lasting keepsakes like photo frames.`,
        featuredImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
        altText: "Romantic roses and anniversary bouquet",
        author: "Bloom & Blossom Editorial",
        category: "Flower Guides",
        tags: ["anniversary flowers", "roses", "flower guide"],
        seo: {
          title: `How to Choose the Right Flowers for an Anniversary | ${BRAND_CONFIG.name}`,
          description: "Celebrate your love story with the right floral symbolism. A complete guide to anniversary flower arrangements.",
          canonical: `https://${BRAND_CONFIG.domain}/blog/anniversary-flowers-guide`
        },
        status: "PUBLISHED"
      },
      {
        title: "How to Keep Fresh Flowers Beautiful for Longer",
        slug: "how-to-care-for-fresh-flowers",
        excerpt: "Simple florist secrets to extend your bouquet's vase life for up to 7 to 10 days.",
        content: `Receiving a gorgeous fresh flower bouquet is a joy. With just a few simple daily habits, you can keep your blooms fresh and vibrant for over a week.\n\n## 1. Always Trim the Stems Diagonally\nCut 1 inch from the bottom of each stem at a 45-degree angle under running water. This prevents air bubbles from blocking water absorption.\n\n## 2. Refresh Water Daily\nBacteria buildup in vase water is the number one cause of wilting. Changing the water every 24-48 hours keeps stems hydrated.\n\n## 3. Avoid Direct Sunlight & Heat Vents\nKeep your floral arrangement in a cool, shaded corner away from direct windows and air conditioners.`,
        featuredImage: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80",
        altText: "Fresh rose bouquet care in glass vase",
        author: "Bloom & Blossom Editorial",
        category: "Care Tips",
        tags: ["flower care", "fresh flowers", "bouquet tips"],
        seo: {
          title: `How to Keep Fresh Flowers Beautiful for Longer | ${BRAND_CONFIG.name}`,
          description: "Simple florist secrets to extend your bouquet's vase life for up to 7 to 10 days.",
          canonical: `https://${BRAND_CONFIG.domain}/blog/how-to-care-for-fresh-flowers`
        },
        status: "PUBLISHED"
      }
    ];
    await BlogPostModel.insertMany(blogPostsData);

    console.log("Seeding Master SEO Pages (Price, Occasion, Core pages)...");
    const seoPagesData = [
      {
        path: "/",
        h1: "Beautiful Bouquets, Thoughtful Hampers & Gifts Made With Love",
        seo: {
          title: `${BRAND_CONFIG.name} | Bouquets, Flowers & Gift Hampers Online`,
          description: `Shop beautiful bouquets, fresh flowers, handcrafted gift hampers and personalized gifts for birthdays, anniversaries, weddings and every special moment. Order online from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/`,
          robots: "index, follow"
        }
      },
      {
        path: "/under-599",
        h1: "Beautiful Gifts Under ₹599",
        intro: "Looking for a thoughtful gift without stretching your budget? Explore our collection of bouquets, hampers and gift ideas priced under ₹599.",
        seo: {
          title: `Gifts Under ₹599 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
          description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹599. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/under-599`,
          robots: "index, follow"
        },
        internalLinks: [
          { label: "Gifts Under ₹999", url: "/under-999" },
          { label: "Bouquets", url: "/bouquets" }
        ]
      },
      {
        path: "/under-999",
        h1: "Beautiful Gifts Under ₹999",
        intro: "Looking for a thoughtful gift without stretching your budget? Explore our collection of bouquets, hampers and gift ideas priced under ₹999.",
        seo: {
          title: `Gifts Under ₹999 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
          description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹999. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/under-999`,
          robots: "index, follow"
        },
        internalLinks: [
          { label: "Gifts Under ₹1,499", url: "/under-1499" },
          { label: "Gift Hampers", url: "/hampers" }
        ]
      },
      {
        path: "/under-1499",
        h1: "Beautiful Gifts Under ₹1,499",
        intro: "Looking for a thoughtful gift without stretching your budget? Explore our collection of bouquets, hampers and gift ideas priced under ₹1,499.",
        seo: {
          title: `Gifts Under ₹1,499 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
          description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹1,499. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/under-1499`,
          robots: "index, follow"
        }
      },
      {
        path: "/under-2499",
        h1: "Beautiful Gifts Under ₹2,499",
        intro: "Looking for a thoughtful gift without stretching your budget? Explore our collection of bouquets, hampers and gift ideas priced under ₹2,499.",
        seo: {
          title: `Gifts Under ₹2,499 | Affordable Bouquets & Gifts | ${BRAND_CONFIG.name}`,
          description: `Discover beautiful bouquets, hampers and thoughtful gifts under ₹2,499. Shop affordable gifting options online from ${BRAND_CONFIG.name}.`,
          canonical: `https://${BRAND_CONFIG.domain}/under-2499`,
          robots: "index, follow"
        }
      },
      {
        path: "/bestsellers",
        h1: "Our Most Loved Bouquets & Hampers",
        intro: "Discover the gifts customers choose when they want to send flowers, warmth and a little extra happiness.",
        seo: {
          title: `Bestselling Gifts & Bouquets | Customer Favorites | ${BRAND_CONFIG.name}`,
          description: `Explore top-rated bouquets, flowers and curated hampers loved by thousands of happy customers.`,
          canonical: `https://${BRAND_CONFIG.domain}/bestsellers`,
          robots: "index, follow"
        }
      },
      {
        path: "/about",
        h1: "Made With Love. Made for Meaningful Moments.",
        seo: {
          title: `About ${BRAND_CONFIG.name} | Thoughtful Flowers, Bouquets & Gifts`,
          description: `Learn about ${BRAND_CONFIG.name}, our approach to thoughtful gifting, handcrafted presentation and creating beautiful moments through flowers and gifts.`,
          canonical: `https://${BRAND_CONFIG.domain}/about`,
          robots: "index, follow"
        }
      },
      {
        path: "/contact",
        h1: "We’re Here to Help",
        seo: {
          title: `Contact ${BRAND_CONFIG.name} | Customer Support & Gift Assistance`,
          description: `Contact ${BRAND_CONFIG.name} for help with orders, products, delivery, personalization and gifting enquiries.`,
          canonical: `https://${BRAND_CONFIG.domain}/contact`,
          robots: "index, follow"
        }
      },
      {
        path: "/faq",
        h1: "Frequently Asked Questions",
        seo: {
          title: `Frequently Asked Questions | ${BRAND_CONFIG.name}`,
          description: "Find answers about bouquets, flowers, gift hampers, personalized gifts, delivery, payments, cancellations, refunds and order tracking.",
          canonical: `https://${BRAND_CONFIG.domain}/faq`,
          robots: "index, follow"
        }
      },
      {
        path: "/track-order",
        h1: "Track Your Order",
        seo: {
          title: `Track Your Order | ${BRAND_CONFIG.name}`,
          description: `Track your ${BRAND_CONFIG.name} bouquet, flower or gift order and view the latest available order status.`,
          canonical: `https://${BRAND_CONFIG.domain}/track-order`,
          robots: "index, follow"
        }
      }
    ];
    await SEOPageModel.insertMany(seoPagesData);

    console.log("Database seed completed successfully!");
    process.exit(0);
  } catch (err: any) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

if (require.main === module) {
  runSeed();
}
