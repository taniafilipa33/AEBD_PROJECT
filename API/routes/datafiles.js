var express = require("express");
var router = express.Router();
var tab = require("../controllers/datafiles");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = tab.getData();
  res.render("loader", { p: "datafiles" });
});

/* GET home page. */
router.get("/datafiles", function (req, res, next) {
  //console.log(t);
  res.render("datafiles", { title: obj });
});

module.exports = router;
