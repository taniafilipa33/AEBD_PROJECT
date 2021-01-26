var express = require("express");
var router = express.Router();
var Information = require("../controllers/information");
var axios = require("axios");
var Session = require("../controllers/sessions");

/* GET tablespace page. */
router.get("/", function (req, res, next) {
  Information.getInfo();
  Session.getSessions();
  axios.get("http://localhost:3000/Information").then(function (resp) {
    axios
      .get("http://localhost:3000/Sessions")
      .then(function (ddd) {
        axios
          .get("http://localhost:3000/Database")
          .then(function (maisO) {
            //var bases = maisO.data;
            var sessoes = ddd.data;
            var ativas = Information.trataSessoesAtivas(sessoes);
            var inativas = Information.trataSessoesInativas(sessoes);
            var infor = resp.data;
            var inf = Information.trataInfo(infor);
            console.log(inf);
            res.render("index", {
              info: JSON.stringify(inf),
              ativos: JSON.stringify(ativas),
              inativos: JSON.stringify(inativas),
              base: maisO.data,
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
