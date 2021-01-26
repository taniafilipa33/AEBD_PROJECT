var express = require("express");
var router = express.Router();
var Tablespaces = require("../controllers/tablespaces");
var axios = require("axios");
var fs = require("fs");
var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  //restartFile();
  Tablespaces.getTables();
  res.render("loader", { p: "tablespaces/" });
});

/* GET tablespace page. */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3002/Tablespaces")
    .then(function (resp) {
      var tables = resp.data;
      var final = Tablespaces.trataTimestamps(tables);
      res.render("tablespaces", { tabelas: final });
      res.end();
    })
    .catch(function (error) {
      console.log("Erro na obtenção da lista de tablespaces: " + error);
    });
});

module.exports = router;
