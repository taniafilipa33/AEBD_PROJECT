var Tablespaces = require("../models/information");
var oracledb = require("oracledb");
var fs = require("fs");
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
    if (element["TIMESTAMP"] == time) {
      obj.push(i);
      i = 0;
    } else {
      if (element["STATUS"] === "ACTIVE" && element["ID_USER"] != 0) {
        time = element["TIMESTAMP"];
        i++;
      }
    }
  });
  //console.log(obj);
  return obj;
};

module.exports.trataSessoesInativas = function (sessoes) {
  //var data = JSON.parse(sessoes);
  var obj = [];
  sessoes.sort(function (a, b) {
    return a.TIMESTAMP > b.TIMESTAMP;
  });
  var time = "";
  var i = 0;
  sessoes.forEach((element) => {
    if (element["TIMESTAMP"] == time) {
      obj.push(i);
      i = 0;
    } else {
      if (element["STATUS"] === "INACTIVE") {
        time = element["TIMESTAMP"];
        i++;
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
          let tables;
          fs.readFile("oracle.json", (err, data) => {
            if (err) throw err;
            tables = JSON.parse(data);
            for (var key in tables) {
              if (key === "Information") tables[key] = dados.rows;
            }
            fs.writeFile(
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

function doRelease(connection) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}
