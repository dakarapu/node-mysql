const express = require("express");
const mysql = require("mysql2");

var bodyParser = require("body-parser");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "doshii"
});

// Connect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

const app = express();

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE doshii";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

// Create table
app.get("/createmembertable", (req, res) => {
  let sql =
    "CREATE TABLE member (id INT NOT NULL PRIMARY KEY,name VARCHAR(50))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Member table created...");
  });
});

// Create table
app.get("/createrewarstable", (req, res) => {
  let sql =
    "CREATE TABLE reward (reward_name VARCHAR(20) NOT NULL PRIMARY KEY)";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Reward table created...");
  });
});

// Create table
app.get("/creatememrewtable", (req, res) => {
  let sql =
    "CREATE TABLE member_reward (member_id INT NOT NULL,reward_name VARCHAR(20) NOT NULL,PRIMARY KEY(member_id, reward_name))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Member table created...");
  });
});

// Insert post 1
app.get("/addpost1", (req, res) => {
  let post = { title: "Post One", body: "This is post number one" };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added...");
  });
});

// Insert member
app.post("/addmember", (req, res) => {
  console.log("Params: ", req.body);
  let post = { id: req.body.id, name: req.body.name };
  let sql = "INSERT INTO member SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Insert reward
app.post("/addreward", (req, res) => {
  console.log("********************** add reward ***********************");
  var params = req.body;
  console.log("Params: ", req.body);
  //res.send(params);
  let post = { reward_name: "FLYBUYS" };
  let sql = "INSERT INTO reward SET ?";
  //var values = [2, "member_2"];

  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Insert member_reward
app.post("/addrewardtomember", (req, res) => {
  console.log(
    "********************** add reward to member ***********************"
  );
  var params = req.body;
  console.log("Params: ", req.body);
  //res.send(params);
  let post = { member_id: 100, reward_name: "FLYBUYS" };
  let sql = "INSERT INTO member_reward SET ?";
  //var values = [2, "member_2"];

  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Select posts
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Posts fetched...");
  });
});

// Select single post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post fetched...");
  });
});

// Update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${
    req.params.id
  }`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post updated...");
  });
});

// Delete post
app.get("/deletepost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post deleted...");
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
