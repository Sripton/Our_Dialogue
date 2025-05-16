import React from "react";
export default function Postform({
  submitPostHandler,
  inputs,
  inputPostHandler,
}) {
  return (
    <form className="form-post" onSubmit={submitPostHandler}>
      <textarea
        name="posttitle"
        value={inputs}
        onChange={inputPostHandler}
        placeholder="Оставьте свой пост здесь..."
        rows="4"
      ></textarea>
      <button id="submit-post" type="submit">
        Опубликовать
      </button>
    </form>
  );
}
