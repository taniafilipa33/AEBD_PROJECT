var express = require("express");
var router = express.Router();
var Information = require("../controllers/information");
var axios = require("axios");

/* GET tablespace page. */
router.get("/", function (req, res, next) {
  Information.getInformation();
  axios
    .get("http://localhost:3000/Information")
    .then(function (resp) {
      var infor = resp.data;
      res.render("index", { info: infor });
      res.end();
    })
    .catch(function (error) {
      console.log("Erro na obtenção da lista de informations: " + error);
    });
});

module.exports = router;
