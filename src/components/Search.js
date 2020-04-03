import React from "react";
import { openDB } from 'idb';
import { withRouter } from "react-router-dom";

import movieFinder from "../services/MovieFinder";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      movies: [],
      indexedDbSupported: ('indexedDB' in window)
    }
    this.movieFinder = new movieFinder();
  }


  keyPress = (event) => event.keyCode === 13 ? this.searchMovie() : false;

  searchMovie = () => {
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
  
  addToFavorite = async (movie) => {
    const { id, title, overview, poster_path, release_date } = movie;
    const db = await openDB('movies', 1, {
      upgrade(db) {
        const store = db.createObjectStore('favorites', {
          keyPath: 'id',
          autoIncrement: true,
        });
        // Create an index on the 'date' property of the objects.
        store.createIndex('title', 'title');
        store.createIndex('movieId', 'movieId');
      },
    });
    
    const dbMovies = await db.getAllFromIndex('favorites', 'title');
    const existingMovie = dbMovies.find(movie => movie.movieId === id);

    if (!existingMovie) {
      await db.add('favorites', {
        movieId: id,
        title,
        overview,
        poster_path,
        release_date
      });
    } else {
      console.log("Movie always in DB")
    }
  }

  listMovies = (movies) => {
    const listMovies = movies.map(movie => {
      const movieKey = `${movie.id}-${movie.release_date}`;
      const movieImage = this.movieFinder.getImageMovie(movie.poster_path, 200)
      return (
        <li className="search-movie" key={movieKey}>
          <img src={movieImage} alt={`Affiche de ${movie.title}`} />
          <p className="search-movie__title">{movie.title}</p>
          <p className="search-movie__release">{movie.release_date}</p>
          { this.state.indexedDbSupported && <button onClick={() => this.addToFavorite(movie)}>Ajouter</button> }
          <button onClick={() => this.seeMovieDetails(movie.id)}>Détails</button> 
        </li>
      );
    })

    return (
      <ul>
        {listMovies}
      </ul>
    );
  }

  seeMovieDetails = id => {
    this.props.history.push(`/movie/${id}`);
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

export default withRouter(Search)