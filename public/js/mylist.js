console.log("Mylist");

// Data aanvragen
// const API_KEY = 'api_key=c9c582007e770d9564a6499f6e364a2a';
const API_KEY = process.env.API_Key;
// Bron: https://stackoverflow.com/questions/4870328/read-environment-variables-in-node-js#:~:text=To%20retrieve%20environment%20variables%20in,assigning%20a%20property%20on%20process.
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/tv?'+API_KEY + '&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2020&with_original_language=hi|ko|';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/tv?'+API_KEY;