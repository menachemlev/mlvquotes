import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth/Auth";
import { QuotesContextProvider } from "./Auth/QuotesContext";

ReactDOM.render(
  <AuthProvider>
    <QuotesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuotesContextProvider>
  </AuthProvider>,
  document.getElementById("root")
);
