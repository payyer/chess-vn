"use strict";
const JWT = require("jsonwebtoken");

const createtokenPair = async (payload, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

module.exports = {
  createtokenPair,
};
