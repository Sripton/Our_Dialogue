import express from "express";
import { Comment, Replycomment, User } from "../db/models";

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findCommentID = await Comment.findOne({ where: { id } });
    const findAllReplyComment = await Replycomment.findAll({
      where: { comment_id: findCommentID.id },
      include: { model: User },
    });
    res.json(findAllReplyComment);
  } catch (error) {
    console.log(error);
  }
});

export default router;
