import React from "react";

export default function Navbar({ isArrowActive, handleArrowClick }) {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="header__container">
          <a href="#" className="header__logo"></a>

          <div className="header__menu menu">
            <div className="menu__icon">
              <span></span>
            </div>
            <nav className="menu__body">
              <ul className="menu__list">
                <li>
                  <a className="menu__link">Первый пункт</a>
                </li>
                <li>
                  <a className="menu__link">Второй пункт</a>
                </li>
                <li>
                  <a className="menu__link">Третий пункт</a>
                  <span className="menu__arrow"></span>
                  <ul className="menu__sub-list">
                    <li>
                      <a className="menu__sub-link">1 подпункт 3-го меню</a>
                    </li>
                    <li>
                      <a className="menu__sub-link">2 подпункт 3-го меню</a>
                    </li>
                    <li>
                      <a className="menu__sub-link">3 подпункт 3-го меню</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu__link">Четвертый пункт</a>
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
