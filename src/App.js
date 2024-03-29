import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoadingLogo from "./components/loading/logo";

const Layout = lazy(() => import("./components/layout"));
const Home = lazy(() => import("./components/views/Home"));
const SearchMovie = lazy(() => import("./components/views/search/Movie"));
const SearchActor = lazy(() => import("./components/views/search/Actor"));
const Favorites = lazy(() => import("./components/views/Favorites"));
const Movie = lazy(() => import("./components/views/Movie"));
const Actor = lazy(() => import("./components/views/Actor"));

export default function App() {
  const LoadingFallback = <LoadingLogo />;
  return (
    <Router>
      <Suspense fallback={LoadingFallback}>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/search-movie">
                <SearchMovie />
              </Route>
              <Route path="/search-actor">
                <SearchActor />
              </Route>
              <Route path="/favorites">
                <Favorites />
              </Route>
              <Route path="/movie/:id" children={<Movie />} />
              <Route path="/actor/:id" children={<Actor />} />
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
