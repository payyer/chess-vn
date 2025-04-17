"use strict";

const ReasonStatusCode = {
  OK: "Success",
  CREATE: "Create success",
  ACCEPTED: "Request accepted",
  NO_CONTENT: "No content",
  DELETED: "Deleted success",
};

const StatusCode = {
  OK: 200,
  CREATE: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
};

class SuccessResponse {
  constructor({
    message = ReasonStatusCode.OK,
    status = StatusCode.OK,
    metadata = {},
  }) {
    this.message = message;
    this.status = status;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(this.status).json({
      status: this.status,
      message: this.message,
      metadata: this.metadata,
    });
  }
}

class CreateSuccessResponse extends SuccessResponse {
  constructor({ message = ReasonStatusCode.CREATE, metadata = {} }) {
    super({ message, status: StatusCode.CREATE, metadata });
  }
}

class AcceptedResponse extends SuccessResponse {
  constructor({ message = ReasonStatusCode.ACCEPTED, metadata = {} }) {
    super({ message, status: StatusCode.ACCEPTED, metadata });
  }
}

class DeletedSuccessResponse extends SuccessResponse {
  constructor({ message = ReasonStatusCode.DELETED, metadata = {} }) {
    super({ message, status: StatusCode.OK, metadata });
  }
}

class NoContentResponse extends SuccessResponse {
  constructor() {
    super({
      message: ReasonStatusCode.NO_CONTENT,
      status: StatusCode.NO_CONTENT,
    });
  }

  send(res) {
    return res.status(this.status).send();
  }
}

module.exports = {
  SuccessResponse,
  CreateSuccessResponse,
  AcceptedResponse,
  NoContentResponse,
  DeletedSuccessResponse,
};
