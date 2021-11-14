const mongoose = require("mongoose");
const Kitten = require("../models/test");

//CREATE
exports.create = async function (req, res) {
  try {
    const fluffy = new Kitten({ name: "CAT0" });
    fluffy.save((err) => {
      if (err) {
        console.log(err.errors.name.kind);
        if (err.errors.name.kind === "mongoose-unique-validator") {
          console.log("ERROR: Name must be unique");
        }
      }
    });
    const kittens = await Kitten.find();
    return kittens;
  } catch (err) {
    console.log(err);
  }
};
