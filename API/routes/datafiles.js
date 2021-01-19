var express = require("express");
var router = express.Router();
var Datafiles = require("../controllers/datafiles");
var axios = require("axios");

var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  Datafiles.getDataF();
  res.render("loader", { p: "datafiles" });
});

/* GET datafiles page. */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3000/Datafiles")
    .then(function (resp) {
      var datafiles = resp.data;
      res.render("datafiles", { tabelas: datafiles });
      res.end();
    })
    .catch(function (error) {
      console.log("Erro na obtenção da lista de datafiles: " + error);
    });
});

module.exports = router;
