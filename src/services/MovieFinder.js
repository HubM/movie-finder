import settings from "../settings";

/*
`https://api.themoviedb.org/3/search/movie?api_key=${
        settings.movieAPI
      }&language=fr-FR&query=${value}`;
      */

export default class movieFinder {
  constructor() {
    this.apiBaseUrl = "https://api.themoviedb.org/3";
    this.imageBaseUrl = "https://image.tmdb.org/t/p"
  } 

  getImageMovie(moviePath, size = 500) {
    return moviePath ? `${this.imageBaseUrl}/w${size}${moviePath}` : "https://via.placeholder.com/200x300";
  }

  searchMovie(movie) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiBaseUrl}/search/movie?api_key=${settings.apiKey}&language=fr-FR&query=${movie}`;
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.status_code === 7) {
            reject(data.status_message);
          } else {
            resolve(data.results)
          }
        })
    })
  }
}