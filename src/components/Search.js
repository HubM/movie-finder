import React from "react";
import movieFinder from "../services/MovieFinder";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      movies: [],
      indexedDbSupported: ('indexedDB' in window)
    }
    this.searchMovie = this.searchMovie.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
    this.movieFinder = new movieFinder();
  }
  keyPress(event) {
    return event.keyCode === 13 ? this.searchMovie() : false;
  }
  searchMovie() {
    if (this.state.search && this.state.search.length > 2) {
      this.movieFinder.searchMovie(this.state.search)
        .then(movies => {
          this.setState({
            movies
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
  addToFavorite(movie) {
    // this.
  }
  listMovies(movies) {
    const listMovies = movies.map(movie => {
      const movieKey = `${movie.id}-${movie.release_date}`;
      const movieImage = this.movieFinder.getImageMovie(movie.poster_path, 200)
      return (
        <li className="search-movie" key={movieKey}>
          <img src={movieImage} alt={`Affiche de ${movie.title}`} />
          <p className="search-movie__title">{movie.title}</p>
          <p className="search-movie__release">{movie.release_date}</p>
          { this.state.indexedDbSupported && <button onClick={() => this.addToFavorite(movie)}>Ajouter</button> }
        </li>
      );
    })

    return (
      <ul>
        {listMovies}
      </ul>
    );
  }

  render() {
    return (
      <section className="search-page">
        <h1>Search Page</h1>
        <label htmlFor="movie-search">Rechercher un film:</label>
        <input 
          type="text" 
          aria-label="Rechercher un film" 
          onChange={(event) => this.setState({ search: event.target.value })} 
          onKeyDown={this.keyPress}
        />
        <button onClick={this.searchMovie}>Rechercher</button>

        { !this.state.indexedDbSupported && <p>Vous devriez utiliser un navigateur moderne pour pouvoir enregistrer vos films préférés</p> }
        { this.state.movies.length > 0 && this.listMovies(this.state.movies) }
      </section>
    )
  }
}