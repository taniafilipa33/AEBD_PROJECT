var express = require("express");
var router = express.Router();

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = Tablespaces.getTables();
  res.render("loader", { p: "index" });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  //console.log(t);
  res.render("index", { title: "pp" });
});

module.exports = router;
