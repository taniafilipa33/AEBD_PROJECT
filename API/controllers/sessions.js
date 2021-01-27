var Sessions = require("../models/sessions");
var oracledb = require("oracledb");
var fs = require("fs");
let result;
//query base das sessions
const sessionsquery = `select * from sessions order by id_session desc`;

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
      connection
        .execute(sessionsquery, [], {
          outFormat: oracledb.OBJECT,
        })
        .then((dados) => {
          let sessions;
          //console.log(dados);
          fs.readFile("oracle.json", (err, data) => {
            if (err) throw err;
            sessions = JSON.parse(data);
            //console.log(data);
            for (var key in sessions) {
              //console.log("sessoes 1111");
              if (key === "Sessions") sessions[key] = dados.rows;
            }
            console.log(sessions["Sessions"]);
            fs.writeFileSync(
              "oracle.json",
              JSON.stringify(sessions),
              function (erro) {
                if (erro) throw erro;
                console.log("complete");
              }
            );
          });
        })
        .catch((err) => {
          console.log(err), doRelease(connection);
        });
    }
  );
};

module.exports.trataSession = function (tables) {
  var resposta = [];
  var id = -1;
  var times = "";
  tables.forEach((element) => {
    if (element["ID_SESSION"] > id) {
      id = element["ID_SESSION"];
      times = element["TIMESTAMP"];
    }
  });
  tables.forEach((element) => {
    if (element["TIMESTAMP"] === times) resposta.push(element);
  });
  return resposta;
};

function doRelease(connection) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}

/** restart file oracle */

function restartFile() {
  fs.writeFile(
    "oracle.json",
    '{"Tablespaces": [],"Datafiles": [],"Users": [],"Database": [],"Sessions": [],"Information": []}',
    function (erro) {
      if (erro) throw erro;
      console.log("complete");
    }
  );
}
