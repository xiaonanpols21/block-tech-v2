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
let tmdbData = [];

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
  console.log(user);
  res.render("pages/mylist", {
    users: kdramaData.users,
    user: user
  });
});

app.get("mylist/:userId", async (req, res) => {
  const userId = new ObjectId(req.params.userId)
  const query = {_id: userId}
  //const user = await db.collection("users").findOne({query});
   //const users = await db.collection("users").find({},{}).toArray();
   const user = await db.collection('users').findOne(query, {})
  console.log(user);
  res.render('pages/mylist', {
    user: user
  })
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

// Connectie maken met database
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

// Site laten werken
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB()
  .then(console.log("We have a connection to mongo"));
});
