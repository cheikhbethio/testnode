"use strict";

const article = require("./service");


var  MyAclClass = require("./../config/accessControle.js");
// var myAcl = undefined;


module.exports = function (app) {
  var myAcl = (new MyAclClass()).acl;
  console.log("+++++++++++++++++++++++++",new MyAclClass());
  app.post("/api/article", myAcl.middleware(), article.create);
  app.get("/api/article/:id", myAcl.middleware(), article.getter);
  app.get("/api/article", article.getAll);
  app.delete("/api/article/:id", article.deleter);
}
