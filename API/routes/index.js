var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //console.log(t);
  res.render("index", { title: "pp" });
});

module.exports = router;
