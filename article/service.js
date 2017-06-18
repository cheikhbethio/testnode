"use strict";

const mongoose = require("mongoose");

module.exports = {
  create,
  getter,
  deleter,
  getAll
}

const articleSchema = mongoose.Schema({
  title : String,
  content : String,
  date : Date
})

const dbAccess = mongoose.model("article", articleSchema);

function getAll(req, res){
  return dbAccess.find()
    .then((getted) => {
      console.log("getter de User", getted);
      return res.status(201).json(getted);
    });
}

function create(req, res){
  const body = req.body;
  body.date = Date.now();

  const articleToCreate = new dbAccess(body);

  return articleToCreate.save()
  .then((savedUser) => {
    console.log("success de creation de l'article", savedUser);
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
      return res.status(201).json(getted);
    });
}

function deleter(req, res) {
  const id = req.params.id;

  return dbAccess.findByIdAndRemove(id)
  .then((value) => {
  	return res.status(200).json(value);
  })
  .catch(() => {
    return res.status(500).json(err);
  });
}
