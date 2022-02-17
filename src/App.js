import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoadingLogo from "./components/loading/Logo";

const Layout = lazy(() => import("./components/layout"));
const Home = lazy(() => import("./pages/Home"));
const SearchMovie = lazy(() => import("./pages/SearchMovie"));
const SearchActor = lazy(() => import("./pages/SearchActor"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Movie = lazy(() => import("./pages/SeeMovie"));
const Actor = lazy(() => import("./pages/SeeActor"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingLogo />}>
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
