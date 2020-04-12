import React from "react";
import { withRouter } from "react-router-dom";

import { getDatabase, deleteMovieFromFavorites } from "../../helpers/_functions/index";

import MovieCard from "../MovieCard";

import movieFinder from "../../services/MovieFinder";

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
        const movies = this.state.movies.filter(movie => movie.movieId !== movieId)
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

  deleteMoviefromFavAndRegenerateList = (movie) => {
    deleteMovieFromFavorites(movie.movieId)
    .then(() => {
        const movies = this.state.movies.filter(mov => mov.movieId !== movie.movieId)
        this.setState({
          movies
        })
      })
      .catch(err => {
        console.error(err);
      })
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
            movies.map(movie => (
              <MovieCard 
                movieImage={this.movieFinder.getImageMovie(movie.poster_path, 200)} 
                movie={movie}
                key={`${movie.id}-${movie.release_date}`}
                indexedDbSupported={this.state.indexedDbSupported}
                deleteMovieFromFavorites={this.deleteMoviefromFavAndRegenerateList}
                seeMovieDetails={() => this.seeMovieDetails(movie.movieId)}
                onlyDelete={true}
              />
            )
          )}
        </ul>
      );
    }

    return (
      <section className="favorites-page">
        <h1>Mes films</h1>
        {this.state.movies && this.state.movies.length === 0 && <p className="no-favories">Aucun film n'est enregistré dans vos favoris <span role="img" aria-label="emoji triste">😩</span></p>}
        {this.state.movies && this.state.movies.length > 0 && renderFavoritesMoviesSection(this.state.movies)}
      </section>
    );
  }
}

export default withRouter(Favorites)