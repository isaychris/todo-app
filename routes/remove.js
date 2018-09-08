const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

router.delete('/todo/:id', function (req, res) {
    Todo.find({
        _id: req.params.id
    }).remove(function (err, doc) {
        if (err) throw err;

        res.send(doc);
    });
});

module.exports = router;