import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import { isItMobile } from "./generalFunctions";

import block from "./block.jpg";
import block2 from "./block2.jpg";
import block3 from "./block3.jpg";

import Home from "./pages/Home";
import Header from "./components/Header/Header";

import Login from "./pages/Login";
import Quote from "./pages/Quote";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import AddQuote from "./pages/AddQuote";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
      {!isItMobile() && (
        <img
          src={
            Math.random() >= 0.66
              ? block
              : Math.random() >= 0.5
              ? block2
              : block3
          }
          style={{
            height: "100%",
            width: "30%",
            position: "fixed",
            top: "0",
            right: "0",
          }}
          alt="block"
        />
      )}
      <div className="app" style={{ width: isItMobile() && "100%" }}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/add-quote">
            <AddQuote />
          </Route>
          <Route path="/quote/:id">
            <Quote />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
