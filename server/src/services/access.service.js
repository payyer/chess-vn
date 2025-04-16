"use strict";

const userModel = require("../models/user.model");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createtokenPair } = require("../auth/authUtils");
const bcrypt = require("bcrypt");
const { getInfoData } = require("../utils");

class AccessService {
  static signUp = async ({ name, email, password, elo }) => {
    try {
      // step 01: check email exist
      // lean() will return plain JavaScript object instead of Mongoose Document, reduce size value => learn more on docs mongoose
      const holderUser = await userModel.findOne({ email }).lean();
      if (holderUser) {
        return {
          code: "xxxx",
          message: "User already registed",
        };
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      const newUser = await userModel.create({
        name,
        email,
        password: hashPassword,
        elo,
      });

      if (newUser) {
        // step 02: create privateKey, publicKey with algorithms RSA
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
          },
        });

        // step 03: save publicKeyString to DB KeyToken
        const publicKeyString = await KeyTokenService.createToken({
          userId: newUser._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "PublicKey string error",
          };
        }

        // step 04: Create token pair => accessToken and refreshToken
        const tokens = await createtokenPair(
          { userId: newUser._id, email },
          privateKey
        );

        // step 05: return to user tokens and info of user
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
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
