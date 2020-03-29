import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/search">Rechercher un film</Link></li>
            <li>
              <Link to="/favorites">Ma wishlist</Link>
            </li>
            <li>
              <Link to="/me">Mon profil</Link>
            </li>
          </ul>
        </nav>
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
        </Switch>
      </div>
    </Router>
  );
}