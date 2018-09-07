var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/add', require('./routes/add'));
app.use('/remove', require('./routes/remove'));
app.use('/edit', require('./routes/edit'));

mongoose.connect(
  "mongodb+srv://admin:anime@cluster0-e7lsm.mongodb.net/test?retryWrites=true", {
    dbName: "todo-app",
    useNewUrlParser: true
  }
);

let db = mongoose.connection;
let Todo = require("./models/todo");

app.get("/", function (req, res) {
  Todo.find({}, function (err, result) {
    if (err) throw err;

    res.render("index", {
      todos: result
    });
  });
});

app.listen(5000, function () {
  console.log("listening on port 5000!");
});