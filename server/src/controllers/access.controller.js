"use strict";

const AccessService = require("../services/access.service");
const {
  CreateSuccessResponse,
  SuccessResponse,
} = require("../utils/successResponse");

class AccessController {
  signUp = async (req, res) => {
    new CreateSuccessResponse({
      message: "Sign up user success",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  login = async (req, res) => {
    new SuccessResponse({
      message: "Login Success",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  logout = async (req, res) => {
    new SuccessResponse({
      message: "Logout Success",
      status: 204,
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };
}

module.exports = new AccessController();
