"use strict";

const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: [],
  },
  {
    collection: "KeyToken",
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("KeyToken", keyTokenSchema);
