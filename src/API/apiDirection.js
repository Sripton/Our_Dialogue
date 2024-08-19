import express from "express";
import { Direction } from "../db/models";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getDirections = await Direction.findAll();
    res.json(getDirections);
  } catch (error) {
    console.log(error);
  }
});

export default router;
