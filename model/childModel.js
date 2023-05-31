/**
 * Child Data: _id(Number), 
 * fullName, age ,
 *  level (one of PreKG,KG1,KG2), address 
(city,street and building)
 * 
 * 
 */

const { request } = require("express");
const mongoose = require("mongoose");
const mongooseShema = mongoose.Schema;
const autoIncrement = require("@alec016/mongoose-autoincrement");
autoIncrement.initialize(mongoose.connection);

const address = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false }
);
const schema = new mongoose.Schema({
  fullname: String,
  address: address,
  age: Number,
  level: String,
});

schema.plugin(autoIncrement.plugin, "childs");
mongoose.model("childs", schema);
