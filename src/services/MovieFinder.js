import settings from "../settings";

/*
`https://api.themoviedb.org/3/search/movie?api_key=${
        settings.movieAPI
      }&language=fr-FR&query=${value}`;
      */

export default class movieFinder {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";
  } 

  searchMovie(movie) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/search/movie?api_key=${settings.apiKey}&language=fr-FR&query=${movie}`;
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