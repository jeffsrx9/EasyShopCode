"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategory = getCategory;
exports.getCategoryGoods = getCategoryGoods;

var _request = require("./request");

function getCategory() {
  return (0, _request.request)({
    url: '/api/goods'
  });
}

function getCategoryGoods() {
  var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sales';
  var Cid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 180;
  var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return (0, _request.request)({
    url: "/api/goods?category_id=".concat(Cid, "&page=").concat(page, "&").concat(order, "=0")
  });
}