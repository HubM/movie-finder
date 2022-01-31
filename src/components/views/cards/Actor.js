import React from "react";

export default (props) => {
  return (
    <li className="movie-card">
      {navigator.onLine && (
        <img
          src={props.image}
          onClick={() => props.seeActorDetails(props.actor.id)}
          alt={`${props.actor.name}`}
          className="movie-card__img cursorPointer"
        />
      )}
      <p className="movie-card__title">{props.actor.name}</p>
      <div className="movie-card__action">
        {navigator.onLine && (
          <button onClick={() => props.seeActorDetails(props.actor.id)} className="btn-action movie-details">
            Détails
          </button>
        )}
      </div>
    </li>
  );
};
