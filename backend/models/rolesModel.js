const { Schema, model } = require("mongoose");
const rolesSchema = Schema({
  value: {
    type: String,
    required: true,
    default: "USER",
  },
});
module.exports = model("roles", rolesSchema);
