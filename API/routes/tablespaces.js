var express = require("express");
var router = express.Router();
var Tablespaces = require("../controllers/tablespaces");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = Tablespaces.getTables();
  res.render("loader", { p: "tablespaces" });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("tablespaces", { tabelas: obj });
});

module.exports = router;
