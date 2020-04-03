import React from "react";
import { openDB } from 'idb';
import { withRouter } from "react-router-dom";

import movieFinder from "../services/MovieFinder";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      errorFetch: undefined
    }
    this.movieFinder = new movieFinder();
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.fetchMovie(this.props.match.params.id);
    } else {
      console.log("Impossible de récupérer le détail du film")
    }
  }
  
  fetchMovie = async (id) => {
    this.movieFinder.getMovieDetail(id)
      .then(movie => {
        this.setState({
          movie
        })
      })
      .catch(error => {
        this.setState({
          errorFetch: true
        })
      })
  }

  renderMovie = movie => {
    const movieImage = this.movieFinder.getImageMovie(movie.poster_path, 500);
    return (
      <div>
        <img src={movieImage} alt={`Affiche de ${movie.title}`} />
        <h1>{movie.title}</h1>
      </div>
    );
  }
    
 
  render() {
    return (
      <section className="movie-details-page">
        { this.state.errorFetch && <p>Impossible de récupérer les informations du film {this.props.params.match.id}</p> } 
        { this.state.movie && this.renderMovie(this.state.movie) }
      </section>
    );
  }
}

export default withRouter(Movie)