console.log("Hallo world");

// NPM packages
const express = require("express");

const slug = require("slug");
const arrayify = require("array-back");

const fetch = require("cross-fetch");
const dotenv = require("dotenv").config();

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

// JS files
const kdramaData = require("./data/kdrama-data.js");
const { set } = require("lodash");

// Site laten werken
const app = express();
const port = process.env.PORT || 3000;
let db = null;

// Data posten
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public, View
app.use(express.static("public"));
app.set("view engine", "ejs");

// Pages
app.get("/", async (req, res) => {
  const users = await db.collection("users").find({},{}).toArray();
  console.log(users);

  res.render("pages/index", {
    kdramas: kdramaData.kdramas,
    users
  });
});

app.get("/detail", (req, res) => {
  res.render("pages/detail", {
    genre: kdramaData.genre,
    kdramas: kdramaData.kdramas,
    storyLine: kdramaData.storyLine,
    users,
    tmdb
  });
});

app.get("/mylist", async (req, res) => {
  const query = {_id: ObjectId(req.params.userId)};
  const users = await db.collection("users").findOne(query);
  //const users = await db.collection("users").find({},{}).toArray();

  const tmdb = await db.collection("tmdb").find({},{}).toArray();
  console.log(tmdb);

  console.log(users);
  res.render("pages/mylist", {
    users,
    tmdb
  });
});

app.get("/mylist/:userId/:slug", async (req, res) => {
  const query = {_id: ObjectId(req.params.userId)};
  const users = await db.collection("users").findOne(query);
  console.log(users);

  const tmdb = await db.collection("tmdb").find({},{}).toArray();
  //console.log(tmdb);
  res.render('pages/mylist', {
    users,
    tmdb
  })
}); 

app.post("/mylist/:userId/:slug", async (req, res) => {
  const query = {_id: ObjectId(req.params.userId)};
  const users = await db.collection("users").findOne(query);
  const tmdb = await db.collection("tmdb").find({},{}).toArray();
  console.log(req.body);
  
  tmdb.push({
  });

  res.render("pages/mylist", {
    users: kdramaData.users,
    name: kdramaData.users[1].name,
    users,
    tmdb
  });

});

app.get("/profile/:userId/:slug", async (req, res) => {
  const query = {_id: ObjectId(req.params.userId)};
  const users = await db.collection("users").findOne(query);
  console.log(users);

  res.render("pages/profile", {
    users: kdramaData.users,
    name: kdramaData.users[1].name,
    users,
    
  });
});

app.get("/kdrama/:kdramaId/:slug", async (req, res) => {
  // const allKdramas = kdramaData.kdramas;
  // const findKdrama = allKdramas.find((element) => element.id == req.params.id);
  const query = {_id: ObjectId(req.params.kdramaId)};
  const tmdb = await db.collection("tmdb").findOne(query);
  
  // const queryUsers = {_id: ObjectId(req.params.userId)};
  // const users = await db.collection("users").findOne(queryUsers);
  console.log(tmdb);

  res.render("pages/detail", {
    genre: kdramaData.genre,
    kdramas: kdramaData.kdramas,
    storyLine: kdramaData.storyLine,
    tmdb
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

// 404
app.use(function (req, res) {
  console.error("Error 404: page nog found");
  res.status(404).render("pages/404", {
    kdramas: kdramaData.kdramas,
  });
});
// Bron: https://github.com/cmda-bt/be-course-21-22/blob/main/examples/express-server/server.js

// Make connection with Mongo
async function connectDB() {
  const uri = process.env.DB_URI;
  const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  try {
      await client.connect();
      db = client.db(process.env.DB_NAME);
  } catch (error) {
      throw error;
  }
}

// Console log does site work
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB()
  .then(console.log("We have a connection to mongo"));
});
