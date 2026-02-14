const express = require("express");
const router = express.Router();
const { supabaseAdmin } = require("../supabaseAdmin");

// PHARMACIST SUBMITS DOCUMENTS → PENDING
router.post("/submit", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ verification_status: "pending" })
      .eq("id", userId)
      .select();

    if (error) {
      return res.status(400).json({ success: false, error });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ADMIN → GET ALL PHARMACISTS
router.get("/all", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ success: false, error });
    }

    res.json({ success: true, users: data });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ADMIN → APPROVE
router.patch("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ verification_status: "approved" })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({ success: false, error });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ADMIN → REJECT
router.patch("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ verification_status: "rejected" })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({ success: false, error });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
