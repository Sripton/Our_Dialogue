import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Subjectlist() {
  const [suebjectsApi, setSubjectsApi] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/subjects/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSubjectsApi(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const boxs = document.querySelectorAll(".box");
    const contents = document.querySelectorAll(".content");
    boxs.forEach((box, indexBox) => {
      box.addEventListener("click", () => {
        contents.forEach((content, indexContent) => {
          if (indexBox === indexContent) {
            content.classList.add("_active");
          } else {
            content.classList.remove("_active");
          }
        });

        box.remove();
        document.querySelector(".container__subject").appendChild(box);
      });
      if (contents.length > 1) {
        contents[1].classList.add("_active");
      }
    });
  }, [suebjectsApi]);
  console.log("suebjectsApi ----> ", suebjectsApi);

  return (
    <>
      <div className="container__subject">
        {suebjectsApi?.map((subject) => (
          <div key={subject.id} className="box">
            {subject.subjectName}
          </div>
        ))}
      </div>
      <div className="container__content">
        {suebjectsApi?.map((subject) => (
          <div className="content" key={subject.id}>
            <div className="content__button">
              <button>Добавить пост</button>
              <button>Перейти</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
