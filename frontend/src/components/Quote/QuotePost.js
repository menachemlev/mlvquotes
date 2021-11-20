import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./QuotePost.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";

import Auth from "./../../Auth/Auth";
import { useContext } from "react";
import QuotesContext from "../../Auth/QuotesContext";

import { isItMobile } from "./../../generalFunctions";

export default function QuotePost({
  text,
  title,
  username,
  id,
  likes,
  dislikes,
  comments,
  onDelete,
}) {
  const quotesCtx = useContext(QuotesContext);
  const ctx = useContext(Auth);
  const history = useHistory();
  const quoteCut = (q) => {
    if (q.length < 70) return q;
    return `${q.substring(0, 70)}...`;
  };

  const removeLikeOrDislike = (likeOrDislike) => {
    localStorage.removeItem(`like${id}`);
    fetch(`${ctx.fetchProviderURL}/quotes/remove${likeOrDislike}`, {
      method: "POST",
      body: JSON.stringify({
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
      .catch((err) => console.error(err.message));
  };

  const handleOnLikeClick = () => {
    if (localStorage && localStorage[`like${id}`]) {
      if (localStorage[`like${id}`] === "👎") removeLikeOrDislike("dislike");
      else if (localStorage[`like${id}`] === "👍")
        return removeLikeOrDislike("like");
      else return;
    }
    localStorage.setItem(`like${id}`, "👍");
    fetch(`${ctx.fetchProviderURL}/quotes/like`, {
      method: "POST",
      body: JSON.stringify({
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
      .catch((err) => console.error(err.message));
  };

  const handleOnDisLikeClick = () => {
    if (localStorage && localStorage[`like${id}`]) {
      if (localStorage[`like${id}`] === "👎")
        return removeLikeOrDislike("dislike");
      else if (localStorage[`like${id}`] === "👍") removeLikeOrDislike("like");
      else return;
    }
    localStorage.setItem(`like${id}`, "👎");
    fetch(`${ctx.fetchProviderURL}/quotes/dislike`, {
      method: "POST",
      body: JSON.stringify({
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
      .catch((err) => console.error(err.message));
  };
  return (
    <blockquote
      className="quotePost"
      style={{ height: isItMobile() && "30vh" }}
    >
      <q>{quoteCut(text)}</q>
      <figcaption>
        <b>{title}</b>{" "}
        <cite>
          ,
          {username === "Anonymous" ? (
            <b>{username}</b>
          ) : (
            <Link to={`/profile/${username}`}>{username}</Link>
          )}
        </cite>
      </figcaption>
      <div className="quote-social">
        <Link to={`/quote/${id}`} className="quote-social__comments">
          {comments.length > 0 && `(${comments.length})`} Comments
        </Link>
        <div className="like">
          <span className="quote__react-button">
            <ThumbUpIcon
              onClick={handleOnLikeClick}
              style={{
                color:
                  localStorage[`like${id}`] === "👍"
                    ? "var(--color-primary)"
                    : "",
              }}
            />
          </span>{" "}
          {likes}
        </div>
        <div className="dislike">
          <span className="quote__react-button">
            <ThumbDownIcon
              onClick={handleOnDisLikeClick}
              style={{
                color:
                  localStorage[`like${id}`] === "👎"
                    ? "var(--color-primary)"
                    : "",
              }}
            />
          </span>{" "}
          {dislikes}
        </div>
        {onDelete && (
          <div className="trash">
            <span className="quote__react-button">
              <DeleteIcon
                onClick={() => {
                  onDelete(id);
                }}
              />
            </span>
          </div>
        )}
      </div>
    </blockquote>
  );
}
