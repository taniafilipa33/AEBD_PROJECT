var express = require("express");
var router = express.Router();
var tab = require("../controllers/tablespaces");

/* GET home page. */
router.get("/tablespaces", function (req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("tablespaces", { title: t });
});

module.exports = router;
