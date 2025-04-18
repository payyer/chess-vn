"use strict";
const JWT = require("jsonwebtoken");
const crypto = require("node:crypto");
const { InternalServerResponseError } = require("../utils/errorResponse");
const { asyncHandler } = require("../utils");

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
  const masterKey = Buffer.from(process.env.MASTER_KEY, "hex");
  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", masterKey, ivBuffer);
  let decryptedKey = decipher.update(encryptedKey, "hex", "utf-8");
  decryptedKey += decipher.final("utf-8");

  return decryptedKey;
};

const authentication = asyncHandler((req, res, next) => {
  return next();
});

module.exports = {
  createtokenPair,
  encryptSecretKey,
  decryptSecretKey,
  authentication,
};
