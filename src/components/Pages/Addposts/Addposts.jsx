import React, { useState, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function Addposts({ setPosts, posts }) {
  const [inputs, setInputs] = useState({
    posttitle: "",
  });
  const { id } = useParams();
  const inputPostHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitPostHandler = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(`/api/posts/${id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ posttitle: inputs.posttitle }),
      });
      if (responce.ok) {
        const data = await responce.json();
        // для правильного отображения ко-ва постов обновить список
        setPosts((prevPost) => [...prevPost, data]);
        setInputs({ posttitle: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPosts = useMemo(() => {
    if (Array.isArray(posts)) {
      return posts.filter((post) => post.subject_id === Number(id));
    }
  }, [posts, id]);

  return (
    <>
      <div className="post-container">
        <div className="post-content">
          <h1 className="post-title">Добавить пост</h1>
          <div className="post-box">
            <form className="form-post" onSubmit={submitPostHandler}>
              <textarea
                name="posttitle"
                value={inputs.posttitle}
                onChange={inputPostHandler}
                placeholder="Оставьте свой пост здесь..."
                rows="4"
              ></textarea>
              <button id="submit-post" type="submit">
                Опубликовать
              </button>
            </form>
          </div>

          <div className="post-info">
            <p>
              Количество постов на данную тему:
              <span id="reply-count">
                {Array.isArray(filteredPosts) ? filteredPosts.length : 0}
              </span>
            </p>
            {/* Использовать <a /> вместо <NavLink/>. При 
            использовании <a/> производительность лучше */}
            <NavLink to={`/comments/${id}`} className="view-comments">
              Перейти к обсуждению
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
