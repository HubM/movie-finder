import React from "react";
import { withRouter } from "react-router-dom";
// import moment from "moment";

import Loading from "./Loading";
import MovieCard from "./MovieCard"

import { getDatabase, addToFavorite, deleteMovieFromFavorites } from "../helpers/_functions/index"

import movieFinder from "../services/MovieFinder";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: undefined,
      search: "",
      movies: [],
      moviesNotFound: false,
      indexedDbSupported: ('indexedDB' in window),
      loading: false
    }
    this.movieFinder = new movieFinder();
  }

  componentDidMount() {
    getDatabase()
      .then(db => {
        this.setState({ db })
      })
      .catch(err => {
        console.error(err)
      })
  }

  keyPress = (event) => event.keyCode === 13 ? this.searchMovie() : false;

  searchMovie = () => {
    if (this.state.search.length > 2) {
      this.setState({
        loading: true,
        moviesNotFound: false
      })
      setTimeout(() => {
        this.movieFinder.searchMovie(this.state.search)
          .then(async movies => {
            if (!movies.length) {
              this.setState({
                moviesNotFound: true
              })
            }
            const dbMovies = await this.state.db.getAllFromIndex('favorites', 'title');
            const moviesWithFavorisInfos = movies.map(movie => {
              return {
                ...movie,
                inFav: dbMovies.some(dbMovie => dbMovie.movieId === movie.id)
              }
            })
            this.setState({
              movies: moviesWithFavorisInfos,
            })
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => (
            this.setState({
              loading: false
            })
          ))
      }, 1000)
    }
  }

  addMovieInFavAndRegenerateList = (movie) => {
    addToFavorite(movie)
    .then(() => {
      const movieUpdated = Object.assign(movie, {
        inFav: true
      })
      const bindedMovieIndex = this.state.movies.findIndex((mov, index) => mov.id === movie.id);
      this.state.movies.splice(bindedMovieIndex, 1, movieUpdated);
      this.setState({
        movies: this.state.movies
      })
    })
    .catch(err => {
      console.error(err)
    })
  }

  deleteMoviefromFavAndRegenerateList = (movie) => {
    deleteMovieFromFavorites(movie.id)
    .then(() => {
      delete movie.inFav;
      const bindedMovieIndex = this.state.movies.findIndex((mov, index) => mov.id === movie.id);
      this.state.movies.splice(bindedMovieIndex, 1, movie);
      this.setState({
        movies: this.state.movies
      })
    })
    .catch(err => {
      console.error(err)
    })
  }  
  
  generateMoviesList = (movies) => {
    const listMovies = movies.map(movie => (
        <MovieCard 
          movieImage={this.movieFinder.getImageMovie(movie.poster_path, 200)} 
          movie={movie}
          key={`${movie.id}-${movie.release_date}`}
          indexedDbSupported={this.state.indexedDbSupported}
          addToFavorite={this.addMovieInFavAndRegenerateList}
          deleteMovieFromFavorites={this.deleteMoviefromFavAndRegenerateList}
          seeMovieDetails={() => this.seeMovieDetails(movie.id)}
        />
      )
    );

    return (
      <ul>
        {listMovies}
      </ul>
    );
  }

  seeMovieDetails = id => {
    this.props.history.push(`/movie/${id}`);
  }

  searchResetState = () => {
    if (this.state.loading) {
      return (
        <Loading width="25px" heigth="25px" />
      )
    } else {
      return (
        <div 
          className={`reset-search ${this.state.search.length <= 2 ? "disabledBtn" : ""}`} 
          onClick={() => this.setState({ movies: [], search: "", moviesNotFound: false })}
        >
          <span>+</span>
        </div>
      );
    }
  }

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
          <button onClick={this.searchMovie} className={`search-action ${this.state.search.length <= 2 ? "disabledBtn" : ""}`}>Rechercher</button>
        </div>

        { !this.state.indexedDbSupported && <p>Vous devriez utiliser un navigateur moderne pour pouvoir enregistrer vos films préférés</p> }
        { this.state.movies.length > 0 && this.generateMoviesList(this.state.movies) }
        { this.state.moviesNotFound && <p>Aucun film ne correspond à votre cherche :(</p>}
      </section>
    )
  }
}

export default withRouter(Search)