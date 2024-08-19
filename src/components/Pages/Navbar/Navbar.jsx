import React from "react";

export default function Navbar({
  isArrowActive,
  handleArrowActive,
  iconMenuActive,
  handleIconMenuActive,
}) {
  return (
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
            <nav className={`menu__body ${iconMenuActive ? "_active" : ""}`}>
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
                  <a className="menu__link">Третий пункт</a>
                </li>
                <li>
                  <a className="menu__link">Вход</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
