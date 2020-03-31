import React from "react";
import { openDB,} from 'idb';
import movieFinder from "../services/MovieFinder";

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexedDbSupported: ('indexedDB' in window),
      movies: undefined,
      db: undefined
    }
    this.movieFinder = new movieFinder();
    this.deleteMovieFromFavorites = this.deleteMovieFromFavorites.bind(this);
  }
  componentDidMount() {
    this.getFavoritesMovies()
  }
  async getFavoritesMovies() {
    const db = await openDB('movies', 1);
    this.setState({
      db,
      movies: await db.getAllFromIndex('favorites', 'title')
    }) 
  }
  async deleteMovieFromFavorites(movieId) {
    const { db } = this.state;
    const movieKey = await db.getKeyFromIndex("favorites", "movieId", movieId);
    await db.delete("favorites", movieKey);
    this.getFavoritesMovies()
  }
  render() {
    const renderFavoritesMoviesSection = () => {
      if (!this.state.indexedDbSupported) {
        return (
          <p>Vous devriez utiliser un navigateur moderne pour pouvoir consulter vos films préférés</p>
        );
      } 
      
      if (this.state.movies && this.state.movies.length) {
        const favoritesMovies = this.state.movies.map(movie => {
          const movieKey = `${movie.movieId}-${movie.release_date}`;
          const movieImage = this.movieFinder.getImageMovie(movie.poster_path, 500);
          return (
            <li className="favorite-movie" key={movieKey}>
              <img src={movieImage} alt={`Affiche de ${movie.title}`} />
              <p className="favorite-movie__release">{movie.release_date}</p>
              <p className="favorite-movie__synopsis">{movie.overview}</p>
              <button onClick={() => this.deleteMovieFromFavorites(movie.movieId)}>Supprimer des favoris</button>
            </li>
          )
        })
        return (
          <ul>
            {favoritesMovies}
          </ul>
        );
      } 

      return (
        <p>Une erreur est survenue, veuillez réessayer ultérieurement</p>
      );
    }

    return (
      <section className="favorites-page">
        <h1>Favorites Page</h1>
        {renderFavoritesMoviesSection()}
      </section>
    );
  }
}