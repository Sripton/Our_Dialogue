import React, { useState, useEffect } from "react";

export default function Postcard({
  post,
  id,
  userIDsession,
  deletePostHandler,
  userNameSession,
}) {
  const [isDotsActive, setIsDotsActive] = useState(false);
  const [isShowReplies, setShowReplies] = useState(false);
  const [textArea, setTextArea] = useState({
    commenttitle: "",
  });
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isEditPostActive, setIsEditPostActive] = useState(false);
  const [editPostText, setEditPostText] = useState({
    posttitle: "",
  });
  const [editCommentID, setEditCommentID] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  // Изменение состояния  likesComment и  dislikesComment
  const [likesComment, setLikesComment] = useState({});
  const [dislikesComment, setDislikesComment] = useState({});
  const [replyToCommentID, setReplyToCommentID] = useState(null); // Для отслеживания, на какой комментарий отвечают

  const handleDots = () => {
    setIsDotsActive(!isDotsActive);
  };
  const handleShowReplies = () => {
    setShowReplies(!isShowReplies);
  };

  const handleComments = (e) => {
    setTextArea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const handleEditActive = () => {
    setIsEditPostActive(!isEditPostActive);
    setEditPostText(post.posttitle);
  };
  const handleEditPostText = (e) => {
    setEditPostText(e.target.value);
  };

  const handlerEditComments = (comment) => {
    setEditCommentID(comment.id);
    setEditCommentText(comment.commenttitle);
  };

  const handlerEditCommentTextChange = (e) => {
    setEditCommentText(e.target.value);
  };

  const handleReplyComment = (commentID) => {
    setReplyToCommentID(commentID === replyToCommentID ? null : commentID);
  };

  // const submitCommentsHandler = async (e) => {
  //   e.preventDefault();
  //   // Ошибка Cannot read properties of undefined (reading 'trim') возникает,
  //   // потому что свойство commenttitle в объекте textArea может быть неопределено в момент выполнения кода.
  //   // Это может произойти, если textArea не инициализирован должным образом или изменяется в процессе работы.
  //   // одно из решений if(!textArea.commenttitle || !textArea.commenttitle.trim())

  //   if (!textArea.commenttitle.trim()) {
  //     setTextArea({ commenttitle: "" });
  //     setShowReplies(false);
  //     return; // Завершаем функцию, не отправляя запрос
  //   }
  //   const responce = await fetch(`/api/comments/${id}`, {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ commenttitle: textArea.commenttitle }),
  //   });
  //   if (responce.ok) {
  //     const data = await responce.json();
  //     // setComments(Array.isArray(data) ? data : []);

  //     // Добавить объект User в комментарий, если он не возвращается с сервера
  //     const newComment = {
  //       ...data,
  //       User: {
  //         name: userNameSession,
  //       },
  //     };
  //     setComments((prevComments) => [...prevComments, newComment]);
  //     setTextArea({ commenttitle: "" });
  //     setShowReplies(false);
  //   }
  // };

  //Синхронизация с сервером после отправки
  // После добавления нового комментария можно выполнить дополнительный
  // запрос к серверу, чтобы получить актуальный список комментариев и обновить
  //состояние comments:
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${id}`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setComments(data); // Устанавливаем полную структуру комментариев из сервера
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Обновленная версия функции submitCommentsHandler
  const submitCommentsHandler = async (e, parentId = null) => {
    e.preventDefault();
    if (!textArea.commenttitle.trim()) {
      setTextArea({ commenttitle: "" });
      setReplyToCommentID(null);
      return; // Завершаем функцию, не отправляя запроc
    }

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          commenttitle: textArea.commenttitle,
          parent_id: parentId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // Добавляем объект User, если он не возвращается с сервера
        const formattedComment = {
          ...data,
          User: {
            name: userNameSession,
          },
          parent_id: replyToCommentID,
        };
        // Если это ответ, добавляем его в соответствующий комментарий
        if (parentId) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === replyToCommentID
                ? {
                    ...comment,
                    Replies: [...(comment.Replies || []), formattedComment],
                  }
                : comment
            )
          );
        } else {
          // Если это корневой комментарий, добавляем его в список
          setComments((prevComments) => [...prevComments, formattedComment]);
        }
        await fetchComments(); // // Обновляем комментарии из сервера
        setTextArea({ commenttitle: "" });
        setReplyToCommentID(null); // Закрываем форму
        setShowReplies(false);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
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

  const submitEditCommentHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/comments/${editCommentID}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ commenttitle: editCommentText }),
    });
    if (responce.ok) {
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          return comment.id === editCommentID
            ? { ...comment, commenttitle: editCommentText }
            : comment;
        });
      });
      setEditCommentID("");
      setEditCommentText("");
    }
  };
  const submitLikeOrDislikePost = async (reactionType) => {
    // Проверяем, поставил ли пользователь лайк или дизлайк
    const isLiked = likes.some((like) => like.user_id === userIDsession);
    const isDisliked = dislikes.some(
      (dislike) => dislike.user_id === userIDsession
    );

    if (reactionType === "like" && isLiked) {
      // Если уже есть лайк, то снимаем лайк
      const response = await fetch(`/api/likeordislikepost/${post.id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user_id: userIDsession }),
      });
      if (response.ok) {
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like.user_id !== userIDsession)
        );
      }
    } else if (reactionType === "dislike" && isDisliked) {
      // Если уже есть дизлайк, то снимаем  дизлайк
      const response = await fetch(`/api/likeordislikepost/${post.id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user_id: userIDsession }),
      });
      if (response.ok) {
        setDislikes((prevDislikes) =>
          prevDislikes.filter((dislike) => dislike.user_id !== userIDsession)
        );
      }
    } else {
      // Если лайк или дизлайк еще не поставлен
      const response = await fetch(`/api/likeordislikepost/${post.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          reaction_type: reactionType,
          user_id: userIDsession,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (reactionType === "like") {
          setLikes((prevLike) => [...prevLike, data]);
          setDislikes((prevDislikes) =>
            prevDislikes.filter((dislike) => dislike.user_id !== userIDsession)
          );
        } else if (reactionType === "dislike") {
          setDislikes((prevDislikes) => [...prevDislikes, data]);
          setLikes((prevLikes) =>
            prevLikes.filter((like) => like.user_id !== userIDsession)
          );
        }
      }
    }
  };

  // const submitLikeOrDislikeComments = async (commentID, reactionType) => {
  //   // Проверяем, поставил ли пользователь лайк или дизлайк
  //   // const isLiked = likesComment.some((like) => like.user_id === userIDsession);
  //   // const isDisliked = dislikesComment.some(
  //   //   (dislike) => dislike.user_id === userIDsession
  //   // );

  //   const isLiked = likesComment[commentID] > 0;
  //   const isDisliked = dislikesComment[commentID] > 0;
  //   if (reactionType === "like" && isLiked) {
  //     // Если уже есть лайк, то снимаем лайк
  //     const response = await fetch(`/api/likeordislikecomment/${commentID}`, {
  //       method: "DELETE",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({ user_id: userIDsession }),
  //     });
  //     if (response.ok) {
  //       setLikesComment((prevLikes) =>
  //         prevLikes.filter((like) => like.user_id !== userIDsession)
  //       );
  //     }
  //   } else if (reactionType === "dislike" && isDisliked) {
  //     // Если уже есть дизлайк, то снимаем  дизлайк
  //     const response = await fetch(`/api/likeordislikecomment/${commentID}`, {
  //       method: "DELETE",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({ user_id: userIDsession }),
  //     });
  //     if (response.ok) {
  //       setDislikesComment((prevDislikes) =>
  //         prevDislikes.filter((dislike) => dislike.user_id !== userIDsession)
  //       );
  //     }
  //   } else {
  //     // Если лайк или дизлайк еще не поставлен
  //     const response = await fetch(`/api/likeordislikecomment/${commentID}`, {
  //       method: "POST",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({
  //         reaction_type: reactionType,
  //         user_id: userIDsession,
  //       }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       if (reactionType === "like") {
  //         setLikesComment((prevLikes) => [...prevLikes, data]);
  //         setDislikesComment((prevDislikes) =>
  //           prevDislikes.filter(
  //             (dislikes) => dislikes.user_id !== userIDsession
  //           )
  //         );
  //       } else if (reactionType === "dislike") {
  //         setDislikesComment((prevDislikes) => [...prevDislikes, data]);
  //         setLikesComment((prevLikes) =>
  //           prevLikes.filter((like) => like.user_id !== userIDsession)
  //         );
  //       }
  //     }
  //   }
  // };

  // функция submitLikeOrDislikeComments после изменения состояния likesComment и  dislikesComment
  const submitLikeOrDislikeComments = async (commentID, reactionType) => {
    // Проверяем, поставил ли пользователь лайк или дизлайк
    const isLiked = likesComment[commentID] > 0;
    const isDisliked = likesComment[commentID] > 0;

    if (reactionType === "like" && isLiked) {
      const response = await fetch(`/api/likeordislikecomment/${commentID}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user_id: userIDsession }),
      });
      if (response.ok) {
        setLikesComment((prevLikes) => ({
          ...prevLikes,
          [commentID]: Math.max((prevLikes[commentID] || 1) - 1, 0), // Уменьшаем лайки, не ниже 0
        }));
      }
    } else if (reactionType === "dislike" && isDisliked) {
      const response = await fetch(`/api/likeordislikecomment/${commentID}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user_id: userIDsession }),
      });
      if (response.ok) {
        setDislikesComment((prevDislike) => ({
          ...prevDislike,
          [commentID]: Math.max((prevDislike[commentID] || 1) - 1, 0), // Уменьшаем дизлайки, не ниже 0
        }));
      }
    } else {
      // Добавление лайка или дизлайка
      const response = await fetch(`/api/likeordislikecomment/${commentID}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          reaction_type: reactionType,
          user_id: userIDsession,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (reactionType === "like") {
          // Обновляем количество лайков, используя данные с сервера
          setLikesComment((prevLikes) => ({
            ...prevLikes,
            [commentID]: data.count || (prevLikes[commentID] || 0) + 1, // // Используем likeCount из ответа
          }));
          // Снимаем дизлайк, если он был
          setDislikesComment((prevDislikes) => ({
            ...prevDislikes,
            [commentID]: Math.max((prevDislikes[commentID] || 0) - 1, 0), // снимаем дизлайк
          }));
        } else if (reactionType === "dislike") {
          // Обновляем количество дизлайков, используя данные с сервера
          setDislikesComment((prevDislikes) => ({
            ...prevDislikes,
            [commentID]: data.count || (prevDislikes[commentID] || 0) + 1, // Используем dislikeCount из ответа
          }));
          setLikesComment((prevLikes) => ({
            ...prevLikes,
            [commentID]: Math.max((prevLikes[commentID] || 0) - 1, 0),
          }));
        }
      }
    }
  };

  const deleteCommentHandler = async (id) => {
    await fetch(`/api/comments/${id}`, { method: "DELETE" })
      .then(() =>
        setComments((prev) => prev.filter((comment) => comment.id !== id))
      )
      .catch((err) => console.log(err));
  };
  // После изменения состояния likesComment и  dislikesComment
  useEffect(() => {
    fetch(`/api/comments/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        data.forEach((comment) => fetchCommentLikes(comment.id));
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetch(`/api/likeordislikepost/getLikes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setLikes(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/likeordislikepost/getDislikes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setDislikes(data))
      .catch((err) => console.log(err));
  }, []);

  // вывод likesComment и  dislikesComment
  const fetchCommentLikes = async (commentID) => {
    try {
      const response = await fetch(
        `/api/likeordislikecomment/getlikecomment/${commentID}`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        setLikesComment((prev) => ({
          ...prev,
          [commentID]: data.count, // Сохраняем количество лайков
        }));
      }
    } catch (error) {
      console.error("Ошибка при загрузке количества лайков:", error);
    }
  };
  console.log("likesComment", likesComment);
  return (
    <>
      <div className={`comment-section ${isDotsActive ? "show-actions" : ""}`}>
        <button className="toggle-comments-btn" onClick={handleShowComments}>
          {`${showComments ? "Скрыть" : "Комментарии"} ${comments?.length}`}
        </button>
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
                onClick={() => submitLikeOrDislikePost("like")}
              >
                <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
                {likes.length}
              </button>
              <button
                className="dislike-btn"
                onClick={() => submitLikeOrDislikePost("dislike")}
              >
                <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
                {dislikes.length}
              </button>
              <button className="reply-btn" onClick={handleShowReplies}>
                reply
              </button>
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
              {isShowReplies && (
                <form onSubmit={submitCommentsHandler}>
                  <div id="reply-form-template" className="add-comment">
                    <textarea
                      name="commenttitle"
                      placeholder="Write a reply..."
                      value={textArea.commenttitle}
                      onChange={handleComments}
                    ></textarea>
                    <button type="submit">Post Comment</button>
                  </div>
                </form>
              )}
              {comments?.map((comment) =>
                userIDsession !== comment.user_id ? (
                  <div
                    className={`comment-for-comment ${
                      showComments ? "" : "hidden"
                    }`}
                    key={comment.id}
                  >
                    <p className="comment-text">{comment.commenttitle}</p>
                    <div className="comment-actions">
                      <button
                        className="like-btn"
                        onClick={() =>
                          submitLikeOrDislikeComments(comment.id, "like")
                        }
                      >
                        <ion-icon class="thumbs"></ion-icon>{" "}
                        {likesComment[comment.id] || 0}
                      </button>
                      <button
                        className="dislike-btn"
                        onClick={() =>
                          submitLikeOrDislikeComments(comment.id, "dislike")
                        }
                      >
                        <ion-icon class="thumbs"></ion-icon> 0
                      </button>
                      <button
                        className="reply-btn"
                        onClick={() => handleReplyComment(comment.id)}
                      >
                        reply
                      </button>
                      {comment.ParentComment === null ? (
                        <small className="comment-note">
                          {`${comment?.User?.name}, ответил ${post?.User?.name}`}
                        </small>
                      ) : (
                        <small className="comment-note">
                          {`${comment?.User?.name}, ответил ${comment.ParentComment?.User?.name}`}
                        </small>
                      )}
                    </div>
                    {replyToCommentID === comment.id && (
                      <form
                        onSubmit={(e) => submitCommentsHandler(e, comment.id)}
                      >
                        <textarea
                          name="commenttitle"
                          value={textArea.commenttitle}
                          onChange={handleComments}
                          placeholder="Write your reply..."
                        ></textarea>
                        <button type="submit">Post Reply</button>
                      </form>
                    )}
                  </div>
                ) : (
                  <div
                    className={`comment-for-comment ${
                      showComments ? "" : "hidden"
                    }`}
                    key={comment.id}
                  >
                    {comment.id === editCommentID ? (
                      <form onSubmit={submitEditCommentHandler}>
                        <div id="reply-form-template" className="add-comment">
                          <textarea
                            name="commenttitle"
                            placeholder="Edit your comment..."
                            value={editCommentText}
                            onChange={handlerEditCommentTextChange}
                          ></textarea>
                          <button type="submit">Post Comment</button>
                        </div>
                      </form>
                    ) : (
                      <p className="comment-text">{comment.commenttitle}</p>
                    )}

                    <div className="comment-actions">
                      <button
                        className="like-btn"
                        onClick={() =>
                          submitLikeOrDislikeComments(comment.id, "like")
                        }
                      >
                        <ion-icon class="thumbs"></ion-icon>{" "}
                        {likesComment[comment.id] || 0}
                      </button>
                      <button
                        className="dislike-btn"
                        onClick={() =>
                          submitLikeOrDislikeComments(comment.id, "dislike")
                        }
                      >
                        <ion-icon class="thumbs"></ion-icon> 0
                      </button>
                      <button className="reply-btn">reply</button>
                      <button
                        className="edit-btn"
                        onClick={() => handlerEditComments(comment)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteCommentHandler(comment.id)}
                      >
                        Delete
                      </button>
                      {comment.ParentComment === null ? (
                        <small className="comment-note">
                          {`${comment?.User?.name}, ответил ${post?.User?.name}`}
                        </small>
                      ) : (
                        <small className="comment-note">
                          {`${comment?.User?.name}, ответил ${comment.ParentComment?.User?.name}`}
                        </small>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
