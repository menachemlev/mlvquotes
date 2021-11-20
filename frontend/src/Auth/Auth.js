import { createContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Auth = createContext({
  loggedIn: false,
  email: "",
  password: "",
  username: "",
  logIn: ({ email, password, username }) => {},
  logOut: () => {},
  fetchProviderURL: "",
});

export const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const fetchProviderURL = "http://localhost:8000/api/v0";
  useEffect(() => {
    if (typeof localStorage === undefined) return;
    if (!localStorage.getItem("loginData")) return;
    const { email, password, date, username } = JSON.parse(
      localStorage.getItem("loginData")
    );
    if (Date.now() > date + 90 * 24 * 60 * 60 * 1000) return logOut(); //30 days

    fetch(`${fetchProviderURL}/users/auto-login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then((res) => {
        if (!res) throw new Error("Something went wrong...");
        return res.json();
      })
      .then((res) => logIn({ email, password, username }))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logIn = ({ email, password, username }) => {
    setUserName(username);
    setEmail(email);
    setPassword(password);
    setLoggedIn(true);
    if (typeof localStorage === undefined) return;
    localStorage.setItem(
      "loginData",
      JSON.stringify({ email, password, username, date: Date.now() })
    );
  };
  const logOut = () => {
    setEmail("");
    setPassword("");
    setUserName("");
    localStorage.removeItem("loginData");
    setLoggedIn(false);
  };

  return (
    <Auth.Provider
      value={{
        loggedIn,
        logIn,
        logOut,
        email,
        password,
        username,
        fetchProviderURL,
      }}
    >
      {props.children}
    </Auth.Provider>
  );
};

export default Auth;
