var Users = require("../models/users");
var oracledb = require("oracledb");

let obj = [Users];

//query base das tablespaces
const tablequery = `select * from users`;

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
          Users = {};
          Users.ID_USER = element[0];
          Users.USERNAME = element[1];
          Users.ACCOUNT_STATUS = element[2];
          Users.EXPIRATON_DATE = element[3];
          Users.PROFILE = element[4];
          Users.USER_TYPE = element[5];
          Users.CREATED_DATA = element[6];
          Users.TABLESPACE = element[7];
          Users.ID_DB = element[8];
          obj[i] = Users;
          i++;
        });
        console.log(obj);
      });
    }
  );

  return obj;
};