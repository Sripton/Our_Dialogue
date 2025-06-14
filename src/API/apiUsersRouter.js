import express from "express";
import { Op } from "sequelize";
import {
  User,
  Post,
  Postreaction,
  Comment,
  Commentreactions,
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

router.get("/useractivity/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Получить все post_id, где user — это Эльмар
    const userPosts = await Post.findAll({
      where: { user_id: id },
      attributes: ["id"],
    });
    const userPostsID = userPosts.map((post) => post.id);

    // Получить все comment_id, которые написал Эльмар
    const userComments = await Comment.findAll({
      where: { user_id: id },
      attributes: ["id"],
    });
    const userCommentsID = userComments.map((comment) => comment.id);

    // Комментарии к его постам (первого уровня)
    const commentOnPostCount = await Comment.count({
      where: { post_id: { [Op.in]: userPostsID }, parent_id: null }, // 2
    });

    // Ответы на его комментарии
    const repliesToUserCommentsCount = await Comment.count({
      where: { parent_id: { [Op.in]: userCommentsID } },
    });

    const total = commentOnPostCount + repliesToUserCommentsCount;

    // Для аналитики:
    // 🔘 Комментарии к постам: 2
    // 🔘 Ответы на комментарии: 5
    // 🔘 Всего: 7
    res.json({
      replies: total,
      commentOnPostCount,
      repliesToUserCommentsCount,
    });
  } catch (error) {
    console.log(error);
  }
});
  
export default router;
