import { Post } from "../db/models";
async function checkUsersForPost(req, res, next) {
  const { id } = req.params;
  const userID = req.session.userID;
  try {
    const currentPost = await Post.findByPk(id);

    if (!currentPost) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    if (userID !== currentPost.user_id) {
      return res.status(403).json({
        message: "Доступ запрещен: вы не являетесь владельцем этого сообщения",
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
}

export default checkUsersForPost;
