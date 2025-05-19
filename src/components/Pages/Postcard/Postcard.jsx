import React, { useState, useEffect, memo } from "react";
import CommentSection from "../CommentSection/CommentSection";
import Commentform from "../Commentform";
function Postcard({ post, userIDsession, deletePostHandler, userNameSession }) {
  const [isDotsActive, setIsDotsActive] = useState(false);
  const handleDots = () => {
    setIsDotsActive(!isDotsActive);
  };

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

  // const [comments, setComments] = useState([]);
  // const [inputsComments, setInputsComments] = useState({
  //   commenttitle: "",
  // });
  // const handleComments = (e) => {
  //   setInputsComments((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const [showComments, setShowComments] = useState(false);
  // const handleShowComments = () => {
  //   setShowComments(!showComments);
  // };

  const [likePosts, setLikePosts] = useState([]);
  const [dislikePosts, setDislikePosts] = useState([]);

  // const [replyToCommentID, setReplyToCommentID] = useState(null); // Для отслеживания, на какой комментарий отвечают
  // const handleReplyCommentID = (commentID) => {
  //   setReplyToCommentID(commentID === replyToCommentID ? null : commentID);
  // };

  console.log("item render postcard");
  //Синхронизация с сервером после отправки
  // После добавления нового комментария можно выполнить дополнительный
  // запрос к серверу, чтобы получить актуальный список комментариев и обновить
  //состояние comments:
  // const fetchComments = async () => {
  //   try {
  //     const response = await fetch(`/api/comments/${post.id}`, {
  //       method: "GET",
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setComments(data); // Устанавливаем полную структуру комментариев из сервера
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Обновленная версия функции submitCommentsHandler
  // const submitCommentsHandler = async (e, parentId = null) => {
  //   e.preventDefault();
  //   if (!inputsComments.commenttitle.trim()) {
  //     setInputsComments({ commenttitle: "" });
  //     setReplyToCommentID(null);
  //     setShowReplies(false);
  //     return; // Завершаем функцию, не отправляя запроc
  //   }

  //   try {
  //     const response = await fetch(`/api/comments/${post.id}`, {
  //       method: "POST",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({
  //         commenttitle: inputsComments.commenttitle,
  //         parent_id: parentId, // null
  //       }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       const formattedComment = {
  //         ...data,
  //         // Добавляем объект User, если он не возвращается с сервера
  //         User: {
  //           name: userNameSession,
  //         },
  //         parent_id: replyToCommentID, // ?
  //       };
  //       // Если это ответ, добавляем его в соответствующий комментарий
  //       if (parentId) {
  //         setComments((prevComments) =>
  //           prevComments.map((comment) =>
  //             comment.id === replyToCommentID
  //               ? {
  //                   ...comment,
  //                   Replies: [...(comment.Replies || []), formattedComment],
  //                 }
  //               : comment
  //           )
  //         );
  //       } else {
  //         // Если это корневой комментарий, добавляем его в список
  //         setComments((prevComments) => [...prevComments, formattedComment]);
  //       }
  //       await fetchComments(); // // Обновляем комментарии из сервера
  //       setInputsComments({ commenttitle: "" });
  //       setReplyToCommentID(null); // Закрываем форму
  //       handleShowReplies(false);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting comment:", error);
  //   }
  // };

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

  // const [editCommentID, setEditCommentID] = useState("");
  // const [editCommentText, setEditCommentText] = useState("");
  // const handlerEditComments = (comment) => {
  //   setEditCommentID(comment.id);
  //   setEditCommentText(comment.commenttitle);
  // };
  // const handlerEditCommentTextChange = (e) => {
  //   setEditCommentText(e.target.value);
  // };

  // const submitEditCommentHandler = async (e) => {
  //   e.preventDefault();
  //   const responce = await fetch(`/api/comments/${editCommentID}`, {
  //     method: "PUT",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ commenttitle: editCommentText }),
  //   });
  //   if (responce.ok) {
  //     setComments((prevComments) => {
  //       return prevComments.map((comment) => {
  //         return comment.id === editCommentID
  //           ? { ...comment, commenttitle: editCommentText }
  //           : comment;
  //       });
  //     });
  //     setEditCommentID("");
  //     setEditCommentText("");
  //   }
  // };
  const submitReactionPost = async (post_id, reaction_type) => {
    // проверяем есть ли реакция от пользователя на пост
    const isLike = likePosts.some((like) => like.user_id === userIDsession);
    const isDislike = dislikePosts.some(
      (dislike) => dislike.user_id === userIDsession
    );

    try {
      // если тип реакции like и пользователь уже ставил like
      if (reaction_type === "like" && isLike) {
        // удаляем like локально
        setLikePosts((prevLikes) =>
          prevLikes.filter((like) => like.user_id !== userIDsession)
        );
        // Отправляем DELETE-запрос на сервер для удаления лайка
        await fetch(
          // DELETE-запрос с body НЕ поддерживается во всех браузерах!
          // Решение 1 (надёжный способ) — передавать user_id в query-параметрах или в params
          `/api/likeordislikepost/${post_id}?user_id=${userIDsession}`,
          {
            method: "DELETE",
            // Некоторые реализации fetch просто игнорируют тело у DELETE, и на бэке оно будет undefined
            // headers: { "Content-type": "application/json" },
            // body: JSON.stringify({ user_id: userIDsession }),
          }
        );
      } else if (reaction_type === "dislike" && isDislike) {
        // удаляем dislike локально
        setDislikePosts((prevDislike) =>
          prevDislike.filter((dislike) => dislike.user_id !== userIDsession)
        );
        await fetch(
          // DELETE-запрос с body НЕ поддерживается во всех браузерах!
          // Решение 1 (надёжный способ) — передавать user_id в query-параметрах или в params
          `/api/likeordislikepost/${post_id}?user_id=${userIDsession}`,
          {
            method: "DELETE",
            // Некоторые реализации fetch просто игнорируют тело у DELETE, и на бэке оно будет undefined
            // headers: { "Content-type": "application/json" },
            // body: JSON.stringify({ user_id: userIDsession }),
          }
        );
      } else {
        // Если реакции нет, добавляем её
        const response = await fetch(`/api/likeordislikepost/${post_id}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            reaction_type: reaction_type,
            user_id: userIDsession,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (reaction_type === "like") {
            setLikePosts((prevLike) => [...prevLike, data]);
            setDislikePosts((prevDislike) =>
              prevDislike.filter((dislike) => dislike.user_id !== userIDsession)
            );
          } else if (reaction_type === "dislike") {
            setDislikePosts((prevDislike) => [...prevDislike, data]);
            setLikePosts((prevLike) =>
              prevLike.filter((like) => like.user_id !== userIDsession)
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteCommentHandler = async (id) => {
  //   await fetch(`/api/comments/${id}`, { method: "DELETE" })
  //     .then(() =>
  //       setComments((prev) => prev.filter((comment) => comment.id !== id))
  //     )
  //     .catch((err) => console.log(err));
  // };

  // Второе решение deleteCommentHandler
  // const deleteCommentHandler = async (id) => {
  //   try {
  //     const response = await fetch(`/api/comments/${id}`, { method: "DELETE" });
  //     if (response.ok) {
  //       await fetchComments();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const updateReactions = (reactions, type, userID, commentID) => {
  //   const existing = reactions.find((reaction) => reaction.user_id === userID);
  //   if (existing) {
  //     return reactions.map((reaction) =>
  //       reaction.user_id === userID
  //         ? { ...reaction, reaction_type: type }
  //         : reaction
  //     );
  //   } else {
  //     return [
  //       ...reactions,
  //       { user_id: userID, comment_id: commentID, reaction_type: type },
  //     ];
  //   }
  // };

  // const submitLikeOrDislikeComments = async (commentID, reaction_type) => {
  //   try {
  //     const response = await fetch(`/api/likeordislikecomment/${commentID}`, {
  //       method: "POST",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({ reaction_type: reaction_type }),
  //     });
  //     if (response.ok) {
  //       setComments((prev) =>
  //         prev.map((comment) =>
  //           comment.id === commentID
  //             ? {
  //                 ...comment,
  //                 reactions: updateReactions(
  //                   comment.reactions || [],
  //                   reaction_type,
  //                   userIDsession,
  //                   commentID
  //                 ),
  //               }
  //             : comment
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetch(`/api/comments/${post.id}`)
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setComments(
  //         data.map((comment) => ({
  //           ...comment,
  //           reactions: comment.reactions || [], // ← добавил, чтобы гарантировать наличие массива
  //         }))
  //       )
  //     )
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    fetch(`/api/likeordislikepost/getLikes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setLikePosts(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/likeordislikepost/getDislikes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setDislikePosts(data))
      .catch((err) => console.log(err));
  }, []);

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
                onClick={() => submitReactionPost(post.id, "like")}
              >
                <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
                {likePosts.length}
              </button>
              <button
                className="dislike-btn"
                onClick={() => submitReactionPost(post.id, "dislike")}
              >
                <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
                {dislikePosts.length}
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
              {/* {isShowReplies && (
                <form
                  onSubmit={(e) => submitCommentsHandler(e, replyToCommentID)}
                >
                  <div id="reply-form-template" className="add-comment">
                    <textarea
                      name="commenttitle"
                      placeholder="Write a reply..."
                      value={inputsComments.commenttitle}
                      onChange={handleComments}
                    ></textarea>
                    <button type="submit">Post Comment</button>
                  </div>
                </form>
              )} */}
              {isShowReplies && (
                <Commentform post={post} setShowReplies={setShowReplies} />
              )}

              {/* <button
                className="toggle-comments-btn"
                onClick={handleShowComments}
              >
                {`${showComments ? "Скрыть" : "Комментарии"} ${
                  comments?.length
                }`}
              </button> */}
              <div>
                {<CommentSection post={post} userIDsession={userIDsession} />}
              </div>
              {/* Логика для отображения формы для создания комментария */}
              {/* {comments?.map((comment) =>
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
                        <ion-icon
                          class="thumbs"
                          name="thumbs-up-outline"
                        ></ion-icon>{" "}
                        {
                          (comment?.reactions || []).filter(
                            (reaction) =>
                              reaction.comment_id === comment.id &&
                              reaction.reaction_type === "like"
                          ).length
                        }
                      </button>
                      <button
                        className="dislike-btn"
                        onClick={() =>
                          submitLikeOrDislikeComments(comment.id, "dislike")
                        }
                      >
                        <ion-icon
                          class="thumbs"
                          name="thumbs-down-outline"
                        ></ion-icon>
                        {
                          (comment?.reactions || []).filter(
                            (reaction) =>
                              reaction.comment_id === comment.id &&
                              reaction.reaction_type === "dislike"
                          ).length
                        }
                      </button>
                      <button
                        className="reply-btn"
                        onClick={() => handleReplyCommentID(comment.id)}
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
                          value={inputsComments.commenttitle}
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
                        <ion-icon
                          class="thumbs"
                          name="thumbs-up-outline"
                        ></ion-icon>
                        {
                          (comment?.reactions || []).filter(
                            (reaction) =>
                              reaction.comment_id === comment.id &&
                              reaction.reaction_type === "like"
                          ).length
                        }
                      </button>
                      <button
                        className="dislike-btn"
                        onClick={() =>
                          submitLikeOrDislikeComments(comment.id, "dislike")
                        }
                      >
                        <ion-icon
                          class="thumbs"
                          name="thumbs-down-outline"
                        ></ion-icon>
                        {
                          (comment?.reactions || []).filter(
                            (reaction) =>
                              reaction.comment_id === comment.id &&
                              reaction.reaction_type === "dislike"
                          ).length
                        }
                      </button>
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
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// function areEqual(prevProps, nextProps) {
//   const comparison = {
//     idEqual: prevProps.id === nextProps.id,
//     postEqual: prevProps.post === nextProps.post,
//     userIDsessionEqual: prevProps.userIDsession === nextProps.userIDsession,
//     deletePostHandlerEqual:
//       prevProps.deletePostHandler === nextProps.deletePostHandler,
//     userNameSessionEqual:
//       prevProps.userNameSession === nextProps.userNameSession,
//   };
//   console.log("🔍 areEqual comparison", comparison);

//   return (
//     comparison.idEqual &&
//     comparison.postEqual &&
//     comparison.userIDsessionEqual &&
//     comparison.deletePostHandlerEqual &&
//     comparison.userNameSessionEqual
//   );
// }

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
