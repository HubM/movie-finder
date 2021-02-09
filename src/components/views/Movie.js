import React from "react";
import { openDB } from 'idb';
import { withRouter } from "react-router-dom";
import moment from "moment";

import { addToFavorite, deleteMovieFromFavorites } from "../../helpers/_functions/db"

import movieFinder from "../../services/MovieFinder";

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

  renderMovieBtnAction = async (movieId) => {
    const db = await openDB('movies', 1);

    this.setState({
      db
    })

    const dbMovies = await db.getAllFromIndex('favorites', 'title');
    const existingMovie = dbMovies.find(movie => movie.movieId === parseInt(movieId));
    
    if(existingMovie) {
      return this.setState({
        isMovieInFav: true
      })
    } 
      
    return this.setState({
        isMovieInFav: false
      })
  }

  seeCastingMember = id => this.props.history.push(`/actor/${id}`)

  renderCastingMovie = casting => {
    if (casting.cast && casting.cast.length) {
      return casting.cast.map((actor, index) => {
        if (index > 4) { return false;  }
  
        const actorProfile = this.movieFinder.getActorProfile(actor.profile_path);
        return (
          <li key={`${actor.id}-${index}`} className="movie-details__actor cursorPointer">
            <img src={actorProfile} alt={`profil de l'acteur ${actor.name}`} onClick={() => this.seeCastingMember(actor.id)} />
            <p>{actor.name}</p>
            <p><span role="img" aria-label="emoji cinéma">🎬</span> {actor.character}</p>
          </li>
        )
      })
    }
    return (
      <p>Impossible d'afficher le casting de ce film</p>
    )
  }

  addMovieInFavAndRegenerateList = () => {
    addToFavorite(this.state.movie.details)
    .then(() => {
      this.setState({
        isMovieInFav: true
      })
    })
    .catch(err => {
      console.error(err)
    })
  }

  deleteMoviefromFavAndRegenerateList = () => {
    deleteMovieFromFavorites(this.state.movie.details.id)
    .then(() => {
      this.setState({
        isMovieInFav: false
      })
    })
    .catch(err => {
      console.error(err)
    })
  }  

  renderMovie = movie => {
    const { details, casting } = movie;
    const movieImage = this.movieFinder.getImageMovie(details.poster_path, 500);
    let budget = null

    if (details.budget) {
      if (details.budget > 1000000) {
        budget =  `${details.budget/1000000} M$`
      } 
      budget = `${budget} $` 
    }
    const actionBtn =
      this.state.isMovieInFav 
        ?
          <button onClick={this.deleteMoviefromFavAndRegenerateList} className="btn-action remove-from-favorites">Supprimer des favoris</button>
        :
          <button onClick={this.addMovieInFavAndRegenerateList} className="btn-action add-to-favorites" >Ajouter aux favoris</button>
      
        return (
          <div className="layout-single__primary">
            <div className="layout-single__primary__cover">
              <img src={movieImage} alt={`Affiche de ${details.title}`} />
              {actionBtn}
            </div>
            <div className="layout-single__primary__infos">
              <h1>{details.title}</h1>
    
              <div className="layout-single__left-main">
                <p className="movie-details__release"><span role="img" aria-label="emoji calendrier">🗓</span> {moment(details.release_date).format("DD/MM/YYYY")}</p>
                <p><span role="img" aria-label="emoji étoile">⭐️</span> {details.vote_average}/10</p>
                { budget && <p><span role="img" aria-label="emoji dollar">💵</span> {budget}</p> }
                <p><span role="img" aria-label="emoji stylo plume">🖋</span> {details.overview}</p>
    
                <ul className="movie-details__genders" arial-label="genres"> 
                  {
                    details.genres.map(
                      (genre,index) => <li key={`${genre}-${index}`} className="btn-action category disabledBtn">{genre.name}</li>
                    )
                  }
                </ul>
              </div>
              <h2>Casting</h2>
              <ul className="movie-layout-single__right">
                {this.renderCastingMovie(casting)}
              </ul>
            </div>
          </div>
        );
  }
     
  render() {
    return (
      <section className="single-layout movie-details">
        { this.state.errorFetch && <p>Impossible de récupérer les informations du film {this.props.params.match.id}</p> } 
        { this.state.movie && this.renderMovie(this.state.movie) }
      </section>
    );
  }
}

export default withRouter(Movie)