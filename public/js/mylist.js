console.log("Mylist");

// Data aanvragen
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.querySelector(".main-mylist");
// Bron: https://www.youtube.com/watch?v=9Bvt6BFf6_U&list=PLXyo-7ps7RUG9an-ko_ktfMDWSaTwlYQD&index=6&t=357s&ab_channel=AsishGeorgeTech


// API fetchen met Promise
/*
function getKdrama(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      showKdrama(data.results);
    });
}
getKdrama(API_URL);
*/

// Data in de HTML tonen
function showKdrama(data) {
  main.innerHTML = "";
  data.forEach((kdrama) => {
    const { name, poster_path, id } = kdrama;
    const kdramaEl = document.createElement("article");
    kdramaEl.classList.add("kdrama");
    kdramaEl.innerHTML = `
        <a href="/mylist/${kdrama.id}">
          <h2 class="visually-hidden">Drama poster</h2>
          <img class="poster-img" src="${
            IMG_URL + poster_path
          }" alt="${name}" />
          <form action="">
            <button><i class="fa-solid fa-heart"></i></button>
          </form>
        </a>
        <h3>${name}</h3>
        `;
    main.appendChild(kdramaEl);
  });
};
