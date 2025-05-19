import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Postcard from "../Postcard";
export default function Postlist({
  posts,
  setPosts,
  setComments,
  comments,
  userIDsession,
  userNameSession,
}) {
  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/posts/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  const deletePostHandler = useCallback(async (id) => {
    await fetch(`/api/posts/${id}`, { method: "delete" }).then(() =>
      setPosts((prev) => prev.filter((data) => data.id !== id))
    );
  }, []);

  return (
    <div className="comments-container">
      {posts?.map((post) => (
        <Postcard
          key={post.id}
          post={post}
          setComments={setComments}
          comments={comments}
          userIDsession={userIDsession}
          deletePostHandler={deletePostHandler}
          userNameSession={userNameSession}
          setPosts={setPosts}
        />
      ))}{" "}
    </div>
  );
}
