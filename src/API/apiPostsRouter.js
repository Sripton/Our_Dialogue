import express from "express";
import { Subject, Post, User, Comment, Postreaction } from "../db/models";
import checkUsersForPost from "../Middleware/userCheckForPosts";
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
      include: [
        { model: User, attributes: ["name"] },
        { model: Subject, attributes: ["subjectName"] },
      ],
    });
    res.send(findAllPosts);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", checkUsersForPost, async (req, res) => {
  const { id } = req.params;
  const { posttitle } = req.body;
  try {
    const editPostID = await Post.update({ posttitle }, { where: { id } });
    res.json(editPostID);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", checkUsersForPost, async (req, res) => {
  const { id } = req.params;
  try {
    // Удаляем связанные комментарии
    await Comment.destroy({ where: { post_id: id } });
    // Удаляем реакции
    await Postreaction.destroy({ where: { post_id: id } });
    // Удаляем сам пост
    await Post.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

export default router;
