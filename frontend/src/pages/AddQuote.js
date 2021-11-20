import "./AddQuote.css";
import { useRef } from "react";
import Card from "../components/UI/Card";
import { useContext } from "react";
import Auth from "../Auth/Auth";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import QuotesContext from "../Auth/QuotesContext";

export default function AddQuote() {
  const ctx = useContext(Auth);
  const quotesCtx = useContext(QuotesContext);

  const titleRef = useRef(null);
  const quoteRef = useRef(null);
  const anonymousRef = useRef(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${ctx.fetchProviderURL}/quotes`, {
      method: "POST",
      body: JSON.stringify({
        text: quoteRef.current.value,
        title: titleRef.current.value,
        username: anonymousRef?.current?.checked
          ? "Anonymous"
          : ctx.username || "Anonymous",
        email: ctx.email,
      }),
      headers: { "Content-type": "Application/json" },
    })
      .then((res) => {
        if (!res) throw new Error("Could not connect!");
        return res.json();
      })
      .then((res) => {
        setMessage("Posted quote successfully! Redirecting...");
        quotesCtx.updateDB((prev) => !prev);

        setTimeout(() => {
          history.push("/");
        }, 1000);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="addquote">
      <div className="addquote__container">
        <Card>
          <form onSubmit={handleOnFormSubmit}>
            <div>
              <h1>Add a quote:</h1>
            </div>
            <div>
              <label> Quote title</label>
              <input ref={titleRef} type="text" />
            </div>
            <div>
              <label> Quote text</label>
              <textarea
                style={{ resize: "none" }}
                rows="3"
                cols="40"
                ref={quoteRef}
                type="text"
              />
            </div>
            {ctx.loggedIn && (
              <div>
                <label> Post anoninoumsly</label>
                <input type="checkbox" ref={anonymousRef} />
              </div>
            )}
            <div>
              <button>Add Quote</button>
            </div>
            {message}
          </form>
        </Card>
      </div>
    </div>
  );
}
