"use strict";
const JWT = require("jsonwebtoken");
const crypto = require("node:crypto");
const {
  InternalServerResponseError,
  UnauthorizedResponseError,
  ForbiddenResponseError,
} = require("../utils/errorResponse");

const mognoose = require("mongoose");
const KeyStoreService = require("../services/keyToken.service");
const { access } = require("node:fs");

const HEADERS = {
  CLIENT_ID: "x-client-id",
};

const createtokenPair = async (payload, secrectKey) => {
  const accessToken = JWT.sign(payload, secrectKey, {
    expiresIn: "2 days",
  });
  const refreshToken = JWT.sign(payload, secrectKey, {
    expiresIn: "7 days",
  });
  if (!accessToken || !refreshToken) {
    throw new InternalServerResponseError("Create Token Pair Failed!");
  }
  return { accessToken, refreshToken };
};

const encryptSecretKey = (secretKey) => {
  const iv = crypto.randomBytes(16);
  const masterKey = Buffer.from(process.env.MASTER_KEY, "hex");

  const cipher = crypto.createCipheriv("aes-256-cbc", masterKey, iv);
  let encryptedKey = cipher.update(secretKey, "utf-8", "hex");
  encryptedKey += cipher.final("hex");

  return { encryptedKey, iv: iv.toString("hex") };
};

const decryptSecretKey = (encryptedKey, iv) => {
  try {
    const masterKey = Buffer.from(process.env.MASTER_KEY, "hex");
    const ivBuffer = Buffer.from(iv, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      masterKey,
      ivBuffer
    );
    let decryptedKey = decipher.update(encryptedKey, "hex", "utf-8");
    decryptedKey += decipher.final("utf-8");

    return decryptedKey;
  } catch (error) {
    throw new UnauthorizedResponseError("Failed to decrypt secret key.");
  }
};

const authentication = async (req, res, next) => {
  // step 01: Check Client Id is available?
  const clinetId = req.headers[HEADERS.CLIENT_ID];
  if (!clinetId)
    throw new UnauthorizedResponseError(
      `Missing Client id (${HEADERS.CLIENT_ID}) in header`
    );
  // Step 02: Check type of Client Id
  let isObjectId;
  try {
    isObjectId = new mognoose.Types.ObjectId(clinetId);
  } catch (error) {
    throw new UnauthorizedResponseError(
      `Invalid format Client id (${HEADERS.CLIENT_ID})`
    );
  }

  // Step 03: Check KeyStore of User is available
  const keyStore = await KeyStoreService.findKeyStoreByUserId({
    userId: clinetId,
  });
  if (!keyStore)
    throw new UnauthorizedResponseError(
      "Invalid ClientId or KeyStore not found"
    );

  // Step 04: Check accessToken is available
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    throw new UnauthorizedResponseError("Missing AccesToken (authorization)");

  // Step 05: Decrypt AcessToken
  const decryptedKey = decryptSecretKey(keyStore.encryptSecretKey, keyStore.iv);

  // Step 06: Verify Token and check case error
  try {
    const decoded = JWT.verify(accessToken, decryptedKey);
    if (decoded.userId != clinetId) {
      throw new ForbiddenResponseError(
        "UserId from token does not match Client Id"
      );
    }
  } catch (error) {
    throw new ForbiddenResponseError("Invalid AccessToken");
  }

  req.keyStore = keyStore;
  return next();
};

module.exports = {
  createtokenPair,
  encryptSecretKey,
  decryptSecretKey,
  authentication,
};
