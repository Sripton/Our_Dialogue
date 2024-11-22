import express from "express";
import { Comment, Replycomment } from "../db/models";

const router = express.Router();
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { replytitle } = req.body;
  try {
    const findCommentID = await Comment.findOne({ where: { id } });
    const createReplyComment = await Replycomment.create({
      replytitle,
      user_id: req.session.userID,
      comment_id: findCommentID.id,
    });
    res.json(createReplyComment);
  } catch (error) {
    console.log(error);
  }
});

export default router;
