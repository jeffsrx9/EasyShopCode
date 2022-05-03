"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCart = addCart;
exports.modifyCart = modifyCart;
exports.checkedCart = checkedCart;
exports.getCart = getCart;
exports.deleteCartItem = deleteCartItem;

var _request = require("./request");

//添加購物車
function addCart(data) {
  return (0, _request.request)({
    url: '/api/carts',
    method: 'POST',
    data: data
  });
} //修改購物車 data={num:1}


function modifyCart(id, data) {
  return (0, _request.request)({
    url: "/api/carts/".concat(id),
    method: 'put',
    data: data
  });
} //選擇商品的狀態  checked,所有選中的id


function checkedCart(data) {
  return (0, _request.request)({
    url: '/api/carts/checked',
    method: 'patch',
    //update
    data: data
  });
} //獲取購物車列表


function getCart() {
  return (0, _request.request)({
    url: "/api/carts"
  });
} //刪除購物車


function deleteCartItem(id) {
  return (0, _request.request)({
    url: "/api/carts/".concat(id),
    method: 'delete'
  });
}