var Tablespaces = require("../models/tablespaces");
var oracledb = require("oracledb");
var fs = require("fs");
let result;
//query base dos tablespaces
const tablesquery = `select * from tablespaces order by id_tablespace`;

module.exports.getTables = function () {
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
        .execute(tablesquery, [], {
          outFormat: oracledb.OBJECT,
        })
        .then((dados) => {
          let tables;
          fs.readFile("oracle.json", (err, data) => {
            if (err) throw err;
            tables = JSON.parse(data);
            for (var key in tables) {
              if (key === "Tablespaces") tables[key] = dados.rows;
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

module.exports.trataTimestamps = function (tables) {
  var resposta = [];
  var id = -1;
  var times = "";
  tables.forEach((element) => {
    if (element["ID_TABLESPACE"] > id) {
      id = element["ID_TABLESPACE"];
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
