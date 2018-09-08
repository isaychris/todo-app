const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

router.post('/todo', function (req, res) {
    Todo(req.body).save(function (err, doc) {
        if (err) throw err;
        console.log("item saved!");

        res.send(doc);
    });
});

module.exports = router;