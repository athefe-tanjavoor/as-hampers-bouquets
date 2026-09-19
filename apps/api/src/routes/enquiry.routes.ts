import { Router } from "express";
import { EnquiryModel } from "../models/Enquiry";
import { corporateEnquirySchema, weddingEnquirySchema } from "@repo/validation";

const router = Router();

router.post("/corporate", async (req, res) => {
  try {
    const parse = corporateEnquirySchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, error: { message: "Invalid form input", details: parse.error.errors } });
    }

    const { company, contactPerson, email, phone, quantity, deliveryCity, requiredDate, occasion, budgetRange, customizationRequirements } = parse.data;

    const enquiry = await EnquiryModel.create({
      type: "CORPORATE",
      name: contactPerson,
      email,
      phone,
      company,
      quantity,
      city: deliveryCity,
      eventDate: requiredDate,
      budget: budgetRange,
      message: `Occasion: ${occasion} | Details: ${customizationRequirements}`
    });

    res.status(201).json({
      success: true,
      message: "Thank you for your enquiry. Our corporate gifting specialist will get in touch with you shortly.",
      data: { id: enquiry._id }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.post("/wedding", async (req, res) => {
  try {
    const parse = weddingEnquirySchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, error: { message: "Invalid form input", details: parse.error.errors } });
    }

    const { name, phone, email, eventDate, eventType, venueCity, budget, requirements } = parse.data;

    const enquiry = await EnquiryModel.create({
      type: "WEDDING",
      name,
      email,
      phone,
      eventDate,
      eventType,
      city: venueCity,
      budget,
      message: requirements
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out. Our wedding floral team will connect with you to design your celebration.",
      data: { id: enquiry._id }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: { message: "Name, email, and message are required" } });
    }

    const enquiry = await EnquiryModel.create({
      type: "CONTACT",
      name,
      email,
      phone: phone || "",
      message: `Subject: ${subject || "General Enquiry"} | Message: ${message}`
    });

    res.status(201).json({
      success: true,
      message: "Thank you for contacting us. We will get back to you as soon as possible.",
      data: { id: enquiry._id }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { message: err.message } });
  }
});

export default router;
