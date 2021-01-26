var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const oracledb = require("oracledb");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tablespacesRouter = require("./routes/tablespaces");
var datafileRouter = require("./routes/datafiles");
var sessionsRouter = require("./routes/sessions");
var databaseRouter = require("./routes/database");
var fs = require("fs");
const { fstat } = require("fs");
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
  }
);

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
app.use("/tablespaces", tablespacesRouter);
app.use("/loader", tablespacesRouter);
app.use("/loader", datafileRouter);
app.use("/loader", databaseRouter);
app.use("/database", databaseRouter);
app.use("/loader", sessionsRouter);
app.use("/loader", usersRouter);
app.use("/datafiles", datafileRouter);
app.use("/sessions", sessionsRouter);

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
