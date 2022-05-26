// NPM packages
const express = require("express");

const slug = require("slug");
const arrayify = require("array-back");

const fetch = require("cross-fetch");
const dotenv = require("dotenv").config();

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

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
  const tmdb = await db.collection("tmdb").find({},{}).toArray();
  res.render("pages/index", {
    users,
    tmdb
  });
});

app.get("/mylist/:userId/:slug", async (req, res) => {
  console.log("GET: /mylist/:userId/:slug");
  const query = {_id: ObjectId(req.params.userId)};
  const user = await db.collection("users").findOne(query);
  const tmdb = await db.collection("tmdb").find({},{}).toArray();
  console.log(user.mylist)
  res.render('pages/mylist', {
    user,
    tmdb
  })
}); 

app.post("/mylist/:userId/:slug", async (req, res) => {
  console.log("POST: /mylist/:userId/:slug");
  const query = {_id: ObjectId(req.params.userId)};
  const kdramaid = {_id: ObjectId(req.body.mylist)};
  const updatequery = {$push: {mylist: req.body.kdramaid}}
  await db.collection("users").updateOne(query, updatequery);
    
  const url = `/mylist/${req.params.userId}/${req.params.slug}`;
  res.redirect("url");
});

app.get("/profile/:userId/:slug", async (req, res) => {
  console.log("GET: /profile/:userId/:slug");
  const query = {_id: ObjectId(req.params.userId)};
  const kdramaid = {_id: ObjectId(req.body.mylist)};
  const user = await db.collection("users").findOne(query);
  console.log(user);
  const tmdb = await db.collection("tmdb").find({},{}).toArray();
  const userkdrama = tmdb.filter(kdrama => user.mylist.includes(kdrama._id))
  console.log(userkdrama);
/*
  gegevens van kdraam ophale
loop find one
ingewikkelde qyery met list
*/
  res.render("pages/profile", {
    user,
    tmdb,
    userkdrama
  });
});

app.get("/kdrama/:kdramaid/:slug/:userId/:slug", async (req, res) => {
  console.log("GET: /kdrama/:kdramaId/:slug");
  const query = {_id: ObjectId(req.params.userId)};
  const kdramaid = {_id: ObjectId(req.params.kdramaid)};
  const user = await db.collection("users").findOne(query);
  console.log(user);
  const tmdb = await db.collection("tmdb").findOne(kdramaid);

  res.render("pages/detail", {
    user,
    tmdb,
  });
});

// TODO: 404
app.use(function (req, res) {
  console.error("Error 404: page nog found");
  const kdramaid = {_id: ObjectId(req.params.kdramaid)};
  const tmdb = db.collection("tmdb").findOne(kdramaid);

  res.status(404).render("pages/404", {
    tmdb
  });
});

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
