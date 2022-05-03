"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHomeAllData = getHomeAllData;
exports.getSwiper = getSwiper;
exports.getaddress = getaddress;
exports.getHomeGoods = getHomeGoods;

var _request = require("./request");

function getHomeAllData() {
  return (0, _request.request)({
    url: '/api/index'
  });
}

function getSwiper() {
  return (0, _request.request)({
    url: '/api/swiper'
  });
}

function getaddress() {
  return (0, _request.request)({
    url: "/api/taiwan"
  });
}

function getHomeGoods() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sales';
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return (0, _request.request)({
    url: '/api/index?' + type + '=1&page=' + page
  });
}