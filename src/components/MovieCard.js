import React from "react";
import moment from "moment";

export default (props) => {

  let btnAction = <button onClick={() => props.addToFavorite(props.movie)} className="add-to-favorites">Ajouter</button>;

  if (props.onlyDelete || props.movie.inFav) {
    btnAction = <button onClick={() => props.deleteMovieFromFavorites(props.movie)} className="remove-from-favorites">Supprimer</button>
  }

  return (
    <li className="movie-card">
      <img src={props.movieImage} alt={`Affiche de ${props.movie.title}`} className="movie-card__img" />
      <p className="movie-card__title">{props.movie.title}</p>
      <p className="movie-card__release">{moment(props.movie.release_date).format("DD/MM/YYYY")}</p>
      <div className="movie-card__action">
        {props.indexedDbSupported && btnAction }
        <button onClick={() => props.seeMovieDetails(props.movie.id)} className="movie-details">Détails</button> 
      </div>
    </li>
  )
}