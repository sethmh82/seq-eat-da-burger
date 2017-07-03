var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    db.Burger.findAll({
        order: [
            ["burger_name", "ASC"]
        ],
        include: [{
            model: db.Customer,
            attributes: ["customer_name"]
        }]
    }).then(function(allBurgers) {
        var hbsObject = {
            burgers: allBurgers
        };
        res.render("index", hbsObject);
    });
});

// CREATE A BURGER
router.post("/burgers/create", function(req, res) {
    return db.Burger.create({
        burger_name: req.body.burgerName
    }).then(function() {
        res.redirect("/burgers");
    });
});

// UPDATE A BURGER AFTER DEVOUR
router.put("/burgers/update/devour/:id", function(req, res) {
    return db.Customer.create({
        customer_name: req.body.customer
    }).then(function(newCustomer) {
        return db.Burger.update({
            devoured: req.body.devoured,
            CustomerId: newCustomer.id
        }, {
            where: {
                id: req.params.id
            },
            include: [db.Customer]
        });
    }).then(function() {
        res.redirect("/burgers");
    });
});

// UPDATE A BURGER
router.put("/burgers/update/return/:id", function(req, res) {
    return db.Burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

// DELETE A BURGER
router.delete("/burgers/delete/:id", function(req, res) {
    return db.Burger.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

module.exports = router;

