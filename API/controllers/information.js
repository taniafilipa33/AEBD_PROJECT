var Information = require("../models/information");
var oracledb = require("oracledb");

let obj = [Information];

//query base das Information
const informationquery = `select * from information`;

module.exports.getInformation = function () {
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
      connection.execute(informationquery, [], function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        var i = 0;
        result.rows.forEach((element) => {
          Information = {};
          Information.ID_INFORMATION = element[0];
          Information.STORAGE_DATA = element[1];
          Information.STORAGE_TEMP = element[2];
          Information.FREE_MEM = element[3];
          Information.MAX_SIZE_MEM = element[4];
          Information.CACHE_SIZE_MEM = element[5];
          Information.TIMESTAMP = element[6];
          Information.ID_DB = element[7];
          obj[i] = Information;
          i++;
        });
        console.log(obj);
      });
    }
  );

  return obj;
};