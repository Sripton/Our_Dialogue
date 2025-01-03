import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Addposts({ setPosts }) {
  // 1 -> const [inputs, setInputs] = useState("");
  // 2 ->const [inputs, setInputs] = useState({posttitle: ""});
  const [inputs, setInputs] = useState({
    posttitle: "",
  });
  const [postsSubjects, setPostSubjects] = useState([]);
  const { id } = useParams();

  const inputPostHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitPostHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/posts/${id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      // 1 -> body: JSON.stringify(inputs),
      body: JSON.stringify({ posttitle: inputs.posttitle }),
    });
    if (responce.ok) {
      const data = await responce.json();
      setPosts(data);
      setInputs({ posttitle: "" });
    }
  };
  useEffect(() => {
    fetch(`/api/posts/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPostSubjects(data))
      .catch((err) => console.log(err));
  }, []);
  // При мобильном режиме работает лучше
  const commentsLink = useMemo(() => `/comments/${id}`);
  console.log("postsSubjects", postsSubjects);

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
                {postsSubjects.length !== 0 ? postsSubjects.length : 0}
              </span>
            </p>
            {/* Использовать <a /> вместо <NavLink/>. При 
            использовании <a/> производительность лучше */}
            <a href={commentsLink} className="view-comments">
              Перейти к обсуждению
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
