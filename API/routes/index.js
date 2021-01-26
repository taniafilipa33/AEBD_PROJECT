var express = require("express");
var router = express.Router();
var Information = require("../controllers/information");
var axios = require("axios");
var Session = require("../controllers/sessions");
var Database = require("../controllers/database");
var fs = require("fs");

/* GET loader page. */
router.get("/loader", function (req, res, next) {
  //restartFile();
  Information.getInfo();
  Session.getSessions();
  Database.getDb();
  res.render("loader", { p: "" });
});

/* GET tablespace page. */
router.get("/", function (req, res, next) {
  //restartFile();

  axios.get("http://localhost:3002/Information").then(function (resp) {
    axios
      .get("http://localhost:3002/Sessions")
      .then(function (ddd) {
        axios
          .get("http://localhost:3002/Database")
          .then(function (maisO) {
            //var bases = maisO.data;
            var sessoes = ddd.data;
            var ativas = Information.trataSessoesAtivas(sessoes);
            var inativas = Information.trataSessoesInativas(sessoes);
            var infor = resp.data;
            var inf = Information.trataInfo(infor);
            //console.log(inf);
            var mem = infor.pop();
            res.render("index", {
              info: JSON.stringify(inf),
              ativos: JSON.stringify(ativas),
              inativos: JSON.stringify(inativas),
              base: maisO.data,
              mems: mem,
            });
            res.end();
          })
          .catch(function (gggg) {
            console.log("Erro na obtenção da base de dados: " + gggg);
          })
          .catch(function (gggg) {
            console.log("Erro na obtenção das sessões: " + gggg);
          });
      })
      .catch(function (error) {
        console.log("Erro na obtenção da lista de informations: " + error);
      });
  });
});

module.exports = router;
