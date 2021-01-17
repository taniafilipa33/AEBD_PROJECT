var express = require("express");
var router = express.Router();
var tab = require("../controllers/sessions");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = Tablespaces.getTables();
  res.render("loader", { p: "sessons" });
});

/* GET home page. */
router.get("/sessions", function (req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("sessions", { title: t });
});

module.exports = router;
