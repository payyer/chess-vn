"use strict";

const ReasonStatusCode = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
  BAD_REQUEST: "Bad request!",
  UNAUTHORIZED: "Unauthorized access!",
  NOT_FOUND: "Resource not found!",
  SERVER_ERROR: "Internal Server Error",
};

const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestResponseError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.BAD_REQUEST,
    status = StatusCode.BAD_REQUEST
  ) {
    super(message, status);
  }
}

class ConflictRequestError extends ErrorResponse {
  /**
   *
   */
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class ForbiddenResponseError extends ErrorResponse {
  /**
   *
   */
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    status = StatusCode.FORBIDDEN
  ) {
    super(message, status);
  }
}

class UnauthorizedResponseError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.UNAUTHORIZED,
    status = StatusCode.UNAUTHORIZED
  ) {
    super(message, status);
  }
}

class NotFoundResponseError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.NOT_FOUND,
    status = StatusCode.NOT_FOUND
  ) {
    super(message, status);
  }
}

class InternalServerResponseError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.SERVER_ERROR,
    status = StatusCode.SERVER_ERROR
  ) {
    super(message, status);
  }
}

module.exports = {
  BadRequestResponseError,
  ConflictRequestError,
  ForbiddenResponseError,
  NotFoundResponseError,
  UnauthorizedResponseError,
  InternalServerResponseError,
};
