import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";
import Movie from "./components/Movie";

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
            <Route path="/me">
              <Profile />
            </Route>
            <Route path="/movie/:id" children={<Movie />} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}