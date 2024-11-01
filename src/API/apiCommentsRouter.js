import express from "express";
import { Post, Comment } from "../db/models";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { commenttitle } = req.body;
  try {
    const findPostID = await Post.findOne({ where: { id } });
    const createCommentsForPostID = await Comment.create({
      commenttitle,
      user_id: req.session.userID,
      post_id: findPostID.id,
    });
    res.json(createCommentsForPostID);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findPostID = await Post.findOne({ where: { id } });
    const findAllCommentForPostID = await Comment.findAll({
      where: { post_id: findPostID.id },
    });
    res.send(findAllCommentForPostID);
  } catch (error) {
    console.log(error);
  }
});
export default router;
