import React,  { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Logo from "./components/Logo";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./components/views/Home"))
const Search = lazy(() => import("./components/views/Search"))
const Favorites = lazy(() => import("./components/views/Favorites"))
const Movie = lazy(() => import("./components/views/Movie"))




export default function App() {

  const LoadingFallBack = <div className="loadingState">HERE
  <Logo width="100px" height="100px" /></div>

  return (
    <Router>
      <Suspense fallback={LoadingFallBack}>
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