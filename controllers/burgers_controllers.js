var express = require("express");
var router = express.Router();
var db = require("../models");

// GET FOR INDEX
router.get("/", function(req, res) {
    res.redirect("/burgers");
});

// GET ALL BURGERS
router.get("/burgers", function(req, res) {
    db.Burger.findAll({
        order: [ ["burger_name", "ASC"] ]
    }).then(function(allBurgers) {
        var allBobj = { burgers: allBurgers };
        res.render("index", allBobj);
    });
});

// CREATE A NEW BURGER
router.post("/burgers/create", function(req, res) {
    return db.Burger.create({
        burger_name: req.body.burgerName
    }).then(function() {
        res.redirect("/burgers");
    });
});

// UPDATE A BURGER AFTER IT IS DEVOURED / DEVOUR ID
router.put("/burgers/update/devour/:id", function(req, res) {
  return db.Burger.update({
    devoured: req.body.devoured,  
        }, { where: { id: req.params.id }
    }).then(function() {
        res.redirect("/burgers");
    });
});

// UPDATE A BURGER WITH RETURN ID
router.put("/burgers/update/return/:id", function(req, res) {
    return db.Burger.update({
    devoured: req.body.devoured
    }, { where: { id: req.params.id }
    }).then(function() {
    res.redirect("/burgers");
    });
});

// DELETE A BURGER
router.delete("/burgers/delete/:id", function(req, res) {
    return db.Burger.destroy({
        where: { id: req.params.id }
    }).then(function() {
        res.redirect("/burgers");
    });
});

module.exports = router;