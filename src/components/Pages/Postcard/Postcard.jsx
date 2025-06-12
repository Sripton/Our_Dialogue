import React, { useState, useEffect, memo, useCallback } from "react";
import CommentSection from "../CommentSection/CommentSection";
import Commentform from "../Commentform";
function Postcard({
  post,
  setPosts,
  userIDsession,
  deletePostHandler,
  userNameSession,
}) {
  const [isDotsActive, setIsDotsActive] = useState(false);
  const handleDots = () => {
    setIsDotsActive(!isDotsActive);
  };

  // Для отображения формы ответов на посты и комментарии
  const [isShowReplies, setShowReplies] = useState(false);
  const handleShowReplies = () => {
    setShowReplies(!isShowReplies);
  };

  const [isEditPostActive, setIsEditPostActive] = useState(false);
  const [editPostText, setEditPostText] = useState({
    posttitle: "",
  });
  const handleEditActive = () => {
    setIsEditPostActive(!isEditPostActive);
    setEditPostText(post.posttitle);
  };
  const handleEditPostText = (e) => {
    setEditPostText(e.target.value);
  };

  const submitEditPostHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ posttitle: editPostText }),
    });
    if (responce.ok) {
      setIsEditPostActive(false);
      post.posttitle = editPostText;
    }
  };
  // const [likePosts, setLikePosts] = useState([]);
  // const [dislikePosts, setDislikePosts] = useState([]);

  // Не использовать состояние
  // post.Postreactions инициализируются только один раз — при первом рендере.
  //   Кликаешь "like" → отправляешь POST или DELETE на сервер,
  // Но локальный reactionPosts не обновляется (или обновляется некорректно),
  // Следующий вызов submitReactionPost проверяет устаревшие данные.
  // const [reactionPosts, setReationPosts] = useState(post.Postreactions || []);

  const submitReactionPost = async (reaction_type) => {
    const isLike = post.Postreactions?.some(
      (reaction) =>
        reaction.user_id === userIDsession && reaction.reaction_type === "like"
    );
    const isDislike = post.Postreactions?.some(
      (reaction) =>
        reaction.user_id === userIDsession &&
        reaction.reaction_type === "dislike"
    );

    try {
      if (
        (reaction_type === "like" && isLike) ||
        (reaction_type === "dislike" && isDislike)
      ) {
        const responseDelete = await fetch(`/api/postreactions/${post.id}`, {
          method: "DELETE",
        });
        console.log("responseDelete", responseDelete);
        if (responseDelete.ok) {
          setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
              prevPost.id === post.id
                ? {
                    ...prevPost,
                    Postreactions: prevPost.Postreactions.filter(
                      (reaction) => reaction.user_id !== userIDsession
                    ),
                  }
                : prevPost
            )
          );
        }
        return;
      }
      const response = await fetch(`/api/postreactions/${post.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ reaction_type }),
      });
      if (response.ok) {
        // проблема реакция не обновляется а сохраняется новая реакция
        // setPosts((prevPosts) =>
        // prevPosts.map((prevPost) =>
        // prevPost.id === post.id ?
        // {...prevPost, Postreactions: [...prevPost.Postreactions, {user_id: userIDsession, post_id: post.id, reaction_type: reaction_type}]} : prevPost
        // ))

        // Решение
        const newReaction = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost.id === post.id
              ? {
                  ...prevPost,
                  Postreactions: [
                    ...prevPost.Postreactions.filter(
                      (reaction) => reaction.user_id !== userIDsession
                    ),
                    newReaction,
                  ],
                }
              : prevPost
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Для отображения количества лайков под каждым постом
  const likesPost =
    post.Postreactions?.filter((like) => like.reaction_type === "like")
      .length || 0;

  // Для отображения количества дизлайков под каждым постом
  const dislikesPost =
    post.Postreactions?.filter((dislike) => dislike.reaction_type === "dislike")
      .length || 0;

  // Получаем все комментарии с сервера
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${post.id}`)
      .then((res) => res.json())
      .then((data) => setAllComments(data))
      .catch((err) => console.log(err));
  }, [post.id]);

  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => setShowComments(!showComments);

  // Хук состояния для хранения ID комментария, на который сейчас отвечают
  const [replyCommentID, setReplyCommentID] = useState(null);

  // Обработчик клика по кнопке "Reply" — устанавливает или сбрасывает ID родительского комментария
  const handleReplyToCommentID = useCallback((commentID) => {
    setReplyCommentID((prevID) => (prevID === commentID ? null : commentID));
  }, []); // [] в зависимостях означает, что handleReplyToCommentID будет создан один раз, и его ссылка будет стабильной — идеально для передачи в memo-компоненты.

  // Рекурсинвый подсчет вложенных комменатриев комментариев
  const countAllComments = (comments) => {
    let count = 0;
    const countRecursive = (commentList) => {
      for (let comment of commentList) {
        count++;
        if (comment.Replies && comment.Replies.length > 0) {
          countRecursive(comment.Replies);
        }
      }
    };
    countRecursive(comments);
    return count;
  };

  // const submitReactionPost = async (post_id, reaction_type) => {
  //   // проверяем есть ли реакция от пользователя на пост
  //   const isLike = likePosts.some((like) => like.user_id === userIDsession);
  //   const isDislike = dislikePosts.some(
  //     (dislike) => dislike.user_id === userIDsession
  //   );
  //   try {
  //     // если тип реакции like и пользователь уже ставил like
  //     if (reaction_type === "like" && isLike) {
  //       // удаляем like локально
  //       setLikePosts((prevLikes) =>
  //         prevLikes.filter((like) => like.user_id !== userIDsession)
  //       );
  //       // Отправляем DELETE-запрос на сервер для удаления лайка
  //       await fetch(
  //         // DELETE-запрос с body НЕ поддерживается во всех браузерах!
  //         // Решение 1 (надёжный способ) — передавать user_id в query-параметрах или в params
  //         `/api/likeordislikepost/${post_id}?user_id=${userIDsession}`,
  //         {
  //           method: "DELETE",
  //           // Некоторые реализации fetch просто игнорируют тело у DELETE, и на бэке оно будет undefined
  //           // headers: { "Content-type": "application/json" },
  //           // body: JSON.stringify({ user_id: userIDsession }),
  //         }
  //       );
  //     } else if (reaction_type === "dislike" && isDislike) {
  //       // удаляем dislike локально
  //       setDislikePosts((prevDislike) =>
  //         prevDislike.filter((dislike) => dislike.user_id !== userIDsession)
  //       );
  //       await fetch(
  //         // DELETE-запрос с body НЕ поддерживается во всех браузерах!
  //         // Решение 1 (надёжный способ) — передавать user_id в query-параметрах или в params
  //         `/api/likeordislikepost/${post_id}?user_id=${userIDsession}`,
  //         {
  //           method: "DELETE",
  //           // Некоторые реализации fetch просто игнорируют тело у DELETE, и на бэке оно будет undefined
  //           // headers: { "Content-type": "application/json" },
  //           // body: JSON.stringify({ user_id: userIDsession }),
  //         }
  //       );
  //     } else {
  //       // Если реакции нет, добавляем её
  //       const response = await fetch(`/api/likeordislikepost/${post_id}`, {
  //         method: "POST",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify({
  //           reaction_type: reaction_type,
  //           user_id: userIDsession,
  //         }),
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         if (reaction_type === "like") {
  //           setLikePosts((prevLike) => [...prevLike, data]);
  //           setDislikePosts((prevDislike) =>
  //             prevDislike.filter((dislike) => dislike.user_id !== userIDsession)
  //           );
  //         } else if (reaction_type === "dislike") {
  //           setDislikePosts((prevDislike) => [...prevDislike, data]);
  //           setLikePosts((prevLike) =>
  //             prevLike.filter((like) => like.user_id !== userIDsession)
  //           );
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetch(`/api/likeordislikepost/getLikes/${post.id}`, { method: "GET" })
  //     .then((res) => res.json())
  //     .then((data) => setLikePosts(data))
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   fetch(`/api/likeordislikepost/getDislikes/${post.id}`, { method: "GET" })
  //     .then((res) => res.json())
  //     .then((data) => setDislikePosts(data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <div className={`comment-section ${isDotsActive ? "show-actions" : ""}`}>
        <div className="comment-list">
          <div className="comment">
            {isEditPostActive ? (
              <form onSubmit={submitEditPostHandler}>
                <textarea
                  name="posttitle"
                  value={editPostText}
                  onChange={handleEditPostText}
                  placeholder="Edit your post..."
                />
                <button className="edit-post-btn" type="submit">
                  Измененить
                </button>
              </form>
            ) : (
              <p className="comment-text">{`${post.posttitle}`}</p>
            )}

            <div className="comment-actions">
              <button
                className="like-btn"
                // onClick={() => submitReactionPost(post.id, "like")}
                onClick={() => submitReactionPost("like")}
              >
                <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
                {/* {likePosts.length} */}
                {likesPost}
              </button>
              <button
                className="dislike-btn"
                // onClick={() => submitReactionPost(post.id, "dislike")}
                onClick={() => submitReactionPost("dislike")}
              >
                <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
                {/* {dislikePosts.length} */}
                {dislikesPost}
              </button>
              <button className="reply-btn" onClick={handleShowReplies}>
                reply
              </button>
              {/* Логика для отображения кнопок edit и delete если пользоваель зарегистрирован */}
              {userIDsession !== post.user_id ? (
                ""
              ) : (
                <>
                  <button className="edit-btn" onClick={handleEditActive}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deletePostHandler(post.id)}
                  >
                    Delete
                  </button>
                </>
              )}
              {/* Логика для отображения кнопок edit и delete если пользоваель зарегистрирован */}

              <small className="comment-note">
                {post?.User?.name}, {"к теме"} ({post?.Subject?.subjectName})
              </small>
            </div>
            <div className="dots" onClick={handleDots}>
              &#x2022;&#x2022;&#x2022;
            </div>
            <div className="close-btn hidden" onClick={handleDots}>
              &#10006;
            </div>
            <div className="replies">
              {/* Логика для отображения формы для создания комментария */}
              {isShowReplies && (
                <Commentform
                  post={post}
                  setShowReplies={setShowReplies}
                  setAllComments={setAllComments}
                  replyCommentID={replyCommentID}
                  setReplyCommentID={setReplyCommentID}
                />
              )}

              <button
                className="toggle-comments-btn"
                onClick={handleShowComments}
              >
                {showComments
                  ? `Скрыть`
                  : `Комментарии  ${countAllComments(allComments)}`}
              </button>
              {showComments && (
                <CommentSection
                  post={post}
                  setShowReplies={setShowReplies}
                  setAllComments={setAllComments}
                  allComments={allComments}
                  userIDsession={userIDsession}
                  handleShowReplies={handleShowReplies}
                  replyCommentID={replyCommentID}
                  setReplyCommentID={setReplyCommentID}
                  handleReplyToCommentID={handleReplyToCommentID}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function areEqual(prevProps, nextProps) {
  return (
    prevProps.post.id === nextProps.post.id &&
    prevProps.post === nextProps.post &&
    prevProps.userIDsession === nextProps.userIDsession &&
    prevProps.userNameSession === nextProps.userNameSession &&
    prevProps.deletePostHandler === nextProps.deletePostHandler
  );
}

export default memo(Postcard, areEqual);
