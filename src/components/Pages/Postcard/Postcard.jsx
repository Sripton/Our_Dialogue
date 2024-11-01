import React, { useState, useEffect } from "react";

export default function Postcard({ post, id }) {
  const [isDotsActive, setIsDotsActive] = useState(false);
  const [isShowReplies, setShowReplies] = useState(false);
  const [textArea, setTextArea] = useState({
    commenttitle: "",
  });
  const [comments, setComments] = useState([]);

  const handleDots = () => {
    setIsDotsActive(!isDotsActive);
  };
  const handleShowReplies = () => {
    setShowReplies(!isShowReplies);
  };
  const handleComments = (e) => {
    setTextArea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitCommentsHandler = async (e) => {
    e.preventDefault();
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

  useEffect(() => {
    fetch(`/api/comments/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log("comments", comments);

  return (
    <>
      <div className={`comment-section ${isDotsActive ? "show-actions" : ""}`}>
        <button className="toggle-comments-btn">Show Comments</button>
        <div className="comment-list">
          <div className="comment">
            <p className="comment-text">{`id ${id} ${post.posttitle}`}</p>
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
                <div className="comment-for-comment" key={comment.id}>
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
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                    <small className="comment-note">comment-note</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
