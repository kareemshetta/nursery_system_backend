const autoIncrement = require("@alec016/mongoose-autoincrement");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);
//:_id(Number), name, supervisor (teacher id number), children which is
// array of children id
const model = new mongoose.Schema({
  name: { type: String, required: true },
  supervisor: { type: schema.Types.ObjectId, ref: "teachers" },
  children: { type: [Number], required: true, ref: "childs" },
});
model.plugin(autoIncrement.plugin, "class");
mongoose.model("class", model);
