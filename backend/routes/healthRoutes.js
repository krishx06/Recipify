import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "OK", message: "Recipify backend running" });
});

export default router;
