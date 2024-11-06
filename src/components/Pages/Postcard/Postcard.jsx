import React, { useState, useEffect } from "react";

export default function Postcard({ post, id, userIDsession }) {
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

  const [editCommentsID, setEditCommentId] = useState("");
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
  const editCommentHandler = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentText(comment.commenttitle);
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
      setComments((prevComments) => [...prevComments, data]);
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
    const responce = await fetch(`/api/comments/${editCommentsID}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ commenttitle: editCommentText }),
    });
    if (responce.ok) {
      const comment = comments.find((com) => com.id === editCommentsID);
      if (!comment) {
        return;
      }
      comment.commenttitle = editCommentText;
      const editCommentIndex = comments
        .map((comment) => comment.id)
        .indexOf(editCommentsID);
      if (editCommentIndex === -1) {
        return;
      }
      comments.splice(editCommentIndex, 1, comment);
      setComments([...comments]);
      setEditCommentId("");
    }
  };
  console.log("editCommentsID", editCommentsID);
  console.log("editCommentText", editCommentText);

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
          {`${showComments ? "Скрыть" : "Комментарии"} ${comments.length}`}
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
              <button className="like-btn">
                <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon> 0
              </button>
              <button className="dislike-btn">
                <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
                0
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
                  <button className="delete-btn">Delete</button>
                </>
              )}
              <small className="comment-note">
                {post?.User?.name}, ({post?.Subject?.subjectName})
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
              {comments.map((comment) =>
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
                        <ion-icon
                          class="thumbs"
                          name="thumbs-up-outline"
                        ></ion-icon>{" "}
                        0
                      </button>
                      <button className="dislike-btn">
                        <ion-icon
                          class="thumbs"
                          name="thumbs-down-outline"
                        ></ion-icon>{" "}
                        0
                      </button>
                      <button className="reply-btn">reply</button>
                      <small className="comment-note">{`${comment?.User?.name}, ответил ${post?.User?.name}`}</small>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`comment-for-comment ${
                      showComments ? "" : "hidden"
                    }`}
                    key={comment.id}
                  >
                    {editCommentsID === comment.id ? (
                      <form onSubmit={submitEditCommentHandler}>
                        <div id="reply-form-template" className="add-comment">
                          <textarea
                            name="commenttitle"
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            placeholder="Edit your comment..."
                          ></textarea>
                          <button type="submit">Post Reply</button>
                        </div>
                      </form>
                    ) : (
                      <p className="comment-text">{comment.commenttitle}</p>
                    )}

                    <div className="comment-actions">
                      <button className="like-btn">
                        <ion-icon
                          class="thumbs"
                          name="thumbs-up-outline"
                        ></ion-icon>{" "}
                        0
                      </button>
                      <button className="dislike-btn">
                        <ion-icon
                          class="thumbs"
                          name="thumbs-down-outline"
                        ></ion-icon>{" "}
                        0
                      </button>
                      <button className="reply-btn">reply</button>
                      <small className="comment-note">{`${comment?.User?.name}, ответил ${post?.User?.name}`}</small>
                      <button
                        className="edit-btn"
                        onClick={() => editCommentHandler(comment)}
                      >
                        Edit
                      </button>
                      <button className="delete-btn">Delete</button>

                      <small className="comment-note">{`${comment?.User?.name}, ответил ${post?.User?.name}`}</small>
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
