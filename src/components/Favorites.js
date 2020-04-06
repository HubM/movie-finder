import React from "react";
import { withRouter } from "react-router-dom";

import { getDatabase, deleteMovieFromFavorites } from "../helpers/_functions/index";

import movieFinder from "../services/MovieFinder";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexedDbSupported: ('indexedDB' in window),
      movies: undefined,
      db: undefined
    }
    this.movieFinder = new movieFinder();
  }
  componentDidMount() {
    this.getFavoritesMovies()
  }

  getFavoritesMovies = () => {
    getDatabase()
    .then(async db => {
      this.setState({
        db,
        movies: await db.getAllFromIndex('favorites', 'title')
      }) 
    })
    .catch(err => {
      console.error(err);
    }) 
  }

  deleteMovieAction = movieId => {
    deleteMovieFromFavorites(movieId)
      .then(() => {
        const movies = this.state.movies.filter(movie => movie.id !== movieId)
        this.setState({
          movies
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  seeMovieDetails = id => {
    this.props.history.push(`/movie/${id}`);
  }
  render() {
    const renderFavoritesMoviesSection = (movies) => {
      if (!this.state.indexedDbSupported) {
        return (
          <p>Vous devriez utiliser un navigateur moderne pour pouvoir consulter vos films préférés</p>
        );
      } 
      
      return (
        <ul>
          {
            movies.map(movie => {
              const movieKey = `${movie.movieId.toString()}-${movie.release_date}`;
              const movieImage = this.movieFinder.getImageMovie(movie.poster_path, 500);
              return (
                <li className="favorite-movie" key={movieKey}>
                  <img src={movieImage} alt={`Affiche de ${movie.title}`} />
                  <p className="favorite-movie__release">{movie.release_date}</p>
                  <p className="favorite-movie__synopsis">{movie.overview}</p>
                  <button onClick={() => this.deleteMovieAction(movie.movieId)}>Supprimer des favoris</button>
                  <button onClick={() => this.seeMovieDetails(movie.movieId)}>Détails</button> 
                </li>
              )
            })}
        </ul>
      );

    }

    return (
      <section className="favorites-page">
        <h1>Favorites Page</h1>
        {this.state.movies && this.state.movies.length === 0 && <p>Aucun film n'est enregistré dans vos favoris</p>}
        {this.state.movies && this.state.movies.length > 0 && renderFavoritesMoviesSection(this.state.movies)}
      </section>
    );
  }
}

export default withRouter(Favorites)