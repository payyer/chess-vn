"use strict";

const keyStoreModel = require("../models/keyStore.model");

class KeyStoreService {
  static createKeyStore = async ({ userId, encryptSecretKey, iv }) => {
    try {
      const newKeyStore = await keyStoreModel.create({
        userId,
        encryptSecretKey,
        iv,
      });
      return newKeyStore ? newKeyStore : null;
    } catch (error) {
      console.log({ error });
      return error;
    }

    console.log({ newKeyStore });
  };
}

module.exports = KeyStoreService;
