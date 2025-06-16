import express, { raw, group } from "express";
import { Op } from "sequelize";
import {
  User,
  Post,
  Postreaction,
  Comment,
  Commentreaction,
  sequelize,
} from "../db/models";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { login, password, name } = req.body;
  try {
    // Проверяем, существует ли пользователь с таким логином
    const existingUser = await User.findOne({ where: { login } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким логином уже существует" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      login,
      password: hashPassword,
      name,
    });

    req.session.userID = createUser.id;
    req.session.userName = createUser.name;
    res.json({
      userID: createUser.id,
      userName: createUser.name,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  const { login, password } = req.body;
  try {
    const findUserLogin = await User.findOne({ where: { login } });
    const compareUser = await bcrypt.compare(password, findUserLogin.password);
    if (compareUser) {
      req.session.userID = findUserLogin.id;
      req.session.userName = findUserLogin.name;
      res.json({ userID: findUserLogin.id, userName: findUserLogin.name });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/useractivity/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     // --------------------------------------------------------
//     // Логика для подсчета ко-ва ответов на посты и комментарии
//     // Получить все post_id, где user = id
//     const userPostsForComments = await Post.findAll({
//       where: { user_id: id },
//       attributes: ["id"],
//     });
//     const userPostsID = userPostsForComments.map((post) => post.id);

//     // Получить все comment_id, которые написал Эльмар
//     const userCommentsForComments = await Comment.findAll({
//       where: { user_id: id },
//       attributes: ["id"],
//     });
//     const userCommentsID = userCommentsForComments.map((comment) => comment.id);

//     // Комментарии к его постам (первого уровня)
//     const commentOnPostCount = await Comment.count({
//       where: { post_id: { [Op.in]: userPostsID }, parent_id: null }, // 2
//     });

//     // Ответы на его комментарии
//     const repliesToUserCommentsCount = await Comment.count({
//       where: { parent_id: { [Op.in]: userCommentsID } },
//     });
//     const totalReply = commentOnPostCount + repliesToUserCommentsCount;

//     // Для аналитики:
//     // 🔘 Комментарии к постам: 2
//     // 🔘 Ответы на комментарии: 5
//     // 🔘 Всего: 7
//     // res.json({
//     //   replies: total,
//     //   commentOnPostCount,
//     //   repliesToUserCommentsCount,
//     // });
//     // Логика для подсчета ко-ва ответов на посты и комментарии
//     // --------------------------------------------------------

//     // res.json(findAllComments);

//     const userPostForPostreactions = await Post.findAll({
//       where: { user_id: id },
//       include: [{ model: Postreaction, as: "Postreactions" }],
//     });
//     const userPostForPostreactionsID = userPostForPostreactions.map(
//       (reaction) => reaction.Postreactions.length
//     );

//     const userCommentForPostreactions = await Comment.findAll({
//       where: { user_id: id },
//       include: [{ model: Commentreaction, as: "reactions" }],
//     });

//     const userCommentForPostreactionsID = userCommentForPostreactions.map(
//       (reaction) => reaction.reactions.length
//     );
//     const totalReactions =
//       +userPostForPostreactionsID + +userCommentForPostreactionsID;

//     res.json({
//       replies: totalReply,
//       reactions: totalReactions,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/useractivity/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // -----------------------------------------------------------------------
    // Логика для получения ко-ва ответов на посты и комменатрии пользователя

    // 🔹 Получить ID постов пользователя
    const userPosts = await Post.findAll({
      where: { user_id: id },
      attributes: ["id"],
      raw: true, // raw: true — убирает "обёртку" Sequelize и возвращает обычные объекты JS
    });
    const userPostsID = userPosts.map((post) => post.id);

    // 🔹 Получить ID комментариев пользователя
    const userComments = await Comment.findAll({
      where: { user_id: id },
      attributes: ["id"],
      raw: true,
    });
    const userCommentsID = userComments.map((comment) => comment.id);

    // 🔹 Кол-во комментариев к постам пользователя (первого уровня)
    const commentOnPostCount = await Comment.count({
      where: { post_id: { [Op.in]: userPostsID }, parent_id: null },
    });

    // 🔹 Кол-во ответов на комментарии пользователя
    const repliesToUserCommentsCount = await Comment.count({
      where: { parent_id: { [Op.in]: userCommentsID } },
    });
    const totalReply = commentOnPostCount + repliesToUserCommentsCount;
    // Логика для получения ко-ва ответов на посты и комменатрии пользователя
    // -----------------------------------------------------------------------

    // -----------------------------------------------------------------------
    // Логика для получения ко-ва реакций на посты и комменатрии пользователя

    // 🔹 Получить реакции на посты пользователя (через include)
    const userPostsWithReactions = await Post.findAll({
      where: { user_id: id },
      include: [{ model: Postreaction, as: "Postreactions", attributes: [] }],
      attributes: [
        "id",
        [
          sequelize.fn("COUNT", sequelize.col("Postreactions.id")),
          "reactionCount",
        ],
      ],
      group: ["Post.id"],
      raw: true,
    });

    const postReactionsCount = userPostsWithReactions.reduce(
      (sum, reaction) => sum + Number(reaction.reactionCount),
      0
    );

    // 🔹 Получить реакции на комментарии пользователя
    const userCommentsWithReactions = await Comment.findAll({
      where: { user_id: id },
      include: [{ model: Commentreaction, as: "reactions", attributes: [] }],
      attributes: [
        "id",
        [sequelize.fn("COUNT", sequelize.col("reactions.id")), "reactions"],
      ],
      group: ["Comment.id"],
      raw: true,
    });

    const commentReactionsCount = userCommentsWithReactions.reduce(
      (sum, reaction) => sum + Number(reaction.reactions),
      0
    );

    const totalReactions = postReactionsCount + commentReactionsCount;

    // Логика для получения ко-ва реакций на посты и комменатрии пользователя
    // -----------------------------------------------------------------------
    res.json({
      replies: totalReply,
      reactions: totalReactions,
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;
