import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signin({ setUserNameSession, setUserIDSession }) {
  const [inputs, setInputs] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch("/api/users/signin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputs),
    });
    if (responce.ok) {
      const data = await responce.json();
      setUserNameSession(data.userName);
      setUserIDSession(data.userID);
      navigate('/')
    }
  };

  console.log("inputs", inputs);
  return (
    <div className="wrapper__register">
      <div className="blob"></div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <h2 className="login__title">Вход</h2>
          <div className="input__box">
            <span className="icon">
              {" "}
              <ion-icon name="mail-outline"></ion-icon>
            </span>
            <input
              type="email"
              name="login"
              value={inputs.login}
              onChange={inputHandler}
              placeholder="логин"
            />
          </div>
          <div className="input__box">
            <span className="icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={inputHandler}
              placeholder="пароль"
            />
          </div>
          <div className="remember__forgot">
            <label>
              <input type="checkbox" />
              Запомнить
            </label>
            <a href="#"> Забыли пароль?</a>
          </div>
          <button type="submit">Войти</button>
          <div className="registration__list">
            <p>
              Еще не зарегистрированы?{" "}
              <NavLink to={"/signup"} className="registration__link">
                Регистрация
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
