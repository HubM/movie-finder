import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

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
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </Router>
  );
}