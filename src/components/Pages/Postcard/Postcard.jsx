import React, { useState, useEffect } from "react";

export default function Postcard({
  post,
  id,
  setPosts,
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

  const submitLikeOrDislikePost = async (reactionType) => {
    const response = await fetch(`/api/likeordislikepost/${post.id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ reaction_type: reactionType }),
    });
    if (response.ok) {
      if (response.ok) {
        const updatedReaction = await response.json();
        // Update UI or show a success message if necessary
        console.log("Reaction submitted successfully", updatedReaction);
        // Optionally, update the post reactions in your component state if required
      } else {
        const errorData = await response.json();
        console.error("Error submitting reaction:", errorData.message);
        alert(errorData.message || "Failed to submit the reaction");
      }
    }
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
                <ion-icon class="thumbs"></ion-icon> 0
              </button>
              <button
                className="dislike-btn"
                onClick={() => submitLikeOrDislikePost("dislike")}
              >
                <ion-icon class="thumbs"></ion-icon> 0
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
                      <button className="reply-btn">reply</button>
                      <small className="comment-note">
                        {`${comment?.User?.name}, ответил ${post?.User?.name}`}
                      </small>{" "}
                    </div>
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
                      <small className="comment-note">
                        {`${comment?.User?.name}, ответил ${post?.User?.name}`}
                      </small>
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
