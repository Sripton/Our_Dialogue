import express from "express";
import { Post, Comment, User } from "../db/models";

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
      include: { model: User },
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

router.put("/:id", async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    await Comment.destroy({where: {id}});
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401)
    console.log(`${error} Не получилось удалить комментарий` );
  }
})
export default router;
