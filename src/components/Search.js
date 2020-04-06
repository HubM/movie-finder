import React from "react";
import { withRouter } from "react-router-dom";

import { getDatabase, addToFavorite, deleteMovieFromFavorites } from "../helpers/_functions/index"

import movieFinder from "../services/MovieFinder";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: undefined,
      search: "",
      movies: [],
      indexedDbSupported: ('indexedDB' in window)
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
    if (this.state.search && this.state.search.length > 2) {
      this.movieFinder.searchMovie(this.state.search)
        .then(async movies => {
          const dbMovies = await this.state.db.getAllFromIndex('favorites', 'title');
          const moviesWithFavorisInfos = movies.map(movie => {
            return {
              ...movie,
              inFav: dbMovies.some(dbMovie => dbMovie.movieId === movie.id)
            }
          })
          this.setState({
            movies: moviesWithFavorisInfos
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
  
  generateMoviesList = (movies) => {
    const listMovies = movies.map(movie => {
      const movieKey = `${movie.id}-${movie.release_date}`;
      const movieImage = this.movieFinder.getImageMovie(movie.poster_path, 200)

      let btnAction = <button onClick={() => addToFavorite(movie)}>Ajouter</button>;

      if (movie.inFav) {
        btnAction = <button onClick={() => deleteMovieFromFavorites(movie.id)}>Supprimer</button>
      }

      return (
        <li className="search-movie" key={movieKey}>
          <img src={movieImage} alt={`Affiche de ${movie.title}`} />
          <p className="search-movie__title">{movie.title}</p>
          <p className="search-movie__release">{movie.release_date}</p>
          { this.state.indexedDbSupported && btnAction }
          
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
        { this.state.movies.length > 0 && this.generateMoviesList(this.state.movies) }
      </section>
    )
  }
}

export default withRouter(Search)