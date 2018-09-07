const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

router.post('/', function (req, res) {
    Todo(req.body).save(function (err) {
        if (err) throw err;
        console.log("item saved!");

        res.redirect("/");
    });
});

module.exports = router;