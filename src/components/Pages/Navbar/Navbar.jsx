import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export default function Navbar({
  isArrowActive,
  handleArrowActive,
  iconMenuActive,
  handleIconMenuActive,
  userNameSession,
  userIDsession,
  logoutHandler,
}) {
  const [dropActive, setDropActive] = useState(false);
  const handleDropClick = () => {
    setDropActive(!dropActive);
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      // (!document.querySelector('.profile__dropdown__btn').contains(e.target)){
      //   document.querySelector('.profile__dropdown__list').classList.remove('_active-dropmenu')
      // }
      const profile__dropdown__btn = document.querySelector(
        ".profile__dropdown__btn"
      );
      const profile__dropdown__list = document.querySelector(
        ".profile__dropdown__list"
      );
      if (!profile__dropdown__btn.contains(e.target)) {
        profile__dropdown__list.classList.remove("_active-dropmenu");
      }
    });
  }, []);
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
                              Ответили
                            </a>
                          </li>
                          <li className="profile__dropdown__item">
                            <a href="#">
                              <i className="fa-regular fa-heart"> </i>
                              Понравилось
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
