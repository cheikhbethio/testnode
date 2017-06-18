"use strict";

const mongoose = require("mongoose");
var  MyAclClass = require("./../config/accessControle.js");
var myAcl = undefined;

module.exports = {
  create,
  getter,
  deleteUser,
  getAll
}

const userSchema  = mongoose.Schema({
  firstname : String,
  lastname : String,
  right : Number
});

const dbAccess = mongoose.model("user", userSchema);

function getAll(req, res){
    return dbAccess.find()
      .then((getted) => {
        console.log("getting the Users list", getted);
        return res.status(201).json(getted);
      });
}

function create(req, res) {
    const body = req.body;
    const userToCreate = new dbAccess(body);
    return userToCreate.save()
      .then((savedUser) => {
        console.log("success de creation de l'utilisateur", savedUser);
        myAcl = (new MyAclClass()).acl;
        if(body.right === 1){
          myAcl.addUserRoles( String(savedUser._id), "guest", function(err){
          console.log("addUserRoles error guest", err);
          });
        } else {
          myAcl.addUserRoles( String(savedUser._id), "admin", function(err){
          console.log("addUserRoles error admin", err);
          });
        }
         req.session.userId = savedUser._id;
        console.log("#####################", req.session);
        return res.status(201).json(savedUser);
      })
      .catch((err) => {
        console.log("erreur de creation de l'utilisateur",err);
        return res.status(500).json(err);
      })
}

function getter(req, res){
  const id = req.params.id;

  return dbAccess.findById(id)
    .then((getted) => {
      console.log("getter de User", getted);
      console.log("#####################", req.session);
      return res.status(201).json(getted);
    });
}

function deleteUser(req, res) {
  const id = req.params.id;

  return dbAccess.findByIdAndRemove(id)
  .then((value) => {
  	return res.status(200).json(value);
  })
  .catch(() => {
    return res.status(500).json(err);
  });
}
