"use strict";

const AccessService = require("../services/access.service");
const { CreateSuccessResponse } = require("../utils/successResponse");

class AccessController {
  signUp = async (req, res) => {
    new CreateSuccessResponse({
      message: "Sign up user success",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
