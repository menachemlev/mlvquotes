import { useContext, useEffect, useState } from "react";
import quotesContext from "./../../Auth/QuotesContext";
import Auth from "./../../Auth/Auth";
import QuotePost from "./../Quote/QuotePost";

export default function UserQoutes(props) {
  const authCtx = useContext(Auth);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const fetchUserQuotes = () => {
      fetch(
        `${authCtx.fetchProviderURL}/quotes/user?username=${authCtx.username}`
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

  const handleOnDelete = (id) => {
    fetch(`${authCtx.fetchProviderURL}/quotes`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
        email: authCtx.email,
        password: authCtx.password,
      }),
      headers: { "Content-type": "Application/json" },
    })
      .then((res) => {
        if (!res) throw new Error("Could not connect!");
        return res.json();
      })
      .then((res) => {
        console.log("Quote deleted!");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="home__quotes">
      {quotes.map((quote, index) => {
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
            onDelete={handleOnDelete}
            index={index}
          />
        );
      })}
    </div>
  );
}
