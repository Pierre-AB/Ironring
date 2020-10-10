const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false, // default = false
      // rolling: true, // ADDED FOR TEST PURPOSE
      saveUninitialized: true,
      cookie: {
        maxAge: 200000000,
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 * 24,
      }),
    })
  );
};
