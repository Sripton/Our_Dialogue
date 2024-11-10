import { Comment } from "../db/models";
async function checkUsersForComments(req, res, next) {
  const { id } = req.params;
  const userID = req.session.userID;
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.sendStatus(404).json({ message: "Комментарий не найден" });
    }
    if (userID !== comment.user_id) {
      return res.sendStatus(403).json({
        message:
          "Доступ запрещен: вы не являетесь владельцем этого комментария",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
}

export default checkUsersForComments;
