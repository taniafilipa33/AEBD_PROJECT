var express = require("express");
var router = express.Router();
var Sessions = require("../controllers/sessions");
var axios = require("axios");
var fs = require("fs");
var obj;
/* GET loader page. */
router.get("/loader", function (req, res, next) {
  //restartFile();
  Sessions.getSessions();
  res.render("loader", { p: "sessions/" });
});

/* GET sessions page. */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3002/Sessions")
    .then(function (resp) {
      var sessions = resp.data;
      var resposta = Sessions.trataSession(sessions);
      res.render("sessions", { tabelas: resposta });
      res.end();
    })
    .catch(function (error) {
      console.log("Erro na obtenção da lista de sessions: " + error);
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
