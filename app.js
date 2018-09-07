const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect(
  "mongodb+srv://admin:anime@cluster0-e7lsm.mongodb.net/test?retryWrites=true", {
    dbName: "todo-app",
    useNewUrlParser: true
  }
);
let db = mongoose.connection;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let Todo = require("./models/todo");

// frontpage route
app.get("/", function (req, res) {
  Todo.find({}, function (err, result) {
    console.log("loading index");
    if (err) throw err;

    res.render("index", {
      todos: result
    });
  });
});

app.post("/add", function (req, res) {
  Todo(req.body).save(function (err) {
    if (err) throw err;
    console.log("item saved!");

    res.redirect("/");
  });
});

app.delete("/delete", function (req, res) {
  Todo.find({
    _id: req.body.id
  }).remove(function (err) {
    if (err) throw err;
    console.log("item removed!");
    res.send('success');
  });
});

app.listen(5000, function () {
  console.log("listening on port 5000!");
});