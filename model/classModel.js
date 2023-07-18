const mongoose = require("mongoose");
const schema = mongoose.Schema;

//:_id(Number), name, supervisor (teacher id number), children which is
// array of children id
const model = new mongoose.Schema({
  name: { type: String, required: true },
  supervisor: { type: schema.Types.ObjectId, ref: "teachers" },
  children: { type: [Number], required: true, ref: "childs" },
});

mongoose.model("class", model);

