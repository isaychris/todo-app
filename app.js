const express = require("express");
const session = require("express-session")
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/add', require('./routes/add'));
app.use('/remove', require('./routes/remove'));
app.use('/edit', require('./routes/edit'));
app.use('/', require('./routes/auth'));

mongoose.connect(
  "mongodb+srv://admin:anime@cluster0-e7lsm.mongodb.net/test?retryWrites=true", {
    dbName: "todo-app",
    useNewUrlParser: true
  }
);

let Todo = require("./models/todo");

app.get("/", function (req, res) {
  if (req.session.user && req.cookies.user_sid) {

    Todo.find({
      username: req.session.user
    }, function (err, result) {
      if (err) throw err;

      res.render("index", {
        todos: result,
        username: req.session.user
      });
    });
  } else {
    res.redirect('/login');
  }
});

app.listen(5000, function () {
  console.log("listening on port 5000!");
});