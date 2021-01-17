var express = require("express");
var router = express.Router();
var tab = require("../controllers/users");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  obj = tab.getUsers();
  res.render("loader", { p: "users" });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users", { title: obj });
});

module.exports = router;
