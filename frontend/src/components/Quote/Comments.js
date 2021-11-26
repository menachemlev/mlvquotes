import { useContext, useState } from "react";
import "./Comments.css";
import QuotesContext from "../../Auth/QuotesContext";
import { useEffect } from "react";

export default function Comments({ id }) {
  const quotesContext = useContext(QuotesContext);
  return (
    <div
      style={{
        width: "80%",
        height: "30vh",
        overflowY: "scroll",
        overflowX: "hidden",
        border: "var(--color-primary-light) 3px solid",
      }}
    >
      {(
        quotesContext.quotes.find((quote) => quote._id === id)?.comments || []
      ).map((comment) => (
        <div key={Math.random() * 1000000} className="comment-container">
          {comment}
        </div>
      ))}
    </div>
  );
}
