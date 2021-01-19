var Tablespaces = require("../models/tablespaces");
var oracledb = require("oracledb");
const fs = require("fs");

const { outFormat } = require("oracledb");

let result;
//query base das tablespaces
const tablequery = `select * from tablespaces`;

module.exports.getTables = function () {
  oracledb.getConnection(
    {
      user: "TP",
      password: "tp",
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orclpdb1.localdomain)))",
    },
    (async function (err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      result = await connection.execute(tablequery, [], {
        outFormat: oracledb.OBJECT,
      });

      let tables;
      fs.readFile("oracle.json", (err, data) => {
        if (err) throw err;
        tables = JSON.parse(data);
        for (var key in tables) {
          if (key === "Tablespaces") tables[key] = result.rows;
        }
        fs.writeFile("oracle.json", JSON.stringify(tables), function (erro) {
          if (erro) throw erro;
          console.log("complete");
        });
      });
    })()
  );
};
