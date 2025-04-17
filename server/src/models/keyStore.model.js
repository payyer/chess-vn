"use strict";

const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var keyStoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    encryptSecretKey: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: String,
      require: true,
    },
    refreshTokensUsed: [],
  },
  {
    collection: "KeyStore",
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("KeyStore", keyStoreSchema);
