var Database = require("../models/database");
var oracledb = require("oracledb");
var fs = require("fs");
let result;
//query base da database
const databquery = `select * from database`;

module.exports.getDb = function () {
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
        .execute(databquery, [], {
          outFormat: oracledb.OBJECT,
        })
        .then((dados) => {
          let datab;
          fs.readFile("oracle.json", (err, data) => {
            if (err) throw err;
            datab = JSON.parse(data);
            for (var key in datab) {
              if (key === "Database") datab[key] = dados.rows;
            }
            fs.writeFile("oracle.json", JSON.stringify(datab), function (erro) {
              if (erro) throw erro;
              console.log("complete");
            });
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
