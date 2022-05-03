import {
  createRouter,
  createWebHashHistory
} from 'vue-router';
import store from '@/store';
import { Toast } from 'vant';


const routes = [{
    path: '/',
    name: 'DefaultHome',
    component: () => import('@/views/home/Home'),
    meta: {
      title: '簡單購物'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home'),
    meta: {
      title: '簡單購物'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/category/Category'),
    meta: {
      title: '簡單購物-商品分類'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/detail/Detail'),
    meta: {
      title: '簡單購物-商品詳情'
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import('@/views/shopcart/ShopCart'),
    meta: {
      title: '簡單購物-購物車',
      isAuthRequired: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/Profile'),
    meta: {
      title: '簡單購物-個人中心',
      isAuthRequired: true
    },  
    children: []
  },
  {
    path: '/profile/setting',
    name: 'SetTing',
    component: () => import('@/views/profile/setting'),
    meta: {
      title: '簡單購物 - 帳號管理',
      isAuthRequired: true,
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/profile/Address'),
    meta: {
      title: '簡單購物-地址管理',
      isAuthRequired: true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: () => import('@/views/profile/AddressEdit'),
    meta: {
      title: '簡單購物-地址編輯',
      isAuthRequired: true
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component: () => import('@/views/order/CreateOrder'),
    meta: {
      title: '簡單購物-訂單預覽',
      isAuthRequired: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/profile/Register'),
    meta: {
      title: '簡單購物-用戶註冊'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/profile/Login'),
    meta: {
      title: '簡單購物-用戶登入'
    }
  },
  
  { 
    path: '/addcart',
    name: 'addcart',
    component: () => import('@/views/backend/goods/addcart'),
    meta: {
      title: '簡單購物-新增商品'
    }
  },
  //--------------------------------後台管理--------------------------------------------
  {
    path: '/surperuser',
    name: 'surperuser',
    component: () => import('@/views/backend/surperuser'),
    meta: {
      title: '管理員',
      isAuthRequired: true
    }
  },
  {
    path: '/getCartList',
    name: 'getCartList',
    component: () => import('@/views/backend/goods/goodslist'),
    meta: {
      title: '管理員-商品列表',
      isAuthRequired: true
    }
  },
  {
    path: '/editCart/:id',
    name: 'editCart',
    component: () => import('@/views/backend/goods/editcart'),
    meta: {
      title: '管理員-編輯商品',
      isAuthRequired: true
    }
  },
  {
    path: '/getUserList',
    name: 'getUserList',
    component: () => import('@/views/backend/user/userlist'),
    meta: {
      title: '管理員-會員列表',
      isAuthRequired: true
    }
  },
  {
    path: '/editUser/:id',
    name: 'editUser',
    component: () => import('@/views/backend/user/edituser'),
    meta: {
      title: '管理員-編輯會員',
      isAuthRequired: true
    }
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: () => import('@/views/backend/user/adduser'),
    meta: {
      title: '管理員-新增會員',
      isAuthRequired: true
    }
  },
 

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  //如果沒有登錄  在這裡到login
  if (to.meta.isAuthRequired && store.state.user.isLogin === false) {
    Toast.fail('等先登錄')
    return next('/login');
  } else {
    next();
  }
  document.title = to.meta.title
})

export default router