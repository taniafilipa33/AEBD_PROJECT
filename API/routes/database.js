var express = require("express");
var router = express.Router();
var Database = require("../controllers/database");
var axios = require("axios");
var fs = require("fs");
var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  //restartFile();
  Database.getDb();
  res.render("loader", { p: "database/" });
});

/* GET database page. */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3002/Database")
    .then(function (resp) {
      var db = resp.data;
      res.render("database", { tabelas: db });
      res.end();
    })
    .catch(function (error) {
      console.log("Erro na obtenção da lista de database: " + error);
    });
});

module.exports = router;

/** restart file oracle */

function restartFile() {
  fs.writeFile(
    "oracle.json",
    '{"Tablespaces": [],"Datafiles": [],"Users": [],"Database": [],"Sessions": [],"Information": []}',
    function (erro) {
      if (erro) throw erro;
      console.log("complete");
    }
  );
}
