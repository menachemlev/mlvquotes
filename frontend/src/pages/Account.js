import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Auth from "./../Auth/Auth";
import "./Account.css";

import UserQoutes from "../components/Account/UserQuotes";

function Account(props) {
  const ctx = useContext(Auth);
  const history = useHistory();
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [portrait, setPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    setInterval(() => {
      setPortrait(window.innerHeight > window.innerWidth);
    }, 1000);
  }, []);

  const deleteAccount = () => {
    if (message !== "Are you sure?") return setMessage("Are you sure?");
    setTimeout(() => {
      fetch(`${ctx.fetchProviderURL}/users/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          email: ctx.email,
          password: ctx.password,
          username: ctx.username,
        }),
        headers: {
          "Content-type": "Application/json",
        },
      })
        .then((res) => {
          if (!res) throw new Error("Something went wrong...");
          return res.json();
        })
        .then((response) => {
          if (response.status === "fail") throw new Error(response.message);
          setMessage("Deleting account...");
          setTimeout(() => {
            history.push("/");
            ctx.logOut();
          }, 1000);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 1000);
  };

  return (
    <div className="account">
      <h1 className="pageTitle">Account</h1>
      <center>
        <button
          onClick={() => {
            setMessage("Logging out...");
            setTimeout(() => {
              ctx.logOut();
              history.push("/");
            }, 1000);
          }}
        >
          Logout
        </button>
        <button onClick={deleteAccount}>Delete</button>
        <div style={{ color: "white" }}>{message}</div>
        <div style={{ color: "red" }}>{error}</div>
        <br />
        <br />
        <UserQoutes />
        <br />
        <br />
      </center>
    </div>
  );
}

export default Account;
