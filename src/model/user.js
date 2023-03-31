const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      required : true ,
      default : "guest",
    }
  },
);
module.exports.User = mongoose.model("user", userSchema);
