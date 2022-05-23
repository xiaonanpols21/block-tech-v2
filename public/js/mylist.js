console.log("Mylist");

// Data aanvragen API
const api_key = "api_key=c9c582007e770d9564a6499f6e364a2a";
const base_url = "https://api.themoviedb.org/3";
const api_url = base_url + "/discover/tv?" + api_key + "&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2020&with_original_language=hi|ko|";
const api_url2 = base_url + "/discover/tv?" + api_key + "&language=en-US&sort_by=popularity.desc&page=2&primary_release_year=2020&with_original_language=hi|ko|";
const api_url3 = base_url + "/discover/tv?" + api_key + "&language=en-US&sort_by=popularity.desc&page=3&primary_release_year=2020&with_original_language=hi|ko|";
const img_url = "https://image.tmdb.org/t/p/w500";
const searchURL = base_url + "/search/tv?" + api_key;
const main = document.querySelector(".main-mylist");
// Bron: https://www.youtube.com/watch?v=9Bvt6BFf6_U&list=PLXyo-7ps7RUG9an-ko_ktfMDWSaTwlYQD&index=6&t=357s&ab_channel=AsishGeorgeTech

/*
2 pagina's worden opgehaald omdat de API steeds wordt upgedate van populairste kdrama's. 
En de kdrama's die ik heb uit de databse worden niet steeds upgedate. 
Als je de cover haalt van kdraam Happiness, kan die volgende dag niet meer op pagina 1 maar 2 staan waardoor de API de cover niet meer kan ophalen.
Daarom heb ik voor de zekerheid 2 pagina's opgehaald en hopen dat de kdrama's maar niet gaan dalen met 'popularity'. 
*/
// API fetchen met Promise Page 1
function getKdrama(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showImg(data.results);
    });
};
getKdrama(api_url);

// API fetchen met Promise Page 2
function getKdrama(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      showImg(data.results);
    });
};
getKdrama(api_url2);

// Covers showen in de HTML
function showImg(data) {
  data.forEach((poster, index) => {
    const { poster_path, name } = poster;
    const imgEl = document.querySelectorAll("article img");

    imgEl.forEach(img => {
      if(img.alt === name) {
        //console.log(img.alt);
        img.src = img_url + poster_path
      };
    });
  });
};

