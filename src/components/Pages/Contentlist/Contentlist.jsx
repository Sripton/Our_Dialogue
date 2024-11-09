import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Contentlist({ directions, thumbnails, userIDsession }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const handleClick = (index) => {
    setSelectedItemIndex(index + 1);
    console.log("index", index);
  };
  useEffect(() => {
    const caorusel__list = document.querySelector(".caorusel__list");
    const thumbnail__list = document.querySelector(".thumbnail__list");
    const caorusel__items = document.querySelectorAll(".caorusel__item");
    const thumbnail__items = document.querySelectorAll(".thumbnail__item");

    thumbnail__items.forEach((elem, index) => {
      elem.addEventListener("click", () => {
        caorusel__list.appendChild(caorusel__items[index]);
        thumbnail__list.appendChild(thumbnail__items[index]);
      });
    });
  }, []);
  return (
    <>
      <div className={`caorusel ${selectedItemIndex ? "_next" : ""}`}>
        <div className="caorusel__list">
          {directions?.map((direction) => (
            <div className="caorusel__item" key={direction.id}>
              <img src={`${direction.img}`} />
              <div className="caorusel__content">
                <div className="caorusel__title">{direction.title}</div>
                <div className="caorusel__description">
                  {direction.description}
                </div>
                {!userIDsession ? (
                  <div className="caorusel__button">
                    <NavLink className="button" to={`/signin`}>
                      Перейти
                    </NavLink>
                  </div>
                ) : (
                  <div className="caorusel__button">
                    <NavLink
                      className="button"
                      to={`/subjects/${direction.id}`}
                    >
                      Перейти
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="thumbnail__list">
          {thumbnails?.map((thumbnail, index) => (
            <div className="thumbnail__item" key={thumbnail.id}>
              <img
                src={`${thumbnail.img}`}
                onClick={() => handleClick(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
