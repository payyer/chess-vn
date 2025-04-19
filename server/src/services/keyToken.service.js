"use strict";

const keyStoreModel = require("../models/keyStore.model");
const {
  InternalServerResponseError,
  NotFoundResponseError,
} = require("../utils/errorResponse");

class KeyStoreService {
  static createKeyStore = async ({
    userId,
    encryptSecretKey,
    iv,
    refreshToken,
  }) => {
    const filter = { userId };
    const update = {
      encryptSecretKey,
      iv,
      refreshToken,
      refreshTokensUsed: [],
    };

    const options = { upsert: true, new: true };
    const newKeyStore = await keyStoreModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!newKeyStore) {
      throw new InternalServerResponseError("Create Key Store Failed!");
    }

    return newKeyStore;
  };

  static findKeyStoreByUserId = async ({ userId }) => {
    const keyStore = await keyStoreModel.findOne({ userId }).lean();
    if (!keyStore) {
      throw new NotFoundResponseError("Not found Key Store of UserId");
    }
    return keyStore;
  };

  static deleteKeyStoreById = async ({ _id }) => {
    const keyStore = await keyStoreModel
      .findOneAndDelete({ _id }, { new: true })
      .lean();
    return keyStore;
  };
}

module.exports = KeyStoreService;
