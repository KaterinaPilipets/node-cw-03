const { Schema, model } = require("mongoose");
const filmsSchema = Schema({
  title: {
    type: String,
    required: [true, "Db: title is required"],
  },
  year: { type: Number, default: 2000 },
  rating: {
    type: Number,
    required: [true, "Db: rating is required"],
  },
  director: { type: String, default: "Steaven Spilberg" },
});
module.exports = model("films", filmsSchema);
