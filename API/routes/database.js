var express = require("express");
var router = express.Router();
var tab = require("../controllers/database");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
    obj = Tablespaces.getTables();
    res.render("loader", { p: "database" });
  });

/* GET home page. */
router.get("/database", function (req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("database", { title: t });
});

module.exports = router;
