var express = require('express');
var router = express.Router();
var tab = require("../controllers/tablespaces");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = Tablespaces.getTables();
  res.render("loader", { p: "users" });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("users", { title: t });
});

module.exports = router;
