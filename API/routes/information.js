var express = require("express");
var router = express.Router();
var tab = require("../controllers/information");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = Tablespaces.getTables();
  res.render("loader", { p: "information" });
});

/* GET home page. */
router.get("/information", function (req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("information", { title: t });
});

module.exports = router;
