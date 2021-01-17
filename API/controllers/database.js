var Database = require("../models/database");
var oracledb = require("oracledb");

let obj = [Database];

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
    function (err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      connection.execute(dbquery, [], function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        var i = 0;
        result.rows.forEach((element) => {
          Database = {};
          Database.ID_DB = element[0];
          Database.NAME_DB = element[1];
          Database.OPERATING_SYSTEM = element[2];
          Database.NUM_CPU = element[3];
          Database.UPTIME = element[4];
          obj[i] = Database;
          i++;
        });
        console.log(obj);
      });
    }
  );

  return obj;
};