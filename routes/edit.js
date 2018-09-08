const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

router.put('/todo/:id', function (req, res) {
    Todo.update({
        _id: req.params.id
    }, {
        todo: req.body.todo
    }, function (err, doc) {
        if (err) throw err;
        console.log("item edited!");

        res.send(doc);
    });
});

router.put('/check/:id', function (req, res) {
    Todo.update({
        _id: req.params.id
    }, {
        check: req.body.check
    }, function (err, doc) {
        if (err) throw err;
        console.log("checkbox edited!");

        res.send(doc);
    });
});
module.exports = router;