const userModel = require("../models/user.model");
const { UnauthorizedResponseError } = require("../utils/errorResponse");

class UserService {
  static findByEmail = async (email) => {
    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      throw new UnauthorizedResponseError("Email is not exist!");
    }
    return user;
  };
}

module.exports = UserService;
