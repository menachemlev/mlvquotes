import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Auth from "./../../Auth/Auth";

import QuotePost from "./../Quote/QuotePost";
export default function Profile(props) {
  const params = useParams();
  const authCtx = useContext(Auth);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const fetchUserQuotes = () => {
      fetch(
        `${authCtx.fetchProviderURL}/quotes/user?username=${params.username}`
      )
        .then((res) => {
          if (!res) throw new Error("Could not connect!");
          return res.json();
        })
        .then((res) => {
          setQuotes(res.data.quotes || []);
        })
        .catch((err) => console.error(err));
    };
    fetchUserQuotes();
    setInterval(fetchUserQuotes, 1000);
  }, []);
  //SAME RENDERING AS ON HOMEPAGE
  return (
    <>
      <h1 className="pageTitle">{params.username} quotes</h1>
      <div className="home__quotes">
        {quotes.map((quote) => {
          return (
            <QuotePost
              key={quote._id}
              id={quote._id}
              text={quote.text}
              username={quote.username}
              title={quote.title}
              likes={quote.likes}
              dislikes={quote.dislikes}
              comments={quote.comments}
              onDelete={null}
            />
          );
        })}
      </div>
    </>
  );
}
