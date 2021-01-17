var express = require("express");
var router = express.Router();
var tab = require("../controllers/information");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = tab.getInformation();
  res.render("loader", { p: "information" });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  //console.log(t);
  res.render("index", { title: obj });
});

module.exports = router;
