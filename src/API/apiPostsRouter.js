import express from "express";
import { Subject, Post, User, Comment } from "../db/models";

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findSubjectID = await Subject.findOne({ where: { id } });
    const findAllPosts = await Post.findAll({
      where: { subject_id: findSubjectID.id },
      include: [{ model: User }, { model: Subject }],
    });
    res.send(findAllPosts);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { posttitle } = req.body;
  try {
    const editPostID = await Post.update({ posttitle }, { where: { id } });
    res.json(editPostID);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Удаляем связанные комментарии
    await Comment.destroy({ where: { post_id: id } });
    // Удаляем сам пост
    await Post.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

export default router;
