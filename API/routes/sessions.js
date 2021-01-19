var express = require("express");
var router = express.Router();
var Sessions = require("../controllers/sessions");
var axios = require("axios");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  Sessions.getSessions();
  res.render("loader", { p: "sessions" });
});

/* GET sessions page. */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3000/Sessions")
    .then(function (resp) {
      var sessions = resp.data;
      res.render("sessions", { tabelas: sessions });
      res.end();
    })
    .catch(function (error) {
      console.log("Erro na obtenção da lista de sessions: " + error);
    });
});

module.exports = router;
