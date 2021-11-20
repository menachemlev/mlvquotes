import "./Header.css";
import { NavLink } from "react-router-dom";
import Logo from "./logo.png";
import { useContext, useEffect, useState } from "react";
import Auth from "./../../Auth/Auth";
function Header(props) {
  const { loggedIn } = useContext(Auth);
  const [portrait, setPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    setInterval(() => {
      setPortrait(window.innerHeight > window.innerWidth);
    }, 2000);
  }, []);

  return (
    <header className="header">
      <div className="navigator">
        <NavLink className="link" activeClassName="active" to="/" exact>
          📒 {!portrait && "Quotes"}
        </NavLink>

        <NavLink className="link" activeClassName="active" to="/add-quote">
          📝{!portrait && "Add quote"}
        </NavLink>
        {!loggedIn && (
          <NavLink className="link" activeClassName="active" to="/login">
            👋 {!portrait && "Login"}
          </NavLink>
        )}
        {loggedIn && (
          <>
            <NavLink className="link" activeClassName="active" to="/account">
              Account
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
/*
 <div className="logo-box">
        <NavLink activeClassName="" to="/">
          <img
            className="logo"
            style={{
              width: `${portrait ? "3rem" : "1.5rem"}`,
              margin: `${portrait ? "2rem 0 0 0" : " 0 2rem 0 0"}`,
            }}
            alt=""
            src={Logo}
          />
        </NavLink>
      </div>
*/
