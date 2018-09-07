const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

router.put('/:id', function (req, res) {
    Todo.update({
        _id: req.params.id
    }, {
        todo: req.body.todo
    }, function (err, response) {
        if (err) throw err;
        console.log("item edited!");

        res.send('success');
    });
});

module.exports = router;