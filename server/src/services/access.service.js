"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  encryptSecretKey,
  createtokenPair,
  decryptSecretKey,
} = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const KeyStoreService = require("./keyToken.service");
const {
  ConflictRequestError,
  UnauthorizedResponseError,
  InternalServerResponseError,
} = require("../utils/errorResponse");
const UserService = require("./user.service");

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    // step 01: check email is exists
    const user = await UserService.findByEmail(email);

    // step 02: check validate password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedResponseError("Invalid Email or Password!");
    }

    // step 03: Create secretKey and Tokens
    const secretKey = crypto.randomBytes(64).toString("Hex");
    const tokens = await createtokenPair({ userId: user._id }, secretKey);

    // step 04: Enctype secretKey
    const { encryptedKey, iv } = encryptSecretKey(secretKey);
    if (!encryptedKey || !iv) {
      throw new InternalServerResponseError("Encrypt secrect key failed!");
    }

    // step 05: Create Key Store to save Encrypt secretKey and RefreshToken
    await KeyStoreService.createKeyStore({
      userId: user._id,
      encryptSecretKey: encryptedKey,
      iv,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getInfoData({ fileds: ["_id", "name", "email"], object: user }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password, elo }) => {
    // step 01: Check user already exist!
    const holderUser = await userModel
      .findOne({ $or: [{ email, name }] })
      .lean();
    if (holderUser) {
      throw new ConflictRequestError("Email or Name is already exist!", 409);
    }

    // step 02: Hash password and create user
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      elo,
    });

    if (!newUser) {
      throw new InternalServerResponseError("Create User Failed!");
    }

    // step 03: Create secretKey and Tokens
    const secretKey = crypto.randomBytes(64).toString("Hex");
    const tokens = await createtokenPair({ userId: newUser._id }, secretKey);

    // step 04: Enctype secretKey
    const { encryptedKey, iv } = encryptSecretKey(secretKey);
    if (!encryptedKey || !iv) {
      throw new InternalServerResponseError("Encrypt secrect key failed!");
    }

    // step 05: Create Key Store to save Encrypt secretKey and RefreshToken
    const newKeyStore = await KeyStoreService.createKeyStore({
      userId: newUser._id,
      encryptSecretKey: encryptedKey,
      iv,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getInfoData({
        fileds: ["_id", "name", "email", "role"],
        object: newUser,
      }),
      tokens,
    };
  };
}

module.exports = AccessService;
