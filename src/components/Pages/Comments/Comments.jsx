import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Comments({ posts, setPosts }) {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/posts/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);
  console.log("posts", posts);

  return (
    <>
      <div className="comments-container">
        <div className="comment-section">
          <button className="toggle-comments-btn">Show Comments</button>
          <div className="comment-list">
            <div className="comment">
              <p className="comment-text">
                This is the first comment. Great article!
              </p>
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
                <button className="reply-btn">reply</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
                <small className="comment-note">Комментарий добавлен</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
