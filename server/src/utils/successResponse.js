"use strict";
const ReasonStatusCode = {
  OK: "Success",
  CREATE: "Create success",
};

const StatusCode = {
  OK: 200,
  CREATE: 201,
};

class SuccessResponse {
  /**
   *
   */
  constructor({
    message = ReasonStatusCode.OK,
    status = StatusCode.OK,
    metadata = {},
  }) {
    this.message = message;
    this.status = status;
    this.metadata = metadata;
  }

  send(res, headers = {}, options = {}) {
    return res.status(this.status).json({
      status: this.status,
      message: this.message,
      metadata: this.metadata,
      options: options ? options : null,
    });
  }
}

class CreateSuccessResponse extends SuccessResponse {
  /**
   *
   */
  constructor({ metadata, message }) {
    super({
      message: message || ReasonStatusCode.CREATE,
      status: StatusCode.CREATE,
      metadata,
    });
  }
}

module.exports = {
  SuccessResponse,
  CreateSuccessResponse,
};
