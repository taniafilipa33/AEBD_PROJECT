var oracledb = require("oracledb");
const fs = require("fs");

const { outFormat } = require("oracledb");

let result;
//query base dos users
const userquery = `select * from users`;

module.exports.getUsers = function () {
  oracledb.getConnection(
    {
      user: "TP",
      password: "tp",
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orclpdb1.localdomain)))",
    },
    (async function (err, connection) {
      console.log(
        "olaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      );
      if (err) {
        console.error(err.message);
        return;
      }
      result = await connection.execute(userquery, [], {
        outFormat: oracledb.OBJECT,
      });
      console.log(result.rows);
      let users;
      fs.readFile("oracle.json", (err, data) => {
        if (err) throw err;
        users = JSON.parse(data);
        for (var key in users) {
          if (key === "Users") users[key] = result.rows;
        }
        fs.writeFile("oracle.json", JSON.stringify(users), function (erro) {
          if (erro) throw erro;
          console.log("complete");
        });
      });
    })()
  );
};
