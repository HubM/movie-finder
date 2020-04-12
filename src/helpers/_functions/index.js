import { openDB } from 'idb';

const getDatabase = async () => 
   await openDB("movies", 1, {
      upgrade(db, oldVersion, newVersion) {
        const store = db.createObjectStore('favorites', {
          keyPath: 'id',
          autoIncrement: true,
        });
        // Create an index on the 'date' property of the objects.
        store.createIndex('title', 'title');
        store.createIndex('movieId', 'movieId');
      }
    });

const addToFavorite = async (movie) => 
  new Promise((resolve, reject) => {
    const { id, title, overview, poster_path, release_date } = movie;
  
    getDatabase()
    .then(async db => {
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
        resolve()
      } else {
        reject("Movie always in DB");
      }

    })
    .catch(err => {
      console.error(err)
      reject(err)
    })
  })
  
const deleteMovieFromFavorites = async (movieId) => 
  new Promise((resolve, reject) => {
    getDatabase()
    .then(async db => {
      const movieKey = await db.getKeyFromIndex("favorites", "movieId", movieId);
      await db.delete("favorites", movieKey);
      resolve();
    })
    .catch(err => {
      reject(err);
    })
  })


export {
  getDatabase,
  addToFavorite,
  deleteMovieFromFavorites  
}