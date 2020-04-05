import { openDB } from 'idb';

const addToFavorite = async (movie) => {
  const { id, title, overview, poster_path, release_date } = movie;
  const db = await openDB('movies', 1, {
    upgrade(db) {
      const store = db.createObjectStore('favorites', {
        keyPath: 'id',
        autoIncrement: true,
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex('title', 'title');
      store.createIndex('movieId', 'movieId');
    },
  });
  
  const dbMovies = await db.getAllFromIndex('favorites', 'title');
  const existingMovie = dbMovies.find(movie => movie.movieId === id);

  if (!existingMovie) {
    await db.add('favorites', {
      movieId: id,
      title,
      overview,
      poster_path,
      release_date
    });
  } else {
    console.log("Movie always in DB")
  }
}


export {
  addToFavorite
}