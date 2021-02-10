const { Schema, model } = require("mongoose");

const linkSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  original_name: {
    type: String,
    required: true,
  },
  uploads: {
    type: Number,
    default: 1,
  },
  author: {
    type: Schema.ObjectId,
    ref: "Usuarios",
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Link", linkSchema);
