var express = require("express");
var router = express.Router();
var tab = require("../controllers/sessions");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = tab.getSessions();
  res.render("loader", { p: "sessons" });
});

/* GET home page. */
router.get("/sessions", function (req, res, next) {
  //console.log(t);
  res.render("sessions", { title: obj });
});

module.exports = router;
