var oracledb = require("oracledb");
const fs = require("fs");

const { outFormat } = require("oracledb");

let result;
//query base dos datafiles
const datafquery = `select * from datafiles`;

module.exports.getDataF = function () {
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
      result = await connection.execute(datafquery, [], {
        outFormat: oracledb.OBJECT,
      });

      let datafiles;
      fs.readFile("oracle.json", (err, data) => {
        if (err) throw err;
        datafiles = JSON.parse(data);
        for (var key in datafiles) {
          if (key === "Datafiles") datafiles[key] = result.rows;
        }
        fs.writeFile("oracle.json", JSON.stringify(datafiles), function (erro) {
          if (erro) throw erro;
          console.log("complete");
        });
      });
    })()
  );
};
