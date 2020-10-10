require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

mongoose
  //UNCOMMENT R14 AND COMMENT R15 -> TO CONNECT TO ATLAS - DONE
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })    // ATLAS
  // .connect("mongodb://localhost/ironring", { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
require('./configs/session.config')(app);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Session set-up





// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Ironring";

app.use(function (req, res, next) { // variable global pour users accessible partout 
  res.locals.user = req.session.currentUser // {{#if }}
  next()
})

app.use((req, res, next) => {
  switch (req.query.course) {
    case 'Web-Dev':
      res.locals.webdev = true;
      break;
    case 'UX/UI':
      res.locals.uxui = true;
      break;
    case 'Data':
      res.locals.data = true;
      break;
    case 'Cyber_Security':
      res.locals.security = true;
      break;
    default:
      res.locals.all = true;
      break;
  }
  next();
})

// ########   #######  ##     ## ######## ######## ########   ######
// ##     ## ##     ## ##     ##    ##    ##       ##     ## ##    ##
// ##     ## ##     ## ##     ##    ##    ##       ##     ## ##
// ########  ##     ## ##     ##    ##    ######   ########   ######
// ##   ##   ##     ## ##     ##    ##    ##       ##   ##         ##
// ##    ##  ##     ## ##     ##    ##    ##       ##    ##  ##    ##
// ##     ##  #######   #######     ##    ######## ##     ##  ######

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const authRouter = require("./routes/auth.routes");
app.use("/", authRouter);

const projectRouter = require("./routes/projects.routes");
app.use("/", projectRouter);

module.exports = app;


/***
 *    ##     ##    ###    ##    ## ########  ##       ######## ########     ###    ########   ######  
 *    ##     ##   ## ##   ###   ## ##     ## ##       ##       ##     ##   ## ##   ##     ## ##    ## 
 *    ##     ##  ##   ##  ####  ## ##     ## ##       ##       ##     ##  ##   ##  ##     ## ##       
 *    ######### ##     ## ## ## ## ##     ## ##       ######   ########  ##     ## ########   ######  
 *    ##     ## ######### ##  #### ##     ## ##       ##       ##     ## ######### ##   ##         ## 
 *    ##     ## ##     ## ##   ### ##     ## ##       ##       ##     ## ##     ## ##    ##  ##    ## 
 *    ##     ## ##     ## ##    ## ########  ######## ######## ########  ##     ## ##     ##  ######  
 */

hbs.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// How to use it, in .hbs view :

// {{#ifCond v1 v2}}
//     {{v1}} is equal to {{v2}}
// {{else}}
//     {{v1}} is not equal to {{v2}}
// {{/ifCond}}