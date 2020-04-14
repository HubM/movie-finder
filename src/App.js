import React,  { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./components/views/Home"))
const Search = lazy(() => import("./components/views/Search"))
const Favorites = lazy(() => import("./components/views/Favorites"))
const Movie = lazy(() => import("./components/views/Movie"))


export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Router>
  );
}