import React, { memo, useEffect, useState } from "react";
import Commentform from "../Commentform";

function Singlecomments({
  comment,
  commentMap,
  post,
  setShowReplies,
  setAllComments,
  userIDsession,
  replyCommentID,
  setReplyCommentID,
  handleReplyToCommentID,
}) {
  // --------------------------------------------------------------------
  // Логика для корректного отображения автором комментариев
  // Забираем автора комменатрия к посту непосредственно из comment
  const author = comment?.User?.name;
  // Забираем родителя комменатрия к которму был напиан комментарий
  const parentAuthor =
    comment.parent_id && commentMap[comment.parent_id]?.User?.name;
  // Логика для корректного отображения автором комментариев
  // --------------------------------------------------------------------

  // --------------------------------------------------------------------
  // Логика для изменения и удаления комментариев
  // Состояние для отслеживания по ID какой комменатрий изменяется
  const [editCommentID, setEditCommentID] = useState(null);
  // Состояние для изменения  комменатрия
  const [editCommentsText, setEditCommentsText] = useState({
    commenttitle: "",
  });
  // Функция для отслеживания состояний
  // : editCommentID  - на какой комментарий будет ответ
  // : setEditCommentsText - измененный текст
  const editCommentsHandler = (comment) => {
    setEditCommentID(comment.id);
    setEditCommentsText({ commenttitle: comment.commenttitle });
  };

  const editCommentsInputsHandler = (e) => {
    setEditCommentsText((prevComments) => ({
      ...prevComments,
      [e.target.name]: e.target.value,
    }));
  };
  // Функция  для глубокой обработки рекурсивно измененных комментариев в дереве
  const updateCommentInTree = (comments, updatedComment) => {
    // Пробегаемся по массиву комментарий
    return comments.map((comment) => {
      // если у комментария совпадаеют id с измененным комментарием updatedComment
      if (comment.id === updatedComment.id) {
        // Возвращаем новый объект. Осталвяем старые данные этого комменатрия и изменяем только занчения по ключу commenttitle
        return { ...comment, commenttitle: updatedComment.commenttitle };
      }
      // если комментарий иммеет ключ Replies и Replies не пустой
      if (comment?.Replies && comment?.Replies?.length > 0) {
        // Возвращаем новый объект
        return {
          ...comment,
          // и в занчение по ключу Replies рекурсивно вызываем функцию для обработки массива данных по ключу Replies
          Replies: updateCommentInTree(comment.Replies, updatedComment),
        };
      }
      return comment;
    });
  };
  const editCommentsSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ commenttitle: editCommentsText.commenttitle }),
      });
      if (response.ok) {
        const data = await response.json();
        setAllComments((prevComments) => {
          return updateCommentInTree(prevComments, data);
        });
        setEditCommentID(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentsHandler = async (id) => {
    const response = await fetch(`/api/comments/${id}`, { method: "DELETE" });
    if (response.ok) {
      setAllComments((prevComments) =>
        prevComments.filter((prevComment) => prevComment.id !== id)
      );
    }
  };
  // Логика для изменения и удаления комментариев
  // --------------------------------------------------------------------

  // --------------------------------------------------------------------
  // Логика для создания и получения реакций на комментарии

  
  // На клиенте имеет смысл проверять, была ли уже реакция от пользователя,
  // и менять тип реакции только при необходимости. Это не просто «бонус» — это улучшает:
  // ✅ UI-логику (можно сделать toggle, показывать активное состояние, и т.д.)
  // ✅ UX (интерфейс откликается быстрее, не нужно ждать сервер)
  // ✅ Производительность (меньше ненужных запросов к API)
  // ✅ Чистоту данных (согласованность клиент/сервер)
  const updatedComment = (reactions, userID, commentID, type) => {
    const existingCommentReaction = reactions.find(
      (reaction) => reaction.user_id === userID
    );

    if (existingCommentReaction) {
      return reactions.map((reaction) =>
        reaction.user_id === userID
          ? { ...reaction, reaction_type: type }
          : reaction
      );
    }
    return [
      ...reactions,
      { user_id: userID, comment_id: commentID, reaction_type: type },
    ];
  };

  const updateCommentReactionsInTree = (
    prevComments,
    commentID,
    userID,
    type
  ) => {
    return prevComments.map((prevComment) => {
      if (prevComment.id === commentID) {
        return {
          ...prevComment,
          reactions: updatedComment(
            prevComment.reactions || [],
            userID,
            commentID,
            type
          ),
        };
      }
      if (prevComment.Replies.length > 0) {
        return {
          ...prevComment,
          Replies: updateCommentReactionsInTree(
            prevComment.Replies,
            commentID,
            userID,
            type
          ),
        };
      }
      return prevComment;
    });
  };

  const reactionsCommentSubmit = async (reaction_type) => {
    const responce = await fetch(`/api/likeordislikecomment/${comment.id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ reaction_type }),
    });

    if (responce.ok) {
      setAllComments((prevComments) =>
        updateCommentReactionsInTree(
          prevComments,
          comment.id,
          userIDsession,
          reaction_type
        )
      );
    }
  };

  const likeCount =
    comment?.reactions?.filter((like) => like?.reaction_type === "like")
      .length || 0;
  const dislikeCount =
    comment?.reactions?.filter(
      (dislike) => dislike?.reaction_type === "dislike"
    ).length || 0;

  // Логика для создания и получения реакций на комментарии
  // --------------------------------------------------------------------

  return (
    <div className="comment-for-comment">
      <p className={`comment-text  ${editCommentID ? "editHidden" : ""}`}>
        {comment.commenttitle}
      </p>
      {replyCommentID === comment.id && (
        <Commentform
          post={post}
          setShowReplies={setShowReplies}
          setAllComments={setAllComments}
          replyCommentID={replyCommentID}
          setReplyCommentID={setReplyCommentID}
        />
      )}

      {editCommentID === comment.id && (
        <form onSubmit={editCommentsSubmitHandler}>
          <div id="reply-form-template" className="add-comment">
            <textarea
              name="commenttitle"
              value={editCommentsText.commenttitle}
              onChange={editCommentsInputsHandler}
              placeholder="Write a reply..."
            />
            <button type="submit">Post Comment</button>
          </div>
        </form>
      )}
      <div className="comment-actions">
        <button
          className="like-btn"
          onClick={() => reactionsCommentSubmit("like")}
        >
          <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
          {likeCount}
        </button>

        <button
          className="like-btn"
          onClick={() => reactionsCommentSubmit("dislike")}
        >
          <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
          {dislikeCount}
        </button>

        <button
          className="reply-btn"
          onClick={() => handleReplyToCommentID(comment.id)}
        >
          reply
        </button>
        {userIDsession === comment.user_id && (
          <>
            <button
              className="edit-btn"
              onClick={() => editCommentsHandler(comment)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteCommentsHandler(comment.id)}
            >
              Delete
            </button>
          </>
        )}
        {comment.parent_id === null ? (
          <small className="comment-note">{`${author}  ответил ${post?.User?.name}`}</small>
        ) : (
          <small className="comment-note">{`${author}  ответил ${parentAuthor}`}</small>
        )}
      </div>

      {comment?.Replies && comment?.Replies?.length > 0 && (
        <div className="replies">
          {comment?.Replies?.map((reply) => (
            <Singlecomments
              key={reply.id}
              comment={reply}
              commentMap={commentMap}
              post={post}
              setShowReplies={setShowReplies}
              setAllComments={setAllComments}
              userIDsession={userIDsession}
              replyCommentID={replyCommentID}
              setReplyCommentID={setReplyCommentID}
              handleReplyToCommentID={handleReplyToCommentID}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Тестирование 1
// function areEqualSinglecomments(prevProps, nextProps) {
//   console.log("comment", prevProps.comment === nextProps.comment); // true
//   console.log("commentMap", prevProps.commentMap === nextProps.commentMap); // true
//   console.log("post", prevProps.post === nextProps.post); // true
//   console.log("setAllComments", prevProps.setAllComments === nextProps.setAllComments); // true
//   console.log("userIDsession", prevProps.userIDsession === nextProps.userIDsession);// true
//   console.log("replyCommentID", prevProps.replyCommentID === nextProps.replyCommentID); // false
//   console.log("setReplyCommentID", prevProps.setReplyCommentID === nextProps.setReplyCommentID); // true
//   console.log("handleReplyToCommentID", prevProps.handleReplyToCommentID === nextProps.handleReplyToCommentID); // true
// }

// 🔍 Что происходит?
// Компонент Singlecomments перерисовывается, потому что изменился проп replyCommentID. Это нормально — ведь
//  replyCommentID хранится в Postcard,
// и при клике по кнопке reply вызыввается: handleReplyToCommentID(comment.id);
// А значит:
// replyCommentID в Postcard обновляется,
// и этот replyCommentID передаётся всем Singlecomments — включая те, к которым не относится ответ.
// ❌ Проблема
// 💥 Все Singlecomments получают новый replyCommentID,
// и React.memo срабатывает только по полному сравнению (!==),
//  из-за чего перерендеривается даже тот комментарий, который не должен.

// function areEqualSinglecomments(prevProps, nextProps) {
//   console.log("prevProps.replyCommentID", prevProps.replyCommentID); // null
//   console.log("nextProps.replyCommentID", nextProps.replyCommentID); 4
// }

// Тестирование 2
// ✅ Решение — сравнивать точечно, влияет ли replyCommentID на данный комментарий:
// function areEqualSinglecomments(prevProps, nextProps) {
//   console.log("prevProps.replyCommentID", prevProps.replyCommentID);// null
//   console.log("prevProps.comment.id", prevProps.comment.id); // 4
//   console.log("nextProps.replyCommentID", nextProps.replyCommentID); // 4
//   console.log("nextProps.comment.id", nextProps.comment.id); // 4
// }
// 🔍 Разбор логов
// Получаем два вызова areEqualSinglecomments:

// 🔁 1. Комментарий с id === 4:
// prevProps.replyCommentID null
// prevProps.comment.id 4
// nextProps.replyCommentID 4
// nextProps.comment.id 4
// ➡️ Это тот самый комментарий, на который пользователь нажал "reply" → форма должна появиться, компонент должен перерендериться ✅

// 🔁 2. Комментарий с id === 5:
// prevProps.replyCommentID null
// prevProps.comment.id 5
// nextProps.replyCommentID 4
// nextProps.comment.id 5
// ➡️ Этот комментарий не должен быть затронут, форма под ним не появлялась и не исчезала → перерендер НЕ нужен ❌

// Тестирование 3
// 🔥 Проблема: логика areEqualSinglecomments работает для первого уровня комментариев, но вложенные Replies перерисовываются лишний раз, даже если на них не нажимали "reply".
// function areEqualSinglecomments(prevProps, nextProps) {
//   const isCurrentReply = prevProps.replyCommentID === prevProps.comment.id;
//   const isNextReply = nextProps.replyCommentID === nextProps.comment.id;
//   const replyAffectsThisComment = isCurrentReply !== isNextReply;

//   return (
//     !replyAffectsThisComment &&
//     prevProps.comment === nextProps.comment &&
//     prevProps.userIDsession === nextProps.userIDsession &&
//     prevProps.setAllComments === nextProps.setAllComments
//   );
// }

function areEqualSinglecomments(prevProps, nextProps) {
  const isReplyTarget = (comment, replyID) => {
    if (!comment) return false;
    if (comment.id === replyID) return true;
    if (!comment.Replies) return false;
    return comment.Replies.some((child) => isReplyTarget(child, replyID));
  };

  const affectedBefore = isReplyTarget(
    prevProps.comment,
    prevProps.replyCommentID
  );
  const affectedAfter = isReplyTarget(
    nextProps.comment,
    nextProps.replyCommentID
  );
  const replyChanged = affectedBefore !== affectedAfter;
  return (
    !replyChanged &&
    prevProps.comment === nextProps.comment &&
    prevProps.userIDsession === nextProps.userIDsession &&
    prevProps.setAllComments === nextProps.setAllComments
  );
}
export default memo(Singlecomments, areEqualSinglecomments);
