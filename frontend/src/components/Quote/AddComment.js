import "./AddComment.css";

import { useContext, useRef, useState } from "react";

import QuotesContext from "../../Auth/QuotesContext";
import Auth from "../../Auth/Auth";
import { useHistory } from "react-router-dom";

export default function AddComment({ id }) {
  const history = useHistory();
  const quotesCtx = useContext(QuotesContext);
  const authCtx = useContext(Auth);
  const textRef = useRef(null);

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    const comment = textRef.current.value;
    if (!comment) return;

    fetch(`${authCtx.fetchProviderURL}/quotes/comment`, {
      method: "POST",
      body: JSON.stringify({
        comment,
        id,
      }),
      headers: { "Content-type": "Application/json" },
    })
      .then((res) => {
        if (!res) throw new Error("Could not connect!");
        return res.json();
      })
      .then((res) => {
        quotesCtx.updateDB((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="add-comment-form" onSubmit={handleOnFormSubmit}>
      <textarea
        placeholder="Your comment here..."
        style={{ resize: "none" }}
        ref={textRef}
        rows="5"
        cols="30"
      ></textarea>
      <br />
      <br />
      <button>Post comment</button>
    </form>
  );
}
