# 使用Vue-cli做出一個簡易的購物車網站

# 專案說明
```
Bootstrap製作RWD頁面
使用Vue3與vant組件庫來製作介面
後端使用Express.js來處理數據
資料庫使用MySQL進行資料存取
```
# 結構說明
### src
```
主要用到的檔案都在 src 這個資料夾中

src/main.js 是入口文件 裡面處理各種插件的配置

src/router/index.js 專門處理所有路由元件的檔案

src/App.vue 是整個 vue 實例

src/assets/scss 資料夾存放需要用到的樣式

src/assets/image 資料夾存放需要用到的圖片

src/components 資料夾存放共用的元件

src/store 資料夾使用vuex來處理特定資料
```

### views
```
用來存放要作為頁面的檔案

這裏為了區別前後台 另外添加了 backend資料夾
```

### public
```
network資料夾裡面存放各種介面的路徑 
以及最主要的 index.html
```
# 一些代碼的詳解
### 1.路由守衛
vue-router 中提供了一個路由守衛的功能，可以藉由它來阻止路由跳轉，比如某些頁面需要登入後才能訪問，就可以藉由路由守衛判斷登入狀態再進行頁面訪問。
```
router.beforeEach((to, from, next) => {
  //如果沒有登錄，傳送到login頁面
  if (to.meta.isAuthRequired && store.state.user.isLogin === false) {
    Toast.fail('等先登錄')
    return next('/login');
  } else {
    next();
  }
  //更改網頁的 title
  document.title = to.meta.title
})
```
### 2.子路由使用方式
* 通過在需要路由守衛的元件中添加上 `meta: { isAuthRequired: true },`後路由守衛就會幫忙判定登入狀態
* 在路由對象中添加 `meta: { title: '簡單購物-個人中心'}` 可以更改`index.html` 的 `title`
* `vue-cli v3` 以上的版本可以通過新的方法引入 `.vue` 檔 代碼如下：
    component: () => import('@/views/backend/goods/addcart')
    
### 3.style 相關
* 在元件中的 style 標籤上添加 `scoped` 就可以讓該元件的樣式僅在該元件中被使用
* 可以通過在元件中的 style 標籤上添加 `lang="scss"` 來改變 css 語言
合併使用代碼如下：
```
<style lang="scss" scoped>

</style>
```

### 4.cookie 相關
本作品使用 cookie 保存了後台的登入狀態
* 登入的部分
  在`Login.vue`中保存了登入的 `token` 主要代碼如下：
```
//將Token保存在本地window.localStorage
window.localStorage.setItem("token", res.access_token);
store.commit("setIsLogin", true);
//跳轉到首頁
setTimeout(() => {
router.push({ path: "/home" });
}, 500);
//根據是否登入用戶，更新購物車數量顯示
store.dispatch("updateCart");
```
