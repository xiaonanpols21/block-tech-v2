console.log("Mylist");

// Data aanvragen
const api_key = 'api_key=c9c582007e770d9564a6499f6e364a2a';
const base_url = 'https://api.themoviedb.org/3';
const api_url = base_url + '/discover/tv?'+ api_key + '&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2020&with_original_language=hi|ko|';
const img_url = 'https://image.tmdb.org/t/p/w500';
const searchURL = base_url + '/search/tv?'+ api_key;
const main = document.querySelector(".main-mylist");
// Bron: https://www.youtube.com/watch?v=9Bvt6BFf6_U&list=PLXyo-7ps7RUG9an-ko_ktfMDWSaTwlYQD&index=6&t=357s&ab_channel=AsishGeorgeTech

// API fetchen met Promise
function getKdrama(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      showKdrama(data.results);
    });
}
getKdrama(api_url);

// Data in de HTML tonen
// Rate limit hebben ze disabled waardoor er maar 20 kdramas te zien zijn
// Bron: https://developers.themoviedb.org/3/getting-started/request-rate-limiting
// function showKdrama(data) {
//   main.innerHTML = "";
//   data.forEach((kdrama) => {
//     const { name, id, overview } = kdrama;
//     const kdramaEl = document.createElement("article");
//     kdramaEl.classList.add("kdrama");
//     kdramaEl.innerHTML = `
//         <h1>${name}</h1>

//         <h2>About</h2>
//         <p>${overview}</p>

//         `;
//     main.appendChild(kdramaEl);
//   });
// };


