import express from "express";
import { Post, Comment, User, Commentreaction } from "../db/models";
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

//  Находим все комментарии и делаем include пользователей
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const findPostID = await Post.findOne({ where: { id } });
//     if (!findPostID) {
//       res.status(404).json({ message: "Пост не найден" });
//     }
//     const findAllCommentForPostID = await Comment.findAll({
//       where: { post_id: findPostID.id },
//       order: [["createdAt", "ASC"]],
//       // include: [{ model: User, attributes: ["name"] }, { model: Post }],\
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//         {
//           model: Comment,
//           as: "ParentComment",
//           include: [
//             {
//               model: User,
//               attributes: ["name"],
//             },
//           ],
//         },
//         {
//           model: Commentreaction,
//           as: "reactions",
//         },
//         {
//           model: Comment,
//           as: "Replies",
//         },
//       ],
//     });
//     res.send(findAllCommentForPostID);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findPostID = await Post.findByPk(id);
    if (!findPostID) return res.status(404).json({ message: "Пост не найден" });

    // comment — это не обычный объект, а экземпляр класса Model Sequelize,
    // внутри которого помимо  полей (id, commenttitle, user_id, ...)
    // есть и служебные свойства и методы, такие как:
    const allComments = await Comment.findAll({
      where: { post_id: findPostID.id },
      order: [["createdAt", "ASC"]],
      include: [{ model: User, attributes: ["name"] }],
    });

    // Преобразуем в plain объекты (без Sequelize-метаданных)
    // подразумеваются дополнительные свойства и методы,
    // которые Sequelize добавляет к каждому экземпляру модели,
    // помимо обычных данных из базы.
    const plainComments = allComments.map((comment) =>
      // comment.get({ plain: true })
      // Возвращает только  “бизнес”-данные
      comment.get({ plain: true })
    );

    // Создаем map всех комментариев по ID
    const commentMap = {};
    plainComments.forEach((comment) => {
      comment.Replies = [];
      commentMap[comment.id] = comment;
    });

    // Строим иерархию
    const rootComments = [];
    plainComments.forEach((comment) => {
      if (comment.parent_id) {
        // если это true
        const parent = commentMap[comment.parent_id];
        if (parent) {
          parent.Replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });
    res.json(rootComments);
  } catch (error) {
    console.log(error);
  }
});
// вручную строим иерархическое дерево
// нужно:
// Получить все комментарии одним запросом.
// На бэке из них вручную собрать иерархию: ответы в Replies.

// router.get("/getreplies/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const findCommentID = await Comment.findOne({ where: { id } });
//     if (!findCommentID) {
//       res.status(404).json({ message: "Комментарий не найден" });
//     }

//     const repliesForComment = await Comment.findAll({
//       where: { parent_id: id },
//       include: [
//         {
//           model: User,
//           attributes: ["name"], // Пользователь, написавший ответ
//         },
//         {
//           model: Comment,
//           as: "ParentComment", // Родительский комментарий
//           include: [
//             {
//               model: User,
//               attributes: ["name"], // Пользователь, написавший родительский комментарий
//             },
//           ],
//         },
//       ],
//     });
//     res.json(repliesForComment);
//   } catch (error) {
//     console.log(error);
//   }
// });

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
  // try {
  //   await Commentreaction.destroy({ where: { comment_id: id } });
  //   await Comment.destroy({ where: { id } });
  //   res.sendStatus(200);
  // } catch (error) {
  //   res.sendStatus(401);
  //   console.log(`${error} Не получилось удалить комментарий`);
  // }
  try {
    await Comment.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(`${error} Не получилось удалить комментарий`);
  }
});
export default router;
