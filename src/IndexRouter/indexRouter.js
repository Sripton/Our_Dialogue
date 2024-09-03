import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("Layout");
});
router.get("/signup", async (req, res) => {
  res.render("Layout");
});
router.get("/signin", async (req, res) => {
  res.render("Layout");
});


router.get("/subjects/:id", async (req, res) => {
  res.render("Layout");
});

export default router;
