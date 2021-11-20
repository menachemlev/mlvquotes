import "./Login.css";
import { useState, useContext, useEffect } from "react";
import SigninForm from "../components/Login/SigninForm";
import SignupForm from "../components/Login/SignupForm";
import Card from "./../components/UI/Card";
import Auth from "./../Auth/Auth";
import { useHistory } from "react-router-dom";
function Login(props) {
  const [signupMode, setSignupMode] = useState(false);
  const { loggedIn } = useContext(Auth);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) history.push("/");
  }, []);

  return (
    <div className="login">
      <div className="login__form">
        <Card>{signupMode ? <SignupForm /> : <SigninForm />}</Card>
        {signupMode ? (
          <b
            onClick={() => setSignupMode(false)}
            style={{
              marginTop: "1rem",
              cursor: "pointer",
              color: "#333",

              textAlign: "center",
            }}
          >
            &nbsp;&nbsp;&nbsp;<u>Already signed up? Sign in</u>
          </b>
        ) : (
          <b
            onClick={() => setSignupMode(true)}
            style={{
              marginTop: "1rem",
              cursor: "pointer",
              color: "#333",

              textAlign: "center",
            }}
          >
            &nbsp;&nbsp;&nbsp;<u>Not signed up? Sign up</u>
          </b>
        )}
      </div>
    </div>
  );
}

export default Login;
