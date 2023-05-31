const mongoose = require("mongoose");
const schema = mongoose.Schema;

//teacher Data: _id(objectID),
// fullname,password, email , image (which is string
const model = new mongoose.Schema({
  _id: {
    type: schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
});

mongoose.model("teachers", model);
