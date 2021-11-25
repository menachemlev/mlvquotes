import { createContext, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Auth from "./Auth";

const QuotesContext = createContext({
  quotes: [],
  updateDB: () => {},
  moreResults: () => {},
});

export const QuotesContextProvider = (props) => {
  const ctx = useContext(Auth);
  const [quotes, setQuotes] = useState([]);
  const [updateDB, setUpdateDB] = useState(true);
  const [resultsAmount, setResultsAmount] = useState(10);
  const [fetchQuotesInterval, setFetchQuotesInterval] = useState(null);

  useEffect(() => {
    const fetchQuotes = () => {
      fetch(
        `${
          ctx.fetchProviderURL
        }/quotes?results=${resultsAmount}&accounts=${JSON.parse(
          localStorage.getItem("accountsFollowed") || []
        ).join(",")}`
      )
        .then((res) => {
          if (!res) throw new Error("Something went wrong...");
          return res.json();
        })
        .then((res) => {
          if (res.staus === "fail") throw new Error(res.message);
          setQuotes(res.data.quotes || []);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    if (fetchQuotesInterval) clearInterval(fetchQuotesInterval);
    fetchQuotes();
    setFetchQuotesInterval(setInterval(fetchQuotes, 3000));
  }, [updateDB, resultsAmount]);

  const moreResults = () => {
    setResultsAmount((prev) => prev + 10);
  };
  return (
    <QuotesContext.Provider
      value={{
        quotes,
        updateDB: setUpdateDB,
        moreResults,
      }}
    >
      {props.children}
    </QuotesContext.Provider>
  );
};

export default QuotesContext;
