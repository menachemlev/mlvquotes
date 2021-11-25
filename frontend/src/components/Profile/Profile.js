import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Auth from "./../../Auth/Auth";

import QuotePost from "./../Quote/QuotePost";
export default function Profile(props) {
  const params = useParams();
  const authCtx = useContext(Auth);
  const [quotes, setQuotes] = useState([]);
  const [isAccountFollowed, setIsAccountFollowed] = useState(
    (JSON.parse(localStorage.getItem("accountsFollowed")) || []).includes(
      params.username
    )
  );

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

  //ON USER FOLLOWING
  const handleOnFollowUser = () => {
    if (!localStorage) return;
    const accountsFollowed = JSON.parse(
      localStorage.getItem("accountsFollowed")
    );
    localStorage.setItem(
      "accountsFollowed",
      JSON.stringify([params.username, ...(accountsFollowed || [])])
    );
    setIsAccountFollowed(true);
  };

  const handleOnUnfollowUser = () => {
    if (!localStorage) return;
    const accountsFollowed = JSON.parse(
      localStorage.getItem("accountsFollowed")
    );
    localStorage.setItem(
      "accountsFollowed",
      JSON.stringify(
        (accountsFollowed || []).filter(
          (account) => account !== params.username
        )
      )
    );
    setIsAccountFollowed(false);
  };
  //SAME RENDERING AS ON HOMEPAGE
  return (
    <>
      <h1 className="pageTitle">{params.username} quotes</h1>
      <center>
        <b
          style={{ color: "white", cursor: "pointer" }}
          onClick={
            isAccountFollowed ? handleOnUnfollowUser : handleOnFollowUser
          }
        >
          {isAccountFollowed ? "⛔ Unfollow" : "✔ Follow"}
        </b>
      </center>
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
              onDelete={null}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
}
