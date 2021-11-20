import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import { isItMobile } from "./generalFunctions";

import Home from "./pages/Home";
import Header from "./components/Header/Header";

import Login from "./pages/Login";
import Quote from "./pages/Quote";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import AddQuote from "./pages/AddQuote";
import Profile from "./components/Profile/Profile";

import BackgroundAdder from "./components/UI/BackgroundAdder";

function App() {
  return (
    <>
      {!isItMobile() && (
        <img
          src={
            Math.random() >= 0.66
              ? "/api/photos/block.jpg"
              : Math.random() >= 0.5
              ? "/api/photos/block2.jpg"
              : `/api/photos/block3.jpg`
          }
          style={{
            height: "100%",
            width: "30%",
            position: "fixed",
            top: "0",
            right: "0",
            borderLeft: "3px solid var(--color-primary-light)",
          }}
          alt="block"
        />
      )}
      <div className="app" style={{ width: isItMobile() && "100%" }}>
        <Header />

        <Switch>
          <Route path="/" exact>
            <BackgroundAdder>
              <Home />
            </BackgroundAdder>
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
            <BackgroundAdder>
              <Account />
            </BackgroundAdder>
          </Route>
          <Route path="/profile/:username">
            <BackgroundAdder>
              <Profile />
            </BackgroundAdder>
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
