console.log("Mylist");

// Data aanvragen
const api_key = "api_key=c9c582007e770d9564a6499f6e364a2a";
const base_url = "https://api.themoviedb.org/3";
const api_url = base_url + "/discover/tv?" + api_key + "&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2020&with_original_language=hi|ko|";
const api_url2 = base_url + "/discover/tv?" + api_key + "&language=en-US&sort_by=popularity.desc&page=2&primary_release_year=2020&with_original_language=hi|ko|";
const img_url = "https://image.tmdb.org/t/p/w500";
const searchURL = base_url + "/search/tv?" + api_key;
const main = document.querySelector(".main-mylist");
// Bron: https://www.youtube.com/watch?v=9Bvt6BFf6_U&list=PLXyo-7ps7RUG9an-ko_ktfMDWSaTwlYQD&index=6&t=357s&ab_channel=AsishGeorgeTech

// API fetchen met Promise Page 1
function getKdrama(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      showImg(data.results);
    });
}
getKdrama(api_url);

// API fetchen met Promise Page 2
function getKdrama(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      showImg(data.results);
    });
}
getKdrama(api_url2);


function showImg(data) {
  data.forEach((poster, index) => {
    const { poster_path, name } = poster;
    const imgEl = document.querySelectorAll("article img");
    console.log(img_url + poster_path);

    imgEl.forEach(img => {
      if(img.alt === name) {
        console.log(img.alt);
        img.src = img_url + poster_path
      };
    });

  });
};

// Data in de HTML tonen
// Rate limit hebben ze disabled waardoor er maar 20 kdramas te zien zijn
// Bron: https://developers.themoviedb.org/3/getting-started/request-rate-limiting
function showKdrama(data) {
  main.innerHTML = "";
  tmdb.forEach((poster) => {
    const { poster_path, id } = poster;
    const kdramaEl = document.createElement("article");
    kdramaEl.classList.add("kdrama");
    kdramaEl.innerHTML = `
      <a href="/kdrama/${kdrama.id}">
        <img class="poster-img" src="${poster.img}" alt="Kdrama poster" />
        <form action="/mylist" method="post">
          <button>
              <div class="heart-add"></div>
          </button>
        </form>
      </a>
      <h3>${poster.name}</h3>

      `;
    main.appendChild(kdramaEl);
  });
}

{/* <a href="/kdrama/${kdrama.id}">
<h2 class="visually-hidden">Drama poster</h2>
<img class="poster-img" src="${img_url + poster_path}" alt="${name}" />
<form action="">
  <button><i class="fa-solid fa-heart"></i></button>
</form>
</a>
<h3>${name}</h3> */}
