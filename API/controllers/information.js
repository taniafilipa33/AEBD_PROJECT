var Tablespaces = require("../models/information");
var oracledb = require("oracledb");
var fs = require("fs");
const { Console } = require("console");
const { Session } = require("inspector");
const { json } = require("express");
const { isRegExp } = require("util");
const { restart } = require("nodemon");
let result;
//query base dos datafiles
const datafquery = `select * from information`;

module.exports.trataSessoesAtivas = function (sessoes) {
  //var data = JSON.parse(sessoes);
  var obj = [];
  sessoes.sort(function (a, b) {
    return a.TIMESTAMP > b.TIMESTAMP;
  });
  var time = "";
  var i = 0;
  sessoes.forEach((element) => {
    if (element["TIMESTAMP"] != time) {
      time = element["TIMESTAMP"];
      obj.push(i);
      i = 0;
    } else {
      if (element["STATUS"] === "ACTIVE" && element["ID_USER"] != 0) {
        time = element["TIMESTAMP"];
        i = i + 1;
      }
    }
  });
  //console.log(obj);
  return obj;
};

module.exports.trataSessoesInativas = function (sessoes) {
  //var data = JSON.parse(sessoes);
  var obj = [];

  sessoes.reverse();

  var time = "";
  var i = 0;
  sessoes.forEach((element) => {
    if (element["TIMESTAMP"] != time) {
      time = element["TIMESTAMP"];
      obj.push(i);
      i = 0;
    } else {
      if (element["STATUS"] === "INACTIVE") {
        //console.log(element["TIMESTAMP"]);
        time = element["TIMESTAMP"];
        i = i + 1;
      }
    }
  });
  //console.log(obj);
  return obj;
};

module.exports.getInfo = function () {
  oracledb.getConnection(
    {
      user: "TP",
      password: "tp",
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orclpdb1.localdomain)))",
    },
    function (err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      connection
        .execute(datafquery, [], {
          outFormat: oracledb.OBJECT,
        })
        .then((dados) => {
          //restart();
          let tables;
          fs.readFileSync("oracle.json", (err, data) => {
            if (err) throw err;
            tables = JSON.parse(data);
            for (var key in tables) {
              if (key === "Information") tables[key] = dados.rows;
            }
            fs.writeFileSync(
              "oracle.json",
              JSON.stringify(tables),
              function (erro) {
                if (erro) throw erro;
                console.log("complete");
              }
            );
          });
        })
        .catch((err) => {
          console.log(err), doRelease(connection);
        });
    }
  );
};

module.exports.trataInfo = function (tables) {
  var resposta = [];
  var id = -1;
  var times = "";
  tables.forEach((element) => {
    if (element["ID_INFORMATION"] > id) {
      id = element["ID_INFORMATION"];
      times = element["TIMESTAMP"];
    }
  });
  tables.forEach((element) => {
    if (element["TIMESTAMP"] === times) resposta.push(element);
  });
  return resposta;
};

function doRelease(connection) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}
