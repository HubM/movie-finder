import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/views/Home";
import Search from "./components/views/Search";
import Favorites from "./components/views/Favorites";
import Movie from "./components/views/Movie";


export default function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/movie/:id" children={<Movie />} />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}