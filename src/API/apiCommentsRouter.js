import express from "express";
import { Post, Comment, User } from "../db/models";
import checkUsersForComments from "../Middleware/userCheckForComments";
const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { commenttitle, parent_id } = req.body;
  try {
    const findPostID = await Post.findOne({ where: { id } });
    if (!findPostID) {
      return res.status(404).json({ error: "Пост не найден" });
    }
    const createCommentsForPostID = await Comment.create({
      commenttitle,
      user_id: req.session.userID,
      post_id: findPostID.id,
      parent_id: parent_id || null, // ID родительского комментария или null
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
      include: [{ model: User, attributes: ["name"] }, { model: Post }],
    });
    res.send(findAllCommentForPostID);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findPost = await Comment.findAll({ where: { post_id: id } });
    res.send(findPost);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", checkUsersForComments, async (req, res) => {
  const { id } = req.params;
  const { commenttitle } = req.body;
  try {
    const editCommentsID = await Comment.update(
      { commenttitle },
      { where: { id } }
    );
    res.json(editCommentsID);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", checkUsersForComments, async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
    console.log(`${error} Не получилось удалить комментарий`);
  }
});
export default router;
