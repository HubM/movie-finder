import React from "react";
import { withRouter } from "react-router-dom";

import Loading from "../../../components/loading/search";
import ActorCard from "../cards/Actor";

import { getDatabase, addToFavorite, deleteMovieFromFavorites } from "../../../helpers/_functions/db";

import movieFinder from "../../../services/MovieFinder";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: null,
      search: "",
      actors: [],
      actorsNotFound: false,
      indexedDbSupported: "indexedDB" in window,
      loading: false,
      currentPage: 1,
    };
    this.movieFinder = new movieFinder();
  }

  componentDidMount() {
    getDatabase()
      .then((db) => {
        this.setState({ db });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  keyPress = (event) => (event.keyCode === 13 ? this.searchActor() : false);

  searchActor = (page = 1) => {
    this.setState({
      loading: true,
      actorsNotFound: false,
    });
    setTimeout(() => {
      this.movieFinder
        .searchActor(this.state.search, page)
        .then(async (actors) => {
          if (!actors.length) {
            this.setState({
              actorsNotFound: true,
            });
            return;
          }
          this.setState({
            actors,
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() =>
          this.setState({
            loading: false,
          })
        );
    }, 1000);
  };

  generateActorsList = (actors) => {
    console.log(actors);
    return actors.map((actor) => (
      <ActorCard
        image={this.movieFinder.getImageMovie(actor.profile_path, 200)}
        actor={actor}
        key={`${actor.id}`}
        seeActorDetails={() => this.seeActorDetails(actor.id)}
      />
    ));
  };

  seeActorDetails = (id) => this.props.history.push(`/actor/${id}`);

  searchResetState = () => {
    if (this.state.loading) {
      return <Loading width="25px" heigth="25px" />;
    }
    return (
      <div
        className={`reset-search ${this.state.search.length <= 2 ? "disabledBtn" : ""}`}
        onClick={() => this.setState({ movies: [], search: "", moviesNotFound: false })}
      >
        <span>+</span>
      </div>
    );
  };

  seeOtherPage = (type) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (type === 1) {
      this.setState(
        (prevState) => ({
          currentPage: prevState.currentPage + 1,
        }),
        () => {
          this.searchActor(this.state.currentPage);
        }
      );
      return;
    }

    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage - 1,
      }),
      () => {
        this.searchActor(this.state.currentPage);
      }
    );
  };

  render() {
    return (
      <section className="search-page">
        <h1>Rechercher un Acteur</h1>
        <div className="search">
          <div>
            <input
              type="text"
              aria-label="Bouton de recherche d'un acteur"
              placeholder="Joaquin Phoenix..."
              onChange={(event) => this.setState({ search: event.target.value })}
              onKeyDown={this.keyPress}
              value={this.state.search}
              className={`search-input ${this.state.search.length > 2 ? "usable" : ""}`}
            />
            {this.searchResetState()}
          </div>
          <button onClick={this.searchActor} className={`search-action ${this.state.search.length <= 2 ? "disabledBtn" : ""}`}>
            Rechercher
          </button>
        </div>

        {!this.state.indexedDbSupported && <p>Vous devriez utiliser un navigateur moderne pour pouvoir enregistrer vos films préférés</p>}
        {this.state.actorsNotFound ? (
          <p>Aucun acteur ne correspond à votre cherche :(</p>
        ) : (
          <div className="movies-section">
            <div className="movies-list">
              <ul className="layout-list">{this.generateActorsList(this.state.actors)}</ul>
            </div>
            <div className="pagination">
              {this.state.currentPage > 1 && (
                <p className="pagination__prev cursorPointer" onClick={() => this.seeOtherPage(-1)}>
                  Précédent
                </p>
              )}
              {this.state.actors.length > 0 && (
                <p className="cursorPointer" onClick={() => this.seeOtherPage(1)}>
                  Suivant
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default withRouter(Search);
