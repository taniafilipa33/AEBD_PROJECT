var oracledb = require("oracledb");
const fs = require("fs");
const { outFormat } = require("oracledb");

let result;

//query base dos database
const dbquery = `select * from database`;

module.exports.getDb = function () {
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
      result = await connection.execute(dbquery, [], {
        outFormat: oracledb.OBJECT,
      });

      let db;
      fs.readFile("oracle.json", (err, data) => {
        if (err) throw err;
        db = JSON.parse(data);
        for (var key in db) {
          if (key === "DB") db[key] = result.rows;
        }
        fs.writeFile("oracle.json", JSON.stringify(db), function (erro) {
          if (erro) throw erro;
          console.log("complete");
        });
      });
    })()
  );
};
