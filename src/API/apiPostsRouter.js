import express from "express";
import { Subject, Post } from "../db/models";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { posttitle } = req.body;
  try {
    const findSubjectForID = await Subject.findOne({ where: { id } });
    const createPost = await Post.create({
      posttitle,
      user_id: req.session.userID,
      subject_id: findSubjectForID.id,
    });
    res.json(createPost);
  } catch (error) {
    console.log(error);
  }
});

export default router;
