var Users = require("../models/users");
var oracledb = require("oracledb");
var fs = require("fs");
let result;
//query base dos users
const usersquery = `select * from users`;

module.exports.getUsers = function () {
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
        .execute(usersquery, [], {
          outFormat: oracledb.OBJECT,
        })
        .then((dados) => {
          let users;
          fs.readFile("oracle.json", (err, data) => {
            if (err) throw err;
            users = JSON.parse(data);
            for (var key in users) {
              if (key === "Users") users[key] = dados.rows;
            }
            fs.writeFile("oracle.json", JSON.stringify(users), function (erro) {
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
