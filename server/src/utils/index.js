"use strict";

const _ = require("lodash");

const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  getInfoData,
  asyncHandler,
};
