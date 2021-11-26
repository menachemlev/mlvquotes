import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddComment from "../components/Quote/AddComment";
import Comments from "../components/Quote/Comments";
import "./Quote.css";
import QuotesContext from "../Auth/QuotesContext";

export default function Quote(props) {
  const quotesCtx = useContext(QuotesContext);
  const [currentQuote, setCurrentQuote] = useState(
    quotesCtx.quotes.find((quote) => quote.id === id)
  );
  useEffect(() => {
    setInterval(() => {
      setCurrentQuote(quotesCtx.quotes.find((quote) => quote.id === id));
    }, 1000);
  }, []);
  const { id } = useParams();
  const username = currentQuote?.username;
  return (
    <center className="quote">
      <q className="quote__text">{currentQuote?.text}</q>
      <b className="quote__title">{currentQuote?.title}</b>
      {", "}
      {username === "Anonymous" ? (
        <b className="quote__name">{username}</b>
      ) : (
        <Link to={`/profile/${username}`}>{username}</Link>
      )}

      <Comments id={id} />
      <AddComment id={id} />
    </center>
  );
}
