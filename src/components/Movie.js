import React from "react";
import { openDB } from 'idb';
import { withRouter } from "react-router-dom";

import movieFinder from "../services/MovieFinder";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      errorFetch: undefined,
      indexedDbSupported: ('indexedDB' in window),
      isMovieInFav: undefined,
      db: undefined
    }
    this.movieFinder = new movieFinder();
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.fetchMovie(this.props.match.params.id);
      this.renderMovieBtnAction(this.props.match.params.id)
    } else {
      console.log("Impossible de récupérer le détail du film")
    }
  }
  
  fetchMovie = async (id) => {
    this.movieFinder.getMovieDetail(id)
      .then(details => {
        this.movieFinder.getMovieCredits(id) 
          .then(casting => {
            this.setState({
              movie: {
                details,
                casting
              }
            })
          })
          .catch(error => {
            this.setState({
              errorFetch: true
            })
          })
      })
      .catch(error => {
        this.setState({
          errorFetch: true
        })
      })
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

  deleteMovieFromFavorites = async (movieId) => {
    const { db } = this.state;
    const movieKey = await db.getKeyFromIndex("favorites", "movieId", movieId);
    await db.delete("favorites", movieKey);
  }

  renderMovieBtnAction = async (movieId) => {
    const db = await openDB('movies', 1);

    this.setState({
      db
    })

    const dbMovies = await db.getAllFromIndex('favorites', 'title');
    const existingMovie = dbMovies.find(movie => movie.movieId === parseInt(movieId));
    
    if(existingMovie) {
      this.setState({
        isMovieInFav: true
      })
    } else {
      this.setState({
        isMovieInFav: false
      })
    }
  }

  renderCastingMovie = casting => {
    if (casting.cast && casting.cast.length) {
      return casting.cast.map((actor, index) => {
        if (index > 4) { return false;  }
  
        const actorProfile = this.movieFinder.getActorProfile(actor.profile_path);
        return (
          <li key={`${actor.id}-${index}`}>
            <img src={actorProfile} alt={`profil de l'acteur ${actor.name}`} />
            <p>{actor.name}</p>
            <p>Rôle : {actor.character}</p>
          </li>
        )
      })
    }
    return (
      <p>Impossible d'afficher le casting de ce film</p>
    )
  }

  renderMovie = movie => {
    const { details, casting } = movie;
    const movieImage = this.movieFinder.getImageMovie(details.poster_path, 500);

    const actionBtn =
      this.state.isMovieInFav 
        ?
          <button onClick={() => { this.deleteMovieFromFavorites(this.state.movie.details.id)} }>Supprimer des favoris</button>
        :
          <button onClick={() => { this.addToFavorite(this.state.movie.details) }} >Ajouter aux favoris</button>

    return (
      <div>
        <img src={movieImage} alt={`Affiche de ${details.title}`} />
        <h1>{details.title}</h1>

        {actionBtn}
        {/* <p>

          { this.state.indexedDbSupported && this.renderMovieBtnAction(movie)}
        </p> */}

        <p className="movie-details__release">{details.release_date}</p>
        <p>{details.vote_average}/10</p>
        <p>{details.overview}</p>

        {/* Use aria-label with css => https://stackoverflow.com/a/20478913/13171072 */}
        <p>Genres : </p>
        <ul> 
          {
            details.genres.map((genre,index) => 
              <li key={`${genre}-${index}`}>{genre.name}</li>)
          }
        </ul>
        <h2>Casting</h2>
        <ul>
          {this.renderCastingMovie(casting)}
        </ul>

      </div>
    );
  }
     
  render() {
    return (
      <section className="movie-details">
        { this.state.errorFetch && <p>Impossible de récupérer les informations du film {this.props.params.match.id}</p> } 
        { this.state.movie && this.renderMovie(this.state.movie) }
      </section>
    );
  }
}

export default withRouter(Movie)