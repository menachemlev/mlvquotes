import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddComment from "../components/Quote/AddComment";
import Comments from "../components/Quote/Comments";
import "./Quote.css";
import QuotesContext from "../Auth/QuotesContext";
import Auth from "../Auth/Auth";

export default function Quote(props) {
  const authCtx = useContext(Auth);
  const [currentQuote, setCurrentQuote] = useState({});
  useEffect(() => {
    //I FETCH THE CURRENT QUOTE FOR RANDOM ACCESS CASE(NOT THROUGH HOMEPAGE)
    const fetchQuote = () => {
      fetch(`${authCtx.fetchProviderURL}/quotes/quote/${id}`)
        .then((res) => {
          if (!res) throw new Error("Something went very wrong!");
          return res.json();
        })
        .then((res) => {
          if (res.status === "failed") throw new Error(res.message);
          setCurrentQuote(res.data.quote);
        })
        .catch((err) => console.error(err));
    };
    fetchQuote();
    setInterval(fetchQuote, 1000);
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
