import settings from "../settings";
export default class movieFinder {
  constructor() {
    this.apiBaseUrl = "https://api.themoviedb.org/3";
    this.imageBaseUrl = "https://image.tmdb.org/t/p";
  }

  getImageMovie(moviePath, size = 500) {
    return moviePath ? `${this.imageBaseUrl}/w${size}${moviePath}` : `${process.env.PUBLIC_URL}/placeholder.jpg`;
  }

  getActorProfile(profilePath, size = 200) {
    return profilePath ? `${this.imageBaseUrl}/w${size}${profilePath}` : "https://via.placeholder.com/200x300";
  }

  searchMovie(movie, page) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiBaseUrl}/search/movie?api_key=${settings.apiKey}&language=fr-FR&query=${movie}&page=${page}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status_code === 7) {
            reject(data.status_message);
          } else {
            resolve(data.results);
          }
        });
    });
  }

  searchActor(actor, page) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiBaseUrl}/search/person?api_key=${settings.apiKey}&language=fr-FR&query=${actor}&page=${page}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status_code === 7) {
            reject(data.status_message);
          } else {
            resolve(data.results);
          }
        });
    });
  }

  getActorDetails(actorId) {
    return new Promise((resolve, reject) => {
      const urlDetails = `${this.apiBaseUrl}/person/${actorId}?api_key=${settings.apiKey}&language=fr-FR`;
      fetch(urlDetails)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            return reject();
          }

          return resolve(data);
        });
    });
  }

  getActorMovies(actorId) {
    return new Promise((resolve, reject) => {
      const urlDetails = `${this.apiBaseUrl}/person/${actorId}/movie_credits?api_key=${settings.apiKey}&language=fr-FR`;
      fetch(urlDetails)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            return reject();
          }

          return resolve(data);
        });
    });
  }

  getMovieDetail(movieId) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiBaseUrl}/movie/${movieId}?api_key=${settings.apiKey}&language=fr-FR`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status_code === 7) {
            reject(data.status_message);
          } else {
            resolve(data);
          }
        });
    });
  }

  getMovieCredits(movieId) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiBaseUrl}/movie/${movieId}/credits?api_key=${settings.apiKey}&language=fr-FR`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status_code === 7) {
            reject(data.status_message);
          } else {
            resolve(data);
          }
        });
    });
  }
}
