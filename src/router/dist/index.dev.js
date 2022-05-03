"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _store = _interopRequireDefault(require("@/store"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: '/',
  name: 'DefaultHome',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/home/Home'));
    });
  },
  meta: {
    title: '簡單購物'
  }
}, {
  path: '/home',
  name: 'Home',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/home/Home'));
    });
  },
  meta: {
    title: '簡單購物'
  }
}, {
  path: '/category',
  name: 'Category',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/category/Category'));
    });
  },
  meta: {
    title: '簡單購物-商品分類'
  }
}, {
  path: '/detail',
  name: 'Detail',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/detail/Detail'));
    });
  },
  meta: {
    title: '簡單購物-商品詳情'
  }
}, {
  path: '/shopcart',
  name: 'ShopCart',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/shopcart/ShopCart'));
    });
  },
  meta: {
    title: '簡單購物-購物車',
    isAuthRequired: true
  }
}, {
  path: '/profile',
  name: 'Profile',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/Profile'));
    });
  },
  meta: {
    title: '簡單購物-個人中心',
    isAuthRequired: true
  },
  children: []
}, {
  path: '/profile/setting',
  name: 'SetTing',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/setting'));
    });
  },
  meta: {
    title: '簡單購物 - 帳號管理',
    isAuthRequired: true
  }
}, {
  path: '/address',
  name: 'Address',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/Address'));
    });
  },
  meta: {
    title: '簡單購物-地址管理',
    isAuthRequired: true
  }
}, {
  path: '/addressedit',
  name: 'AddressEdit',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/AddressEdit'));
    });
  },
  meta: {
    title: '簡單購物-地址編輯',
    isAuthRequired: true
  }
}, {
  path: '/createorder',
  name: 'CreateOrder',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/order/CreateOrder'));
    });
  },
  meta: {
    title: '簡單購物-訂單預覽',
    isAuthRequired: true
  }
}, {
  path: '/register',
  name: 'Register',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/Register'));
    });
  },
  meta: {
    title: '簡單購物-用戶註冊'
  }
}, {
  path: '/login',
  name: 'Login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/profile/Login'));
    });
  },
  meta: {
    title: '簡單購物-用戶登入'
  }
}, {
  path: '/addcart',
  name: 'addcart',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/backend/goods/addcart'));
    });
  },
  meta: {
    title: '簡單購物-新增商品'
  }
}, //--------------------------------後台管理--------------------------------------------
{
  path: '/surperuser',
  name: 'surperuser',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/backend/surperuser'));
    });
  },
  meta: {
    title: '管理員',
    isAuthRequired: true
  }
}, {
  path: '/getCartList',
  name: 'getCartList',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/backend/goods/goodslist'));
    });
  },
  meta: {
    title: '管理員-商品列表',
    isAuthRequired: true
  }
}, {
  path: '/editCart/:id',
  name: 'editCart',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/backend/goods/editcart'));
    });
  },
  meta: {
    title: '管理員-編輯商品',
    isAuthRequired: true
  }
}, {
  path: '/getUserList',
  name: 'getUserList',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/backend/user/userlist'));
    });
  },
  meta: {
    title: '管理員-會員列表',
    isAuthRequired: true
  }
}, {
  path: '/editUser/:id',
  name: 'editUser',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/backend/user/edituser'));
    });
  },
  meta: {
    title: '管理員-編輯會員',
    isAuthRequired: true
  }
}, {
  path: '/addUser',
  name: 'addUser',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/backend/user/adduser'));
    });
  },
  meta: {
    title: '管理員-新增會員',
    isAuthRequired: true
  }
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHashHistory)(),
  routes: routes
});
router.beforeEach(function (to, from, next) {
  //如果沒有登錄  在這裡到login
  if (to.meta.isAuthRequired && _store["default"].state.user.isLogin === false) {
    _vant.Toast.fail('等先登錄');

    return next('/login');
  } else {
    next();
  }

  document.title = to.meta.title;
});
var _default = router;
exports["default"] = _default;