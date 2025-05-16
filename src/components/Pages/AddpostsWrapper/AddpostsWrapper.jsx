import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Postform from "../Postform/Postform";
import Postmeta from "../Postmeta";

export default function AddpostsWrapper() {
  const [inputs, setInputs] = useState({ posttitle: "" });
  const [postSubjects, setPostSubjects] = useState([]);
  const { id } = useParams();

  // Первый вариант функции inputPostHandler
  // const inputPostHandler = useCallback((e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }, []);
  // Другой вариант функции inputPostHandler
  const inputPostHandler = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  // const submitPostHandler = useCallback(
  //   async (e) => {
  //     e.preventDefault();
  //     try {
  //       const responce = await fetch(`/api/posts/${id}`, {
  //         method: "POST",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify({ posttitle: inputs.posttitle }),
  //       });
  //       if (responce.ok) {
  //         const data = await responce.json();
  //         // для правильного отображения ко-ва постов обновить список
  //         // Проблема перерендеринга вот здесь
  //         setPostSubjects((prevPost) => [...prevPost, data]);
  //         // Каждый раз, создаётся новый объект, и даже если он "такой же", memo это не распознает.
  //         // setInputs({ posttitle: "" });
  //         // Если  нужно сбросить posttitle, можно использовать:
  //         setInputs({ posttitle: "" });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [inputs.posttitle]
  // );

  // Второй вариант функции submitPostHandler с аргументами inputs.posttitle
  const submitPostHandler = useCallback(async (e, posttitle) => {
    e.preventDefault();
    try {
      const responce = await fetch(`/api/posts/${id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ posttitle }),
      });
      if (responce.ok) {
        const data = await responce.json();
        // для правильного отображения ко-ва постов обновить список
        // Проблема перерендеринга вот здесь
        setPostSubjects((prevPost) => [...prevPost, data]);
        // Каждый раз, создаётся новый объект, и даже если он "такой же", memo это не распознает.
        // setInputs({ posttitle: "" });
        // Если  нужно сбросить posttitle, можно использовать:
        setInputs({ posttitle: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useMemo(...) не гарантирует одинаковую ссылку, если posts каждый раз новая.
  //   const filteredPosts = useMemo(() => {
  //     if (Array.isArray(posts)) {
  //       return posts.filter((post) => post.subject_id === Number(id));
  //     }
  //   }, [posts, id]);

  // Альтернатива — мемоизировать только при изменении конкретной части:
  // const filteredPosts = useMemo(() => {
  //   return Array.isArray(posts)
  //     ? posts.filter((post) => post.subject_id === Number(id))
  //     : [];
  // }, [posts, id]);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPostSubjects(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="post-container">
        <div className="post-content">
          <h1 className="post-title">Добавить пост</h1>
          <div className="post-box">
            <Postform
              submitPostHandler={(e) => submitPostHandler(e, inputs.posttitle)}
              inputs={inputs.posttitle}
              inputPostHandler={inputPostHandler}
            />
          </div>
          <Postmeta id={id} postSubjects={postSubjects} />
        </div>
      </div>
    </>
  );
}
