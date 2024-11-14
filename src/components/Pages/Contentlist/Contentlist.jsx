import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Contentlist({ directions, thumbnails, userIDsession }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);
  const [caoruselItems, setCarouselItems] = useState(directions);
  const [thumbnailItems, setThumbnailItems] = useState(thumbnails);
  // Чтобы переписать функцию handleClick,
  // позволяя нажимать на любой элемент thumbnail__item и перемещать его в конец списка,
  // но с учетом текущей логики, убедимся,
  // что все элементы корректно перетасовываются.
  // // Вот как можно переписать функцию:
  // const handleClick = (index) => {
  //   setSelectedItemIndex(index + 1);
  //   // Перемещение выбранного элемента в конец списка
  //   const updatedCarouselItems = [
  //     ...caoruselItems.slice(0, index),
  //     ...caoruselItems.slice(index + 1),
  //     caoruselItems[index],
  //   ];
  //   setCarouselItems(updatedCarouselItems);

  //   const selectedThumbnailItem = thumbnailItems[index]; // 0
  //   // Создание нового массива без выбранного элемента
  //   const newThumbnailItems = [...thumbnailItems];
  //   // Удаление выбранного элемента
  //   newThumbnailItems.splice(index, 1);
  //   // Добавление выбранного элемента в конец
  //   newThumbnailItems.push(selectedThumbnailItem);
  //   setThumbnailItems(newThumbnailItems);
  // };
  const handleClick = (index) => {
    setSelectedItemIndex(index + 1);
    // Перемещение выбранного элемента в конец списка
    const updatedCarouselItems = [
      ...caoruselItems.slice(0, index), // Все элементы до выбранного
      ...caoruselItems.slice(index + 1), // Все элементы после выбранного
      caoruselItems[index], // Добавляем выбранный элемент в конец
    ];
    setCarouselItems(updatedCarouselItems);

    // Работа с элементами thumbnail
    const newThumbnailItems = [
      ...thumbnailItems.slice(0, index), // Все элементы до выбранного
      ...thumbnailItems.slice(index + 1), // Все элементы после выбранного
      thumbnailItems[index], // Добавляем выбранный элемент в конец
    ];
    setThumbnailItems(newThumbnailItems);
  };

  return (
    <>
      <div className={`caorusel ${selectedItemIndex ? "_next" : ""}`}>
        <div className="caorusel__list">
          {caoruselItems?.map((direction) => (
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
          {thumbnailItems?.map((thumbnail, index) => (
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
