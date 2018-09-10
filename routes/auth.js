const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

let Account = require("../models/account");

// route for when user logs out, session is destroyed and user redirected to login
router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

// route for when user views register page
router.get("/register", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("register", { message: undefined });
  }
});

// route for when user submits register details
router.post("/register", validateRegister(), function(req, res) {
  // hash the password
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) throw error;

    // save account details with hash password in database
    Account({
      username: req.body.username,
      password: hash
    }).save(function(err, doc) {
      // if user already exists, register page is rendered with error message
      if (err) {
        res.render("register", { message: "Username already exists." });

        // if not, user is redirected to index.
      } else {
        // create session using passport js
        req.login(doc._id, function(err) {
          if (err) throw err;
          req.session.user = req.body.username;

          res.redirect("../");
        });
      }
    });
  });
  // } else {
  //   console.log("why isnt this working");
  //   res.render("register", { message: "Invalid input entered. Try again." });
  // }
});

// route for when user views login page
router.get("/login", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("login", { message: undefined });
  }
});

// route for when user submits login details
router.post("/login", function(req, res) {
  // make input not case sensitive
  req.body.username = req.body.username.toLowerCase();
  req.body.password = req.body.password.toLowerCase();

  // look up username in database
  Account.find({ username: req.body.username }, function(err, doc) {
    if (err) throw err;

    // if nothing is returned, render login page with error message
    if (!doc.length) {
      res.render("login", { message: "Username or password is incorrect." });
    } else {
      // compare password with hashed password
      bcrypt.compare(req.body.password, doc[0].password, function(err, result) {
        if (err) throw err;

        //if they match, redirect to index.
        if (result == true) {
          console.log("hash matches");

          // create session using passport js
          req.login(doc[0]._id, function(err) {
            if (err) throw err;
            req.session.user = req.body.username;

            res.redirect("../");
          });

          //if not, redirect back to login.
        } else {
          console.log("hash does not match");
          res.render("login", {
            message: "Username or password is incorrect."
          });
        }
      });
    }
  });
});

// middleware which makes input lowercase and checks if it is valid.
function validateRegister() {
  return function(req, res, next) {
    // make input not case sensitive
    req.body.username = req.body.username.toLowerCase();
    req.body.password = req.body.password.toLowerCase();

    if (
      validator.isAlphanumeric(req.body.username) &&
      validator.isAlphanumeric(req.body.username)
    ) {
      console.log("authentication = " + req.isAuthenticated());
      return next();
    }
    res.render("register", { message: "Invalid input. Try again." });
  };
}

module.exports = router;
