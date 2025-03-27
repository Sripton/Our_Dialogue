import express from "express";
import { Commentreaction, Comment } from "../db/models";
const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { reaction_type } = req.body;
  try {
    const userID = req.session.userID;
    // Ищем комментарий под которым хотим поствить  лайк  или дизлайк
    const findCommentID = await Comment.findByPk(id);
    // Проверка, существует ли комментарий  с данным ID
    if (!findCommentID) {
      res.status(404).json({ message: "Комментарий не найден" });
    }
    // Допустимые типы реакций в виде объекта
    const validReactions = {
      like: true,
      dislike: true,
    };
    // Проверка, что тип реакции корректен
    if (!validReactions) {
      res.status(400).json({ message: "Некорректный тип реакции" });
    }

    // Проверка существования взаимодействия от данного пользователя с этим комментарием
    const existingCommentReaction = await Commentreaction.findOne({
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
    const newReaction = await Commentreaction.create({
      user_id: userID,
      comment_id: findCommentID.id,
      reaction_type: reaction_type,
    });
    res.status(201).json(newReaction);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findCommentID = await Comment.findByPk(id);
    if (!findCommentID) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }
    const commentReactions = await Commentreaction.findAll({
      where: {
        comment_id: findCommentID.id,
      },
      attributes: ["id", "comment_id", "reaction_type", "user_id"],
    });
    res.status(200).json(commentReactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const findCommentID = await Comment.findByPk(id);
//     await Commentreacion.destroy({ where: { comment_id: findCommentID.id } });
//     res.status(200).json({ message: "Реакция успешно удалена" }); // Return JSON
//   } catch (error) {
//     console.log(error);
//   }
// });

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userID = req.session.userID;
  try {
    const findCommentID = await Comment.findByPk(id);
    // Удаляем только реакцию текущего пользователя
    const deletedReaction = await Commentreaction.destroy({
      where: {
        user_id: userID,
        comment_id: findCommentID.id,
      },
    });
    if (deletedReaction) {
      return res.status(200).json({ message: "Реакция удалена" });
    }
    res.status(404).json({ message: "Реакция не найдена" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
