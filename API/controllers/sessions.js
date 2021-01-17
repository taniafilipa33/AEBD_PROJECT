var Sessions = require("../models/sessions");
var oracledb = require("oracledb");

let obj = [Sessions];

//query base das Sessions
const sessionsquery = `select * from sessions`;

module.exports.getSessions = function () {
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
      connection.execute(sessionsquery, [], function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        var i = 0;
        result.rows.forEach((element) => {
          Sessions = {};
          Sessions.ID_SESSION = element[0];
          Sessions.MAX_SESSIONS = element[1];
          Sessions.CURRENT_SESSIONS = element[2];
          Sessions.STATUS = element[3];
          Sessions.TIMESTAMP = element[4];
          Sessions.ID_USER = element[5];
          Sessions.ID_DB = element[6];
          obj[i] = Sessions;
          i++;
        });
        console.log(obj);
      });
    }
  );

  return obj;
};