import React, { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";

export default function Subjectlist() {
  const [subjects, setSubjects] = useState([]);
  const { id } = useParams();

  const [tabIndex, setTabIndex] = useState(1);
  const [tabIndexSix, setTabIndexSix] = useState(6);
  const [tabIndexTvelwe, setTabIndexTvelwe] = useState(12);
  const [tabIndexEight, setTabIndexEight] = useState(18);

  // Fetch subjects data
  useEffect(() => {
    fetch(`/api/subjects/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.log(err));
  }, []);
  // Создаются ссылки на DOM элементы кнопок прокрутки и список вкладок.
  // Также создаются состояния для управления возможностью прокрутки влево и вправо.
  const leftBTNRef = useRef(null);
  const rightBTNRef = useRef(null);
  const tabNavListRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Эта функция проверяет, можно ли прокручивать список вкладок влево или вправо и обновляет соответствующие состояния.
  const updateIconVisibility = () => {
    const tabNavList = tabNavListRef.current; // получаем доступ к списку вкладок
    if (tabNavList) {
      const scrollLeftValue = Math.ceil(tabNavList.scrollLeft); // вычисляем, на сколько прокручено содержимое
      const scrollableWidth = tabNavList.scrollWidth - tabNavList.clientWidth; // общая ширина содержимого и доступная для отображения
      setCanScrollLeft(scrollLeftValue > 0); // если прокрутка есть, можно двигать влево
      setCanScrollRight(scrollLeftValue < scrollableWidth); // если прокрутка не достигла правого конца, можно двигать вправо
    }
  };

  // Здесь добавляется слушатель события прокрутки для обновления состояния видимости кнопок при прокрутке списка вкладок.
  useEffect(() => {
    const tabNavList = tabNavListRef.current; // получаем доступ к списку вкладок
    if (tabNavList) {
      updateIconVisibility(); // обновляем видимость кнопок при монтировании
      tabNavList.addEventListener("scroll", updateIconVisibility); // слушаем событие прокрутки
    }
    document.body.style.backgroundColor = "#2e2e41"; // изменяем цвет фона страницы

    return () => {
      if (tabNavList) {
        tabNavList.removeEventListener("scroll", updateIconVisibility); // удаляем слушатель при размонтировании
      }
    };
  }, []); // этот эффект выполняется только при монтировании компонента

  // Эти функции прокручивают список вкладок влево или вправо на 150 пикселей и обновляют видимость кнопок прокрутки.
  const scrollRight = () => {
    const tabNavList = tabNavListRef.current; // получаем доступ к списку вкладок
    if (tabNavList) {
      tabNavList.scrollLeft += 150; // прокручиваем на 150 пикселей вправо
      setTimeout(() => updateIconVisibility(), 50); // обновляем видимость кнопок после прокрутки
    }
  };

  const scrollLeft = () => {
    const tabNavList = tabNavListRef.current; // получаем доступ к списку вкладок
    if (tabNavList) {
      tabNavList.scrollLeft -= 150; // прокручиваем на 150 пикселей влево
      setTimeout(() => updateIconVisibility(), 50); // обновляем видимость кнопок после прокрутки
    }
  };
  // Функция, которая обрабатывает клик по вкладке и обновляет все связанные индексы вкладок.
  const handleTabClick = (index) => {
    setTabIndex(index); // обновляем активную вкладку
    setTabIndexSix(index); // обновляем индекс для шестой вкладки
    setTabIndexTvelwe(index); // для двенадцатой
    setTabIndexEight(index); // для восемнадцатой
  };
  return (
    <>
      <section className="main-container">
        <div className="tab-nav-bar">
          <div className="tab-navigation">
            <i
              className="uil uil-angle-left left-btn"
              ref={leftBTNRef}
              onClick={scrollLeft}
              style={{ display: canScrollLeft ? "block" : "none" }}
            ></i>
            <i
              className="uil uil-angle-right right-btn"
              ref={rightBTNRef}
              onClick={scrollRight}
              style={{ display: canScrollRight ? "block" : "block" }}
            ></i>
            <ul className="tab-nav-list" ref={tabNavListRef}>
              {subjects.map((subject) => (
                <li
                  className={`tab-nav-item ${
                    tabIndex === subject.id ||
                    tabIndexSix === subject.id ||
                    tabIndexTvelwe === subject.id ||
                    tabIndexEight === subject.id
                      ? "tab-nav-item-active"
                      : ""
                  }`}
                  key={subject.id}
                  onClick={() => handleTabClick(subject.id)}
                >
                  {subject.subjectName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tab-content">
          {subjects.map((subject) => (
            <div
              className={`tab ${
                tabIndex === subject.id ||
                tabIndexSix === subject.id ||
                tabIndexTvelwe === subject.id ||
                tabIndexEight === subject.id
                  ? "_active-tab "
                  : ""
              }`}
              key={subject.id}
            >
              <div className="row">
                <div className="left-column">
                  {" "}
                  <div className="img-card">
                    <img className="tab-img" src={`${subject.img}`} />
                  </div>
                </div>

                <div className="right-column">
                  <div className="info">
                    <NavLink to={`/comments/${subject.id}`}>
                      <ion-icon
                        class="info-icon"
                        name="arrow-redo-outline"
                      ></ion-icon>
                    </NavLink>

                    <NavLink to={`/addposts/${subject.id}`}>
                      {" "}
                      <ion-icon
                        class="info-icon"
                        name="chatbubble-ellipses-outline"
                      >
                        {" "}
                      </ion-icon>
                    </NavLink>
                    <NavLink to={"/"}>
                      <ion-icon
                        class="info-icon"
                        name="arrow-undo-outline"
                      ></ion-icon>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
