import express from "express";
import { Post, Postreaction } from "../db/models";
const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { reaction_type } = req.body;
  try {
    const userID = req.session.userID;

    // Проверка, существует ли пост с данным ID
    const findPostID = await Post.findOne({ where: { id } });
    if (!findPostID) {
      res.status(404).json({ message: "Пост не найден" });
    }

    // Проверка, что тип реакции корректен
    if (!["like", "dislike"].includes(reaction_type)) {
      res.status(400).json({ message: "Некорректный тип реакции" });
    }

    // Проверка существования взаимодействия от данного пользователя с этим постом
    const existingPostReaction = await Postreaction.findOne({
      where: {
        user_id: userID,
        post_id: findPostID.id,
      },
    });
    if (existingPostReaction) {
      // Обновление существующего взаимодействия
      existingPostReaction.reaction_type = reaction_type;
      await existingPostReaction.save();
      return res.status(200).json(existingPostReaction);
    }
    // Создание новой записи взаимодействия
    const newReaction = await Postreaction.create({
      user_id: userID,
      post_id: findPostID.id,
      reaction_type: reaction_type,
    });
    res.status(201).json(newReaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Произошла ошибка при создании реакции" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findPostID = await Post.findOne({ where: { id } });
    const allPostReaction = await Postreaction.findAll({
      where: { post_id: findPostID.id },
    });
    res.status(200).json(allPostReaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Произошла ошибка при отправке реакций" });
  }
});
export default router;