import express from "express";
import { Commentreacion, Comment } from "../db/models";
const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { reaction_type } = req.body;
  try {
    const userID = req.session.userID;
    const findCommentID = await Comment.findOne({ where: { id } });
    // Проверка, существует ли комментарий  с данным ID
    if (!findCommentID) {
      res.status(404).json({ message: "Комментарий не найден" });
    }
    // Проверка, что тип реакции корректен
    if (!["like", "dislike"].includes(reaction_type)) {
      res.status(400).json({ message: "Некорректный тип реакции" });
    }
    // Проверка существования взаимодействия от данного пользователя с этим комментарием
    const existingCommentReaction = await Commentreacion.findOne({
      where: {
        user_id: userID,
        comment_id: findCommentID.id,
      },
    });
    if (existingCommentReaction) {
      // Обновление существующего взаимодействия
      existingCommentReaction.reaction_type = reaction_type;
      await existingCommentReaction.save();
      return res.status(200).json(existingCommentReaction);
    }
    // Создание новой записи взаимодействия
    const newReaction = await Commentreacion.create({
      user_id: userID,
      comment_id: findCommentID.id,
      reaction_type: reaction_type,
    });
    res.status(201).json(newReaction);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getlikecomment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findCommentID = await Comment.findByPk(id);
    if (!findCommentID) {
      res.status(404).json({ message: "Комментaрий не найден" });
    }
    const findReactionLike = await Commentreacion.findAll({
      where: {
        comment_id: findCommentID.id,
        reaction_type: "like",
      },
    });
    // Возвращаем количество лайков
    res.json({ count: findReactionLike.length });
  } catch (error) {
    console.error("Ошибка при получении лайков:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Commentreacion.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

export default router;
