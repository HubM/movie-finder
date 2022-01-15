import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <nav>
    <ul>
      <li className={!navigator.onLine ? "disabledBtn" : ""}>
        <Link to="/search-movie" onClick={props.onClick}>
          Rechercher un film{" "}
          <span role="img" aria-label="Icône de loupe">
            🔍
          </span>
        </Link>
      </li>
      <li>
        <Link to="/search-actor" onClick={props.onClick}>
          Rechercher un acteur{" "}
          <span role="img" aria-label="Icône homme/femme">
            🔍
          </span>
        </Link>
      </li>
      <li>
        <Link to="/favorites" onClick={props.onClick}>
          Mes films{" "}
          <span role="img" aria-label="Icône d'étoile">
            ⭐️
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
