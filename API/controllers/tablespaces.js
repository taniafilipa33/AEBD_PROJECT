var Tablespaces = require("../models/tablespaces");
var oracledb = require("oracledb");
var fs = require("fs");
let result;
//query base dos datafiles
const datafquery = `select * from tablespaces`;

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
        .execute(datafquery, [], {
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

function doRelease(connection) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}
