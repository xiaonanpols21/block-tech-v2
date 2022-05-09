console.log("Hallo world");

const express = require("express");
const slug = require("slug");
const arrayify = require("array-back");
// const ejsLint = require('ejs-lint');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

// All data comes fron: https://mydramalist.com/
const genre = [
  "romance",
  "historical",
  "music",
  "action",
  "adventure",
  "melodrama",
  "idoldrama",
  "comedy",
  "friendship",
  "business",
];
const kdramas = [
  {
    id: 1,
    slug: "the-hymn-of-death",
    name: "The Hymn of Death",
    year: "2018",
    genre: ["musical", "historical", "romance", "melodrama"],
    storyline:
      "Kim Woo Jin is a stage drama writer while Korea is under Japanese occupation. He is married, but he falls in love with Yun Shim Deok. Shim Deok is the first Korean soprano. She records the song “Praise of Death” which becomes the first Korean pop song in 1926. Woo Jin and Shim Deok's fate ends tragically.",
  },

  {
    id: 2,
    slug: "what's-wrong-with-secretary-kim",
    name: "What's Wrong with Secretary Kim",
    year: "2018",
    genre: ["friendship", "business", "romance", "comedy"],
    storyline:
      "The series revolves around the narcissistic Lee Young Joon, the vice president of a company run by his family. He is very self-absorbed and thinks highly of himself, so much that he barely acknowledges the people around him. Lee Young Joon has a capable and patient secretary Kim Mi So who has remained by his side and worked diligently for 9 years without any romantic involvement. However, Mi So now wants to set her life & focus on herself so when she decides to resign from her job, hilarious misunderstandings ensue. After 9 years of their strictly-workplace relationship, can it now develop in something more?",
  },
];

app.get("/", (req, res) => {
  /*
  let doc = '<!doctype html>';
  doc += '<title>Kdramas</title>';
  doc += '<h1>Kdrmas</h1>';

  kdramas.forEach(kdrama => {
    doc += "<section>";
    doc += `<h2>${kdrama.name}<h2>`;
    doc += `<h3>${kdrama.year}<h3>`;
    doc += "<h3>Genre:</h3>";
    doc += "<ul>";
    kdrama.genre.forEach(genre => {
      doc += `<li>${genre}</li>`;
    });
    doc += "</ul>";
    doc += `<a href="/kdrama/${kdrama.id}/${kdrama.slug}">More info</a>`;
    doc += "</section>";
  });
  res.send(doc);
  */

  res.render("pages/index");
});

app.get("/form", (req, res) => {
  res.render("pages/form", {
    genreArray: {
      resultGenre: [
        "romance",
        "historical",
        "music",
        "action",
        "adventure",
        "melodrama",
        "idoldrama",
        "comedy",
        "friendship",
        "business",
      ],
    },
  });
});

app.get("/matchresult", (req, res) => {
  res.render("pages/matchresult", {
    dataMatch: { matchResult: true, aantalMatches: 5 },
  });
});

app.get("/profile", (req, res) => {
  res.render("pages/profile", {
    profileMatch: { username: "Xiaoxiao", aantalFriends: 16 },
  });
});

app.get("/kdrama/:id/:slug", (req, res) => {
  console.log(req.params.id);
  const kdrama = kdramas.find((element) => element.id == req.params.id);
  console.log(kdrama);

  let doc = "<!doctype html>";
  doc += `<title>Kdrama detail for ${kdrama.name}</title>`;
  doc += `<h1>${kdrama.name}<h1>`;
  doc += `<h2>${kdrama.year}<h2>`;
  doc += "<h2>Genre:</h2>";
  doc += "<ul>";
  kdrama.genre.forEach((genre) => {
    doc += `<li>${genre}</li>`;
  });
  doc += "</ul>";
  doc += `<p>${kdrama.storyline}</p>`;
  res.send(doc);
});

app.get("/test", (req, res) => {
  res.send("Dit is test!");
});

app.use(function (req, res) {
  console.error("Error 404: page nog found");
  res.status(404).render("pages/404");
});
// Bron: https://github.com/cmda-bt/be-course-21-22/blob/main/examples/express-server/server.js

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
