var express = require('express');
var router = express.Router();
var tab = require("../controllers/tablespaces");

/* GET users listing. */
router.get('/users', function(req, res, next) {
  var t = tab.getTables();
  //console.log(t);
  res.render("users", { title: t });
});

module.exports = router;
