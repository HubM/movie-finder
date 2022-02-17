import React from "react";

export default function Actor(props) {
  return (
    <li className="card">
      {navigator.onLine && (
        <img
          src={props.image}
          onClick={() => props.seeActorDetails(props.actor.id)}
          alt={`${props.actor.name}`}
          className="card__img cursorPointer"
        />
      )}
      <p className="card__title">{props.actor.name}</p>
      <div className="card__action">
        {navigator.onLine && (
          <button onClick={() => props.seeActorDetails(props.actor.id)} className="btn-action movie-details">
            Détails
          </button>
        )}
      </div>
    </li>
  );
}
