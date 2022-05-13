console.log("Hallo world");

const express = require("express");
const slug = require("slug");
const arrayify = require("array-back");
// const ejsLint = require('ejs-lint');
require("dotenv").config();

const mongoose = require('mongoose');

const app = express();
const port = 3000;

async function main() {
  try {
    await mongoose.connect(process.env.mongoBeauty);
    console.log("success");
  } catch(error) {
    throw error
  }
}

const kdramaSchema = new mongoose.Schema({
  name: String,
  slug: String,
  year: Number,
  genre: Array,
  storyline: String
});

const Kdrama = mongoose.model('Kdrama', kdramaSchema);

// const fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"

// await fluffy.save();
async function newKdrama () {
  const hymn = new Kdrama({
    slug: "the-hymn-of-death",
    name: "The Hymn of Death",
    year: "2018",
    genre: ["musical", "historical", "romance", "melodrama"],
    storyline:
      "Kim Woo Jin is a stage drama writer while Korea is under Japanese occupation. He is married, but he falls in love with Yun Shim Deok. Shim Deok is the first Korean soprano. She records the song “Praise of Death” which becomes the first Korean pop song in 1926. Woo Jin and Shim Deok's fate ends tragically.",
  })
  await hymn.save()
}
newKdrama()

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
main()

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
  "fantasy",
  "drama"
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

  {
    id: 3,
    slug: "doom-at-your-service",
    name: "Doom at your service",
    year: "2021",
    genre: ["comedy", "romance", "drama", "fantasy"],
    storyline:
      "Tak Dong Kyung has been working hard ever since her parents passed away. Her life seemed more stable after working as a web novel editor for 6 years, but then she gets diagnosed with glioblastoma (brain cancer). She blames her unlucky life and wishes to curse everything to disappear, which unintentionally calls Myeol Mang, Doom himself - neither human nor god - to appear. ",
  },
];

const user = [
  {
    userId: 1,
    username: "Xiao xiao",
  },
];

const data = [
  {
    title: "Doom at your service",
    story: "Fantasy about...",
  },
];

app.get("/", (req, res) => {
  res.render("pages/index", {
    kdramas,
  });
});

app.get("/form", (req, res) => {
  res.render("pages/form", {
    genre,
    user,
    kdramas,
    data,
  });
});

app.post("/form", (req, res) => {
  console.log(req.body);

  data.push({
    title: req.body.title,
    story: req.body.story,
  });

  res.render("pages/form", {
    genre,
    user,
    kdramas,
    data,
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

app.get("/detail", (req, res) => {
  res.render("pages/detail");
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
  res.status(404).render("pages/404", {
    kdramas
  });
});
// Bron: https://github.com/cmda-bt/be-course-21-22/blob/main/examples/express-server/server.js

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
