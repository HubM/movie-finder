import React from "react";
import { withRouter } from "react-router-dom";

import Loading from "../components/loading/Search";
import MovieCard from "../components/cards/Movie";

import { getDatabase, addToFavorite, deleteMovieFromFavorites } from "../helpers/_functions/db";

import movieFinder from "../services/MovieFinder";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: null,
      search: "",
      movies: [],
      moviesNotFound: false,
      indexedDbSupported: "indexedDB" in window,
      loading: false,
      currentPage: 1,
    };
    this.movieFinder = new movieFinder();
  }

  componentDidMount() {
    getDatabase()
      .then((db) => {
        this.setState({ db });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  keyPress = (event) => (event.keyCode === 13 ? this.searchMovie() : false);

  searchMovie = (page = 1) => {
    this.setState({
      loading: true,
      moviesNotFound: false,
    });
    setTimeout(() => {
      this.movieFinder
        .searchMovie(this.state.search, page)
        .then(async (movies) => {
          if (!movies.length) {
            this.setState({
              moviesNotFound: true,
            });
            return;
          }
          const dbMovies = await this.state.db.getAllFromIndex("favorites", "title");
          const moviesWithFavorisInfos = movies.map((movie) => {
            return {
              ...movie,
              inFav: dbMovies.some((dbMovie) => dbMovie.movieId === movie.id),
            };
          });
          this.setState({
            movies: moviesWithFavorisInfos,
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() =>
          this.setState({
            loading: false,
          })
        );
    }, 1000);
  };

  addMovieInFavAndRegenerateList = (movie) => {
    addToFavorite(movie)
      .then(() => {
        const movieUpdated = Object.assign(movie, {
          inFav: true,
        });
        const bindedMovieIndex = this.state.movies.findIndex((mov, index) => mov.id === movie.id);
        this.state.movies.splice(bindedMovieIndex, 1, movieUpdated);
        this.setState({
          movies: this.state.movies,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteMoviefromFavAndRegenerateList = (movie) => {
    deleteMovieFromFavorites(movie.id)
      .then(() => {
        delete movie.inFav;
        const bindedMovieIndex = this.state.movies.findIndex((mov, index) => mov.id === movie.id);
        this.state.movies.splice(bindedMovieIndex, 1, movie);
        this.setState({
          movies: this.state.movies,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  generateMoviesList = (movies) => {
    return movies.map((movie) => (
      <MovieCard
        movieImage={this.movieFinder.getImageMovie(movie.poster_path, 200)}
        movie={movie}
        key={`${movie.id}-${movie.release_date}`}
        indexedDbSupported={this.state.indexedDbSupported}
        addToFavorite={this.addMovieInFavAndRegenerateList}
        deleteMovieFromFavorites={this.deleteMoviefromFavAndRegenerateList}
        seeMovieDetails={() => this.seeMovieDetails(movie.id)}
      />
    ));
  };

  seeMovieDetails = (id) => this.props.history.push(`/movie/${id}`);

  searchResetState = () => {
    if (this.state.loading) {
      return <Loading width="25px" heigth="25px" />;
    }
    return (
      <div
        className={`reset-search ${this.state.search.length <= 2 ? "disabledBtn" : ""}`}
        onClick={() => this.setState({ movies: [], search: "", moviesNotFound: false })}
      >
        <span>+</span>
      </div>
    );
  };

  seeOtherPage = (type) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (type === 1) {
      this.setState(
        (prevState) => ({
          currentPage: prevState.currentPage + 1,
        }),
        () => {
          this.searchMovie(this.state.currentPage);
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          currentPage: prevState.currentPage - 1,
        }),
        () => {
          this.searchMovie(this.state.currentPage);
        }
      );
    }
  };

  render() {
    return (
      <section className="search-page">
        <h1>Rechercher un film</h1>
        <div className="search">
          <div>
            <input
              type="text"
              aria-label="Bouton de recherche d'un film"
              placeholder="Shutter island..."
              onChange={(event) => this.setState({ search: event.target.value })}
              onKeyDown={this.keyPress}
              value={this.state.search}
              className={`search-input ${this.state.search.length > 2 ? "usable" : ""}`}
            />
            {this.searchResetState()}
          </div>
          <button onClick={this.searchMovie} className={`search-action ${this.state.search.length <= 2 ? "disabledBtn" : ""}`}>
            Rechercher
          </button>
        </div>

        {!this.state.indexedDbSupported && <p>Vous devriez utiliser un navigateur moderne pour pouvoir enregistrer vos films préférés</p>}
        {this.state.moviesNotFound ? (
          <p>Aucun film ne correspond à votre cherche :(</p>
        ) : (
          <div className="movies-section">
            <div className="movies-list">
              <ul className="layout-list">{this.generateMoviesList(this.state.movies)}</ul>
            </div>
            <div className="pagination">
              {this.state.currentPage > 1 && (
                <p className="pagination__prev cursorPointer" onClick={() => this.seeOtherPage(-1)}>
                  Précédent
                </p>
              )}
              {this.state.movies.length > 0 && (
                <p className="cursorPointer" onClick={() => this.seeOtherPage(1)}>
                  Suivant
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default withRouter(Search);
