const express = require("express");
const router = express.Router();

let Account = require("../models/account");

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
});

router.get('/register', function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        res.render("register", {
            message: undefined
        });
    }
});

router.post('/register', function (req, res) {
    Account({
        username: req.body.username,
        password: req.body.password
    }).save(function (err, doc) {
        if (err) {
            res.render('register', {
                message: "Username already exists."
            });
        } else {
            req.session.user = req.body.username;
            console.log("account created!")

            res.redirect('../');
        }
    });
});

router.get('/login', function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('..');
    } else {
        res.render("login", {
            message: undefined
        });
    }
});

router.post('/login', function (req, res) {
    Account.find({
        username: req.body.username,
        password: req.body.password
    }, function (err, doc) {
        if (err) throw err;
        if (!doc.length) {
            res.render('login', {
                message: "Username or password is incorrect."
            });
        } else {
            req.session.user = req.body.username;
            console.log("account found!")
            res.redirect('../');
        }
    });
});

module.exports = router;