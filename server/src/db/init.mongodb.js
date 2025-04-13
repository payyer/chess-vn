"use strict";

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");

const connectString = process.env.CONNECT_STRING_MONGODB;

// Apply Singleton partern to connect MongoDB
class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });

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
