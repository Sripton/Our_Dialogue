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

  const [repliesVisibility, setRepliesVisibility] = useState({});
  const [replyTextareaComments, setReplyTextareaComments] = useState({
    replytitle: "",
  });
  const [repliesComment, setRepliesComment] = useState({}); // // Состояние для хранения ответов
  const [loading, setLoading] = useState(false); // Состояние загрузки

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

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

  // Функция для получения ответов для конкретного комментария
  const fetchRepliesForComment = async (commentID) => {
    try {
      const response = await fetch(`/api/replycomments/${commentID}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        return data || []; // Возвращаем ответы для одного комментария
      } else {
        console.log(
          `Не удалось получить ответы на комментарий с идентификатором ${commentID}`
        );
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Загружаем ответы для всех комментариев при их отображении
  useEffect(() => {
    const fetchAllReplies = async () => {
      setLoading(true);
      const repliesData = {};
      for (const comment of comments) {
        const repliesForComment = await fetchRepliesForComment(comment.id);
        repliesData[comment.id] = repliesForComment; // Сохраняем ответы в объект
      }
      setRepliesComment(repliesData); // // Обновляем состояние с ответами
      setLoading(false);
    };
    if (comments.length > 0) {
      fetchAllReplies(); // Загружаем ответы
    }
  }, [comments]);

  // //Ручка для  Добавления комменатриев к комменатриям 1 Вариант
  // const handlerReplyComment = (e) => {
  //   setReplyTextareaComments((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // //Ручка для  Добавления комменатриев к комменатриям 2 Вариант
  // const handlerReplyComment = (e) => {
  //   setReplyTextareaComments((prev) => ({
  //     ...prev,
  //     replytitle: e.target.value,
  //   }));
  // };

  //Ручка для  Добавления комменатриев к комменатриям 3 Вариант
  const handlerReplyComment = (e) => {
    setReplyTextareaComments(e.target.value);
  };

  const toggleRepliesVisibility = (commentID) => {
    setRepliesVisibility((prev) => ({
      ...prev,
      [commentID]: !prev[commentID],
    }));
  };

  const submitCommentsHandler = async (e) => {
    e.preventDefault();
    // Ошибка Cannot read properties of undefined (reading 'trim') возникает,
    // потому что свойство commenttitle в объекте textArea может быть неопределено в момент выполнения кода.
    // Это может произойти, если textArea не инициализирован должным образом или изменяется в процессе работы.
    // одно из решений if(!textArea.commenttitle || !textArea.commenttitle.trim())

    if (!textArea.commenttitle.trim()) {
      setTextArea({ commenttitle: "" });
      setShowReplies(false);
      return; // Завершаем функцию, не отправляя запрос
    }
    const responce = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ commenttitle: textArea.commenttitle }),
    });
    if (responce.ok) {
      const data = await responce.json();
      // setComments(Array.isArray(data) ? data : []);

      // Добавить объект User в комментарий, если он не возвращается с сервера
      const newComment = {
        ...data,
        User: {
          name: userNameSession,
        },
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setTextArea({ commenttitle: "" });
      setShowReplies(false);
    }
  };

  // // Функция  для  Добавления комменатриев к комменатриям 1 Вариант
  // const submitReplyCommentHandler = async (commentID, e) => {
  //   e.preventDefault();
  //   const response = await fetch(`/api/replycomments/${commentID}`, {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ replytitle: replyTextareaComments.replytitle }),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     setReplyComment((prevComment) => [...prevComment, data]);
  //   }
  // };

  // // Функция  для  Добавления комменатриев к комменатриям 2 Вариант
  // const submitReplyCommentHandler = async (commentID, e) => {
  //   e.preventDefault();
  //   const response = await fetch(`/api/replycomments/${commentID}`, {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({ replytitle: replyTextareaComments.replytitle }),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     setReplyComment((prevComment) => [...prevComment, data]);
  //   }
  // };

  // Функция  для  Добавления комменатриев к комменатриям 3 Вариант
  const submitReplyCommentHandler = async (commentID, e) => {
    e.preventDefault();
    const response = await fetch(`/api/replycomments/${commentID}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ replytitle: replyTextareaComments }),
    });
    if (response.ok) {
      const data = await response.json();
      setReplyComment((prevComment) => [...prevComment, data]);

      // Очищаем поле для ввода
      setReplyTextareaComments({ replytitle: "" });
      // Закрываем форму ответа
      setRepliesVisibility((prevComment) => ({
        ...prevComment,
        [commentID]: false,
      }));
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
      // При таком раскладе измененный комменатрий обновляется после презагрузки
      //  В текущей версии кода setComments использует метод map внутри,
      // но результат функции map не возвращается, поэтому изменения не применяются корректно.
      // setComments((prevComments) => {
      //   prevComments.map((comment) =>
      //     comment.id === editCommentID
      //       ? { ...comment, commenttitle: editCommentText }
      //       : comment
      //   );
      // });

      // При таком раскладе измененный комменатрий обновляется сразу
      // setComments((prevComments) =>
      //   prevComments.map((comment) =>
      //     comment.id === editCommentID
      //       ? { ...comment, commenttitle: editCommentText }
      //       : comment
      //   )
      // );

      // При таком раскладе измененный комменатрий обновляется сразу
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

  const deleteCommentHandler = async (id) => {
    await fetch(`/api/comments/${id}`, { method: "DELETE" })
      .then(() =>
        setComments((prev) => prev.filter((comment) => comment.id !== id))
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/comments/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setComments(data))
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

  // if (Object.keys(repliesComment).length > 0 && repliesComment["1"]) {
  //   Object.values(repliesComment).map((elem) => console.log(elem[0].replytitle));
  // }
  // if (Object.keys(repliesComment).length > 0 && repliesComment["1"]) {
  //   Object.entries(repliesComment).map(([commentID, replies]) => {
  //     console.log(`commentID => ${commentID}`);
  //     replies.map((elem) => console.log(elem));
  //   });
  // }
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
                    <button type="submit">Post Reply</button>
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
                      <button className="like-btn">
                        <ion-icon class="thumbs"></ion-icon> 0
                      </button>
                      <button className="dislike-btn">
                        <ion-icon class="thumbs"></ion-icon> 0
                      </button>
                      <button
                        className="reply-btn"
                        onClick={() => toggleRepliesVisibility(comment.id)}
                      >
                        reply
                      </button>
                      <small className="comment-note">
                        {`${comment?.User?.name}, ответил ${post?.User?.name}`}
                      </small>{" "}
                    </div>
                    {repliesVisibility[comment.id] && (
                      <div className="replies">
                        <form
                          onSubmit={(e) =>
                            submitReplyCommentHandler(comment.id, e)
                          }
                        >
                          <div id="reply-form-template" className="add-reply">
                            <textarea
                              name="replytitle"
                              value={replyTextareaComments.replytitle}
                              onChange={handlerReplyComment}
                              placeholder="Write a reply for comment..."
                            ></textarea>
                            <button type="submit">Post Reply</button>
                          </div>
                        </form>
                      </div>
                    )}
                    {repliesComment[comment.id] &&
                      Object.entries(repliesComment[comment.id]).map(
                        ([commentID, reply]) => (
                          <div key={commentID}>
                            <p className="comment-text">{reply.replytitle}</p>
                            <div className="comment-actions">
                              <button className="like-btn">
                                <ion-icon class="thumbs"></ion-icon> 0
                              </button>
                              <button className="dislike-btn">
                                <ion-icon class="thumbs"></ion-icon> 0
                              </button>
                              <button className="reply-btn">reply</button>
                              <small className="comment-note">
                                {`${comment?.User?.name}, ответил ${post?.User?.name}`}
                              </small>{" "}
                            </div>
                          </div>
                        )
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
                      <button className="like-btn">
                        <ion-icon class="thumbs"></ion-icon> 0
                      </button>
                      <button className="dislike-btn">
                        <ion-icon class="thumbs"></ion-icon> 0
                      </button>
                      <button
                        className="reply-btn"
                        onClick={() => toggleRepliesVisibility(comment.id)}
                      >
                        reply
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
                      <small className="comment-note">
                        {`${comment?.User?.name}, ответил ${post?.User?.name}`}
                      </small>
                    </div>
                    {repliesVisibility[comment.id] && (
                      <div className="replies">
                        <form
                          onSubmit={(e) =>
                            submitReplyCommentHandler(comment.id, e)
                          }
                        >
                          <div id="reply-form-template" className="add-reply">
                            <textarea
                              name="replytitle"
                              value={replyTextareaComments.replytitle}
                              onChange={handlerReplyComment}
                              placeholder="Write a reply for comment..."
                            ></textarea>
                            <button type="submit">Post Reply</button>
                          </div>
                        </form>
                      </div>
                    )}
                    {/* {repliesComment[comment.id] &&
                      repliesComment[comment.id].length > 0 &&
                      repliesComment[comment.id].map((reply) => (
                        <div key={reply.id} className="reply">
                          <p className="reply-text">{reply.replytitle}</p>
                          <small className="reply-note">
                            By {reply?.User?.name}
                          </small>
                        </div>
                      ))} */}
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
