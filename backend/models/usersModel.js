const { Schema, model } = require("mongoose");
const usersSchema = Schema({
  email: {
    type: String,
    required: [true, "Db: email is required"],
  },
  password: {
    type: String,
    required: [true, "Db: password is required"],
  },
  name: {
    type: String,
    default: "Sandra Balok",
  },
  token: {
    type: String,
    default: null,
  },
  roles: [
    {
      type: String,
      ref: "roles",
    },
  ],
});
module.exports = model("users", usersSchema);
