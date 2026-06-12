const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const router = express.Router();

router.post("/api/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }

    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ message: "Invalid URL" });
    }

    let existing = await Url.findOne({ originalUrl });

    if (existing) {
      const existingShortUrl = `http://localhost:5001/${existing.shortCode}`;

      return res.status(200).json({
        message: "URL already shortened",
        data: existing,
        shortUrl: existingShortUrl,
      });
    }

    const shortCode = nanoid(6);
    shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`

    const newUrl = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json({
      message: "Short URL created successfully",
      data: newUrl,
      shortUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/api/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

router.delete("/api/urls/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUrl = await Url.findByIdAndDelete(id);

    if (!deletedUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;