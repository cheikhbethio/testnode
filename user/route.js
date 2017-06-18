"use strict";

const user = require("./service");

module.exports = function (app, accessController) {
  app.post("/api/user", user.create);
  app.get("/api/user/:id", user.getter);
  app.get("/api/user", user.getAll);
  app.delete("/api/user/:id", user.deleteUser);
}
