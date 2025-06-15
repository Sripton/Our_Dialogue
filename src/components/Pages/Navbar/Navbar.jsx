import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
export default function Navbar({
  userNameSession,
  userIDsession,
  logoutHandler,
}) {
  const [iconMenuActive, setIconMenuActive] = useState(false);
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const [replyCount, setReplyCount] = useState(null); // 👈 для количества "Ответили"
  const profileDropdownBtnRef = useRef(null);
  const profileDropdownListRef = useRef(null);
  const cache = useRef({}); // 👈 создаем кеш

  const handleIconMenuActive = () => {
    setIconMenuActive(!iconMenuActive);
  };
  const handleArrowActive = () => {
    setIsArrowActive(!isArrowActive);
  };
  const handleDropClick = () => {
    setDropActive((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !profileDropdownBtnRef.current ||
        profileDropdownBtnRef.current.contains(e.target)
      ) {
        return;
      }
      setDropActive(false);
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // Забираем кол-во ответов на посты и комменатрии пользователя
  useEffect(() => {
    if (!userIDsession) return;

    if (
      cache.current[userIDsession] &&
      cache.current[userIDsession] !== undefined // Дополнительная страховка
    ) {
      setReplyCount(cache.current[userIDsession]); // 👈 ставим значение из кеша
      return; // ОСТАНАВЛИВАЕМ useEffect, не делает fetch
    }
    fetch(`/api/users/useractivity/${userIDsession}`)
      .then((res) => res.json())
      .then((data) => {
        setReplyCount(data);
        cache.current[userIDsession] = data; // 👈 кешируем результат
      })
      .catch((err) => console.log(err));
  }, [userIDsession]);

  console.log("cache", cache);
  console.log("replyCount", replyCount);

  return (
    <>
      {!userIDsession ? (
        <div className="wrapper">
          <header className="header">
            <div className="header__container">
              <a href="#" className="header__logo"></a>

              <div className="header__menu menu">
                <div
                  className={`menu__icon ${iconMenuActive ? "_active" : ""}`}
                  onClick={handleIconMenuActive}
                >
                  <span></span>
                </div>
                <nav
                  className={`menu__body ${iconMenuActive ? "_active" : ""}`}
                >
                  <ul className="menu__list">
                    <li>
                      <a className="menu__link">Первый пункт</a>
                    </li>

                    <li className={`${isArrowActive ? "_active" : ""}`}>
                      <a className="menu__link">Второй пункт</a>
                      <span
                        className="menu__arrow"
                        onClick={handleArrowActive}
                      ></span>
                      <ul className="menu__sub-list">
                        <li>
                          <a className="menu__sub-link">1 подпункт 2-го меню</a>
                        </li>
                        <li>
                          <a className="menu__sub-link">2 подпункт 2-го меню</a>
                        </li>
                        <li>
                          <a className="menu__sub-link">3 подпункт 2-го меню</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <NavLink to={"/signin"} className="menu__link">
                        Вход
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </div>
      ) : (
        <div className="wrapper">
          <header className="header">
            <div className="header__container">
              <a href="#" className="header__logo"></a>

              <div className="header__menu menu">
                <div
                  className={`menu__icon ${iconMenuActive ? "_active" : ""}`}
                  onClick={handleIconMenuActive}
                >
                  <span></span>
                </div>
                <nav
                  className={`menu__body ${iconMenuActive ? "_active" : ""}`}
                >
                  <ul className="menu__list">
                    <li>
                      <a className="menu__link">Первый пункт</a>
                    </li>

                    <li className={`${isArrowActive ? "_active" : ""}`}>
                      <a className="menu__link">Второй пункт</a>
                      <span
                        className="menu__arrow"
                        onClick={handleArrowActive}
                      ></span>
                      <ul className="menu__sub-list">
                        <li>
                          <a className="menu__sub-link">1 подпункт 2-го меню</a>
                        </li>
                        <li>
                          <a className="menu__sub-link">2 подпункт 2-го меню</a>
                        </li>
                        <li>
                          <a className="menu__sub-link">3 подпункт 2-го меню</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="profile__dropdown">
                        <div
                          className="profile__dropdown__btn"
                          onClick={handleDropClick}
                          ref={profileDropdownBtnRef}
                        >
                          <div className="profile__img">
                            <i className="fa-solid fa-circle"></i>
                          </div>
                          <span>
                            {userNameSession}
                            <i className="fa-solid fa-angle-down"></i>
                          </span>
                        </div>

                        <ul
                          className={`profile__dropdown__list ${
                            dropActive ? "_active-dropmenu" : ""
                          }`}
                          ref={profileDropdownListRef}
                        >
                          <li className="profile__dropdown__item">
                            <a href="#">
                              <i className="fa-regular fa-user"> </i>
                              Изменить профиль
                            </a>
                          </li>
                          <li className="profile__dropdown__item">
                            <a href="#">
                              <i className="fa-regular fa-envelope"> </i>
                              Ответили {`${replyCount?.replies}`}
                            </a>
                          </li>
                          <li className="profile__dropdown__item">
                            <a href="#">
                              <i className="fa-regular fa-heart"> </i>
                              Реакции {`${replyCount?.reactions}`}
                            </a>
                          </li>
                          <li
                            className="profile__dropdown__item"
                            onClick={logoutHandler}
                          >
                            <NavLink onClick={logoutHandler}>
                              <i className="fa-solid fa-arrow-right-from-bracket">
                                {" "}
                              </i>
                              Выход
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
}
