var oracledb = require("oracledb");
const fs = require("fs");

const { outFormat } = require("oracledb");

let result;
//query base das sessions
const sessionquery = `select * from sessions`;

module.exports.getSessions = function () {
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
      result = await connection.execute(sessionquery, [], {
        outFormat: oracledb.OBJECT,
      });

      let sessions;
      fs.readFile("oracle.json", (err, data) => {
        if (err) throw err;
        sessions = JSON.parse(data);
        for (var key in sessions) {
          if (key === "Sessions") sessions[key] = result.rows;
        }
        fs.writeFile("oracle.json", JSON.stringify(sessions), function (erro) {
          if (erro) throw erro;
          console.log("complete");
        });
      });
    })()
  );
};
