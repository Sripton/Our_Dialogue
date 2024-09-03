import React, { useState } from "react";

export default function Signup({ setUserNameSession, setUserIDSession }) {
  const [inputs, setInputs] = useState({
    login: "",
    password: "",
    name: "",
  });

  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputs),
    });
    if (responce.ok) {
      const data = await responce.json();
      setUserNameSession(data.userName);
      setUserIDSession(data.userID);
    }
  };

  return (
    <div className="wrapper__register">
      <div className="blob"></div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <h2 className="login__title">Регистрация</h2>

          <div className="input__box">
            <span className="icon">
              {" "}
              <ion-icon name="mail-outline"></ion-icon>
            </span>
            <input
              type="email"
              name="login"
              value={inputs.login}
              placeholder="логин"
              onChange={inputHandler}
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
              placeholder="пароль"
              onChange={inputHandler}
            />
          </div>

          <div className="input__box">
            <span className="icon">
              <ion-icon name="accessibility-outline"></ion-icon>
            </span>
            <input
              type="text"
              name="name"
              value={inputs.name}
              placeholder="имя"
              onChange={inputHandler}
            />
          </div>
          <div className="remember__forgot">
            <label>
              <input type="checkbox" />
              Запомнить
            </label>
            <a href="#"> Забыли пароль?</a>
          </div>
          <button type="submit">Регистрироваться</button>
        </form>
      </div>
    </div>
  );
}
