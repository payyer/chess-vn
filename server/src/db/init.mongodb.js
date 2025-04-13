"use strict";

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const config = require("../configs/config.mongodb");

const connectString = config.db.url;

// Apply Singleton partern to connect MongoDB
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });
    if (!config.db.url) {
      throw new Error("❌ MongoDB URL is missing. Check your .env file.");
    }

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then((_) => {
        console.log(`Connected Mongodb Success`);
        countConnect();
      })
      .catch((err) => console.log(`Error Connect!`));
  }

  static getinstance() {
    if (!Database.instace) {
      Database.instace = new Database();
    }

    return Database.instace;
  }
}

module.exports = Database;
