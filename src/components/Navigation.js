import React from 'react';
import { Link } from "react-router-dom";

export default function Navigation (props) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/search" onClick={props.onClick}>Rechercher un film <span role="img" aria-label="Icône de loupe">🔍</span></Link></li>
        <li>
          <Link to="/favorites" onClick={props.onClick}>Ma wishlist <span role="img" aria-label="Icône d'étoile">⭐️</span></Link>
        </li>
        {/* <li>
          <Link to="/me">Mon profil <span role="img" aria-label="Icône d'étoile"></span></Link>
        </li> */}
      </ul>
    </nav>
  );
}
