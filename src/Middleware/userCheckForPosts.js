import { Post } from "../db/models";
async function checkUsersForEditingPost(req, res, next) {
  const { id } = req.params;
  const userID = req.session.userID;
  try {
    const currentPost = await Post.findByPk(id);
    if (userID !== currentPost.user_id) {
      return res.sendStatus(403).json({
        message: "Доступ запрещен: вы не являетесь владельцем этого сообщения",
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
}

export default checkUsersForEditingPost;
