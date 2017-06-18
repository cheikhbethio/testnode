"use strict";

var aclLib = require("acl");
const mongodb = require('mongodb');
const _ = require('underscore');
var mongoBackend;
var acl= undefined;
var myAcl= undefined;

mongodb.connect("mongodb://127.0.0.1:27017/acltest", function(error, db) {
  mongoBackend = new aclLib.mongodbBackend(db, 'acl_');
  acl = new aclLib(mongoBackend);

  //article get
  acl.allow("guest", "article", "view");

  //article get and post
  acl.allow("admin", "user", ["get", "post"]);

});

class MyAcl {
  constructor() {
    if (!myAcl) {
      this.acl = acl;
      myAcl = this;
    }
    return myAcl;

  }

}



module.exports = MyAcl;
