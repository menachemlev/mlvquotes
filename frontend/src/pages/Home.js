import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import background from "./../photos/background.jpg";

import Auth from "../Auth/Auth";
import "./Home.css";
import QuotesContext from "../Auth/QuotesContext";
import QuotePost from "../components/Quote/QuotePost";
function Home(props) {
  const quotesContext = useContext(QuotesContext);
  return (
    <div className="home">
      <div className="home__quotes">
        {quotesContext.quotes.map((quote) => {
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
      <button className="more-results" onClick={quotesContext.moreResults}>
        More results
      </button>
    </div>
  );
}

export default Home;
/*
 
*/
