var express = require("express");
var router = express.Router();
var tab = require("../controllers/datafiles");

/* GET home page. */
router.get("/datafiles", function (req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("datafiles", { title: t });
});

module.exports = router;
