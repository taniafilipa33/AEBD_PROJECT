var Tablespaces = require("../models/tablespaces");
var oracledb = require("oracledb");
var ff = require("await");

let obj = [Tablespaces];

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
    function (err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
      connection.execute(tablequery, [], function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        var i = 0;
        result.rows.forEach((element) => {
          Tablespaces = {};
          Tablespaces.ID_TABLESPACE = element[0];
          Tablespaces.NAME = element[1];
          Tablespaces.ALLOCATED_SPACE = element[2];
          Tablespaces.FREE_SPACE = element[3];
          Tablespaces.USED_SPACE = element[4];
          Tablespaces.IS_TEMPORARY = element[5];
          Tablespaces.TIMESTAMP = element[6];
          Tablespaces.ID_DB = element[7];
          obj[i] = Tablespaces;
          i++;
          //console.log(obj);
        });
      });
    }
  );
  //console.log(obj);
  return obj;
};
