var Datafiles = require("../models/datafiles");
var oracledb = require("oracledb");
var fs = require("fs");
let result;
//query base dos datafiles
const datafquery = `select * from datafiles order by id_datafile`;

module.exports.getDataF = function () {
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
          let datafs;
          fs.readFile("oracle.json", (err, data) => {
            if (err) throw err;
            datafs = JSON.parse(data);
            for (var key in datafs) {
              if (key === "Datafiles") datafs[key] = dados.rows;
            }
            fs.writeFile(
              "oracle.json",
              JSON.stringify(datafs),
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

module.exports.trataDatafiles = function (tables) {
  var resposta = [];
  var id = -1;
  var times = "";
  tables.forEach((element) => {
    if (element["ID_DATAFILE"] > id) {
      id = element["ID_DATAFILE"];
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
