"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;

var _axios = _interopRequireDefault(require("axios"));

var _router = _interopRequireDefault(require("@/router"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function request(config) {
  var instance = _axios["default"].create({
    baseURL: 'https://jeffsrx9.loca.lt',
    timeout: 5000
  }); // 請求攔截


  instance.interceptors.request.use(function (config) {
    // 如果有一個街口需要認證才能訪問  在這統一設置
    var token = window.localStorage.getItem('token');

    if (token) {
      config.headers.authorization = 'Bearer ' + token;
    } //直接放行 


    return config;
  }, function (err) {}); // 響應攔截

  instance.interceptors.response.use(function (res) {
    return res.data ? res.data : res;
  }, function (err) {
    // 需要授權才能訪問的接口 統一去login授權
    if (err.response.status == 401) {
      _vant.Toast.fail('請先登錄');

      _router["default"].push({
        path: '/login'
      });
    } // 如果有錯誤 ,這裡會處理顯示錯誤信息


    return (0, _vant.Notify)(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
  });
  return instance(config);
}