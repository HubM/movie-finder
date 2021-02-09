import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import movieFinder from "../../services/MovieFinder";

import MovieCard from "../helpers/MovieCard";
class Actor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actorDetails: null,
      actorMovies: null,
      errorFetch: null,
      db: null
    }
    this.movieFinder = new movieFinder();
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.fetchActor(this.props.match.params.id);
      this.fetchActorMovies(this.props.match.params.id);
    } else {
      console.log("Impossible de récupérer le détail de l'acteur")
    }
  }

  fetchActor = id => {
    this.movieFinder.getActorDetails(id)
      .then(actorDetails => {
        this.setState({
          actorDetails
        })
      })
      .catch(error => {
        this.setState({
          errorFetch: true
        })
      })
  }

  fetchActorMovies = id => {
    this.movieFinder.getActorMovies(id)
    .then(actorMovies => {
      if (!actorMovies.cast || !actorMovies.cast.length) {
        return null;
      }

      return this.setState({
        actorMovies
      })
    })
    .catch(error => {
      this.setState({
        errorFetch: true
      })
    })
  }

  renderActorDetails = actorDetails => {
    const actorImage = this.movieFinder.getActorProfile(actorDetails.profile_path, 500);
    const actorBirthday = actorDetails.birthday ? moment(actorDetails.birthday).format("DD/MM/YYYY") : null;
    const birthPlace = actorDetails.place_of_birth || null;
    const actorAge = actorBirthday ? `${ new Date().getFullYear() - new Date(actorBirthday).getFullYear()} yo` : null;
    const actorDeathday = actorDetails.deathday || null;

    return (
      <div className="layout-single__primary">
        <div className="layout-single__cover">
          <img src={actorImage} alt={`Affiche de ${actorDetails.name}`} />
        </div>
        <div className="layout-single__left">
          <h1>{actorDetails.name}</h1>
          {
            actorAge && <span className="actor-details__age">{actorAge}</span>
          }
          <div className="layout-single__left-main">
            { actorBirthday && birthPlace && <p><span role="img" aria-label="emoji poussin">🐣</span> {actorBirthday} - {birthPlace}</p>}
            { actorDetails.deathday && <p><span role="img" aria-label="emoji cerceuil">⚰️</span> {actorDeathday}</p>}
            { actorDetails.biography && <p className="textAlignLeft"><span role="img" aria-label="emoji style plume">🖋</span> {actorDetails.biography}</p>}
          </div>
        </div>
      </div>
    )
  }

  seeMovieDetails = id => this.props.history.push(`/movie/${id}`);

  renderMovie = movie => (
    <MovieCard 
      movieImage={this.movieFinder.getImageMovie(movie.poster_path, 200)} 
      movie={movie}
      key={`${movie.id}-${movie.release_date}`}
      seeMovieDetails={() => this.seeMovieDetails(movie.id)}
    />
  )
  

  renderActorMovies = actorMovies => {
    const sortedActorMovies = actorMovies.cast.sort((prevMovie, nextMovie) => prevMovie.vote_average > nextMovie.vote_average ? -1 : 1).slice(0,9)
    return (
      <div className="layout-single__right movies-section">
        <h2>Films</h2>
        <ul className="layout-list movies-list">{ sortedActorMovies.map(movie => this.renderMovie(movie))}</ul>
      </div>
    )
  }
 
  render() {
    return (
      <section className="single-layout actor-details">
      { this.state.actorDetails && this.renderActorDetails(this.state.actorDetails) }
      { this.state.actorMovies && this.renderActorMovies(this.state.actorMovies) }
      </section>
    )
  }
}

export default withRouter(Actor);