"use strict";

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const configDB = require("./config/database.js");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongodb = require('mongodb');
const methodOverride = require('method-override')
const app = express();
var acl = require("acl");

var toto = mongoose.connect(configDB.db.url);
mongoose.Promise = global.Promise;

app.use(methodOverride('X-HTTP-Method-Override'))
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(session({
	secret: "seugneBethiodieuredieufway",
	resave: true,
	saveUninitialized: true,
	expires: new Date(Date.now() + 2000000),
	cookie: {maxAge: 2000000}
}));

app.listen(3000, function() {
  console.log("server express is running on port 3000");
});

require("./user/route.js")(app);
require("./article/route.js")(app);
