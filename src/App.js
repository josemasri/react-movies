import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import TvShowPage from "./pages/TvShowPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header title="MarroMedia" />
      <Container style={{ minHeight: "75vh" }} fixed>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movie/:id">
            <MoviePage />
          </Route>
          <Route exact path="/tv-show/:id">
            <TvShowPage />
          </Route>
        </Switch>
      </Container>
      <Footer title="MarroMedia" />
    </Router>
  );
}

export default App;
