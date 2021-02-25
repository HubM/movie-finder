import React from "react";
import moment from "moment";

export default (props) => {
  let btnAction = null;
  
  if (!props.viewOnly) {
    btnAction = <button onClick={() => props.addToFavorite(props.movie)} className="btn-action add-to-favorites">Ajouter</button>;
  
    if (props.onlyDelete || props.movie.inFav) {
      btnAction = <button onClick={() => props.deleteMovieFromFavorites(props.movie)} className="btn-action remove-from-favorites">Supprimer</button>
    }
  }
  
  return (
    <li className="movie-card">
      {navigator.onLine && <img src={props.movieImage} onClick={() => props.seeMovieDetails(props.movie.id)} alt={`Affiche de ${props.movie.title}`} className="movie-card__img cursorPointer" />}
      <p className="movie-card__title">{props.movie.title}</p>
      <p className="movie-card__release">{moment(props.movie.release_date).format("DD/MM/YYYY")}</p>
      <div className="movie-card__action">
        {props.indexedDbSupported && btnAction }
        {navigator.onLine && <button onClick={() => props.seeMovieDetails(props.movie.id)} className="btn-action movie-details">Détails</button> }
      </div>
    </li>
  )
}