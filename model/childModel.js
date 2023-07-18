/**
 * Child Data: _id(Number), 
 * fullName, age ,
 *  level (one of PreKG,KG1,KG2), address 
(city,street and building)
 * 
 * 
 */

const mongoose = require("mongoose");

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

mongoose.model("childs", schema);

