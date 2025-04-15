"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createToken = async ({ userId, publicKey }) => {
    try {
      // Becasue publicKey current type is Buffer when create keyPair with crypto
      // Convert to string => PEM String to easy save in database
      const publicKeyString = publicKey.toString();

      const tokens = await keytokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
