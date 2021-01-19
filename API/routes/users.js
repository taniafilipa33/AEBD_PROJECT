var express = require("express");
var router = express.Router();

var Users = require("../controllers/users");
var axios = require("axios");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  Users.getUsers();
  res.render("loader", { p: "users" });
});

/* GET users page. */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3000/Users")
    .then(function (resp) {
      var users = resp.data;
      res.render("users", { tabelas: users });
      res.end();
    })
    .catch(function (error) {
      console.log("Erro na obtenção da lista de users: " + error);
    });
});

module.exports = router;
