console.log("Hallo world");

// NPM packages
const express = require("express");
const slug = require("slug");
const arrayify = require("array-back");
const mongoose = require("mongoose");
const fetch = require("cross-fetch");

// JS files
const kdramaData = require("./data/kdrama-data.js");
let tmdbData = [];

// Wachtwoord voor MongoDB
require("dotenv").config();

// Kijken of MongoDB het doet met mongoose
async function main() {
  try {
    await mongoose.connect(process.env.mongoBeauty);
    console.log("success");
  } catch (error) {
    throw error;
  }
}
main();

// MongoDB Schema
const kdramaSchema = new mongoose.Schema({
  name: String,
  slug: String,
  year: Number,
  genre: Array,
  storyline: String,
});

const Kdrama = mongoose.model("Kdrama", kdramaSchema);

async function newKdrama() {
  const hymn = new Kdrama({
    slug: "the-hymn-of-death",
    name: "The Hymn of Death",
    year: "2018",
    genre: ["musical", "historical", "romance", "melodrama"],
    storyline:
      "Kim Woo Jin is a stage drama writer while Korea is under Japanese occupation. He is married, but he falls in love with Yun Shim Deok. Shim Deok is the first Korean soprano. She records the song “Praise of Death” which becomes the first Korean pop song in 1926. Woo Jin and Shim Deok's fate ends tragically.",
  });
  await hymn.save();
}
newKdrama();


// Site laten werken
const app = express();
const port = process.env.PORT || 3000;

// Data posten
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public, View
app.use(express.static("public"));
app.set("view engine", "ejs");

// Pages
app.get("/", (req, res) => {
  res.render("pages/index", {
    kdramas: kdramaData.kdramas,
    genre: kdramaData.genre,
    users: kdramaData.users,

    name: kdramaData.users.name,
    userid: kdramaData.users.userid,
    img: kdramaData.users.img
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

app.get("/matchresult", (req, res) => {
  res.render("pages/matchresult", {
    dataMatch: { matchResult: true, aantalMatches: 5 },
  });
});

app.get("/profile", (req, res) => {
  res.render("pages/profile", {
    users: kdramaData.users,
    name: kdramaData.users[1].name
  });
});

app.get("/detail", (req, res) => {
  res.render("pages/detail", {
    genre: kdramaData.genre,
    kdramas: kdramaData.kdramas,
    storyLine: kdramaData.storyLine,
  });
});

app.get("/mylist", (req, res) => {
  res.render("pages/mylist", {
    users: kdramaData.users,
  });
});

app.get("/user-1", (req, res) => {
  res.render("pages/mylist", {
    users: kdramaData.users,
    name: kdramaData.users[0].name,
    img: kdramaData.users[0].img
  });
});

app.get("/user-2", (req, res) => {
  res.render("pages/mylist", {
    users: kdramaData.users,
    name: kdramaData.users[1].name,
    img: kdramaData.users[1].img
  });
});

app.get("/user-3", (req, res) => {
  res.render("pages/mylist", {
    users: kdramaData.users,
    name: kdramaData.users[2].name,
    img: kdramaData.users[2].img
  });
});

app.get("/mylist/:id", (req, res) => {
  console.log(req.params.id);
  const allKdramas = kdramaData.kdramas;
  const findKdrama = allKdramas.find((element) => element.id == req.params.id);

  res.render("pages/detail.ejs", {
    genre: kdramaData.genre,
    kdramas: kdramaData.kdramas,
    storyLine: kdramaData.storyLine,
  });
});

app.use(function (req, res) {
  console.error("Error 404: page nog found");
  res.status(404).render("pages/404", {
    kdramas: kdramaData.kdramas,
  });
});
// Bron: https://github.com/cmda-bt/be-course-21-22/blob/main/examples/express-server/server.js

// Site laten werken
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
