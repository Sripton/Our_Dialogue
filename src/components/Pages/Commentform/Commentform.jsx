import React, { useState } from "react";

export default function Commentform({ post, setShowReplies }) {
  const [inputsComment, setInputsComment] = useState({
    commenttitle: "",
  });
  const inputsCommentHandler = (e) => {
    setInputsComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitCommentsHandler = async (e, parentId = null) => {
    e.preventDefault();
    if (!inputsComment.commenttitle.trim()) {
      setInputsComment({ commenttitle: "" });
    }

    try {
      const response = await fetch(`/api/comments/${post.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ commenttitle: inputsComment.commenttitle }),
      });
      if (response.ok) {
        const data = await response.json();
      }
    } catch (error) {
      console.log("Ошибка при создании комментария", error);
    }
  };

  return (
    <form>
      <div id="reply-form-template" className="add-comment">
        <textarea
          name="commenttitle"
          placeholder="Write a reply..."
          value={inputsComment.commenttitle}
          onChange={inputsCommentHandler}
        ></textarea>
        <button type="submit">Post Comment</button>
      </div>
    </form>
  );
}
