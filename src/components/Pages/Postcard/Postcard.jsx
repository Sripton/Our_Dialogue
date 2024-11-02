import React, { useState, useEffect } from "react";

export default function Postcard({ post, id, userIDsession }) {
  const [isDotsActive, setIsDotsActive] = useState(false);
  const [isShowReplies, setShowReplies] = useState(false);
  const [textArea, setTextArea] = useState({
    commenttitle: "",
  });
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

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
  console.log();
  console.log("comments", comments);

  useEffect(() => {
    fetch(`/api/comments/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log("comments", comments);
  console.log("post.user_id", post.user_id);
  console.log("userIDsession", userIDsession);

  return (
    <>
      {userIDsession !== post.user_id ? (
        <div
          className={`comment-section ${isDotsActive ? "show-actions" : ""}`}
        >
          <button className="toggle-comments-btn" onClick={handleShowComments}>
            {`${showComments ? "Скрыть" : "Комментарии"} ${comments.length}`}
          </button>
          <div className="comment-list">
            <div className="comment">
              <p className="comment-text">{`${post.posttitle}`}</p>
              <div className="comment-actions">
                <button className="like-btn">
                  <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
                  0
                </button>
                <button className="dislike-btn">
                  <ion-icon
                    class="thumbs"
                    name="thumbs-down-outline"
                  ></ion-icon>{" "}
                  0
                </button>
                <button className="reply-btn" onClick={handleShowReplies}>
                  reply
                </button>
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
                {comments.map((comment) => (
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
                      <button className="reply-btn" onClick={handleShowReplies}>
                        reply
                      </button>
                      {userIDsession !== comment.user_id ? (
                        ""
                      ) : (
                        <>
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                        </>
                      )}
                      <small className="comment-note">{`${comment?.User?.name}, ответил ${post?.User?.name}`}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`comment-section ${isDotsActive ? "show-actions" : ""}`}
        >
          <button className="toggle-comments-btn" onClick={handleShowComments}>
            {`${showComments ? "Скрыть" : "Комментарии"} ${comments.length}`}
          </button>
          <div className="comment-list">
            <div className="comment">
              <p className="comment-text">{`${post.posttitle}`}</p>
              <div className="comment-actions">
                <button className="like-btn">
                  <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
                  0
                </button>
                <button className="dislike-btn">
                  <ion-icon
                    class="thumbs"
                    name="thumbs-down-outline"
                  ></ion-icon>{" "}
                  0
                </button>
                <button className="reply-btn" onClick={handleShowReplies}>
                  reply
                </button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
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
                {comments.map((comment) => (
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
                      <button className="reply-btn" onClick={handleShowReplies}>
                        reply
                      </button>
                      {userIDsession !== comment.user_id ? (
                        ""
                      ) : (
                        <>
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                        </>
                      )}

                      <small className="comment-note">{`${comment?.User?.name}, ответил ${post?.User?.name}`}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

