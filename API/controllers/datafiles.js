var Datafiles = require("../models/datafiles");
var oracledb = require("oracledb");

let obj = [Datafiles];

//query base dos datafiles
const datafquery = `select * from datafiles`;

module.exports.getData = function () {
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
      connection.execute(datafquery, [], function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        var i = 0;
        result.rows.forEach((element) => {
          Datafiles = {};
          Datafiles.ID_DATAFILE = element[0];
          Datafiles.FILE_NAME = element[1];
          Datafiles.STATUS = element[2];
          Datafiles.DT_SIZE = element[3];
          Datafiles.USED_SPACE = element[4];
          Datafiles.TIMESTAMP = element[5];
          Datafiles.ID_TABLESPACE = element[6];
          obj[i] = Datafiles;
          i++;
        });
        console.log(obj);
      });
    }
  );

  return obj;
};