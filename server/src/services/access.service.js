"use strict";

const userModel = require("../models/user.model");
const crypto = require("crypto");
const {
  encryptSecretKey,
  createtokenPair,
  decryptSecretKey,
} = require("../auth/authUtils");
const bcrypt = require("bcrypt");
const { getInfoData } = require("../utils");
const KeyStoreService = require("./keyToken.service");
const { ConflictRequestError } = require("../utils/errorResponse");

class AccessService {
  static signUp = async ({ name, email, password, elo }) => {
    const holderUser = await userModel
      .findOne({ $or: [{ email, name }] })
      .lean();
    if (holderUser) {
      throw new ConflictRequestError("Email or Name is already exist!", 409);
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      elo,
    });

    if (!newUser) {
      return {
        code: 400,
        message: "Create user failed",
      };
    }

    const secretKey = crypto.randomBytes(64).toString("Hex");

    const { encryptedKey, iv } = encryptSecretKey(secretKey);
    if (!encryptedKey || !iv) {
      return {
        code: 500,
        message: "Encrypted secrectKey failed!",
      };
    }

    const newKeyStore = await KeyStoreService.createKeyStore({
      userId: newUser._id,
      encryptSecretKey: encryptedKey,
      iv,
    });

    if (!newKeyStore) {
      return {
        code: 500,
        message: "create key store failed",
      };
    }

    const tokens = await createtokenPair({ userId: newUser._id }, secretKey);

    return {
      code: 201,
      metadata: {
        user: getInfoData({
          fileds: ["_id", "name", "email", "role"],
          object: newUser,
        }),
        tokens,
      },
    };
  };
}

module.exports = AccessService;
