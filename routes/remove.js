const express = require("express");
const router = express.Router();

let Todo = require("../models/todo");

router.delete('/:id', function (req, res) {
    Todo.find({
        _id: req.params.id
    }).remove(function (err) {
        if (err) throw err;
        console.log("item removed!");

        res.send('success');
    });
});

module.exports = router;