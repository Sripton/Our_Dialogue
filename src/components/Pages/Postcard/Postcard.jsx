import React, { useState } from "react";

export default function Postcard({ post }) {
  const [isDotsActive, setIsDotsActive] = useState(false);
  const [isShowReplies, setShowReplies] = useState(false);

  const handleDots = () => {
    setIsDotsActive(!isDotsActive);
  };
  const handleShowReplies = () => {
    setShowReplies(!isShowReplies);
  };

  return (
    <>
      <div className={`comment-section ${isDotsActive ? "show-actions" : ""}`}>
        <button className="toggle-comments-btn">Show Comments</button>
        <div className="comment-list">
          <div className="comment">
            <p className="comment-text">{post?.posttitle}</p>
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
                <form>
                  <div id="reply-form-template" className="add-comment">
                    <textarea placeholder="Write a reply..."></textarea>
                    <button>Post Reply</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
