console.log("Hallo world");

// NPM packages
const express = require("express");
const slug = require("slug");
const arrayify = require("array-back");
const mongoose = require("mongoose");

// JS files
const kdramaData = require('./data/kdrama-data.js');

// Wachtwoord voor MongoDB
require("dotenv").config();

// Site laten werken
const app = express();
const port = process.env.PORT || 3000;

// Kijken of MongoDB het doet
async function main() {
  try {
    await mongoose.connect(process.env.mongoBeauty);
    console.log("success");
  } catch(error) {
    throw error
  }
}
main()

// MongoDB werkend krijgen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public, View
app.use(express.static("public"));
app.set("view engine", "ejs");

// Data Danny tutorial
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

// Pages
app.get("/", (req, res) => {
  res.render("pages/index", {
    kdramas: kdramaData.kdramas,
    genre: kdramaData.genre,
    users: kdramaData.users,

  });
});

app.get("/form", (req, res) => {
  res.render("pages/form", {
    genre: kdramaData.genre,
    user,
    kdramas: kdramaData.kdramas,
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
    genre: kdramaData.genre,
    user,
    kdramas: kdramaData.kdramas,
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
  res.render("pages/detail"), {
    genre: kdramaData.genre,
    kdramas: kdramaData.kdramas,
    storyLine: kdramaData.storyLine,
  };
});

app.get("/mylist", (req, res) => {
  res.render("pages/mylist");
});

app.get("/mylist/:id", (req, res)=> {
  console.log(req.params.id);
  const kdrama = kdrama.find( element => element.id == req.params.id)
  console.log(kdrama)
  // res.send("hij doet het");
  res.render("pages/detail.ejs")
});

app.use(function (req, res) {
  console.error("Error 404: page nog found");
  res.status(404).render("pages/404", {
    kdramas: kdramaData.kdramas
  });
});

// Bron: https://github.com/cmda-bt/be-course-21-22/blob/main/examples/express-server/server.js

// MongoDB Schema
const kdramaSchema = new mongoose.Schema({
  name: String,
  slug: String,
  year: Number,
  genre: Array,
  storyline: String
});

const Kdrama = mongoose.model('Kdrama', kdramaSchema);

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

/*
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
*/

// Site laten werken
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
