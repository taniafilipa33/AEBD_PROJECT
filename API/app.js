var createError = require("http-errors");
var express = require("express");
var path = require("path");
const fs = require("fs");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

oracledb.initOracleClient({
  libDir: "C:\\oracle\\instantclient",
});

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
    connection.execute("SELECT * FROM tablespaces", [], function (err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      //console.log(json.stringify(objs));
      //console.log(result.metaData);
      //console.log(result.rows);
      //doRelease(connection);
    });
  }
);
function doRelease(connection) {
  connection.release(function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
