var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();
var indexRouter = require("./routes/index");
const { create } = require("./models/User");
dotenv = require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Declaring Routes
getUsers = require("./routes/getAlluser");
signup = require("./routes/signup");
login = require("./routes/login");
level1 = require("./routes/level1");
level2 = require("./routes/level2");
level3 = require("./routes/level3");
level4 = require("./routes/level4");
level5 = require("./routes/level5");
leaderboard = require("./routes/leaderboard");
scoreboard = require("./routes/scoreboard");

//PORT ENVIRONMENT VARIABLE  MONGODB Connect
const port = process.env.PORT;
const CONNECTION_URL = process.env.MONGODB_URL;
console.log(CONNECTION_URL);
mongoose
  .connect(CONNECTION_URL)
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});

//  view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes to use

// User Routes
app.use("/", indexRouter);
app.use("/api/user/getallusers", getUsers);
app.use("/api/user/signup", signup);
app.use("/api/user/login", login);
app.use("/api/game/level1", level1);
app.use("/api/game/level2", level2);
app.use("/api/game/level3", level3);
app.use("/api/game/level4", level4);
app.use("/api/game/level5", level5);
app.use("/api/game/leaderboard", leaderboard);
app.use("/api/game/scoreboard", scoreboard);

// Starter and Error Listen Statesments

//catch 404 and forward to error handler
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
