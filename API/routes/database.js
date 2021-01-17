var express = require("express");
var router = express.Router();
var tab = require("../controllers/database");

/* GET home page. */
router.get("/database", function (req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("database", { title: t });
});

module.exports = router;
